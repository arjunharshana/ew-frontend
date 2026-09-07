import { useState, useRef, useEffect } from 'react';

export default function SchedulerSelector({ selectedId, onChange, options }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!options || options.length === 0) return null;

  const selected = options.find((o) => o.id === selectedId) || options[0];

  const categories = [
    { id: 'hybrid', label: 'Proposed System (Winner)' },
    { id: 'rl', label: 'Research Baselines' },
    { id: 'baseline', label: 'Standard & Legacy Baselines' },
    { id: 'contextual', label: 'Empirical Baselines' },
    { id: 'non_stationary', label: 'Non-stationary Baselines' }
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
          fontSize: 13,
          color: 'var(--text-primary)',
          background: 'var(--bg-surface-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 12px',
          cursor: 'pointer',
          textAlign: 'left',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected.name} {selected.overall_ir ? `(${selected.overall_ir} IR)` : ''}
        </span>
        <span style={{ fontSize: 10, marginLeft: 10, flexShrink: 0 }}>▼</span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '120%',
            left: 0,
            width: '100%',
            maxHeight: 400,
            overflowY: 'auto',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 50,
            padding: 8,
            boxSizing: 'border-box'
          }}
        >
          {categories.map((cat) => {
            const catOptions = options.filter(o => o.category === cat.id);
            if (catOptions.length === 0) return null;
            return (
              <div key={cat.id} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {cat.label}
                </div>
                {catOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onChange(opt.id);
                      setOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: 13,
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      background: opt.id === selectedId ? 'var(--blue)' : 'transparent',
                      color: opt.id === selectedId ? '#fff' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      marginBottom: 2
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>
                        {opt.name} {opt.overall_ir ? `(${opt.overall_ir} IR)` : ''}
                      </span>
                      {opt.badge && (
                        <span style={{ 
                          fontSize: 10, 
                          padding: '2px 6px', 
                          borderRadius: 999, 
                          background: opt.id === selectedId ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-secondary)',
                          color: opt.id === selectedId ? '#fff' : 'var(--text-secondary)'
                        }}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
