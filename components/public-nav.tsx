'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold text-[#0A0A0A] font-bold font-serif text-xs">
              V
            </div>
            <span className="font-serif text-base font-bold text-gold tracking-wide">VAC</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {[
              { name: 'Trabajos', href: '/jobs' },
              { name: 'Recursos', href: '/resources' },
              { name: 'Comunidad', href: '/community' },
              { name: 'For Companies', href: '/for-companies' },
              { name: 'Nosotros', href: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-border">
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Trabajos', href: '/jobs' },
                { name: 'Recursos', href: '/resources' },
                { name: 'Comunidad', href: '/community' },
                { name: 'For Companies', href: '/for-companies' },
                { name: 'Nosotros', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground px-1 py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground px-1 py-1.5"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
