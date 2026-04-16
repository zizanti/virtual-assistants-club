'use client'

import { PublicNav } from '@/components/public-nav'
import { Button } from '@/components/ui/button'

export default function CommunityPage() {
  const handleJoinCommunity = () => {
    // Placeholder for community link
    console.log('Join community clicked')
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Community</p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl mb-6">
              A Community Built for Real Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              VAC is more than a job board. It’s a growing ecosystem of Virtual Assistants actively improving, applying, and landing remote roles.
            </p>
          </div>

          <div className="grid gap-8 mb-16">
            <div className="rounded-[32px] border border-border bg-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Real traction</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 30,000+ followers across platforms</li>
                <li>• Private community with 2,000+ members</li>
                <li>• Smaller, curated Skool group with 25+ active, high-quality profiles</li>
              </ul>
            </div>

            <div className="rounded-[32px] border border-border bg-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">A unique pipeline</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Candidates are not random. They are learning, improving, and being guided. The best profiles naturally rise to the top.</p>
                <p>For talent: You don’t just apply — you improve and get closer to better opportunities.</p>
                <p>For companies: You don’t get flooded with noise — you access a filtered, active talent pool.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={handleJoinCommunity} className="bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold px-8 py-3">
              Join the community
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              A private channel for active applicants and curated company-ready profiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}