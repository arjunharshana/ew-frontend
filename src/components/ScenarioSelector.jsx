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
      style={{
        fontSize: 13,
        color: 'var(--text-primary)',
        background: 'var(--bg-surface-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 12px',
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxSizing: 'border-box'
      }}
    >
      {scenarios.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
