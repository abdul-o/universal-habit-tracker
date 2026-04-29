import type { User, Session } from '@/types/auth'
import type { Habit } from '@/types/habit'

const USERS_KEY = 'habit-tracker-users'
const SESSION_KEY = 'habit-tracker-session'
const HABITS_KEY = 'habit-tracker-habits'

// helper
function isBrowser() {
  return typeof window !== 'undefined'
}

function parseJSON<T>(value: string | null, fallback: T): T {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

//
// USERS
//
export function getUsers(): User[] {
  if (!isBrowser()) return []
  return parseJSON<User[]>(localStorage.getItem(USERS_KEY), [])
}

export function saveUsers(users: User[]) {
  if (!isBrowser()) return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

//
// SESSION
//
export function getSession(): Session | null {
  if (!isBrowser()) return null
  return parseJSON<Session | null>(
    localStorage.getItem(SESSION_KEY),
    null
  )
}

export function saveSession(session: Session) {
  if (!isBrowser()) return
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  if (!isBrowser()) return
  localStorage.removeItem(SESSION_KEY)
}

//
// HABITS
//
export function getHabits(): Habit[] {
  if (!isBrowser()) return []
  return parseJSON<Habit[]>(localStorage.getItem(HABITS_KEY), [])
}

export function saveHabits(habits: Habit[]) {
  if (!isBrowser()) return
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}