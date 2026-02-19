import ToolkitLayout from './ToolkitLayout'

export default function AIGuide() {
  return (
    <ToolkitLayout
      title="Plain English AI Guide"
      description="Everything you need to know about AI in 5 minutes. No jargon. No hype. Just the stuff that matters for community organisations."
    >
      {/* What is AI? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          What is AI?
        </h2>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            Artificial Intelligence (AI) is software that can do tasks that used
            to require human thinking — like writing text, answering questions,
            summarising documents, or spotting patterns in data.
          </p>
          <p>
            The AI tools making headlines right now (like ChatGPT, Copilot, and
            Gemini) are called <strong>generative AI</strong>. You type a
            question or instruction, and they generate a response — text, images,
            or even code. Think of it like a very fast, very well-read assistant
            that can draft things for you but doesn't actually understand what
            it's saying.
          </p>
          <p>
            AI isn't magic, and it isn't sentient. It's a tool — like a
            spreadsheet or a search engine. It's very good at some things and
            surprisingly bad at others.
          </p>
        </div>
      </section>

      {/* What can AI tools do right now? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          What can AI tools do right now?
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { task: 'Draft emails and letters', quality: 'Good starting point — always edit' },
            { task: 'Summarise long documents', quality: 'Very useful — saves real time' },
            { task: 'Create meeting agendas and minutes', quality: 'Reliable for structure' },
            { task: 'Brainstorm ideas', quality: 'Great for getting unstuck' },
            { task: 'Rewrite text in simpler language', quality: 'Genuinely helpful' },
            { task: 'Help with grant reporting language', quality: 'Good first draft' },
            { task: 'Create social media posts', quality: 'Good — needs your voice added' },
            { task: 'Explain technical concepts', quality: 'Usually clear and accurate' },
          ].map((item, i) => (
            <div key={i} className="card !p-4">
              <p className="font-medium text-charcoal text-sm">{item.task}</p>
              <p className="text-xs text-moss-600 mt-1">{item.quality}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What can't AI tools do? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          What can't AI tools do?
        </h2>
        <div className="card">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              <div>
                <strong>Guarantee accuracy.</strong> AI tools confidently make
                things up. They'll cite studies that don't exist, give you wrong
                dates, or invent statistics. Always fact-check.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              <div>
                <strong>Understand your context.</strong> AI doesn't know your
                organisation, your community, your policies, or your values. It
                gives generic answers unless you tell it specifically about your
                situation.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              <div>
                <strong>Keep secrets.</strong> Anything you type into most AI
                tools is sent to external servers. It may be used to train future
                models. Never share sensitive or personal information.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              <div>
                <strong>Replace human judgment.</strong> AI can help you draft,
                summarise, and brainstorm — but decisions about people's lives,
                service delivery, and community impact must be made by humans.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              <div>
                <strong>Be unbiased.</strong> AI tools reflect the biases in
                their training data. They can produce stereotyped, culturally
                insensitive, or inappropriate content — especially about
                marginalised communities.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* How does ChatGPT actually work? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          How does ChatGPT actually work?
        </h2>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            ChatGPT (and similar tools) works by predicting the most likely next
            word in a sequence. It was trained on enormous amounts of text from
            the internet — books, websites, articles — and learned patterns about
            how language works.
          </p>
          <p>
            When you ask it a question, it's not "thinking" or "knowing" — it's
            generating text that statistically follows from what you typed. This
            is why it can sound very confident while being completely wrong.
          </p>
          <p>
            Think of it like autocomplete on your phone, but much more
            sophisticated. Your phone can suggest the next word in your text
            message. ChatGPT can suggest the next several paragraphs. But
            neither one actually understands what it's writing.
          </p>
        </div>
      </section>

      {/* What does this mean for community organisations? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          What does this mean for community organisations?
        </h2>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            AI tools can save time on administrative and communication tasks —
            the kind of work that eats into the hours you'd rather spend with
            your community. But they come with real risks, especially for
            organisations handling sensitive data.
          </p>
          <p>
            <strong>The opportunity:</strong> Free up staff time by using AI for
            drafting, summarising, and brainstorming. A task that takes 45
            minutes might take 15 minutes with AI assistance (plus review time).
          </p>
          <p>
            <strong>The risk:</strong> Staff may already be using AI tools
            without anyone knowing. Without guidelines, client data could end up
            in AI systems. And AI-generated content that hasn't been reviewed
            might not reflect your organisation's values.
          </p>
          <p>
            <strong>The starting point:</strong> Have a conversation with your
            team about what's already happening, create basic safety guidelines,
            and try a few low-risk tasks to see what works for your org.
          </p>
        </div>
      </section>

      {/* Glossary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          Glossary: 10 terms you might hear
        </h2>
        <div className="space-y-3">
          {[
            { term: 'AI (Artificial Intelligence)', def: 'Software that can perform tasks that usually require human thinking, like writing or analysing data.' },
            { term: 'Generative AI', def: 'AI that creates new content (text, images, code) based on your instructions. ChatGPT is the most well-known example.' },
            { term: 'Large Language Model (LLM)', def: 'The technology behind tools like ChatGPT. A very large system trained on text that predicts what words come next.' },
            { term: 'Prompt', def: 'The instruction or question you type into an AI tool. Better prompts = better results.' },
            { term: 'Hallucination', def: 'When an AI tool makes something up and presents it as fact. Happens more often than you\'d expect.' },
            { term: 'Training data', def: 'The text, images, or information an AI was built on. Biases in training data show up in AI outputs.' },
            { term: 'Data sovereignty', def: 'The principle that data is subject to the laws and governance of the nation or community it belongs to. Especially important for Aboriginal and Torres Strait Islander data.' },
            { term: 'Algorithm', def: 'A set of rules a computer follows to complete a task. AI algorithms are very complex, but the concept is simple.' },
            { term: 'Machine learning', def: 'A type of AI where the system improves by learning from data rather than following explicit instructions.' },
            { term: 'Bias', def: 'Systematic unfairness in AI outputs, usually reflecting biases in the data it was trained on. Can affect hiring tools, content generation, and decision-support systems.' },
          ].map((item, i) => (
            <div key={i} className="card !p-4">
              <dt className="font-semibold text-charcoal text-sm">
                {item.term}
              </dt>
              <dd className="text-gray-600 text-sm mt-1">{item.def}</dd>
            </div>
          ))}
        </div>
      </section>
    </ToolkitLayout>
  )
}
