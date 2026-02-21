# Phase 01 — Triage
## kamunity-consulting · Front Door

**Date:** 2026-02-20
**Engine step:** TRIAGE

---

## Priya Test

Does Phase 1 serve Priya? **Yes.** Priya cannot engage with Mike until the front door exists. The Wix site is failing her every day. This is the highest-priority work in the queue.

## In Scope — Phase 1

- `index.html` — full-viewport hero, two copy versions, two door buttons
- `css/style.css` — campfire design system (shared across all pages)
- `js/version.js` — URL parameter routing (read `?v=priya`, swap copy on load)
- `netlify.toml` — deployment configuration

## In Scope — Phase 2 (running concurrently, autonomous)

PHASE_QUEUE.md specifies Phase 2 (behind the doors) immediately follows Phase 1. Since all content is available internally, Phase 2 is buildable without human input. Building now prevents a dead-end front door.

- `fix.html` — red door: what it is, what it feels like, proof points, Netlify form
- `impossible.html` — blue door: same structure, different energy
- Netlify form configuration on both pages

## In Scope — Phase 3 (running concurrently, autonomous)

Mike profile content is confirmed available in MIKE_FULLER_PROFILE.md and podcast review. Building now.

- `about.html` — human paragraph, career arc as proof, cross-links

## Deferred

- Mike photo (needed for Phase 3 but not blocking — placeholder space reserved)
- Confirmed mike@kamunityconsulting.com (form will show placeholder — flag in HUMAN_ACTION.md)
- DNS cutover from Wix (HUMAN_ACTION.md at end)
- Phase 4 free resources (requires evidence from real site traffic)

## Decisions Made

- Running Phases 1, 2, and 3 together since all content is available and site should not launch with dead-end buttons
- No dark mode — warm cream background is the public-facing aesthetic (contrasts with kitchen-table dark mode which is internal ops)
- System fonts only — no Google Fonts (adds weight, unnecessary dependency, blocks speed)
- Door 1 color: ember red/orange. Door 2 color: deep blue. Both within campfire aesthetic.
- Shared CSS file across all pages from day one — no per-page CSS

Proceeding to SPEC.
