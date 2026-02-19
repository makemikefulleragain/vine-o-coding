# Phase 5 Research — Polish, UX & Feedback

**Date:** 2026-02-17
**Searches used:** 5/5 (2 from Phase 4 carryover + 3 new — actually used 2 new)

---

## Key Findings

### 1. Visual Alignment with Ecosystem
- **kamunity.ai** — Clean modern SPA, community-focused, room metaphor, pricing cards
- **kamunity.org** — Strong values-led design. "Five rules baked into every line of code": Sovereignty, Accessibility, Joy, Sustainability, Agency. "Joy" = tools should feel good, not grey.
- **vine-o-coding** — Same stack (React + Tailwind + Vite), already has Netlify Forms feedback pattern with emoji reactions + text box

### 2. Netlify Forms
- Built-in form handling — just add a hidden HTML form in index.html and submit via AJAX from React
- Email notifications configurable in Netlify dashboard (Project config > Notifications > Form submissions)
- Free tier: 100 submissions/month — plenty for feedback
- vine-o-coding pattern: hidden form with `name="feedback"`, fields: page, reaction, message

### 3. Contact Pattern
- kamunity.org uses mailto: with explicit privacy note: "Clicking below will open your email app to send a message to mike@kamunityconsulting.com. We don't collect or store any data from this site."
- This is the correct pattern — respects sovereignty, no data collection

### 4. Stock Images
- Unsplash: free, high-quality, credit required ("Photo by [Name] on Unsplash")
- Pexels: free, no attribution required but encouraged
- For toolkit cards: community/nonprofit themed images — meetings, teamwork, data, technology
- Use direct Unsplash URLs to avoid storing images (or download to public/ for reliability)

### 5. Sticky Header Patterns
- CSS `sticky top-0 z-50` with backdrop blur for modern glass effect
- Mobile hamburger: React state toggle, animated menu
- Common in all three reference sites
