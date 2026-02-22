export const MIRROR_QUESTIONS = [
  {
    id: 'q1',
    label: 'Question 01 · Purpose',
    q: 'If your organisation disappeared tomorrow, what would actually be missing?',
    sub: 'Not the services. Not the programs. The thing that would leave a hole that no one else would fill.',
    opts: [
      { t: 'A relationship of trust that took years to build', v: 'trust' },
      { t: 'The only place this community has a voice', v: 'voice' },
      { t: 'Honestly — probably someone else would fill it', v: 'honest' },
      { t: "We haven't asked ourselves this in a while", v: 'unknown' },
    ],
    gifts: {
      trust: {
        text: "Trust is the only thing that can't be downloaded, scraped, or scaled. It's yours. Every system that wants access to your community wants access to that trust. That makes it the thing most worth protecting.",
        earworm: '"We were tenants in our own house until we noticed who held the keys."',
        like: "A disability support org in Fremantle asked this question and realised their waitlist was full of people referred by word of mouth — not any algorithm. They stopped paying for Salesforce and built a referral map instead. Cost: $0.",
      },
      voice: {
        text: "You're not a service provider. You're infrastructure for self-determination. That's a completely different thing — and it means the tools you use need to amplify that voice, not translate it into someone else's database.",
        earworm: '"The system knew our clients better than we did — because it owned the data."',
        like: "An ACCO in the Kimberley found three different government databases held three different versions of their community members. None were accurate. They built their own. Six weeks. Now they own the truth.",
      },
      honest: {
        text: "That's one of the most useful things you've said. It means the real question is: what should you be for? That's not a crisis — it's the beginning of actually choosing rather than just continuing.",
        earworm: '"We were paying them to own us, and calling it a subscription."',
        like: "A peak body in Perth ran this exercise and found three members doing nearly identical work. They didn't merge. They swapped — each took one function, freed the others. Nobody needed new funding.",
      },
      unknown: {
        text: "That's the most common answer. Not because organisations don't care — but because survival mode doesn't leave room for the question. The fact that you're here, asking it now, is the thing.",
        earworm: '"On any street, on any day, we already have everything we need — it\'s just invisible to itself."',
        like: "Most organisations say this first. It's not failure. It's the starting condition. The question is: do you want to keep not knowing?",
      },
    },
  },
  {
    id: 'q2',
    label: 'Question 02 · Dependency',
    q: 'Who else benefits when you do your work well?',
    sub: "Think beyond your funders and clients. Who profits — financially or otherwise — from your organisation's existence?",
    opts: [
      { t: 'Our funders — they get outcomes to report', v: 'funders' },
      { t: 'Tech platforms that hold our data and relationships', v: 'platforms' },
      { t: "Other orgs who rely on us quietly but don't say so", v: 'ecosystem' },
      { t: "We've never mapped this", v: 'unmapped' },
    ],
    gifts: {
      funders: {
        text: "Funders need your outcomes more than you know. That's leverage you probably don't use. The relationship isn't as one-directional as the grant acquittal template implies.",
        earworm: '"We thought we were dependent on them. Turns out it was mutual."',
        like: "A community legal centre realised a government department was using their outcome data in ministerial briefings — without acknowledgement. They started asking to be named. Now they co-author the reports.",
      },
      platforms: {
        text: "Salesforce, Microsoft, Google — they're not tools you use. They're landlords who charge rent for access to your own relationships. When you leave, they keep the data architecture.",
        earworm: '"Our client list lived in their house. We just paid to visit."',
        like: "A multicultural services org found that when a long-term staff member left, five years of client history was locked in a personal Outlook account on a licence the org was paying for. The data was never theirs.",
      },
      ecosystem: {
        text: "The invisible dependencies are the real infrastructure. If three other orgs quietly rely on you and you don't know it, you can't negotiate for it, charge for it, or protect it.",
        earworm: '"We didn\'t know we were holding the network together until we nearly stopped."',
        like: "A neighbourhood house did a quick exercise with five nearby orgs. They found 23 informal referral relationships, 4 shared volunteers, and 2 cases where they were the only org trusted by a particular cultural group. None documented.",
      },
      unmapped: {
        text: "The value exchange in community sector is almost entirely latent. The map is the asset. Once you draw it, you own something no spreadsheet can replicate.",
        earworm: '"99% of what we have for each other is invisible. The question is just whether to look."',
        like: "Orgs that have mapped it say it changes how they negotiate with funders, talk to government, and decide what to protect. Usually two hours and some butcher's paper.",
      },
    },
  },
  {
    id: 'q3',
    label: 'Question 03 · Knowledge',
    q: 'What does your organisation know that no system could replicate?',
    sub: 'The relationships, the context, the history. The stuff that lives in people, not platforms.',
    opts: [
      { t: 'Who to call when a family is in crisis at 11pm', v: 'network' },
      { t: "Why this community doesn't trust formal services", v: 'trust' },
      { t: 'What was tried before and why it failed', v: 'memory' },
      { t: "We're not sure we've protected this knowledge well", v: 'fragile' },
    ],
    gifts: {
      network: {
        text: "That 11pm phone network is worth more than any CRM. Relational infrastructure that took years to build. The question is: is it in someone's head, or held by the organisation?",
        earworm: '"The algorithm knew the referral pathway. We knew the person who would actually pick up."',
        like: "An aged care provider built a simple internal directory — not of services, but of relationships. Who trusts whom. Who has history with which family. Has saved more crises than any official protocol.",
      },
      trust: {
        text: "That knowledge is irreplaceable AND it's exactly what the system wants to extract and formalise. The moment it becomes a 'cultural competency framework' it stops being real.",
        earworm: '"They wanted to document the trust. We knew that would end it."',
        like: "Several ACCOs have explicitly refused government data-sharing arrangements on these grounds. The knowledge of why a community doesn't trust a system is itself power — it evaporates when you hand it over.",
      },
      memory: {
        text: "Institutional memory is the most undervalued asset in the sector. Every failed initiative contains a lesson that will be expensively re-learned if the memory goes with the person who held it.",
        earworm: '"We kept reinventing wheels we\'d already built and discarded. The blueprints were in people\'s heads."',
        like: "A regional org started doing exit interviews focused entirely on institutional memory — not HR process but actual knowledge transfer. Found 15 years of context about three government relationships. Four hours and a whiteboard.",
      },
      fragile: {
        text: "Most organisations are one key departure away from losing critical knowledge. That's not failure — it's the design of chronic underfunding. But you can change it without a big system.",
        earworm: '"Everything we knew lived in Sarah. Then Sarah left."',
        like: "A small disability org started a monthly 'what do only you know?' conversation — 30 minutes, rotating who shares. After 6 months: a living document of knowledge no platform could replicate.",
      },
    },
  },
  {
    id: 'q4',
    label: 'Question 04 · Tempo',
    q: "How much of your organisation's decision-making is actually yours?",
    sub: 'Your reporting cycles, software updates, funder deadlines. Who sets the rhythm you live by?',
    opts: [
      { t: "Mostly our funders' cycles, honestly", v: 'funders' },
      { t: 'Our software — we work around its logic', v: 'software' },
      { t: 'Government reporting requirements shape almost everything', v: 'govt' },
      { t: "We've found ways to set our own tempo", v: 'own' },
    ],
    gifts: {
      funders: {
        text: "Funder tempo is one of the most invisible forms of governance. When you can only think in 12-month cycles, you stop being able to make decisions that take 5 years to bear fruit. Community change mostly takes 5 years.",
        earworm: '"We weren\'t strategic. We were reactive at scale."',
        like: "A WA peak body negotiated a 3-year acquittal cycle instead of annual. Two conversations and a one-page argument. Changed everything about how they planned. They said they should have asked a decade earlier.",
      },
      software: {
        text: "When your software's update schedule becomes your organisation's update schedule, the tail is wagging the dog. One of the subtlest forms of sovereignty loss — it doesn't feel like a decision, it just feels like how things work.",
        earworm: '"We organised ourselves around the software. Then the software changed its pricing."',
        like: "A small community org switched from Salesforce to Airtable — not because it was better, but because they could understand it. When they needed to change it, they could. 'Owning our own kitchen again.'",
      },
      govt: {
        text: "Government reporting requirements define what counts, what gets measured, what's visible. Everything outside the reporting frame becomes invisible — including most of the actual work.",
        earworm: '"What we reported and what we did were two different organisations."',
        like: "Several orgs now keep two records: the official one for compliance, and a living internal one capturing actual work. More effort short-term. But they have the evidence when the reporting framework eventually changes.",
      },
      own: {
        text: "How you got there matters as much as that you got there. This is rare enough to be worth examining and worth sharing with others who haven't found it yet.",
        earworm: '"Sovereignty isn\'t about owning everything. It\'s about choosing your tempo."',
        like: "Orgs that set their own tempo usually got there through one of three moves: multi-year funding, building reserves, or saying no to a grant that would have pulled them off course. Which one was yours?",
      },
    },
  },
];

export const OPENING_MESSAGE = {
  role: 'assistant',
  content: "Hi — I'm Kai, an AI wayfinder from Kamunity.\n\nI'm going to ask you four questions that most organisations never sit with. You'll leave with a reframe or two, maybe a connection worth following up, and something worth keeping.\n\nBefore we start — tell me about your organisation. Who are you, and what do you do?",
  cards: [],
  isOpening: true,
};
