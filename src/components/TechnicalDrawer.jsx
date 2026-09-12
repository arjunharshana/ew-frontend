import { useState } from 'react';
import { formatPercent } from '../utils/formatters.js';

function Row({ label, value, tooltip }) {
  return (
    <div className="flex justify-between py-[7px] border-b border-slate-200">
      <span className={`${tooltip ? 'tooltip-term' : ''} text-[13px] text-slate-600`} title={tooltip}>
        {label}
      </span>
      <span className="mono text-[13px]">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-[22px]">
      <h3 className="text-[13px] font-semibold text-slate-600 m-0 mb-1.5 normal-case">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function TechnicalDrawer({
  open,
  onClose,
  receiver,
  scheduler,
  state,
  metrics,
  connectionStatus,
  isDemo,
  onOpenEmitters,
  onOpenBenchmarks,
}) {
  const [groundTruthOn, setGroundTruthOn] = useState(false);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#172033]/25 z-20"
      />
      <aside className="fixed top-0 right-0 bottom-0 w-[380px] bg-white border-l border-slate-200 z-[21] overflow-y-auto pt-6 px-6 pb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold m-0">Technical mode</h2>
          <button onClick={onClose} className="border-none bg-transparent text-lg cursor-pointer text-slate-600 hover:text-slate-900">
            ×
          </button>
        </div>

        <Section title="Receiver">
          <Row label="Center frequency" value={`${receiver.centerFrequency} MHz`} />
          <Row label="Instantaneous bandwidth" value={`${receiver.instantaneousBandwidth} MHz`} />
          <Row label="Sensitivity" value={`${receiver.sensitivity} dBm`} />
          <Row label="Pd" value={formatPercent(receiver.pd)} tooltip="Probability of Detection" />
          <Row label="Pfa" value={formatPercent(receiver.pfa)} tooltip="Probability of False Alarm" />
        </Section>

        <Section title="Scheduler">
          <Row label="Version" value={scheduler.version} />
          <Row label="Decision mode" value={scheduler.decisionMode} />
          <Row label="Q-value (selected)" value={state.qValue?.toFixed(2) ?? '—'} tooltip="Scheduler estimate of the value of selecting this frequency" />
          <Row label="Prediction confidence" value={formatPercent(state.confidence)} />
        </Section>

        <Section title="Runtime">
          <Row label="Simulation timestep" value={state.timestep} />
          <Row label="Total scans" value={metrics.totalScans} />
          <Row label="API status" value={isDemo ? 'Demo data' : 'Connected'} />
          <Row label="WebSocket status" value={connectionStatus} />
        </Section>

        <Section title="LSTM internals">
          <Row label="Hidden state energy ‖h_t‖₂" value={scheduler.hiddenStateEnergy?.toFixed(2) ?? '—'} />
          <Row label="Cell state energy ‖c_t‖₂" value={scheduler.cellStateEnergy?.toFixed(2) ?? '—'} />
          <Row label="Model state" value="Frozen (inference only)" />
        </Section>

        <Section title="Secondary metrics">
          <Row label="Average reward" value={metrics.averageReward?.toFixed(2) ?? '—'} />
          <Row label="Probability of false alarm" value={formatPercent(metrics.falseAlarmProbability)} />
          <Row label="Unique emitters detected" value={metrics.uniqueEmittersDetected} />
          <Row label="Time to first intercept" value={`${metrics.timeToFirstIntercept ?? '—'} s`} />
        </Section>

        <Section title="Evaluation mode">
          <div className="flex justify-between items-center py-1">
            <span className="text-[13px] text-slate-600">Ground truth overlay</span>
            <button
              onClick={() => setGroundTruthOn((v) => !v)}
              className={`text-xs px-2.5 py-1 rounded-full border border-slate-200 cursor-pointer ${groundTruthOn ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-600'}`}
            >
              {groundTruthOn ? 'ON' : 'OFF'}
            </button>
          </div>
          {groundTruthOn && (
            <p className="text-xs text-slate-400 mt-1.5">
              Evaluation only — not used by scheduler.
            </p>
          )}
        </Section>

        <div className="flex flex-col gap-2 mt-6">
          <button onClick={onOpenEmitters} className="text-left text-[13px] text-blue-500 bg-transparent border-none p-0 cursor-pointer hover:underline">View emitter details →</button>
          <button onClick={onOpenBenchmarks} className="text-left text-[13px] text-blue-500 bg-transparent border-none p-0 cursor-pointer hover:underline">View benchmark comparison →</button>
        </div>
      </aside>
    </>
  );
}
