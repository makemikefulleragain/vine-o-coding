import { BookOpen } from 'lucide-react'

export default function BrianNote({ children }) {
  return (
    <details className="mt-6 group">
      <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors select-none list-none">
        <BookOpen className="w-4 h-4" />
        <span>Lean in — why this matters</span>
        <span className="text-xs text-slate-400 group-open:hidden">(click to expand)</span>
      </summary>
      <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </details>
  )
}
