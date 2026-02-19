import { useState, useEffect, useCallback } from 'react'
import { Play, RotateCcw, Search, Filter, FileText, Hammer, Eye, BarChart3, ArrowRight } from 'lucide-react'

const STEPS = [
  { icon: Search, label: 'Research', color: 'bg-blue-100 text-blue-600 border-blue-300', desc: 'Look at what exists' },
  { icon: Filter, label: 'Triage', color: 'bg-violet-100 text-violet-600 border-violet-300', desc: 'Pick the highest value' },
  { icon: FileText, label: 'Spec', color: 'bg-indigo-100 text-indigo-600 border-indigo-300', desc: 'Write the blueprint' },
  { icon: Hammer, label: 'Build', color: 'bg-amber-100 text-amber-600 border-amber-300', desc: 'Make it real' },
  { icon: Eye, label: 'Critique', color: 'bg-rose-100 text-rose-600 border-rose-300', desc: 'Check for problems' },
  { icon: BarChart3, label: 'Confidence', color: 'bg-emerald-100 text-emerald-600 border-emerald-300', desc: 'Score your certainty' },
  { icon: ArrowRight, label: 'Forward', color: 'bg-teal-100 text-teal-600 border-teal-300', desc: 'Plan what\'s next' },
]

export default function MethodologyFlow({ compact = false }) {
  const [activeStep, setActiveStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)

  const reset = useCallback(() => {
    setActiveStep(-1)
    setPlaying(false)
    setCompleted(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (activeStep >= STEPS.length - 1) {
      setPlaying(false)
      setCompleted(true)
      return
    }
    const timer = setTimeout(() => {
      setActiveStep((s) => s + 1)
    }, 700)
    return () => clearTimeout(timer)
  }, [playing, activeStep])

  const handlePlay = () => {
    if (completed) {
      reset()
      setTimeout(() => {
        setPlaying(true)
        setActiveStep(0)
      }, 100)
    } else {
      setPlaying(true)
      setActiveStep(0)
    }
  }

  return (
    <div className={compact ? '' : 'py-8'}>
      {/* Flow nodes */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const isActive = i === activeStep
          const isPast = i < activeStep
          const isIdle = activeStep === -1

          return (
            <div key={i} className="flex items-center">
              <div
                className={`flex flex-col items-center transition-all duration-500 ${
                  isActive
                    ? 'scale-110'
                    : isPast
                      ? 'scale-100 opacity-60'
                      : isIdle
                        ? 'scale-100 opacity-80'
                        : 'scale-95 opacity-30'
                }`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive
                      ? step.color + ' shadow-lg ring-2 ring-offset-2 ring-indigo-200'
                      : isPast
                        ? step.color
                        : isIdle
                          ? 'bg-slate-50 text-slate-400 border-slate-200'
                          : 'bg-slate-50 text-slate-300 border-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-semibold transition-colors duration-500 ${
                    isActive ? 'text-slate-900' : isPast ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector arrow */}
              {i < STEPS.length - 1 && (
                <div
                  className={`w-4 sm:w-6 h-0.5 mx-0.5 transition-colors duration-500 ${
                    isPast ? 'bg-indigo-300' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Active step description */}
      <div className="h-8 flex items-center justify-center mt-4">
        {activeStep >= 0 && activeStep < STEPS.length && (
          <p className="text-sm text-slate-600 animate-fade-in-up">
            <span className="font-semibold text-indigo-600">{STEPS[activeStep].label}:</span>{' '}
            {STEPS[activeStep].desc}
          </p>
        )}
        {completed && (
          <p className="text-sm text-emerald-600 font-semibold animate-fade-in-up">
            One phase done — now the loop starts again for the next phase
          </p>
        )}
      </div>

      {/* Play / Reset button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={completed ? handlePlay : handlePlay}
          disabled={playing}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            playing
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
          }`}
        >
          {completed ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Watch again
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Watch how it works
            </>
          )}
        </button>
      </div>
    </div>
  )
}
