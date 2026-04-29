#  Habit Tracker PWA

A Progressive Web App (PWA) built with Next.js that allows users to create, track, and maintain habits with persistent local storage and offline support.

---

##  Project Overview

This application implements a habit tracking system where users can:

* Sign up and log in
* Create and manage habits
* Track daily streaks
* Persist data locally
* Use the app offline via PWA support

The project strictly follows a Technical Requirements Document (TRD) including structure, naming, and testing constraints.

---

##  Setup Instructions

```bash
git clone <your-repo-url>
cd universal-habit-tracker
npm install
```

---

##  Run Instructions

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

##  Test Instructions

### Unit Tests

```bash
npm run test:unit
```

### Integration Tests

```bash
npm run test:integration
```

### End-to-End Tests

```bash
npm run test:e2e
```

---

##  Local Persistence Structure

The application uses **localStorage** as its data layer.

### Stored Keys

* `users` → array of registered users
* `session` → currently logged-in user
* `habits` → list of habits grouped by user

### Example Structure

```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "password": "123456",
      "createdAt": "timestamp"
    }
  ],
  "session": {
    "userId": "uuid",
    "email": "user@example.com"
  },
  "habits": [
    {
      "id": "uuid",
      "userId": "uuid",
      "title": "Exercise",
      "completedDates": ["2026-04-01"]
    }
  ]
}
```

### Behavior

* Session is checked on route access
* Data persists across reloads
* Each user sees only their own habits

---

##  PWA Implementation

The app includes Progressive Web App support via:

### 1. Service Worker (`sw.js`)

* Caches the root (`/`) on install
* Uses a **network-first strategy**
* Falls back to cached version when offline

### 2. Manifest File

Defines:

* App name
* Icons
* Theme colors
* Standalone display mode

### 3. Offline Behavior

* App loads normally when online
* When offline:

  * Navigation falls back to cached `/`
  * Splash screen renders successfully

---

##  Technical Decisions

* **Next.js App Router** for routing
* **LocalStorage** instead of backend (TRD requirement)
* **Vitest** for unit + integration tests
* **Playwright** for E2E testing
* **Manual Service Worker** (no external libraries)

---

##  Trade-offs & Limitations

* No backend → data not shared across devices
* No encryption for stored data
* Limited offline caching (only app shell)
* Not optimized for multi-user environments

---

##  Mapping to Technical Requirements

| Requirement        | Implementation                         |
| ------------------ | -------------------------------------- |
| Folder structure   | Matches TRD exactly                    |
| Routes             | `/`, `/login`, `/signup`, `/dashboard` |
| Naming conventions | Followed strictly                      |
| Utilities          | Implemented in `lib/`                  |
| Local persistence  | Implemented via `storage.ts`           |
| PWA support        | `manifest.json` + `sw.js`              |
| Tests              | Unit, Integration, E2E all implemented |

---

##  Test File Breakdown

* `tests/unit/` → core logic (slug, validators, streaks, habits)
* `tests/integration/` → auth flow, habit form
* `tests/e2e/` → full app behavior

Each test file uses required naming conventions and validates expected behavior.

---

##  Deployment

```bash
npm run build
npm start
```

Recommended platform: **Vercel**

---

##  Final Status

```
All Tests Passed
PWA Working
TRD Requirements Met
```

