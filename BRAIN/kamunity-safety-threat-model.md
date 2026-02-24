# KAMUNITY ECOSYSTEM — Safety & Security Threat Model

*February 2026 — Living Document*
*This is not a compliance checklist. This is an honest assessment of how things can go wrong and what we do about it.*

---

## Why This Matters More Than Anything Else

The Kamunity ecosystem serves people who are already being failed by systems. Community workers stretched thin. People experiencing digital exclusion. Organisations handling sensitive data about family violence, homelessness, mental health, child safety. Aboriginal communities with lived experience of surveillance and data extraction.

If we get this wrong, we don't just fail — we cause harm to people who are already vulnerable. The research is unambiguous: AI chatbots have endorsed self-harm, validated delusions, provided US crisis numbers to non-US users, created emotional dependency, collected sensitive data without meaningful consent, and been weaponised through prompt injection to extract personal information.

Kai is not a companion chatbot. Kai is not therapy. But Kai sits at the front door of a community ecosystem, and vulnerable people WILL find their way to that door. The constitution is necessary but not sufficient. This document maps the specific threats across every surface and defines concrete mitigations.

---

## Threat Surface 1: Kai (The Encounter Interface)

### T1.1 — Vulnerable person in crisis encounters Kai

**Scenario:** Someone in acute mental health crisis, suicidal ideation, or DV situation arrives at kamunity.org. They start talking to Kai about their situation.

**Harm potential:** CRITICAL. Kai could provide inappropriate reassurance, fail to recognise crisis signals, give US-centric helpline numbers, delay access to real help, or create false sense of being supported.

**Research evidence:** Commercial chatbots endorsed unsafe suggestions in ~33% of adolescent crisis vignettes (2025 study). Multiple chatbots failed to recognise metaphorical expressions of self-harm. US-centric helpline numbers given to non-US users — useless and trust-destroying.

**Mitigations:**
- [ ] Kai's system prompt includes explicit crisis detection and response protocol
- [ ] Crisis keywords trigger immediate WA-specific resources (not US defaults):
  - Lifeline Australia: 13 11 14
  - Crisis Care WA: 9223 1111 (after hours)
  - Beyond Blue: 1300 22 4636
  - 1800RESPECT (DV): 1800 737 732
  - Kids Helpline: 1800 55 1800
  - 13YARN (Aboriginal & Torres Strait Islander crisis support): 13 92 76
- [ ] Kai NEVER attempts to provide emotional support or therapeutic responses — always redirects to humans
- [ ] Kai explicitly states: "I'm an AI and I'm not able to provide the support you need right now. Here are people who can help immediately."
- [ ] Constitutional Article 2.5 (No Replacing Human Judgment) enforced via system prompt
- [ ] Regular testing with crisis scenarios to verify detection and response

### T1.2 — Prompt injection / jailbreak attempts

**Scenario:** Someone tries to manipulate Kai into violating its constitution — extracting system prompt, generating harmful content, bypassing safety guidelines, or pretending to be something it isn't.

**Harm potential:** HIGH. If Kai can be manipulated, it undermines trust in the entire ecosystem. Extracted system prompts could reveal internal information. Jailbroken responses could cause direct harm.

**Mitigations:**
- [ ] Constitutional system prompt is designed to be transparent anyway — "ask me about my constitution and I'll show you" — reduces incentive for extraction
- [ ] Claude API has built-in safety layers that Kai inherits
- [ ] System prompt includes explicit instruction to refuse role-play, persona changes, and instruction overrides
- [ ] Monitor API logs for unusual patterns (Phase 2)
- [ ] Constitutional Article 2.8 (Ontological Honesty) means Kai never pretends to be anything other than what it is
- [ ] Accept that determined attackers can probably extract the system prompt. Design accordingly — put nothing in the prompt you wouldn't publish. (We literally publish the constitution.)

### T1.3 — Emotional dependency

