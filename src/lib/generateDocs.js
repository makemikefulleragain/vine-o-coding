export const GENERATED_DOC_ORDER = [
  'CONSTITUTION.md',
  'MISSION.md',
  'PRODUCT_BRIEF.md',
  'POC_ACCEPTANCE.md',
  'DATA_MODEL.md',
  'RISK_REGISTER.md',
  'TEST_PLAN.md',
  'RUNNER.md',
  'PHASE_QUEUE.md',
  'SETUP.md',
  'STATE.md',
]

const FIELD_DEFAULTS = {
  projectName: 'Untitled Community Tool',
  whatItDoes: 'A small community web app that helps people solve a real local problem.',
  whoItsFor: 'a small community group',
  problemItSolves: 'The current process is scattered, manual, or hard to keep track of.',
  primaryUserName: 'the primary user',
  primaryUserSituation: 'They need a simple tool that works reliably without adding extra admin.',
  secondaryUser: '',
  whatItsNot: 'Not a social network, not an enterprise platform, and not a replacement for human judgement.',
  harmConsiderations: '',
  phase1Goal: 'Build the smallest useful version that proves the tool helps the primary user.',
  phase2Goal: '',
  phase3Goal: '',
  deploymentChoice: 'netlify',
  hasDatabase: false,
  techNotes: '',
}

const EXTRA_RESEARCH_TRIGGERS = [
  {
    id: 'shared-data',
    label: 'Shared or persistent data',
    keywords: ['shared', 'database', 'save data', 'between sessions', 'accounts', 'login', 'members', 'admin'],
  },
  {
    id: 'sensitive-data',
    label: 'Personal, sensitive, health, financial, or safety-impacting data',
    keywords: ['personal', 'health', 'medical', 'finance', 'financial', 'address', 'children', 'minor', 'safety', 'vulnerable'],
  },
  {
    id: 'uploads-media',
    label: 'Uploads, files, images, or media storage',
    keywords: ['upload', 'file', 'photo', 'image', 'media', 'document', 'receipt'],
  },
  {
    id: 'payments',
    label: 'Payments, payouts, subscriptions, or money movement',
    keywords: ['payment', 'payout', 'stripe', 'subscription', 'invoice', 'paid', 'money'],
  },
  {
    id: 'maps-location',
    label: 'Maps, geolocation, addresses, or place discovery',
    keywords: ['map', 'location', 'geolocation', 'address', 'venue', 'nearby'],
  },
  {
    id: 'external-integrations',
    label: 'External integrations or third-party services',
    keywords: ['api', 'integration', 'google sheets', 'slack', 'email', 'sms', 'calendar', 'webhook'],
  },
  {
    id: 'ai-output',
    label: 'AI-generated or AI-assisted user-facing content',
    keywords: ['ai', 'recommend', 'summarise', 'summarize', 'generate', 'moderation', 'matching'],
  },
]

export function generateDocs(data, options = {}) {
  const d = normalizeProjectData(data, options)

  return {
    'CONSTITUTION.md': generateConstitution(d),
    'MISSION.md': generateMission(d),
    'PRODUCT_BRIEF.md': generateProductBrief(d),
    'POC_ACCEPTANCE.md': generatePocAcceptance(d),
    'DATA_MODEL.md': generateDataModel(d),
    'RISK_REGISTER.md': generateRiskRegister(d),
    'TEST_PLAN.md': generateTestPlan(d),
    'RUNNER.md': generateRunner(d),
    'PHASE_QUEUE.md': generatePhaseQueue(d),
    'SETUP.md': generateSetup(d),
    'STATE.md': generateState(d),
  }
}

export function normalizeProjectData(data = {}, options = {}) {
  const raw = { ...FIELD_DEFAULTS, ...data }
  const date = options.date || new Date().toISOString().split('T')[0]

  const normalized = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => {
      if (typeof value === 'boolean') return [key, value]
      return [key, cleanText(value)]
    })
  )

  const combined = [
    normalized.whatItDoes,
    normalized.whoItsFor,
    normalized.problemItSolves,
    normalized.primaryUserSituation,
    normalized.secondaryUser,
    normalized.whatItsNot,
    normalized.harmConsiderations,
    normalized.phase1Goal,
    normalized.phase2Goal,
    normalized.phase3Goal,
    normalized.techNotes,
  ].join(' ').toLowerCase()

  const triggers = EXTRA_RESEARCH_TRIGGERS.filter((trigger) => (
    (trigger.id === 'shared-data' && normalized.hasDatabase)
      || trigger.keywords.some((keyword) => combined.includes(keyword))
  ))

  return {
    ...normalized,
    date,
    title: normalized.projectName,
    missionSentence: ensureSentence(normalized.whatItDoes),
    audienceSentence: ensureSentence(normalized.whoItsFor),
    problemSentence: ensureSentence(normalized.problemItSolves),
    primaryUserSentence: ensureSentence(normalized.primaryUserSituation),
    phase1Title: makeShortTitle(normalized.phase1Goal, 'Prove the Core Use'),
    phase2Title: makeShortTitle(normalized.phase2Goal, 'Make It Reliable'),
    phase3Title: makeShortTitle(normalized.phase3Goal, 'Make It Trustworthy'),
    researchTriggers: triggers,
  }
}

