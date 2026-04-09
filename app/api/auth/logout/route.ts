import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookies
    const response = NextResponse.json({ success: true })

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    })

    response.cookies.set('auth-refresh', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
