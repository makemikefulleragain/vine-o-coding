import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateScores, getStatusLabel, getColorClasses } from '../utils/scoring';
import { dimensionRecommendations, sensitiveDataWarning, overallStages } from '../data/recommendations';
import { guides } from '../data/toolkit';
import { loadAuditResults, getGuideCompletionStats, loadAuditHistory } from '../utils/auditStorage';
import { industryBenchmarks, getPercentileLabel, getPercentileEstimate } from '../data/benchmarks';
import { generatePDFReport } from '../utils/pdfReport';
import ShareResults from './ShareResults';
import ContactModal from './ContactModal';

function BenchmarkComparison({ results }) {
  const overallPct = getPercentileEstimate(results.totalScore, industryBenchmarks.overall);
  const overallLabel = getPercentileLabel(results.totalScore, industryBenchmarks.overall);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10 print:break-inside-avoid">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold text-ku-navy">How You Compare</h2>
        <p className="text-xs text-gray-500 mt-0.5">Compared to Australian community organisations</p>
      </div>
      <div className="px-6 py-5">
        {/* Overall */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
          <div className={`px-3 py-1.5 rounded-lg ${overallLabel.bg}`}>
            <span className={`text-sm font-bold ${overallLabel.color}`}>{overallLabel.label}</span>
          </div>
          <p className="text-sm text-gray-600">
            Your score of <strong className="text-ku-navy">{results.totalScore}</strong> is in the{' '}
            <strong>{overallPct}th percentile</strong>. The average is {industryBenchmarks.overall.mean}/100.
          </p>
        </div>

        {/* Per-dimension */}
        <div className="space-y-3">
          {Object.entries(results.dimensions).map(([dimId, dim]) => {
            const bench = industryBenchmarks.dimensions[dimId];
            if (!bench) return null;
            const diff = dim.score - bench.mean;
            const isAbove = diff > 0;
            return (
              <div key={dimId} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-700 font-medium min-w-0">{dim.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-gray-500 text-xs">avg {bench.mean}</span>
                  <span className="font-bold text-ku-navy w-8 text-right">{dim.score}</span>
                  <span className={`text-xs font-semibold w-16 text-right ${isAbove ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {diff > 0 ? `+${diff}` : diff === 0 ? '—' : diff}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AuditHistory({ currentScore, currentDimensions }) {
  const history = loadAuditHistory();
  // Need at least 2 entries (including current) to show comparison
  if (history.length < 2) return null;

  const previous = history[history.length - 2];
  const prevScores = previous.scores;
  if (!prevScores) return null;

  const prevTotal = prevScores.totalScore;
  const diff = currentScore - prevTotal;
  const prevDate = new Date(previous.completedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10 print:break-inside-avoid">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold text-ku-navy">Progress Over Time</h2>
        <p className="text-xs text-gray-500 mt-0.5">Comparing with your previous audit ({prevDate})</p>
      </div>
      <div className="px-6 py-5">
        {/* Overall change */}
        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${diff > 0 ? 'bg-green-50' : diff < 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
            {diff > 0 && <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>}
            {diff < 0 && <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            <span className={`text-sm font-bold ${diff > 0 ? 'text-green-700' : diff < 0 ? 'text-red-600' : 'text-gray-500'}`}>
              {diff > 0 ? `+${diff} points` : diff < 0 ? `${diff} points` : 'No change'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {prevTotal} → <strong className="text-ku-navy">{currentScore}</strong>
          </p>
        </div>

        {/* Per-dimension changes */}
        <div className="space-y-3">
          {Object.entries(currentDimensions).map(([dimId, dim]) => {
            const prevDim = prevScores?.dimensions?.[dimId];
            const prevScore = prevDim?.score ?? 0;
            const d = dim.score - prevScore;
            return (
              <div key={dimId} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-700 font-medium">{dim.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-gray-400 text-xs">{prevScore}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-ku-navy w-6 text-right">{dim.score}</span>
                  <span className={`text-xs font-semibold w-10 text-right ${d > 0 ? 'text-green-600' : d < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {d > 0 ? `+${d}` : d === 0 ? '—' : d}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {history.length > 2 && (
          <p className="text-xs text-gray-400 mt-4 text-center">{history.length} audits recorded on this device</p>
        )}
      </div>
    </div>
  );
}

export default function Results({ answers }) {
  const [contactOpen, setContactOpen] = useState(false);
  const saved = loadAuditResults();
  const effectiveAnswers = (answers && Object.keys(answers).length > 0) ? answers : saved?.answers;

  if (!effectiveAnswers || Object.keys(effectiveAnswers).length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-ku-navy mb-4">No results yet</h2>
        <p className="text-gray-600 mb-6">Complete the 2-minute audit to see your digital sovereignty map.</p>
        <Link
          to="/audit"
          className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline"
        >
          Start Your Free Audit
        </Link>
      </div>
    );
  }

  const results = calculateScores(effectiveAnswers);
  const stage = overallStages[results.overallStage];
  const isFromSaved = !(answers && Object.keys(answers).length > 0);

  const hasSensitiveDataRisk =
    effectiveAnswers.q10 && (effectiveAnswers.q10.score <= 2);

  const overallColorMap = {
    red: { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-300', bar: 'bg-red-500' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-300', bar: 'bg-amber-500' },
    lightGreen: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-300', bar: 'bg-emerald-500' },
    green: { bg: 'bg-green-100', text: 'text-green-700', ring: 'ring-green-300', bar: 'bg-green-600' },
  };
  const overallColors = overallColorMap[stage.color] || overallColorMap.red;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Saved results notice */}
      {isFromSaved && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            These are your saved results from a previous visit.
          </div>
          <Link to="/audit" className="text-xs font-medium text-blue-600 hover:text-blue-800 no-underline shrink-0 ml-3">
            Retake Audit
          </Link>
        </div>
      )}

      {/* Overall score */}
      <div className="text-center mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">
          Your Digital Sovereignty Score
        </p>
        <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full ${overallColors.bg} ring-4 ${overallColors.ring} mb-4`}>
          <span className={`text-4xl font-bold ${overallColors.text}`}>
            {results.totalScore}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">out of 100</p>
        <h1 className={`text-2xl sm:text-3xl font-bold ${overallColors.text} mb-3`}>
          {stage.name}
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          {stage.summary}
        </p>
      </div>

      {/* Next step */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-ku-navy mb-2">What to do next</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{stage.nextStep}</p>
      </div>

      {/* Sensitive data warning */}
      {hasSensitiveDataRisk && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {sensitiveDataWarning.title}
          </h3>
          <p className="text-amber-700 text-sm leading-relaxed mb-2">
            {sensitiveDataWarning.message}
          </p>
          <p className="text-amber-600 text-xs leading-relaxed">
            {sensitiveDataWarning.additionalNote}
          </p>
        </div>
      )}

      {/* Dimension breakdown */}
      <h2 className="text-xl font-bold text-ku-navy mb-6">Your sovereignty map</h2>
      <div className="space-y-6 mb-10">
        {Object.entries(results.dimensions).map(([dimId, dim]) => {
          const colors = getColorClasses(dim.color);
          const recs = dimensionRecommendations[dimId]?.[dim.status] || [];
          const percentage = Math.round((dim.score / dim.maxScore) * 100);

          return (
            <div key={dimId} className={`border-2 ${colors.border} rounded-xl overflow-hidden`}>
              {/* Dimension header */}
              <div className={`${colors.bg} px-6 py-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${colors.text}`}>{dim.name}</h3>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {getStatusLabel(dim.status)}, {dim.score}/{dim.maxScore}
                  </span>
                </div>
                {/* Score bar */}
                <div className="w-full bg-white/60 rounded-full h-2.5">
                  <div
                    className={`${colors.bar} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="px-6 py-4 bg-white">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">
                  Recommendations
                </p>
                <ul className="space-y-2 mb-4">
                  {recs.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <svg className="w-4 h-4 text-ku-teal mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
                {(() => {
                  const guide = guides.find(g => g.dimension === dimId);
                  if (!guide) return null;
                  const stats = getGuideCompletionStats(guide.id);
                  const isUrgent = dim.color === 'red' || dim.color === 'amber';
                  return (
                    <div className={`rounded-lg p-4 ${isUrgent ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: isUrgent ? '#92400e' : '#6b7280' }}>
                            {isUrgent ? '⚡ Recommended for you' : 'Your next step'}
                          </p>
                          <p className="text-sm font-semibold text-ku-navy">{guide.icon} {guide.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{guide.time} · {guide.deliverable}</p>
                          {stats.total > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[120px]">
                                <div className="bg-ku-teal h-1.5 rounded-full transition-all" style={{ width: `${stats.pct}%` }} />
                              </div>
                              <span className="text-xs text-gray-500">{stats.pct}% done</span>
                            </div>
                          )}
                        </div>
                        <Link
                          to={guide.path}
                          className={`shrink-0 inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold no-underline transition-colors ${
                            isUrgent
                              ? 'bg-ku-teal text-white hover:bg-ku-teal-dark'
                              : 'bg-white text-ku-teal border border-ku-teal hover:bg-ku-teal-light'
                          }`}
                        >
                          {stats.total > 0 && stats.pct > 0 ? 'Continue' : 'Start'} →
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* How You Compare — Benchmarks */}
      <BenchmarkComparison results={results} />

      {/* Audit History */}
      <AuditHistory currentScore={results.totalScore} currentDimensions={results.dimensions} />

      {/* Share */}
      <ShareResults results={results} stage={stage} />

      {/* Download PDF Report */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 text-center print:hidden">
        <h2 className="font-semibold text-ku-navy mb-2">Board-Ready Report</h2>
        <p className="text-gray-500 text-sm mb-4">Download a formatted PDF to share with your board, funders, or team.</p>
        <button
          onClick={() => generatePDFReport(results, stage)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ku-navy text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Report
        </button>
      </div>

      {/* CTA */}
      <div className="bg-ku-teal-light rounded-xl p-8 text-center mb-10 print:hidden">
        <h2 className="text-xl font-bold text-ku-navy mb-3">Want to go deeper?</h2>
        <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
          This audit is a starting point. If you want help implementing these recommendations,
          Kamunity Consulting offers workshops and consulting for community organisations, at
          rates designed for the not-for-profit sector.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline"
          >
            View Our Services
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-ku-teal font-semibold rounded-xl border-2 border-ku-teal hover:bg-ku-teal-light transition-colors cursor-pointer text-sm"
          >
            Talk to Kamunity
          </button>
        </div>
      </div>

      {/* Privacy footer */}
      <div className="text-center">
        <p className="text-xs text-gray-400">
          Your results are saved on this device. Download the PDF report to keep a permanent copy.
        </p>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
