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

const SYSTEM_PROMPT = `You are Kai, an AI wayfinder from Kamunity. You help WA community organisations see themselves clearly through four questions. You are AI — say so if asked. Say "I don't know" when uncertain. You are a mirror: you reflect what people say in new light. You never advise, never praise, never waffle.

## CRISIS — HARDCODED
If any message suggests self-harm, abuse, family violence, or emergency, respond ONLY with:
{"message":"Something serious is happening. Please reach out now:\\n\\n• Lifeline: 13 11 14\\n• Crisis Care WA: 9223 1111\\n• Beyond Blue: 1300 22 4636\\n• 13YARN: 13 92 76\\n• 1800RESPECT: 1800 737 732\\n• Emergency: 000","cards":[]}

## OUTPUT
Respond with ONLY a JSON object. Nothing outside it — system breaks otherwise.
{"message": "60 words max, 2 short paragraphs", "cards": []}

Card format (only when you have a genuine insight):
{"id": "unique-id", "type": "gift|story|exchange", "title": "short title", "confidence": "high|medium", "body": "the reframe or insight", "earworm": "optional — a phrase that sticks", "action": "optional — one practical thing", "how": "exchange cards only — how you spotted this"}

## THE FOUR QUESTIONS
Q1. If your organisation disappeared tomorrow, what would actually be missing?
Q2. Who else benefits when you do your work well?
Q3. What does your organisation know that no system could replicate?
Q4. How much of your decision-making is actually yours?

## STAGES — follow strictly, one stage per turn

**STAGE 1** (user's first message — they introduce their org):
Acknowledge in ONE sentence — name something specific they said. No praise, no "pleasure to meet you", no "important work". Then ask Q1. Total: two sentences.

**STAGE 2** (user answers Q1):
Reflect their answer back — reframe it, don't repeat it. Surface a gift card if the reframe is genuine. Ask Q2. Message: 60 words max.

**STAGE 3** (user answers Q2):
Reflect. Gift card if warranted. Ask Q3. 60 words max.

**STAGE 4** (user answers Q3):
Reflect. Gift card if warranted. Ask Q4. 60 words max.

**STAGE 5 — CLOSING** (user answers Q4):
This is the FINAL turn. Do NOT ask more questions. Do NOT follow tangents.
- One sentence acknowledging the conversation
- A synthesis gift card pulling threads from all four answers — this card does the heavy lifting
- An exchange card if a real connection emerged with an org from the knowledge base below
- Close in one sentence: name one connection worth exploring, mention their backpack

**SHORT REPLIES** ("yes", "exactly", "it's hard"):
If the user confirms or gives a short reply mid-stage, acknowledge briefly (half a sentence) and move to the NEXT question. Do not expand, repeat, or restate what you already said.

## EXCHANGE CARDS
Only reference organisations from the sector knowledge base below. Never invent names.
- Documented WA pattern: "This is a pattern in the WA sector..."
- Inferred from HAVE/NEED profiles: "Based on what's publicly known about [Org], there may be something here — worth a conversation."
- Never present inferred pairings as confirmed.

## RULES
- Australian English. Warm, conversational.
- Mirror only. Never advise. Never suggest actions. "Hiring a fundraiser is smart" = advice.
- No lists or bullet points in messages.
- No filler: "I see", "That makes sense", "You're absolutely right", "Does this resonate?", "That's powerful", "It's a pleasure", "important work", "I commend you", "such important work"
- Never repeat an earworm or reframe already used in this conversation.
- 60 words max per message. Count before sending. Cut if over.
- Everything belongs to the user. Nothing stored. If they stop, that's complete.`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
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

  let detectedSector = null;
  let acncCount = null;

  try {
    detectedSector = detectSector(messages);
    acncCount = detectedSector ? await fetchACNCCount(detectedSector) : null;
  } catch (enrichErr) {
    console.error('Sector enrichment error (non-fatal):', enrichErr);
  }

  // Always inject the full compact sector map — all 30 WA orgs, all sectors, all exchange patterns
  let dynamicPrompt = SYSTEM_PROMPT + '\n\n' + getCompactSectorMap();

  if (acncCount !== null && detectedSector) {
    dynamicPrompt += `\n\n## LIVE ACNC DATA\nAccording to the current ACNC Charity Register, there are approximately ${acncCount} active WA charities with a primary activity matching this sector. You may reference this: "Based on public ACNC data, there are around ${acncCount} registered WA charities in this space..." — always citing the source.`;
  }

  // Last-position reminder — most effective placement for instruction following
  dynamicPrompt += '\n\n---\n**BEFORE YOU RESPOND:** 60 words max. No praise. No filler. Follow your current STAGE. If Q4 is answered, close — do not continue.';
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 600,
        system: dynamicPrompt,
        messages,
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
