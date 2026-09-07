import { formatPercent, formatSeconds } from '../utils/formatters.js';

function Metric({ value, label, tooltip }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 120 }}>
      <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)' }}>
        {value}
      </span>
      <span
        className={tooltip ? 'tooltip-term' : undefined}
        title={tooltip}
        style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.3, display: 'inline', alignSelf: 'flex-start' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function PerformancePanel({ metrics }) {
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14.5, fontWeight: 600, margin: 0 }}>Figures of Merit (Scorecard)</h2>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-surface-secondary)', padding: '2px 8px', borderRadius: 12 }}>
          Official Problem Statement Metrics
        </span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px 16px', alignItems: 'start' }}>
        <Metric 
          value={formatPercent(metrics.interceptionRate, 1)} 
          label="Avg intercept rate" 
          tooltip="Average interception rate against scanning targets"
        />
        <Metric
          value={formatPercent(metrics.detectionProbability, 1)}
          label="Probability of detection"
          tooltip="Probability of Detection (Pd)"
        />
        <Metric 
          value={formatPercent(metrics.falseAlarmProbability, 1)} 
          label="Probability of false alarm" 
          tooltip="Probability of False Alarm (Pfa)"
        />
        <Metric 
          value={`${metrics.sensitivityDbm} dBm`} 
          label="Sensitivity" 
          tooltip="Receiver sensitivity threshold"
        />
        <Metric 
          value={formatPercent(metrics.predictionAccuracy, 1)} 
          label="Correct predictions (%)" 
          tooltip="Percentage of correct predictions"
        />
        <Metric 
          value={formatSeconds(metrics.averageInterceptTime)} 
          label="Avg intercept time error" 
          tooltip="Average intercept time error (delay)"
        />
        <Metric 
          value={metrics.averageReward > 0 ? `+${metrics.averageReward.toFixed(2)}` : metrics.averageReward.toFixed(2)} 
          label="Avg Reward / cost function" 
          tooltip="Average RL Reward / Cost Function"
        />
      </div>
    </div>
  );
}
