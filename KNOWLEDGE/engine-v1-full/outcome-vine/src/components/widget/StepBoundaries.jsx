import ExamplePanel from './ExamplePanel.jsx'
import BrianNote from './BrianNote.jsx'
import { grantsHubExample, recipeRemixExample } from '../../lib/examples.js'

export default function StepBoundaries({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            List things your tool should NOT try to do
          </label>
          <textarea
            value={data.whatItsNot}
            onChange={e => update('whatItsNot', e.target.value)}
            placeholder="e.g. Not a social media app. Not a meal delivery service. Not a calorie counter."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Could this tool cause harm if it gets something wrong?
            <span className="font-normal text-slate-400 ml-1">(optional but important)</span>
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Think about: financial data, health info, personal details, safety-critical decisions.
          </p>
          <textarea
            value={data.harmConsiderations}
            onChange={e => update('harmConsiderations', e.target.value)}
            placeholder="e.g. Food allergies — should show allergen warnings. School-age users — no personal info beyond first names."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <BrianNote>
          <p>
            These boundaries become the "What This Is NOT" and "Harm Check" sections of
            your <strong>CONSTITUTION.md</strong>.
          </p>
          <p className="mt-2">
            Why define what it's not? Because AI coding assistants are eager to please —
            they'll keep adding features if you don't set limits. The grants-hub
            CONSTITUTION explicitly says "not accounting software" to prevent scope creep.
          </p>
          <p className="mt-2">
            In Agile, this is your "definition of done" boundary. In safety engineering,
            it's the Andon cord principle — define what stops the line before you start
            the line.
          </p>
        </BrianNote>
      </div>

      {/* Examples */}
      <div className="lg:col-span-1">
        <ExamplePanel
          grantsHub={{
            'Not this': grantsHubExample.step3.whatItsNot,
            'Safety concerns': grantsHubExample.step3.harmConsiderations,
          }}
          recipeRemix={{
            'Not this': recipeRemixExample.step3.whatItsNot,
            'Safety concerns': recipeRemixExample.step3.harmConsiderations,
          }}
        />
      </div>
    </div>
  )
}
