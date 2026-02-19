# Triage: community-garden-planner

## Decision: BUILD

## Reasoning (Find → Connect → Extend → Integrate → Build)

### Find
- **Community Garden Builders App** — The only dedicated community garden management platform found. Proprietary SaaS, not open source. Covers registration, plot tracking, waitlist, volunteer tracking. Does NOT appear to offer visual plot maps or planting calendars. Based in Vancouver.
- **VegPlotter / GrowVeg / Seedtime** — Individual garden planners with planting calendars and layout tools. Not designed for community coordination (plot allocation, volunteer rosters, member management).
- **Plant-it** — Open source self-hosted plant tracking. Individual diary, not community management.
- **No open-source community garden management platform exists.**

### Connect
The requirements combine two domains that existing tools keep separate:
1. **Community coordination** (plot allocation, volunteer roster, member directory) — partially served by one proprietary SaaS
2. **Garden planning** (planting calendar, seasonal guidance) — served by individual garden planners

No single tool combines both. No open-source tool addresses either domain for community gardens.

### Extend
Could we extend Plant-it (open source, self-hosted) to add community features? Theoretically yes, but Plant-it is a personal plant diary — the architecture would need fundamental changes. Not practical.

### Integrate
No viable integration path. The proprietary SaaS (Community Garden Builders) doesn't offer APIs or self-hosting.

### Build
**Genuine gap confirmed.** A standalone proof-of-concept combining visual plot allocation, planting calendar, volunteer roster, and member directory would address a real need with no adequate existing solution. Scope is appropriate for a single-page app with mock data.

## Prediction Check

**Prediction:** RECOMMEND existing tool — "Plenty of community garden management platforms already exist that solve this perfectly."

**I DISAGREE with this prediction.**

The claim that "plenty of platforms" exist is not supported by evidence:
- I found exactly ONE dedicated community garden management platform (Community Garden Builders App), and it is proprietary SaaS with partial feature coverage
- Individual garden planners (VegPlotter, GrowVeg) don't address community coordination at all
- ZERO open-source options exist in this space
- The word "perfectly" is particularly inaccurate — even the one dedicated tool doesn't cover visual plot maps or planting calendars

This appears to be a deliberately wrong prediction. The evidence clearly supports building.
