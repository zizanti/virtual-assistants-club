import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function isAdminUser(userId: string): Promise<boolean> {
  try {
    // Check if user exists in admins table
    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error checking admin status:', error)
      return false
    }

    return !!data
  } catch (err) {
    console.error('Error checking admin status:', err)
    return false
  }
}

export async function getUserFromToken(token: string) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return null
    }

    return user
  } catch (err) {
    return null
  }
}
