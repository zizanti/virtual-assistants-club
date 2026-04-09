import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Jobs GET error:', error)
    return NextResponse.json({ error: 'Unable to load jobs' }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}

export async function POST(request: NextRequest) {
  try {
    const { title, company, salary, type, description } = await request.json()

    if (!title || !company || !salary || !type || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([{ title, company, salary, type, description }])
      .select()
      .single()

    if (error) {
      console.error('Jobs POST error:', error)
      return NextResponse.json({ error: 'Unable to create job' }, { status: 500 })
    }

    return NextResponse.json({ job: data })
  } catch (error) {
    console.error('Jobs POST exception:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
