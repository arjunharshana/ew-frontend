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
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full box-border text-[13px] text-slate-900 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 cursor-pointer text-left shadow-sm"
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {selected.name} {selected.overall_ir ? `(${selected.overall_ir} IR)` : ''}
        </span>
        <span className="text-[10px] ml-2.5 shrink-0">▼</span>
      </button>

      {open && (
        <div className="absolute top-[120%] left-0 w-full max-h-[400px] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-2 box-border">
          {categories.map((cat) => {
            const catOptions = options.filter(o => o.category === cat.id);
            if (catOptions.length === 0) return null;
            return (
              <div key={cat.id} className="mb-3">
                <div className="text-[11px] font-semibold text-slate-600 px-2 py-1 uppercase tracking-[0.05em]">
                  {cat.label}
                </div>
                {catOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onChange(opt.id);
                      setOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-[13px] border-none rounded-lg cursor-pointer transition-colors duration-200 mb-0.5 ${
                      opt.id === selectedId ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-900'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>
                        {opt.name} {opt.overall_ir ? `(${opt.overall_ir} IR)` : ''}
                      </span>
                      {opt.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          opt.id === selectedId ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
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
