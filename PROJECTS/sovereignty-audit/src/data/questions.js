export const DIMENSIONS = {
  dataOwnership: {
    id: 'dataOwnership',
    name: 'Data Ownership',
    description: 'Who controls your data? Could you export it? Who else can see it?',
    maxScore: 25,
  },
  vendorLockin: {
    id: 'vendorLockin',
    name: 'Vendor Lock-in',
    description: 'How dependent are you on specific vendors? What would switching cost?',
    maxScore: 25,
  },
  costTransparency: {
    id: 'costTransparency',
    name: 'Cost Transparency',
    description: 'Do you know what you\'re actually paying, in money, time, AND data?',
    maxScore: 25,
  },
  aiReadiness: {
    id: 'aiReadiness',
    name: 'AI Readiness',
    description: 'Are you prepared for the AI shift? Are you using AI tools safely?',
    maxScore: 25,
  },
};

export const questions = [
  // DATA OWNERSHIP (3 questions, ~8 pts each)
  {
    id: 'q1',
    dimension: 'dataOwnership',
    text: 'Where does your organisation primarily store files and documents?',
    helpText: 'Think about where your important documents, spreadsheets, and records live day-to-day.',
    options: [
      { id: 'q1a', text: 'A managed platform we pay for (Google Workspace, Microsoft 365, Dropbox Business)', score: 6 },
      { id: 'q1b', text: 'Free consumer tools (personal Gmail, free Dropbox, USB drives)', score: 2 },
      { id: 'q1c', text: 'A mix: some managed, some on personal accounts, some on local drives', score: 4 },
      { id: 'q1d', text: 'I\'m not really sure where everything is', score: 0 },
    ],
  },
  {
    id: 'q2',
    dimension: 'dataOwnership',
    text: 'Could you export all your organisation\'s data and leave your current tools tomorrow?',
    helpText: 'Imagine you needed to move everything (emails, files, contacts, records) to a different provider.',
    options: [
      { id: 'q2a', text: 'Yes, we\'ve checked and know how to export everything', score: 9 },
      { id: 'q2b', text: 'Probably, but we\'ve never actually tried', score: 5 },
      { id: 'q2c', text: 'Some things yes, but we\'d lose important data or history', score: 3 },
      { id: 'q2d', text: 'No idea. I\'ve never thought about it', score: 0 },
    ],
  },
  {
    id: 'q3',
    dimension: 'dataOwnership',
    text: 'Who has admin or owner access to your organisation\'s main digital accounts?',
    helpText: 'Think about Google Workspace admin, Microsoft 365 admin, your website, your banking. Who could lock everyone else out?',
    options: [
      { id: 'q3a', text: 'At least two current staff members have admin access to all critical accounts', score: 10 },
      { id: 'q3b', text: 'One person has admin access (probably me)', score: 5 },
      { id: 'q3c', text: 'Someone who left the org still has admin access to some things', score: 2 },
      { id: 'q3d', text: 'I\'m not sure who has admin access', score: 0 },
    ],
  },

  // VENDOR LOCK-IN (2 questions, ~12 pts each)
  {
    id: 'q4',
    dimension: 'vendorLockin',
    text: 'How many of your core tools come from a single provider?',
    helpText: 'For example: email, file storage, video calls, and calendar all from Google; or email, files, Teams, and Office all from Microsoft.',
    options: [
      { id: 'q4a', text: 'We use a mix of providers for different needs', score: 13 },
      { id: 'q4b', text: 'Most things come from one provider, but we use a few others too', score: 8 },
      { id: 'q4c', text: 'Almost everything comes from one provider (Google or Microsoft)', score: 4 },
      { id: 'q4d', text: 'I don\'t know. I\'ve never mapped it out', score: 0 },
    ],
  },
  {
    id: 'q5',
    dimension: 'vendorLockin',
    text: 'Do you have a written record of all the digital tools and subscriptions your organisation uses?',
    helpText: 'A list that includes what each tool does, what it costs, and who manages it.',
    options: [
      { id: 'q5a', text: 'Yes, we maintain an up-to-date list', score: 12 },
      { id: 'q5b', text: 'We have a partial list, but it\'s probably not complete', score: 7 },
      { id: 'q5c', text: 'No, but I could probably put one together from memory', score: 3 },
      { id: 'q5d', text: 'No, tools get added and nobody tracks them', score: 0 },
    ],
  },

  // COST TRANSPARENCY (2 questions, ~12 pts each)
  {
    id: 'q6',
    dimension: 'costTransparency',
    text: 'Do you know the total monthly cost of all your digital tools and subscriptions?',
    helpText: 'Include everything: software subscriptions, cloud storage, website hosting, domain names, phone systems, etc.',
    options: [
      { id: 'q6a', text: 'Yes, I can tell you the number right now (or close to it)', score: 13 },
      { id: 'q6b', text: 'Roughly. I know the big ones but probably miss some', score: 8 },
      { id: 'q6c', text: 'Not really, costs are spread across different budgets or cards', score: 3 },
      { id: 'q6d', text: 'No idea. It\'s never been added up', score: 0 },
    ],
  },
  {
    id: 'q7',
    dimension: 'costTransparency',
    text: 'Are you confident you\'re not paying for tools where free or lower-cost alternatives would work?',
    helpText: 'Many community orgs pay for premium tools when free nonprofit-discounted or open-source alternatives exist.',
    options: [
      { id: 'q7a', text: 'Yes, we\'ve reviewed our tools and are confident we\'re getting good value', score: 12 },
      { id: 'q7b', text: 'Probably, but we haven\'t done a proper review', score: 7 },
      { id: 'q7c', text: 'I suspect we\'re overpaying for some things', score: 3 },
      { id: 'q7d', text: 'We just use whatever was set up. Nobody reviews this', score: 0 },
    ],
  },

  // AI READINESS (3 questions, ~8 pts each)
  {
    id: 'q8',
    dimension: 'aiReadiness',
    text: 'Is your team currently using any AI tools?',
    helpText: 'This includes ChatGPT, Microsoft Copilot, Google Gemini, Grammarly, or any tool that uses AI/machine learning.',
    options: [
      { id: 'q8a', text: 'Yes, we\'re using AI tools and have discussed how to use them well', score: 8 },
      { id: 'q8b', text: 'Some people are experimenting, but it\'s informal', score: 5 },
      { id: 'q8c', text: 'I don\'t think so, but I\'m not sure what everyone\'s using', score: 2 },
      { id: 'q8d', text: 'No, we haven\'t started using AI tools', score: 4 },
    ],
  },
  {
    id: 'q9',
    dimension: 'aiReadiness',
    text: 'Does your organisation have guidelines for how staff should use AI tools?',
    helpText: 'Guidelines might cover: what data can be entered into AI tools, what tasks AI can be used for, how to check AI outputs.',
    options: [
      { id: 'q9a', text: 'Yes, we have written guidelines that staff know about', score: 9 },
      { id: 'q9b', text: 'We\'ve had informal conversations but nothing written', score: 5 },
      { id: 'q9c', text: 'No, it hasn\'t come up yet', score: 2 },
      { id: 'q9d', text: 'I didn\'t know we needed guidelines for this', score: 0 },
    ],
  },
  {
    id: 'q10',
    dimension: 'aiReadiness',
    text: 'Do you know what happens to data entered into your AI tools?',
    helpText: 'When someone pastes client info or internal documents into ChatGPT or similar, do you know if that data is stored, used for training, or shared?',
    sensitiveDataFlag: true,
    options: [
      { id: 'q10a', text: 'Yes, we\'ve checked the privacy policies and understand the data handling', score: 8 },
      { id: 'q10b', text: 'Somewhat. We\'ve looked into it but aren\'t fully confident', score: 5 },
      { id: 'q10c', text: 'No, I assume it\'s fine but haven\'t checked', score: 2 },
      { id: 'q10d', text: 'I didn\'t realise this was a concern', score: 0 },
    ],
  },
];