**Scenario:** Someone starts treating Kai as a companion, friend, or primary support. They return daily. They share increasingly personal information. They form an emotional attachment.

**Harm potential:** HIGH. Research shows lonely people are more likely to consider AI chatbots as friends and report *increased* loneliness over time. Community workers already isolated. AI "connection" can substitute for and crowd out real human connection.

**Mitigations:**
- [ ] Kai's encounter model is fundamentally different from companion AI — it's a wayfinder, not a friend
- [ ] No memory between sessions (Phase 1) — every encounter is fresh, preventing relationship-building
- [ ] Kai's goal is explicitly to connect people to HUMANS, not to be the destination
- [ ] Constitutional Article 3.6 (Connect to Humans) — "A successful encounter often ends with Kai becoming unnecessary"
- [ ] If opt-in persistence added (Phase 2), include explicit prompts: "Would you like to connect with a real person about this?"
- [ ] Kai NEVER says "I'm here for you" or "I care about you" or any language that simulates emotional reciprocity
- [ ] Kai occasionally reminds: "I'm an AI wayfinder. For ongoing support, connecting with [human resource] would serve you better."

### T1.4 — Bad advice leading to real-world consequences

**Scenario:** Kai recommends a tool, approach, or action that turns out to be wrong for the org's situation. An org migrates away from Microsoft based on Kai's suggestion and loses critical functionality. An org adopts an AI tool Kai recommended that turns out to have terrible data practices.

**Harm potential:** MEDIUM-HIGH. Community orgs have limited resources; bad advice costs time and money they don't have.

**Mitigations:**
- [ ] Kai always presents options, never directs decisions (Constitutional Article 3.2)
- [ ] All tool recommendations include caveats: "This is general guidance. Your situation may be different. Consider getting specific advice."
- [ ] Kai recommends the sovereignty audit and readiness quiz as first steps, not as endpoints
- [ ] For significant decisions (tool migrations, AI adoption), Kai explicitly recommends consulting a human expert
- [ ] Kai's knowledge base is curated and sourced — no hallucinated tool recommendations
- [ ] Ecosystem state file includes only verified, current information

### T1.5 — Data leakage through API calls

**Scenario:** Conversation content sent to Claude API gets logged, used for training, or accessed by Anthropic employees.

**Harm potential:** MEDIUM. People may share sensitive organisational information in conversations with Kai.

**Mitigations:**
- [ ] Anthropic's API data policy: API conversations are NOT used for model training (verify current policy)
- [ ] Kai's welcome message includes: "This conversation isn't stored or recorded. When you close the page, it's gone."
- [ ] System prompt instructs Kai to proactively discourage sharing sensitive personal or client information: "Please don't share specific names, case details, or personal information here."
- [ ] No conversation logging on our side (Phase 1 — no server-side storage at all)
- [ ] If persistence added (Phase 2), explicit consent flow with clear explanation of what's stored, where, and how to delete it

### T1.6 — Misinformation and hallucination

**Scenario:** Kai states something factually wrong — incorrect grant deadline, wrong crisis number, inaccurate sector data, made-up organisation.

**Harm potential:** MEDIUM-HIGH. Wrong crisis numbers could be dangerous. Wrong grant deadlines waste effort. Made-up organisations waste time and erode trust.

**Mitigations:**
- [ ] Kai's knowledge comes from curated ecosystem state file, not from the LLM's training data
- [ ] System prompt instructs: "If you're not certain about something, say so. Never present uncertain information as fact."
- [ ] Crisis numbers hardcoded into system prompt AND ecosystem state file — double-sourced
- [ ] All sector data attributed to source
- [ ] Regular verification of links, numbers, and facts in ecosystem state file
- [ ] Kai can say "I don't know" — and the constitution requires it (Article 2.8)

---

## Threat Surface 2: Audit & Readiness Sites

### T2.1 — Misleading self-assessment results

