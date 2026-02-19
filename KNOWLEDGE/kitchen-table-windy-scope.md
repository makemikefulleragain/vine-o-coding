# THE KITCHEN TABLE — Windy Build Scope
## Kamunity Operational Command Centre

---

## What This Is

The Kitchen Table is Kamunity's operational nervous system — the single place where everything lives: tasks, phases, outreach, sites, money, safety, and gaps. It externalises the connections that currently only exist in Mike's head. It IS the single-point-of-failure mitigation.

**Name origin:** Where the real planning happens. Not a war room. Not a dashboard. A kitchen table where you spread everything out and see what connects to what.

## Current State

A single HTML file (kitchen-table-v2.html) exists as prototype. It works, persists task state to localStorage, has 8 tabs (Today, All Tasks, Phases, Ecosystem, Allies, Money, Safety, Gaps), includes email composer and task filtering. But it's constrained by single-file architecture.

## What Windy Builds

A multi-page progressive web app deployed on Netlify with Supabase for persistence (later phase — localStorage for v1).

### Architecture

```
kitchen-table/
├── index.html          (Today view — the landing page)
├── tasks.html          (All Tasks — full phase task list)
├── phases.html         (Build roadmap timeline)
├── ecosystem.html      (All sites + their status)
├── allies.html         (Constellation + outreach)
├── money.html          (Revenue, services, grants)
├── safety.html         (Threat model tracker)
├── gaps.html           (Open questions + unknowns)
├── css/
│   └── kitchen.css     (Shared styles — campfire aesthetic)
├── js/
│   ├── data.js         (ALL data in one place — single source of truth)
│   ├── nav.js          (Shared navigation component)
│   ├── tasks.js        (Task rendering, filtering, persistence)
│   ├── compose.js      (Email/note composer)
│   └── utils.js        (Shared utilities)
└── manifest.json       (PWA manifest for mobile install)
```

### Design System

