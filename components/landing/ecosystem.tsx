import Link from 'next/link'
import { BookText, Newspaper, Users, GraduationCap, Briefcase, Building2, ArrowRight } from 'lucide-react'

const PRODUCTS = [
  {
    icon: BookText,
    title: 'Guía Gratis',
    description: 'El recurso definitivo para asistentes LATAM que buscan trabajo remoto en USA.',
    href: '/resources',
    tag: 'Gratis',
    primary: false,
  },
  {
    icon: Newspaper,
    title: 'Newsletter',
    description: 'Remote Intel by Zizanti. Trabajos, herramientas, datos salariales y más cada lunes.',
    href: '/#newsletter',
    tag: 'Gratis',
    primary: false,
  },
  {
    icon: Users,
    title: 'Comunidad Skool',
    description: 'Comunidad privada de asistentes LATAM serios. Mentoría, feedback y apoyo.',
    href: '/community',
    tag: 'Free + Paid',
    primary: false,
  },
  {
    icon: Briefcase,
    title: 'Tablón de Trabajos',
    description: 'Ofertas remotas curadas para asistentes ejecutivos y virtuales en LATAM.',
    href: '/jobs',
    tag: 'Gratis',
    primary: true,
  },
  {
    icon: Building2,
    title: 'Contrata un VA',
    description: 'Empresas: consigue talento LATAM verificado y pre-seleccionado para tu equipo.',
    href: '/for-companies',
    tag: 'B2B',
    primary: false,
  },
  {
    icon: GraduationCap,
    title: 'Mentoría',
    description: 'Guía uno-a-uno de EAs experimentados que han estado donde tú estás.',
    href: '/community',
    tag: 'Premium',
    primary: false,
  },
]

export function EcosystemSection() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">El Ecosistema</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-balance">
            Todo lo que VAC ofrece
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Un sistema completo diseñado para ayudarte a ganar más, crecer más rápido y ser contratado.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => {
            const Icon = product.icon
            return (
              <Link
                key={product.title}
                href={product.href}
                className="group relative rounded-2xl border border-border bg-card p-5 hover:border-gold/20 hover:bg-card/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {product.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-gold transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
                {product.primary && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-gold font-medium">
                    Ver trabajos <ArrowRight size={10} />
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
