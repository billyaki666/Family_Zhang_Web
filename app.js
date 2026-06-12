const ZI = ["", "启", "见", "文", "国", "荣", "仕", "万", "永", "秉", "守", "天", "良", "其", "源", "必", "昌"];
const STORAGE_KEY = "zhang-family-tree-v4";
const CARD_W = 64, SPOUSE_W = 48, CARD_H = 102, SPOUSE_GAP = 10, FAMILY_GAP = 18, ROW_GAP = 170, MARGIN = 95;

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
    people.push({id,name,generation,gender,zi:ZI[generation] || "",note,showZi,tagText:`第${toChinese(generation)}世`,tagColor:"#8c2f25"});
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
let scale=.72, panX=95, panY=50, selectedId=null, isPanning=false, spaceDown=false, start={};
const $ = s => document.querySelector(s);
const viewport=$("#viewport"), canvas=$("#canvas"), tree=$("#tree"), links=$("#links");
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
const person = id => data.people.find(p=>p.id===id);
const esc = s => String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

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
    const spouses=component.filter(id=>id!==bloodId);
    const members=spouses.length>1?[spouses[0],bloodId,...spouses.slice(1)]:[...spouses,bloodId];
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
  const generations=[...unitsByGen.keys()].sort((a,b)=>a-b);
  generations.forEach(generation=>{
    const units=unitsByGen.get(generation).sort((a,b)=>unitOrder(a)-unitOrder(b));
    let anchor=0;
    units.forEach((unit,index)=>{
      if(index){
        const previous=units[index-1];
        anchor+=previous.width-previous.bloodOffset+FAMILY_GAP+unit.bloodOffset;
      }
      unit.anchor=anchor;
    });
    const left=units[0].anchor-units[0].bloodOffset;
    const last=units[units.length-1];
    const right=last.anchor+last.width-last.bloodOffset;
    const shift=(left+right)/2;
    units.forEach(unit=>unit.anchor-=shift);
  });
  const projectRow=(units,targets)=>{
    const offsets=[0];
    for(let index=1;index<units.length;index++){
      const previous=units[index-1],unit=units[index];
      offsets[index]=offsets[index-1]+previous.width-previous.bloodOffset+FAMILY_GAP+unit.bloodOffset;
    }
    const pools=[];
    units.forEach((unit,index)=>{
      pools.push({start:index,end:index,weight:1,value:targets[index]-offsets[index]});
      while(pools.length>1&&pools[pools.length-2].value>pools[pools.length-1].value){
        const right=pools.pop(),left=pools.pop();
        const weight=left.weight+right.weight;
        pools.push({
          start:left.start,end:right.end,weight,
          value:(left.value*left.weight+right.value*right.weight)/weight
        });
      }
    });
    pools.forEach(pool=>{
      for(let index=pool.start;index<=pool.end;index++){
        units[index].anchor=pool.value+offsets[index];
      }
    });
  };
  for(let pass=0;pass<36;pass++){
    generations.slice(1).forEach(generation=>{
      const units=unitsByGen.get(generation);
      const targets=units.map(unit=>unit.parent?unit.parent.anchor:unit.anchor);
      projectRow(units,targets);
    });
    generations.slice(0,-1).reverse().forEach(generation=>{
      const units=unitsByGen.get(generation);
      const targets=units.map(unit=>{
        const childCenter=unit.children.length
          ? unit.children.reduce((sum,child)=>sum+child.anchor,0)/unit.children.length
          : null;
        if(childCenter===null)return unit.parent?unit.parent.anchor:unit.anchor;
        return unit.parent?(unit.parent.anchor+childCenter)/2:childCenter;
      });
      projectRow(units,targets);
    });
  }
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
    const q=pos[p.id], spouse=isSpouse(p.id);
    return `<article class="person ${p.gender} ${spouse?"spouse":""} ${p.id===selectedId?"selected":""}" data-id="${p.id}" style="left:${q.x}px;top:${q.y}px">
      <div class="person-top"><span class="person-name">${esc(p.name)}</span>${p.showZi!==false?`<span class="zi-badge">${esc(p.zi||"未")}</span>`:""}</div>
      <div class="person-tag" style="background:${safeColor(p.tagColor)}">${esc(p.tagText||`第${toChinese(p.generation)}世`)}</div></article>`;
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
  $("#generationRail").innerHTML=gens.map(g=>`<div class="gen-tag" style="top:${((g-1)*ROW_GAP+35)*scale+panY}px">第${toChinese(g)}世<br>${ZI[g]||"未定"}字辈</div>`).join("");
}
function toChinese(n){const a=["零","一","二","三","四","五","六","七","八","九"]; return n<10?a[n]:n===10?"十":n<20?"十"+a[n%10]:"二十";}
function safeColor(value){return /^#[0-9a-f]{6}$/i.test(value||"")?value:"#8c2f25";}
function applyTransform(){canvas.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;$("#zoomLabel").textContent=Math.round(scale*100)+"%"; const {pos}=layout();renderRail(pos);}
function openPerson(id){
  selectedId=id; const p=person(id); if(!p)return;
  $("#personId").value=p.id;$("#personName").value=p.name;$("#personGender").value=p.gender;
  $("#personGeneration").value=p.generation;$("#personZi").value=p.zi||"";$("#personShowZi").checked=p.showZi!==false;
  $("#personTagText").value=p.tagText||`第${toChinese(p.generation)}世`;$("#personTagColor").value=safeColor(p.tagColor);$("#personNote").value=p.note||"";
  $("#drawerTitle").textContent=p.name;
  const parents=data.parentLinks.filter(l=>l.child===id).map(l=>person(l.parent)?.name).filter(Boolean);
  const children=data.parentLinks.filter(l=>l.parent===id).map(l=>person(l.child)?.name).filter(Boolean);
  const spouses=data.unions.filter(u=>u.partners.includes(id)).flatMap(u=>u.partners.filter(x=>x!==id)).map(x=>person(x)?.name).filter(Boolean);
  $("#relationBox").innerHTML=`<h3>亲属关系</h3><div class="relation-actions">
    <button type="button" data-rel="parent">＋ 父母</button><button type="button" data-rel="spouse">＋ 配偶</button><button type="button" data-rel="child">＋ 子女</button></div>
    <div class="relation-list">父母：${esc(parents.join("、")||"未记录")}<br>配偶：${esc(spouses.join("、")||"未记录")}<br>子女：${esc(children.join("、")||"未记录")}</div>`;
  document.querySelectorAll("[data-rel]").forEach(b=>b.onclick=()=>openRelation(id,b.dataset.rel));
  $("#drawer").classList.add("open");$("#modalBackdrop").classList.add("show");$("#drawer").setAttribute("aria-hidden","false");render();
}
function closeDrawer(){selectedId=null;$("#drawer").classList.remove("open");$("#modalBackdrop").classList.remove("show");$("#drawer").setAttribute("aria-hidden","true");render();}
function openRelation(id,type){
  const base=person(id), labels={parent:"新增父母",spouse:"新增配偶",child:"新增子女"};
  $("#relationTitle").textContent=labels[type];$("#relationPersonId").value=id;$("#relationType").value=type;
  $("#relationName").value="";$("#relationNote").value="";
  $("#relationGender").value=type==="spouse"?(base.gender==="male"?"female":"male"):"male";
  $("#relationZi").value=type==="child"?(ZI[base.generation+1]||""):type==="parent"?(ZI[base.generation-1]||""):(base.zi||"");
  $("#relationDialog").showModal();
}
$("#personForm").onsubmit=e=>{e.preventDefault();const p=person($("#personId").value);if(!p)return;p.name=$("#personName").value.trim();p.gender=$("#personGender").value;p.generation=+$("#personGeneration").value;p.zi=$("#personZi").value.trim();p.showZi=$("#personShowZi").checked;p.tagText=$("#personTagText").value.trim();p.tagColor=$("#personTagColor").value;p.note=$("#personNote").value.trim();save();render();openPerson(p.id);};
$("#relationForm").onsubmit=e=>{
  e.preventDefault(); if(e.submitter?.value==="cancel")return;
  const base=person($("#relationPersonId").value),type=$("#relationType").value,id=`p${Date.now()}`;
  const generation=type==="parent"?base.generation-1:type==="child"?base.generation+1:base.generation;
  data.people.push({id,name:$("#relationName").value.trim(),gender:$("#relationGender").value,generation,zi:$("#relationZi").value.trim(),note:$("#relationNote").value.trim(),showZi:type!=="spouse",tagText:`第${toChinese(generation)}世`,tagColor:"#8c2f25"});
  if(type==="spouse")data.unions.push({id:`u${Date.now()}`,partners:[base.id,id]});
  else if(type==="parent")data.parentLinks.push({parent:id,child:base.id});
  else data.parentLinks.push({parent:base.id,child:id});
  save();$("#relationDialog").close();render();openPerson(base.id);
};
$("#deletePerson").onclick=()=>{const id=$("#personId").value,p=person(id);if(!p||!confirm(`确定删除“${p.name}”及其全部关系吗？`))return;data.people=data.people.filter(x=>x.id!==id);data.unions=data.unions.filter(u=>!u.partners.includes(id));data.parentLinks=data.parentLinks.filter(l=>l.parent!==id&&l.child!==id);save();closeDrawer();};
$("#addRoot").onclick=()=>{const id=`p${Date.now()}`;data.people.push({id,name:"新族人",gender:"male",generation:1,zi:"启",note:"",showZi:true,tagText:"第一世",tagColor:"#8c2f25"});save();render();openPerson(id);};
$("#closeDrawer").onclick=closeDrawer;$("#modalBackdrop").onclick=closeDrawer;
$("#zoomIn").onclick=()=>{scale=Math.min(1.5,scale+.1);applyTransform()};$("#zoomOut").onclick=()=>{scale=Math.max(.3,scale-.1);applyTransform()};
$("#resetView").onclick=()=>{scale=.72;panX=95;panY=50;applyTransform()};
$("#searchInput").oninput=e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll(".person").forEach(el=>{const hit=!q||person(el.dataset.id).name.toLowerCase().includes(q);el.classList.toggle("search-dim",!!q&&!hit);el.classList.toggle("search-hit",!!q&&hit);});};
viewport.addEventListener("wheel",e=>{e.preventDefault();const rect=viewport.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top,old=scale;scale=Math.max(.28,Math.min(1.6,scale*(e.deltaY>0?.9:1.1)));panX=mx-(mx-panX)*(scale/old);panY=my-(my-panY)*(scale/old);applyTransform();},{passive:false});
viewport.onmousedown=e=>{if(e.button===1||(e.button===0&&spaceDown)){e.preventDefault();isPanning=true;start={x:e.clientX,y:e.clientY,px:panX,py:panY};viewport.classList.add("panning");}};
window.onmousemove=e=>{if(isPanning){panX=start.px+e.clientX-start.x;panY=start.py+e.clientY-start.y;applyTransform();}};
window.onmouseup=()=>{isPanning=false;viewport.classList.remove("panning")};
window.onkeydown=e=>{if(e.code==="Space"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();spaceDown=true;viewport.classList.add("space-ready");}};
window.onkeyup=e=>{if(e.code==="Space"){spaceDown=false;viewport.classList.remove("space-ready")}};
render();