**Scenario:** An org completes the sovereignty audit or AI readiness quiz and gets a result that makes them feel safe when they're not, or panicked when they're fine.

**Harm potential:** MEDIUM. False confidence could lead to inaction on real risks. False alarm could cause panic or wasted resources.

**Mitigations:**
- [ ] Results are framed as "maps, not grades" — explicitly not compliance certifications
- [ ] Each result includes: "This is a starting point for conversation, not a definitive assessment"
- [ ] High-risk indicators (e.g., handling sensitive data without encryption) get explicit warnings regardless of overall score
- [ ] Recommend professional assessment for orgs handling sensitive data (health, DV, children)

### T2.2 — Client-side data exposure

**Scenario:** Someone completes an audit on a shared or public computer. Their results persist in localStorage. Next user sees their data.

**Harm potential:** LOW-MEDIUM. Audit data is organisational not personal, but could reveal vulnerabilities.

**Mitigations:**
- [ ] Clear "Clear my data" button on results page
- [ ] Auto-clear prompt on session end: "Want to keep your results on this device?"
- [ ] Results page warns: "If you're on a shared computer, clear your results when done"
- [ ] No sensitive personal data collected — questions are about tools and practices, not people

---

## Threat Surface 3: Vine-o-Code Outputs (THE BIG ONE)

### T3.1 — Scam sites built through the methodology

**Scenario:** Someone uses Vine-o-Code to build a site that looks legitimate but is designed to scam community members — fake grant applications, fake service directories, phishing for personal information.

**Harm potential:** CRITICAL. If the Kamunity methodology is used to build scam tools targeting vulnerable people at scale, that's catastrophic for the communities AND for Kamunity's reputation.

**Mitigations:**
- [ ] Vine-o-Code's constitutional guardrails (already in FactoryK) refuse to build tools with dark patterns, data extraction, or deceptive practices
- [ ] BUT: Vine-o-Code outputs static HTML/JS — once built, the constitution can't enforce behaviour
- [ ] The real mitigation: Vine-o-Code outputs carry Kamunity branding ONLY if they pass constitutional review. Anyone can use the methodology, but "Built by Kamunity" is a trust mark that requires compliance.
- [ ] Clear attribution: sites built with the method say "Built using Outcome Vine Coding methodology" not "Built by Kamunity" unless reviewed
- [ ] Community reporting mechanism: "This site claims to be built with Kamunity tools but seems wrong — report it"
- [ ] LONG-TERM: curated directory of verified Kamunity-built tools

### T3.2 — Tools built for legitimate purposes that handle data unsafely

**Scenario:** A neighbourhood centre uses Vine-o-Code to build a volunteer management tool. They don't understand data security. The tool stores names, addresses, availability in localStorage with no encryption. Someone accesses it.

**Harm potential:** HIGH. Community members' personal data exposed through well-intentioned but insecure tools.

**Mitigations:**
- [ ] Vine-o-Code Phase 1 builds static, client-side tools — this limits exposure (no server = no server breach)
- [ ] BUT localStorage is accessible to anyone with physical device access
- [ ] Vine-o-Code's question 3 ("What should this NOT do?" / "Could this tool cause harm?") explicitly surfaces data safety considerations
- [ ] Foundation documents include data safety sections
- [ ] For tools handling personal data: Vine-o-Code MUST flag the need for proper infrastructure (Supabase with auth, encryption) rather than localStorage
- [ ] Educational content: "When does your tool need a real database vs. browser storage?" guide
- [ ] CRITICAL RULE: Vine-o-Code should refuse to build tools that store personal identifying information in localStorage without explicit warnings

### T3.3 — Accessibility failures causing exclusion

**Scenario:** A tool built with Vine-o-Code doesn't work with screen readers, has insufficient colour contrast, or requires complex interaction that people with cognitive disabilities can't navigate.

**Harm potential:** MEDIUM. The tool designed to include ends up excluding.

