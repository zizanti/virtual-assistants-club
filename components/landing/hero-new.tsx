'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Star, GraduationCap, Briefcase, Users, Building2 } from 'lucide-react'

const SECTIONS = [
  {
    eyebrow: 'CRECE TU CARRERA',
    title: 'Aprende, mejora y avanza',
    subtitle: 'Todo lo que necesitas para convertirte en un Asistente Virtual altamente demandado.',
    items: [
      {
        icon: BookOpen,
        title: 'Guía Gratis!',
        desc: 'Paso a paso para conseguir tu primer trabajo remoto en USA.',
        cta: 'Descargar',
        href: '/guia-gratis',
        highlight: true,
      },
      {
        icon: Star,
        title: 'Guía Premium',
        desc: 'Estrategias avanzadas, plantillas y sistemas para ganar más en USD.',
        cta: 'Ver más',
        href: '/guia-premium',
        highlight: false,
      },
      {
        icon: GraduationCap,
        title: 'Coaching 1:1',
        desc: 'Sesiones personalizadas para acelerar tu carrera.',
        cta: 'Reservar',
        href: '/coaching',
        highlight: false,
      },
    ],
  },
  {
    eyebrow: 'OPORTUNIDADES REALES',
    title: 'Conecta, aplica y consigue',
    subtitle: 'Acceso a trabajos, comunidad y oportunidades exclusivas.',
    items: [
      {
        icon: Briefcase,
        title: 'Trabajos Remotos',
        desc: 'Vacantes verificadas de empresas en USA que buscan talento LATAM.',
        cta: 'Buscar trabajos',
        href: '/jobs',
        highlight: false,
      },
      {
        icon: Users,
        title: 'Comunidad',
        desc: 'Conecta con otros VAs, comparte experiencias y crece juntos.',
        cta: 'Unirme',
        href: '/community',
        highlight: false,
      },
      {
        icon: Building2,
        title: 'Hire a VA',
        desc: 'Empresas: encuentra Asistentes Virtuales pre-vetted y listos.',
        cta: 'Contratar',
        href: '/for-companies',
        highlight: false,
      },
    ],
  },
]

function ServiceCard({ item }: { item: typeof SECTIONS[0]['items'][0] }) {
  const Icon = item.icon
  return (
    <div className="relative flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 group">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
        <Icon size={20} className="text-gold" />
      </div>
      <h3 className="font-semibold text-foreground text-sm mb-2">{item.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-[220px]">{item.desc}</p>
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.03] active:scale-[0.97] text-xs font-semibold transition-all duration-200 mt-auto"
      >
        {item.cta} <ArrowRight size={12} />
      </Link>
    </div>
  )
}

function PyramidSection({ section }: { section: typeof SECTIONS[0] }) {
  const top = section.items[0]
  const left = section.items[1]
  const right = section.items[2]

  return (
    <div className="relative mb-16">
      <div className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">{section.eyebrow}</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance mb-2">{section.title}</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">{section.subtitle}</p>
      </div>

      <div className="relative max-w-lg mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-[240px]">
            <ServiceCard item={top} />
          </div>
        </div>

        <div className="relative h-8 hidden md:block">
          <div className="absolute left-[20%] right-[50%] top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/40" style={{ transform: 'rotate(18deg)', transformOrigin: 'right center' }} />
          <div className="absolute left-[50%] right-[20%] top-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/40" style={{ transform: 'rotate(-18deg)', transformOrigin: 'left center' }} />
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
          <ServiceCard item={left} />
          <ServiceCard item={right} />
        </div>
      </div>
    </div>
  )
}

export function HeroNew() {
  return (
    <section className="relative overflow-hidden pt-10 pb-4 md:pt-14 md:pb-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)' }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-3">
            Tu carrera remota{' '}
            <span className="text-gold" style={{ textShadow: '0 0 40px rgba(212,168,67,0.4)' }}>
              empieza aquí
            </span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Guías, coaching, comunidad y trabajos remotos para asistentes LATAM que quieren ganar en USD.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mt-4">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            +2,400 VAs en 12 países
          </div>
        </div>

        {SECTIONS.map((section) => (
          <PyramidSection key={section.eyebrow} section={section} />
        ))}
      </div>
    </section>
  )
}
