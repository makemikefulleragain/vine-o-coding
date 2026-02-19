# Phase 5.5 Build Log: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14

---

## What Was Built

### New Components
- **FeedbackBanner.jsx** — Persistent bottom banner with "Give Feedback" link to external Google Form. Dismissible per session (sessionStorage). Non-intrusive, `no-print` class.

### Modified Components
- **ReportTab.jsx** — Contextual feedback prompt ("How was this report? Tell us →") next to print button. Shown once per session.
- **GrantDetailView.jsx** — Passes `feedbackUrl` prop through to ReportTab.
- **AboutPage.jsx** — New "Help Shape This Tool" section with TesterSignup sub-component. Email input + consent checkbox → Supabase `tester_signups` table. Pre-fills email if authenticated.
- **PrivacyPage.jsx** — New "Feedback & Testing" section explaining anonymous feedback (Google Forms) and tester opt-in (email stored in Supabase, used only for testing, removable).
- **App.jsx** — Imports FeedbackBanner, defines `FEEDBACK_URL` constant (placeholder), passes `feedbackUrl` to GrantDetailView and renders FeedbackBanner. Passes `authUser` and `showToast` to AboutPage.

### Migration
- **001_tester_signups.sql** — Creates `tester_signups` table (id, email, consent_at, source, user_id) with RLS: authenticated INSERT own row, service_role SELECT all.

## Files Changed

| File | Change |
|------|--------|
| `src/components/FeedbackBanner.jsx` | NEW |
| `src/components/ReportTab.jsx` | Added feedbackUrl prop, contextual feedback link |
| `src/components/GrantDetailView.jsx` | Added feedbackUrl prop passthrough |
| `src/components/AboutPage.jsx` | Added TesterSignup section with Supabase insert |
| `src/components/PrivacyPage.jsx` | Added Feedback & Testing privacy section |
| `src/App.jsx` | FeedbackBanner import, FEEDBACK_URL constant, prop wiring |
| `phases/phase-06/migrations/001_tester_signups.sql` | NEW |

## Build & Test

- **Build:** 83 modules, 0 errors (vite build)
- **Smoke:** 13/13 tests pass (no regressions)

## What Requires Human Action

1. **Create Google Form** with 5 feedback questions (see triage.md Decision 7)
2. **Update FEEDBACK_URL** in App.jsx with real form URL, rebuild and redeploy
3. **Run SQL migration** in Supabase SQL editor
4. **Redeploy** dist/ to Netlify
5. **Outreach** — see HUMAN_ACTION.md for ranked channel list
