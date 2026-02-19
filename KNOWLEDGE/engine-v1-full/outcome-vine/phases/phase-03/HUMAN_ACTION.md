# Phase 3 Human Action Required

**Date:** 2026-02-15

---

## Action 1: Deploy to Netlify

The site now has 3 pages: landing (/), widget (/widget), case study (/case-study).

### Steps

1. Run `npm run build` in the `outcome-vine/` folder
2. Drag the `dist/` folder to your Netlify site
3. Verify all 3 pages work

### What to verify

**Case Study (/case-study):**
- Page loads with "How the Community Grants Hub was built with AI" heading
- Timeline shows 8 phases with colored dots (green, amber, indigo)
- Phase 2 Review & Reflect node is expanded by default
- Click other nodes to expand/collapse
- "Lesson" callouts appear in each expanded node
- 4 deep dive accordions work (click to expand, click to collapse)
- "Download .md" button downloads a methodology summary file
- "Copy to clipboard" works
- "Ready to build something?" CTA at bottom links to /widget
- "Visit the live tool" link opens grants-hub.netlify.app

**Landing page (/):**
- Proof section now has "See the full story →" button linking to /case-study
- Header nav includes "Case Study" link

**Widget (/widget):**
- Still works as before (unchanged)

**Mobile:**
- Timeline nodes stack correctly
- Deep dive accordions work on touch
- All text readable at 375px

---

## Action 2: Content Review

The case study contains specific claims about the grants-hub:
- 8 phases of development
- Phase 2 failure (Babel timing bug)
- Review & Reflect recovery
- Confidence scores

Please verify these match your recollection of what happened.

---

## What's Blocked

Nothing. Phase 4 can begin immediately.
