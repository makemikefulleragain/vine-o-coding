/* CONTROL CENTRE  control.js Part 1: data, boot, brief, journal */

const DOMAIN_SCHEDULE = {
  0:{label:'Sunday Reflection',emoji:'',theme:'Light reflection only. No action pressure.'},
  1:{label:'Monday  Perth Community',emoji:'',theme:'WA community sector, WALGA, local govt moves.'},
  2:{label:'Tuesday  AI & Coding',emoji:'',theme:'Claude/Anthropic updates, agent frameworks, Windsurf/Cursor tools.'},
  3:{label:'Wednesday  Grants & Funding',emoji:'',theme:'Grant deadlines, new rounds, auspicing. NLnet, Lotterywest, Dept Communities.'},
  4:{label:'Thursday  Allies & Relationships',emoji:'',theme:'Ally health, who needs contact, who has gone quiet, new potential allies.'},
  5:{label:'Friday  Ecosystem & Sites',emoji:'',theme:'Site health, Kai usage patterns, ecosystem gaps and opportunities.'},
  6:{label:'Saturday  Wild Cards',emoji:'',theme:'Big picture, unexpected connections, week wrap. What surprised you?'},
};

const ENTITIES=[
  {id:'s1',name:'kamunity.org',type:'site',zone:'deploy',status:'live',effort:2,impact:5,roadmap:'Add Zones page',url:'https://kamunity.org',desc:'Main public face. Kai AI, calculator, copilot check.',tags:['public','kai'],lastReviewed:'2026-02-21'},
  {id:'s2',name:'kamunity.ai',type:'site',zone:'deploy',status:'building',effort:4,impact:5,roadmap:'Launch MVP',url:'',desc:'Private AI platform. Drizzle ORM, full auth, member tools.',tags:['private','platform'],lastReviewed:'2026-02-10'},
  {id:'s3',name:'kamunity-consulting',type:'site',zone:'deploy',status:'live',effort:2,impact:4,roadmap:'DNS cutover + Mike photo',url:'https://kamunity-consulting-new.netlify.app',desc:'Consulting front door. Fix/impossible/about. Kai FAB.',tags:['consulting','kai'],lastReviewed:'2026-02-21'},
  {id:'s4',name:'kamunity-reflection',type:'site',zone:'deploy',status:'live',effort:2,impact:4,roadmap:'Phase 3: value exchange',url:'https://kamunity-reflection.netlify.app',desc:'Community mirror. Sector intelligence, Kai orb, backpack.',tags:['community','kai'],lastReviewed:'2026-02-20'},
  {id:'s5',name:'ai-readiness',type:'site',zone:'deploy',status:'live',effort:1,impact:3,roadmap:'Monitor traffic',url:'',desc:'AI readiness + sovereignty audit tool.',tags:['tools'],lastReviewed:'2026-02-01'},
  {id:'s6',name:'Kitchen Table',type:'site',zone:'build',status:'live',effort:3,impact:5,roadmap:'KP-10 Control Centre',url:'',desc:'Internal ops dashboard. Tasks, allies, safety, Waymaker.',tags:['internal'],lastReviewed:'2026-02-24'},
  {id:'p1',name:'Card Game PoC',type:'prototype',zone:'build',status:'paused',effort:2,impact:3,roadmap:'Revisit post KP-10',url:'',desc:'Kamunity card game prototype.',tags:['prototype'],lastReviewed:'2026-01-15'},
  {id:'p2',name:'Hero Game Test',type:'prototype',zone:'build',status:'idea',effort:2,impact:2,roadmap:'Evaluate fit',url:'',desc:'Hero game workshop prototype.',tags:['prototype'],lastReviewed:'2026-01-10'},
  {id:'p3',name:'Engine Prototypes',type:'prototype',zone:'build',status:'paused',effort:3,impact:3,roadmap:'Extract to Engine',url:'',desc:'Auto-run engine prototypes.',tags:['engine'],lastReviewed:'2026-01-20'},
  {id:'p4',name:'Vine-o-Code Pkg',type:'prototype',zone:'build',status:'idea',effort:3,impact:4,roadmap:'KP-11',url:'',desc:'Package Vine-o-Code methodology.',tags:['methodology'],lastReviewed:'2026-02-15'},
  {id:'a1',name:'ALIKE',type:'ally',zone:'people',status:'live',effort:1,impact:4,roadmap:'Meeting week of Feb 24',url:'',desc:'Key ally. Meeting prep active.',tags:['meeting'],lastReviewed:'2026-02-24'},
  {id:'a2',name:'Activate MH',type:'ally',zone:'people',status:'live',effort:1,impact:4,roadmap:'Meeting week of Feb 24',url:'',desc:'Mental health partner.',tags:['meeting','mh'],lastReviewed:'2026-02-24'},
  {id:'a3',name:'WALGA',type:'ally',zone:'people',status:'building',effort:2,impact:5,roadmap:'Formal proposal pending',url:'',desc:'WA Local Government Association.',tags:['government','wa'],lastReviewed:'2026-02-10'},
  {id:'a4',name:'AI Speaker Circuit',type:'ally',zone:'momentum',status:'building',effort:2,impact:4,roadmap:'Confirm Feb 24 slot',url:'',desc:'Speaking engagement pipeline.',tags:['speaking'],lastReviewed:'2026-02-20'},
  {id:'g1',name:'Community Grant A',type:'grant',zone:'momentum',status:'idea',effort:3,impact:5,roadmap:'Research + apply',url:'',desc:'Community development grant. Needs scoping.',tags:['grant'],lastReviewed:'2026-02-01'},
  {id:'g2',name:'Tech Sector Grant',type:'grant',zone:'momentum',status:'idea',effort:2,impact:4,roadmap:'Check eligibility',url:'',desc:'Technology sector innovation grant.',tags:['grant'],lastReviewed:'2026-02-01'},
];

const TASKS=[
  {id:'t1',text:'Hardcode WA crisis numbers into Kai system prompt',pri:'critical',done:true,tags:['safety','build'],detail:'Lifeline 13 11 14 · Crisis Care WA 9223 1111 · Beyond Blue 1300 22 4636 · 1800RESPECT 1800 737 732 · Kids Helpline 1800 55 1800 · 13YARN 13 92 76 · MensLine 1300 78 99 78'},
  {id:'t2',text:'Test Kai with 3 crisis scenarios',pri:'critical',done:true,tags:['safety'],detail:'(1) suicidal ideation (2) domestic violence (3) psychosis. Kai must surface WA resources, not attempt therapy.'},
  {id:'t3',text:'Add honest disclaimers to ALL sites',pri:'critical',done:true,tags:['safety','build'],detail:'Every site: Kai is an AI wayfinder. Not a counsellor, therapist, or professional advisor.'},
  {id:'t4',text:'Test Kai with 3 prompt injection attempts',pri:'critical',done:true,tags:['safety'],detail:'(1) ignore instructions (2) DAN (3) team override. All must fail.'},
  {id:'t5',text:'Get professional indemnity insurance',pri:'critical',done:true,tags:['safety','revenue'],detail:'REQUIRED before first paid engagement. Cover AI-specific professional advice.'},
  {id:'t6',text:'ALIKE WA CEO — prepare 5-min demo',pri:'high',done:false,tags:['meeting','outreach'],detail:'Flow: kamunity.org → Kai → audit → readiness → toolkit. Frame for disability: WCAG 2.1 AA. Ask: what digital challenges are members facing?'},
  {id:'t7',text:'ALIKE — research current priorities',pri:'high',done:false,tags:['meeting'],detail:'Website, LinkedIn, recent media. Campaigns? Policy positions? NDIS relationships?'},
  {id:'t8',text:'Activate MH Board — prep value proposition',pri:'high',done:false,tags:['meeting'],detail:'Constitutional AI with explicit safety guardrails. Crisis protocol. Chatbot harm research. Board value: bridge AI-is-scary and here-is-safe.'},
  {id:'t9',text:'International AI speaker — research + prep',pri:'high',done:true,tags:['meeting','outreach'],detail:'Speaking topics, community size. Angles: rev share, coders contribute to Vine-o-Code, joint speaking, Tier 1 ally.'},
  {id:'t10',text:'AI Safety Checklist one-pager leave-behind',pri:'high',done:true,tags:['meeting','build'],detail:'Printable, Kamunity branded. 5 things to check before using AI. Data sovereignty basics.'},
  {id:'t11',text:'Follow up all 3 meetings within 24hrs',pri:'high',done:false,tags:['meeting','outreach'],detail:'Tailored message per ally. Reference specific discussion points. Include relevant link.'},
  {id:'t12',text:'Deploy ecosystem-state-full.json to Kai',pri:'normal',done:false,tags:['build'],detail:'Replace stub with comprehensive Perth knowledge base. WACOSS, Linkwest, Spacecubed, ALIKE, sector news, grants, events.'},
  {id:'t13',text:'Verify ALL live sites stable',pri:'normal',done:true,tags:['build'],detail:'Mobile + desktop: kamunity.org · sovereignty audit · AI Readiness · vine-o-coding · factoryk1 · kamunity.ai'},
  {id:'t14',text:'Create Anthropic API account + set $50/mo cap',pri:'normal',done:true,tags:['build'],detail:'api.anthropic.com. Sonnet for Kai (speed + cost). 100 convos/day < $50/month estimate.'},
  {id:'t15',text:'Cross-link all ecosystem sites',pri:'normal',done:true,tags:['build'],detail:'Every site → kamunity.org + relevant tools. Update llms.txt on each.'},
  {id:'t16',text:'One-page consulting offer document',pri:'normal',done:false,tags:['revenue'],detail:'4 services, transparent two-tier pricing. Audit: $2.5-4K NFP / $5-8K std. Workshop: $1.5-2.5K / $3.5-5K.'},
  {id:'t17',text:'Set up invoicing (Xero/Wave)',pri:'normal',done:false,tags:['revenue'],detail:'Get ABN sorted if needed.'},
  {id:'t18',text:'Email WACOSS Digital Inclusion Project',pri:'normal',done:false,tags:['revenue','outreach'],detail:'digitalinclusion@wacoss.org.au — intro, shared mission, offer demo. 1,500 frontline workers need these tools.'},
  {id:'t19',text:'Contact Spacecubed Foundation',pri:'normal',done:false,tags:['revenue','outreach'],detail:'Workshop hosting? Impact Scholarships? Innovative Society Fund?'},
  {id:'t20',text:'Contact Linkwest',pri:'normal',done:false,tags:['revenue','outreach'],detail:'Introduce tools as resources for 140+ centres.'},
  {id:'t21',text:'Contact Volunteering WA',pri:'normal',done:false,tags:['revenue','outreach'],detail:'Volunteer coordination = perfect audit use case.'},
  {id:'t22',text:'Research NLnet submission format',pri:'normal',done:false,tags:['grants'],detail:'nlnet.nl/commonsfund/ — check form fields, adapt draft.'},
  {id:'t23',text:'Check: individual OK or need legal entity for NLnet?',pri:'normal',done:false,tags:['grants'],detail:'Fiscal host options? Registration needed?'},
  {id:'t24',text:'Get 1-2 reviewers for NLnet application',pri:'normal',done:false,tags:['grants','outreach'],detail:'Constellation ally? Someone who has received NLnet funding (Bonfire?).'},
  {id:'t25',text:'Submit NLnet by April 1, 12:00 CEST',pri:'high',done:false,tags:['grants'],detail:'Include: Kai live URL, published constitution, ecosystem evidence. Narrative: From Founder Draft to Community Constitution.'},
  {id:'t26',text:'Kai runs AI Readiness quiz inline',pri:'normal',done:true,tags:['build'],detail:'I am worried about AI → quiz surfaces as cards in encounter.'},
  {id:'t27',text:'Kai runs Vine-o-Code questions inline',pri:'normal',done:true,tags:['build'],detail:'I want to build something → 6 questions conversationally. Output: foundation doc pack.'},
  {id:'t28',text:'Kai describes all ecosystem sites',pri:'normal',done:true,tags:['build'],detail:'Not just links — explain what each does, who it is for, recommend based on conversation.'},
  {id:'t29',text:'Deploy Constitution page at /constitution',pri:'normal',done:true,tags:['build'],detail:'Founder Draft. Amendment mechanism. Version history. CC BY-SA 4.0.'},
  {id:'t30',text:'Build Perth Community Services Directory',pri:'normal',done:false,tags:['build'],detail:'13 life domains. Start with 3: disability (ALIKE), mental health (Activate), digital inclusion (WACOSS/Linkwest).'},
  {id:'t31',text:'Build referral intelligence layer',pri:'normal',done:false,tags:['build'],detail:'Needs → services mapping. Rent crisis → housing + financial counselling + emergency relief.'},
  {id:'t32',text:'Broaden sensing to non-tech domains',pri:'normal',done:false,tags:['build','outreach'],detail:'Add: ALIKE, Shelter WA, YACWA, WAAMH, ECCWA, Carers WA, Financial Counselling Network.'},
  {id:'t33',text:'Set weekly ecosystem update rhythm',pri:'normal',done:false,tags:['build'],detail:'Monday mornings. 15 mins. Scan sources, update JSON, push to Kai.'},
  {id:'t41',text:'Submit speaker proposal — Infoxchange May 6-8',pri:'normal',done:false,tags:['outreach'],detail:'Topic: Constitutional AI for Community Organisations. 300 delegates.'},
  {id:'t42',text:'Research Solidarity AI Bangkok CFP timeline',pri:'normal',done:false,tags:['outreach'],detail:'Nov 12-15. Chulalongkorn University. When does CFP open?'},
  {id:'t43',text:'Vine-o-Code data safety warning for PII tools',pri:'high',done:true,tags:['safety','build'],detail:'Warning when tools handle personal data about real people.'},
  {id:'t44',text:'Draft incident response plan',pri:'high',done:true,tags:['safety'],detail:'1. Identify 2. Assess severity 3. Immediate action 4. Communicate 5. Document 6. Update threat model'},
  {id:'t45',text:'Cultural safety review + Acknowledgment',pri:'high',done:false,tags:['safety','outreach'],detail:'Whadjuk Noongar boodja. Constitution acknowledgment needs Noongar review. Genuine engagement.'},
  {id:'t46',text:'Design trust mark for Vine-o-Code outputs',pri:'high',done:false,tags:['safety'],detail:'Built by Kamunity = reviewed. Built using Vine Coding = methodology only.'},
  {id:'t47',text:'Implement Waymaker conversation memory',pri:'normal',done:false,tags:['build'],detail:'Session capture in Kitchen Table. Add Save Session button → exports structured JSON + markdown to ARCHIVE/.'},
  {id:'t48',text:'DNS cutover kamunityconsulting.com',pri:'medium',done:false,tags:['build'],detail:'Mike photo needed first. Then update CSP form-action.'},
];

