import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DIMENSIONS } from '../data/questions'
import {
  BAND_LABELS,
  BAND_DESCRIPTIONS,
  DIMENSION_RECOMMENDATIONS,
  SENSITIVE_DATA_WARNING,
} from '../data/recommendations'
import {
  calculateDimensionScores,
  calculateOverallScore,
  getBand,
  shouldShowSensitiveWarning,
  getTopRecommendations,
} from '../utils/scoring'
import RadarChart from './RadarChart'
import FeedbackWidget from './FeedbackWidget'

export default function Results({ answers, onReset }) {
  const navigate = useNavigate()
  const hasAnswers = Object.keys(answers).length === 12

  useEffect(() => {
    if (!hasAnswers) {
      navigate('/quiz')
    }
  }, [hasAnswers, navigate])

  if (!hasAnswers) return null

  const dimensionScores = calculateDimensionScores(answers)
  const overallScore = calculateOverallScore(dimensionScores)
  const overallBand = getBand(overallScore)
  const showSensitiveWarning = shouldShowSensitiveWarning(answers)
  const topRecs = getTopRecommendations(dimensionScores, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Overall Score */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
          Your AI Readiness Map
        </h1>
        <p className="text-gray-500 mb-6">
          Here&apos;s where your organisation stands right now.
        </p>

        <div className="inline-flex items-center gap-3 bg-moss-50 border border-moss-200 rounded-full px-6 py-3 mb-2">
          <span className="text-3xl font-bold text-moss-600">
            {overallScore}%
          </span>
          <span className="text-moss-700 font-semibold">
            {BAND_LABELS[overallBand]}
          </span>
        </div>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          {BAND_DESCRIPTIONS[overallBand]}
        </p>
      </section>

      {/* Radar Chart */}
      <section className="card mb-8">
        <RadarChart dimensionScores={dimensionScores} />
      </section>

      {/* Sensitive Data Warning */}
      {showSensitiveWarning && (
        <section className="mb-8">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
            <h3 className="font-bold text-charcoal mb-2 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Important — Sensitive Data
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {SENSITIVE_DATA_WARNING}
            </p>
          </div>
        </section>
      )}

      {/* Dimension Breakdown */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          Your scores by dimension
        </h2>
        <div className="space-y-4">
          {Object.entries(DIMENSIONS).map(([key, dim]) => {
            const score = dimensionScores[key]
            const band = getBand(score)
            return (
              <div key={key} className="card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-charcoal">{dim.label}</h3>
                  <span className="text-moss-600 font-bold">{score}%</span>
                </div>
                <div className="w-full bg-moss-100 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-moss-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {BAND_LABELS[band]} — {dim.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Personalised Recommendations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          Your next steps
        </h2>
        <p className="text-gray-600 mb-4">
          Based on your results, here are the most impactful things you can do
          right now:
        </p>
        <div className="space-y-4">
          {topRecs.map(({ dimension, band }, idx) => {
            const dim = DIMENSIONS[dimension]
            const recs = DIMENSION_RECOMMENDATIONS[dimension]?.[band] || []
            return (
              <div key={dimension} className="card border-l-4 border-l-moss-500">
                <h3 className="font-semibold text-charcoal mb-2 flex items-center gap-2">
                  <span className="bg-moss-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  {dim.label}
                </h3>
                <ul className="space-y-2">
                  {recs.map((rec, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-sm flex items-start gap-2"
                    >
                      <span className="text-moss-400 mt-0.5 flex-shrink-0">
                        →
                      </span>
                      <span>
                        {rec.text || rec}
                        {rec.link && (
                          <>
                            {' '}
                            <Link
                              to={rec.link}
                              className="text-moss-500 hover:text-moss-600 underline font-medium"
                            >
                              {rec.linkText}
                            </Link>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Funder Note */}
      <section className="mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong>A note for funders:</strong> AI readiness scores should not
            be used as a gate or requirement for funding. Community organisations
            are at different stages and that&apos;s OK. This tool exists to help
            orgs find their starting point, not to create new barriers.
          </p>
        </div>
      </section>

      {/* Feedback */}
      <section className="mb-8">
        <FeedbackWidget />
      </section>

      {/* Screenshot prompt + actions */}
      <section className="text-center space-y-4">
        <div className="bg-moss-50 border border-moss-200 rounded-xl p-4">
          <p className="text-moss-700 text-sm font-medium">
            📱 Tip: Screenshot this page to share your results with your team or
            board.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/quiz"
            onClick={onReset}
            className="btn-secondary"
          >
            Take Again
          </Link>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
