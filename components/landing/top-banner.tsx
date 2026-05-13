'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

export function TopBanner() {
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!visible) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'top-banner' }),
      })
      if (res.ok) setDone(true)
    } catch { /* ignore */ } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-50 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-b border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-2 text-xs md:text-sm text-foreground">
            <Sparkles size={13} className="text-gold flex-shrink-0" />
            <span className="hidden sm:inline">
              <span className="text-gold font-semibold">Guía Gratis:</span> Cómo conseguir trabajo remoto en USA desde LATAM
            </span>
            <span className="sm:hidden text-gold font-semibold">Guía Gratis</span>
          </div>

          {!done ? (
            <form onSubmit={handleSubmit} className="flex gap-1.5 flex-shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="h-8 w-36 md:w-44 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-8 px-3 rounded-lg bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] text-xs font-semibold transition-all duration-200 whitespace-nowrap"
              >
                {loading ? '...' : 'Descargar'}
              </button>
            </form>
          ) : (
            <span className="text-xs text-green-400 font-medium flex-shrink-0">✓ ¡Guía enviada!</span>
          )}

          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            aria-label="Cerrar"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
