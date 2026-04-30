'use client'

import { useState } from 'react'
import type { Habit } from '@/types/habit'
import { getHabitSlug } from '@/lib/slug'
import { toggleHabitCompletion } from '@/lib/habits'
import { calculateCurrentStreak } from '@/lib/streaks'

type Props = {
  habit: Habit
  onUpdate: (habit: Habit) => void
  onDelete: (id: string) => void
  onEdit: (habit: Habit) => void
}

export default function HabitCard ({
  habit,
  onUpdate,
  onDelete,
  onEdit
}: Props) {
  const slug = getHabitSlug(habit.name)
  const today = new Date().toISOString().slice(0, 10)

  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const updatedHabit = toggleHabitCompletion(habit, today)
  const streak = calculateCurrentStreak(habit.completions, today)

  function handleToggle () {
    const updated = toggleHabitCompletion(habit, today)
    onUpdate(updated)
  }

  function handleDelete () {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }

    onDelete(habit.id)
  }

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className='bg-white p-4 rounded shadow space-y-2'
    >
      <h3>{habit.name}</h3>

      <p data-testid={`habit-streak-${slug}`}>Streak: {streak}</p>

      <button
        data-testid={`habit-complete-${slug}`}
        onClick={handleToggle}
        className='bg-green-500 text-white mr-4 px-3 py-1 rounded'
      >
        Toggle Today
      </button>

      <button
        data-testid={`habit-edit-${slug}`}
        onClick={() => onEdit(habit)}
        className='bg-yellow-500 text-white px-3 py-1 rounded mr-4'
      >
        Edit
      </button>

      <button
        data-testid={`habit-delete-${slug}`}
        onClick={handleDelete}
        className='bg-red-500 text-white px-3 py-1 rounded mr-4'
      >
        Delete
      </button>

      {confirmingDelete && (
        <button
          data-testid='confirm-delete-button'
          className='bg-red-900 text-white rounded px-3 py-1'
          onClick={() => onDelete(habit.id)}
        >
          Confirm Delete
        </button>
      )}
    </div>
  )
}
