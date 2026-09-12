import StatusIndicator from './StatusIndicator.jsx';

export default function Header({ running, connectionStatus, schedulerVersion, onOpenTechnical }) {
  return (
    <header className="flex flex-wrap md:flex-nowrap items-center justify-between py-4 px-4 md:px-7 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 gap-4">
      {/* App Title */}
      <div className="flex-1 min-w-[150px]">
        <h1 className="text-[24px] md:text-[32px] font-extrabold m-0 tracking-[0.05em] font-mono bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent leading-none">
          PRISM
        </h1>
        <div className="text-[12px] md:text-[15px] text-slate-600 mt-1 md:mt-1.5 font-medium tracking-[-0.01em] hidden md:block">
          Predictive Receiver for Intelligent Spectrum Monitoring
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5 flex-1 min-w-[280px]">
        <span
          className={`inline-flex items-center gap-1.5 text-[12px] md:text-[13px] font-medium ${running ? 'text-green-500' : 'text-slate-400'}`}
        >
          <span
            className={`w-[6px] h-[6px] md:w-[7px] md:h-[7px] rounded-full ${running ? 'bg-green-500' : 'bg-slate-400'}`}
          />
          {running ? 'Running' : 'Paused'}
        </span>

        <span className="mono text-[11.5px] md:text-[12.5px] text-slate-600 hidden sm:inline">
          {schedulerVersion}
        </span>

        <StatusIndicator status={connectionStatus} />

        <button
          onClick={onOpenTechnical}
          className="text-[12px] md:text-[13px] text-slate-600 bg-transparent border border-slate-200 rounded-lg px-2.5 py-1 md:px-3 md:py-1.5 cursor-pointer hover:bg-slate-50 shrink-0"
        >
          Technical
        </button>
      </div>
    </header>
  );
}
