'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  children: React.ReactNode
  userName: string
  userEmail: string
}

export default function DashboardShell({ children, userName, userEmail }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--paper)' }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col border-r-2 hidden lg:flex"
        style={{ borderColor: 'var(--ink)', background: 'var(--paper-warm)' }}
      >
        {/* Logo */}
        <div
          className="px-6 py-5 border-b-2 flex items-center gap-3"
          style={{ borderColor: 'var(--ink)' }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-display)',
            }}
          >
            TF
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
            TaskFlow
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard', icon: '◈' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium border-2 transition-all"
              style={{
                borderColor: pathname === item.href ? 'var(--ink)' : 'transparent',
                background: pathname === item.href ? 'var(--ink)' : 'transparent',
                color: pathname === item.href ? 'var(--paper)' : 'var(--ink)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div
          className="px-4 py-4 border-t-2 space-y-3"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: 'var(--amber)',
                color: 'var(--ink)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <div
                className="text-xs font-semibold truncate"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {userName}
              </div>
              <div
                className="text-xs truncate"
                style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}
              >
                {userEmail}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full text-left px-3 py-2 text-xs font-medium border-2 transition-all btn-press"
            style={{
              borderColor: 'var(--border-dark)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-faint)',
              cursor: loggingOut ? 'not-allowed' : 'pointer',
            }}
          >
            {loggingOut ? 'Signing out...' : '→ Sign out'}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b-2"
        style={{ background: 'var(--paper-warm)', borderColor: 'var(--ink)' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>TaskFlow</span>
        <button
          onClick={handleLogout}
          className="text-xs font-medium"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
        >
          Sign out
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto lg:pt-0 pt-14">
        {children}
      </main>
    </div>
  )
}
