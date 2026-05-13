'use client'

import { useState } from 'react'
import { PublicNav } from '@/components/public-nav'
import { CheckCircle2, ArrowRight, Star, Zap, Shield, Crown, FileText, Video, MessageSquare, TrendingUp, DollarSign, MapPin, Download } from 'lucide-react'

const WOMPI_GUIDE_LINK = 'https://checkout.wompi.co/l/Nf2FLc'

const HIGHLIGHTS = [
  {
    icon: Crown,
    title: 'VA vs EA: qué significa cada uno',
    desc: 'Diferencias reales, perfiles híbridos EA + Project Manager, y cuál paga más.',
  },
  {
    icon: DollarSign,
    title: 'Rangos de salario reales en USD',
    desc: 'De $600 a $6,000+ mensuales. Tabla completa por perfil y experiencia.',
  },
  {
    icon: FileText,
    title: 'El CV: estructura y lógica que funciona',
    desc: 'Plantilla real en inglés con ejemplo completo. Cómo adaptarlo por posición.',
  },
  {
    icon: MapPin,
    title: 'Las 20 plataformas para aplicar',
    desc: 'Freelance, bolsas remotas, especializadas en LATAM y VA. Consejos por cada una.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación profesional en inglés',
    desc: 'Lo que esperan los clientes, errores que cuestan el trabajo, cómo sonar profesional.',
  },
  {
    icon: Zap,
    title: 'Dejar de sonar a call center',
    desc: 'Cómo traducir tu experiencia BPO al lenguaje de EA/VA sin mentir.',
  },
  {
    icon: Video,
    title: 'Cómo aplicar bien y preparar entrevistas',
    desc: 'Video Loom, carta de presentación, respuestas para las 6 preguntas que siempre salen.',
  },
  {
    icon: TrendingUp,
    title: 'El juego largo: construir carrera remota',
    desc: 'Cómo pasar de $1,000 a $5,000/mes. Reputación, especialización, recomendaciones.',
  },
]

export default function GuiaPremiumPage() {
  const handleCheckout = () => {
    window.location.href = WOMPI_GUIDE_LINK
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold mb-4">
            <Crown size={12} />
            Guía Premium
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-3">
            De Call Center a Asistente Virtual o Ejecutivo con clientes en USA
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Todo lo concreto: CV, plataformas, estrategia de aplicación, posicionamiento, comunicación. Construido desde la experiencia real de Zizanti.
          </p>
        </div>

        {/* Price tag */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl font-bold text-gold">$18,000 COP</span>
          <span className="text-xs text-muted-foreground">Menos que un tinto. Más valor que un curso de $500K.</span>
        </div>

        {/* Highlights */}
        <div className="rounded-2xl border border-gold/20 bg-card p-6 md:p-8 mb-8 gold-border-glow">
          <h2 className="font-semibold text-foreground text-sm mb-5 text-center">Lo que incluye la Guía Premium</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 flex-shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bonus */}
        <div className="rounded-xl border border-border bg-secondary/30 p-5 mb-8">
          <p className="text-xs text-gold font-semibold mb-2">BONUS</p>
          <p className="text-sm text-foreground font-medium mb-1">10% de descuento en tu primera mentoría 1:1</p>
          <p className="text-xs text-muted-foreground">
            Incluye un código de descuento exclusivo para tu primera sesión. Se entrega junto con la guía.
          </p>
        </div>

        {/* Checkout */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-semibold text-foreground text-sm mb-1 text-center">Comprar Guía Premium</h2>
          <p className="text-xs text-muted-foreground text-center mb-5">Pago seguro con Wompi. Acceso inmediato.</p>
          <div className="max-w-sm mx-auto space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              Comprar Guía — $18,000 <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-muted-foreground text-center">
              Pago 100% seguro · Acceso inmediato post-pago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
