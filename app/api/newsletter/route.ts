import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])

    // Handle duplicate email (unique constraint violation)
    if (error?.code === '23505') {
      return NextResponse.json(
        { success: false, message: 'Email already subscribed' },
        { status: 200 }
      )
    }

    // Handle other errors
    if (error) {
      console.error('Supabase error:', error)
      // Check if table doesn't exist
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        return NextResponse.json(
          { success: false, message: 'Database table not configured. Contact admin.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { success: false, message: `Error: ${error.message || error.code || 'Unknown'}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}