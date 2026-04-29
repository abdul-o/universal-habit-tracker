'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = login(email, password)

    if (!result.success) {
      setError(result.error || null)
      return
    }

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        data-testid="auth-login-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        data-testid="auth-login-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button data-testid="auth-login-submit" type="submit">
        Login
      </button>

      {error && <p>{error}</p>}
    </form>
  )
}