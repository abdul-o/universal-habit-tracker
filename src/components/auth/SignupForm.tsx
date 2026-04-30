'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/auth'

export default function SignupForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    //  FRONTEND VALIDATION
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required')
      return
    }

    // optional: basic email format check
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address')
      return
    }

    // optional: password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const result = signup(email, password)

    if (!result.success) {
      setError(result.error || null)
      return
    }

    // clear error if success
    setError(null)

    router.replace('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            data-testid="auth-signup-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            data-testid="auth-signup-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            data-testid="auth-signup-submit"
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}