'use client'

import { useState } from 'react'
import { JOBS } from '@/lib/data'
import { JobCard } from '@/components/job-card'
import { FilterBar } from '@/components/filter-bar'
import { Hero } from '@/components/hero'
import { PublicNav } from '@/components/public-nav'
import { Newsletter } from '@/components/landing/newsletter'

export default function JobBoardPage() {
  const [search, setSearch] = useState('')
  const [roleType, setRoleType] = useState('All Roles')
  const [salary, setSalary] = useState('Any Salary')
  const [skill, setSkill] = useState('All Skills')
  const [location, setLocation] = useState('All Locations')

  const filtered = JOBS.filter((job) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))

    const matchRole =
      roleType === 'All Roles' ||
      job.title.toLowerCase().includes(roleType.toLowerCase().replace(' ea', '').replace('executive assistant', 'executive'))

    const matchLocation = location === 'All Locations' || job.location.includes(location.replace('Remote ', ''))

    const matchSkill =
      skill === 'All Skills' || job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))

    return matchSearch && matchRole && matchLocation && matchSkill
  })

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <Hero />

      {/* Job Board Section */}
      <section id="jobs" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Open Positions
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filtered.length} opportunities available
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live · Updated hourly
            </div>
          </div>
        </div>

        <FilterBar
          onSearch={setSearch}
          onRoleType={setRoleType}
          onSalary={setSalary}
          onSkill={setSkill}
          onLocation={setLocation}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-foreground font-medium">No positions found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((job) => (
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
