'use client'

import { useEffect, useState } from 'react'
import { JobCard } from '@/components/job-card'
import { Hero } from '@/components/hero'
import { PublicNav } from '@/components/public-nav'
import { Newsletter } from '@/components/landing/newsletter'
import type { Job } from '@/lib/data'

function getInitials(company?: string) {
  if (!company) return 'JC'
  const words = company.trim().split(/\s+/)
  return words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : company.slice(0, 2).toUpperCase()
}

function getCompanyColor(company?: string) {
  if (!company) return '#A100FF'
  const hash = company
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
  return `hsl(${hash % 360}, 70%, 45%)`
}

function parseDate(value: unknown) {
  if (!value) return null
  const date = new Date(value as string)
  return Number.isNaN(date.getTime()) ? null : date
}

function daysAgoFromDate(value: unknown) {
  const date = parseDate(value)
  if (!date) return 0
  const diff = Date.now() - date.getTime()
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
}

function normalizeJob(row: any, index: number): Job {
  const title = row.title ?? row.job_title ?? 'Untitled role'
  const company = row.company?.trim() || row.company_name || 'Confidential'
  const companyInitials = row.companyInitials ?? row.company_initials ?? getInitials(company)
  const companyColor = row.companyColor ?? row.company_color ?? getCompanyColor(company)
  const salary = row.salary ?? row.salary_range ?? '$0/mo'
  const type = row.type ?? row.job_type ?? 'Full-time'
  const skills = Array.isArray(row.skills)
    ? row.skills
    : row.skills?.split?.(',')?.map((item: string) => item.trim()) ?? []
  const postedDate = row.postedDate ?? row.posted_date ?? row.created_at ?? ''

  return {
    id: String(row.id ?? row.job_id ?? index),
    title,
    company,
    companyInitials,
    companyColor,
    salary,
    salaryMin: Number(row.salaryMin ?? row.salary_min ?? 0),
    salaryMax: Number(row.salaryMax ?? row.salary_max ?? 0),
    skills,
    location: row.location ?? row.city ?? 'Remote',
    postedDate: String(postedDate),
    daysAgo: Number(row.daysAgo ?? row.days_ago ?? daysAgoFromDate(postedDate)),
    type,
    featured: Boolean(row.featured),
    status: row.status ?? 'active',
    description: row.description ?? '',
    experience: row.experience ?? row.years_experience ?? '',
  }
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/dashboard/jobs')
        if (!response.ok) {
          throw new Error('Unable to load jobs')
        }

        const data = await response.json()
        const normalized = Array.isArray(data)
          ? data.map((row, index) => normalizeJob(row, index))
          : []
        setJobs(normalized)
      } catch (error) {
        console.error(error)
        setError('Unable to load latest positions')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  const latestJobs = jobs.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <Hero />

      {/* Job Board Section */}
      <section id="jobs" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Open Positions</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Showing latest {latestJobs.length} roles from live listings
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-secondary px-3 py-1 uppercase tracking-[0.3em]">
                Latest
              </span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live · Updated hourly
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-sm text-muted-foreground">Loading latest positions...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : latestJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-foreground font-medium">No open positions available</p>
              <p className="text-sm text-muted-foreground mt-1">Check back soon for new listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {latestJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gold text-[#0A0A0A] font-bold font-serif text-xs">
              V
            </div>
            <span className="font-serif font-bold text-gold text-sm">VAC</span>
            <span className="text-xs text-muted-foreground ml-1">© 2025 Virtual Assistants Club</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {['Privacy', 'Terms', 'Contact', 'Blog'].map((l) => (
              <a key={l} href="#" className="hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
