export const BAND_LABELS = {
  low: 'Just Starting',
  medLow: 'Building Awareness',
  medHigh: 'Getting Organised',
  high: 'Ready to Move',
}

export const BAND_DESCRIPTIONS = {
  low: "You're at the beginning, and that's perfectly fine. Most community orgs are here.",
  medLow: "You've started thinking about AI. Now it's time to get structured.",
  medHigh: 'You have good foundations. Focus on filling specific gaps.',
  high: "You're well-positioned. Time to put a plan into action.",
}

export const DIMENSION_RECOMMENDATIONS = {
  understanding: {
    low: [
      { text: 'Start with a 30-minute team lunch-and-learn about what AI tools actually do.', link: '/toolkit/ai-guide', linkText: 'Read our Plain English AI Guide' },
      { text: 'Try the Kamunity AI Prompt Kit — 20 practical prompts your team can test today.', link: '/toolkit/prompt-kit', linkText: 'Open the Prompt Kit' },
      { text: "Read our Plain English AI Guide — no jargon, just what community orgs need to know.", link: '/toolkit/ai-guide', linkText: 'Read the Guide' },
    ],
    medLow: [
      { text: 'Build on your awareness with a structured team discussion about AI opportunities.', link: '/toolkit/first-steps', linkText: 'See our First Steps Guide' },
      { text: 'Explore specific AI tools relevant to your sector (we can help you identify them).', link: null, linkText: null },
      { text: 'Share our Plain English AI Guide with the whole team, not just the tech-curious.', link: '/toolkit/ai-guide', linkText: 'Open the Guide' },
    ],
    medHigh: [
      { text: 'Deepen your knowledge by exploring case studies of similar orgs using AI.', link: null, linkText: null },
      { text: 'Consider a facilitated workshop to align the whole team on AI understanding.', link: null, linkText: null },
      { text: 'Start documenting what AI means for your specific services and programs.', link: null, linkText: null },
    ],
    high: [
      { text: "Your team's understanding is strong — channel it into a concrete AI strategy.", link: null, linkText: null },
      { text: 'Consider becoming a peer mentor for other community orgs exploring AI.', link: null, linkText: null },
      { text: 'Look into sector-specific AI applications that match your expertise.', link: null, linkText: null },
    ],
  },
  currentUse: {
    low: [
      { text: 'Pick ONE low-risk task to try with an AI tool this week (e.g. summarising meeting notes).', link: '/toolkit/prompt-kit', linkText: 'Get prompts to try' },
      { text: "Ask your team: 'Is anyone already using AI tools?' — you might be surprised.", link: null, linkText: null },
      { text: "Follow our First Steps Guide for community-safe ways to experiment.", link: '/toolkit/first-steps', linkText: 'Open First Steps Guide' },
    ],
    medLow: [
      { text: 'Document what AI tools people are already using — you need visibility before policy.', link: null, linkText: null },
      { text: 'Try our Prompt Kit for practical, tested prompts that work for community orgs.', link: '/toolkit/prompt-kit', linkText: 'Open the Prompt Kit' },
      { text: 'Set up a monthly check-in to share AI experiments and learnings as a team.', link: null, linkText: null },
    ],
    medHigh: [
      { text: 'Move from ad-hoc experiments to deliberate pilots with clear goals.', link: '/toolkit/first-steps', linkText: 'See our First Steps Guide' },
      { text: 'Identify your top 3 time-consuming tasks and evaluate which AI could help with.', link: null, linkText: null },
      { text: 'Start tracking time saved and quality improvements from AI tool use.', link: null, linkText: null },
    ],
    high: [
      { text: "You're already using AI — now focus on doing it consistently and safely.", link: '/toolkit/safety-checklist', linkText: 'Review the Safety Checklist' },
      { text: 'Create a shared list of approved AI tools and use cases for your org.', link: null, linkText: null },
      { text: 'Consider how AI use fits into your strategic plan and reporting.', link: null, linkText: null },
    ],
  },
  safetyEthics: {
    low: [
      { text: "PRIORITY: Create a one-page policy — 'Never put client names, case details, or personal information into any AI tool.'", link: '/toolkit/safety-checklist', linkText: 'Use our Safety Checklist' },
      { text: 'Run our Safety Checklist with your team this week.', link: '/toolkit/safety-checklist', linkText: 'Open the Checklist' },
      { text: 'If you handle sensitive data (health, family violence, children), seek specialist advice before AI adoption.', link: null, linkText: null },
    ],
    medLow: [
      { text: 'Formalise your AI safety guidelines — even a one-page document is better than nothing.', link: '/toolkit/safety-checklist', linkText: 'Start with our Checklist' },
      { text: "Make sure everyone knows the golden rule: no client data in AI tools. Ever.", link: null, linkText: null },
      { text: "Review our Ethics Checklist to identify gaps you haven't considered yet.", link: '/toolkit/ethics-checklist', linkText: 'Open Ethics Checklist' },
    ],
    medHigh: [
      { text: 'Your safety awareness is good — now embed it into onboarding and regular training.', link: null, linkText: null },
      { text: 'Consider how you communicate your AI use (or non-use) to the communities you serve.', link: '/toolkit/ethics-checklist', linkText: 'See our Ethics Checklist' },
      { text: 'Review your privacy policy to ensure it covers AI tool usage.', link: null, linkText: null },
    ],
    high: [
      { text: "Strong safety foundations — make sure they're documented and part of your culture.", link: null, linkText: null },
      { text: 'Share your approach with peer organisations — the sector needs more of this.', link: null, linkText: null },
      { text: 'Stay current: AI safety best practices evolve quickly. Schedule a 6-monthly review.', link: null, linkText: null },
    ],
  },
  readinessToAct: {
    low: [
      { text: "Share your quiz results with your CEO or board — it's a great conversation starter.", link: '/toolkit/board-briefing', linkText: 'Get the Board Briefing template' },
      { text: 'Identify one AI-curious person on your team to be your AI champion.', link: null, linkText: null },
      { text: 'Book a free 30-minute discovery call with Kamunity to talk through your options.', link: null, linkText: null },
    ],
    medLow: [
      { text: 'Your interest is there — now secure a small time commitment from leadership.', link: '/toolkit/board-briefing', linkText: 'Use our Board Briefing' },
      { text: 'Propose a 90-day AI exploration plan: learn, try, review.', link: '/toolkit/first-steps', linkText: 'See our First Steps Guide' },
      { text: "Connect with other community orgs on their AI journey — you don't have to figure this out alone.", link: null, linkText: null },
    ],
    medHigh: [
      { text: "You have support and capacity — now define a specific first project.", link: '/toolkit/first-steps', linkText: 'Use our First Steps Guide' },
      { text: 'Consider a Kamunity AI Strategy Session to map your priorities.', link: null, linkText: null },
      { text: 'Set a 3-month milestone: what does success look like for your first AI initiative?', link: null, linkText: null },
    ],
    high: [
      { text: "You're ready — don't let perfect be the enemy of good. Start your first AI project this month.", link: '/toolkit/prompt-kit', linkText: 'Start with the Prompt Kit' },
      { text: 'Consider a full AI Readiness Mapping with Kamunity to create your roadmap.', link: null, linkText: null },
      { text: "Document your journey — your experience will help other community orgs.", link: null, linkText: null },
    ],
  },
}

export const SENSITIVE_DATA_WARNING =
  'Your responses suggest your organisation may not yet have safeguards for sensitive data. If you work with vulnerable populations (family violence, health, homelessness, children), we strongly recommend getting specialist advice before adopting AI tools. This quiz is a starting point, not a substitute for professional guidance.'
