# Phase 2 Spec — Gallery, Reactions, Feedback & Mobile Nav

**Date:** 2026-02-15

---

## Acceptance Criteria

### Mobile Hamburger Nav
- [ ] On screens < 768px, nav links collapse behind a hamburger icon (☰)
- [ ] Tapping the icon opens a dropdown/overlay with nav links
- [ ] Tapping a link closes the menu and navigates
- [ ] Tapping the X or outside the menu closes it
- [ ] Full nav still visible on desktop (md+ breakpoints)

### Post Reactions
- [ ] Each post card shows reaction buttons: ❤️ 👏 🧶 ⭐
- [ ] Tapping a reaction increments its count (stored in localStorage)
- [ ] Reaction counts are visible on each post
- [ ] User's own reactions are visually highlighted
- [ ] Seed posts have some pre-set reaction counts

### Site Feedback Widget
- [ ] Floating button in bottom-right corner: "Share Feedback"
- [ ] Step 1: "How are you finding the Knitting Circle?" with 3 emoji options (😊 😐 😟)
- [ ] Step 2: Optional text field — "Tell us more (take your time, or skip!)"
- [ ] Submit stores feedback in localStorage
- [ ] Confirmation message after submit: "Thanks for sharing! 🧶"
- [ ] Can be dismissed at any step
- [ ] Not intrusive — small floating button that expands on click

### Gallery View
- [ ] Toggle button on Board page: "List View" / "Gallery View"
- [ ] Gallery view shows posts in responsive grid (2 cols mobile, 3 cols desktop)
- [ ] Show & Tell posts displayed with image prominence
- [ ] Posts without images get a soft placeholder (yarn ball icon or gradient)
- [ ] Clicking a gallery card shows the full post detail
- [ ] View preference saved in localStorage

---

## Technical Design

### Modified Files
- `Layout.jsx` — Add hamburger menu state, responsive nav
- `PostCard.jsx` — Add reaction buttons and counts
- `Board.jsx` — Add gallery/list view toggle, gallery grid layout
- `storage.js` — Add reaction and feedback storage functions
- `index.css` — Add gallery grid and feedback widget styles
- `seedPosts.js` — Add reaction counts and image URLs to seeds

### New Files
- `components/FeedbackWidget.jsx` — Floating two-step feedback component
- `components/GalleryCard.jsx` — Compact card for gallery grid view
- `App.jsx` — Mount FeedbackWidget globally

### Data Model Changes

**Post (updated)**
```json
{
  "id": "uuid",
  "author": "Display Name",
  "title": "Post Title",
  "body": "Post content...",
  "category": "show-and-tell | question | chat",
  "imageUrl": "",
  "createdAt": "ISO timestamp",
  "reactions": { "heart": 0, "clap": 0, "yarn": 0, "star": 0 }
}
```

**User Reactions (new localStorage key: nkc_user_reactions)**
```json
{
  "post-id": ["heart", "star"]
}
```

**Feedback (new localStorage key: nkc_feedback)**
```json
[
  {
    "id": "fb-uuid",
    "emoji": "happy | neutral | sad",
    "text": "Optional detailed feedback",
    "page": "/board",
    "createdAt": "ISO timestamp"
  }
]
```