function generateConstitution(d) {
  return `# CONSTITUTION.md - ${d.title}

## What You Are

You are building ${d.title}: ${d.missionSentence}

The tool is for ${lowerFirst(d.audienceSentence)} Every meaningful decision should help ${d.primaryUserName}, whose situation is: ${d.primaryUserSentence}

## What You Are Not

${ensureSentence(d.whatItsNot)}

You are not building a demo for its own sake. You are building the smallest real version that can be tested by real people, improved safely, and kept understandable by the community that owns it.

## Inviolable Principles

### 1. Real Users, Real Problems

Build for ${d.primaryUserName}. If a feature does not help that person or a clearly named secondary user, do not build it yet.

### 2. Static-First by Default

For a small community web app, start with a static-first React/Vite/Tailwind app and local-first browser storage unless research proves the project needs accounts, shared records, uploads, payments, roles, maps, or regulated/sensitive data handling.

### 3. Triggered Research, Not Endless Research

Every phase gets one focused research pass. Run extra research loops only when a trigger appears. Extra loops are capped at three per phase and must end in a written decision.

${researchTriggerSummary(d)}

### 4. Progressive Enhancement

Each phase must leave the tool working, buildable, and understandable. Do not break a working simple version to chase a bigger architecture.

### 5. Evidence Changes the Plan

The phase queue is a hypothesis. Research, user testing, or safety findings can change the queue, but every change must be written down.

### 6. Data Sovereignty and Privacy

Collect the least data possible. Store it locally by default. If shared data or accounts are needed, write a backend decision record before building.

### 7. Harm Check

${d.harmConsiderations ? ensureSentence(d.harmConsiderations) : 'No project-specific harm was entered yet. Before building, check whether mistakes could affect money, health, safety, personal privacy, access to services, or vulnerable people.'}

### 8. Ship Small, Review Often

Each phase must end with build, test, critique, confidence score, and next-step notes.

## Technical Defaults

- Frontend: React + Tailwind CSS.
- Build: Vite, output to \`dist/\`.
- Hosting: ${deploymentLabel(d.deploymentChoice)}.
- Storage: local-first browser storage for Phase 1 unless triggered research says otherwise.
- Backend: none by default. Add one only after a written architecture decision.

${d.techNotes ? `## Existing Tool Notes\n\n${ensureSentence(d.techNotes)}\n` : ''}`
}

function generateMission(d) {
  return `# MISSION.md - ${d.title}

## Strategic Outcome

${d.missionSentence}

## Why This Matters

${d.problemSentence}

## Who This Serves

- Primary: ${d.primaryUserName} - ${d.primaryUserSentence}
${d.secondaryUser ? `- Secondary: ${ensureSentence(d.secondaryUser)}` : '- Secondary: to be confirmed through Phase 1 research.'}

## What Done Looks Like

A person who needs this tool can:

1. Find or open it easily.
2. Understand what it does in under 30 seconds.
3. Complete the core task without help.
4. Trust what happened and know what to do next.
5. Share feedback that can guide the next phase.

## Non-Goals

${ensureSentence(d.whatItsNot)}

## First Proof Target

${ensureSentence(d.phase1Goal)}
`
}

