# Phase 4 Triage — Content & Growth

**Date:** 2026-02-17

---

## Highest-Value Items

1. **Shareable results** — Priya needs to show her board. Text summary + copy/share buttons on the results page. Uses native Web Share API where available, clipboard fallback everywhere else. Zero new dependencies.

2. **Print-friendly results** — CSS `@media print` stylesheet. Priya can Ctrl+P her results. Board-ready output. Zero dependencies.

3. **Insights/content section** — Seed content establishing credibility. 2-3 case study summaries based on the work described in PHASE_QUEUE.md (local government, The Pack Music Australia, micro-NFPs). Data-driven for future CMS extraction.

4. **Deployment readiness** — Final build verification and updated HUMAN_ACTION.

## What NOT to build

- **Resend email capture** — needs serverless function + API key + consent flow. Doesn't respect sovereignty principle without proper infrastructure. Defer.
- **Admin CMS** — needs backend + auth. Out of scope for static site. Defer.
- **Social media generator** — needs content to generate from. Build content first, generate later.
- **html2canvas** — 400kB dependency for screenshot sharing. Text summary is lighter and more accessible.
