# PHASE_QUEUE.md — Kamunity Consulting Website
## kamunityconsulting.com rebuild · Feb 2026
## This queue is a hypothesis. Modify based on research and what you learn.

---

## How This Works

Each phase is a broad goal, not a feature spec. Research what's needed, build the highest-value implementation, leave the site in a deployable state, and propose the next phase based on what you learned.

**You may:**
- Reorder phases if research reveals different priorities
- Replace a phase if something more valuable emerges
- Split a phase if it's too big

**You must:**
- Document every change with reasoning
- Never skip the research step
- Leave the site deployable after every phase
- Never break what's already working

---

## Pre-Phase: Foundation Complete ✓
- Copy locked (from human/Claude design session Feb 2026)
- Two-door architecture defined
- Proof points confirmed
- Priya persona grounded
- Campfire aesthetic direction set
- Stack decided: static HTML/CSS/vanilla JS, Netlify

---

## ~~Phase 1: The Front Door (Make it real)~~ ✅ COMPLETE — Feb 2026

**Goal:** Build the above-the-fold landing page — the only thing Priya sees before she decides to stay or leave. Mobile-first. No scroll required. Both copy versions routing via URL parameter.

**Deliverables:**
- `index.html` with Version 4 copy as default
- `?v=priya` parameter serving Version 3 copy
- Two door buttons (Fix the shit things / Do the impossible thing) — anchoring to Phase 2 sections initially
- Campfire aesthetic applied
- Deployed to Netlify (replacing Wix)

**Done When:**
- [x] Loads in under 2 seconds on mobile
- [x] All front door copy visible above the fold on iPhone 12 viewport
- [x] Both copy versions render correctly via URL parameter
- [x] Both door buttons visible and clickable
- [x] No tracking scripts, no cookies (beyond Netlify minimum)
- [x] Passes basic accessibility check (contrast, font size, tap targets)
- [x] Deployed live — temp URL confirmed; DNS cutover from Wix pending Mike's decision

**Why first:** Nothing else matters until this works. The Wix site is failing every day it's live.

---

## ~~Phase 2: Behind the Doors (Make it useful)~~ ✅ COMPLETE — Feb 2026

**Goal:** Each door button leads to a page (or section) that tells Priya what actually happens when she engages Mike — what the work looks like, what the result feels like, and one specific proof point.

**Deliverables:**
- `/fix` page — Red door content
  - What it is (QA, process, strategy, team)
  - What it feels like (the pub description: good people, fix the shit things, no drama)
  - Proof: RAC $500k, WALGA, ALIKE strategy
  - The "I'm interested" mechanism
- `/impossible` page — Blue door content
  - What it is (design sprints, hackathons, innovation, AI)
  - What it feels like (the pub description: crazy people, never heard no, co-conspirators)
  - Proof: WA Health hackathon, Youth placemaking, Western Power hackathon
  - The "I'm interested" mechanism

**Done When:**
- [x] Both pages live and linked from front door buttons
- [x] Each page works above the fold on mobile (key content visible without scrolling)
- [x] Proof points present and specific (no generic testimonials)
- [x] "I'm interested" mechanism functional (Netlify forms — fix-interest + impossible-interest)
- [x] Cross-link to other door present ("Actually I think I need the other door")

**Why second:** Front door without anywhere to go is a dead end.

---

## ~~Phase 3: The Mike Page (Make it human)~~ ✅ COMPLETE — Feb 2026

**Goal:** One page that makes Priya feel like she already knows Mike before she reaches out. Not a CV. Not a bio. A human paragraph and the receipts.

**Deliverables:**
- `/about` page
  - The human paragraph (warm, direct, origin story nod — Glasgow chugger to community AI)
  - The career arc as proof of range, not a timeline (brewing → mining → disability → community)
  - Captain America framing implicit (the methodology, not the hero)
  - The Kamunity ecosystem context (brief — this is the consulting door, not the ecosystem tour)
  - Photo if available

**Done When:**
- [x] Page passes the "feels human" test — reads like a person not a brochure
- [x] No bullet-pointed CV format
- [x] Origin story present (Glasgow chugger → Perth community AI)
- [x] Cross-links to K.org for ecosystem depth
- [x] Mobile-first

**Why third:** Trust builder. Needed before anyone reaches out but not needed before the front door works.

---

## Phase 4: The Free Thing (Make it irresistible) ⏳ ON HOLD — awaiting real traffic data

**Goal:** One genuinely useful free resource per door that does two jobs: gives Priya something real she can use today, and demonstrates Mike understands her world in a way no other consultant does.

**Options to research in this phase:**
- "Is your AI ready?" self-assessment (10 questions, instant result, links to the AI readiness tool)
- "Where's the waste hiding?" quick audit guide (PDF or interactive)
- Something else research reveals is more valuable

**Done When:**
- [ ] At least one free resource live and linked from the relevant door page
- [ ] Resource is genuinely useful without requiring Mike's involvement
- [ ] "Want Mike to look at your results?" ask present (low friction, high signal)
- [ ] No data collection beyond optional email for follow-up (with explicit consent)

**Why fourth:** Trust accelerator. Helpful before the sale. But the front door must work first.

---

## Phase 5+: Expand Based on Evidence

By this point real people should be landing on the site. Build what they actually need. Possible directions:
- Pricing transparency page
- Testimonials/case studies (as they accumulate)
- Blog/thinking feed (or link to K.org)
- Events and workshops listing
- SEO groundwork

---

## Queue Change Log

### 2026-02-21 — Phase 3 Refinements + Phase 5 Early Entry (Kai FAB)

**Phase 3 refinements (should have been in Phase 3):**
- Comment modal: "Post to Mike" button, removed mandatory privacy checkbox
- Hidden Netlify detection forms fixed (were appearing on mobile)
- Mobile: doors stack vertically, scrolling enabled across screen sizes
- Footer: hidden on desktop landing, visible on mobile/inner pages
- Door redesign: wooden door (Fix) + glass office door (Impossible), nameplates, correct knob/handle heights
- Door interaction: single-action knock + haptic → 1s delay → flip (removed two-step hover model)
- "Knock to enter" replaced with full copy block above doors:
  - H1/H2 Georgia serif, P1 italic at disclaimer size
  - Bold green accent: "This is where we start."
  - Removed QA/Improvement and Innovation/AI labels below doors

**Phase 5 early entry — Kai FAB (not Phase 4):**
- Floating draggable chat button (ember K) on all 4 pages
- Netlify Function proxy (`netlify/functions/kai.js`) — API key server-side only
- Claude claude-3-5-haiku-20241022, 200 token cap (enforces 2-3 sentence brevity)
- System prompt: kamunity.org constitution principles
- Transparent cold-start latency note on first message
- Disclaimer + links to constitution + "Meet full Kai" at kamunity.org
- ANTHROPIC_API_KEY set in Netlify dashboard (secret)

**Phase 4 status:** Still pending. Correct decision — wait for real traffic before building free resource.

---

### 2026-02-20 — Initial Queue Created
- Generated from human/Claude design session (Mike + Claude Sonnet 4.6)
- Copy locked in session before this doc was created
- Two-door architecture confirmed
- Static HTML stack confirmed (replaces React+Vite from AI readiness template)
- Wix replacement confirmed as primary urgency
