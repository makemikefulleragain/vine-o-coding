import { Link } from 'react-router-dom';
import { guides } from '../data/toolkit';
import { loadAuditResults, getGuideCompletionStats } from '../utils/auditStorage';
import { getStatusLabel } from '../utils/scoring';

export default function Toolkit() {
  const saved = loadAuditResults();
  const hasResults = saved?.scores?.totalScore != null;

  const guideCards = guides.map(g => {
    const stats = getGuideCompletionStats(g.id);
    const dimScore = hasResults ? saved.scores.dimensions[g.dimension] : null;
    return { ...g, stats, dimScore };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Free Resources
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ku-navy mb-4">
          Digital Sovereignty Toolkit
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Practical, fillable guides for community organisations. Add your notes,
          download as CSV, and come back anytime. Everything stays on your device.
        </p>
      </div>

      {/* Audit score banner on toolkit page */}
      {hasResults && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Your Audit Score</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-ku-navy">{saved.scores.totalScore}</span>
                <span className="text-sm text-gray-400">/100</span>
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  {Object.entries(saved.scores.dimensions).map(([dimId, dim]) => {
                    const colorMap = { red: 'bg-red-100 text-red-700', amber: 'bg-amber-100 text-amber-700', lightGreen: 'bg-emerald-100 text-emerald-700', green: 'bg-green-100 text-green-700' };
                    return (
                      <span key={dimId} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colorMap[dim.color] || 'bg-gray-100 text-gray-500'}`}>
                        {getStatusLabel(dim.status)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link to="/results" className="text-sm font-medium text-ku-teal hover:text-ku-teal-dark no-underline">
              View full results →
            </Link>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {guideCards.map((guide) => {
          const isUrgent = guide.dimScore && (guide.dimScore.color === 'red' || guide.dimScore.color === 'amber');
          return (
            <Link
              key={guide.id}
              to={guide.path}
              className={`block p-6 rounded-xl border-2 ${guide.color} hover:shadow-md transition-shadow no-underline relative`}
            >
              {isUrgent && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Priority
                </span>
              )}
              <span className="text-3xl mb-3 block">{guide.icon}</span>
              <h2 className="font-semibold text-ku-navy text-lg mb-2">{guide.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{guide.description}</p>

              {/* Completion progress */}
              {guide.stats.total > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-white/60 rounded-full h-1.5">
                    <div className="bg-ku-teal h-1.5 rounded-full transition-all" style={{ width: `${guide.stats.pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{guide.stats.pct}%</span>
                </div>
              )}

              {/* Dimension status from audit */}
              {guide.dimScore && (
                <p className="text-xs text-gray-400 mb-2">
                  Your audit: <span className={`font-medium ${
                    guide.dimScore.color === 'red' ? 'text-red-600' :
                    guide.dimScore.color === 'amber' ? 'text-amber-600' :
                    guide.dimScore.color === 'lightGreen' ? 'text-emerald-600' : 'text-green-600'
                  }`}>{getStatusLabel(guide.dimScore.status)}</span> ({guide.dimScore.score}/{guide.dimScore.maxScore})
                </p>
              )}

              <span className="text-ku-teal font-medium text-sm inline-flex items-center gap-1">
                {guide.stats.checked > 0 ? 'Continue' : 'Start'} guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>

      {!hasResults && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-ku-teal-light rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-ku-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-ku-navy mb-1">Get personalised recommendations</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                These guides are useful on their own, but the 2-minute audit shows you
                which areas to focus on first and tracks your progress.
              </p>
              <Link
                to="/audit"
                className="text-ku-teal font-medium text-sm hover:text-ku-teal-dark no-underline"
              >
                Take the free 2-minute audit →
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-400">
        <p>No data collected. No tracking. Everything stays on your device.</p>
      </div>
    </div>
  );
}
