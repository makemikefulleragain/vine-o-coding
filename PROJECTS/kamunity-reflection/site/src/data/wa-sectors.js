export const SECTORS = {
  'peer-support': {
    label: 'Peer Support & Mental Health Advocacy',
    keywords: ['peer support', 'lived experience', 'peer worker', 'peer recovery', 'peer network', 'peer program', 'consumer', 'carer', 'arafmi', 'alike'],
    description: 'Organisations led by or centred on people with lived experience of mental ill-health — providing mutual support, advocacy, and sector-building.',
    typical_haves: [
      'Deep lived-experience knowledge that clinical systems cannot replicate',
      'Trust from people who have been failed by formal services',
      'Trained peer workers and volunteer networks',
      'Authentic community voice for co-design processes',
      'Long-term relationship with complex-needs individuals',
      'Sector intelligence about what funders and government are missing',
    ],
    typical_needs: [
      'Clinical governance frameworks that give credibility with funders',
      'Training infrastructure (rooms, facilitators, accreditation)',
      'Digital communication capacity (social media, comms staff)',
      'Evidence and outcome measurement tools',
      'Connections to arts/creative engagement to reduce stigma',
      'Venue partnerships for peer group programs',
    ],
    wa_orgs: [
      {
        id: 'alike-wa',
        name: 'ALIKE WA',
        description: 'Western Australia\'s peak body for peer support — developing and championing peer work across the mental health, AOD, and community sectors.',
        known_haves: ['Peer workforce development expertise', 'Sector-wide networks', 'Policy influence capacity', 'Training curriculum for peer workers'],
        known_needs: ['Broader community reach beyond sector insiders', 'Creative and accessible formats for peer training', 'Connections to arts/community sector for stigma reduction'],
        signals: 'Active events, sector training, policy submissions, regular sector comms. High engagement with sector-specific audiences.',
        url: 'https://alike.org.au/',
        size: 'Small',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'helpingminds',
        name: 'HelpingMinds',
        description: 'WA\'s leading organisation supporting children, families, and carers affected by mental illness.',
        known_haves: ['Strong family/carer support programs', 'Regional WA reach', 'Long-standing community trust', 'Counselling services'],
        known_needs: ['Youth engagement strategies', 'Digital capacity for rural outreach', 'Peer worker integration into carer programs'],
        signals: 'Consistent programming, funded through Mental Health Commission, regular public communications.',
        url: 'https://helpingminds.org.au/',
        size: 'Medium',
        region: 'Metro + Regional',
        confidence: 'high',
      },
      {
        id: 'waamh',
        name: 'WA Association for Mental Health (WAAMH)',
        description: 'Peak body representing the community mental health sector in WA — advocacy, workforce development, sector coordination.',
        known_haves: ['Sector-wide advocacy capacity', 'Strong government relationships', 'Network of member organisations', 'Policy expertise'],
        known_needs: ['Community-level engagement beyond sector insiders', 'Lived-experience integration in governance', 'Digital tools for member connection'],
        signals: 'Policy submissions, sector events, member communications. Strong government-facing profile.',
        url: 'https://www.waamh.org.au/',
        size: 'Small',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'grow-wa',
        name: 'GROW',
        description: 'Mutual support group program for people with mental health challenges — community-led, peer-facilitated groups across WA.',
        known_haves: ['Proven peer facilitation model (60+ years)', 'Mutual support group structure that replicates', 'Non-clinical entry point for people avoiding formal services'],
        known_needs: ['Connections with arts/creative orgs for new entry points', 'Digital engagement for younger members', 'Venue partnerships for new group locations'],
        signals: 'Long-established, consistent community presence, minimal social media, word-of-mouth referral dominant.',
        url: 'https://www.grow.org.au/',
        size: 'Small',
        region: 'Metro + Regional',
        confidence: 'medium',
      },
      {
        id: 'richmond-wellbeing',
        name: 'Richmond Wellbeing',
        description: 'Community mental health organisation delivering recovery-focused services across metropolitan and regional WA.',
        known_haves: ['Recovery-oriented service model', 'Housing and community support programs', 'Clinical-community interface experience'],
        known_needs: ['Peer workforce integration', 'Arts-based engagement programs', 'Stronger community voice in service design'],
        signals: 'NDIS-registered, MHC-funded, growing service footprint.',
        url: 'https://richmondwellbeing.com.au/',
        size: 'Medium',
        region: 'Metro + Regional',
        confidence: 'medium',
      },
    ],
    exchange_templates: [
      {
        with: 'mental-health',
        type: 'swap',
        label: 'Peer voice ↔ Clinical credibility',
        description: 'Peer orgs provide lived-experience co-design and authentic community reach. Mental health orgs provide clinical governance, accreditation, and funder credibility. Neither can buy what the other has.',
        confidence: 'high',
        seen_in: 'Multiple Perth partnerships — typically starts with a shared funder and a single co-facilitation agreement.',
      },
      {
        with: 'arts-community',
        type: 'swap',
        label: 'Lived experience ↔ Creative engagement tools',
        description: 'Peer orgs have authentic stories and community trust. Arts orgs have accessible, non-clinical engagement formats that reach people before they\'re "in the system."',
        confidence: 'high',
        seen_in: 'Tictoc, CAN WA, and various arts-health partnerships across Perth and Fremantle.',
      },
      {
        with: 'neighbourhood',
        type: 'loop',
        label: 'Peer program ← Venue + community ← Referrals ← Peer program',
        description: 'Peer orgs run programs in neighbourhood house space (venue swap). Neighbourhood house gets specialist mental health programming for their community. Both get referrals from each other\'s networks.',
        confidence: 'high',
        seen_in: 'Common across Perth metro — often informal, rarely documented.',
      },
    ],
  },

  'mental-health': {
    label: 'Mental Health Services & Sector Support',
    keywords: ['mental health', 'wellbeing', 'counselling', 'psychology', 'psychosocial', 'activate mental health', 'clinical', 'recovery', 'ndis mental health', 'mhc'],
    description: 'Organisations delivering clinical or community-based mental health support, sector coordination, and psychosocial recovery services.',
    typical_haves: [
      'Clinical governance frameworks and accreditation',
      'Evidence-based practice frameworks',
      'Government and funder relationships (MHC, NDIS)',
      'Trained clinical and allied health workforce',
      'Outcome measurement infrastructure',
      'Scale and reach for population-level programs',
    ],
    typical_needs: [
      'Community trust with people who avoid formal services',
      'Lived-experience integration in governance and service design',
      'Creative/accessible entry points that reduce stigma barriers',
      'Rural and remote reach without staff overhead',
      'Culturally safe practice frameworks (especially for CALD and First Nations)',
      'Peer workforce expertise',
    ],
    wa_orgs: [
      {
        id: 'activate-mh',
        name: 'Activate Mental Health',
        description: 'WA mental health sector coordination and capacity-building organisation — supporting community mental health organisations across WA.',
        known_haves: ['Sector coordination capacity', 'Professional development programs', 'Policy and advocacy network', 'Connections across the WA mental health landscape'],
        known_needs: ['Peer workforce integration', 'Lived-experience leadership pathways', 'Creative and non-clinical engagement channels'],
        signals: 'Regular sector events, training programs, active comms. Strong sector-facing profile.',
        url: 'https://www.activatemh.com.au/',
        size: 'Small',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'holyoake',
        name: 'Holyoake',
        description: 'WA\'s leading counselling and wellbeing organisation — mental health, alcohol and other drug counselling, and community wellbeing programs.',
        known_haves: ['Established counselling infrastructure', 'Community trust across diverse demographics', 'School-based and community programs', 'Trained counselling workforce'],
        known_needs: ['Peer support integration', 'Arts-based approaches for younger demographics', 'Digital-first service options'],
        signals: 'Long-established (50+ years), consistent community presence, broad demographic reach.',
        url: 'https://holyoake.org.au/',
        size: 'Large',
        region: 'Metro + Regional',
        confidence: 'high',
      },
      {
        id: 'ruah',
        name: 'Ruah Community Services',
        description: 'Community services organisation delivering homelessness, mental health, and family services in WA.',
        known_haves: ['Housing and homelessness expertise alongside mental health', 'Trauma-informed practice framework', 'Faith-community trust networks', 'Advocacy capacity'],
        known_needs: ['Peer workforce', 'Arts-based approaches for complex-needs clients', 'Community sector partnerships for wraparound support'],
        signals: 'Well-established, MHC and NDIS funded, strong media presence.',
        url: 'https://www.ruah.org.au/',
        size: 'Large',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'beyondblue-wa',
        name: 'Beyond Blue (WA Programs)',
        description: 'National mental health organisation with WA-specific programs — awareness, early intervention, suicide prevention.',
        known_haves: ['Brand recognition and public trust', 'Evidence-based resources', 'Community education infrastructure'],
        known_needs: ['Community-level authentic engagement beyond awareness campaigns', 'Local peer voice', 'Culturally appropriate resources for diverse communities'],
        signals: 'National footprint, high-profile campaigns, WA-specific program delivery through local partners.',
        url: 'https://www.beyondblue.org.au/',
        size: 'XLarge',
        region: 'National / WA',
        confidence: 'high',
      },
    ],
    exchange_templates: [
      {
        with: 'peer-support',
        type: 'swap',
        label: 'Clinical framework ↔ Peer wisdom',
        description: 'Mental health orgs provide evidence frameworks and clinical credibility. Peer orgs provide authentic lived-experience voice that clinical orgs need for co-design.',
        confidence: 'high',
        seen_in: 'MHC-funded co-design processes across WA, headspace youth reference groups.',
      },
      {
        with: 'arts-community',
        type: 'loop',
        label: 'Clinical referral → Arts engagement → Community entry → Back to clinical',
        description: 'Mental health orgs refer clients who need non-clinical engagement to arts partners. Arts orgs provide low-barrier entry. Community reach grows. Some participants enter the clinical system when ready.',
        confidence: 'medium',
        seen_in: 'Arts-health programs in Fremantle, FORM partnerships, Tictoc Health.',
      },
    ],
  },

  'arts-community': {
    label: 'Arts, Music & Community Creativity',
    keywords: ['music', 'arts', 'creative', 'performance', 'theatre', 'cultural', 'the pack', 'musicians', 'artist', 'band', 'community arts', 'gallery'],
    description: 'Organisations using creative practice to build community, reduce isolation, provide meaningful engagement, and shift cultural narratives.',
    typical_haves: [
      'Creative skills and production capacity',
      'Community engagement through non-clinical, accessible formats',
      'Venues and spaces',
      'Volunteer and participant networks with high intrinsic motivation',
      'Digital content creation and storytelling',
      'Cultural authority and soft influence on community narratives',
    ],
    typical_needs: [
      'Funding beyond project-by-project (operating vs capital imbalance)',
      'Mental health and wellbeing support for participants with complex needs',
      'Professional development for arts workers in trauma-aware practice',
      'Pathways to connect participants with services when needed',
      'Administrative and governance capacity',
      'Accessible venues for community programs',
    ],
    wa_orgs: [
      {
        id: 'the-pack-music',
        name: 'The Pack Music',
        description: 'WA community music organisation — building connection and wellbeing through music programs for community members.',
        known_haves: ['Music production and facilitation skills', 'Community engagement through music', 'Peer-learning model', 'Authentic connection with participants'],
        known_needs: ['Mental health support pathways for participants who need it', 'Stable venue for regular programs', 'Awareness/mental health training for music facilitators'],
        signals: 'Active social media, community-facing events, strong participant loyalty.',
        url: 'https://www.packmusic.au/',
        size: 'XSmall',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'form-wa',
        name: 'FORM',
        description: 'FORM: Building a State of Creativity — WA arts organisation connecting creative industries with communities, business, and government.',
        known_haves: ['Large network across arts, business, and government', 'Public art and community engagement expertise', 'Digital platforms for arts engagement', 'Strong brand and government relationships'],
        known_needs: ['Deeper grassroots community connections beyond arts professionals', 'Mental health integration for community programs'],
        signals: 'Well-funded, long-established, broad sectoral reach. High-visibility projects.',
        url: 'https://www.form.net.au/',
        size: 'Medium',
        region: 'WA-wide',
        confidence: 'high',
      },
      {
        id: 'propel-youth-arts',
        name: 'Propel Youth Arts WA',
        description: 'WA\'s peak body for young people in the arts — supporting young artists and the organisations that engage them.',
        known_haves: ['Youth arts sector networks', 'Young artist development expertise', 'Advocacy for youth creative voice', 'Training and mentorship programs'],
        known_needs: ['Mental health and wellbeing lens in arts programs', 'Connections to youth mental health services', 'Venue infrastructure'],
        signals: 'Consistent events, active social, strong peer networks among young arts organisations.',
        url: 'https://www.propel.org.au/',
        size: 'Small',
        region: 'Perth Metro + Regional',
        confidence: 'high',
      },
      {
        id: 'country-arts-wa',
        name: 'Country Arts WA',
        description: 'Developing arts and cultural opportunities in regional WA communities.',
        known_haves: ['Regional WA reach and relationships', 'Arts touring and residency infrastructure', 'Cultural engagement expertise in rural/remote communities'],
        known_needs: ['Mental health integration', 'ACCO consultation protocols for First Nations communities', 'Digital infrastructure for remote engagement'],
        signals: 'Government-funded, strong regional footprint, consistent programming.',
        url: 'https://www.countryarts.org.au/',
        size: 'Medium',
        region: 'Regional WA',
        confidence: 'high',
      },
      {
        id: 'can-wa',
        name: 'Community Arts Network WA (CAN WA)',
        description: 'Supporting community arts practice across WA — connecting artists with communities, especially marginalised groups.',
        known_haves: ['Community engagement through arts', 'Networks across social services and arts sectors', 'Participatory arts methodology expertise'],
        known_needs: ['Sustainable funding beyond project grants', 'Mental health partnership for complex-needs communities'],
        signals: 'Strong community arts practice, intersectional focus, consistent presence in sector conversations.',
        url: 'https://www.canwa.com.au/',
        size: 'Small',
        region: 'Perth Metro + Regional',
        confidence: 'medium',
      },
    ],
    exchange_templates: [
      {
        with: 'peer-support',
        type: 'swap',
        label: 'Creative tools ↔ Community trust + lived stories',
        description: 'Arts orgs have accessible, engaging formats that remove stigma barriers. Peer orgs have authentic lived-experience stories that make arts programs meaningful and credible for mental health contexts.',
        confidence: 'high',
        seen_in: 'Tictoc, CAN WA partnerships with mental health orgs, arts-in-recovery programs.',
      },
      {
        with: 'neighbourhood',
        type: 'swap',
        label: 'Creative programming ↔ Venue + existing community',
        description: 'Arts orgs need stable, affordable venues and a ready participant community. Neighbourhood houses need specialist creative programming to bring vibrancy and draw new members.',
        confidence: 'high',
        seen_in: 'Very common in Perth metro — often starts as a one-off event that becomes a permanent program.',
      },
      {
        with: 'mental-health',
        type: 'loop',
        label: 'Arts entry → Peer support → Clinical pathway (when needed)',
        description: 'Arts programs are often the first safe contact for people not ready for clinical services. A three-way loop between arts, peer support, and clinical orgs creates a full spectrum of entry points.',
        confidence: 'medium',
        seen_in: 'Arts-health literature, WA MIND partnerships, Fremantle Arts Centre community programs.',
      },
    ],
  },

  'neighbourhood': {
    label: 'Neighbourhood Houses & Community Centres',
    keywords: ['neighbourhood house', 'community centre', 'community house', 'neighbourhood', 'local community', 'community development', 'community services', 'community hub'],
    description: 'Neighbourhood houses and community centres providing a local meeting place, learning, and connection for diverse community members.',
    typical_haves: [
      'Physical space — rooms, kitchens, outdoor areas',
      'Existing community membership across age groups',
      'Local government relationships and legitimacy',
      'Low-barrier entry — walk-in culture',
      'Volunteer coordination capacity',
      'Community knowledge of local need',
    ],
    typical_needs: [
      'Specialist programming beyond generalist activities (mental health, arts, digital, etc.)',
      'Connections to sector expertise for complex-needs visitors',
      'Funding diversification beyond local government grants',
      'Digital and communications capacity',
      'Youth programming to replace ageing demographics',
    ],
    exchange_templates: [
      {
        with: 'arts-community',
        type: 'swap',
        label: 'Space + community ↔ Programming expertise',
        description: 'Houses have rooms and an existing community. Arts orgs have specialist facilitators and programs. A straightforward space-for-programming swap.',
        confidence: 'high',
        seen_in: 'Extremely common across Perth metro — underutilised and under-documented.',
      },
      {
        with: 'peer-support',
        type: 'swap',
        label: 'Warm community base ↔ Specialist peer programs',
        description: 'Neighbourhood houses provide a normalising, non-clinical environment for peer programs. Peer orgs provide specialist facilitation and peer worker expertise.',
        confidence: 'high',
        seen_in: 'GROW groups, Lifeline programs, and peer support groups frequently operate from neighbourhood house space.',
      },
    ],
    wa_orgs: [
      {
        id: 'wacoss',
        name: 'WACOSS',
        description: 'WA Council of Social Service — peak body representing community services organisations in WA.',
        known_haves: ['Sector-wide advocacy and policy influence', 'Large member network', 'Research and sector intelligence capacity'],
        known_needs: ['Grassroots community connection beyond peak body role', 'Lived-experience integration in advocacy'],
        signals: 'Strong policy presence, regular publications, sector-wide events.',
        url: 'https://www.wacoss.org.au/',
        size: 'Medium',
        region: 'Perth Metro',
        confidence: 'high',
      },
    ],
  },

  'youth': {
    label: 'Youth Services & Young People',
    keywords: ['youth', 'young people', 'young adults', 'teen', 'headspace', 'yacwa', 'youth focus', 'school', 'juvenile', 'emerging adult'],
    description: 'Organisations working with young people aged 12–25 across education, mental health, arts, employment, and community participation.',
    typical_haves: [
      'Authentic youth engagement methodology',
      'Young people as active participants/co-designers',
      'Social media and digital communication capacity',
      'Non-formal, flexible program models',
      'Peer leadership frameworks',
    ],
    typical_needs: [
      'Mental health specialist support for complex-needs young people',
      'Employment and pathway connections post-program',
      'Venue infrastructure for youth-friendly programming',
      'Intergenerational connection (older community members)',
      'ACCO consultation for working with First Nations young people',
    ],
    exchange_templates: [
      {
        with: 'arts-community',
        type: 'swap',
        label: 'Youth reach + energy ↔ Creative skills and platforms',
        description: 'Youth orgs have young people who are hungry for creative expression. Arts orgs have skills, networks, and sometimes platforms. Youth orgs get enriched programs; arts orgs get authentic next-generation participants.',
        confidence: 'high',
        seen_in: 'Propel Youth Arts exists partly to formalise this exchange.',
      },
      {
        with: 'mental-health',
        type: 'loop',
        label: 'Youth engagement → Wellbeing support → Back to community',
        description: 'Youth orgs reach young people before crisis. Mental health orgs provide early intervention. Together they create a warm pathway that doesn\'t require formal referral as the first step.',
        confidence: 'high',
        seen_in: 'headspace partnerships with youth services, school-based counselling integrations.',
      },
    ],
    wa_orgs: [
      {
        id: 'yacwa',
        name: 'Youth Affairs Council WA (YACWA)',
        description: 'Peak body for organisations working with young people in WA — advocacy, policy, and sector support.',
        known_haves: ['Policy influence for young people\'s issues', 'Sector networks across youth services', 'Young people\'s advocacy capacity'],
        known_needs: ['Mental health integration in sector advocacy', 'Digital capacity for member organisations'],
        signals: 'Strong policy voice, regular events and publications.',
        url: 'https://www.yacwa.org.au/',
        size: 'Small',
        region: 'Perth Metro',
        confidence: 'high',
      },
      {
        id: 'youth-focus',
        name: 'Youth Focus',
        description: 'WA\'s leading youth mental health organisation — counselling, crisis support, and community programs for young people aged 12–25.',
        known_haves: ['Clinical youth mental health expertise', 'School-based and community programs', 'Crisis response capacity', 'Strong community trust with young people'],
        known_needs: ['Creative engagement formats to complement clinical services', 'Peer-led pathways', 'Regional reach'],
        signals: 'Well-funded, high-visibility, strong digital presence.',
        url: 'https://www.youthfocus.com.au/',
        size: 'Large',
        region: 'Metro + Regional',
        confidence: 'high',
      },
    ],
  },

  'disability': {
    label: 'Disability & NDIS Services',
    keywords: ['disability', 'ndis', 'inclusion', 'accessible', 'support worker', 'disability services', 'allied health', 'activ', 'rocky bay', 'therapy focus'],
    description: 'Organisations supporting people with disability — NDIS-registered providers, advocacy, and inclusive community organisations.',
    typical_haves: [
      'NDIS infrastructure and registration',
      'Allied health workforce',
      'Community inclusion expertise',
      'Long-term participant relationships',
    ],
    typical_needs: [
      'Creative and arts engagement for participants',
      'Mental health co-support for dual-diagnosis participants',
      'Peer support integration',
      'Community participation pathways beyond disability-specific settings',
    ],
    exchange_templates: [
      {
        with: 'arts-community',
        type: 'swap',
        label: 'NDIS capacity + participants ↔ Inclusive creative programs',
        description: 'Disability orgs can fund creative programs through NDIS social and community participation. Arts orgs gain sustainable income and diverse participants. Both benefit from genuine inclusion.',
        confidence: 'high',
        seen_in: 'Growing across Perth — NDIS community participation line is underutilised for arts engagement.',
      },
    ],
    wa_orgs: [
      {
        id: 'inclusion-wa',
        name: 'Inclusion WA',
        description: 'WA\'s peak body for people with intellectual disability — advocacy, community inclusion, and sector support.',
        known_haves: ['Disability sector advocacy expertise', 'Community inclusion frameworks', 'Sector networks'],
        known_needs: ['Arts and creative inclusion programs', 'Peer leadership pathways for people with disability'],
        signals: 'Consistent advocacy presence, member network.',
        url: 'https://www.inclusionwa.org.au/',
        size: 'Small',
        region: 'Perth Metro',
        confidence: 'high',
      },
    ],
  },
};

