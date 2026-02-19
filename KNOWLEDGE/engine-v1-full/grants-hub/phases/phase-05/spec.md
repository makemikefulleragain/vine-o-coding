# Phase 5 Spec: User Accounts (Email OTP)

**Date:** 2026-02-14

---

## Acceptance Criteria

1. ✅ Anonymous sign-in still works as default (zero-friction onboarding preserved)
2. ✅ Anonymous user can "Save Account" by entering email → receives 6-digit OTP → verifies → becomes permanent
3. ✅ Permanent user's email is shown in header
4. ✅ Permanent user can sign out
5. ✅ Returning user can sign in with email OTP on a new device → data loads
6. ✅ Auth state persists across page refreshes
7. ✅ All existing functionality unchanged (grants, expenses, reports, pages)
8. ✅ Build passes (0 errors), smoke tests pass
9. ✅ Error states handled: invalid OTP, expired OTP, rate limit, network error

---

## Technical Design

### New Component: `AuthPanel.jsx`

Three states:
1. **idle** — shows current auth state + action button
2. **email** — email input form (send OTP)
3. **otp** — 6-digit code input (verify OTP)

```
[State: idle]
  Anonymous: "💾 Guest mode · Save Your Account"
  Signed in: "📧 user@email.com · Sign Out"

[State: email]
  "Enter your email" input + "Send Code" button + Cancel

[State: otp]  
  "Enter the 6-digit code sent to user@email.com" input + "Verify" button + Cancel
```

### Auth Flows

**Flow A: Anonymous → Permanent (Save Account)**
```
1. User clicks "Save Your Account"
2. Panel shows email input
3. User enters email, clicks "Send Code"
4. Call: supabase.auth.updateUser({ email })
5. Supabase sends 6-digit OTP to email
6. Panel shows OTP input
7. User enters code, clicks "Verify"
8. Call: supabase.auth.verifyOtp({ token, type: 'email_change' })
9. User is now permanent — show email in header
```

**Flow B: Returning User (Sign In)**
```
1. User clicks "Sign In" (shown when not signed in / anonymous)
2. Panel shows email input
3. User enters email, clicks "Send Code"
4. Call: supabase.auth.signInWithOtp({ email })
5. Supabase sends 6-digit OTP to email
6. Panel shows OTP input
7. User enters code, clicks "Verify"
8. Call: supabase.auth.verifyOtp({ email, token, type: 'email' })
9. Session established — reload data for this user
```

**Flow C: Sign Out**
```
1. User clicks "Sign Out"
2. Call: supabase.auth.signOut()
3. Create new anonymous session
4. Clear grants, reload from new anonymous user (empty)
```

### App.jsx Changes

- Add `authUser` state (null | user object)
- Add `onAuthStateChange` listener to track auth state
- Pass auth state to header for display
- On auth state change → reload data for new user
- Render `AuthPanel` in header area

### No Database Changes

RLS policies already use `auth.uid()`. The user_id is preserved during anonymous → permanent conversion. No schema changes needed.

### Human Actions Required

1. **Enable Manual Linking** in Supabase dashboard: Auth → Providers → toggle on "Enable Manual Linking"
2. **Modify email template** to send OTP: Auth → Email Templates → Magic Link template → include `{{ .Token }}`
3. **Set Site URL** in Supabase: Auth → URL Configuration → Site URL = `https://grants-hub.netlify.app`
