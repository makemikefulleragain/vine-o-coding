# WHAT'S NEXT — For The Nerve Centre Itself
## The Roadmap For The System That Runs Everything Else
### Created: Feb 19, 2026

*The nerve centre is infrastructure. Like all infrastructure, it needs maintenance, upgrades, and a plan. This document tracks what the nerve centre itself needs — not what Kamunity needs (that's PLAN/PHASE_QUEUE.md).*

---

## Current State: v1.5 — "It Thinks"

The nerve centre is a git-tracked folder on OneDrive with markdown documents, project code, a local dashboard with live AI chat (Waymaker), and Windsurf workflows for repeatable operations. It works. It's already more capable than most startup ops setups. And it's growing.

---

## Near Term (This Week → This Month)

### 1. Finish the Consolidation

| Task | Status | What's Needed |
|---|---|---|
| Git clone kamunity-org into PROJECTS/ | ✅ Done Feb 19 | CI/CD verified — push triggered deploy |
| Git clone kamunity (kamunity.ai) into PROJECTS/ | ✅ Done Feb 19 | Cloned to PROJECTS/kamunity-ai/ |
| Git clone NeoKamunityWedding into PROJECTS/ | ✅ Done Feb 19 | Cloned to PROJECTS/wedding/ |
| Run `npm install` in ai-readiness + sovereignty-audit | ✅ Done Feb 19 | 0 prod vulnerabilities |
| Archive zip of old Dev_Code folders | ⏳ Pending | PowerShell Compress-Archive — see below |
| Move `important teck/` to secure location | 🔴 **MANUAL** | Contains API keys — do not automate |
| Rename auto-named Netlify sites | Low priority | Netlify dashboard |
| Delete old NeoKamunity/ source folders | After CI/CD confirm | Verify Netlify deploys from PROJECTS/ first |

### 2. Deploy Kitchen Table

The dashboard is local-only. It should be accessible from any device.

**Options:**
- **Netlify drag-and-drop** — simplest, deploy `kitchen-table/` folder, done
- **Password-protect** — Netlify identity or simple auth (it's internal ops data)
- **PWA install** — already has manifest.json, just needs service worker for offline

**Recommended:** Deploy to Netlify with basic auth. Mike should be able to check the dashboard from his phone.

### 3. STATE.md Auto-Freshness — ✅ DONE

STATE.md freshness is now handled by:
- **Windsurf workflow:** `/new-session` reads STATE.md first, flags if stale (>7 days)
- **Weekly rhythm:** `/weekly-rhythm` workflow walks through the Monday 30-min cadence
- **STATE.md updated:** Refreshed Feb 19, 2026 afternoon with full Campfire Architecture status

---

## Medium Term (This Month → Next Quarter)

### 4. Kitchen Table v2 — Live Data Round-Trip ✅ COMPLETE — Feb 19, 2026

All v2 features shipped in one session.

**Evolution path:**
```
v1 (done)    Static dashboard. Data in data.js. Local storage.
v1.5 (done)  Waymaker AI chat. Claude-powered. Context-aware per page.
v2 (done)    Live data from BRAIN/PLAN markdown. Source editor. Round-trip writes.
v3 (next)    Full operational copilot. Email drafts. Meeting prep. Audio briefings.
v4 (future)  Mobile-first. Voice via ElevenLabs. Multi-device.
```

**v2 shipped — Feb 19:**
- ✅ `/api/files` in server.py — reads real BRAIN/ + PLAN/ files live
- ✅ `/.netlify/functions/markdown` — serves bundled data/ snapshots on Netlify
- ✅ `✏️ Source` editor tab — 4-file editor with dirty state, save-to-disk, discard
- ✅ Waymaker reads full markdown files as context (not just data.js summaries)
- ✅ `refreshWaymakerFiles()` — cache busted after every save
- ✅ Deploy helper with copy-pastable sync commands
- ✅ Weekly rhythm reminder on Today page (day-specific action)
- ✅ NLnet countdown widget (urgency coloring: normal → warning → urgent)
- ✅ Ally follow-up tracker (upcoming meetings + 24hr follow-up reminder)

### 5. ElevenLabs Integration Points

With an ElevenLabs account, three immediate opportunities:

| Integration | What | Where | Status |
|---|---|---|---|
| **Kai Voice** | Give Kai a consistent speaking voice for audio encounters | kamunity.org | ⏳ Pending — design separate from Waymaker |
| **Audio Briefings** | Mon/Wed/Sat spoken brief from STATE.md | Kitchen Table | ✅ DONE Feb 19, 2026 |
| **Accessibility** | Read-aloud for audit tool results, readiness quiz results | kamunity-audit, ai-readiness | ⏳ Pending |

**Audio Briefings — ✅ DONE Feb 19, 2026.**
Waymaker Brief pipeline: STATE.md → Claude → ElevenLabs TTS → MP3 → Kitchen Table audio player.
Three types: Week Opener (Mon), Mid-Week Pulse (Wed), Week Wrap (Sat). ~16,200 credits/month. Waymaker voice found (Scottish-Australian, warm, personal). Private — local Kitchen Table only.

**Kai Voice is the highest value (still pending).** An AI that speaks to community organisations — in a warm, considered, Australian-contextual voice — is a differentiator no one else has. Kai Wayfinder = public voice, designed separately from Waymaker.

**Accessibility (still pending).** Read-aloud for audit/readiness results.

### 6. Windsurf Workflow Files — ✅ DONE

Created `.windsurf/workflows/` with 6 reusable workflows:

```
.windsurf/workflows/
├── new-session.md          ✅ "Read BRAIN/, check STATE.md, ask what to work on"
├── weekly-rhythm.md        ✅ "Run the Monday 30-min cadence from RHYTHM.md"
├── new-project.md          ✅ "Copy ENGINE/TEMPLATES/, fill blanks, create PROJECTS/[name]/"
├── deploy-check.md         ✅ "Verify all live sites still respond, report failures"
├── ally-email.md           ✅ "Draft outreach email using WHO.md ally data"
└── safety-review.md        ✅ "Check all SAFETY_GATES.md, update STATE.md"
```

These are now available as slash commands: `/new-session`, `/weekly-rhythm`, `/new-project`, etc.

### 7. Version Control for the Nerve Centre — ✅ DONE

Git initialized Feb 19, 2026. Initial commit: 300+ files.

**What's tracked:**
- All BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, WORKSHOP/ documents
- Kitchen Table dashboard + Waymaker
- .windsurf/workflows/

**What's ignored (.gitignore):**
- `node_modules/`, `.env`, build artifacts
- `PROJECTS/*/` (own repos — clone separately)
- `ARCHIVE/*.zip` (large binaries)
- OneDrive conflict files

**Still pending:** Private GitHub repo for backup + remote history.

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

1. **Deploy Kitchen Table to Netlify** — access from anywhere (Waymaker needs server-side function for Claude API)
2. ~~**Create Windsurf workflows**~~ ✅ DONE — 6 slash commands live
3. **Generate Kai's voice** with ElevenLabs — differentiator, delight, accessibility

Updated top 3 (Feb 19):
1. **Deploy Kitchen Table + Waymaker** — Netlify function already built, just needs deploy + env var
2. **Push nerve centre to private GitHub repo** — backup + history + collaboration
3. **ElevenLabs audio briefings** — STATE.md → voice → Monday coffee ritual

---

*The nerve centre is the meta-project. It's the thing that makes all other things possible. Investing in it is never wasted — it's compound interest on every future hour of work.*
