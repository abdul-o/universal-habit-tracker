'use client'


import { useState, useEffect } from 'react'
import { validateHabitName } from '@/lib/validators'
import type { Habit } from '@/types/habit'

type Props = {
  onSave: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void
  initial?: Habit | null
}

export default function HabitForm({ onSave, initial }: Props) {
  const [name, setName] = useState(initial?.name || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initial) {
      setName(initial.name)
      setDescription(initial.description || '')
    }
  }, [initial])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = validateHabitName(name)

    if (!result.valid) {
      setError(result.error)
      return
    }

    onSave({
      userId: initial?.userId || '',
      name: result.value,
      description,

    })

    setName('')
    setDescription('')
    setError(null)
  }

  return (
    <form data-testid="habit-form" onSubmit={handleSubmit}
      className="flex flex-col gap-3">
      <input
        data-testid="habit-name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
      />

      <input
        data-testid="habit-description-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
      />

      <select data-testid="habit-frequency-select" defaultValue="daily"
        className="border p-2 rounded">
        <option value="daily">Daily</option>
      </select>

      <button data-testid="habit-save-button" type="submit"
        className="bg-blue-600 text-white py-2 rounded">
        Save
      </button>

      {error && <p>{error}</p>}
    </form>
  )
}