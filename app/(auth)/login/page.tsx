'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  // Safe client initialization that won't crash the page if vars are missing
  let supabase: any = null;
  let envError = null;
  try {
    supabase = createClient()
  } catch (err: any) {
    envError = err.message;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setError("Cannot log in: Environment variables are missing.")
      return;
    }
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--paper)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 flex items-center justify-center text-xl font-bold"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-display)',
              }}
            >
              TF
            </div>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              TaskFlow
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="border-2 p-8 animate-fade-up delay-1"
          style={{ borderColor: 'var(--ink)', background: 'var(--paper-cool)' }}
        >
          <div
            className="text-xs tracking-widest uppercase mb-6 pb-4 border-b"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-faint)',
              borderColor: 'var(--border)',
            }}
          >
            Welcome back
          </div>

          <h1
            className="text-3xl mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Sign in
          </h1>

          {envError && (
            <div className="mb-6 p-4 border-2 border-red-500 bg-red-50 text-red-700 text-sm font-mono break-all">
              <strong>SYSTEM ERROR:</strong><br />
              {envError}<br /><br />
              Vercel URL variables: <code>{process.env.NEXT_PUBLIC_SUPABASE_URL || 'UNDEFINED'}</code>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block text-xs font-medium tracking-wider uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="input-field w-full px-4 py-3 text-sm border-2 bg-transparent"
                style={{
                  borderColor: 'var(--border-dark)',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium tracking-wider uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input-field w-full px-4 py-3 text-sm border-2 bg-transparent"
                style={{
                  borderColor: 'var(--border-dark)',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>

            {error && (
              <div
                className="text-sm px-4 py-3 border"
                style={{
                  borderColor: 'var(--rust)',
                  background: 'rgba(196,92,58,0.08)',
                  color: 'var(--rust)',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-press w-full py-3 text-sm font-semibold border-2 mt-2"
              style={{
                borderColor: 'var(--ink)',
                background: loading ? 'transparent' : 'var(--ink)',
                color: loading ? 'var(--ink)' : 'var(--paper)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>

        <p
          className="text-center text-sm mt-6 animate-fade-up delay-2"
          style={{ color: 'var(--ink-faint)' }}
        >
          No account?{' '}
          <Link
            href="/signup"
            className="font-semibold underline underline-offset-2"
            style={{ color: 'var(--ink)' }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
