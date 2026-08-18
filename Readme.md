# allmodules — React Learning Project

A monorepo of **five self-contained React applications** built with **Vite 8** and
**React 19**, each teaching a different core skill — from a full e-commerce store to
data fetching from a (mock) API. Each module is a complete, runnable app so you can
focus on one concept at a time.

---

## Table of Contents

- [What's Inside](#whats-inside)
- [Module Index](#module-index)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [Learning Path](#learning-path)
- [Project Layout](#project-layout)
- [Common Commands](#common-commands)
- [Contributing](#contributing)
- [License](#license)

---

## What's Inside

| # | Module              | Focus                                                            | Stack                          |
| - | ------------------- | ---------------------------------------------------------------- | ------------------------------ |
| 1 | **Hbss-coffee-shop** | Full e-commerce flow: routing, cart, checkout                   | React, Vite, Tailwind CSS      |
| 2 | **module2**          | Task Manager — `useState`, CRUD, immutable updates              | React, Vite, plain CSS         |
| 3 | **module3**          | Student Directory — searching & filtering a dataset             | React, Vite, plain CSS         |
| 4 | **module4**          | Student Registration — forms, controlled inputs, validation     | React, Vite, plain CSS         |
| 5 | **module5**          | Student Dashboard — fetching data from an API                   | React, Vite, plain CSS         |

Each module has its own detailed `README.md` with full documentation, code walkthroughs,
and extension ideas. This root README gives you the big picture.

---

## Module Index

### 1. Hbss-coffee-shop — Coffee Shop E-commerce

A modern, responsive coffee shop web app with a complete e-commerce flow:

- Home, Menu, Product Details, Cart, and Checkout pages
- Search and category filtering on the menu
- Persistent cart via `localStorage`
- Form validation and order confirmation at checkout
- Mobile-first responsive design with a custom coffee-inspired Tailwind theme

▶ [Full README](Hbss-coffee-shop/README.md)

---

### 2. module2 — Task Manager (To-Do List)

A classic task manager with full CRUD on React state:

- Add, toggle, edit, and delete tasks
- Filter by All / Active / Completed
- Live summary counts (total / active / completed)
- Friendly empty states
- Everything lives in memory via `useState`

▶ [Full README](module2/README.md)

---

### 3. module3 — Student Directory

A read-only student directory focused on deriving views from a dataset:

- Search students by name or student ID (case-insensitive)
- Filter by department
- Combined search + filter
- Live result count and one-click clear filters
- Department options derived automatically from the data

▶ [Full README](module3/README.md)

---

### 4. module4 — Student Registration Form

A registration form focused on forms, controlled inputs, and validation UX:

- Seven fields with per-field, real-time validation
- Inline error messages with `aria-invalid` for accessibility
- Errors shown on blur and after a submit attempt
- Success message on valid registration, then form reset
- Registered students listed below the form with delete support

▶ [Full README](module4/README.md)

---

### 5. module5 — Student Dashboard (API Data)

A dashboard that fetches student records from an API:

- Data loaded with the Fetch API (not hard-coded)
- Loading, error, empty, and success states fully handled
- Search by name, ID, or department
- Detail modal on click
- Refresh button to re-fetch
- Includes a **mock API plugin** (`700 ms` delay) so it runs without a backend

▶ [Full README](module5/README.md)

---

## Technology Stack

| Tool      | Purpose                                                    | Used In              |
| --------- | ---------------------------------------------------------- | -------------------- |
| React 19  | UI library, hooks (`useState`, `useEffect`, `useMemo`...) | All modules          |
| Vite 8    | Dev server, build tool, plugin/middleware support         | All modules          |
| Tailwind CSS 4 | Utility-first CSS framework                        | Hbss-coffee-shop     |
| React Router 7 | Client-side routing                                | Hbss-coffee-shop     |
| React Icons    | Icon library                                        | Hbss-coffee-shop     |
| Oxlint    | JavaScript/JSX linting                                      | module2–module5      |
| ESLint    | Code linting                                                 | Hbss-coffee-shop     |
| Fetch API | Browser-native HTTP client                                   | module5              |

---

## Prerequisites

- **Node.js 18+** (20+ recommended)
- **npm 9+**

Verify your setup:

```bash
node --version
npm --version
```

---

## Getting Started

Each module is a standalone app and can be run independently. They do not share
dependencies, so install and run each one from its own folder.

### Quick Start

```bash
# 1. Pick a module
cd module2          # or: cd Hbss-coffee-shop / module3 / module4 / module5

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm run dev
```

Open the printed URL (usually `http://localhost:5173`) in your browser.

### Run everything at once

```bash
# From the project root, run each module in its own terminal:
cd Hbss-coffee-shop && npm run dev
cd module2 && npm run dev
cd module3 && npm run dev
cd module4 && npm run dev
cd module5 && npm run dev
```

Note: since Vite's default dev port is `5173` for every app, start them one at a time
or pass a custom port, e.g. `npm run dev -- --port 5180`.

---

## Learning Path

The modules are ordered to build skills progressively:

1. **Hbss-coffee-shop** — A complete, polished application: routing, global state
   (Context + `localStorage` persistence), and a real-world UI with Tailwind.

2. **module2 — Task Manager** — Master `useState` with an array of objects, immutable
   updates, derived state, controlled inputs, and lifting state up.

3. **module3 — Student Directory** — Combine controlled inputs with `.filter()` to
   derive views from a dataset; build options dynamically from the data itself.

4. **module4 — Registration Form** — Tackle the tricky side of forms: per-field
   validation, `touched` / `errors` / `showErrors` UX, and reusable form components.

5. **module5 — Dashboard (API)** — Bring it together with async data: `useEffect`
   fetching, the loading / error / success pattern, request cancellation, `useMemo`,
   and mocking a backend with a Vite middleware plugin.

> The coffee shop is listed first as a showcase app, but if you are following a
> skill-by-skill path you can start with **module2** and work up to **module5** —
> then come back and build the coffee shop with the full toolkit.

---

## Project Layout

```
allmodules/
├── Readme.md                 # ← this file (root overview)
├── Hbss-coffee-shop/         # Module 1 — Coffee shop e-commerce
│   ├── src/
│   │   ├── components/       # Navbar, Hero, Footer, ProductPreview...
│   │   ├── context/          # CartContext (cart state + localStorage)
│   │   ├── data/             # product.js (static product catalog)
│   │   └── pages/            # Home, Menu, ProductDetails, Cart, Checkout...
│   └── ...
├── module2/                  # Module 2 — Task Manager
│   └── src/components/       # TaskForm, TaskList, TaskItem, TaskFilter...
├── module3/                  # Module 3 — Student Directory
│   └── src/
│       ├── data/students.js  # the student dataset
│       └── components/       # SearchBar, Filter, StudentCard, EmptyState...
├── module4/                  # Module 4 — Registration Form
│   └── src/components/       # RegistrationForm, FormInput, FormSelect...
└── module5/                  # Module 5 — Student Dashboard (API)
    ├── mock/studentApi.mock.js  # Vite middleware that fakes /api/students
    └── src/
        ├── services/studentApi.js  # fetch wrapper for the API
        └── components/            # Dashboard, SearchBar, Loading, ErrorMessage...
```

---

## Common Commands

Run these inside a module folder (e.g. `cd module2`):

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm install`      | Install dependencies (first time only)   |
| `npm run dev`      | Start the dev server with hot reload     |
| `npm run build`    | Build the app into `dist/`               |
| `npm run preview`  | Preview the production build             |
| `npm run lint`     | Lint the source code                     |

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

Bug reports and ideas are welcome — open an issue to start a conversation.

---

## License

MIT License — feel free to use these modules for learning or commercial purposes.

---

*Built with React 19 + Vite 8. Each module contains its own detailed README with code
walkthroughs and extension ideas.*