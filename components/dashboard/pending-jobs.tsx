'use client'

import { useState } from 'react'
import { Check, X, ExternalLink, Clock } from 'lucide-react'
import { PENDING_JOBS } from '@/lib/data'
import type { PendingJob } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

export function PendingJobsCard() {
  const [jobs, setJobs] = useState(PENDING_JOBS)
  const [approveJob, setApproveJob] = useState<PendingJob | null>(null)
  const [rejectJob, setRejectJob] = useState<PendingJob | null>(null)

  const handleApprove = () => {
    if (!approveJob) return
    setJobs((prev) => prev.filter((j) => j.id !== approveJob.id))
    toast.success(`"${approveJob.title}" approved and published`, {
      description: 'The job is now live on the board.',
    })
    setApproveJob(null)
  }

  const handleReject = () => {
    if (!rejectJob) return
    setJobs((prev) => prev.filter((j) => j.id !== rejectJob.id))
    toast.error(`"${rejectJob.title}" rejected`, {
      description: 'Removed from the pending queue.',
    })
    setRejectJob(null)
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm">Pending Jobs to Approve</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{jobs.length} scraped jobs awaiting review</p>
          </div>
          {jobs.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8650A] text-[10px] font-bold text-white">
              {jobs.length}
            </span>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Check size={24} className="text-green-400 mb-2" />
            <p className="text-sm font-medium text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">No pending jobs to review.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-medium text-foreground truncate">{job.title}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{job.company}</span>
                    <span className="text-gold font-semibold">{job.salary}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={9} />
                      {job.scrapedAt}
                    </span>
                    <span className="rounded bg-[#0A0A0A] px-1.5 py-0.5 border border-border">{job.source}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setRejectJob(job)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Reject"
                  >
                    <X size={13} />
                  </button>
                  <button
                    onClick={() => setApproveJob(job)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-green-400 hover:bg-green-500/10 transition-colors"
                    title="Approve"
                  >
                    <Check size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approve Modal */}
      <Dialog open={!!approveJob} onOpenChange={() => setApproveJob(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-base">Approve Job Posting</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              This job will be published live to the VAC board immediately.
            </DialogDescription>
          </DialogHeader>
          {approveJob && (
            <div className="rounded-xl border border-border bg-secondary p-4 my-2">
              <p className="text-sm font-semibold text-foreground">{approveJob.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{approveJob.company} · {approveJob.salary}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="border-border" onClick={() => setApproveJob(null)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold" onClick={handleApprove}>
              <Check size={14} className="mr-1.5" />
              Approve & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={!!rejectJob} onOpenChange={() => setRejectJob(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-base">Reject Job Posting</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              This job will be permanently removed from the approval queue.
            </DialogDescription>
          </DialogHeader>
          {rejectJob && (
            <div className="rounded-xl border border-border bg-secondary p-4 my-2">
              <p className="text-sm font-semibold text-foreground">{rejectJob.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{rejectJob.company} · {rejectJob.salary}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="border-border" onClick={() => setRejectJob(null)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white font-semibold" onClick={handleReject}>
              <X size={14} className="mr-1.5" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
