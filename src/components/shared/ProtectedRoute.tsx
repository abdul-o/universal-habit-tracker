'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/storage'

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()

    if (!session) {
      router.push('/login')
    }
  }, [router])

  return <>{children}</>
}