'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { PLACEMENT_RATE_TREND } from '@/lib/data'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-[#111111] px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#D4A843]" />
        <span className="text-muted-foreground">Placement rate</span>
        <span className="font-semibold text-gold ml-auto pl-4">{payload[0].value}%</span>
      </div>
    </div>
  )
}

const avg =
  PLACEMENT_RATE_TREND.reduce((sum, d) => sum + d.rate, 0) /
  PLACEMENT_RATE_TREND.length

export function PlacementRateChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Placement Rate Over Time</h3>
          <p className="text-xs text-muted-foreground mt-1">% of applicants successfully placed per month</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-bold text-gold" style={{ textShadow: '0 0 20px rgba(212,168,67,0.3)' }}>
            {PLACEMENT_RATE_TREND[PLACEMENT_RATE_TREND.length - 1].rate}%
          </span>
          <span className="text-[10px] text-muted-foreground">Jan 2025</span>
        </div>
      </div>

      <div className="flex items-center gap-5 mb-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-full bg-[#D4A843]" />
          Placement %
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-px w-5 border-t border-dashed border-[#6B6459]" />
          Avg ({avg.toFixed(1)}%)
        </div>
      </div>

      <ResponsiveContainer width="100%" height={248}>
        <LineChart
          data={PLACEMENT_RATE_TREND}
          margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[14, 24]}
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={avg}
            stroke="#6B6459"
            strokeDasharray="4 3"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#D4A843"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#D4A843', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#D4A843', stroke: 'rgba(212,168,67,0.3)', strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
