import ExamplePanel from './ExamplePanel.jsx'
import BrianNote from './BrianNote.jsx'
import { grantsHubExample, recipeRemixExample } from '../../lib/examples.js'

export default function StepPriorities({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            What's the single most important thing to build first?
          </label>
          <textarea
            value={data.phase1Goal}
            onChange={e => update('phase1Goal', e.target.value)}
            placeholder="e.g. Show a list of recipes with photos and ingredient lists. Anyone in the club can browse."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            After that works, what's next?
            <span className="font-normal text-slate-400 ml-1">(optional)</span>
          </label>
          <textarea
            value={data.phase2Goal}
            onChange={e => update('phase2Goal', e.target.value)}
            placeholder="e.g. Let members add new recipes with a simple form. Rate and comment on recipes."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            And after that?
            <span className="font-normal text-slate-400 ml-1">(it's fine to leave this blank)</span>
          </label>
          <textarea
            value={data.phase3Goal}
            onChange={e => update('phase3Goal', e.target.value)}
            placeholder="e.g. Plan next session — vote on which recipe to cook, generate a shopping list."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <BrianNote>
          <p>
            These become your <strong>PHASE_QUEUE.md</strong>. Each phase is a hypothesis —
            you'll research what's needed, build it, test it, and adjust.
          </p>
          <p className="mt-2">
            The grants-hub planned 5 phases but actually went through 8 (including a Phase 2
            failure and complete rebuild). That's not a failure of planning — it's the plan
            working as designed. In Lean Startup terms, each phase is a build-measure-learn
            cycle.
          </p>
          <p className="mt-2">
            Don't over-plan. Three phases is enough to start. The method will help you
            figure out the rest as you learn what your users actually need.
          </p>
        </BrianNote>
      </div>

      {/* Examples */}
      <div className="lg:col-span-1">
        <ExamplePanel
          grantsHub={{
            'Phase 1': grantsHubExample.step4.phase1Goal,
            'Phase 2': grantsHubExample.step4.phase2Goal,
            'Phase 3': grantsHubExample.step4.phase3Goal,
          }}
          recipeRemix={{
            'Phase 1': recipeRemixExample.step4.phase1Goal,
            'Phase 2': recipeRemixExample.step4.phase2Goal,
            'Phase 3': recipeRemixExample.step4.phase3Goal,
          }}
        />
      </div>
    </div>
  )
}
