import { BookOpen, TrendingUp, Briefcase } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  {
    icon: BookOpen,
    title: '1. Aprende',
    description: 'Accede a guías gratis, plantillas de CV, guiones de entrevista y herramientas de IA para asistentes LATAM.',
    items: ['Guía gratuita & recursos', 'Newsletter semanal', 'Datos salariales & templates'],
    href: '/resources',
  },
  {
    icon: TrendingUp,
    title: '2. Mejora',
    description: 'Únete a una comunidad de asistentes serios. Consigue mentoría, feedback y sistemas que funcionan.',
    items: ['Comunidad Skool', 'Herramientas de IA', 'Preparación de entrevistas'],
    href: '/community',
  },
  {
    icon: Briefcase,
    title: '3. Consigue Trabajo',
    description: 'Aplica a roles remotos curados en nuestro tablón o haz match con empresas contratando talento LATAM.',
    items: ['Ofertas curadas', 'Pipeline de talento verificado', 'Match directo con empresas'],
    href: '/jobs',
  },
]

export function HowVACWorks() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Cómo Funciona</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance">
            Tu sistema de carrera
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Aprende el juego. Mejora tus habilidades. Consigue el rol.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Link
                key={step.title}
                href={step.href}
                className="relative rounded-2xl border border-border bg-card p-6 hover:border-gold/20 transition-all duration-300 block group"
              >
                <div className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 border border-gold/20 text-[11px] font-bold text-gold">
                  {i + 1}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 mb-4">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                      <span className="h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>
        <div className="hidden md:flex justify-center mt-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full border border-border bg-secondary">Aprende → Mejora → Consigue Trabajo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