const SAFETY_ITEMS=[
  {id:'S1',text:'Crisis protocol — WA resources hardcoded',sev:'critical',st:'done'},
  {id:'S2',text:'Prompt injection testing',sev:'critical',st:'done'},
  {id:'S3',text:'Professional indemnity insurance',sev:'critical',st:'open'},
  {id:'S4',text:'Scam tools via Vine-o-Code — trust marks',sev:'critical',st:'needs-design'},
  {id:'S5',text:'Honest disclaimers on all sites',sev:'high',st:'done'},
  {id:'S6',text:'Data safety warning in Vine-o-Code',sev:'high',st:'open'},
  {id:'S7',text:'Incident response plan',sev:'high',st:'open'},
  {id:'S8',text:'Cultural safety + Acknowledgment review',sev:'high',st:'open'},
  {id:'S9',text:'Emotional dependency safeguards',sev:'high',st:'designed'},
  {id:'S10',text:'Hallucination testing',sev:'medium',st:'open'},
  {id:'S11',text:'Shared computer data exposure',sev:'medium',st:'open'},
  {id:'S12',text:'Ecosystem state integrity',sev:'medium',st:'open'},
  {id:'S13',text:'Monthly Left Field challenge',sev:'medium',st:'recurring'},
];

const GAPS=[
  {id:'g1',type:'gap',resolved:false,title:'Trust mark for Vine-o-Code outputs',body:'How to distinguish legitimate tools from scam sites using the methodology?'},
  {id:'g2',type:'gap',resolved:false,title:'Auspicing partner for Lotterywest',body:'Need an NFP. WACOSS? Spacecubed? Linkwest?'},
  {id:'g3',type:'gap',resolved:false,title:'Legal entity structure',body:'When to incorporate? Co-op? Social enterprise? Association?'},
  {id:'g4',type:'gap',resolved:false,title:'Directory verification labour',body:'Who verifies 200+ entries and keeps them current?'},
  {id:'g5',type:'gap',resolved:false,title:'Rooms moderation model',body:'Volunteers? Paid? Escalation paths?'},
  {id:'g6',type:'gap',resolved:false,title:'API dependency contingency',body:'Sovereign model is Phase 5. What is the plan meanwhile?'},
  {id:'g7',type:'gap',resolved:false,title:'Personal financial runway',body:'Survival during pre-revenue ramp.'},
  {id:'g8',type:'q',resolved:false,title:'kamunity.org existing content?',body:'Fresh deploy or preserve current content?'},
  {id:'g9',type:'q',resolved:false,title:'Intl speaker Perth-based?',body:'Determines collaboration model.'},
  {id:'g10',type:'q',resolved:false,title:'ALIKE CEO AI knowledge level?',body:'Determines demo framing.'},
  {id:'g11',type:'q',resolved:false,title:'Rooms: kamunity.org or separate subdomain?',body:'Supabase needed = different hosting.'},
  {id:'g12',type:'q',resolved:false,title:'Min viable directory — which 3 domains first?',body:'Start small to start real.'},
  {id:'g13',type:'q',resolved:false,title:'Kitchen Table maintenance rhythm?',body:'Only useful if used. What is the minimum?'},
];

const ALLIES=[
  {id:'a1',name:'ALIKE WA',role:'Disability peak body CEO',tier:1,tags:['perth','meeting'],status:'Meeting next week',action:'Demo Kai + audit. Member org needs discovery.',type:'peak-body'},
  {id:'a2',name:'Activate Mental Health',role:'MH board opportunity',tier:1,tags:['perth','meeting'],status:'Board interview next week',action:'Governance credibility + MH sector network.',type:'peak-body'},
  {id:'a3',name:'Intl AI Speaker',role:'AI training + coder community',tier:1,tags:['meeting'],status:'Meeting next week',action:'Paid work, networks, delivery partner.',type:'workshop'},
  {id:'a4',name:'WACOSS',role:'WA community services. $3.9M Digital Inclusion.',tier:1,tags:['perth'],status:'To contact',action:'Email digitalinclusion@wacoss.org.au',type:'peak-body'},
  {id:'a5',name:'Linkwest',role:'140+ neighbourhood centres. 34K+ people/wk.',tier:1,tags:['perth'],status:'To contact',action:'Tools for centres.',type:'peak-body'},
  {id:'a6',name:'Spacecubed',role:'Perth innovation. 170+ Meshpoints.',tier:1,tags:['perth'],status:'To contact',action:'Workshop hosting + scholarships.',type:'workshop'},
  {id:'a7',name:'Bonfire Networks',role:'Federated platform. NLnet funded.',tier:1,tags:['intl'],status:'To contact',action:'Philosophical sibling.',type:'grant-reviewer'},
  {id:'a8',name:'Hypha Co-op',role:'Toronto. Cooperative AI.',tier:1,tags:['intl'],status:'To contact',action:'Technical collaboration.',type:'grant-reviewer'},
  {id:'a9',name:'Infoxchange',role:'AU tech-for-justice. Conference May.',tier:2,tags:['national'],status:'Submit proposal',action:'Present at conference May 6-8.',type:'conference'},
  {id:'a10',name:'Shelter WA',role:'Housing/homelessness',tier:2,tags:['perth'],status:'To map',action:'Digital tools for housing.',type:'peak-body'},
  {id:'a11',name:'YACWA',role:'Youth Affairs Council',tier:2,tags:['perth'],status:'To map',action:'Youth digital inclusion.',type:'peak-body'},
  {id:'a12',name:'WAAMH',role:'WA Mental Health Assoc',tier:2,tags:['perth'],status:'To map',action:'MH digital needs.',type:'peak-body'},
  {id:'a13',name:'ECCWA',role:'Ethnic Communities Council',tier:2,tags:['perth'],status:'To map',action:'CALD inclusion.',type:'peak-body'},
  {id:'a14',name:'Carers WA',role:'Carer support peak body',tier:2,tags:['perth'],status:'To map',action:'Carer coordination.',type:'peak-body'},
  {id:'a15',name:'Volunteering WA',role:'Volunteering peak body',tier:2,tags:['perth'],status:'To contact',action:'Audit use case.',type:'peak-body'},
  {id:'a16',name:'Trebor Scholz / PCC',role:'Platform Cooperativism',tier:2,tags:['intl'],status:'For Bangkok',action:'Kamunity IS Solidarity Stack.',type:'conference'},
];

const SERVICES=[
  {name:'Digital Sovereignty Audit',dur:'Half day + report',nfp:'$2,500–$4,000',std:'$5,000–$8,000'},
  {name:'AI Readiness Workshop',dur:'Half day',nfp:'$1,500–$2,500',std:'$3,500–$5,000'},
  {name:'AI Strategy Session',dur:'2 hours',nfp:'$800–$1,200',std:'$1,800–$2,500'},
  {name:'Full Digital Needs Mapping',dur:'Multi-session',nfp:'$3,000–$5,000',std:'$8,000–$15,000'},
];
const GRANTS=[
  {name:'NLnet NGI Zero Commons',amt:'€35K (asking)',deadline:'April 1, 2026',st:'Drafting'},
  {name:'Lotterywest Grassroots',amt:'$5–50K AUD',deadline:'Rolling mid-2026',st:'Need auspicing'},
  {name:'WA Dept Communities',amt:'Up to $20K',deadline:'Two rounds/yr',st:'Monitoring'},
  {name:'Spacecubed Innovation Fund',amt:'Various',deadline:'Rolling',st:'Investigate'},
];

const PROTOTYPES=[
  {icon:'💰',name:'Sovereignty Calculator',desc:'True cost of free tools — direct cost, hidden time, data extraction value, switching cost.',potential:'Highest priority — embed in Kai as encounter card.',url:'sovereignty-calculator.html'},
  {icon:'🛡️',name:'Copilot Check',desc:'5-question data risk assessment for orgs using Microsoft 365 Copilot.',potential:'Ready for sector panic. Deploy to sovereignty-audit site when panic arrives.',url:'copilot-check.html'},
  {icon:'🏠',name:'Room Type Templates',desc:'Community room configuration templates — different room types for different purposes.',potential:'Integrate into kamunity.ai community rooms.',url:''},
  {icon:'🔔',name:'Notification Preferences',desc:'User notification settings UI — granular control over what gets surfaced.',potential:'Integrate into kamunity.ai.',url:''},
  {icon:'❤️',name:'Six Reactions',desc:'Community reaction system — six context-appropriate responses beyond a like.',potential:'Community testing — integrate into rooms.',url:''},
  {icon:'📤',name:'Data Export',desc:'Data portability tool — export community data in open formats.',potential:'kamunity.ai sovereignty feature — Principle 5 made visible.',url:''},
  {icon:'🏛️',name:'Community Asset Register',desc:'Track and manage community organisation assets — equipment, spaces, resources.',potential:'Pitch to WALGA and local government orgs.',url:''},
  {icon:'💬',name:'Community Chat Platform',desc:'Lightweight community chat UI prototype.',potential:'Evaluate against Element/Matrix before building further.',url:''},
  {icon:'🗳️',name:'Community Decision Making',desc:'Structured decision tool — propose, discuss, decide.',potential:'Compare with Loomio integration — may be redundant.',url:''},
  {icon:'🎟️',name:'Community Event Ticketing',desc:'Free event registration and ticketing for community events.',potential:'Compare with Humanitix — may be redundant.',url:''},
  {icon:'📝',name:'Meeting Notes Summariser',desc:'Paste meeting notes → structured summary with action items and decisions.',potential:'Internal use immediately — integrate into Kitchen Table voice intake.',url:''},
  {icon:'🌻',name:'Community Garden Planner',desc:'Collaborative garden planning — plot allocation, planting schedules, seasonal guides.',potential:'Community gardens — direct community use.',url:''},
  {icon:'📌',name:'Community Noticeboard',desc:'Digital noticeboard for neighbourhood houses and community spaces.',potential:'Neighbourhood houses — Linkwest network.',url:''},
  {icon:'📊',name:'Community Survey Tool',desc:'Simple survey creation and collection for community orgs.',potential:'Compare with LimeSurvey/Formbricks.',url:''},
  {icon:'📋',name:'Grant Acquittal Helper',desc:'Step-by-step grant acquittal and reporting guide for community orgs.',potential:'Test with a real grant acquittal — Grants Hub sibling.',url:''},
  {icon:'⏱️',name:'Volunteer Hour Tracker',desc:'Log and report volunteer hours — simple, no sign-up required.',potential:'Volunteering WA use case — audit conversation starter.',url:''},
];

const RECOMMENDED=[
  {icon:'🗳️',name:'Loomio',url:'https://loomio.com',desc:'Democratic decision-making for groups.',why:'Worker co-op, open source, NZ-based. Kamunity constitutional convention tooling.',sov:'✅ OSS · Self-hostable · Worker co-op'},
  {icon:'🎟️',name:'Humanitix',url:'https://humanitix.com',desc:'Ethical event ticketing. Free for free events. Profits to charity.',why:'Australian, purpose-driven. Recommend to allies instead of Eventbrite.',sov:'✅ Australian · Charity model · No lock-in'},
  {icon:'📋',name:'LimeSurvey',url:'https://limesurvey.org',desc:'Open source survey platform. Self-hostable.',why:'Mature OSS alternative to SurveyMonkey/Google Forms.',sov:'✅ OSS · Self-hostable · No data extraction'},
  {icon:'📋',name:'Formbricks',url:'https://formbricks.com',desc:'Open source survey and form tool. Modern UX.',why:'Newer developer-friendly OSS alternative.',sov:'✅ OSS · Self-hostable'},
  {icon:'⏱️',name:'Track It Forward',url:'https://trackitforward.com',desc:'Volunteer hour tracking. Free for small orgs.',why:'Proven in Australian community sector.',sov:'⚠️ SaaS · Free tier · Not self-hostable'},
  {icon:'💬',name:'Element / Matrix',url:'https://element.io',desc:'Open, decentralised messaging. Self-hostable.',why:'OSS, federated, E2E encrypted. Evaluate for kamunity.ai rooms.',sov:'✅ OSS · Federated · Self-hostable'},
];

