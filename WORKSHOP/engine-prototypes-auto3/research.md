# Research: community-garden-planner

## Search 1: "community garden management software plot allocation volunteer roster planting calendar"
### Findings:
- **Community Garden Builders App** (communitygardenbuilders.com) — Dedicated community garden management SaaS platform. Features: gardener registration/onboarding, plot tracking ("who's growing where"), waitlist integration, volunteer tracking, admin dashboard, email integration. Founded by actual community garden operators (Vancouver, since 2011, app since 2020). **Proprietary SaaS — not open source, not self-hosted.**
- **VegPlotter** — Free garden planner with planting calendar. Individual-focused, not community management.
- **GrowVeg** — Garden planner with layout design and planting calendar. Individual-focused, subscription-based.
- **Gardenity** (Devpost) — Hackathon project, task manager for community gardens. Not maintained/production-ready.

## Search 2: "open source community garden planner tool app plot management scheduling"
### Findings:
- **Seedtime** — Garden planner and management tool. Individual-focused.
- **Plant-it** — Self-hosted, open source plant tracking (Reddit /r/selfhosted). Individual plant diary, not community management.
- No-code article suggests building a garden management app from scratch — implying no ready-made solution exists.
- No open-source community garden management platform found.

## Search 3: "community garden software plot allocation waitlist volunteer scheduling"
### Findings:
- Community Garden Builders App confirmed as the primary dedicated tool
- Medium case study describes the pain point: managing waitlists, plot assignments, payments, returning gardener registration — confirms this is a real coordination challenge
- Various community gardens described using spreadsheets, email, and paper-based systems

## Search 4: Read Community Garden Builders App details
### Findings:
- Covers: registration, plot tracking, waitlist, volunteer tracking, dashboard
- Does NOT appear to offer: visual plot maps, planting calendars with seasonal guidance
- Proprietary SaaS, no self-hosting option
- No pricing visible (beta users quoted)
- Based in Vancouver, Canada

## Gap Analysis

| Requirement | Community Garden Builders | VegPlotter/GrowVeg | Open Source Options |
|---|---|---|---|
| Visual plot map (allocated/available) | Partial (dashboard, not visual map) | Layout tools (individual) | ❌ None found |
| Planting calendar with seasonal guidance | ❌ Not evident | ✅ Yes (individual) | ❌ None found |
| Volunteer watering roster | ✅ Volunteer tracking | ❌ No | ❌ None found |
| Member directory for plot holders | ✅ Registration/tracking | ❌ No | ❌ None found |
| Self-hosted / data sovereignty | ❌ Proprietary SaaS | ❌ SaaS | Plant-it (but individual) |
| Standalone web app | ❌ SaaS only | ❌ SaaS | ❌ None |

**Conclusion:** The community garden management space is significantly underserved:
- ONE dedicated tool exists (Community Garden Builders) — proprietary SaaS, partial feature coverage
- Individual garden planners don't address community coordination (plot allocation, volunteer rosters, member management)
- ZERO open-source community garden management platforms found
- The prediction's claim of "plenty of platforms" is not supported by evidence

## Searches Used: 4 of 5
