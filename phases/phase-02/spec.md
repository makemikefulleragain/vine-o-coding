# Phase 2 Spec — Make It Walkable

**Date:** 2026-02-15

---

## Acceptance Criteria

1. A user with no coding experience can complete the 6-step widget in under 10 minutes.
2. The widget generates 6 markdown files (CONSTITUTION, MISSION, RUNNER, PHASE_QUEUE, SETUP, STATE) that are usable as-is.
3. The widget generates a copyable opening prompt for an AI coding assistant.
4. Generated documents feel specific to the user's project (not generic template fill-in).
5. Two companion examples (Grants Hub + Recipe Remix) are visible and helpful at each step.
6. Brian lean-in sections are present at each step but never block Maya's flow.
7. ZIP download works in Chrome, Firefox, Safari, and Edge.
8. Copy-to-clipboard works for each individual document and the opening prompt.
9. The widget is fully usable on a 375px mobile screen.
10. `npm run build` produces a clean `dist/` with no errors.
11. The "Start Building" button in the header and hero activates and routes to `/widget`.

---

## Technical Design

### New Dependencies

```
jszip: ^3.10.0
file-saver: ^2.0.5
```

### New Files

```
src/
├── pages/
│   └── Widget.jsx              (widget page — orchestrates steps)
├── components/
│   ├── widget/
│   │   ├── WidgetShell.jsx     (progress bar + step container + nav buttons)
│   │   ├── StepIdea.jsx        (Step 1: Your Idea)
│   │   ├── StepUsers.jsx       (Step 2: Your Users)
│   │   ├── StepBoundaries.jsx  (Step 3: Your Boundaries)
│   │   ├── StepPriorities.jsx  (Step 4: Your First Steps)
│   │   ├── StepSetup.jsx       (Step 5: Your Setup)
│   │   ├── StepReview.jsx      (Step 6: Review & Download)
│   │   ├── ExamplePanel.jsx    (companion examples — tabs for Grants Hub / Recipe Remix)
│   │   ├── BrianNote.jsx       (expandable lean-in section)
│   │   └── DocumentPreview.jsx (single document preview with copy button)
│   └── ...existing components
├── lib/
│   ├── generateDocs.js         (template engine — takes form data, returns 6 documents)
│   ├── generatePrompt.js       (generates the opening AI prompt)
│   ├── examples.js             (Grants Hub + Recipe Remix example data)
│   └── downloadZip.js          (JSZip + FileSaver wrapper)
```

### Routes Update

| Path | Component | Status |
|---|---|---|
| `/` | Home | Phase 1 (active) |
| `/widget` | Widget | Phase 2 (new) |
| `/case-study` | (placeholder) | Phase 3 |

### State Shape

```js
const [formData, setFormData] = useState({
  // Step 1: Your Idea
  projectName: '',
  whatItDoes: '',
  whoItsFor: '',
  problemItSolves: '',

  // Step 2: Your Users
  primaryUserName: '',
  primaryUserSituation: '',
  secondaryUser: '',

  // Step 3: Your Boundaries
  whatItsNot: '',
  harmConsiderations: '',
  
  // Step 4: Your First Steps
  phase1Goal: '',
  phase2Goal: '',
  phase3Goal: '',

  // Step 5: Your Setup
  deploymentChoice: 'netlify',  // netlify | vercel | unsure
  hasDatabase: false,
  techNotes: '',
})
```

---

## Content Design

### Step 1: Your Idea

**Heading:** "What do you want to build?"
**Subheading:** "Don't worry about technical details. Just describe your idea like you'd explain it to a friend."

**Fields:**
- Project name (text, required) — "Give your project a name"
- What it does (textarea, required) — "In a sentence or two, what does this tool do?"
- Who it's for (textarea, required) — "Who will use this? A club, a team, a community?"
- Problem it solves (textarea, required) — "What problem does it fix? What's hard right now without it?"

