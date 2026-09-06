import { useEffect, useRef, useState, useCallback } from 'react';
import { FREQ_BIN_TABLE } from '../utils/demoData.js';

const COLORS = {
  grid: '#EEF2F7',
  axis: '#CBD5E1',
  axisText: '#64748B',
  trajectory: '#94A3B8',
  hit: '#16A34A',
  miss: '#94A3B8',
  falseAlarm: '#DC2626',
  predicted: '#D97706',
};

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 320 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size];
}

export default function FrequencyActivity({ scanHistory, predictedFrequency, bandsMhz }) {
  const [containerRef, size] = useElementSize();
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);

  // Fallback to FREQ_BIN_TABLE if bandsMhz is missing
  const freqValues = bandsMhz && bandsMhz.length > 0 ? bandsMhz : FREQ_BIN_TABLE.map((b) => b.freq);
  const minFreq = Math.min(...freqValues);
  const maxFreq = Math.max(...freqValues);

  const padding = { top: 16, right: 24, bottom: 28, left: 52 };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = size;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const history = scanHistory?.length ? scanHistory.slice(-70) : [];
    let tMin = history.length > 0 ? history[0].t : 0;
    let tMax = history.length > 0 ? history[history.length - 1].t + 1 : 10;

    // Enforce a minimum time window so points don't stretch across the whole graph on restart
    const MIN_WINDOW = 40;
    if (tMax - tMin < MIN_WINDOW) {
      tMin = Math.max(0, tMax - MIN_WINDOW);
    }

    const xForT = (t) => padding.left + ((t - tMin) / (tMax - tMin)) * plotW;
    const yForFreq = (f) => padding.top + (1 - (f - minFreq) / (maxFreq - minFreq)) * plotH;

    const labelStep = Math.max(1, Math.ceil(freqValues.length / 8));

    // grid lines (frequency bins)
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    freqValues.forEach((f, i) => {
      if (i % labelStep !== 0 && i !== freqValues.length - 1 && i !== 0) return;
      const y = yForFreq(f);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    });

    // axis labels (frequency)
    ctx.fillStyle = COLORS.axisText;
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    freqValues.forEach((f, i) => {
      if (i % labelStep !== 0 && i !== freqValues.length - 1 && i !== 0) return;
      const y = yForFreq(f);
      ctx.fillText(`${f}`, padding.left - 10, y);
    });

    // baseline axis
    ctx.strokeStyle = COLORS.axis;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    if (history.length > 0) {
      // trajectory line
      ctx.strokeStyle = COLORS.trajectory;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      history.forEach((pt, i) => {
        const x = xForT(pt.t);
        const y = yForFreq(pt.freq);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // scan markers
      history.forEach((pt) => {
        const x = xForT(pt.t);
        const y = yForFreq(pt.freq);
        const color =
          pt.result === 'hit' ? COLORS.hit : pt.result === 'false_alarm' ? COLORS.falseAlarm : COLORS.miss;
        ctx.beginPath();
        ctx.arc(x, y, pt.result === 'hit' ? 3 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // predicted next marker — placed one step ahead of the last scan
      if (predictedFrequency !== undefined && predictedFrequency !== null) {
        const lastT = history[history.length - 1].t;
        const x = xForT(lastT + 1);
        const y = yForFreq(predictedFrequency);
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x + 5, y);
        ctx.lineTo(x, y + 5);
        ctx.lineTo(x - 5, y);
        ctx.closePath();
        ctx.fillStyle = COLORS.predicted;
        ctx.fill();

        // dashed connector from last actual point to prediction
        const lastX = xForT(lastT);
        const lastY = yForFreq(history[history.length - 1].freq);
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = COLORS.predicted;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [scanHistory, predictedFrequency, bandsMhz, size]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseMove = (e) => {
    if (!scanHistory?.length) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const history = scanHistory.slice(-70);
    let tMin = history[0].t;
    let tMax = history[history.length - 1].t + 1;
    
    const MIN_WINDOW = 40;
    if (tMax - tMin < MIN_WINDOW) {
      tMin = Math.max(0, tMax - MIN_WINDOW);
    }
    const plotW = rect.width - padding.left - padding.right;
    const plotH = rect.height - padding.top - padding.bottom;
    const xForT = (t) => padding.left + ((t - tMin) / (tMax - tMin)) * plotW;
    const yForFreq = (f) => padding.top + (1 - (f - minFreq) / (maxFreq - minFreq)) * plotH;

    let closest = null;
    let closestDist = Infinity;
    history.forEach((pt) => {
      const x = xForT(pt.t);
      const y = yForFreq(pt.freq);
      const d = Math.hypot(x - mx, y - my);
      if (d < closestDist) {
        closestDist = d;
        closest = { ...pt, x, y };
      }
    });

    if (closest && closestDist < 14) {
      setHover({ ...closest, mx, my });
    } else {
      setHover(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <h2 style={{ fontSize: 14.5, fontWeight: 600, margin: 0 }}>Frequency activity</h2>
          <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Receiver scan history and detected transmissions
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--text-secondary)' }}>
          <LegendDot color={COLORS.hit} label="Intercepted" />
          <LegendDot color={COLORS.miss} label="Miss" />
          <LegendDot color={COLORS.falseAlarm} label="False alarm" />
          <LegendDiamond color={COLORS.predicted} label="Predicted" />
        </div>
      </div>

      <div ref={containerRef} style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHover(null)}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
        {hover && (
          <div
            style={{
              position: 'absolute',
              left: Math.min(hover.mx + 12, size.width - 130),
              top: Math.max(hover.my - 46, 0),
              background: 'var(--text-primary)',
              color: '#fff',
              fontSize: 12,
              borderRadius: 6,
              padding: '6px 9px',
              pointerEvents: 'none',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
            }}
          >
            <div className="mono">{hover.freq} MHz · t={hover.t}</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', textTransform: 'capitalize' }}>
              {hover.result.replace('_', ' ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label}
    </span>
  );
}

function LegendDiamond({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span
        style={{
          width: 7,
          height: 7,
          background: color,
          display: 'inline-block',
          transform: 'rotate(45deg)',
        }}
      />
      {label}
    </span>
  );
}
