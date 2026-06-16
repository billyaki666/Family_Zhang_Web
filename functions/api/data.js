const STATE_KEY = "family_state";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

async function readState(db) {
  const row = await db
    .prepare("SELECT value FROM app_state WHERE key = ?")
    .bind(STATE_KEY)
    .first();

  return row ? JSON.parse(row.value) : null;
}

async function writeState(db, state) {
  await db
    .prepare(`
      INSERT INTO app_state (key, value, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = excluded.updated_at
    `)
    .bind(STATE_KEY, JSON.stringify(state), new Date().toISOString())
    .run();
}

export async function onRequestGet(context) {
  try {
    return json({ state: await readState(context.env.DB) });
  } catch (error) {
    return json({ error: error.message || "读取数据失败" }, 500);
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    if (!body || typeof body.state !== "object" || body.state === null) {
      return json({ error: "缺少 state" }, 400);
    }

    await writeState(context.env.DB, body.state);
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message || "保存数据失败" }, 500);
  }
}
