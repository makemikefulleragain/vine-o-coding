# Phase 2 → Phase 3 Transition

**Date:** 2026-02-15

---

## What Phase 2 Delivered

- **Mobile hamburger nav** — responsive menu for phone users
- **Post reactions** — ❤️ 👏 🧶 ⭐ with toggle and counts (localStorage)
- **Feedback widget** — Two-step: emoji quick reaction → optional detailed text. Floating, non-intrusive. Directly requested by UAT users.
- **Gallery view** — Toggle between list/gallery on the Board. Grid layout, image prominence, click-to-expand.
- **Updated seed data** — Reaction counts and Unsplash images on Show & Tell posts
- **Deployed live** at https://nonnas-knitting-circle.netlify.app

---

## Phase 3: Selling via External Platforms

The PHASE_QUEUE.md says Phase 3 is: **"Selling via External Platforms"**

### What Research Should Explore

1. **What platforms do small craft sellers already use?** Etsy, Ko-fi, PayPal.me, Stripe links, Instagram shops?
2. **Legal requirements** — Is linking to external payment different from facilitating payment? What disclaimers are needed?
3. **Trust and transparency** — The constitution emphasises transparent money handling and no one "taking the day's takings." How do we make external payment links feel trustworthy?
4. **What does "available for sale" look like?** A flag on a post? A separate marketplace page? A gallery filter?
5. **The charity/community angle** — The mission mentions profits going to the maker OR to community/local charities. How to represent this without building payment processing?

### Recommended Approach

Keep it simple and constitutional:
- **Add a "For Sale" category** to posts (alongside Show & Tell, Question, Chat)
- **Add optional fields** to posts: price, payment link (Etsy/Ko-fi/PayPal), "proceeds go to" field
- **Add a dedicated "Shop" or "Marketplace" page** that filters For Sale posts
- **Add disclaimers** — "This is not a shop. We connect makers with buyers. All transactions happen on external platforms."
- **Do NOT build payment processing** — link out only

### Open Questions

1. Should there be a separate "Shop" page, or just a filter on the Board?
2. How prominent should pricing be? (Craft community culture often downplays commercial aspects)
3. Should the "proceeds go to" field be required or optional?
4. What UAT feedback will come from Phase 2 features? (Wait for it before finalising Phase 3 scope)
