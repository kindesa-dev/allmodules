# Module 4 — Student Registration Form

A **student registration form** built with React and Vite. The form collects a full
name, student ID, email, phone number, department, year, and gender — with
**real-time validation** and clear per-field error messages. Valid registrations are
added to a list of registered students shown below the form, and any student can be
deleted.

This module focuses on the trickier side of React UIs:
**forms, controlled inputs, and validation UX.**

> This is part of a larger project with five modules. See the
> [root README](../README.md) for the full overview and the module index.

---

## Table of Contents

- [Features](#features)
- [Validation Rules](#validation-rules)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the App Works](#how-the-app-works)
- [How to Use It](#how-to-use-it)
- [How to Add a New Field](#how-to-add-a-new-field)
- [Available Scripts](#available-scripts)
- [What You Can Practice Here](#what-you-can-practice-here)

---

## Features

- Seven form fields: full name, student ID, email, phone, department, year, gender.
- **Per-field validation** that runs live as you type and when you leave a field.
- **Inline error messages** with `aria-invalid` for accessibility.
- Errors shown on blur and on submit (or immediately after a failed submit).
- **Success message** after a valid registration, then the form resets.
- Registered students appear as cards below the form with a **Delete** button.
- **No browser default validation** — the app's own logic (`noValidate`) handles it.

---

## Validation Rules

| Field      | Rules                                                        |
| ---------- | ------------------------------------------------------------ |
| Full name  | Required; at least 3 characters.                             |
| Student ID | Required.                                                    |
| Email      | Required; must match a standard email format.                |
| Phone      | Required; `+` optional, 7–15 digits with spaces/`(`/`)`/`-`. |
| Department | Required (must be selected).                                 |
| Year       | Required (must be selected).                                 |
| Gender     | Required (must be selected).                                 |

---

## Tech Stack

- **React 19** — component-based UI.
- **Vite 8** — development server and build tool.
- **Oxlint** — JavaScript/JSX linting.
- **Plain CSS** — no UI framework.

---

## Project Structure

```
module4/
├── index.html              # HTML entry point
├── package.json            # dependencies and scripts
├── vite.config.js          # Vite configuration
├── .oxlintrc.json          # Oxlint rules
├── .gitignore              # files ignored by git
└── src/
    ├── main.jsx            # React bootstrap (entry point)
    ├── App.jsx             # holds the registered-students state
    ├── index.css           # global styles
    └── components/
        ├── Header.jsx              # page header + live student count
        ├── RegistrationForm.jsx    # THE form + validation logic
        ├── FormInput.jsx           # reusable text/email/tel field
        ├── FormSelect.jsx          # reusable dropdown field
        ├── ValidationMessage.jsx   # renders an error under a field
        ├── StudentList.jsx         # list of registered students (or empty state)
        └── StudentCard.jsx         # a single registered-student card
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended) and **npm**.

### Installation

```bash
# From the project root
cd module4

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

### Where the students live

`App.jsx` owns the list of registered students with `useState`. When the form submits
valid data it calls `handleAddStudent`, and each card's **Delete** button calls
`handleDeleteStudent`:

```js
function handleAddStudent(student) {
  setStudents((prev) => [...prev, { ...student, id: crypto.randomUUID() }])
}

function handleDeleteStudent(id) {
  setStudents((prev) => prev.filter((student) => student.id !== id))
}
```

### How validation works (in `RegistrationForm.jsx`)

One function validates every field and returns an error string (or an empty string):

```js
function validateField(name, value) {
  switch (name) {
    case 'email':
      if (!value) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.'
      return ''
    // ...other fields
  }
}
```

Three pieces of state drive the UX:

| State          | What it controls                                           |
| -------------- | ---------------------------------------------------------- |
| `formData`     | the current values of all fields (controlled inputs)       |
| `errors`       | the current error string for each field                    |
| `touched`      | which fields the user has already left (blurred)           |
| `showErrors`   | set to `true` after a submit attempt, so all errors appear |

A field's error is shown only when it makes sense to show it:

```js
function getFieldError(name) {
  return showErrors || touched[name] ? errors[name] : ''
}
```

On submit, every field is re-validated. If any error exists the form stays open with
errors visible; otherwise `onAddStudent(formData)` fires, the form resets, and a
success message appears.

---

## How to Use It

1. Fill in the form. Errors appear as you leave each field and whenever you submit.
2. Fix any red fields and press **Register Student** again.
3. A success message confirms the registration, and a student card appears below.
4. Remove a student at any time with the **Delete** button on its card.

---

## How to Add a New Field

1. Add the field to `INITIAL_FORM` in `RegistrationForm.jsx` (e.g. `city: ''`).
2. Add a validation `case` to `validateField`.
3. Render a new `FormInput` / `FormSelect` inside the `<form>` and wire up
   `value`, `error`, `onChange`, and `onBlur`.

Because `allFields` is derived from `INITIAL_FORM`, the submit logic picks up the new
field automatically.

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

- **Controlled form inputs** — every field's value lives in React state.
- **Centralized validation** — one `validateField` function per field.
- **Validation UX patterns** — `touched`, `errors`, and `showErrors` working together.
- **Reusable form components** — `FormInput` and `FormSelect` with labels + errors.
- **Lifting state up** — the form reports valid data to `App` via a callback prop.
- **Accessibility** — `aria-invalid`, labels tied to inputs, `role="alert"`.

### Ideas to extend

- Add a maximum length to name/ID fields.
- Validate student IDs against a list of known prefixes.
- Confirm the email field by adding a "repeat email" field.

Continue to [Module 5](../module5/README.md) for the final step: loading data from an
API.
