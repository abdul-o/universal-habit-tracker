# 🧠 Habit Tracker PWA

A fully functional **Habit Tracker Progressive Web App (PWA)** built with **Next.js, React, and Tailwind CSS**, implementing authentication, habit management, offline support, and a complete automated testing suite.

---

## 🚀 Live Demo

👉 *deployed link*

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/abdul-o/universal-habit-tracker
cd universal-habit-tracker
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```text
http://localhost:3000
```

---

## 🧪 Running Tests

### Unit Tests

```bash
npm run test:unit
```

### Integration Tests

```bash
npm run test:integration
```

### End-to-End Tests (E2E)

```bash
npm run test:e2e
```

---

## 🧱 Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    login/
    signup/
    dashboard/
  components/
    auth/
    habits/
    shared/
  lib/
    auth.ts
    habits.ts
    storage.ts
    streaks.ts
    validators.ts
    slug.ts
  types/
public/
  manifest.json
  sw.js
tests/
  unit/
  integration/
  e2e/
```

---

## 🔐 Features

### Authentication

* User signup and login
* Session persistence using localStorage
* Protected routes

### Habit Management

* Create habits
* Delete habits
* Mark habits as completed
* Track streaks

### Persistence

* All data stored locally (no backend required)
* Session survives page reload

### Progressive Web App (PWA)

* Service Worker implemented
* Offline support enabled
* App shell caching

---

## 🧪 Testing Strategy

### Unit Tests

* Validate core utility functions:

  * slug generation
  * validators
  * streak calculations
  * habit logic

### Integration Tests

* Auth flow (signup & login)
* Habit form behavior

### End-to-End Tests (Playwright)

* Full user journey:

  * splash screen
  * authentication
  * dashboard usage
  * habit creation
  * persistence
  * logout
  * offline functionality

---

## ⚙️ Technical Decisions

* **Next.js App Router** used for routing and structure
* **LocalStorage** used as a lightweight database
* **Service Worker** implemented manually for PWA behavior
* **Vitest** used for unit and integration testing
* **Playwright** used for E2E testing

---

## ⚖️ Assumptions & Trade-offs

* No backend API — all data is stored locally
* Single-user session model
* No encryption for stored data (for simplicity)
* Focus was on meeting specification and test requirements

---

## 📌 Mapping to Requirements

* ✔ Required folder structure implemented
* ✔ Required naming conventions followed
* ✔ Required routes created
* ✔ Required utilities exported
* ✔ Required test files and titles implemented
* ✔ PWA requirements satisfied
* ✔ All automated tests passing

---

## 🚀 Deployment

To build the app:

```bash
npm run build
npm start
```

Recommended deployment:

👉 Vercel (auto-detects Next.js)

---

## 🎯 Final Status

```text
All Tests Passed ✅
PWA Working ✅
Requirements Met ✅
```

---

## 🙌 Author

**Your Name**

---

## 📄 License

This project is for educational and assessment purposes.
