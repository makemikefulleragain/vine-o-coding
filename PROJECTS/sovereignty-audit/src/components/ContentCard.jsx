import { useState } from 'react';

export default function ContentCard({ channelId, data, onContentChange }) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const charCount = data.content.length;
  const overLimit = data.limit && charCount > data.limit;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(data.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = data.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{data.icon}</span>
          <span className="font-semibold text-ku-navy text-sm">{data.name}</span>
          {data.source.includes('ai') && (
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">AI</span>
          )}
          {data.source === 'template' && (
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">Template</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${overLimit ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
            {charCount}{data.limit ? `/${data.limit}` : ''} chars
            {overLimit && ' (over limit)'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {editing ? (
          <textarea
            value={data.content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full min-h-[200px] text-sm text-gray-700 leading-relaxed border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent resize-y"
            onBlur={() => setEditing(false)}
            autoFocus
          />
        ) : (
          <pre
            className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans cursor-pointer hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors min-h-[100px]"
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {data.content}
          </pre>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs text-gray-400 hover:text-ku-teal transition-colors cursor-pointer"
        >
          {editing ? 'Done editing' : 'Click to edit'}
        </button>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-ku-teal text-white hover:bg-ku-teal-dark'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
