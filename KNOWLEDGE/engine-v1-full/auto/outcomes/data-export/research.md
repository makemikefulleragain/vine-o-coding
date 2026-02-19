# Research: data-export

**Searches used:** 3 of 5

## Search 1: Data portability standards (GDPR Article 20, Data Transfer Project)
**Finding:**
- **GDPR Article 20** — establishes the right to data portability: data must be provided in "a structured, commonly used and machine-readable format." JSON and CSV qualify. The right also includes direct transfer to another controller.
- **Data Transfer Project** (by Google, Apple, Facebook, Microsoft, Twitter) — defines standard data models for transferring data between platforms. Categories include: social posts, photos, calendar, contacts, mail. Uses JSON as the interchange format.
- **Key principle:** Portability means both machine-readable (JSON for reimport) AND human-readable (so people can understand their data without tools).

## Search 2: Discourse/Slack/Discord data export
**Finding:**
- **Discourse** — has admin-level data export (CSV of users, posts, etc.). No user-initiated room/category export. Community members have asked for this and it doesn't exist well.
- **Slack** — workspace-level export for admins (JSON). Per-channel export not available to regular users. Free tier loses messages after 90 days — your data just vanishes.
- **Discord** — NO server-level export. Only personal data takeout (GDPR request). Community content is effectively trapped. This is a major sovereignty failure.
- **None of these platforms** provide the room-level, user-initiated, human-readable export described in the outcome.

## Search 3: Client-side ZIP generation
**Finding:**
- **JSZip** — mature, well-maintained library for client-side ZIP generation. Works in all modern browsers. Can be loaded via CDN. This is the standard approach for browser-based file downloads.
- **client-zip** — newer, faster alternative. But JSZip is more widely used and documented.
- **Approach:** Generate JSON + Markdown files in memory, add to JSZip archive, trigger download. No server needed for the PoC.

## Summary
- **GDPR Article 20 establishes the legal framework** — data must be portable in structured, machine-readable format.
- **No existing platform does room-level export well.** Discourse has admin exports, Slack has workspace exports, Discord has nothing useful. Room-level, user-initiated export is a gap.
- **The dual-format approach (JSON + Markdown) is sound** — JSON for machine portability, Markdown for human readability. This exceeds GDPR requirements.
- **JSZip enables fully client-side implementation** — no server needed for the PoC.
- **Build is warranted.** This fills a real gap and directly serves data sovereignty.
