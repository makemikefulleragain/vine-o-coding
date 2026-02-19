# Critique: notification-preferences

## 7 Constitutional Questions

### 1. Does something already exist?
Yes, in integrated form (Slack, Discord, Basecamp). No, as a standalone reusable component. The visual preview feature is novel.

### 2. Is the outcome clearly defined?
Yes. Three control dimensions (room, type, frequency) plus a visual preview. Clear test case.

### 3. Could this cause harm?
No. This is a user-empowerment tool — giving people control over their attention. No surveillance, no data extraction.

### 4. Is it scope-appropriate?
Yes. Preferences panel + preview + Prisma schema. Focused scope.

### 5. Does it serve community sovereignty?
Yes — attention sovereignty. Members controlling their notification experience is a form of self-determination.

### 6. Is the tech stack compatible?
Yes. React + Tailwind + Prisma schema.

### 7. Can it be built in the time budget?
Yes. The notification volume calculation is the most complex part, and it's straightforward arithmetic.

## Identified Biases
- **Optimism bias on preview accuracy:** The "estimated notifications per week" depends on mock activity data. Real-world accuracy would require actual usage data. The preview is illustrative, not predictive.
- **Complexity bias:** Three dimensions of control might be overwhelming for non-technical users. Slack solves this by having simple per-channel toggles with advanced settings hidden. I'll follow this pattern — simple defaults, expandable detail.

## Flagged Decisions
- Mock activity data is based on typical community platform usage patterns (e.g., 15 chat messages/day in an active room, 2 events/week, 1 poll/week).
- The preview calculation uses a simplified model — real implementation would need historical data.
