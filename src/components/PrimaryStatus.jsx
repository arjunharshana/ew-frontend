import { formatMHz, formatPercent } from '../utils/formatters.js';
import ScanTimeline from './ScanTimeline.jsx';

function ConfidenceRing({ confidence }) {
  const size = 46;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, confidence ?? 0));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--amber)"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function StatusBlock({ label, value, sub, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span
        className="mono"
        style={{ fontSize: 30, fontWeight: 600, color: accent ?? 'var(--text-primary)', lineHeight: 1.1 }}
      >
        {value}
      </span>
      <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{sub}</span>
    </div>
  );
}

export default function PrimaryStatus({ state }) {
  return (
    <section
      style={{
        display: 'flex',
        gap: 48,
        padding: '20px 28px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          borderLeft: '3px solid var(--blue)',
          paddingLeft: 16,
        }}
      >
        <StatusBlock
          label="Current scan"
          value={formatMHz(state.currentFrequency)}
          sub={`Bin ${state.currentBin ?? '—'}`}
          accent="var(--blue)"
        />
      </div>

      <div
        style={{
          borderLeft: '3px solid var(--amber)',
          paddingLeft: 16,
        }}
      >
        <StatusBlock
          label="Predicted next"
          value={formatMHz(state.predictedFrequency)}
          sub={`Bin ${state.predictedBin ?? '—'}`}
          accent="var(--amber)"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ConfidenceRing confidence={state.confidence} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Confidence</span>
          <span className="mono" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>
            {formatPercent(state.confidence)}
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{state.confidenceLabel}</span>
        </div>
      </div>

      <div
        style={{
          borderLeft: '1px solid var(--border)',
          paddingLeft: 32,
          marginLeft: 'auto',
          display: 'flex',
          gap: 32,
          alignItems: 'center'
        }}
      >
        <StatusBlock
          label="Total steps"
          value={state.timestep ?? 0}
          sub="Executed"
        />
        <StatusBlock
          label="Time elapsed"
          value={`${state.simulationTimeS ? state.simulationTimeS.toFixed(1) : ((state.timestep ?? 0) * 0.1).toFixed(1)} s`}
          sub="Real-time"
        />
      </div>

      <div
        style={{
          borderLeft: '1px solid var(--border)',
          paddingLeft: 32,
        }}
      >
        <ScanTimeline recentScans={state.recentScans} />
      </div>
    </section>
  );
}
