import { resultColor, resultSymbol } from '../utils/formatters.js';

export default function ScanTimeline({ recentScans }) {
  return (
    <div>
      <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
        Recent scans
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {recentScans.map((scan, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 44 }}>
              <span className="mono" style={{ fontSize: 13.5, fontWeight: 500 }}>
                {scan.freq}
              </span>
              <span style={{ fontSize: 12, color: resultColor(scan.result), marginTop: 2 }}>
                {resultSymbol(scan.result)}
              </span>
            </div>
            {i < recentScans.length - 1 && (
              <span style={{ width: 18, height: 1, background: 'var(--border-strong)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
