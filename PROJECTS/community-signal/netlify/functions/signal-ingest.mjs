/**
 * signal-ingest.mjs
 * Phase 1 — SENSE layer
 *
 * Receives raw content and queues it for filtering.
 * Two modes:
 *   POST /signal-ingest          — manual or programmatic submission
 *   POST /signal-ingest?mode=rss — RSS feed URL, parsed server-side
 *
 * Payload (manual/email mode):
 *   { source_type, source_name, content }
 *
 * Payload (RSS mode):
 *   { feed_url, source_name }
 *
 * Returns:
 *   { queued: N, job_ids: [...] }
 *
 * Security: protected by INGEST_SECRET header check.
 * No personal data accepted — content is public sector text only.
 */

import Parser from 'rss-parser';

const INGEST_SECRET = process.env.INGEST_SECRET;
const FILTER_URL   = process.env.URL
  ? `${process.env.URL}/.netlify/functions/signal-filter`
  : 'http://localhost:8888/.netlify/functions/signal-filter';

export const handler = async (event) => {
  // Auth check
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const mode = event.queryStringParameters?.mode || 'manual';

  // ── RSS mode ──────────────────────────────────────────────────────────────
  if (mode === 'rss') {
    const { feed_url, source_name } = body;
    if (!feed_url || !source_name) {
      return json(400, { error: 'feed_url and source_name required for RSS mode' });
    }

    const parser = new Parser({ timeout: 8000 });
    let feed;
    try {
      feed = await parser.parseURL(feed_url);
    } catch (err) {
      return json(502, { error: `RSS fetch failed: ${err.message}` });
    }

    // Cap at 3 items and batch into one content block — one Claude call fits in Netlify's 10s limit
    const items = (feed.items || []).slice(0, 3);
    const batchContent = items
      .map((item, i) => {
        const text = [
          item.title || '',
          item.contentSnippet || item.summary || item.content || '',
          item.link   ? `Source: ${item.link}` : '',
          item.pubDate ? `Published: ${item.pubDate}` : '',
        ].filter(Boolean).join('\n');
        return `--- Item ${i + 1} ---\n${text}`;
      })
      .join('\n\n');

    if (batchContent.trim().length < 50) {
      return json(200, { queued: 0, job_ids: [], note: 'Feed items had insufficient content' });
    }

    const jobId = await forwardToFilter({
      source_type:        'rss',
      source_name,
      source_attribution: `${source_name} RSS feed (${feed_url})`,
      content:            batchContent,
    });

    return json(200, { queued: 1, job_ids: [jobId] });
  }

  // ── Manual / email mode ───────────────────────────────────────────────────
  const { source_type, source_name, source_attribution, content } = body;

  if (!source_type || !source_name || !content) {
    return json(400, { error: 'source_type, source_name, and content required' });
  }

  if (content.length > 50000) {
    return json(413, { error: 'Content too large (max 50,000 chars)' });
  }

  const jobId = await forwardToFilter({
    source_type,
    source_name,
    source_attribution: source_attribution || source_name,
    content,
  });

  return json(200, { queued: 1, job_ids: [jobId] });
};

// ── Helpers ───────────────────────────────────────────────────────────────────

async function forwardToFilter(payload) {
  const jobId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const res = await fetch(FILTER_URL, {
    method:  'POST',
    headers: {
      'Content-Type':    'application/json',
      'x-ingest-secret': INGEST_SECRET,
      'x-job-id':        jobId,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.status);
    throw new Error(`signal-filter returned ${res.status}: ${err}`);
  }
  return jobId;
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json' },
    body:       JSON.stringify(body),
  };
}
