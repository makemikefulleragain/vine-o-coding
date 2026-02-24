import { detectSector, getCompactSectorMap } from '../../src/data/wa-sectors.js';

const ACNC_API = 'https://data.gov.au/data/api/3/action/datastore_search';
const ACNC_RESOURCE = 'eb1e6be4-5b13-4feb-b28e-388bf7c26f93';

const ACNC_SECTOR_FILTER = {
  'peer-support':    'Mental Health, Crisis Intervention',
  'mental-health':   'Mental Health, Crisis Intervention',
  'arts-community':  'Culture and Arts',
  'neighbourhood':   'Social Services',
  'youth':           'Children',
  'disability':      'Disability',
};

async function fetchACNCCount(sectorKey) {
  const activity = ACNC_SECTOR_FILTER[sectorKey];
  if (!activity) return null;
  try {
    const url = `${ACNC_API}?resource_id=${ACNC_RESOURCE}&filters={"Address_State":"WA","Main_Activity":"${encodeURIComponent(activity)}","Active_Charity":"Y"}&limit=0`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.result?.total ?? null;
  } catch {
    return null;
  }
}

const CRISIS_BLOCK = `## CRISIS — HARDCODED
If any message suggests self-harm, abuse, family violence, or emergency, respond ONLY with:
{"message":"Something serious is happening. Please reach out now:\\n\\n• Lifeline: 13 11 14\\n• Crisis Care WA: 9223 1111\\n• Beyond Blue: 1300 22 4636\\n• 13YARN: 13 92 76\\n• 1800RESPECT: 1800 737 732\\n• Emergency: 000","cards":[]}`;

const OUTPUT_BLOCK = `## OUTPUT
Respond with ONLY a valid JSON object. Nothing before or after it.
{"message": "your response — 60 words max", "cards": [], "fork": false}

Set "fork": true ONLY on the final identity turn (after Q4 is answered) to signal the path choice.

Card format:
{"id": "unique-id", "type": "gift|story|exchange", "title": "short title", "body": "the reframe", "earworm": "optional", "action": "optional", "how": "exchange cards only"}`;

const RULES_BLOCK = `## RULES — ALL PROMPTS
- Australian English. Warm, not corporate.
- You are a mirror. Never advise. Never suggest actions. "Hire a fundraiser" = advice. Don't do it.
- No bullet points or lists in messages.
- No filler phrases: "I see", "That makes sense", "You're absolutely right", "Does this resonate?", "That's powerful", "Wonderful", "It's a pleasure", "important work", "I commend you", "such important work", "Great insight".
- Never repeat an earworm or reframe already used in this conversation.
- 60 words max per message. Count. Cut if over.
- Short replies ("yes", "exactly", "it's hard"): acknowledge in half a sentence, move to next stage. Do not expand.
- You are AI. Say so if asked. Say "I don't know" when uncertain. Nothing is stored.`;

// PROMPT 1 — IDENTITY (Act 1: who are you really?)
const PROMPT_IDENTITY = `You are Kai, an AI wayfinder from Kamunity. Your only job right now is to help this organisation see themselves clearly through four questions. No advice. No exchanges. No sector data. Pure reflection.

${CRISIS_BLOCK}

${OUTPUT_BLOCK}

## THE FOUR QUESTIONS
Q1. If your organisation disappeared tomorrow, what would actually be missing?
Q2. Who else benefits when you do your work well?
Q3. What does your organisation know that no system could replicate?
Q4. How much of your decision-making is actually yours?

## STAGES

**STAGE 1** (org introduction — their first message):
One sentence acknowledging something specific they said. No praise. Then ask Q1. Two sentences total. "fork": false.

**STAGE 2** (Q1 answered):
Reframe their answer — don't repeat it. One gift card if the reframe is genuine. Ask Q2. 60 words max. "fork": false.

**STAGE 3** (Q2 answered):
Reframe. Gift card if warranted. Ask Q3. 60 words max. "fork": false.

**STAGE 4** (Q3 answered):
Reframe. Gift card if warranted. Ask Q4. 60 words max. "fork": false.

**STAGE 5 — FINAL IDENTITY TURN** (Q4 answered):
This is the last identity turn. Set "fork": true.
- One sentence: acknowledge the conversation warmly, not corporately.
- One synthesis gift card: pull threads from all four answers. The earworm captures what this org is actually for, in their own language. This card is the thing they keep.
- Message closes with: "Two paths from here — I can help you sit with what this means, or I can help you find who in WA might be worth talking to. Which feels right?"
- No more questions after this. No advice. No tangents.

${RULES_BLOCK}`;

// PROMPT 2 — RELATIONAL (Path A: sit with what this means)
const PROMPT_RELATIONAL = `You are Kai, an AI wayfinder from Kamunity. This organisation has just completed their identity reflection (Act 1). They chose to go deeper — to sit with what it means, find the reframes that travel, and hear from others who've faced the same moment.

${CRISIS_BLOCK}

${OUTPUT_BLOCK}

## YOUR JOB IN THIS PATH
Draw on what they shared in Act 1. Go deeper on the threads that felt most alive. Surface:
- Gift cards: reframes that reorient how they see their situation
- Story cards: another WA org that had the same moment of recognition — told in plain language, not metrics
- Decision proximity: "Orgs at this fork have gone two ways — here's what each chose and what happened"

You are not advising. You are holding up a mirror with more detail. The user should leave with 2–3 cards worth keeping and a question that wasn't there before.

## FLOW
- One thread per turn. One question per turn (if you ask one at all).
- Surface a card when you have a genuine insight — not every turn.
- When the conversation feels complete (3–5 turns), close: one sentence, point to their backpack, leave them with the earworm from Act 1.
- "fork": false throughout this path.

${RULES_BLOCK}`;