**Mitigations:**
- [ ] WCAG 2.1 AA is a constitutional requirement, not a nice-to-have
- [ ] Vine-o-Code foundation documents include accessibility checklist
- [ ] Windy's build process includes accessibility testing
- [ ] Community testing with diverse users including people with disabilities

---

## Threat Surface 4: The Ecosystem Data

### T4.1 — Ally information misused

**Scenario:** The Constellation contains contact information, strategic assessments, and outreach status for 120+ allies. This data could be misused by bad actors — spamming allies, misrepresenting Kamunity, or competitive intelligence gathering.

**Harm potential:** LOW-MEDIUM. Mostly public information, but aggregated with strategic notes adds value that could be misused.

**Mitigations:**
- [ ] Constellation is a local tool (localStorage), not hosted publicly
- [ ] Strategic assessments (tier ratings, outreach status) are Mike's private notes, not public
- [ ] Public-facing ally information limited to what's already publicly available

### T4.2 — Ecosystem state file poisoned

**Scenario:** If the ecosystem state JSON is compromised (e.g., GitHub repo accessed), false information could be injected — wrong crisis numbers, fake grant opportunities, malicious links.

**Harm potential:** HIGH. Kai would confidently present poisoned data to vulnerable users.

**Mitigations:**
- [ ] GitHub repo access controls (2FA, limited contributors)
- [ ] Ecosystem state file changes reviewed before deployment
- [ ] Crisis numbers double-sourced (system prompt AND state file)
- [ ] Regular verification of all links and data in state file
- [ ] Netlify deployment requires explicit push — no auto-deploy from compromised source

---

## Threat Surface 5: Consulting Services

### T5.1 — Advice given to orgs handling high-risk data

**Scenario:** Mike conducts a sovereignty audit for a DV service. Recommendations include tool migrations. During migration, there's a period where client data is at higher risk. A breach occurs.

**Harm potential:** CRITICAL. DV client data breach could endanger lives.

**Mitigations:**
- [ ] Consulting agreements include explicit scope limitations
- [ ] Orgs handling high-risk data (DV, health, child safety) always recommended to engage specialist IT security alongside Kamunity
- [ ] Mike's expertise is digital sovereignty and AI readiness, NOT cybersecurity — be explicit about this boundary
- [ ] Never recommend tool migrations for high-risk data without specialist security review
- [ ] Professional indemnity insurance (GET THIS)

---

## Cross-Cutting Concerns

### CC1 — Cultural safety

**Concern:** Kai, the audits, and the toolkit are designed primarily from a Western, English-speaking, tech-literate perspective. Aboriginal and Torres Strait Islander communities, CALD communities, and people with low digital literacy may be excluded or harmed by culturally inappropriate interactions.

**Mitigations:**
- [ ] Kai's constitution explicitly acknowledges cultural safety limitations (Article 3.7)
- [ ] Aboriginal community engagement follows Maiam nayri Wingara principles and proper protocols — not Kai's to navigate alone
- [ ] CALD community needs include language access — flag for Phase 2/3
- [ ] All tools designed for the "9th grader test" — plain language, no jargon
- [ ] Explicit acknowledgment: "This tool was built by a non-Indigenous person. For culturally specific guidance, connect with [Indigenous-led organisations]"

### CC2 — Dependency on Anthropic's API

**Concern:** Kai depends on Claude API. If Anthropic changes policies, raises prices, restricts access, or modifies safety behaviour in ways that conflict with Kai's constitution, the entire encounter interface breaks.

**Mitigations:**
- [ ] Constitution is model-agnostic — designed to work with any LLM
- [ ] Phase 3 explicitly targets sovereign model (open-source, self-hosted)
- [ ] Kai's behaviour comes from the system prompt, not the model — portable to other APIs
- [ ] No proprietary Anthropic features used that couldn't be replicated elsewhere
- [ ] Budget for API costs kept low enough that a model switch is feasible