**Example Panel (Grants Hub):**
- Name: "Community Grants Hub"
- Does: "Helps small nonprofits track their grant spending and produce acquittal reports."
- For: "Volunteer treasurers at small Australian community organisations."
- Solves: "Treasurers spend hours in Excel matching receipts to budgets. Some orgs avoid applying for grants because the reporting is too hard."

**Example Panel (Recipe Remix):**
- Name: "Recipe Remix"
- Does: "A place for our cooking club to share recipes, rate them, and plan what to cook next."
- For: "Maya's school cooking club — 12 members, years 9-10."
- Solves: "Recipes are scattered across group chats, screenshots, and random websites. Nobody can find anything when it's time to cook."

**Brian Note:** "This step creates your MISSION.md — the strategic outcome. Every decision the AI makes will reference this document. The clearer you are here, the better the AI understands what you need. In Lean methodology, this is your 'problem statement.'"

### Step 2: Your Users

**Heading:** "Who exactly will use this?"
**Subheading:** "Think of one specific person. Give them a name. What's their day like when they use your tool?"

**Fields:**
- Primary user name (text, required) — "A name for your main user (real or made up)"
- Their situation (textarea, required) — "Describe this person and when they'd use your tool"
- Secondary user (textarea, optional) — "Anyone else who might use it? (optional)"

**Example Panel (Grants Hub):**
- Primary: "Sandra — volunteer treasurer at a neighbourhood house. She has 3 hours on Saturday to do the books. She uses Excel and a paper folder of receipts."
- Secondary: "Grant managers at larger nonprofits who handle multiple small grants."

**Example Panel (Recipe Remix):**
- Primary: "Anika — year 10, runs the cooking club WhatsApp group. She plans each session and picks the recipe. She's on her phone, usually during lunch."
- Secondary: "Club members who want to browse recipes and add their own."

**Brian Note:** "This becomes your persona in CONSTITUTION.md. Why a specific person? Because 'users' is abstract — Sandra with her Saturday afternoon and paper receipts is concrete. The AI will make better decisions when it can picture Sandra. This is the 'jobs to be done' framework in action."

### Step 3: Your Boundaries

**Heading:** "What should this NOT do?"
**Subheading:** "Every project needs edges. What's out of scope? What could go wrong?"

**Fields:**
- What it's not (textarea, required) — "List things your tool should NOT try to do"
- Safety considerations (textarea, optional) — "Could this tool cause harm if it gets something wrong? (e.g., financial data, health info, personal details)"

**Example Panel (Grants Hub):**
- Not: "Not accounting software (use Xero). Not a grant finder (use GrantConnect). Not a grant application writer."
- Safety: "Handles financial data — needs disclaimer that it's not financial advice. Failed acquittals can blacklist orgs from future grants."

**Example Panel (Recipe Remix):**
- Not: "Not a social media app. Not a meal delivery service. Not a calorie counter."
- Safety: "Food allergies — should show allergen warnings on recipes. School-age users — no personal info beyond first names."

**Brian Note:** "These boundaries become the 'What This Is NOT' and 'Harm Check' sections of your CONSTITUTION.md. Why define what it's not? Because AI coding assistants are eager to please — they'll keep adding features if you don't set limits. The grants-hub CONSTITUTION explicitly says 'not accounting software' to prevent scope creep. In Agile, this is your 'definition of done' boundary."

### Step 4: Your First Steps

**Heading:** "What should be built first?"
**Subheading:** "You don't have to plan everything. Just the first three steps. The method will help you figure out the rest as you go."

**Fields:**
- Phase 1 goal (textarea, required) — "What's the single most important thing to build first?"
- Phase 2 goal (textarea, optional) — "After that works, what's next?"
- Phase 3 goal (textarea, optional) — "And after that? (it's fine to leave this blank)"

