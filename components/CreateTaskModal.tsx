'use client'

import { useState, useEffect } from 'react'
import type { Task, TaskStatus, TaskPriority } from '@/lib/types'

interface Props {
  mode: 'create' | 'edit'
  task?: Task
  onClose: () => void
  onSave: (task: Task) => void
}

export default function CreateTaskModal({ mode, task, onClose, onSave }: Props) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo')
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium')
  const [dueDate, setDueDate] = useState(task?.due_date?.slice(0, 10) ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    setLoading(true)
    setError(null)

    const body = {
      title: title.trim(),
      description: description.trim() || null,
      status,
      priority,
      due_date: dueDate || null,
    }

    const url = mode === 'edit' ? `/api/tasks/${task!.id}` : '/api/tasks'
    const method = mode === 'edit' ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.')
      setLoading(false)
      return
    }

    onSave(data.task)
  }

  const fieldStyle = {
    borderColor: 'var(--border-dark)',
    fontFamily: 'var(--font-body)',
    background: 'var(--paper)',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(13,13,13,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md border-2 p-8 animate-scale-in"
        style={{ borderColor: 'var(--ink)', background: 'var(--paper-cool)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-1"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
            >
              {mode === 'create' ? 'New task' : 'Edit task'}
            </div>
            <h2
              className="text-2xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              {mode === 'create' ? 'Create task' : 'Update task'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-xl hover:opacity-50 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="input-field w-full px-4 py-2.5 text-sm border-2"
              style={fieldStyle}
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details..."
              rows={3}
              className="input-field w-full px-4 py-2.5 text-sm border-2 resize-none"
              style={fieldStyle}
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="input-field w-full px-4 py-2.5 text-sm border-2"
                style={fieldStyle}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="input-field w-full px-4 py-2.5 text-sm border-2"
                style={fieldStyle}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-field w-full px-4 py-2.5 text-sm border-2"
              style={fieldStyle}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="text-sm px-4 py-2.5 border"
              style={{ borderColor: 'var(--rust)', background: 'rgba(196,92,58,0.08)', color: 'var(--rust)' }}
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-press flex-1 py-2.5 text-sm font-semibold border-2"
              style={{
                borderColor: 'var(--ink)',
                background: loading ? 'transparent' : 'var(--ink)',
                color: loading ? 'var(--ink)' : 'var(--paper)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create task' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium border-2 hover:opacity-70 transition-opacity"
              style={{
                borderColor: 'var(--border-dark)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                background: 'none',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
