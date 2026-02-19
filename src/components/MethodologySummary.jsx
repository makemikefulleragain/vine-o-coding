import { useState } from 'react'
import { Download, FileText, Copy, Check } from 'lucide-react'
import { methodologySummaryContent } from '../lib/methodologySummary.js'

export default function MethodologySummary() {
  const [copied, setCopied] = useState(false)

  const handleDownload = () => {
    const blob = new Blob([methodologySummaryContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'outcome-vine-methodology.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(methodologySummaryContent)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = methodologySummaryContent
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-14 sm:py-18">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                Methodology Summary
              </h2>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                A 2-page overview of Outcome Vine Coding. Use it for workshops, reference,
                or sharing with your team. Markdown format — paste it anywhere.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download .md
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy to clipboard
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
