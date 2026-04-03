'use client'

import Link from 'next/link'
import { ArrowRight, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,67,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5 px-4 py-1.5 text-xs font-medium text-gold mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Now hiring in 12 LATAM countries
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance mb-6">
          The{' '}
          <span
            className="text-gold"
            style={{ textShadow: '0 0 40px rgba(212,168,67,0.4)' }}
          >
            #1 Executive Assistant
          </span>
          <br />
          Talent Network in LATAM
        </h1>

        {/* Subtext */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed mb-10 text-pretty">
          Connect elite virtual assistants with top US companies. Curated opportunities, vetted talent, and a community that helps you grow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold px-8 h-12"
          >
            Browse Jobs
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:border-gold/50 hover:text-gold h-12 px-8"
          >
            Hire a VA
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
          {[
            { icon: Users, value: '2,400+', label: 'VAs Registered' },
            { icon: Briefcase, value: '180+', label: 'Active Listings' },
            { icon: ArrowRight, value: '94%', label: 'Placement Rate' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-muted-foreground">
              <Icon size={16} className="text-gold" />
              <span className="font-semibold text-foreground">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
