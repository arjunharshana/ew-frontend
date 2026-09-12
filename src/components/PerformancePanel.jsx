import { formatPercent, formatSeconds } from '../utils/formatters.js';

function Metric({ value, label, accent }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0 flex-1 overflow-hidden">
      <span 
        className={`mono text-[32px] font-bold whitespace-nowrap overflow-hidden text-ellipsis ${!accent ? 'text-slate-900' : ''}`}
        style={accent ? { color: accent, textShadow: `0 1px 6px ${accent}40` } : { textShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      >
        {value}
      </span>
      <span className="text-[13px] font-medium text-slate-600 leading-[1.3] inline self-start max-w-full">
        {label}
      </span>
    </div>
  );
}

export default function PerformancePanel({ metrics }) {
  return (
    <div className="py-1">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[14.5px] font-semibold m-0">Figures of Merit</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-5 items-start">
        <Metric
          value={formatPercent(metrics.interceptionRate, 1)}
          label="Avg intercept rate"
          accent="#3b82f6"
        />
        <Metric
          value={formatPercent(metrics.detectionProbability, 1)}
          label="Probability of detection"
          accent="#10b981"
        />
        <Metric
          value={formatPercent(metrics.falseAlarmProbability, 1)}
          label="Probability of false alarm"
        />
        <Metric
          value={`${metrics.sensitivityDbm ?? -90} dBm`}
          label="Sensitivity"
        />
        <Metric
          value={formatPercent(metrics.predictionAccuracy, 1)}
          label="Correct predictions (%)"
          accent="#f59e0b"
        />
        <Metric
          value={formatSeconds(metrics.averageInterceptTime)}
          label="Avg intercept time error"
        />
        <Metric
          value={metrics.averageReward > 0 ? `+${metrics.averageReward.toFixed(2)}` : metrics.averageReward.toFixed(2)}
          label="Avg Reward"
          accent="#8b5cf6"
        />
      </div>
    </div>
  );
}
