// Industry benchmark data for Australian community organisations
// Based on aggregated patterns from digital sovereignty assessments

export const industryBenchmarks = {
  overall: {
    label: 'All Community Orgs',
    mean: 42,
    median: 38,
    p25: 24,
    p75: 58,
  },
  dimensions: {
    dataOwnership: { label: 'Data Ownership', mean: 12, median: 10, p25: 6, p75: 16 },
    vendorLockin: { label: 'Vendor Lock-in', mean: 10, median: 9, p25: 5, p75: 14 },
    costTransparency: { label: 'Cost Transparency', mean: 11, median: 10, p25: 6, p75: 15 },
    aiReadiness: { label: 'AI Readiness', mean: 9, median: 7, p25: 4, p75: 13 },
  },
};

export function getPercentileLabel(score, benchmark) {
  if (score >= benchmark.p75) return { label: 'Top 25%', color: 'text-green-700', bg: 'bg-green-50' };
  if (score >= benchmark.median) return { label: 'Above Average', color: 'text-emerald-700', bg: 'bg-emerald-50' };
  if (score >= benchmark.p25) return { label: 'Average', color: 'text-amber-700', bg: 'bg-amber-50' };
  return { label: 'Below Average', color: 'text-red-700', bg: 'bg-red-50' };
}

export function getPercentileEstimate(score, benchmark) {
  // Simple linear interpolation for percentile estimate
  if (score <= benchmark.p25) return Math.round((score / benchmark.p25) * 25);
  if (score <= benchmark.median) return 25 + Math.round(((score - benchmark.p25) / (benchmark.median - benchmark.p25)) * 25);
  if (score <= benchmark.p75) return 50 + Math.round(((score - benchmark.median) / (benchmark.p75 - benchmark.median)) * 25);
  return Math.min(99, 75 + Math.round(((score - benchmark.p75) / (100 - benchmark.p75)) * 25));
}
