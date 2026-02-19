# PHASE 0 AUDIT REPORT
## Campfire Architecture — Know What You Have
### Feb 19, 2026

---

## 0.1 — Auto-Named Netlify Sites (Examined)

All four are significant projects, not tests.

| Current Name | Title | What It Is | Suggested Name | Status |
|---|---|---|---|---|
| adorable-dango-3479db | **The Greenfield Plan — Kamunity Ecosystem v2** | Strategic planning document for ecosystem rebuild. Covers Three Kamunities, Factory architecture, Federation/ActivityPub, Code Companion, ALIKE WA story, guiding principles. | `kamunity-greenfield-plan` | ACTIVE — strategic reference |
| subtle-starship-d0bdac | **FactoryK + Kamunity — System Map** | Comprehensive system documentation. 70 tracked items, Michael's review guide, architecture diagrams, safety architecture, health metrics, build pipeline, honest gaps. Feb 10 2026 vintage. | `kamunity-system-map` | ACTIVE — key documentation |
| starlit-unicorn-6440fb | **The Need's Journey: A FactoryK Story** | Interactive demo showing how FactoryK turns community needs into software. Arrow/tap navigation. | `factoryk-needs-journey` | ACTIVE — demo/showcase |
| candid-donut-4ec289 | **The Mycelium** | Experimental AI encounter space. Instance-based, breadcrumb system, encounter notes, reaction types (Fact/Fun/Spicy/Nice/Curious/Surprising). "Same ocean, different wave." | `kamunity-mycelium` | ACTIVE — experimental |

---

## 0.2 — Full Folder Audit

### OneDrive Dev_Code/ (17 folders)

#### ACTIVE — Move to PROJECTS/

