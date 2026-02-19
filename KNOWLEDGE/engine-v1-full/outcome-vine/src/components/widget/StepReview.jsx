import { useState } from 'react'
import { Download, Copy, Check, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react'
import DocumentPreview from './DocumentPreview.jsx'
import { generateDocs } from '../../lib/generateDocs.js'
import { generatePrompt } from '../../lib/generatePrompt.js'
import { downloadZip } from '../../lib/downloadZip.js'

const DOC_ORDER = [
  'CONSTITUTION.md',
  'MISSION.md',
  'RUNNER.md',
  'PHASE_QUEUE.md',
  'SETUP.md',
  'STATE.md',
]

export default function StepReview({ data }) {
  const [activeDoc, setActiveDoc] = useState('CONSTITUTION.md')
  const [promptCopied, setPromptCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const docs = generateDocs(data)
  const prompt = generatePrompt(data)

  const handleDownloadZip = async () => {
    setDownloading(true)
    try {
      await downloadZip(docs, data.projectName)
    } finally {
      setDownloading(false)
    }
  }

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = prompt
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Document tabs + preview */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Your foundation documents
        </h3>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {DOC_ORDER.map(name => (
            <button
              key={name}
              onClick={() => setActiveDoc(name)}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                activeDoc === name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Preview */}
        <DocumentPreview filename={activeDoc} content={docs[activeDoc]} />
      </div>

      {/* Download ZIP */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          <Download className="w-5 h-5" />
          {downloading ? 'Creating ZIP...' : 'Download All as ZIP'}
        </button>
      </div>

      {/* Opening prompt */}
      <div className="border-2 border-indigo-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 bg-indigo-50 border-b border-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-indigo-900">Your opening prompt</h3>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-indigo-700 transition-colors"
          >
            {promptCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
        <pre className="p-5 text-sm text-slate-700 leading-relaxed overflow-x-auto max-h-64 overflow-y-auto bg-white whitespace-pre-wrap font-mono">
          {prompt}
        </pre>
      </div>

      {/* AI Privacy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Before you paste these into an AI assistant
        </h3>
        <div className="space-y-2 text-sm text-amber-800">
          <p>
            Your project description, user details, and business logic will be <strong>sent to the AI
            provider's servers</strong> (e.g., OpenAI, Anthropic, Microsoft). This is how AI coding
            assistants work — they process your input in the cloud.
          </p>
          <p>
            <strong>Avoid including:</strong> real names of vulnerable individuals, personal health
            information, financial account details, passwords, API keys, or anything you wouldn't want
            stored on a third-party server.
          </p>
          <p>
            Use role descriptions (e.g., "a volunteer treasurer") instead of real names where possible.
            Review your AI provider's privacy policy before sharing sensitive project details.
          </p>
        </div>
      </div>

      {/* What to do next */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          What to do next
        </h3>
        <ol className="space-y-3 text-sm text-emerald-800">
          <li className="flex gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 font-bold text-xs shrink-0">1</span>
            <span>
              <strong>Download your documents</strong> and put them in a new project folder on your computer.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 font-bold text-xs shrink-0">2</span>
            <span>
              <strong>Open an AI coding assistant</strong> — like{' '}
              <a href="https://windsurf.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Windsurf</a>,{' '}
              <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Cursor</a>, or{' '}
              <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="underline font-medium">GitHub Copilot</a>
              {' '}— and open your project folder.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 font-bold text-xs shrink-0">3</span>
            <span>
              <strong>Paste the opening prompt</strong> into the chat. The AI will read your foundation documents and start building. You check each step before it continues.
            </span>
          </li>
        </ol>
      </div>
    </div>
  )
}