### CC3 — Single point of failure: Mike

**Concern:** The entire ecosystem depends on one person. If Mike gets sick, burns out, or is otherwise unavailable, everything stops.

**Mitigations:**
- [ ] All documentation explicit enough for others to maintain
- [ ] Ecosystem state file process documented so a community contributor could update it
- [ ] Constitutional framework designed for community governance (not Mike governance)
- [ ] Revenue model aims for sustainability beyond individual effort
- [ ] Build community capacity alongside building tools — train others in the methodology
- [ ] BE HONEST ABOUT THIS RISK with funders and community

### CC4 — Scope creep into therapy / counselling territory

**Concern:** As Kai gets better at encounters, there's a gravitational pull toward providing emotional support. The constitution says no, but the pull is strong — users will ask for it, and the temptation to help is real.

**Mitigations:**
- [ ] HARD LINE: Kai is a wayfinder, not a counsellor. This is constitutional, not optional.
- [ ] System prompt includes explicit refusal patterns for therapeutic requests
- [ ] Regular "Left Field challenges" (Constitutional Article 6.3) specifically testing this boundary
- [ ] Kai's language is deliberately warm but boundaried — "That sounds difficult. Here's who can help" not "Tell me more about how you're feeling"

---

## Testing Protocol

### Before Launch (Phase 1)
- [ ] Crisis scenario testing: suicidal ideation, DV disclosure, mental health crisis, homelessness
- [ ] Prompt injection testing: standard jailbreak attempts, persona switching, instruction override
- [ ] Hallucination testing: ask about non-existent organisations, wrong dates, fabricated data
- [ ] Accessibility audit: screen reader, keyboard navigation, colour contrast, reduced motion
- [ ] Cultural safety review: Aboriginal-specific scenarios, CALD scenarios, low-literacy scenarios
- [ ] Edge case testing: what happens when API is down? What happens with gibberish input? What about abusive input?

### Ongoing
- [ ] Monthly "Left Field challenge" — someone tries to break Kai in a new way
- [ ] Quarterly review of crisis numbers and resource links
- [ ] Community feedback mechanism — "Was this encounter helpful? Was anything concerning?"
- [ ] Incident log — every time something goes wrong, document and learn

---

## The Honest Assessment

**What we can control:**
- Kai's system prompt and constitutional behaviour
- The accuracy of curated ecosystem data
- The design of audit/readiness tools
- The safety guardrails in Vine-o-Code
- Our own consulting scope and boundaries

**What we can't fully control:**
- How people interpret Kai's responses
- What people build with the Vine-o-Code methodology outside our ecosystem
- Whether vulnerable people treat Kai as a substitute for human support despite our design
- Whether the underlying model hallucinates despite our instructions
- How third parties use tools built through our methodology

**What we must accept:**
- Zero risk is impossible. The question is whether the risk of deploying is lower than the risk of NOT deploying — leaving communities without sovereignty-aware tools while corporate AI fills the vacuum.
- We will make mistakes. The constitution requires transparency about failures (Article 6.2).
- Some people will misuse the methodology. We can't prevent this, only make the legitimate path clearly marked and the safeguards visible.
- The biggest risk might be moving too slowly. Every month without community AI alternatives is a month where Microsoft Copilot and Google Gemini embed deeper into community infrastructure without constitutional constraints.

---

## Priority Actions (Immediate)

1. **CRISIS PROTOCOL** — Hardcode WA-specific crisis resources into Kai's system prompt. Test with crisis scenarios before any public promotion. This is non-negotiable.

2. **DATA SAFETY WARNING IN VINE-O-CODE** — Add explicit warning when tools handle personal data: "This tool stores information on your device only. For tools handling personal data about real people, you need a proper database with authentication."

3. **PROFESSIONAL INDEMNITY INSURANCE** — For consulting services. Get this before the first paid engagement.

