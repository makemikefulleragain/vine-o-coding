# Build Log: community-noticeboard

## Build Decision
Built because no open-source community noticeboard exists. Facebook Groups and Nextdoor serve the function but are surveillance platforms that conflict with community sovereignty. Discourse (open source) is a heavyweight forum, not a simple noticeboard. The build fills a genuine gap.

## What Was Built
Single-page HTML app with:
1. **Notice feed** — Expandable cards showing title, category, area, description, poster
2. **Category filtering** — Buttons for Event, Offer, Request, Lost & Found, General with counts
3. **Search** — Keyword search across title, description, area
4. **Post form** — Modal with title, description, category, area, name, email, expiry
5. **Auto-expiry** — Notices past expiry date hidden by default, toggle to show
6. **Sample data** — 8 realistic notices across all categories

## Technical Choices
- Single HTML file for portability
- React 18 + Tailwind via CDN
- localStorage for persistence
- Warm amber colour scheme to evoke physical cork noticeboards
- Expandable cards to keep the feed scannable

## Lines of Code
~280 lines (under 500 limit)

## Known Limitations
- Data is local to one browser (no shared noticeboard without backend)
- No moderation tools
- No image uploads
- Production would need backend for shared community access

## Prediction Outcome
**Prediction said RECOMMEND (Facebook/Nextdoor); engine decided BUILD.**
Disagreement based on evidence: Facebook/Nextdoor are surveillance platforms conflicting with community sovereignty. No open-source noticeboard exists. Requirements (auto-expiry, no-account viewing, structured categories) aren't met by existing platforms.
