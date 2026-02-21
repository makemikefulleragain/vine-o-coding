# SETUP.md — Human Setup Instructions
## kamunityconsulting.com rebuild · Feb 2026
## Do these steps once before or alongside Phase 1.

---

## Step 1: Create a new Netlify site (~5 minutes)

This is a static HTML site. No build step required.

### Option A: Drag and Drop (simplest for Phase 1)
1. Create a folder called `dist/` (or just use the project folder)
2. Go to https://app.netlify.com
3. Drag the folder onto the Netlify dashboard
4. Netlify deploys instantly and gives you a temporary URL (e.g. `random-name.netlify.app`)
5. Test everything on the temporary URL before touching the domain

### Option B: Netlify CLI (for ongoing workflow)
```bash
npx netlify deploy --prod --dir .
```

**Do NOT point kamunityconsulting.com at the new site until Phase 1 is complete and tested.**

---

## Step 2: Sort out the domain (~15-30 minutes, may need Wix account)

The current kamunityconsulting.com is hosted on Wix. To move it:

1. Log into Wix account
2. Go to Domain settings
3. Find the option to transfer DNS management or point nameservers to Netlify
4. In Netlify: Site Settings → Domain Management → Add custom domain → kamunityconsulting.com
5. Follow Netlify's DNS instructions
6. Wait for DNS propagation (up to 48 hours, usually faster)

**⚠️ HUMAN ACTION REQUIRED:** DNS changes need a human. Do not attempt to automate this. Flag this as HUMAN_ACTION.md when Phase 1 is ready to go live.

**Wix note:** If the domain is registered through Wix (not just hosted there), the transfer process is different. Check whether the domain is *registered* at Wix or just *pointed* at Wix. If registered, may need to transfer the domain itself.

---

## Step 3: Set up Netlify Forms (for contact/interest capture)

Netlify Forms work automatically in static HTML — just add `netlify` attribute to any form tag.

```html
<form name="contact" method="POST" data-netlify="true">
```

Forms appear in Netlify dashboard under Forms. Email notifications can be set up there.
Use mike@kamunityconsulting.com as the notification email (confirm this is active).

**No backend required. No database required. Netlify handles it.**

---

## Step 4: Confirm source assets

Before Phase 3 (the Mike page):
- [ ] Confirm a photo of Mike is available (check with Mike)
- [ ] Confirm mike@kamunityconsulting.com is active and monitored
- [ ] Confirm kamunity.org URL for footer cross-link

---

## Cost

- **Netlify free tier:** More than sufficient for this site
- **Domain:** Already owned (currently on Wix)
- **Total additional cost: $0**

---

## Ready for the Engine

Once the Netlify site exists (even on a temporary URL), the engine can build Phase 1 and you can test it before touching the live domain.
