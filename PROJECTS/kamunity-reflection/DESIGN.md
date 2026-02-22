# DESIGN.md — Kamunity Reflection
## Architectural Record — Phase 1

*This is a record of design decisions, not a specification to be followed blindly. Evidence changes the design.*

---

## Interface Philosophy

The interface must be the thing, not describe the thing. A user should be able to feel what Kamunity Reflection is by using it for 30 seconds — without reading any copy about it.

Core principles:
- **No visible boxes** — the Kai orb is not in a container. Text floats. Cards appear. Nothing looks like a form.
- **Stop anytime** — the UI communicates this by never forcing a next step. Input is always available.
- **What you have is yours** — backpack is always accessible, even mid-conversation.

---

## Layout

### Desktop (md+)
Split screen, left/right, 55/45:
- **Left — Kai side**: parchment bg, Kai orb centred, text output floating above input, input anchored to bottom
- **Right — Cards side**: presentation cards stack from top, backpack toggle at bottom

### Mobile
Stack, top/bottom, 50/50 (uses `100dvh` to avoid browser chrome issues):
- **Top — Kai side**: orb smaller, text output, input
- **Bottom — Cards side**: horizontal scroll or vertical stack of cards

Keyboard behaviour: input uses `position: fixed` bottom on mobile to avoid viewport jumping when keyboard opens.

---

## Colour Palette (Parchment)

| Token | Hex | Use |
|---|---|---|
| `--parchment` | `#F7F0E2` | Background |
| `--bark` | `#4A3728` | Primary text |
| `--ember` | `#C4622D` | Warm accent, CTA |
| `--sky` | `#2B6CB0` | Cool accent, links |
| `--tan` | `#D4C5A9` | Borders, dividers |
| `--moss` | `#7A8C6E` | Secondary text, labels |
| `--gold` | `#C9A84C` | Earworm highlights |

---

## Kai Orb

A circle with no hard edge. Centre is solid colour. Edge fades to transparent via radial gradient. Glows.

**Idle state (ember warmth):**
```
radial-gradient: #F4A460 (centre) → #C4622D (mid) → transparent (edge)
glow: box-shadow ember at 0.3 opacity
animation: gentle pulse (scale 0.98→1.02, 4s ease-in-out, infinite)
```

**Thinking state:**
```
same colours, faster pulse (1.5s), slight desaturation
```

**Speaking state (blue/indigo):**
```
radial-gradient: #90CDF4 (centre) → #4299E1 (mid) → #2B4CC8 (outer) → transparent
glow: box-shadow blue at 0.3 opacity
animation: ripple pulse (scale 1.0→1.05, 2s)
```

**Reduced motion:** Static orb, colour change only, no animation. Respects `prefers-reduced-motion`.

---

## Text Input

- Default height: 3 rows (`min-height: calc(3 * 1.5rem + padding)`)
- Grows 1 row at a time to max 6 rows
- After 6 rows: scrolls internally (user sees last 6 rows)
- Expand toggle: opens a larger modal-style input for longer text
- Mic button: Web Speech API (browser-native, no cost, gracefully disabled if unsupported)
- Submit: Return key (Shift+Return for newline) or send button
- On send: input slides down off viewport (`transform: translateY(100%)`, 0.3s ease-in)
- After response: input slides back up

---

## Floating Text Output

- Absolutely positioned in Kai side panel
- Text appears mid-screen, new messages push up
- Top of panel: CSS gradient mask (`mask-image: linear-gradient(transparent 0%, black 20%)`)
- Overflow: scroll with hidden scrollbar (user scrolls up to see earlier messages)
- First message on warm-up: "Just warming up..." (appears during API call, styled differently)
- Kai response text: Georgia serif, `--bark` colour, 1.1rem, generous line-height

---

## Presentation Cards

Shape: Rounded blob (high border-radius, not a rectangle). Each card type has a distinct radius pattern.

**Card types:**
- `gift` — warm ember left border, gold earworm quote
- `story` — moss green accent, "Others at this fork" label
- `exchange` — sky blue accent, "Possible connection" label with HOW explanation

**Actions (desktop):**
- "Add to backpack" — primary
- "Not now" — secondary (card minimises, stays accessible)
- "Not for me" — dismisses card

**Actions (mobile):**
- Tap: expand card
- Swipe right: Add to backpack
- Swipe left: Dismiss
- Hold 3s: "Not now" / "Not for me" menu

**Card appears:** Slides in from right (desktop) or bottom (mobile), subtle fade in.

---

## Backpack / Inventory

Toggle panel, slides in from right edge (desktop) or bottom (mobile).

Each item shows:
- Status badge (new / considering / acting)
- Title + body summary
- Purpose/use suggestion (1 sentence)
- Two latent options ("this could also be..." — Kai-generated at time of save)

Backpack persists in `sessionStorage`. Cleared when browser tab closes.
"Clear my session" button always visible.

---

## Modal Cards

About, Feedback — appear as floating cards that gather on screen. Screen does not navigate.
- Appear centred with backdrop blur
- Dismiss: click outside or close button
- Feedback: Netlify form (name optional, org optional, message required, consent checkbox)

---

## Data Model (Phase 1 — Curated)

### questions.js
4 mirror questions from kamunity-mirror.html, extended to 6-8. Each has:
- `label`, `q`, `sub` (as in prototype)
- `opts[]` — answer options
- `gifts{}` — keyed by answer, each with `text`, `earworm`, `like` (story)

### exchanges.js
Curated value exchange examples for the target sectors (peer support, mental health, arts/community):
- `id`, `sector`, `need`, `have`, `type` (swap/loop/chain), `story`, `confidence`

Kai is given both datasets in its system prompt (v1). Phase 2: RAG replaces the curated dataset.

---

## Kai Response Format

Kai always returns JSON:
```json
{
  "message": "conversational text",
  "cards": [
    {
      "id": "unique-id",
      "type": "gift | story | exchange",
      "title": "short title",
      "body": "the content",
      "earworm": "optional memorable phrase",
      "action": "optional one thing they could do",
      "how": "optional: how this connection was identified (exchange cards only)"
    }
  ]
}
```

If no cards, `cards` is an empty array. The UI always handles both cases.

---

## Value Exchange Signal Logic (Phase 1 — Curated; Phase 2 — Signal-detected)

**Need signals:** Repeated job postings for same role, grant-seeking language in newsletters, no/low social media presence, missed recurring events, resource requests in sector forums.

**Have signals:** Repeat successful events, high engaged follower base, sector awards, peer referrals, institutional knowledge depth, specialised volunteer base.

**Match types:**
- **Swap:** A has X + needs Y. B has Y + needs X. Surface as high-confidence.
- **Loop:** A→B→C→A. Three-way exchange. Surface as medium-confidence.
- **Chain:** Longer sequences. Surface as "possibility worth exploring."

Always transparent: Kai explains the signal that suggested the match.

---

*Last updated: 2026-02-22 — Phase 1 build start.*
