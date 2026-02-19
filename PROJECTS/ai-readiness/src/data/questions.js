export const DIMENSIONS = {
  understanding: {
    id: 'understanding',
    label: 'Understanding',
    description: 'How well your team understands what AI is and how it relates to your work.',
  },
  currentUse: {
    id: 'currentUse',
    label: 'Current Use',
    description: 'Whether your organisation is already experimenting with or using AI tools.',
  },
  safetyEthics: {
    id: 'safetyEthics',
    label: 'Safety & Ethics',
    description: 'How prepared you are to use AI safely and responsibly.',
  },
  readinessToAct: {
    id: 'readinessToAct',
    label: 'Readiness to Act',
    description: 'Whether your organisation has the support and capacity to take next steps.',
  },
}

export const QUESTIONS = [
  {
    id: 1,
    dimension: 'understanding',
    text: 'Our team has a shared understanding of what AI tools can and can\'t do.',
  },
  {
    id: 2,
    dimension: 'understanding',
    text: 'We could explain to a new staff member how AI might relate to our work.',
  },
  {
    id: 3,
    dimension: 'understanding',
    text: 'We know the difference between AI tools (like ChatGPT) and our existing software.',
  },
  {
    id: 4,
    dimension: 'currentUse',
    text: 'Some people in our organisation are already using AI tools in their work.',
  },
  {
    id: 5,
    dimension: 'currentUse',
    text: 'We have discussed as a team which tasks AI tools might help with.',
  },
  {
    id: 6,
    dimension: 'currentUse',
    text: 'We have tried using an AI tool for a specific work task (e.g. drafting, summarising, research).',
  },
  {
    id: 7,
    dimension: 'safetyEthics',
    text: 'We have guidelines about what information staff should NOT put into AI tools.',
  },
  {
    id: 8,
    dimension: 'safetyEthics',
    text: 'Our team understands that AI tools can produce incorrect or biased results.',
  },
  {
    id: 9,
    dimension: 'safetyEthics',
    text: 'We\'ve considered how AI use might affect the people and communities we serve.',
  },
  {
    id: 10,
    dimension: 'readinessToAct',
    text: 'Our leadership supports exploring how AI could help our organisation.',
  },
  {
    id: 11,
    dimension: 'readinessToAct',
    text: 'We have someone who could champion a small AI pilot project.',
  },
  {
    id: 12,
    dimension: 'readinessToAct',
    text: 'We could set aside a few hours for the team to learn about AI together.',
  },
]

export const ANSWER_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Agree' },
  { value: 4, label: 'Strongly Agree' },
]
