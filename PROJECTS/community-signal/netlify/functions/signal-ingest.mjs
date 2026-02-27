/**
 * signal-ingest.mjs
 * Phase 1 + Phase 1.5 — SENSE + PRODUCTION SOURCES layers
 *
 * Receives raw content and queues it for filtering.
 * Three modes:
 *   POST /signal-ingest              — manual or programmatic submission (JSON)
 *   POST /signal-ingest?mode=rss     — RSS feed URL, parsed server-side
 *   POST /signal-ingest?mode=resend — Resend inbound webhook (JSON)
 *
 * Payload (manual/email mode):
 *   { source_type, source_name, content }
 *
 * Payload (RSS mode):
 *   { feed_url, source_name }
 *
 * Resend mode: JSON POST from Resend inbound webhook.
 *   Verifies Resend webhook signature, then fetches email body via Resend API.
 *   Uses RESEND_WEBHOOK_SECRET for signature verification.
 *   Uses RESEND_API_KEY to fetch email body content.
 *
 * Returns:
 *   { queued: N, job_ids: [...] }
 *
 * Security:
 *   - JSON modes: protected by INGEST_SECRET header check.
 *   - Resend mode: verified by Resend webhook signature (svix).
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_SECRET,
 *           RESEND_WEBHOOK_SECRET, RESEND_API_KEY
 */

import Parser  from 'rss-parser';
import crypto  from 'crypto';
import { createClient } from '@supabase/supabase-js';

const INGEST_SECRET       = process.env.INGEST_SECRET;
const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;
const RESEND_API_KEY      = process.env.RESEND_API_KEY;
const FILTER_URL          = process.env.URL
  ? `${process.env.URL}/.netlify/functions/signal-filter`
  : 'http://localhost:8888/.netlify/functions/signal-filter';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const mode = event.queryStringParameters?.mode || 'manual';

  // ── Resend inbound webhook mode ──────────────────────────────────────────
  // Resend POSTs JSON — no x-ingest-secret header.
  // Verified instead by Resend webhook signature.
  if (mode === 'resend') {
    return handleResend(event);
  }

  // Auth check for all non-Mailgun modes
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

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

// ── Resend inbound handler ───────────────────────────────────────────────────
// Resend sends JSON: { type: 'email.received', data: { email_id, from, to, subject, ... } }
// Body text is NOT in the webhook — must be fetched via Resend API using email_id.

async function handleResend(event) {
  // Verify Resend webhook signature (svix-based)
  if (RESEND_WEBHOOK_SECRET) {
    const svixId        = event.headers['svix-id']        || '';
    const svixTimestamp = event.headers['svix-timestamp']  || '';
    const svixSignature = event.headers['svix-signature']  || '';
    const toSign        = `${svixId}.${svixTimestamp}.${event.body}`;
    const expected      = crypto
      .createHmac('sha256', Buffer.from(RESEND_WEBHOOK_SECRET.replace(/^whsec_/, ''), 'base64'))
      .update(toSign)
      .digest('base64');
    const signatures = svixSignature.split(' ').map(s => s.replace(/^v1,/, ''));
    if (!signatures.includes(expected)) {
      console.error('Resend webhook signature mismatch — rejecting');
      return json(401, { error: 'Invalid signature' });
    }
  } else {
    console.warn('RESEND_WEBHOOK_SECRET not set — skipping signature check');
  }

  let payload;
  try { payload = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }

  if (payload.type !== 'email.received') {
    return json(200, { queued: 0, note: `Ignored event type: ${payload.type}` });
  }

  const { email_id, from, to, subject } = payload.data || {};
  if (!email_id) return json(400, { error: 'Missing email_id in Resend payload' });

  // Fetch the actual email body from Resend API
  let bodyText = '';
  if (RESEND_API_KEY) {
    try {
      const res = await fetch(`https://api.resend.com/emails/receiving/${email_id}`, {
        headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
      });
      if (res.ok) {
        const email = await res.json();
        bodyText = email.text || email.html?.replace(/<[^>]+>/g, ' ') || '';
      } else {
        console.warn(`Resend email fetch failed: ${res.status}`);
      }
    } catch (err) {
      console.warn(`Resend email fetch error: ${err.message}`);
    }
  }

  if (bodyText.trim().length < 20) {
    return json(200, { queued: 0, note: 'Email body too short or unavailable — skipped' });
  }

  // Detect Mob Field Report: "[FIELD] Topic description"
  const isFieldReport = /^\[FIELD\]/i.test(subject || '');
  
  // Extract source name from subject: "[MANUAL] Source Name" or "[FIELD] Topic"
  const subjectMatch = (subject || '').match(/\[(MANUAL|FIELD)\]\s*(.+?)(?:\s*-\s*\d{4}-\d{2}-\d{2})?$/i);
  const sourceName   = subjectMatch ? subjectMatch[2].trim() : `Email from ${from}`;

  const recipient = Array.isArray(to) ? to.join(', ') : (to || '');
  const content   = `Subject: ${subject}\nFrom: ${from}\nTo: ${recipient}\n\n${bodyText}`.slice(0, 50000);

  const jobId = await forwardToFilter({
    source_type:        'email',
    source_name:        sourceName,
    source_attribution: `Inbound email — ${subject}`,
    content,
  });

  // If this is a Mob Field Report, seed research_strategy
  if (isFieldReport) {
    await seedFieldReport(sourceName, bodyText);
  }

  console.log(`Resend inbound processed: source="${sourceName}" job=${jobId}${isFieldReport ? ' [FIELD REPORT]' : ''}`);
  return json(200, { queued: 1, job_ids: [jobId] });
}

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

async function seedFieldReport(topic, bodyText) {
  try {
    // Check if topic already exists in research_strategy
    const { data: existing } = await supabase
      .from('research_strategy')
      .select('id')
      .eq('topic', topic)
      .single();

    if (existing) {
      console.log(`Field report topic "${topic}" already exists in research_strategy`);
      return;
    }

    // Create prompt template from field report content
    const promptTemplate = `Research the following topic for the Western Australian community sector:\n\n${bodyText.slice(0, 500)}\n\nProvide actionable insights, identify relevant organisations, funding opportunities, and policy implications for WA NFPs.`;

    // Insert new research strategy with mob_field source and priority boost
    const { error } = await supabase.from('research_strategy').insert({
      topic,
      source_type: 'mob_field',
      prompt_template: promptTemplate,
      score_avg: 8.0,  // High initial score for human-sourced topics
      priority_weight: 1.5,  // Priority boost over system-generated topics
      status: 'active',
      notes: `Mob Field Report submitted via email`,
    });

    if (error) {
      console.error('Failed to seed field report:', error.message);
    } else {
      console.log(`Seeded new research topic from field report: "${topic}"`);
    }
  } catch (err) {
    console.error('seedFieldReport error:', err.message);
  }
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json' },
    body:       JSON.stringify(body),
  };
}
