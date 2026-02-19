const BRAND = 'Kamunity Consulting';
const TAGLINE = 'Digital sovereignty for community organisations';
const URL = 'https://kamunity-audit.netlify.app';

function linkedin({ topic, keyMessage, audience, cta }) {
  return `${keyMessage}

${topic}

Community organisations deserve to control their own digital tools, data, and costs. ${audience ? `If you work with ${audience}, this matters.` : 'This matters for every NFP and community group.'}

${cta || `Take the free 2-minute Digital Sovereignty Audit: ${URL}`}

#DigitalSovereignty #CommunityTech #NFP #NonProfit #DataOwnership #${BRAND.replace(/\s/g, '')}`;
}

function instagram({ topic, keyMessage, audience, cta }) {
  return `${keyMessage} \u2728

${topic}

${audience ? `For ${audience} and everyone who manages tech because nobody else will.` : 'For everyone who manages the tech because nobody else will.'}

${cta || `Link in bio for the free Digital Sovereignty Audit \u{1F517}`}

\u{1F4AC} What digital tools does your org rely on most? Drop it in the comments.

.
.
.
#DigitalSovereignty #CommunityTech #NFP #NonProfit #DataOwnership #TechForGood #CommunityOrganisation #DigitalTransformation #AIForGood #KamunityConsulting`;
}

function twitter({ topic, keyMessage, audience, cta }) {
  const tweet = `${keyMessage}

${cta || URL}

#DigitalSovereignty #CommunityTech`;

  if (tweet.length > 280) {
    return `${keyMessage.slice(0, 200)}...

${cta || URL}

#DigitalSovereignty`;
  }
  return tweet;
}

function pressRelease({ topic, keyMessage, audience, cta }) {
  const today = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
  return `FOR IMMEDIATE RELEASE

${topic.toUpperCase()}

Perth, Western Australia, ${today}

${keyMessage}

${audience ? `The initiative is designed for ${audience}, ` : ''}${BRAND} continues to support community organisations in understanding and improving their digital sovereignty position.

${cta || 'Community organisations can take the free Digital Sovereignty Audit at ' + URL}

About ${BRAND}
${BRAND} provides digital sovereignty consulting for community organisations in Australia. With 30+ years of experience in the community sector, we help NFPs, volunteer-led groups, and local organisations take control of their digital tools, data, and costs.

Media Contact:
Mike Featherstone
${BRAND}
mike@kamunityconsulting.com
https://kamunityconsulting.com

###`;
}

function email({ topic, keyMessage, audience, cta }) {
  return `Subject: ${topic}

Hi [Name],

${keyMessage}

${audience ? `As someone working with ${audience}, you know how important it is to have the right digital tools without overpaying or losing control of your data.` : 'We know how important it is for community organisations to have the right digital tools without overpaying or losing control of their data.'}

${cta || `You can take our free 2-minute Digital Sovereignty Audit here: ${URL}`}

Happy to chat if you have questions or want to explore how we can help.

Warm regards,
Mike Featherstone
${BRAND}
${TAGLINE}
mike@kamunityconsulting.com`;
}

function dm({ topic, keyMessage, audience, cta }) {
  return `Hey! Quick one about ${topic.toLowerCase()}.

${keyMessage}

${cta || `Have a look when you get a sec: ${URL}`}

No pressure at all, just thought it might be useful for ${audience || 'your org'}. Happy to chat about it anytime.`;
}

const CHANNELS = {
  linkedin: { name: 'LinkedIn', icon: '\u{1F4BC}', limit: 1300, generate: linkedin },
  instagram: { name: 'Instagram', icon: '\u{1F4F8}', limit: 2200, generate: instagram },
  twitter: { name: 'X / Twitter', icon: '\u{1D54F}', limit: 280, generate: twitter },
  pressRelease: { name: 'Press Release', icon: '\u{1F4F0}', limit: null, generate: pressRelease },
  email: { name: 'Email', icon: '\u2709\uFE0F', limit: null, generate: email },
  dm: { name: 'DM', icon: '\u{1F4AC}', limit: null, generate: dm },
};

export function generateTemplateContent(inputs, channels) {
  const results = {};
  for (const channelId of channels) {
    const channel = CHANNELS[channelId];
    if (channel) {
      results[channelId] = {
        name: channel.name,
        icon: channel.icon,
        limit: channel.limit,
        content: channel.generate(inputs),
        source: 'template',
      };
    }
  }
  return results;
}

export { CHANNELS };
