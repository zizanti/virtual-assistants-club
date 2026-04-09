import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('auth-token')?.value

  if (!token) {
    return null
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return null
    }

    return user
  } catch (err) {
    return null
  }
}
