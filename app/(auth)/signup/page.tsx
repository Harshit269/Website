'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data.user && data.session) {
      // Auto-confirmed (email confirmations disabled)
      router.push('/dashboard')
      router.refresh()
    } else {
      // Email confirmation required
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--paper)' }}
      >
        <div className="w-full max-w-sm text-center animate-fade-up">
          <div
            className="w-16 h-16 flex items-center justify-center mx-auto mb-6 text-3xl"
            style={{ background: 'var(--sage)', color: 'white' }}
          >
            ✓
          </div>
          <h1
            className="text-3xl mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Check your email
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-faint)' }}>
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account and start using TaskFlow.
          </p>
          <Link
            href="/login"
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--ink)' }}
          >
            Back to login
          </Link>
        </div>
      </main>
    )
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
            New account
          </div>

          <h1
            className="text-3xl mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Create account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                className="block text-xs font-medium tracking-wider uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
              >
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Jane Smith"
                className="input-field w-full px-4 py-3 text-sm border-2 bg-transparent"
                style={{ borderColor: 'var(--border-dark)', fontFamily: 'var(--font-body)' }}
              />
            </div>

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
                style={{ borderColor: 'var(--border-dark)', fontFamily: 'var(--font-body)' }}
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
                placeholder="Min. 8 characters"
                className="input-field w-full px-4 py-3 text-sm border-2 bg-transparent"
                style={{ borderColor: 'var(--border-dark)', fontFamily: 'var(--font-body)' }}
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
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>
        </div>

        <p
          className="text-center text-sm mt-6 animate-fade-up delay-2"
          style={{ color: 'var(--ink-faint)' }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold underline underline-offset-2"
            style={{ color: 'var(--ink)' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
