'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  trend: number
  trendLabel: string
  color?: 'gold' | 'orange' | 'default'
  icon: React.ReactNode
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return count
}

export function MetricCard({ title, value, suffix = '', prefix = '', trend, trendLabel, color = 'default', icon }: MetricCardProps) {
  const count = useCountUp(value)
  const positive = trend >= 0

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80',
        color === 'gold' && 'hover:border-gold/30',
        color === 'orange' && 'hover:border-[#E8650A]/30'
      )}
    >
      {/* Background glow for accent cards */}
      {color === 'gold' && (
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(circle at 80% 20%, #D4A843 0%, transparent 60%)' }} />
      )}
      {color === 'orange' && (
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(circle at 80% 20%, #E8650A 0%, transparent 60%)' }} />
      )}

      <div className="flex items-start justify-between mb-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{title}</p>
        <div className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl',
          color === 'gold' ? 'bg-[#D4A843]/10 text-gold' :
          color === 'orange' ? 'bg-[#E8650A]/10 text-[#E8650A]' :
          'bg-secondary text-muted-foreground'
        )}>
          {icon}
        </div>
      </div>

      <div className="mb-3">
        <span
          className={cn(
            'text-3xl font-bold tracking-tight',
            color === 'gold' ? 'text-gold' : color === 'orange' ? 'text-[#E8650A]' : 'text-foreground'
          )}
          style={color === 'gold' ? { textShadow: '0 0 30px rgba(212,168,67,0.3)' } : undefined}
        >
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {positive ? (
          <TrendingUp size={13} className="text-green-400" />
        ) : (
          <TrendingDown size={13} className="text-red-400" />
        )}
        <span className={cn('text-xs font-medium', positive ? 'text-green-400' : 'text-red-400')}>
          {positive ? '+' : ''}{trend}%
        </span>
        <span className="text-xs text-muted-foreground">{trendLabel}</span>
      </div>
    </div>
  )
}
