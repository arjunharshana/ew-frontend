const MODEL_COLORS = {
  'V4.0 Hybrid': '#10B981',     // Green
  'Whittle W3': '#3b82f6',      // Blue
  'Context-Aware': '#f59e0b',   // Orange/Yellow
  'V4.1 LSTM': '#8b5cf6',       // Purple
  'V5.0 Belief': '#64748b',     // Slate/Gray
};

function ScenarioBars({ scenario }) {
  return (
    <div className="mb-5">
      <span className="text-[13px] font-medium block mb-2">{scenario.name}</span>
      <div className="flex flex-col gap-[5px]">
        {Object.entries(scenario.values).map(([model, val]) => (
          <div key={model} className="flex items-center gap-2">
            <span className="text-[11.5px] text-slate-600 w-[118px] shrink-0">{model}</span>
            <div className="flex-1 bg-slate-100 rounded-[3px] h-[10px] relative">
              <div
                className="h-full rounded-[3px]"
                style={{
                  width: `${val}%`,
                  background: MODEL_COLORS[model] ?? '#94a3b8',
                }}
              />
            </div>
            <span className="mono text-[11.5px] w-10 text-right">{val.toFixed(1)}%</span>
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
      <div onClick={onClose} className="fixed inset-0 bg-[#172033]/25 z-30" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-md z-[31] p-6">
        <div className="flex justify-between items-center mb-[18px]">
          <div>
            <h2 className="text-base font-semibold m-0">Benchmark comparison</h2>
            <p className="text-[12.5px] text-slate-600 mt-[2px] mb-0 mx-0">
              Interception rate by scheduler and evaluation scenario
            </p>
          </div>
          <button onClick={onClose} className="border-none bg-transparent text-lg cursor-pointer text-slate-600 hover:text-slate-900">
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
