# KAMUNITY GAP ANALYSIS
## What's Real vs What's Claimed vs What's Needed
### Opus Audit — Feb 20, 2026

*Systematic review of the entire Kamunity-Tabletop-Plan filesystem, cross-referencing every document against every other document, checking code against claims, and measuring the gap between current state and vision.*

---

## SEVERITY LEGEND

- 🔴 **CRITICAL** — Could cause harm, block revenue, or mislead someone who reads the docs
- 🟠 **SIGNIFICANT** — Creates confusion, wastes time, or will bite you later
- 🟡 **MINOR** — Inconsistency or debt that should be cleaned up when convenient
- 🔵 **OBSERVATION** — Not a problem yet, but worth knowing

---

## 1. CONTRADICTIONS BETWEEN DOCUMENTS

### 🔴 1.1 — SAFETY_GATES.md Summary Table Contradicts Its Own Body Text

**The problem:** The header of SAFETY_GATES.md says "G1, G3, G4 PASS (manual UAT sign-off)" and the individual gate sections show ✅ PASS with detailed evidence. But the **summary table at the bottom** still shows all three as "⚠️ Open" with "YES — blocks public showcase."

**Why it matters:** This is the document that gets scanned quickly before decisions. Anyone (including Waymaker, Cascade, or future Opus) reading the summary table will think G1/G3/G4 are still blocking — and they're not. The next session could incorrectly block work based on stale summary data.

**Fix:** Update the summary table to reflect ✅ PASS for G1, G3, G4. Change "Blocking?" to "No" for those three. The bottom-line note should reflect completed status, not "awaiting deploy + manual test."

---

### 🟠 1.2 — Decision Log Claims Sovereignty Calculator + Copilot Check "Promoted to kamunity.org"

**The problem:** DECISION_LOG.md entry from Feb 20 states: "Sovereignty Calculator + Copilot Check promoted to full Next.js pages on kamunity.org (/calculator, /copilot-check) + Kai card registry."

**Reality:** The kai-cards.ts registry exists and contains cards for sovereignty-audit and ai-readiness — but there is NO `/calculator` or `/copilot-check` route in `PROJECTS/kamunity-org/src/app/`. These tools exist only as standalone HTML files in the `kitchen-table/` directory (`sovereignty-calculator.html`, `copilot-check.html`).

**Why it matters:** The decision log is supposed to be the authoritative record of what happened. This entry records something that was planned or attempted but not completed, as if it were done. If someone reads this and trusts it, they'll believe kamunity.org has routes that don't exist.

**Fix:** Either (a) amend the decision log entry to say "planned" not "promoted," or (b) actually build the Next.js routes. The card registry entries are there — the pages just don't exist yet.

---

### 🟠 1.3 — ECOSYSTEM.md "Kitchen Table" Description Is Stale

**The problem:** ECOSYSTEM.md says "The Kitchen Table PWA (`kitchen-table/`)" and "It is not publicly deployed. It runs locally via `python -m http.server 8732`."

**Reality:** Kitchen Table IS deployed to Netlify (kamunity-kitchen-table.netlify.app) with password protection. STATE.md correctly reflects this. ECOSYSTEM.md does not.

**Fix:** Update ECOSYSTEM.md to show Kitchen Table as a live deployed site with its Netlify URL.

---

### 🟠 1.4 — NERVE_CENTRE_MAP.md Workflow Count Inconsistent

**The problem:** The NERVE_CENTRE_MAP says ".windsurf/workflows/ — 7 total" and lists 7 files. The actual directory has 9 files (the 7 listed plus `session-end.md`, `uat.md`, and `restart-server.md` — but the map only mentions `new-session.md, session-end.md` in the list header and then describes 6 workflows, not 7 or 9).

**Fix:** Update NERVE_CENTRE_MAP to accurately list all 9 workflows.

---

### 🟡 1.5 — "Sites Live" Count Varies Across Documents

**The problem:** Different documents give different counts:
- STATE.md says "Sites live: 13 active"
- ECOSYSTEM.md lists 12 active + Kitchen Table = 13
- data.js SITES array has 10 with `st: 'live'` (Kitchen Table was added, but Constellation has no URL and is listed as live)
- index.html stats bar shows the SITES.filter count dynamically
- NERVE_CENTRE_MAP says "Live Netlify sites: 18"

