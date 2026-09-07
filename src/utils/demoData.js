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
      values: { 'V4.1 LSTM-Hybrid': 80.0, 'Context-Aware': 26.9, 'V3.1 DDQN': 49.6, 'V4.0 Hybrid': 49.1 },
    },
    {
      name: 'Unseen Permutation',
      values: { 'V4.1 LSTM-Hybrid': 82.3, 'Context-Aware': 31.4, 'V3.1 DDQN': 50.1, 'V4.0 Hybrid': 44.6 },
    },
    {
      name: 'Unseen Phase',
      values: { 'V4.1 LSTM-Hybrid': 84.7, 'Context-Aware': 30.4, 'V3.1 DDQN': 50.3, 'V4.0 Hybrid': 43.8 },
    },
    {
      name: 'Unseen Subset',
      values: { 'V4.1 LSTM-Hybrid': 24.3, 'Context-Aware': 27.4, 'V3.1 DDQN': 2.9, 'V4.0 Hybrid': 22.3 },
    },
    {
      name: 'Periodic Burst',
      values: { 'V4.1 LSTM-Hybrid': 68.8, 'Context-Aware': 51.3, 'V3.1 DDQN': 16.7, 'V4.0 Hybrid': 78.5 },
    },
  ],
};

export const FREQ_BIN_TABLE = FREQ_BINS;

export function freqToBin(freq) {
  const match = FREQ_BINS.find((b) => b.freq === freq);
  return match ? match.bin : Math.round(freq / 50);
}
