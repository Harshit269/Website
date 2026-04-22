'use client'

import { useState } from 'react'
import type { Task, TaskStatus, TaskPriority } from '@/lib/types'
import TaskCard from './TaskCard'
import CreateTaskModal from './CreateTaskModal'

interface Props {
  initialTasks: Task[]
}

const STATUSES: { key: TaskStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'var(--amber)' },
  { key: 'in_progress', label: 'In Progress', color: 'var(--sage)' },
  { key: 'done', label: 'Done', color: 'var(--rust)' },
]

export default function TaskBoard({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
  const [showCreate, setShowCreate] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const handleCreate = (task: Task) => {
    setTasks(prev => [task, ...prev])
    setShowCreate(false)
  }

  const handleUpdate = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
    setEditingTask(null)
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleStatusChange = async (task: Task, newStatus: TaskStatus) => {
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t))

    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!res.ok) {
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === task.id ? task : t))
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-up delay-4">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 border-2 p-1" style={{ borderColor: 'var(--border-dark)' }}>
          {(['all', ...STATUSES.map(s => s.key)] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                fontFamily: 'var(--font-mono)',
                background: filter === f ? 'var(--ink)' : 'transparent',
                color: filter === f ? 'var(--paper)' : 'var(--ink-faint)',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Create button */}
        <button
          onClick={() => setShowCreate(true)}
          className="btn-press flex items-center gap-2 px-4 py-2 text-sm font-semibold border-2"
          style={{
            borderColor: 'var(--ink)',
            background: 'var(--ink)',
            color: 'var(--paper)',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span>
          New task
        </button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="border-2 border-dashed p-16 text-center animate-fade-in"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <div
            className="text-5xl mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--border-dark)' }}
          >
            ◈
          </div>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
          >
            {filter === 'all' ? 'No tasks yet. Create your first one.' : `No tasks with status "${filter}".`}
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 text-sm font-semibold underline underline-offset-2"
              style={{ color: 'var(--ink)', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Create a task →
            </button>
          )}
        </div>
      )}

      {/* Task grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task, i) => (
            <TaskCard
              key={task.id}
              task={task}
              index={i}
              onEdit={() => setEditingTask(task)}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <CreateTaskModal
          mode="create"
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}

      {/* Edit Modal */}
      {editingTask && (
        <CreateTaskModal
          mode="edit"
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  )
}
