# Phase 5.5 Triage: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14

---

## Decision 1: Feedback Widget — In-App Banner vs External-Only

**Decision:** In-app persistent feedback banner linking to a Google Form.
**Reasoning:** External-only (just sharing a form link) requires users to already know about the form. An in-app banner catches organic visitors. Google Form handles the data collection (no backend code needed). Banner is ~20 lines of JSX.
**Deferred:** Full in-app survey widget (Userpilot-style). Overkill for our traffic level.

## Decision 2: Contextual Prompt — After Report or After Setup?

**Decision:** After first report generation (ReportTab print button area).
**Reasoning:** The report is the tool's core deliverable. A user who has set up a grant, logged expenses, and viewed the report has completed the full workflow — their feedback is the most valuable. Prompting after setup is too early; they haven't experienced the value yet.
**Deferred:** Usage-count-based prompts ("You've used this 3 times..."). Requires tracking state we don't have.

## Decision 3: "Join Testers" Opt-In — Supabase Table vs External

**Decision:** Supabase table (email + consent_at timestamp + source).
**Reasoning:** We already have Supabase Auth and the user may already be authenticated. Storing in our own DB is simpler than setting up Mailchimp for <50 testers. Respects sovereignty (data stays in our Supabase). Consent is explicit via checkbox.
**Deferred:** Mailchimp, ConvertKit, or other email marketing tools.

## Decision 4: Privacy Page Update

**Decision:** Add a "Feedback & Testing" section to the existing Privacy page.
**Reasoning:** OAIC APP 1 requires transparent management of personal information. If we collect emails for testing, this must be disclosed. Minor edit to an existing component.

## Decision 5: Outreach Channels — Which First?

**Decision:** Prioritise in this order:
1. kamunity.ai backlink (resolves unresolved test)
2. Google Search Console submission (resolves unresolved test)  
3. LinkedIn post (Kamunity account)
4. Facebook nonprofit groups (3-5 relevant groups)
5. Our Community / Funding Centre (submit as resource)
6. Direct peer sharing (3-5 known treasurers)

**Reasoning:** Items 1-2 resolve existing unresolved tests AND improve discoverability. Items 3-4 are highest reach for effort. Items 5-6 are highest relevance. All are human actions documented in HUMAN_ACTION.md.

## Decision 6: Phone Sign-In Unresolved Test

**Decision:** Bundle resolution into this phase's HUMAN_ACTION.
**Reasoning:** Rate limit should have reset by now. Quick retest. Not a code issue.

## Decision 7: Feedback Form Questions

**Decision:** 5 questions on external Google Form:
1. What's your role? (Treasurer / Committee member / Staff / Other)
2. First impression — was it clear what the tool does? (1-5 scale)
3. Did you try adding a grant and expenses? What was confusing? (open text)
4. Would you use this for a real grant acquittal? Why/why not? (open text)
5. What's the one thing you'd want that isn't there? (open text)

**Reasoning:** Mix of closed (for segmentation/quantification) and open (for signal depth). 5 questions is the max before response rates drop. Role question helps us confirm we're reaching treasurers.

## Decision 8: Migration for Tester Opt-In Table

**Decision:** Create a `tester_signups` table in Supabase with RLS.
**Reasoning:** Needs a SQL migration. Columns: id, email, consent_at, source, user_id (nullable FK to auth.users). RLS: users can insert their own row, only service role can read all.
