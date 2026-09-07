import { formatMHz, formatPercent } from '../utils/formatters.js';
import ScanTimeline from './ScanTimeline.jsx';

function ConfidenceRing({ confidence }) {
  const size = 52;
  const stroke = 5;
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
      <span
        className="mono"
        style={{ fontSize: 32, fontWeight: 700, color: accent ?? 'var(--text-primary)', lineHeight: 1.1, textShadow: accent ? `0 2px 12px ${accent}40` : 'none' }}
      >
        {value}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{sub}</span>
    </div>
  );
}

export default function PrimaryStatus({ state }) {
  return (
    <section
      style={{
        display: 'flex',
        gap: 32,
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          borderLeft: '4px solid var(--blue)',
          paddingLeft: 20,
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
          borderLeft: '4px solid var(--amber)',
          paddingLeft: 20,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Confidence</span>
          <span className="mono" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1, color: 'var(--amber)', textShadow: '0 2px 12px var(--amber-light)' }}>
            {formatPercent(state.confidence)}
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{state.confidenceLabel}</span>
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
