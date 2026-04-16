'use client'

import { PublicNav } from '@/components/public-nav'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">About</p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl mb-6">
              Why VAC Exists
            </h1>
          </div>

          {/* Problem Statement */}
          <div className="mb-16">
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-xl shadow-black/10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                VAC was built to solve a simple problem: There is a massive gap between talented people in LATAM and companies in the US that need support.
              </p>
            </div>
          </div>

          {/* Founder Story */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Founder Story</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Built by a Senior Executive Assistant based in Colombia, after years of working with US founders and teams.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Understanding both sides: What companies actually need. What candidates are missing.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-[32px] border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">For LATAM Talent</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Land better remote opportunities</li>
                  <li>• Build long-term careers</li>
                </ul>
              </div>
              <div className="rounded-[32px] border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">For Companies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Hire faster</li>
                  <li>• Work with reliable people</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center">
            <p className="text-muted-foreground">
              VAC is designed to bridge that gap.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}