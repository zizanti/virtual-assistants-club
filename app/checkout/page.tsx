'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { ArrowRight, Loader2 } from 'lucide-react'

const PRODUCTS: Record<string, { title: string; price: string; amount: number }> = {
  coaching: {
    title: 'Sesión de Coaching Personalizado',
    price: '$105,000 COP',
    amount: 10500000,
  },
  guide: {
    title: 'Guía Completa: Trabajo Remoto en USA',
    price: '$18,000 COP',
    amount: 1800000,
  },
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const product = searchParams.get('product') || 'guide'
  const info = PRODUCTS[product] || PRODUCTS.guide

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/wompi/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          product,
          amount_in_cents: info.amount,
          currency: 'COP',
        }),
      })

      const data = await res.json()

      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setError(data.error || 'Error al procesar el pago')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Checkout</p>
        <h1 className="text-2xl font-semibold text-foreground mb-2">{info.title}</h1>
        <p className="text-3xl font-bold text-gold mb-4">{info.price}</p>
        <p className="text-sm text-muted-foreground">Pago seguro procesado por Wompi</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1">Recibirás la confirmación y acceso a este email.</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full h-11 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                Pagar con Wompi <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Pago 100% seguro
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <Suspense fallback={<div className="flex items-center justify-center py-24"><Loader2 size={24} className="animate-spin text-gold" /></div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  )
}
