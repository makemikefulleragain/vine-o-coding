# Research: community-noticeboard

## Search 1: "digital community noticeboard software local area notices events offers open source"
### Findings:
- **Yodeck / ScreenCloud** — Digital signage software for physical display screens. Wrong category — these display content on TVs/monitors, not user-posting platforms.
- **phpBB** — Free open source forum software. Discussion forum model, not structured noticeboard. Self-hosted.
- **Flarum** — Modern open source forum software. Discussion-focused, not noticeboard.
- No open-source community noticeboard software found.

## Search 2: "Nextdoor alternative open source local community board neighbourhood app self-hosted"
### Findings:
- **Nextdoor** — Commercial neighbourhood social network. US-centric, requires accounts, extensive data collection, advertising. Proprietary. NOT open source.
- **AlternativeTo** lists 18+ Nextdoor alternatives — all proprietary apps (ZINGR, Nearlist, etc.)
- **HyperlocalCloud** — Markets itself as "Nextdoor Clone" / "open-source" but is actually a commercial white-label product
- No genuine open-source Nextdoor alternative found

## Search 3: "open source community bulletin board local notices classifieds self-hosted Discourse"
### Findings:
- **Discourse** — 100% open source community platform, self-hosted. Discussion forum model. Could be configured with categories, but missing: auto-expiry, no-account posting, location tagging, structured notice fields.
- **phpBB** — Confirmed as forum, not noticeboard
- **barrygilreath3/community-bulletin-board** (GitHub) — Found a repo titled "community bulletin board" but with empty description. Likely small/experimental project, not production-ready.
- **PBBoard** — Open source forum software with classifieds. Forum-first, not noticeboard-first.

## Gap Analysis: Do existing tools match requirements?

| Requirement | Facebook Groups | Nextdoor | Discourse (OSS) | Purpose-Built OSS |
|---|---|---|---|---|
| Post notices with title, desc, category, expiry | Partial (no category structure, no expiry) | Partial (no structured categories) | Partial (categories yes, no expiry) | ❌ None exists |
| Browse by category (Event, Offer, Request, etc.) | ❌ Flat feed | ❌ Flat feed | ✅ Categories | ❌ |
| Auto-expire after date | ❌ | ❌ | ❌ | ❌ |
| No accounts needed to view | ❌ Requires login | ❌ Requires login | ✅ Configurable | ❌ |
| Simple name/email to post (no account) | ❌ Requires account | ❌ Requires account | ❌ Requires account | ❌ |
| Location-tagged (suburb/area) | ❌ | ✅ Neighbourhood-based | ❌ | ❌ |
| Self-hosted / data sovereignty | ❌ Meta servers | ❌ Nextdoor servers | ✅ Self-hosted | ❌ |
| No surveillance/ad targeting | ❌ Core business model | ❌ Ad-supported | ✅ No ads | ❌ |

## Key Observations

1. **Facebook Groups and Nextdoor functionally serve as community noticeboards** — millions of people use them this way. This is a real, practical fact.
2. **Both are surveillance capitalism platforms** — requiring accounts means accepting extensive data collection. This directly conflicts with community sovereignty.
3. **Discourse is the closest open-source option** but is a full discussion forum platform. Missing: auto-expiry, no-account posting, structured notice types. Significant configuration would be needed.
4. **No purpose-built open-source community noticeboard exists.**
5. **The gap is real but nuanced** — the functionality exists on corporate platforms, but not in a sovereignty-respecting form.

## Searches Used: 3 of 5