The 18 number from the Nerve Centre Map includes archive candidates and auto-named sites. The 13 from STATE.md includes Kitchen Table. The 10 from data.js is the rendered count.

**Fix:** Decide on one canonical counting method and use it everywhere. Suggestion: "Core active sites" (the ones people can visit) as the primary count. Archive candidates and internal tools counted separately.

---

## 2. TECHNICAL DEBT

### 🔴 2.1 — Password Hardcoded in auth.js, Pushed to GitHub

**The problem:** `kitchen-table/js/auth.js` contains `const KT_PASSWORD = 'kamunity2026';` in plain text. This file is committed to the `kamunity-kitchen-table` GitHub repo. The `.gitignore` for kitchen-table only excludes `.env`, `audio/`, and `server.py` — not `auth.js`.

**Why it matters:** Anyone who visits the public repo can see the password. The password protection is security theatre — it prevents casual drive-by access but not anyone who looks at the source. Since the Kitchen Table contains internal operational data (ally strategy, financial state, safety gaps), this is a real exposure risk.

**Fix options:**
1. Move to Netlify Identity (proper auth, free tier = 5 users)
2. Move to basic HTTP auth via `_headers` file in Netlify
3. At minimum: use environment variable for the password, not a hardcoded string
4. Make the GitHub repo private (if not already)

---

### 🟠 2.2 — server.py Is Gitignored — Netlify Deploy Doesn't Include It

**The problem:** `kitchen-table/.gitignore` includes `server.py`. This means the local development server (which handles `/api/files`, `/api/waymaker`, and ElevenLabs brief generation) is NOT in the repo. On Netlify, the equivalent functions are `netlify/functions/waymaker.mjs` and `netlify/functions/markdown.mjs`.

This is intentional (server.py contains local-only logic including write-back to disk), but it means:
- If someone clones the Kitchen Table repo, they can't run the full local server without separately obtaining server.py
- The ElevenLabs brief pipeline is completely local-only and unrecoverable from the repo

**Impact:** Low for now (Mike has it locally + OneDrive), but if the machine dies or OneDrive goes wrong, server.py is lost.

**Fix:** Either back up server.py separately or create a `server.py.example` (with API keys stripped) that IS committed.

---

### 🟠 2.3 — Dual Data Sources: data.js vs BRAIN/ Markdown

**The problem:** The Kitchen Table has two data layers:
1. `js/data.js` — hardcoded JS arrays with all tasks, sites, allies, safety items
2. `BRAIN/` + `PLAN/` markdown files — read live via server.py locally, bundled snapshots via Netlify function

Waymaker reads the markdown files as context for AI responses. The dashboard renders from data.js. These can drift. For example:
- If someone updates SAFETY_GATES.md to mark G1 PASS, data.js still has `{st: "done"}` independently
- If someone adds a task to PHASE_QUEUE.md, it doesn't appear in data.js unless manually added
- The task-specs in `data/task-specs/` reference tasks by ID but aren't linked to data.js programmatically

**Why it matters:** Over time, the markdown files (edited by humans and Cascade) and data.js (edited by Windy) will diverge. The "single source of truth" design from the Windy scope doc identified data.js as the central asset — but Waymaker now reads markdown directly, creating a parallel truth.

**Fix:** This is an architectural decision, not a bug. Options:
1. Make markdown files the source of truth, generate data.js from them (complex)
2. Make data.js the source of truth, generate markdown snapshots for Waymaker (simpler)
3. Accept the duality and establish a sync protocol in RHYTHM.md (pragmatic)

Recommendation: Option 3 for now. Add "Sync data.js ↔ BRAIN/ markdown" to the Monday weekly rhythm. When Windy has time, build option 1.

---

### 🟡 2.4 — PROJECTS/ .gitignore Mismatch

