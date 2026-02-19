# Phase 2 Human Action Required

**Date:** 2026-02-15

---

## Action 1: Deploy to Netlify

The site now includes both the landing page AND the interactive widget.

### Steps

1. Open a terminal in the `outcome-vine/` folder
2. Run `npm run build`
3. Go to https://app.netlify.com
4. Drag the `dist/` folder onto your Netlify site (or create a new one)
5. Verify the deploy

### What to verify after deploying

**Landing page (/):**
- Headline "Build real things with AI" loads correctly
- "Start Building" button in hero navigates to /widget
- "Start Building" button in header navigates to /widget
- Three process cards visible
- Grants Hub proof section with live link

**Widget (/widget):**
- Progress bar shows 6 steps with labels on desktop
- Step 1: Fill in all 4 fields → Next button activates
- Example panel shows Grants Hub and Recipe Remix tabs
- Brian "lean-in" section expands when clicked
- Navigate through all 6 steps using Next/Back buttons
- Step 6: See document tabs, click through each document
- Step 6: Click "Download All as ZIP" → ZIP file downloads with 6 .md files
- Step 6: Click "Copy Prompt" → opening prompt copies to clipboard
- Step 6: "What to do next" section shows 3 numbered steps

**Mobile (resize to 375px or check on phone):**
- Progress bar shows numbers only (no labels)
- Example panel appears below form fields
- Next/Back buttons are full-width

### After deploying

Update `STATE.md` line 5 with the Netlify URL.

---

## Action 2: Test the Full Widget Flow

Please complete the widget as if you were a real user:
1. Describe a real or imagined project
2. Walk through all 6 steps
3. Download the ZIP
4. Open the generated documents — do they make sense? Would you paste the prompt into Windsurf?

Write any feedback to `phases/phase-02/review_feedback.md`.

---

## What's Blocked

Nothing is blocked. Phase 3 can begin immediately.
