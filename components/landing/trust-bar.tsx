import { Users, Briefcase, TrendingUp, Globe } from 'lucide-react'

const STATS = [
  { icon: Users, value: '2,400+', label: 'VAs en el ecosistema' },
  { icon: Briefcase, value: '180+', label: 'Ofertas activas' },
  { icon: TrendingUp, value: '94%', label: 'Tasa de colocación' },
  { icon: Globe, value: '12', label: 'Países LATAM' },
]

export function TrustBar() {
  return (
    <section className="relative py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
                  <Icon size={15} className="text-gold" />
                </div>
                <p className="text-lg md:text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