function generateProductBrief(d) {
  return `# PRODUCT_BRIEF.md - ${d.title}

## Product One-Liner

${d.missionSentence}

## User and Need

${d.title} serves ${lowerFirst(d.audienceSentence)}

Primary user:

- ${d.primaryUserName}: ${d.primaryUserSentence}

${d.secondaryUser ? `Secondary users:\n\n${markdownList(listFromText(d.secondaryUser))}` : 'Secondary users: confirm during Phase 1 research.'}

## Problem

${d.problemSentence}

## Default Product Shape

Build a small, mobile-friendly community web app first. Prefer one clear workflow over many partial features. Use realistic seed content so the first proof feels concrete.

## Scope Boundaries

In scope for the first proof:

- ${ensureSentence(d.phase1Goal)}
- A clear home or start screen.
- The main user workflow.
- Empty, loading, success, and error states where relevant.
- Local-first persistence if the user needs to save draft or personal data.

Out of scope for now:

${markdownList(listFromText(d.whatItsNot))}

## Assumptions To Review

- The app can start static-first.
- The first release does not need a production backend unless a research trigger says otherwise.
- The main user can test the first proof with sample data.
- Any sensitive or shared data requires a written decision before implementation.
`
}

function generatePocAcceptance(d) {
  return `# POC_ACCEPTANCE.md - ${d.title}

## Proof-of-Concept Goal

${ensureSentence(d.phase1Goal)}

## Must-Have User Outcomes

- ${d.primaryUserName} can complete the core task from start to finish.
- The user can tell what data was saved, changed, or produced.
- The app works on a phone-width screen.
- The app remains usable with keyboard navigation and screen readers.
- The app handles empty or incomplete data gracefully.

## Suggested First Screens

1. Start/home screen: explain the task and provide the main action.
2. Core workflow screen: let the user do the main thing.
3. Review/result screen: show what changed and what to do next.
4. Simple settings/reset screen: allow local data to be cleared.

## Quality Bar

- Build passes with no errors.
- Core path has an automated smoke test.
- Generated UI has no known critical accessibility defects.
- No secrets or private data are committed to source.
- Any backend, account, upload, payment, or AI feature has a decision record before build.

## Non-Goals

${markdownList(listFromText(d.whatItsNot))}
`
}

function generateDataModel(d) {
  const storageGuidance = d.hasDatabase
    ? 'The user indicated saved data may matter. Start local-first if data is single-device or draft-only; run a backend research loop before adding shared data, accounts, or admin roles.'
    : 'No backend is required for Phase 1 unless research proves shared data, accounts, uploads, or roles are necessary.'

  return `# DATA_MODEL.md - ${d.title}

## Storage Decision

${storageGuidance}

## Starting Entities

| Entity | Purpose | Owner | Phase 1 Storage |
|---|---|---|---|
| UserNeed | Captures the problem, primary user, and success target. | Project owner | Static config or local JSON |
| CommunityItem | The main thing the app displays or manages. Rename this during Phase 1. | Community/user | Static seed data or localStorage |
| UserAction | The core action the primary user takes. | Browser user | localStorage |
| FeedbackEntry | Notes from testing and real-world use. | Project owner | localStorage or exported notes |

## Data Rules

- Use stable IDs for records once users can edit or save them.
- Keep sample data separate from user-entered data.
- Do not store sensitive personal data unless the risk register and architecture decision explicitly allow it.
- If records must be shared between people, write an architecture decision before adding a backend.

## Open Data Questions

- What is the real name of \`CommunityItem\` in this project?
- What data does ${d.primaryUserName} need to enter?
- What data can be sample/demo-only in the POC?
- Does any data need to move between people or devices?
- What data should be deleted or exportable?
`
}

function generateRiskRegister(d) {
  return `# RISK_REGISTER.md - ${d.title}

## Project-Specific Harm Notes

${d.harmConsiderations ? ensureSentence(d.harmConsiderations) : 'No specific harm notes were entered. Treat this as incomplete until reviewed.'}

## Initial Risks

| Risk | Why It Matters | First Mitigation | Review Trigger |
|---|---|---|---|
| Scope creep | AI assistants may add attractive but unnecessary features. | Follow the phase queue and non-goals. | A feature does not help the primary user. |
| Data privacy | Even small tools can collect personal information. | Collect the least data possible and start local-first. | Personal, sensitive, shared, or account data appears. |
| Wrong architecture | Starting with too much backend slows beginners down; too little backend breaks shared workflows. | Use static-first defaults plus triggered research. | Accounts, roles, uploads, payments, maps, or shared data are needed. |
| Accessibility gaps | Community tools should be usable by people with different abilities and devices. | Use semantic HTML, labels, keyboard testing, and color contrast checks. | Any form, modal, wizard, or custom control is added. |
| AI overreach | AI may invent requirements or make unreviewed safety decisions. | Require decision records for triggered research loops. | The AI proposes external services, legal-sensitive behavior, or user-facing AI output. |

## Active Research Triggers

${researchTriggerSummary(d)}

## Required Human Reviews

- Review the generated scope before pasting the opening prompt into an AI coding assistant.
- Review any decision to add a backend, account system, payment flow, upload feature, map/location feature, or AI-generated user-facing content.
- Review privacy and safety language before sharing with real users.
`
}

