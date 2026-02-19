# Phase 3 Research — Make It Learnable

**Date:** 2026-02-15
**Searches used:** 5/5

---

## Research Question

How should we present the grants-hub case study and methodology deep dives so that Brian gets depth and Maya doesn't get overwhelmed?

## Key Findings

### 1. Interactive Timelines for Case Studies

- **Vertical timelines** are the dominant pattern for chronological case studies on the web (Flowbite, Material Tailwind, Shorthand). Each node = one event/phase, expandable for detail.
- **Best practice:** Show title + one-sentence summary by default. Expand on click for full details. Color-code success vs failure nodes.
- **The Phase 2 failure is the star.** Research on case study writing (Webflow, ZMI Stand & Copy) confirms: the most memorable case studies include a setback and recovery. This is what makes the story credible and the methodology worth trusting.
- **No external library needed.** Tailwind + custom CSS can build a clean vertical timeline. No need for TimelineJS or heavy dependencies.

### 2. Methodology Deep Dives

- **Lean Startup (theleanstartup.com)** presents principles as short, scannable sections with headers. No walls of text. Each principle is a card or section.
- **Expandable sections (accordion)** work for depth that shouldn't overwhelm. Brian clicks to go deeper; Maya sees the summary and moves on.
- **Key concepts to cover** (from Phase 2 Brian notes, already seeded):
  1. Why phases are hypotheses (not fixed plans)
  2. Confidence scoring (what it catches, when to reassess)
  3. The Andon cord / Review & Reflect concept
  4. Human-AI collaboration model (who owns what)

### 3. Workshop Facilitator Needs

- Facilitator guides (PAIR with Google, UNDP Sensemaking) share a pattern: clear structure, time estimates, downloadable materials, and facilitator notes separate from participant materials.
- **For Phase 3:** A downloadable methodology summary (markdown, not PDF — users can format as needed) is more useful than a polished PDF. It can be pasted into workshop slides or printed.
- **Scope decision:** Full facilitator guide is Phase 5 territory. Phase 3 provides the reference content that a facilitator would draw from.

### 4. How Much Grants-Hub Detail Is Too Much?

- The grants-hub has 8 phases of rich documentation. Showing all of it would overwhelm.
- **The right level:** Title + 1-sentence outcome per phase. 2-3 phases get expanded treatment (Phase 1 as the starting point, Phase 2/2a as the failure+recovery, Phase 5 as the maturity milestone).
- **Link to source:** Each timeline node can link to the actual phase docs in the grants-hub repo (or the live site). This lets Brian go as deep as he wants without cluttering the page.

### 5. Page Structure Decision

Research suggests the case study should be a **separate page** (`/case-study`), not embedded in the landing page. Reasons:
- Landing page is for Maya (quick, action-oriented). Case study is for Brian (depth, understanding).
- SEO benefit: separate URLs for different search intents ("build app with AI" vs "AI coding methodology case study").
- The landing page can link to it from the Proof section ("See the full story →").

---

## Implications for Phase 3

1. **Separate `/case-study` page** with:
   - Interactive vertical timeline (8 phases, expandable)
   - Phase 2 failure highlighted as a special "failure + recovery" node
   - Link to live grants-hub.netlify.app

2. **4 methodology deep dives** as expandable accordion sections:
   - Phases as hypotheses
   - Confidence scoring
   - Review & Reflect (Andon cord)
   - Human-AI collaboration

3. **Downloadable methodology summary** — a single markdown file users can copy/download. Not a full facilitator guide (that's Phase 5).

4. **Landing page update** — Proof section gets a "See the full story →" link to /case-study.

## Failure Modes to Watch

- Case study becomes a wall of text (need visual hierarchy, expand/collapse)
- Deep dives use too much jargon (need Maya-friendly summaries before Brian detail)
- Timeline is too detailed (8 phases x full docs = overwhelming)
- Downloadable summary is too long to be useful
