import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/user - get current user profile
export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name ?? null,
      created_at: user.created_at,
    }
  })
}
