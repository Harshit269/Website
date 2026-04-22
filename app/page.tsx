import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* Header */}
      <header className="border-b-2" style={{ borderColor: 'var(--ink)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center font-bold text-sm"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-display)',
              }}
            >
              TF
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>
              TaskFlow
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium hover:opacity-60 transition-opacity"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn-press text-sm font-medium px-4 py-2 border-2"
              style={{
                borderColor: 'var(--ink)',
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        {/* Issue label */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-8 animate-fade-up"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
        >
          <span
            className="w-5 h-px inline-block"
            style={{ background: 'var(--amber)' }}
          />
          Vol. I — Personal Productivity Suite
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="text-6xl lg:text-8xl leading-none mb-6 animate-fade-up delay-1"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
            >
              Clear
              <br />
              your
              <br />
              <em style={{ color: 'var(--amber)' }}>mind.</em>
            </h1>
            <p
              className="text-lg leading-relaxed mb-8 animate-fade-up delay-2"
              style={{ color: 'var(--ink-faint)', maxWidth: '400px' }}
            >
              TaskFlow is a focused task manager that helps you organise work, track progress,
              and ship things that matter.
            </p>
            <div className="flex items-center gap-4 animate-fade-up delay-3">
              <Link
                href="/signup"
                className="btn-press px-6 py-3 text-sm font-semibold border-2"
                style={{
                  borderColor: 'var(--ink)',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                }}
              >
                Start for free →
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 text-sm font-semibold border-2 btn-press"
                style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Feature grid - newspaper style */}
          <div
            className="border-2 p-8 animate-fade-up delay-4"
            style={{ borderColor: 'var(--ink)', background: 'var(--paper-cool)' }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-6 pb-3 border-b"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-faint)',
                borderColor: 'var(--border)',
              }}
            >
              Feature overview
            </div>
            <div className="space-y-5">
              {[
                { icon: '◈', label: 'Task Management', desc: 'Create, organise, and track tasks with priorities and deadlines.' },
                { icon: '◎', label: 'Status Tracking', desc: 'Move tasks through Todo → In Progress → Done.' },
                { icon: '◇', label: 'Secure Auth', desc: 'Sign up with email. Your data is private and encrypted.' },
                { icon: '◉', label: 'Cloud Sync', desc: 'Access your tasks from anywhere, always in sync.' },
              ].map((f, i) => (
                <div
                  key={f.label}
                  className="flex gap-4 items-start animate-fade-up"
                  style={{ animationDelay: `${0.3 + i * 0.07}s`, opacity: 0 }}
                >
                  <span
                    className="text-xl mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--amber)' }}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {f.label}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--ink-faint)' }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div
        className="max-w-6xl mx-auto px-6"
        style={{ borderTop: '2px solid var(--ink)', marginTop: '2rem' }}
      />

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
        >
          © {new Date().getFullYear()} TaskFlow
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
        >
          Built with Next.js + Supabase
        </span>
      </footer>
    </main>
  )
}
