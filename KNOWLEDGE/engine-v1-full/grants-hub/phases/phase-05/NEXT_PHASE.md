# Next Phase Proposal: Phase 6 — User Feedback & Polish

**Date:** 2026-02-14

---

## Why This Phase

Phases 1-5 have built a complete, deployed, trustworthy tool with user accounts. The Grant Acquittal Helper at https://grants-hub.netlify.app now has:
- Multi-grant management with budget tracking
- CSV bank import and narrative guidance
- Trust pages (About, Privacy, FAQ, Delete All My Data)
- SEO and a landing hero
- Email OTP accounts for multi-device access

The tool is **functionally complete for individual treasurer use**. What it lacks is validation from real users and the polish that comes from that feedback.

## Proposal

Phase 6 should focus on **real user feedback and polish**. Two tracks:

### Track A: Get Real Users (Human Actions)
- Share the tool with 3-5 real volunteer treasurers
- Collect feedback on: ease of use, missing features, confusion points
- Submit to Connecting Up / Our Community directory
- Post on Kamunity LinkedIn about the tool
- Add a link from kamunity.ai to grants-hub.netlify.app

### Track B: Polish Based on Evidence (Code)
Depending on what users report, candidates include:
- **JSON data import** — complement to existing export, enables manual multi-device backup
- **Print/PDF improvements** — treasurers will print reports; ensure they look professional
- **Onboarding tutorial** — first-time tooltips or a brief walkthrough
- **Grant templates** — pre-filled budget categories for common Australian funders
- **Loading states** — improve perceived performance during auth and data sync

### Alternative: Skip to Team Features
If user feedback indicates that the biggest pain point is **sharing access between committee members** (e.g., treasurer and president), Phase 6 could instead focus on:
- Shared grant access (invite by email)
- Role-based permissions (view vs edit)
- Audit log of changes

This is significantly more complex and should only be pursued if validated by real user demand.

## Dependencies
- Phase 5 human actions must be completed first (Supabase config, UAT)
- Real user feedback requires outreach (human action)

## Risks
- **No users yet.** The biggest risk is building more features without any real user feedback. The tool could be perfect or fundamentally wrong — we don't know yet.
- **Scope creep.** "Polish" can expand infinitely. Phase 6 should be time-boxed and focused on the top 3 user-reported issues.
