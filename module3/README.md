# Module 3 — Student Directory

A read-only **student directory** built with React and Vite. It shows a grid of
student cards (avatar, name, ID, department, year, email, phone) and lets you
**search** students by name or student ID and **filter** them by department.

This module focuses on **working with data in memory**:
searching, filtering, and deriving views from a static dataset.

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
- [How to Add or Edit Students](#how-to-add-or-edit-students)
- [Available Scripts](#available-scripts)
- [What You Can Practice Here](#what-you-can-practice-here)

---

## Features

- **Search** by full name or student ID (case-insensitive).
- **Filter** by department using a dropdown.
- **Combined filtering** — search and department filter work together.
- **Clear Filters** button that resets both search and department.
- **Live result count** — shows how many students match.
- **Empty state** — friendly message when nothing matches, with a one-click reset.
- Read-only app; the data is a static JavaScript array.

---

## Tech Stack

- **React 19** — component-based UI.
- **Vite 8** — development server and build tool.
- **Oxlint** — JavaScript/JSX linting.
- **Plain CSS** — no UI framework.

---

## Project Structure

```
module3/
├── index.html              # HTML entry point
├── package.json            # dependencies and scripts
├── vite.config.js          # Vite configuration
├── .oxlintrc.json          # Oxlint rules
├── .gitignore              # files ignored by git
├── public/
│   ├── favicon.svg         # browser tab icon
│   └── avatars/            # student avatar images (student-01.svg … student-12.svg)
└── src/
    ├── main.jsx            # React bootstrap (entry point)
    ├── App.jsx             # search/filter state + filtered logic
    ├── index.css           # global styles
    ├── data/
    │   └── students.js     # THE student dataset (default export)
    └── components/
        ├── Header.jsx          # page header
        ├── SearchBar.jsx       # search input
        ├── Filter.jsx          # department dropdown
        ├── StudentList.jsx     # grid + result count + empty state
        ├── StudentCard.jsx     # a single student card
        └── EmptyState.jsx      # "no results" message
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended) and **npm**.

### Installation

```bash
# From the project root
cd module3

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

The student records live in `src/data/students.js` and are imported once by
`src/App.jsx`. The app holds two pieces of state:

- `searchQuery` — the text typed into the search box.
- `selectedDepartment` — the currently selected department (empty = all).

Each render, `App` derives the visible list by filtering the full dataset:

```js
const filteredStudents = studentsData.filter((student) => {
  const matchesSearch =
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesDepartment =
    selectedDepartment === '' || student.department === selectedDepartment;

  return matchesSearch && matchesDepartment;
});
```

The department list for the dropdown is computed from the data itself, so it stays
in sync automatically:

```js
const departments = [...new Set(studentsData.map((s) => s.department))].sort();
```

---

## How to Use It

1. Type a name or student ID into the **search box** — the grid updates live.
2. Pick a **department** from the dropdown to narrow the results further.
3. When filters are active, a **Clear Filters** button appears — click it to reset.
4. If nothing matches, an empty state offers the same reset in one click.

---

## How to Add or Edit Students

All student data is in `src/data/students.js`. Each student object looks like:

```js
{
  id: 13,
  fullName: 'Olivia Brown',
  studentId: 'CS-2025-033',
  department: 'Computer Science',
  year: 'Freshman',
  email: 'olivia.brown@university.edu',
  phone: '(555) 010-2213',
  avatar: '/avatars/student-13.svg',
}
```

- **Add a student:** append a new object to the array (and add an avatar to
  `public/avatars/` if you want one).
- **Edit a student:** change any field directly.
- **Department options** update automatically because they are derived from the data.

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

- **Controlled inputs** — search text bound to React state.
- **Derived views** — filtering an array with `.filter()` based on multiple criteria.
- **Derived data** — building the department dropdown with `Set` + `sort()`.
- **Empty states** — conditional rendering when a filtered result is empty.
- **Component reusability** — the same `StudentCard` renders every student.

### Ideas to extend

- Add sorting (by name, ID, year, department).
- Add pagination for large datasets.
- Add more filters (e.g. by year of study).

Continue to [Module 4](../module4/README.md) for the next step: forms and
validation.
