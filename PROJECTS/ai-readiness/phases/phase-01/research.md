# Phase 1 Research — The Quiz

## Search Summary (5/5 searches used)

1. "AI readiness self-assessment tool nonprofit community organisations Australia"
2. "AI readiness framework dimensions community sector small organisations"
3. "best practices quiz design self-assessment UX mobile-first accessible"
4. "AI readiness assessment nonprofit NFP questions dimensions scoring radar chart"
5. "React radar chart library recharts chart.js accessible lightweight"

---

## Key Findings

### Existing Tools — None Serve Priya

| Tool | Target | Questions | Data Collection | Free? |
|------|--------|-----------|-----------------|-------|
| ARM Hub AI Adopt | Australian businesses | 10 | Requires contact info | Yes |
| Australian Gov Responsible AI Index | All Australian orgs | Unknown | Enterprise-focused | Yes |
| Microsoft AI Readiness | Enterprise | ~20 | Microsoft ecosystem | Yes |
| Ambysoft AI Readiness | Enterprise/dev teams | 30 | Excel download | Yes |
| SurveyMonkey template | Generic | Template | SurveyMonkey account | Freemium |
| TDWI AI Readiness | Data teams | Unknown | Requires form | Yes |

**Gap:** No tool targets community orgs, NFPs, neighbourhood centres, or Aboriginal community-controlled organisations. All existing tools assume business context (revenue, data infrastructure, IT teams). None address the community sector's unique concerns: sensitive client data, volunteer workforces, limited budgets, board governance questions.

### Dimension Frameworks in the Wild

- **ARM Hub:** Strategy, Data, Technology, People, Process
- **Australian Gov:** Accountability, Safety, Fairness, Transparency, Explainability
- **Ambysoft:** Leadership, Ethics, Business Stakeholders, Data, Team Building, Team Members, Ways of Working (7 dimensions, too many)
- **Quinnox:** Strategy, Culture, Data, Technology, Operating Model

**Our 4 dimensions (from CONSTITUTION):** Understanding, Current Use, Safety & Ethics, Readiness to Act — these are better suited because they map to where community orgs actually are. Most aren't asking "how do we build AI?" — they're asking "should we be using it at all?"

### Quiz Design Best Practices

- **2-minute target = 12 questions max** (studies show ~10 seconds per simple question + transitions)
- **3 questions per dimension** gives meaningful signal without fatigue
- **Likert-style (1-4 scale)** works best for self-assessment — avoid 5-point scales (people cluster at middle)
- **Mobile-first:** Large touch targets, one question per screen, progress indicator
- **No login/email gate** — results immediately visible (sovereignty principle)
- **Screenshot-friendly results** — radar chart + summary on single viewport

### Radar Chart Technology

- **Recharts** is the clear winner: React-native, SVG-based, lightweight (~45KB gzipped), excellent radar chart support, accessible, well-maintained
- Alternative: Chart.js via react-chartjs-2 — heavier, canvas-based (less accessible)
- Recharts radar charts are customizable, responsive, and render well on mobile

### Failure Modes to Watch

1. **Questions too jargon-heavy** — Priya doesn't know what "data governance" means in AI context
2. **Results too generic** — "You scored 2/4 on Understanding" is useless without specific next steps
3. **Radar chart without context** — chart alone doesn't tell Priya what to DO
4. **No way to share/save** — Priya needs to show this to her CEO
5. **Condescending tone** — "You're not ready" is harmful; reframe as "here's your starting point"

---

## Who Is NOT In Scope

Defining per MISSION.md instruction:
- Large organisations with dedicated IT/data teams
- Government agencies (they have their own frameworks)
- Tech companies or startups
- Individual consumers
- Organisations already deploying AI at scale

---

## Research Signal: STRONG

There is a clear gap. No existing tool serves community orgs. The 4 dimensions from the CONSTITUTION are well-suited. The technical approach (React + Recharts + client-side only) is proven. The 12-question / 2-minute format is validated by UX research.
