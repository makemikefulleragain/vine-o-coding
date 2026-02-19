# SETUP.md — Human Setup Instructions
# Do these once before launching the engine.

---

## Step 1: Deploy to Netlify (~5 minutes)

### Option A: Drag and Drop (simplest)
1. Run `npm run build` — creates `dist/` folder
2. Go to https://app.netlify.com
3. Drag the `dist/` folder onto the Netlify dashboard
4. Netlify deploys instantly and gives you a URL

### Option B: Netlify CLI
```bash
npm run build
npx netlify deploy --prod --dir dist
```

## Ready for the Engine

Once deployed, the engine writes code in `src/`, builds to `dist/`, and you deploy. When you see a `HUMAN_ACTION.md` file:
1. Read the instructions
2. Do the human-required steps
3. Verify the live site

## Cost

- **Hosting free tier:** More than enough for getting started.
- **Total cost: $0**
