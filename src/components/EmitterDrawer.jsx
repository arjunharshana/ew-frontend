export default function EmitterDrawer({ open, onClose, emitters }) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-[#172033]/25 z-30" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-md z-[31] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold m-0">Emitters</h2>
          <button onClick={onClose} className="border-none bg-transparent text-lg cursor-pointer text-slate-600 hover:text-slate-900">
            ×
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {emitters.map((e) => (
            <div
              key={e.id}
              className="flex justify-between items-center px-3.5 py-3 bg-slate-100 rounded-xl"
            >
              <div>
                <div className="text-[13.5px] font-medium">{e.name}</div>
                <div className="text-[12.5px] text-slate-600">
                  {e.type} · {e.behavior}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-[3px] rounded-full ${
                  e.status === 'Active' ? 'text-green-500 bg-green-50' : 'text-slate-400 bg-white'
                }`}
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
