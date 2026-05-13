'use client'

import { PublicNav } from '@/components/public-nav'
import { Users, Sparkles, Target, Star, ArrowRight, Check } from 'lucide-react'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Comunidad</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl mb-4">
              La Comunidad VAC
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un espacio curado para asistentes LATAM que quieren ganar más, crecer más rápido y conseguir los mejores trabajos remotos.
            </p>
          </div>

          {/* Tiers */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {/* Free Tier */}
            <div className="rounded-[32px] border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10">
                  <Sparkles size={18} className="text-gold" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">Gratis</h2>
                  <p className="text-xs text-muted-foreground">Todos empiezan aquí</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  'Newsletter semanal con trabajos curados',
                  'Datos salariales y guías de negociación',
                  'Herramientas de IA y plantillas',
                  'Guía de CV y guiones de entrevista gratis',
                  'Acceso al tablón de trabajos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Paid Tier */}
            <div className="rounded-[32px] border border-gold/30 bg-card p-6 gold-border-glow relative">
              <div className="absolute -top-2.5 right-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider">
                  <Star size={9} fill="currentColor" /> Popular
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10">
                  <Target size={18} className="text-gold" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">Comunidad Skool</h2>
                  <p className="text-xs text-muted-foreground">Privada · Curada</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  'Grupo privado en Skool con +25 perfiles activos',
                  'Mentoría directa de EAs experimentados',
                  'Revisiones de CV y LinkedIn',
                  'Preparación y simulacros de entrevistas',
                  'Pipeline de perfiles listos para empresas',
                  'Acceso prioritario a nuevas ofertas',
                  'Conecta con otros asistentes LATAM serios',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who it&apos;s for */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4 text-center">¿Para quién es?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: 'Trabajadores BPO', desc: 'Transicionando a roles VA remotos' },
                { title: 'VAs Principiantes', desc: 'Buscando guía y estructura' },
                { title: 'EAs Experimentados', desc: 'Buscando mejores oportunidades' },
                { title: 'Talento LATAM', desc: 'Apuntando a ingresos en USD' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/50 p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 text-center">
            {[
              { value: '30K+', label: 'Seguidores en redes' },
              { value: '2,000+', label: 'Miembros comunidad' },
              { value: '94%', label: 'Satisfacción colocación' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => window.open('https://www.skool.com/virtual-assistants-latam-2741/about', '_blank')}
              className="inline-flex items-center gap-2 h-11 px-7 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200"
            >
              Únete a la Comunidad <ArrowRight size={15} />
            </button>
            <p className="text-sm text-muted-foreground mt-3">
              Un canal privado para aplicantes activos y perfiles listos para empresas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
