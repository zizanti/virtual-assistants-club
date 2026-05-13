'use client'

import { useState } from 'react'
import { Eye, MessageSquare } from 'lucide-react'
import { CANDIDATES } from '@/lib/data'
import type { ApplicationStatus } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Reviewing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Placed: 'bg-green-500/10 text-green-400 border-green-500/20',
  Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export function RecentApplicationsTable() {
  const [candidates, setCandidates] = useState(CANDIDATES)

  const handleAction = (id: string, action: string) => {
    toast.success(`${action} sent to candidate`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Recent Applications</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{candidates.length} applications this week</p>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer px-2 py-1 rounded-md">
          View All
        </button>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Candidate</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 hidden md:table-cell">Applied Role</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 hidden lg:table-cell">Experience</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 hidden md:table-cell">Applied</th>
                <th className="text-right text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr
                  key={c.id}
                  className={cn(
                    'border-b border-border transition-colors hover:bg-secondary/40',
                    i === candidates.length - 1 && 'border-b-0'
                  )}
                >
                  {/* Candidate */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-[#0A0A0A] flex-shrink-0"
                        style={{ backgroundColor: c.avatarColor }}
                      >
                        {c.initials}
                      </div>
                      <span className="font-medium text-foreground text-xs whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{c.appliedRole}</span>
                  </td>

                  {/* Experience */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">{c.experience}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
                      STATUS_STYLES[c.status]
                    )}>
                      {c.status}
                    </span>
                  </td>

                  {/* Applied */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[10px] text-muted-foreground">{c.appliedDate}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleAction(c.id, 'Profile viewed')}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        title="View Profile"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleAction(c.id, 'Message')}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-gold hover:bg-[#D4A843]/10 transition-colors"
                        title="Message"
                      >
                        <MessageSquare size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
