# Phase 3 Triage — Make It Learnable

**Date:** 2026-02-15

---

## What's the Highest-Value Thing to Build?

A `/case-study` page with:
1. Interactive vertical timeline of the grants-hub's 8 phases (expandable nodes)
2. Four methodology deep dives (accordion sections)
3. A downloadable methodology summary
4. Updated Proof section on landing page linking to the case study

## Does Something Already Exist?

**Partially.** The grants-hub phase documents contain all the raw content. The timeline visualization and deep dives are new — they present existing material in an accessible format. No external resource teaches the Outcome Vine Coding methodology specifically.

The Lean Startup website (theleanstartup.com) presents principles well — we can learn from its scannable structure without duplicating it.

## Is the Phase Goal Still Right?

**Yes, with scoping adjustment.** The original scope included "downloadable methodology report (the professional document)." Research suggests a markdown summary is more useful than a polished report at this stage. A full facilitator guide is Phase 5 territory.

## Scoping Decisions

### IN scope
- `/case-study` page with vertical timeline + deep dives
- 8 timeline nodes (Phase 1 through 5.5) with title + outcome + expandable detail
- Phase 2 failure highlighted with distinct visual treatment (amber/warning)
- 4 deep dive accordion sections (methodology concepts)
- Downloadable methodology summary (single markdown file)
- Landing page Proof section → "See the full story" link
- Mobile responsive

### OUT of scope
- Full facilitator/workshop guide (Phase 5)
- Embedded grants-hub screenshots (would need maintenance)
- Annotated foundation document templates (can be added later)
- Video/animation content

## Technical Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| Timeline | Custom Tailwind vertical timeline | No external library. Simple div structure with border-left connector. |
| Deep dives | `<details>` accordion | Same pattern as Brian notes in widget. Consistent, accessible. |
| Methodology download | Blob URL + download attribute | No JSZip needed for single file. Pure browser API. |
| Routing | `/case-study` | Already reserved in Phase 1. |

## Decision: BUILD

Proceed to SPEC.
