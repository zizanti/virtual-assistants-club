'use client'

import { useEffect, useState } from 'react'
import { JobCard } from '@/components/job-card'
import { PublicNav } from '@/components/public-nav'
import { TopBanner } from '@/components/landing/top-banner'
import { Newsletter } from '@/components/landing/newsletter'
import { HeroNew } from '@/components/landing/hero-new'
import { SocialProof } from '@/components/landing/social-proof'
import { TrustBar } from '@/components/landing/trust-bar'
import { HowVACWorks } from '@/components/landing/how-it-works'
import { EcosystemSection } from '@/components/landing/ecosystem'
import { FounderStory } from '@/components/landing/founder-story'
import { FloatingLeadBar } from '@/components/landing/floating-lead-bar'
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
  const company = row.company?.trim() || row.company_name?.trim() || 'Confidential'
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
        if (!response.ok) throw new Error('Unable to load jobs')
        const data = await response.json()
        const normalized = Array.isArray(data)
          ? data.map((row, index) => normalizeJob(row, index))
          : []
        setJobs(normalized)
      } catch {
        setError('No pudimos cargar las últimas posiciones')
      } finally {
        setIsLoading(false)
      }
    }
    loadJobs()
  }, [])

  const latestJobs = jobs.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <PublicNav />
      <HeroNew />
      <TrustBar />
      <SocialProof />
      <HowVACWorks />

      {/* Job Board Section */}
      <section id="jobs" className="relative py-12 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Ofertas de Trabajo</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance">
              Trabajos remotos activos
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
              Roles remotos curados para asistentes ejecutivos y virtuales en LATAM.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary animate-pulse mb-3">
                <div className="h-4 w-4 rounded bg-muted-foreground/20" />
              </div>
              <p className="text-sm text-muted-foreground">Cargando trabajos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : latestJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-muted-foreground">No hay posiciones abiertas por ahora.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {latestJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <div className="text-center mt-8">
                <a
                  href="/jobs"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-border text-foreground hover:border-gold/40 hover:text-gold hover:scale-[1.02] active:scale-[0.98] text-sm font-medium transition-all duration-200"
                >
                  Ver todos los trabajos →
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <EcosystemSection />
      <FounderStory />
      <Newsletter />

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gold text-[#0A0A0A] font-bold font-serif text-[10px]">
              V
            </div>
            <span className="font-serif font-bold text-gold text-xs">VAC</span>
            <span className="text-[11px] text-muted-foreground ml-1">© 2026 Virtual Assistants Club</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
            <a href="/for-companies" className="hover:text-foreground transition-colors">Contacto</a>
            <a href="/resources" className="hover:text-foreground transition-colors">Blog</a>
          </div>
        </div>
      </footer>

      <FloatingLeadBar />
    </div>
  )
}
