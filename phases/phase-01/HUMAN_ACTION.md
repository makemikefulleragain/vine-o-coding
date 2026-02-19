# Phase 1 Human Action Required

**Date:** 2026-02-15

---

## Action 1: Deploy to Netlify

The site is built and ready to deploy.

### Steps

1. Open a terminal in the `outcome-vine/` folder
2. Run `npm run build` (this creates the `dist/` folder)
3. Go to https://app.netlify.com
4. Drag the `dist/` folder onto the Netlify dashboard
5. Netlify deploys instantly and gives you a URL
6. (Optional) Change the site name to `outcome-vine` in Site settings → Site name

### What to verify after deploying

- The landing page loads with the headline "Build real things with AI"
- The three "How it works" cards are visible
- The "Visit the Community Grants Hub" button opens https://grants-hub.netlify.app in a new tab
- The page looks good on mobile (resize your browser or check on your phone)
- The "Start Building" button is disabled with a "Soon" badge

### After deploying

Update `STATE.md` line 5 with the Netlify URL:
```
**Deployed URL:** https://outcome-vine.netlify.app (or whatever Netlify assigns)
```

---

## Action 2: Visual Review

Please look at the site and flag anything that:
- Feels confusing or unclear
- Uses language a 9th grader wouldn't understand
- Looks broken on mobile
- Doesn't match the indigo/white design intent

Write any feedback to `phases/phase-01/review_feedback.md` or mention it when launching Phase 2.

---

## What's Blocked

Nothing is blocked. Phase 2 can begin in parallel with deployment. The widget work doesn't depend on the site being live.

## What's NOT Blocked

- Phase 2 research and build can proceed immediately
- The dev server (`npm run dev`) works for local testing
