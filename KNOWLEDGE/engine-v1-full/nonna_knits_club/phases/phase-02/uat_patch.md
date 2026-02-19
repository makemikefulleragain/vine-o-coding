# Phase 2 UAT Patch — Accessibility, Trust & Save for Later

**Date:** 2026-02-15
**Trigger:** Second round of UAT feedback from real users

---

## UAT Issues Reported

### 1. Gallery view was not obvious
Users didn't notice the gallery toggle — it was icon-only, too subtle for the target audience (nonnas, older users, less tech-confident).

**Fix:** Replaced icon-only view toggle with clearly labeled buttons: "List" and "Gallery" with both icon + text. Bigger touch targets, clearer active state.

### 2. Broken images destroyed trust
Some Unsplash images didn't load. This immediately made users doubt the site was ready. Broken content = broken trust.

**Fixes:**
- Added `onError` handler on all `<img>` tags — graceful fallback to yarn ball placeholder with "Image couldn't be loaded" message
- Replaced unreliable Unsplash hotlinks with picsum.photos (designed for reliable placeholder images)
- GalleryCard: improved placeholder shows title preview text instead of just an empty card

### 3. Emoji/reactions were underwhelming
Reaction buttons were too small and subtle — easy to miss, especially for older users.

**Fix:** Made reactions bigger (text-lg emoji, px-3 py-1.5 touch targets), added visible text labels (Love, Bravo, Yarn, Star), added background colour on all reaction buttons (not just active ones). Active reactions now have stronger visual ring + shadow.

### 4. Users wanted to save things they liked
Direct quote: "they'd like to find the things they like again or wanted to come back to" — not social media, just a simple way to pin interesting posts.

**Built:**
- 📌 Save button on every PostCard (tap to save, 🔖 shows when saved)
- New **My Saved** page (`/saved`) — shows all pinned posts
- "My Saved" added to main navigation (desktop + mobile)
- Empty state explains what saving does and how to use it
- All saved post IDs stored in localStorage (`nkc_saved`)

---

## Constitutional Change

Added **Principle #7: Accessible by Default** to CONSTITUTION.md:

> The primary users are nonnas and aunties — people who may be older, less tech-confident, or using the site on a phone with reading glasses. Accessibility is not an afterthought or a nice-to-have. It is a basic requirement of every feature.

This codifies the UAT lesson: if a nonna can't figure out how to use a feature within 5 seconds of seeing it, the feature needs redesigning.

---

## Files Changed

- `CONSTITUTION.md` — Added Principle #7 (Accessible by Default), renumbered Ship It to #8
- `Layout.jsx` — Added "My Saved" to nav links
- `PostCard.jsx` — Bigger reactions with labels, image error handling, save button
- `GalleryCard.jsx` — Image error handling, improved placeholder, coloured category badges
- `Board.jsx` — Obvious gallery/list toggle with text labels, save functionality wired through
- `storage.js` — Added saved posts functions (getSavedPostIds, saveSavedPostIds, toggleSavedPost)
- `seedPosts.js` — Replaced Unsplash hotlinks with reliable picsum.photos URLs
- `App.jsx` — Added /saved route
- `Saved.jsx` — New page for viewing saved/pinned posts
