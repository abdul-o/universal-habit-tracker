
'use client'

import ProtectedRoute from '@/components/shared/ProtectedRoute'
import HabitList from '@/components/habits/HabitList'
import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <ProtectedRoute>
      <main data-testid="dashboard-page" className="p-4 bg-[midnightblue] h-full">
        <header className="w-full flex justify-between mb-12">
          <h1 className="text-xl font-bold text-[white]">Habit Tracker</h1>

          <button
            data-testid="auth-logout-button"
            onClick={handleLogout} className="rounded-xl bg-blue-500 w-20 text-[white]"
          >

            Logout
          </button>
        </header>

        <HabitList />
      </main>
    </ProtectedRoute>
  )
}