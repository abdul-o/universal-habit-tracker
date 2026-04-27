'use client'

import { useEffect, useState } from 'react'
import type { Habit } from '@/types/habit'
import { getHabits, saveHabits, getSession } from '@/lib/storage'
import HabitForm from './HabitForm'
import HabitCard from './HabitCard'

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
const [session, setSession] = useState<any>(null)

  // useEffect(() => {
  //   const session = getSession()
  //   const allHabits = getHabits()

  //   if (!session) return

  //   const userHabits = allHabits.filter(
  //     (h: Habit) => h.userId === session.userId
  //   )

  //   setHabits(userHabits)
  // }, [])


useEffect(() => {
  const s = getSession()
  setSession(s)

  const allHabits = getHabits()

  if (!s) return

  const userHabits = allHabits.filter(
    (h: Habit) => h.userId === s.userId
  )

  setHabits(userHabits)
}, [])


function handleSave(data: any) {
  if (!session) return

  const allHabits = getHabits()

  // EDIT
  if (editingHabit) {
    const updated = allHabits.map((h: Habit) =>
      h.id === editingHabit.id
        ? {
            ...h,
            name: data.name,
            description: data.description,
          }
        : h
    )

    saveHabits(updated)
    setEditingHabit(null)
  } else {
    // CREATE
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId, // ✅ THIS LINE IS CRITICAL
      name: data.name,
      description: data.description,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    }

    saveHabits([...allHabits, newHabit])
  }

  refresh()
}
















  // function handleSave(data: any) {
  //   if (!session) return

  //   const allHabits = getHabits()

  //   // EDIT
  //   if (editingHabit) {
  //     const updated = allHabits.map((h: Habit) =>
  //       h.id === editingHabit.id
  //         ? {
  //             ...h,
  //             name: data.name,
  //             description: data.description,
  //           }
  //         : h
  //     )

  //     saveHabits(updated)
  //     setEditingHabit(null)
  //   } else {
  //     // CREATE
  //     const newHabit: Habit = {
  //       id: crypto.randomUUID(),
  //       userId: session.userId,
  //       name: data.name,
  //       description: data.description,
  //       frequency: 'daily',
  //       createdAt: new Date().toISOString(),
  //       completions: [],
  //     }

  //     saveHabits([...allHabits, newHabit])
  //   }

  //   refresh()
  // }

  function handleUpdate(updatedHabit: Habit) {
    const allHabits = getHabits()

    const updated = allHabits.map((h: Habit) =>
      h.id === updatedHabit.id ? updatedHabit : h
    )

    saveHabits(updated)
    refresh()
  }

  function handleDelete(id: string) {
    const allHabits = getHabits()

    const filtered = allHabits.filter((h: Habit) => h.id !== id)

    saveHabits(filtered)
    refresh()
  }

  function refresh() {
    const allHabits = getHabits()

    if (!session) return

    const userHabits = allHabits.filter(
      (h: Habit) => h.userId === session.userId
    )

    setHabits(userHabits)
  }

  return (

<div className="space-y-6">
  <button
    data-testid="create-habit-button"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Create Habit
  </button>

  <div className="bg-white p-4 rounded shadow">
    <HabitForm onSave={handleSave} initial={editingHabit} />
  </div>

  {habits.length === 0 ? (
    <p data-testid="empty-state" className="text-gray-500">
      No habits yet
    </p>
  ) : (
    <div className="grid gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onEdit={setEditingHabit}
        />
      ))}
    </div>
  )}
</div>


    // <div>
    //   <button data-testid="create-habit-button">
    //     Create Habit
    //   </button>

    //   <HabitForm onSave={handleSave} initial={editingHabit} />

    //   {habits.length === 0 ? (
    //     <p data-testid="empty-state">No habits yet</p>
    //   ) : (
    //     habits.map((habit) => (
    //       <HabitCard
    //         key={habit.id}
    //         habit={habit}
    //         onUpdate={handleUpdate}
    //         onDelete={handleDelete}
    //         onEdit={setEditingHabit}
    //       />
    //     ))
    //   )}
    // </div>
  )
}