**The problem:** The root `.gitignore` excludes:
```
PROJECTS/kamunity-org/
PROJECTS/kamunity/
PROJECTS/NeoKamunityWedding/
```
But the actual directory names are:
```
PROJECTS/kamunity-org/       ← matches
PROJECTS/kamunity-ai/        ← .gitignore says "kamunity/" not "kamunity-ai/"
PROJECTS/wedding/            ← .gitignore says "NeoKamunityWedding/" not "wedding/"
```

**Impact:** The kamunity-ai and wedding directories may be tracked in the nerve centre's git repo when they shouldn't be (they have their own repos). This could create massive commits and conflicts.

**Fix:** Update `.gitignore` to:
```
PROJECTS/kamunity-ai/
PROJECTS/wedding/
```

---

### 🟡 2.5 — Vine-o-Code Source Not in PROJECTS/

**The problem:** The Vine-o-Code live site (vine-o-coding.netlify.app) is deployed from `kamunity-engine/outcome-vine/` (outside the Tabletop-Plan directory, referenced in ECOSYSTEM.md). But there's no `PROJECTS/vine-o-coding/` folder. The PROJECTS/README.md lists it under "Not Yet Created."

The safety test document (kp-01-safety-tests.md) specifically notes: "C5 — vine-o-coding.netlify.app: ⚠️ SOURCE NOT FOUND LOCALLY — requires manual update or site access."

**Impact:** Can't update the Vine-o-Code site from within the Campfire Architecture. It's an orphan — deployed from elsewhere.

**Fix:** Clone or move the vine-o-coding source into PROJECTS/ and set up CI/CD. This is already identified in KP-06 but hasn't happened.

---

### 🟡 2.6 — FactoryK Showcase Has No Local Source

**The problem:** ECOSYSTEM.md lists FactoryK (factoryk1.netlify.app) with "GitHub Repo: TBD" and no local path. There's no FactoryK source anywhere in the Tabletop-Plan filesystem.

**Impact:** Like Vine-o-Code, can't update it from within the architecture. Deployed somewhere unknown.

**Fix:** Locate source, add to PROJECTS/ or at minimum document where it lives.

---

### 🟡 2.7 — kamunity-engine/ Directory Exists Outside Architecture

**The problem:** `kamunity-engine/` is a separate allowed directory containing the full RALF engine, grants-hub, nonna_knits_club, and outcome-vine sources. This is the original engine directory. Parts of it have been copied into `KNOWLEDGE/engine-v1-full/` within the Tabletop Plan, but the original still exists and could be edited independently.

**Impact:** Two copies of the same codebase. Edits to `kamunity-engine/nonna_knits_club/` won't be reflected in `KNOWLEDGE/engine-v1-full/nonna_knits_club/` and vice versa.

**Fix:** Decide which is canonical. If KNOWLEDGE/engine-v1-full/ is the archive, make kamunity-engine/ read-only or delete it. If kamunity-engine/ is the working copy, remove the KNOWLEDGE/ copy.

---

## 3. HALF-DONE / STALE ITEMS

### 🟠 3.1 — KP-02 Meeting Prep: Partially Done

**The problem:** PHASE_QUEUE.md shows KP-02 with 5 "Done When" criteria, all unchecked. But:
- meeting-briefs.md EXISTS and contains full briefs for all 3 meetings ✅
- AI Safety Checklist EXISTS at tools/ai-safety-checklist.html ✅
- "ALIKE priorities researched" — unclear if done, no separate research doc
- "5-minute ALIKE demo flow prepared and tested" — brief has the flow but no evidence of testing

STATE.md mentions "t10 AI Safety Checklist ✅ done" but KP-02 isn't marked as complete.

**Fix:** Either close KP-02 with a final check, or update the checkboxes for what IS done and note what's still needed.

---

### 🟠 3.2 — campfire-phase-plan.md Is Obsolete

**The problem:** `PLAN/campfire-phase-plan.md` is a 6-phase execution plan for the consolidation process. Phases 0-4 appear to be complete (BRAIN/ built, PLAN/ built, consolidation done, CI/CD verified). But the document still has unchecked checkboxes and doesn't reflect the current state.

**Impact:** It's a historical document now, not an active plan. But it lives in PLAN/ alongside active documents, creating confusion about what's current.

