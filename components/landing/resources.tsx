import { ArrowUpRight, DollarSign, Cpu, MessageSquare, TrendingUp, FileText, Users } from 'lucide-react'

const RESOURCES = [
  {
    icon: DollarSign,
    tag: 'Finance',
    tagColor: 'gold',
    title: 'How to get paid in USD',
    description: 'Set up international payment accounts, negotiate USD rates, and manage cross-border transfers as a LATAM VA.',
    readTime: '6 min read',
  },
  {
    icon: Cpu,
    tag: 'AI Tools',
    tagColor: 'orange',
    title: 'Top AI tools for VAs in 2025',
    description: 'The exact AI stack used by top-earning executive assistants — from inbox automation to meeting prep to research.',
    readTime: '8 min read',
  },
  {
    icon: MessageSquare,
    tag: 'Interviews',
    tagColor: 'gold',
    title: 'Interview scripts that get you hired',
    description: 'Word-for-word answers to the 10 most common EA interview questions from US startup founders.',
    readTime: '10 min read',
  },
  {
    icon: TrendingUp,
    tag: 'Career',
    tagColor: 'orange',
    title: 'From $1,000 to $5,000/mo as a VA',
    description: 'A real roadmap for leveling up your positioning, skills, and rates in the US market over 12 months.',
    readTime: '12 min read',
  },
  {
    icon: FileText,
    tag: 'Templates',
    tagColor: 'gold',
    title: 'EA proposal & SOW templates',
    description: 'Professional proposal and statement of work templates to close clients faster and look more credible.',
    readTime: '5 min read',
  },
  {
    icon: Users,
    tag: 'Community',
    tagColor: 'orange',
    title: 'Build your VA referral network',
    description: 'How LATAM EAs are quietly building referral networks that generate consistent inbound clients without cold outreach.',
    readTime: '7 min read',
  },
]

const TAG_STYLES = {
  gold:   'bg-gold/10 text-gold border-gold/25',
  orange: 'bg-orange/10 text-orange border-orange/25',
}

export function Resources() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
              Resources
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Learn from the best
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md text-pretty">
              Practical guides, templates, and playbooks written by and for LATAM executive assistants.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors shrink-0"
          >
            Browse all resources
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {RESOURCES.map((r) => {
            const Icon = r.icon
            const accentColor = r.tagColor === 'gold' ? '#D4A843' : '#E8650A'
            const iconBg = r.tagColor === 'gold' ? 'rgba(212,168,67,0.08)' : 'rgba(232,101,10,0.08)'
            const iconBorder = r.tagColor === 'gold' ? 'rgba(212,168,67,0.2)' : 'rgba(232,101,10,0.2)'

            return (
              <article
                key={r.title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:shadow-xl hover:shadow-black/30 cursor-pointer"
              >
                {/* Icon + tag row */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: iconBg, border: `1px solid ${iconBorder}` }}
                  >
                    <Icon size={18} style={{ color: accentColor }} />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${TAG_STYLES[r.tagColor as keyof typeof TAG_STYLES]}`}
                  >
                    {r.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-gold transition-colors text-balance mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">{r.readTime}</span>
                  <span
                    className="flex items-center gap-1 text-xs font-medium transition-colors group-hover:text-gold text-muted-foreground"
                    style={{}}
                  >
                    Read
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