export const SECTOR_KEYS = Object.keys(SECTORS);

export function getCompactSectorMap() {
  const lines = [
    '## WA SECTOR KNOWLEDGE BASE',
    'Reference ONLY confirmed organisations from this list. Never invent org names, acronyms, or URLs.\n',
  ];

  for (const sector of Object.values(SECTORS)) {
    lines.push(`### ${sector.label}`);
    lines.push(`Typical HAVE: ${sector.typical_haves.slice(0, 3).join(' · ')}`);
    lines.push(`Typical NEED: ${sector.typical_needs.slice(0, 3).join(' · ')}\n`);
    for (const org of (sector.wa_orgs || [])) {
      lines.push(`**${org.name}** (${org.url}) — ${org.description}`);
      lines.push(`  HAVE: ${org.known_haves.slice(0, 3).join(' · ')}`);
      lines.push(`  NEED: ${org.known_needs.slice(0, 3).join(' · ')}`);
    }
    lines.push('');
  }

  lines.push('### Cross-sector exchange patterns seen in WA');
  lines.push('- Peer orgs ↔ Arts orgs: lived-experience stories + community trust ↔ accessible creative formats that remove stigma barriers (neither can buy what the other has)');
  lines.push('- Peer orgs ↔ Clinical/MH orgs: peer wisdom + authentic community voice ↔ clinical governance + funder credibility');
  lines.push('- Arts orgs ↔ Neighbourhood houses: specialist programming ↔ space + existing community (very common Perth metro, often informal, rarely documented)');
  lines.push('- NDIS orgs ↔ Arts orgs: NDIS community participation funding ↔ inclusive creative programs (underutilised connection)');
  lines.push('- Three-way entry loop: Arts org (first safe non-clinical contact) → Peer support → Clinical pathway when ready');
  lines.push('- ALIKE WA ↔ The Pack Music: peer groups need creative non-clinical entry points; The Pack needs mental health support pathways for participants — direct exchange possibility');
  lines.push('- ALIKE WA ↔ Activate Mental Health: same mental health landscape, different angles — lived-experience voice (ALIKE) ↔ sector coordination capacity (Activate MH)');
  lines.push('- Activate Mental Health ↔ any peer org: coordination infrastructure ↔ lived-experience integration (often the missing piece in Activate\'s member organisations)');
  lines.push('\nWhen HAVES and NEEDS align across orgs in this list, name the exchange explicitly — use the org\'s real name and be specific about what flows in each direction.');

  return lines.join('\n');
}

