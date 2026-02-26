/**
 * dm-send.mjs
 * Phase 4 — OFFER layer
 *
 * Generates a personalised DM from a commons library artifact + contact match,
 * queues it for Mike's review, and sends via Resend when approved.
 *
 * Called:
 *   POST /dm-send?mode=draft&contact_id=<uuid>&library_id=<uuid>  — generate + queue
 *   POST /dm-send?mode=approve&queue_id=<uuid>                     — approve + send
 *   POST /dm-send?mode=reject&queue_id=<uuid>                      — reject (no send)
 *   GET  /dm-send?mode=queue                                        — list outreach queue
 *
 * Constitutional:
 * - Mike reviews and approves every DM before send
 * - DM contains nothing that traces back to the signal source
 * - Matching reason is transparent but non-identifying
 * - Artifact included inline (not behind a link) — the gift IS the thing
 *
 * Security: protected by INGEST_SECRET header.
 */

import Anthropic   from '@anthropic-ai/sdk';
import { Resend }  from 'resend';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend        = new Resend(process.env.RESEND_API_KEY);
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;
const FROM_EMAIL    = process.env.FROM_EMAIL || 'mike@kamunity.org';
const FROM_NAME     = process.env.FROM_NAME  || 'Mike Fuller, Kamunity';

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

  const mode      = event.queryStringParameters?.mode;
  const contactId = event.queryStringParameters?.contact_id;
  const libraryId = event.queryStringParameters?.library_id;
  const queueId   = event.queryStringParameters?.queue_id;

  // ── GET contacts: list opted-in contacts ──────────────────────────────────
  if (event.httpMethod === 'GET' && mode === 'contacts') {
    const { data, error } = await supabase
      .from('opted_in_contacts')
      .select('*')
      .is('unsubscribed_at', null)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) return json(502, { error: 'DB read failed', detail: error.message });
    return json(200, { contacts: data || [] });
  }

  // ── GET queue: list all outreach items ─────────────────────────────────────
  if (event.httpMethod === 'GET' && mode === 'queue') {
    const { data, error } = await supabase
      .from('outreach_queue')
      .select('*, opted_in_contacts(email, first_name, org_name), commons_library(artifact_title, triage_result)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return json(502, { error: 'DB read failed', detail: error.message });
    return json(200, { queue: data || [] });
  }

  if (event.httpMethod !== 'POST') return json(405, { error: 'POST required' });

  // ── Draft mode: generate DM + queue for review ────────────────────────────
  if (mode === 'draft') {
    if (!contactId || !libraryId) {
      return json(400, { error: 'contact_id and library_id required' });
    }

    // Fetch contact + artifact in parallel
    const [contactRes, artifactRes] = await Promise.all([
      supabase.from('opted_in_contacts').select('*').eq('id', contactId).single(),
      supabase.from('commons_library').select('*, patterns(summary)').eq('id', libraryId).single(),
    ]);

    if (contactRes.error || !contactRes.data) return json(404, { error: 'Contact not found' });
    if (artifactRes.error || !artifactRes.data) return json(404, { error: 'Library item not found' });

    const contact  = contactRes.data;
    const artifact = artifactRes.data;

    if (contact.unsubscribed_at) return json(400, { error: 'Contact has unsubscribed' });

    const dm = await generateDM(contact, artifact);

    const { data: queued, error: qErr } = await supabase
      .from('outreach_queue')
      .insert({
        contact_id:       contactId,
        library_id:       libraryId,
        subject:          dm.subject,
        body_text:        dm.body,
        artifact_title:   artifact.artifact_title,
        artifact_content: artifact.artifact_content,
        match_reason:     dm.match_reason,
        status:           'pending',
        created_at:       new Date().toISOString(),
        updated_at:       new Date().toISOString(),
      })
      .select('id')
      .single();

    if (qErr) return json(502, { error: 'Queue insert failed', detail: qErr.message });

    return json(200, {
      queued:       true,
      queue_id:     queued.id,
      subject:      dm.subject,
      body_preview: dm.body.slice(0, 300),
      match_reason: dm.match_reason,
    });
  }

  // ── Approve mode: send via Resend ─────────────────────────────────────────
  if (mode === 'approve') {
    if (!queueId) return json(400, { error: 'queue_id required' });

    const { data: item, error: fetchErr } = await supabase
      .from('outreach_queue')
      .select('*, opted_in_contacts(email, first_name)')
      .eq('id', queueId)
      .single();

    if (fetchErr || !item) return json(404, { error: 'Queue item not found' });
    if (item.status !== 'pending') return json(400, { error: `Cannot approve — status is "${item.status}"` });

    const contact = item.opted_in_contacts;

    // Build the full email body (artifact inline)
    const fullBody = buildEmailBody(item, contact);

    let resendId = null;
    try {
      const sendResult = await resend.emails.send({
        from:    `${FROM_NAME} <${FROM_EMAIL}>`,
        to:      contact.email,
        subject: item.subject,
        text:    fullBody,
      });
      resendId = sendResult?.data?.id || null;
    } catch (err) {
      return json(502, { error: 'Email send failed', detail: err.message });
    }

    // Update queue + contact
    await Promise.all([
      supabase.from('outreach_queue').update({
        status:           'sent',
        reviewed_by:      'Mike',
        reviewed_at:      new Date().toISOString(),
        sent_at:          new Date().toISOString(),
        resend_message_id: resendId,
        updated_at:       new Date().toISOString(),
      }).eq('id', queueId),
      supabase.from('opted_in_contacts').update({
        last_contacted_at: new Date().toISOString(),
        contact_count:     item.opted_in_contacts?.contact_count + 1 || 1,
        updated_at:        new Date().toISOString(),
      }).eq('id', item.contact_id),
    ]);

    console.log(`DM sent to ${contact.email} (queue: ${queueId}, resend: ${resendId})`);
    return json(200, { sent: true, queue_id: queueId, resend_id: resendId });
  }

  // ── Reject mode: mark rejected, no send ──────────────────────────────────
  if (mode === 'reject') {
    if (!queueId) return json(400, { error: 'queue_id required' });

    const { error } = await supabase
      .from('outreach_queue')
      .update({
        status:      'rejected',
        reviewed_by: 'Mike',
        reviewed_at: new Date().toISOString(),
        updated_at:  new Date().toISOString(),
      })
      .eq('id', queueId);

    if (error) return json(502, { error: 'DB update failed', detail: error.message });
    return json(200, { rejected: true, queue_id: queueId });
  }

  return json(400, { error: 'Valid modes: draft, approve, reject, queue' });
};

