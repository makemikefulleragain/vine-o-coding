# Phase 3 Triage: Make It Trustworthy

**Date:** 2026-02-14

---

## Decision 1: Build About Page

**Critical trust signal.** Research shows users need to know who built the tool and why. This is especially important for a free tool handling financial data — "what's the catch?" must be answerable.

Content:
- Kamunity (kamunity.ai) — community platform building tools for Australian communities
- Why this tool exists (small orgs shouldn't need expensive software for grant acquittals)
- Open source / community project
- No tracking, no ads, no selling data
- Built with modern web technology (React, Supabase)

## Decision 2: Build Privacy Page

**Critical trust signal.** Even though small NFPs may be exempt from the Privacy Act, ACNC governance standards expect responsible data handling. A clear privacy page lets a treasurer show their board: "Here's what the tool does with our data."

Content:
- What data is collected (grant details, expense records — no personal data, no payment info)
- Where data is stored (Supabase cloud — encrypted in transit + at rest)
- Anonymous auth — no email, no password, no name collected
- Data sovereignty — export anytime, delete anytime
- No third-party analytics, no tracking cookies
- What happens if you clear your browser (anonymous session lost — export first)

## Decision 3: In-App Data Transparency

**High value, low effort.** Currently "☁️ Cloud" is the only indicator. Users should be able to click it and understand what it means. Add a small info panel explaining cloud vs browser-only mode.

## Decision 4: FAQ Section

**Medium value, low effort.** Address the most common treasurer questions:
- Is this tool free? Will it stay free?
- Where is my data stored?
- Can I share this with my committee?
- What happens when I hand over to the next treasurer?
- Can I use this on my phone?

## Decision 5: Data Deletion

**Medium value, medium effort.** Users should be able to delete all their data. This is both a trust signal and a practical need (treasurer handover, org winds down). The delete-grant feature exists, but "delete all my data" should be explicit.

## Decision 6: Contact/Feedback Link

**Low effort.** A way to report issues or ask questions. Even just a mailto: link or GitHub link.

## What NOT to Build in Phase 3

- **User accounts** — Requires significant Supabase Auth changes (email/password, magic link). Defer to Phase 4.
- **Encryption at rest** — Supabase already encrypts. Adding client-side encryption adds complexity for minimal trust gain.
- **Compliance badges** — No certifications to display. Transparency is more effective than fake authority.
- **Cookie consent banner** — We don't use tracking cookies. A banner would imply we do.
