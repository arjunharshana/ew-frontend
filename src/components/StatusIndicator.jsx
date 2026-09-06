export default function StatusIndicator({ status }) {
  const config = {
    live: { color: 'var(--green)', label: 'Live' },
    connecting: { color: 'var(--amber)', label: 'Connecting' },
    offline: { color: 'var(--text-muted)', label: 'Offline' },
  }[status] ?? { color: 'var(--text-muted)', label: 'Offline' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: 'var(--text-secondary)',
      }}
      title={status === 'offline' ? 'Telemetry connection lost — reconnecting…' : undefined}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: config.color,
        }}
      />
      {config.label}
    </span>
  );
}
