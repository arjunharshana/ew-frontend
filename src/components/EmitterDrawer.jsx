export default function EmitterDrawer({ open, onClose, emitters }) {
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
          width: 420,
          maxHeight: '70vh',
          overflowY: 'auto',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          zIndex: 31,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Emitters</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {emitters.map((e) => (
            <div
              key={e.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                background: 'var(--bg-surface-secondary)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{e.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                  {e.type} · {e.behavior}
                </div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: e.status === 'Active' ? 'var(--green)' : 'var(--text-muted)',
                  background: e.status === 'Active' ? 'var(--green-light)' : 'var(--bg-surface)',
                  padding: '3px 10px',
                  borderRadius: 999,
                }}
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
