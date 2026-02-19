# Spec: notification-preferences

## Acceptance Criteria

1. **Per-room controls:** Each room has a toggle: Muted / Normal / Priority
2. **Per-type controls:** Global settings for notification types: Chat messages, Events, Polls, File uploads, Announcements
3. **Per-frequency controls:** Each type can be set to: Immediate / Daily Digest / Weekly Digest / Off
4. **Visual preview:** Shows estimated notifications per day/week based on current settings and mock activity data
5. **Test case:** Mute Room A, set Room B to priority, set events to "immediate" and chat to "daily digest" → preview shows ~3 notifications/day instead of ~47
6. **Prisma schema:** Included for the notification preferences data model
7. **Standalone:** Single-page app with mock room data

## Technical Design

### Data Model
```typescript
interface Room {
  id: string;
  name: string;
  icon: string;
  avgDailyActivity: { chat: number; events: number; polls: number; files: number; announcements: number; };
}

interface RoomPreference {
  roomId: string;
  level: 'muted' | 'normal' | 'priority';
}

interface TypePreference {
  type: 'chat' | 'events' | 'polls' | 'files' | 'announcements';
  frequency: 'immediate' | 'daily' | 'weekly' | 'off';
}
```

### Notification Volume Calculation
For each room × type combination:
- If room is muted → 0 notifications
- If type is off → 0 notifications
- If type is immediate → raw count
- If type is daily digest → 1 per day (if any activity)
- If type is weekly digest → 1 per week (if any activity)
- If room is priority → notifications marked as priority (counts same, urgency different)

Preview = sum of all active room × type notifications under current settings

### Architecture
- Single `index.html` with React + Tailwind
- Mock data for 5 rooms with realistic activity levels
- Prisma schema as a separate file
- Two panels: settings (left) and preview (right)
