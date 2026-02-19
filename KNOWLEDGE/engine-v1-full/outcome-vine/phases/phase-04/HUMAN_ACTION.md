# Phase 4 Human Action Required

**Date:** 2026-02-15

---

## Action 1: First Deploy to Netlify

This is the first deploy. The site has 3 complete pages + full SEO.

### Steps
1. Run `npm run build` in the `outcome-vine/` folder
2. Go to https://app.netlify.com
3. Create a new site by dragging the `dist/` folder
4. Change site name to `outcome-vine` (or your preference) in Site settings → Site name
5. Note your URL (e.g. `https://outcome-vine.netlify.app`)

### After deploying — URL updates needed

If your Netlify URL differs from `outcome-vine.netlify.app`, update these files:

1. **`public/robots.txt`** — Update sitemap URL
2. **`public/sitemap.xml`** — Update all 3 `<loc>` URLs
3. **`index.html`** — Update `og:url` and JSON-LD `url`
4. Rebuild and redeploy: `npm run build` → drag dist/

### What to verify
- **/** — Landing page loads, "Start Building" links to /widget, "See the full story" links to /case-study
- **/widget** — Full 6-step wizard works, ZIP downloads, prompt copies
- **/case-study** — Timeline shows 8 phases, deep dives expand, methodology downloads
- **Browser tab** — Each page shows a unique title
- **Mobile** — All 3 pages work at 375px
- **View source** — OG tags, Twitter Card, JSON-LD visible in HTML

---

## Action 2: Cross-Link with Grants Hub

Add a link from the grants-hub About page to the Outcome Vine Coding site. Something like:

> "The Community Grants Hub was built using Outcome Vine Coding — a step-by-step method for building with AI. Learn more at [outcome-vine.netlify.app]."

---

## Action 3: Share and Gather Feedback

Before Phase 5 begins, the site needs real users:
1. Share the URL with 3-5 people who might use the widget
2. Ask: "Did the landing page make sense? Could you complete the widget? Were the documents useful?"
3. Write feedback to `phases/phase-04/user_feedback.md`

Phase 5 scope will be determined by this feedback.

---

## What's Blocked

Phase 5 should NOT begin until real user feedback is collected. The site was built in one session with zero external input. Building more features without evidence would repeat the grants-hub Phase 5.5 lesson.
