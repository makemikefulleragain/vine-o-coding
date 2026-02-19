# Recommendation: community-survey-tool

## Summary
Do not build a survey tool. Multiple mature, open-source, self-hosted survey platforms already exist that meet every stated requirement. Building from scratch would produce an inferior result.

## Recommended Tools

### Primary Recommendation: Formbricks
- **What:** Open-source survey platform (AGPLv3), self-hosted via Docker
- **Website:** https://formbricks.com
- **GitHub:** https://github.com/formbricks/formbricks
- **Why:** Modern UX, easy self-hosting (single Docker command), unlimited surveys and responses, link surveys, analytics dashboard, CSV export, GDPR-compliant, actively maintained in 2026
- **Cost:** Free (self-hosted). Cloud plan also available.
- **Best for:** Community orgs wanting a modern, easy-to-use survey tool with full data sovereignty
- **Setup:** Docker single-click deployment or cloud signup

### Alternative: LimeSurvey
- **What:** Open-source survey platform (GPL), self-hosted
- **Website:** https://www.limesurvey.org
- **GitHub:** https://github.com/LimeSurvey/LimeSurvey
- **Why:** 15+ years mature, extensive question types, multilingual, advanced logic, templates, comprehensive analytics, CSV export. Used by nonprofits, universities, and governments worldwide.
- **Cost:** Free (self-hosted). Hosted plans from ~€29/month.
- **Best for:** Organisations needing advanced survey features, complex logic, or academic-grade surveying
- **Trade-off:** UI is dated compared to Formbricks

### Also Considered
- **OpnForm** — Open source, good features, but still in beta
- **SurveyJS** — JavaScript library; requires developer skills to implement
- **Typebot** — Conversational forms only; not suitable for traditional surveys

## Requirement Coverage

| Requirement | Formbricks | LimeSurvey |
|---|---|---|
| Multiple question types (text, MC, rating, yes/no) | ✅ | ✅ |
| Share via link | ✅ | ✅ |
| Collect responses | ✅ | ✅ |
| View results with basic charts | ✅ | ✅ |
| Export results as CSV | ✅ | ✅ |
| Standalone / self-hosted | ✅ Docker | ✅ PHP/MySQL |
| Data sovereignty | ✅ Self-hosted | ✅ Self-hosted |

## Adoption Path
1. **Quick start:** Sign up for Formbricks Cloud (free tier) to evaluate
2. **Self-host:** Deploy Formbricks via Docker on any VPS ($5-10/month hosting)
3. **If advanced needs emerge:** Consider LimeSurvey for multilingual or complex survey logic
4. **Training:** Both tools have documentation suitable for non-technical users

## Gaps
- Neither tool is specifically designed for Australian community organisations, but both are fully functional for this use case
- Self-hosting requires some technical setup (Docker or PHP), though Formbricks Cloud eliminates this
- No built-in integration with Australian grant reporting frameworks (but this wasn't a stated requirement)

## Why Not Build?
Building a survey tool in a single session would produce something with:
- Fewer question types than LimeSurvey or Formbricks
- No template library
- No multilingual support
- Less tested security
- No ongoing maintenance
- Mock data only (no real persistence without infrastructure)

The community would be better served by tools with years of development, active communities, and proven reliability.
