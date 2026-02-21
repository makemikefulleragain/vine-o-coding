# Phase 01 — Research
## kamunity-consulting · Front Door

**Date:** 2026-02-20
**Engine step:** RESEARCH

---

## What We're Building

Phase 1 is the front door: `index.html` with two copy versions routed by URL parameter, two door buttons, campfire aesthetic, mobile-first, deployed to Netlify temp URL.

No web searches required — all source material is already available internally:

## Source Material Confirmed Available

### Locked Copy (CONSTITUTION.md)
Both versions locked from Mike + Claude Sonnet design session. No modification permitted.

**Version 3 (Priya):** Starts with "Good work is possible. Even here. Especially here."
**Version 4 (CEO, default):** Starts with "Cutting hours. Reducing services. Doing it anyway."
Both share the lower block ("You've already seen it...") and door choice lines.

### Proof Points (from MIKE_FULLER_PROFILE.md + podcast review)
- RAC: $500k saved in 9 months. Nobody got fired.
- WA Health Hackathon: won by going outside and talking to actual humans.
- Youth placemaking: Year 9s designed a park (skate ramp + chess + library). It got built.
- ALIKE WA strategy (confirmed).
- WALGA engagements (confirmed, 3).
- Life Without Barriers: 5-day sprints.
- Western Power hackathon.

### Campfire Aesthetic Reference
- kitchen-table CSS uses: `--ember: #e8a84c`, `--bg: #1a1714`, Fraunces serif for headings
- CONSTITUTION: "ember reds, warm neutrals, honest type" — warm not dark, cream not charcoal for public site
- No stock photography of people. No Google Analytics. No cookies.

### Technical Constraints Confirmed
- Static HTML + CSS + vanilla JS. No npm. No build step.
- Netlify Forms via `data-netlify="true"`.
- URL parameter routing: `?v=priya` → Version 3. Default → Version 4.
- Mobile first. iPhone 12 viewport (390×844) — above the fold without scroll.

## Ecosystem Context
- kamunity.org (K.org) — live, cross-link in footer
- K.ai — link when available
- AI Readiness tool at kamunity-audit.netlify.app — Phase 4 candidate

## What Doesn't Exist Yet
- Any code
- Any Netlify site (deploying new one on temp URL)
- Mike photo (not needed until Phase 3)
- Confirmed email mike@kamunityconsulting.com (not needed until Phase 2 form goes live)

## Research Conclusion
No gaps. All required content is locked and available. Stack is clear. Aesthetic direction is clear. Proceeding to TRIAGE.
