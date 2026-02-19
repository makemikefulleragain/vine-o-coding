# Recommendation: volunteer-hour-tracker

## Summary
Do not build a volunteer hour tracker. Multiple free, mature tools already exist that meet every stated requirement. Building from scratch would produce something inferior to what's available today at no cost.

## Recommended Tools

### Primary Recommendation: Track It Forward
- **What:** Free volunteer hour logging platform, purpose-built for this exact use case
- **Website:** https://www.trackitforward.com
- **Why:** Designed specifically for volunteer hour tracking. Easy for volunteers to log hours from anywhere. Generates reports. **Used by Australian nonprofits** — testimonial from Australian Children's Education Charity: "For the first time, we feel confident that all the amazing work our volunteers do is being captured and reported on correctly and efficiently."
- **Cost:** Free tier available
- **Best for:** Community organisations wanting a simple, volunteer-friendly hour logging system with reporting

### Alternative 1: Jibble
- **What:** 100% free volunteer hours tracking software, unlimited users
- **Website:** https://www.jibble.io/volunteer-hours-tracking
- **Why:** Completely free forever with unlimited users. Multi-device support. Reports and attendance tracking. Explicitly built for nonprofits: "We made Jibble free because nonprofits and volunteer teams deserve powerful tools—without the price tag."
- **Cost:** 100% free (no paid tier required)
- **Best for:** Organisations wanting a zero-cost solution with no user limits

### Alternative 2: Clockify
- **What:** Free time tracker with nonprofit and volunteer focus
- **Website:** https://clockify.me/nonprofit-time-tracking
- **Why:** Reports break down time by project and person. Export as PDF, CSV, and Excel. Good for grant acquittal reporting.
- **Cost:** Free
- **Best for:** Organisations that also need project-based time tracking

### Also Considered
- **POINT** (pointapp.org) — All-in-one volunteer management with impact tracking. More comprehensive than needed.
- **YourVolunteers** — Free scheduling, management, and tracking. Good if scheduling is also needed.
- **Timecounts** — Modern volunteer management solution. More than just hour tracking.

## Requirement Coverage

| Requirement | Track It Forward | Jibble | Clockify |
|---|---|---|---|
| Volunteers log hours (date, duration, activity, org) | ✅ | ✅ | ✅ |
| Aggregate by volunteer, activity, time period | ✅ | ✅ | ✅ |
| Reports for grant acquittals | ✅ | ✅ | ✅ |
| Export CSV or PDF | ✅ | ✅ | ✅ PDF/CSV/Excel |
| Simple for non-technical coordinators | ✅ "User-friendly first" | ✅ Easy setup | ✅ |
| Web-based | ✅ | ✅ | ✅ |
| Free | ✅ | ✅ 100% free | ✅ |

## Adoption Path
1. **Quick start:** Sign up for Track It Forward or Jibble (both free, takes minutes)
2. **Set up activities:** Define your volunteer activities/projects
3. **Invite volunteers:** Share the signup link with your volunteer team
4. **Start logging:** Volunteers log hours after each session
5. **Generate reports:** Pull reports for grant acquittals as needed

## Gaps
- All recommended tools are SaaS (not self-hosted) — data lives on their servers. For most community organisations, this is acceptable given the tools are free and purpose-built. If self-hosting is critical, Clockify has a self-hosted enterprise option (paid).
- Free tiers may have some feature limitations not visible from marketing pages — worth checking during evaluation.
- No tool is specifically Australian, but Track It Forward is proven with Australian nonprofits.

## Why Not Build?
Building a volunteer hour tracker when Track It Forward and Jibble exist would produce:
- No multi-device support (localStorage only)
- No real volunteer accounts or login
- No mobile app
- No ongoing maintenance
- Mock data only — not usable for real tracking
- Less capable than tools with years of development

The community would be immediately better served by adopting an existing free tool today.
