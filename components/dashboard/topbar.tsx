'use client'

import { Bell, Search, Plus, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function DashboardTopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-[#0A0A0A]/95 backdrop-blur-md px-6">
      {/* Search */}
      <div className="relative max-w-xs flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search anything..."
          className="h-9 pl-9 bg-secondary border-0 rounded-xl text-sm focus-visible:ring-gold/40 text-muted-foreground"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="h-9 gap-1.5 bg-[#E8650A] hover:bg-[#E8650A]/90 text-white font-semibold rounded-xl">
          <Plus size={15} />
          Add Job
        </Button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-gold/30 transition-colors">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#E8650A] text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-[#0A0A0A] font-bold text-sm cursor-pointer">
            S
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-foreground leading-tight">Santi</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
          </div>
        </div>

        {/* View Site */}
        <Link href="/">
          <Button size="sm" variant="ghost" className="h-9 text-muted-foreground hover:text-foreground text-xs gap-1">
            <ExternalLink size={13} />
            <span className="hidden md:inline">View Site</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
