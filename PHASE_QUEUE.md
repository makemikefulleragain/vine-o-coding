# PHASE_QUEUE.md — Outcome Vine Coding Site
# This queue is a hypothesis. You can and should modify it based on research.

---

## How This Works

Each phase is a broad goal, not a feature spec. You research what's needed, build the highest-value implementation, and propose the next phase based on what you learned.

**After each phase:**
1. Update STATE.md with what was built
2. Write NEXT_PHASE.md in the phase folder proposing what comes next
3. Update THIS FILE if your research suggests reordering or replacing phases
4. Proceed to the next phase

**You may:**
- Reorder phases if research reveals different priorities
- Replace a phase with something research shows is more valuable
- Split a phase if it's too big
- Merge phases if they're too small
- Add phases you discover are needed
- Remove phases you discover are unnecessary

**You must:**
- Document every change to this queue with reasoning
- Never skip the research phase (even if you think you know the answer)
- Leave the site in a deployable state after every phase

---

## The Queue

### Phase 1: Make It Clear
**Goal:** A landing page that explains Outcome Vine Coding in 60 seconds. What it is, who it's for, and proof it works (link to the live grants-hub).
**Why first:** If we can't explain the methodology simply and compellingly, nothing else matters. This is the "would Maya stay on this page?" test.
**Broad scope:**
- Hero section with clear value proposition
- Visual overview of the three layers (Foundation Documents → Phase Loop → Safety Mechanisms)
- Brief grants-hub story as proof ("we built a real tool using this process")
- Link to live grants-hub
- Clean, modern UI (React + Tailwind)
- Mobile responsive
- Deployed to Netlify
**Acceptance gate:** A 9th grader can read the landing page and explain what Outcome Vine Coding is in their own words.

### Phase 2: Make It Walkable
**Goal:** The interactive widget — a multi-step form that takes a user from "I want to build..." to "Here are your starting documents and your Windsurf prompt."
**Why second:** The widget IS the core product. Content without interaction is just a blog post. People learn by doing.
**Broad scope:**
- Multi-step guided form (5-6 steps)
- Two companion examples visible at each step (Grants Hub + Recipe Remix)
- Maya voice as default; Brian "lean-in" expandable sections at each step
- Generates: CONSTITUTION.md, MISSION.md, RUNNER.md, PHASE_QUEUE.md, SETUP.md, STATE.md
- Generates: a copyable "paste this into Windsurf" opening prompt
- Download as ZIP or copy individually
- All processing client-side (no backend)
**Acceptance gate:** A user with no coding experience can complete the widget and have a usable set of foundation documents.

### Phase 3: Make It Learnable
**Goal:** The case study, deep dives, and methodology report — depth for people who want to understand, not just use.
**Why third:** After Maya can use the widget, Brian wants to understand why it works. Teachers want material for workshops. This is the reference layer.
**Broad scope:**
- Interactive grants-hub timeline (8 phases, including the Phase 2 failure and recovery)
- "Lean-in for Brian" deep dives: why phases are hypotheses, confidence scoring theory, the Andon cord concept, human-AI collaboration model
- Downloadable methodology report (the professional document)
- The full foundation document templates with annotations
**Acceptance gate:** Brian can explain the methodology's theoretical underpinnings after reading the case study and deep dives.

### Phase 4: Make It Findable
**Goal:** Ensure people who could benefit from this methodology can find the site.
**Why fourth:** Same logic as grants-hub Phase 4 — a great resource nobody knows about helps nobody.
**Broad scope:** SEO, Open Graph, community sharing, listings on relevant directories (education, coding, community tech), cross-linking with grants-hub and kamunity.ai.

### Phase 5: Make It Lived
**Goal:** Respond to real user feedback. Gallery of projects built with the methodology? Workshop materials? Community forum?
**Why last:** By this point, real users should be visiting and using the widget. Build whatever they actually need, not what we assume.

---

## Queue Change Log

### 2026-02-15 — Initial Queue Created
- Queue established based on discussion between human and engine.
- Phase order follows the grants-hub pattern: clarity → utility → depth → discoverability → evidence-based expansion.
- The widget (Phase 2) is the core product; the landing page (Phase 1) is the minimum viable explanation needed before the widget makes sense.
- No external research conducted yet — first phase will validate these assumptions.

