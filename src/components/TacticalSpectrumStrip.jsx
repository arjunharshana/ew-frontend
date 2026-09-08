import React from 'react';

export default function TacticalSpectrumStrip({ state }) {
  // Hardcoded to 110 to 690 MHz as requested
  const bands = Array.from({ length: 30 }, (_, i) => 110 + i * 20);

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
          <span style={{ fontSize: 20 }}>📡</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            TACTICAL SPECTRUM STRIP ({bands.length} CHANNELS • {Math.min(...bands)} MHz — {Math.max(...bands)} MHz • 20 MHz IBW)
          </span>
        </div>
        
        {/* Legends */}
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
            <div style={{ width: 14, height: 14, background: 'var(--blue)', borderRadius: 3, boxShadow: '0 0 6px rgba(59, 130, 246, 0.5)' }}></div>
            Tuned Channel
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
            <div style={{ width: 14, height: 14, border: '2px dashed var(--amber)', borderRadius: 3 }}></div>
            Next Target
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
            <div style={{ width: 14, height: 14, background: 'var(--green)', borderRadius: 3, boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)' }}></div>
            Signal Hit
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
            <div style={{ width: 14, height: 14, background: 'var(--red)', borderRadius: 3, boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)' }}></div>
            Emitter Truth
          </div>
        </div>
      </div>

      {/* Strip */}
      <div style={{
        display: 'flex',
        gap: 4,
        overflowX: 'hidden',
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
            bg = 'rgba(16, 185, 129, 0.15)';
            border = '2px solid var(--green)';
            numColor = 'var(--green)';
          } else if (isTuned) {
            bg = 'rgba(59, 130, 246, 0.15)';
            border = '2px solid var(--blue)';
            numColor = 'var(--blue)';
          }
          
          // Next target outline overlaps the existing background
          if (isNext) {
            border = '2px dashed var(--amber)';
            numColor = 'var(--amber)';
          }

          return (
            <div key={i} style={{
              boxSizing: 'border-box',
              flex: 1,
              minWidth: 0,
              height: 52,
              border,
              background: bg,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              position: 'relative',
              boxShadow: isHit ? '0 0 12px rgba(16, 185, 129, 0.2)' : (isTuned ? '0 0 12px rgba(59, 130, 246, 0.2)' : 'none')
            }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-secondary)' }}>B{i}</span>
              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: numColor, letterSpacing: -0.5 }}>{freq}</span>
              
              {/* Emitter Truth Dot */}
              {isTruth && (
                <div style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 12,
                  height: 12,
                  background: 'var(--red)',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 3px var(--bg-surface), 0 0 8px rgba(239, 68, 68, 0.8)'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
