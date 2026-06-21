const ZI = ["", "启", "见", "文", "国", "荣", "仕", "万", "永", "秉", "守", "天", "良", "其", "源", "必", "昌"];
const STORAGE_KEY = "zhang-family-tree-v4";
const USERS_KEY = "zhang-family-users-v1";
const SESSION_KEY = "zhang-family-session-v1";
const HISTORY_KEY = "zhang-family-history-v1";
const REQUESTS_KEY = "zhang-family-requests-v1";
const ANNOUNCEMENTS_KEY = "zhang-family-announcements-v1";
const CLOUD_DATA_ENDPOINT = "/api/data";
const CARD_W = 64, SPOUSE_W = 48, CARD_H = 84, SPOUSE_GAP = 10, FAMILY_GAP = 18, ROW_GAP = 138, MARGIN = 110;
const TAG_COLORS = [
  ["#8c2f25","朱砂"],
  ["#a77b36","鎏金"],
  ["#536b62","松绿"],
  ["#3f6375","黛蓝"],
  ["#72566f","烟紫"],
  ["#72513b","檀棕"],
  ["#5d6468","青灰"],
  ["#2f2b27","墨黑"]
];

const rawFamilies = [
  [1,"启相公","male",["党太君"],["见富公"]],
  [2,"见富公","male",["王正修"],["文灿","文斗","文秀"]],
  [3,"文灿","male",["武氏","王氏"],[]],[3,"文斗","male",["蒋氏"],["国清","国美"]],[3,"文秀","male",["赵氏"],[]],
  [4,"国清","male",["党氏"],[]],[4,"国美","male",["党孺人"],["荣连"]],
  [5,"荣连","male",["赵太君"],["仕龙","仕舜","仕尧","仕万"]],
  [6,"仕龙","male",["严际宽"],["万富"]],[6,"仕舜","male",["舒氏"],[]],[6,"仕尧","male",["唐氏"],[]],[6,"仕万","male",["郭氏"],[]],
  [7,"万富","male",["陈开玉"],["永俸","永明","永宁","出嫁女（名讳待考）"]],
  [8,"永俸","male",["李真祥"],[]],[8,"永明","male",["朱真琪"],["秉文","秉腾","秉蛟","秉敭"]],[8,"永宁","male",["彭氏"],[]],
  [9,"秉文","male",["彭祖缘"],["守沿","守治","守维"]],[9,"秉腾","male",["陈道善"],[]],[9,"秉蛟","male",["牟氏","李氏"],[]],[9,"秉敭","male",["余真修"],[]],
  [10,"守沿","male",["彭广惠"],["天荣","天礼"]],[10,"守治","male",["侯贵明"],[]],[10,"守维","male",["曹性宽"],[]],
  [11,"天荣","male",["赵常宾","彭昌兹"],["良襄","良发","良财","良宾"]],[11,"天礼","male",["王氏"],[]],
  [12,"良发","male",["杨氏"],["张其光","张其贵","张其明","张其安","张其彬","张其富"]],[12,"良财","male",["聂树真"],["其元"]],[12,"良宾","female",["王氏（自贡）"],[]],
  [13,"张其光","male",["赵善惠"],["张源明","张源松","张源林","张源聪","张源书","张源坤","张源珍","张源群"]],
  [13,"张其贵","male",["彭国芬"],["张源海","张源春","张源兴","张源华","张源兵","张源芬","张源萍","张源秀"]],
  [13,"张其明","male",["李成安"],["张敏","张勇","张洪","张兰（养女）"]],
  [13,"张其安","male",["刘万琴"],["张涛","张维"]],
  [13,"张其彬","female",["刘运寿"],[]],[13,"张其富","female",["罗广文"],[]],[13,"其元","female",["郭成镛"],[]],
  [14,"张源明","male",["何树方"],["张强","张华","张兰（源明养女）"]],[14,"张源松","male",["余绍林"],["李晓林","李小芳"]],
  [14,"张源林","male",["任天秀"],["张波","张亮"]],[14,"张源聪","male",["明兴芬","尧泽芬"],["张明","张烨"]],
  [14,"张源书","male",["林永虹"],["张林"]],[14,"张源坤","male",[],[]],[14,"张源珍","female",["曾丰金"],["曾易","曾静"]],
  [14,"张源群","female",["谢瑞全"],["谢扬帅","谢利平"]],[14,"张源海","male",["彭文凤","郑翠兰"],["张亚","张鹏"]],
  [14,"张源春","male",["李新","曹晓英"],["张必麟"]],[14,"张源兴","male",["邓群芳"],["张莉科"]],
  [14,"张源华","male",["薛六琼"],["张朵朵"]],[14,"张源兵","male",["廖行群"],["张必灏"]],
  [14,"张源芬","female",["刘秉怡"],["刘琰敏"]],[14,"张源萍","female",["何东"],["何星"]],[14,"张源秀","female",["蒋太华"],["蒋竹韵"]],
  [14,"张敏","male",["李小玲"],["张碧芸"]],[14,"张勇","male",["王小容"],["张权"]],[14,"张洪","male",["郭江"],["张碧钰"]],
  [14,"张兰（养女）","female",["李世彬"],["李瑶瑶","李珊珊"]],[14,"张涛","male",["侯晓芳"],["张艺兹"]],[14,"张维","female",["代国强"],["代悠扬"]],
  [15,"张强","male",["唐容"],["张昌杰","张宇泽"]],[15,"张兰（源明养女）","female",["陈功"],["陈昱林"]],
  [15,"李晓林","female",["李胜虎"],[]],[15,"李小芳","female",["陈艺龙"],[]],[15,"张波","male",["罗凤娟"],["张俊鸿","张欣怡"]],
  [15,"张亮","male",["黄先彩"],["张雨馨"]],[15,"张明","male",["周润梅"],["张泽希","张妍希"]],[15,"张林","male",["张秀萍"],["张嘉欣睿","张嘉欣宇","张嘉欣玥"]],
  [15,"张亚","male",["林天群","陈红美"],["张琳茜"]],[15,"张鹏","male",["黎彩","杨银"],["张瑾萱"]],[15,"张必麟","male",["刘敏"],[]],
  [15,"张莉科","male",["廖新萍"],["张舟亦"]],[15,"张权","male",["李红梅"],["张璟沅"]],[15,"张碧钰","female",["赵思林"],["赵琳芮"]]
];

function initialData() {
  const people = [], unions = [], parentLinks = [];
  const byKey = new Map();
  let seq = 1;
  const add = (name, generation, gender, note="", showZi=true) => {
    const key = `${generation}:${name}`;
    if (byKey.has(key)) return byKey.get(key);
    const id = `p${seq++}`;
    people.push(createPersonRecord({id,name,generation,gender,zi:ZI[generation] || "",note,showZi}));
    byKey.set(key,id); return id;
  };
  rawFamilies.forEach(([gen,name,gender,spouses,children]) => {
    const main = add(name,gen,gender, /早亡|早逝/.test(name) ? "早逝" : "");
    spouses.forEach((spouseName,i) => {
      const spouse = add(spouseName,gen,gender==="male"?"female":"male",i ? "续配" : "配偶",false);
      unions.push({id:`u${unions.length+1}`,partners:[main,spouse]});
    });
    children.forEach(childName => {
      const knownFemale = /女|宾$|彬$|富$|元$|珍$|群$|芬$|萍$|秀$|兰|维$|晓林$|小芳$|曾静$|谢利平$|朵朵$|竹韵$|碧芸$|碧钰$|瑶瑶$|珊珊$|艺兹$|妍希$|欣怡$|雨馨$|嘉欣睿$|嘉欣玥$|琳茜$|瑾萱$|琳芮$/.test(childName);
      const child = add(childName,gen+1,knownFemale?"female":"male");
      parentLinks.push({parent:main,child});
    });
  });
  const note = (generation, name, text) => {
    const target = people.find(p => p.generation === generation && p.name === name);
    if (target) target.note = text;
  };
  note(10, "守维", "过房给秉腾为子");
  note(13, "张其贵", "过房承良财公祧");
  note(12, "良襄", "早亡");
  note(14, "张源坤", "早逝");
  note(15, "张华", "早逝");
  note(14, "张兰（养女）", "养女");
  note(15, "张兰（源明养女）", "养女");
  return {people,unions,parentLinks};
}

