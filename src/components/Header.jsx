import StatusIndicator from './StatusIndicator.jsx';

export default function Header({ running, connectionStatus, schedulerVersion, onOpenTechnical }) {
  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '16px 28px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
      }}
    >
      {/* Empty left column to balance grid */}
      <div />

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 32, 
          fontWeight: 800, 
          margin: 0, 
          letterSpacing: '0.05em',
          fontFamily: "'JetBrains Mono', monospace",
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          PRISM
        </h1>
        <div style={{ 
          fontSize: 15, 
          color: 'var(--text-secondary)',
          marginTop: 4,
          fontWeight: 500,
          letterSpacing: '-0.01em'
        }}>
          Predictive Receiver for Intelligent Spectrum Monitoring
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifySelf: 'end' }}>
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
