'use client'

import { PublicNav } from '@/components/public-nav'
import { BookOpen, FileText, Mic, Bot, DollarSign, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

const RESOURCES = [
  {
    icon: BookOpen,
    title: 'Guía Gratis',
    description: 'Cómo conseguir tu primer trabajo remoto en USA siendo LATAM — plantillas de CV, guiones de entrevista, negociación salarial.',
    tag: 'Gratis',
    href: '#',
  },
  {
    icon: FileText,
    title: 'Plantillas de CV',
    description: 'Plantillas de CV optimizadas para ATS, diseñadas para roles de EA y VA en empresas gringas.',
    tag: 'Gratis',
    href: '#',
  },
  {
    icon: Mic,
    title: 'Guiones de Entrevista',
    description: 'Preguntas comunes y cómo responderlas. Los frameworks que los founders gringos esperan.',
    tag: 'Gratis',
    href: '#',
  },
  {
    icon: Bot,
    title: 'IA para EAs',
    description: 'Plantillas de automatización, prompts de ChatGPT y sistemas de Notion usados por los mejores asistentes ejecutivos.',
    tag: 'Gratis',
    href: '#',
  },
  {
    icon: DollarSign,
    title: 'Negociación Salarial',
    description: 'Guiones y datos para negociar tu tarifa. Sabe lo que paga el mercado y cómo pedir más.',
    tag: 'Gratis',
    href: '#',
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Recursos</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl mb-4">
              Recursos Gratis para Asistentes LATAM
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para conseguir un trabajo remoto en USA. Plantillas, guiones, guías — todo gratis.
            </p>
          </div>

          {/* Resource Cards */}
          <div className="space-y-3 mb-12">
            {RESOURCES.map((resource) => {
              const Icon = resource.icon
              return (
                <div
                  key={resource.title}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-gold/20 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors flex-shrink-0">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-foreground">{resource.title}</h2>
                        <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">{resource.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/5 px-2 py-0.5 text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                        {resource.tag}
                      </span>
                      <Download size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center rounded-3xl border border-gold/20 bg-card p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Newsletter Semanal</p>
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">
              Recibe recursos nuevos cada semana
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Remote Intel by Zizanti — el newsletter donde compartimos las últimas plantillas, guiones, herramientas y oportunidades.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Suscríbete Gratis <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
