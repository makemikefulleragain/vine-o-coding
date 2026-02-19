# Phase 5 Human Action Required

**Date:** 2026-02-15

---

## Action 1: Redeploy to Netlify

The site now has 4 pages and 5 UAT fixes.

### Steps
1. Run `npm run build` in the `outcome-vine/` folder
2. Drag the `dist/` folder to your Netlify site
3. Verify all 4 pages load

### What to Verify

**Bug fixes (critical):**
- Navigate from / to /case-study → page starts at top (not mid-page)
- Navigate from /case-study to /widget → page starts at top
- In widget, fill in long answers in Step 1 → progress bar stays visible at top while scrolling

**New page — /about:**
- About Kamunity section loads
- FAQ: 8 questions, each expands/collapses on click
- Privacy Policy section visible
- Terms of Use section visible
- Footer "Privacy" link goes to /about and scrolls to privacy section
- Footer "Terms" link goes to /about and scrolls to terms section

**Landing page animations:**
- Hero headline fades in on load
- Process cards stagger in on scroll
- Proof section fades in on scroll

**Feedback button:**
- Floating indigo button in bottom-right corner
- Click opens email client with pre-filled subject
- Shows "Feedback" text on desktop, icon-only on mobile
- Doesn't obscure important content

**Mobile (375px):**
- All 4 pages responsive
- Feedback button not obstructive
- Sticky progress bar works in widget

---

## Action 2: Test Footer Anchor Links

React Router + hash anchors can be tricky. Test specifically:
1. From /, click footer "Privacy" → should go to /about#privacy
2. From /widget, click footer "Terms" → should go to /about#terms
3. If the page loads but doesn't scroll to the section, this needs a fix in the next session.

---

## Action 3: Broader User Testing

Share the site with 5-10 people. Specific things to ask:
1. "Did the landing page make sense within 10 seconds?"
2. "Could you complete the widget without getting stuck?"
3. "Did the case study timeline make you trust the method more?"
4. "Was anything confusing or too technical?"
5. "Would you actually use this to start a project?"

Collect responses and store in `phases/phase-05/user_feedback.md`.
