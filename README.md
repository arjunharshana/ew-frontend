# Smart Scan Strategy — Dashboard (SIH26055)

React + Vite frontend, wired to the real `ew-scheduler-backend` (Node/Express) session API.
**UI/components are unchanged from the original design** — only the data layer
(`src/services/api.js`, `src/hooks/useWebSocket.js`, `src/hooks/useSimulation.js`) was rewritten
to match the backend's actual, confirmed contract instead of the original guessed one.

## Run it

```bash
npm install
npm run dev
```

Needs `ew-scheduler-backend` running on port 4000 (see that repo's README). Dev server proxies
`/api`, `/sessions`, `/health`, and `/ws` to it — see `vite.config.js`. Override with
`VITE_BACKEND_URL` if your backend runs elsewhere.

## What changed from the original repo, and why

The original `api.js`/`useSimulation.js` were written against a **guessed** backend shape:
flat REST endpoints (`/simulation/state`, `/metrics`, `/scheduler`...) and a plain WebSocket
emitting typed events (`SCAN_RESULT`, `HIT`, `METRIC_UPDATE`...). The real backend is different
in an important way:

- **It's session-based, not a single global `/simulation/state`.** You `POST /sessions` to start
  one (with a `scenarioName` + `schedulerName`), then read `/sessions/:id/metrics` or listen on
  the WebSocket relay for that session's telemetry.
- **Telemetry is one deeply-nested object per tick**, not a stream of discrete typed events. Every
  WS message (or `/api/telemetry` response) is `{ system_status, primary_prediction, detector,
  performance, arbitration, latency, neural_model, bands_mhz, recent_timeline, waterfall_events }`
  — see `ew-scheduler-backend/src/types/domain.ts` (`Telemetry` type) for the authoritative shape.
- **Figures of merit are already computed** (`telemetry.performance.interception_ratio_pct`,
  `.detection_rate_pct`, etc.) — the frontend doesn't need to derive Pd/interception-rate itself.

### The three files that changed

- **`src/services/api.js`** — REST calls now hit `/api/*` (catalogs + current telemetry, proxied
  from the ML API) and `/sessions/*` (session lifecycle: start/pause/resume/complete/step/metrics/
  history), matching `ew-scheduler-backend/src/routes/*.ts` exactly.
- **`src/hooks/useWebSocket.js`** — connection/reconnect/backoff logic is unchanged; it now points
  at our backend's relay socket (`/ws`) instead of a hypothetical `/ws/simulation`.
- **`src/hooks/useSimulation.js`** — this is where the real mapping work is. Three pure functions
  (`telemetryToState`, `telemetryToMetrics`, `telemetryToScheduler`, `telemetryToReceiver`) convert
  one real `Telemetry` snapshot into the exact flat shapes every component already expects
  (`state.currentFrequency`, `metrics.interceptionRate`, etc.) — components were **not changed**,
  they still consume the same field names as before.

### Two small, deliberate UI-adjacent changes (not visual changes)

1. **`ScenarioSelector.jsx`** no longer hardcodes `['Basic', 'Periodic', 'Frequency Agile', 'Mixed
   Environment']` — those don't exist on the real backend (real scenario IDs are things like
   `1_Seen_Structure`, `7_Random_Hopping`). It now accepts an `options` prop (falls back to a
   placeholder list if empty, so it still renders before the catalog loads). Same dropdown, same
   styling, same behavior — just fed real data instead of fake strings.
2. **`SimulationControls.jsx`** / **`App.jsx`** pass `scenarioOptions` through as a prop so the
   selector above has something real to show. No visual change.

## Known gaps / fields not yet in the confirmed telemetry contract

These UI fields are retained from demo data because the backend's confirmed `Telemetry` shape
doesn't carry them yet — they won't update once live data starts flowing, until/unless the ML
team's API exposes them (flag to them if these matter for the demo):

- `state.dwell` (steps in current dwell)
- `metrics.predictionAccuracy`, `.averageInterceptTime`, `.averageReward`,
  `.falseAlarmProbability`, `.uniqueEmittersDetected`, `.timeToFirstIntercept`
- `scheduler.hiddenStateEnergy`, `.cellStateEnergy` (LSTM internals — these may not apply at all
  to a DDQN/hybrid scheduler; check with the ML team whether the "LSTM internals" section in
  Technical mode still makes sense for their actual architecture, or should be relabeled)
- `receiver.pd`, `.pfa`, `.centerFrequency` (the closest real analogue,
  `performance.detection_rate_pct`, is already surfaced elsewhere in the UI)
- `benchmarks` (BenchmarkPanel) — still demo data; the real `/api/benchmark` response's exact
  shape needs confirming against what `BenchmarkPanel.jsx` expects (`{scenarios: [{name, values:
  {modelName: pct}}]}`) before wiring it live — see the TODO comment in `useSimulation.js`.

`state.pattern` is mapped from `telemetry.arbitration.mode` (e.g. `"DDQN_EXPLOIT"`,
`"WHITTLE_INDEX"`) rather than a human scan-pattern label like `"Hopping"` — these read
differently in the UI than the original demo data. Consider a small label-mapping table if the
raw arbitration-mode strings look too technical for the "Pattern:" field in `NextScanPanel`.

## Everything else

Unchanged from the original repo — see the component list, layout description, and accuracy notes
in the original README below.

---

### Layout (unchanged)

- `Header` — scheduler version, running/paused state, live connection dot, entry point into
  Technical mode.
- `PrimaryStatus` — current scan, predicted next, confidence.
- `FrequencyActivity` — canvas-based frequency/time plot.
- `NextScanPanel` — next scan decision explanation + decision contribution split.
- `PerformancePanel` / `PerformanceChart` — headline metrics + interception rate over time.
- `ScanTimeline` — compact recent-scan history.
- `SimulationControls` — scenario, start/pause/reset, stop/step, demo-only speed control.
- `TechnicalDrawer`, `EmitterDrawer`, `BenchmarkPanel` — secondary panels.

### Notes on accuracy (unchanged)

- Ground truth is off by default and labeled "Evaluation only — not used by scheduler."
- Model state shown as "Frozen (inference only)" in Technical mode, per the project's requirement.
