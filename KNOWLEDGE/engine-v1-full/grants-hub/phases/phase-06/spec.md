# Phase 5.5 Spec: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14

---

## Acceptance Criteria

### AC1: Persistent Feedback Banner
- A non-intrusive banner/button is visible on the main app view (not on trust pages)
- Clicking it opens the external feedback form in a new tab
- Banner includes a brief message: "Help us improve — share your feedback"
- Banner can be dismissed and stays dismissed for the session

### AC2: Contextual Feedback Prompt on Report Tab
- After the Report tab is viewed, a subtle prompt appears near the print button
- Links to the same external feedback form
- Only shown once per session (not annoying on repeat views)

### AC3: "Join Our Testers" Opt-In on About Page
- A section on the About page invites users to join the tester group
- Email input field with explicit consent checkbox
- Consent text: "I agree to receive occasional emails about testing new features. I can unsubscribe anytime."
- Links to Privacy page
- On submit: saves to Supabase `tester_signups` table
- Success toast: "Thanks! We'll be in touch."
- If user is already authenticated, pre-fills their email

### AC4: Supabase Migration — tester_signups Table
- Table: `tester_signups` (id uuid PK, email text, consent_at timestamptz, source text, user_id uuid nullable)
- RLS: authenticated users can INSERT their own row; only service_role can SELECT all
- Migration file in `phases/phase-06/migrations/`

### AC5: Privacy Page Updated
- New section: "Feedback & Testing"
- Explains: we collect anonymous feedback via an external form; if you opt in to testing, we store your email; you can request removal anytime
- Consistent with OAIC APP 1 and APP 5 requirements

### AC6: Unresolved Tests Addressed
- Phone sign-in retest documented in HUMAN_ACTION.md
- kamunity.ai backlink instructions in HUMAN_ACTION.md
- Google Search Console submission instructions in HUMAN_ACTION.md

### AC7: HUMAN_ACTION.md — Outreach Plan
- Step-by-step instructions for:
  - Creating the Google Form (with the 5 triage questions)
  - Setting the form URL in the app (or hardcoding it)
  - Resolving all 3 unresolved tests
  - Posting on LinkedIn, Facebook groups, Our Community
  - Direct peer outreach to 3-5 treasurers

### AC8: Build Passes (0 errors, smoke tests pass)

### AC9: Deployed and Live
- Feedback infrastructure visible on deployed site after human redeploy

---

## Technical Design

### FeedbackBanner.jsx (new component)
```
Props: { feedbackUrl }
State: dismissed (boolean, sessionStorage)

Renders:
- If not dismissed: fixed bottom banner with message + "Give Feedback" button + dismiss X
- "Give Feedback" opens feedbackUrl in new tab
- Dismiss sets sessionStorage flag
```

### ReportTab.jsx (modification)
```
Add: feedbackUrl prop
Add: sessionStorage check for "reportFeedbackShown"
After print button, if not already shown this session:
  - Small text link: "Just generated a report? Tell us how it went →"
  - On click: opens feedbackUrl, sets sessionStorage flag
```

### AboutPage.jsx (modification)
```
Add: "Join Our Testers" section after existing content
- Email input + consent checkbox + submit button
- On submit: supabase.from('tester_signups').insert({ email, consent_at, source, user_id })
- Pre-fill email from authUser if available
- Toast on success/error
```

### PrivacyPage.jsx (modification)
```
Add: "Feedback & Testing" section
- Anonymous feedback: collected via external form, no personal info stored by us
- Tester opt-in: email stored in Supabase, used only for testing communications
- Removal: email privacy@kamunity.ai or use "Delete All My Data"
```

### Migration: 001_tester_signups.sql
```sql
CREATE TABLE tester_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  source text DEFAULT 'about_page',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE tester_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own signup"
  ON tester_signups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Service role reads all"
  ON tester_signups FOR SELECT
  TO service_role
  USING (true);
```

### App.jsx (modification)
```
- Define FEEDBACK_URL constant (Google Form URL placeholder)
- Pass feedbackUrl to FeedbackBanner and ReportTab
- Pass authUser to AboutPage for email pre-fill
```

### Feedback Form URL
- Placeholder constant in App.jsx: `const FEEDBACK_URL = 'https://forms.gle/PLACEHOLDER';`
- Human action: create Google Form, get URL, update constant, rebuild and redeploy
