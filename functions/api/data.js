import {json,readState,writeState,sessionUser,publicState} from "../_shared/auth.js";

export async function onRequestGet(context) {
  try {
    const state=await readState(context.env.DB),actor=sessionUser(context.request,state);if(!actor)return json({error:"请先登录"},401);
    const safe=publicState(state);if(actor.role!=="admin")safe.users=safe.users.filter(user=>user.id===actor.id);
    return json({ state:safe });
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

    const credentials=new Map((stored.users||[]).map(user=>[user.id||`${user.username}_${user.createdAt}`,user]));
    const incomingUsers=actor.role==="admin"?(body.state.users||[]):(stored.users||[]);
    const users=incomingUsers.map(user=>{const old=credentials.get(user.id||`${user.username}_${user.createdAt}`)||{};return {...user,passwordHash:old.passwordHash,passwordSalt:old.passwordSalt,passwordDigest:old.passwordDigest}});
    await writeState(context.env.DB,{...body.state,users,sessions:stored.sessions||[]});
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message || "保存数据失败" }, 500);
  }
}
