'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Search, Plus, ExternalLink, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DashboardTopBar() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Clear cookies via API
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      // Redirect to login
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
      // Still redirect even if there's an error
      router.push('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

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
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#E8650A] hover:bg-[#E8650A]/90 hover:scale-[1.02] active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200"
        >
          <Plus size={15} />
          Add Job
        </Link>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#E8650A] text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-[#0A0A0A] font-bold text-sm">
                S
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-medium text-foreground leading-tight">David</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="cursor-pointer flex gap-2 text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={14} />
              {isLoggingOut ? 'Signing out...' : 'Sign out'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Site */}
        <Link href="/"
          className="inline-flex items-center gap-1 h-9 px-3 text-muted-foreground hover:text-foreground hover:scale-[1.02] active:scale-[0.98] text-xs transition-all duration-200"
        >
          <ExternalLink size={13} />
          <span className="hidden md:inline">View Site</span>
        </Link>
      </div>
    </header>
  )
}
