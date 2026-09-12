import { useState } from 'react';
import Header from './components/Header.jsx';
import PrimaryStatus from './components/PrimaryStatus.jsx';
import FrequencyActivity from './components/FrequencyActivity.jsx';
import TacticalSpectrumStrip from './components/TacticalSpectrumStrip.jsx';
import PerformancePanel from './components/PerformancePanel.jsx';
import PerformanceChart from './components/PerformanceChart.jsx';
import SimulationControls from './components/SimulationControls.jsx';
import TechnicalDrawer from './components/TechnicalDrawer.jsx';
import EmitterDrawer from './components/EmitterDrawer.jsx';
import BenchmarkPanel from './components/BenchmarkPanel.jsx';
import { useSimulation } from './hooks/useSimulation.js';

export default function App() {
  const sim = useSimulation();
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [emittersOpen, setEmittersOpen] = useState(false);
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <Header
        running={sim.running}
        connectionStatus={sim.isDemo ? 'offline' : sim.connectionStatus}
        schedulerVersion={sim.scheduler.version}
        onOpenTechnical={() => setTechnicalOpen(true)}
      />

      <PrimaryStatus state={sim.state} />

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 md:px-7 md:py-3.5 flex flex-col gap-3.5">
        {/* Main visualization + decision panel */}
        <div className="flex flex-col lg:flex-row gap-3.5 flex-none lg:flex-1 shrink-0">
          {/* Main Panel */}
          <div className="flex-1 flex flex-col gap-3.5 min-w-0">
            <TacticalSpectrumStrip state={sim.state} />
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[300px] lg:min-h-[400px] p-4 lg:p-[18px]">
              <FrequencyActivity
                scanHistory={sim.state.scanHistory}
                predictedFrequency={sim.state.predictedFrequency}
                bandsMhz={sim.state.bandsMhz}
              />
            </div>
          </div>
          {/* Sidebar Controls */}
          <div className="flex-none w-full lg:w-[260px] xl:w-[280px] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col p-4 lg:p-5 shrink-0 self-start">
            <SimulationControls
              running={sim.running}
              scenario={sim.scenario}
              setScenario={sim.setScenario}
              scenarioOptions={sim.scenarioOptions}
              selectedSchedulerId={sim.selectedSchedulerId}
              setSelectedSchedulerId={sim.setSelectedSchedulerId}
              schedulerOptions={sim.schedulerOptions}
              actions={sim.actions}
            />
          </div>
        </div>

        {/* Performance */}
        <div className="flex flex-col lg:flex-row gap-3.5 flex-none shrink-0">
          <div className="flex-none w-full lg:w-[45%] xl:w-[38%] bg-white border border-slate-200 rounded-2xl shadow-sm p-4 lg:px-[22px] lg:py-4 self-start">
            <PerformancePanel metrics={sim.metrics} />
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 lg:px-5 lg:pt-3.5 lg:pb-2.5 min-h-[250px] lg:min-h-[280px]">
            <PerformanceChart data={sim.metrics.interceptionRateHistory} />
          </div>
        </div>

      </main>

      <TechnicalDrawer
        open={technicalOpen}
        onClose={() => setTechnicalOpen(false)}
        receiver={sim.receiver}
        scheduler={sim.scheduler}
        state={sim.state}
        metrics={sim.metrics}
        connectionStatus={sim.connectionStatus}
        isDemo={sim.isDemo}
        onOpenEmitters={() => {
          setEmittersOpen(true);
        }}
        onOpenBenchmarks={() => {
          setBenchmarksOpen(true);
        }}
      />

      <EmitterDrawer open={emittersOpen} onClose={() => setEmittersOpen(false)} emitters={sim.emitters} />
      <BenchmarkPanel open={benchmarksOpen} onClose={() => setBenchmarksOpen(false)} benchmarks={sim.benchmarks} />
    </div>
  );
}
