import { supabase } from '@/lib/supabase'
import { JobsListing } from '@/components/jobs-listing'
import { PublicNav } from '@/components/public-nav'
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
  const color = `hsl(${hash % 360}, 70%, 45%)`
  return color
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
  const company = row.company ?? row.company_name ?? 'Unknown company'
  const salary = row.salary ?? row.salary_range ?? '$0/mo'
  const type = row.type ?? row.job_type ?? 'Full-time'
  const companyInitials = row.companyInitials ?? row.company_initials ?? getInitials(company)
  const companyColor = row.companyColor ?? row.company_color ?? getCompanyColor(company)
  const skills = Array.isArray(row.skills) ? row.skills : row.skills?.split?.(',')?.map((item: string) => item.trim()) ?? []
  const postedDate = row.postedDate ?? row.posted_date ?? row.created_at ?? ''
  const daysAgo = row.daysAgo ?? row.days_ago ?? daysAgoFromDate(postedDate)

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
    daysAgo,
    type,
    featured: Boolean(row.featured),
    status: row.status ?? 'active',
    description: row.description ?? '',
    experience: row.experience ?? row.years_experience ?? '',
  }
}

export default async function JobsPage() {
  const { data, error } = await supabase.from('jobs').select('*')
  const jobs: Job[] = Array.isArray(data)
    ? data.map((row, index) => normalizeJob(row, index))
    : []

  if (error) {
    console.error('Unable to load jobs:', error)
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <JobsListing jobs={jobs} />
    </div>
  )
}
