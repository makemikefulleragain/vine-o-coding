# HUMAN_ACTION.md — Kamunity Consulting Website
## Actions required before this site can replace the Wix site

**Created:** 2026-02-20
**Blocking:** DNS cutover, Netlify Forms email, Mike photo

---

## The site is live and ready to review

**Temp URL:** https://kamunity-consulting-new.netlify.app

Test everything here before touching the live domain.

- Front door (default — CEO version): https://kamunity-consulting-new.netlify.app
- Front door (Priya version): https://kamunity-consulting-new.netlify.app?v=priya
- Red door: https://kamunity-consulting-new.netlify.app/fix.html
- Blue door: https://kamunity-consulting-new.netlify.app/impossible.html
- About page: https://kamunity-consulting-new.netlify.app/about.html

---

## Action 1 — Review the site (before anything else)

**Who:** Mike
**When:** Before going live

Walk through the site on your phone first (Priya test). Check:
- Does it feel right above the fold?
- Does the copy match what was designed in the session?
- Does the campfire aesthetic feel like you?
- Are the proof points accurate?
- Does the About page sound human?

If anything is wrong, flag it in a reply and do NOT proceed to DNS cutover.

---

## Action 2 — Set up Netlify Forms email notification

**Who:** Mike
**When:** Before sending anyone to the site

1. Go to: https://app.netlify.com/projects/kamunity-consulting-new
2. Click **Forms** in the left nav
3. You'll see two forms: `fix-interest` and `impossible-interest`
4. Click on each form → **Form notifications** → Add email notification
5. Enter: `mike@kamunityconsulting.com` (or whatever email you actively monitor)
6. Save

**Why:** Until this is done, form submissions go to the Netlify dashboard only — you won't get an email alert when Priya fills in the form.

---

## Action 3 — Provide a photo for the About page

**Who:** Mike
**When:** Before going live (or shortly after — photo placeholder is acceptable for soft launch)

The About page currently shows "Photo coming soon" where your photo should be.

To add a photo:
1. Give the image file to Cascade (or drop it in `site/` yourself)
2. Name it something like `mike-fuller.jpg`
3. Cascade will update about.html to reference it (takes 5 minutes)

A phone photo is fine. No professional headshot needed. Warm, human, candid preferred.

---

## Action 4 — DNS cutover from Wix to Netlify

**Who:** Mike (requires Wix account access)
**When:** After Actions 1–3 are complete and site is approved

**⚠️ Do not do this until the site is reviewed and approved. The Wix site stays live until the moment you cut over.**

Steps:
1. Log into Wix account at wix.com
2. Go to **Domains** or **Site Settings → Domain**
3. Find kamunityconsulting.com
4. Change nameservers to Netlify's nameservers, OR update the A record and CNAME to point at Netlify
   - Netlify will give you the exact DNS values at: **Site Settings → Domain Management → Add custom domain → kamunityconsulting.com**
5. Once DNS is live and propagated (up to 48 hours, usually faster):
   - Test https://kamunityconsulting.com loads the new site
   - Netlify handles SSL automatically

**Check first:** Is the domain *registered* at Wix or just *hosted* there? If registered at Wix, the transfer process may be longer. If just hosted (DNS pointed at Wix), it's a quick DNS change.

---

## Action 5 — Update CSP header after DNS cutover

**Who:** Cascade (after Mike confirms domain is live)
**When:** After kamunityconsulting.com is pointing at the new site

The `netlify.toml` `Content-Security-Policy` `form-action` directive currently allows:
```
form-action 'self' https://kamunity-consulting.netlify.app
```

After DNS cutover, Cascade needs to add `https://kamunityconsulting.com` to this directive and redeploy.

Flag this in a new message: "DNS is live, update CSP."

---

## When all actions are complete

Delete this file and tell Cascade. The engine will then:
- Update STATE.md with production URL
- Mark Phase 1–3 as fully complete
- Proceed to Phase 4 planning (based on any early traffic signals)
