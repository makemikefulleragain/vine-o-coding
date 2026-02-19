# Phase 5 Human Actions Required

**Date:** 2026-02-14

---

## Action 1: Enable Manual Linking in Supabase (REQUIRED)

This allows anonymous users to link an email identity to their account.

1. Go to https://supabase.com/dashboard/project/tzwkprkhdgwmemajnxud/auth/providers
2. Scroll to **"Enable Manual Linking"**
3. Toggle it **ON**
4. Save

Without this, the "Save Your Account" flow will fail.

---

## Action 2: Modify Email Template for OTP (REQUIRED)

By default, Supabase sends a magic link (clickable URL). We need it to send a 6-digit OTP code instead.

1. Go to https://supabase.com/dashboard/project/tzwkprkhdgwmemajnxud/auth/templates
2. Select the **"Magic Link"** template
3. Replace the template body with:

```html
<h2>Your Grant Acquittal Helper Login Code</h2>
<p>Enter this code in the app to sign in:</p>
<h1 style="font-family: monospace; letter-spacing: 8px; font-size: 32px; text-align: center; background: #f3f4f6; padding: 16px; border-radius: 8px;">{{ .Token }}</h1>
<p style="color: #6b7280; font-size: 14px;">This code expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
<p style="color: #6b7280; font-size: 12px;">— Grant Acquittal Helper by Kamunity</p>
```

4. Also update the **"Email Change"** template (used when anonymous user saves account):

```html
<h2>Confirm Your Email</h2>
<p>Enter this code in the Grant Acquittal Helper to save your account:</p>
<h1 style="font-family: monospace; letter-spacing: 8px; font-size: 32px; text-align: center; background: #f3f4f6; padding: 16px; border-radius: 8px;">{{ .Token }}</h1>
<p style="color: #6b7280; font-size: 14px;">This code expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
<p style="color: #6b7280; font-size: 12px;">— Grant Acquittal Helper by Kamunity</p>
```

5. Save both templates.

**Key:** The `{{ .Token }}` variable is what makes Supabase send a 6-digit code instead of a link.

---

## Action 3: Set Site URL (REQUIRED)

1. Go to https://supabase.com/dashboard/project/tzwkprkhdgwmemajnxud/auth/url-configuration
2. Set **Site URL** to: `https://grants-hub.netlify.app`
3. Add to **Redirect URLs**: `https://grants-hub.netlify.app`
4. Save

---

## Action 4: Redeploy to Netlify (REQUIRED)

After the Supabase configuration above:

1. From the project root, run: `npm run build`
2. Drag the `dist/` folder to Netlify dashboard to redeploy

---

## Action 5: Test the Auth Flow

1. Open https://grants-hub.netlify.app in an incognito window
2. Create a grant (verify anonymous mode works)
3. Click "Save Your Account" → enter a real email
4. Check email for 6-digit code
5. Enter code → verify account is saved
6. Sign out → verify clean slate
7. Sign back in with same email → verify data is restored

---

## Notes

- **Free tier email rate limit:** Supabase sends ~4 emails/hour on the free tier. This is fine for testing and low-volume use. For production scale, configure a custom SMTP provider (Resend, SendGrid) later.
- **OTP expiry:** Default 1 hour. Configurable in Auth → Providers → Email.
- **Rate limit:** Users can only request a code once per 60 seconds.
