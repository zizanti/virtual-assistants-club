'use client'

import { Brain, TrendingUp, UserX } from 'lucide-react'
import { cn } from '@/lib/utils'

const AI_RECS = [
  {
    icon: Brain,
    title: '3 new EA vacancies match your top candidates',
    detail: 'Accenture, OpenAI, and Ramp posted roles matching 8 active candidates',
    confidence: 96,
    color: 'gold',
  },
  {
    icon: TrendingUp,
    title: 'Post engagement peak: Tuesday 8am EST',
    detail: 'Your LinkedIn posts perform 3.2x better on Tuesday mornings',
    confidence: 89,
    color: 'orange',
  },
  {
    icon: UserX,
    title: '5 candidates haven\'t updated their profile',
    detail: 'Reach out to reactivate and improve matching accuracy',
    confidence: 78,
    color: 'default',
  },
]

export function AIRecommendations() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">AI Recommendations</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Powered by VAC Intelligence Engine</p>
        </div>
        <span className="rounded-full bg-[#D4A843]/10 border border-[#D4A843]/20 px-2.5 py-1 text-[10px] font-semibold text-gold">
          3 New
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AI_RECS.map((rec) => {
          const Icon = rec.icon
          return (
            <div
              key={rec.title}
              className={cn(
                'relative rounded-2xl border border-border bg-card p-4 transition-all hover:border-border/80 hover:-translate-y-0.5',
                rec.color === 'gold' && 'hover:border-gold/30',
                rec.color === 'orange' && 'hover:border-[#E8650A]/30',
              )}
            >
              {/* Confidence Badge */}
              <div className={cn(
                'absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold',
                rec.color === 'gold' ? 'bg-[#D4A843]/15 text-gold' :
                rec.color === 'orange' ? 'bg-[#E8650A]/15 text-[#E8650A]' :
                'bg-secondary text-muted-foreground'
              )}>
                {rec.confidence}%
              </div>

              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-xl mb-3',
                rec.color === 'gold' ? 'bg-[#D4A843]/10 text-gold' :
                rec.color === 'orange' ? 'bg-[#E8650A]/10 text-[#E8650A]' :
                'bg-secondary text-muted-foreground'
              )}>
                <Icon size={15} />
              </div>

              <p className="text-sm font-medium text-foreground leading-snug text-balance pr-8 mb-2">
                {rec.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {rec.detail}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
