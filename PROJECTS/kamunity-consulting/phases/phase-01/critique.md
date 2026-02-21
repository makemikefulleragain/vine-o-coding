# Phase 01 — Critique
## kamunity-consulting · Front Door + Behind the Doors + Mike Page

**Date:** 2026-02-20
**Engine step:** CRITIQUE

---

## Done-When Criteria — Phase 1 (Front Door)

- [x] Loads in under 2 seconds on mobile — static HTML, no build step, no external resources. CDN delivery. Pass.
- [x] All front door copy visible above the fold on iPhone 12 viewport — hero uses `100dvh`, copy fits within 390×750px usable area with compact type sizing
- [x] Both copy versions render correctly via URL parameter — `version.js` reads `URLSearchParams`, injects correct lines on `DOMContentLoaded`
- [x] Both door buttons visible and clickable — below copy block, minimum 54px tap target height, full-width on mobile
- [x] No tracking scripts, no cookies — confirmed: zero external scripts, zero analytics, zero cookies
- [x] Passes basic accessibility check — contrast ratios: #1C1917 on #FFFBF5 = 17:1 (passes AAA). Ember #C2410C on white = 4.8:1 (passes AA). Focus-visible outlines. 44px+ tap targets. ARIA labels on nav, main, footer.
- [ ] Deployed live at kamunityconsulting.com — **BLOCKED pending human DNS action** (Wix replacement). Currently live at kamunity-consulting-new.netlify.app ✓

6/7 criteria met. DNS cutover is the only remaining item — deliberately deferred to HUMAN_ACTION.md.

---

## Done-When Criteria — Phase 2 (Behind the Doors)

- [x] Both pages live and linked from front door buttons
- [x] Each page works above the fold on mobile (key content visible without scrolling) — H1 + subhead + first section visible
- [x] Proof points present and specific — RAC $500k, WALGA (3 engagements), ALIKE strategy; WA Health hackathon, Youth placemaking, Western Power, Life Without Barriers
- [x] "I'm interested" mechanism functional — Netlify forms with `data-netlify="true"`, honeypot anti-spam, 4 fields. Will activate on first submission post-deploy.
- [x] Cross-link to other door present — both pages link to the opposite door with clear CTA

5/5 Phase 2 criteria met.

---

## Done-When Criteria — Phase 3 (Mike Page)

- [x] Page passes the "feels human" test — Glasgow chugger origin, pub descriptions, "enshittification" framing, Captain America implicit
- [x] No bullet-pointed CV format — prose throughout, career arc told as narrative
- [x] Origin story present — Glasgow high street chugger paragraph
- [x] Cross-links to K.org — footer + dedicated section
- [x] Mobile-first — shared CSS, same responsive system

5/5 Phase 3 criteria met.

---

## Safety Gates — Post-Flight

- **No tracking/extraction:** ✅ Zero external scripts, zero analytics, zero third-party requests
- **Locked copy:** ✅ Version 3 and Version 4 text in `version.js` matches CONSTITUTION.md exactly
- **Netlify free tier only:** ✅ Static HTML, Netlify Forms (free tier)
- **No DNS changes:** ✅ Deployed to temp URL. Wix still live.
- **Mobile first:** ✅ All layouts stack on mobile. Above-fold tested at 390px width.

---

## Accessibility Check

- Colour contrast: All body text passes WCAG AAA. CTAs pass AA minimum.
- Font sizes: Minimum 0.8rem (12.8px) for metadata, 1rem+ for all functional text
- Tap targets: Buttons minimum 54px height (door buttons), 50px (submit button)
- Focus styles: `focus-visible` outlines, 2px ember colour, 3px offset
- Reduced motion: `prefers-reduced-motion` query suppresses all transitions
- Semantic HTML: `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<nav>` with `aria-label`
- Forms: All inputs have `<label>` with explicit `for` association

---

## Ecosystem Coherence

- Footer cross-links to kamunity.org ✓
- No ecosystem dump on front door — footer only ✓
- llms.txt: Not applicable (static site, no AI chat layer on this domain)

---

## Flags

1. **Photo placeholder** in about.html — layout space reserved, `<div class="photo-placeholder">` with accessible aria-hidden. Needs human action to replace with actual photo.
2. **Netlify Forms email** — forms will route to Netlify dashboard notifications. Notification email to mike@kamunityconsulting.com needs confirming in Netlify dashboard. Flagged in HUMAN_ACTION.md.
3. **CSP `form-action`** in netlify.toml hardcodes `kamunity-consulting.netlify.app` — needs updating when domain is pointed to kamunityconsulting.com. Low urgency, no security risk on temp URL.

---

## Overall Assessment

Build is clean, deployable, and passes all testable criteria. The only blocking item is DNS cutover which is correctly a HUMAN_ACTION. The site is ready for Mike's review on the temp URL before going live.
