# Phase 2 Spec — The Toolkit

## Acceptance Criteria

1. **Toolkit hub** at `/toolkit` listing all 6 resources with descriptions
2. **6 resource pages** — each a standalone, scrollable web page
3. **AI Prompt Kit** has 20 copy-paste prompts with "Copy" buttons
4. **Safety Checklist** has printable-friendly layout
5. **Quiz recommendations link to toolkit pages** where referenced
6. **Each toolkit page links back to quiz** ("Take the AI Readiness Quiz")
7. **Navigation updated** with Toolkit in header
8. **Mobile-first, accessible** — consistent with Phase 1 design
9. **Builds and deploys** — `npm run build` succeeds
10. **Sensitive data warnings** present on Safety Checklist and Prompt Kit

## The 6 Resources

### 1. AI Prompt Kit (`/toolkit/prompt-kit`)
20 prompts across 5 categories:
- **Meetings & Admin** (4): Summarise minutes, draft agendas, action items, prepare briefings
- **Communications** (4): Newsletter drafts, volunteer emails, social media posts, event announcements
- **Reporting & Grants** (4): Grant acquittals, impact summaries, annual report sections, data descriptions
- **Policy & Planning** (4): Policy first drafts, risk registers, strategic plan sections, procedure outlines
- **Learning & Development** (4): Training summaries, onboarding guides, FAQ creation, plain language rewrites

Each prompt includes:
- The prompt text (copy-paste ready)
- "Copy" button
- What to expect from the output
- ⚠️ Safety note where relevant ("Never include client names or case details")

### 2. Safety Checklist (`/toolkit/safety-checklist`)
8-point checklist:
1. Is this information safe to share with an external service?
2. Have I removed all client names, case numbers, and personal details?
3. Could this output be wrong? How would I check?
4. Am I using a tool that stores my inputs? Do I understand their data policy?
5. Would I be comfortable if the people we serve knew we used AI for this?
6. Have I told my manager/team that I'm using AI for this task?
7. Is there a policy or guideline I should check first?
8. If this involves vulnerable people, have I sought specialist advice?

### 3. Plain English AI Guide (`/toolkit/ai-guide`)
Sections:
- What is AI? (3 paragraphs, no jargon)
- What can AI tools do right now? (practical examples)
- What can't AI tools do? (important limitations)
- How does ChatGPT actually work? (simple explanation)
- What does this mean for community organisations?
- Glossary of 10 key terms

### 4. First Steps Guide (`/toolkit/first-steps`)
Sections:
- Week 1: Have the conversation (team discussion guide)
- Week 2: Try one thing (low-risk experiment suggestions)
- Week 3: Talk about what happened (reflection prompts)
- Week 4: Decide what's next (decision framework)
- Common first projects for community orgs
- What NOT to do first

### 5. Ethics Checklist (`/toolkit/ethics-checklist`)
Decision framework — 6 questions:
1. Who benefits from this AI use? Who might be harmed?
2. Does this replace human judgment in a high-stakes decision?
3. Could this create or reinforce bias against the communities we serve?
4. Are we transparent about our AI use with staff, clients, and community?
5. Does this respect cultural protocols and data sovereignty?
6. Would we be comfortable explaining this use to our community?

### 6. Board Briefing (`/toolkit/board-briefing`)
One-page format:
- What AI is (2 sentences)
- What our staff are/aren't doing with AI
- The 3 risks board members should know about
- The 3 opportunities worth exploring
- What we recommend as next steps
- Questions for discussion

## Technical Design

### New Routes
- `/toolkit` — Hub page
- `/toolkit/prompt-kit`
- `/toolkit/safety-checklist`
- `/toolkit/ai-guide`
- `/toolkit/first-steps`
- `/toolkit/ethics-checklist`
- `/toolkit/board-briefing`

### New Components
```
src/
  components/
    Toolkit.jsx           # Hub page
    toolkit/
      PromptKit.jsx       # 20 prompts with copy buttons
      SafetyChecklist.jsx
      AIGuide.jsx
      FirstSteps.jsx
      EthicsChecklist.jsx
      BoardBriefing.jsx
      CopyButton.jsx      # Reusable copy-to-clipboard
      ToolkitLayout.jsx   # Shared layout for toolkit pages
```

### Navigation Update
- Add "Toolkit" link to header nav
- Add toolkit cards to landing page

### Quiz Integration
- Update `recommendations.js` to include links to toolkit pages where referenced
