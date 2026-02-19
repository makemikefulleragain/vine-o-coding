# Build Log: sovereignty-calculator

## Build Decision
Confidence: 84/100 → BUILD

## What Was Built
A single-page HTML application (`index.html`) with embedded React 18 and Tailwind CSS that:
1. Presents 10 common SaaS tools used by community organisations
2. Lets users select which tools they use and set their member count
3. Calculates and displays three cost dimensions: direct money, lock-in score, data extraction value
4. Shows aggregate sovereignty score as a ring gauge
5. Provides per-tool breakdowns with explanations, alternatives, and data types collected
6. Includes bar chart comparisons for data extraction and lock-in
7. Provides actionable next steps

## Technical Choices
- **Single HTML file** — no build step, no dependencies to install. Open in browser and it works.
- **CDN-loaded React + Tailwind + Babel** — keeps it self-contained while using the target stack's patterns.
- **Hardcoded tool data** — 10 tools with realistic estimates based on public ARPU data and migration assessments.
- **CSS animations** — bar transitions and fade-ins for a polished feel without a chart library.
- **Campfire color theme** — matches kamunity.ai's warm, community-focused aesthetic.

## Data Sources for Estimates
- Google ARPU: ~$60-80/year (ads), higher with workspace data
- Meta ARPU: ~$40-60 globally, $200+ US/AU
- Slack/Salesforce, Canva, Eventbrite: estimated from public financial reports and industry analysis
- Lock-in scores: assessed based on export ease, migration time, alternative availability
- All values clearly labeled as estimates

## Test Case Verification
Selecting Google Workspace, Slack, Canva, Eventbrite, Facebook Groups, WhatsApp with 20 members:
- Direct annual cost: $0 (all free tiers) ✓ (Eventbrite has a small per-user cost but negligible for free events)
- Data extraction value: substantial (Facebook Groups + Google dominate) ✓
- Lock-in: high average (Facebook 9, Google 8, WhatsApp 8, Slack 7) ✓
- Sovereignty score: low (confirming the "free isn't free" thesis) ✓

## What Could Be Improved (Future)
- Real ARPU data from an API or regularly updated dataset
- Custom tool entry (not just preset list)
- PDF export of the analysis
- Integration into kamunity.ai as a page component
- Server-side rendering for SEO

## Build Status: COMPLETE