export function detectSector(messages) {
  const text = messages
    .map(m => (m.content || '').toLowerCase())
    .join(' ');

  for (const [key, sector] of Object.entries(SECTORS)) {
    const matched = sector.keywords.some(kw => text.includes(kw));
    if (matched) return key;
  }
  return null;
}

export function getSectorContext(sectorKey) {
  const sector = SECTORS[sectorKey];
  if (!sector) return '';

  const orgLines = sector.wa_orgs
    .map(o =>
      `  - ${o.name} [${o.region}, ${o.size || 'unknown size'}]: ${o.description}\n    Have: ${o.known_haves.slice(0, 3).join(' · ')}\n    Need: ${o.known_needs.slice(0, 3).join(' · ')}`
    )
    .join('\n');

  const exchangeLines = sector.exchange_templates
    .map(e =>
      `  - With ${e.with} sector: ${e.label} (${e.type}, confidence: ${e.confidence})\n    ${e.description}\n    Seen in WA: ${e.seen_in}`
    )
    .join('\n');

  return `
## DETECTED SECTOR: ${sector.label}

This organisation likely operates in the ${sector.label} space.

What orgs like this typically HAVE:
${sector.typical_haves.map(h => `  - ${h}`).join('\n')}

What orgs like this typically NEED:
${sector.typical_needs.map(n => `  - ${n}`).join('\n')}

Known WA organisations in this space (from public data):
${orgLines}

Sector exchange patterns frequently seen in WA:
${exchangeLines}

Use this to make "like them" stories specific and recognisable. Name organisations when relevant ("An org similar to ALIKE WA in the peer support space...") but always hedge: "based on their public presence..." or "publicly, they appear to...". Never claim private knowledge.
`.trim();
}
