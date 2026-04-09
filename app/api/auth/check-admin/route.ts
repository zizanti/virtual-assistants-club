import { NextRequest, NextResponse } from 'next/server'
import { isAdminUser } from '@/lib/admin'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const isAdmin = await isAdminUser(userId)

    return NextResponse.json({ isAdmin })
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
}