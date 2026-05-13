'use client'

import { useState } from 'react'
import { ArrowRight, Mail, CheckCircle2, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'

const PERKS = [
  'Trabajos remotos curados — cada lunes',
  'Herramientas de IA y automatización para EAs',
  'Datos salariales, guiones y marcos de negociación',
  'Lo que los mejores EAs LATAM están haciendo para ganar en USD',
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter' }),
      })
      if (response.ok) {
        setSuccess(true)
        setEmail('')
      } else {
        const data = await response.json()
        setError(data.error || 'Algo salió mal.')
      }
    } catch {
      setError('Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="newsletter" className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,67,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-gold/20 bg-card p-8 md:p-10 text-center relative overflow-hidden gold-border-glow">
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)' }}
            />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.06) 0%, transparent 70%)' }}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold mb-5">
              <Sparkles size={11} />
              Gratis · Semanal · Sin spam
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
              Remote Intel by Zizanti
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed mb-6 text-pretty">
              El briefing semanal para asistentes LATAM que quieren ganar más, trabajar mejor y ser contratados por empresas gringas.
            </p>
            <ul className="inline-flex flex-col items-start gap-2 mb-6 text-left">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} className="text-gold mt-0.5 shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
            {success ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                  <CheckCircle2 size={24} className="text-gold" />
                </div>
                <p className="font-semibold text-foreground">¡Estás dentro!</p>
                <p className="text-sm text-muted-foreground">Recibirás también la guía gratis en tu correo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-gold/50 focus-visible:border-gold/40 text-sm"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold shrink-0 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 text-sm"
                >
                  {loading ? 'Suscribiendo...' : 'Suscribirme'}
                  {!loading && <ArrowRight size={13} />}
                </button>
              </form>
            )}
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            <p className="text-xs text-muted-foreground mt-4">
              +2,400 VAs ya lo leen cada semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
