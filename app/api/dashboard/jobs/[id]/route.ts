import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'Job id is required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Jobs DELETE error:', error)
    return NextResponse.json({ error: 'Unable to delete job' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
