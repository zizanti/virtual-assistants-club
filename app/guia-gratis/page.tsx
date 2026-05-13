'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { CheckCircle2, ArrowRight, BookOpen, Target, AlertTriangle, FileText, DollarSign, MapPin, Download } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ukvjzsfrcmeqjrsxjahu.supabase.co'
const FREE_GUIDE_URL = `${SUPABASE_URL}/storage/v1/object/public/guides/guia-gratis.pdf`

const HIGHLIGHTS = [
  { icon: BookOpen, text: 'Qué es realmente ser VA/EA y cómo posicionarte bien desde el inicio' },
  { icon: Target, text: 'Qué esperan las empresas de USA (y qué casi nadie te dice)' },
  { icon: AlertTriangle, text: 'Los errores más comunes y cómo evitarlos antes de aplicar' },
  { icon: FileText, text: 'Mi método para actualizar el CV según cada tipo de posición' },
  { icon: DollarSign, text: 'Rangos de pago reales en USD por perfil' },
  { icon: MapPin, text: 'Plataformas donde aplicar + lista extendida en la guía completa' },
]

export default function GuiaGratisPage() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    if (!consent) {
      setError('Debes aceptar recibir el newsletter')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success !== false) {
        setSuccess(true)
      } else if (data.message === 'Email already subscribed') {
        // If already subscribed, still show success to download the guide
        setSuccess(true)
      } else {
        setError(data.error || data.message || 'Error al procesar. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Guía Gratuita</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-3">
            Cómo conseguir trabajo como Asistente Virtual con clientes en USA
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Por Zizanti. De call center a EA remoto. Esto es lo que sé que funciona, basado en experiencia real.
          </p>
        </div>

        {/* What you get */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
          <h2 className="font-semibold text-foreground text-sm mb-5 text-center">Lo que vas a encontrar</h2>
          <div className="space-y-3">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 flex-shrink-0">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">{h.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form or Success */}
        <div className="rounded-2xl border border-gold/20 bg-card p-6 md:p-8 gold-border-glow">
          {!success ? (
            <>
              <h2 className="font-semibold text-foreground text-sm mb-1 text-center">Descarga la guía gratis</h2>
              <p className="text-xs text-muted-foreground text-center mb-5">Deja tu email y te la envío de inmediato.</p>
              <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
                  disabled={loading}
                />
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border bg-secondary accent-gold flex-shrink-0"
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Acepto recibir el newsletter <strong className="text-foreground">Remote Intel by Zizanti</strong> con trabajos, datos salariales y herramientas. Sin spam.
                  </label>
                </div>
                {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviarme la Guía Gratis'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/30 mx-auto mb-4">
                <CheckCircle2 size={28} className="text-gold" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-1">¡Guía lista!</p>
              <p className="text-sm text-muted-foreground mb-4">Gracias por suscribirte.</p>
              <a
                href={FREE_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full max-w-xs h-11 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm mb-4"
              >
                <Download size={16} />
                Descargar Guía Gratis
              </a>
              <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 max-w-xs mx-auto">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  También recibirás el <strong className="text-gold">newsletter semanal</strong> con trabajos remotos, datos salariales y herramientas. Cancelas cuando quieras.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upgrade CTA */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground mb-3">¿Quieres ir más allá?</p>
          <Link
            href="/guia-premium"
            className="inline-flex items-center gap-2 h-10 px-5 border border-gold/30 text-gold hover:bg-gold/5 hover:scale-[1.02] active:scale-[0.98] font-medium rounded-xl transition-all duration-200 text-sm"
          >
            Ver Guía Premium <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
