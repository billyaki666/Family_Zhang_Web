const ZI = ["", "启", "见", "文", "国", "荣", "仕", "万", "永", "秉", "守", "天", "良", "其", "源", "必", "昌"];
const STORAGE_KEY = "zhang-family-tree-v4";
const USERS_KEY = "zhang-family-users-v1";
const SESSION_KEY = "zhang-family-session-v1";
const HISTORY_KEY = "zhang-family-history-v1";
const REQUESTS_KEY = "zhang-family-requests-v1";
const ANNOUNCEMENTS_KEY = "zhang-family-announcements-v1";
const CARD_W = 64, SPOUSE_W = 48, CARD_H = 84, SPOUSE_GAP = 10, FAMILY_GAP = 18, ROW_GAP = 138, MARGIN = 110;

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
    people.push({id,name,generation,gender,zi:ZI[generation] || "",note,showZi,tagText:"",tagColor:"#8c2f25",birthDate:"",deathDate:""});
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

let data;
try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialData(); } catch { data = initialData(); }
data.people.forEach(p=>{
  if(p.tagText===`第${toChinese(p.generation)}世`)p.tagText="";
  p.birthDate=p.birthDate||"";
  p.deathDate=p.deathDate||"";
  p.deathUnknown=Boolean(p.deathUnknown);
  p.tagColor=safeColor(p.tagColor);
});
let users = readStorage(USERS_KEY, [])
  .filter(user=>user.username!=="admin123")
  .map(user=>({...user,role:user.role==="admin"?"member":user.role}));
