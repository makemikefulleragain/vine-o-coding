# Phase 1 Build Log

**Date:** 2026-02-15
**Build attempts:** 1 (success on first attempt)

---

## What Was Built

### Project Scaffold
- Vite + React 18 + Tailwind CSS project
- React Router for client-side routing
- No backend — all data is localStorage or static JSON

### Pages Implemented

1. **Home (`/`)** — Landing page with hero section, three feature cards (Share & Show, Find Your People, Patterns & Help), and a "What this is" description. Warm, inviting tone.

2. **Community Board (`/board`)** — Post creation form (name, category, title, body, optional image URL). Posts stored in localStorage. Seeded with 5 example posts from diverse characters. Filterable by category (Show & Tell, Questions, Chat).

3. **Group Directory (`/groups`)** — 12 curated real knitting/crochet groups. Searchable by name, description, location, or tag. Filterable by type (Online / In Person). Links open in new tabs.

4. **Resources (`/resources`)** — 10 curated real resources across 3 categories (Patterns, Tutorials, Tools & Supplies). Filterable by category. Links open in new tabs.

### Components
- `Layout` — Header with nav, main content area, footer with privacy notice
- `PostCard` — Renders a single post with category badge and date
- `PostForm` — Expandable form to create a new post
- `GroupCard` — Renders a group with type badge, location, tags
- `ResourceCard` — Renders a resource with category badge

### Design
- **Palette:** Cream background, dusty rose, sage green, warm amber, earth tones
- **Typography:** Georgia for headings (warm, readable), system sans-serif for body
- **Feel:** Cozy yarn shop notice board — not a tech startup

### Data
- `seedPosts.js` — 5 seed posts from diverse characters
- `groups.json` — 12 real knitting/crochet groups (online + in-person)
- `resources.json` — 10 real pattern/tutorial/supply resources

---

## Build Output

```
vite v6.4.1 building for production...
✓ 44 modules transformed.
dist/index.html                   0.62 kB │ gzip:  0.39 kB
dist/assets/index-QOxiDLXR.css   15.29 kB │ gzip:  3.54 kB
dist/assets/index-CMnBc249.js   189.00 kB │ gzip: 61.08 kB
✓ built in 16.50s
```

Build output in `dist/` — ready for Netlify deployment.

---

## What's Missing / Known Limitations

- No image upload (users paste URLs — fine for Phase 1)
- No persistence beyond the browser (localStorage only)
- No delete/edit for posts
- Group directory is static (not user-editable yet)
- No Netlify deployment config yet (needs `_redirects` for SPA routing)
- Mobile nav could be improved with a hamburger menu at small breakpoints
