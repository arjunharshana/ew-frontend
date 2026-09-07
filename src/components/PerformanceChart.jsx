import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function PerformanceChart({ data }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>
        Interception rate over time
      </span>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#EEF2F7" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              formatter={(v) => [`${(v * 100).toFixed(1)}%`, 'Interception rate']}
              labelFormatter={(t) => `Step ${t}`}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}
            />
            <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
