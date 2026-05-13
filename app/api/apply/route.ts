import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, english_level, experience_years, cv_url, linkedin_url, job_id } = body

    if (!email || !name) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    const { error } = await supabase.from('applications').insert([{
      name,
      email,
      english_level: english_level || null,
      experience_years: experience_years ? Number(experience_years) : null,
      cv_url: cv_url || linkedin_url || null,
      job_id: job_id || null,
    }])

    if (error) {
      console.error('Error inserting application:', error)
      return NextResponse.json({ error: 'Error guardando aplicación' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
