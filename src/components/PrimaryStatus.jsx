import { formatMHz, formatPercent } from '../utils/formatters.js';
import ScanTimeline from './ScanTimeline.jsx';

function ConfidenceRing({ confidence }) {
  const size = 52;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, confidence ?? 0));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function StatusBlock({ label, value, sub, accent }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] font-semibold text-slate-600 uppercase tracking-[0.5px]">{label}</span>
      <span
        className={`mono text-[28px] font-bold leading-[1.1] ${!accent ? 'text-slate-900' : ''}`}
        style={accent ? { color: accent, textShadow: `0 2px 12px ${accent}40` } : {}}
      >
        {value}
      </span>
      <span className="text-[12px] font-medium text-slate-400">{sub}</span>
    </div>
  );
}

export default function PrimaryStatus({ state }) {
  return (
    <section className="flex flex-wrap xl:flex-nowrap gap-3 lg:gap-4 px-4 lg:px-6 py-2 bg-gradient-to-br from-blue-50 to-purple-50 border-b border-slate-200 shadow-sm items-center justify-between">
      <div className="flex flex-wrap xl:flex-nowrap gap-3 lg:gap-6 items-center flex-1">
        <div className="border-l-4 border-blue-500 pl-3 lg:pl-4 shrink-0">
          <StatusBlock
            label="Current scan"
            value={formatMHz(state.currentFrequency)}
            sub={`Bin ${state.currentBin ?? '—'}`}
            accent="#3b82f6"
          />
        </div>

        <div className="border-l-4 border-amber-500 pl-3 lg:pl-4 shrink-0">
          <StatusBlock
            label="Predicted next"
            value={formatMHz(state.predictedFrequency)}
            sub={`Bin ${state.predictedBin ?? '—'}`}
            accent="#f59e0b"
          />
        </div>

        <div className="flex items-center gap-2.5 shrink-0 lg:pl-1">
          <ConfidenceRing confidence={state.confidence} />
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-semibold text-slate-600 uppercase tracking-[0.5px]">Confidence</span>
            <span className="mono text-[28px] font-bold leading-[1.1] text-amber-500 [text-shadow:0_2px_12px_#fef3c7]">
              {formatPercent(state.confidence)}
            </span>
            <span className="text-[12px] font-medium text-slate-400">{state.confidenceLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4 lg:gap-6 items-center mt-1 xl:mt-0 pt-1 xl:pt-0 border-t xl:border-t-0 xl:border-l border-slate-200 xl:pl-6 shrink-0 w-full xl:w-auto">
        <div className="flex gap-4 lg:gap-8 shrink-0">
          <StatusBlock
            label="Total steps"
            value={state.timestep ?? 0}
            sub="Executed"
          />
          <StatusBlock
            label="Time elapsed"
            value={`${((state.timestep ?? 0) * 0.01).toFixed(2)} s`}
          />
        </div>

        <div className="border-l border-slate-200 pl-4 lg:pl-8 ml-auto lg:ml-0 shrink-0">
          <ScanTimeline recentScans={state.recentScans} />
        </div>
      </div>
    </section>
  );
}
