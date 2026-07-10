import {json,readState,writeState,sessionUser,publicState} from "../_shared/auth.js";

const REQUEST_TYPES=new Set(["editPerson","addRelation","deletePerson"]);
const RELATION_TYPES=new Set(["spouse","child"]);
const PERSON_PATCH_FIELDS=new Set([
  "name","gender","generation","zi","showZi","tagMode","tagText","tagItems","tagColor",
  "birthDate","birthCalendar","birthSolar","birthLunar","birthUnknown",
  "deathDate","deathCalendar","deathSolar","deathLunar","deathUnknown",
  "manualFatherName","manualMotherName","manualSpouseName","manualChildrenNames","note"
]);

function cleanText(value,max=500){
  return String(value||"").trim().slice(0,max);
}

function cleanId(value,prefix){
  const text=String(value||"").trim();
  return /^[A-Za-z0-9_:-]{1,90}$/.test(text)?text:`${prefix}_${Date.now()}_${crypto.randomUUID().slice(0,8)}`;
}

function cleanTime(value){
  const time=Date.parse(value);
  return Number.isFinite(time)?new Date(time).toISOString():new Date().toISOString();
}

function actorSnapshot(actor){
  return {
    username:actor.username,
    name:actor.name||actor.username,
    generation:actor.generation||"",
    zi:actor.zi||"",
    personId:actor.personId||"",
    role:actor.role
  };
}

function visibleStateForActor(state,actor){
  const safe=publicState(state);
  if(actor.role==="admin")return safe;
  safe.users=(safe.users||[]).filter(user=>user.id===actor.id);
  safe.changeRequests=(safe.changeRequests||[]).filter(request=>request.user===actor.username);
  safe.historyRecords=(safe.historyRecords||[]).filter(record=>record.user===actor.username);
  return safe;
}

function editablePersonIds(state,actor){
  if(actor.role==="admin")return new Set((state.data?.people||[]).map(person=>person.id));
  if(actor.role!=="member"||!actor.personId)return new Set();
  const editable=new Set([actor.personId]);
  const unions=state.data?.unions||[];
  const parentLinks=state.data?.parentLinks||[];
  const spouses=unions
    .filter(union=>(union.partners||[]).includes(actor.personId))
    .flatMap(union=>(union.partners||[]).filter(id=>id!==actor.personId));
  spouses.forEach(id=>editable.add(id));
  [actor.personId,...spouses].forEach(parentId=>{
    parentLinks.filter(link=>link.parent===parentId).forEach(link=>editable.add(link.child));
  });
  return editable;
}

function sanitizeTagItems(items){
  if(!Array.isArray(items))return [];
  return items.slice(0,3).map(item=>({
    text:cleanText(item?.text,8),
    color:/^#[0-9a-f]{6}$/i.test(item?.color||"")?item.color:"#8c2f25"
  })).filter(item=>item.text);
}

function sanitizePersonPatch(payload){
  if(!payload||typeof payload!=="object")return null;
  const patch={};
  for(const [key,value] of Object.entries(payload)){
    if(!PERSON_PATCH_FIELDS.has(key))continue;
    if(key==="name")patch.name=cleanText(value,40);
    else if(key==="gender")patch.gender=value==="female"?"female":"male";
    else if(key==="generation")patch.generation=Math.min(30,Math.max(1,Number(value)||1));
    else if(key==="zi")patch.zi=cleanText(value,4);
    else if(key==="showZi"||key.endsWith("Unknown"))patch[key]=Boolean(value);
    else if(key==="tagItems")patch.tagItems=sanitizeTagItems(value);
    else if(key==="tagColor")patch.tagColor=/^#[0-9a-f]{6}$/i.test(value||"")?value:"#8c2f25";
    else if(key==="tagMode")patch.tagMode=["none","single","multiple"].includes(value)?value:"none";
    else patch[key]=cleanText(value,key==="note"?2000:300);
  }
  return patch.name===""?null:patch;
}

function sanitizeNewPerson(raw,type,base){
  const patch=sanitizePersonPatch(raw);
  if(!patch?.name)return null;
  const generation=type==="child"?(Number(base.generation)||1)+1:Number(base.generation)||1;
  return {
    id:cleanId(raw.id,"p"),
    name:patch.name,
    generation:Math.min(30,Math.max(1,Number(raw.generation)||generation)),
    gender:raw.gender==="female"?"female":"male",
    zi:cleanText(raw.zi,4),
    note:cleanText(raw.note,2000),
    showZi:type!=="spouse",
    tagMode:"none",
    tagText:"",
    tagItems:[],
    tagColor:"#8c2f25",
    branchOrder:null,
    displayMotherId:"",
    manualFatherName:"",
    manualMotherName:"",
    manualSpouseName:"",
    manualChildrenNames:"",
    birthDate:"",
    birthCalendar:"",
    birthSolar:"",
    birthLunar:"",
    birthUnknown:false,
    deathDate:"",
    deathCalendar:"",
    deathSolar:"",
    deathLunar:"",
    deathUnknown:false
  };
}

