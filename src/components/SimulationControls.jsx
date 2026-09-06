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
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 28px',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <ScenarioSelector 
          scenario={scenario} 
          onChange={(newScenario) => {
            setScenario(newScenario);
            actions.restart(newScenario, selectedSchedulerId);
          }} 
          options={scenarioOptions} 
        />
        <SchedulerSelector 
          selectedId={selectedSchedulerId} 
          onChange={(newSchedulerId) => {
            setSelectedSchedulerId(newSchedulerId);
            actions.restart(scenario, newSchedulerId);
          }} 
          options={schedulerOptions} 
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {!running ? (
          <Button primary onClick={actions.start}>▶ Start</Button>
        ) : (
          <Button onClick={actions.pause}>Pause</Button>
        )}
        <Button onClick={actions.reset}>Reset</Button>

        <Button onClick={actions.stop}>Stop</Button>
        <Button onClick={actions.step}>Step</Button>

        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginLeft: 6 }}>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                fontSize: 12.5,
                padding: '6px 10px',
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
    </footer>
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
