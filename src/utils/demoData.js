// Fallback data used only when the backend REST/WebSocket APIs are unreachable.
// Structure intentionally mirrors what the real backend returns so that
// components never need to know whether they're looking at live or demo data.

const FREQ_BINS = Array.from({ length: 30 }, (_, i) => ({
  bin: i,
  freq: 110 + i * 20,
}));

function makeScanHistory(steps = 40) {
  const history = [];
  let t = 0;
  const seq = [230, 290, 450, 610, 510, 190, 310, 450, 590, 630];
  for (let i = 0; i < steps; i++) {
    const freq = seq[i % seq.length];
    const outcomes = ['hit', 'hit', 'hit', 'miss', 'hit', 'hit', 'false_alarm'];
    const result = outcomes[i % outcomes.length];
    history.push({ t: t++, freq, result });
  }
  return history;
}

export const demoScanHistory = makeScanHistory(70);

export const demoState = {
  source: 'demo',
  timestep: 342,
  currentFrequency: 450,
  currentBin: 17,
  predictedFrequency: 610,
  predictedBin: 25,
  confidence: 0.88,
  confidenceLabel: 'High confidence',
  pattern: 'Hopping',
  dwell: 3,
  explanation:
    'The scheduler expects the emitter to transition to 450 MHz after completing its current dwell.',
  decisionMix: { lstm: 0.84, contextAware: 0.16 },
  qValue: 2.31,
  scanHistory: demoScanHistory,
  activeScenario: '1_Seen_Structure',
  recentScans: [
    { freq: 230, result: 'hit' },
    { freq: 290, result: 'hit' },
    { freq: 450, result: 'hit' },
    { freq: 610, result: 'miss' },
    { freq: 510, result: 'hit' },
    { freq: 190, result: 'hit' },
    { freq: 310, result: 'hit' },
  ],
  bandsMhz: Array.from({ length: 30 }, (_, i) => 110 + i * 20),
};

export const demoMetrics = {
  source: 'demo',
  interceptionRate: 0.8,
  detectionProbability: 0.92,
  predictionAccuracy: 0.87,
  averageInterceptTime: 1.24,
  averageReward: 0.72,
  falseAlarmProbability: 0.06,
  totalScans: 342,
  uniqueEmittersDetected: 3,
  timeToFirstIntercept: 0.8,
  interceptionRateHistory: Array.from({ length: 30 }, (_, i) => ({
    t: i,
    rate: 0.4 + 0.4 * (1 - Math.exp(-i / 8)) + (Math.sin(i / 3) * 0.02),
  })),
  decisionModeHistory: Array.from({ length: 30 }, (_, i) => ({
    t: i,
    lstm: 0.55 + 0.3 * Math.sin(i / 6) * 0.5 + 0.15,
    contextAware: 0,
  })).map((d) => ({ ...d, contextAware: 1 - d.lstm })),
};

export const demoEmitters = [
  { id: 'E01', name: 'Emitter 01', type: 'Radar', behavior: 'Hopping', status: 'Active' },
  { id: 'E02', name: 'Emitter 02', type: 'Communication', behavior: 'Periodic', status: 'Active' },
  { id: 'E03', name: 'Emitter 03', type: 'Radar', behavior: 'Sweep', status: 'Idle' },
];

export const demoReceiver = {
  centerFrequency: 400,
  instantaneousBandwidth: 100,
  sensitivity: -85,
  pd: 0.92,
  pfa: 0.06,
};

export const demoScheduler = {
  version: 'V4.1 LSTM-Hybrid',
  decisionMode: 'LSTM exploit',
  qValues: { 230: 0.4, 290: 0.8, 310: 1.1, 450: 2.31, 510: 0.6, 610: 0.9 },
  confidence: 0.88,
  hiddenStateEnergy: 4.82,
  cellStateEnergy: 3.14,
};

export const demoBenchmarks = {
  scenarios: [
    {
      name: 'Seen Structure',
      values: { 'V4.0 Hybrid': 50.62, 'Whittle W3': 48.33, 'Context-Aware': 26.90, 'V4.1 LSTM': 46.10, 'V5.0 Belief': 24.33 }
    },
    {
      name: 'Unseen Permutation',
      values: { 'V4.0 Hybrid': 40.48, 'Whittle W3': 38.67, 'Context-Aware': 31.40, 'V4.1 LSTM': 32.20, 'V5.0 Belief': 21.00 }
    },
    {
      name: 'Unseen Phase',
      values: { 'V4.0 Hybrid': 45.70, 'Whittle W3': 42.67, 'Context-Aware': 30.40, 'V4.1 LSTM': 35.80, 'V5.0 Belief': 22.33 }
    },
    {
      name: 'Unseen Dwell',
      values: { 'V4.0 Hybrid': 18.25, 'Whittle W3': 16.50, 'Context-Aware': 24.53, 'V4.1 LSTM': 12.40, 'V5.0 Belief': 9.33 }
    },
    {
      name: 'Unseen Subset',
      values: { 'V4.0 Hybrid': 31.20, 'Whittle W3': 31.00, 'Context-Aware': 31.20, 'V4.1 LSTM': 22.50, 'V5.0 Belief': 14.00 }
    },
    {
      name: 'Mixed Frequency Shift',
      values: { 'V4.0 Hybrid': 33.60, 'Whittle W3': 32.50, 'Context-Aware': 33.60, 'V4.1 LSTM': 21.80, 'V5.0 Belief': 13.67 }
    },
    {
      name: 'Pseudo-Random Hopping',
      values: { 'V4.0 Hybrid': 33.40, 'Whittle W3': 35.20, 'Context-Aware': 35.50, 'V4.1 LSTM': 21.00, 'V5.0 Belief': 9.00 }
    },
    {
      name: 'Periodic Burst',
      values: { 'V4.0 Hybrid': 28.30, 'Whittle W3': 30.30, 'Context-Aware': 35.70, 'V4.1 LSTM': 23.40, 'V5.0 Belief': 9.20 }
    }
  ],
};

export const FREQ_BIN_TABLE = FREQ_BINS;

export function freqToBin(freq) {
  const match = FREQ_BINS.find((b) => b.freq === freq);
  return match ? match.bin : Math.round(freq / 50);
}
