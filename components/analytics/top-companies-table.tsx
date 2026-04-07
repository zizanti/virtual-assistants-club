'use client'

import { useState } from 'react'
import { Building2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { TOP_COMPANIES_BY_HIRES } from '@/lib/data'
import { cn } from '@/lib/utils'

type SortKey = 'hires' | 'avgDays' | 'revenue'
type SortDir = 'asc' | 'desc'

export function TopCompaniesTable() {
  const [sortKey, setSortKey] = useState<SortKey>('hires')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...TOP_COMPANIES_BY_HIRES].sort((a, b) => {
    const aVal = sortKey === 'revenue'
      ? parseInt(a.revenue.replace(/\D/g, ''))
      : (a[sortKey] as number)
    const bVal = sortKey === 'revenue'
      ? parseInt(b.revenue.replace(/\D/g, ''))
      : (b[sortKey] as number)
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal
  })

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={12} className="text-muted-foreground/50" />
    return sortDir === 'desc'
      ? <ArrowDown size={12} className="text-gold" />
      : <ArrowUp size={12} className="text-gold" />
  }

  const maxHires = Math.max(...sorted.map((c) => c.hires))

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Top Companies by Hires</h3>
          <p className="text-xs text-muted-foreground mt-1">Companies with the most successful placements</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4A843]/10 text-gold">
          <Building2 size={16} />
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground w-8">
                #
              </th>
              <th className="text-left pb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Company
              </th>
              <th className="pb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <button
                  onClick={() => handleSort('hires')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors"
                >
                  Hires <SortIcon col="hires" />
                </button>
              </th>
              <th className="pb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <button
                  onClick={() => handleSort('avgDays')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors"
                >
                  Avg Days <SortIcon col="avgDays" />
                </button>
              </th>
              <th className="pb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors"
                >
                  Revenue <SortIcon col="revenue" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((company, idx) => {
              const hirePct = Math.round((company.hires / maxHires) * 100)
              return (
                <tr
                  key={company.company}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/40 transition-colors group"
                >
                  {/* Rank */}
                  <td className="py-3.5 pr-3 text-xs font-medium text-muted-foreground">
                    {idx + 1}
                  </td>

                  {/* Company */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white"
                        style={{ background: company.color }}
                      >
                        {company.initials}
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                        {company.company}
                      </span>
                    </div>
                  </td>

                  {/* Hires with mini bar */}
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gold transition-all duration-500"
                          style={{ width: `${hirePct}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-5 text-right">
                        {company.hires}
                      </span>
                    </div>
                  </td>

                  {/* Avg days to hire */}
                  <td className="py-3.5 text-right">
                    <span
                      className={cn(
                        'text-xs font-semibold',
                        company.avgDays <= 10 ? 'text-green-400' :
                        company.avgDays <= 13 ? 'text-[#D4A843]' :
                        'text-[#E8650A]',
                      )}
                    >
                      {company.avgDays}d
                    </span>
                  </td>

                  {/* Revenue */}
                  <td className="py-3.5 text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {company.revenue}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
