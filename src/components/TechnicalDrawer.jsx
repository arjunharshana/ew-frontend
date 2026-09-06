import { useState } from 'react';
import { formatPercent } from '../utils/formatters.js';

function Row({ label, value, tooltip }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
      <span className={tooltip ? 'tooltip-term' : undefined} title={tooltip} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        {label}
      </span>
      <span className="mono" style={{ fontSize: 13 }}>{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 6px', textTransform: 'none' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function TechnicalDrawer({
  open,
  onClose,
  receiver,
  scheduler,
  state,
  metrics,
  connectionStatus,
  isDemo,
  onOpenEmitters,
  onOpenBenchmarks,
}) {
  const [groundTruthOn, setGroundTruthOn] = useState(false);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(23,32,51,0.25)', zIndex: 20 }}
      />
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border)',
          zIndex: 21,
          overflowY: 'auto',
          padding: '24px 24px 40px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Technical mode</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            ×
          </button>
        </div>

        <Section title="Receiver">
          <Row label="Center frequency" value={`${receiver.centerFrequency} MHz`} />
          <Row label="Instantaneous bandwidth" value={`${receiver.instantaneousBandwidth} MHz`} />
          <Row label="Sensitivity" value={`${receiver.sensitivity} dBm`} />
          <Row label="Pd" value={formatPercent(receiver.pd)} tooltip="Probability of Detection" />
          <Row label="Pfa" value={formatPercent(receiver.pfa)} tooltip="Probability of False Alarm" />
        </Section>

        <Section title="Scheduler">
          <Row label="Version" value={scheduler.version} />
          <Row label="Decision mode" value={scheduler.decisionMode} />
          <Row label="Q-value (selected)" value={state.qValue?.toFixed(2) ?? '—'} tooltip="Scheduler estimate of the value of selecting this frequency" />
          <Row label="Prediction confidence" value={formatPercent(state.confidence)} />
        </Section>

        <Section title="Runtime">
          <Row label="Simulation timestep" value={state.timestep} />
          <Row label="Total scans" value={metrics.totalScans} />
          <Row label="API status" value={isDemo ? 'Demo data' : 'Connected'} />
          <Row label="WebSocket status" value={connectionStatus} />
        </Section>

        <Section title="LSTM internals">
          <Row label="Hidden state energy ‖h_t‖₂" value={scheduler.hiddenStateEnergy?.toFixed(2) ?? '—'} />
          <Row label="Cell state energy ‖c_t‖₂" value={scheduler.cellStateEnergy?.toFixed(2) ?? '—'} />
          <Row label="Model state" value="Frozen (inference only)" />
        </Section>

        <Section title="Secondary metrics">
          <Row label="Average reward" value={metrics.averageReward?.toFixed(2) ?? '—'} />
          <Row label="Probability of false alarm" value={formatPercent(metrics.falseAlarmProbability)} />
          <Row label="Unique emitters detected" value={metrics.uniqueEmittersDetected} />
          <Row label="Time to first intercept" value={`${metrics.timeToFirstIntercept ?? '—'} s`} />
        </Section>

        <Section title="Evaluation mode">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Ground truth overlay</span>
            <button
              onClick={() => setGroundTruthOn((v) => !v)}
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: groundTruthOn ? 'var(--amber-light)' : 'var(--bg-surface-secondary)',
                color: groundTruthOn ? 'var(--amber)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {groundTruthOn ? 'ON' : 'OFF'}
            </button>
          </div>
          {groundTruthOn && (
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
              Evaluation only — not used by scheduler.
            </p>
          )}
        </Section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
          <button onClick={onOpenEmitters} style={linkButtonStyle}>View emitter details →</button>
          <button onClick={onOpenBenchmarks} style={linkButtonStyle}>View benchmark comparison →</button>
        </div>
      </aside>
    </>
  );
}

const linkButtonStyle = {
  textAlign: 'left',
  fontSize: 13,
  color: 'var(--blue)',
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};
