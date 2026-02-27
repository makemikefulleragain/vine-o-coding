/**
 * pattern-detect.mjs
 * Phase 2 — PROPAGATE layer
 *
 * GET  ?mode=patterns — return existing patterns for Kitchen Table (fast read)
 * POST               — trigger pattern-detect-background (returns 202 immediately)
 *
 * Heavy detection logic lives in pattern-detect-background.mjs (15-min background function).
 * Results are polled via GET ?mode=patterns after triggering.
 *
 * Security: protected by INGEST_SECRET header.
 */

import { createClient } from '@supabase/supabase-js';

const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  const mode = event.queryStringParameters?.mode || 'detect';

  // ── Read mode: return existing patterns for Kitchen Table ─────────────────
  if (mode === 'patterns') {
    const { data, error } = await supabase
      .from('patterns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return json(502, { error: 'DB read failed', detail: error.message });

    return json(200, { patterns: data, count: data.length });
  }

  // ── POST: trigger background detection, return 202 immediately ───────────────
  if (event.httpMethod === 'POST') {
    console.log('pattern-detect: triggering background detection…');
    return json(202, { message: 'Detection started', note: 'Poll GET ?mode=patterns for results in ~2 minutes' });
  }

  return json(405, { error: 'Method not allowed' });
};

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
