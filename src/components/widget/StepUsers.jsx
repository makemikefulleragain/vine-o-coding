import ExamplePanel from './ExamplePanel.jsx'
import BrianNote from './BrianNote.jsx'
import { grantsHubExample, recipeRemixExample } from '../../lib/examples.js'

export default function StepUsers({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            A name for your main user (real or made up)
          </label>
          <input
            type="text"
            value={data.primaryUserName}
            onChange={e => update('primaryUserName', e.target.value)}
            placeholder="e.g. Anika, Sandra, Coach Dave"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Describe this person and when they'd use your tool
          </label>
          <textarea
            value={data.primaryUserSituation}
            onChange={e => update('primaryUserSituation', e.target.value)}
            placeholder="e.g. Year 10, runs the cooking club WhatsApp group. She plans each session and picks the recipe. She's on her phone, usually during lunch."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Anyone else who might use it?
            <span className="font-normal text-slate-400 ml-1">(optional)</span>
          </label>
          <textarea
            value={data.secondaryUser}
            onChange={e => update('secondaryUser', e.target.value)}
            placeholder="e.g. Club members who want to browse recipes and add their own."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <BrianNote>
          <p>
            This becomes your <strong>persona</strong> in CONSTITUTION.md. Why a specific
            person? Because "users" is abstract — Sandra with her Saturday afternoon and
            paper receipts is concrete. The AI will make better decisions when it can
            picture Sandra.
          </p>
          <p className="mt-2">
            This is the "jobs to be done" framework in action. You're not describing
            demographics — you're describing a situation. When does this person reach for
            your tool? What are they trying to accomplish?
          </p>
        </BrianNote>
      </div>

      {/* Examples */}
      <div className="lg:col-span-1">
        <ExamplePanel
          grantsHub={{
            'Main user': `${grantsHubExample.step2.primaryUserName} — ${grantsHubExample.step2.primaryUserSituation}`,
            'Other users': grantsHubExample.step2.secondaryUser,
          }}
          recipeRemix={{
            'Main user': `${recipeRemixExample.step2.primaryUserName} — ${recipeRemixExample.step2.primaryUserSituation}`,
            'Other users': recipeRemixExample.step2.secondaryUser,
          }}
        />
      </div>
    </div>
  )
}
