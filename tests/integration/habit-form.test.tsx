import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HabitList from '@/components/habits/HabitList'

// mock router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear()

    localStorage.setItem(
      'habit-tracker-session',
      JSON.stringify({
        userId: '1',
        email: 'test@test.com',
      })
    )
  })

  it('shows a validation error when habit name is empty', () => {
    render(<HabitList />)

    fireEvent.click(screen.getByTestId('habit-save-button'))

    expect(
      screen.getByText('Habit name is required')
    ).toBeInTheDocument()
  })

  it('creates a new habit and renders it in the list', () => {
    render(<HabitList />)

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Drink Water' },
    })

    fireEvent.click(screen.getByTestId('habit-save-button'))

    expect(
      screen.getByTestId('habit-card-drink-water')
    ).toBeInTheDocument()
  })

  it('edits an existing habit and preserves immutable fields', () => {
    render(<HabitList />)

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Drink Water' },
    })

    fireEvent.click(screen.getByTestId('habit-save-button'))

    fireEvent.click(screen.getByTestId('habit-edit-drink-water'))

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Drink More Water' },
    })

    fireEvent.click(screen.getByTestId('habit-save-button'))

    expect(
      screen.getByTestId('habit-card-drink-more-water')
    ).toBeInTheDocument()
  })

  it('deletes a habit only after explicit confirmation', () => {
    render(<HabitList />)

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Run' },
    })

    fireEvent.click(screen.getByTestId('habit-save-button'))

    fireEvent.click(screen.getByTestId('habit-delete-run'))

    fireEvent.click(screen.getByTestId('confirm-delete-button'))

    expect(
      screen.queryByTestId('habit-card-run')
    ).not.toBeInTheDocument()
  })

  it('toggles completion and updates the streak display', () => {
    render(<HabitList />)

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Read' },
    })

    fireEvent.click(screen.getByTestId('habit-save-button'))

    fireEvent.click(screen.getByTestId('habit-complete-read'))

    expect(
      screen.getByTestId('habit-streak-read')
    ).toHaveTextContent('1')
  })
})