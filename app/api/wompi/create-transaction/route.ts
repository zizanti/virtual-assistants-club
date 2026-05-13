import { NextResponse } from 'next/server'

const WOMPI_API = 'https://production.wompi.co/v1'
const WOMPI_PRIV_KEY = process.env.WOMPI_PRIVATE_KEY || ''
const WOMPI_PUB_KEY = process.env.NEXT_PUBLIC_WOMPI_PUB_KEY || ''

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, product, amount_in_cents, currency = 'COP' } = body

    if (!email || !amount_in_cents) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const reference = `${product}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const redirectUrl = `${req.headers.get('origin')}/checkout/success?ref=${reference}`

    const wompiResponse = await fetch(`${WOMPI_API}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WOMPI_PRIV_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount_in_cents,
        currency,
        customer_email: email,
        reference,
        redirect_url: redirectUrl,
        payment_method: {
          type: 'CARD',
          installments: 1,
        },
      }),
    })

    const data = await wompiResponse.json()

    if (!wompiResponse.ok) {
      return NextResponse.json({ error: data.error?.message || 'Error creando pago' }, { status: 500 })
    }

    return NextResponse.json({
      transactionId: data.data.id,
      redirectUrl: data.data.payment_method?.extra?.async_payment_url || redirectUrl,
      reference,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