**Fix:** Move to ARCHIVE/ or add a clear "COMPLETED" header. The active phase plan is PHASE_QUEUE.md.

---

### 🟠 3.3 — PROJECTS/README.md Is Stale

**The problem:** README.md says sovereignty-audit and ai-readiness are "Still in Original Locations (Move When Ready)" under a "Drag-and-Drop Deploy" section. But the decision log confirms both were moved and `npm install` was done on Feb 19.

It also says kamunity.org's stack is "HTML/JS + Claude API" — but it's actually Next.js 14 + TypeScript (ECOSYSTEM.md correctly states this).

**Fix:** Update README.md to reflect current reality. All 5 projects are now in PROJECTS/.

---

### 🟡 3.4 — Missing Task Specs (t35-t40)

**The problem:** task-specs/ directory has specs for 41 of 47 tasks. Missing: t35 (Pattern Dashboard), t36 (Vibes Indicator), t37 (Local Kai Instance Architecture), t38 (Polis Integration Research), t39 (Sovereign Model Evaluation), t40 (Publish "How to Build Your Community's Kai").

**Impact:** Low — these are Phase 3-6 tasks, well into the future. But the pattern of pre-generated specs is incomplete.

**Fix:** Generate specs when these phases become active. Not urgent.

---

### 🟡 3.5 — RHYTHM.md Health Check Table Is Empty

**The problem:** RHYTHM.md includes a "Rhythm Health Check" table with three cadences (weekly, monthly, quarterly) — all showing "Last Done: —" and "Status: Not yet started."

**Impact:** The rhythm hasn't formally started. Feb 19 was a massive build day, not a rhythm day. The first Monday check should be Feb 24 (Monday, meeting week).

**Fix:** Not a bug — it's accurate. But it needs to actually start on Monday.

---

### 🟡 3.6 — Four Netlify Sites Still Have Auto-Generated Names

**The problem:** ECOSYSTEM.md lists adorable-dango, subtle-starship, starlit-unicorn, and candid-donut with "rename to kamunity-greenfield-plan" etc. DECISION_LOG says "4 auto-named Netlify sites renamed." But ECOSYSTEM.md still shows the old names.

**Unclear:** Were they actually renamed in Netlify, and ECOSYSTEM.md is just stale? Or is the decision log entry aspirational?

**Fix:** Verify in Netlify dashboard. Update ECOSYSTEM.md to match reality.

---

## 4. MISSING PIECES (Gap Between State and Vision)

### 🔴 4.1 — No Revenue Infrastructure

**Vision:** $5-8K/month by April 2026
**Reality:** $0. No ABN confirmed. No invoicing set up. No insurance. No consulting offer page.
**Gap:** Everything in KP-03 is undone. This is the most critical gap because personal runway (g7) is a survival question.

---

### 🔴 4.2 — No Legal Entity

**Vision:** NLnet application by April 1 (requires entity or fiscal host)
**Reality:** No entity. No fiscal host identified. g3 in gaps is unresolved.
**Gap:** NLnet can fund individuals in some cases, but this needs confirming. If entity is required, 41 days to April 1 is tight.

---

### 🟠 4.3 — No Usage Data

**Vision:** Pattern Dashboard showing aggregated anonymous data from 20+ orgs
**Reality:** Zero metrics on any tool. No idea how many people have used the audit, readiness quiz, or talked to Kai.
**Gap:** Can't write the sector report, can't include usage evidence in NLnet, can't make evidence-based decisions about what's working — all without basic analytics. But analytics conflicts with Principle 5 (zero tracking). Need a constitutional approach: privacy-preserving aggregate counters only? Client-side only?

---

### 🟠 4.4 — No Cultural Safety Review

**Vision:** Constitution requires Noongar review of Acknowledgment of Country (Principle 8)
**Reality:** G6 is still ⚠️ Open. No engagement with Noongar community about the acknowledgment.
**Gap:** This blocks ACCO engagement (Aboriginal Community Controlled Organisations). It's flagged correctly but no action has been taken. This requires human relationship, not code.

---

### 🟠 4.5 — Cross-Linking Not Done

