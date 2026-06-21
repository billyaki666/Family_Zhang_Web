const STATE_KEY="family_state";
const encoder=new TextEncoder();
const PASSWORD_ITERATIONS=100000;
const PINYIN={张:"zhang",必:"bi",麟:"lin",源:"yuan",明:"ming",松:"song",林:"lin",聪:"cong",书:"shu",坤:"kun",珍:"zhen",群:"qun",海:"hai",春:"chun",兴:"xing",华:"hua",兵:"bing",芬:"fen",萍:"ping",秀:"xiu",敏:"min",勇:"yong",洪:"hong",兰:"lan",涛:"tao",维:"wei",强:"qiang",晓:"xiao",芳:"fang",波:"bo",亮:"liang",莉:"li",科:"ke",权:"quan",碧:"bi",钰:"yu",亚:"ya",鹏:"peng",舟:"zhou",亦:"yi",璟:"jing",沅:"yuan",琳:"lin",茜:"qian",瑾:"jin",萱:"xuan",泽:"ze",希:"xi",妍:"yan",欣:"xin",怡:"yi",雨:"yu",馨:"xin",俊:"jun",鸿:"hong",艺:"yi",兹:"zi",嘉:"jia",睿:"rui",玥:"yue",朵:"duo",竹:"zhu",韵:"yun",新:"xin",红:"hong",美:"mei",天:"tian",润:"run",梅:"mei",郭:"guo",陈:"chen",李:"li",刘:"liu",王:"wang",赵:"zhao",周:"zhou",彭:"peng",曹:"cao",蒋:"jiang",何:"he",谢:"xie",曾:"zeng",代:"dai",廖:"liao",罗:"luo",黄:"huang",唐:"tang",舒:"shu",氏:"shi"};

export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}});
export async function readState(db){const row=await db.prepare("SELECT value FROM app_state WHERE key = ?").bind(STATE_KEY).first();return row?JSON.parse(row.value):null}
export async function writeState(db,state){await db.prepare(`INSERT INTO app_state (key,value,updated_at) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at`).bind(STATE_KEY,JSON.stringify(state),new Date().toISOString()).run()}
const bytesToHex=bytes=>[...bytes].map(value=>value.toString(16).padStart(2,"0")).join("");
const randomHex=size=>{const bytes=new Uint8Array(size);crypto.getRandomValues(bytes);return bytesToHex(bytes)};
export async function hashPassword(password,salt=randomHex(16),iterations=PASSWORD_ITERATIONS){const safeIterations=Math.min(PASSWORD_ITERATIONS,Math.max(1,Number(iterations)||PASSWORD_ITERATIONS));const key=await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:encoder.encode(salt),iterations:safeIterations},key,256);return {salt,digest:bytesToHex(new Uint8Array(bits)),iterations:safeIterations}}
function legacyHash(value){let hash=2166136261;for(const char of value){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}return (hash>>>0).toString(16)}
export async function verifyPassword(user,password){if(user.passwordDigest&&user.passwordSalt)return (await hashPassword(password,user.passwordSalt,user.passwordIterations||PASSWORD_ITERATIONS)).digest===user.passwordDigest;return user.passwordHash===legacyHash(password)}
function cookieValue(request,name){const match=(request.headers.get("cookie")||"").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));return match?decodeURIComponent(match[1]):""}
export function sessionUser(request,state){const token=cookieValue(request,"family_session"),now=Date.now();const session=(state?.sessions||[]).find(item=>item.token===token&&new Date(item.expiresAt).getTime()>now);return session?(state.users||[]).find(user=>user.id===session.userId&&user.status==="approved"):null}
export function createSession(state,user){const token=randomHex(32),expiresAt=new Date(Date.now()+30*864e5).toISOString();state.sessions=(state.sessions||[]).filter(item=>new Date(item.expiresAt).getTime()>Date.now());state.sessions.push({token,userId:user.id,expiresAt});return {token,expiresAt}}
export function sessionCookie(token,maxAge=2592000){return `family_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function publicUser(user){if(!user)return null;const {passwordHash,passwordDigest,passwordSalt,passwordIterations,...safe}=user;return safe}
export function publicState(state){return {...state,sessions:undefined,users:(state.users||[]).map(publicUser)}}
export function normalizeAccount(value){return String(value||"").normalize("NFKC").trim().toLowerCase().replace(/[\s·._-]+/g,"")}
export function namePinyin(value){
  const name=String(value||"").replace(/[（(].*$/u,"").trim();let output="";
  for(const char of name){if(/[a-z0-9]/i.test(char))output+=char.toLowerCase();else if(PINYIN[char])output+=PINYIN[char];else if(/[\u3400-\u9fff]/u.test(char))return ""}
  return normalizeAccount(output);
}
export function accountMatches(user,input,people=[]){
  const value=normalizeAccount(input),linked=people.find(person=>person.id===user.personId),name=linked?.name||user.name||"";
  return [user.username,name,namePinyin(name)].some(alias=>alias&&normalizeAccount(alias)===value);
}
