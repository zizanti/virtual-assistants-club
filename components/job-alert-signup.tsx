'use client'

import { useState } from 'react'
import { ArrowRight, Bell } from 'lucide-react'

export function JobAlertSignup() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'job-alerts' }),
      })
      setDone(true)
    } catch { /* ignore */ }
  }

  return (
    <div className="rounded-2xl border border-gold/20 bg-card p-5 gold-border-glow">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10">
            <Bell size={16} className="text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Recibe trabajos de EA cada lunes</p>
            <p className="text-xs text-muted-foreground">Roles curados enviados a tu correo semanalmente</p>
          </div>
        </div>
        {done ? (
          <p className="text-sm text-green-400 font-medium whitespace-nowrap">✓ ¡Suscrito!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="h-9 px-3 rounded-lg border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/40 w-full sm:w-48"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 h-9 px-4 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Suscribirme <ArrowRight size={11} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
