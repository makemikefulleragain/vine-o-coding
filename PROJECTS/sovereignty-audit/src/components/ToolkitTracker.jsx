import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { guides } from '../data/toolkit';
import { loadAuditResults, getGuideCompletionStats } from '../utils/auditStorage';
import { getStatusLabel } from '../utils/scoring';

const VISITED_KEY = 'ku-toolkit-visited';

function getVisited() {
  try {
    const raw = localStorage.getItem(VISITED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markVisited(guideId) {
  const visited = getVisited();
  if (!visited.includes(guideId)) {
    visited.push(guideId);
    try { localStorage.setItem(VISITED_KEY, JSON.stringify(visited)); } catch { /* storage full */ }
  }
  return visited;
}

export default function ToolkitTracker({ currentGuideId }) {
  const [expanded, setExpanded] = useState(false);
  const visitedCount = useMemo(() => markVisited(currentGuideId).length, [currentGuideId]);
  const auditData = useMemo(() => loadAuditResults(), []);
  const guideStats = useMemo(() =>
    guides.map(g => ({ ...g, ...getGuideCompletionStats(g.id), isCurrent: g.id === currentGuideId })),
    [currentGuideId]
  );

  const colorMap = { red: 'text-red-600', amber: 'text-amber-600', lightGreen: 'text-emerald-600', green: 'text-green-600' };

  return (
    <>
      {/* Desktop: right sidebar */}
      <div className="fixed right-0 top-16 z-30 print:hidden hidden lg:block">
        <div
          className={`transition-all duration-300 ease-in-out ${
            expanded ? 'w-72' : 'w-10'
          } bg-white border-l border-b border-gray-200 rounded-bl-xl shadow-lg overflow-hidden`}
        >
          {/* Toggle button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center py-3 px-2 bg-amber-400 hover:bg-amber-500 transition-colors cursor-pointer border-b border-amber-300"
            title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg className={`w-4 h-4 text-white transition-transform ${expanded ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {expanded && (
            <div className="p-4 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Audit score mini */}
              {auditData?.scores ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Your Audit Score</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-ku-navy">{auditData.scores.totalScore}</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(auditData.scores.dimensions).map(([dimId, dim]) => (
                      <div key={dimId} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 truncate">{dim.name}</span>
                        <span className={`font-medium ${colorMap[dim.color] || 'text-gray-500'}`}>
                          {getStatusLabel(dim.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to="/results" className="text-[10px] text-ku-teal hover:text-ku-teal-dark no-underline font-medium mt-2 block">
                    View full results →
                  </Link>
                </div>
              ) : (
                <div className="bg-ku-teal-light rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">Take the 2-min audit to see personalised recommendations</p>
                  <Link to="/audit" className="text-xs font-semibold text-ku-teal hover:text-ku-teal-dark no-underline">
                    Start Audit →
                  </Link>
                </div>
              )}

              {/* Toolkit progress */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Toolkit Progress</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-ku-teal h-1.5 rounded-full transition-all" style={{ width: `${(visitedCount / guides.length) * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{visitedCount}/{guides.length}</span>
                </div>

                {/* Guide list */}
                <div className="space-y-1.5">
                  {guideStats.map((g) => (
                    <Link
                      key={g.id}
                      to={g.path}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs no-underline transition-colors ${
                        g.isCurrent
                          ? 'bg-ku-teal text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{g.icon}</span>
                      <span className="flex-1 truncate">{g.title}</span>
                      {g.total > 0 && !g.isCurrent && (
                        <span className="text-[10px] text-gray-400">{g.pct}%</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to toolkit */}
              <Link to="/toolkit" className="flex items-center gap-1 text-xs text-ku-teal hover:text-ku-teal-dark no-underline font-medium">
                ← All Guides
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: bottom floating bar */}
      <div className="fixed bottom-20 right-4 z-30 print:hidden lg:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 bg-amber-400 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors"
          title="Toolkit progress"
        >
          <span className="text-xs font-bold">{visitedCount}/{guides.length}</span>
        </button>

        {expanded && (
          <div className="absolute bottom-14 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 space-y-3">
            {/* Audit mini */}
            {auditData?.scores && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Audit Score</span>
                <Link to="/results" className="font-bold text-ku-navy no-underline">{auditData.scores.totalScore}/100 →</Link>
              </div>
            )}

            {/* Guide list */}
            <div className="space-y-1">
              {guideStats.map((g) => (
                <Link
                  key={g.id}
                  to={g.path}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs no-underline transition-colors ${
                    g.isCurrent ? 'bg-ku-teal text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{g.icon}</span>
                  <span className="flex-1 truncate">{g.title}</span>
                  {g.total > 0 && <span className="text-[10px] text-gray-400">{g.pct}%</span>}
                </Link>
              ))}
            </div>

            <Link to="/toolkit" className="block text-center text-xs text-ku-teal hover:text-ku-teal-dark no-underline font-medium">
              ← All Guides
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