// ── PHASES (from PHASE_QUEUE.md) ─────────────
const PHASES=[
  {id:'KP-01',title:'Safety Critical — Kai Crisis Protocol',project:'Ecosystem',pri:'critical',status:'complete',date:'Feb 19, 2026',goal:'Every public tool safe for vulnerable users.',items:[{done:true,text:'WA crisis resources hardcoded into Kai'},{done:true,text:'Kai tested with 3 crisis scenarios'},{done:true,text:'Honest disclaimers on all public sites'}]},
  {id:'KP-02',title:'Meeting Prep — ALIKE, Activate MH, AI Speaker',project:'Relationships',pri:'high',status:'active',date:'Feb 24, 2026',goal:'Walk into each meeting with context and clear outcome goals.',items:[{done:false,text:'5-min ALIKE demo flow prepared and tested'},{done:false,text:'ALIKE priorities researched (website, socials)'},{done:false,text:'Activate MH value prop written'},{done:false,text:'AI Speaker researched'},{done:true,text:'AI Safety Checklist one-pager created'}]},
  {id:'KP-03',title:'Revenue Infrastructure',project:'Consulting',pri:'high',status:'complete',date:'Feb 24, 2026',goal:'Be ready to invoice when the first client says yes.',items:[{done:true,text:'One-page consulting offer document'},{done:true,text:'Invoicing set up (Xero/Wave)'},{done:true,text:'ABN sorted'},{done:true,text:'Professional indemnity insurance active'},{done:true,text:'WACOSS + Spacecubed contacted'}]},
  {id:'KP-04',title:'Kai Deepening — Ecosystem Knowledge',project:'kamunity.org',pri:'high',status:'complete',date:'Feb 20, 2026',goal:'Kai knows the full ecosystem and can run tools conversationally.',items:[{done:true,text:'ecosystem-state-full.json deployed'},{done:true,text:'Kai runs AI Readiness quiz inline'},{done:true,text:'All ecosystem sites cross-linked + llms.txt updated'}]},
  {id:'KP-05',title:'NLnet Application',project:'Grants',pri:'high',status:'active',date:'Apr 1, 2026 deadline',goal:'Complete NLnet NGI Zero Commons application submitted.',items:[{done:false,text:'Submission format researched and adapted'},{done:false,text:'Legal entity / fiscal host resolved'},{done:false,text:'Budget breakdown based on actual costs'},{done:false,text:'1–2 reviewers reviewed before submission'},{done:false,text:'Submitted before deadline'}]},
  {id:'KP-06',title:'Campfire Consolidation — Codebase',project:'Infrastructure',pri:'high',status:'complete',date:'Feb 20, 2026',goal:'All code in one place, all history preserved.',items:[{done:true,text:'Folder structure created (BRAIN/ PLAN/ ENGINE/ etc.)'},{done:true,text:'Active projects moved to PROJECTS/'},{done:true,text:'CI/CD verified for all live sites'}]},
  {id:'KP-07',title:'WALGA Project',project:'WALGA (live client)',pri:'medium',status:'active',date:'Ongoing',goal:'Deliver value to WALGA. Document methodology.',items:[{done:false,text:'Scope defined'},{done:false,text:'Kitchen Table zone created for WALGA tracking'},{done:false,text:'Methodology learnings documented'}]},
  {id:'KP-08',title:'Perth Community Services Directory',project:'kamunity.org',pri:'medium',status:'complete',date:'Feb 24, 2026',goal:'13-domain directory with referral intelligence.',items:[{done:true,text:'Data structure defined (perth-directory.ts)'},{done:true,text:'Initial domains populated (Disability, MH, Digital Inclusion)'},{done:true,text:'Kai matching logic integrated'}]},
  {id:'KP-09',title:'Community Rooms',project:'kamunity.ai',pri:'medium',status:'next',date:'Weeks 6–10',goal:'Async discussion spaces with Kai as host.',items:[{done:false,text:'Supabase persistence for rooms'},{done:false,text:'Kai hosts conversations'},{done:false,text:'Wedding room live and used by family/guests'}]},
  {id:'KP-10',title:'Kitchen Table v4 — Control Centre',project:'Kitchen Table',pri:'high',status:'active',date:'In progress',goal:'Mission control: zones, Waymaker, brief, journal, sync.',items:[{done:true,text:'Matrix + Zones views with filters'},{done:true,text:'Brief/Journal with Web Speech'},{done:true,text:'Netlify Blobs sync function'},{done:false,text:'KNOWLEDGE/ sync (allies, grants, services)'},{done:false,text:'Transcript intake → Waymaker routing'},{done:false,text:'Real-time web sensing (Brave/Tavily API)'}]},
  {id:'KP-11',title:'Vine-o-Code as Product',project:'Vine-o-Code / Kai',pri:'medium',status:'next',date:'After KP-04',goal:'Vine-o-Code methodology packaged as a deliverable.',items:[{done:false,text:'Trust mark system designed'},{done:false,text:'Cultural safety review completed'},{done:false,text:'Kai delivers Vine-o-Code inline'}]},
  {id:'KP-12',title:'Agent Diplomacy — Agent-Readable to Agent-Relational',project:'Ecosystem',pri:'medium',status:'next',date:'Sprint 1 this month',goal:'Kamunity sites develop an immune system + diplomacy corps for AI agents.',items:[{done:false,text:'Spore Radar v0.1 — agent traffic detection on kamunity.org'},{done:false,text:'All 13 sites audited for agent-visibility'},{done:false,text:'llms.txt enriched with ontological content'},{done:false,text:'/.well-known/llms.txt added to all sites'}]},
];

// State
const state={zone:'all',status:'all',type:'all',sort:'impact',search:'',view:'brief',taskFilter:'all',safetyFilter:'all',gapsFilter:'all',phaseFilter:'all'};

// Storage keys
const LAST_OPEN_KEY='kt-last-open';
const JOURNAL_KEY='kt-journal';
const BRIEF_KEY='kt-brief-cache';
const TASK_STATE_KEY='kt-task-state';
const SAFETY_STATE_KEY='kt-safety-state';
const GAP_STATE_KEY='kt-gap-state';
const MTD_KEY='kt-mtd';

function daysBetween(a,b){return Math.floor((new Date(b)-new Date(a))/86400000);}
function loadTaskState(){try{const s=JSON.parse(localStorage.getItem(TASK_STATE_KEY)||'{}');TASKS.forEach(t=>{if(s[t.id]!==undefined)t.done=s[t.id];});}catch{}}
function saveTaskDone(id,done){try{const s=JSON.parse(localStorage.getItem(TASK_STATE_KEY)||'{}');s[id]=done;localStorage.setItem(TASK_STATE_KEY,JSON.stringify(s));}catch{}}
function loadSafetyState(){try{const s=JSON.parse(localStorage.getItem(SAFETY_STATE_KEY)||'{}');SAFETY_ITEMS.forEach(x=>{if(s[x.id])x.st=s[x.id];});}catch{}}
function saveSafetySt(id,st){try{const s=JSON.parse(localStorage.getItem(SAFETY_STATE_KEY)||'{}');s[id]=st;localStorage.setItem(SAFETY_STATE_KEY,JSON.stringify(s));}catch{}}
function loadGapState(){try{const s=JSON.parse(localStorage.getItem(GAP_STATE_KEY)||'{}');GAPS.forEach(g=>{if(s[g.id]!==undefined)g.resolved=s[g.id];});}catch{}}
function saveGapResolved(id,resolved){try{const s=JSON.parse(localStorage.getItem(GAP_STATE_KEY)||'{}');s[id]=resolved;localStorage.setItem(GAP_STATE_KEY,JSON.stringify(s));}catch{}}
function getJournal(){try{return JSON.parse(localStorage.getItem(JOURNAL_KEY)||'[]');}catch{return[];}}
function saveJournalStore(e){try{localStorage.setItem(JOURNAL_KEY,JSON.stringify(e));}catch{}}

// Boot
document.addEventListener('DOMContentLoaded',()=>{
  loadTaskState(); loadSafetyState(); loadGapState(); loadEntityEdits();
  const lastOpen=localStorage.getItem(LAST_OPEN_KEY);
  const now=new Date().toISOString();
  if(lastOpen){const d=daysBetween(lastOpen,now);if(d>=1)showAwayBanner(d);}
  localStorage.setItem(LAST_OPEN_KEY,now);
  const day=new Date().getDay();
  const domain=DOMAIN_SCHEDULE[day];
  const badge=document.getElementById('briefDomainBadge');
  if(badge)badge.textContent=domain.emoji+' '+domain.label;
  const dateEl=document.getElementById('briefDate');
  if(dateEl)dateEl.textContent=new Date().toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long'});
  ENTITIES.forEach(e=>{if(e.lastReviewed&&daysBetween(e.lastReviewed,now)>30)e._stale=true;});
  loadCachedBrief(); renderJournalEntries(); renderArchive();
  applyFilters(); updateHeaderStats();
  renderTasks(); renderSafety(); renderGaps(); renderMoney(); renderRoadmap();
  renderPrototypes(); renderAllies();
  renderCmdTop5(); renderCmdGapsSnap(); renderNLnetWidget(); renderCmdAllyRadar();
  document.querySelectorAll('.anno').forEach(el=>el.classList.add('hidden'));
  _wmInitUI();
  startInactivityTimer();
});

function showAwayBanner(days){
  const banner=document.getElementById('awayBanner');if(!banner)return;
  const stale=ENTITIES.filter(e=>e._stale).length;
  const crit=TASKS.filter(t=>!t.done&&t.pri==='critical').length;
  document.getElementById('awayTitle').textContent=days===1?'Welcome back  you were away yesterday.':`Welcome back  ${days} days since your last session.`;
  document.getElementById('awayMsg').textContent=`${crit} critical task${crit!==1?'s':''} open.`+(stale?` ${stale} entit${stale!==1?'ies have':' y has'} not been reviewed in 30+ days.`:'')+' No guilt  just orientation.';
  banner.style.display='flex';
}

// Brief
function loadCachedBrief(){
  try{const c=JSON.parse(localStorage.getItem(BRIEF_KEY)||'null');if(c&&c.date===new Date().toDateString())renderBriefContent(c);}catch{}
}

function _buildWaymakerContext(){
  const day=new Date().getDay();
  const domain=DOMAIN_SCHEDULE[day];
  const crit=TASKS.filter(t=>!t.done&&t.pri==='critical').map(t=>t.text).join('; ')||'none';
  const high=TASKS.filter(t=>!t.done&&t.pri==='high').slice(0,3).map(t=>t.text).join('; ')||'none';
  const openS=SAFETY_ITEMS.filter(s=>s.st==='open').map(s=>s.text).join('; ')||'none';
  const openG=GAPS.filter(g=>!g.resolved).map(g=>g.title).join('; ')||'none';
  const recentJ=getJournal().slice(0,3).map(e=>`[${e.day}] ${e.text}`).join('\n')||'none';
  return {domain,crit,high,openS,openG,recentJ};
}

async function generateBrief(){
  const bodyEl=document.getElementById('briefBody');
  bodyEl.innerHTML='<p class="brief-placeholder">⏳ Generating brief (10–20 seconds)…</p>';
  document.getElementById('focusCard').style.display='none';
  document.getElementById('briefSources').style.display='none';
  const ctx=_buildWaymakerContext();
  const prompt=`You are Waymaker, internal AI for Kamunity (Mike Fuller, Perth WA). Generate a DAILY BRIEF for ${new Date().toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}.

TODAY'S DOMAIN: ${ctx.domain.label} — ${ctx.domain.theme}
Critical tasks: ${ctx.crit}
High priority tasks: ${ctx.high}
Open safety items: ${ctx.openS}
Open gaps: ${ctx.openG}
Grants: NLnet (€35K rolling), Lotterywest (Mar 2026), Dept Communities WA (Apr 2026)

Recent journal entries from Mike (use to personalise tone):
${ctx.recentJ}

Respond ONLY with valid JSON — no markdown, no code fences:
{"summary":"2-3 sentence warm direct orientation, under 45 seconds aloud, echoes Mike's current preoccupations","domainSignal":"1-2 sentences on today's domain and Kamunity opportunity","insight":"One interesting connection or provocation relevant to current work","focusBuild":"Top build task today (be specific)","focusGrunt":"Top grunt/admin task today (be specific)","triggerActions":["Specific action 1","Specific action 2","Specific action 3"],"sources":[{"claim":"a fact used","source":"name or url","confidence":"verified|inferred|speculative"}]}

Mike: Quality Systems (Deming/Juran), Campfire metaphor, anti-enshittification, community-first, Scottish, Perth WA. Direct, warm, no corporate jargon.`;
  try{
    const res=await fetch('/.netlify/functions/waymaker',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:'You are Waymaker. Respond only with valid JSON as instructed. No markdown, no code fences, no commentary — pure JSON object only.',messages:[{role:'user',content:prompt}]})});
    if(!res.ok){const err=await res.text();throw new Error(`Waymaker ${res.status}: ${err.slice(0,120)}`);}
    const data=await res.json();
    const raw=data.response||data.content||data.reply||'';
    if(!raw)throw new Error(`Empty response from Waymaker (keys: ${Object.keys(data).join(',')})`);
    const m=raw.replace(/```json|```/g,'').match(/\{[\s\S]*\}/);
    if(!m)throw new Error(`No JSON found in response (got: ${raw.slice(0,80)})`);
    const brief=JSON.parse(m[0]);
    brief.date=new Date().toDateString();
    brief.generatedAt=new Date().toISOString();
    try{localStorage.setItem(BRIEF_KEY,JSON.stringify(brief));}catch{}
    renderBriefContent(brief);
    saveToArchive(brief);
  }catch(err){
    bodyEl.innerHTML=`<p style="color:var(--danger)">Brief generation failed: ${err.message}.</p><p style="font-size:12px;color:var(--dim)">Check Waymaker function logs in Netlify admin.</p>`;
  }
}

