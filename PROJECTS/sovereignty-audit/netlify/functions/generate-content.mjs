export default async (req) => {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'No OPENAI_API_KEY configured. Using template fallback.' }),
      { status: 501, headers }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers });
  }

  // Ping check
  if (body.ping) {
    return new Response(JSON.stringify({ status: 'ok', ai: true }), { status: 200, headers });
  }

  const { topic, keyMessage, audience, cta, channels } = body;
  if (!topic || !channels || channels.length === 0) {
    return new Response(JSON.stringify({ error: 'topic and channels are required' }), { status: 400, headers });
  }

  const channelInstructions = {
    linkedin: 'LinkedIn post: Professional tone, max 1300 characters, include relevant hashtags. No links in the body (suggest adding link in comments).',
    instagram: 'Instagram caption: Engaging, emoji-friendly, max 2200 characters, 10-15 relevant hashtags at the end. Encourage comments.',
    twitter: 'X/Twitter post: Concise, max 280 characters including hashtags. Punchy and shareable.',
    pressRelease: 'Press release: Formal structure with headline, dateline (Perth, Western Australia), body paragraphs, boilerplate about Kamunity Consulting, and media contact (Mike Featherstone, mike@kamunityconsulting.com).',
    email: 'Email newsletter: Include a subject line, greeting, body, call to action, and professional sign-off from Mike Featherstone at Kamunity Consulting.',
    dm: 'Direct message: Casual, personal, short. Like messaging a colleague. Friendly but professional.',
  };

  const selectedInstructions = channels
    .map((ch) => channelInstructions[ch])
    .filter(Boolean)
    .join('\n\n');

  const systemPrompt = `You are a content writer for Kamunity Consulting, a small Australian consultancy focused on digital sovereignty for community organisations. Your brand voice is: warm, practical, no-jargon, honest, supportive. You speak to community sector workers who are busy and not "technical." You never use corporate buzzwords. You are based in Perth, Western Australia.

Key facts about Kamunity:
- Free Digital Sovereignty Audit at https://kamunity-audit.netlify.app
- 30+ years experience in the community sector
- Services: free audit + toolkit, workshops ($1,500 NFP), consulting ($2,500+ NFP)
- Websites: kamunity.ai, kamunity.org, kamunityconsulting.com
- Contact: mike@kamunityconsulting.com`;

  const userPrompt = `Create content for the following channels based on this brief:

Topic: ${topic}
${keyMessage ? `Key Message: ${keyMessage}` : ''}
${audience ? `Target Audience: ${audience}` : ''}
${cta ? `Call to Action: ${cta}` : ''}

Generate content for each channel below. Return ONLY valid JSON with channel IDs as keys and content strings as values. No markdown, no code blocks, just the JSON object.

${selectedInstructions}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${response.status}`, details: err }),
        { status: 502, headers }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Empty response from OpenAI' }),
        { status: 502, headers }
      );
    }

    // Parse the JSON from the response
    let parsed;
    try {
      // Strip any markdown code blocks if present
      const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response', raw: content }),
        { status: 502, headers }
      );
    }

    return new Response(JSON.stringify(parsed), { status: 200, headers });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Request to OpenAI failed', message: err.message }),
      { status: 502, headers }
    );
  }
};
