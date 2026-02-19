import { getStatusLabel } from './scoring';
import { industryBenchmarks, getPercentileLabel, getPercentileEstimate } from '../data/benchmarks';

// Generate a board-ready PDF report from audit results using browser print
export function generatePDFReport(results, stage) {
  const dims = results.dimensions;
  const overallPercentile = getPercentileEstimate(results.totalScore, industryBenchmarks.overall);
  const overallLabel = getPercentileLabel(results.totalScore, industryBenchmarks.overall);
  const date = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });

  const dimRows = Object.entries(dims).map(([dimId, dim]) => {
    const bench = industryBenchmarks.dimensions[dimId];
    const pLabel = getPercentileLabel(dim.score, bench);
    const colorMap = { red: '#ef4444', amber: '#f59e0b', lightGreen: '#10b981', green: '#16a34a' };
    const barColor = colorMap[dim.color] || '#6b7280';
    const pct = Math.round((dim.score / dim.maxScore) * 100);
    return `
      <tr>
        <td style="padding:10px 12px;font-weight:600;color:#1e293b">${dim.name}</td>
        <td style="padding:10px 12px;text-align:center">
          <div style="display:flex;align-items:center;gap:8px;justify-content:center">
            <div style="flex:1;max-width:80px;background:#e5e7eb;border-radius:999px;height:8px;overflow:hidden">
              <div style="width:${pct}%;background:${barColor};height:100%;border-radius:999px"></div>
            </div>
            <span style="font-weight:700;color:${barColor}">${dim.score}/${dim.maxScore}</span>
          </div>
        </td>
        <td style="padding:10px 12px;text-align:center;color:${barColor};font-weight:600">${getStatusLabel(dim.status)}</td>
        <td style="padding:10px 12px;text-align:center;color:#6b7280">${bench.mean}</td>
        <td style="padding:10px 12px;text-align:center;font-weight:600;color:${pLabel.color === 'text-green-700' ? '#15803d' : pLabel.color === 'text-emerald-700' ? '#047857' : pLabel.color === 'text-amber-700' ? '#b45309' : '#b91c1c'}">${pLabel.label}</td>
      </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Digital Sovereignty Report - ${date}</title>
<style>
  @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; margin: 0; padding: 40px; line-height: 1.6; }
  .header { text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #0d9488; }
  .header h1 { font-size: 24px; color: #0f172a; margin: 0 0 4px; }
  .header p { color: #6b7280; font-size: 13px; margin: 0; }
  .score-circle { display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; font-size: 36px; font-weight: 800; margin: 16px 0; }
  .section { margin-bottom: 28px; }
  .section h2 { font-size: 16px; color: #0f172a; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #f8fafc; padding: 10px 12px; text-align: left; font-weight: 600; color: #475569; border-bottom: 2px solid #e5e7eb; }
  td { border-bottom: 1px solid #f1f5f9; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af; }
</style>
</head>
<body>
  <div class="header">
    <h1>Digital Sovereignty Report</h1>
    <p>Prepared by Kamunity Consulting &middot; ${date}</p>
    <div class="score-circle" style="background:${stage.color === 'red' ? '#fef2f2' : stage.color === 'amber' ? '#fffbeb' : stage.color === 'lightGreen' ? '#ecfdf5' : '#f0fdf4'};color:${stage.color === 'red' ? '#dc2626' : stage.color === 'amber' ? '#d97706' : stage.color === 'lightGreen' ? '#059669' : '#16a34a'}">${results.totalScore}</div>
    <p style="font-size:11px;color:#9ca3af">out of 100</p>
    <p style="font-size:18px;font-weight:700;color:${stage.color === 'red' ? '#dc2626' : stage.color === 'amber' ? '#d97706' : stage.color === 'lightGreen' ? '#059669' : '#16a34a'};margin-top:4px">${stage.name}</p>
    <p style="max-width:500px;margin:8px auto 0;font-size:13px;color:#6b7280">${stage.summary}</p>
  </div>

  <div class="section">
    <h2>How You Compare</h2>
    <p style="font-size:13px;color:#6b7280;margin-bottom:12px">
      Your overall score of <strong>${results.totalScore}</strong> places you in the 
      <strong>${overallLabel.label}</strong> range (estimated ${overallPercentile}th percentile) 
      compared to Australian community organisations.
      The average score is ${industryBenchmarks.overall.mean}/100.
    </p>
  </div>

  <div class="section">
    <h2>Dimension Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Dimension</th>
          <th style="text-align:center">Score</th>
          <th style="text-align:center">Status</th>
          <th style="text-align:center">Avg</th>
          <th style="text-align:center">vs Peers</th>
        </tr>
      </thead>
      <tbody>${dimRows}</tbody>
    </table>
  </div>

  <div class="section">
    <h2>Recommended Next Steps</h2>
    <p style="font-size:13px;color:#475569">${stage.nextStep}</p>
  </div>

  <div class="section">
    <h2>About This Assessment</h2>
    <p style="font-size:12px;color:#6b7280">
      This report was generated from the Kamunity Digital Sovereignty Audit, a free self-assessment 
      tool for Australian community organisations. The audit evaluates four dimensions: Data Ownership, 
      Vendor Lock-in, Cost Transparency, and AI Readiness. Benchmark data is based on aggregated 
      patterns from community organisation assessments. All data was processed in-browser; no 
      information was sent to any server.
    </p>
  </div>

  <div class="footer">
    <p>Kamunity Consulting &middot; Digital Sovereignty for Community Organisations &middot; kamunityconsulting.com</p>
    <p>This report is for informational purposes only. It is not a compliance assessment or security audit.</p>
  </div>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}