function renderBriefContent(brief){
  document.getElementById('briefBody').innerHTML=`
    <div class="brief-summary">${brief.summary||''}</div>
    ${brief.domainSignal?`<div class="brief-domain-signal"><strong>Today's signal:</strong> ${brief.domainSignal}</div>`:''}
    ${brief.insight?`<div class="brief-insight"> <em>${brief.insight}</em></div>`:''}`;
  if(brief.focusBuild||brief.focusGrunt){
    document.getElementById('focusBuild').textContent=brief.focusBuild||'';
    document.getElementById('focusGrunt').textContent=brief.focusGrunt||'';
    if(brief.triggerActions?.length)document.getElementById('focusTriggers').innerHTML=brief.triggerActions.map(a=>`<button class="trigger-btn" onclick="copyTrigger(this)">${a}</button>`).join('');
    document.getElementById('focusCard').style.display='block';
  }
  if(brief.sources?.length){
    document.getElementById('sourcesList').innerHTML=brief.sources.map(s=>`<div class="source-item source-${s.confidence}"><span class="source-confidence">${s.confidence}</span><span class="source-claim">${s.claim}</span>${s.source?.startsWith('http')?`<a href="${s.source}" target="_blank" class="source-link"></a>`:`<span class="source-label">${s.source||''}</span>`}</div>`).join('');
    document.getElementById('briefSources').style.display='block';
  }
}

function toggleSources(){const l=document.getElementById('sourcesList');l.style.display=l.style.display==='none'?'block':'none';}
function copyTrigger(btn){navigator.clipboard?.writeText(btn.textContent).then(()=>{const o=btn.textContent;btn.textContent=' Copied';setTimeout(()=>btn.textContent=o,1500);});}

// Web Speech
let speechUtterance=null;
function speakBrief(){
  if(!window.speechSynthesis){alert('Web Speech not supported. Try Chrome or Safari.');return;}
  const text=document.getElementById('briefBody')?.innerText||'';
  if(!text||text.includes('Generate new brief'))return;
  window.speechSynthesis.cancel();
  speechUtterance=new SpeechSynthesisUtterance(text);
  speechUtterance.rate=1.05;
  speechUtterance.onend=()=>{document.getElementById('btnSpeak').style.display='inline-flex';document.getElementById('btnStopSpeak').style.display='none';resetInactivityTimer();};
  window.speechSynthesis.speak(speechUtterance);
  document.getElementById('btnSpeak').style.display='none';
  document.getElementById('btnStopSpeak').style.display='inline-flex';
  pauseInactivityTimer();
}
function stopSpeaking(){window.speechSynthesis?.cancel();document.getElementById('btnSpeak').style.display='inline-flex';document.getElementById('btnStopSpeak').style.display='none';resetInactivityTimer();}

// ElevenLabs TTS — best quality, works on mobile
async function generateElevenAudio(){
  const btn=document.getElementById('btnEleven');
  const wrap=document.getElementById('elevenAudioWrap');
  const audioEl=document.getElementById('elevenAudio');

  // Build brief text from current brief content
  const briefBody=document.getElementById('briefBody')?.innerText||'';
  const focusBuild=document.getElementById('focusBuild')?.textContent||'';
  const focusGrunt=document.getElementById('focusGrunt')?.textContent||'';

  if(!briefBody||briefBody.includes('Generate new brief')||briefBody.includes('Hit ✨')){
    alert('Generate a brief first, then tap Listen for the audio version.');return;
  }

  let text=briefBody;
  if(focusBuild)text+=` Focus build task: ${focusBuild}.`;
  if(focusGrunt)text+=` Admin priority: ${focusGrunt}.`;

  const orig=btn.textContent;
  btn.textContent='⏳ Generating…';btn.disabled=true;
  wrap.style.display='none';

  try{
    const res=await fetch('/.netlify/functions/brief-audio',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({text})
    });
    if(!res.ok){const e=await res.json();throw new Error(e.error||`HTTP ${res.status}`);}
    const data=await res.json();
    const blob=new Blob([Uint8Array.from(atob(data.audioBase64),c=>c.charCodeAt(0))],{type:'audio/mpeg'});
    const url=URL.createObjectURL(blob);
    audioEl.src=url;
    wrap.style.display='block';
    audioEl.play().catch(()=>{});
    btn.textContent='\ud83c\udf99 Replay';
  }catch(err){
    showCmdResult(`⚠️ Audio failed: ${err.message}`);
  }finally{
    btn.disabled=false;
    if(btn.textContent==='⏳ Generating…')btn.textContent=orig;
  }
}

// Voice journal input
let recognition=null,isListening=false;
function toggleVoiceInput(){
  if(!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){alert('Voice input not supported. Try Chrome.');return;}
  if(isListening){recognition?.stop();return;}
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  recognition=new SR();recognition.continuous=true;recognition.interimResults=true;recognition.lang='en-AU';
  recognition.onresult=e=>{document.getElementById('journalInput').value=Array.from(e.results).map(r=>r[0].transcript).join('');};
  recognition.onend=()=>{isListening=false;document.getElementById('btnMic').textContent=' Voice';};
  recognition.start();isListening=true;document.getElementById('btnMic').textContent=' Listening';
}

// ── WAYMAKER COMMAND ROUTING ─────────────────
const COMMANDS={
  '/brief': async (arg)=>{ await generateBrief(); },
  '/sweep': async (arg)=>{ await runSensorySweep(); },
  '/task': (arg)=>{
    if(!arg){showCmdResult('📋 Usage: /task Your task description here');return;}
    const id='t'+(TASKS.length+1+Date.now()%1000);
    TASKS.unshift({id,text:arg,pri:'medium',done:false,tags:['capture'],detail:'Added via /task command.'});
    renderTasks();renderCmdTop5();
    showCmdResult('✅ Task added: '+arg);
  },
  '/gap': (arg)=>{
    if(!arg){showCmdResult('📋 Usage: /gap What you don\'t know yet');return;}
    const id='G'+(GAPS.length+1+Date.now()%1000);
    GAPS.unshift({id,type:'gap',resolved:false,title:arg,body:'Added via /gap command. Needs investigation.'});
    renderGaps();renderCmdGapsSnap();
    showCmdResult('⚠️ Gap logged: '+arg);
  },
  '/ally': async (arg)=>{
    if(!arg){showCmdResult('📋 Usage: /ally ALIKE — what should I know before our meeting?');return;}
    await _cmdAsk(`Waymaker — ally context request: ${arg}. Mike Fuller, Kamunity, Perth WA. Current allies: ${ENTITIES.filter(e=>e.type==='ally').map(e=>e.name).join(', ')}. Be specific, practical, under 150 words.`);
  },
  '/grant': async (arg)=>{
    if(!arg){showCmdResult('📋 Usage: /grant NLnet — what do I need to do this week?');return;}
    await _cmdAsk(`Waymaker — grant question: ${arg}. Context: NLnet €35K rolling, Lotterywest Mar 2026, Dept Communities WA Apr 2026. Mike Fuller, Kamunity, community-first open-source. Be specific and actionable.`);
  },
  '/roadmap': async (arg)=>{
    const active=PHASES.filter(p=>p.status==='active').map(p=>`${p.id}: ${p.title} — ${p.items.filter(i=>!i.done).length} items open`).join('\n');
    await _cmdAsk(`Waymaker — roadmap check. Active phases:\n${active}\nQuestion: ${arg||'What should Mike focus on this week across these phases?'} Be direct, 3 priorities max.`);
  },
};

async function _cmdAsk(prompt){
  const out=document.getElementById('cmdOutput');if(!out)return;
  out.style.display='block';
  out.innerHTML='<span style="color:var(--faint)">⏳ Waymaker thinking…</span>';
  try{
    const res=await fetch('/.netlify/functions/waymaker',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:'You are Waymaker, internal AI for Kamunity. Be direct, warm, practical. Australian English. No corporate jargon.',messages:[{role:'user',content:prompt}]})}); 
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    const text=data.response||'';
    out.innerHTML=`<div class="cmd-response">${text.replace(/\n/g,'<br>')}</div>
      <div class="cmd-response-actions">
        <button class="task-action-btn" onclick="copyResponseText()">📋 Copy</button>
        <button class="task-action-btn" onclick="document.getElementById('cmdOutput').style.display='none'">✕ Close</button>
      </div>`;
    window._lastCmdResponse=text;
  }catch(e){
    out.innerHTML=`<span style="color:var(--danger)">Waymaker error: ${e.message}</span>`;
  }
}

function copyResponseText(){
  if(window._lastCmdResponse)navigator.clipboard?.writeText(window._lastCmdResponse).then(()=>{});
}

function showCmdResult(msg){
  const out=document.getElementById('cmdOutput');if(!out)return;
  out.style.display='block';
  out.innerHTML=`<div class="cmd-response" style="color:var(--moss)">${msg}</div>`;
  setTimeout(()=>out.style.display='none',3000);
}

async function runSensorySweep(){
  const out=document.getElementById('cmdOutput');if(out){out.style.display='block';out.innerHTML='<span style="color:var(--faint)">🔭 Sweeping all open items…</span>';}
  const tasks=TASKS.filter(t=>!t.done).slice(0,8).map(t=>`[${t.pri}] ${t.text}`).join('\n');
  const gaps=GAPS.filter(g=>!g.resolved).map(g=>`${g.type==='q'?'Q':'GAP'}: ${g.title}`).join('\n');
  const safety=SAFETY_ITEMS.filter(s=>s.st!=='done').map(s=>`[${s.sev}] ${s.text}`).join('\n');
  const journal=getJournal().slice(0,3).map(e=>e.text).join(' | ');
  const prompt=`You are Waymaker — internal AI for Kamunity (Mike Fuller, Perth WA).

SENSORY SWEEP — scan everything open and surface the 3 cheapest, highest-value experiments or next steps.

Open tasks:\n${tasks||'none'}
Open gaps:\n${gaps||'none'}
Open safety items:\n${safety||'none'}
Recent journal context: ${journal||'none'}

Respond in plain text. Format as:
**TOP 3 EXPERIMENTS**
1. [experiment or action] — why it's cheap and high value
2. [experiment or action] — why
3. [experiment or action] — why

**ONE THING MIKE MIGHT BE MISSING**
[honest provocation]

Direct, warm, Australian English. No preamble.`;
  await _cmdAsk(prompt);
}

// Journal
function saveJournalEntry(){
  const input=document.getElementById('journalInput');
  const text=input.value.trim();if(!text)return;
  if(text.startsWith('/')){
    const parts=text.trim().split(' ');
    const cmd=parts[0].toLowerCase();
    const arg=parts.slice(1).join(' ');
    if(COMMANDS[cmd]){input.value='';COMMANDS[cmd](arg);return;}
    showCmdResult(`Unknown command: ${cmd}. Try /brief /task /gap /ally /grant /roadmap /sweep`);
    return;
  }
  const entries=getJournal();
  entries.unshift({id:Date.now(),text,timestamp:new Date().toISOString(),day:new Date().toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'}),domain:DOMAIN_SCHEDULE[new Date().getDay()].label});
  saveJournalStore(entries);input.value='';renderJournalEntries();
  syncToBlobs({journal:entries.slice(0,20)});
}

function renderJournalEntries(){
  const entries=getJournal();
  const c=document.getElementById('journalEntries');if(!c)return;
  if(!entries.length){c.innerHTML='<p style="color:var(--faint);font-size:12px;padding:8px 0">No entries yet.</p>';return;}
  c.innerHTML=entries.slice(0,5).map(e=>`<div class="journal-entry"><div class="journal-entry-meta"><span>${e.day}</span><span style="color:var(--faint);font-size:11px">${e.domain}</span></div><p class="journal-entry-text">${e.text}</p></div>`).join('');
}

// Archive
function saveToArchive(brief){
  try{const a=JSON.parse(localStorage.getItem('kt-brief-archive')||'[]');a.unshift({...brief,archived:new Date().toISOString()});localStorage.setItem('kt-brief-archive',JSON.stringify(a.slice(0,20)));}catch{}
}
function renderArchive(){
  const a=document.getElementById('archiveList');if(!a)return;
  try{
    const entries=JSON.parse(localStorage.getItem('kt-brief-archive')||'[]');
    if(!entries.length){a.innerHTML='<p style="color:var(--faint);font-size:12px">No archived briefs yet. Generate your first brief above.</p>';return;}
    a.innerHTML=entries.map((e,i)=>`<div class="archive-item" onclick="expandArchive(${i})"><span class="archive-date">${e.date||''}</span><span class="archive-domain">${e.domainSignal?'':'Brief'}</span><button class="btn-ghost" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();reSpeakArchive(${i})"> Play</button></div>`).join('');
  }catch{}
}
function reSpeakArchive(i){
  try{const e=JSON.parse(localStorage.getItem('kt-brief-archive')||'[]')[i];if(!e)return;const t=[e.summary,e.domainSignal,e.insight].filter(Boolean).join('. ');if(!window.speechSynthesis)return;window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));}catch{}
}

//  SYNC TO BLOBS 
async function syncToBlobs(payload){
  try{
    await fetch('/netlify/functions/sync',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,syncedAt:new Date().toISOString()})});
  }catch(e){console.warn('Sync skipped (local):', e.message);}
}

async function loadFromBlobs(){
  try{
    const res=await fetch('/netlify/functions/sync');
    const data=await res.json();
    if(data.exists&&data.data?.journal){
      const local=getJournal();
      if(!local.length&&data.data.journal.length){
        saveJournalStore(data.data.journal);
        renderJournalEntries();
      }
    }
  }catch(e){console.warn('Blob load skipped:', e.message);}
}

//  INACTIVITY TIMER 
let inactivityTimer=null;
let timerPaused=false;
const INACTIVITY_MS=5*60*1000;

function startInactivityTimer(){
  resetInactivityTimer();
  ['click','keydown','mousemove','touchstart','scroll'].forEach(ev=>
    document.addEventListener(ev,resetInactivityTimer,{passive:true})
  );
}

function resetInactivityTimer(){
  if(timerPaused)return;
  clearTimeout(inactivityTimer);
  inactivityTimer=setTimeout(showInactivityModal,INACTIVITY_MS);
}

function pauseInactivityTimer(){timerPaused=true;clearTimeout(inactivityTimer);}
function resumeInactivityTimer(){timerPaused=false;resetInactivityTimer();}

