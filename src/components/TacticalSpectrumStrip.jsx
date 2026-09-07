import React from 'react';

export default function TacticalSpectrumStrip({ state }) {
  // If bandsMhz is not available, we can mock it based on the screenshot (110 to 690 step 20)
  const bands = state.bandsMhz && state.bandsMhz.length > 0 ? state.bandsMhz : Array.from({ length: 30 }, (_, i) => 110 + i * 20);

  // Get the most recent scan to determine if there was a hit
  const lastScan = state.scanHistory && state.scanHistory.length > 0 
    ? state.scanHistory[state.scanHistory.length - 1] 
    : null;

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>📡</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            TACTICAL SPECTRUM STRIP ({bands.length} CHANNELS • {Math.min(...bands)} MHz — {Math.max(...bands)} MHz • 20 MHz IBW)
          </span>
        </div>
        
        {/* Legends */}
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, background: 'var(--cyan)', borderRadius: 2 }}></div>
            Tuned Channel
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, border: '1px dashed var(--amber)', borderRadius: 2 }}></div>
            Next Target
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, background: 'var(--green)', borderRadius: 2 }}></div>
            Signal Hit
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, background: 'var(--red)', borderRadius: 2 }}></div>
            Emitter Truth
          </div>
        </div>
      </div>

      {/* Strip */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 8
      }}>
        {bands.map((freq, i) => {
          const isTuned = state.currentFrequency === freq;
          const isNext = state.predictedFrequency === freq;
          const isHit = lastScan && lastScan.freq === freq && lastScan.result === 'hit';
          
          // Emitter truth is not explicitly in state for the frontend, but we support rendering it
          // if it ever gets added. (Mocking for B10 / 310 MHz as seen in the original screenshot if it's the demo)
          const isTruth = state.emitterTruths?.includes(freq) || (state.source === 'demo' && freq === 310);
          
          let border = '1px solid var(--border-strong)';
          let bg = 'var(--bg-page)';
          let textColor = 'var(--text-primary)';
          let numColor = 'var(--text-muted)';
          
          if (isHit) {
            bg = 'rgba(34, 197, 94, 0.25)'; // stronger green tint
            border = '2px solid var(--green)';
            numColor = 'var(--green)';
          } else if (isTuned) {
            bg = 'rgba(6, 182, 212, 0.25)'; // stronger cyan tint
            border = '2px solid var(--cyan)';
            numColor = 'var(--cyan)';
          }
          
          // Next target outline overlaps the existing background
          if (isNext) {
            border = '2px dashed var(--amber)';
            numColor = 'var(--amber)';
          }

          return (
            <div key={i} style={{
              boxSizing: 'border-box',
              minWidth: 46,
              height: 48,
              border,
              background: bg,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              position: 'relative',
              flexShrink: 0
            }}>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>B{i}</span>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: numColor }}>{freq}</span>
              
              {/* Emitter Truth Dot */}
              {isTruth && (
                <div style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 8,
                  height: 8,
                  background: 'var(--red)',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 2px var(--bg-surface)'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