**Aesthetic:** Campfire warmth. Dark background (#1a1714), ember gold (#e8a84c) accents, moss green (#6b9e6b) for success, sky blue (#5c8ec7) for info.

**Typography:** Fraunces (serif, headings) + DM Sans (body). Same as existing Kamunity sites.

**Principle:** Dense but not cluttered. Everything visible, nothing hidden behind unnecessary interaction. Mobile-first — Mike will use this on his phone as much as desktop.

### Shared Navigation

Sticky header on every page. Tab bar scrollable on mobile. Current page highlighted. Quick-compose FAB (floating action button) on every page.

### Page Specifications

#### 1. TODAY (index.html)
- Stats bar: Tasks done, total, critical count, sites live, NLnet countdown (auto-calculates from April 1), meetings count
- Tasks tagged "today" grouped by category (Critical / Meeting Prep / Build / Revenue / Other)
- Each task: checkbox (persists), title, priority badge, phase badge, tag badges
- Click task → expands detail panel with notes + action buttons
- Outreach tasks get "Draft Email" button → opens composer pre-filled
- Group headers show completion count, collapsible

#### 2. ALL TASKS (tasks.html)
- **This is the full roadmap as tasks** — every single action from Phase 1 through Phase 6
- Filter bar: All / Open / Done / Phase 1-6 / Safety / Build / Revenue / Outreach / Meetings / Grants
- Tasks grouped by Phase, with phase headers showing completion count
- Phase groups collapsible — click header to toggle
- Each task expandable to show full detail notes
- Tasks with outreach tag get email compose button
- **CRITICAL: Task detail notes are substantial** — each contains the context, reasoning, specific names/numbers/URLs needed to actually do the task

#### 3. PHASES (phases.html)
- Visual timeline (vertical, left-aligned nodes)
- Active phase highlighted (ember glow)
- Each phase shows: title, timeframe, key deliverables, task completion progress
- GOAL STATE visually distinct (breaks the timeline)
- Future phases dimmed but visible
- **Enhancement over prototype:** Click phase → navigates to All Tasks filtered to that phase

#### 4. ECOSYSTEM (ecosystem.html)
- Grid of all Kamunity sites/tools grouped by status: Live / Building / Planned / Future
- Each card: icon, name, URL (clickable if live), description, status badge
- **Complete list (nothing missing):**
  - Live: Kai (kamunity.org), Sovereignty Audit, AI Readiness, Vine-o-Code, FactoryK, Constellation, Kamunity.ai, Nonna's Knitting, Grants Hub
  - Building: Constitution Page
  - Planned: Perth Directory, Community Rooms, Pattern Dashboard
  - Future: Local Kai Instances, Convention Tools, Kai Network

#### 5. ALLIES (allies.html)
- Grid of all Constellation allies
- Tier-based border colours (Tier 1 = ember, Tier 2 = moss)
- Filter: All / Tier 1 / Tier 2 / Perth / Meeting / International
- Each card: name, role, status badge, next action
- "Draft Email" button on every card → composer pre-filled with ally name
- **Enhancement:** Status progression visible (To Map → To Contact → Meeting Scheduled → Active → Engaged)

#### 6. MONEY (money.html)
- Stats bar: Revenue MTD (editable), monthly costs, target, NLnet ask
- Consulting services with dual pricing
- Grant pipeline with status + deadlines
- Revenue trajectory (Now → 3-6mo → 6-12mo → Year 2)

#### 7. SAFETY (safety.html)
- All threat model items with severity badges
- Filter: All / Critical / Open / In Progress / Done
- Each item: ID, description, severity, status
- Status updatable (click to cycle: open → in-progress → done)

#### 8. GAPS (gaps.html)
- Known gaps (amber left border)
- Open questions (blue left border)
- **Enhancement:** "Resolved" toggle to mark gaps/questions as answered

### Shared Components

#### Quick Compose (every page)
- FAB button bottom-right
- Slide-up modal: type selector (Email / Note), To/Subject field, body textarea
- Email generator produces ready-to-send template with Kamunity intro
- Copy to clipboard button
- **Enhancement:** Email templates per ally type (peak body intro, workshop offer, grant reviewer ask, conference proposal)

#### Data Layer (data.js)
- ALL data in one file — tasks, phases, sites, allies, services, grants, safety items, gaps
- Single source of truth
- localStorage persistence for task states, safety statuses, gap resolved states
- Export function (JSON dump of all state — for sharing with Opus/other instances)
- Import function (load state from JSON — for receiving updates)

### Constitutional Alignment

- No tracking, no analytics, no external calls
- All data stays in browser (localStorage)
- Export/import is explicit user action
- Clear data button visible
- Built with Vine-o-Code methodology (it's eating its own cooking)

### What NOT to Build (Yet)

- No user accounts (v1 is single-user Mike's tool)
- No server-side persistence (localStorage only for v1)
- No real-time sync (export/import JSON for instance bridge)
- No calendar integration (manual task management)
- No automated email sending (compose + copy, Mike sends manually)

### Future Enhancements (After v1)

- Supabase persistence (when Community Rooms come online, share infrastructure)
- Kamunity Room for Kitchen Table itself ("The Kitchen Table" room where community can see/contribute to the roadmap)
- API integration for NLnet countdown, site uptime monitoring
- Drag-and-drop task reordering
- Timeline adjustment UI (drag phase boundaries)
- Note-taking per task with timestamp

---

## Technical Notes for Windy

- Deploy target: Netlify (static site, drag-and-drop deploy)
- No build step needed — plain HTML/CSS/JS
- Shared CSS via single stylesheet imported by all pages
- Shared JS via module imports
- Mobile-first responsive — Mike uses phone frequently
- Test: Chrome, Safari mobile, Firefox
- Accessibility: keyboard navigation, screen reader labels, colour contrast
- Fraunces font from Google Fonts CDN
- No frameworks — vanilla JS (keep it light, keep it sovereign)

## Data File for Windy

The complete data.js should be seeded with all current data from kitchen-table-v2.html. This includes:
- 46 tasks across all phases with full detail notes
- 7 phases with deliverables
- 16 ecosystem sites with URLs and status
- 16 allies with tier, tags, status, and actions
- 4 consulting services with pricing
- 4 grant opportunities
- 13 safety items
- 13 gaps and questions

All of this data is already in kitchen-table-v2.html — Windy should extract it into the data.js file.

---

## Success Criteria

Mike opens The Kitchen Table on Monday morning. He can see:
1. What's critical today (without thinking)
2. What's coming next (without context-switching)
3. Who to contact and how (without searching)
4. Whether safety is covered (without remembering)
5. What's still unknown (without pretending)

And he can draft an email to ALIKE WA in 30 seconds flat.

---

*Built at The Kitchen Table. For The Kitchen Table.*
