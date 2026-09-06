const MODEL_COLORS = {
  'V4.1 LSTM-Hybrid': '#2563EB',
  'Context-Aware': '#94A3B8',
  'V3.1 DDQN': '#D97706',
  'V4.0 Hybrid': '#16A34A',
};

function ScenarioBars({ scenario }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <span style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8 }}>{scenario.name}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {Object.entries(scenario.values).map(([model, val]) => (
          <div key={model} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', width: 118, flexShrink: 0 }}>{model}</span>
            <div style={{ flex: 1, background: 'var(--bg-surface-secondary)', borderRadius: 3, height: 10, position: 'relative' }}>
              <div
                style={{
                  width: `${val}%`,
                  height: '100%',
                  background: MODEL_COLORS[model] ?? 'var(--muted)',
                  borderRadius: 3,
                }}
              />
            </div>
            <span className="mono" style={{ fontSize: 11.5, width: 40, textAlign: 'right' }}>{val.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BenchmarkPanel({ open, onClose, benchmarks }) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(23,32,51,0.25)', zIndex: 30 }} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 520,
          maxHeight: '80vh',
          overflowY: 'auto',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          zIndex: 31,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Benchmark comparison</h2>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Interception rate by scheduler and evaluation scenario
            </p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            ×
          </button>
        </div>

        {benchmarks.scenarios.map((scenario) => (
          <ScenarioBars key={scenario.name} scenario={scenario} />
        ))}
      </div>
    </>
  );
}
