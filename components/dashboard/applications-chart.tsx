'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { CHART_DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

type TimeRange = '7D' | '30D' | '90D'

const TIME_TABS: TimeRange[] = ['7D', '30D', '90D']

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-[#111111] px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <div className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.dataKey}</span>
          <span className="font-semibold text-foreground ml-auto pl-4">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ApplicationsChart() {
  const [range, setRange] = useState<TimeRange>('30D')
  const data = CHART_DATA[range]

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Applications vs Placements Trends</h3>
          <p className="text-xs text-muted-foreground mt-1">Track hiring pipeline performance over time</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-border bg-secondary p-1">
          {TIME_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setRange(tab)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                range === tab
                  ? 'bg-gold text-[#0A0A0A]'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-full bg-[#D4A843]" />
          Applications
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-full bg-[#E8650A]" />
          Placements
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#D4A843"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#D4A843', strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="placements"
            stroke="#E8650A"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#E8650A', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
