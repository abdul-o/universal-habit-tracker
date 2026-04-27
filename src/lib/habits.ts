import type { Habit } from '@/types/habit'

export function toggleHabitCompletion(
  habit: Habit,
  date: string
): Habit {
  const exists = habit.completions.includes(date)

  let updatedCompletions: string[]

  if (exists) {
    // remove date
    updatedCompletions = habit.completions.filter(d => d !== date)
  } else {
    // add date (ensure no duplicates)
    updatedCompletions = [...new Set([...habit.completions, date])]
  }

  return {
    ...habit,
    completions: updatedCompletions,
  }
}