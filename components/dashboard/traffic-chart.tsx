'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TRAFFIC_SOURCES } from '@/lib/data'

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-[#111111] px-3 py-2 shadow-xl text-xs">
      <p className="font-semibold text-foreground">{payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value}% of traffic</p>
    </div>
  )
}

export function TrafficSourcesChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 h-full">
      <h3 className="font-semibold text-foreground text-sm mb-1">Traffic Sources</h3>
      <p className="text-xs text-muted-foreground mb-5">Where candidates discover VAC</p>

      <div className="flex items-center gap-6">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={TRAFFIC_SOURCES}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {TRAFFIC_SOURCES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2.5">
          {TRAFFIC_SOURCES.map((source) => (
            <div key={source.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: source.color }} />
                <span className="text-xs text-muted-foreground">{source.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${source.value}%`, background: source.color }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-8 text-right">{source.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
