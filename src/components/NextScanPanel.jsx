import { formatMHz, formatPercent } from '../utils/formatters.js';

export default function NextScanPanel({ state }) {
  const mix = state.decisionMix ?? { lstm: 0.84, contextAware: 0.16 };
  const lstmPct = Math.round((mix.lstm ?? 0) * 100);
  const contextPct = 100 - lstmPct;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-[14.5px] font-semibold m-0 mb-3.5">Next scan</h2>

      <div className="mb-1">
        <span className="mono text-[28px] font-semibold text-amber-500">
          {formatMHz(state.predictedFrequency)}
        </span>
      </div>
      <span className="text-[12.5px] text-slate-400 mb-2.5">
        Bin {state.predictedBin ?? '—'}
      </span>

      <span className="text-[12.5px] font-medium text-amber-500 bg-amber-50 rounded-full px-2.5 py-[3px] w-fit mt-2 mb-3.5">
        {state.confidenceLabel ?? 'High confidence'}
      </span>

      <p className="text-[13.5px] text-slate-900 leading-[1.55] m-0 mb-5">
        {state.explanation}
      </p>

      <div className="mt-auto">
        <span className="text-[12.5px] text-slate-600 block mb-2">
          Decision contribution
        </span>

        <div className="flex h-2 rounded overflow-hidden mb-2">
          <div className="bg-blue-500" style={{ width: `${lstmPct}%` }} />
          <div className="bg-slate-400" style={{ width: `${contextPct}%` }} />
        </div>

        <div className="flex justify-between text-[12.5px]">
          <span className="text-slate-600">
            <span className="text-blue-500">●</span> LSTM prediction
          </span>
          <span className="mono">{lstmPct}%</span>
        </div>
        <div className="flex justify-between text-[12.5px] mt-1">
          <span className="text-slate-600">
            <span className="text-slate-400">●</span> Context adaptation
          </span>
          <span className="mono">{contextPct}%</span>
        </div>

        <div className="flex justify-between mt-4 pt-3.5 border-t border-slate-200 text-[12.5px] text-slate-600">
          <span>Pattern: <span className="text-slate-900">{state.pattern ?? '—'}</span></span>
          <span>Dwell: <span className="mono text-slate-900">{state.dwell ?? '—'} steps</span></span>
        </div>
      </div>
    </div>
  );
}
