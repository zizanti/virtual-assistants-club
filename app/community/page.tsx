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
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Community</p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl mb-6">
              A Community Built for Real Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is not just a group. It's a system where Virtual Assistants find real job opportunities, get feedback on applications, improve their positioning, and stay consistent.
            </p>
          </div>

          {/* Pipeline Explanation */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Inside the ecosystem:</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0A0A0A]">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Apply & Filter</h3>
                <p className="text-muted-foreground">
                  Candidates apply and get filtered through our rigorous process.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0A0A0A]">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Improve & Grow</h3>
                <p className="text-muted-foreground">
                  They improve through content, mentorship, and real work standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0A0A0A]">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Get Visible</h3>
                <p className="text-muted-foreground">
                  The best profiles become visible to companies actively hiring.
                </p>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">This creates a constant pipeline of talent that is:</h2>
            <div className="grid md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-gold font-semibold">Active</span>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-gold font-semibold">Improving</span>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-gold font-semibold">Ready</span>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-gold font-semibold">Consistent</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button onClick={handleJoinCommunity} className="bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold px-8 py-3">
              Join the Community
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Link placeholder for now - Skool community coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}