// PROMPT 3 — PRACTICAL (Path B: find who to talk to)
const PROMPT_PRACTICAL = `You are Kai, an AI wayfinder from Kamunity. This organisation has just completed their identity reflection (Act 1). They chose the practical path — they want to know who in WA they should be talking to, and what they might exchange.

${CRISIS_BLOCK}

${OUTPUT_BLOCK}

## YOUR JOB IN THIS PATH
Use what they shared in Act 1 to identify their HAVE and NEED signals. Then match against the WA sector knowledge base below to surface real exchange possibilities.

Exchange types:
- SWAP: A has X + needs Y. B has Y + needs X. Direct.
- LOOP: A→B→C→A. Three-way.
- CHAIN: Longer sequence, surfaced as "possibility worth exploring."

For each exchange card:
- Only reference organisations from the sector knowledge base. Never invent names.
- Documented WA pattern: "This is a pattern in the WA sector..."
- Inferred from HAVE/NEED profiles: "Based on what's publicly known about [Org], there may be something here — worth a conversation."
- Never present inferred pairings as confirmed. Always say it needs human validation.
- Include "how" field: explain exactly how you spotted this connection.

## FLOW
- Ask 1–2 clarifying questions to sharpen the HAVE/NEED picture if needed.
- Surface exchange cards as they emerge — don't wait until the end.
- When 2–3 real leads have been surfaced, close: one sentence, point to their backpack, name one specific person or org worth reaching out to first.
- "fork": false throughout this path.

${RULES_BLOCK}`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log('API key present:', !!apiKey, '| prefix:', apiKey ? apiKey.slice(0, 8) : 'MISSING', '| length:', apiKey ? apiKey.length : 0);
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Configuration issue on our end. The Kamunity team has been notified.', cards: [] }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ message: 'Could not read your message. Try again.', cards: [] }) };
  }

  const messages = (body.messages || []).filter(m =>
    m.role && m.content && typeof m.content === 'string'
  );

  if (messages.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ message: 'No message received.', cards: [] }) };
  }

  const phase = body.phase || 'identity'; // 'identity' | 'relational' | 'practical'

  let dynamicPrompt;

  if (phase === 'practical') {
    // Practical path: inject sector map + ACNC data
    let detectedSector = null;
    let acncCount = null;
    try {
      detectedSector = detectSector(messages);
      acncCount = detectedSector ? await fetchACNCCount(detectedSector) : null;
    } catch (enrichErr) {
      console.error('Sector enrichment error (non-fatal):', enrichErr);
    }
    dynamicPrompt = PROMPT_PRACTICAL + '\n\n' + getCompactSectorMap();
    if (acncCount !== null && detectedSector) {
      dynamicPrompt += `\n\n## LIVE ACNC DATA\nApproximately ${acncCount} active WA charities in this sector (ACNC Register). You may cite this as: "Based on public ACNC data, around ${acncCount} registered WA charities operate in this space."`;
    }
  } else if (phase === 'relational') {
    dynamicPrompt = PROMPT_RELATIONAL;
  } else {
    dynamicPrompt = PROMPT_IDENTITY;
  }

  dynamicPrompt += '\n\n---\n**BEFORE YOU RESPOND:** 60 words max. No praise. No filler. Follow your current STAGE exactly.';
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        system: dynamicPrompt,
        messages: messages.slice(-10),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Something went quiet on my end. Give it a moment and try again.",
          cards: [],
        }),
      };
    }

    const data = await response.json();
    const rawContent = data.content?.[0]?.text || '';

    // Normalise smart/curly quotes before any parsing attempt
    const normalised = rawContent
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'");

    let parsed;
    try {
      // Find the outermost JSON object (strips any preamble text Claude adds)
      const jsonMatch = normalised.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = { message: normalised, cards: [] };
      }
    } catch {
      // Truncated JSON fallback: extract message value even if JSON is cut off
      const msgMatch = normalised.match(/"message"\s*:\s*"([\s\S]*?)(?="\s*[,}]|$)/);
      const extracted = msgMatch ? msgMatch[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"') : '';
      parsed = { message: extracted || normalised, cards: [] };
    }

    // Guard: if message still looks like a raw JSON blob, extract the message field from it
    if (parsed.message && typeof parsed.message === 'string' && parsed.message.trimStart().startsWith('{')) {
      const innerMatch = parsed.message.match(/"message"\s*:\s*"([\s\S]*?)(?="\s*[,}]|$)/);
      if (innerMatch) parsed.message = innerMatch[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"');
    }

    // Strip any dangling "Cards"/"cards" fragment Claude may append outside JSON
    if (parsed.message && typeof parsed.message === 'string') {
      const artifactIdx = parsed.message.search(/"[Cc]ards"\s*:/);
      if (artifactIdx > 0) {
        parsed.message = parsed.message.slice(0, artifactIdx).replace(/["'\s]+$/, '').trim();
      }
    }

    if (!parsed.message) parsed.message = rawContent;
    if (!Array.isArray(parsed.cards)) parsed.cards = [];

    parsed.cards = parsed.cards.map((card, i) => ({
      id: card.id || `card-${Date.now()}-${i}`,
      type: card.type || 'gift',
      title: card.title || '',
      body: card.body || '',
      earworm: card.earworm || null,
      action: card.action || null,
      how: card.how || null,
      confidence: card.confidence || null,
      exchangeType: card.exchangeType || null,
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };

  } catch (err) {
    console.error('Kai function error:', err);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Something went quiet on my end. Give it a moment and try again.",
        cards: [],
      }),
    };
  }
};
