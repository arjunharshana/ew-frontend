import { useState } from 'react';
import ScenarioSelector from './ScenarioSelector.jsx';
import SchedulerSelector from './SchedulerSelector.jsx';

const SPEEDS = ['0.5×', '1×', '2×', '5×'];

function Button({ children, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 13,
        fontWeight: 500,
        padding: '7px 14px',
        borderRadius: 'var(--radius-sm)',
        border: primary ? 'none' : '1px solid var(--border)',
        background: primary ? 'var(--blue)' : 'transparent',
        color: primary ? '#fff' : 'var(--text-primary)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function SimulationControls({ running, scenario, setScenario, scenarioOptions, selectedSchedulerId, setSelectedSchedulerId, schedulerOptions, actions }) {
  const [speed, setSpeed] = useState('1×');
  const [seed, setSeed] = useState(42);

  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>⚙️</span>
        <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-secondary)' }}>
          Simulation Controls
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Scenario</label>
          <ScenarioSelector 
            scenario={scenario} 
            onChange={(newScenario) => {
              setScenario(newScenario);
              actions.restart(newScenario, selectedSchedulerId, seed, speed.replace('×', 'x'), running);
            }} 
            options={scenarioOptions} 
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Scan Strategy Algorithm</label>
          <SchedulerSelector 
            selectedId={selectedSchedulerId} 
            onChange={(newSchedulerId) => {
              setSelectedSchedulerId(newSchedulerId);
              actions.restart(scenario, newSchedulerId, seed, speed.replace('×', 'x'), running);
            }} 
            options={schedulerOptions} 
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Random Seed</label>
          <input 
            type="number" 
            value={seed} 
            onChange={e => setSeed(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-page)',
              color: 'var(--text-primary)',
              fontSize: 13,
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {!running ? (
            <Button primary onClick={() => actions.start(speed.replace('×', 'x'))}>▶ Start</Button>
          ) : (
            <Button onClick={actions.pause}>⏸ Pause</Button>
          )}
          <Button onClick={actions.reset}>↺ Reset</Button>
          <Button onClick={actions.stop}>⏹ Stop</Button>
          <Button onClick={actions.step}>⏭ Step</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Execution Speed</label>
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSpeed(s);
                  if (actions.setSpeed) actions.setSpeed(s.replace('×', 'x'));
                }}
                style={{
                  flex: 1,
                  fontSize: 12.5,
                  padding: '8px 0',
                  border: 'none',
                  background: speed === s ? 'var(--bg-surface-secondary)' : 'transparent',
                  color: speed === s ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: speed === s ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

const menuItemStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 13,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: 'var(--text-primary)',
};
