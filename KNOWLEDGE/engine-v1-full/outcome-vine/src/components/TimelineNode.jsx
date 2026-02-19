import { useState } from 'react'
import { ChevronDown, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

const statusConfig = {
  success: {
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    label: 'Completed',
  },
  failure: {
    dot: 'bg-amber-500',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    icon: XCircle,
    iconColor: 'text-amber-500',
    label: 'Failed',
  },
  recovery: {
    dot: 'bg-indigo-500',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    icon: RefreshCw,
    iconColor: 'text-indigo-500',
    label: 'Recovery',
  },
}

export default function TimelineNode({ phase, isLast }) {
  const [expanded, setExpanded] = useState(phase.expanded || false)
  const config = statusConfig[phase.status]
  const Icon = config.icon

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${config.dot} ring-4 ring-white shrink-0 z-10`} />
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200" />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-10 ${isLast ? 'pb-0' : ''}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full text-left p-4 sm:p-5 rounded-xl border ${config.border} ${
            expanded ? config.bg : 'bg-white hover:bg-slate-50'
          } transition-colors`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  {phase.phase}
                </span>
                <Icon className={`w-4 h-4 ${config.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{phase.title}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{phase.outcome}</p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Expanded detail */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-200" onClick={e => e.stopPropagation()}>
              <ul className="space-y-2">
                {phase.detail.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                    <span className="text-slate-300 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {phase.lesson && (
                <div className="mt-4 p-3 bg-white/70 rounded-lg border border-slate-100">
                  <p className="text-sm font-medium text-indigo-700">
                    <span className="font-bold">Lesson:</span> {phase.lesson}
                  </p>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
