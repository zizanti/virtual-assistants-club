'use client'

import { useState } from 'react'
import { CheckCircle2, Download } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ukvjzsfrcmeqjrsxjahu.supabase.co'
const FREE_GUIDE_URL = `${SUPABASE_URL}/storage/v1/object/public/guides/guia-gratis.pdf`

export function LeadCapture() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero-guide', consent }),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Algo salió mal.')
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
          <CheckCircle2 size={28} className="text-gold" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">¡Guía lista!</p>
          <p className="text-sm text-muted-foreground mt-0.5">Gracias por suscribirte.</p>
        </div>
        <a
          href={FREE_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm"
        >
          <Download size={14} />
          Descargar Guía
        </a>
        <div className="max-w-xs rounded-xl border border-gold/20 bg-gold/5 p-3">
          <p className="text-xs text-gold font-medium mb-1">También recibirás</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            El newsletter semanal <strong>Remote Intel by Zizanti</strong> con trabajos remotos, datos salariales, herramientas de IA y guiones de negociación. Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full h-10 px-4 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
          disabled={loading}
        />
      </div>
      <div className="flex items-start gap-2 text-left">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-3.5 w-3.5 rounded border-border bg-secondary accent-gold flex-shrink-0"
        />
        <label htmlFor="consent" className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer">
          Acepto recibir el newsletter semanal <strong className="text-foreground">Remote Intel by Zizanti</strong> con trabajos, datos salariales y herramientas. Sin spam, cancelo cuando quiera.
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 px-6 rounded-xl bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold text-sm disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
      >
        {loading ? 'Enviando...' : 'Quiero la Guía Gratis'}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
    </form>
  )
}
