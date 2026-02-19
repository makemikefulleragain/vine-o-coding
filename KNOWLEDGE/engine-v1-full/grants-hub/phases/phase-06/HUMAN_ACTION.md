# Phase 5.5 Human Actions: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14
**Context:** R&R triggered. Feedback infrastructure built. These actions activate it.

---

## Priority 0: Activate Feedback Infrastructure

### A. Create Google Form
1. Go to https://forms.google.com → create new form
2. Title: "Grant Acquittal Helper — Feedback"
3. Add these 5 questions:
   - **Q1:** What's your role? (Multiple choice: Treasurer / Committee member / Staff / Other)
   - **Q2:** First impression — was it clear what the tool does? (Linear scale 1-5)
   - **Q3:** Did you try adding a grant and expenses? What was confusing? (Long answer)
   - **Q4:** Would you use this for a real grant acquittal? Why/why not? (Long answer)
   - **Q5:** What's the one thing you'd want that isn't there? (Long answer)
4. Settings → Collect email addresses: OFF (keep anonymous option)
5. Copy the form share link (e.g., `https://forms.gle/abc123`)

### B. Update FEEDBACK_URL in Code
1. Open `src/App.jsx`
2. Replace `const FEEDBACK_URL = 'https://forms.gle/PLACEHOLDER';` with your real form URL
3. Save

### C. Run Supabase Migration
1. Open Supabase dashboard → SQL Editor
2. Paste contents of `phases/phase-06/migrations/001_tester_signups.sql`
3. Run the query
4. Verify: go to Table Editor → `tester_signups` table should exist

### D. Rebuild and Redeploy
1. Run `npx vite build` in the grants-hub directory
2. Deploy the `dist/` folder to Netlify (drag-and-drop or CLI)
3. Verify: visit https://grants-hub.netlify.app → feedback banner should appear at bottom
4. Verify: visit About page → "Help Shape This Tool" section should appear

---

## Priority 1: Resolve Unresolved Tests

### A. Phone Sign-In Retest
1. Wait ~30 minutes from last attempt (rate limit cooldown)
2. Open https://grants-hub.netlify.app on phone
3. Click "Sign In" → enter email → enter code
4. If it works → mark resolved. If rate-limited again → wait longer or try a different email.

### B. kamunity.ai Backlink
1. Add a link from kamunity.ai to https://grants-hub.netlify.app
2. Suggested placement: tools page, footer, or "Built by Kamunity" section
3. Anchor text suggestion: "Grant Acquittal Helper — free tool for nonprofit treasurers"

### C. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: https://grants-hub.netlify.app
3. Verify ownership (Netlify DNS or HTML tag method)
4. Submit sitemap: https://grants-hub.netlify.app/sitemap.xml
5. Request indexing for the main URL

---

## Priority 2: Share with Real Users

### Who to Ask (target: 3-5 people)
- Volunteer treasurers at local community groups (sporting clubs, men's sheds, community gardens, neighbourhood houses)
- Committee members who handle grant reporting
- People in your network who work with small nonprofits
- Kamunity community members

### What to Say
> "I've built a free tool to help volunteer treasurers manage grant acquittals. It tracks spending against budget categories and generates a printable report. Would you be willing to try it for 10 minutes and tell me what you think?"
>
> Link: https://grants-hub.netlify.app
>
> It's free, no sign-up required (works as a guest). If you want to save your data across devices, you can add your email.

### What to Ask (structured feedback)

After they try it, ask these 5 questions:

1. **First impression:** What did you think when you first landed on the page? Was it clear what the tool does?
2. **Setup:** Were you able to set up a grant with categories? Anything confusing?
3. **Expenses:** Did adding expenses make sense? Would you use this for real grant tracking?
4. **Report:** Did you try the acquittal report? Would this be useful for your funder?
5. **Missing:** What's the one thing you'd want that isn't there?

### How to Record Feedback
Create a simple note for each person:
- Name/role (e.g., "Treasurer, Local Tennis Club")
- Answers to the 5 questions
- Any bugs or confusion they hit
- Their overall verdict: would they use this? why/why not?

Save feedback to `phases/phase-06/user-feedback/` (one file per person, or a combined summary).

---

## Priority 3: Directory Submissions

### Connecting Up (connectingup.org)
- Australia's nonprofit tech resource directory
- Submit the tool as a free resource for grant management

### Our Community (ourcommunity.com.au)
- Major Australian nonprofit resource hub
- Look for their tools/resources submission process

### LinkedIn Post
- Post on Kamunity LinkedIn about the tool
- Tag relevant nonprofit communities
- Include the link and a brief description of who it's for

---

## Acceptance Gate

Phase 5.5 is complete when:
- [x] Google Form created and FEEDBACK_URL updated in App.jsx
- [x] Supabase migration `001_tester_signups.sql` run
- [x] Rebuilt and redeployed to Netlify — feedback banner + form live 2026-02-14
- [ ] 2 remaining unresolved tests (backlink, indexing) — phone sign-in ✅ resolved 2026-02-14
- [ ] Shared through at least 3 channels (LinkedIn, Facebook groups, direct peer)
- [ ] At least 3 real user feedback responses collected (form or tester signup)
- [ ] Feedback summarised in `phases/phase-06/user-feedback/summary.md`
- [ ] Phase 6 scope defined based on feedback

**Only then does the engine resume building.**
