import StatusIndicator from './StatusIndicator.jsx';

export default function Header({ running, connectionStatus, schedulerVersion, onOpenTechnical }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '18px 28px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
            Smart Scan Strategy
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Cognitive Electronic Support Receiver <span style={{ color: 'var(--text-muted)' }}>· SIH26055</span>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: running ? 'var(--green)' : 'var(--text-muted)',
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: running ? 'var(--green)' : 'var(--text-muted)',
            }}
          />
          {running ? 'Running' : 'Paused'}
        </span>

        <span className="mono" style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
          {schedulerVersion}
        </span>

        <StatusIndicator status={connectionStatus} />

        <button
          onClick={onOpenTechnical}
          style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Technical
        </button>
      </div>
    </header>
  );
}