function generateTestPlan(d) {
  return `# TEST_PLAN.md - ${d.title}

## Phase 1 Test Strategy

Test the smallest useful workflow before expanding the app.

## Required Checks

- Build: \`npm run build\` succeeds.
- Smoke: a user can open the app and complete the core task.
- Mobile: the core task works at phone width.
- Accessibility: form controls have real labels; keyboard navigation works; status messages are announced.
- Data: local saved data can be created, read, updated, and cleared.
- Privacy: no secret keys or sensitive sample data are committed.

## Suggested Automated Tests

- Unit tests for data formatting and validation helpers.
- Component test for the core form or workflow.
- Browser smoke test for the primary user path.

## User Testing Script

Ask ${d.primaryUserName} or a close proxy to try the POC for 5 minutes:

1. What did you think the app was for?
2. What did you try first?
3. Where did you hesitate?
4. What would make this useful enough to try again?
5. What should not be built yet?

## Pass/Fail Gate

The phase passes only if the core workflow works, the app builds, and the next phase is based on evidence rather than guesses.
`
}

function generateRunner(d) {
  return `# RUNNER.md - ${d.title} Engine

Paste this into your AI coding assistant as the opening prompt.

## What You Are

You are building ${d.title}, a small community web app. Use guided defaults first, then run focused research only when a trigger requires it.

## Before Anything Else

1. Read \`CONSTITUTION.md\`.
2. Read \`MISSION.md\`.
3. Read \`PRODUCT_BRIEF.md\`.
4. Read \`POC_ACCEPTANCE.md\`.
5. Read \`DATA_MODEL.md\`, \`RISK_REGISTER.md\`, and \`TEST_PLAN.md\`.
6. Read \`PHASE_QUEUE.md\` and \`STATE.md\`.
7. Check for \`STOP.md\`; halt if present.
8. Begin the next unfinished phase.

## Default Build Path

- Use React + Tailwind CSS + Vite.
- Build static-first and mobile-first.
- Use localStorage only for simple single-browser persistence.
- Do not add a backend unless a triggered research loop recommends it and records the decision.

## Phase Loop

For each phase:

1. Research: one focused baseline pass.
2. Triggered research: run up to three extra loops only for active triggers.
3. Triage: decide what to build and what not to build.
4. Spec: write acceptance criteria.
5. Build: implement the smallest useful increment.
6. Test: run build plus relevant automated/manual checks.
7. Critique: check alignment, risks, and learning.
8. Confidence: score research signal, source convergence, constitutional alignment, and build confidence.
9. Forward: update \`STATE.md\`, \`PHASE_QUEUE.md\`, and the next phase notes.

## Triggered Research Loop Format

Each triggered research loop must produce:

1. Question being answered.
2. Options considered.
3. Recommendation.
4. Rejected alternatives.
5. Confidence score.
6. Human review needed: yes/no.

## Hard Limits

- Build the smallest useful version first.
- Max three triggered research loops per phase.
- Max three build attempts before writing a blocker note.
- Do not ask for chat clarification unless a human decision is truly blocked.
- Never commit secrets.

## Remember

You are building this for ${d.primaryUserName}: ${d.primaryUserSentence}
`
}

function generatePhaseQueue(d) {
  const optionalPhases = [
    d.phase2Goal && phaseBlock(2, d.phase2Title, d.phase2Goal, 'Build on the proven first workflow without changing the core promise.'),
    d.phase3Goal && phaseBlock(3, d.phase3Title, d.phase3Goal, 'Add trust, polish, or depth after the core path is reliable.'),
  ].filter(Boolean).join('\n')

  return `# PHASE_QUEUE.md - ${d.title}

This queue is a hypothesis. Change it when evidence says to.

## Research Rules

- Every phase gets one focused research pass.
- Extra research loops run only when a trigger is active.
- Extra loops are capped at three per phase.
- Every loop ends with a recommendation and confidence score.

${researchTriggerSummary(d)}

## Queue

${phaseBlock(1, d.phase1Title, d.phase1Goal, 'This is the smallest useful proof for the primary user.')}
${optionalPhases || phaseBlock(2, 'Make It Reliable', 'Improve the first workflow based on testing, fix usability gaps, and add only the next highest-value capability.', 'This phase is intentionally evidence-driven.')}
${!d.phase3Goal ? phaseBlock(3, 'Make It Trustworthy', 'Add trust signals, accessibility polish, privacy review, and feedback paths after the first workflow is useful.', 'Trust work should follow a working core, not replace it.') : ''}
### Phase 4+: Expand Based on Evidence

Goal: build what research and user feedback reveal as the next priority.

## Queue Change Log

### ${d.date} - Initial Queue Created

- Generated by Outcome Vine Coding.
- Default path: static-first small community app.
- Research path: triggered loops for complexity, data, safety, or integration decisions.
`
}

