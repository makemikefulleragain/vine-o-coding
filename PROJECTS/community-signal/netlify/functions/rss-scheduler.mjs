/**
 * rss-scheduler.mjs
 * Phase 1.5 — PRODUCTION SOURCES
 *
 * Netlify scheduled function — runs daily at 6am AWST (22:00 UTC previous day).
 * Reads rss-sources.json, determines which sources are due for fetch today,
 * calls signal-ingest?mode=rss for each, logs results to source_fetch_log.
 *
 * Schedule: "0 22 * * *"  (10pm UTC = 6am AWST)
 *
 * Env vars required:
 *   INGEST_SECRET
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   URL  (set automatically by Netlify)
 */

import { createClient } from '@supabase/supabase-js';

export const config = {
  schedule: '0 22 * * *',
};

const INGEST_SECRET = process.env.INGEST_SECRET;
const supabase      = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INGEST_URL = process.env.URL
  ? `${process.env.URL}/.netlify/functions/signal-ingest`
  : 'http://localhost:8888/.netlify/functions/signal-ingest';

// rss-sources.json embedded inline to avoid Netlify path issues
import SOURCES_DATA from '../../data/rss-sources.json' assert { type: 'json' };

export const handler = async () => {
  const today     = new Date();
  const dayOfWeek = today.getUTCDay();   // 0=Sun, 1=Mon ... 6=Sat
  const weekNum   = getISOWeek(today);

  const activeSources = SOURCES_DATA.sources.filter(s =>
    s.status === 'active' &&
    s.rss_url &&
    isDueToday(s.fetch_frequency, dayOfWeek, weekNum)
  );

  if (activeSources.length === 0) {
    console.log('rss-scheduler: no sources due today');
    return;
  }

  console.log(`rss-scheduler: ${activeSources.length} source(s) due — ${activeSources.map(s => s.id).join(', ')}`);

  const results = await Promise.allSettled(
    activeSources.map(source => fetchSource(source))
  );

  const summary = results.map((r, i) => ({
    source: activeSources[i].id,
    status: r.status === 'fulfilled' ? r.value.status : 'failure',
    signals_queued: r.status === 'fulfilled' ? r.value.signals_queued : 0,
    error: r.status === 'rejected' ? r.reason?.message : (r.value?.error || null),
  }));

  console.log('rss-scheduler summary:', JSON.stringify(summary));
};

// ── Fetch a single source ─────────────────────────────────────────────────────

async function fetchSource(source) {
  const start = Date.now();

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${INGEST_URL}?mode=rss`, {
        method:  'POST',
        headers: {
          'Content-Type':    'application/json',
          'x-ingest-secret': INGEST_SECRET,
        },
        body: JSON.stringify({
          feed_url:    source.rss_url,
          source_name: source.name,
        }),
        signal: AbortSignal.timeout(20000),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (attempt < 3) {
          await sleep(attempt * 2000);
          continue;
        }
        const err = data.error || `HTTP ${res.status}`;
        await logFetch(source, 'failure', 0, err, Date.now() - start);
        return { status: 'failure', signals_queued: 0, error: err };
      }

      const queued = data.queued || 0;
      await logFetch(source, 'success', queued, null, Date.now() - start);
      return { status: 'success', signals_queued: queued };

    } catch (err) {
      if (attempt < 3) {
        await sleep(attempt * 2000);
        continue;
      }
      await logFetch(source, 'failure', 0, err.message, Date.now() - start);
      return { status: 'failure', signals_queued: 0, error: err.message };
    }
  }
}

// ── Supabase log write ────────────────────────────────────────────────────────

async function logFetch(source, status, signals_queued, error_message, duration_ms) {
  const { error } = await supabase.from('source_fetch_log').insert({
    source_id:      source.id,
    source_name:    source.name,
    status,
    signals_queued,
    error_message:  error_message || null,
    duration_ms,
  });
  if (error) {
    console.error('source_fetch_log write failed:', error.message);
  }
}

// ── Schedule helpers ──────────────────────────────────────────────────────────

function isDueToday(fetch_frequency, dayOfWeek, weekNum) {
  switch (fetch_frequency) {
    case 'daily':
      return true;
    case 'weekly':
      return dayOfWeek === 1;   // Monday
    case 'fortnightly':
      return dayOfWeek === 1 && weekNum % 2 === 1;   // Alternate Mondays
    case 'monthly':
      return dayOfWeek === 1 && new Date().getUTCDate() <= 7;   // First Monday of month
    default:
      return false;
  }
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
