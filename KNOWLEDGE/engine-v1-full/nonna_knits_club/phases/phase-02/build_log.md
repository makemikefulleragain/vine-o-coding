# Phase 2 Build Log

**Date:** 2026-02-15
**Build attempts:** 1 (success on first attempt)

---

## What Was Built

### 1. Mobile Hamburger Navigation
- **File:** `Layout.jsx`
- Hamburger icon (☰) visible on screens < 768px (md breakpoint)
- X icon to close, dropdown menu with all nav links
- Auto-closes on route change
- Full desktop nav unchanged
- Accessible: `aria-label`, `aria-expanded`

### 2. Post Reactions
- **Files:** `PostCard.jsx`, `Board.jsx`, `storage.js`, `seedPosts.js`
- Four reaction types: ❤️ Love, 👏 Applause, 🧶 Yarn, ⭐ Star
- Reactions toggle on/off per user (tracked in `nkc_user_reactions` localStorage key)
- Active reactions visually highlighted with rose tint + ring
- Counts displayed next to each emoji
- Seed posts updated with pre-set reaction counts
- New posts get zeroed reaction counts

### 3. Site Feedback Widget (UAT-requested)
- **File:** `FeedbackWidget.jsx` (new), mounted globally in `App.jsx`
- Floating "💬 Feedback" button in bottom-right corner
- **Step 1 (Quick):** Three emoji options — 😊 Loving it, 😐 It's okay, 😟 Not great
- **Step 2 (Detailed, optional):** Text field — "Tell us more (take your time, or skip!)"
- Submit stores to `nkc_feedback` localStorage key with emoji, text, page, timestamp
- Confirmation: "Thanks for sharing! 🧶" with auto-close after 2s
- Can be dismissed at any step
- Small on mobile (emoji only), label visible on desktop

### 4. Gallery View
- **Files:** `Board.jsx`, `GalleryCard.jsx` (new)
- Toggle between list and gallery view (icons in toolbar)
- Gallery: 2-column grid on mobile, 3-column on desktop
- Image-prominent cards with category badge overlay
- Yarn ball placeholder for posts without images
- Click gallery card → expands to full PostCard with reactions
- "← Back to gallery" to return
- View preference saved in localStorage

### 5. Updated Seed Data
- `seedPosts.js` — Added reaction counts to all 5 seed posts
- Added Unsplash image URLs to 2 Show & Tell posts (Fariha's scarf, Deepa's baby hats)

---

## Build Output

```
vite v6.4.1 building for production...
✓ 46 modules transformed.
dist/index.html                   0.62 kB │ gzip:  0.39 kB
dist/assets/index-CCHTKQ7B.css   18.88 kB │ gzip:  4.17 kB
dist/assets/index-D1Fkqr8j.js   199.09 kB │ gzip: 63.56 kB
✓ built in 5.16s
```

Deployed to https://nonnas-knitting-circle.netlify.app

---

## Known Limitations

- Reactions are localStorage-only — no shared counts between users
- Feedback stored in localStorage — only visible to the person who submitted it (no dashboard yet)
- Gallery images use Unsplash hotlinks — should use own images in future
- No animation on hamburger menu open/close (functional but instant)
- Existing localStorage data from Phase 1 won't have reaction counts (handled with fallback defaults)
