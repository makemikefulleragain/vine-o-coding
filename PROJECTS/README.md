# PROJECTS — Active Codebases
## Where Everything Lives
### Last Updated: Feb 19, 2026

*Each project is self-contained — own dependencies, own deploy target. They share BRAIN/ and KNOWLEDGE/ (documents), not code.*

---

## Currently Inside This Folder

| Project | Path | Stack | Deploy | Status |
|---|---|---|---|---|
| Kitchen Table | `../kitchen-table/` | Vanilla JS ES modules | Local only (python server) | ✅ Active |

## Still in Original Locations (Move When Ready)

### Drag-and-Drop Deploy (Safe to Move)

| Project | Current Location | Target | Stack | Deploy To |
|---|---|---|---|---|
| AI Readiness | `Dev_Code/Kamunity AI Readiness/` | `PROJECTS/ai-readiness/` | React+Vite | kamunity-ai-readiness.netlify.app |
| Sovereignty Audit | `Dev_Code/kamunity-consulting-ai/` | `PROJECTS/sovereignty-audit/` | React+Vite | kamunity-audit.netlify.app |

**To move these:** Delete `node_modules/` first, then move the folder. Run `npm install` after.

### Git + CI/CD Connected (Move With Caution)

| Project | Current Location | Target | Stack | GitHub Repo | Deploy To |
|---|---|---|---|---|---|
| kamunity.ai | `Dev_Code/NeoKamunity/kamunity/` | `PROJECTS/kamunity-ai/` | Next.js+TS+Drizzle+Supabase | `kamunity` (private) | kamunity.ai |
| kamunity.org | *Location TBD — check git clone* | `PROJECTS/kamunity-org/` | HTML/JS + Claude API | `kamunity-org` | kamunity.org |
| Wedding | *Location TBD — check git clone* | `PROJECTS/wedding/` | Unknown | `NeoKamunityWedding` (private) | fariha-mike-wedding-2026.netlify.app |

**To move these:** Clone fresh into PROJECTS/ from GitHub. Update local git config. Test CI/CD with a trivial commit before deleting old location.

### Not Yet Created

| Project | When | Notes |
|---|---|---|
| WALGA | When scope defined | Live client project |
| Vine-o-Code (methodology site) | During KP-11 | Source folder TBD |

---

## Move Instructions (For Mike)

### Step 1: Drag-and-Drop Projects — ✅ DONE (Feb 19, 2026)
AI Readiness moved to `PROJECTS/ai-readiness/`
Sovereignty Audit moved to `PROJECTS/sovereignty-audit/`
Run `npm install` in each before next deploy.

### Step 2: Git Projects (Do One at a Time, Verify CI/CD)
```powershell
# kamunity.ai — clone fresh
git clone https://github.com/makemikefulleragain/kamunity.git "Dev_Code\Kamunity-Tabletop-Plan\PROJECTS\kamunity-ai"
# Make a trivial change, push, verify Netlify deploys
# Only after verified: delete old location

# kamunity.org
git clone https://github.com/makemikefulleragain/kamunity-org.git "Dev_Code\Kamunity-Tabletop-Plan\PROJECTS\kamunity-org"
# Same: trivial push, verify, then delete old

# Wedding
git clone https://github.com/makemikefulleragain/NeoKamunityWedding.git "Dev_Code\Kamunity-Tabletop-Plan\PROJECTS\wedding"
# Same pattern
```

### Step 3: Verify Everything
After each move, check:
- [ ] Site still loads at its URL
- [ ] `npm install` works in new location
- [ ] For git projects: `git push` triggers Netlify deploy
- [ ] No broken references

---

*Don't rush this. Do one project at a time. Verify after each move. The old folders stay until the new ones are confirmed working.*
