import { formatPercent, formatSeconds } from '../utils/formatters.js';

function Metric({ value, label, tooltip }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="mono" style={{ fontSize: 26, fontWeight: 600 }}>
        {value}
      </span>
      <span
        className={tooltip ? 'tooltip-term' : undefined}
        title={tooltip}
        style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function PerformancePanel({ metrics }) {
  return (
    <div>
      <h2 style={{ fontSize: 14.5, fontWeight: 600, margin: '0 0 14px' }}>Interception performance</h2>
      <div style={{ display: 'flex', gap: 40 }}>
        <Metric value={formatPercent(metrics.interceptionRate, 1)} label="Interception rate" />
        <Metric
          value={formatPercent(metrics.detectionProbability, 1)}
          label="Detection probability"
          tooltip="Probability of Detection (Pd)"
        />
        <Metric value={formatPercent(metrics.predictionAccuracy, 1)} label="Prediction accuracy" />
        <Metric value={formatSeconds(metrics.averageInterceptTime)} label="Avg. intercept time" />
      </div>
    </div>
  );
}
