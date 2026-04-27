'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/storage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const session = getSession()

      if (session) {
        router.replace('/dashboard')
      } else {
        router.replace('/login')
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div
      data-testid="splash-screen"
      className="flex items-center justify-center h-screen"
    >
      Loading...
    </div>
  )
}