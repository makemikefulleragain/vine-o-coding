import { useState, useEffect, useCallback } from 'react';
import { CHANNELS, generateTemplateContent } from '../utils/templates';
import ContentCard from './ContentCard';

const STORAGE_KEY = 'ku-content-drafts';
const CHANNEL_IDS = Object.keys(CHANNELS);

function loadDrafts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ContentGenerator() {
  const saved = loadDrafts();

  const [topic, setTopic] = useState(saved?.topic || '');
  const [keyMessage, setKeyMessage] = useState(saved?.keyMessage || '');
  const [audience, setAudience] = useState(saved?.audience || '');
  const [cta, setCta] = useState(saved?.cta || '');
  const [selectedChannels, setSelectedChannels] = useState(
    saved?.selectedChannels || CHANNEL_IDS
  );
  const [results, setResults] = useState(saved?.results || null);
  const [loading, setLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(null);
  const [useAi, setUseAi] = useState(true);

  // Check if AI endpoint is available
  useEffect(() => {
    async function checkAi() {
      try {
        const res = await fetch('/.netlify/functions/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ping: true }),
        });
        setAiAvailable(res.status !== 501 && res.status !== 404);
      } catch {
        setAiAvailable(false);
      }
    }
    checkAi();
  }, []);

  // Auto-save drafts
  const saveDrafts = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ topic, keyMessage, audience, cta, selectedChannels, results })
      );
    } catch { /* localStorage full or unavailable */ }
  }, [topic, keyMessage, audience, cta, selectedChannels, results]);

  useEffect(() => {
    const timer = setTimeout(saveDrafts, 500);
    return () => clearTimeout(timer);
  }, [saveDrafts]);

  function toggleChannel(id) {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleGenerate(e) {
    e.preventDefault();
    if (!topic.trim() || selectedChannels.length === 0) return;

    setLoading(true);
    const inputs = { topic: topic.trim(), keyMessage: keyMessage.trim(), audience: audience.trim(), cta: cta.trim() };

    // Try AI first if available and enabled
    if (aiAvailable && useAi) {
      try {
        const res = await fetch('/.netlify/functions/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...inputs, channels: selectedChannels }),
        });
        if (res.ok) {
          const aiResults = await res.json();
          // Merge AI results with channel metadata
          const merged = {};
          for (const channelId of selectedChannels) {
            const ch = CHANNELS[channelId];
            if (aiResults[channelId]) {
              merged[channelId] = {
                name: ch.name,
                icon: ch.icon,
                limit: ch.limit,
                content: aiResults[channelId],
                source: 'ai',
              };
            }
          }
          if (Object.keys(merged).length > 0) {
            setResults(merged);
            setLoading(false);
            return;
          }
        }
      } catch { /* fall through to templates */ }
    }

    // Fallback: template generation
    const templateResults = generateTemplateContent(inputs, selectedChannels);
    setResults(templateResults);
    setLoading(false);
  }

  function handleClearDrafts() {
    setTopic('');
    setKeyMessage('');
    setAudience('');
    setCta('');
    setResults(null);
    setSelectedChannels(CHANNEL_IDS);
    localStorage.removeItem(STORAGE_KEY);
  }

  function updateContent(channelId, newContent) {
    setResults((prev) => ({
      ...prev,
      [channelId]: { ...prev[channelId], content: newContent, source: prev[channelId].source + ' (edited)' },
    }));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ku-navy mb-2">Content Hub</h1>
        <p className="text-gray-600 text-sm">
          Generate channel-ready content from a single topic. Edit, copy, and distribute.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-ku-navy mb-1">
              Topic / Theme <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. New free Digital Sovereignty Audit tool"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ku-navy mb-1">Target Audience</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. NFP operations managers in WA"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-ku-navy mb-1">Key Message</label>
          <textarea
            value={keyMessage}
            onChange={(e) => setKeyMessage(e.target.value)}
            placeholder="The main point you want to communicate..."
            rows={2}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent resize-none"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-ku-navy mb-1">Call to Action</label>
          <input
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="e.g. Take the free audit at audit.kamunity.ai"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent"
          />
        </div>

        {/* Channel Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-ku-navy mb-2">Channels</label>
          <div className="flex flex-wrap gap-2">
            {CHANNEL_IDS.map((id) => {
              const ch = CHANNELS[id];
              const selected = selectedChannels.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleChannel(id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    selected
                      ? 'bg-ku-teal text-white border-ku-teal'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-ku-teal hover:text-ku-teal'
                  }`}
                >
                  <span>{ch.icon}</span> {ch.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Toggle */}
        {aiAvailable && (
          <div className="mb-5 flex items-center gap-2">
            <input
              type="checkbox"
              id="useAi"
              checked={useAi}
              onChange={(e) => setUseAi(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-ku-teal accent-ku-teal"
            />
            <label htmlFor="useAi" className="text-sm text-gray-600">
              Use AI generation (powered by OpenAI)
            </label>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">AI</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !topic.trim() || selectedChannels.length === 0}
            className="px-6 py-2.5 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
          {(topic || keyMessage || results) && (
            <button
              type="button"
              onClick={handleClearDrafts}
              className="px-4 py-2.5 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
          {aiAvailable === false && (
            <span className="text-xs text-gray-400">Using templates (no AI key configured)</span>
          )}
        </div>
      </form>

      {/* Results */}
      {results && (
        <div>
          <h2 className="text-lg font-bold text-ku-navy mb-4">
            Generated Content
            <span className="text-xs font-normal text-gray-400 ml-2">
              {Object.values(results).some((r) => r.source === 'ai') ? 'AI-generated' : 'Template-based'}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(results).map(([channelId, data]) => (
              <ContentCard
                key={channelId}
                channelId={channelId}
                data={data}
                onContentChange={(newContent) => updateContent(channelId, newContent)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
