export const dimensionRecommendations = {
  dataOwnership: {
    atRisk: [
      'Start by making a list of everywhere your organisation stores data: files, emails, contacts, records. You can\'t protect what you can\'t find.',
      'Ensure at least two current staff members have admin access to every critical account. If someone leaves, you need to be able to keep operating.',
    ],
    developing: [
      'Test your data export capability. Actually try exporting your data from your main tools. Better to discover problems now than during a crisis.',
      'Review who has admin access across all your accounts and update it. Remove former staff and add a backup admin.',
    ],
    good: [
      'You\'re in a solid position. Consider documenting your data management practices so they survive staff changes.',
      'Look into whether your tools offer data residency options. Knowing where your data is physically stored can matter for grants and compliance.',
    ],
    strong: [
      'Excellent data ownership practices. Consider sharing your approach with peer organisations. Many are struggling with exactly what you\'ve solved.',
    ],
  },
  vendorLockin: {
    atRisk: [
      'Create a simple spreadsheet listing every digital tool your organisation uses, what it costs, and what it does. This is your "digital inventory". You can\'t manage what you can\'t see.',
      'For your most critical tool (email, files, or your main database), research one alternative. You don\'t have to switch, just know your options.',
    ],
    developing: [
      'Complete your digital tool inventory if it\'s not finished. Include free tools too. They still have switching costs.',
      'For tools where you\'re most dependent on one provider, check if your data can be exported in a standard format (CSV, PDF, etc.).',
    ],
    good: [
      'Good awareness of your tool landscape. Consider whether any upcoming contract renewals are a good time to evaluate alternatives.',
      'Look into open-source alternatives for your most expensive tools. Many have matured significantly and offer nonprofit pricing.',
    ],
    strong: [
      'Strong position on vendor independence. Keep your tool inventory updated and review it annually. The landscape changes fast.',
    ],
  },
  costTransparency: {
    atRisk: [
      'This month, gather every digital subscription charge from your bank statements and credit cards. Many orgs discover they\'re paying for forgotten tools or duplicate services.',
      'Check if your organisation qualifies for nonprofit pricing. Google Workspace, Microsoft 365, Canva, Slack, and many others offer free or discounted plans for registered nonprofits.',
    ],
    developing: [
      'Build a complete picture of your digital spend. Include the "hidden" costs: staff time spent managing tools, training costs, and the cost of workarounds for tools that don\'t quite fit.',
      'Review your top 3 most expensive tools. For each one, spend 15 minutes checking if a nonprofit discount or free alternative exists.',
    ],
    good: [
      'You have a good handle on costs. Consider doing an annual "digital audit". Set a calendar reminder to review tools and costs once a year.',
      'Look at whether bundling or switching could save money. Sometimes moving to an integrated platform costs less than paying for separate tools.',
    ],
    strong: [
      'Great cost awareness. Consider documenting your cost-management approach. It could help your board understand digital investment and support grant reporting.',
    ],
  },
  aiReadiness: {
    atRisk: [
      'AI tools are being used in almost every sector now. Start with one low-risk use case, like using ChatGPT to draft social media posts or summarise long documents.',
      'Important: never enter client names, personal information, or sensitive data into AI tools unless you\'ve verified how that data is handled. When in doubt, keep it out.',
    ],
    developing: [
      'Write a simple one-page AI use guideline for your team. Cover: what data can go into AI tools (nothing identifying clients), what tasks AI is good for, and who to ask if unsure.',
      'Check your AI tools\' privacy settings. Many tools like ChatGPT have options to opt out of training on your data. Turn these on.',
    ],
    good: [
      'You\'re ahead of most community orgs on AI readiness. Consider sharing your guidelines with peer organisations.',
      'Review your AI tools\' data handling quarterly. Policies change frequently and what was safe six months ago may have changed.',
    ],
    strong: [
      'Impressive AI readiness. You\'re well-positioned to help your team use AI effectively while keeping data safe. Consider whether AI could help with your most time-consuming admin tasks.',
    ],
  },
};

export const sensitiveDataWarning = {
  title: 'Sensitive Data Advisory',
  message: 'Your organisation may handle sensitive client data (health, family violence, housing, disability services, youth work, etc.). We strongly recommend speaking with a specialist about data security before making significant changes to your digital tools. This audit is a conversation starter, not a compliance assessment or security audit.',
  additionalNote: 'Be especially careful with AI tools. Never enter client names, case notes, or personal information into AI chat tools unless you have verified the data handling and your organisation has approved it. Consider self-hosted AI options for sensitive work.',
};

export const overallStages = {
  exposed: {
    name: 'Exposed',
    range: '0–25',
    color: 'red',
    summary: 'Your organisation has significant gaps in digital sovereignty. The good news: small changes can make a big difference quickly.',
    nextStep: 'Start with the highest-priority recommendation from each dimension. Focus on data ownership first. Knowing where your data is and who can access it is the foundation everything else builds on.',
  },
  aware: {
    name: 'Aware',
    range: '26–50',
    color: 'amber',
    summary: 'You\'re aware of some digital challenges but haven\'t addressed them systematically yet. You\'re not alone. Most community orgs are in this position.',
    nextStep: 'Pick the dimension where you scored lowest and focus there first. The recommendations below are specific to your situation.',
  },
  progressing: {
    name: 'Progressing',
    range: '51–75',
    color: 'lightGreen',
    summary: 'You\'re making good progress on digital sovereignty. You\'re ahead of many community organisations.',
    nextStep: 'Focus on the amber or red dimensions to round out your position. You\'re close to being in a strong position across the board.',
  },
  sovereign: {
    name: 'Sovereign',
    range: '76–100',
    color: 'green',
    summary: 'Excellent digital sovereignty position. You have strong control over your data, tools, costs, and AI use.',
    nextStep: 'Maintain your position with annual reviews. Consider helping peer organisations. Your experience is valuable to the community.',
  },
};
