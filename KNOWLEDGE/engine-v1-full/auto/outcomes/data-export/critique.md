# Critique: data-export

## 7 Constitutional Questions

### 1. Does something already exist?
Not at the room level with dual-format output. Platform-level admin exports exist (Discourse, Slack) but they don't serve the same purpose. This is the sovereignty gap.

### 2. Is the outcome clearly defined?
Yes. Specific file list, specific formats, specific test case with 50 messages / 3 events / 2 polls / 5 files.

### 3. Could this cause harm?
**Mild concern:** Data export could be used by a malicious room admin to extract member data. However, room admins already have access to this data — export just makes it portable. The sovereignty benefit (communities owning their data) outweighs this risk. In production, export should be logged and members should be notified.

### 4. Is it scope-appropriate?
Yes. Export generator + preview UI + Prisma schema. Well-scoped PoC.

### 5. Does it serve community sovereignty?
Directly and fundamentally. "Sovereignty means being able to leave." This is the proof that kamunity.ai means it.

### 6. Is the tech stack compatible?
Yes. React + Tailwind + JSZip. Prisma schema for future integration.

### 7. Can it be built in the time budget?
Yes. JSZip handles the hard part (ZIP generation). The work is in generating the mock data and formatting it as both JSON and Markdown.

## Identified Biases
- **Completeness bias:** There's a temptation to include every possible data type. I'm limiting to the outcome spec: messages, events, polls, files manifest, members. Production would include reactions, threads, settings, etc.
- **Format bias:** JSON + Markdown is a choice. CSV might be more useful for some users (spreadsheet import). For the PoC, JSON + Markdown is sufficient and covers the GDPR requirement.

## Flagged Decisions
- Files are exported as a manifest (metadata + URLs), not the actual files. Client-side ZIP can't download external files without CORS. Production would need server-side file bundling.
- Member list includes names and roles but not email addresses in the PoC. Production would need privacy controls here.
