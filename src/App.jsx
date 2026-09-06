import { useState } from 'react';
import Header from './components/Header.jsx';
import PrimaryStatus from './components/PrimaryStatus.jsx';
import FrequencyActivity from './components/FrequencyActivity.jsx';
import NextScanPanel from './components/NextScanPanel.jsx';
import PerformancePanel from './components/PerformancePanel.jsx';
import PerformanceChart from './components/PerformanceChart.jsx';
import ScanTimeline from './components/ScanTimeline.jsx';
import SimulationControls from './components/SimulationControls.jsx';
import TechnicalDrawer from './components/TechnicalDrawer.jsx';
import EmitterDrawer from './components/EmitterDrawer.jsx';
import BenchmarkPanel from './components/BenchmarkPanel.jsx';
import { useSimulation } from './hooks/useSimulation.js';

const card = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-sm)',
};

export default function App() {
  const sim = useSimulation();
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [emittersOpen, setEmittersOpen] = useState(false);
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--bg-page)',
      }}
    >
      <Header
        running={sim.running}
        connectionStatus={sim.isDemo ? 'offline' : sim.connectionStatus}
        schedulerVersion={sim.scheduler.version}
        onOpenTechnical={() => setTechnicalOpen(true)}
      />

      <PrimaryStatus state={sim.state} />

      <main
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          padding: '14px 28px',
          overflow: 'hidden',
        }}
      >
        {/* Main visualization + decision panel */}
        <div style={{ flex: '1 1 58%', minHeight: 0, display: 'flex', gap: 14 }}>
          <div style={{ ...card, flex: '1 1 68%', minHeight: 0, padding: 18 }}>
            <FrequencyActivity
              scanHistory={sim.state.scanHistory}
              predictedFrequency={sim.state.predictedFrequency}
              bandsMhz={sim.state.bandsMhz}
            />
          </div>
          <div style={{ ...card, flex: '0 0 300px', minHeight: 0, padding: 22, overflowY: 'auto' }}>
            <NextScanPanel state={sim.state} />
          </div>
        </div>

        {/* Performance */}
        <div style={{ flex: '0 0 auto', display: 'flex', gap: 14, height: '26%', minHeight: 130 }}>
          <div style={{ ...card, flex: '1 1 38%', padding: '16px 22px', minHeight: 0 }}>
            <PerformancePanel metrics={sim.metrics} />
          </div>
          <div style={{ ...card, flex: '1 1 62%', padding: '14px 20px 10px', minHeight: 0 }}>
            <PerformanceChart data={sim.metrics.interceptionRateHistory} />
          </div>
        </div>

        {/* Recent scans */}
        <div style={{ ...card, flex: '0 0 auto', padding: '12px 22px' }}>
          <ScanTimeline recentScans={sim.state.recentScans} />
        </div>
      </main>

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
