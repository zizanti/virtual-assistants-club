'use client'

import { useState } from 'react'
import { X, Mail } from 'lucide-react'

export function FloatingLeadBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 bg-card/95 backdrop-blur-md p-2.5">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <Mail size={14} className="text-gold" />
          <p className="text-xs text-foreground">
            <span className="font-semibold">Remote Intel by Zizanti</span> — Trabajos + tips cada lunes
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const input = e.currentTarget.querySelector('input')
            if (!input?.value) return
            try {
              await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: input.value, source: 'floating-bar' }) })
              input.value = ''
              alert('¡Suscrito! Revisa tu correo.')
            } catch { /* ignore */ }
          }}
          className="flex gap-2 flex-1 sm:flex-none"
        >
          <input
            type="email"
            placeholder="tu@email.com"
            required
            className="h-8 px-3 rounded-lg border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/40 w-full sm:w-48"
          />
          <button
            type="submit"
            className="h-8 px-3 rounded-lg bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          >
            Suscríbete
          </button>
        </form>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          aria-label="Cerrar"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}