**Vision:** "Every site cross-links to kamunity.org and relevant siblings" (Principle 11, Ecosystem Rule 1)
**Reality:** t15 is undone. llms.txt doesn't exist on any site. Sites don't link to each other.
**Gap:** This is both a constitutional violation and an SEO/discoverability issue. Each site is currently an island.

---

### 🟠 4.6 — Kai Doesn't Know the Ecosystem Yet

**Vision:** Kai can "describe all ecosystem sites with context, not just links" (t28)
**Reality:** Kai's system prompt has crisis resources hardcoded but doesn't have the full ecosystem state. t12 (deploy ecosystem-state-full.json) is undone. t28 is undone.
**Gap:** When ALIKE's CEO asks Kai "what tools do you have for my members?", Kai can't answer comprehensively yet. The card registry exists in kai-cards.ts but Kai's conversational awareness of the ecosystem is limited.

---

### 🟡 4.7 — No Backup Strategy

**Vision:** STATE.md mentions "no backup strategy for Supabase/Netlify data" as a known issue
**Reality:** Still no backup. The nerve centre is git-tracked + OneDrive synced, which provides redundancy. But PROJECTS/ with their own repos, Supabase data for kamunity.ai, and Netlify configuration are not explicitly backed up.
**Gap:** Manageable for now (git + OneDrive = decent coverage), but should be formalized.

---

### 🟡 4.8 — "important teck/" API Keys Still Unsecured

**Vision:** STATE.md and NERVE_CENTRE_MAP both flag "API keys in Word doc in important teck/ folder — needs secure move"
**Reality:** No `important teck` folder found within the Tabletop-Plan filesystem. It may be elsewhere on the machine. The .env file in kitchen-table/ is gitignored, which is good. But the Word doc with keys is still out there somewhere.
**Gap:** Minor if the .env approach is now being used exclusively. But the Word doc should be deleted or secured.

---

## 5. ARCHITECTURAL OBSERVATIONS

### 🔵 5.1 — The KNOWLEDGE/ Directory Is Getting Large

17 files + engine-v1/ + engine-v1-full/ (with 5 iterations of research, synthesis, specs, critiques, and 3 auto-runs). This is the largest directory by far. It's well-organized but could become unwieldy.

**Observation:** Consider a KNOWLEDGE/README.md or index file that maps what's in there and when each piece is relevant.

---

### 🔵 5.2 — Three Copies of Ecosystem Data

1. `BRAIN/ECOSYSTEM.md` — markdown, source of truth for documentation
2. `KNOWLEDGE/ecosystem-state.json` — machine-readable JSON
3. `kitchen-table/js/data.js` SITES array — rendered in dashboard

These serve different purposes but can drift. ecosystem-state.json hasn't been checked for currency.

---

### 🔵 5.3 — NeoKamunity/ Directory Still Exists

`NeoKamunity/` contains older files including the original NLnet draft, old kamunity-org-rebuild attempts, and the Kam-org rebuild folder. Most of this content has been extracted into the Tabletop-Plan architecture, but the original directory still exists as an allowed filesystem location.

**Observation:** This is the "old house" — everything valuable has been moved, but the old structure is still standing. Not a problem, but could be confusing if someone doesn't know which is current.

---

### 🔵 5.4 — Wedding Project Hasn't Been Touched Since Dec 2025

GitHub repo last updated Dec 22, 2025. The ROADMAP.md exists in both PROJECTS/wedding/ and data/PROJECTS/wedding/ but the site itself may be stale. If it's being used as a community rooms dogfooding test case (per decision log), it should be more active.

---

### 🔵 5.5 — Constitution Page Route Exists But May Be Empty

`PROJECTS/kamunity-org/src/app/constitution/` exists as a directory, which means there's a Next.js route. But I haven't verified if it renders anything meaningful or is a placeholder.

---

## 6. PRIORITY RANKING — What To Fix When

### Before Meetings (This Weekend)

| # | Issue | Severity | Effort |
|---|---|---|---|
| 1.1 | Fix SAFETY_GATES.md summary table (contradicts itself) | 🔴 | 5 min |
| 1.2 | Amend decision log re: sovereignty calculator (not deployed to kamunity.org) | 🟠 | 5 min |
| 1.3 | Update ECOSYSTEM.md Kitchen Table status | 🟠 | 5 min |
| 3.1 | Close or update KP-02 checkboxes | 🟠 | 10 min |

