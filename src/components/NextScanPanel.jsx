import { formatMHz, formatPercent } from '../utils/formatters.js';

export default function NextScanPanel({ state }) {
  const mix = state.decisionMix ?? { lstm: 0.84, contextAware: 0.16 };
  const lstmPct = Math.round((mix.lstm ?? 0) * 100);
  const contextPct = 100 - lstmPct;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ fontSize: 14.5, fontWeight: 600, margin: '0 0 14px' }}>Next scan</h2>

      <div style={{ marginBottom: 4 }}>
        <span className="mono" style={{ fontSize: 28, fontWeight: 600, color: 'var(--amber)' }}>
          {formatMHz(state.predictedFrequency)}
        </span>
      </div>
      <span style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 10 }}>
        Bin {state.predictedBin ?? '—'}
      </span>

      <span
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: 'var(--amber)',
          background: 'var(--amber-light)',
          borderRadius: 999,
          padding: '3px 10px',
          width: 'fit-content',
          marginTop: 8,
          marginBottom: 14,
        }}
      >
        {state.confidenceLabel ?? 'High confidence'}
      </span>

      <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.55, margin: '0 0 20px' }}>
        {state.explanation}
      </p>

      <div style={{ marginTop: 'auto' }}>
        <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
          Decision contribution
        </span>

        <div
          style={{
            display: 'flex',
            height: 8,
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <div style={{ width: `${lstmPct}%`, background: 'var(--blue)' }} />
          <div style={{ width: `${contextPct}%`, background: 'var(--muted)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--blue)' }}>●</span> LSTM prediction
          </span>
          <span className="mono">{lstmPct}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginTop: 4 }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--muted)' }}>●</span> Context adaptation
          </span>
          <span className="mono">{contextPct}%</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingTop: 14,
            borderTop: '1px solid var(--border)',
            fontSize: 12.5,
            color: 'var(--text-secondary)',
          }}
        >
          <span>Pattern: <span style={{ color: 'var(--text-primary)' }}>{state.pattern ?? '—'}</span></span>
          <span>Dwell: <span className="mono" style={{ color: 'var(--text-primary)' }}>{state.dwell ?? '—'} steps</span></span>
        </div>
      </div>
    </div>
  );
}
