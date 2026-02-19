# SETUP.md — Human Setup Instructions
# Do these once before launching the engine. ~15 minutes.

---

## Step 1: Deploy to Netlify (~5 minutes)

### Option A: Drag and Drop (simplest)
1. Go to https://app.netlify.com
2. Log in (or create free account)
3. Drag the `site/` folder onto the Netlify dashboard
4. Netlify deploys it instantly and gives you a URL like `https://random-name-12345.netlify.app`
5. (Optional) Go to Site Settings → Domain Management → Change site name to something readable like `grants-hub`

### Option B: Netlify CLI (for future auto-deploys)
```bash
npm install -g netlify-cli
cd grants-hub/site
netlify deploy --prod --dir .
```

**Write down your Netlify URL.** Update STATE.md with it.

---

## Step 2: Create Supabase Project (~5 minutes)

1. Go to https://supabase.com
2. Log in (or create free account)
3. Click "New Project"
4. Name: `grants-hub` (or whatever you like)
5. Database password: generate a strong one and save it
6. Region: Choose closest to Perth (Singapore or Sydney)
7. Wait for project to be created (~2 minutes)

### Get your credentials
1. Go to Project Settings → API
2. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy the **anon/public** key (starts with `eyJhbG...`)

### Update config.js
Open `site/config.js` and fill in:
```javascript
window.SUPABASE_URL = 'https://xxxxx.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbG...your-key-here';
```

Redeploy to Netlify (drag folder again, or `netlify deploy --prod --dir .`).

**Write down your Supabase project details.** Update STATE.md.

---

## Step 3: Ready for the Engine (~1 minute)

The engine will provide SQL migration files in `phases/phase-XX/migrations/`. When you see a `HUMAN_ACTION.md` file:

1. Open your Supabase Dashboard → SQL Editor
2. Copy the SQL from the migration file
3. Run it
4. Redeploy the site/ folder to Netlify

That's it. The engine writes code, you run the SQL and deploy.

---

## What You've Got After Setup

- **Netlify:** Live URL serving the grant acquittal helper
- **Supabase:** Empty project ready for the engine to create tables
- **config.js:** Connected to your Supabase project
- **The engine:** Ready to start Phase 1 (replacing localStorage with Supabase)

---

## Cost

- **Netlify free tier:** 100GB bandwidth, 300 build minutes. More than enough.
- **Supabase free tier:** 500MB database, 1GB file storage, 50K monthly active users. More than enough.
- **Total cost: $0**
