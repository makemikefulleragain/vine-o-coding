import ExamplePanel from './ExamplePanel.jsx'
import BrianNote from './BrianNote.jsx'
import { grantsHubExample, recipeRemixExample } from '../../lib/examples.js'

export default function StepIdea({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Give your project a name
          </label>
          <input
            type="text"
            value={data.projectName}
            onChange={e => update('projectName', e.target.value)}
            placeholder="e.g. Recipe Remix, Volunteer Tracker, Study Buddy"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            In a sentence or two, what does this tool do?
          </label>
          <textarea
            value={data.whatItDoes}
            onChange={e => update('whatItDoes', e.target.value)}
            placeholder="e.g. A place for our cooking club to share recipes, rate them, and plan what to cook next."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Who will use this? A club, a team, a community?
          </label>
          <textarea
            value={data.whoItsFor}
            onChange={e => update('whoItsFor', e.target.value)}
            placeholder="e.g. My school cooking club — 12 members, years 9-10."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            What problem does it fix? What's hard right now without it?
          </label>
          <textarea
            value={data.problemItSolves}
            onChange={e => update('problemItSolves', e.target.value)}
            placeholder="e.g. Recipes are scattered across group chats and random websites. Nobody can find anything when it's time to cook."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <BrianNote>
          <p>
            This step creates your <strong>MISSION.md</strong> — the strategic outcome.
            Every decision the AI makes will reference this document. The clearer you are
            here, the better the AI understands what you need.
          </p>
          <p className="mt-2">
            In Lean methodology, this is your "problem statement." The grants-hub MISSION.md
            started with a single sentence: "Build a free tool that helps small Australian
            nonprofits manage their grant acquittals." Everything else flowed from that.
          </p>
        </BrianNote>
      </div>

      {/* Examples */}
      <div className="lg:col-span-1">
        <ExamplePanel
          grantsHub={{
            'Project name': grantsHubExample.step1.projectName,
            'What it does': grantsHubExample.step1.whatItDoes,
            'Who it\'s for': grantsHubExample.step1.whoItsFor,
            'Problem it solves': grantsHubExample.step1.problemItSolves,
          }}
          recipeRemix={{
            'Project name': recipeRemixExample.step1.projectName,
            'What it does': recipeRemixExample.step1.whatItDoes,
            'Who it\'s for': recipeRemixExample.step1.whoItsFor,
            'Problem it solves': recipeRemixExample.step1.problemItSolves,
          }}
        />
      </div>
    </div>
  )
}