// ── DM generator ──────────────────────────────────────────────────────────────

async function generateDM(contact, artifact) {
  const firstName = contact.first_name || 'there';
  const orgName   = contact.org_name   || 'your organisation';

  const prompt = `You are writing a personal email from Mike Fuller at Kamunity to ${firstName} at ${orgName}.

Context:
- ${firstName} opted in to hear about useful resources after a conversation with Kai (Kamunity's AI wayfinder)
- Their interest area: ${contact.interest_summary || 'WA community sector challenges'}
- Sector tags: ${(contact.sector_tags || []).join(', ') || 'community sector'}
- We generated a resource that matches their situation: "${artifact.artifact_title}"
- Triage result: ${artifact.triage_result} — ${triageLabel(artifact.triage_result)}

Rules for this email:
1. SHORT — max 5 sentences before the resource. Time-poor ops coordinator.
2. DIRECT — "Here's the thing we made. It's for [specific situation]. Use it how it helps."
3. TRANSPARENT matching reason — explain why this is relevant WITHOUT revealing the signal source
4. THE ARTIFACT IS THE GIFT — mention it's included below, not behind a link
5. HUMAN — Mike writes like a person, not a newsletter. No marketing language.
6. HONEST — if it's not perfect for their situation, say so and say why it might still help
7. End with: one low-pressure question (not "let me know if useful" — something specific)
8. Include unsubscribe line: "Not relevant? Unsubscribe instantly: [UNSUBSCRIBE_LINK]"

Generate in this exact JSON format:
{
  "subject": "Subject line (max 8 words, specific, no clickbait)",
  "body": "The email body (plain text, no markdown in body)",
  "match_reason": "One sentence: why this artifact was matched to this person (for Mike's review log — non-identifying)"
}`;

  const msg = await anthropic.messages.create({
    model:      'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages:   [{ role: 'user', content: prompt }],
  });

  const text  = msg.content[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in DM generation response');
  return JSON.parse(match[0]);
}

function triageLabel(result) {
  const labels = {
    FIND:    'existing tool recommended',
    CONNECT: 'connect to existing solution',
    EXTEND:  'bridge to existing tool',
    MAKE:    'new resource generated',
  };
  return labels[result] || result;
}

function buildEmailBody(item, contact) {
  const firstName = contact.first_name || 'there';
  const unsubLink = `https://community-signal.netlify.app/.netlify/functions/opt-in?mode=unsubscribe&email=${encodeURIComponent(contact.email)}`;

  return `${item.body_text.replace('[UNSUBSCRIBE_LINK]', unsubLink)}

---

${item.artifact_title}

${item.artifact_content}

---
Kamunity — community sector technology, Perth WA
Unsubscribe: ${unsubLink}`;
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
