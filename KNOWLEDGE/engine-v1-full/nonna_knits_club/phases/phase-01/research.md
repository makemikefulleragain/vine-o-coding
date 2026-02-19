# Phase 1 Research — Community Board + Group Finder

**Date:** 2026-02-15
**Searches used:** 5/5

---

## Research Question

What do real crafters (knitters, crocheters, makers) need from a simple community space that lets them post about their creations, ask questions, and find local groups and pattern resources?

---

## Key Findings

### 1. Finding in-person groups is a major pain point

- Reddit threads consistently show crafters struggling to find local groups
- Current options are fragmented: Meetup, Facebook groups, local yarn shop bulletin boards, Ravelry groups, guild directories (TKGA, Lion Brand search tool)
- No single simple place to search across these sources
- Fariha's profile matches this exactly: "busy, finds it difficult to go to groups, especially not really knowing anything about them before, and because there are lots of them, where to start?"

### 2. Ravelry dominates but is complex

- 9M registered users, ~1M monthly active
- Three capability spaces: Labor (project tracking), Social (forums/groups), Marketplace (pattern sales)
- Community-edited database of patterns and yarns is its core strength
- Has had accessibility controversies with redesigns
- **Key insight:** Ravelry is powerful but overwhelming. Many crafters use it only for specific features (pattern search, project logging) and socialize elsewhere (Facebook, Reddit, Instagram)

### 3. Crafters share creations across fragmented platforms

- Instagram for photos of finished items
- Facebook groups for discussion and show-and-tell
- Ravelry for project documentation
- Reddit for questions and advice
- YouTube for tutorials and patterns
- **Key insight:** There's no simple, cozy "community board" that combines show-and-tell + questions + local connections without being a full social media platform

### 4. What crafters actually do in community spaces

- Show finished projects ("FO" = finished object)
- Share works-in-progress ("WIP")
- Ask technique questions ("how do I fix this dropped stitch?")
- Share pattern recommendations and links
- Organize meet-ups and knit-alongs
- Gossip and chat (the social glue that holds it all together)

### 5. The gap this project fills

- **Not Ravelry:** Too complex, too big, overwhelming for casual users
- **Not Facebook:** Privacy concerns, algorithmic feed, ads, tracking
- **Not Etsy:** Commercial, fees, not community-oriented
- **This project:** A warm, simple, local-feeling space where you can share what you made, ask a question, and find people and groups near you. Like a community notice board at a yarn shop — but online.

---

## Existing Tools to Integrate With (Not Replace)

| Tool | What it does well | Our relationship |
|------|------------------|-----------------|
| Ravelry | Pattern database, project tracking | Link to patterns there, don't rebuild |
| Meetup | Event discovery | Link to groups there |
| YouTube | Video tutorials | Embed/link tutorials |
| Instagram | Photo sharing | Link to makers' Instagram |
| Google Maps | Location finding | Use for group location display |

---

## Failure Modes to Watch

1. **Building too much too soon** — Ravelry took years. Phase 1 must be tiny and useful.
2. **Empty community problem** — A board with no posts is sad. Need seed content.
3. **Over-engineering the tech** — localStorage is fine for now. Don't build auth or databases yet.
4. **Losing the warmth** — This isn't a tech platform. It should feel like walking into a yarn shop.
5. **Ignoring accessibility** — Ravelry's redesign controversy shows this matters. Keep it simple and readable.

---

## Who This Is NOT For (Defining the boundary)

- Professional yarn retailers (they have Shopify)
- Large-scale pattern publishers (they have Ravelry/their own sites)
- People looking for a full social media replacement
- Tech-savvy makers who want project management tools (Ravelry exists)

**This IS for:** Fariha and people like her — busy, creative, wanting to connect with local crafters, share what they've made, find patterns and groups, without navigating complex platforms.
