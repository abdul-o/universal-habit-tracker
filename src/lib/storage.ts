const USERS_KEY = 'habit-tracker-users'
const SESSION_KEY = 'habit-tracker-session'
const HABITS_KEY = 'habit-tracker-habits'

// helper to safely parse JSON

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

// USERS
export function getUsers() {
  return parseJSON(localStorage.getItem(USERS_KEY), [])
}

export function saveUsers(users: unknown[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// SESSION
export function getSession() {
  return parseJSON(localStorage.getItem(SESSION_KEY), null)
}

export function saveSession(session: unknown) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

// HABITS
export function getHabits() {
  return parseJSON(localStorage.getItem(HABITS_KEY), [])
}

export function saveHabits(habits: unknown[]) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}