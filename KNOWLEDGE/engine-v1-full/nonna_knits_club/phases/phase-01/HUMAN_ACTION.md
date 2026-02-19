# Human Action Required — Phase 1

**Date:** 2026-02-15

---

## What's Needed: Deploy to Netlify

The site is built and ready in `dist/`. To get it live:

### Option A: Deploy via Windsurf (Recommended)
1. I can deploy directly using the deploy tool — just say "deploy it" and I'll handle it.

### Option B: Deploy Manually via Netlify
1. Go to https://app.netlify.com
2. Log in (or create a free account)
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the `dist/` folder from this project
5. Netlify will give you a URL like `https://random-name.netlify.app`
6. Optionally rename it to something like `nonnas-knitting-circle.netlify.app`

### Option C: Deploy via Git (Best for ongoing work)
1. Create a GitHub/GitLab repo for this project
2. Connect it to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Every push will auto-deploy

---

## What's Blocked Until This Is Done

- No real users can access the site
- No feedback loop to validate Phase 1 assumptions
- Phase 2 ideally builds on a live, testable site

---

## After Deployment

Please update `STATE.md` with the deployed URL, or let me know the URL and I'll update it.