let data = normalizeDataSet(initialData());
let users = [];
let historyRecords = [];
let changeRequests = [];
let announcements = [];
let messageBoard = [];
let currentUser = {username:"游客",role:"guest"};
let scale=.72, panX=95, panY=50, selectedId=null, isPanning=false, spaceDown=false, start={}, personFormSnapshot="", touchState=null;
let branchDragState=null, branchDragSuppressClick=false;
let requestPage=1, historyPage=1, memberPage=1;
const HISTORY_PAGE_SIZE=10;
const $ = s => document.querySelector(s);
const viewport=$("#viewport"), canvas=$("#canvas"), tree=$("#tree"), links=$("#links");
const save = () => saveCloudState();
const person = id => data.people.find(p=>p.id===id);
const esc = s => String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function readStorage(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
function normalizeUsers(source=[], dataSet=data){
  const storedUsers=Array.isArray(source)?source:[];
  const storedAdmin=storedUsers.find(user=>user.username==="admin123");
  const memberUsers=storedUsers
    .filter(user=>user.username&&user.username!=="admin123")
    .map(user=>{
      const linkedPerson=dataSet?.people?.find(item=>item.id===user.personId);
      return {
        ...user,
        id:user.id||`member_${user.username}_${user.createdAt||"legacy"}`,
        name: linkedPerson?.name || user.name || user.username,
        generation: linkedPerson?.generation || user.generation || "",
        zi: linkedPerson?.zi || user.zi || "",
        role:user.role==="admin"?"member":user.role,
        status:user.status||"approved",
        approvalMode:user.approvalMode||"legacy"
      };
    });
  return [
    {...storedAdmin,id:storedAdmin?.id||"system_admin",username:"admin123",name:"管理员",generation:0,zi:"",role:"admin",status:"approved",approvalMode:"system",createdAt:storedAdmin?.createdAt||"system"},
    ...memberUsers
  ];
}
function fallbackState(){
  let storedData;
  try{storedData=JSON.parse(localStorage.getItem(STORAGE_KEY))}catch{storedData=null}
  const normalizedData=normalizeDataSet(storedData || initialData());
  return {
    data: normalizedData,
    users: normalizeUsers(readStorage(USERS_KEY, []), normalizedData),
    historyRecords: readStorage(HISTORY_KEY, []),
    changeRequests: readStorage(REQUESTS_KEY, []),
    announcements: readStorage(ANNOUNCEMENTS_KEY, []),
    messageBoard: []
  };
}
function applyState(state){
  data=normalizeDataSet(state?.data || initialData());
  users=normalizeUsers(state?.users || [], data);
  historyRecords=Array.isArray(state?.historyRecords)?state.historyRecords.map((record,index)=>({...record,id:record.id||`h_legacy_${index}_${record.time||Date.now()}`})):[];
  changeRequests=Array.isArray(state?.changeRequests)?state.changeRequests:[];
  announcements=Array.isArray(state?.announcements)?state.announcements:[];
  messageBoard=Array.isArray(state?.messageBoard)?state.messageBoard:[];
  currentUser=users.find(user => user.username === localStorage.getItem(SESSION_KEY)&&user.status==="approved") || {username:"游客",role:"guest"};
}
function currentState(){
  return {data,users,historyRecords,changeRequests,announcements,messageBoard};
}
function normalizeAppState(source){
  if(source?.state)return source.state;
  if(source?.data||source?.people){
    return {...currentState(),data:normalizeDataSet(source)};
  }
  throw new Error("数据格式不正确");
}
async function loadCloudState(){
  const response=await fetch(CLOUD_DATA_ENDPOINT,{cache:"no-store",credentials:"include"});
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const payload=await response.json();
  if(!payload.state)throw new Error("云端数据为空");
  applyState(payload.state);
}
async function saveCloudState(){
  try{
    const response=await fetch(CLOUD_DATA_ENDPOINT,{
      method:"POST",
      credentials:"include",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({state:currentState()})
    });
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
  }catch(error){
    console.error("保存云端数据失败",error);
    throw error;
  }
}
function createPersonRecord(values={}){
  const generation=Number(values.generation)||1;
  return {
    id: values.id || `p${Date.now()}${Math.random().toString(16).slice(2,5)}`,
    name: values.name || "新族人",
    generation,
    gender: values.gender || "male",
    zi: values.zi ?? (ZI[generation] || ""),
    note: values.note || "",
    showZi: values.showZi !== false,
    tagMode: values.tagMode || "none",
    tagText: values.tagText || "",
    tagItems: Array.isArray(values.tagItems) ? values.tagItems : [],
    tagColor: safeColor(values.tagColor),
    branchOrder: values.branchOrder === undefined || values.branchOrder === null || values.branchOrder === "" ? null : Number(values.branchOrder),
    displayMotherId: values.displayMotherId || "",
    manualFatherName: values.manualFatherName || "",
    manualMotherName: values.manualMotherName || "",
    birthDate: values.birthDate || "",
    birthCalendar: values.birthCalendar || "",
    birthSolar: values.birthSolar || "",
    birthLunar: values.birthLunar || "",
    birthUnknown: Boolean(values.birthUnknown),
    deathDate: values.deathDate || "",
    deathCalendar: values.deathCalendar || "",
    deathSolar: values.deathSolar || "",
    deathLunar: values.deathLunar || "",
    deathUnknown: Boolean(values.deathUnknown)
  };
}
function splitTagText(value){
  return String(value||"").split(/[、，,\n]/).map(item=>item.trim()).filter(Boolean).slice(0,3);
}
function normalizePerson(p){
  if(p.tagText===`第${toChinese(p.generation)}世`)p.tagText="";
  const tagColor=safeColor(p.tagColor);
  const tagItems=Array.isArray(p.tagItems)&&p.tagItems.length
    ? p.tagItems.map(item=>({text:String(item.text||"").trim(),color:safeColor(item.color||tagColor)})).filter(item=>item.text)
    : splitTagText(p.tagText).map(text=>({text,color:tagColor}));
  const tagMode=tagItems.length>1?"multiple":tagItems.length===1?"single":"none";
  Object.assign(p, createPersonRecord({...p,tagMode,tagItems,tagColor}));
  if(p.tagMode==="none"){p.tagText="";p.tagItems=[]}
  else if(p.tagMode==="single"){p.tagItems=p.tagItems.slice(0,1);p.tagText=p.tagItems[0]?.text||p.tagText||""}
  else {p.tagItems=(p.tagItems.length?p.tagItems:splitTagText(p.tagText).map(text=>({text,color:p.tagColor}))).slice(0,3);p.tagText=p.tagItems.map(item=>item.text).join("、")}
  return p;
}
function normalizeDataSet(source){
  const input=source?.data&&Array.isArray(source.data.people)?source.data:source;
  if(!input||!Array.isArray(input.people)||!Array.isArray(input.unions)||!Array.isArray(input.parentLinks)){
    throw new Error("数据格式不正确");
  }
  return {
    people: input.people.map(item=>normalizePerson({...item})),
    unions: input.unions.map(item=>({id:String(item.id||`u${Date.now()}`),partners:[...(item.partners||[])].map(String).slice(0,2)})).filter(item=>item.partners.length===2),
    parentLinks: input.parentLinks.map(item=>({parent:String(item.parent||""),child:String(item.child||"")})).filter(item=>item.parent&&item.child)
  };
}
function canEdit(){return currentUser.role==="admin"}
function canPropose(){return currentUser.role==="admin"||currentUser.role==="member"}
function editablePersonIdsForCurrentUser(){
  if(canEdit())return new Set(data.people.map(p=>p.id));
  if(currentUser.role!=="member"||!currentUser.personId)return new Set();
  const editable=new Set([currentUser.personId]);
  const spouses=data.unions
    .filter(union=>union.partners.includes(currentUser.personId))
    .flatMap(union=>union.partners.filter(id=>id!==currentUser.personId));
  spouses.forEach(id=>editable.add(id));
  [currentUser.personId,...spouses].forEach(parentId=>{
    data.parentLinks.filter(link=>link.parent===parentId).forEach(link=>editable.add(link.child));
  });
  return editable;
}
function canModifyPerson(id){return editablePersonIdsForCurrentUser().has(id)}
function canAddRelationForPerson(id,type){
  if(canEdit())return true;
  if(currentUser.role!=="member")return false;
  if(id!==currentUser.personId)return false;
  return type==="spouse"||type==="child";
}
function requireAccount(){if(canPropose())return true;setAuthTab("login");$("#authDialog").showModal();return false}
function requireAdmin(){if(canEdit())return true;return false}
function userLine(user=currentUser){
  if(user.role==="admin")return "管理员";
  const generation=user.generation?`第${toChinese(+user.generation)}世`:"世代未定";
  const zi=user.zi?` · ${user.zi}字辈`:"";
  return `${generation}${zi} · ${user.name||user.username}`;
}
function currentUserSnapshot(){
  return {
    username: currentUser.username,
    name: currentUser.name || currentUser.username,
    generation: currentUser.generation || "",
    zi: currentUser.zi || "",
    personId: currentUser.personId || "",
    role: currentUser.role
  };
}
function showMessage(options={}){
  const dialog=$("#messageDialog");
  const confirmButton=$("#messageConfirm");
  const cancelButton=$("#messageCancel");
  const closeButton=$("#messageClose");
  const isAlert=options.mode!=="confirm";
  $("#messageEyebrow").textContent=options.eyebrow||"温馨提示";
  $("#messageTitle").textContent=options.title||"提示";
  $("#messageText").textContent=options.message||"";
  confirmButton.textContent=options.confirmText||"确定";
  cancelButton.textContent=options.cancelText||"取消";
  cancelButton.classList.toggle("messageCancelHidden",isAlert);
  dialog.classList.toggle("alert",isAlert);
  return new Promise(resolve=>{
    let settled=false;
    const finish=value=>{
      if(settled)return;
      settled=true;
      confirmButton.onclick=null;
      cancelButton.onclick=null;
      closeButton.onclick=null;
      dialog.oncancel=null;
      dialog.onclose=null;
      if(dialog.open)dialog.close();
      resolve(value);
    };
    confirmButton.onclick=()=>finish(true);
    cancelButton.onclick=()=>finish(false);
    closeButton.onclick=()=>finish(isAlert);
    dialog.oncancel=event=>{event.preventDefault();finish(isAlert)};
    dialog.onclose=()=>finish(isAlert);
    dialog.showModal();
    confirmButton.focus();
  });
}
function showAlert(message,title="提示"){return showMessage({mode:"alert",title,message,confirmText:"知道了"})}
function showConfirm(message,title="请确认"){return showMessage({mode:"confirm",title,message,confirmText:"确定",cancelText:"取消"})}
const LUNAR_INFO=[
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
];
const LUNAR_MONTHS={正:1,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10,冬:11,腊:12};
const LUNAR_MONTH_NAMES=["","正","二","三","四","五","六","七","八","九","十","冬","腊"];
function pad2(n){return String(n).padStart(2,"0")}
function validSolar(year,month,day){
  const date=new Date(year,month-1,day);
  return date.getFullYear()===year&&date.getMonth()===month-1&&date.getDate()===day;
}
function leapMonth(year){return LUNAR_INFO[year-1900]&0xf}
function leapDays(year){return leapMonth(year)?((LUNAR_INFO[year-1900]&0x10000)?30:29):0}
function monthDays(year,month){return (LUNAR_INFO[year-1900]&(0x10000>>month))?30:29}
function lunarMonthText(month){return `${LUNAR_MONTH_NAMES[month]||month}月`}
function lunarYearDays(year){
  let sum=348;
  for(let bit=0x8000;bit>0x8;bit>>=1)sum+=(LUNAR_INFO[year-1900]&bit)?1:0;
  return sum+leapDays(year);
}
function lunarToSolar(year,month,day,isLeap=false){
  if(year<1900||year>=1900+LUNAR_INFO.length)return null;
  const leap=leapMonth(year);
  if(month<1||month>12||day<1)return null;
  const maxDay=isLeap?leapDays(year):monthDays(year,month);
  if(isLeap&&leap!==month)return null;
  if(day>maxDay)return null;
  let offset=0;
  for(let y=1900;y<year;y++)offset+=lunarYearDays(y);
  for(let m=1;m<month;m++){
    offset+=monthDays(year,m);
    if(leap===m)offset+=leapDays(year);
  }
  if(isLeap)offset+=monthDays(year,month);
  offset+=day-1;
  const date=new Date(1900,0,31);
  date.setDate(date.getDate()+offset);
  return `${date.getFullYear()}-${pad2(date.getMonth()+1)}-${pad2(date.getDate())}`;
}
function parseChineseNumber(text){
  if(/^\d+$/.test(text))return Number(text);
  const digit={零:0,〇:0,一:1,二:2,两:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
  const clean=String(text||"").replace(/^初/,"").replace(/^廿/,"二十").replace(/^卅/,"三十");
  if(clean==="十")return 10;
  if(clean==="二十")return 20;
  if(clean==="三十")return 30;
  if(clean.startsWith("十"))return 10+(digit[clean[1]]||0);
  if(clean.includes("十")){
    const [ten,one]=clean.split("十");
    return (digit[ten]||0)*10+(one?digit[one]||0:0);
  }
  return digit[clean]||0;
}
function parseLunarInput(value){
  const clean=String(value||"").replace(/\s+/g,"");
  if(!clean.includes("农历"))return null;
  const yearMatch=clean.match(/(\d{4})/);
  if(!yearMatch)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:"农历日期缺少年份"};
  const year=Number(yearMatch[1]);
  const tail=clean.slice(yearMatch.index+4);
  const monthMatch=tail.match(/(闰)?(\d{1,2}|正|一|二|三|四|五|六|七|八|九|十|冬|腊)月?/);
  if(!monthMatch)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:"农历日期缺少月份"};
  const monthToken=monthMatch[2];
  const month=/^\d+$/.test(monthToken)?Number(monthToken):LUNAR_MONTHS[monthToken];
  const dayTail=tail.slice(monthMatch.index+monthMatch[0].length).replace(/^[-/.年月]+/,"").replace(/[日号]$/,"");
  const dayToken=(dayTail.match(/^\d{1,2}/)||dayTail.match(/^(初[一二三四五六七八九十]|十[一二三四五六七八九]?|二十|廿[一二三四五六七八九]?|三十|卅)$/)||[])[0];
  const day=parseChineseNumber(dayToken||"");
  if(!day)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:"农历日期缺少日期"};
  if(year<1900||year>=1900+LUNAR_INFO.length){
    return {raw:value,calendar:"lunar",precision:"day",solar:"",lunar:value,unsupported:true};
  }
  if(month<1||month>12)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:"农历月份不存在"};
  const leap=leapMonth(year);
  const maxDay=Boolean(monthMatch[1])?leapDays(year):monthDays(year,month);
  if(Boolean(monthMatch[1])&&leap!==month)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:`${year}年没有闰${lunarMonthText(month)}`};
  if(day>maxDay)return {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:`${year}年农历${Boolean(monthMatch[1])?"闰":""}${lunarMonthText(month)}只有${maxDay}天`};
  const solar=lunarToSolar(year,month,day,Boolean(monthMatch[1]));
  return solar
    ? {raw:value,calendar:"lunar",precision:"day",solar,lunar:value}
    : {raw:value,calendar:"lunar",precision:"text",solar:"",lunar:value,error:"农历日期不存在"};
}
function parseFlexibleDate(value){
  const raw=String(value||"").trim();
  if(!raw)return {raw:"",calendar:"",precision:"",solar:"",lunar:""};
  const lunar=parseLunarInput(raw);
  if(lunar)return lunar;
  let match=raw.match(/^(\d{4})$/) || raw.match(/^(\d{4})年$/);
  if(match)return {raw,calendar:"solar",precision:"year",solar:match[1],lunar:""};
  match=raw.match(/^(\d{4})[-/.年](\d{1,2})(?:月)?$/);
  if(match){
    const year=+match[1],month=+match[2];
    return month>=1&&month<=12?{raw,calendar:"solar",precision:"month",solar:`${year}-${pad2(month)}`,lunar:""}:{raw,calendar:"unknown",precision:"text",solar:"",lunar:"",error:"月份不正确"};
  }
  match=raw.match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})(?:日)?$/);
  if(match){
    const year=+match[1],month=+match[2],day=+match[3];
    return validSolar(year,month,day)?{raw,calendar:"solar",precision:"day",solar:`${year}-${pad2(month)}-${pad2(day)}`,lunar:""}:{raw,calendar:"unknown",precision:"text",solar:"",lunar:"",error:"阳历日期不存在"};
  }
  return {raw,calendar:"unknown",precision:"text",solar:"",lunar:"",error:"未识别日期格式"};
}
function parseDateByCalendar(value,calendar){
  const raw=String(value||"").trim();
  if(!raw)return {raw:"",calendar:"",precision:"",solar:"",lunar:""};
  if(calendar==="lunar"){
    const lunar=parseLunarInput(raw.includes("农历")?raw:`农历${raw}`);
    return lunar || {raw,calendar:"lunar",precision:"text",solar:"",lunar:raw,error:"未识别农历日期格式"};
  }
  const parsed=parseFlexibleDate(raw);
  return parsed.calendar==="lunar"?{...parsed,raw}:parsed;
}
function dateCalendarValue(){return $("#personDateCalendarToggle").checked?"lunar":"solar"}
function setDateCalendarValue(value){$("#personDateCalendarToggle").checked=value==="lunar"}
function dateHint(info,label="时间"){
  if(!info.raw)return "";
  if(info.error)return info.error;
  if(info.unsupported)return `${label}农历换算暂支持1900-2049年`;
  if(info.calendar==="lunar")return `${label}记录为：阳历 ${info.solar}`;
  if(info.precision==="year")return `${label}记录为：${info.solar}`;
  if(info.precision==="month")return `${label}记录为：${info.solar}`;
  return `${label}记录为：阳历 ${info.solar}`;
}
function formatStoredDate(p,type){
  const raw=p[`${type}Date`]||"";
  const solar=p[`${type}Solar`]||"";
  const lunar=p[`${type}Lunar`]||"";
  if(type==="birth"&&p.birthUnknown)return "不详";
  if(type==="death"&&p.deathUnknown)return "不详";
  if(!raw)return "未填写";
  return lunar&&solar?`${lunar}（阳历 ${solar}）`:raw;
}
function dateFieldDisplayValue(p,type){
  if(type==="birth"&&p.birthUnknown)return "出生不详";
  if(type==="death"&&p.deathUnknown)return "死亡不详";
  if(p[`${type}Calendar`]==="lunar"&&p[`${type}Solar`])return p[`${type}Solar`];
  return p[`${type}Solar`]||p[`${type}Date`]||"";
}
function syncPersonFormPlaceholders(canModify){
  const datePlaceholder="如 1990 / 1990-05-21 / 农历1990年正月初一";
  $("#personBirthDate").placeholder=canModify?datePlaceholder:"";
  $("#personDeathDate").placeholder=canModify?datePlaceholder:"";
  $("#personNote").placeholder=canModify?"生卒、排行、迁居等信息":"";
}
function addHistory(action,target,detail){
  const record={id:`h${Date.now()}`,time:new Date().toISOString(),user:currentUser.username,action,target,detail};
  historyRecords.unshift(record);
  historyRecords=historyRecords.slice(0,500);
  saveCloudState().catch(error=>console.error("保存修改记录失败",error));
}
function addRequest(type,target,targetId,payload,detail){
  const request={id:`r${Date.now()}${Math.random().toString(16).slice(2,6)}`,time:new Date().toISOString(),user:currentUser.username,name:currentUser.name||currentUser.username,generation:currentUser.generation||"",type,target,targetId,payload,detail,status:"pending"};
  changeRequests.unshift(request);
  saveCloudState().catch(error=>console.error("保存申请失败",error));
  return request;
}
function renderAuthState(){
  const admin=canEdit();
  const member=currentUser.role==="member";
  $("#userBadge").textContent=admin?`管理员 · ${currentUser.username}`:member?userLine(currentUser):"游客只读";
  $("#userBadge").classList.toggle("admin",admin);
  $("#authBtn").hidden=admin||member;
  $("#logoutBtn").hidden=!(admin||member);
  $("#addRoot").hidden=!canPropose();
  $("#historyBtn").hidden=!(admin||member);
  $("#messageBoardBtn").hidden=!(admin||member);
  $("#historyBtn").textContent=admin?"审核与记录":"我的申请";
  $("#editAnnouncementBtn").hidden=!admin;
  $("#dataPortBtn").hidden=!admin;
}
function renderAccessState(){
  const locked=currentUser.role==="guest";
  document.body.classList.toggle("access-locked",locked);
  $("#accessGate").hidden=!locked;
}

