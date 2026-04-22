import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'placeholder').trim().replace(/^"|"$/g, '')
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder').trim().replace(/^"|"$/g, '')
  
  if (key === 'placeholder' || url === 'placeholder') {
    throw new Error('VERCEL_ENV_VARS_MISSING: The NEXT_PUBLIC_SUPABASE variables are not loaded in this Vercel deployment.')
  }

  return createBrowserClient(url, key)
}
