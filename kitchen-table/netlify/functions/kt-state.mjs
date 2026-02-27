// Kitchen Table state sync — Supabase-backed cross-device persistence
// GET  → returns current state for user 'mike'
// POST → merges patch into state, upserts to Supabase

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const USER_ID = 'mike';

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

async function getState() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/kt_state?user_id=eq.${USER_ID}&select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase GET failed: ${res.status}`);
  const rows = await res.json();
  return rows[0] || null;
}

async function upsertState(patch) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/kt_state`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({ user_id: USER_ID, ...patch, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase upsert failed: ${res.status} — ${err}`);
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors(), body: '' };
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: 'Supabase env vars not configured' }) };
  }

  try {
    if (event.httpMethod === 'GET') {
      const row = await getState();
      return { statusCode: 200, headers: cors(), body: JSON.stringify(row || {}) };
    }

    if (event.httpMethod === 'POST') {
      const patch = JSON.parse(event.body || '{}');
      await upsertState(patch);
      return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('kt-state error:', err.message);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: err.message }) };
  }
}