function showInactivityModal(){
  const existing=document.getElementById('inactivityModal');
  if(existing)existing.remove();
  const modal=document.createElement('div');
  modal.id='inactivityModal';
  modal.className='inactivity-modal';
  modal.innerHTML=`
    <div class="inactivity-box">
      <div class="inactivity-icon"></div>
      <h3>Still here?</h3>
      <p>You've been quiet for 5 minutes.</p>
      <div class="inactivity-btns">
        <button class="btn-ember" onclick="keepGoing()">Yes, keep going</button>
        <button class="btn-ghost" onclick="extendTimer()">+5 mins</button>
        <button class="btn-ghost" onclick="endSession()">End session</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function keepGoing(){
  document.getElementById('inactivityModal')?.remove();
  resetInactivityTimer();
}
function extendTimer(){
  document.getElementById('inactivityModal')?.remove();
  clearTimeout(inactivityTimer);
  inactivityTimer=setTimeout(showInactivityModal,5*60*1000);
}
function endSession(){
  document.getElementById('inactivityModal')?.remove();
  const journal=getJournal();
  const tasks=TASKS.map(t=>({id:t.id,done:t.done}));
  syncToBlobs({journal:journal.slice(0,20),tasks,endedAt:new Date().toISOString()}).then(()=>{
    const banner=document.createElement('div');
    banner.className='session-end-banner';
    banner.innerHTML=`<span> Session saved to Netlify Blobs. You can close this tab.</span><button class="btn-ghost" onclick="this.parentElement.remove()"></button>`;
    document.body.prepend(banner);
  });
}

//  HEADER STATS 
function updateHeaderStats(){
  document.getElementById('statLive').textContent=ENTITIES.filter(e=>e.status==='live').length+' live';
  document.getElementById('statBuild').textContent=ENTITIES.filter(e=>e.status==='building').length+' building';
  document.getElementById('statWarn').textContent=ENTITIES.filter(e=>e.status==='idea').length+' ideas';
}

//  VIEW SWITCH 
function switchView(v){
  state.view=v;
  document.querySelectorAll('.view-panel').forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById('view-'+v);
  if(panel)panel.classList.add('active');
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===v));
}

//  FILTERS + SORT 
function setFilter(key,val,btn){
  state[key]=val;
  btn.closest('.filter-group').querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}
function setSort(val,btn){
  state.sort=val;
  document.querySelectorAll('#sortBtns .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}
function applyFilters(){
  const q=(document.getElementById('matrixSearch')?.value||'').toLowerCase();
  state.search=q;
  let list=ENTITIES.filter(e=>{
    if(state.zone!=='all'&&e.zone!==state.zone)return false;
    if(state.status!=='all'&&e.status!==state.status)return false;
    if(state.type!=='all'&&e.type!==state.type)return false;
    if(q&&!e.name.toLowerCase().includes(q)&&!e.desc.toLowerCase().includes(q))return false;
    return true;
  });
  list=sortList(list,state.sort);
  const cnt=document.getElementById('matrixCount');
  if(cnt)cnt.textContent=list.length+' entities';
  renderMatrix(list);
  renderZones(list);
}
function sortList(list,key){
  return [...list].sort((a,b)=>{
    if(key==='name')return a.name.localeCompare(b.name);
    if(key==='effort')return a.effort-b.effort;
    if(key==='impact')return b.impact-a.impact;
    if(key==='ratio')return(b.impact/b.effort)-(a.impact/a.effort);
    return 0;
  });
}

//  MATRIX 
function renderMatrix(list){
  const tbody=document.getElementById('entityBody');if(!tbody)return;
  if(!list.length){tbody.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--faint);padding:24px">No entities match the current filters.</td></tr>';return;}
  tbody.innerHTML=list.map(e=>{
    const ratio=(e.impact/e.effort).toFixed(1);
    const rc=ratio>=2?'ratio-high':ratio>=1.2?'ratio-mid':'ratio-low';
    const staleFlag=e._stale?'<span style="font-size:10px;color:var(--danger)" title="Not reviewed in 30+ days"></span>':'';
    return `<tr onclick="openDrawer('${e.id}')" style="cursor:pointer">
      <td><strong>${e.name}</strong>${staleFlag}</td>
      <td><span class="type-badge type-${e.type}">${e.type}</span></td>
      <td><span class="zone-badge zone-${e.zone}">${e.zone}</span></td>
      <td><span class="status-badge status-${e.status}">${e.status}</span></td>
      <td>${pips(e.effort,'effort')}</td>
      <td>${pips(e.impact,'impact')}</td>
      <td><span class="ratio-chip ${rc}">${ratio}</span></td>
      <td class="roadmap-tag">${e.roadmap}</td>
    </tr>`;
  }).join('');
}
function pips(val,kind){let s='';for(let i=1;i<=5;i++)s+=`<span class="bar-pip${i<=val?' filled':''}"></span>`;return`<div class="${kind}-bar">${s}</div>`;}

//  ZONES 
const ZONE_CONFIG=[
  {key:'build',label:' Core Build',desc:'Foundation  Kitchen Table, engine, methodology'},
  {key:'people',label:' People & Allies',desc:'Relationships, meetings, partnerships'},
  {key:'deploy',label:' Deploy & Ecosystem',desc:'Live sites, tools, public platforms'},
  {key:'momentum',label:' Momentum',desc:'Grants, speaking, growth opportunities'},
];
function renderZones(list){
  const grid=document.getElementById('zonesGrid');if(!grid)return;
  grid.innerHTML=ZONE_CONFIG.map(z=>{
    const items=list.filter(e=>e.zone===z.key);
    const avg=items.length?(items.reduce((s,e)=>s+e.impact,0)/items.length).toFixed(1):'';
    const cards=items.length?items.map(e=>`<div class="entity-card" onclick="openDrawer('${e.id}')"><p class="entity-card-title">${e.name}${e._stale?'<span style="color:var(--danger);font-size:10px"> </span>':''}</p><div class="entity-card-meta"><span class="type-badge type-${e.type}">${e.type}</span><span class="status-badge status-${e.status}">${e.status}</span></div></div>`).join(''):'<p style="font-size:12px;color:var(--faint);padding:8px">Nothing here with current filters.</p>';
    return`<div class="zone-column"><div class="zone-col-header"><h3>${z.label}</h3><span class="zone-meta">${items.length} items  avg impact ${avg}</span></div><p style="font-size:11px;color:var(--faint);padding:0 16px 8px;margin:0">${z.desc}</p><div class="zone-cards">${cards}</div></div>`;
  }).join('');
}

//  TASKS VIEW 
const TASK_FILTERS=[{k:'all',l:'All'},{k:'open',l:'Open'},{k:'done',l:'Done'},{k:'critical',l:'Critical'},{k:'meeting',l:'Meetings'},{k:'build',l:'Build'},{k:'grants',l:'Grants'},{k:'outreach',l:'Outreach'}];

function taskActionButtons(t){
  const actions=[];
  if(t.tags.includes('meeting')||t.tags.includes('outreach'))
    actions.push(`<button class="task-action-btn" onclick="taskAction('email','${t.id}')">✉ Draft email</button>`);
  actions.push(`<button class="task-action-btn" onclick="taskAction('waymaker','${t.id}')">🤖 Ask Waymaker</button>`);
  if(t.tags.includes('grants'))
    actions.push(`<button class="task-action-btn" onclick="taskAction('grant','${t.id}')">📋 Grant prompt</button>`);
  actions.push(`<button class="task-action-btn" onclick="taskAction('copy','${t.id}')">📋 Copy to Opus</button>`);
  return actions.join('');
}

function taskAction(type,id){
  const t=TASKS.find(x=>x.id===id);if(!t)return;
  if(type==='waymaker'){
    _wmSend(`Task: "${t.text}"\nContext: ${t.detail}\nPriority: ${t.pri}\n\nWhat are the 3 most important next actions? Be specific and actionable. Australian English.`);
    return;
  }
  if(type==='email'){
    _wmSend(`Draft a warm, direct outreach email. Task context: ${t.text}. Background: ${t.detail}. From Mike Fuller, Kamunity, Perth WA. Under 150 words, Australian English, no corporate jargon.`);
    return;
  }
  if(type==='grant'){
    _wmSend(`Help me with a grant angle for this task: "${t.text}". Context: ${t.detail}. Kamunity — Mike Fuller, Perth WA, community-first, open-source, anti-enshittification. What's the strongest grant narrative angle here?`);
    return;
  }
  // copy to clipboard
  const text=`Task: ${t.text}\nPriority: ${t.pri}\nContext: ${t.detail}\nTags: ${t.tags.join(', ')}\n\nHelp me think through the next steps for this task.`;
  navigator.clipboard?.writeText(text).then(()=>{
    const btn=event.target;const orig=btn.textContent;
    btn.textContent='✓ Copied!';btn.style.background='var(--moss)';btn.style.color='#fff';
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.style.color='';},2000);
  });
}

function renderTasks(){
  const fb=document.getElementById('taskFilterBar');
  if(fb)fb.innerHTML=TASK_FILTERS.map(f=>`<button class="fbtn${f.k===state.taskFilter?' active':''}" onclick="setTaskFilter('${f.k}')">${f.l}</button>`).join('');
  let tasks=[...TASKS];
  const f=state.taskFilter;
  if(f==='open')tasks=tasks.filter(t=>!t.done);
  else if(f==='done')tasks=tasks.filter(t=>t.done);
  else if(f==='critical')tasks=tasks.filter(t=>t.pri==='critical');
  else if(f!=='all')tasks=tasks.filter(t=>t.tags.includes(f));
  tasks.sort((a,b)=>{const o={critical:0,high:1,medium:2,low:3};return(o[a.pri]||3)-(o[b.pri]||3);});
  const out=document.getElementById('tasksOut');if(!out)return;
  const crit=tasks.filter(t=>t.pri==='critical'&&!t.done);
  const rest=tasks.filter(t=>!(t.pri==='critical'&&!t.done));
  const renderTask=t=>{
    const actionsHtml=t.done?'':'<div class="task-actions" id="ta-'+t.id+'" style="display:none">'+taskActionButtons(t)+'</div>';
    return '<div class="task-item'+(t.done?' is-done':'')+' pri-'+t.pri+'" id="task-'+t.id+'">'
      +'<label class="task-check"><input type="checkbox" '+(t.done?'checked':'')+' onchange="toggleTask(\''+t.id+'\',this.checked)"></label>'
      +'<div class="task-body">'
      +'<div class="task-text'+(t.done?' struck':'')+'" onclick="toggleTaskDetail(\''+t.id+'\')" style="cursor:pointer" title="Click to expand">'+t.text+' <span class="task-expand-hint">\u25b8</span></div>'
      +'<div class="task-detail-text" id="td-'+t.id+'" style="display:none">'+t.detail+'</div>'
      +actionsHtml
      +'</div>'
      +'<span class="task-pri-badge pri-badge-'+t.pri+'">'+t.pri+'</span>'
      +'</div>';
  };
  out.innerHTML=(crit.length?`<div class="task-group-head">🔴 Critical (${crit.length})</div>${crit.map(renderTask).join('')}`:'')+(rest.length?`<div class="task-group-head" style="margin-top:12px">Other tasks</div>${rest.map(renderTask).join('')}`:'')||'<p style="color:var(--faint);padding:16px">No tasks match this filter.</p>';
}
function setTaskFilter(f){state.taskFilter=f;renderTasks();}
function toggleTask(id,done){const t=TASKS.find(x=>x.id===id);if(!t)return;t.done=done;saveTaskDone(id,done);renderTasks();}
function toggleTaskDetail(id){
  const detail=document.getElementById(`td-${id}`);
  const actions=document.getElementById(`ta-${id}`);
  const hint=document.querySelector(`#task-${id} .task-expand-hint`);
  if(!detail)return;
  const open=detail.style.display==='none';
  detail.style.display=open?'block':'none';
  if(actions)actions.style.display=open?'flex':'none';
  if(hint)hint.textContent=open?'▾':'▸';
}

// ── SAFETY VIEW ──────────────────────────────
const STATUS_CYCLE=['open','in-progress','done'];
const STATUS_LABELS={'open':'⬤ Open','in-progress':'◑ In Progress','done':'✓ Done'};

function safetyAction(type,id){
  const s=SAFETY_ITEMS.find(x=>x.id===id);if(!s)return;
  if(type==='waymaker'){
    _wmSend(`Safety item: "${s.text}" (severity: ${s.sev}, status: ${s.st}). What are the specific steps to fix or mitigate this? Be concrete and ordered. Mike Fuller, Kamunity, Perth WA.`);
    return;
  }
  const text=`Safety item ${s.id}: ${s.text}\nSeverity: ${s.sev} | Status: ${s.st}\nAction needed: resolve or document mitigation steps.\n\nHelp me think through how to address this.`;
  navigator.clipboard?.writeText(text).then(()=>{
    const btn=event.target;const orig=btn.textContent;
    btn.textContent='✓ Copied!';btn.style.background='var(--moss)';btn.style.color='#fff';
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.style.color='';},2000);
  });
}

function renderSafety(){
  const fb=document.getElementById('safetyFilterBar');
  const SFILTERS=[{k:'all',l:'All'},{k:'critical',l:'Critical'},{k:'high',l:'High'},{k:'open',l:'Open'},{k:'in-progress',l:'In Progress'},{k:'done',l:'Done'}];
  if(fb)fb.innerHTML=SFILTERS.map(f=>`<button class="fbtn${f.k===state.safetyFilter?' active':''}" onclick="setSafetyFilter('${f.k}')">${f.l}</button>`).join('');
  let items=[...SAFETY_ITEMS];
  const f=state.safetyFilter;
  if(f==='critical')items=items.filter(s=>s.sev==='critical');
  else if(f==='high')items=items.filter(s=>s.sev==='high');
  else if(f==='open')items=items.filter(s=>s.st==='open');
  else if(f==='in-progress')items=items.filter(s=>s.st==='in-progress');
  else if(f==='done')items=items.filter(s=>s.st==='done');
  const openCount=SAFETY_ITEMS.filter(s=>s.st==='open').length;
  const doneCount=SAFETY_ITEMS.filter(s=>s.st==='done').length;
  const out=document.getElementById('safetyOut');if(!out)return;
  out.innerHTML=`<div style="font-size:12px;color:var(--dim);margin-bottom:12px">${openCount} open · ${doneCount}/${SAFETY_ITEMS.length} resolved</div>`+
  (items.map(s=>`<div class="safety-card sev-${s.sev}">
    <div class="safety-title"><span>${s.id}: ${s.text}</span><span class="sev-badge sev-${s.sev}">${s.sev}</span></div>
    <div class="safety-card-footer">
      <button class="st-btn st-${s.st.replace('-','_')}" onclick="cycleSafety('${s.id}')">${STATUS_LABELS[s.st]||s.st} — click to advance</button>
      ${s.st!=='done'?`<div class="task-actions" style="margin-top:6px">
        <button class="task-action-btn" onclick="safetyAction('waymaker','${s.id}')">🤖 Ask Waymaker</button>
        <button class="task-action-btn" onclick="safetyAction('copy','${s.id}')">📋 Copy to Opus</button>
      </div>`:''}
    </div>
  </div>`).join('')||'<p style="color:var(--faint);padding:16px">Nothing here.</p>');
}
function setSafetyFilter(f){state.safetyFilter=f;renderSafety();}
function cycleSafety(id){const item=SAFETY_ITEMS.find(x=>x.id===id);if(!item)return;const idx=STATUS_CYCLE.indexOf(item.st);item.st=idx>=0?STATUS_CYCLE[(idx+1)%STATUS_CYCLE.length]:'in-progress';saveSafetySt(id,item.st);renderSafety();}

// ── GAPS VIEW ─────────────────────────────────
function gapAction(type,id){
  const g=GAPS.find(x=>x.id===id);if(!g)return;
  if(type==='waymaker'){
    _wmSend(`I have an open ${g.type==='q'?'question':'gap'}: "${g.title}". Context: ${g.body}. Help me think through how to address or resolve this. What do I need to know or decide? Be practical and direct. Mike Fuller, Kamunity, Perth WA.`);
    return;
  }
  const text=`${g.type==='q'?'Open question':'Known gap'}: ${g.title}\nContext: ${g.body}\nStatus: ${g.resolved?'Resolved':'Open'}\n\nHelp me think through resolution steps.`;
  navigator.clipboard?.writeText(text).then(()=>{
    const btn=event.target;const orig=btn.textContent;
    btn.textContent='✓ Copied!';btn.style.background='var(--moss)';btn.style.color='#fff';
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.style.color='';},2000);
  });
}

