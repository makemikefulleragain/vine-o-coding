# Phase 5 Critique: User Accounts (Email OTP)

**Date:** 2026-02-14

---

## Constitutional Check

| Principle | Status |
|---|---|
| Serves real volunteer treasurers | ✅ Multi-device access solves the #1 recurring gap |
| Progressive enhancement | ✅ Anonymous mode fully preserved — auth is opt-in |
| Evidence-based decisions | ✅ Research confirmed OTP > magic link for SPAs; Supabase docs for API |
| Working deployable state | ✅ Build passes, all tests pass. Auth UI renders. Functional pending Supabase config. |
| Data sovereignty | ✅ Sign out clears session, Delete All My Data still works |

## What Went Well

1. **Full phase loop followed.** Research → triage → spec → build → critique. Spec had 9 acceptance criteria before a line of code was written (Phase 3 process gap corrected again).
2. **Zero-friction onboarding preserved.** Anonymous sign-in remains the default. No user is forced to create an account. This is critical for first impressions.
3. **OTP over magic link was the right call.** No redirect URL complexity, user stays in the app, works identically in dev and prod. Simpler for treasurers too — type a 6-digit code vs. switching to email and clicking a link.
4. **User ID preservation.** `updateUser({ email })` keeps the same user_id, so all existing data stays tied to the account. No data migration needed.
5. **AuthPanel is self-contained.** Single component, three states, handles all flows. Easy to test, easy to move around the UI.

## What Could Be Better

1. **Three bugs found during UAT.** OTP input too narrow (6 chars, Supabase sent 8), double-try logic consumed tokens causing "expired" errors, and misleading rate limit message. All fixed in post-build patches. Root cause: insufficient live testing before UAT — the spec assumed 6-digit codes without verifying against real Supabase behaviour.
2. **Free tier email rate limit blocked phone test.** ~3-4 emails/hour on Supabase's built-in SMTP. Testing consumed the quota before phone test. Mitigation: custom SMTP (future), or test more carefully with fewer attempts. Phone test held as unresolved.
3. **No auth-specific smoke tests.** The AuthPanel component isn't tested by the existing smoke suite. Adding tests for render states (idle/email/otp) and mock auth flows would improve confidence.
4. **No "remember me" or session duration control.** Supabase manages session refresh automatically, but we haven't explicitly set a session duration or considered what happens when a session expires mid-use.
5. **No loading/pending state for auth changes.** When onAuthStateChange fires SIGNED_IN and data is reloading, the UI doesn't show a loading state — the user sees their old grants briefly before the new ones load.

## Bias Check

- **Builder bias toward email OTP.** We chose OTP because it's simpler to implement in an SPA. But some treasurers (especially older volunteers) may be more familiar with clicking email links. Magic link support could be added as an alternative in future.
- **Assumption that email is available.** Some committee treasurers use shared computers and may not have personal email readily accessible. The anonymous fallback mitigates this, but it's worth noting.

## Learnings for Future Phases

1. **Human actions mid-build are better than human actions at the end.** If the Supabase config was done before building, we could test the full flow and get UAT in the same session.
2. **Auth is deceptively complex.** The code is ~200 lines, but the edge cases (expired OTP, rate limits, type: email vs email_change, sign-out → re-anonymous) make it harder to get right than it looks. Live testing will likely surface issues.
3. **The next priority should be based on what real users say.** With accounts, the tool is functionally complete for individual use. The remaining gaps (team accounts, receipt attachments, funder templates) are all features that should be validated by actual user feedback before building.
