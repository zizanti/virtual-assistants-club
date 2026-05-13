'use client'

import { PublicNav } from '@/components/public-nav'
import { useState } from 'react'
import { Check, ArrowRight, Shield, Zap, Search, MessageSquare, Clock, Star } from 'lucide-react'

const REASONS = [
  'Pre-vetted talent — not random applicants',
  'Strong English communication (C1 average)',
  'Experience working with US-based teams',
  'Fast turnaround — matched in days, not weeks',
  'Timezone overlap (US business hours)',
  'Candidates actually trained and guided',
]

const PROCESS = [
  { icon: MessageSquare, title: '1. Tell us what you need', description: 'Share the role, skills, and expectations. We handle the rest.' },
  { icon: Search, title: '2. We find your match', description: 'We search our curated community and present the best 2–3 candidates.' },
  { icon: Shield, title: '3. Vetted and ready', description: 'Every candidate is pre-screened for English level, experience, and reliability.' },
  { icon: Star, title: '4. You hire with confidence', description: 'No long-term contracts. Simple placement fee. Replacements included.' },
]

export default function ForCompaniesPage() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [requirements, setRequirements] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!name.trim() || !company.trim() || !email.trim() || !requirements.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">For Companies</p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl mb-6">
              Hire Pre-Vetted Virtual Assistants from LATAM
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help founders and teams hire reliable, high-performing Virtual Assistants without wasting time on hundreds of applications.
            </p>
          </div>

          {/* Why VAC */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Why founders use VAC instead of Upwork
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {REASONS.map((reason) => (
                <div key={reason} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">How hiring works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 mx-auto mb-4">
                      <Icon size={22} className="text-gold" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Founder angle + Form */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left — Founder angle */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Built by an operator who understands both worlds
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  VAC was built by a Senior Executive Assistant based in Colombia, with years of experience working directly with US founders and teams.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Clock, title: 'Average time to match', value: '3–5 days' },
                  { icon: MessageSquare, title: 'English level', value: 'C1 average (advanced)' },
                  { icon: Shield, title: 'Placement guarantee', value: 'Free replacement if needed' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-gold" />
                        <span className="text-sm text-muted-foreground">{item.title}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-[32px] border border-gold/20 bg-card p-8 shadow-xl shadow-black/10 gold-border-glow">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                    <Check size={28} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">We received your request!</p>
                    <p className="text-sm text-muted-foreground mt-1">We&apos;ll review it and get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Hire a VA</h3>
                  <div className="space-y-4">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 placeholder:text-muted-foreground/60"
                    />
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 placeholder:text-muted-foreground/60"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="your.email@company.com"
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 placeholder:text-muted-foreground/60"
                    />
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Describe the role, skills needed, hours, and any specific requirements..."
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 min-h-[120px] resize-none placeholder:text-muted-foreground/60"
                    />
                    <button
                      onClick={handleSubmit}
                      className="w-full h-11 px-4 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200"
                    >
                      Get Started
                    </button>
                    <p className="text-xs text-muted-foreground/70 text-center mt-2">
                      We typically respond within 24 hours.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Pricing</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Simple and aligned: Small placement fee. No long-term contracts. No unnecessary complexity.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-gold">
              <Zap size={14} />
              One-time placement fee — transparent, no hidden costs
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
