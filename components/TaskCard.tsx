'use client'

import { useState } from 'react'
import type { Task, TaskStatus } from '@/lib/types'

interface Props {
  task: Task
  index: number
  onEdit: () => void
  onDelete: (id: string) => void
  onStatusChange: (task: Task, newStatus: TaskStatus) => void
}

const STATUS_CONFIG = {
  todo: { label: 'To Do', color: 'var(--amber)', bg: 'rgba(232,160,32,0.1)' },
  in_progress: { label: 'In Progress', color: 'var(--sage)', bg: 'rgba(107,143,113,0.1)' },
  done: { label: 'Done', color: 'var(--rust)', bg: 'rgba(196,92,58,0.1)' },
}

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'var(--sage)' },
  medium: { label: 'Med', color: 'var(--amber)' },
  high: { label: 'High', color: 'var(--rust)' },
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  todo: 'in_progress',
  in_progress: 'done',
  done: 'todo',
}

export default function TaskCard({ task, index, onEdit, onDelete, onStatusChange }: Props) {
  const [deleting, setDeleting] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const status = STATUS_CONFIG[task.status]
  const priority = PRIORITY_CONFIG[task.priority]

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return
    setDeleting(true)

    const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' })
    if (res.ok) {
      onDelete(task.id)
    } else {
      setDeleting(false)
      alert('Failed to delete task.')
    }
  }

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null

  const isOverdue = task.due_date && task.status !== 'done'
    ? new Date(task.due_date) < new Date()
    : false

  return (
    <div
      className="task-card border-2 p-5 flex flex-col gap-3 relative animate-fade-up"
      style={{
        borderColor: 'var(--border-dark)',
        background: 'var(--paper-cool)',
        opacity: deleting ? 0.5 : undefined,
        animationDelay: `${index * 0.04}s`,
      }}
    >
      {/* Priority stripe */}
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ background: priority.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pl-2">
        <h3
          className="font-semibold text-sm leading-snug flex-1"
          style={{
            fontFamily: 'var(--font-display)',
            textDecoration: task.status === 'done' ? 'line-through' : 'none',
            color: task.status === 'done' ? 'var(--ink-faint)' : 'var(--ink)',
          }}
        >
          {task.title}
        </h3>

        {/* Menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(v => !v)}
            className="text-lg leading-none px-1 hover:opacity-60 transition-opacity"
            style={{ color: 'var(--ink-faint)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ···
          </button>
          {showMenu && (
            <div
              className="absolute right-0 top-6 border-2 z-10 min-w-[120px] animate-scale-in"
              style={{ borderColor: 'var(--ink)', background: 'var(--paper)' }}
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                onClick={() => { onEdit(); setShowMenu(false) }}
                className="block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-black hover:bg-opacity-5 transition-colors"
                style={{ fontFamily: 'var(--font-mono)', cursor: 'pointer', border: 'none', background: 'none' }}
              >
                Edit
              </button>
              <button
                onClick={() => { handleDelete(); setShowMenu(false) }}
                className="block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-black hover:bg-opacity-5 transition-colors"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--rust)', cursor: 'pointer', border: 'none', background: 'none' }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="text-xs leading-relaxed pl-2"
          style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}
        >
          {task.description.length > 80 ? task.description.slice(0, 80) + '…' : task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto pl-2">
        <div className="flex items-center gap-2">
          {/* Status badge - clickable to advance */}
          <button
            onClick={() => onStatusChange(task, NEXT_STATUS[task.status])}
            className="px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-70"
            style={{
              fontFamily: 'var(--font-mono)',
              background: status.bg,
              color: status.color,
              border: `1px solid ${status.color}`,
              cursor: 'pointer',
            }}
            title="Click to advance status"
          >
            {status.label}
          </button>

          {/* Priority badge */}
          <span
            className="px-2 py-0.5 text-xs"
            style={{
              fontFamily: 'var(--font-mono)',
              color: priority.color,
            }}
          >
            {priority.label}
          </span>
        </div>

        {/* Due date */}
        {formattedDate && (
          <span
            className="text-xs"
            style={{
              fontFamily: 'var(--font-mono)',
              color: isOverdue ? 'var(--rust)' : 'var(--ink-faint)',
              fontWeight: isOverdue ? 600 : 400,
            }}
          >
            {isOverdue && '! '}{formattedDate}
          </span>
        )}
      </div>
    </div>
  )
}
