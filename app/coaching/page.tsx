'use client'

import { PublicNav } from '@/components/public-nav'
import { CheckCircle2, ArrowRight, Crown, Target, Wrench, Map, FileText, Lightbulb, Clock, Video, Mail, Flame } from 'lucide-react'

const WOMPI_COACHING_LINK = 'https://checkout.wompi.co/l/VVJ6yF'

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
    title: 'Los Descargables',
    desc: 'Más de 20 plataformas para aplicar como VA/EA, 10 templates adicionales de outreach para llegar a nuevos clientes, CVs optimizados y guiones de entrevista.',
  },
]

const BONUSES = [
  '20+ plataformas para aplicar como VA/EA (directorios actualizados)',
  '10 templates de outreach para llegar a nuevos clientes',
  'Templates de CV optimizados en inglés',
  'Guiones de entrevista en inglés',
  'Plantillas de comunicación profesional',
  'Roadmap personalizado de 30 días',
  'Guía de negociación salarial',
  'Checklist de preparación para entrevistas',
]

export default function CoachingPage() {
  const handleCheckout = () => {
    window.location.href = WOMPI_COACHING_LINK
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          {/* HOT DEAL Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange bg-orange/20 px-4 py-1.5 text-xs font-bold text-orange mb-4">
            <Flame size={14} />
            HOT DEAL — Precio de Lanzamiento
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-3">
            Deja de sonar a Call Center y proyecta un perfil EA High-Ticket
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            45 minutos 1:1 conmigo. Diagnóstico, optimización de CV/LinkedIn, estrategia de aplicación y un plan concreto para los próximos 30 días.
          </p>
        </div>

        {/* Price with discount */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-lg text-muted-foreground line-through decoration-red-500">$169,000 COP</span>
            <span className="text-4xl font-bold text-gold">$100,000 COP</span>
          </div>
          <p className="text-xs text-orange font-semibold">Ahorra $69,000 — Solo por tiempo limitado</p>
          <p className="text-xs text-muted-foreground mt-1">Sesión de 45 minutos · Google Meet</p>
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
          <p className="text-xs text-gold font-semibold mb-3">DESCARGABLES INCLUIDOS</p>
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

        {/* Checkout */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-semibold text-foreground text-sm mb-1 text-center">Reservar sesión de coaching</h2>
          <p className="text-xs text-muted-foreground text-center mb-5">Pago seguro con Wompi.</p>
          <div className="max-w-sm mx-auto space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              Pagar y Reservar — $100,000 <ArrowRight size={14} />
            </button>
            {/* Warning about not closing Wompi */}
            <div className="rounded-lg border border-orange/30 bg-orange/10 p-3">
              <p className="text-xs text-orange font-medium text-center">
                No cierres Wompi después de pagar — serás redirigido automáticamente para agendar tu sesión
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Pago 100% seguro con Wompi
            </p>
          </div>
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
