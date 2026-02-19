import ToolkitLayout from './ToolkitLayout'
import CopyButton from './CopyButton'

const CATEGORIES = [
  {
    name: 'Meetings & Admin',
    icon: '📝',
    prompts: [
      {
        title: 'Summarise Meeting Notes',
        prompt: `I have notes from a team meeting. Please summarise them into:
- Key decisions made
- Action items (who needs to do what, by when)
- Items that need follow-up at the next meeting

Keep the summary to one page and use plain language. Here are my notes:

[Paste your meeting notes here]`,
        expect: 'A clean, structured summary you can share with the team or file.',
        safety: null,
      },
      {
        title: 'Draft a Meeting Agenda',
        prompt: `Help me create an agenda for a [weekly team meeting / board meeting / planning session]. The meeting is [duration, e.g. 1 hour] and we need to cover:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Please include time allocations for each item and suggest which items need a decision vs. which are updates only.`,
        expect: 'A structured agenda with time blocks and clear purpose for each item.',
        safety: null,
      },
      {
        title: 'Turn Notes Into Action Items',
        prompt: `I have some rough notes from a discussion. Please extract all the action items and format them as a table with these columns: Task, Person Responsible, Due Date, Priority (High/Medium/Low).

If a due date or person isn't clear from the notes, mark it as "TBC" so we can fill it in.

Here are my notes:

[Paste your notes here]`,
        expect: 'A clear action item table you can paste into a shared document or email.',
        safety: null,
      },
      {
        title: 'Prepare a Briefing Document',
        prompt: `I need to brief [my manager / the board / a new team member] on [topic]. Please help me write a one-page briefing that covers:
- What this is about (2-3 sentences)
- Why it matters for our organisation
- Current status
- What we need to decide or do next
- Any risks or concerns

Keep the language simple and professional. Our organisation is a [type of org, e.g. neighbourhood centre, disability service, community health].`,
        expect: 'A concise briefing document suitable for senior stakeholders.',
        safety: 'Do not include client names or identifying details about the people you serve.',
      },
    ],
  },
  {
    name: 'Communications',
    icon: '💬',
    prompts: [
      {
        title: 'Draft a Newsletter Update',
        prompt: `Help me write a short newsletter update (about 200 words) for [our members / volunteers / community]. The update should cover:
- [What happened recently]
- [What's coming up]
- [Any calls to action]

Our tone is warm, friendly, and community-focused. We are a [type of org] in [location].`,
        expect: 'A friendly, ready-to-send newsletter section.',
        safety: null,
      },
      {
        title: 'Write a Volunteer Email',
        prompt: `Help me write an email to our volunteers about [topic, e.g. a new roster, upcoming training, thank-you message]. 

Key points to include:
- [Point 1]
- [Point 2]

Our volunteers range from [age range / background]. Keep it warm, appreciative, and not too long. Include a clear call to action if needed.`,
        expect: 'A warm, concise email that respects volunteers\' time.',
        safety: null,
      },
      {
        title: 'Create Social Media Posts',
        prompt: `Help me write 3 social media posts about [topic/event] for [Facebook / Instagram / LinkedIn]. 

Our organisation is a [type of org] and our audience is [describe audience]. The tone should be [warm / professional / enthusiastic / informative].

For each post, please suggest:
- The post text (keep it concise)
- A suggested image description
- 3-5 relevant hashtags`,
        expect: 'Three platform-ready posts you can customise and schedule.',
        safety: 'Never include photos or names of clients or service users without explicit consent.',
      },
      {
        title: 'Write an Event Announcement',
        prompt: `Help me write an announcement for [event name]. Here are the details:
- What: [description]
- When: [date and time]
- Where: [location]
- Who it's for: [audience]
- Cost: [free / pricing]
- How to register: [method]

Please write it in a warm, inviting tone. Include a short version (for social media, under 100 words) and a longer version (for email/website, about 200 words).`,
        expect: 'Two versions of the announcement ready for different channels.',
        safety: null,
      },
    ],
  },
  {
    name: 'Reporting & Grants',
    icon: '📊',
    prompts: [
      {
        title: 'Draft a Grant Acquittal Section',
        prompt: `I need to write a section for a grant acquittal report. The funder is [funder name] and the grant was for [purpose].

Here are the key outcomes we achieved:
- [Outcome 1 with numbers if available]
- [Outcome 2]
- [Outcome 3]

Challenges we faced: [brief description]

Please write this in a professional but human tone, about 300 words. Focus on impact and outcomes, not just activities. Use plain language — avoid jargon.`,
        expect: 'A polished acquittal section that highlights your impact.',
        safety: 'Never include identifiable client stories without written consent. Use aggregated data only.',
      },
      {
        title: 'Summarise Impact Data',
        prompt: `I have some data about our program's impact this [quarter/year]. Please help me turn it into a clear summary that a non-technical person (like a board member or funder) can understand.

Here's the data:
- [Data point 1, e.g. "We served 142 families"]
- [Data point 2]
- [Data point 3]

Please present this as:
1. A 2-3 sentence overview paragraph
2. Key numbers as bullet points
3. One sentence about what this means for the community`,
        expect: 'A clear, compelling impact summary suitable for reports or presentations.',
        safety: 'Use aggregated numbers only. Never include data that could identify individuals.',
      },
      {
        title: 'Draft an Annual Report Section',
        prompt: `Help me write a section for our annual report about [program/service area]. This section should be about 400 words and cover:
- What we did this year
- Who we helped (use general descriptions, not names)
- Key achievements or milestones
- Challenges and how we responded
- Looking ahead

Our organisation is a [type of org] and this section is for [audience, e.g. members, funders, community].`,
        expect: 'A well-structured annual report section that tells your story.',
        safety: 'Do not include identifiable information about service users.',
      },
      {
        title: 'Describe Your Data Clearly',
        prompt: `I need to explain [a dataset / survey results / program statistics] to [audience, e.g. board, funder, team]. The data is:

[Paste or describe your data]

Please help me:
1. Summarise the key findings in plain language
2. Identify any trends or patterns
3. Suggest what actions we might take based on this data

Keep it simple — assume the reader is smart but not a data analyst.`,
        expect: 'A plain-language interpretation of your data with actionable insights.',
        safety: 'Ensure data is aggregated and cannot identify individuals.',
      },
    ],
  },
  {
    name: 'Policy & Planning',
    icon: '📋',
    prompts: [
      {
        title: 'Draft a Policy First Draft',
        prompt: `Help me create a first draft of a [policy name, e.g. "Social Media Policy", "AI Use Policy", "Volunteer Code of Conduct"] for our organisation.

We are a [type of org, e.g. neighbourhood centre] with [number] staff and [number] volunteers. 

The policy should cover:
- Purpose and scope
- Key principles
- What's expected of [staff/volunteers]
- What's not acceptable
- How to report concerns

Keep it simple and under 2 pages. Use plain language — this needs to be understood by everyone, not just managers.

IMPORTANT: This is a first draft only. It must be reviewed by [management/board] and may need legal review before adoption.`,
        expect: 'A plain-language policy draft as a starting point for review.',
        safety: 'AI-generated policies are starting points only. Always have policies reviewed by appropriate people before adoption.',
      },
      {
        title: 'Create a Risk Register Entry',
        prompt: `Help me create a risk register entry for [risk, e.g. "Staff using AI tools without guidelines", "Data breach through AI platform", "Over-reliance on AI for client communications"].

Please format it as:
- Risk description
- Likelihood (Low/Medium/High)
- Impact (Low/Medium/High)
- Current controls (what we're already doing)
- Additional actions needed
- Risk owner
- Review date

Our organisation is a [type of org] working with [type of community/clients].`,
        expect: 'A structured risk register entry ready to add to your risk management framework.',
        safety: null,
      },
      {
        title: 'Write a Strategic Plan Section',
        prompt: `Help me draft a section for our strategic plan about [topic, e.g. "Digital Capability", "Technology and Innovation", "AI Readiness"].

Context: We are a [type of org] with [number] staff. Currently, [describe current state of technology/AI use].

Please write a section that includes:
- Where we are now (1-2 sentences)
- Where we want to be in [timeframe]
- 3-4 specific, measurable objectives
- Key actions for each objective

Keep it realistic for a small community organisation with limited resources.`,
        expect: 'A practical strategic plan section with achievable objectives.',
        safety: null,
      },
      {
        title: 'Draft a Procedure Outline',
        prompt: `Help me create a step-by-step procedure for [task, e.g. "How to use AI tools safely", "Responding to a data breach", "Onboarding a new volunteer"].

The procedure should be:
- Written as numbered steps
- Simple enough for anyone to follow
- Include any warnings or important notes
- Note who is responsible for key steps

Our organisation is a [type of org]. The people following this procedure will be [staff/volunteers/managers].`,
        expect: 'A clear, step-by-step procedure document.',
        safety: null,
      },
    ],
  },
  {
    name: 'Learning & Development',
    icon: '🎓',
    prompts: [
      {
        title: 'Summarise Training Content',
        prompt: `I attended a training session / webinar / conference about [topic]. Here are my rough notes:

[Paste your notes]

Please help me create:
1. A one-paragraph summary of the key takeaways
2. 3-5 bullet points of the most important things for our team to know
3. Suggested actions we could take based on this training

Keep it concise — my team has about 5 minutes to read this.`,
        expect: 'A concise training summary you can share via email or at your next team meeting.',
        safety: null,
      },
      {
        title: 'Create an Onboarding Guide Section',
        prompt: `Help me write a section for our new [staff/volunteer] onboarding guide about [topic, e.g. "How we use technology", "Our approach to AI tools", "Data and privacy basics"].

The reader is new to our organisation and may not have a technical background. Please write in a welcoming, supportive tone.

Our organisation is a [type of org] and we currently [describe relevant practices, e.g. "use Microsoft 365 for email and documents", "don't have a formal AI policy yet"].

Keep it to about one page.`,
        expect: 'A friendly, clear onboarding section that helps new people understand your approach.',
        safety: null,
      },
      {
        title: 'Create an FAQ',
        prompt: `Help me create a FAQ (Frequently Asked Questions) about [topic, e.g. "AI tools at our organisation", "Our new digital policy", "Upcoming changes to how we work"].

Please write 8-10 questions and answers. The questions should be ones that [staff/volunteers/clients] would actually ask — not corporate-sounding ones.

Our organisation is a [type of org] and the audience is [describe audience].

Keep answers short (2-3 sentences each) and use plain language.`,
        expect: 'A natural-sounding FAQ that addresses real concerns.',
        safety: null,
      },
      {
        title: 'Rewrite in Plain Language',
        prompt: `Please rewrite the following text in plain language. The audience is [describe, e.g. "community members with varied English proficiency", "volunteers who aren't tech-savvy", "board members who want the key points quickly"].

Requirements:
- Use short sentences
- Avoid jargon and technical terms
- If a technical term is necessary, explain it in brackets
- Aim for a reading level that a Year 8 student could understand

Here is the text to rewrite:

[Paste your text here]`,
        expect: 'A clearer, more accessible version of your text.',
        safety: null,
      },
    ],
  },
]

