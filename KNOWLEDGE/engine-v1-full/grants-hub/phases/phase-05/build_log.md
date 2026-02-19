# Phase 5 Build Log: User Accounts (Email OTP)

**Date:** 2026-02-14

---

## What Was Built

### 1. AuthPanel Component (`src/components/AuthPanel.jsx`)

A self-contained authentication panel with three states:

**idle state:**
- Anonymous user: shows "Guest mode · Save Your Account · Sign In"
- Signed-in user: shows "📧 user@email.com · Sign Out"

**email state:**
- Email input form with "Send Code" button
- Handles both "Save Account" (anonymous → permanent) and "Sign In" (returning user) flows
- Rate limit and error handling

**otp state:**
- 6-digit code input (numeric only, monospace, centered)
- "Verify" button + "Resend code" and "Cancel" options
- Handles expired/invalid OTP errors

### 2. App.jsx Auth Integration

- `authUser` and `isAnonymous` state variables
- Auth state set during initial Supabase session check
- `onAuthStateChange` listener handles:
  - `SIGNED_IN` with email → reload data for returning user
  - `SIGNED_OUT` → create new anonymous session, clear grants
- AuthPanel rendered in header between title and storage indicator
- All existing functionality unchanged

### 3. Auth Flows Implemented

**Flow A: Anonymous → Permanent (Save Account)**
1. Click "Save Your Account"
2. Enter email → `supabase.auth.updateUser({ email })`
3. Enter 6-digit OTP → `supabase.auth.verifyOtp({ type: 'email_change' })`
4. User ID preserved, all data retained

**Flow B: Returning User (Sign In)**
1. Click "Sign In"
2. Enter email → `supabase.auth.signInWithOtp({ email })`
3. Enter 6-digit OTP → `supabase.auth.verifyOtp({ type: 'email' })`
4. Session established, data loaded from cloud

**Flow C: Sign Out**
1. Click "Sign Out"
2. `supabase.auth.signOut()` → onAuthStateChange creates new anonymous session
3. Grants cleared, fresh anonymous state

## Files Created/Changed

| File | Change |
|---|---|
| `src/components/AuthPanel.jsx` | New: complete auth panel component |
| `src/App.jsx` | Added authUser/isAnonymous state, onAuthStateChange listener, AuthPanel in header |
| `phases/phase-05/research.md` | 5 findings from web research |
| `phases/phase-05/triage.md` | 8 decisions |
| `phases/phase-05/spec.md` | 9 acceptance criteria |
| `phases/phase-05/HUMAN_ACTION.md` | Supabase config instructions |

## No Database Changes

RLS policies already use `auth.uid()`. The user_id is preserved during anonymous → permanent conversion. No schema or migration changes needed.

## Testing Notes

- `npm run build` — **82 modules, 0 errors** (was 81 in Phase 4 — +1 for AuthPanel)
- `npm run smoke` — **13/13 tests pass**
- End-to-end auth flow cannot be tested until Supabase dashboard is configured (see HUMAN_ACTION.md)

## Bug Fixes (post-build)

### Bug 1: OTP input limited to 6 chars, Supabase sent 8
- **Root cause:** `maxLength={6}` and `otp.length !== 6` check too strict
- **Fix:** Expanded to `maxLength={8}`, validation changed to `otp.length < 6`
- **Also:** Updated label from "6-digit code" to "code"

### Bug 2: "Code expired" on fresh code
- **Root cause:** Double-try logic — first `verifyOtp` with wrong `type` consumed the token, fallback always failed
- **Fix:** Removed double-try. Single attempt per flow: `'email_change'` for save, `'email'` for sign-in

### Bug 3: Misleading rate limit message
- **Root cause:** Hardcoded "wait 60 seconds" but Supabase free tier limits ~3-4 emails/hour
- **Fix:** Updated to "Email rate limit hit — wait a few minutes and try again. (Free tier: ~3 emails/hour)"

## UAT Results

| Test | Result | Notes |
|---|---|---|
| Anonymous mode (unchanged) | ✅ PASS | Grants create/save as before |
| Save Account flow (desktop incognito) | ✅ PASS | Email sent, code entered, account saved |
| Sign In flow (desktop incognito) | ✅ PASS | Returning user signed in, data loaded |
| Sign In flow (phone) | ⏳ UNRESOLVED | Hit Supabase free tier email rate limit during testing. Held for later retest. |
| Supabase dashboard config | ✅ DONE | Manual linking enabled, email templates updated, site URL set |

## Unresolved Tests (carried forward)

- **Phone sign-in:** Rate limited during testing. Code fix deployed (better error message). Retest when rate limit resets.
- **kamunity.ai backlink:** Pending — add link from kamunity.ai to grants-hub.netlify.app
- **Google indexing:** Pending — site submitted via sitemap, waiting for crawl
