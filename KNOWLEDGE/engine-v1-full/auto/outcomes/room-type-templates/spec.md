# Spec: room-type-templates

## Acceptance Criteria

1. **Template Selection UI:** User sees a grid of room type options when "creating" a room.
2. **Minimum 4 templates:** General, School P&C, Music/Arts, Volunteer Coordination.
3. **Each template configures:**
   - Layout emphasis (which sections are prominent vs. secondary)
   - Suggested sections (announcements, calendar, chat, files, tasks, etc.)
   - Colour accent
   - Icon
   - Description of what this room type is for
4. **Data-driven:** Templates defined in a JSON config. Adding a new template = adding a JSON object, not code changes.
5. **Room preview:** After selecting a template, shows a preview of what the room will look like.
6. **Test case:** Select "School P&C" → announcements and calendar prominent, chat secondary. Select "Music/Arts" → events and media prominent, artist spotlight section present.
7. **Standalone:** Single-page app, no database.

## Technical Design

### Data Model
```typescript
interface RoomSection {
  id: string;
  label: string;
  icon: string;
  prominence: 'hero' | 'primary' | 'secondary' | 'collapsed';
  description: string;
}

interface RoomTemplate {
  id: string;
  name: string;
  icon: string;
  accent: string; // tailwind color class
  description: string;
  tagline: string;
  sections: RoomSection[];
}
```

### Architecture
- Single `index.html` with embedded React + Tailwind
- JSON template data embedded in the page
- Two-step UI: (1) select template, (2) preview room layout
- Room preview shows sections arranged by prominence
- Responsive design

### Available Sections (pool)
- Announcements, Chat/Discussion, Calendar/Events, Files/Documents, Tasks, Polls, Member Directory, Media Gallery, Links/Resources, Artist Spotlight, Impact Tracker, RSVP Board
