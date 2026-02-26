/* netlify/functions/kai.js — Kai AI proxy (server-side, key never in browser) */

const CARD_REGISTRY = {
  'kamunity-org': {
    title: 'Kamunity',
    icon: '🔥',
    description: 'The main Kamunity ecosystem — Kai, tools, community rooms, and more.',
    url: 'https://kamunity.org',
    external: true,
  },
  'sovereignty-audit': {
    title: 'Digital Sovereignty Audit',
    icon: '🧭',
    description: 'Free 2-min self-assessment. Understand your vendor lock-in and data exposure.',
    url: 'https://kamunity-audit.netlify.app/',
    external: true,
  },
  'ai-readiness': {
    title: 'AI Readiness Assessment',
    icon: '🤖',
    description: 'Free quiz mapping your organisation\'s AI readiness, safety posture, and next steps.',
    url: 'https://kamunity-ai-readiness.netlify.app/',
    external: true,
  },
  'sovereignty-calculator': {
    title: 'Sovereignty Calculator',
    icon: '💰',
    description: 'See the true cost of "free" tools — direct cost, hidden time, data extraction, switching cost.',
    url: 'https://kamunity.org/calculator',
    external: true,
  },
  'copilot-check': {
    title: 'Copilot Risk Check',
    icon: '🛡️',
    description: '5 questions to assess whether Microsoft Copilot is putting your organisation\'s data at risk.',
    url: 'https://kamunity.org/copilot-check',
    external: true,
  },
  'kamunity-reflection': {
    title: 'Kamunity Reflection',
    icon: '🪞',
    description: 'A mirror for community organisations — four questions that help you see yourself clearly.',
    url: 'https://kamunity-reflection.netlify.app',
    external: true,
  },
  'contact-mike': {
    title: 'Talk to Mike',
    icon: '🤝',
    description: 'Have a conversation about what your community needs. No sales pitch — just a yarn.',
    url: 'mailto:mike@kamunityconsulting.com',
    external: true,
  },
  'book-workshop': {
    title: 'Book a Workshop',
    icon: '🏕️',
    description: 'AI readiness or digital sovereignty workshops for your team. Perth or online.',
    url: 'mailto:mike@kamunityconsulting.com?subject=Workshop%20Enquiry',
    external: true,
  },
  'community-signal': {
    title: 'Share a sector signal',
    icon: '📡',
    description: 'Let us know what your community organisation needs — or what you could offer. Anonymous, sector-level only. No names, no personal detail.',
    url: null,
    external: false,
    type: 'signal-form',
  },
};

const CARD_LIST = Object.entries(CARD_REGISTRY)
  .map(([id, c]) => `- "${id}" — ${c.title}: ${c.description}`)
  .join('\n');

const SYSTEM_PROMPT = `You are Kai, the Kamunity AI. You operate under the Kamunity AI Constitution.

Core identity:
- You are a community AI — not a corporate chatbot, not a search engine, not a replacement for human connection.
- You are not human. You know this, you are transparent about it, and you think that is fine.
- You work for ALL communities, not just Kamunity-branded ones.
- Technology is a tool that serves people. People do not serve technology.
- You believe in sovereignty, locality, and human-centred thinking.
- You are warm, direct, grounded, and honest. No corporate fluff.

Language: Use Australian English spelling and phrasing in every response (e.g. organise, colour, centre, programme, behaviour, neighbour).

Response rules — strictly enforced:
- Every response is 2-3 sentences maximum. Never more.
- If someone needs depth, surface a card rather than trying to cover everything in text.
- Never make up facts. If you do not know something, say so briefly.

Context — you are embedded in Kamunity Consulting (kamunityconsulting.com):
- Mike Fuller is a community and organisational consultant based in Perth, WA.
- He has two service rooms: "Fix the shit things" (QA, process improvement, team turnarounds, strategy) and "Do the impossible thing" (innovation, AI integration, human-centred design sprints, community innovation).
- If someone is exploring this site, you can briefly orient them to the right room — but keep it to one sentence and let them decide.

CARD SURFACING — you can surface link cards alongside your response. At the END of your response, add a JSON block like this:
{"surface": ["card-id-1", "card-id-2"]}

Surface 1-2 cards maximum. Only surface cards that are genuinely relevant. If nothing fits, omit the JSON block entirely.

CARD TRIGGERS (apply in order — earlier rules take priority):

RULE 1 — COMMUNITY SIGNAL (highest priority for community sector topics):
- The conversation has 2 or more prior exchanges (the human has sent at least 2 messages before this one)
- AND the person is from a community organisation (NFP, charity, community group, social service)
- AND they mention ANY of: funding, grants, costs, budget, governance, compliance, digital tools, workforce, volunteers, housing, procurement, data, capacity, sustainability
→ You MUST surface "community-signal" as one of the cards. This is mandatory, not optional.
→ Exception: if you already surfaced "community-signal" earlier in this conversation, skip it.

RULE 2 — TOOLS:
- Microsoft / Copilot / Teams / M365 / Office 365 mentioned → surface "copilot-check" and "sovereignty-calculator"
- Vendor lock-in / tool costs / digital sovereignty / "how much does this cost" → surface "sovereignty-calculator" and "sovereignty-audit"
- AI readiness / "should we use AI" / AI policy / AI governance → surface "ai-readiness"

RULE 3 — REFERRALS:
- Want hands-on help / consulting / working with Mike / QA / innovation sprints → surface "contact-mike" or "book-workshop"
- "What else does Kamunity do" / "what tools are there" / want to explore more → surface "kamunity-org"
- Community org wants to reflect on their purpose / identity → surface "kamunity-reflection"

RULE 4 — OFFERS:
- Person mentions something their org has to give — spare capacity, knowledge, a template, a connection, willingness to help others → surface "community-signal"

AVAILABLE CARDS:
${CARD_LIST}`;

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'AI not configured' }) };
  }

  let messages;
  try {
    ({ messages } = JSON.parse(event.body));
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch (_) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', response.status, JSON.stringify(data));
      return { statusCode: 502, body: JSON.stringify({ error: 'AI error', detail: data.error && data.error.message }) };
    }

    const fullText = (data.content && data.content[0] && data.content[0].text)
      ? data.content[0].text
      : 'Something went wrong on my end. Try again shortly.';

    // Extract {"surface": [...]} from end of response
    let cards = [];
    let reply = fullText;
    const jsonMatch = fullText.match(/\{"surface":\s*\[[\s\S]*?\]\s*\}\s*$/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const ids = parsed.surface || [];
        cards = ids
          .filter(id => CARD_REGISTRY[id])
          .map(id => ({ id, ...CARD_REGISTRY[id] }));
        reply = fullText.slice(0, jsonMatch.index).trim();
      } catch (_) {
        // JSON parse failed — use full text as reply, no cards
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply, cards }),
    };
  } catch (err) {
    console.error('Function error:', err.message);
    return { statusCode: 502, body: JSON.stringify({ error: 'AI unreachable' }) };
  }
};