function PromptCard({ prompt }) {
  return (
    <div className="card mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-charcoal">{prompt.title}</h3>
        <CopyButton text={prompt.prompt} />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-3 font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {prompt.prompt}
      </div>

      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-600">What to expect:</span>{' '}
        {prompt.expect}
      </p>

      {prompt.safety && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">⚠️ Safety note:</span>{' '}
            {prompt.safety}
          </p>
        </div>
      )}
    </div>
  )
}

export default function PromptKit() {
  return (
    <ToolkitLayout
      title="AI Prompt Kit"
      description="20 practical, copy-paste prompts designed for community organisations. Pick a prompt, customise the parts in [brackets], and paste it into ChatGPT, Copilot, or any AI tool."
    >
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-charcoal mb-2">
          ⚠️ Before you start
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            → <strong>Never</strong> put client names, case details, or personal
            information into any AI tool.
          </li>
          <li>
            → Always review AI output before using it — AI can produce incorrect
            or biased results.
          </li>
          <li>
            → These prompts are starting points — customise them for your
            organisation.
          </li>
          <li>
            → Check with your manager if you're unsure whether AI use is
            appropriate for a task.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-charcoal mb-3">
          Jump to a category
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm px-3 py-1.5 rounded-full bg-moss-50 text-moss-700 hover:bg-moss-100 transition-colors"
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
      </div>

      {CATEGORIES.map((category) => (
        <section
          key={category.name}
          id={category.name.toLowerCase().replace(/\s+/g, '-')}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-charcoal mb-1 flex items-center gap-2">
            <span>{category.icon}</span> {category.name}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {category.prompts.length} prompts
          </p>
          {category.prompts.map((prompt, i) => (
            <PromptCard key={i} prompt={prompt} />
          ))}
        </section>
      ))}

      <div className="bg-moss-50 border border-moss-200 rounded-xl p-5 mt-8">
        <h3 className="font-semibold text-moss-700 mb-2">
          💡 Tips for better results
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>→ Be specific about your organisation type and audience.</li>
          <li>→ Tell the AI what tone you want (warm, professional, formal).</li>
          <li>→ If the first result isn't right, ask it to revise — "Make it shorter", "Use simpler language", "Add more detail about..."</li>
          <li>→ Always review and edit the output — put it in your voice.</li>
          <li>→ Start with low-risk tasks (drafts, summaries, ideas) before using AI for anything important.</li>
        </ul>
      </div>
    </ToolkitLayout>
  )
}
