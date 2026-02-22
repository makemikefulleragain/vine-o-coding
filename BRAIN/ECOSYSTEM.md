# KAMUNITY ECOSYSTEM MAP
## All Live Sites, Tools & Infrastructure
### Last Updated: Feb 21, 2026 (kamunity-consulting added — Phases 1–3 complete, Kai FAB live)

*This document is the single source of truth for what exists, where it lives, and how it's deployed. Any AI session reads this to understand the full landscape.*

---

## Live Sites (13 Active)

### Core Infrastructure

| Site | URL | Purpose | Deploy Method | GitHub Repo | Status |
|---|---|---|---|---|---|
| **Kai (kamunity.org)** | [kamunity.org](https://kamunity.org) | Constitutional AI encounter interface — the front door | GitHub → Netlify CI/CD | `kamunity-org` | ✅ Live |
| **Kamunity.ai** | [kamunity.ai](https://kamunity.ai) | AI capabilities hub, community rooms platform | GitHub → Netlify CI/CD | `kamunity` (private) | ✅ Live |
| **Wedding** | [fariha-mike-wedding-2026.netlify.app](https://fariha-mike-wedding-2026.netlify.app) | Wedding planning — community rooms dogfooding | GitHub → Netlify CI/CD | `NeoKamunityWedding` (private) | ✅ Live |

### Ecosystem Tools (GitHub → Netlify CI/CD)

| Site | URL | Purpose | GitHub Repo | Local Path | Status |
|---|---|---|---|---|---|
| **Sovereignty Audit** | [kamunity-audit.netlify.app](https://kamunity-audit.netlify.app) | Free digital sovereignty self-assessment for orgs | `kamunity-audit` | `PROJECTS/sovereignty-audit/` | ✅ Live — GitHub CI/CD |
| **AI Readiness** | [kamunity-ai-readiness.netlify.app](https://kamunity-ai-readiness.netlify.app) | 12-question AI readiness quiz + toolkit | `kamunity-ai-readiness` | `PROJECTS/ai-readiness/` | ✅ Live — GitHub CI/CD |
| **Vine-o-Code** | [vine-o-coding.netlify.app](https://vine-o-coding.netlify.app) | 6-step constitutional build methodology site | `vine-o-coding` | `kamunity-engine/outcome-vine/` | ✅ Live — GitHub CI/CD |
| **FactoryK Showcase** | [factoryk1.netlify.app](https://factoryk1.netlify.app) | "The Factory by the Fire" — narrative showcase of FactoryK | TBD | ✅ Live |
| **Nonna's Knitting Circle** | [nonnas-knitting-circle.netlify.app](https://nonnas-knitting-circle.netlify.app) | Community pattern sharing — proof of concept, live testing | `kamunity-engine/nonna_knits_club/` | ✅ Live (testing) |
| **Grants Hub** | [grants-hub.netlify.app](https://grants-hub.netlify.app) | Grant acquittal + reporting helper, live testing | `kamunity-engine/grants-hub/` | ✅ Live (testing) |

### Showcase & Documentation Sites (Drag-and-Drop)

| Site | URL | Purpose | Status |
|---|---|---|---|
| **The Greenfield Plan** | [adorable-dango-3479db.netlify.app](https://adorable-dango-3479db.netlify.app) | Kamunity Ecosystem v2 strategic plan — Three Kamunities, federation, code companion | ✅ Live — rename to `kamunity-greenfield-plan` |
| **System Map** | [subtle-starship-d0bdac.netlify.app](https://subtle-starship-d0bdac.netlify.app) | FactoryK + Kamunity comprehensive system documentation (70 tracked items) | ✅ Live — rename to `kamunity-system-map` |
| **The Need's Journey** | [starlit-unicorn-6440fb.netlify.app](https://starlit-unicorn-6440fb.netlify.app) | Interactive FactoryK demo — how needs become tools | ✅ Live — rename to `factoryk-needs-journey` |
| **The Mycelium** | [candid-donut-4ec289.netlify.app](https://candid-donut-4ec289.netlify.app) | Experimental AI encounter space with breadcrumb system | ✅ Live — rename to `kamunity-mycelium` |

### Consulting

| Site | URL | Purpose | Deploy Method | Status |
|---|---|---|---|---|
| **Kamunity Consulting** | [kamunityconsulting.com](https://kamunityconsulting.com) (temp: [kamunity-consulting-new.netlify.app](https://kamunity-consulting-new.netlify.app)) | Mike Fuller's consulting practice — Fix (QA/improvement/strategy) + Impossible (innovation/AI/design sprints). Kai FAB embedded. Built by Kamunity. | Netlify CLI (`netlify deploy --dir site --prod`) | ✅ Live (temp URL, DNS cutover pending) |

### Reflection & Community Self-Perception

| Site | URL | Purpose | Deploy Method | Status |
|---|---|---|---|---|
| **Kamunity Reflection** | [kamunity-reflection.netlify.app](https://kamunity-reflection.netlify.app) | Kai-centred community self-perception mirror — "What are you for?" conversational tool with value exchange matching | Netlify CLI (`netlify deploy --dir dist --functions netlify/functions --prod`) | ✅ Live — Phase 1 (needs ANTHROPIC_API_KEY set in Netlify env) |

### Playground

| Site | URL | Purpose | GitHub Repo | Status |
|---|---|---|---|---|
| **Kamunity Demo** | [kamunitydemo.org](https://kamunitydemo.org) | Messy-by-design playground for experiments, feature testing, UI/UX ideas | `kamunity-demo` | ✅ Live (playground) |

---

## Sites Pending Archive

| Site | URL | Reason |
|---|---|---|
| kamunity-org-rebuild | kamunity-org-rebuild.netlify.app | Old rebuild attempt, superseded by current kamunity.org |
| outcome-vine | outcome-vine.netlify.app | Superseded by vine-o-coding |
| kamunity-10kjuly | kamunity-10kjuly.netlify.app | July 2025 build, superseded |
| kamunitymvb | kamunitymvb.netlify.app | Old MVP prototype, superseded |

---

## GitHub Repositories (7)

| Repo | Visibility | Last Updated | Deploys To | Status |
|---|---|---|---|---|
| `kamunity-org` | Public | Feb 18, 2026 | kamunity.org | **ACTIVE** |
| `kamunity` | Private | Feb 9, 2026 | kamunity.ai | **ACTIVE** |
| `NeoKamunityWedding` | Private | Dec 22, 2025 | fariha-mike-wedding-2026 | **ACTIVE** |
| `kamunity-demo` | Public | Sep 22, 2025 | kamunitydemo.org | **KEEP** (playground) |
| `kamunity-10july` | Public | Nov 20, 2025 | kamunity-10kjuly | **ARCHIVE** (make private) |
| `mvb-prototype` | Private | Jun 15, 2025 | kamunitymvb | **ARCHIVE** |
| `Kamunity-MVP` | Private | Mar 6, 2025 | (none) | **ARCHIVE** |

---

## Tech Stacks in Use

| Project | Stack | Build Step |
|---|---|---|
| kamunity.org (Kai) | Next.js 14 + TypeScript + Tailwind + Anthropic Claude API | Yes (Next.js build + @netlify/plugin-nextjs) |
| kamunity.ai | Next.js + TypeScript + Drizzle ORM + Supabase | Yes (Next.js build) |
| AI Readiness | React + Tailwind + Vite | Yes (Vite build) |
| Sovereignty Audit | React + Tailwind + Vite | Yes (Vite build) |
| Kitchen Table | Vanilla JS ES modules | None (static) |
| kamunity-consulting | Static HTML + CSS + Vanilla JS + Netlify Functions (Kai proxy) | None (static) — Netlify CLI deploy |
| Wedding | Unknown (check repo) | GitHub CI/CD |
| Nonna's / Grants Hub / Outcome Vine | React + Tailwind + Vite (Vine-o-Code v1 outputs) | Yes (Vite build) |
| Demo (kamunitydemo.org) | Unknown (React/Next.js) | GitHub CI/CD |

---

## Custom Domains

| Domain | Points To | Registrar | Status |
|---|---|---|---|
| kamunity.org | Netlify (kamunityai project) | Check | Active |
| kamunityconsulting.com | Wix (pending cutover to Netlify kamunity-consulting-new) | Check | Active — DNS cutover to Netlify pending |
| kamunity.ai | Netlify (sparkling-moxie project) | Check | Active |
| kamunitydemo.org | Netlify (kamunity-demo project) | Check | Active — confirm registration renewal |

---

## Ecosystem Rules

1. Every site cross-links to kamunity.org and relevant siblings
2. Every site includes an llms.txt file
3. Every site carries an honest disclaimer about AI limitations
4. No site collects personal data without explicit consent
5. All sites use the shared design language where appropriate
6. Sites built by Vine-o-Code v1 engine are documented in KNOWLEDGE/engine-v1/

---

## The Kitchen Table

The Kitchen Table PWA (`kitchen-table/`) is the internal operations dashboard. It tracks:
- 47 tasks across 7 phases (41 with pre-generated task specs)
- 17+ ecosystem sites (this list + prototypes + recommended tools)
- 16 allies in the Constellation
- 13 safety items
- 13 gaps/open questions
- 4 consulting services
- 4 grant opportunities

**Deployed:** [kamunity-kitchen-table.netlify.app](https://kamunity-kitchen-table.netlify.app) — password protected.
**Local:** `python server.py` from `kitchen-table/` → `localhost:8732` (adds live BRAIN/PLAN file editing + ElevenLabs audio briefs).
**Features:** Waymaker AI chat (Claude-powered, reads full BRAIN/PLAN markdown), Source editor (5-file browser editor), Today widgets (rhythm reminder, NLnet countdown, ally radar), Mon/Wed/Sat audio briefs (local only).

---

*This document updates when sites are added, removed, renamed, or change status. Review weekly as part of RHYTHM.md cadence.*
