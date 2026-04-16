'use client'

import { PublicNav } from '@/components/public-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function ForCompaniesPage() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [requirements, setRequirements] = useState('')

  const handleSubmit = () => {
    console.log('Hire VA request:', { name, company, email, requirements })
    // Reset form
    setName('')
    setCompany('')
    setEmail('')
    setRequirements('')
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
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

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">All candidates come from a curated community</h2>
                <p className="text-muted-foreground">
                  And have been trained, guided, and filtered through real work standards.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Why VAC</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span>Pre-vetted talent (not random applicants)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span>Strong communication (English-focused)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span>Experience working with US-based teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fast turnaround</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Founder angle (important)</h3>
                <p className="text-muted-foreground">
                  VAC was built by someone based in Colombia, with years of experience working directly with US clients and understanding both sides: The expectations of founders and operators. The reality of LATAM talent (especially BPO / call center backgrounds transitioning into VA roles).
                </p>
                <p className="text-muted-foreground mt-3">
                  This allows us to match candidates more effectively than traditional hiring platforms.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-xl shadow-black/10">
              <h3 className="text-xl font-semibold text-foreground mb-6">Hire a VA</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">What are you looking for?</Label>
                  <textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Describe the role, skills needed, etc."
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 min-h-[100px] resize-none"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Pricing</h2>
            <p className="text-muted-foreground mb-6">
              Simple and aligned: Small placement fee. No long-term contracts. No unnecessary complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}