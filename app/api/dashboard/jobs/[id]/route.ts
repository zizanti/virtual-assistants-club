import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'Job id is required' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { status, title, company, salary, type, description, featured, skills, location, experience } = body

    const updates: Record<string, unknown> = {}
    if (status !== undefined) updates.status = status
    if (title !== undefined) updates.title = title
    if (company !== undefined) updates.company = company.trim() || 'Confidential'
    if (salary !== undefined) updates.salary = salary
    if (type !== undefined) updates.type = type
    if (description !== undefined) updates.description = description
    if (featured !== undefined) updates.featured = featured
    if (skills !== undefined) updates.skills = skills
    if (location !== undefined) updates.location = location
    if (experience !== undefined) updates.experience = experience

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Jobs PATCH error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ job: data })
  } catch (error: any) {
    console.error('Jobs PATCH exception:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'Job id is required' }, { status: 400 })
  }

  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Jobs DELETE error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Jobs DELETE exception:', error)
    return NextResponse.json({ error: 'Unable to delete job' }, { status: 500 })
  }
}
