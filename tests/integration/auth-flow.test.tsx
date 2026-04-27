import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'

// mock router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('submits the signup form and creates a session', () => {
    render(<SignupForm />)

    fireEvent.change(screen.getByTestId('auth-signup-email'), {
      target: { value: 'test@test.com' },
    })

    fireEvent.change(screen.getByTestId('auth-signup-password'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByTestId('auth-signup-submit'))

    const session = JSON.parse(
      localStorage.getItem('habit-tracker-session') || 'null'
    )

    expect(session).not.toBeNull()
  })

  it('shows an error for duplicate signup email', () => {
    localStorage.setItem(
      'habit-tracker-users',
      JSON.stringify([
        {
          id: '1',
          email: 'test@test.com',
          password: '123456',
          createdAt: new Date().toISOString(),
        },
      ])
    )

    render(<SignupForm />)

    fireEvent.change(screen.getByTestId('auth-signup-email'), {
      target: { value: 'test@test.com' },
    })

    fireEvent.change(screen.getByTestId('auth-signup-password'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByTestId('auth-signup-submit'))

    expect(screen.getByText('User already exists')).toBeInTheDocument()
  })

  it('submits the login form and stores the active session', () => {
    localStorage.setItem(
      'habit-tracker-users',
      JSON.stringify([
        {
          id: '1',
          email: 'test@test.com',
          password: '123456',
          createdAt: new Date().toISOString(),
        },
      ])
    )

    render(<LoginForm />)

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'test@test.com' },
    })

    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByTestId('auth-login-submit'))

    const session = JSON.parse(
      localStorage.getItem('habit-tracker-session') || 'null'
    )

    expect(session).not.toBeNull()
  })

  it('shows an error for invalid login credentials', () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'wrong@test.com' },
    })

    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: 'wrong' },
    })

    fireEvent.click(screen.getByTestId('auth-login-submit'))

    expect(
      screen.getByText('Invalid email or password')
    ).toBeInTheDocument()
  })
})