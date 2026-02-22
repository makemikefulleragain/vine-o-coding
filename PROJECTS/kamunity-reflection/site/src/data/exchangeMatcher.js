import { SECTORS } from './wa-sectors.js';

const HAVE_PATTERNS = [
  /we have\b/i, /we offer\b/i, /we provide\b/i, /we deliver\b/i,
  /we run\b/i, /we do\b/i, /we've built\b/i, /we can\b/i,
  /we're good at\b/i, /we bring\b/i, /we hold\b/i, /we carry\b/i,
  /our strength\b/i, /what we have\b/i,
];

const NEED_PATTERNS = [
  /we need\b/i, /we're looking for\b/i, /we don't have\b/i, /we lack\b/i,
  /we struggle\b/i, /we can't afford\b/i, /we want\b/i, /we're hoping\b/i,
  /we wish\b/i, /we're missing\b/i, /we could use\b/i, /we never have\b/i,
  /what we need\b/i, /hard to find\b/i,
];

function extractSignals(messages) {
  const userMessages = messages
    .filter(m => m.role === 'user')
    .map(m => m.content);

  const haveSignals = [];
  const needSignals = [];

  for (const msg of userMessages) {
    const sentences = msg.split(/[.!?\n]+/).map(s => s.trim()).filter(Boolean);
    for (const sentence of sentences) {
      if (HAVE_PATTERNS.some(p => p.test(sentence))) haveSignals.push(sentence);
      if (NEED_PATTERNS.some(p => p.test(sentence))) needSignals.push(sentence);
    }
  }

  return { haveSignals, needSignals };
}

function scoreMatch(needSignals, haveSignals, partnerTypicalHaves, partnerTypicalNeeds, myTypicalHaves) {
  const allText = [...needSignals, ...haveSignals].join(' ').toLowerCase();

  let needHitCount = 0;
  for (const partnerHave of partnerTypicalHaves) {
    const words = partnerHave.toLowerCase().split(/\s+/).filter(w => w.length > 5);
    if (words.some(w => allText.includes(w))) needHitCount++;
  }

  let haveHitCount = 0;
  for (const partnerNeed of partnerTypicalNeeds) {
    const words = partnerNeed.toLowerCase().split(/\s+/).filter(w => w.length > 5);
    if (words.some(w => allText.includes(w))) haveHitCount++;
  }

  if (needHitCount >= 2 || haveHitCount >= 2) return 'high';
  if (needHitCount >= 1 || haveHitCount >= 1) return 'medium';
  return null;
}

function buildSignalEvidence(needSignals, haveSignals, partnerOrg, template) {
  const parts = [];

  if (needSignals.length > 0) {
    const snippet = needSignals[0].slice(0, 80);
    parts.push(`You mentioned "${snippet}${needSignals[0].length > 80 ? '...' : ''}" — ${partnerOrg.name} publicly signals capacity in exactly this area.`);
  } else if (haveSignals.length > 0) {
    const snippet = haveSignals[0].slice(0, 80);
    parts.push(`You mentioned "${snippet}${haveSignals[0].length > 80 ? '...' : ''}" — that's a known need signal for organisations like ${partnerOrg.name}.`);
  } else {
    parts.push(`Organisations in these two sectors have a documented exchange pattern in WA.`);
  }

  if (template.seen_in) {
    parts.push(`Seen in WA: ${template.seen_in}`);
  }

  return parts.join(' ');
}

export function matchExchanges(messages, sectorKey) {
  if (!sectorKey || !SECTORS[sectorKey]) return [];

  const userMessageCount = messages.filter(m => m.role === 'user').length;
  if (userMessageCount < 3) return [];

  const sector = SECTORS[sectorKey];
  const { haveSignals, needSignals } = extractSignals(messages);
  const cards = [];
  const seenPartners = new Set();

  for (const template of sector.exchange_templates) {
    if (seenPartners.has(template.with)) continue;

    const partnerSector = SECTORS[template.with];
    if (!partnerSector) continue;

    const partnerOrg = partnerSector.wa_orgs?.[0];
    if (!partnerOrg) continue;

    const detectedConfidence = scoreMatch(
      needSignals,
      haveSignals,
      partnerSector.typical_haves,
      partnerSector.typical_needs,
      sector.typical_haves
    );

    if (!detectedConfidence) continue;
    const finalConfidence = detectedConfidence;

    const evidence = buildSignalEvidence(needSignals, haveSignals, partnerOrg, template);

    const actionOrg = partnerOrg.name;
    const actionUrl = partnerOrg.url ? ` (${partnerOrg.url})` : '';

    cards.push({
      id: `exchange-${sectorKey}-${template.with}-${template.type}`,
      type: 'exchange',
      title: template.label,
      body: template.description,
      how: `How Kai spotted this: ${evidence}`,
      action: `A starting point: reach out to ${actionOrg}${actionUrl} with this question — "We're thinking about [your goal]. Could we have a coffee to explore whether there's something here for both of us?"`,
      confidence: finalConfidence,
      exchangeType: template.type,
      partnerSector: template.with,
      partnerOrgName: actionOrg,
    });

    seenPartners.add(template.with);
  }

  return cards;
}
