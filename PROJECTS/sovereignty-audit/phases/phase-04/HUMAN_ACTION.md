# HUMAN ACTION REQUIRED — Deploy to Netlify

**Phase:** 4 (Content & Growth) — COMPLETE
**Date:** 2026-02-17
**Status:** Build passes. Site is ready to deploy.

---

## What You Have

A complete, working web application with:
- 10-question digital sovereignty audit
- 4 toolkit guides (data ownership, vendor lock-in, cost transparency, AI safety)
- Services page with transparent 3-tier pricing
- About, Privacy, FAQ, Insights pages
- Shareable & printable results
- SEO: llms.txt, JSON-LD, Open Graph, sitemap, robots.txt
- Zero data collection, zero tracking

**12 pages, 62 modules, ~98 kB gzipped JS. Zero external dependencies beyond React/Tailwind.**

---

## Steps to Deploy

### 1. Push to GitHub
```bash
cd kamunity-consulting-ai
git add -A
git commit -m "Phase 1-4 complete: audit, toolkit, services, content, SEO"
git push origin main
```

If you haven't set up the repo yet:
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/kamunity-consulting-ai.git
git add -A
git commit -m "Phase 1-4 complete: audit, toolkit, services, content, SEO"
git branch -M main
git push -u origin main
```

### 2. Connect to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select the `kamunity-consulting-ai` repository
4. Build settings (Netlify should auto-detect these):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18+ (set in Environment variables if needed: `NODE_VERSION` = `20`)
5. Click **Deploy**

### 3. Set Custom Domain (Optional)
1. In Netlify site settings → **Domain management**
2. Add custom domain: `audit.kamunity.ai`
3. Follow DNS instructions to point `audit.kamunity.ai` to Netlify
4. Enable HTTPS (automatic with Netlify)

### 4. Verify After Deploy
- [ ] Home page loads at `/`
- [ ] Audit works: `/audit` → complete all 10 questions → `/results`
- [ ] Results show scores, recommendations, share/print buttons
- [ ] Toolkit pages: `/toolkit`, `/toolkit/data-ownership`, etc.
- [ ] Services page: `/services`
- [ ] About: `/about`, Privacy: `/privacy`, FAQ: `/faq`, Insights: `/insights`
- [ ] `/llms.txt` returns the markdown file
- [ ] `/robots.txt` returns the robots file
- [ ] `/sitemap.xml` returns the sitemap
- [ ] SPA routing works (navigate directly to `/about` — should not 404)
- [ ] Mobile responsive (test on phone)
- [ ] Print from results page (Ctrl+P) produces clean output

### 5. After Deploy — Optional Enhancements
1. **Google Search Console:** Add property, verify, submit sitemap URL
2. **Share with 3-5 trusted contacts** for initial feedback
3. **Update sitemap.xml URLs** if domain is different from `audit.kamunity.ai`

---

## Important Notes
- The `_redirects` file in `public/` handles SPA routing on Netlify
- No environment variables needed — everything is client-side
- No build plugins needed — standard Vite build
- Lint warnings about `@theme` and `@apply` are expected Tailwind CSS v4 syntax — they don't affect the build
