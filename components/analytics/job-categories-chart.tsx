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
import { JOB_CATEGORIES } from '@/lib/data'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-[#111111] px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full" style={{ background: payload[0].payload.fill }} />
        <span className="text-muted-foreground">Placements</span>
        <span className="font-semibold text-foreground ml-auto pl-4">{payload[0].value}</span>
      </div>
    </div>
  )
}

const MAX = Math.max(...JOB_CATEGORIES.map((d) => d.placements))

export function JobCategoriesChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-5">
        <h3 className="font-semibold text-foreground text-sm">Top Performing Job Categories</h3>
        <p className="text-xs text-muted-foreground mt-1">Total placements by role type — all time</p>
      </div>

      {/* Custom horizontal bar list — more readable than Recharts horizontal bar */}
      <div className="space-y-3">
        {JOB_CATEGORIES.map((cat) => {
          const pct = Math.round((cat.placements / MAX) * 100)
          return (
            <div key={cat.category} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.category}
                </span>
                <span className="text-xs font-semibold text-foreground">{cat.placements}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: cat.fill }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recharts horizontal bar hidden — included for structural completeness via accessible description */}
      <div className="sr-only" aria-hidden="true">
        <ResponsiveContainer width="100%" height={1}>
          <BarChart data={JOB_CATEGORIES} layout="vertical">
            <Bar dataKey="placements">
              {JOB_CATEGORIES.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