### This Week

| # | Issue | Severity | Effort |
|---|---|---|---|
| 2.1 | Fix auth.js password exposure (make repo private or use env var) | 🔴 | 30 min |
| 2.4 | Fix .gitignore for PROJECTS/ paths | 🟡 | 5 min |
| 3.3 | Update PROJECTS/README.md | 🟡 | 15 min |
| 1.4 | Fix workflow count in NERVE_CENTRE_MAP | 🟡 | 5 min |

### This Month

| # | Issue | Severity | Effort |
|---|---|---|---|
| 4.1 | Revenue infrastructure (KP-03 — ABN, invoicing, insurance, offer doc) | 🔴 | Multiple days |
| 4.2 | Legal entity / fiscal host for NLnet | 🔴 | Research + action |
| 4.5 | Cross-link all sites + llms.txt | 🟠 | Half day |
| 4.6 | Deploy ecosystem-state to Kai | 🟠 | Half day |
| 2.3 | Establish data.js ↔ BRAIN/ sync protocol | 🟠 | 1 hour |
| 2.5 | Move Vine-o-Code source into PROJECTS/ | 🟡 | 1 hour |
| 2.6 | Locate and document FactoryK source | 🟡 | 30 min |
| 3.2 | Archive campfire-phase-plan.md | 🟡 | 5 min |

### Before NLnet (April 1)

| # | Issue | Severity | Effort |
|---|---|---|---|
| 4.2 | Legal entity resolved | 🔴 | Depends |
| 4.3 | Some form of usage evidence | 🟠 | Needs design |
| 4.4 | Cultural safety review initiated | 🟠 | Human relationship work |

---

## 7. THE HONEST SUMMARY

### What's Genuinely Solid
- The Campfire Architecture (BRAIN/PLAN/ENGINE/KNOWLEDGE/PROJECTS/WORKSHOP/ARCHIVE) is well-designed and populated
- The AI Triad (Wayfinder/Waymaker/Cascade) is architecturally sound
- The Kitchen Table PWA works, has live data, Waymaker AI, widgets, source editor
- Safety sprint KP-01 is genuinely complete (crisis protocol, injection testing, disclaimers)
- 41/47 task specs are pre-generated and useful
- Meeting briefs are thorough and meeting-ready
- 9 Windsurf workflows automate repeatable operations
- The constitution is thoughtful, principled, and has a real amendment path
- ENGINE/RUNNER.md is a genuinely good specification for AI-assisted building
- Per-site ROADMAPs exist for all 5 projects

### What's Fragile
- Document consistency — several contradictions between files that read each other
- The dual data layer (data.js + markdown) will drift without a sync protocol
- No revenue infrastructure at all
- Auth is security theatre (hardcoded password in source)
- Several live sites have no local source in the architecture (Vine-o-Code, FactoryK)
- Decision log contains at least one entry that records planned work as completed

### What's Missing
- Revenue: ABN, invoicing, insurance, consulting offer page
- Legal: Entity structure for NLnet and future operations
- Metrics: Zero usage data on any tool
- Cultural: No Noongar engagement for Acknowledgment review
- Coherence: Sites don't cross-link, no llms.txt anywhere
- Knowledge: Kai doesn't know the full ecosystem yet

### The Core Tension
The system is architecturally mature but operationally pre-revenue. The documentation quality exceeds most funded organizations. The technical infrastructure is solid. But the gap between "impressive system" and "sustainable operation" is entirely defined by: does someone pay for this in the next 60 days? Everything else — NLnet, consulting pipeline, ally network — depends on surviving long enough for the autocatalytic loop to ignite.

KP-03 (Revenue Infrastructure) is not just the next phase. It's the existential dependency.

---

*This analysis should be stored in KNOWLEDGE/ and referenced in the next Monday rhythm check. Every item has a clear fix path. The question is prioritisation — and the priority is survival, then quality, then vision.*

*"The perfect documentation of a project that runs out of money is still a dead project."*
