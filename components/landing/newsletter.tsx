'use client'

import { useState } from 'react'
import { ArrowRight, Mail, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const PERKS = [
  'Curated remote jobs — published every Monday',
  'AI tools & automations for executive assistants',
  'Salary data, scripts, and negotiation frameworks',
  'What top LATAM EAs are doing to earn in USD',
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,67,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Outer card */}
          <div className="rounded-3xl border border-gold/20 bg-card p-10 md:p-14 text-center relative overflow-hidden gold-border-glow">

            {/* Corner decoration */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)' }}
            />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.06) 0%, transparent 70%)' }}
            />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-xs font-semibold text-gold mb-6">
              <Sparkles size={12} />
              Free · Weekly · No spam
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              Remote Intel by Santi
            </h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed mb-8 text-pretty">
              The weekly brief for LATAM executive assistants who want to earn more, work smarter, and get hired by top US companies.
            </p>

            {/* Perks list */}
            <ul className="inline-flex flex-col items-start gap-2.5 mb-10 text-left">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-gold mt-0.5 shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>

            {/* Form */}
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                  <CheckCircle2 size={28} className="text-gold" />
                </div>
                <p className="font-semibold text-foreground text-lg">You&apos;re in!</p>
                <p className="text-sm text-muted-foreground">Check your inbox — first issue lands Monday.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-gold/50 focus-visible:border-gold/40"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-11 px-6 bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold shrink-0"
                >
                  Subscribe
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-5">
              Join 2,400+ VAs already reading every week.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
