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

          <div className="mb-16">
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-xl shadow-black/10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                VAC was built to solve a real problem:
                <br />
                There is a gap between talented people in LATAM and companies in the US that need reliable support.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Founder Story</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Built by a Senior Executive Assistant based in Colombia.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With years of experience working remotely with US founders and teams, I understand both sides: what companies actually expect and what candidates are missing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond execution, I bring a strong foundation in communication, having studied and graduated in Languages and Marketing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This allows me to bridge not just skill gaps, but also communication and expectation gaps between LATAM talent and US companies.
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

          <div className="text-center">
            <p className="text-muted-foreground">
              VAC exists to create better alignment, better opportunities, and better outcomes for both sides.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}