**Example Panel (Grants Hub):**
- Phase 1: "Make It Real — move data from browser storage to a real database so it doesn't disappear."
- Phase 2: "Make It Useful — let users manage multiple grants, import bank statements, export data."
- Phase 3: "Make It Trustworthy — about page, privacy policy, FAQ, data deletion."

**Example Panel (Recipe Remix):**
- Phase 1: "Show a list of recipes with photos and ingredient lists. Anyone in the club can browse."
- Phase 2: "Let members add new recipes with a simple form. Rate and comment on recipes."
- Phase 3: "Plan next session — vote on which recipe to cook, generate a shopping list."

**Brian Note:** "These become your PHASE_QUEUE.md. Each phase is a hypothesis — you'll research what's needed, build it, test it, and adjust. The grants-hub planned 5 phases but actually went through 8 (including a Phase 2 failure and rebuild). That's not a failure of planning — it's the plan working as designed. In Lean Startup terms, each phase is a build-measure-learn cycle."

### Step 5: Your Setup

**Heading:** "Where will this live?"
**Subheading:** "Your tool needs a home on the internet. Don't worry — we'll help you set it up."

**Fields:**
- Deployment (radio, required):
  - "Netlify (free, easy drag-and-drop deploy)" — default selected
  - "Vercel (free, connects to GitHub)"
  - "I'm not sure yet (that's fine — you can decide later)"
- Needs a database? (checkbox) — "Will your tool need to save data between sessions? (like user accounts or saved content)"
- Tech notes (textarea, optional) — "Any tools or services you already use or want to use? (optional)"

**Example Panel (Grants Hub):**
- Deploy: Netlify
- Database: Yes (Supabase — for grant data, user accounts)
- Notes: "Needs to handle financial data securely. Integration with Xero/MYOB would be nice eventually."

**Example Panel (Recipe Remix):**
- Deploy: Netlify
- Database: Maybe later (start with browser storage, add Supabase if the club wants accounts)
- Notes: "Need image uploads for recipe photos."

**Brian Note:** "SETUP.md is the human action document — the things you do before the AI starts coding. The AI can't create your Netlify account or your Supabase project for you. This step ensures nothing is assumed. The grants-hub SETUP.md listed every infrastructure step with time estimates."

### Step 6: Review & Download

**Heading:** "Your foundation documents are ready"
**Subheading:** "These 6 files tell an AI coding assistant everything it needs to know about your project. Review them, then download."

**Layout:**
- Tabbed document viewer (one tab per document)
- Each tab shows rendered markdown content with syntax highlighting
- "Copy" button per document
- Below tabs: prominent "Download All as ZIP" button
- Below ZIP: "Copy Opening Prompt" section with the ready-to-paste text
- Below prompt: "What to do next" instructions (3 steps)

**"What to do next" section:**
1. "Open an AI coding assistant (like Windsurf, Cursor, or GitHub Copilot)"
2. "Paste the opening prompt into the chat"
3. "The AI will read your documents and start building. You check each step before it continues."

---

## Visual Design

### Progress Bar
- Horizontal step indicator at top of widget
- Steps: numbered circles with labels
- Current step: indigo fill. Completed: green check. Future: gray outline.
- Labels visible on desktop, numbers-only on mobile (< 640px)

### Step Layout
- Left column (2/3): form fields
- Right column (1/3): example panel (collapsible on mobile)
- Brian note: below form fields, full width, `<details>` element
- Navigation: Back (left) and Next (right) buttons at bottom, full width on mobile

### Color
- Same indigo palette as Phase 1
- Form fields: white with slate-200 borders, indigo focus ring
- Example panel: light purple/indigo background (bg-indigo-50)
- Brian notes: slate-100 background with book icon

---

## What's Explicitly NOT Built

- Template customization (users edit downloaded files)
- Project saving/resuming (complete in one session)
- Multiple AI assistant variations (generic documents work everywhere)
- Fancy markdown rendering (basic formatting sufficient)
- Animation between steps (simple swap, no slide transitions)
