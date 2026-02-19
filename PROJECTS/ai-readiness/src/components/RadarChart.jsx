import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { DIMENSIONS } from '../data/questions'

export default function RadarChart({ dimensionScores }) {
  const data = Object.entries(DIMENSIONS).map(([key, dim]) => ({
    dimension: dim.label,
    score: dimensionScores[key] || 0,
    fullMark: 100,
  }))

  return (
    <div className="w-full" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="#d9e8dc"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fill: '#2D2D2D',
              fontSize: 13,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={5}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            contentStyle={{
              backgroundColor: '#FAFAF5',
              border: '1px solid #d9e8dc',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
          <Radar
            name="Your Organisation"
            dataKey="score"
            stroke="#4A7C59"
            fill="#4A7C59"
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{
              r: 5,
              fill: '#4A7C59',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
