import { describe, it, expect } from 'vitest'
import { toggleHabitCompletion } from '@/lib/habits'
import type { Habit } from '@/types/habit'

describe('toggleHabitCompletion', () => {
  const baseHabit: Habit = {
    id: '1',
    userId: 'user-1',
    name: 'Drink Water',
    description: '',
    frequency: 'daily',
    createdAt: '2026-04-27',
    completions: [],
  }

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(baseHabit, '2026-04-27')
    expect(result.completions).toContain('2026-04-27')
  })

  it('removes a completion date when the date already exists', () => {
    const habit = {
      ...baseHabit,
      completions: ['2026-04-27'],
    }

    const result = toggleHabitCompletion(habit, '2026-04-27')
    expect(result.completions).not.toContain('2026-04-27')
  })

  it('does not mutate the original habit object', () => {
    const habit = { ...baseHabit }

    const result = toggleHabitCompletion(habit, '2026-04-27')

    expect(habit).not.toBe(result)
    expect(habit.completions).toEqual([])
  })

  it('does not return duplicate completion dates', () => {
    const habit = {
      ...baseHabit,
      completions: ['2026-04-27'],
    }

    const result = toggleHabitCompletion(habit, '2026-04-27')
    expect(result.completions).toEqual([])
  })
})