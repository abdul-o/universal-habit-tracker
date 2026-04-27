# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> loads the cached app shell when offline after the app has been loaded once
- Location: tests\e2e\app.spec.ts:130:7

# Error details

```
Error: page.reload: net::ERR_INTERNET_DISCONNECTED
Call log:
  - waiting for navigation until "load"

```

# Test source

```ts
  34  | 
  35  |     await page.waitForURL('/dashboard')
  36  |   })
  37  | 
  38  |   test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
  39  |     await page.addInitScript(() => {
  40  |       localStorage.setItem(
  41  |         'habit-tracker-users',
  42  |         JSON.stringify([
  43  |           {
  44  |             id: '1',
  45  |             email: 'test@test.com',
  46  |             password: '123456',
  47  |             createdAt: new Date().toISOString(),
  48  |           },
  49  |         ])
  50  |       )
  51  |     })
  52  | 
  53  |     await page.goto('/login')
  54  | 
  55  |     await page.getByTestId('auth-login-email').fill('test@test.com')
  56  |     await page.getByTestId('auth-login-password').fill('123456')
  57  | 
  58  |     await page.getByTestId('auth-login-submit').click()
  59  | 
  60  |     await page.waitForURL('/dashboard')
  61  |   })
  62  | 
  63  |   test('creates a habit from the dashboard', async ({ page }) => {
  64  |     await page.addInitScript(() => {
  65  |       localStorage.setItem(
  66  |         'habit-tracker-session',
  67  |         JSON.stringify({ userId: '1', email: 'test@test.com' })
  68  |       )
  69  |     })
  70  | 
  71  |     await page.goto('/dashboard')
  72  | 
  73  |     await page.getByTestId('habit-name-input').fill('Drink Water')
  74  |     await page.getByTestId('habit-save-button').click()
  75  | 
  76  |     await expect(page.getByTestId('habit-card-drink-water')).toBeVisible()
  77  |   })
  78  | 
  79  |   test('completes a habit for today and updates the streak', async ({ page }) => {
  80  |     await page.addInitScript(() => {
  81  |       localStorage.setItem(
  82  |         'habit-tracker-session',
  83  |         JSON.stringify({ userId: '1', email: 'test@test.com' })
  84  |       )
  85  |     })
  86  | 
  87  |     await page.goto('/dashboard')
  88  | 
  89  |     await page.getByTestId('habit-name-input').fill('Read')
  90  |     await page.getByTestId('habit-save-button').click()
  91  | 
  92  |     await page.getByTestId('habit-complete-read').click()
  93  | 
  94  |     await expect(page.getByTestId('habit-streak-read')).toContainText('1')
  95  |   })
  96  | 
  97  |   test('persists session and habits after page reload', async ({ page }) => {
  98  |     await page.addInitScript(() => {
  99  |       localStorage.setItem(
  100 |         'habit-tracker-session',
  101 |         JSON.stringify({ userId: '1', email: 'test@test.com' })
  102 |       )
  103 |     })
  104 | 
  105 |     await page.goto('/dashboard')
  106 | 
  107 |     await page.getByTestId('habit-name-input').fill('Gym')
  108 |     await page.getByTestId('habit-save-button').click()
  109 | 
  110 |     await page.reload()
  111 | 
  112 |     await expect(page.getByTestId('habit-card-gym')).toBeVisible()
  113 |   })
  114 | 
  115 |   test('logs out and redirects to /login', async ({ page }) => {
  116 |     await page.addInitScript(() => {
  117 |       localStorage.setItem(
  118 |         'habit-tracker-session',
  119 |         JSON.stringify({ userId: '1', email: 'test@test.com' })
  120 |       )
  121 |     })
  122 | 
  123 |     await page.goto('/dashboard')
  124 | 
  125 |     await page.getByTestId('auth-logout-button').click()
  126 | 
  127 |     await page.waitForURL('/login')
  128 |   })
  129 | 
  130 |   test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
  131 |     await page.goto('/')
  132 |     await context.setOffline(true)
  133 | 
> 134 |     await page.reload()
      |                ^ Error: page.reload: net::ERR_INTERNET_DISCONNECTED
  135 | 
  136 |     await expect(page.getByTestId('splash-screen')).toBeVisible()
  137 |   })
  138 | })
```