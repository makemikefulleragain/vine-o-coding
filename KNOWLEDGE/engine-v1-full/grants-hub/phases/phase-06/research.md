# Phase 5.5 Research: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14
**Searches used:** 5/5

---

## Research Question

How do we build a lightweight in-app feedback mechanism and reach real Australian nonprofit treasurers, with informed consent and minimal code?

---

## Finding 1: Where Australian Nonprofit Treasurers Find Tools

**Sources:** Our Community (ourcommunity.com.au), WACOSS, Volunteering WA, MoneyMinder, The Grants Hub

The Australian nonprofit ecosystem has clear gathering points:

- **Our Community (ourcommunity.com.au)** — the dominant hub. Runs SmartyGrants, Funding Centre, Institute of Community Directors, GiveNow. Founded 1999, tens of thousands of subscribers. Their newsletter "Community Directors Intelligence" reaches NFP leaders. This is the single most relevant channel.
- **Funding Centre (fundingcentre.com.au)** — Australia's largest grants database. Treasurers searching for grants land here.
- **WACOSS** — WA Council of Social Service. Has WAConnect directory and Facebook presence. WA-specific but relevant to Perth-based Kamunity.
- **Volunteering WA** — Facebook community, newsletter. Reaches volunteer managers who work alongside treasurers.
- **Facebook groups** — Australian nonprofit sector is active on Facebook. Groups like "Australian Grants & Funding," "Not for Profit Network Australia," and local community group pages are where treasurers ask peers for tool recommendations.
- **Google Search** — treasurers searching "grant acquittal help" or "grant reporting tool" (our SEO from Phase 4 targets this).
- **Peer recommendation** — MoneyMinder's treasurer guide confirms: volunteer treasurers learn tools from their predecessor or peer organisations.

**Key insight:** The highest-leverage channel is Our Community's ecosystem (newsletter, Funding Centre, SmartyGrants community). Second is Facebook groups. Third is direct peer sharing.

## Finding 2: In-App Feedback Best Practices

**Sources:** Userpilot, Refiner.io, UserGuiding, Frill

Key patterns for low-traffic tools with small user bases:

- **Feedback widget (always visible):** A persistent button or icon that users can click at any time. Best placed in footer or as a floating icon. Low friction, always available.
- **Microsurveys (contextual):** Short 1-3 question surveys triggered after a specific action (e.g., after generating a report). Higher response rate than general surveys because the context is fresh.
- **One-click ratings:** "Was this useful? 👍 👎" style. Lowest friction, highest response rate, but lowest signal depth.
- **External form link:** Link to Google Forms / Typeform. Zero in-app code complexity. Lower response rate (extra click, leaves the app) but richer data.

**Best practice highlights:**
- Keep it to 1-3 questions max for in-app
- Make the feedback widget easily discoverable but not intrusive
- Contextual triggers (after completing a task) get ~50% higher response rates than passive widgets
- Always close the feedback loop — tell users what happened with their feedback
- Segment: new users vs returning users have different feedback to give

**For our situation (near-zero traffic):** A persistent feedback button + a contextual prompt after first report generation is the sweet spot. External form for depth, in-app for discoverability.

## Finding 3: Informed Consent Under Australian Privacy Law

**Sources:** OAIC (oaic.gov.au) — Australian Privacy Principles (APPs)

Relevant principles for feedback collection:

- **APP 1 (Open & transparent management):** Must have a clear privacy policy explaining what data is collected and why. We already have a Privacy page.
- **APP 3 (Collection):** Only collect personal information that is reasonably necessary. For feedback: name/email only if they opt in to follow-up.
- **APP 5 (Notification):** At or before collection, tell the individual: what you're collecting, why, who it may be disclosed to, and consequences of not providing it.
- **Consent must be:** Voluntary, informed, specific, and given by someone with capacity. Cannot be bundled with other consents.

**Practical application:**
- Anonymous feedback (no personal info) requires no special consent — just a clear statement about what's collected.
- If we capture email for "join testers" opt-in, we need: a clear consent checkbox, a statement of purpose, and a link to the privacy policy.
- Feedback responses themselves are not "personal information" unless they contain identifying details.
- Our existing Privacy page needs a minor update to mention feedback collection.

## Finding 4: Outreach Channels Ranked by Likely Impact

Based on research, ranked by accessibility and relevance:

| Channel | Effort | Reach | Relevance | Action |
|---------|--------|-------|-----------|--------|
| kamunity.ai backlink | Low | Low | High | Add link (human action) |
| LinkedIn post (Kamunity) | Low | Medium | Medium | Post about tool (human action) |
| Facebook nonprofit groups | Medium | High | High | Share in 3-5 relevant groups (human action) |
| Our Community / Funding Centre | Medium | Very High | Very High | Submit as resource or contact about partnership (human action) |
| Google Search Console | Low | Variable | High | Submit sitemap, request indexing (human action) |
| WACOSS / Volunteering WA | Medium | Medium | Medium | Contact about sharing with members (human action) |
| Direct peer sharing | Low | Low | Very High | Ask 3-5 known treasurers (human action) |

## Finding 5: What "Join Our Testers" Should Look Like

**Sources:** SaaS feedback best practices, OAIC consent requirements

The opt-in should be:
- **Clear purpose:** "Help shape this tool — join our tester group"
- **Minimal data:** Email only (no name required)
- **Explicit consent:** Checkbox + statement: "I agree to receive occasional emails about testing new features. I can unsubscribe anytime."
- **Privacy link:** Points to existing Privacy page
- **No incentive needed:** Volunteer treasurers are motivated by "making this tool work for people like me"
- **Storage:** Supabase table with email + consent timestamp. No Mailchimp/third-party needed for <50 testers.

---

## Architecture Decision

**Lightweight approach:** 
1. In-app feedback banner (persistent, bottom of page or in footer area) linking to external Google Form
2. Contextual prompt after first report generation: "How was this? Help us improve"
3. "Join Testers" email opt-in on About page with explicit consent
4. Privacy page updated to mention feedback collection
5. HUMAN_ACTION.md with ranked outreach plan

This is ~100-150 lines of new code plus a Google Form setup (human action).