users.unshift({username:"admin123",name:"管理员",generation:0,passwordHash:passwordHash("admin123"),role:"admin",createdAt:"system"});
localStorage.setItem(USERS_KEY,JSON.stringify(users));
let historyRecords = readStorage(HISTORY_KEY, []);
let changeRequests = readStorage(REQUESTS_KEY, []);
let announcements = readStorage(ANNOUNCEMENTS_KEY, []);
let currentUser = users.find(user => user.username === localStorage.getItem(SESSION_KEY)) || {username:"游客",role:"guest"};
let scale=.72, panX=95, panY=50, selectedId=null, isPanning=false, spaceDown=false, start={};
const $ = s => document.querySelector(s);
const viewport=$("#viewport"), canvas=$("#canvas"), tree=$("#tree"), links=$("#links");
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
const saveUsers = () => {
  localStorage.setItem(USERS_KEY,JSON.stringify(users));
};
const person = id => data.people.find(p=>p.id===id);
const esc = s => String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function readStorage(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
function passwordHash(value){let hash=2166136261;for(const char of value){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}return (hash>>>0).toString(16)}
function canEdit(){return currentUser.role==="admin"}
function canPropose(){return currentUser.role==="admin"||currentUser.role==="member"}
function requireAccount(){if(canPropose())return true;$("#authDialog").showModal();return false}
function requireAdmin(){if(canEdit())return true;return false}
function addHistory(action,target,detail){
  const record={id:`h${Date.now()}`,time:new Date().toISOString(),user:currentUser.username,action,target,detail};
  historyRecords.unshift(record);
  historyRecords=historyRecords.slice(0,500);
  localStorage.setItem(HISTORY_KEY,JSON.stringify(historyRecords));
}
function addRequest(type,target,targetId,payload,detail){
  const request={id:`r${Date.now()}${Math.random().toString(16).slice(2,6)}`,time:new Date().toISOString(),user:currentUser.username,name:currentUser.name||currentUser.username,generation:currentUser.generation||"",type,target,targetId,payload,detail,status:"pending"};
  changeRequests.unshift(request);
  localStorage.setItem(REQUESTS_KEY,JSON.stringify(changeRequests));
  return request;
}
function renderAuthState(){
  const admin=canEdit();
  const member=currentUser.role==="member";
  $("#userBadge").textContent=admin?`管理员 · ${currentUser.username}`:member?`族人 · ${currentUser.name}`:"游客只读";
  $("#userBadge").classList.toggle("admin",admin);
  $("#authBtn").hidden=admin||member;
  $("#logoutBtn").hidden=!(admin||member);
  $("#addRoot").hidden=!canPropose();
  $("#historyBtn").hidden=!(admin||member);
  $("#historyBtn").textContent=admin?"审核与记录":"我的申请";
  $("#editAnnouncementBtn").hidden=!admin;
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
  return parentNo * 10000 + Number(unit.id.replace(/\D/g,""));
}
function render() {
  const {pos,unitByPerson,width,height}=layout();
  canvas.style.width=width+"px"; canvas.style.height=height+"px";
  links.setAttribute("width",width); links.setAttribute("height",height); links.setAttribute("viewBox",`0 0 ${width} ${height}`);
  tree.innerHTML=data.people.map(p=>{
    const q=pos[p.id], spouse=isSpouse(p.id), deceased=Boolean(p.deathDate||p.deathUnknown);
    return `<article class="person ${p.gender} ${spouse?"spouse":""} ${deceased?"deceased":""} ${p.id===selectedId?"selected":""}" data-id="${p.id}" style="left:${q.x}px;top:${q.y}px">
      <div class="person-top"><span class="person-name">${esc(p.name)}</span>${p.showZi!==false?`<span class="zi-badge">${esc(p.zi||"未")}</span>`:""}</div>
      ${p.tagText?`<div class="person-tag" style="background:${safeColor(p.tagColor)}">${esc(p.tagText)}</div>`:""}
      <div class="person-tooltip"><div><b>出生：</b>${esc(p.birthDate||"未填写")}</div><div><b>死亡：</b>${esc(p.deathUnknown?"不详":p.deathDate||"未填写")}</div><div><b>生平：</b>${esc(p.note||"暂无备注")}</div></div>
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
  document.querySelectorAll(".person").forEach(el=>el.onclick=()=>openPerson(el.dataset.id));
}
function renderRail(pos) {
  const gens=[...new Set(data.people.map(p=>p.generation))].sort((a,b)=>a-b);
  $("#generationRail").innerHTML=gens.map(g=>`<div class="gen-tag" style="top:${((g-1)*ROW_GAP+35)*scale+panY}px"><span class="gen-order">第${toChinese(g)}世</span><span class="gen-zi">[<b>${ZI[g]||"未"}</b>]</span></div>`).join("");
}
function toChinese(n){const a=["零","一","二","三","四","五","六","七","八","九"]; return n<10?a[n]:n===10?"十":n<20?"十"+a[n%10]:"二十";}
function safeColor(value){return /^#[0-9a-f]{6}$/i.test(value||"")?value:"#8c2f25";}
function setColorPalette(color){
  const safe=safeColor(color);
  $("#personTagColor").value=safe;
  document.querySelectorAll("#tagColorPalette [data-color]").forEach(button=>button.classList.toggle("selected",button.dataset.color===safe));
}
function applyTransform(){canvas.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;$("#zoomLabel").textContent=Math.round(scale*100)+"%"; const {pos}=layout();renderRail(pos);}
function openPerson(id){
  selectedId=id; const p=person(id); if(!p)return;
  $("#personId").value=p.id;$("#personName").value=p.name;$("#personGender").value=p.gender;
  $("#personGeneration").value=p.generation;$("#personZi").value=p.zi||"";$("#personShowZi").checked=p.showZi!==false;
  $("#personTagText").value=p.tagText||"";setColorPalette(p.tagColor);$("#personBirthDate").value=p.birthDate||"";$("#personDeathDate").value=p.deathDate||"";$("#personDeathUnknown").checked=Boolean(p.deathUnknown);$("#personDeathDate").disabled=Boolean(p.deathUnknown)||!canPropose();$("#personNote").value=p.note||"";
  $("#drawerTitle").textContent=p.name;
  const parents=data.parentLinks.filter(l=>l.child===id).map(l=>person(l.parent)?.name).filter(Boolean);
  const children=data.parentLinks.filter(l=>l.parent===id).map(l=>person(l.child)?.name).filter(Boolean);
  const spouses=data.unions.filter(u=>u.partners.includes(id)).flatMap(u=>u.partners.filter(x=>x!==id)).map(x=>person(x)?.name).filter(Boolean);
  $("#relationBox").innerHTML=`<h3>亲属关系</h3>${canPropose()?`<div class="relation-actions">
    <button type="button" data-rel="parent">＋ 父母</button><button type="button" data-rel="spouse">＋ 配偶</button><button type="button" data-rel="child">＋ 子女</button></div>`:""}
    <div class="relation-list">父母：${esc(parents.join("、")||"未记录")}<br>配偶：${esc(spouses.join("、")||"未记录")}<br>子女：${esc(children.join("、")||"未记录")}</div>`;
  document.querySelectorAll("[data-rel]").forEach(b=>b.onclick=()=>openRelation(id,b.dataset.rel));
  $("#personForm").querySelectorAll("input,select,textarea").forEach(control=>control.disabled=!canPropose());
  $("#personDeathDate").disabled=!canPropose()||$("#personDeathUnknown").checked;
  $("#tagColorPalette").querySelectorAll("button").forEach(button=>button.disabled=!canPropose());
  $("#personForm").querySelector(".form-actions").hidden=!canPropose();
  $("#deletePerson").textContent=canEdit()?"删除人物":"申请删除";
  $("#personForm button[type='submit']").textContent=canEdit()?"保存修改":"提交修改申请";
  $("#drawer").classList.toggle("readonly",!canPropose());
  $("#drawer").classList.add("open");$("#modalBackdrop").classList.add("show");$("#drawer").setAttribute("aria-hidden","false");render();
}
function closeDrawer(){selectedId=null;$("#drawer").classList.remove("open");$("#modalBackdrop").classList.remove("show");$("#drawer").setAttribute("aria-hidden","true");render();}
function openRelation(id,type){
  if(!requireAccount())return;
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
  save();
  return true;
}
$("#personForm").onsubmit=e=>{e.preventDefault();if(!requireAccount())return;const p=person($("#personId").value);if(!p)return;const before={...p};const deathUnknown=$("#personDeathUnknown").checked;const proposed={...p,name:$("#personName").value.trim(),gender:$("#personGender").value,generation:+$("#personGeneration").value,zi:$("#personZi").value.trim(),showZi:$("#personShowZi").checked,tagText:$("#personTagText").value.trim(),tagColor:$("#personTagColor").value,birthDate:$("#personBirthDate").value,deathDate:deathUnknown?"":$("#personDeathDate").value,deathUnknown,note:$("#personNote").value.trim()};const labels={name:"姓名",gender:"性别",generation:"世代",zi:"字辈",showZi:"字辈显示",tagText:"标签",tagColor:"标签颜色",birthDate:"出生时间",deathDate:"死亡时间",deathUnknown:"死亡日期不详",note:"备注"};const changes=Object.keys(labels).filter(key=>before[key]!==proposed[key]).map(key=>`${labels[key]}：${before[key]||"空"} → ${proposed[key]||"空"}`);if(!changes.length)return;if(canEdit()){Object.assign(p,proposed);save();addHistory("编辑人物",p.name,changes.join("；"));render();openPerson(p.id)}else{addRequest("editPerson",p.name,p.id,proposed,changes.join("；"));closeDrawer();alert("修改申请已提交，管理员审核通过后生效。")}};
$("#relationForm").onsubmit=e=>{
  e.preventDefault(); if(e.submitter?.value==="cancel"||!requireAccount())return;
  const base=person($("#relationPersonId").value),type=$("#relationType").value,id=`p${Date.now()}`;
  const generation=type==="parent"?base.generation-1:type==="child"?base.generation+1:base.generation;
  const newPerson={id,name:$("#relationName").value.trim(),gender:$("#relationGender").value,generation,zi:$("#relationZi").value.trim(),note:$("#relationNote").value.trim(),showZi:type!=="spouse",tagText:"",tagColor:"#8c2f25",birthDate:"",deathDate:"",deathUnknown:false};
  if(canEdit()){applyRelationChange({baseId:base.id,type,newPerson});addHistory(type==="spouse"?"新增配偶":type==="parent"?"新增父母":"新增子女",newPerson.name,`与 ${base.name} 建立关系`);save();$("#relationDialog").close();render();openPerson(base.id)}
  else{addRequest("addRelation",newPerson.name,base.id,{baseId:base.id,type,newPerson},`申请与 ${base.name} 建立${type==="spouse"?"配偶":type==="parent"?"父母":"子女"}关系`);$("#relationDialog").close();closeDrawer();alert("亲属关系申请已提交，管理员审核通过后生效。")}
};
$("#deletePerson").onclick=()=>{if(!requireAccount())return;const id=$("#personId").value,p=person(id);if(!p||!confirm(canEdit()?`确定删除“${p.name}”及其全部关系吗？`:`确定提交删除“${p.name}”的申请吗？`))return;if(canEdit()){applyDeletePerson(id);addHistory("删除人物",p.name,"删除人物及其全部亲属关系");save();closeDrawer()}else{addRequest("deletePerson",p.name,id,{},"申请删除人物及其全部亲属关系");closeDrawer();alert("删除申请已提交，管理员审核通过后生效。")}};
$("#addRoot").onclick=()=>{if(!requireAccount())return;const newPerson={id:`p${Date.now()}`,name:"新族人",gender:"male",generation:1,zi:"启",note:"",showZi:true,tagText:"",tagColor:"#8c2f25",birthDate:"",deathDate:"",deathUnknown:false};if(canEdit()){data.people.push(newPerson);addHistory("新增人物","新族人","新增独立族人");save();render();openPerson(newPerson.id)}else{addRequest("addRoot","新族人","",newPerson,"申请新增独立族人");alert("新增人物申请已提交，管理员审核通过后生效。")}};
$("#closeDrawer").onclick=closeDrawer;$("#modalBackdrop").onclick=closeDrawer;
document.querySelectorAll("#tagColorPalette [data-color]").forEach(button=>button.onclick=()=>setColorPalette(button.dataset.color));
$("#personDeathUnknown").onchange=()=>{
  $("#personDeathDate").disabled=$("#personDeathUnknown").checked||!canPropose();
  if($("#personDeathUnknown").checked)$("#personDeathDate").value="";
};
$("#zoomIn").onclick=()=>{scale=Math.min(1.5,scale+.1);applyTransform()};$("#zoomOut").onclick=()=>{scale=Math.max(.3,scale-.1);applyTransform()};
$("#resetView").onclick=()=>{scale=.72;panX=95;panY=50;applyTransform()};
$("#searchInput").oninput=e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll(".person").forEach(el=>{const hit=!q||person(el.dataset.id).name.toLowerCase().includes(q);el.classList.toggle("search-dim",!!q&&!hit);el.classList.toggle("search-hit",!!q&&hit);});};
viewport.addEventListener("wheel",e=>{e.preventDefault();const rect=viewport.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top,old=scale;scale=Math.max(.28,Math.min(1.6,scale*(e.deltaY>0?.9:1.1)));panX=mx-(mx-panX)*(scale/old);panY=my-(my-panY)*(scale/old);applyTransform();},{passive:false});
viewport.onmousedown=e=>{if(e.button===1||(e.button===0&&spaceDown)){e.preventDefault();isPanning=true;start={x:e.clientX,y:e.clientY,px:panX,py:panY};viewport.classList.add("panning");}};
window.onmousemove=e=>{if(isPanning){panX=start.px+e.clientX-start.x;panY=start.py+e.clientY-start.y;applyTransform();}};
window.onmouseup=()=>{isPanning=false;viewport.classList.remove("panning")};
window.onkeydown=e=>{if(e.code==="Space"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();spaceDown=true;viewport.classList.add("space-ready");}};
window.onkeyup=e=>{if(e.code==="Space"){spaceDown=false;viewport.classList.remove("space-ready")}};
$("#authBtn").onclick=()=>{$("#loginMessage").textContent="";$("#registerMessage").textContent="";$("#authDialog").showModal()};
$("#closeAuth").onclick=()=>$("#authDialog").close();
$("#logoutBtn").onclick=()=>{
  localStorage.removeItem(SESSION_KEY);
  currentUser={username:"游客",role:"guest"};
  closeDrawer();
  renderAuthState();
};
$("#registerGeneration").innerHTML=`<option value="">请选择世代</option>${Array.from({length:16},(_,index)=>`<option value="${index+1}">第${toChinese(index+1)}世 [${ZI[index+1]||"未定"}]</option>`).join("")}`;
$("#loginForm").onsubmit=e=>{
  e.preventDefault();
  const username=$("#loginUsername").value.trim();
  const user=users.find(item=>item.username===username&&item.passwordHash===passwordHash($("#loginPassword").value));
  if(!user){$("#loginMessage").textContent="账号或密码错误";return}
  currentUser=user;
  localStorage.setItem(SESSION_KEY,user.username);
  $("#authDialog").close();
  $("#loginForm").reset();
  renderAuthState();
};
$("#registerForm").onsubmit=e=>{
  e.preventDefault();
  const name=$("#registerName").value.trim(),generation=+$("#registerGeneration").value,password=$("#registerPassword").value,confirmPassword=$("#registerConfirm").value;
  if(name==="admin123"){$("#registerMessage").textContent="该账号为系统管理员账号，不可注册";return}
  if(users.some(user=>user.username===name)){$("#registerMessage").textContent="该姓名账号已存在";return}
  if(password!==confirmPassword){$("#registerMessage").textContent="两次输入的密码不一致";return}
  const user={username:name,name,generation,passwordHash:passwordHash(password),role:"member",createdAt:new Date().toISOString()};
  users.push(user);
  saveUsers();
  currentUser=user;
  localStorage.setItem(SESSION_KEY,user.username);
  $("#authDialog").close();
  $("#registerForm").reset();
  renderAuthState();
};
function renderHistory(){
  const visibleRequests=canEdit()?changeRequests:changeRequests.filter(request=>request.user===currentUser.username);
  $("#historyTitle").textContent=canEdit()?"申请审核与修改记录":"我的改动申请";
  $("#requestBody").innerHTML=visibleRequests.length?visibleRequests.map(request=>`<tr>
    <td>${esc(new Date(request.time).toLocaleString("zh-CN",{hour12:false}))}</td>
    <td>${esc(request.name)}${request.generation?` · 第${toChinese(+request.generation)}世`:""}</td>
    <td><strong>${esc(request.target)}</strong><br>${esc(request.detail)}</td>
    <td><span class="status-tag ${request.status}">${request.status==="pending"?"待审核":request.status==="approved"?"已通过":"已驳回"}</span></td>
    <td>${canEdit()&&request.status==="pending"?`<span class="review-actions"><button class="primary-btn" data-review="approve" data-id="${request.id}">通过</button><button class="danger-btn" data-review="reject" data-id="${request.id}">驳回</button></span>`:"—"}</td>
  </tr>`).join(""):`<tr><td colspan="5" class="history-empty">暂无改动申请</td></tr>`;
  $("#historyBody").innerHTML=historyRecords.length?historyRecords.map(record=>`<tr>
    <td>${esc(new Date(record.time).toLocaleString("zh-CN",{hour12:false}))}</td>
    <td>${esc(record.user)}</td><td>${esc(record.action)}</td><td>${esc(record.target)}</td><td>${esc(record.detail)}</td>
  </tr>`).join(""):`<tr><td colspan="5" class="history-empty">暂无修改记录</td></tr>`;
  $("#clearHistory").hidden=!canEdit();
  document.querySelectorAll("[data-review]").forEach(button=>button.onclick=()=>{
    if(!canEdit())return;
    const request=changeRequests.find(item=>item.id===button.dataset.id);
    if(!request||request.status!=="pending")return;
    if(button.dataset.review==="approve"){
      if(!applyChangeRequest(request)){alert("申请对应的数据已不存在，无法通过。");return}
      request.status="approved";
      addHistory("审核通过",request.target,`${request.name}：${request.detail}`);
      render();
    }else{
      request.status="rejected";
    }
    request.reviewer=currentUser.username;
    request.reviewedAt=new Date().toISOString();
    localStorage.setItem(REQUESTS_KEY,JSON.stringify(changeRequests));
    renderHistory();
  });
}
$("#historyBtn").onclick=()=>{if(!requireAccount())return;renderHistory();$("#historyDialog").showModal()};
$("#closeHistory").onclick=()=>$("#historyDialog").close();
$("#clearHistory").onclick=()=>{
  if(!canEdit()||!confirm("确定清空全部修改记录吗？"))return;
  historyRecords=[];
  localStorage.setItem(HISTORY_KEY,"[]");
  renderHistory();
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
  }catch(error){alert(error.message);$("#announcementImage").value="";$("#announcementPreview").hidden=true}
};
$("#announcementForm").onsubmit=async e=>{
  e.preventDefault();
  if(!canEdit())return;
  const content=$("#announcementInput").value.trim();
  let image="";
  try{image=await readImageFile($("#announcementImage").files[0])}catch(error){alert(error.message);return}
  if(!content&&!image)return;
  const announcement={id:`a${Date.now()}`,content,time:new Date().toISOString(),user:currentUser.username,image};
  announcements.unshift(announcement);
  announcements=announcements.slice(0,100);
  localStorage.setItem(ANNOUNCEMENTS_KEY,JSON.stringify(announcements));
  addHistory("发布公告","宗族公告",content);
  renderAnnouncement();
  renderAnnouncementHistory();
  $("#announcementDialog").close();
};
function initializeApp(){
  save();
  saveUsers();
  render();
  renderAuthState();
  renderAnnouncement();
}
initializeApp();
