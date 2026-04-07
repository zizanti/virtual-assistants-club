'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { MONTHLY_APPLICATIONS } from '@/lib/data'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-[#111111] px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <div className="h-2 w-2 rounded-full" style={{ background: entry.fill ?? entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.dataKey}</span>
          <span className="font-semibold text-foreground ml-auto pl-4">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const GOLD   = '#D4A843'
const ORANGE = '#E8650A'

export function MonthlyApplicationsChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-5">
        <h3 className="font-semibold text-foreground text-sm">Applications per Month</h3>
        <p className="text-xs text-muted-foreground mt-1">Volume of applications and confirmed hires — last 6 months</p>
      </div>

      <div className="flex items-center gap-5 mb-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD }} />
          Applications
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-sm" style={{ background: ORANGE }} />
          Hires
        </div>
      </div>

      <ResponsiveContainer width="100%" height={248}>
        <BarChart
          data={MONTHLY_APPLICATIONS}
          margin={{ top: 4, right: 4, left: -20, bottom: 4 }}
          barCategoryGap="28%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6B6459' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="applications" fill={GOLD} radius={[4, 4, 0, 0]}>
            {MONTHLY_APPLICATIONS.map((_, i) => (
              <Cell
                key={i}
                fill={i === MONTHLY_APPLICATIONS.length - 1 ? GOLD : `${GOLD}99`}
              />
            ))}
          </Bar>
          <Bar dataKey="hires" fill={ORANGE} radius={[4, 4, 0, 0]}>
            {MONTHLY_APPLICATIONS.map((_, i) => (
              <Cell
                key={i}
                fill={i === MONTHLY_APPLICATIONS.length - 1 ? ORANGE : `${ORANGE}99`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
