# Phase 5 Research: User Accounts (Email OTP)

**Date:** 2026-02-14
**Searches used:** 5/5

---

## Research Question
How can we add user accounts to the Grant Acquittal Helper without breaking zero-friction onboarding?

---

## Finding 1: Supabase Supports Anonymous → Permanent User Conversion

**Source:** Supabase docs (Anonymous Sign-Ins)

Key API: `supabase.auth.updateUser({ email })` converts an anonymous user to a permanent one by linking an email identity. The user_id stays the same, so all existing data (grants, expenses, categories) remains tied to the same account. No data migration needed.

**Requirements:**
- "Manual linking" must be enabled in Supabase dashboard (Auth → Providers)
- User provides email → Supabase sends verification → user verifies → account becomes permanent
- User ID is preserved through the conversion

## Finding 2: Email OTP > Magic Link for SPAs

**Source:** Supabase docs (Passwordless email logins), serverlessapigateway.com

Two passwordless options:
1. **Magic Link:** Sends a clickable link. User clicks → redirected back to app. Problem: requires redirect URL config, doesn't work well in SPAs without server-side handling.
2. **Email OTP:** Sends a 6-digit code. User types code into the app. No redirect needed. Perfect for SPAs.

OTP is better for our use case because:
- No redirect URL complexity
- User stays in the app the entire time
- Simpler mental model for volunteer treasurers
- Works identically in dev and production

**API flow:**
```js
// Send OTP
await supabase.auth.signInWithOtp({ email })
// Verify OTP (user types the 6-digit code)
await supabase.auth.verifyOtp({ email, token: '123456', type: 'email' })
```

**Requirement:** The Supabase email template must include `{{ .Token }}` to send a 6-digit code. By default, Supabase sends a magic link. This is a dashboard configuration change.

## Finding 3: Data Conflict Resolution Needed

**Source:** Supabase docs (Anonymous Sign-Ins, "Resolving data conflicts")

When an anonymous user links their email and that email is already associated with an existing permanent account, a data conflict arises. Supabase docs outline three strategies:
1. Overwrite with existing account data
2. Overwrite with anonymous user data
3. Merge

For our use case: **the anonymous user's current session data should be kept** (they just created it). If they're signing in to an *existing* account, load that account's data. This is the simplest approach — "sign in" means "load my existing data."

## Finding 4: Supabase Default Email Rate Limits

**Source:** Supabase docs

- OTP can only be requested once per 60 seconds per email
- OTPs expire after 1 hour (configurable)
- Supabase's built-in email (via Supabase Auth SMTP) has a rate limit of ~4 emails/hour in free tier for new projects
- For production: custom SMTP (e.g., Resend, SendGrid) recommended

For Phase 5 (low user count), the default SMTP is sufficient. Custom SMTP is a future concern.

## Finding 5: Auth State Change Listener

**Source:** Supabase JS SDK docs

`supabase.auth.onAuthStateChange()` fires on sign-in, sign-out, token refresh, and user update events. This is how we detect when a user completes OTP verification and reload their data.

---

## Architecture Decision: OTP with Preserved Zero-Friction Onboarding

1. **First visit:** Anonymous sign-in (unchanged — zero friction)
2. **"Save Your Account":** User optionally enters email → receives 6-digit OTP → types it in → anonymous user becomes permanent
3. **Return visit on new device:** User enters email → receives OTP → types it in → signed in, data loaded
4. **Guest mode:** Still works without email (anonymous, as today)

This preserves the current UX while adding multi-device access for users who want it.
