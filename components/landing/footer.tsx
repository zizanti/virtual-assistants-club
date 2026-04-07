import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Browse Jobs', href: '#jobs' },
    { label: 'For Companies', href: '#' },
    { label: 'Hire a VA', href: '#' },
    { label: 'Post a Job', href: '#' },
  ],
  Community: [
    { label: 'Join the Club', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Community Forum', href: '#' },
    { label: 'Mentorship', href: '#' },
  ],
  Resources: [
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Blog', href: '#' },
    { label: 'Templates', href: '#' },
    { label: 'Salary Guide', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-[#0A0A0A] font-bold font-serif text-base">
                V
              </div>
              <span className="font-serif text-xl font-bold text-gold tracking-wide">VAC</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-48">
              The #1 executive assistant talent network in Latin America.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {['LinkedIn', 'Instagram', 'TikTok'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-0.5"
                >
                  {s}
                  <ArrowUpRight size={10} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 Virtual Assistants Club. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
