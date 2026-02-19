# Triage: notification-preferences

## Find → Connect → Extend → Integrate → Build

### Find
Every major platform (Slack, Discord, Basecamp) has notification preferences. The UX patterns are well-documented. However, no standalone, reusable component exists that implements the specific combination requested: per-room + per-type + per-frequency + visual preview.

### Connect
The Slack model (global defaults + per-channel overrides) is the closest match. The "visual preview" of expected notification volume is a novel addition not found in existing implementations.

### Extend
Could potentially extract patterns from open-source platforms like Mattermost or Rocket.Chat, but their notification settings are deeply integrated into their own systems, not extractable as components.

### Integrate
N/A — no reusable component available.

### Build
**Decision: BUILD.** The patterns are proven and well-documented, but no reusable implementation exists. The visual preview feature is a genuine innovation. Building a standalone component with a Prisma schema for future integration is warranted.

## Triage Result: BUILD
Justification: Proven UX patterns need to be implemented as a kamunity.ai-specific component. The notification volume preview is novel and valuable.
