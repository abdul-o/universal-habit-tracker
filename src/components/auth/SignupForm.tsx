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

    const result = signup(email, password)

    if (!result.success) {
      setError(result.error || null)
      return
    }

    router.replace('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        data-testid='auth-signup-email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        data-testid='auth-signup-password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button data-testid='auth-signup-submit' type='submit'>
        Signup
      </button>

      {error && <p>{error}</p>}
    </form>
  )
}