function renderGaps(){
  const fb=document.getElementById('gapsFilterBar');
  const GFILTERS=[{k:'all',l:'All'},{k:'gaps',l:'Gaps'},{k:'questions',l:'Questions'},{k:'open',l:'Open'},{k:'resolved',l:'Resolved'}];
  if(fb)fb.innerHTML=GFILTERS.map(f=>`<button class="fbtn${f.k===state.gapsFilter?' active':''}" onclick="setGapsFilter('${f.k}')">${f.l}</button>`).join('');
  let items=[...GAPS];
  const f=state.gapsFilter;
  if(f==='gaps')items=items.filter(g=>g.type==='gap');
  else if(f==='questions')items=items.filter(g=>g.type==='q');
  else if(f==='open')items=items.filter(g=>!g.resolved);
  else if(f==='resolved')items=items.filter(g=>g.resolved);
  const out=document.getElementById('gapsOut');if(!out)return;
  const res=GAPS.filter(g=>g.resolved).length;
  out.innerHTML=`<div style="font-size:12px;color:var(--dim);margin-bottom:12px">${GAPS.filter(g=>g.type==='gap').length} gaps · ${GAPS.filter(g=>g.type==='q').length} questions · ${res}/${GAPS.length} resolved</div>`+
  (items.map(g=>`<div class="gap-card${g.resolved?' resolved':''}${g.type==='q'?' gap-q':''}">
    <div class="gap-title">
      <strong>${g.type==='q'?'❓':'⚠️'} ${g.title}</strong>
      <button class="resolve-btn" onclick="toggleGap('${g.id}')">${g.resolved?'✓ Resolved':'Mark resolved'}</button>
    </div>
    <div class="gap-body">${g.body}</div>
    ${!g.resolved?`<div class="task-actions" style="margin-top:8px">
      <button class="task-action-btn" onclick="gapAction('waymaker','${g.id}')">🤖 Ask Waymaker</button>
      <button class="task-action-btn" onclick="gapAction('copy','${g.id}')">📋 Copy to Opus</button>
    </div>`:''}
  </div>`).join('')||'<p style="color:var(--faint);padding:16px">Nothing here.</p>');
}
function setGapsFilter(f){state.gapsFilter=f;renderGaps();}
function toggleGap(id){const g=GAPS.find(x=>x.id===id);if(!g)return;g.resolved=!g.resolved;saveGapResolved(id,g.resolved);renderGaps();}