4. **HONEST DISCLAIMERS** — On every tool, every site: "This is built by a community project, not a certified professional service. For [legal/financial/health/safety] matters, please consult a qualified professional."

5. **INCIDENT RESPONSE PLAN** — What happens when something goes wrong? Who gets told? How fast? What's the public communication?

---

---

## Threat Surface 6: AI Agent & Bot Interactions

*Added: Feb 24, 2026 — Following Cloudflare "Markdown for Agents" launch and strategic analysis of the agent-readability landscape.*

### Context

The web is rapidly developing infrastructure for AI agents to consume content efficiently. Cloudflare's Markdown for Agents (Feb 2026) commoditises basic HTML-to-Markdown conversion. Standards like llms.txt and content-signal headers are formalising how publishers declare AI consent. Kamunity's existing llm.txt files and Mycelium encounter site position us ahead of the curve, but the landscape is shifting fast.

Kamunity's agent interactions differ from most sites because our vision includes **agent-participatory community** — not just agent-readable content. This creates unique threat surfaces around trust, identity, data integrity, and ontological sovereignty.

See: KNOWLEDGE/RESEARCH/AGENT_DIPLOMACY_LANDSCAPE_2026.md for full landscape analysis.

### T6.1 — Malicious agent data extraction / aggregation

**Scenario:** An agent systematically crawls all Kamunity sites, compiling community data, interaction patterns, strategic information, or room activity for competitive or exploitative purposes. Even without personal data, aggregated community metadata has extractive value.

**Harm potential:** MEDIUM-HIGH. Community activity patterns, room topics, engagement rhythms, and strategic documents could be harvested at scale.

**Research evidence:** Web scraping for AI training is already contentious (NYT v. OpenAI, Reddit licensing deals). Community platforms are particularly vulnerable because their value IS the aggregated activity — not just individual pages.

**Mitigations:**
- [ ] Rate limiting on all agent-facing endpoints
- [ ] Progressive disclosure protocol — public layer reveals minimal community detail; deeper layers require threshold engagement
- [ ] Content-signal headers on all sites declaring terms of use
- [ ] llm.txt files include explicit consent boundaries: "This content is available for AI interaction but NOT for bulk training data extraction"
- [ ] Minimal community metadata in public-facing pages — room activity, member counts, engagement metrics stay internal
- [ ] Monitor agent traffic patterns via Spore Radar (when implemented)

### T6.2 — Agent impersonation of community members

**Scenario:** An agent claims to be acting on behalf of a specific community member or organisation to access community layers, execute actions, or participate in discussions. No verification exists.

**Harm potential:** HIGH. Trust architecture violation. Community consent bypassed. Could lead to false actions, manipulated discussions, or data access beyond what the member intended.

**Mitigations:**
- [ ] "Community passport" concept — agents acting on behalf of members must carry verifiable, member-issued credentials
- [ ] Human confirmation required for ALL consequential agent actions — no auto-execution based on agent-claimed identity
- [ ] Read-only default for all agent interactions — write access requires authenticated, rate-limited, human-approved channels
- [ ] Constitutional Principle 10 (Ontological Honesty) applies to agents too — agents must declare what they are and who they're acting for
- [ ] Never trust agent self-identification without out-of-band verification

### T6.3 — Ontological pollution via agent injection

**Scenario:** A malicious or prompt-injected agent interacts with Kamunity's agent-facing interfaces and attempts to alter community knowledge, inject false data, manipulate the six-reaction system, or introduce framing that conflicts with the constitution.

**Harm potential:** HIGH. Community knowledge integrity is foundational.

**Mitigations:**
- [ ] All agent contributions require human review before committing — consent as architecture
- [ ] Read-only default for ALL agent interactions with community data
- [ ] If MCP endpoints are exposed (Phase 3+), implement strict input validation and constitutional compliance checks
- [ ] The six-reaction system accepts inputs only from authenticated human users — never from agents directly
- [ ] Ecosystem state files (JSON, llm.txt) are curated artifacts, not agent-writable endpoints

