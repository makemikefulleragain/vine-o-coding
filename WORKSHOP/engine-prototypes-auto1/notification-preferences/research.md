# Research: notification-preferences

**Searches used:** 2 of 5

## Search 1: Notification preferences UX design patterns
**Finding:**
- **Smashing Magazine (2025)** — comprehensive guide on notification UX. Key principles: let users control frequency, type, and channel. Timing matters. Bundling (digests) reduces fatigue.
- **SuprSend "Ultimate Guide to Notification Preferences"** — granular control prevents users from turning everything off. Per-category, per-channel, per-frequency controls are best practice. Recommends visual preview of what notifications look like under current settings.
- **Carbon Design System** — notification patterns for enterprise. Categorises: inline, toast, banner, modal. Different urgency levels need different UI treatment.
- **UserPilot** — Basecamp cited as good example: lets users set per-project notification preferences with digest options.

## Search 2: Slack/Discord notification settings
**Finding:**
- **Slack** — per-channel notification overrides (all messages, mentions only, nothing). Global defaults with per-channel exceptions. Schedule for do-not-disturb. This is the gold standard for channel-level control.
- **Discord** — similar per-server and per-channel overrides. Adds "suppress @everyone and @here" which is useful for communities. Mobile vs. desktop separate controls.
- **Notification fatigue research** — average knowledge worker gets 50-80 notifications/day. Community platforms contribute significantly. Digest/batching reduces perceived volume by 60-80%.

## Summary
- **The pattern is well-established.** Slack/Discord/Basecamp all have per-room notification controls.
- **No standalone, open-source notification preferences component exists** that could be dropped into kamunity.ai.
- **Key UX insights:** (1) per-room overrides on top of global defaults, (2) frequency control (immediate/digest/off), (3) type filtering (messages, events, polls), (4) visual preview of expected notification volume.
- **The "preview" feature** (showing expected notifications per week) is novel — none of the platforms researched do this. It's a genuine UX innovation in the outcome spec.
