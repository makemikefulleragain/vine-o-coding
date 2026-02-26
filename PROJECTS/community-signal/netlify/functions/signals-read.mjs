/**
 * signals-read.mjs
 * Phase 1 — SENSE layer
 *
 * Read endpoint for Kitchen Table Sector Pulse view.
 * Returns signals with decay weighting applied at query time (Stage 3).
 *
 * GET /signals-read?mode=pulse          — this week's summary for Sector Pulse view
 * GET /signals-read?mode=review         — unreviewed signals for Monday morning review
 * GET /signals-read?mode=all&limit=50   — paginated full list
 *
 * POST /signals-read  { id, reviewed, review_notes } — mark a signal reviewed/rejected
 *
 * Security: INGEST_SECRET header required.
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_SECRET
 */

import { createClient } from '@supabase/supabase-js';

const supabase      = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const INGEST_SECRET = process.env.INGEST_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  // ── POST: mark reviewed ───────────────────────────────────────────────────
  if (event.httpMethod === 'POST') {
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }

    const { id, reviewed, review_notes } = body;
    if (!id) return json(400, { error: 'id required' });

    const { error } = await supabase
      .from('sector_signals')
      .update({ reviewed: reviewed ?? true, review_notes: review_notes || null, reviewed_at: new Date().toISOString() })
      .eq('id', id);

    if (error) return json(502, { error: error.message });
    return json(200, { updated: id });
  }

  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });

  const mode  = event.queryStringParameters?.mode  || 'pulse';
  const limit = Math.min(parseInt(event.queryStringParameters?.limit || '50', 10), 200);

  // ── Pulse mode: this week's signals ──────────────────────────────────────
  if (mode === 'pulse') {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('sector_signals')
      .select('*')
      .gte('created_at', since)
      .order('average_score', { ascending: false })
      .limit(limit);

    if (error) return json(502, { error: error.message });
    return json(200, { mode: 'pulse', signals: applyDecay(data), count: data.length });
  }

  // ── Review mode: unreviewed signals ──────────────────────────────────────
  if (mode === 'review') {
    const { data, error } = await supabase
      .from('sector_signals')
      .select('*')
      .eq('reviewed', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) return json(502, { error: error.message });
    return json(200, { mode: 'review', signals: applyDecay(data), count: data.length });
  }

  // ── All mode: paginated ───────────────────────────────────────────────────
  const { data, error } = await supabase
    .from('sector_signals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return json(502, { error: error.message });
  return json(200, { mode: 'all', signals: applyDecay(data), count: data.length });
};

// ── Stage 3: Decay weighting (applied at query time) ─────────────────────────
// Raw scores are preserved in DB. Weighted score is computed here for display.
function applyDecay(signals) {
  const now = Date.now();
  return (signals || []).map(s => {
    const ageMs      = now - new Date(s.created_at).getTime();
    const ageDays    = ageMs / (1000 * 60 * 60 * 24);
    let weight = 1.0;

    if (ageDays > 90)  weight *= 0.5;   // old signal — half weight
    if (s.confirmed_source_count >= 2) weight *= 1.5;  // multi-source — boost
    // source accuracy weighting (1.2x) reserved for Phase 2 when source history exists

    return {
      ...s,
      weighted_score: Math.min(10, parseFloat((s.average_score * weight).toFixed(1))),
      age_days:       Math.floor(ageDays),
    };
  });
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
