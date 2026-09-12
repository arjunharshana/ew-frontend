import { resultColor, resultSymbol } from '../utils/formatters.js';

export default function ScanTimeline({ recentScans }) {
  return (
    <div>
      <span className="text-[12.5px] text-slate-600 block mb-2">
        Recent scans
      </span>
      <div className="flex items-center gap-0">
        {recentScans.map((scan, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="mono text-[13.5px] font-medium">
                {scan.freq}
              </span>
              <span className="text-xs mt-0.5" style={{ color: resultColor(scan.result) }}>
                {resultSymbol(scan.result)}
              </span>
            </div>
            {i < recentScans.length - 1 && (
              <span className="w-[18px] h-[1px] bg-slate-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
