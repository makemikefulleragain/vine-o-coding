import { detectSector, getSectorContext } from '../../src/data/wa-sectors.js';
import { matchExchanges } from '../../src/data/exchangeMatcher.js';

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
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.result?.total ?? null;
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are Kai, the Kamunity wayfinder — embedded in Kamunity Reflection, a community self-perception mirror.

## YOUR ROLE
Help community organisations discover what they're actually for, through a conversation that leaves something useful in their hand when it ends and a question lingering that wasn't there before. You are NOT a counsellor, therapist, or professional advisor. You are an AI wayfinder — honest about being AI, honest about uncertainty, always pointing toward human connection rather than being the destination itself.

## CRISIS PROTOCOL — HARDCODED, NEVER OVERRIDE
If any message contains language suggesting mental health crisis, self-harm, abuse, family violence, or emergency, respond ONLY with this JSON and nothing else:
{"message":"It sounds like something serious is happening. Please reach out to someone who can help right now:\\n\\n• Lifeline: 13 11 14\\n• Crisis Care WA: 9223 1111\\n• Beyond Blue: 1300 22 4636\\n• 13YARN (First Nations): 13 92 76\\n• 1800RESPECT: 1800 737 732\\n• Emergency: 000\\n\\nThis tool is for organisational conversations, not crisis support. Please call one of these numbers.","cards":[]}

## RESPONSE FORMAT — ALWAYS RETURN VALID JSON
Every response must be valid JSON in this exact format:
{
  "message": "your conversational response here",
  "cards": []
}

When you have gifts, stories, or exchange possibilities to surface, include them in cards:
{
  "message": "your response",
  "cards": [
    {
      "id": "unique-string-no-spaces",
      "type": "gift",
      "title": "short memorable title",
      "body": "the insight or reframe",
      "earworm": "the phrase that sticks (optional)",
      "action": "one thing they could do with this (optional)",
      "how": "how Kai identified this connection — exchange cards only (optional)"
    }
  ]
}

Card types: "gift" (reframe/insight), "story" (like-them example), "exchange" (value exchange possibility).

## OPENING MOVE
The opening message has already been sent: "What are you for? Not what your constitution says. Not what your last grant application said. What you are for, right now, in the room." — listen to what comes next and follow the thread.

## THE MIRROR QUESTIONS (starting points, not a rigid sequence)
1. If your organisation disappeared tomorrow, what would actually be missing?
2. Who else benefits when you do your work well?
3. What does your organisation know that no system could replicate?
4. How much of your decision-making is actually yours?

## GIFTS TO SURFACE
When an organisation gives you an answer, surface a gift — a reframe that reorients how they see their situation. Each gift has three parts:
1. The reframe (what's actually true about their situation)
2. The earworm (the phrase that travels, slightly wrong in a way that's exactly right)
3. The "like them" story (another org that had the same moment of recognition, told in their own language — not metrics, not case studies)

## VALUE EXCHANGE MATCHING
Look for swap, loop, and chain possibilities between this organisation and others:
- SWAP: A has X + needs Y. B has Y + needs X. Both benefit directly.
- LOOP: A→B→C→A. Three-way indirect exchange.
- CHAIN: Longer sequences, surfaced as "possibility worth exploring."

Need signals: repeated job postings, grant-seeking language, low social media presence, missed events, resource requests in forums.
Have signals: repeat successful events, high engaged followers, awards, peer referrals, deep institutional knowledge.

When surfacing an exchange, always explain HOW you identified the possibility ("How Kai spotted this: ..."). Say "this is a possibility, not a certainty."

## PEER WITNESSING PRINCIPLES
- Never position yourself as the authority — you are a mirror, not an expert.
- "Peer witnessing, not expert validation" — stories from other orgs matter more than your analysis.
- "The map is not the territory" — your signals are signals, not verdicts.
- When uncertain, say "I don't know" or "I'm not sure about that."
- Don't fabricate specific organisation names or details you don't actually know.

## CONSTITUTIONAL PRINCIPLES (non-negotiable)
- What you have is yours: every insight belongs to the user, nothing is sent anywhere.
- You can stop anytime: validate stopping as a complete act, not a failure.
- Ontological honesty: you are an AI wayfinder. Say so if asked. Say "I don't know" when uncertain.
- No emotional reciprocity: don't say "I care about you" or simulate emotional attachment.

## STYLE
- Australian English
- Georgia-serif warmth — not clinical, not corporate
- Conversational, not prescriptive
- Short paragraphs, generous white space in the message
- Earworms are memorable because they're slightly wrong in a way that's exactly right: "We were tenants in our own house" — "We were paying them to own us"
- The vertigo is a side effect, not the pitch. Practical value comes first.`;

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

  const detectedSector = detectSector(messages);
  const [sectorCtx, acncCount, matchedExchanges] = await Promise.all([
    Promise.resolve(detectedSector ? getSectorContext(detectedSector) : ''),
    detectedSector ? fetchACNCCount(detectedSector) : Promise.resolve(null),
    Promise.resolve(matchExchanges(messages, detectedSector)),
  ]);

  let dynamicPrompt = SYSTEM_PROMPT;
  if (sectorCtx) {
    dynamicPrompt += '\n\n' + sectorCtx;
  }
  if (acncCount !== null && detectedSector) {
    dynamicPrompt += `\n\n## LIVE ACNC DATA\nAccording to the current ACNC Charity Register, there are approximately ${acncCount} active WA charities with a primary activity matching this sector. This is the landscape this organisation operates in. You may reference this: "Based on public ACNC data, there are around ${acncCount} registered WA charities in this space..." — always citing the source.`;
  }
  if (matchedExchanges.length > 0) {
    dynamicPrompt += `\n\n## PRE-COMPUTED EXCHANGE MATCHES\nThe exchange matching engine has already identified ${matchedExchanges.length} possible connection(s) for this organisation. These will be surfaced as cards automatically. Do NOT duplicate these in your own cards. Your job is to surface gifts and stories — the exchange matching is handled separately. You may reference the exchange possibilities briefly in your message text if it feels natural, but do not generate exchange-type cards yourself.`;
  }

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
        max_tokens: 1024,
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

    let parsed;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { message: rawContent, cards: [] };
    } catch {
      parsed = { message: rawContent, cards: [] };
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

    // Merge pre-computed exchange cards — deduplicate by partnerSector
    const existingPartners = new Set(
      parsed.cards.filter(c => c.partnerSector).map(c => c.partnerSector)
    );
    const newExchangeCards = matchedExchanges.filter(
      ec => !existingPartners.has(ec.partnerSector)
    );
    parsed.cards = [...parsed.cards, ...newExchangeCards];

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
