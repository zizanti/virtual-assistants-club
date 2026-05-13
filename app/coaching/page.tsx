'use client'

import { useState } from 'react'
import { PublicNav } from '@/components/public-nav'
import { CheckCircle2, ArrowRight, Crown, Target, Wrench, Map, FileText, Lightbulb, Clock, Video, Mail } from 'lucide-react'

const STEPS = [
  {
    icon: Target,
    title: 'Diagnóstico',
    desc: 'Revisamos qué te tiene estancado en el BPO y por qué no te están llamando.',
  },
  {
    icon: Wrench,
    title: 'Optimización',
    desc: 'Armamos el plan de ataque para tu CV y LinkedIn. Dejar de sonar a Call Center y proyectar un perfil EA High-Ticket.',
  },
  {
    icon: Map,
    title: 'Estrategia',
    desc: 'Definimos tu ruta para buscar clientes directos o agencias en USA.',
  },
  {
    icon: FileText,
    title: 'El Entregable',
    desc: 'Al terminar te mando un documento con el paso a paso exacto, más 5 anexos: templates, CV y páginas para aplicar.',
  },
]

const BONUSES = [
  'Templates de CV optimizados',
  'Guiones de entrevista',
  'Lista de plataformas para aplicar',
  'Plantillas de comunicación profesional',
  'Roadmap personalizado de 30 días',
]

export default function CoachingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/wompi/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          product: 'coaching',
          amount_in_cents: 10500000,
          currency: 'COP',
        }),
      })

      const data = await res.json()
      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setError(data.error || 'Error al procesar el pago')
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
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold mb-4">
            <Crown size={12} />
            Mentoria 1:1 con Zizanti
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-3">
            Deja de sonar a Call Center y proyecta un perfil EA High-Ticket
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            45 minutos 1:1 conmigo. Diagnóstico, optimización de CV/LinkedIn, estrategia de aplicación y un plan concreto para los próximos 30 días.
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl font-bold text-gold">$105,000 COP</span>
          <span className="text-xs text-muted-foreground">Sesión de 45 minutos · Google Meet</span>
        </div>

        {/* What we do */}
        <div className="rounded-2xl border border-gold/20 bg-card p-6 md:p-8 mb-8 gold-border-glow">
          <h2 className="font-semibold text-foreground text-sm mb-5 text-center">Lo que hacemos en los 45 minutos</h2>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bonuses */}
        <div className="rounded-xl border border-border bg-secondary/30 p-5 mb-8">
          <p className="text-xs text-gold font-semibold mb-3">INCLUYE 5 ANEXOS</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {BONUSES.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-gold flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-xl border border-gold/10 bg-gold/5 p-4 mb-8">
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="text-gold mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Tip:</strong> Trata de conectarte desde el computador para que podamos compartir pantalla y trabajar tu perfil en vivo.
            </p>
          </div>
        </div>

        {/* Important notice */}
        <div className="rounded-xl border border-orange/20 bg-orange/5 p-4 mb-8">
          <div className="flex items-start gap-2">
            <Clock size={14} className="text-orange mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Importante:</strong> Una vez completes el pago en Wompi, <strong className="text-gold">NO cierres la ventana</strong>. Serás redirigido automáticamente para agendar tu sesión en mi calendario.
            </p>
          </div>
        </div>

        {/* Checkout form */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-semibold text-foreground text-sm mb-1 text-center">Reservar sesión de coaching</h2>
          <p className="text-xs text-muted-foreground text-center mb-5">Pago seguro con Wompi. Después de pagar, agendas tu cita.</p>
          <form onSubmit={handleCheckout} className="space-y-3 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
              disabled={loading}
            />
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Procesando...' : (
                <>
                  Pagar y Reservar — $105,000 <ArrowRight size={14} />
                </>
              )}
            </button>
            <p className="text-[10px] text-muted-foreground text-center">
              Pago 100% seguro con Wompi · Redirección automática al calendario
            </p>
          </form>
        </div>

        {/* Contact */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground mb-2">¿Ningún horario te sirve?</p>
          <a 
            href="mailto:zizanti.va@gmail.com?subject=zizanti%201%20a%201" 
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-medium"
          >
            <Mail size={12} />
            Escríbeme a zizanti.va@gmail.com con tu disponibilidad
          </a>
        </div>
      </div>
    </div>
  )
}