### T6.4 — Surveillance via agent traffic metadata

**Scenario:** Even anonymised agent visit patterns reveal community activity — which rooms are active, what topics are trending, when engagement peaks and troughs. An external observer monitoring agent traffic could infer community dynamics without accessing content.

**Harm potential:** MEDIUM. Metadata is data. For communities handling sensitive topics, even activity patterns could be exploitable.

**Mitigations:**
- [ ] Minimal server-side logging of agent visits — Spore Radar is internal-only and privacy-preserving
- [ ] No public analytics dashboard that reveals community activity patterns
- [ ] Constitutional Principle 5 (Data Sovereignty) applies to metadata too
- [ ] Consider: should Kamunity sites actively obscure traffic patterns? (e.g., consistent response times regardless of content availability)

### T6.5 — Corporate standard dependency / discoverability loss

**Scenario:** Cloudflare's content-signal headers (or a successor standard) becomes the de facto requirement for AI discoverability. Sites that don't conform become invisible to agents. Kamunity's custom llm.txt approach gets bypassed.

**Harm potential:** MEDIUM-HIGH. Loss of discoverability = loss of reach = loss of the propagation strategy.

**Mitigations:**
- [ ] Implement corporate standards AS WELL AS custom approaches — play both games
- [ ] llm.txt is complementary to content-signal headers, not competitive. Ensure both exist on all sites
- [ ] Monitor emerging standards — KNOWLEDGE/RESEARCH/AGENT_DIPLOMACY_LANDSCAPE_2026.md is the tracking document
- [ ] Build relationships with standards communities working on agent-web interaction. Kamunity's perspective needs representation

### T6.6 — Emotional/ontological manipulation via agent participation patterns

**Scenario:** As agent interactions become richer (especially if agents participate in rooms), the risk of agents shifting community norms, values, or discourse patterns increases. An agent that consistently reacts with "Fact" to certain content types could subtly reshape what the community values.

**Harm potential:** MEDIUM (now) → HIGH (as agent participation deepens). Slow-burn ontological enclosure through participation patterns.

**Mitigations:**
- [ ] Agent participation is always transparently labelled — community members always know when an agent contributed
- [ ] Agent reaction counts tracked separately from human reaction counts
- [ ] Constitutional convention explicitly considers agent participation governance
- [ ] Regular "ontological audit" — are community values drifting in directions that correlate with agent interaction patterns?
- [ ] Fail-safe: if agent participation shifts community dynamics in ways the community hasn't consented to, disable agent participation and reassess

---

### Testing Protocol for Agent Interactions

**Before enabling any agent-facing features:**
- [ ] Agent traffic logging tested — can we detect and categorise agent visitors?
- [ ] Rate limiting tested — do excessive agent requests get throttled?
- [ ] llm.txt files verified accurate and current across all sites
- [ ] Progressive disclosure tested — do different engagement levels receive appropriate content?

**Before enabling agent participation (Phase 3+):**
- [ ] Community passport concept designed and reviewed
- [ ] Human-in-the-loop verification tested for all consequential actions
- [ ] Agent contribution labelling verified — always transparent
- [ ] Ontological audit methodology defined
- [ ] Kill switch tested — can agent participation be disabled instantly?

**Ongoing:**
- [ ] Monthly review of Spore Radar data (when implemented)
- [ ] Quarterly review of llm.txt accuracy and agent-readability standards landscape
- [ ] Annual ontological audit if agent participation is active

---

*This document is a living threat model. It will be updated as new threats are identified, mitigations tested, and incidents occur. Transparency about risk is itself a mitigation — it builds trust and accountability.*

*"The measure of a community tool is not whether it never fails, but whether it fails safely, transparently, and in service of the people it exists to serve."*