function layout() {
  const pos = {}, unitByPerson = {}, unitsByGen = new Map(), visited = new Set();
  const spouseMap = new Map();
  data.unions.forEach(u => u.partners.forEach(id => {
    if (!spouseMap.has(id)) spouseMap.set(id, []);
    spouseMap.get(id).push(...u.partners.filter(p => p !== id));
  }));
  data.people.forEach(p => {
    if (visited.has(p.id)) return;
    const component=[], queue=[p.id];
    while(queue.length){
      const id=queue.shift();
      if(visited.has(id))continue;
      visited.add(id);
      component.push(id);
      (spouseMap.get(id)||[]).forEach(spouseId=>{
        if(!visited.has(spouseId)&&person(spouseId)?.generation===p.generation)queue.push(spouseId);
      });
    }
    const bloodId=component.find(id=>data.parentLinks.some(l=>l.child===id))
      || component.find(id=>data.parentLinks.some(l=>l.parent===id))
      || component[0];
    const members=[...component].sort((a,b)=>{
      const genderOrder={male:0,female:1};
      const difference=(genderOrder[person(a)?.gender]??2)-(genderOrder[person(b)?.gender]??2);
      if(difference)return difference;
      if(a===bloodId)return -1;
      if(b===bloodId)return 1;
      return Number(a.replace(/\D/g,""))-Number(b.replace(/\D/g,""));
    });
    members.forEach(id => visited.add(id));
    const unit = {id:bloodId,bloodId,members,generation:person(bloodId).generation};
    members.forEach(id => unitByPerson[id] = unit);
    if (!unitsByGen.has(unit.generation)) unitsByGen.set(unit.generation, []);
    unitsByGen.get(unit.generation).push(unit);
  });
  const allUnits = [...unitsByGen.values()].flat();
  allUnits.forEach(unit => {
    unit.memberWidths = unit.members.map(id => isSpouse(id) ? SPOUSE_W : CARD_W);
    unit.width = unit.memberWidths.reduce((sum, width) => sum + width, 0) + (unit.members.length - 1) * SPOUSE_GAP;
    unit.children = [];
    const bloodIndex=unit.members.indexOf(unit.bloodId);
    unit.bloodOffset=unit.memberWidths.slice(0,bloodIndex).reduce((sum,width)=>sum+width+SPOUSE_GAP,0)
      + unit.memberWidths[bloodIndex]/2;
  });
  data.parentLinks.forEach(link => {
    const parentUnit = unitByPerson[link.parent], childUnit = unitByPerson[link.child];
    if (parentUnit && childUnit && parentUnit !== childUnit && !parentUnit.children.includes(childUnit)) {
      parentUnit.children.push(childUnit);
      if(!childUnit.parent)childUnit.parent = parentUnit;
    }
  });
  allUnits.forEach(unit=>unit.children.sort((a,b)=>unitOrder(a)-unitOrder(b)));
  const buildCompactTree=(unit,active=new Set())=>{
    if(active.has(unit)){
      return {placements:new Map([[unit,0]]),left:[-unit.bloodOffset],right:[unit.width-unit.bloodOffset]};
    }
    const nextActive=new Set(active);
    nextActive.add(unit);
    const childLayouts=unit.children.map(child=>buildCompactTree(child,nextActive));
    if(!childLayouts.length){
      return {placements:new Map([[unit,0]]),left:[-unit.bloodOffset],right:[unit.width-unit.bloodOffset]};
    }
    const shifts=[],mergedLeft=[],mergedRight=[];
    childLayouts.forEach((layout,index)=>{
      let shift=0;
      if(index){
        for(let depth=0;depth<Math.min(mergedRight.length,layout.left.length);depth++){
          shift=Math.max(shift,mergedRight[depth]+FAMILY_GAP-layout.left[depth]);
        }
      }
      shifts.push(shift);
      layout.left.forEach((value,depth)=>{
        const shifted=value+shift;
        mergedLeft[depth]=mergedLeft[depth]===undefined?shifted:Math.min(mergedLeft[depth],shifted);
        mergedRight[depth]=mergedRight[depth]===undefined?layout.right[depth]+shift:Math.max(mergedRight[depth],layout.right[depth]+shift);
      });
    });
    const center=(shifts[0]+shifts[shifts.length-1])/2;
    const placements=new Map([[unit,0]]);
    const left=[-unit.bloodOffset],right=[unit.width-unit.bloodOffset];
    childLayouts.forEach((layout,index)=>{
      const shift=shifts[index]-center;
      layout.placements.forEach((value,key)=>placements.set(key,value+shift));
      layout.left.forEach((value,depth)=>{
        const targetDepth=depth+1,shiftedLeft=value+shift,shiftedRight=layout.right[depth]+shift;
        left[targetDepth]=left[targetDepth]===undefined?shiftedLeft:Math.min(left[targetDepth],shiftedLeft);
        right[targetDepth]=right[targetDepth]===undefined?shiftedRight:Math.max(right[targetDepth],shiftedRight);
      });
    });
    return {placements,left,right};
  };
  const roots=allUnits.filter(unit=>!unit.parent).sort((a,b)=>unitOrder(a)-unitOrder(b));
  const forestLayouts=roots.map(root=>buildCompactTree(root));
  const forestLeft=[],forestRight=[];
  let rootCursor=0;
  forestLayouts.forEach((layout,index)=>{
    let shift=0;
    if(index){
      for(let depth=0;depth<Math.min(forestRight.length,layout.left.length);depth++){
        shift=Math.max(shift,forestRight[depth]+FAMILY_GAP*2-layout.left[depth]);
      }
    }
    shift=Math.max(shift,rootCursor-layout.left[0]);
    layout.placements.forEach((value,unit)=>unit.anchor=value+shift);
    layout.left.forEach((value,depth)=>{
      const shiftedLeft=value+shift,shiftedRight=layout.right[depth]+shift;
      forestLeft[depth]=forestLeft[depth]===undefined?shiftedLeft:Math.min(forestLeft[depth],shiftedLeft);
      forestRight[depth]=forestRight[depth]===undefined?shiftedRight:Math.max(forestRight[depth],shiftedRight);
    });
    rootCursor=Math.max(...forestRight)+FAMILY_GAP*2;
  });
  allUnits.forEach(unit=>unit.x=unit.anchor-unit.bloodOffset);
  const minX=Math.min(...allUnits.map(unit=>unit.x));
  const maxX=Math.max(...allUnits.map(unit=>unit.x+unit.width));
  const globalShift=MARGIN-minX;
  allUnits.forEach(unit=>unit.x+=globalShift);
  const contentWidth=Math.max(maxX-minX,1000);
  allUnits.forEach(unit => unit.members.forEach((id, index) => {
    const offset = unit.memberWidths.slice(0,index).reduce((sum,width)=>sum+width+SPOUSE_GAP,0);
    pos[id] = {x: unit.x + offset, y: (unit.generation-1)*ROW_GAP+35, width:unit.memberWidths[index]};
  }));
  const treeWidth = contentWidth + MARGIN * 2;
  const viewportWidth = viewport?.clientWidth || 1280;
  const centerShift = Math.max(0, (viewportWidth / scale - treeWidth) / 2);
  if (centerShift) {
    allUnits.forEach(unit => unit.x += centerShift);
    Object.values(pos).forEach(point => point.x += centerShift);
  }
  const maxWidth = treeWidth + centerShift * 2;
  const height = Math.max(...data.people.map(p=>p.generation),1)*ROW_GAP+100;
  return {pos, unitByPerson, width:maxWidth, height};
}
function isSpouse(id) {
  return data.unions.some(u => u.partners.includes(id))
    && !data.parentLinks.some(l => l.child === id)
    && !data.parentLinks.some(l => l.parent === id);
}
function unitAnchor(unit, pos, edge) {
  const bloodPos = pos[unit.bloodId];
  if (!bloodPos) return null;
  return {
    x: bloodPos.x + bloodPos.width / 2,
    y: edge === "in" ? bloodPos.y : bloodPos.y + CARD_H
  };
}
function unitOrder(unit) {
  const links = unit.members.flatMap(id => data.parentLinks.filter(l => l.child === id));
  const parentNo = links.length ? Number(links[0].parent.replace(/\D/g,"")) : 0;
  const savedOrder=person(unit.bloodId)?.branchOrder;
  const order=Number.isFinite(savedOrder)?savedOrder:Number(unit.id.replace(/\D/g,""));
  return parentNo * 100000 + order;
}
function unitParentKey(unit){
  return unit.members.flatMap(id=>data.parentLinks.filter(link=>link.child===id).map(link=>link.parent)).sort().join("|");
}
function unitParentIds(unit){
  return [...new Set(unit.members.flatMap(id=>data.parentLinks.filter(link=>link.child===id).map(link=>link.parent)))].sort();
}
function canDragSortBranches(){return canEdit()&&!mobileView()}
function canDragBranch(unit,p){return canDragSortBranches()&&unit&&p.id===unit.bloodId&&Boolean(unitParentKey(unit))}
function render() {
  const {pos,unitByPerson,width,height}=layout();
  canvas.style.width=width+"px"; canvas.style.height=height+"px";
  links.setAttribute("width",width); links.setAttribute("height",height); links.setAttribute("viewBox",`0 0 ${width} ${height}`);
  tree.innerHTML=data.people.map(p=>{
    const q=pos[p.id], spouse=isSpouse(p.id), deceased=Boolean(p.deathDate||p.deathUnknown);
    const unit=unitByPerson[p.id], branchDraggable=canDragBranch(unit,p);
    return `<article class="person ${p.gender} ${spouse?"spouse":""} ${deceased?"deceased":""} ${branchDraggable?"branch-draggable":""} ${p.id===selectedId?"selected":""}" data-id="${p.id}" ${branchDraggable?'draggable="true" title="拖动调整同级分支顺序"':""} style="left:${q.x}px;top:${q.y}px">
      <div class="person-top"><span class="person-name">${esc(p.name)}</span>${p.showZi!==false?`<span class="zi-badge">${esc(p.zi||"未")}</span>`:""}</div>
      ${renderPersonTags(p)}
      ${renderPersonTooltip(p)}
    </article>`;
  }).join("");
  let svg="";
  data.unions.forEach(u=>{
    const a=pos[u.partners[0]], b=pos[u.partners[1]]; if(!a||!b)return;
    const left=a.x<b.x?a:b, right=a.x<b.x?b:a;
    svg+=`<line class="marriage-link" x1="${left.x+left.width}" y1="${left.y+CARD_H/2}" x2="${right.x}" y2="${right.y+CARD_H/2}"/>`;
  });
  const groups=new Map();
  data.parentLinks.forEach(l=>{
    const unit=unitByPerson[l.parent]; if(!unit)return;
    if(!groups.has(unit.id))groups.set(unit.id,{unit,kids:new Set()});
    groups.get(unit.id).kids.add(l.child);
  });
  groups.forEach(({unit:parentUnit,kids:kidSet})=>{
    const kids=[...kidSet], parentAnchor=unitAnchor(parentUnit,pos,"out");
    if(!parentAnchor||!kids.length)return;
    const childAnchors=kids.map(id=>unitAnchor(unitByPerson[id],pos,"in")).filter(Boolean);
    if(!childAnchors.length)return;
    const allXs=[parentAnchor.x,...childAnchors.map(anchor=>anchor.x)];
    const min=Math.min(...allXs);
    const max=Math.max(...allXs);
    const firstChildY=Math.min(...childAnchors.map(anchor=>anchor.y));
    const jointY=parentAnchor.y+(firstChildY-parentAnchor.y)/2;
    const parts=[
      `M${parentAnchor.x},${parentAnchor.y} V${jointY}`,
      `M${min},${jointY} H${max}`,
      ...childAnchors.map(anchor=>`M${anchor.x},${jointY} V${anchor.y}`)
    ];
    const d=parts.join(" ");
    svg+=`<path class="blood-link-bg" d="${d}"/><path class="blood-link" d="${d}"/>`;
  });
  links.innerHTML=svg;
  renderRail(pos); applyTransform();
  setupBranchDragSort(unitByPerson);
  document.querySelectorAll(".person").forEach(el=>el.onclick=()=>{if(branchDragSuppressClick){branchDragSuppressClick=false;return}openPerson(el.dataset.id)});
}
function renderPersonTags(p){
  if(p.tagMode==="none")return "";
  const items=(p.tagItems?.length?p.tagItems:[{text:p.tagText,color:p.tagColor}]).filter(item=>item?.text).slice(0,3);
  if(!items.length)return "";
  return `<div class="person-tags">${items.map(item=>`<span class="person-tag" style="background:${safeColor(item.color||p.tagColor)}">${esc(item.text)}</span>`).join("")}</div>`;
}
function renderPersonTooltip(p){
  const rows=[];
  const birth=formatStoredDate(p,"birth");
  const death=formatStoredDate(p,"death");
  if(birth&&birth!=="未填写")rows.push(`<div><b>出生：</b>${esc(birth)}</div>`);
  if(death&&death!=="未填写")rows.push(`<div><b>死亡：</b>${esc(death)}</div>`);
  rows.push(`<div><b>生平：</b>${esc(p.note||"暂无备注")}</div>`);
  return rows.length?`<div class="person-tooltip">${rows.join("")}</div>`:"";
}
function sameSortableBranch(a,b){
  if(!a||!b||a===b)return false;
  const aKey=unitParentKey(a), bKey=unitParentKey(b);
  return Boolean(aKey)&&aKey===bKey&&a.generation===b.generation;
}
function branchContainsUnit(root,target){
  const queue=[...(root?.children||[])], seen=new Set();
  while(queue.length){
    const unit=queue.shift();
    if(!unit||seen.has(unit.id))continue;
    if(unit===target)return true;
    seen.add(unit.id);
    queue.push(...(unit.children||[]));
  }
  return false;
}
function canSwapBranches(a,b){
  return Boolean(a&&b&&a!==b&&unitParentKey(a)&&unitParentKey(b)&&a.generation===b.generation&&!branchContainsUnit(a,b)&&!branchContainsUnit(b,a));
}
function normalizeSiblingBranchOrders(parentUnit, childUnit){
  const parentKey=unitParentKey(childUnit);
  const siblings=(parentUnit?.children||[])
    .filter(unit=>unitParentKey(unit)===parentKey)
    .sort((a,b)=>unitOrder(a)-unitOrder(b));
  siblings.forEach((unit,index)=>{
    const p=person(unit.bloodId);
    if(p&&!Number.isFinite(p.branchOrder))p.branchOrder=(index+1)*10;
  });
}
async function swapBranchOrder(sourceUnit,targetUnit){
  if(!canSwapBranches(sourceUnit,targetUnit))return false;
  normalizeSiblingBranchOrders(sourceUnit.parent,sourceUnit);
  if(sourceUnit.parent!==targetUnit.parent)normalizeSiblingBranchOrders(targetUnit.parent,targetUnit);
  const source=person(sourceUnit.bloodId), target=person(targetUnit.bloodId);
  if(!source||!target)return false;
  const sourceOrder=source.branchOrder, targetOrder=target.branchOrder;
  source.branchOrder=targetOrder;
  target.branchOrder=sourceOrder;
  if(!sameSortableBranch(sourceUnit,targetUnit)){
    const sourceParents=unitParentIds(sourceUnit), targetParents=unitParentIds(targetUnit);
    data.parentLinks=data.parentLinks.filter(link=>link.child!==sourceUnit.bloodId&&link.child!==targetUnit.bloodId);
    targetParents.forEach(parent=>data.parentLinks.push({parent,child:sourceUnit.bloodId}));
    sourceParents.forEach(parent=>data.parentLinks.push({parent,child:targetUnit.bloodId}));
  }
  addHistory("调整排序", `${source.name} / ${target.name}`, "拖拽调换同世代分支顺序");
  render();
  save().catch(error=>console.error("保存分支排序失败",error));
  return true;
}
function setupBranchDragSort(unitByPerson){
  document.querySelectorAll(".branch-draggable").forEach(el=>{
    el.ondragstart=event=>{
      branchDragState={id:el.dataset.id};
      el.classList.add("branch-dragging");
      event.dataTransfer.effectAllowed="move";
      event.dataTransfer.setData("text/plain",el.dataset.id);
    };
    el.ondragover=event=>{
      const sourceUnit=unitByPerson[branchDragState?.id], targetUnit=unitByPerson[el.dataset.id];
      if(canSwapBranches(sourceUnit,targetUnit)){
        event.preventDefault();
        el.classList.add("branch-drop-target");
      }
    };
    el.ondragleave=()=>el.classList.remove("branch-drop-target");
    el.ondrop=async event=>{
      event.preventDefault();
      const sourceUnit=unitByPerson[branchDragState?.id], targetUnit=unitByPerson[el.dataset.id];
      document.querySelectorAll(".branch-drop-target").forEach(item=>item.classList.remove("branch-drop-target"));
      if(await swapBranchOrder(sourceUnit,targetUnit)){
        branchDragSuppressClick=true;
        setTimeout(()=>{branchDragSuppressClick=false},180);
      }
      branchDragState=null;
    };
    el.ondragend=()=>{
      el.classList.remove("branch-dragging");
      document.querySelectorAll(".branch-drop-target").forEach(item=>item.classList.remove("branch-drop-target"));
      branchDragState=null;
    };
  });
}
function renderRail(pos) {
  const gens=[...new Set(data.people.map(p=>p.generation))].sort((a,b)=>a-b);
  $("#generationRail").innerHTML=gens.map(g=>`<div class="gen-tag" style="top:${((g-1)*ROW_GAP+35)*scale+panY}px"><span class="gen-order">第${toChinese(g)}世</span><span class="gen-zi">[<b>${ZI[g]||"未"}</b>]</span></div>`).join("");
}
function toChinese(n){const a=["零","一","二","三","四","五","六","七","八","九"]; return n<10?a[n]:n===10?"十":n<20?"十"+a[n%10]:"二十";}
function safeColor(value){return /^#[0-9a-f]{6}$/i.test(value||"")?value:"#8c2f25";}
function applyTransform(){canvas.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;$("#zoomLabel").textContent=Math.round(scale*100)+"%"; const {pos}=layout();renderRail(pos);}
function mobileView(){return window.matchMedia("(max-width: 800px)").matches}
function resetViewState(){
  if(mobileView()){scale=.46;panX=46;panY=32}
  else{scale=.72;panX=95;panY=50}
}
function defaultFocusPersonId(){
  if(currentUser.role==="member"&&currentUser.personId&&person(currentUser.personId))return currentUser.personId;
  return data.people.find(p=>p.name==="启相公")?.id || data.people[0]?.id || "";
}
function focusPersonAtTop(id=defaultFocusPersonId()){
  const target=person(id);
  if(!target||!viewport)return;
  const {pos}=layout();
  const point=pos[id];
  if(!point)return;
  const topOffset=mobileView()?36:54;
  panX=(viewport.clientWidth/2)-((point.x+point.width/2)*scale);
  panY=topOffset-(point.y*scale);
  applyTransform();
}
function scheduleFocusPersonAtTop(id=defaultFocusPersonId()){
  requestAnimationFrame(()=>focusPersonAtTop(id));
}
function tagTextForForm(p){
  return p.tagItems?.length?p.tagItems:splitTagText(p.tagText).map(text=>({text,color:p.tagColor}));
}
function collectTagData(){
  const tagItems=[...document.querySelectorAll(".tag-text")].map(input=>{
    const index=input.dataset.tagIndex;
    const text=input.value.trim();
    const color=safeColor(document.querySelector(`.tag-color[data-tag-index="${index}"]`)?.value);
    return text?{text,color}:null;
  }).filter(Boolean).slice(0,3);
  const tagMode=tagItems.length>1?"multiple":tagItems.length===1?"single":"none";
  const tagColor=tagItems[0]?.color||"#8c2f25";
  return {tagMode,tagText:tagItems.map(item=>item.text).join("、"),tagItems,tagColor};
}
function updateDateHints(){
  const birthUnknown=$("#personBirthUnknown").checked;
  const calendar=dateCalendarValue();
  const birth=birthUnknown?{raw:""}:parseDateByCalendar($("#personBirthDate").value,calendar);
  const deathUnknown=$("#personDeathUnknown").checked;
  const death=deathUnknown?{raw:""}:parseDateByCalendar($("#personDeathDate").value,calendar);
  $("#birthDateHint").textContent=birthUnknown?"出生时间记录为：不详":dateHint(birth,"出生时间");
  $("#birthDateHint").classList.toggle("error",Boolean(birth.error));
  $("#deathDateHint").textContent=deathUnknown?"死亡时间记录为：不详":dateHint(death,"死亡时间");
  $("#deathDateHint").classList.toggle("error",Boolean(death.error));
}
function formValuesForSnapshot(){
  return {
    id:$("#personId").value,
    name:$("#personName").value,
    gender:$("#personGender").value,
    generation:$("#personGeneration").value,
    zi:$("#personZi").value,
    showZi:$("#personShowZi").checked,
    tagItems:[...document.querySelectorAll(".tag-text")].map(input=>{
      const index=input.dataset.tagIndex;
      return {text:input.value,color:document.querySelector(`.tag-color[data-tag-index="${index}"]`)?.value};
    }),
    dateCalendar:dateCalendarValue(),
    birthCalendar:dateCalendarValue(),
    birthDate:$("#personBirthDate").value,
    birthUnknown:$("#personBirthUnknown").checked,
    deathCalendar:dateCalendarValue(),
    deathDate:$("#personDeathDate").value,
    deathUnknown:$("#personDeathUnknown").checked,
    manualFatherName:$("#personFatherName")?.value||"",
    manualMotherName:$("#personMotherName")?.value||"",
    note:$("#personNote").value
  };
}
function markPersonFormClean(){personFormSnapshot=JSON.stringify(formValuesForSnapshot())}
function personFormDirty(){
  return canModifyPerson(selectedId)&&$("#drawer").classList.contains("open")&&personFormSnapshot&&JSON.stringify(formValuesForSnapshot())!==personFormSnapshot;
}
function summarizeChanges(before,proposed,labels){
  return Object.keys(labels).filter(key=>JSON.stringify(before[key]??"")!==JSON.stringify(proposed[key]??""))
    .map(key=>`${labels[key]}：${formatChangeValue(before[key])} → ${formatChangeValue(proposed[key])}`);
}
function formatChangeValue(value){
  if(Array.isArray(value))return value.map(item=>item.text||item).join("、")||"空";
  if(typeof value==="boolean")return value?"是":"否";
  return value||"空";
}
function buildPersonProposal(p){
  const birthUnknown=$("#personBirthUnknown").checked;
  const calendar=dateCalendarValue();
  const birthInfo=birthUnknown?{raw:"",calendar:"",solar:"",lunar:""}:parseDateByCalendar($("#personBirthDate").value,calendar);
  const deathUnknown=$("#personDeathUnknown").checked;
  const deathInfo=deathUnknown?{raw:"",calendar:"",solar:"",lunar:""}:parseDateByCalendar($("#personDeathDate").value,calendar);
  const tagData=collectTagData();
  return {
    ...p,
    name:$("#personName").value.trim(),
    gender:$("#personGender").value,
    generation:+$("#personGeneration").value,
    zi:$("#personZi").value.trim(),
    showZi:$("#personShowZi").checked,
    ...tagData,
    birthDate:birthInfo.raw,
    birthCalendar:birthInfo.calendar,
    birthSolar:birthInfo.solar,
    birthLunar:birthInfo.lunar,
    birthUnknown,
    deathDate:deathInfo.raw,
    deathCalendar:deathInfo.calendar,
    deathSolar:deathInfo.solar,
    deathLunar:deathInfo.lunar,
    deathUnknown,
    manualFatherName:$("#personFatherName")?.value.trim()||"",
    manualMotherName:$("#personMotherName")?.value.trim()||"",
    note:$("#personNote").value.trim()
  };
}
async function submitPersonForm(options={}){
  const {silent=false}=options;
  if(!requireAccount())return false;
  const form=$("#personForm");
  if(!form.reportValidity())return false;
  const p=person($("#personId").value);
  if(!p)return false;
  if(!canModifyPerson(p.id)){await showAlert("当前账号没有此人物的编辑权限。");return false}
  const before={...p,tagItems:[...(p.tagItems||[])]};
  const proposed=buildPersonProposal(p);
  const labels={name:"姓名",gender:"性别",generation:"世代",zi:"字辈",showZi:"字辈显示",tagMode:"标签模式",tagText:"标签",tagItems:"标签内容",tagColor:"标签颜色",birthDate:"出生时间",birthSolar:"出生阳历",birthLunar:"出生农历",birthUnknown:"出生不详",deathDate:"死亡时间",deathSolar:"死亡阳历",deathLunar:"死亡农历",deathUnknown:"死亡不详",manualFatherName:"父亲姓名",manualMotherName:"母亲姓名",note:"备注"};
  const changes=summarizeChanges(before,proposed,labels);
  if(!changes.length){markPersonFormClean();return true}
  if(canEdit()){
    Object.assign(p,proposed);
    normalizePerson(p);
    addHistory("编辑人物",p.name,changes.join("；"));
    await save();
    markPersonFormClean();
    if(!silent){render();await openPerson(p.id)}
    return true;
  }
  addRequest("editPerson",p.name,p.id,normalizePerson({...proposed}),changes.join("；"));
  markPersonFormClean();
  if(!silent){await closeDrawer(true);await showAlert("修改申请已提交，管理员审核通过后生效。")}
  return true;
}
async function confirmUnsavedPersonForm(){
  if(!personFormDirty())return true;
  if(await showConfirm("人物档案有未保存修改，是否保存？\n确定：保存修改\n取消：放弃修改","未保存修改")){
    return await submitPersonForm({silent:true});
  }
  return true;
}
function setupTagEditor(){
  document.querySelectorAll(".tag-color").forEach(select=>{
    select.innerHTML=TAG_COLORS.map(([value,label])=>`<option value="${value}">${label}</option>`).join("");
    select.onchange=()=>paintTagColorSelect(select);
    paintTagColorSelect(select);
  });
}
function paintTagColorSelect(select){
  const color=safeColor(select.value);
  select.value=color;
  select.style.background=color;
}
function setTagEditorItems(items=[]){
  document.querySelectorAll(".tag-text").forEach(input=>{
    const index=Number(input.dataset.tagIndex);
    input.value=items[index]?.text||"";
    input.disabled=!canModifyPerson($("#personId").value);
  });
  document.querySelectorAll(".tag-color").forEach(select=>{
    const index=Number(select.dataset.tagIndex);
    select.value=safeColor(items[index]?.color||"#8c2f25");
    select.disabled=!canModifyPerson($("#personId").value);
    paintTagColorSelect(select);
  });
}
function relatedSpouses(id){
  return [...new Set(data.unions.filter(union=>union.partners.includes(id)).flatMap(union=>union.partners.filter(personId=>personId!==id)))]
    .map(person)
    .filter(Boolean);
}
function spouseFamilyMembers(id){
  const base=person(id);
  if(!base)return [];
  const members=[], queue=[id], visited=new Set();
  while(queue.length){
    const currentId=queue.shift();
    if(visited.has(currentId))continue;
    visited.add(currentId);
    if(currentId!==id)members.push(currentId);
    data.unions.filter(union=>union.partners.includes(currentId)).forEach(union=>{
      union.partners.forEach(partnerId=>{
        if(!visited.has(partnerId)&&person(partnerId)?.generation===base.generation)queue.push(partnerId);
      });
    });
  }
  return members.map(person).filter(Boolean);
}
function parentDisplayInfo(child){
  const directParents=[...new Set(data.parentLinks.filter(link=>link.child===child.id).map(link=>link.parent))]
    .map(person)
    .filter(Boolean);
  const directFathers=directParents.filter(parent=>parent.gender==="male");
  const linkedMothers=directParents.filter(parent=>parent.gender==="female");
  const inferredFatherCandidates=linkedMothers.flatMap(mother=>{
    const family=spouseFamilyMembers(mother.id);
    const men=family.filter(member=>member.gender==="male");
    return men.length?men:family;
  });
  const fathers=directFathers.length
    ? directFathers
    : [...new Map(inferredFatherCandidates.map(father=>[father.id,father])).values()].slice(0,1);
  const spouseCandidates=fathers.flatMap(father=>spouseFamilyMembers(father.id));
  const fatherIds=new Set(fathers.map(father=>father.id));
  const motherCandidates=[...new Map([...linkedMothers,...spouseCandidates]
    .filter(mother=>!fatherIds.has(mother.id))
    .map(mother=>[mother.id,mother])).values()];
  const selectedMother=motherCandidates.find(mother=>mother.id===child.displayMotherId)
    || linkedMothers[0]
    || (motherCandidates.length===1?motherCandidates[0]:null);
  return {fathers,motherCandidates,selectedMother};
}
function displayedChildrenForPerson(id){
  const direct=new Set(data.parentLinks.filter(link=>link.parent===id).map(link=>link.child));
  return data.people.filter(child=>{
    if(child.id===id)return false;
    if(direct.has(child.id))return true;
    const info=parentDisplayInfo(child);
    return info.fathers.some(father=>father.id===id)||info.selectedMother?.id===id;
  });
}
function renderRelationBox(id){
  const p=person(id);
  if(!p)return;
  const {fathers,motherCandidates,selectedMother}=parentDisplayInfo(p);
  const children=displayedChildrenForPerson(id).map(child=>child.name);
  const spouses=relatedSpouses(id).map(spouse=>spouse.name);
  const relationButtons=["parent","spouse","child"].filter(type=>canAddRelationForPerson(id,type));
  const spouseRecord=isSpouse(id);
  const fatherText=p.manualFatherName||fathers.map(father=>father.name).join("、")||"未记录";
  const motherText=p.manualMotherName||selectedMother?.name||"未记录";
  const manualParentEditor=spouseRecord&&canModifyPerson(id)?`<div class="manual-parent-editor"><label>父亲姓名<input id="personFatherName" maxlength="20" value="${esc(p.manualFatherName)}" placeholder="手动填写"></label><label>母亲姓名<input id="personMotherName" maxlength="20" value="${esc(p.manualMotherName)}" placeholder="手动填写"></label></div>`:"";
  const motherSelector=canEdit()&&fathers.length?`<label class="mother-select-row"><span>展示母亲</span><select id="displayMotherSelect">
    <option value="">${motherCandidates.length?"请选择母亲":"父亲暂无配偶"}</option>
    ${motherCandidates.map(mother=>`<option value="${esc(mother.id)}" ${mother.id===(p.displayMotherId||selectedMother?.id)?"selected":""}>${esc(mother.name)}</option>`).join("")}
  </select></label>`:"";
  $("#relationBox").innerHTML=`<h3>亲属关系</h3>${relationButtons.length?`<div class="relation-actions">
    ${relationButtons.map(type=>`<button type="button" data-rel="${type}">＋ ${type==="parent"?"父母":type==="spouse"?"配偶":"子女"}</button>`).join("")}</div>`:""}
    <div class="relation-list"><span>父亲：${esc(fatherText)}　母亲：${esc(motherText)}</span><span>配偶：${esc(spouses.join("、")||"未记录")}</span><span class="relation-children">子女：${esc(children.join("、")||"未记录")}</span></div>
    ${manualParentEditor}${motherSelector}`;
  document.querySelectorAll("[data-rel]").forEach(button=>button.onclick=()=>openRelation(id,button.dataset.rel));
  const motherSelect=$("#displayMotherSelect");
  if(motherSelect)motherSelect.onchange=()=>{
    p.displayMotherId=motherSelect.value;
    const mother=person(p.displayMotherId);
    addHistory("设置母亲",p.name,`展示母亲：${mother?.name||"未指定"}`);
    renderRelationBox(id);
    save().catch(error=>console.error("保存母亲信息失败",error));
  };
}
async function openPerson(id){
  if(id!==selectedId&&!(await confirmUnsavedPersonForm()))return;
  selectedId=id; const p=person(id); if(!p)return;
  const canModify=canModifyPerson(id);
  $("#personId").value=p.id;$("#personName").value=p.name;$("#personGender").value=p.gender;
  $("#personGeneration").value=p.generation;$("#personZi").value=p.zi||"";$("#personShowZi").checked=p.showZi!==false;
  syncPersonFormPlaceholders(canModify);
  const dateCalendar=p.birthCalendar==="lunar"||p.deathCalendar==="lunar"?"lunar":"solar";
  setTagEditorItems(tagTextForForm(p));setDateCalendarValue(dateCalendar);$("#personDateCalendarToggle").disabled=!canModify;$("#personBirthDate").value=canModify?(p.birthDate||""):dateFieldDisplayValue(p,"birth");$("#personBirthUnknown").checked=Boolean(p.birthUnknown);$("#personBirthDate").disabled=Boolean(p.birthUnknown)||!canModify;$("#personDeathDate").value=canModify?(p.deathDate||""):dateFieldDisplayValue(p,"death");$("#personDeathUnknown").checked=Boolean(p.deathUnknown);$("#personDeathDate").disabled=Boolean(p.deathUnknown)||!canModify;$("#personNote").value=p.note||"";
  $("#drawerTitle").textContent="";
  renderRelationBox(id);
  $("#personForm").querySelectorAll("input,select,textarea").forEach(control=>control.disabled=!canModify);
  $("#personForm .switch-row").hidden=!canModify;
  $("#personForm .tag-editor").hidden=!canModify;
  $("#personForm .date-options-row").hidden=!canModify;
  document.querySelectorAll("#personForm .date-hint").forEach(row=>row.hidden=!canModify);
  $("#personBirthDate").disabled=!canModify||$("#personBirthUnknown").checked;
  $("#personDeathDate").disabled=!canModify||$("#personDeathUnknown").checked;
  setTagEditorItems(tagTextForForm(p));
  updateDateHints();
  $("#personForm").querySelector(".form-actions").hidden=false;
  $("#deletePerson").disabled=!canModify;
  $("#personForm button[type='submit']").disabled=!canModify;
  $("#deletePerson").textContent=canEdit()?"删除人物":"申请删除";
  $("#personForm button[type='submit']").textContent=canEdit()?"保存修改":"提交修改申请";
  $("#drawer").classList.toggle("readonly",!canModify);
  $("#drawer").classList.add("open");$("#modalBackdrop").classList.add("show");$("#drawer").setAttribute("aria-hidden","false");markPersonFormClean();render();
}
async function closeDrawer(force=false){if(!force&&!(await confirmUnsavedPersonForm()))return false;selectedId=null;personFormSnapshot="";$("#drawer").classList.remove("open");$("#modalBackdrop").classList.remove("show");$("#drawer").setAttribute("aria-hidden","true");render();return true;}
function openRelation(id,type){
  if(!requireAccount())return;
  if(!canAddRelationForPerson(id,type)){showAlert("当前账号只能为本人新增配偶或子女申请。");return}
  const base=person(id), labels={parent:"新增父母",spouse:"新增配偶",child:"新增子女"};
  $("#relationTitle").textContent=labels[type];$("#relationPersonId").value=id;$("#relationType").value=type;
  $("#relationName").value="";$("#relationNote").value="";
  $("#relationGender").value=type==="spouse"?(base.gender==="male"?"female":"male"):"male";
  $("#relationZi").value=type==="child"?(ZI[base.generation+1]||""):type==="parent"?(ZI[base.generation-1]||""):(base.zi||"");
  $("#relationDialog").showModal();
}
function applyRelationChange(payload){
  const base=person(payload.baseId),newPerson={...payload.newPerson};
  if(!base)return false;
  if(data.people.some(item=>item.id===newPerson.id))newPerson.id=`p${Date.now()}${Math.random().toString(16).slice(2,5)}`;
  data.people.push(newPerson);
  if(payload.type==="spouse")data.unions.push({id:`u${Date.now()}${Math.random().toString(16).slice(2,5)}`,partners:[base.id,newPerson.id]});
  else if(payload.type==="parent")data.parentLinks.push({parent:newPerson.id,child:base.id});
  else data.parentLinks.push({parent:base.id,child:newPerson.id});
  return true;
}
function applyDeletePerson(id){
  data.people=data.people.filter(item=>item.id!==id);
  data.unions=data.unions.filter(union=>!union.partners.includes(id));
  data.parentLinks=data.parentLinks.filter(link=>link.parent!==id&&link.child!==id);
}
function applyChangeRequest(request){
  if(request.type==="editPerson"){
    const target=person(request.targetId);
    if(!target)return false;
    Object.assign(target,request.payload);
  }else if(request.type==="addRelation"){
    if(!applyRelationChange(request.payload))return false;
  }else if(request.type==="deletePerson"){
    if(!person(request.targetId))return false;
    applyDeletePerson(request.targetId);
  }else if(request.type==="addRoot"){
    const newPerson={...request.payload};
    if(data.people.some(item=>item.id===newPerson.id))newPerson.id=`p${Date.now()}${Math.random().toString(16).slice(2,5)}`;
    data.people.push(newPerson);
  }else return false;
  return true;
}
$("#personForm").onsubmit=async e=>{e.preventDefault();await submitPersonForm()};
$("#relationForm").onsubmit=async e=>{
  e.preventDefault(); if(e.submitter?.value==="cancel"||!requireAccount())return;
  const base=person($("#relationPersonId").value),type=$("#relationType").value,id=`p${Date.now()}`;
  const generation=type==="parent"?base.generation-1:type==="child"?base.generation+1:base.generation;
  const newPerson=createPersonRecord({id,name:$("#relationName").value.trim(),gender:$("#relationGender").value,generation,zi:$("#relationZi").value.trim(),note:$("#relationNote").value.trim(),showZi:type!=="spouse"});
  if(canEdit()){applyRelationChange({baseId:base.id,type,newPerson});addHistory(type==="spouse"?"新增配偶":type==="parent"?"新增父母":"新增子女",newPerson.name,`与 ${base.name} 建立关系`);await save();$("#relationDialog").close();render();await openPerson(base.id)}
  else{addRequest("addRelation",newPerson.name,base.id,{baseId:base.id,type,newPerson},`申请与 ${base.name} 建立${type==="spouse"?"配偶":type==="parent"?"父母":"子女"}关系`);$("#relationDialog").close();await closeDrawer(true);await showAlert("亲属关系申请已提交，管理员审核通过后生效。")}
};
$("#deletePerson").onclick=async()=>{if(!requireAccount())return;const id=$("#personId").value,p=person(id);if(!p)return;if(!canModifyPerson(id)){await showAlert("当前账号没有此人物的删除申请权限。");return}if(!(await showConfirm(canEdit()?`确定删除“${p.name}”及其全部关系吗？`:`确定提交删除“${p.name}”的申请吗？`,"删除人物")))return;if(canEdit()){applyDeletePerson(id);addHistory("删除人物",p.name,"删除人物及其全部亲属关系");await save();await closeDrawer(true)}else{addRequest("deletePerson",p.name,id,{},"申请删除人物及其全部亲属关系");await closeDrawer(true);await showAlert("删除申请已提交，管理员审核通过后生效。")}};
$("#addRoot").onclick=async()=>{if(!requireAccount())return;const newPerson=createPersonRecord({id:`p${Date.now()}`,name:"新族人",gender:"male",generation:1,zi:"启",showZi:true});if(canEdit()){data.people.push(newPerson);addHistory("新增人物","新族人","新增独立族人");await save();render();await openPerson(newPerson.id)}else{addRequest("addRoot","新族人","",newPerson,"申请新增独立族人");await showAlert("新增人物申请已提交，管理员审核通过后生效。")}};
$("#closeDrawer").onclick=()=>closeDrawer();$("#modalBackdrop").onclick=()=>closeDrawer();
$("#personBirthUnknown").onchange=()=>{
  $("#personBirthDate").disabled=$("#personBirthUnknown").checked||!canModifyPerson(selectedId);
  if($("#personBirthUnknown").checked)$("#personBirthDate").value="";
  updateDateHints();
};
$("#personDeathUnknown").onchange=()=>{
  $("#personDeathDate").disabled=$("#personDeathUnknown").checked||!canModifyPerson(selectedId);
  if($("#personDeathUnknown").checked)$("#personDeathDate").value="";
  updateDateHints();
};
$("#personBirthDate").oninput=updateDateHints;
$("#personDeathDate").oninput=updateDateHints;
$("#personDateCalendarToggle").onchange=updateDateHints;
$("#zoomIn").onclick=()=>{scale=Math.min(2,scale+.1);applyTransform()};$("#zoomOut").onclick=()=>{scale=Math.max(.3,scale-.1);applyTransform()};
$("#resetView").onclick=()=>{resetViewState();focusPersonAtTop()};
$("#searchInput").oninput=e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll(".person").forEach(el=>{const hit=!q||person(el.dataset.id).name.toLowerCase().includes(q);el.classList.toggle("search-dim",!!q&&!hit);el.classList.toggle("search-hit",!!q&&hit);});};
viewport.addEventListener("wheel",e=>{e.preventDefault();const rect=viewport.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top,old=scale;scale=Math.max(.28,Math.min(2,scale*(e.deltaY>0?.9:1.1)));panX=mx-(mx-panX)*(scale/old);panY=my-(my-panY)*(scale/old);applyTransform();},{passive:false});
viewport.onmousedown=e=>{if(e.button===1||(e.button===0&&spaceDown)){e.preventDefault();isPanning=true;start={x:e.clientX,y:e.clientY,px:panX,py:panY};viewport.classList.add("panning");}};
window.onmousemove=e=>{if(isPanning){panX=start.px+e.clientX-start.x;panY=start.py+e.clientY-start.y;applyTransform();}};
window.onmouseup=()=>{isPanning=false;viewport.classList.remove("panning")};
window.onkeydown=e=>{if(e.code==="Space"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();spaceDown=true;viewport.classList.add("space-ready");}};
window.onkeyup=e=>{if(e.code==="Space"){spaceDown=false;viewport.classList.remove("space-ready")}};
function setupMobileMenu(){
  const button=$("#mobileMenuBtn"), toolbar=document.querySelector(".toolbar");
  if(!button||!toolbar)return;
  const close=()=>{toolbar.classList.remove("menu-open");document.body.classList.remove("mobile-menu-open");button.setAttribute("aria-expanded","false")};
  button.onclick=event=>{event.stopPropagation();const open=!toolbar.classList.contains("menu-open");toolbar.classList.toggle("menu-open",open);document.body.classList.toggle("mobile-menu-open",open);button.setAttribute("aria-expanded",String(open))};
  toolbar.addEventListener("click",event=>{if(event.target.closest("button:not(#mobileMenuBtn)"))close()});
  document.addEventListener("click",event=>{if(!toolbar.contains(event.target))close()});
  window.addEventListener("resize",close);
}
function touchDistance(a,b){return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)}
function touchCenter(a,b){return {x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2}}
viewport.addEventListener("touchstart",event=>{
  if(!mobileView()||event.target.closest(".person, button, input, select, textarea, dialog, .drawer"))return;
  if(event.touches.length===1){
    const touch=event.touches[0];
    touchState={mode:"pan",x:touch.clientX,y:touch.clientY,px:panX,py:panY};
  }else if(event.touches.length===2){
    const [a,b]=event.touches, center=touchCenter(a,b);
    touchState={mode:"pinch",distance:touchDistance(a,b),scale,panX,panY,cx:center.x,cy:center.y};
  }
},{passive:false});
viewport.addEventListener("touchmove",event=>{
  if(!touchState)return;
  event.preventDefault();
  if(touchState.mode==="pan"&&event.touches.length===1){
    const touch=event.touches[0];
    panX=touchState.px+touch.clientX-touchState.x;
    panY=touchState.py+touch.clientY-touchState.y;
    applyTransform();
  }else if(touchState.mode==="pinch"&&event.touches.length===2){
    const [a,b]=event.touches, rect=viewport.getBoundingClientRect(), center=touchCenter(a,b);
    const old=touchState.scale, next=Math.max(.26,Math.min(2,touchState.scale*(touchDistance(a,b)/touchState.distance)));
    const mx=center.x-rect.left, my=center.y-rect.top;
    scale=next;
    panX=mx-(touchState.cx-rect.left-touchState.panX)*(next/old);
    panY=my-(touchState.cy-rect.top-touchState.panY)*(next/old);
    applyTransform();
  }
},{passive:false});
viewport.addEventListener("touchend",event=>{if(!event.touches?.length)touchState=null},{passive:true});
function setupAccessWaveCanvas(){
  const gate=$("#accessGate"), canvas=$("#accessWaveCanvas"), ctx=canvas?.getContext("2d");
  if(!gate||!canvas||!ctx)return;
  const desktop=window.matchMedia("(min-width: 801px)");
  let width=0,height=0,waves=[],lastTime=performance.now(),nextAutoWave=0;
  function resize(){
    const rect=gate.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);
    width=Math.max(1,rect.width);height=Math.max(1,rect.height);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
  }
  class AccessWave{
    constructor(x,y,accent=false){this.x=x;this.y=y;this.radius=8;this.maxRadius=Math.max(260,Math.min(520,Math.max(width,height)*.34));this.alpha=.62;this.speed=44;this.accent=accent}
    update(delta){this.radius+=this.speed*delta;this.alpha=Math.max(0,.62*(1-this.radius/this.maxRadius))}
    draw(){
      for(let ring=0;ring<3;ring++){
        const radius=this.radius-ring*18;if(radius<=0)continue;
        ctx.beginPath();ctx.ellipse(this.x,this.y,radius,radius*.34,0,0,Math.PI*2);
        const alpha=this.alpha*(1-ring*.22);
        ctx.strokeStyle=this.accent?`rgba(190,92,76,${alpha})`:`rgba(255,255,255,${alpha})`;
        ctx.lineWidth=ring===0?1.8:1;ctx.stroke();
      }
    }
  }
  const addWave=(x,y,accent=false)=>waves.push(new AccessWave(x,y,accent));
  gate.addEventListener("pointerdown",event=>{
    if(!desktop.matches||event.target.closest("button"))return;
    const rect=gate.getBoundingClientRect();addWave(event.clientX-rect.left,event.clientY-rect.top,true);
  });
  window.addEventListener("resize",resize,{passive:true});
  desktop.addEventListener?.("change",()=>{waves=[];resize()});
  resize();
  function animate(now){
    const active=desktop.matches&&!gate.hidden&&document.visibilityState==="visible";
    const delta=Math.min(.05,(now-lastTime)/1000);lastTime=now;
    ctx.clearRect(0,0,width,height);
    if(active){
      if(now>=nextAutoWave){addWave(width*(.12+Math.random()*.76),height*(.38+Math.random()*.52));nextAutoWave=now+1300+Math.random()*900}
      for(let index=waves.length-1;index>=0;index--){const wave=waves[index];wave.update(delta);wave.draw();if(wave.alpha<=0)waves.splice(index,1)}
    }else waves=[];
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
async function apiJson(url,options={}){
  let response;
  try{response=await fetch(url,{credentials:"include",...options})}
  catch{throw new Error("网络连接失败，请检查网络后重试")}
  const text=await response.text();
  let result={};
  try{result=text?JSON.parse(text):{}}
  catch{throw new Error(`服务器响应异常（HTTP ${response.status}）`)}
  if(!response.ok)throw new Error(result.error||`请求失败（HTTP ${response.status}）`);
  return result;
}
function setAuthMessage(id,message,type=""){
  const target=$(id);target.textContent=message;target.classList.toggle("success",type==="success");target.classList.toggle("pending",type==="pending");
}
function setupPasswordToggles(){
  document.querySelectorAll("[data-password-toggle]").forEach(button=>button.onclick=()=>{
    const input=$(`#${button.dataset.passwordToggle}`),visible=input.type==="text";
    input.type=visible?"password":"text";button.classList.toggle("visible",!visible);
    button.setAttribute("aria-label",visible?"显示密码":"隐藏密码");button.title=visible?"显示密码":"隐藏密码";
  });
}
function setAuthTab(mode){
  const registerMode=mode==="register";
  $("#loginForm").hidden=registerMode;
  $("#registerForm").hidden=!registerMode;
  $("#loginTab").classList.toggle("active",!registerMode);
  $("#registerTab").classList.toggle("active",registerMode);
  $("#loginTab").setAttribute("aria-selected",String(!registerMode));
  $("#registerTab").setAttribute("aria-selected",String(registerMode));
  setAuthMessage("#loginMessage","");
  setAuthMessage("#registerMessage","");
}
$("#authBtn").onclick=()=>{setAuthTab("login");$("#authDialog").showModal()};
$("#enterFamilyTree").onclick=()=>{setAuthTab("login");$("#authDialog").showModal()};
$("#loginTab").onclick=()=>setAuthTab("login");
$("#registerTab").onclick=()=>setAuthTab("register");
$("#closeAuth").onclick=()=>$("#authDialog").close();
$("#logoutBtn").onclick=async()=>{
  if(!(await confirmUnsavedPersonForm()))return;
  localStorage.removeItem(SESSION_KEY);
  fetch("/api/auth",{method:"POST",credentials:"include",headers:{"content-type":"application/json"},body:JSON.stringify({action:"logout"})}).catch(()=>{});
  currentUser={username:"游客",role:"guest"};
  await closeDrawer(true);
  renderAuthState();
  renderAccessState();
  scheduleFocusPersonAtTop();
};
function setupRegisterOptions(){
  $("#registerGeneration").innerHTML=`<option value="">请选择世代</option>${[14,15,16].map(generation=>`<option value="${generation}">第${toChinese(generation)}世 [${ZI[generation]||"未定"}]字辈</option>`).join("")}`;
}
$("#loginForm").onsubmit=async e=>{
  e.preventDefault();
  const submit=e.submitter||$("#loginForm button[type='submit']"),original=submit.textContent;submit.disabled=true;submit.textContent="正在登录…";setAuthMessage("#loginMessage","正在验证账号…","pending");
  try{
    const username=$("#loginUsername").value.trim(),result=await apiJson("/api/auth",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"login",username,password:$("#loginPassword").value})});
    localStorage.setItem(SESSION_KEY,result.user.username);await loadCloudState();
    setAuthMessage("#loginMessage","登录成功，正在进入族谱…","success");$("#authDialog").close();$("#loginForm").reset();renderAuthState();renderAccessState();render();scheduleFocusPersonAtTop();await showAlert("登录成功，已进入族谱。","登录成功");
  }catch(error){setAuthMessage("#loginMessage",error.message||"登录失败")}
  finally{submit.disabled=false;submit.textContent=original}
};
$("#registerForm").onsubmit=async e=>{
  e.preventDefault();
  const name=$("#registerName").value.trim(),generation=+$("#registerGeneration").value,password=$("#registerPassword").value,confirmPassword=$("#registerConfirm").value;
  if(![14,15,16].includes(generation)){setAuthMessage("#registerMessage","请选择第十四至第十六世");return}
  if(name==="admin123"){setAuthMessage("#registerMessage","该账号为系统管理员账号，不可注册");return}
  if(password!==confirmPassword){setAuthMessage("#registerMessage","两次输入的密码不一致");return}
  const submit=e.submitter||$("#registerSubmit"),original=submit.textContent;submit.disabled=true;submit.textContent="正在注册…";setAuthMessage("#registerMessage","正在核对族谱姓名与世代…","pending");
  try{
    const result=await apiJson("/api/auth",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"register",name,generation,password})});
    if(result.status==="approved"){
      const loginResult=await apiJson("/api/auth",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"login",username:name,password})});
      localStorage.setItem(SESSION_KEY,loginResult.user.username);await loadCloudState();setAuthMessage("#registerMessage","注册成功，正在自动登录…","success");$("#registerForm").reset();$("#authDialog").close();renderAuthState();renderAccessState();render();scheduleFocusPersonAtTop();await showAlert("注册成功并已自动登录，现已进入族谱。","注册成功");
    }else{setAuthMessage("#registerMessage","注册申请已提交，正在等待管理员审核。审核通过后即可登录。","pending");$("#registerPassword").value="";$("#registerConfirm").value=""}
  }catch(error){setAuthMessage("#registerMessage",error.message||"注册失败，请稍后重试")}
  finally{submit.disabled=false;submit.textContent=original}
};
function historyDateRange(){
  const start=$("#historyStartDate")?.value;
  const end=$("#historyEndDate")?.value;
  const startTime=start?new Date(`${start}T00:00:00`).getTime():-Infinity;
  const endTime=end?new Date(`${end}T23:59:59`).getTime():Infinity;
  return {startTime,endTime};
}
function inHistoryDateRange(item){
  const {startTime,endTime}=historyDateRange();
  const time=new Date(item.time).getTime();
  return time>=startTime&&time<=endTime;
}
function paginate(items,page){
  const totalPages=Math.max(1,Math.ceil(items.length/HISTORY_PAGE_SIZE));
  const safePage=Math.min(Math.max(1,page),totalPages);
  return {items:items.slice((safePage-1)*HISTORY_PAGE_SIZE,safePage*HISTORY_PAGE_SIZE),page:safePage,totalPages};
}
function renderPager(id,page,totalPages,type){
  const target=$(id);
  if(!target)return;
  target.innerHTML=totalPages>1?`<button class="ghost-btn" data-page="${type}" data-step="-1" ${page<=1?"disabled":""}>上一页</button><span>第 ${page} / ${totalPages} 页</span><button class="ghost-btn" data-page="${type}" data-step="1" ${page>=totalPages?"disabled":""}>下一页</button>`:"";
}
function renderHistory(){
  const visibleRequests=(canEdit()?changeRequests:changeRequests.filter(request=>request.user===currentUser.username)).filter(inHistoryDateRange);
  const visibleHistory=(canEdit()?historyRecords:historyRecords.filter(record=>record.user===currentUser.username)).filter(inHistoryDateRange);
  const requestSlice=paginate(visibleRequests,requestPage);
  const historySlice=paginate(visibleHistory,historyPage);
  requestPage=requestSlice.page; historyPage=historySlice.page;
  $("#historyTitle").textContent=canEdit()?"申请审核与修改记录":"我的改动申请";
  $("#requestBody").innerHTML=requestSlice.items.length?requestSlice.items.map(request=>`<tr>
    <td>${esc(new Date(request.time).toLocaleString("zh-CN",{hour12:false}))}</td>
    <td>${esc(request.name)}${request.generation?` · 第${toChinese(+request.generation)}世`:""}</td>
    <td><strong>${esc(request.target)}</strong><br>${esc(request.detail)}</td>
    <td><span class="status-tag ${request.status}">${request.status==="pending"?"待审核":request.status==="approved"?"已通过":"已驳回"}</span></td>
    <td><span class="review-actions">${canEdit()&&request.status==="pending"?`<button class="primary-btn" data-review="approve" data-id="${request.id}">通过</button><button class="danger-btn" data-review="reject" data-id="${request.id}">驳回</button>`:""}${canEdit()?`<button class="danger-btn" data-delete-request="${request.id}">删除</button>`:"—"}</span></td>
  </tr>`).join(""):`<tr><td colspan="5" class="history-empty">暂无改动申请</td></tr>`;
  $("#historyBody").innerHTML=historySlice.items.length?historySlice.items.map(record=>`<tr>
    <td>${esc(new Date(record.time).toLocaleString("zh-CN",{hour12:false}))}</td>
    <td>${esc(record.user)}</td><td>${esc(record.action)}</td><td>${esc(record.target)}</td><td>${esc(record.detail)}</td>
    <td>${canEdit()?`<button class="danger-btn" data-delete-history="${record.id}">删除</button>`:"—"}</td>
  </tr>`).join(""):`<tr><td colspan="6" class="history-empty">暂无修改记录</td></tr>`;
  renderPager("#requestPager",requestSlice.page,requestSlice.totalPages,"request");
  renderPager("#historyPager",historySlice.page,historySlice.totalPages,"history");
  document.querySelectorAll("[data-review]").forEach(button=>button.onclick=async()=>{
    if(!canEdit())return;
    const request=changeRequests.find(item=>item.id===button.dataset.id);
    if(!request||request.status!=="pending")return;
    if(button.dataset.review==="approve"){
      if(!applyChangeRequest(request)){await showAlert("申请对应的数据已不存在，无法通过。");return}
      request.status="approved";
      addHistory("审核通过",request.target,`${request.name}：${request.detail}`);
      render();
    }else{
      request.status="rejected";
    }
    request.reviewer=currentUser.username;
    request.reviewedAt=new Date().toISOString();
    saveCloudState().catch(error=>console.error("保存审核结果失败",error));
    renderHistory();
  });
  document.querySelectorAll("[data-delete-request]").forEach(button=>button.onclick=async()=>{
    if(!canEdit()||!(await showConfirm("确定删除这条申请记录吗？","删除记录")))return;
    changeRequests=changeRequests.filter(item=>item.id!==button.dataset.deleteRequest);
    await saveCloudState();
    renderHistory();
  });
  document.querySelectorAll("[data-delete-history]").forEach(button=>button.onclick=async()=>{
    if(!canEdit()||!(await showConfirm("确定删除这条修改记录吗？","删除记录")))return;
    historyRecords=historyRecords.filter(item=>item.id!==button.dataset.deleteHistory);
    await saveCloudState();
    renderHistory();
  });
  document.querySelectorAll('[data-page="request"],[data-page="history"]').forEach(button=>button.onclick=()=>{
    if(button.dataset.page==="request")requestPage+=Number(button.dataset.step);
    else historyPage+=Number(button.dataset.step);
    renderHistory();
  });
}
function memberStatusText(status){return status==="approved"?"已通过":status==="pending"?"待审核":"已拒绝"}
function renderMemberManagement(){
  if(!canEdit())return;
  const keyword=$("#memberSearch").value.trim().toLowerCase(), status=$("#memberStatusFilter").value;
  const list=users.filter(user=>user.role==="member")
    .filter(user=>(!keyword||`${user.name} ${user.username}`.toLowerCase().includes(keyword))&&(!status||user.status===status))
    .sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  const page=paginate(list,memberPage);memberPage=page.page;
  $("#memberBody").innerHTML=page.items.length?page.items.map(user=>{
    const linked=person(user.personId);
    return `<tr><td>${user.createdAt&&user.createdAt!=="system"?esc(new Date(user.createdAt).toLocaleString("zh-CN",{hour12:false})):"旧账号"}</td><td>${esc(user.username)}${user.name&&user.name!==user.username?`<br><small>${esc(user.name)}</small>`:""}</td><td>${user.generation?`第${toChinese(+user.generation)}世`:"—"}</td><td>${esc(linked?.name||"未绑定")}</td><td><span class="status-tag ${user.status}">${memberStatusText(user.status)}</span></td><td>${user.approvalMode==="auto"?"自动通过":user.approvalMode==="manual"?"人工通过":"旧会员"}</td><td>已设置</td><td><span class="review-actions">${user.status==="pending"?`<button class="primary-btn" data-member-bind="${esc(user.id)}">通过并绑定</button><button class="danger-btn" data-member-reject="${esc(user.id)}">拒绝</button>`:`<button class="ghost-btn" data-member-bind="${esc(user.id)}">切换绑定</button><button class="ghost-btn" data-member-reset="${esc(user.id)}">重置密码</button>`}<button class="danger-btn" data-member-delete="${esc(user.id)}">删除</button></span></td></tr>`;
  }).join(""):`<tr><td colspan="8" class="history-empty">暂无会员记录</td></tr>`;
  renderPager("#memberPager",page.page,page.totalPages,"member");
  document.querySelectorAll("[data-member-bind]").forEach(button=>button.onclick=()=>openMemberBind(button.dataset.memberBind));
  document.querySelectorAll("[data-member-reject]").forEach(button=>button.onclick=async()=>{const user=users.find(item=>item.id===button.dataset.memberReject);if(!user)return;user.status="rejected";user.reviewedAt=new Date().toISOString();user.reviewer=currentUser.username;addHistory("拒绝注册",user.name,"管理员拒绝注册申请");await save();renderMemberManagement()});
  document.querySelectorAll("[data-member-delete]").forEach(button=>button.onclick=async()=>{const user=users.find(item=>item.id===button.dataset.memberDelete);if(!user||!(await showConfirm(`确定删除会员“${user.name}”吗？族谱人物不会删除。`,"删除会员")))return;users=users.filter(item=>item.id!==user.id);addHistory("删除会员",user.name,`解除绑定：${person(user.personId)?.name||"未绑定"}`);await save();renderMemberManagement()});
  document.querySelectorAll("[data-member-reset]").forEach(button=>button.onclick=async()=>{const user=users.find(item=>item.id===button.dataset.memberReset);if(!user||!(await showConfirm(`为“${user.name}”生成临时密码吗？原密码将立即失效。`,"重置密码")))return;const response=await fetch("/api/auth",{method:"POST",credentials:"include",headers:{"content-type":"application/json"},body:JSON.stringify({action:"resetPassword",memberId:user.id})}),result=await response.json();if(!response.ok){await showAlert(result.error||"重置失败");return}addHistory("重置密码",user.name,"管理员生成临时密码");await showAlert(`临时密码：${result.temporaryPassword}\n请立即交给会员并提醒其妥善保管。`,"密码已重置")});
  document.querySelectorAll('[data-page="member"]').forEach(button=>button.onclick=()=>{memberPage+=Number(button.dataset.step);renderMemberManagement()});
}
function openMemberBind(memberId){
  const user=users.find(item=>item.id===memberId);if(!user)return;
  $("#memberBindUsername").value=user.id;$("#memberBindName").value=`${user.name} · 第${toChinese(+user.generation)}世`;
  const occupied=new Map(users.filter(item=>item.role==="member"&&item.status==="approved"&&item.personId&&item.id!==user.id).map(item=>[item.personId,item.name]));
  const candidates=data.people.filter(p=>[14,15,16].includes(p.generation)).sort((a,b)=>a.generation-b.generation||a.name.localeCompare(b.name,"zh-CN"));
  $("#memberBindPerson").innerHTML=`<option value="">请选择族谱人物</option>${candidates.map(p=>`<option value="${esc(p.id)}" ${p.id===user.personId?"selected":""} ${occupied.has(p.id)?"disabled":""}>第${toChinese(p.generation)}世 · ${esc(p.name)}${occupied.has(p.id)?`（已绑定 ${esc(occupied.get(p.id))}）`:""}</option>`).join("")}`;
  $("#memberBindDialog").showModal();
}
document.querySelectorAll("[data-history-tab]").forEach(button=>button.onclick=()=>{
  const members=button.dataset.historyTab==="members";
  document.querySelectorAll("[data-history-tab]").forEach(tab=>tab.classList.toggle("active",tab===button));
  $("#historyChangesPanel").hidden=members;$("#memberManagementPanel").hidden=!members;
  if(members)renderMemberManagement();
});
$("#memberSearch").oninput=()=>{memberPage=1;renderMemberManagement()};
$("#memberStatusFilter").onchange=()=>{memberPage=1;renderMemberManagement()};
$("#closeMemberBind").onclick=()=>$("#memberBindDialog").close();
$("#memberBindForm").onsubmit=async event=>{event.preventDefault();const user=users.find(item=>item.id===$("#memberBindUsername").value),target=person($("#memberBindPerson").value);if(!user||!target)return;if(users.some(item=>item.id!==user.id&&item.status==="approved"&&item.username===user.username)){await showAlert("同名账号已存在，不能同时启用两个相同登录账号。");return}if(users.some(item=>item.id!==user.id&&item.status==="approved"&&item.personId===target.id)){await showAlert("该人物已经绑定其他会员。");return}user.personId=target.id;user.name=target.name;user.generation=target.generation;user.zi=target.zi||"";user.status="approved";user.approvalMode="manual";user.reviewedAt=new Date().toISOString();user.reviewer=currentUser.username;addHistory("会员绑定",user.name,`绑定人物：${target.name}`);await save();$("#memberBindDialog").close();renderMemberManagement()};
$("#historyBtn").onclick=()=>{if(!requireAccount())return;requestPage=1;historyPage=1;memberPage=1;renderHistory();$("#historyTabs").hidden=!canEdit();$("#historyChangesPanel").hidden=false;$("#memberManagementPanel").hidden=true;document.querySelectorAll("[data-history-tab]").forEach((tab,index)=>tab.classList.toggle("active",index===0));$("#historyDialog").showModal()};
$("#closeHistory").onclick=()=>$("#historyDialog").close();
$("#historyStartDate").onchange=()=>{requestPage=1;historyPage=1;renderHistory()};
$("#historyEndDate").onchange=()=>{requestPage=1;historyPage=1;renderHistory()};
$("#historyFilterReset").onclick=()=>{$("#historyStartDate").value="";$("#historyEndDate").value="";requestPage=1;historyPage=1;renderHistory()};
function renderMessageBoard(){
  if(!canPropose())return;
  $("#messageBoardList").innerHTML=messageBoard.length?messageBoard.map(message=>`<article class="board-message">
    <header>
      <strong>${esc(userLine(message.author))}</strong>
      <time>${esc(new Date(message.time).toLocaleString("zh-CN",{hour12:false}))}</time>
    </header>
    <p>${esc(message.content)}</p>
    <div class="board-replies">
      ${(message.replies||[]).map(reply=>`<section class="board-reply">
        <header>
          <strong>${esc(userLine(reply.author))}</strong>
          <time>${esc(new Date(reply.time).toLocaleString("zh-CN",{hour12:false}))}</time>
        </header>
        <p>${esc(reply.content)}</p>
      </section>`).join("")}
    </div>
    <form class="board-reply-form" data-message-id="${esc(message.id)}">
      <textarea rows="2" maxlength="300" placeholder="回复这条留言"></textarea>
      <button class="ghost-btn" type="submit">回复</button>
    </form>
  </article>`).join(""):`<div class="board-empty">暂无留言</div>`;
  document.querySelectorAll(".board-reply-form").forEach(form=>form.onsubmit=async event=>{
    event.preventDefault();
    if(!canPropose())return;
    const textarea=form.querySelector("textarea");
    const content=textarea.value.trim();
    if(!content)return;
    const message=messageBoard.find(item=>item.id===form.dataset.messageId);
    if(!message)return;
    message.replies=Array.isArray(message.replies)?message.replies:[];
    message.replies.push({id:`mr${Date.now()}${Math.random().toString(16).slice(2,6)}`,time:new Date().toISOString(),author:currentUserSnapshot(),content});
    await saveCloudState();
    textarea.value="";
    renderMessageBoard();
  });
}
$("#messageBoardBtn").onclick=()=>{
  if(!requireAccount())return;
  renderMessageBoard();
  $("#messageBoardDialog").showModal();
};
$("#closeMessageBoard").onclick=()=>$("#messageBoardDialog").close();
$("#messageBoardForm").onsubmit=async e=>{
  e.preventDefault();
  if(!canPropose())return;
  const content=$("#messageBoardInput").value.trim();
  if(!content)return;
  messageBoard.unshift({id:`m${Date.now()}${Math.random().toString(16).slice(2,6)}`,time:new Date().toISOString(),author:currentUserSnapshot(),content,replies:[]});
  messageBoard=messageBoard.slice(0,300);
  await saveCloudState();
  $("#messageBoardInput").value="";
  renderMessageBoard();
};
function renderAnnouncement(){
  const latest=announcements[0];
  $("#announcementText").textContent=latest?.content||"欢迎查阅张氏族谱";
}
function renderAnnouncementHistory(){
  $("#announcementHistory").innerHTML=announcements.length?announcements.map(item=>`<article class="announcement-item">
    <time>${esc(new Date(item.time).toLocaleString("zh-CN",{hour12:false}))} · ${esc(item.user)}</time>
    <p>${esc(item.content)}</p>${item.image?`<img src="${item.image}" alt="公告图片">`:""}
  </article>`).join(""):`<div class="announcement-empty">暂无历史公告</div>`;
}
function openAnnouncementDialog(editMode){
  $("#announcementDialogTitle").textContent=editMode?"发布公告":"历史公告";
  $("#announcementForm").hidden=!editMode;
  if(editMode){$("#announcementInput").value=announcements[0]?.content||"";$("#announcementImage").value="";$("#announcementPreview").hidden=true;$("#announcementPreview").removeAttribute("src")}
  renderAnnouncementHistory();
  $("#announcementDialog").showModal();
}
$("#editAnnouncementBtn").onclick=()=>{if(canEdit())openAnnouncementDialog(true)};
$("#announcementHistoryBtn").onclick=()=>openAnnouncementDialog(false);
$("#closeAnnouncement").onclick=()=>$("#announcementDialog").close();
function readImageFile(file){
  return new Promise((resolve,reject)=>{
    if(!file)return resolve("");
    if(file.size>5*1024*1024)return reject(new Error("公告图片不能超过 5MB"));
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=()=>reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}
$("#announcementImage").onchange=async()=>{
  try{
    const image=await readImageFile($("#announcementImage").files[0]);
    $("#announcementPreview").src=image;
    $("#announcementPreview").hidden=!image;
  }catch(error){await showAlert(error.message);$("#announcementImage").value="";$("#announcementPreview").hidden=true}
};
$("#announcementForm").onsubmit=async e=>{
  e.preventDefault();
  if(!canEdit())return;
  const content=$("#announcementInput").value.trim();
  let image="";
  try{image=await readImageFile($("#announcementImage").files[0])}catch(error){await showAlert(error.message);return}
  if(!content&&!image)return;
  const announcement={id:`a${Date.now()}`,content,time:new Date().toISOString(),user:currentUser.username,image};
  announcements.unshift(announcement);
  announcements=announcements.slice(0,100);
  addHistory("发布公告","宗族公告",content);
  await saveCloudState();
  renderAnnouncement();
  renderAnnouncementHistory();
  $("#announcementDialog").close();
};
$("#dataPortBtn").onclick=()=>{if(canEdit())$("#dataPortDialog").showModal()};
$("#closeDataPort").onclick=()=>$("#dataPortDialog").close();
$("#exportDataBtn").onclick=()=>{
  if(!canEdit())return;
  const payload={version:2,exportedAt:new Date().toISOString(),state:currentState()};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;
  link.download=`zhang-family-cloud-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  addHistory("导出数据","云端备份",`导出 ${data.people.length} 位人物、${messageBoard.length} 条留言`);
};
$("#importDataFile").onchange=async()=>{
  const file=$("#importDataFile").files[0];
  if(!file||!canEdit())return;
  if(!(await showConfirm("导入会覆盖当前云端数据。\n是否已经导出备份并继续？","导入数据"))){$("#importDataFile").value="";return}
  const reader=new FileReader();
  reader.onload=async()=>{
    try{
      const importedState=normalizeAppState(JSON.parse(reader.result));
      applyState(importedState);
      selectedId=null;
      addHistory("导入数据","全族谱",`导入 ${data.people.length} 位人物数据`);
      await save();
      setupRegisterOptions();
      $("#dataPortDialog").close();
      $("#importDataFile").value="";
      render();
      await showAlert("数据导入完成。");
    }catch(error){
      await showAlert(`导入失败：${error.message}`);
      $("#importDataFile").value="";
    }
  };
  reader.onerror=async()=>{await showAlert("文件读取失败");$("#importDataFile").value=""};
  reader.readAsText(file,"utf-8");
};
window.addEventListener("beforeunload",event=>{
  if(!personFormDirty())return;
  event.preventDefault();
  event.returnValue="";
});
async function initializeApp(){
  setupTagEditor();
  setupMobileMenu();
  setupAccessWaveCanvas();
  setupPasswordToggles();
  const sessionResponse=await fetch("/api/auth",{cache:"no-store",credentials:"include"}).catch(()=>null),session=sessionResponse?.ok?await sessionResponse.json():{user:null};
  if(session.user){localStorage.setItem(SESSION_KEY,session.user.username);await loadCloudState()}else{localStorage.removeItem(SESSION_KEY);applyState(fallbackState());currentUser={username:"游客",role:"guest"}}
  setupRegisterOptions();
  resetViewState();
  render();
  renderAuthState();
  renderAccessState();
  scheduleFocusPersonAtTop();
  renderAnnouncement();
}
initializeApp().catch(async error=>{
  console.error("应用初始化失败",error);
  localStorage.removeItem(SESSION_KEY);
  applyState(fallbackState());
  currentUser={username:"游客",role:"guest"};
  setupRegisterOptions();
  resetViewState();
  render();
  renderAuthState();
  renderAccessState();
  scheduleFocusPersonAtTop();
  renderAnnouncement();
  await showAlert("云端数据读取失败，已临时显示本地初始数据。请稍后刷新重试。");
});
