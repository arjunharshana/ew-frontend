export function formatMHz(freq) {
  if (freq === null || freq === undefined) return '—';
  return `${freq} MHz`;
}

export function formatPercent(value, digits = 0) {
  if (value === null || value === undefined) return '—';
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatSeconds(value, digits = 2) {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(digits)} s`;
}

export function confidenceLabel(confidence) {
  if (confidence >= 0.75) return 'High confidence';
  if (confidence >= 0.5) return 'Moderate confidence';
  return 'Low confidence';
}

export function resultColor(result) {
  switch (result) {
    case 'hit':
      return 'var(--green)';
    case 'miss':
      return 'var(--muted)';
    case 'false_alarm':
      return 'var(--red)';
    default:
      return 'var(--muted)';
  }
}

export function resultSymbol(result) {
  switch (result) {
    case 'hit':
      return '✓';
    case 'false_alarm':
      return '×';
    default:
      return '–';
  }
}