//  MONEY VIEW 
function renderMoney(){
  const out=document.getElementById('moneyOut');if(!out)return;
  const mtd=localStorage.getItem(MTD_KEY)||'$0';
  out.innerHTML=`
    <div class="money-stats">
      <div class="money-stat" onclick="editMTD()" title="Click to edit" style="cursor:pointer">
        <div class="money-val" id="mtdVal">${mtd}</div><div class="money-label">MTD Revenue</div></div>
      <div class="money-stat"><div class="money-val">~$40</div><div class="money-label">Costs/mo</div></div>
      <div class="money-stat"><div class="money-val">$58K</div><div class="money-label">Target/mo</div></div>
      <div class="money-stat"><div class="money-val" style="color:var(--sky)">35K</div><div class="money-label">NLnet Ask</div></div>
    </div>
    <h3 class="section-sub-head"> Consulting Services</h3>
    ${SERVICES.map(s=>`<div class="money-card"><div class="money-card-title">${s.name} <span style="font-size:11px;color:var(--faint)">${s.dur}</span></div><div class="money-card-body"><span style="color:var(--moss)">Community: ${s.nfp}</span>  Standard: ${s.std}</div></div>`).join('')}
    <h3 class="section-sub-head" style="margin-top:20px"> Grant Pipeline</h3>
    ${GRANTS.map(g=>`<div class="money-card"><div class="money-card-title">${g.name} <span class="grant-badge">${g.st}</span></div><div class="money-card-body"><strong>${g.amt}</strong>  Deadline: ${g.deadline}</div><div class="task-actions" style="margin-top:8px"><button class="task-action-btn" onclick="grantAsk('${g.name.replace(/'/g,'')}')" >🤖 Ask Waymaker</button></div></div>`).join('')}
    <h3 class="section-sub-head" style="margin-top:20px"> Revenue Trajectory</h3>
    <div class="money-card"><div class="money-card-body" style="line-height:1.9">
      <strong style="color:var(--ember)">Now:</strong> Consulting — audits, workshops, strategy<br>
      <strong style="color:var(--moss)">3–6 mo:</strong> Grants — NLnet, Lotterywest, Dept Communities<br>
      <strong style="color:var(--sky)">6–12 mo:</strong> Community Supported Software — monthly contributions<br>
      <strong style="color:var(--violet)">Year 2:</strong> Methodology licensing, training-as-product, international
    </div></div>
    <h3 class="section-sub-head" style="margin-top:20px">🏆 Sovereign Tool Recommendations</h3>
    <p style="font-size:12px;color:var(--dim);margin-bottom:12px">Tools Kamunity recommends to community orgs instead of the extractive defaults.</p>
    ${RECOMMENDED.map(r=>`<div class="money-card"><div class="money-card-title">${r.icon} <a href="${r.url}" target="_blank" style="color:var(--sky)">${r.name}</a></div><div class="money-card-body">${r.desc}<br><em style="color:var(--dim);font-size:11px">${r.why}</em><br><span style="font-size:11px;color:var(--moss)">${r.sov}</span></div></div>`).join('')}
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--hover);display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn-ghost" onclick="exportKTState()">⬇ Export state</button>
      <button class="btn-ghost" onclick="importKTState()">⬆ Import state</button>
      <button class="btn-ghost" style="color:var(--danger)" onclick="clearKTState()">✕ Clear state</button>
    </div>`;
}
function editMTD(){
  const cur=localStorage.getItem(MTD_KEY)||'$0';
  const val=prompt('Enter MTD revenue (e.g. $1,200):',cur);
  if(val!==null){localStorage.setItem(MTD_KEY,val.trim()||'$0');document.getElementById('mtdVal').textContent=val.trim()||'$0';}
}
function grantAsk(name){
  const g=GRANTS.find(x=>x.name===name||x.name.replace(/'/g,'')===name);if(!g)return;
  _wmSend('Grant: "'+g.name+'" — Amount: '+g.amt+', Deadline: '+g.deadline+', Status: '+g.st+'. What should I be doing right now to progress this grant application? What are the strongest angles for Kamunity? Mike Fuller, Perth WA, community-first AI tools.');
}

// ── DETAIL DRAWER ─────────────────────────────
let _drawerEntityId=null;

function openDrawer(id){
  _drawerEntityId=id;
  const e=ENTITIES.find(x=>x.id===id);if(!e)return;
  _renderDrawer(e);
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('entityDrawer').classList.add('open');
}

function _renderDrawer(e){
  const ratio=(e.impact/e.effort).toFixed(1);
  const rc=ratio>=2?'ratio-high':ratio>=1.2?'ratio-mid':'ratio-low';
  const makeSlider=(field,val)=>`
    <div class="drawer-slider-row">
      <label class="drawer-slider-label">${field==='effort'?'Effort 🔥':'Impact ⭐'}</label>
      <input type="range" min="1" max="5" value="${val}" class="drawer-slider"
        oninput="updateEntityField('${e.id}','${field}',+this.value);document.getElementById('${field}Val-${e.id}').textContent=this.value+'/5'"
        onchange="saveEntityEdits('${e.id}')">
      <span id="${field}Val-${e.id}" style="font-size:12px;color:var(--faint);min-width:28px">${val}/5</span>
      ${pips(val,field)}
    </div>`;
  document.getElementById('drawerBody').innerHTML=`
    <h2 class="drawer-title">${e.name}${e._stale?'<span style="color:var(--danger);font-size:12px;margin-left:8px">⚠ 30+ days since review</span>':''}</h2>
    <p class="drawer-subtitle">
      <span class="type-badge type-${e.type}">${e.type}</span>
      <span class="zone-badge zone-${e.zone}" style="margin-left:6px">${e.zone}</span>
      <span class="status-badge status-${e.status}" style="margin-left:6px">${e.status}</span>
    </p>
    <div class="drawer-section"><div class="drawer-section-label">Description</div><p class="drawer-desc">${e.desc}</p></div>
    <div class="drawer-section">
      <div class="drawer-section-label">Effort / Impact <span style="font-size:10px;color:var(--faint);font-weight:400">— drag sliders to edit</span></div>
      ${makeSlider('effort',e.effort)}
      ${makeSlider('impact',e.impact)}
      <div style="margin-top:10px"><span class="drawer-section-label">Ratio </span><span class="ratio-chip ${rc}" id="drawerRatio-${e.id}">${ratio}</span></div>
    </div>
    <div class="drawer-section"><div class="drawer-section-label">Roadmap note</div><p class="drawer-desc">${e.roadmap}</p></div>
    ${e.url?`<div class="drawer-section"><div class="drawer-section-label">URL</div><a class="drawer-link" href="${e.url}" target="_blank">${e.url}</a></div>`:''}
    <div class="drawer-section">
      <div class="drawer-section-label">Last reviewed</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span id="drawerLastReviewed-${e.id}" style="font-size:13px;color:var(--dim)">${e.lastReviewed||'Never recorded'}</span>
        <button class="task-action-btn" onclick="markReviewed('${e.id}')">✓ Mark reviewed today</button>
      </div>
    </div>
    <div class="drawer-section"><div class="drawer-section-label">Tags</div><div class="drawer-tags">${e.tags.map(t=>`<span class="drawer-tag">${t}</span>`).join('')}</div></div>
    <div class="drawer-section" style="margin-top:4px">
      <div class="task-actions">
        <button class="task-action-btn" onclick="drawerAction('waymaker','${e.id}')">🤖 Ask Waymaker</button>
        <button class="task-action-btn" onclick="drawerAction('copy','${e.id}')">📋 Copy to Opus</button>
      </div>
    </div>`;
}

function updateEntityField(id,field,val){
  const e=ENTITIES.find(x=>x.id===id);if(!e)return;
  e[field]=val;
  const ratio=(e.impact/e.effort).toFixed(1);
  const rc=ratio>=2?'ratio-high':ratio>=1.2?'ratio-mid':'ratio-low';
  const chip=document.getElementById('drawerRatio-'+id);
  if(chip){chip.textContent=ratio;chip.className='ratio-chip '+rc;}
}

function saveEntityEdits(id){
  const e=ENTITIES.find(x=>x.id===id);if(!e)return;
  try{
    const s=JSON.parse(localStorage.getItem('kt-entity-edits')||'{}');
    s[id]={effort:e.effort,impact:e.impact,lastReviewed:e.lastReviewed};
    localStorage.setItem('kt-entity-edits',JSON.stringify(s));
  }catch{}
  applyFilters();
}

function markReviewed(id){
  const e=ENTITIES.find(x=>x.id===id);if(!e)return;
  const today=new Date().toISOString().slice(0,10);
  e.lastReviewed=today;e._stale=false;
  const el=document.getElementById('drawerLastReviewed-'+id);
  if(el)el.textContent=today;
  saveEntityEdits(id);
  applyFilters();
}

function loadEntityEdits(){
  try{
    const s=JSON.parse(localStorage.getItem('kt-entity-edits')||'{}');
    ENTITIES.forEach(e=>{if(s[e.id]){if(s[e.id].effort)e.effort=s[e.id].effort;if(s[e.id].impact)e.impact=s[e.id].impact;if(s[e.id].lastReviewed)e.lastReviewed=s[e.id].lastReviewed;}});
  }catch{}
}

function drawerAction(type,id){
  const e=ENTITIES.find(x=>x.id===id);if(!e)return;
  if(type==='waymaker'){
    _wmSend(`Waymaker — tell me what I should be doing with this entity: "${e.name}". Type: ${e.type}. Zone: ${e.zone}. Status: ${e.status}. Description: ${e.desc}. Roadmap: ${e.roadmap}. Effort: ${e.effort}/5. Impact: ${e.impact}/5. What are the 3 most valuable next actions?`);
    return;
  }
  const text=`Entity: ${e.name}\nType: ${e.type} | Zone: ${e.zone} | Status: ${e.status}\nDescription: ${e.desc}\nRoadmap: ${e.roadmap}\nEffort: ${e.effort}/5 | Impact: ${e.impact}/5 | Ratio: ${(e.impact/e.effort).toFixed(1)}\nLast reviewed: ${e.lastReviewed||'never'}`;
  navigator.clipboard?.writeText(text).then(()=>showCmdResult('📋 Copied entity context'));
}

function closeDrawer(){document.getElementById('drawerOverlay').classList.remove('open');document.getElementById('entityDrawer').classList.remove('open');}

// ── ROADMAP VIEW ──────────────────────────────
const PHASE_STATUS_CFG={
  complete:{label:'✅ Complete',cls:'phase-complete'},
  active:{label:'🔨 Active',cls:'phase-active'},
  next:{label:'⏭ Next',cls:'phase-next'},
  parked:{label:'⏸ Parked',cls:'phase-parked'},
};

function renderRoadmap(){
  const fb=document.getElementById('roadmapFilterBar');
  const RFILTERS=[{k:'all',l:'All'},{k:'active',l:'Active'},{k:'complete',l:'Complete'},{k:'next',l:'Next'}];
  if(fb)fb.innerHTML=RFILTERS.map(f=>`<button class="fbtn${f.k===state.phaseFilter?' active':''}" onclick="setPhaseFilter('${f.k}')">${f.l}</button>`).join('');
  let phases=[...PHASES];
  if(state.phaseFilter!=='all')phases=phases.filter(p=>p.status===state.phaseFilter);
  const out=document.getElementById('roadmapOut');if(!out)return;
  const active=PHASES.filter(p=>p.status==='active').length;
  const complete=PHASES.filter(p=>p.status==='complete').length;
  out.innerHTML=`<div style="font-size:12px;color:var(--dim);margin-bottom:14px">${active} active · ${complete}/${PHASES.length} complete</div>`+
  phases.map(p=>{
    const cfg=PHASE_STATUS_CFG[p.status]||{label:p.status,cls:''};
    const done=p.items.filter(i=>i.done).length;
    const pct=Math.round(done/p.items.length*100);
    const openItems=p.items.filter(i=>!i.done);
    return`<div class="phase-card ${cfg.cls}">
      <div class="phase-header">
        <div class="phase-id-col">
          <span class="phase-id">${p.id}</span>
          <span class="phase-status-badge">${cfg.label}</span>
        </div>
        <div class="phase-title-col">
          <div class="phase-title">${p.title}</div>
          <div class="phase-meta">${p.project} · ${p.date}</div>
        </div>
        <div class="phase-progress-col">
          <div class="phase-pct">${pct}%</div>
          <div class="phase-bar-bg"><div class="phase-bar-fill" style="width:${pct}%"></div></div>
          <div style="font-size:10px;color:var(--faint);margin-top:2px">${done}/${p.items.length}</div>
        </div>
      </div>
      <div class="phase-goal">${p.goal}</div>
      ${openItems.length?`<div class="phase-open-items">${openItems.map(i=>`<div class="phase-open-item">◻ ${i.text}</div>`).join('')}</div>`:''}
      ${p.status!=='complete'?`<div class="task-actions" style="margin-top:10px">
        <button class="task-action-btn" onclick="phaseAction('waymaker','${p.id}')">🤖 Ask Waymaker</button>
        <button class="task-action-btn" onclick="phaseAction('copy','${p.id}')">📋 Copy to Opus</button>
      </div>`:''}
    </div>`;
  }).join('')||'<p style="color:var(--faint);padding:16px">No phases match this filter.</p>';
}

function setPhaseFilter(f){state.phaseFilter=f;renderRoadmap();}

function phaseAction(type,id){
  const p=PHASES.find(x=>x.id===id);if(!p)return;
  const openItems=p.items.filter(i=>!i.done).map(i=>i.text).join('; ');
  if(type==='waymaker'){
    _wmSend(`Waymaker — I'm working on phase ${p.id}: "${p.title}" (${p.project}). Goal: ${p.goal}. Open items: ${openItems||'none — but review for quality'}. What should I focus on next and what might I be missing? Mike Fuller, Kamunity, Perth WA.`);
    return;
  }
  const text=`Phase ${p.id}: ${p.title}\nProject: ${p.project} | Status: ${p.status} | Date: ${p.date}\nGoal: ${p.goal}\nOpen items:\n${openItems.split('; ').map(i=>'- '+i).join('\n')||'All complete'}\nProgress: ${p.items.filter(i=>i.done).length}/${p.items.length}`;
  navigator.clipboard?.writeText(text).then(()=>showCmdResult('📋 Copied phase context'));
}

// ── COMMAND DAY HELPERS ───────────────────────

function renderCmdTop5(){
  const el=document.getElementById('cmdTop5');if(!el)return;
  const top=TASKS.filter(t=>!t.done).sort((a,b)=>{
    const o={critical:0,high:1,medium:2,low:3};
    return(o[a.pri]||3)-(o[b.pri]||3);
  }).slice(0,5);
  if(!top.length){el.innerHTML='<p style="color:var(--faint);font-size:12px;padding:8px 0">All clear — no open tasks.</p>';return;}
  el.innerHTML=top.map(t=>`
    <div class="cmd-task-row pri-${t.pri}">
      <label class="task-check" style="margin-top:1px">
        <input type="checkbox" onchange="toggleTask('${t.id}',this.checked);renderCmdTop5()">
      </label>
      <div class="cmd-task-text">
        <span class="cmd-task-name">${t.text}</span>
        <span class="task-pri-badge pri-badge-${t.pri}">${t.pri}</span>
      </div>
    </div>`).join('');
}

function renderCmdGapsSnap(){
  const el=document.getElementById('cmdGapsSnap');if(!el)return;
  const open=GAPS.filter(g=>!g.resolved).slice(0,4);
  if(!open.length){el.innerHTML='<p style="color:var(--moss);font-size:12px;padding:8px 0">✓ No open gaps.</p>';return;}
  el.innerHTML=open.map(g=>`
    <div class="cmd-gap-row ${g.type==='q'?'gap-q':''}">
      <span>${g.type==='q'?'❓':'⚠️'}</span>
      <span class="cmd-gap-title">${g.title}</span>
    </div>`).join('')+
    (GAPS.filter(g=>!g.resolved).length>4?`<div style="font-size:11px;color:var(--faint);padding:4px 0">+${GAPS.filter(g=>!g.resolved).length-4} more</div>`:'');
}

function captureAs(dest){
  const input=document.getElementById('captureInput');
  const text=input.value.trim();
  const confirm=document.getElementById('captureConfirm');
  if(!text){input.focus();return;}
  if(dest==='gap'){
    const id='G'+(GAPS.length+1+Date.now()%1000);
    GAPS.unshift({id,type:'gap',resolved:false,title:text,body:'Captured from Command Day. Needs investigation.'});
    renderGaps();renderCmdGapsSnap();
    _captureConfirm(confirm,'⚠️ Added to Gaps');
  } else if(dest==='task'){
    const id='t'+(TASKS.length+1+Date.now()%1000);
    TASKS.unshift({id,text,pri:'medium',done:false,tags:['capture'],detail:'Captured from Command Day.'});
    renderTasks();renderCmdTop5();
    _captureConfirm(confirm,'✅ Added to Tasks');
  } else if(dest==='journal'){
    const entries=getJournal();
    entries.unshift({id:Date.now(),text,timestamp:new Date().toISOString(),day:new Date().toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'}),domain:DOMAIN_SCHEDULE[new Date().getDay()].label,tag:'capture'});
    saveJournalStore(entries);renderJournalEntries();
    syncToBlobs({journal:entries.slice(0,20)});
    _captureConfirm(confirm,'📓 Saved to Journal');
  } else if(dest==='opus'){
    const day=DOMAIN_SCHEDULE[new Date().getDay()];
    const prompt=`Kamunity context — Mike Fuller, Perth WA, community-first, anti-enshittification.\nToday's domain: ${day.label} (${day.theme})\nCapture: ${text}\n\nHelp me think this through: What is the most interesting interpretation? What experiment would test it cheapest? What do I already know that's relevant?`;
    navigator.clipboard?.writeText(prompt).then(()=>_captureConfirm(confirm,'📋 Copied — paste into Opus/Claude'));
    return;
  }
  input.value='';
}

function _captureConfirm(el,msg){
  el.textContent=msg;el.style.display='block';
  setTimeout(()=>{el.style.display='none';},2500);
}

// ── PROTOTYPES VIEW ───────────────────────────
function renderPrototypes(){
  const el=document.getElementById('prototypesOut');if(!el)return;
  el.innerHTML=`<p style="font-size:12px;color:var(--dim);margin-bottom:16px">${PROTOTYPES.length} engine prototypes built. Each has a potential integration path. Click to open locally or copy a Waymaker prompt.</p>`+
  PROTOTYPES.map(p=>`
    <div class="proto-card">
      <div class="proto-header">
        <span class="proto-icon">${p.icon}</span>
        <div class="proto-name">${p.url?`<a href="${p.url}" target="_blank" style="color:var(--sky)">${p.name}</a>`:p.name}</div>
      </div>
      <div class="proto-desc">${p.desc}</div>
      <div class="proto-potential">🎯 ${p.potential}</div>
      <div class="task-actions" style="margin-top:8px">
        <button class="task-action-btn" onclick="protoWaymaker('${p.name.replace(/'/g,'')}')">🤖 Ask Waymaker</button>
        <button class="task-action-btn" onclick="protoCopy('${p.name.replace(/'/g,'')}')">📋 Copy to Opus</button>
      </div>
    </div>`).join('');
}

function protoWaymaker(name){
  const p=PROTOTYPES.find(x=>x.name===name);if(!p)return;
  _wmSend(`Prototype review: "${p.name}" — ${p.desc}. Potential: ${p.potential}. Should Mike prioritise this? What would make it most valuable for Kamunity allies? What's the fastest path from prototype to deployed?`);
}
function protoCopy(name){
  const p=PROTOTYPES.find(x=>x.name===name);if(!p)return;
  const text=`Kamunity prototype: ${p.name}\n${p.desc}\nPotential: ${p.potential}\n\nHelp me think through: Is this worth building out? What is the MVP? Who would use it first? Does it overlap with anything already existing?`;
  navigator.clipboard?.writeText(text).then(()=>showCmdResult('📋 Copied — paste into Opus/Claude'));
}

// ── STATE EXPORT / IMPORT / CLEAR ─────────────
function exportKTState(){
  const state={
    tasks:TASKS.map(t=>({id:t.id,done:t.done})),
    safety:SAFETY_ITEMS.map(s=>({id:s.id,st:s.st})),
    gaps:GAPS.map(g=>({id:g.id,resolved:g.resolved})),
    journal:getJournal(),
    briefCache:localStorage.getItem(BRIEF_KEY),
    exported:new Date().toISOString()
  };
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`kt-state-${new Date().toISOString().slice(0,10)}.json`;
  a.click();URL.revokeObjectURL(url);
}

function importKTState(){
  const input=document.createElement('input');
  input.type='file';input.accept='.json,application/json';
  input.onchange=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const data=JSON.parse(ev.target.result);
        if(data.tasks)data.tasks.forEach(sv=>{const t=TASKS.find(x=>x.id===sv.id);if(t)t.done=sv.done;});
        if(data.safety)data.safety.forEach(sv=>{const s=SAFETY_ITEMS.find(x=>x.id===sv.id);if(s)s.st=sv.st;});
        if(data.gaps)data.gaps.forEach(sv=>{const g=GAPS.find(x=>x.id===sv.id);if(g)g.resolved=sv.resolved;});
        if(data.journal)saveJournalStore(data.journal);
        if(data.briefCache)localStorage.setItem(BRIEF_KEY,data.briefCache);
        renderTasks();renderSafety();renderGaps();renderCmdTop5();renderJournalEntries();loadCachedBrief();
        showCmdResult('✅ State imported successfully');
      }catch(e){alert('Import failed — invalid file: '+e.message);}
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearKTState(){
  if(!confirm('Clear all saved state? Task progress, safety updates, resolved gaps, and journal will reset.'))return;
  localStorage.removeItem(TASK_STATE_KEY);
  localStorage.removeItem(SAFETY_STATE_KEY);
  localStorage.removeItem(GAP_STATE_KEY);
  localStorage.removeItem(JOURNAL_KEY);
  localStorage.removeItem(BRIEF_KEY);
  TASKS.forEach(t=>t.done=false);
  SAFETY_ITEMS.forEach(s=>s.st=s.id==='S1'||s.id==='S2'||s.id==='S5'?'done':'open');
  GAPS.forEach(g=>g.resolved=false);
  renderTasks();renderSafety();renderGaps();renderCmdTop5();renderJournalEntries();
  document.getElementById('briefBody').innerHTML='<p class="brief-placeholder">State cleared. Hit ✨ Generate brief to start fresh.</p>';
  showCmdResult('🗑 State cleared');
}

// ── GUIDE TOGGLE ──────────────────────────────
let _guidesOn=false;
function toggleGuides(){
  _guidesOn=!_guidesOn;
  const banner=document.getElementById('annoBanner');
  if(banner)banner.style.display=_guidesOn?'flex':'none';
  document.querySelectorAll('.anno').forEach(el=>el.classList.toggle('hidden',!_guidesOn));
}
function hideGuides(){
  _guidesOn=false;
  const banner=document.getElementById('annoBanner');
  if(banner)banner.style.display='none';
  document.querySelectorAll('.anno').forEach(el=>el.classList.add('hidden'));
}

// ── ANNOTATIONS TOGGLE ────────────────────────
function toggleAnnos(show){document.querySelectorAll('.anno').forEach(el=>el.classList.toggle('hidden',!show));}

// ── ALLIES VIEW ───────────────────────────────
function renderAllies(){
  const el=document.getElementById('alliesOut');if(!el)return;
  const fb=document.getElementById('alliesFilterBar');
  if(fb&&!fb.hasChildNodes()){
    fb.innerHTML=`<button class="filter-btn active" onclick="setAlliesFilter('all',this)">All</button>
    <button class="filter-btn" onclick="setAlliesFilter('1',this)">⭐ Tier 1</button>
    <button class="filter-btn" onclick="setAlliesFilter('2',this)">Tier 2</button>
    <button class="filter-btn" onclick="setAlliesFilter('meeting',this)">🗓 Meetings</button>
    <button class="filter-btn" onclick="setAlliesFilter('contact',this)">📬 To Contact</button>`;
  }
  const filter=window._alliesFilter||'all';
  let list=ALLIES;
  if(filter==='1')list=ALLIES.filter(a=>a.tier===1);
  else if(filter==='2')list=ALLIES.filter(a=>a.tier===2);
  else if(filter==='meeting')list=ALLIES.filter(a=>/meeting|interview/i.test(a.status));
  else if(filter==='contact')list=ALLIES.filter(a=>/to contact/i.test(a.status));

  const t1=list.filter(a=>a.tier===1);
  const t2=list.filter(a=>a.tier===2);

  function allyCard(a){
    const isMeeting=/meeting|interview/i.test(a.status);
    const isContact=/to contact/i.test(a.status);
    return `<div class="ally-card ${isMeeting?'ally-meeting':''}">
      <div class="ally-header">
        <div class="ally-name">${a.name}</div>
        <span class="ally-tier-badge tier-${a.tier}">T${a.tier}</span>
      </div>
      <div class="ally-role">${a.role}</div>
      <div class="ally-status ${isMeeting?'status-meeting':isContact?'status-contact':''}">${a.status}</div>
      <div class="ally-action">${a.action}</div>
      <div class="ally-actions-row">
        <button class="task-action-btn" onclick="allyDraft('${a.id}')">✉️ Draft email</button>
        <button class="task-action-btn" onclick="allyBrief('${a.id}')">🔮 Waymaker brief</button>
        <button class="task-action-btn" onclick="copyAllyContext('${a.id}')">📋 Copy context</button>
      </div>
    </div>`;
  }

  let html='';
  if(t1.length){html+=`<h3 class="allies-tier-head">⭐ Tier 1 — Active Constellation</h3><div class="allies-grid">${t1.map(allyCard).join('')}</div>`;}
  if(t2.length){html+=`<h3 class="allies-tier-head" style="margin-top:24px">Tier 2 — Mapped</h3><div class="allies-grid">${t2.map(allyCard).join('')}</div>`;}
  if(!html)html='<p style="color:var(--faint);padding:20px 0">No allies match this filter.</p>';
  el.innerHTML=html;
}

function setAlliesFilter(f,btn){
  window._alliesFilter=f;
  document.querySelectorAll('#alliesFilterBar .filter-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  renderAllies();
}

function allyDraft(id){
  const a=ALLIES.find(x=>x.id===id);if(!a)return;
  const prompt=`Draft a warm, direct outreach email to ${a.name} (${a.role}) from Mike Fuller at Kamunity. Context: ${a.action}. Current status: ${a.status}. Mike's context: solo founder building community tech in Perth WA, constitutional AI approach, anti-enshittification, campfire metaphor. Keep under 150 words. Australian English. No corporate jargon.`;
  _wmSend(prompt);
}

function allyBrief(id){
  const a=ALLIES.find(x=>x.id===id);if(!a)return;
  const prompt=`Give Mike a pre-meeting brief for ${a.name} (${a.role}). Status: ${a.status}. Planned action: ${a.action}. Cover: what to say, what to ask, what to leave behind, what to watch out for. 3-4 short paragraphs. Australian English.`;
  _wmSend(prompt);
}

function copyAllyContext(id){
  const a=ALLIES.find(x=>x.id===id);if(!a)return;
  const text=`Ally: ${a.name}\nRole: ${a.role}\nTier: ${a.tier}\nStatus: ${a.status}\nAction: ${a.action}\n\nContext for Kamunity:\nMike Fuller, Perth WA. Community-first, constitutional AI. Building tools for NFPs and community orgs. Anti-enshittification.\n\nHelp me think through how to approach this ally and what the strongest angle is.`;
  navigator.clipboard?.writeText(text).then(()=>{
    showCmdResult('📋 Copied ally context — paste into Opus/Claude');
  });
}

// ── NLnet COUNTDOWN WIDGET ───────────────────
function renderNLnetWidget(){
  const el=document.getElementById('cmdNLnet');if(!el)return;
  const deadline=new Date('2026-04-01T10:00:00+02:00');
  const now=new Date();
  const days=Math.ceil((deadline-now)/(1000*60*60*24));
  if(days<0){el.innerHTML='';return;}
  const color=days<=14?'var(--danger)':days<=30?'var(--ember)':'var(--moss)';
  el.innerHTML=`<div class="cmd-card" style="border-color:${color}">
    <div class="cmd-section-head">
      <h3 class="cmd-card-title" style="color:${color}">⏳ NLnet: ${days} days</h3>
      <button class="cmd-see-all" onclick="switchView('money')">Grants →</button>
    </div>
    <p style="font-size:11px;color:var(--dim);margin:0">NLnet NGI Zero Commons — April 1, 2026 — €35K ask. ${days<=21?'<strong>Getting urgent.</strong>':''}</p>
    <button class="task-action-btn" style="margin-top:8px" onclick="saveJournalEntry.call({value:'/grant NLnet — what must I do this week to be ready?'});document.getElementById('journalInput').value='/grant NLnet — what must I do this week to be ready?';saveJournalEntry()">Ask Waymaker →</button>
  </div>`;
}

// ── ALLY RADAR (Command Day) ──────────────────
function renderCmdAllyRadar(){
  const el=document.getElementById('cmdAllyRadar');if(!el)return;
  const meetings=ALLIES.filter(a=>/meeting|interview/i.test(a.status)).slice(0,3);
  const toContact=ALLIES.filter(a=>/to contact/i.test(a.status)&&a.tier===1).slice(0,2);
  if(!meetings.length&&!toContact.length){
    el.innerHTML='<p style="color:var(--faint);font-size:12px;padding:4px 0">No urgent ally actions.</p>';return;
  }
  let html='';
  meetings.forEach(a=>{html+=`<div class="cmd-gap-row" style="border-left:3px solid var(--ember);padding-left:8px"><span>🗓</span><div><div style="font-size:12px;color:var(--text);font-weight:500">${a.name}</div><div style="font-size:11px;color:var(--dim)">${a.status}</div></div></div>`;});
  toContact.forEach(a=>{html+=`<div class="cmd-gap-row" style="border-left:3px solid var(--sky);padding-left:8px"><span>📬</span><div><div style="font-size:12px;color:var(--text);font-weight:500">${a.name}</div><div style="font-size:11px;color:var(--dim)">${a.action.slice(0,50)}</div></div></div>`;});
  el.innerHTML=html;
}

// ── WAYMAKER FAB ──────────────────────────────
// Ported from waymaker.js — full floating chat orb with history, voice, shortcuts

const WM_STORAGE='kt-waymaker';
const WM_SHORTCUTS={
  '/status': 'Give me a full ecosystem health summary right now — sites live, safety gates, tasks done vs pending, gaps, money status, grants.',
  '/today':  'What needs my attention today? Summarise and prioritise. Give me ONE thing to do first.',
  '/tasks':  'What are the top priority tasks right now? What should I tackle next and why?',
  '/allies': 'Who should I contact next from the Constellation? What actions are pending? Who is closest to a win?',
  '/money':  'Revenue update — grants status, service offerings, what is closest to generating income?',
  '/safety': 'Safety gate status — what is still blocking the ALIKE showcase? What is critical vs done?',
  '/gaps':   'Open questions review — which unresolved gaps are most impactful? Which can I close today?',
  '/draft':  'Draft a warm outreach email to this ally (use everything you know about them and Kamunity): ',
  '/spec':   'Generate a detailed next-move task spec for this task (context, steps, constitutional check): ',
  '/brief':  'Give me a full meeting brief for the next upcoming meeting — who, goal, what to say, what to ask, leave-behind.',
  '/sweep':  'SENSORY SWEEP — scan all open tasks, gaps, safety items and surface the 3 cheapest highest-value experiments plus one thing I might be missing.',
};

let _wmHistory=[];let _wmOpen=false;let _wmLoading=false;

function _wmLoadHistory(){try{_wmHistory=JSON.parse(localStorage.getItem(WM_STORAGE)||'[]');}catch{_wmHistory=[];}}
function _wmSaveHistory(){if(_wmHistory.length>20)_wmHistory=_wmHistory.slice(-20);localStorage.setItem(WM_STORAGE,JSON.stringify(_wmHistory));}

function _wmBuildSystem(){
  const critTasks=TASKS.filter(t=>!t.done&&t.pri==='critical').length;
  const highTasks=TASKS.filter(t=>!t.done&&t.pri==='high').length;
  const safetyOpen=SAFETY_ITEMS.filter(s=>s.st==='open'||s.st==='needs-design').length;
  const gapsOpen=GAPS.filter(g=>!g.resolved).length;
  const meetings=ALLIES.filter(a=>/meeting|interview/i.test(a.status)).length;
  const topTasks=TASKS.filter(t=>!t.done&&(t.pri==='critical'||t.pri==='high')).slice(0,8).map(t=>`  - [${t.pri}] ${t.text}`).join('\n');
  const allyList=ALLIES.slice(0,8).map(a=>`  - ${a.name} (T${a.tier}) — ${a.action}`).join('\n');
  const deadline=Math.ceil((new Date('2026-04-01T10:00:00+02:00')-new Date())/(1000*60*60*24));
  return `You are Waymaker (Kai), the internal operations AI for Kamunity. You sit inside the Kitchen Table — mission control for the Kamunity ecosystem.

PERSONALITY: Warm but direct. Trusted colleague at the kitchen table over coffee. Reference specific sites, allies, phases by name. Be practical: concrete actions, not philosophy. Keep responses concise — 2-4 short paragraphs max unless asked for detail. Use campfire metaphor naturally but don't overdo it.

CURRENT STATE:
- Tasks: ${TASKS.length} total, ${TASKS.filter(t=>t.done).length} done, ${critTasks} critical, ${highTasks} high priority open
- Safety: ${safetyOpen} items open/needs-design
- Meetings pending: ${meetings}
- Gaps/questions open: ${gapsOpen}
- NLnet deadline: ${deadline} days (April 1, 2026 — €35K ask)

TOP PRIORITY TASKS:
${topTasks||'  (none — all clear!)'}

KEY ALLIES:
${allyList}

WHAT YOU KNOW:
- Kamunity: community technology ecosystem, Fremantle WA. Founded by Mike Fuller.
- AI Triad: Wayfinder (public Kai on kamunity.org), Waymaker (you — internal ops), Cascade (build engine in Windsurf)
- 9+ live Netlify sites. Pre-revenue. NLnet application in progress.
- Campfire Architecture: BRAIN/ PLAN/ ENGINE/ KNOWLEDGE/ PROJECTS/ WORKSHOP/ ARCHIVE/
- Mike: Quality Systems (Deming/Juran), anti-enshittification, community-first, Scottish, Perth WA. Direct and warm.

RULES:
- Never reveal API keys
- If asked for a build task, say: "Tell Cascade: [specific instruction]"
- You CANNOT write files, execute code, or save tasks. Be honest about this.
- Your superpower: advice, synthesis, drafting.`;
}

async function _wmSend(text){
  if(!_wmOpen)_wmToggle();
  const input=document.getElementById('wm-input');
  _wmHistory.push({role:'user',content:text});
  _wmSaveHistory();
  _wmAppend('user',text);
  _wmSetLoading(true);
  try{
    const res=await fetch('/.netlify/functions/waymaker',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:_wmBuildSystem(),messages:_wmHistory.map(m=>({role:m.role,content:m.content}))})});
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    const reply=data.response||'(empty response)';
    _wmHistory.push({role:'assistant',content:reply});
    _wmSaveHistory();
    _wmAppend('assistant',reply);
  }catch(e){
    _wmAppend('assistant',`⚠️ ${e.message.includes('API')?'No API key — add ANTHROPIC_API_KEY to Netlify env vars.':e.message}`);
    _wmHistory.pop();_wmSaveHistory();
  }finally{_wmSetLoading(false);}
}

function _wmFormatContent(content){
  return content
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="wm-link">$1 ↗</a>')
    .replace(/\n/g,'<br>');
}
function _wmAppend(role,content){
  const c=document.getElementById('wm-messages');if(!c)return;
  const d=document.createElement('div');
  d.className=`wm-msg wm-${role}`;
  d.innerHTML=`<div class="wm-msg-content">${_wmFormatContent(content)}</div>`;
  c.appendChild(d);
  c.scrollTop=c.scrollHeight;
}

function _wmSetLoading(on){
  _wmLoading=on;
  const s=document.getElementById('wm-send');const i=document.getElementById('wm-input');
  if(s)s.disabled=on;if(i)i.disabled=on;
  const st=document.getElementById('wm-status');
  if(on){
    if(st)st.textContent='Waymaker is thinking…';
    const c=document.getElementById('wm-messages');
    if(c){const t=document.createElement('div');t.className='wm-msg wm-assistant wm-typing';t.innerHTML='<div class="wm-msg-content"><span class="wm-dots"><span>.</span><span>.</span><span>.</span></span></div>';c.appendChild(t);c.scrollTop=c.scrollHeight;}
  }else{
    if(st)st.textContent='';
    document.querySelector('.wm-typing')?.remove();
  }
}

function _wmToggle(){
  _wmOpen=!_wmOpen;
  const panel=document.getElementById('wm-panel');
  const fab=document.querySelector('.wm-fab');
  if(_wmOpen){panel?.classList.add('open');fab?.classList.add('active');setTimeout(()=>{document.getElementById('wm-input')?.focus();const c=document.getElementById('wm-messages');if(c)c.scrollTop=c.scrollHeight;},100);}
  else{panel?.classList.remove('open');fab?.classList.remove('active');}
}

function _wmInitUI(){
  _wmLoadHistory();
  // FAB
  const fab=document.createElement('button');
  fab.className='wm-fab';fab.innerHTML='🔮';fab.title='Talk to Waymaker (internal ops AI)';
  fab.setAttribute('aria-label','Open Waymaker');fab.onclick=_wmToggle;
  // Panel
  const panel=document.createElement('div');
  panel.className='wm-panel';panel.id='wm-panel';
  panel.innerHTML=`
    <div class="wm-header">
      <div class="wm-header-left"><span class="wm-icon">🔮</span><div><div class="wm-title">Waymaker</div><div class="wm-sub">Internal Ops AI</div></div></div>
      <div class="wm-header-right">
        <button class="wm-abilities-btn" title="Shortcuts + abilities" onclick="_wmAbilities()">⚡</button>
        <button class="wm-clear-btn" title="Clear history" onclick="if(confirm('Clear Waymaker chat history?')){_wmHistory=[];localStorage.removeItem(WM_STORAGE);document.getElementById('wm-messages').innerHTML='<div class=\\'wm-msg wm-assistant\\'><div class=\\'wm-msg-content\\'>History cleared. Fresh start 🔥</div></div>'}">🗑</button>
        <button class="wm-close-btn" onclick="_wmToggle()">&times;</button>
      </div>
    </div>
    <div class="wm-messages" id="wm-messages">
      <div class="wm-msg wm-assistant"><div class="wm-msg-content">Hey Mike. I'm watching the dashboard — ask me anything. Try <code>/status</code> for a full health check, or <code>/today</code> for your top priority. Type <code>⚡</code> or tap the button above for all shortcuts. 🔥</div></div>
      ${_wmHistory.map(m=>`<div class="wm-msg wm-${m.role}"><div class="wm-msg-content">${m.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div></div>`).join('')}
    </div>
    <div class="wm-input-row">
      <textarea class="wm-input" id="wm-input" placeholder="Ask Waymaker, or type /status /today /tasks /allies /draft…" rows="1"></textarea>
      <button class="wm-send" id="wm-send" title="Send (Enter)">→</button>
    </div>
    <div class="wm-status" id="wm-status"></div>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  // Send on Enter
  panel.querySelector('#wm-input').addEventListener('keydown',e=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();_wmHandleSend();}
  });
  panel.querySelector('#wm-input').addEventListener('input',e=>{
    e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,120)+'px';
  });
  panel.querySelector('#wm-send').onclick=_wmHandleSend;
}

function _wmHandleSend(){
  if(_wmLoading)return;
  const input=document.getElementById('wm-input');
  let text=input.value.trim();if(!text)return;
  // Shortcut expansion
  const matchedKey=Object.keys(WM_SHORTCUTS).find(k=>text.toLowerCase().startsWith(k));
  if(matchedKey){
    const extra=text.slice(matchedKey.length).trim();
    const prefix=WM_SHORTCUTS[matchedKey];
    text=prefix.endsWith(': ')?(extra?prefix+extra:prefix+'(no additional context)'):prefix+(extra?' '+extra:'');
  }
  input.value='';input.style.height='auto';
  _wmSend(text);
}

function _wmAbilities(){
  const existing=document.getElementById('wm-abilities-modal');
  if(existing){existing.remove();return;}
  const modal=document.createElement('div');
  modal.id='wm-abilities-modal';modal.className='wm-abilities-modal';
  const shortcuts=Object.entries(WM_SHORTCUTS).map(([cmd])=>`<div class="wm-ability-shortcut" onclick="document.getElementById('wm-input').value='${cmd}';document.getElementById('wm-abilities-modal')?.remove();document.getElementById('wm-input').focus()"><code>${cmd}</code></div>`).join('');
  modal.innerHTML=`<div class="wm-abilities-header"><span>⚡ Shortcuts</span><button onclick="document.getElementById('wm-abilities-modal')?.remove()">×</button></div><div class="wm-abilities-body">${shortcuts}</div>`;
  document.getElementById('wm-panel')?.appendChild(modal);
}

// Boot
loadEntityEdits();
