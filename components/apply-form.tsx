'use client'

import { useState } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'
import type { Job } from '@/lib/data'

interface ApplyFormProps {
  job: Job
  onClose: () => void
}

export function ApplyForm({ job, onClose }: ApplyFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [english, setEnglish] = useState('')
  const [experience, setExperience] = useState('')
  const [cvLink, setCvLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          english_level: english,
          experience_years: experience,
          cv_url: cvLink,
          job_id: job.id,
        }),
      })

      if (res.ok) {
        setDone(true)
      } else {
        setError('Error al enviar. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 h-7 w-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <X size={16} />
        </button>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
              <CheckCircle2 size={28} className="text-gold" />
            </div>
            <p className="text-lg font-semibold text-foreground">¡Aplicación enviada!</p>
            <p className="text-sm text-muted-foreground">David revisará tu perfil y te contactará si hay fit.</p>
            <button onClick={onClose} className="mt-2 h-10 px-6 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm">
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Aplicar</p>
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company} — {job.salary}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Nombre completo *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Nivel de inglés</label>
                  <select
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-sm text-foreground outline-none focus:border-gold/50"
                  >
                    <option value="">Selecciona</option>
                    <option value="A1-A2">Básico (A1-A2)</option>
                    <option value="B1-B2">Intermedio (B1-B2)</option>
                    <option value="C1">Avanzado (C1)</option>
                    <option value="C2">Nativo/Bilingüe (C2)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Años de experiencia</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-sm text-foreground outline-none focus:border-gold/50"
                  >
                    <option value="">Selecciona</option>
                    <option value="0-1">0-1 años</option>
                    <option value="1-3">1-3 años</option>
                    <option value="3-5">3-5 años</option>
                    <option value="5+">5+ años</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Link a CV o LinkedIn</label>
                <input
                  type="url"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full h-10 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar Aplicación'}
                {!loading && <Send size={13} />}
              </button>
              <p className="text-xs text-muted-foreground text-center">David revisa cada aplicación personalmente.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
