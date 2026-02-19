import { useState } from 'react'
import { Lightbulb } from 'lucide-react'

export default function ExamplePanel({ grantsHub, recipeRemix }) {
  const [activeTab, setActiveTab] = useState('grants')

  const tabs = [
    { id: 'grants', label: 'Grants Hub', sublabel: 'Real project', data: grantsHub },
    { id: 'recipe', label: 'Recipe Remix', sublabel: "Maya's example", data: recipeRemix },
  ]

  const active = tabs.find(t => t.id === activeTab)

  return (
    <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-indigo-100 bg-indigo-50">
        <Lightbulb className="w-4 h-4 text-indigo-500" />
        <span className="text-sm font-semibold text-indigo-700">See examples</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-indigo-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-700 bg-white border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-700 hover:bg-indigo-50/50'
            }`}
          >
            <span className="block">{tab.label}</span>
            <span className="block text-[10px] font-normal text-slate-400">{tab.sublabel}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {Object.entries(active.data).map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
              {label}
            </dt>
            <dd className="text-sm text-slate-600 leading-relaxed">{value}</dd>
          </div>
        ))}
      </div>
    </div>
  )
}
