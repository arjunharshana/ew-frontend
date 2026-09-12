export default function StatusIndicator({ status }) {
  const config = {
    live: { colorClass: 'bg-green-500', label: 'Live' },
    connecting: { colorClass: 'bg-amber-500', label: 'Connecting' },
    offline: { colorClass: 'bg-slate-400', label: 'Offline' },
  }[status] ?? { colorClass: 'bg-slate-400', label: 'Offline' };

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[13px] text-slate-600"
      title={status === 'offline' ? 'Telemetry connection lost — reconnecting…' : undefined}
    >
      <span
        className={`w-[7px] h-[7px] rounded-full ${config.colorClass}`}
      />
      {config.label}
    </span>
  );
}
