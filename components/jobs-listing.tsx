'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { JobCard } from '@/components/job-card'
import type { Job } from '@/lib/data'

const SALARY_OPTIONS = [
  'Any Salary',
  '$1k–$2k/mo',
  '$2k–$4k/mo',
  '$4k–$6k/mo',
  '$6k+/mo',
]

const TYPE_OPTIONS = ['All Types', 'VA', 'EA', 'Other']

function parseSalaryNumber(job: Job) {
  if (job.salaryMin && job.salaryMax) {
    return (job.salaryMin + job.salaryMax) / 2
  }

  const salaryString = job.salary || ''
  const match = salaryString.match(/\$([\d,]+)(?:\s*–\s*\$?([\d,]+))?/) 
  if (match) {
    const low = Number(match[1].replace(/,/g, ''))
    const high = match[2] ? Number(match[2].replace(/,/g, '')) : low
    return (low + high) / 2
  }

  return null
}

function jobMatchesSalary(job: Job, salaryFilter: string) {
  if (salaryFilter === 'Any Salary') {
    return true
  }

  const value = parseSalaryNumber(job)
  if (value === null) {
    return true
  }

  if (salaryFilter === '$1k–$2k/mo') {
    return value >= 1000 && value <= 2000
  }

  if (salaryFilter === '$2k–$4k/mo') {
    return value >= 2000 && value <= 4000
  }

  if (salaryFilter === '$4k–$6k/mo') {
    return value >= 4000 && value <= 6000
  }

  if (salaryFilter === '$6k+/mo') {
    return value >= 6000
  }

  return true
}

export function JobsListing({ jobs }: { jobs: Job[] }) {
  const [search, setSearch] = useState('')
  const [salaryFilter, setSalaryFilter] = useState(SALARY_OPTIONS[0])
  const [typeFilter, setTypeFilter] = useState(TYPE_OPTIONS[0])

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)

      const matchesType =
        typeFilter === 'All Types' ||
        (typeFilter === 'VA' && job.title.toLowerCase().includes('virtual assistant')) ||
        (typeFilter === 'EA' && job.title.toLowerCase().includes('executive assistant')) ||
        (typeFilter === 'Other' && !job.title.toLowerCase().includes('virtual assistant') && !job.title.toLowerCase().includes('executive assistant'))

      const matchesSalary = jobMatchesSalary(job, salaryFilter)

      return matchesSearch && matchesType && matchesSalary
    })
  }, [jobs, search, salaryFilter, typeFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 rounded-[32px] border border-border bg-card p-8 shadow-xl shadow-black/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Job Listings</p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Remote Jobs for Virtual Assistants & Executive Assistants
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Curated roles from companies hiring in LATAM. Updated consistently.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="rounded-2xl border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
              {filteredJobs.length} roles available
            </div>
            <div className="rounded-2xl border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
              {jobs.length} total jobs
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or company"
              className="pl-11 h-12 rounded-2xl bg-[#111111] border border-border text-sm text-foreground focus-visible:ring-gold/40"
            />
          </div>

          <div className="rounded-2xl border border-border bg-[#111111] p-3">
            <label htmlFor="salary" className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Salary
            </label>
            <select
              id="salary"
              value={salaryFilter}
              onChange={(event) => setSalaryFilter(event.target.value)}
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50"
            >
              {SALARY_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#0A0A0A] text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-border bg-[#111111] p-3">
            <label htmlFor="type" className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Type
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#0A0A0A] text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-[32px] border border-border bg-card p-14 text-center">
          <p className="text-4xl">😔</p>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">No jobs match your search</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-xl mx-auto">
            Try adjusting your search or filters to discover more remote roles.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
