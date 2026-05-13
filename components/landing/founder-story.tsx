import { Quote, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-moreno-ea' },
  { label: 'Instagram', href: 'https://www.instagram.com/zizantii/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@zizantii' },
  { label: 'YouTube', href: 'https://www.youtube.com/@zizanti' },
]

export function FounderStory() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10 relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)' }}
            />
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20">
                  <span className="font-serif text-2xl md:text-3xl font-bold text-gold">D</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Mi Historia</p>
                <Quote size={20} className="text-gold/20 mb-3" />
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Soy <span className="text-foreground font-semibold">David Santiago Moreno Rodriguez</span>. Pasé 4 años trabajando en call centers en Bogotá. Mi vida cambió cuando descubrí el mundo de los Executive Assistants remotos.
                  </p>
                  <p>
                    En los últimos 4+ años he trabajado con founders y equipos en USA, gestionando operaciones, proyectos y comunicaciones ejecutivas para startups y empresas. Esa transición me permitió viajar a 3 continentes, comprarme la moto de mis sueños, y vivir con una libertad que antes no sabía que existía.
                  </p>
                  <p>
                    Construí VAC porque sé exactamente lo que se siente estar atrapado en un trabajo local mal pago sin saber que hay todo un mundo de oportunidades remotas esperando. No soy un gurú — soy alguien que pasó por el proceso y quiere mostrar el camino.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground">David Santiago Moreno Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Founder, Virtual Assistants Club</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border border-border bg-secondary/50 text-[10px] text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-200"
                      >
                        {s.label} <ExternalLink size={9} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
