import { formatPercent, formatSeconds } from '../utils/formatters.js';

function Metric({ value, label, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1, overflow: 'hidden' }}>
      <span className="mono" style={{ fontSize: 32, fontWeight: 700, color: accent || 'var(--text-primary)', textShadow: accent ? `0 1px 6px ${accent}40` : '0 1px 4px rgba(0,0,0,0.05)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {value}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.3, display: 'inline', alignSelf: 'flex-start', maxWidth: '100%' }}>
        {label}
      </span>
    </div>
  );
}

export default function PerformancePanel({ metrics }) {
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14.5, fontWeight: 600, margin: 0 }}>Figures of Merit</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px 16px', alignItems: 'start' }}>
        <Metric
          value={formatPercent(metrics.interceptionRate, 1)}
          label="Avg intercept rate"
          accent="var(--blue)"
        />
        <Metric
          value={formatPercent(metrics.detectionProbability, 1)}
          label="Probability of detection"
          accent="var(--green)"
        />
        <Metric
          value={formatPercent(metrics.falseAlarmProbability, 1)}
          label="Probability of false alarm"
        />
        <Metric
          value={`${metrics.sensitivityDbm ?? -90} dBm`}
          label="Sensitivity"
        />
        <Metric
          value={formatPercent(metrics.predictionAccuracy, 1)}
          label="Correct predictions (%)"
          accent="var(--amber)"
        />
        <Metric
          value={formatSeconds(metrics.averageInterceptTime)}
          label="Avg intercept time error"
        />
        <Metric
          value={metrics.averageReward > 0 ? `+${metrics.averageReward.toFixed(2)}` : metrics.averageReward.toFixed(2)}
          label="Avg Reward / cost function"
          accent="var(--purple)"
        />
      </div>
    </div>
  );
}
