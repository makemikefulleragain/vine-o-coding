import TimelineNode from './TimelineNode.jsx'
import { timelinePhases } from '../lib/timelineData.js'

export default function Timeline() {
  return (
    <section className="py-14 sm:py-18">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          The full story: 8 phases
        </h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Click any phase to see what happened. Pay special attention to Phase 2 — where
          things went wrong, and how the method caught and fixed it.
        </p>

        <div>
          {timelinePhases.map((phase, i) => (
            <TimelineNode
              key={phase.id}
              phase={phase}
              isLast={i === timelinePhases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