function sanitizeRequest(request,state,actor){
  if(!request||typeof request!=="object"||!REQUEST_TYPES.has(request.type))return null;
  const editable=editablePersonIds(state,actor);
  const basePeople=state.data?.people||[];
  const clean={
    id:cleanId(request.id,"r"),
    time:cleanTime(request.time),
    user:actor.username,
    name:actor.name||actor.username,
    generation:actor.generation||"",
    type:request.type,
    target:cleanText(request.target,80),
    targetId:String(request.targetId||""),
    payload:null,
    detail:cleanText(request.detail,500),
    status:"pending"
  };
  if(request.type==="editPerson"){
    if(!editable.has(clean.targetId))return null;
    const patch=sanitizePersonPatch(request.payload);
    if(!patch)return null;
    clean.payload=patch;
  }else if(request.type==="deletePerson"){
    if(!editable.has(clean.targetId))return null;
    clean.payload={};
  }else if(request.type==="addRelation"){
    const payload=request.payload||{};
    if(payload.baseId!==actor.personId||!RELATION_TYPES.has(payload.type))return null;
    const base=basePeople.find(person=>person.id===payload.baseId);
    if(!base)return null;
    const newPerson=sanitizeNewPerson(payload.newPerson||{},payload.type,base);
    if(!newPerson)return null;
    clean.targetId=base.id;
    clean.payload={baseId:base.id,type:payload.type,newPerson};
  }
  return clean;
}

function sanitizeMessage(message,actor){
  if(!message||typeof message!=="object")return null;
  const content=cleanText(message.content,500);
  if(!content)return null;
  return {id:cleanId(message.id,"m"),time:cleanTime(message.time),author:actorSnapshot(actor),content,replies:[]};
}

function sanitizeReply(reply,actor){
  if(!reply||typeof reply!=="object")return null;
  const content=cleanText(reply.content,300);
  if(!content)return null;
  return {id:cleanId(reply.id,"mr"),time:cleanTime(reply.time),author:actorSnapshot(actor),content};
}

function mergeMessageBoard(storedBoard=[],incomingBoard=[],actor){
  const stored=Array.isArray(storedBoard)?storedBoard:[];
  const incoming=Array.isArray(incomingBoard)?incomingBoard:[];
  const storedIds=new Set(stored.map(message=>message.id));
  const newMessages=incoming
    .filter(message=>!storedIds.has(message.id))
    .map(message=>sanitizeMessage(message,actor))
    .filter(Boolean);
  const nextStored=stored.map(message=>{
    const incomingMessage=incoming.find(item=>item.id===message.id);
    if(!incomingMessage||!Array.isArray(incomingMessage.replies))return message;
    const replyIds=new Set((message.replies||[]).map(reply=>reply.id));
    const newReplies=incomingMessage.replies
      .filter(reply=>!replyIds.has(reply.id))
      .map(reply=>sanitizeReply(reply,actor))
      .filter(Boolean);
    return newReplies.length?{...message,replies:[...(message.replies||[]),...newReplies]}:message;
  });
  return [...newMessages,...nextStored].slice(0,300);
}

function mergeMemberState(stored,incoming,actor){
  const existingRequestIds=new Set((stored.changeRequests||[]).map(request=>request.id));
  const incomingRequests=Array.isArray(incoming.changeRequests)?incoming.changeRequests:[];
  const newRequests=[];
  for(const request of incomingRequests){
    if(existingRequestIds.has(request.id))continue;
    const clean=sanitizeRequest(request,stored,actor);
    if(!clean)throw new Error("包含无效或越权的修改申请");
    newRequests.push(clean);
  }
  return {
    ...stored,
    changeRequests:[...newRequests,...(stored.changeRequests||[])].slice(0,1000),
    messageBoard:mergeMessageBoard(stored.messageBoard,incoming.messageBoard,actor),
    sessions:stored.sessions||[]
  };
}

function mergeAdminState(stored,incoming){
  const credentials=new Map((stored.users||[]).map(user=>[user.id||`${user.username}_${user.createdAt}`,user]));
  const incomingUsers=Array.isArray(incoming.users)?incoming.users:[];
  const users=incomingUsers.map(user=>{
    const old=credentials.get(user.id||`${user.username}_${user.createdAt}`)||{};
    return {...user,passwordHash:old.passwordHash,passwordSalt:old.passwordSalt,passwordDigest:old.passwordDigest,passwordIterations:old.passwordIterations};
  });
  return {...incoming,users,sessions:stored.sessions||[]};
}

export async function onRequestGet(context) {
  try {
    const state=await readState(context.env.DB),actor=sessionUser(context.request,state);if(!actor)return json({error:"请先登录"},401);
    return json({ state:visibleStateForActor(state,actor) });
  } catch (error) {
    return json({ error: error.message || "读取数据失败" }, 500);
  }
}

export async function onRequestPost(context) {
  try {
    const stored=await readState(context.env.DB),actor=sessionUser(context.request,stored);if(!actor)return json({error:"请先登录"},401);
    const body = await context.request.json();
    if (!body || typeof body.state !== "object" || body.state === null) {
      return json({ error: "缺少 state" }, 400);
    }
    const nextState=actor.role==="admin"?mergeAdminState(stored,body.state):mergeMemberState(stored,body.state,actor);
    await writeState(context.env.DB,nextState);
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message || "保存数据失败" }, 500);
  }
}
