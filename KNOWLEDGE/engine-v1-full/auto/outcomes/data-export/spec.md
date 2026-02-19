# Spec: data-export

## Acceptance Criteria

1. **Export button** on a room settings page
2. **Exports include:** room metadata, messages/posts, events, polls, files manifest, member list
3. **Dual format:** JSON (structured, machine-readable) + Markdown (human-readable, printable)
4. **ZIP download:** All files bundled in a single ZIP
5. **Test case:** Room with mock data (50 messages, 3 events, 2 polls, 5 files) → ZIP contains: room.json, room.md, messages.json, messages.md, events.json, events.md, polls.json, polls.md, files_manifest.json, members.json
6. **Prisma schema** showing what data is exported
7. **Client-side only** — no server needed for the PoC

## Technical Design

### Export Contents
```
export.zip/
├── room.json          # Room metadata (name, description, created, member count)
├── room.md            # Human-readable room summary
├── messages.json      # All messages with author, timestamp, content, reactions
├── messages.md        # Human-readable message log
├── events.json        # All events with date, location, attendees
├── events.md          # Human-readable event list
├── polls.json         # All polls with options and results
├── polls.md           # Human-readable poll results
├── files_manifest.json # File metadata (name, type, size, upload date, URL)
├── members.json       # Member list (name, role, joined date)
└── README.md          # Explains what this export contains and how to use it
```

### Architecture
- Single `index.html` with React + Tailwind + JSZip (CDN)
- Mock room data embedded in the page
- "Export" button triggers ZIP generation in-browser
- Progress indicator during generation
- Preview of what will be exported before downloading
- Prisma schema as separate file
