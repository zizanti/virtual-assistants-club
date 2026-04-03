'use client'

import { Zap } from 'lucide-react'

const AUTOMATIONS = [
  { name: 'Job Scraper', status: 'Active', description: 'Runs every 2h' },
  { name: 'AI Filter', status: 'Active', description: 'GPT-4 powered' },
  { name: 'Email Sequence', status: 'Active', description: '12 active flows' },
  { name: 'Content Generator', status: 'Active', description: 'TikTok + LinkedIn' },
]

export function AutomationStatus() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Automation Status</h3>
          <p className="text-xs text-muted-foreground mt-0.5">All systems operational</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-xs font-medium text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </div>
      </div>

      <div className="space-y-2">
        {AUTOMATIONS.map((auto) => (
          <div
            key={auto.name}
            className="flex items-center justify-between rounded-xl border border-border bg-secondary px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#D4A843]/10 text-gold">
                <Zap size={11} />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground leading-tight">{auto.name}</p>
                <p className="text-[10px] text-muted-foreground">{auto.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {auto.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
