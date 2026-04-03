'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  BarChart3,
  Zap,
  Settings,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Briefcase, label: 'Jobs', href: '/dashboard/jobs' },
  { icon: Users, label: 'Candidates', href: '/dashboard/candidates' },
  { icon: Building2, label: 'Companies', href: '/dashboard/companies' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Zap, label: 'Automations', href: '/dashboard/automations' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col h-screen sticky top-0 border-r border-border bg-[#0D0D0D] transition-all duration-300 z-40',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 border-b border-border px-4', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-[#0A0A0A] font-bold font-serif text-sm flex-shrink-0">
          V
        </div>
        {!collapsed && (
          <span className="font-serif text-base font-bold text-gold tracking-wide">VAC</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200',
                active
                  ? 'bg-[#D4A843]/10 text-gold font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon
                size={18}
                className={cn('flex-shrink-0', active ? 'text-gold' : '')}
              />
              {!collapsed && <span>{label}</span>}
              {active && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors',
            collapsed && 'justify-center px-0'
          )}
        >
          <ChevronLeft
            size={16}
            className={cn('transition-transform duration-300', collapsed ? 'rotate-180' : '')}
          />
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  )
}
