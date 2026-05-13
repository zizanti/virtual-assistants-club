'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { CheckCircle2, ArrowRight, Download, Clock, Mail } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ukvjzsfrcmeqjrsxjahu.supabase.co'
const GUIDE_DOWNLOAD_URL = `${SUPABASE_URL}/storage/v1/object/public/guides/guia-premium.pdf`

function SuccessContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref') || ''
  const isCoaching = ref.startsWith('coaching-')
  const isGuide = ref.startsWith('guide-')

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-16">
        <div className="rounded-2xl border border-gold/20 bg-card p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 border border-gold/30 mx-auto mb-4">
            <CheckCircle2 size={32} className="text-gold" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">¡Pago confirmado!</h1>
          <p className="text-muted-foreground mb-6">
            {isCoaching
              ? 'Gracias por la confianza. Ahora elige tu horario para la sesión.'
              : 'Tu guía está lista para descargar.'}
          </p>

          {isGuide && (
            <div className="mb-6">
              <a
                href={GUIDE_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-11 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm mb-3"
              >
                <Download size={16} />
                Descargar Guía Premium
              </a>
              <p className="text-xs text-muted-foreground">
                También te enviaremos un email con el link de descarga.
              </p>
            </div>
          )}

          {isCoaching && (
            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-secondary/50 p-4 text-left">
                <p className="text-sm font-semibold text-foreground mb-3">Lo que viene ahora:</p>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">1.</span>
                    <span>Serás redirigido a mi calendario para elegir día y hora.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">2.</span>
                    <span>Recibirás un email de confirmación con el link de Google Meet.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">3.</span>
                    <span>Conéctate desde el computador para compartir pantalla.</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-orange/20 bg-orange/5 p-4">
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-orange mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">No cierres esta ventana.</strong> Si no fuiste redirigido automáticamente al calendario, escríbeme a <a href="mailto:zizanti.va@gmail.com" className="text-gold hover:underline">zizanti.va@gmail.com</a> con el asunto <span className="font-mono text-gold">zizanti 1 a 1</span>.
                  </p>
                </div>
              </div>

              <a
                href="mailto:zizanti.va@gmail.com?subject=zizanti%201%20a%201"
                className="inline-flex items-center justify-center gap-2 w-full h-10 px-5 border border-border text-foreground hover:border-gold/40 hover:text-gold hover:scale-[1.02] active:scale-[0.98] font-medium rounded-xl transition-all duration-200 text-sm"
              >
                <Mail size={14} />
                Escribir a zizanti.va@gmail.com
              </a>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Volver al inicio <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Cargando...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
