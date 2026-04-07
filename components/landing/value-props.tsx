import { Zap, BookOpen, Globe } from 'lucide-react'

const VALUES = [
  {
    icon: Zap,
    accent: 'gold',
    eyebrow: '01',
    title: 'Get hired faster',
    description:
      'Skip the noise. Every job on VAC is pre-vetted, US-market ready, and pays in dollars. Our curated network means you spend less time searching and more time interviewing.',
    stat: '11 days',
    statLabel: 'average time to placement',
  },
  {
    icon: BookOpen,
    accent: 'orange',
    eyebrow: '02',
    title: 'Learn the system',
    description:
      'Access playbooks, scripts, and frameworks used by top LATAM EAs. From salary negotiation to AI toolstacks — everything you need to operate at the US executive level.',
    stat: '40+',
    statLabel: 'resources & templates',
  },
  {
    icon: Globe,
    accent: 'gold',
    eyebrow: '03',
    title: 'Access real opportunities',
    description:
      'Tap into a private network of 180+ active listings at VC-backed startups, Fortune 500 companies, and fast-moving founders looking for elite LATAM talent.',
    stat: '94%',
    statLabel: 'placement rate',
  },
]

export function ValueProps() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
            Why VAC
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            Built for LATAM EAs who{' '}
            <span className="text-gold">play at the top level</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon
            const isGold = v.accent === 'gold'
            const accentColor = isGold ? '#D4A843' : '#E8650A'
            const bgColor = isGold ? 'rgba(212,168,67,0.08)' : 'rgba(232,101,10,0.08)'
            const borderColor = isGold ? 'rgba(212,168,67,0.2)' : 'rgba(232,101,10,0.2)'

            return (
              <div
                key={v.title}
                className="relative flex flex-col gap-5 rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
                style={{ borderColor }}
              >
                {/* Eyebrow */}
                <span className="text-xs font-mono font-semibold tracking-widest" style={{ color: accentColor }}>
                  {v.eyebrow}
                </span>

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}
                >
                  <Icon size={22} style={{ color: accentColor }} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>

                {/* Stat */}
                <div className="mt-auto pt-5 border-t border-border/60">
                  <p className="font-serif text-2xl font-bold" style={{ color: accentColor }}>
                    {v.stat}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.statLabel}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
