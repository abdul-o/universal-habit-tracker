import { describe, it, expect } from 'vitest'
import { getHabitSlug } from '@/lib/slug'

describe('getHabitSlug', () => {
  it('returns lowercase hyphenated slug for a basic habit name', () => {
    const result = getHabitSlug('Drink Water')
    expect(result).toBe('drink-water')
  })

  it('trims outer spaces and collapses repeated internal spaces', () => {
    const result = getHabitSlug('   Read   Books   ')
    expect(result).toBe('read-books')
  })

  it('removes non alphanumeric characters except hyphens', () => {
    const result = getHabitSlug('Run! Fast@ Now#')
    expect(result).toBe('run-fast-now')
  })
})