| Folder | Contents | Size | What It Is | Maps To |
|---|---|---|---|---|
| **Kamunity-Tabletop-Plan/** | Kitchen Table app + all planning docs from this session | Mixed | Current workspace. Kitchen Table PWA + roadmap + threat model + review docs. | ROOT of Campfire Architecture |
| **Kamunity AI Readiness/** | React+Vite project + Vine-o-Code foundation docs + .netlify | Medium | Live AI readiness quiz. Deployed to kamunity-ai-readiness.netlify.app. | PROJECTS/ai-readiness/ |
| **kamunity-consulting-ai/** | React+Vite project + Vine-o-Code foundation docs + .netlify | Medium | Sovereignty audit tool. Likely deployed to kamunity-audit.netlify.app. | PROJECTS/sovereignty-audit/ |
| **NeoKamunity/** | Next.js codebase (in kamunity/ subfolder) + key docs | Large | Contains kamunity.ai codebase (Next.js+TS+Drizzle+Supabase) connected to `kamunity` GitHub repo. Also has: ecosystem-state.json, kai-constitution.md, NLnet draft, kai-vine-code-scope.md, ai-groundwork-scope.md. | PROJECTS/kamunity-ai/ + extract docs → KNOWLEDGE/ |

#### VALUABLE DOCS — Extract to KNOWLEDGE/ then Archive

| Folder | Key Files | Extract To |
|---|---|---|
| **NeoKamunity/** | `ecosystem-state.json`, `kai-constitution.md`, `nlnet-application-draft.md`, `kai-vine-code-scope.md`, `ai-groundwork-scope.md`, `kai-manual-tasks.md`, `kai-OPUS_HANDOFF.md` | KNOWLEDGE/ |
| **kamunity-engine/** | `LEARNING_LOG.md` (22KB!), `RESEARCH_PROTOCOL.md`, `CONFIDENCE_MODEL.md`, `ENGINE.md`, `PLATFORM_STATE.md`, `OPENING_PROMPT.md` | KNOWLEDGE/engine-v1/ (case study gold) |
| **RAG MAterial/** | PDFs + docs for RAG training (Lean Startup, Value Exchange History, AI in PM) | KNOWLEDGE/RESEARCH/ |
| **Dev-Stuff/** | `Grant hub.docx` | KNOWLEDGE/ |
| **LANN MVP and Build/** | `Local Area Nerd Network – Quick-fire Bios.docx` | KNOWLEDGE/ |

#### THE ENGINE (Special — Case Study Archive)

| Folder | Contents | What It Is |
|---|---|---|
| **kamunity-engine/** | LEARNING_LOG, RESEARCH_PROTOCOL, CONFIDENCE_MODEL + 3 built projects (grants-hub, nonna_knits_club, outcome-vine) + research/, specs/, critiques/, reviews/, builds/, synthesis/ | **Vine-o-Code v1 engine.** This folder IS the case study. It built grants-hub, nonnas-knitting-circle, and outcome-vine using the methodology. Each sub-project has full foundation docs + React/Vite code. The LEARNING_LOG alone is 22KB of accumulated methodology insights. |

**Recommendation:** Archive the full folder but extract key methodology docs to KNOWLEDGE/engine-v1/. The three built projects (grants-hub, nonna_knits_club, outcome-vine) are evidence of the methodology working.

#### ARCHIVE — Historical builds

| Folder | What It Is | Era | Notes |
|---|---|---|---|
| **Kamunity-MVP/** | Original static HTML MVP. 20+ pages. Has .git (connects to Kamunity-MVP GitHub repo). | Mar 2025 | The first prototype. Historical value. |
| **community-hub-app/** | Substantial vanilla JS codebase (21 files, 50KB+ scripts). Actions, discussions, exchange, focus, plans modules. 40KB kamunity-db.js. | Unknown | Possibly deploys to kamunitydemo.org. **CHECK WITH MIKE.** | +++MIKE RESPONSE old so if not kamunity.ai or kamunity.org (current deploys) it was an experiement and can be learned from and archived++++
| **1 K-Demo/** | Subfolder of kamunity-demo. | Old | Duplicate of kamunity-demo repo |
| **1a-neovibefactory/** | Large zips (207MB + 157MB) + NeoRalphCode Pack, NeoVibe, Mycelium Space, room pack. | Mid-2025 | Historical FactoryK builds. Large files. |
| **KamunityAI_Code/** | Contains just MVP/ subfolder. | Old | Near-empty. Likely superseded. |
| **Vibe Coded/** | Kamunity-Prototype, KamunityCardGame, kamunity-multiplayer + Node installer (31MB). | Mid-2025 | Experiments and prototypes. | ++++MIKE RESPONSE keep these as they wil become projects or are active playing and should have a folder for me just kmaking stuuf and dumping it in. I have loads of notebookLM podcasts, and vidoes and articles etc that need to have a home. all stories and relevant historical and content related stuff, i'd like to download all of my chats with OPENAI to add too bc so many conversations and artifcats and reports and budgets etc have been saved in openAi and we need to get that out, at sokme point.+++
| **HeroGameTest/** | Simple HTML/JS/CSS game (index.html + script.js + style.css). | Unknown | Experiment |+++MIKE RESPONSE same as the line above. The below copy can be archived
| **kamunity_catalyst/** | Identical file sizes to HeroGameTest. | Unknown | Duplicate of HeroGameTest |

#### SECURITY CONCERN

| Folder | Issue | Action |
|---|---|---|
| **important teck/** | Contains `Api keys for sendmail captcha.docx` (32KB). API keys in a Word doc. | **DO NOT put in archive zip.** Move to a secure location outside the project folder. Rotate any keys stored here. |

---

### Local C:\Users\mikef\ (5 locations, 9 folders)

| Location | Contents | What It Is | Action |
|---|---|---|---|
| **C:\Users\mikef\KamunityAI/** | Python app (app.py + requirements.txt + venv) + Kai HTML. | Early Kai prototype. Python Flask/FastAPI based. | ARCHIVE |
| **C:\Users\mikef\NeoRalph_Migration/** | Same files as KamunityAI minus NeoRalph2/ subfolder. | Migration copy of KamunityAI. | ARCHIVE (duplicate) |
| **C:\Users\mikef\NeoKamunity/** | .windsurf, build files, kamunity subfolder, files.zip. | Partial duplicate of OneDrive NeoKamunity. | ARCHIVE (duplicate — OneDrive version is more complete) |
| **C:\Users\mikef\kamunity-10july/** | Large Next.js project. Supabase, room builder, security audit, builder-code-parser, content system, cleanup scripts, archive folder. 37+ files. | July 2025 platform build. Connected to kamunity-10july GitHub repo. | ARCHIVE (superseded, repo preserved on GitHub) |
| **C:\Users\mikef\1_NeoVibe/** | Multiple large zips (207MB + 157MB + 217MB NeoKamunityWedding). KUAI-MVP, NeoKamunity-by-AI, NovKUFork, Searches, core docs, june MVPs, HTML prototypes (59KB + 64KB). | Historical build archive. The motherlode of old iterations. | ARCHIVE (largest collection — some may duplicate OneDrive 1a-neovibefactory) |

---

## 0.3 — Infrastructure Map

### The Connections

```
GITHUB REPOS                    NETLIFY SITES                    CODE FOLDERS
─────────────                   ─────────────                    ────────────
kamunity-org ──── CI/CD ────→ kamunityai (kamunity.org)         OneDrive: NeoKamunity/Kam-org rebuild/
                                                                 
kamunity ──────── CI/CD ────→ sparkling-moxie (kamunity.ai)     OneDrive: NeoKamunity/kamunity/
                                                                 
NeoKamunityWedding ─ CI/CD ─→ fariha-mike-wedding-2026          Local: 1_NeoVibe/NeoKamunityWedding.zip
                                                                 
kamunity-demo ─── CI/CD ────→ kamunity-demo (kamunitydemo.org)  OneDrive: 1 K-Demo/ + community-hub-app/?
                                                                 
kamunity-10july ─ CI/CD ────→ kamunity-10kjuly                   Local: kamunity-10july/
                                                                 
mvb-prototype ─── CI/CD ────→ kamunitymvb                        (no local folder found)
                                                                 
Kamunity-MVP ──── (no site) ─→ (none)                            OneDrive: Kamunity-MVP/
```

### Orphaned Netlify Sites (No GitHub Repo — Drag-and-Drop)

```
NETLIFY SITE                      CODE FOLDER (probable source)
────────────                      ────────────────────────────
kamunity-ai-readiness             OneDrive: Kamunity AI Readiness/
kamunity-audit                    OneDrive: kamunity-consulting-ai/
kamunity-org-rebuild              OneDrive: NeoKamunity/Kam-org rebuild/ ?
vine-o-coding                     OneDrive: kamunity-engine/outcome-vine/ (superseded)
                                  OR separate build
nonnas-knitting-circle            OneDrive: kamunity-engine/nonna_knits_club/
grants-hub                        OneDrive: kamunity-engine/grants-hub/
factoryk1                         Unknown source folder
outcome-vine                      OneDrive: kamunity-engine/outcome-vine/
adorable-dango (Greenfield Plan)  Unknown source folder
subtle-starship (System Map)      Unknown source folder
starlit-unicorn (Needs Journey)   Unknown source folder
candid-donut (Mycelium)           OneDrive: 1a-neovibefactory/The Mycelium Space/ ?
```

---

## Summary Statistics

| Category | Count | Active | Archive | Triage |
|---|---|---|---|---|
| GitHub Repos | 7 | 3 | 3 | 1 (kamunity-demo — keep as playground) |
| Netlify Sites | 18 | 12 | 4 | 2 (kamunity-org-rebuild, factoryk1) |
| OneDrive Folders | 17 | 4 | 10 | 2 (community-hub-app, important teck) |
| Local Folders | 5+ | 0 | 5 | 0 |

### Key Discoveries

1. **kamunity-engine/ is Vine-o-Code v1** — it built grants-hub, nonnas-knitting-circle, and outcome-vine. The LEARNING_LOG (22KB) is methodology evolution gold. Case study material.

2. **NeoKamunity/ has critical docs** — ecosystem-state.json (the file Kai reads), kai-constitution.md, NLnet draft, and vine-code scoping docs. These must be extracted to KNOWLEDGE/ before archiving.

3. **community-hub-app/ is substantial** — 21 files, large scripts. Might be what deploys to kamunitydemo.org. **Needs your confirmation.**

4. **important teck/ has API keys in a docx** — security concern. Should NOT go in any archive zip. Move to secure location, rotate keys.

5. **kamunity-10july/ (local) is a full platform build** — Next.js + Supabase with room builder, security audits, content system. Historical but potentially valuable architecture reference.

6. **Significant duplication** — NeoKamunity exists in both OneDrive and local. 1a-neovibefactory and 1_NeoVibe contain overlapping large zips (207MB + 157MB each).

7. **~800MB+ in zip files** across OneDrive and local. Consider whether these need to stay or can be consolidated into one archive location.

---

## Open Questions for Mike (Phase 0 CHECK)

1. **community-hub-app/** — is this the code that deploys to kamunitydemo.org? Or something else? +++MIKE RESPONSE notsure, check more deeply++
2. **kamunity-org-rebuild** (Netlify) — is this an old attempt before the current kamunity.org, or still relevant? +++MIKE RESPONSE old attempt++
3. **factoryk1** (Netlify) — what's the source code folder for this? +++MIKE RESPONSE check more deeply++
4. **important teck/** — are these keys still active? Do they need rotating? +++MIKE RESPONSE no-one else has seen them execpt you now ....++
5. **The 4 auto-named sites** — do the suggested rename names feel right? +++MIKE RESPONSE yes++
6. **Any other code locations** I haven't found? Other drives, cloud storage, GitHub accounts? +++MIKE RESPONSE that will do for now++

---

*Phase 0 audit complete. Awaiting Mike's review before proceeding to Phase 1.*
