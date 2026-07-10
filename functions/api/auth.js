import {json,readState,writeState,hashPassword,verifyPassword,sessionUser,createSession,sessionCookie,publicUser,normalizeAccount,namePinyin,accountMatches} from "../_shared/auth.js";

const LOGIN_ERROR="账号或密码错误，或账号尚未通过审核";

export async function onRequestGet({request,env}){const state=await readState(env.DB);return json({user:publicUser(sessionUser(request,state))})}
export async function onRequestPost({request,env}){
  try{
    const body=await request.json(),state=await readState(env.DB);if(!state)return json({error:"数据尚未初始化"},503);
    if(body.action==="logout")return json({ok:true},200,{"set-cookie":sessionCookie("",0)});
    if(body.action==="resetPassword"){
      const actor=sessionUser(request,state);if(actor?.role!=="admin")return json({error:"无管理员权限"},403);
      const user=(state.users||[]).find(item=>item.id===body.memberId&&item.role==="member");if(!user)return json({error:"会员不存在"},404);
      const temporaryPassword=`Zs${crypto.randomUUID().replace(/-/g,"").slice(0,10)}`,secure=await hashPassword(temporaryPassword);user.passwordSalt=secure.salt;user.passwordDigest=secure.digest;user.passwordIterations=secure.iterations;delete user.passwordHash;user.passwordResetAt=new Date().toISOString();await writeState(env.DB,state);return json({temporaryPassword});
    }
    if(body.action==="login"){
      const username=normalizeAccount(body.username),people=state.data?.people||[];
      const user=(state.users||[]).find(item=>accountMatches(item,username,people)&&item.status!=="rejected");
      if(user){user.id=user.id||`legacy_${user.username}_${user.createdAt||"account"}`;user.status=user.status||"approved";user.approvalMode=user.approvalMode||"legacy"}
      if(!user)return json({error:LOGIN_ERROR},401);
      if(user.status!=="approved")return json({error:LOGIN_ERROR},401);
      if(!(await verifyPassword(user,String(body.password||""))))return json({error:LOGIN_ERROR},401);
      if(!user.passwordDigest){const secure=await hashPassword(String(body.password));user.passwordSalt=secure.salt;user.passwordDigest=secure.digest;user.passwordIterations=secure.iterations;delete user.passwordHash}
      const session=createSession(state,user);await writeState(env.DB,state);return json({user:publicUser(user)},200,{"set-cookie":sessionCookie(session.token)});
    }
    if(body.action==="register"){
      const account=String(body.name||"").trim(),normalized=normalizeAccount(account),generation=Number(body.generation),password=String(body.password||""),people=state.data?.people||[];
      if(normalized.length<2||![14,15,16].includes(generation)||password.length<6)return json({error:"注册信息不完整"},400);
      const matches=people.filter(person=>Number(person.generation)===generation&&(normalizeAccount(person.name)===normalized||namePinyin(person.name)===normalized)),bound=new Set((state.users||[]).filter(user=>user.status==="approved").map(user=>user.personId));
      const available=matches.filter(person=>!bound.has(person.id)),duplicate=(state.users||[]).some(user=>accountMatches(user,normalized,people)&&user.status!=="rejected"),autoApproved=available.length===1&&!duplicate,secure=await hashPassword(password),target=autoApproved?available[0]:null;
      const user={id:`member_${Date.now()}_${crypto.randomUUID().slice(0,8)}`,username:normalized,name:target?.name||account,generation,zi:target?.zi||"",personId:target?.id||"",passwordSalt:secure.salt,passwordDigest:secure.digest,passwordIterations:secure.iterations,role:"member",status:autoApproved?"approved":"pending",approvalMode:autoApproved?"auto":"",createdAt:new Date().toISOString()};
      state.users=state.users||[];state.users.push(user);let headers={};if(autoApproved){const session=createSession(state,user);headers={"set-cookie":sessionCookie(session.token)}}await writeState(env.DB,state);return json({user:autoApproved?publicUser(user):null,status:user.status},200,headers);
    }
    return json({error:"未知操作"},400);
  }catch(error){return json({error:error.message||"认证失败"},500)}
}
