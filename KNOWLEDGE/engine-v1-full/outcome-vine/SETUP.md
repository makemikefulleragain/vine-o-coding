# SETUP.md — Human Setup Instructions
# Do these once before launching the engine. ~10 minutes.

---

## Step 1: Install Dependencies (~2 minutes)

```bash
cd outcome-vine
npm install
```

This installs React, Vite, Tailwind CSS, and all build dependencies.

## Step 2: Verify Local Dev (~1 minute)

```bash
npm run dev
```

Opens the site at `http://localhost:5173`. You should see the landing page.

## Step 3: Deploy to Netlify (~5 minutes)

### Option A: Drag and Drop (simplest)
1. Run `npm run build` — creates `dist/` folder
2. Go to https://app.netlify.com
3. Drag the `dist/` folder onto the Netlify dashboard
4. Netlify deploys instantly and gives you a URL
5. (Optional) Change site name to something like `outcome-vine`

### Option B: Netlify CLI
```bash
npm run build
npx netlify deploy --prod --dir dist
```

**Write down your Netlify URL.** Update STATE.md with it.

---

## Step 4: Ready for the Engine (~1 minute)

The engine writes code in `src/`, builds to `dist/`, and you deploy. No database, no backend, no migrations — just static site builds.

When you see a `HUMAN_ACTION.md` file:
1. Read the instructions
2. Do the human-required steps (usually: build + deploy)
3. Verify the live site

---

## What You've Got After Setup

- **Local dev:** `npm run dev` for instant preview
- **Build:** `npm run build` for deployable `dist/`
- **Netlify:** Live URL serving the Outcome Vine Coding site
- **The engine:** Ready to start Phase 1

---

## Cost

- **Netlify free tier:** 100GB bandwidth, 300 build minutes. More than enough.
- **No backend required** for core functionality.
- **Total cost: $0**

---

## Optional: Supabase (later phases)

If a future phase adds optional features (anonymous usage analytics, project gallery), the human will:
1. Create a Supabase project (same as grants-hub setup)
2. Add credentials to `.env`
3. Run any migration SQL provided

This is NOT needed for Phase 1-3. The widget runs entirely client-side.
