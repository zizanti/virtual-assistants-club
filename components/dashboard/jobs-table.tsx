'use client'

import { useEffect, useState } from 'react'
import {
  Pencil,
  Trash2,
  Eye,
  Search,
  Plus,
  Briefcase,
  ChevronDown,
  Check,
  X,
  ArrowUpDown,
} from 'lucide-react'
import type { Job, JobStatus } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

type Tab = 'all' | JobStatus
type SortField = 'title' | 'company' | 'postedDate' | 'salaryMin'
type SortDir = 'asc' | 'desc'

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All Jobs' },
  { key: 'active', label: 'Active' },
  { key: 'pending', label: 'Pending' },
  { key: 'closed', label: 'Closed' },
]

const STATUS_STYLES: Record<JobStatus, string> = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  closed: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

const STATUS_DOT: Record<JobStatus, string> = {
  active: 'bg-green-400',
  pending: 'bg-yellow-400',
  closed: 'bg-zinc-500',
}

const TYPE_STYLES: Record<string, string> = {
  'Full-time': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Part-time': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Contract': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')
  const [deleteJob, setDeleteJob] = useState<Job | null>(null)
  const [viewJob, setViewJob] = useState<Job | null>(null)
  const [sortField, setSortField] = useState<SortField>('postedDate')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [isLoading, setIsLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formSalary, setFormSalary] = useState('')
  const [formType, setFormType] = useState('Full-time')
  const [formDescription, setFormDescription] = useState('')

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/dashboard/jobs')
        if (!response.ok) {
          throw new Error('Unable to load jobs')
        }
        const data = await response.json()
        setJobs(data.map((job: any, index: number) => normalizeJob(job, index)))
      } catch (error) {
        console.error(error)
        toast.error('Failed to load jobs')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const handleDelete = async () => {
    if (!deleteJob) return

    try {
      const response = await fetch(`/api/dashboard/jobs/${deleteJob.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setJobs((prev) => prev.filter((j) => j.id !== deleteJob.id))
      toast.error(`"${deleteJob.title}" deleted`, {
        description: 'The job listing has been permanently removed.',
      })
      setDeleteJob(null)
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete job')
    }
  }

  const handleCreateJob = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!formTitle.trim() || !formCompany.trim() || !formSalary.trim() || !formDescription.trim()) {
      toast.error('Please complete all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/dashboard/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          company: formCompany,
          salary: formSalary,
          type: formType,
          description: formDescription,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create job')
      }

      const data = await response.json()
      const newJob = normalizeJob(data.job ?? data, jobs.length)
      setJobs((prev) => [newJob, ...prev])
      setCreateOpen(false)
      setFormTitle('')
      setFormCompany('')
      setFormSalary('')
      setFormType('Full-time')
      setFormDescription('')
      toast.success('Job created successfully')
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to create job')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = (job: Job, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j))
    )
    toast.success(`Status updated to "${newStatus}"`)
  }

  const filtered = jobs
    .filter((j) => (activeTab === 'all' ? true : j.status === activeTab))
    .filter(
      (j) =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal: string | number = a[sortField]
      let bVal: string | number = b[sortField]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  const counts = {
    all: jobs.length,
    active: jobs.filter((j) => j.status === 'active').length,
    pending: jobs.filter((j) => j.status === 'pending').length,
    closed: jobs.filter((j) => j.status === 'closed').length,
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 px-5 pt-5 pb-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground">Job Listings</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} of {jobs.length} listings shown</p>
            </div>
            <Button
              size="sm"
              className="h-9 gap-1.5 bg-[#E8650A] hover:bg-[#E8650A]/90 text-white font-semibold rounded-xl flex-shrink-0"
              onClick={() => setCreateOpen(true)}
            >
              <Plus size={14} />
              New Listing
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 bg-secondary border-0 rounded-xl text-sm focus-visible:ring-gold/40 placeholder:text-muted-foreground"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.key
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                    activeTab === tab.key
                      ? 'bg-gold/15 text-gold'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {isLoading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">Loading job listings…</div>
        ) : (
          <>
            {/* Table */}
            {filtered.length === 0 ? (
              <EmptyState search={search} tab={activeTab} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <SortHeader
                        label="Job Title"
                        field="title"
                        active={sortField === 'title'}
                        dir={sortDir}
                        onSort={handleSort}
                        className="pl-5 w-[280px]"
                      />
                      <SortHeader
                        label="Company"
                        field="company"
                        active={sortField === 'company'}
                        dir={sortDir}
                        onSort={handleSort}
                      />
                      <SortHeader
                        label="Salary Range"
                        field="salaryMin"
                        active={sortField === 'salaryMin'}
                        dir={sortDir}
                        onSort={handleSort}
                        className="hidden lg:table-cell"
                      />
                      <th className="text-left text-[11px] text-muted-foreground font-medium px-4 py-3 hidden md:table-cell">
                        Type
                      </th>
                      <th className="text-left text-[11px] text-muted-foreground font-medium px-4 py-3">
                        Status
                      </th>
                      <SortHeader
                        label="Posted"
                        field="postedDate"
                        active={sortField === 'postedDate'}
                        dir={sortDir}
                        onSort={handleSort}
                        className="hidden lg:table-cell"
                      />
                      <th className="text-right text-[11px] text-muted-foreground font-medium px-5 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((job, i) => (
                      <JobRow
                        key={job.id}
                        job={job}
                        isLast={i === filtered.length - 1}
                        onView={() => setViewJob(job)}
                        onDelete={() => setDeleteJob(job)}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Job Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-base">Create New Job</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Add a new job listing that will appear in the dashboard and can also be managed later.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateJob} className="space-y-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Title</label>
                <Input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Executive Assistant to CEO"
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Company</label>
                <Input
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Salary</label>
                <Input
                  value={formSalary}
                  onChange={(e) => setFormSalary(e.target.value)}
                  placeholder="$4,000 – $6,000/mo"
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none"
                >
                  {['Full-time', 'Part-time', 'Contract'].map((option) => (
                    <option key={option} value={option} className="bg-[#0A0A0A] text-foreground">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Description</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Write a short description for the job..."
                className="w-full min-h-[120px] rounded-2xl border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none resize-none"
              />
            </div>

            <DialogFooter className="items-center gap-2">
              <Button variant="outline" size="sm" className="border-border rounded-xl" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#E8650A] hover:bg-[#E8650A]/90 text-white font-semibold rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? 'Creating…' : 'Create Job'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteJob} onOpenChange={() => setDeleteJob(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-base">Delete Job Listing</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              This action cannot be undone. The listing will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          {deleteJob && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 my-1">
              <p className="text-sm font-semibold text-foreground">{deleteJob.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {deleteJob.company} · {deleteJob.salary} · {deleteJob.type}
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="border-border rounded-xl" onClick={() => setDeleteJob(null)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white font-semibold rounded-xl" onClick={handleDelete}>
              <Trash2 size={13} className="mr-1.5" />
              Delete Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Detail Modal */}
      <Dialog open={!!viewJob} onOpenChange={() => setViewJob(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: viewJob?.companyColor ?? '#D4A843' }}
              >
                {viewJob?.companyInitials}
              </div>
              <div>
                <DialogTitle className="font-serif text-base leading-tight">{viewJob?.title}</DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{viewJob?.company}</p>
              </div>
            </div>
          </DialogHeader>

          {viewJob && (
            <div className="space-y-4 py-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-secondary p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Salary</p>
                  <p className="text-sm font-semibold text-gold">{viewJob.salary}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Type</p>
                  <p className="text-sm font-semibold text-foreground">{viewJob.type}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-semibold text-foreground">{viewJob.location}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-sm font-semibold text-foreground">{viewJob.experience}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{viewJob.description}</p>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Skills Required</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewJob.skills.map((s) => (
                    <span key={s} className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs text-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</p>
                  <span
                    className={cn(
                      'mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                      STATUS_STYLES[viewJob.status]
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[viewJob.status])} />
                    {viewJob.status.charAt(0).toUpperCase() + viewJob.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Posted</p>
                  <p className="text-xs text-foreground font-medium mt-1">{viewJob.postedDate}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="border-border rounded-xl" onClick={() => setViewJob(null)}>
              Close
            </Button>
            <Button size="sm" className="bg-gold hover:bg-gold/90 text-[#0A0A0A] font-semibold rounded-xl">
              <Pencil size={13} className="mr-1.5" />
              Edit Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function normalizeJob(row: any, index: number): Job {
  const title = row.title ?? 'Untitled role'
  const company = row.company ?? 'Unknown company'
  const salary = row.salary ?? '$0/mo'
  const type = row.type ?? 'Full-time'
  const createdAt = row.created_at ?? row.createdAt ?? row.postedDate ?? new Date().toISOString()
  const companyInitials = row.companyInitials ?? row.company_initials ?? getInitials(company)
  const companyColor = row.companyColor ?? row.company_color ?? getCompanyColor(company)

  return {
    id: String(row.id ?? row.job_id ?? index),
    title,
    company,
    companyInitials,
    companyColor,
    salary,
    salaryMin: Number(row.salaryMin ?? row.salary_min ?? parseSalaryMin(salary) ?? 0),
    salaryMax: Number(row.salaryMax ?? row.salary_max ?? parseSalaryMax(salary) ?? 0),
    skills: Array.isArray(row.skills)
      ? row.skills
      : typeof row.skills === 'string'
      ? row.skills.split(',').map((item: string) => item.trim())
      : [],
    location: row.location ?? row.city ?? 'Remote',
    postedDate: new Date(createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    daysAgo: dateDaysAgo(createdAt),
    type,
    featured: Boolean(row.featured),
    status: (row.status ?? 'active') as JobStatus,
    description: row.description ?? row.job_description ?? '',
    experience: row.experience ?? row.years_experience ?? '',
  }
}

function getInitials(company: string) {
  const words = company.trim().split(/\s+/)
  return words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : company.slice(0, 2).toUpperCase()
}

function getCompanyColor(company: string) {
  const hash = company
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
  return `hsl(${hash % 360}, 70%, 45%)`
}

function parseSalaryMin(salary: string) {
  const match = salary.match(/\$([\d,]+)(?:\s*–\s*\$?([\d,]+))?/) 
  if (!match) return 0
  return Number(match[1].replace(/,/g, ''))
}

function parseSalaryMax(salary: string) {
  const match = salary.match(/\$([\d,]+)(?:\s*–\s*\$?([\d,]+))?/) 
  if (!match) return 0
  return match[2] ? Number(match[2].replace(/,/g, '')) : Number(match[1].replace(/,/g, ''))
}

function dateDaysAgo(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 0
  return Math.max(0, Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)))
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SortHeader({
  label,
  field,
  active,
  dir,
  onSort,
  className,
}: {
  label: string
  field: SortField
  active: boolean
  dir: SortDir
  onSort: (f: SortField) => void
  className?: string
}) {
  return (
    <th
      className={cn('text-left text-[11px] text-muted-foreground font-medium px-4 py-3 cursor-pointer select-none', className)}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1 group hover:text-foreground transition-colors">
        {label}
        <ArrowUpDown
          size={10}
          className={cn(
            'transition-colors',
            active ? 'text-gold' : 'text-muted-foreground/40 group-hover:text-muted-foreground'
          )}
        />
      </div>
    </th>
  )
}

function JobRow({
  job,
  isLast,
  onView,
  onDelete,
  onStatusChange,
}: {
  job: Job
  isLast: boolean
  onView: () => void
  onDelete: () => void
  onStatusChange: (job: Job, s: JobStatus) => void
}) {
  const [statusOpen, setStatusOpen] = useState(false)

  return (
    <tr
      className={cn(
        'border-b border-border transition-colors hover:bg-secondary/30 group',
        isLast && 'border-b-0'
      )}
    >
      {/* Title */}
      <td className="pl-5 pr-4 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold text-white flex-shrink-0"
            style={{ backgroundColor: job.companyColor }}
          >
            {job.companyInitials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{job.title}</p>
            {job.featured && (
              <span className="text-[9px] font-semibold text-gold uppercase tracking-wider">Featured</span>
            )}
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-4 py-3.5">
        <span className="text-xs text-muted-foreground">{job.company}</span>
      </td>

      {/* Salary */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <span className="text-xs font-semibold text-gold">{job.salary}</span>
      </td>

      {/* Type */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
            TYPE_STYLES[job.type] ?? 'bg-secondary text-muted-foreground border-border'
          )}
        >
          {job.type}
        </span>
      </td>

      {/* Status — clickable dropdown */}
      <td className="px-4 py-3.5">
        <div className="relative">
          <button
            onClick={() => setStatusOpen((o) => !o)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-opacity hover:opacity-80',
              STATUS_STYLES[job.status]
            )}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[job.status])} />
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            <ChevronDown size={9} />
          </button>

          {statusOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setStatusOpen(false)} />
              <div className="absolute left-0 top-full mt-1 z-20 w-32 rounded-xl border border-border bg-card shadow-xl overflow-hidden">
                {(['active', 'pending', 'closed'] as JobStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(job, s)
                      setStatusOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-secondary',
                      s === job.status ? 'text-foreground font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', STATUS_DOT[s])} />
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                    {s === job.status && <Check size={10} className="ml-auto text-gold" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>

      {/* Posted */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <span className="text-[10px] text-muted-foreground">{job.postedDate}</span>
      </td>

      {/* Actions */}
      <td className="pl-4 pr-5 py-3.5">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onView}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="View"
          >
            <Eye size={13} />
          </button>
          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-gold hover:bg-[#D4A843]/10 transition-colors"
            title="Edit"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  )
}

function EmptyState({ search, tab }: { search: string; tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary">
          <Briefcase size={32} className="text-muted-foreground/40" />
        </div>
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A] border border-border">
          <X size={12} className="text-muted-foreground" />
        </div>
        {/* Decorative dots */}
        <div className="absolute -bottom-2 -left-3 h-2 w-2 rounded-full bg-gold/30" />
        <div className="absolute top-2 -left-4 h-1.5 w-1.5 rounded-full bg-gold/20" />
        <div className="absolute -bottom-3 right-2 h-1.5 w-1.5 rounded-full bg-orange/20" />
      </div>

      <h3 className="font-serif text-base font-semibold text-foreground">
        {search ? 'No results found' : `No ${tab === 'all' ? '' : tab + ' '}jobs yet`}
      </h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
        {search
          ? `No listings match "${search}". Try a different search term.`
          : tab === 'pending'
          ? 'Scraped jobs awaiting approval will appear here.'
          : tab === 'closed'
          ? 'Expired or filled positions will appear here once closed.'
          : 'Create your first job listing to start receiving applications from LATAM talent.'}
      </p>
      {!search && (
        <Button size="sm" className="mt-5 h-9 gap-1.5 bg-gold hover:bg-gold/90 text-[#0A0A0A] font-semibold rounded-xl">
          <Plus size={14} />
          Create First Listing
        </Button>
      )}
    </div>
  )
}
