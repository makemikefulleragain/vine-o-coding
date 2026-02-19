# Phase 2 Research — Gallery, Reactions, Feedback & Mobile Nav

**Date:** 2026-02-15
**Searches used:** 5/5
**Signal source:** UAT feedback from real users + web research

---

## UAT Feedback (strongest signal)

Real users tested Phase 1 and reported:
- They **loved it** — the gallery concept, reactions idea, menu items
- They **look forward to being involved** in what comes next
- They specifically asked for: **a way to give quick or detailed feedback depending on how much time they have**

This is gold. Real users validating the plan AND adding a specific, actionable feature request.

---

## Key Findings

### 1. Two-Step Feedback Pattern (Hotjar-style)

The most effective feedback pattern for varying time budgets:
- **Step 1 (Quick):** Emoji reaction — tap one of 3-5 emoji faces (happy, neutral, sad, etc.). Takes <3 seconds.
- **Step 2 (Detailed, optional):** After selecting an emoji, a text field appears asking "Tell us more (optional)". Users with time can elaborate.

**Why this works:**
- Low cognitive load for busy people (Fariha is busy)
- The emoji-first step gets 5-10x more responses than text-only
- Optional text still captures detailed insights from engaged users
- Hotjar, GitHub, and others have validated this pattern extensively

### 2. Post Reactions (Hearts/Appreciation)

Simple emoji reactions on posts — the "social glue":
- Heart is the universal craft community reaction (Ravelry, Instagram)
- Multiple reaction types (❤️ 👏 🧶 ⭐) give more expression
- Counts visible to all — encourages sharing and makes creators feel seen
- localStorage storage: store reaction counts per post ID

### 3. Gallery View for Creations

- Grid layout with image prominence for Show & Tell posts
- Pinterest-style masonry is popular but complex — simple responsive grid is better for Phase 2
- Toggle between list view (current) and gallery view
- Gallery only shows posts with images, or shows all with placeholder for imageless posts

### 4. Mobile Hamburger Navigation

- Standard pattern: hamburger icon (☰) visible on small screens, full nav hidden
- Click toggles a dropdown/slide menu
- React + Tailwind: use state toggle with `md:hidden` / `hidden md:flex` classes
- Smooth transition for open/close

---

## Failure Modes

1. **Feedback fatigue** — Don't make the feedback widget intrusive. It should be accessible but not nagging.
2. **Gallery without images** — Most seed posts have no images. Need to add image URLs or handle gracefully.
3. **Reaction spam** — With localStorage, users can react multiple times. Acceptable for Phase 2 (no auth).
4. **Over-complicating the feedback** — Keep it to 2 steps max. Don't add NPS scores or multi-question surveys.
