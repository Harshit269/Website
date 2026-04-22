import { createClient } from '@/lib/supabase/server'
import TaskBoard from '@/components/TaskBoard'
import type { Task } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allTasks: Task[] = tasks ?? []

  const stats = {
    total: allTasks.length,
    todo: allTasks.filter(t => t.status === 'todo').length,
    inProgress: allTasks.filter(t => t.status === 'in_progress').length,
    done: allTasks.filter(t => t.status === 'done').length,
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total', value: stats.total, accent: 'var(--ink)' },
          { label: 'To do', value: stats.todo, accent: 'var(--amber)' },
          { label: 'In progress', value: stats.inProgress, accent: 'var(--sage)' },
          { label: 'Done', value: stats.done, accent: 'var(--rust)' },
        ].map((s, i) => (
          <div
            key={s.label}
            className="border-2 p-5 animate-fade-up"
            style={{
              borderColor: 'var(--border-dark)',
              background: 'var(--paper-cool)',
              animationDelay: `${i * 0.06}s`,
              opacity: 0,
            }}
          >
            <div
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: s.accent }}
            >
              {s.value}
            </div>
            <div
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Task board */}
      <TaskBoard initialTasks={allTasks} />
    </div>
  )
}
