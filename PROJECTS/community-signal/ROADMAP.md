# COMMUNITY SIGNAL SYSTEM — ROADMAP

## Current Phase: 1.5 — PRODUCTION SOURCES
**Status:** Ready to build
**Phase 1.5 spec completed:** Feb 27, 2026

---

## Timeline

| Phase | Target | Status |
|-------|--------|--------|
| Phase 0: Scaffolding | Feb 26, 2026 | ✅ Complete |
| Phase 1: Sense | Feb 26, 2026 | ✅ Complete — e2e tested |
| Phase 1.5: Production Sources | Week of Feb 27 | 🔨 Spec complete — ready to build |
| Phase 2: Propagate | Week 2-3 March | ✅ Complete — UAT passed |
| Phase 3: Match + Make | Week 3-4 March | ✅ Complete — UAT passed Feb 26 |
| Phase 4: Offer | Feb 26, 2026 | ✅ Complete — UAT passed |
| Phase 5: Handoff | May 2026+ | ⬜ Not started |

## Phase 1.5 Dependencies

- Email service account for inbound parsing (Mailgun / SendGrid / Zapier — choose at build time)
- `signals@kamunity.org` email address configured and DNS set up
- Supabase: 4 new tables (`source_fetch_log`, `discovered_sources`, `sector_constellation`, `org_constellation`)
- Netlify scheduled functions enabled on community-signal site (verify plan supports cron)
- RSS feed URLs confirmed for all Tier 1/2 sources (some may need manual discovery)

## Blockers

- **Email service choice not made** — Mailgun vs SendGrid vs Zapier. Mailgun recommended (free tier generous, inbound parse reliable).
- **RSS URL discovery needed** — not all Tier 1/2 orgs advertise RSS feeds. Source discovery engine will help, but initial URLs may need manual lookup.
- **Netlify cron plan** — verify community-signal.netlify.app is on a plan that supports scheduled functions.

## Revenue Connection

This system directly supports the consulting pipeline:
- Sector Pulse demonstrates expertise → consulting credibility
- Commons templates demonstrate capability → "if the free thing is this good..."
- Signal data (anonymised) informs sector reports → consulting deliverables
- Handoff connections → potential consulting relationships

Does NOT directly generate revenue. Generates the conditions for revenue.
