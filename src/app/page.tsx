'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/shared/SplashScreen'
import { getSession } from '@/lib/storage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getSession()

      if (session) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }, 1000) // 1 second (within required range)

    return () => clearTimeout(timer)
  }, [router])

  return <SplashScreen />
}