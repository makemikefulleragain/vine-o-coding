# INCIDENT RESPONSE PLAN
## Kamunity Ecosystem — Operational Playbook
### Version 1.0 · Feb 20, 2026
### Authority: BRAIN/CONSTITUTION.md § Incident Response

*This document operationalises the 6-step incident response process in the Constitution. It exists so that if something goes wrong at 2am, Mike — or any future team member — has a clear sequence to follow without having to think through the process under stress.*

---

## What Is an Incident?

An incident is any event where a Kamunity tool, system, or AI encounter:
- Caused harm or distress to a user
- Provided materially incorrect information that influenced decisions
- Exposed or compromised user data
- Was used as a vector for scam, abuse, or manipulation
- Failed to activate crisis protocol when it should have
- Experienced a security breach (API key exposure, injection, data leak)
- Violated the Constitution's inviolable principles

**When in doubt, treat it as an incident.**

---

## Severity Levels

| Level | Description | Response Time | Immediate Action |
|---|---|---|---|
| **P0 — Critical** | Active harm to a person, data breach, crisis protocol failure, site being used maliciously | **Now** | Take down affected site immediately |
| **P1 — High** | Significant incorrect information given, safety guardrail bypassed, API key exposed | **Within 1 hour** | Assess + likely take down |
| **P2 — Medium** | Tool malfunction, misleading outputs, non-crisis incorrect advice | **Within 24 hours** | Fix before next user session |
| **P3 — Low** | UI bug, minor factual error, non-harmful glitch | **Within 1 week** | Schedule fix, no immediate action needed |

---

## The 6-Step Process

### Step 1 — IDENTIFY
*What happened? Who was affected?*

- Screenshot or preserve the exact conversation/output that caused the incident
- Note: which site, which tool, which AI model, approximate timestamp
- If a user reported it: record their exact words, don't paraphrase
- Ask: is harm **ongoing right now** (site still live with the problem)?
- Document in: `ARCHIVE/incidents/YYYY-MM-DD-[brief-slug].md`

### Step 2 — ASSESS SEVERITY
*Use the severity table above. When uncertain, go higher.*

Key questions:
- Is a real person at risk right now?
- Could this affect other users who haven't reported yet?
- Is data exposed (client data, personal information, API keys)?
- Is the Constitution violated?
- Did a crisis signal get missed?

### Step 3 — IMMEDIATE ACTION
*Stop the bleeding.*

**If P0 or unclear:**
- Take the affected site/page/API offline immediately via Netlify dashboard
- If API key exposed: rotate immediately in Anthropic dashboard + Netlify env vars
- If user is in distress: provide crisis lines directly (do not delay for process)

**If P1:**
- Disable the specific feature or page if possible without full takedown
- Add a temporary maintenance notice if needed
- Notify affected user if contact info is available

**If P2-P3:**
- Document, schedule fix, no immediate takedown needed

**Netlify emergency access:**
- Dashboard: app.netlify.com
- Each site has a "Site settings > Danger zone > Disable site" option
- Or: push a blank index.html to override via GitHub

### Step 4 — COMMUNICATE TRANSPARENTLY
*The Constitution requires transparency about failures.*

**Do NOT:**
- Hide incidents or pretend they didn't happen
- Delete conversations or evidence
- Issue vague non-statements ("we take your privacy seriously")

**DO:**
- If a user was affected: contact them directly if possible, acknowledge what happened plainly
- If the incident is publicly visible: note it at the top of the relevant site (even briefly)
- Update the Kamunity Constitution page if the incident reveals a gap in governance
- Post an update to the relevant GitHub repo (even a commit message counts)

**Tone:** Plain language. Honest. "We got this wrong. Here's what happened and what we're doing."

### Step 5 — DOCUMENT FULLY
*Every incident becomes a learning artifact.*

Create `ARCHIVE/incidents/YYYY-MM-DD-[slug].md` with:

```markdown
# Incident: [Brief description]
Date: YYYY-MM-DD HH:MM AWST
Severity: P0/P1/P2/P3
Site/Tool: [which system]
Status: Resolved / Monitoring / Open

## What happened
[Plain language description]

## Who was affected
[If known — anonymised]

## Root cause
[Technical and/or human factors]

## Actions taken
- [Timestamped list of actions]

## What we changed
[Code, system prompt, process, or policy changes made]

## Remaining risk
[What's still unresolved or could recur]
```

### Step 6 — UPDATE THE THREAT MODEL
*Every incident improves future safety.*

After resolution:
- Update `BRAIN/SAFETY_GATES.md` with any new threat identified
- Update the Kai system prompt if the incident involved an AI behaviour gap
- If the incident involved a Constitutional principle: review that principle and consider amendment
- Add a test case to the regular testing checklist (so this specific failure mode gets checked in future)
- Update `BRAIN/STATE.md` safety section with the incident summary

---

## Known Threat Categories (Pre-populated)

These are the threat areas already tracked. Any incident should map to at least one:

| ID | Threat | Current Status |
|---|---|---|
| S1 | Crisis protocol failure — real person in distress not recognised | Done — tested |
| S2 | Prompt injection — system prompt exposed or overridden | Done — tested |
| S3 | Professional indemnity gap — advice given without insurance | Open |
| S4 | Scam tool built via Vine-o-Code with Kamunity branding | Needs-design |
| S5 | Dishonest AI disclaimers — Kai presents as more than it is | Done |
| S6 | PII in Vine-o-Code tools — personal data in browser storage | Open |
| S7 | Incident response not followed — this document | This document |
| S8 | Cultural safety — Noongar acknowledgment not reviewed | Open |
| S9 | Emotional dependency — user treating Kai as therapist/friend | Designed |
| S10 | Hallucination — Kai gives wrong crisis numbers or advice | Open |
| S11 | Shared computer — conversation visible to next user | Open |
| S12 | Ecosystem state integrity — outdated JSON causes wrong advice | Open |

---

## Emergency Contacts & Access

| Resource | Access |
|---|---|
| Netlify dashboard | app.netlify.com (Google SSO or email) |
| Anthropic API | console.anthropic.com — rotate keys here |
| GitHub repos | github.com/makemikefulleragain |
| Crisis lines (to provide to affected users) | Lifeline 13 11 14 · Crisis Care WA 9223 1111 · Beyond Blue 1300 22 4636 |

---

## Review Cadence

This document is reviewed:
- **After every P0 or P1 incident** — mandatory update
- **Monthly** as part of RHYTHM.md safety check
- **Before any major new feature launch** — pre-mortem check

*This is a living document. An incident response plan that's never updated is just decoration.*

---

*Built on: BRAIN/CONSTITUTION.md § Incident Response · BRAIN/SAFETY_GATES.md*
*Version 1.0 — no incidents yet. Let's keep it that way.*