### 2026-02-15 — Phase 1 Complete, Queue Validated
- Phase 1 research confirmed no competing methodology site exists for AI-assisted coding. The gap is real.
- Phase 2 (widget) remains the correct next step — the disabled "Start Building" CTA is the biggest tension on the page.
- **No queue changes.** The original hypothesis holds. Phase order unchanged.

### 2026-02-15 — Phase 2 Complete, Queue Validated
- Phase 2 built the interactive widget: 6 steps, companion examples, Brian lean-in sections, document generation, ZIP download, opening prompt.
- Phase 3 (case study + deep dives) remains the correct next step. Widget creates natural demand for understanding *why* the process works.
- Critique identified the companion examples as the "secret weapon" — this pattern should carry into the case study.
- **No queue changes.** Phase order unchanged.

### 2026-02-15 — Phase 3 Complete, Queue Validated
- Phase 3 built the case study page: interactive timeline (8 phases), 4 deep dives, methodology summary download.
- The two-layer content design (Maya summary + Brian depth) is now a consistent pattern across all 3 pages.
- Phase 4 (Make It Findable) remains correct — the site has 3 complete pages and needs SEO/discoverability.
- **No queue changes.** Phase order unchanged.

### 2026-02-15 — Phase 4 Complete, Queue Validated
- Phase 4 added SEO: OG tags, Twitter Card, JSON-LD, sitemap, robots.txt, netlify.toml, per-route titles.
- Phases 1-4 built in a single session with zero user feedback. **Phase 5 must wait for real user evidence.**
- Phase 5 (Make It Lived) scope will be determined by user feedback after first deploy.
- **No queue changes.** Phase order unchanged. Phase 5 is paused until human deploys and gathers feedback.

### 2026-02-15 — Phase 5 Complete (UAT-driven), Queue Complete
- Phase 5 was driven entirely by UAT feedback: 2 bugs fixed, 3 features added.
- All 5 original phases are now complete. The site has: landing page, widget, case study, SEO, trust pages, feedback mechanism.
- Future phases would be evidence-driven from broader user testing.
- **Queue status: ALL PHASES COMPLETE.** No further phases queued. Next work should be based on user feedback collected via the feedback button.

### 2026-02-15 — Phase 6 Complete (Round 2 UAT), Evidence-Driven Extension
- Phase 6 was driven by Round 2 UAT: 7 items from 2 testers (Maya + Brian personas).
- Truthfulness audit caught "5 simple questions" → corrected to "5 short steps".
- Animated MethodologyFlow added to landing + case study.
- Feedback widget upgraded from mailto to Netlify Forms (anonymous, structured, <90 sec).
- Brian further reading links added to all 4 deep dives.
- Desktop spacing tightened across all pages.
- **Queue status: EVIDENCE-DRIVEN.** Phase 7 scope determined by Netlify Forms feedback submissions after deploy.

### 2026-02-15 — Phase 7 Complete (Round 3 UAT), Rich & Shareable
- Phase 7 was driven by Round 3 UAT: 3 items from both testers.
- DeepDives refactored: lessons + links always visible, magazine-style expandable analysis.
- Vine-o-coding added as a live case study with 7-phase emerald timeline.
- User insight: "this website is also a great live case study" — adopted as feature.
- **Queue status: EVIDENCE-DRIVEN.** Phase 8 scope determined by feedback submissions + Round 4 testing. Blog-style shareable story is top candidate.

### 2026-02-15 — Phase 8 Complete (Round 4 UAT), Smooth & Navigable
- Phase 8 was driven by Round 4 UAT: 2 items (flicker bug + page length).
- FadeIn flicker fixed: CSS transitions replace keyframe animations.
- Case study split into 3 pages: /method, /case-study, /our-story.
- Mobile hamburger nav added. Active page highlighting.
- **Queue status: EVIDENCE-DRIVEN.** Phase 9 scope determined by Round 5 testing. Accessibility, performance, and editorial Our Story are top candidates.
