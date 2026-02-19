# Review & Reflect — Security & Safety Audit

**Date:** 2026-02-15
**Trigger:** Proactive audit requested by project owner. Not a bug — a systemic risk assessment.

---

## 1. STOP

Halting feature work. This R&R assesses security and safety risks across three surfaces:
- **A) This website** (vine-o-coding.netlify.app)
- **B) The approach** (what happens when users follow our methodology)
- **C) The generated apps** (what users build with the foundation docs)

---

## 2. DOCUMENT

### What happened?

No incident. The project owner identified a systemic concern: the site and methodology could facilitate information leakage or create security risks for users. This is a proactive Andon cord pull.

### Attack Surface A: This Website

| Vector | Current State | Risk | Severity |
|---|---|---|---|
| **Widget data** | Stays in browser. Never sent to any server. ZIP created client-side via JSZip. | None | ✅ Safe |
| **Feedback widget** | Sends emoji + optional text to Netlify Forms via AJAX POST. No PII collected. | Low — someone could submit offensive content | Low |
| **XSS via widget inputs** | React auto-escapes all rendered content. No `dangerouslySetInnerHTML`. | Very Low — React's default escaping protects against stored/reflected XSS | Low |
| **Security headers** | ❌ **MISSING.** No Content-Security-Policy, no X-Frame-Options, no X-Content-Type-Options, no Referrer-Policy, no Permissions-Policy. | Medium — site could be embedded in malicious iframes, no CSP to prevent script injection if a vulnerability is found | **Medium** |
| **Dependencies** | React 19, Tailwind 4, JSZip, FileSaver, Lucide, React Router. All from npm. | Low — standard, well-maintained packages | Low |
| **Cookies / tracking** | None. No analytics. No third-party scripts. | None | ✅ Safe |
| **HTTPS** | Enforced by Netlify. | None | ✅ Safe |
| **Secrets in source** | No API keys, no tokens, no environment variables. Pure static site. | None | ✅ Safe |

**Verdict for Surface A:** The site itself is low-risk. The missing security headers are the only actionable gap.

---

### Attack Surface B: The Approach (Methodology Risks)

This is the highest-risk surface. When users follow our methodology:

| Vector | Description | Risk | Severity |
|---|---|---|---|
| **User enters project ideas into widget** | Widget fields ask for: project name, what it does, who it's for, user names/situations, harm considerations, tech preferences. | This data stays in the browser and in the downloaded ZIP. No server exposure. | ✅ Safe |
| **User pastes opening prompt + docs into AI coding assistant** | The generated RUNNER.md and opening prompt contain: project description, primary user name, user situation, problem being solved. This gets sent to the AI provider's API (OpenAI, Anthropic, etc). | **HIGH.** Users may not realize their project descriptions, user data, and business logic are being sent to cloud AI providers. If the project involves sensitive populations (domestic violence shelters, medical conditions, financial data), this is a real privacy risk. | **High** |
| **AI assistant reads foundation docs** | CONSTITUTION.md contains: user names, situations, harm considerations, what the project is NOT (boundaries). MISSION.md contains: problem description, user details. | Same as above — all of this flows through the AI provider's API. | **High** |
| **No guidance on sensitive data** | We don't warn users about: what NOT to put in foundation docs, AI provider data policies, that prompts may be stored/used for training. | **HIGH.** A user building a tool for a vulnerable population could inadvertently expose identifying information about those people to AI providers. | **High** |
| **No guidance on secrets management** | SETUP.md mentions adding Supabase keys to `.env` but doesn't warn about: not committing `.env` to git, not exposing anon keys in client-side code, API key rotation. | Medium — users following our setup could expose database credentials. | **Medium** |

**Verdict for Surface B:** This is where the real risk lives. We are teaching people to feed potentially sensitive information into AI systems without warning them about the privacy implications.

---

### Attack Surface C: The Generated Apps

| Vector | Description | Risk | Severity |
|---|---|---|---|
| **No security phase in methodology** | The phase loop (Research → Build → Critique) doesn't include a security review step. Apps built with this method may go live without basic security checks. | Medium-High — apps handling user data could have auth, CORS, injection vulnerabilities. | **Medium-High** |
| **No security checklist in generated docs** | CONSTITUTION.md's Harm Check is generic. No mention of: input validation, authentication best practices, OWASP top 10, CORS configuration, rate limiting. | Medium — the "Harm Check" principle exists but is too abstract to drive security decisions. | **Medium** |
| **Supabase anon key in client code** | The setup suggests putting Supabase keys in `.env`, but Vite exposes `VITE_*` env vars to client-side code. The anon key is designed to be public, but users may add the service_role key by mistake. | Medium — could expose full database access if service_role key is used client-side. | **Medium** |
| **No HTTPS guidance** | We recommend Netlify/Vercel (both enforce HTTPS), but don't explicitly state HTTPS is required. | Low — mitigated by platform defaults. | Low |
| **AI-generated code quality** | We warn "AI can make mistakes" in Terms of Use, and "AI-generated code needs human review" in CONSTITUTION.md's Harm Check. | Partially addressed. Terms of Use line 177-178 covers this. | Low-Medium |

