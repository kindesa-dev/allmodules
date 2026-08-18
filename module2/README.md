# Module 2 — Task Manager (To-Do List)

A classic **to-do / task manager** built with React and Vite. You can add tasks,
mark them complete, edit their titles, delete them, and filter the list by
All / Active / Completed. A summary bar shows the total, active, and completed counts
at a glance.

This module focuses on the core of React interactivity:
**state with `useState` and full CRUD (create, read, update, delete) on that state.**

> This is part of a larger project with five modules. See the
> [root README](../README.md) for the full overview and the module index.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the App Works](#how-the-app-works)
- [How to Use It](#how-to-use-it)
- [Available Scripts](#available-scripts)
- [What You Can Practice Here](#what-you-can-practice-here)

---

## Features

- **Add tasks** — type a title and press Enter or click *Add Task*.
- **Toggle completion** — check a task to mark it done (with strikethrough styling).
- **Edit tasks** — click *Edit*, change the title inline, then *Save* or *Cancel*.
- **Delete tasks** — remove a task with one click.
- **Filtering** — view **All**, **Active**, or **Completed** tasks.
- **Summary counts** — live totals for total / active / completed.
- **Empty states** — friendly messages when there is nothing to show.
- Client-side only — everything lives in React state.

---

## Tech Stack

- **React 19** — UI and state management.
- **Vite 8** — development server and build tool.
- **Oxlint** — JavaScript/JSX linting.
- **Plain CSS** — no UI framework.

---

## Project Structure

```
module2/
├── index.html              # HTML entry point
├── package.json            # dependencies and scripts
├── vite.config.js          # Vite configuration
├── .oxlintrc.json          # Oxlint rules
├── .gitignore              # files ignored by git
└── src/
    ├── main.jsx            # React bootstrap (entry point)
    ├── App.jsx             # owns all task state + all logic
    ├── index.css           # global styles
    └── components/
        ├── Header.jsx          # app title header
        ├── TaskForm.jsx        # "add a task" input + button
        ├── TaskSummary.jsx     # total / active / completed counts
        ├── TaskFilter.jsx      # All / Active / Completed buttons
        ├── TaskList.jsx        # renders the list (or an empty state)
        └── TaskItem.jsx        # one task row: toggle, edit, delete
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended) and **npm**.

### Installation

```bash
# From the project root
cd module2

# Install dependencies (first time only)
npm install
```

### Run the development server

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`) in your browser.

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

All state lives in `src/App.jsx`:

- `tasks` — the array of task objects `{ id, title, completed }`.
- `filter` — the current filter: `'all'` | `'active'` | `'completed'`.

The state-updating functions are passed **down** to components as props:

| Handler        | What it does                                |
| -------------- | ------------------------------------------- |
| `addTask`      | appends a new task to the array             |
| `toggleTask`   | flips the `completed` flag of a task        |
| `editTask`     | updates the title of a task                 |
| `deleteTask`   | removes a task by id                        |

Key pattern — always update state **immutably**:

```js
// add — spread the old array, append the new task
setTasks((current) => [...current, { id, title, completed: false }])

// toggle — map and copy only the changed task
setTasks((current) =>
  current.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  ),
)
```

The list you see is derived from `tasks` and `filter` — the filter never mutates the
real data; it only decides which tasks are shown.

---

## How to Use It

1. Type something into the *"What needs to be done?"* box and press **Add Task**.
2. Tick the checkbox to complete a task (or un-tick to reactivate it).
3. Press **Edit** to change a task's title inline, then **Save** (or **Cancel**).
4. Press **Delete** to remove a task.
5. Use **All / Active / Completed** to filter what is shown.
6. Watch the summary counts update live.

> Note: tasks live only in memory. Refreshing the page resets the list. See
> *What You Can Practice Here* below for how you could add persistence.

---

## Available Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the dev server with hot reload       |
| `npm run build`    | Build the app into `dist/`                 |
| `npm run preview`  | Preview the production build               |
| `npm run lint`     | Lint the source code with Oxlint           |

---

## What You Can Practice Here

- **`useState`** — managing complex state (an array of objects + a filter).
- **Immutable updates** — `map`, `filter`, and spread instead of mutation.
- **Derived state** — counts and visible tasks computed from `tasks` + `filter`.
- **Controlled inputs** — the form input value is bound to React state.
- **Lifting state up** — child components receive data and handlers via props.
- **Inline editing** — a component-local editing mode with `useState`.

### Ideas to extend

- Persist tasks with `localStorage` (load on mount, save on change).
- Add task priorities or due dates.
- Sort tasks or allow drag-and-drop reordering.

Continue to [Module 3](../module3/README.md) for the next step: searching and
filtering a dataset.
