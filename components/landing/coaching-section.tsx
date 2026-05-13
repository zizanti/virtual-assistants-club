import { Calendar, Clock, Video, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CoachingSection() {
  return (
    <section id="coaching" className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Coaching</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance">
            Sesiones de Coaching Personalizado
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Aprende directamente de mí. Estrategia, CV, negociación y roadmap para conseguir trabajo remoto en USA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 mx-auto mb-3">
              <Video size={18} className="text-gold" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">1-on-1 por Video</h3>
            <p className="text-xs text-muted-foreground">Sesión personalizada por Zoom o Google Meet conmigo.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 mx-auto mb-3">
              <MessageSquare size={18} className="text-gold" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Revisión de CV</h3>
            <p className="text-xs text-muted-foreground">Te ayudo a pulir tu CV y LinkedIn para que pase filtros ATS.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 mx-auto mb-3">
              <Calendar size={18} className="text-gold" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Plan de Carrera</h3>
            <p className="text-xs text-muted-foreground">Diseñamos tu roadmap paso a paso para conseguir trabajo en USD.</p>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-gold/30 bg-card bg-gradient-to-b from-gold/5 to-transparent p-8 text-center gold-border-glow">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">1 Sesión de Coaching</p>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">$105,000</span>
              <span className="text-sm text-muted-foreground ml-1">COP</span>
            </div>
            <ul className="space-y-2 mb-6 text-left">
              {[
                'Sesión 1-on-1 de 60 minutos',
                'Revisión de CV y LinkedIn',
                'Plan de carrera personalizado',
                'Acceso a guiones de entrevista',
                'Soporte por DM después de la sesión',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={13} className="text-gold mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/checkout?product=coaching"
              className="inline-flex items-center justify-center gap-2 w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Agendar Sesión <ArrowRight size={14} />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Pago seguro con Wompi · Cancelación gratis 24h antes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
