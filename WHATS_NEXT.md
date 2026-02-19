# WHAT'S NEXT — For The Nerve Centre Itself
## The Roadmap For The System That Runs Everything Else
### Created: Feb 19, 2026

*The nerve centre is infrastructure. Like all infrastructure, it needs maintenance, upgrades, and a plan. This document tracks what the nerve centre itself needs — not what Kamunity needs (that's PLAN/PHASE_QUEUE.md).*

---

## Current State: v1.0 — "It Exists"

The nerve centre is a folder on OneDrive with markdown documents, project code, and a local-only dashboard. It works. It's already more organised than 99% of solo founder operations. But it can be much more.

---

## Near Term (This Week → This Month)

### 1. Finish the Consolidation

| Task | Status | What's Needed |
|---|---|---|
| Git clone kamunity-org into PROJECTS/ | Pending | `git clone` + verify CI/CD |
| Git clone kamunity (kamunity.ai) into PROJECTS/ | Pending | `git clone` + verify CI/CD |
| Git clone NeoKamunityWedding into PROJECTS/ | Pending | `git clone` + verify CI/CD |
| Archive zip of old Dev_Code folders | Pending | PowerShell Compress-Archive |
| Move `important teck/` to secure location | **Critical** | Manual — contains API keys |
| Rename auto-named Netlify sites | Low priority | Netlify dashboard |
| Run `npm install` in ai-readiness + sovereignty-audit | Before next deploy | Terminal |

### 2. Deploy Kitchen Table

The dashboard is local-only. It should be accessible from any device.

**Options:**
- **Netlify drag-and-drop** — simplest, deploy `kitchen-table/` folder, done
- **Password-protect** — Netlify identity or simple auth (it's internal ops data)
- **PWA install** — already has manifest.json, just needs service worker for offline

**Recommended:** Deploy to Netlify with basic auth. Mike should be able to check the dashboard from his phone.

### 3. STATE.md Auto-Freshness

STATE.md goes stale fast. Two options to keep it honest:

- **Manual:** Follow RHYTHM.md — update every Monday (15 min minimum)
- **Semi-auto:** At the start of each Cascade session, ask "Read STATE.md — is this still true?" and update what's changed

---

## Medium Term (This Month → Next Quarter)

### 4. Kitchen Table v2 — The Real Waymaker

Kitchen Table is currently a read-mostly dashboard. It should become Waymaker — the internal AI assistant that actually helps run operations.

**Evolution path:**
```
v1 (now)     Static dashboard. Data in data.js. Local storage.
v2 (next)    Live data. Pulls from BRAIN/ + PLAN/. Editable.
v3 (later)   Waymaker integration. AI suggests actions. Email drafts. Meeting prep.
v4 (future)  Full operational copilot. Voice via ElevenLabs. Mobile-first.
```

**v2 specifics:**
- Parse BRAIN/STATE.md and PLAN/PHASE_QUEUE.md as data sources
- Let Mike edit task status, safety gate status directly from the UI
- Write changes back to the markdown files (round-trip)
- Add: weekly rhythm reminder, NLnet countdown, ally follow-up tracker

### 5. ElevenLabs Integration Points

With an ElevenLabs account, three immediate opportunities:

| Integration | What | Where |
|---|---|---|
| **Kai Voice** | Give Kai a consistent speaking voice for audio encounters | kamunity.org |
| **Audio Briefings** | Generate a weekly audio summary of STATE.md | Kitchen Table / podcast feed |
| **Accessibility** | Read-aloud for audit tool results, readiness quiz results | kamunity-audit, ai-readiness |

**Kai Voice is the highest value.** An AI that speaks to community organisations — in a warm, considered, Australian-contextual voice — is a differentiator no one else has. This aligns directly with the encounter model on kamunity.org.

**Audio Briefings are the sneaky-useful one.** Mike listens to a 3-minute summary while making coffee Monday morning. STATE.md → ElevenLabs TTS → audio file → Kitchen Table plays it. The rhythm becomes effortless.

### 6. Windsurf Workflow Files

Create `.windsurf/workflows/` with reusable workflows:

```
.windsurf/workflows/
├── new-session.md          "Read BRAIN/, check STATE.md, ask what to work on"
├── weekly-rhythm.md        "Run the Monday 30-min cadence from RHYTHM.md"
├── new-project.md          "Copy ENGINE/TEMPLATES/, fill blanks, create PROJECTS/[name]/"
├── deploy-check.md         "Verify all live sites still respond, report failures"
├── ally-email.md           "Draft outreach email using WHO.md ally data"
├── safety-review.md        "Check all SAFETY_GATES.md, update STATE.md"
```

These become slash commands: `/new-session`, `/weekly-rhythm`, `/new-project`, etc.

### 7. Version Control for the Nerve Centre

The nerve centre itself isn't git-tracked. It should be — at least the markdown documents.

**Options:**
- **Git init** in Kamunity-Tabletop-Plan/ with `.gitignore` for node_modules, dist, .env
- **Private GitHub repo** for backup + history
- **Don't** track PROJECTS/ subfolders (they have their own repos) — use git submodules or just .gitignore them

**Benefit:** Every document change gets a commit history. You can see when STATE.md was last updated, when a decision was logged, when a safety gate changed.

---

## Longer Term (Next Quarter → 6 Months)

### 8. The Name

`Kamunity-Tabletop-Plan` is a legacy name. When the consolidation is fully complete and all CI/CD is verified, rename to something that reflects what it is now:

- `Kamunity/` — simple
- `Kamunity-Campfire/` — references the architecture
- `Kamunity-Nerve-Centre/` — references the function

This is low-risk but psychologically significant — it marks the transition from "planning folder" to "operational headquarters."

### 9. Multi-Device Access

The nerve centre lives on OneDrive — it already syncs. But the experience of accessing it could improve:

- **Mobile:** Kitchen Table PWA with offline support
- **Tablet:** Full Windsurf on iPad if/when available, otherwise Kitchen Table
- **Other machines:** OneDrive sync + Windsurf install = instant nerve centre anywhere
- **Voice:** ElevenLabs audio briefings accessible via any podcast app or Kitchen Table

### 10. The Nerve Centre as a Product

The structure we've built — BRAIN/PLAN/ENGINE/KNOWLEDGE/PROJECTS/WORKSHOP/ARCHIVE with constitutional AI governance — is replicable. Any solo founder, any small org, any community group could use this pattern.

**This is a FactoryK output.** Document how we built it, package the templates, and it becomes:
- A Vine-o-Code case study
- A workshop offering ("Set up your own nerve centre in 2 hours")
- A consulting service ("We'll build your operational architecture")
- An NLnet deliverable ("Replicable community tech governance framework")

---

## The Vision: What This Becomes

```
TODAY       A folder with good markdown documents and a local dashboard
            Access: Windsurf IDE + browser

3 MONTHS    A deployed dashboard with live data, AI assistance, and audio
            Access: Any browser + phone + voice

6 MONTHS    A full operational copilot that manages tasks, drafts emails,
            preps meetings, tracks safety, and generates audio briefings
            Access: Everywhere, always current

12 MONTHS   A replicable pattern that other community organisations use
            Access: Open methodology, packaged templates, workshop format
```

---

## Priority Order

If you only do three things:

1. **Deploy Kitchen Table to Netlify** — access from anywhere
2. **Create Windsurf workflows** — make sessions start fast
3. **Generate Kai's voice** with ElevenLabs — differentiator, delight, accessibility

Everything else follows from having those three things working.

---

*The nerve centre is the meta-project. It's the thing that makes all other things possible. Investing in it is never wasted — it's compound interest on every future hour of work.*