function generateSetup(d) {
  const deploy = {
    netlify: 'Netlify static site',
    vercel: 'Vercel static site',
    unsure: 'TBD during setup',
  }[d.deploymentChoice] || 'TBD during setup'

  return `# SETUP.md - ${d.title}

Do these once before launching the engine.

## Default Setup

1. Create a new project folder.
2. Put all generated documents in the folder.
3. Open the folder in an AI coding assistant.
4. Paste the opening prompt from \`RUNNER.md\`.
5. Build with React + Tailwind CSS + Vite unless a triggered research loop changes the stack.

## Hosting

Recommended default: ${deploy}.

For Netlify:

\`\`\`bash
npm run build
npx netlify deploy --prod --dir dist
\`\`\`

## Storage

Start local-first:

- Static seed data for examples.
- localStorage for drafts or personal single-browser data.
- No backend until a written architecture decision says it is needed.

## Backend Escape Hatch

Run a backend research loop before adding:

- accounts or login
- shared records
- uploads or media storage
- payments
- admin roles
- private/sensitive data
- external integrations that need secrets

## Notes

${d.techNotes ? ensureSentence(d.techNotes) : 'No extra setup notes were entered.'}
`
}

function generateState(d) {
  return `# STATE.md - ${d.title}

Last updated: ${d.date}
Current phase: Phase 0 complete. Phase 1 not started.
Deployed URL: Not yet deployed.
Default stack: React + Tailwind CSS + Vite.
Default storage: static seed data plus localStorage if needed.

## What Exists

- Foundation and Core Plus documents generated.
- No application code yet.
- No backend yet.
- No live deployment yet.

## Active Assumptions

- The first proof can be static-first.
- ${d.primaryUserName} is the primary user for early decisions.
- The first proof target is: ${ensureSentence(d.phase1Goal)}

## Active Research Triggers

${researchTriggerSummary(d)}

## Known Gaps

- No code scaffold.
- No visual design yet.
- Data model names need to be made project-specific during Phase 1.
- Any backend decision is pending triggered research.
`
}

function phaseBlock(number, title, goal, why) {
  return `### Phase ${number}: ${title}

Goal: ${ensureSentence(goal)}

Why: ${ensureSentence(why)}

Acceptance gate:

- The app builds.
- The primary workflow still works.
- The phase has research, triage, spec, build log, critique, confidence score, and next-phase notes.
`
}

function researchTriggerSummary(d) {
  if (!d.researchTriggers.length) {
    return `Active extra research triggers:

- None yet. Use the default static-first path unless Phase 1 research discovers a trigger.`
  }

  return `Active extra research triggers:

${markdownList(d.researchTriggers.map((trigger) => trigger.label))}`
}

function deploymentLabel(choice) {
  const labels = {
    netlify: 'Netlify static site',
    vercel: 'Vercel static site',
    unsure: 'decide during setup',
  }
  return labels[choice] || 'decide during setup'
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function ensureSentence(value) {
  const text = cleanText(value)
  if (!text) return ''
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function lowerFirst(value) {
  const text = cleanText(value)
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : text
}

function makeShortTitle(value, fallback) {
  const text = cleanText(value)
  if (!text) return fallback
  const firstLine = text.split('\n')[0]
  const firstSentence = firstLine.match(/^(.+?[.!?])(\s|$)/)?.[1] || firstLine
  return firstSentence
    .replace(/[.!?]$/, '')
    .replace(/\s+/g, ' ')
    .slice(0, 90)
    .trim() || fallback
}

function listFromText(value) {
  return cleanText(value)
    .split(/\n|;|,(?=\s+(?:not|and|or|[A-Z]))/i)
    .map((item) => item.trim().replace(/^[-*]\s*/, ''))
    .filter(Boolean)
}

function markdownList(items) {
  const safeItems = items.length ? items : ['To be confirmed during Phase 1 research.']
  return safeItems.map((item) => `- ${ensureSentence(item)}`).join('\n')
}
