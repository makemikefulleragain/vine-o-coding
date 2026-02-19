import { QUESTIONS, DIMENSIONS } from '../data/questions'

export function calculateDimensionScores(answers) {
  const scores = {}

  for (const dimKey of Object.keys(DIMENSIONS)) {
    const dimQuestions = QUESTIONS.filter((q) => q.dimension === dimKey)
    const dimAnswers = dimQuestions.map((q) => answers[q.id]).filter(Boolean)

    if (dimAnswers.length === 0) {
      scores[dimKey] = 0
      continue
    }

    const avg = dimAnswers.reduce((sum, val) => sum + val, 0) / dimAnswers.length
    scores[dimKey] = Math.round(((avg - 1) / 3) * 100)
  }

  return scores
}

export function calculateOverallScore(dimensionScores) {
  const values = Object.values(dimensionScores)
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
}

export function getBand(score) {
  if (score <= 25) return 'low'
  if (score <= 50) return 'medLow'
  if (score <= 75) return 'medHigh'
  return 'high'
}

export function shouldShowSensitiveWarning(answers) {
  const safetyQuestions = QUESTIONS.filter((q) => q.dimension === 'safetyEthics')
  return safetyQuestions.some((q) => answers[q.id] === 1)
}

export function getTopRecommendations(dimensionScores, maxRecs = 3) {
  const sorted = Object.entries(dimensionScores).sort(([, a], [, b]) => a - b)

  const recs = []
  for (const [dimKey] of sorted) {
    if (recs.length >= maxRecs) break
    const band = getBand(dimensionScores[dimKey])
    recs.push({ dimension: dimKey, band })
  }

  return recs
}
