'use client'

import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'Parce, antes de VAC ganaba $400 al mes en un call center. Seguí la guía, apliqué los guiones y en 2 meses conseguí un rol de EA por $1,800/mes. Esto es real.',
    name: 'Valentina G.',
    role: 'Executive Assistant · Barranquilla',
    badge: 'De $400 → $1,800/mes',
  },
  {
    quote: 'Yo pensé que eso de trabajar remoto era mentira. Apliqué a 3 ofertas del tablón, tuve entrevista en 2 y quedé en una. Chimba de comunidad.',
    name: 'Brayan C.',
    role: 'Senior VA · Medellín',
    badge: 'Contratado en 2 semanas',
  },
  {
    quote: 'El newsletter y la guía de negociación me sirvieron resto. Pedí aumento con el guion que mandan y me lo dieron. $400 más al mes por un correo bien escrito.',
    name: 'Daniela R.',
    role: 'Operations VA · Cali',
    badge: 'Consiguió aumento',
  },
  {
    quote: 'Lo que más me gusta es que David sí sabe de lo que habla. Trabajó en call center, fue EA, construyó esto él mismo. No es un gurú random vendiendo humo.',
    name: 'Felipe M.',
    role: 'EA · Bogotá',
    badge: 'Duplicó su salario',
  },
]

export function SocialProof() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Lo Que Dicen</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance">
            Resultados reales de talento LATAM
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Personas como tú que siguieron el sistema y hoy ganan en USD.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="group relative rounded-2xl border border-border bg-card p-5 hover:border-gold/20 hover:bg-card/80 transition-all duration-300"
            >
              <Quote size={16} className="text-gold/30 mb-2" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[10px] font-semibold text-gold whitespace-nowrap">
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
