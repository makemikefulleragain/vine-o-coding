# Phase 5 Triage: User Accounts (Email OTP)

**Date:** 2026-02-14

---

## Decision 1: Email OTP (not Magic Link)

Use 6-digit OTP codes instead of magic links. No redirect URL complexity, user stays in the app, perfect for SPAs. Requires modifying the Supabase email template to include `{{ .Token }}`.

## Decision 2: Preserve Zero-Friction Onboarding

Anonymous sign-in remains the default. Users can optionally "save their account" by adding an email. This is opt-in, not required.

## Decision 3: AuthPanel Component

Build a single `AuthPanel.jsx` component that handles:
- Display current auth state (anonymous vs signed in)
- "Save Your Account" flow (anonymous → permanent via email OTP)
- "Sign In" flow (returning user via email OTP)
- "Sign Out" action
- OTP input (6-digit code entry)

## Decision 4: Anonymous → Permanent Conversion

Use `supabase.auth.updateUser({ email })` for anonymous users claiming their account. This preserves the user_id and all existing data — no migration needed.

## Decision 5: Returning User Sign-In

Use `supabase.auth.signInWithOtp({ email })` for returning users on a new device. On verification, load their cloud data as normal.

## Decision 6: Header Integration

Add auth state to the header area:
- Anonymous: show "Save Your Account" link
- Signed in: show email + "Sign Out"
- Keep it minimal — auth is secondary to the tool's function

## Decision 7: Enable Manual Linking in Supabase (Human Action)

Supabase requires "Enable Manual Linking" in Auth → Providers for anonymous → permanent conversion to work. This is a dashboard toggle — documented in HUMAN_ACTION.md.

## Decision 8: Defer

- **Custom SMTP** — default Supabase email is fine for low volume
- **OAuth providers (Google, GitHub)** — adds complexity, most treasurers just need email
- **Password-based auth** — OTP is simpler and more secure
- **Email change / account management** — can be added later
- **Team/org accounts** — future phase
