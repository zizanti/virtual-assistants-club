'use client'

import { PublicNav } from '@/components/public-nav'
import { Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Nosotros</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl mb-4">
              Por qué existe VAC
            </h1>
          </div>

          <div className="rounded-[32px] border border-gold/20 bg-card p-8 md:p-10 mb-12 gold-border-glow">
            <Quote size={24} className="text-gold/20 mb-3" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              Hay miles de personas talentosas en LATAM atrapadas en trabajos locales mal pagos porque nadie les enseñó cómo funciona la contratación remota en USA.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">El problema</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Para el talento:</span> La mayoría de asistentes LATAM tienen las habilidades pero les faltan los sistemas, posicionamiento y conexiones para conseguir roles remotos en USA.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Para empresas:</span> Los founders necesitan asistentes confiables pero las plataformas tradicionales están llenas de ruido. No encuentran la señal.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">El fundador</h2>
            <div className="rounded-[32px] border border-border bg-card p-8">
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                David Santiago Moreno Rodriguez pasó 4 años trabajando en call centers en Bogotá antes de descubrir el mundo de los Executive Assistants remotos. Hoy tiene más de 4 años de experiencia trabajando con founders y equipos en USA.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                Graduado en Idiomas y Marketing de la Universidad EAN, entiende ambos lados: lo que las empresas esperan y lo que los candidatos necesitan. Su carrera lo ha llevado a viajar por 3 continentes y construir una vida con libertad financiera y geográfica.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                Su experiencia en roles de operaciones, comunicaciones ejecutivas y gestión de proyectos le permite cerrar no solo brechas de habilidades, sino también brechas de comunicación y expectativas entre el talento LATAM y las empresas gringas.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Las plataformas tradicionales fallan porque tratan la contratación como una transacción. VAC la trata como una relación — con guía, curaduría y contexto humano real, construido por alguien que pasó por el mismo camino.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground">David Santiago Moreno Rodriguez</p>
                <p className="text-xs text-muted-foreground">Fundador, Virtual Assistants Club · @zizanti</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">La misión</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-[32px] border border-border bg-card p-6 hover:border-gold/20 transition-colors">
                <h3 className="text-base font-semibold text-foreground mb-3">Para Talento LATAM</h3>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
                  <li>• Consigue mejores oportunidades remotas</li>
                  <li>• Construye carrera a largo plazo ganando en USD</li>
                  <li>• Recibe la guía que la educación tradicional no da</li>
                  <li>• Únete a una comunidad que te impulsa</li>
                </ul>
              </div>
              <div className="rounded-[32px] border border-border bg-card p-6 hover:border-gold/20 transition-colors">
                <h3 className="text-base font-semibold text-foreground mb-3">Para Empresas</h3>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
                  <li>• Contrata más rápido con candidatos verificados</li>
                  <li>• Trabaja con asistentes confiables y fluidos en inglés</li>
                  <li>• Salta el ruido de las plataformas tradicionales</li>
                  <li>• Haz match con talento que realmente encaja</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4 max-w-lg mx-auto text-sm">
              VAC existe para crear mejor alineación, mejores oportunidades y mejores resultados para ambos lados.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                Ver Trabajos <ArrowRight size={13} />
              </Link>
              <Link
                href="/for-companies"
                className="inline-flex items-center gap-2 h-10 px-5 border border-border text-foreground hover:border-gold/40 hover:text-gold hover:scale-[1.02] active:scale-[0.98] font-medium rounded-xl transition-all duration-200 text-sm"
              >
                Contrata un VA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
