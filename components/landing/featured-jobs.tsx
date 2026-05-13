'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Flame, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JOBS } from '@/lib/data'
import { cn } from '@/lib/utils'

const FEATURED = JOBS.filter((j) => j.status === 'active').slice(0, 4)

function CompanyLogo({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-bold text-white text-sm"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}

function TagBadge({ label, variant }: { label: string; variant: 'fire' | 'star' | 'new' }) {
  const styles = {
    fire:  'bg-orange/10 text-orange border-orange/20',
    star:  'bg-gold/10 text-gold border-gold/30',
    new:   'bg-green-500/10 text-green-400 border-green-500/20',
  }
  const icons = {
    fire:  <Flame size={10} />,
    star:  <Star size={10} fill="currentColor" />,
    new:   <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />,
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', styles[variant])}>
      {icons[variant]}
      {label}
    </span>
  )
}

export function FeaturedJobs() {
  return (
    <section className="relative py-20 md:py-28">
      {/* Subtle divider glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/5 px-3 py-1 text-xs font-semibold text-orange mb-4">
              <Flame size={12} />
              Hot right now
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Top Jobs Today
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md text-pretty">
              Hand-picked opportunities at top US companies. Updated daily.
            </p>
          </div>
          <Link
            href="#jobs"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-border text-muted-foreground text-sm font-medium hover:border-gold/40 hover:text-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            View all jobs
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED.map((job, i) => (
            <article
              key={job.id}
              className={cn(
                'group relative flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer',
                job.featured
                  ? 'border-gold/40 bg-card gold-border-glow hover:border-gold/60'
                  : 'border-border bg-card hover:border-border/60 hover:shadow-xl hover:shadow-black/30'
              )}
            >
              {/* Tags */}
              <div className="flex items-center gap-2">
                {job.featured && <TagBadge label="Featured" variant="star" />}
                {job.salaryMax >= 5000 && <TagBadge label="High Paying" variant="fire" />}
                {i === 0 && <TagBadge label="New" variant="new" />}
              </div>

              {/* Company + title */}
              <div className="flex items-start gap-4">
                <CompanyLogo initials={job.companyInitials} color={job.companyColor} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-gold transition-colors text-balance">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
                </div>
              </div>

              {/* Salary + meta */}
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-bold text-gold"
                  style={{ textShadow: '0 0 20px rgba(212,168,67,0.25)' }}
                >
                  {job.salary}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {job.daysAgo}d ago
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground border border-border/50"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Apply CTA */}
              <div className="flex items-center justify-between mt-auto pt-1 border-t border-border/40">
                <span className="text-xs text-muted-foreground">{job.type} · {job.experience}</span>
                <button
                  className="flex items-center gap-1.5 h-8 px-4 text-xs bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-105 active:scale-95 font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Apply Now
                  <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
