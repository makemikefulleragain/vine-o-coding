# Phase 6 Human Action Required

**Date:** 2026-02-15

---

## Action 1: Redeploy to Netlify

### Steps
1. Run `npm run build` in the `outcome-vine/` folder
2. Drag the `dist/` folder to your Netlify site
3. Verify all 4 pages load

### Critical: Netlify Forms Verification
After deploying, test the feedback widget:
1. Click the Feedback button (bottom-right)
2. Select an emoji reaction
3. Optionally type a comment
4. Click "Send feedback"
5. Check your Netlify dashboard → Forms → should see a "feedback" form with the submission

If Netlify Forms doesn't detect the form:
- Go to Netlify dashboard → Forms → check if "feedback" appears
- If not, the hidden form in index.html may need `data-netlify="true"` instead of `netlify` attribute
- Fallback: submissions will fail gracefully with email link to mike@kamunityconsulting.com

### What to Verify

**New features:**
- **Methodology flow (landing page):** 7 nodes, "Watch how it works" button plays step-through animation
- **Methodology flow (case study):** Same animation, "Every phase followed this loop"
- **Feedback widget:** Opens panel (not email), emoji picker, optional text, submit
- **Brian further reading:** Each deep dive accordion has "Further reading" links at the bottom

**Fixes:**
- **Truthfulness:** Hero says "5 short steps" (not "5 simple questions")
- **Desktop spacing:** Sections are tighter — less scrolling between content
- **Privacy policy:** Updated to mention Netlify Forms anonymous feedback collection

**Mobile (375px):**
- Feedback widget fits screen
- Methodology flow nodes wrap properly
- Animation plays on mobile

---

## Action 2: Round 3 User Testing

Share with the same testers and ask:
1. "Does the animated flow help you understand how the method works?"
2. "Does the feedback widget feel easy and trustworthy?"
3. "Is there still too much text? Are there still confusing/techy parts?"
4. "What's missing that would make you actually use this for a project?"

---

## Action 3: Monitor Feedback Submissions

Check Netlify dashboard weekly for feedback submissions. Look for patterns:
- Which pages get the most feedback?
- What's the most common reaction type?
- Are there repeated suggestions?

Use this data to scope Phase 7.
