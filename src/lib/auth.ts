import { getUsers, saveUsers, saveSession, clearSession } from './storage'
import type { User, Session } from '@/types/auth'

// Generate ID
function generateId() {
  return crypto.randomUUID()
}

// Signup Function
export function signup(email: string, password: string) {
  const users = getUsers()

  const existingUser = users.find((u: User) => u.email === email)

  if (existingUser) {
    return {
      success: false,
      error: 'User already exists',
    }
  }

  const newUser: User = {
    id: generateId(),
    email,
    password,
    createdAt: new Date().toISOString(),
  }

  const updatedUsers = [...users, newUser]
  saveUsers(updatedUsers)

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  }

  saveSession(session)

  return {
    success: true,
    user: newUser,
  }
}

// Login function
export function login(email: string, password: string) {
  const users = getUsers()

  const user = users.find(
    (u: User) => u.email === email && u.password === password
  )

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password',
    }
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
  }

  saveSession(session)

  return {
    success: true,
    user,
  }
}

// Logout function
export function logout() {
  clearSession()
}