# Module 5 — Student Dashboard (API Data)

A **student dashboard** built with React and Vite that fetches student records from an
API. It shows a grid of student cards, a search box (by name, ID, or department), a
detail modal when you click a student, a refresh button, and full handling of
**loading**, **error**, and **empty** states.

To work without a real backend, this module includes a **mock API plugin** that
simulates a server endpoint with a 700 ms delay. The app talks to it exactly the same
way it would talk to a real REST API.

This module focuses on the pattern used in nearly every real React app:
**fetching data asynchronously and managing the loading / error / success flow.**

> This is part of a larger project with five modules. See the
> [root README](../README.md) for the full overview and the module index.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the App Works](#how-the-app-works)
- [The Mock API Explained](#the-mock-api-explained)
- [How to Use It](#how-to-use-it)
- [How to Connect a Real API](#how-to-connect-a-real-api)
- [Available Scripts](#available-scripts)
- [What You Can Practice Here](#what-you-can-practice-here)

---

## Features

- **Fetch from an API** — data is loaded with the Fetch API, not hard-coded.
- **Loading state** — a spinner is shown while the request is in flight.
- **Error state** — a friendly error panel with a **Retry** button.
- **Empty state** — a message when there are no students.
- **Search** — filters by full name, student ID, or department.
- **Detail modal** — click any student to see all their info.
- **Refresh** — re-fetches the latest data on demand.
- **Mock backend** — a Vite middleware plugin simulates the API with a 700 ms delay.

---

## Tech Stack

- **React 19** — UI, hooks (`useState`, `useEffect`, `useMemo`).
- **Vite 8** — development server, build tool, and middleware (for the mock API).
- **Oxlint** — JavaScript/JSX linting.
- **Fetch API** — browser-native HTTP client.
- **Plain CSS** — no UI framework.

---

## Project Structure

```
module5/
├── index.html              # HTML entry point
├── package.json            # dependencies and scripts
├── vite.config.js          # Vite config — registers the mock API plugin
├── .oxlintrc.json          # Oxlint rules
├── .gitignore              # files ignored by git
├── mock/
│   └── studentApi.mock.js  # the mock server middleware (fake /api/students)
├── public/
│   ├── favicon.svg         # browser tab icon
│   └── avatars/            # student avatar images (avatar-1.svg … avatar-10.svg)
└── src/
    ├── main.jsx            # React bootstrap (entry point)
    ├── App.jsx             # page shell (Header + Dashboard)
    ├── App.css             # component styles
    ├── index.css           # global styles
    ├── services/
    │   └── studentApi.js   # the fetch wrapper for the API
    └── components/
        ├── Header.jsx          # page header
        ├── Dashboard.jsx       # data fetching + all UI states + modal
        ├── SearchBar.jsx       # search input with result count
        ├── StudentList.jsx     # the grid of student cards
        ├── StudentCard.jsx     # a single card (opens the detail modal)
        ├── Loading.jsx         # spinner state
        ├── ErrorMessage.jsx    # error state with Retry
        └── EmptyState.jsx      # "no results" state
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended) and **npm**.

### Installation

```bash
# From the project root
cd module5

# Install dependencies (first time only)
npm install
```

### Run the development server

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`). You will see the loading
spinner for about 700 ms, then the student cards appear.

### Build for production

```bash
npm run build
```

Creates a minified production bundle in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

---

## How the App Works

### Data fetching (`src/services/studentApi.js`)

A small service module wraps the API call so the rest of the app never touches
`fetch` directly:

```js
export const API_BASE_URL = '/api'

export async function getStudents() {
  const response = await fetch(`${API_BASE_URL}/students`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
```

### The dashboard flow (`src/components/Dashboard.jsx`)

`Dashboard` is the heart of the app. It uses `useEffect` to fetch data when the
component mounts, and tracks three states:

| State     | Purpose                                        |
| --------- | ---------------------------------------------- |
| `students`| the fetched array of students                  |
| `loading` | true while a request is running                |
| `error`   | the error message if the request failed        |

The fetch effect:

```js
useEffect(() => {
  let cancelled = false

  async function loadStudents() {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudents()
      if (!cancelled) setStudents(data)
    } catch (err) {
      if (!cancelled) setError(err.message)
    } finally {
      if (!cancelled) setLoading(false)
    }
  }

  loadStudents()

  return () => {
    cancelled = true   // ignore results if the component unmounts
  }
}, [reloadKey])
```

`reloadKey` is a counter bumped by the **Refresh Data** button; when it changes, the
effect re-runs and fetches again.

Search results are derived with `useMemo` so filtering only re-runs when `students`
or `search` actually change.

The UI picks one of several states based on `loading` / `error` / result counts:

```
loading        →  <Loading />
error          →  <ErrorMessage onRetry={...} />
no students    →  <EmptyState />
no search hits →  <EmptyState />
otherwise      →  <StudentList />
```

Clicking a card sets `selectedStudent`, which opens the detail **modal**.

---

## The Mock API Explained

`mock/studentApi.mock.js` exports a Vite plugin that intercepts requests to
`/api/students` and responds with a hard-coded array of 10 students after a
**700 ms delay**:

```js
export function mockStudentApi() {
  return {
    name: 'mock-student-api',
    configureServer(server) {
      server.middlewares.use('/api/students', (req, res) => {
        setTimeout(() => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(STUDENTS))
        }, RESPONSE_DELAY_MS)   // 700 ms
      })
    },
  }
}
```

It is registered in `vite.config.js`:

```js
plugins: [react(), mockStudentApi()],
```

Because the delay exists, you can actually *see* the loading and error handling in
action. To test the error state, you can temporarily make the mock respond with a
500 status — the dashboard will show the error panel with the Retry button.

---

## How to Use It

1. Open the app — the spinner appears, then the student cards load.
2. Type in the **search box** to filter by name, ID, or department (a live count
   shows matches).
3. Click **View Details** on any card to open the detail modal (click the backdrop or
   the × to close).
4. Click **Refresh Data** to fetch the list again.
5. If loading fails, an error panel appears with **Retry**.

---

## How to Connect a Real API

1. Edit `src/services/studentApi.js` to point at your real endpoint, e.g.:

   ```js
   export const API_BASE_URL = 'https://my-api.example.com'
   ```

2. Remove the mock plugin from `vite.config.js`:

   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
   })
   ```

3. (Optional) If your API lives on another domain, add its origin to Vite's
   `server.proxy` config to avoid CORS issues during development.

The rest of the app keeps working unchanged because it only talks to `getStudents()`.

---

## Available Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the dev server (with the mock API)   |
| `npm run build`    | Build the app into `dist/`                 |
| `npm run preview`  | Preview the production build               |
| `npm run lint`     | Lint the source code with Oxlint           |

---

## What You Can Practice Here

- **`useEffect`** — side effects: fetching data when the component mounts.
- **Async state management** — the `loading` / `error` / `success` pattern.
- **Abort/cancellation** — ignoring stale responses with a `cancelled` flag.
- **`useMemo`** — memoizing derived/filtered data.
- **Service layer** — keeping `fetch` isolated in a dedicated module.
- **Re-fetching** — using a reload key to trigger new requests.
- **Stateful rendering** — switching between loading, error, empty, and data views.
- **Mocking a backend** — a Vite middleware plugin as a stand-in for a server.

### Ideas to extend

- Add pagination or "load more".
- Add sorting and a detail "edit" view that PUTs changes.
- Add a real error simulation toggle to demonstrate the error state.
