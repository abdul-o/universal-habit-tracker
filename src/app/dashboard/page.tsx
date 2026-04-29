// 'use client'

// import ProtectedRoute from '@/components/shared/ProtectedRoute'
// import { logout } from '@/lib/auth'
// import { useRouter } from 'next/navigation'

// export default function DashboardPage() {
//   const router = useRouter()

//   function handleLogout() {
//     logout()
//     router.push('/login')
//   }

//   return (
//     <ProtectedRoute>
//       <div data-testid="dashboard-page" className="p-4">
//         <h1 className="text-xl font-bold">Dashboard</h1>

//         <button
//           data-testid="auth-logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </ProtectedRoute>
//   )
// }



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
      <div data-testid="dashboard-page" className="p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <button
          data-testid="auth-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

        <HabitList />
      </div>
    </ProtectedRoute>
  )
}