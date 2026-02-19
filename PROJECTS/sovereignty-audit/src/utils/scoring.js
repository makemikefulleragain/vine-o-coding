import { DIMENSIONS } from '../data/questions';

export function calculateScores(answers) {
  const dimensionScores = {};

  for (const [dimId, dim] of Object.entries(DIMENSIONS)) {
    dimensionScores[dimId] = {
      ...dim,
      score: 0,
      status: 'atRisk',
      color: 'red',
    };
  }

  for (const answer of Object.values(answers)) {
    if (answer && answer.dimension && answer.score !== undefined) {
      dimensionScores[answer.dimension].score += answer.score;
    }
  }

  for (const dim of Object.values(dimensionScores)) {
    if (dim.score >= 20) {
      dim.status = 'strong';
      dim.color = 'green';
    } else if (dim.score >= 14) {
      dim.status = 'good';
      dim.color = 'lightGreen';
    } else if (dim.score >= 7) {
      dim.status = 'developing';
      dim.color = 'amber';
    } else {
      dim.status = 'atRisk';
      dim.color = 'red';
    }
  }

  const totalScore = Object.values(dimensionScores).reduce(
    (sum, dim) => sum + dim.score,
    0
  );

  let overallStage;
  if (totalScore >= 76) {
    overallStage = 'sovereign';
  } else if (totalScore >= 51) {
    overallStage = 'progressing';
  } else if (totalScore >= 26) {
    overallStage = 'aware';
  } else {
    overallStage = 'exposed';
  }

  return {
    totalScore,
    overallStage,
    dimensions: dimensionScores,
  };
}

export function getStatusLabel(status) {
  const labels = {
    atRisk: 'At Risk',
    developing: 'Developing',
    good: 'Good',
    strong: 'Strong',
  };
  return labels[status] || status;
}

export function getColorClasses(color) {
  const classes = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      bar: 'bg-red-500',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-300',
      bar: 'bg-amber-500',
    },
    lightGreen: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      bar: 'bg-emerald-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      bar: 'bg-green-600',
    },
  };
  return classes[color] || classes.red;
}
