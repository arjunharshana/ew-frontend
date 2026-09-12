// UI is unchanged from the original component - the only difference is that
// the option list now comes from the real backend (via props) instead of a
// hardcoded fake list, since the ML API's actual scenario IDs
// (e.g. "1_Seen_Structure") don't match the original placeholder strings.
// Falls back to a small static list so the control still renders before the
// real scenario list has loaded.
const FALLBACK_SCENARIOS = [{ id: 'default', name: 'Default' }];

export default function ScenarioSelector({ scenario, onChange, disabled, options }) {
  const scenarios = options && options.length > 0 ? options : FALLBACK_SCENARIOS;

  return (
    <select
      value={scenario}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`text-[13px] text-slate-900 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 w-full box-border ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {scenarios.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
