'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { JobCard } from '@/components/job-card'
import type { Job } from '@/lib/data'

const SALARY_OPTIONS = [
  'Cualquier Salario',
  '$1k–$2k/mes',
  '$2k–$4k/mes',
  '$4k–$6k/mes',
  '$6k+/mes',
]

const TYPE_OPTIONS = ['Todos', 'VA', 'EA', 'Otro']

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
  if (salaryFilter === 'Cualquier Salario') return true
  const value = parseSalaryNumber(job)
  if (value === null) return true
  if (salaryFilter === '$1k–$2k/mes') return value >= 1000 && value <= 2000
  if (salaryFilter === '$2k–$4k/mes') return value >= 2000 && value <= 4000
  if (salaryFilter === '$4k–$6k/mes') return value >= 4000 && value <= 6000
  if (salaryFilter === '$6k+/mes') return value >= 6000
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
        typeFilter === 'Todos' ||
        (typeFilter === 'VA' && job.title.toLowerCase().includes('virtual assistant')) ||
        (typeFilter === 'EA' && job.title.toLowerCase().includes('executive assistant')) ||
        (typeFilter === 'Otro' && !job.title.toLowerCase().includes('virtual assistant') && !job.title.toLowerCase().includes('executive assistant'))
      const matchesSalary = jobMatchesSalary(job, salaryFilter)
      return matchesSearch && matchesType && matchesSalary
    })
  }, [jobs, search, salaryFilter, typeFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 rounded-[32px] border border-border bg-card p-6 shadow-xl shadow-black/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Ofertas de Trabajo</p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Trabajos Remotos para VAs y EAs
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Roles curados de empresas contratando en LATAM. Actualizados constantemente.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs text-muted-foreground">
              {filteredJobs.length} disponibles
            </div>
            <div className="rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs text-muted-foreground">
              {jobs.length} total
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título o empresa"
              className="pl-10 h-11 rounded-xl bg-[#111111] border border-border text-sm text-foreground focus-visible:ring-gold/40"
            />
          </div>

          <div className="rounded-xl border border-border bg-[#111111] p-2.5">
            <label htmlFor="salary" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
              Salario
            </label>
            <select
              id="salary"
              value={salaryFilter}
              onChange={(event) => setSalaryFilter(event.target.value)}
              className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-gold/50"
            >
              {SALARY_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#0A0A0A] text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-border bg-[#111111] p-2.5">
            <label htmlFor="type" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
              Tipo
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-gold/50"
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
        <div className="rounded-[32px] border border-border bg-card p-10 text-center">
          <p className="text-3xl">😔</p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">No hay trabajos que coincidan</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-xl mx-auto">
            Ajusta tu búsqueda o filtros para descubrir más roles remotos.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
