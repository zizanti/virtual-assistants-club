'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-[#0A0A0A] font-bold font-serif text-sm">
              V
            </div>
            <span className="font-serif text-lg font-bold text-gold tracking-wide">VAC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['Jobs', 'For Companies', 'Community', 'About'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold"
            >
              Apply as VA
            </Button>
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-3">
              {['Jobs', 'For Companies', 'Community', 'About'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground px-1"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button size="sm" className="bg-gold text-[#0A0A0A] hover:bg-gold/90 font-semibold mt-2">
                Apply as VA
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
