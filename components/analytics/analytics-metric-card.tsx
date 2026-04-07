'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsMetricCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  trend: number
  trendLabel: string
  color?: 'gold' | 'orange' | 'default'
  icon: React.ReactNode
  description?: string
}

function useCountUp(target: number, duration = 1400, decimals = 0) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = null
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, decimals])

  return count
}

export function AnalyticsMetricCard({
  title,
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  trend,
  trendLabel,
  color = 'default',
  icon,
  description,
}: AnalyticsMetricCardProps) {
  const count = useCountUp(value, 1400, decimals)
  const positive = trend >= 0

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString()

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5',
        color === 'gold' && 'hover:border-gold/30',
        color === 'orange' && 'hover:border-[#E8650A]/30',
      )}
    >
      {color === 'gold' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle at 80% 15%, #D4A843 0%, transparent 65%)' }}
        />
      )}
      {color === 'orange' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle at 80% 15%, #E8650A 0%, transparent 65%)' }}
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl',
            color === 'gold'   ? 'bg-[#D4A843]/10 text-gold'      :
            color === 'orange' ? 'bg-[#E8650A]/10 text-[#E8650A]' :
                                 'bg-secondary text-muted-foreground',
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mb-1">
        <span
          className={cn(
            'text-3xl font-bold tracking-tight',
            color === 'gold'   ? 'text-gold'        :
            color === 'orange' ? 'text-[#E8650A]'   :
                                 'text-foreground',
          )}
          style={color === 'gold' ? { textShadow: '0 0 30px rgba(212,168,67,0.3)' } : undefined}
        >
          {prefix}{displayValue}{suffix}
        </span>
      </div>

      {description && (
        <p className="text-[11px] text-muted-foreground mb-3">{description}</p>
      )}

      <div className="flex items-center gap-1.5 mt-3">
        {positive
          ? <TrendingUp size={13} className="text-green-400" />
          : <TrendingDown size={13} className="text-red-400" />}
        <span className={cn('text-xs font-medium', positive ? 'text-green-400' : 'text-red-400')}>
          {positive ? '+' : ''}{trend}%
        </span>
        <span className="text-xs text-muted-foreground">{trendLabel}</span>
      </div>
    </div>
  )
}
