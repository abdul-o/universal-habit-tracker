import { test, expect } from '@playwright/test'

test.describe('Habit Tracker app', () => {
  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('splash-screen')).toBeVisible()
    await page.waitForURL('/login')
  })

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({ userId: '1', email: 'test@test.com' })
      )
    })

    await page.goto('/')
    await page.waitForURL('/dashboard')
  })

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForURL('/login')
  })

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup')

    await page.getByTestId('auth-signup-email').fill('new@test.com')
    await page.getByTestId('auth-signup-password').fill('123456')

    await page.getByTestId('auth-signup-submit').click()

    await page.waitForURL('/dashboard')
  })

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-users',
        JSON.stringify([
          {
            id: '1',
            email: 'test@test.com',
            password: '123456',
            createdAt: new Date().toISOString(),
          },
        ])
      )
    })

    await page.goto('/login')

    await page.getByTestId('auth-login-email').fill('test@test.com')
    await page.getByTestId('auth-login-password').fill('123456')

    await page.getByTestId('auth-login-submit').click()

    await page.waitForURL('/dashboard')
  })

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({ userId: '1', email: 'test@test.com' })
      )
    })

    await page.goto('/dashboard')

    await page.getByTestId('habit-name-input').fill('Drink Water')
    await page.getByTestId('habit-save-button').click()

    await expect(page.getByTestId('habit-card-drink-water')).toBeVisible()
  })

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({ userId: '1', email: 'test@test.com' })
      )
    })

    await page.goto('/dashboard')

    await page.getByTestId('habit-name-input').fill('Read')
    await page.getByTestId('habit-save-button').click()

    await page.getByTestId('habit-complete-read').click()

    await expect(page.getByTestId('habit-streak-read')).toContainText('1')
  })

  test('persists session and habits after page reload', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({ userId: '1', email: 'test@test.com' })
      )
    })

    await page.goto('/dashboard')

    await page.getByTestId('habit-name-input').fill('Gym')
    await page.getByTestId('habit-save-button').click()

    await page.reload()

    await expect(page.getByTestId('habit-card-gym')).toBeVisible()
  })

  test('logs out and redirects to /login', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({ userId: '1', email: 'test@test.com' })
      )
    })

    await page.goto('/dashboard')

    await page.getByTestId('auth-logout-button').click()

    await page.waitForURL('/login')
  })

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/')
    await context.setOffline(true)

    await page.reload()

    await expect(page.getByTestId('splash-screen')).toBeVisible()
  })
})