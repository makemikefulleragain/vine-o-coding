# Build Log: community-garden-planner

## Build Decision
Built because no open-source community garden management tool exists. The one proprietary SaaS (Community Garden Builders) is incomplete and not self-hosted. This fills a genuine gap.

## What Was Built
Single-page HTML app with 4 tabbed views:
1. **Plot Map** — 5×4 grid, click-to-assign/unassign, visual status
2. **Planting Calendar** — Australian seasons, crop recommendations with icons
3. **Watering Roster** — Editable weekly schedule with volunteer dropdowns
4. **Member Directory** — Searchable list, CSV export

## Technical Choices
- Single HTML file for maximum portability (no build step)
- React 18 + Tailwind via CDN for modern UI without complexity
- localStorage for persistence without a backend
- Mock data that demonstrates real-world use cases

## Lines of Code
~250 lines (under 500 limit)

## Testing
- File can be opened directly in browser
- All 4 tabs render correctly
- Plot assignment/unassignment works
- Season switching works
- Roster editing works
- CSV export generates valid file
- localStorage persistence confirmed

## Prediction Outcome
**Prediction said RECOMMEND; engine decided BUILD.**
Disagreement based on evidence: no adequate existing tool found. The prediction's claim of "plenty of platforms" was not supported by research.
