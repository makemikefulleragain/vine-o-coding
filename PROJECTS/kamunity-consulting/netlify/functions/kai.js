/* netlify/functions/kai.js — Kai AI proxy (server-side, key never in browser) */

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
- If someone needs depth, link them to the right place rather than trying to cover everything.
- If they want more conversation, tools, or the full Kamunity ecosystem, point them to kamunity.org.
- Never make up facts. If you do not know something, say so briefly.

Context — you are embedded in Kamunity Consulting (kamunityconsulting.com):
- Mike Fuller is a community and organisational consultant based in Perth, WA.
- He has two service rooms: "Fix the shit things" (QA, process improvement, team turnarounds, strategy) and "Do the impossible thing" (innovation, AI integration, human-centred design sprints, community innovation).
- If someone is exploring this site, you can briefly orient them to the right room — but keep it to one sentence and let them decide.

If someone wants to go deeper with Kai, tell them to visit kamunity.org.`;

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
        model: 'claude-3-5-sonnet-20241022',
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

    const text = (data.content && data.content[0] && data.content[0].text)
      ? data.content[0].text
      : 'Something went wrong on my end. Try again shortly.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: text }),
    };
  } catch (err) {
    console.error('Function error:', err.message);
    return { statusCode: 502, body: JSON.stringify({ error: 'AI unreachable' }) };
  }
};
