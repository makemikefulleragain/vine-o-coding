# Phase 1 Spec — Community Board + Group Finder

**Date:** 2026-02-15

---

## Acceptance Criteria

### Landing Page
- [ ] Visitor understands what the site is within 30 seconds
- [ ] Warm, cozy visual design (yarn/craft colors, not corporate)
- [ ] Clear navigation to Board, Groups, Resources
- [ ] Works on mobile and desktop
- [ ] No tracking, no cookies beyond localStorage

### Community Board
- [ ] User can create a post with: display name, title, body text, category (Show & Tell / Question / Chat), optional image URL
- [ ] Posts are stored in localStorage
- [ ] Posts display in reverse chronological order
- [ ] Posts can be filtered by category
- [ ] Seeded with 3-5 example posts
- [ ] No account required

### Group Directory
- [ ] Searchable/filterable list of knitting & crochet groups
- [ ] Each group entry: name, description, type (online/in-person), location, link
- [ ] Filter by: type (online/in-person), search by name/description
- [ ] Seeded with 10-15 real groups
- [ ] Static data (JSON), editable for future phases

### Resource Hub
- [ ] Curated list of external resources organized by category
- [ ] Categories: Free Patterns, Video Tutorials, Communities, Tools & Supplies
- [ ] Each resource: name, description, URL, category
- [ ] Seeded with 8-10 real resources

---

## Technical Design

### Stack
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for client-side routing
- **localStorage** for community board posts
- **Static JSON** for groups and resources data

### Project Structure
```
src/
  components/
    Layout.jsx          — Header, nav, footer wrapper
    PostCard.jsx        — Single community board post
    PostForm.jsx        — Form to create a new post
    GroupCard.jsx       — Single group directory entry
    ResourceCard.jsx    — Single resource link
  pages/
    Home.jsx            — Landing page
    Board.jsx           — Community board
    Groups.jsx          — Group directory
    Resources.jsx       — Resource hub
  data/
    seedPosts.js        — Initial community board posts
    groups.json         — Group directory data
    resources.json      — Resource links data
  utils/
    storage.js          — localStorage helpers
  App.jsx               — Router setup
  main.jsx              — Entry point
  index.css             — Tailwind imports + custom styles
```

### Routing
- `/` — Home (landing page)
- `/board` — Community Board
- `/groups` — Group Directory
- `/resources` — Resource Hub

### Data Model

**Post (localStorage)**
```json
{
  "id": "uuid",
  "author": "Display Name",
  "title": "Post Title",
  "body": "Post content...",
  "category": "show-and-tell | question | chat",
  "imageUrl": "",
  "createdAt": "ISO timestamp"
}
```

**Group (static JSON)**
```json
{
  "id": "1",
  "name": "Group Name",
  "description": "What this group is about",
  "type": "online | in-person",
  "location": "City, Country or 'Online'",
  "url": "https://...",
  "tags": ["knitting", "crochet"]
}
```

**Resource (static JSON)**
```json
{
  "id": "1",
  "name": "Resource Name",
  "description": "What you'll find here",
  "url": "https://...",
  "category": "patterns | tutorials | communities | supplies"
}
```

### Visual Design Direction
- **Palette:** Warm — soft cream/ivory background, dusty rose, sage green, warm amber accents
- **Typography:** Friendly, readable serif for headings, clean sans-serif for body
- **Feel:** Like a cozy yarn shop notice board, not a tech startup
- **Icons:** Minimal, craft-related where appropriate (yarn ball, needles, heart)
- **No dark patterns, no urgency, no attention-hijacking**

### Accessibility
- Semantic HTML
- Sufficient color contrast
- Keyboard navigable
- Screen reader friendly labels
- No motion/animation that could trigger vestibular issues

### Privacy
- All data stays in the user's browser (localStorage)
- No external API calls
- No tracking or analytics
- No cookies