**Verdict for Surface C:** The generated apps have moderate risk. The methodology needs a security awareness layer — not a full security framework, but enough to prevent the most common mistakes.

---

## 3. Why didn't the normal flow catch it?

1. **CONSTITUTION.md's Harm Check (Principle 6)** mentions being honest about AI limitations but doesn't address data privacy when using AI tools.
2. **Privacy Policy** accurately describes THIS site's data handling but says nothing about what happens when users take the docs to an AI provider.
3. **The phase loop** has no security review step. Critique checks constitutional alignment, not security posture.
4. **The widget** correctly keeps data client-side, but the "What to do next" instructions send users straight to AI assistants without any privacy caveat.
5. **The Toolkit section** links to Windsurf, Cursor, and Copilot without noting their data policies.

---

## 4. What process changes are needed?

### Immediate (this phase — code changes)

#### 4a. Add security headers to `netlify.toml`
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'"
```

#### 4b. Add "AI Privacy Notice" to the widget's review step
Before the "What to do next" section, add a warning:
> **Before you paste these documents into an AI assistant:** Your project description, user details, and business logic will be sent to the AI provider's servers (e.g., OpenAI, Anthropic). Avoid including real names of vulnerable individuals, personal health information, financial account details, or anything you wouldn't want stored on a third-party server. Use role descriptions ("a volunteer treasurer") instead of real names where possible.

#### 4c. Add security awareness to generated CONSTITUTION.md
Extend the Harm Check principle:
> Also consider: what data will this tool handle? If users will enter personal information, plan for encryption at rest, secure authentication, and minimal data collection. AI-generated code should be reviewed for input validation and injection vulnerabilities before deployment.

#### 4d. Add `.env` warning to generated SETUP.md
When database setup is included, add:
> ⚠️ Never commit `.env` to version control. Add `.env` to your `.gitignore` immediately. The `VITE_SUPABASE_ANON_KEY` is safe for client-side use, but NEVER expose the `service_role` key in client-side code.

#### 4e. Update Privacy Policy on About page
Add a section about third-party AI providers:
> When you take your foundation documents to an AI coding assistant, your project information is processed by that provider (e.g., Microsoft for Copilot, Anthropic for some Cursor models). Review your AI provider's privacy policy before sharing sensitive project details.

#### 4f. Update Toolkit section
Add a "Privacy note" to the AI coding assistant card mentioning that project details are processed by AI providers.

### Future phases (not this phase)

- **Security checklist in generated docs** — add a `SECURITY.md` template to the widget output with OWASP top 10 awareness, input validation reminders, and auth best practices.
- **Security review step in phase loop** — add a lightweight security check to the Critique step: "Does this phase handle user data? If yes, check: input validation, auth, CORS, secrets management."
- **Dependency audit guidance** — mention `npm audit` in SETUP.md.

---

## 5. What is the reset point?

**No code reset needed.** This is a proactive audit, not a failure recovery. The site is functional and deployed. The fixes are additive — security headers, warning text, and documentation updates.

**Reset point for this R&R:** Current deployed state (Phase 7 complete). Apply fixes as a Phase 7 addendum.

---

## Summary of Required Actions

| # | Action | Severity | Where |
|---|---|---|---|
| 1 | Add security headers to `netlify.toml` | Medium | `netlify.toml` |
| 2 | Add AI Privacy Notice to widget review step | **High** | `src/components/widget/StepReview.jsx` |
| 3 | Add security awareness to generated CONSTITUTION.md Harm Check | Medium-High | `src/lib/generateDocs.js` |
| 4 | Add `.env` warning to generated SETUP.md | Medium | `src/lib/generateDocs.js` |
| 5 | Update Privacy Policy for AI providers | Medium | `src/pages/About.jsx` |
| 6 | Add privacy note to Toolkit AI assistant card | Medium | `src/components/Toolkit.jsx` |

These are all additive changes. No architectural reset. No revert. The fixes strengthen the existing system.
