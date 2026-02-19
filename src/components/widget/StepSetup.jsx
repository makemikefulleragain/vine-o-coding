import ExamplePanel from './ExamplePanel.jsx'
import BrianNote from './BrianNote.jsx'
import { grantsHubExample, recipeRemixExample } from '../../lib/examples.js'

export default function StepSetup({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  const deployOptions = [
    {
      value: 'netlify',
      label: 'Netlify',
      desc: 'Free, easy drag-and-drop deploy. Best for beginners.',
    },
    {
      value: 'vercel',
      label: 'Vercel',
      desc: 'Free, connects to GitHub. Auto-deploys when you push code.',
    },
    {
      value: 'unsure',
      label: "I'm not sure yet",
      desc: "That's fine — you can decide later. The documents will include options.",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        <fieldset>
          <legend className="block text-sm font-semibold text-slate-700 mb-3">
            Where will your tool live on the internet?
          </legend>
          <div className="space-y-3">
            {deployOptions.map(opt => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  data.deploymentChoice === opt.value
                    ? 'border-indigo-400 bg-indigo-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deployment"
                  value={opt.value}
                  checked={data.deploymentChoice === opt.value}
                  onChange={e => update('deploymentChoice', e.target.value)}
                  className="mt-0.5 accent-indigo-600"
                />
                <div>
                  <span className="text-sm font-semibold text-slate-800">{opt.label}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={data.hasDatabase}
              onChange={e => update('hasDatabase', e.target.checked)}
              className="accent-indigo-600 w-4 h-4"
            />
            <div>
              <span className="text-sm font-semibold text-slate-800">
                My tool needs to save data between sessions
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Like user accounts, saved content, or shared data. If unsure, leave unchecked — you can add this later.
              </p>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Any tools or services you already use or want to use?
            <span className="font-normal text-slate-400 ml-1">(optional)</span>
          </label>
          <textarea
            value={data.techNotes}
            onChange={e => update('techNotes', e.target.value)}
            placeholder="e.g. Need image uploads for recipe photos. Want to connect to Google Sheets."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        <BrianNote>
          <p>
            <strong>SETUP.md</strong> is the human action document — the things you do before
            the AI starts coding. The AI can't create your Netlify account or your database
            for you.
          </p>
          <p className="mt-2">
            The grants-hub SETUP.md listed every infrastructure step with time estimates.
            This ensures nothing is assumed. The AI reads SETUP.md to understand what
            infrastructure exists before writing any code.
          </p>
        </BrianNote>
      </div>

      {/* Examples */}
      <div className="lg:col-span-1">
        <ExamplePanel
          grantsHub={{
            'Deploy': 'Netlify (drag-and-drop)',
            'Database': 'Yes — Supabase for grant data and user accounts',
            'Notes': grantsHubExample.step5.techNotes,
          }}
          recipeRemix={{
            'Deploy': 'Netlify (drag-and-drop)',
            'Database': 'Maybe later — start with browser storage',
            'Notes': recipeRemixExample.step5.techNotes,
          }}
        />
      </div>
    </div>
  )
}
