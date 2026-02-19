# Phase 3 Confidence Score — Make It Learnable

**Date:** 2026-02-15
**Total: 83/100**

---

## Research Signal — 21/25

Strong signals:
- Vertical timelines are the proven pattern for chronological case studies (Flowbite, Material Tailwind, Shorthand)
- Accordion/expandable sections are the standard for optional depth (Lean Startup site, education patterns)
- Case study writing best practices confirm: setback + recovery is the most compelling story structure

Deduction (-4): No user testing. The balance between Maya-summary and Brian-depth is a design hypothesis. Workshop facilitator needs are inferred from facilitator guide patterns, not from actual facilitators.

## Source Convergence — 20/25

Multiple sources agree on:
- Vertical timeline with expandable nodes for chronological stories
- Two-layer content (summary visible, detail on demand) for mixed audiences
- Downloadable reference documents for workshop/teaching use
- Failure stories increase credibility

Deduction (-5): The specific four deep dive topics are chosen based on Phase 2 Brian notes and grants-hub experience, not external validation. The methodology is novel — no external source validates the exact teaching structure.

## Constitutional Alignment — 22/25

- Timeline tells the real story including the failure (Constitution: honest about limitations)
- Deep dives respect both personas (Maya summaries, Brian depth)
- Methodology summary is downloadable and portable (sovereignty)
- No tracking or analytics
- Content references grants-hub as evidence without overselling

Deduction (-3): Single case study (grants-hub only). The methodology needs more evidence to be fully credible. The "Irony Log" reference in R&R deep dive assumes cultural familiarity with the Tower of Babel metaphor.

## Build Confidence — 20/25

- Clean build: 0 errors, 0 warnings
- No new dependencies (minimal bundle growth)
- Custom timeline components are simple and maintainable
- Native `<details>` for accessibility
- Tailwind v4 lint issues caught and fixed

Deduction (-5): Cannot verify visual layout (timeline spacing, mobile stacking, accordion behavior) without browser testing. The expanded-by-default R&R node might cause too much initial scroll on mobile. No automated tests for the case study page.

---

## Routing Decision

**83/100 → BUILD** (threshold: 80+)

Phase 3 is complete. Proceed to FORWARD.
