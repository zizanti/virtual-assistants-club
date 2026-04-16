'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import type { Job } from '@/lib/data'
import { cn } from '@/lib/utils'

function CompanyLogo({
  initials,
  color,
  size = 'md',
}: {
  initials: string
  color: string
  size?: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
  return (
    <div
      className={cn('flex items-center justify-center rounded-lg font-bold text-white flex-shrink-0', dim)}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}

export function JobCard({ job }: { job: Job }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cvLink, setCvLink] = useState('')
  const [englishLevel, setEnglishLevel] = useState('')
  const [experience, setExperience] = useState('')

  const handleApply = () => {
    if (!name.trim() || !email.trim() || !cvLink.trim() || !englishLevel || !experience) {
      toast.error('Please complete all required fields')
      return
    }

    console.log('Application submitted:', {
      name,
      email,
      cvLink,
      englishLevel,
      experience,
      jobId: job.id,
    })
    toast.success('Application submitted')
    setIsApplyOpen(false)
    setName('')
    setEmail('')
    setCvLink('')
    setEnglishLevel('')
    setExperience('')
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5',
        job.featured
          ? 'border-gold/40 bg-card gold-border-glow hover:border-gold/60'
          : 'border-border bg-card hover:border-border/60 hover:shadow-lg hover:shadow-black/20'
      )}
    >
      {job.featured && (
        <div className="absolute -top-2.5 left-4">
          <span className="flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#0A0A0A]">
            <Star size={10} fill="currentColor" />
            Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <CompanyLogo initials={job.companyInitials} color={job.companyColor} />
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-gold transition-colors text-balance">
              {job.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="text-xs bg-secondary text-muted-foreground border-0 shrink-0"
        >
          {job.type}
        </Badge>
      </div>

      {/* Salary */}
      <div
        className="text-sm font-semibold text-gold"
        style={{ textShadow: '0 0 20px rgba(212,168,67,0.3)' }}
      >
        {job.salary}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground border border-border/50"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
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
        <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="h-8 px-3.5 text-xs bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold rounded-lg"
            >
              Apply
              <ArrowUpRight size={12} className="ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="english-level">English Level</Label>
                <select
                  id="english-level"
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none"
                >
                  <option value="">Select level</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                </select>
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none"
                >
                  <option value="">Select experience</option>
                  <option value="0–1 years">0–1 years</option>
                  <option value="1–3 years">1–3 years</option>
                  <option value="3+ years">3+ years</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cv">CV Link (Google Drive)</Label>
                <Input
                  id="cv"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <Button onClick={handleApply} className="w-full bg-gold text-[#0A0A0A] hover:bg-gold/90">
                Submit Application
              </Button>
              <p className="text-xs text-muted-foreground/70">
                Applications submitted through VAC may be considered for multiple opportunities, not just this role.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}
