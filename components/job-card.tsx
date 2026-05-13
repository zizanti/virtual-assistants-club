'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, ArrowUpRight, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import type { Job } from '@/lib/data'
import { cn } from '@/lib/utils'

function JobIcon({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <div className={cn('flex items-center justify-center rounded-lg bg-gold/10 flex-shrink-0', dim)}>
      <Briefcase size={size === 'sm' ? 14 : 16} className="text-gold" />
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
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleApply = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Completa nombre y email')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          english_level: englishLevel,
          experience_years: experience,
          cv_url: cvLink,
          job_id: job.id,
        }),
      })

      if (res.ok) {
        setDone(true)
        toast.success('Aplicación enviada')
      } else {
        toast.error('Error al enviar')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setCvLink('')
    setEnglishLevel('')
    setExperience('')
    setDone(false)
    setIsApplyOpen(false)
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
            Destacado
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <JobIcon />
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-gold transition-colors text-balance">
              {job.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs bg-secondary text-muted-foreground border-0 shrink-0">
          {job.type}
        </Badge>
      </div>

      {/* Salary */}
      <div className="text-sm font-semibold text-gold" style={{ textShadow: '0 0 20px rgba(212,168,67,0.3)' }}>
        {job.salary}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <span key={skill} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground border border-border/50">
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
            {job.daysAgo}d
          </span>
        </div>
        <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 h-8 px-3.5 text-xs bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-105 active:scale-95 font-semibold rounded-lg transition-all duration-200 cursor-pointer">
              Aplicar
              <ArrowUpRight size={12} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Aplicar a {job.title}</DialogTitle>
            </DialogHeader>
            {done ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                  <Star size={24} className="text-gold" />
                </div>
                <p className="font-semibold text-foreground">¡Aplicación enviada!</p>
                <p className="text-sm text-muted-foreground">David revisará tu perfil pronto.</p>
                <button onClick={resetForm} className="mt-2 h-9 px-4 bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold rounded-lg transition-all duration-200 text-sm">
                  Cerrar
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs text-muted-foreground">Nombre completo *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" className="h-9 mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="h-9 mt-1" />
                </div>
                <div>
                  <Label htmlFor="english-level" className="text-xs text-muted-foreground">Nivel de inglés</Label>
                  <select id="english-level" value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)} className="w-full rounded-xl border border-border bg-secondary px-3.5 py-2 text-sm text-foreground outline-none mt-1">
                    <option value="">Selecciona nivel</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experience" className="text-xs text-muted-foreground">Años de experiencia</Label>
                  <select id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-xl border border-border bg-secondary px-3.5 py-2 text-sm text-foreground outline-none mt-1">
                    <option value="">Selecciona</option>
                    <option value="0-1">0-1 años</option>
                    <option value="1-3">1-3 años</option>
                    <option value="3-5">3-5 años</option>
                    <option value="5+">5+ años</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cv" className="text-xs text-muted-foreground">Link CV o LinkedIn</Label>
                  <Input id="cv" value={cvLink} onChange={(e) => setCvLink(e.target.value)} placeholder="https://linkedin.com/in/..." className="h-9 mt-1" />
                </div>
                <button onClick={handleApply} disabled={loading} className="w-full h-10 px-4 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50">
                  {loading ? 'Enviando...' : 'Enviar Aplicación'}
                </button>
                <p className="text-xs text-muted-foreground/70 text-center">
                  David revisa cada aplicación personalmente. Solo se contactan perfiles con fit.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}
