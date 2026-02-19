# Phase 4 Human Actions Required

**Date:** 2026-02-14

---

## Action 1: Deploy to Netlify (BLOCKING)

The app is built and ready in `dist/`. Deployment requires Netlify authentication.

### Option A: Netlify CLI (recommended)

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Log in to Netlify (opens browser)
netlify login

# 3. From the project root, initialize the site
cd "c:\Users\mikef\OneDrive\1 KomUnity\1a New KU Plans\Dev_Code\kamunity-engine\grants-hub"
netlify init

# When prompted:
# - Create & configure a new site
# - Team: [your team]
# - Site name: grants-hub (or your preferred name)
# - Build command: npm run build
# - Publish directory: dist

# 4. Deploy
netlify deploy --prod
```

### Option B: Netlify Dashboard (drag & drop)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag the `dist/` folder into the upload area
4. Set site name to `grants-hub` (or preferred name)

### Option C: Git-based deploy

1. Push the repo to GitHub
2. In Netlify dashboard: "Import from Git" → select the repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. This enables continuous deployment on every push

### After deploying:

1. Note the deployed URL (e.g. `https://grants-hub.netlify.app`)
2. If the URL differs from `grants-hub.netlify.app`, update these files:
   - `index.html` — canonical URL, og:url
   - `public/robots.txt` — sitemap URL
   - `public/sitemap.xml` — loc URL

### What's blocked until deploy:
- Live URL for users
- Search engine indexing
- Social media sharing (OG tags need a live URL)

---

## Action 2: Custom Domain (OPTIONAL, non-blocking)

If you want the tool at `grants.kamunity.ai` instead of `grants-hub.netlify.app`:

1. In Netlify dashboard → Site settings → Domain management → Add custom domain
2. Enter `grants.kamunity.ai`
3. In your DNS provider, add a CNAME record:
   - Name: `grants`
   - Value: `[your-site].netlify.app`
4. Netlify will auto-provision HTTPS via Let's Encrypt
5. Update canonical/OG URLs in index.html, robots.txt, sitemap.xml

---

## Action 3: Environment Variables on Netlify (REQUIRED for cloud mode)

For Supabase cloud mode to work on the deployed site:

1. In Netlify dashboard → Site settings → Environment variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://tzwkprkhdgwmemajnxud.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = [the anon key from your .env file]
3. Trigger a redeploy (or these will take effect on next deploy)

Without these, the deployed site will fall back to browser-only mode.
