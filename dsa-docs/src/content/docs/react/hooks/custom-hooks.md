---
title: "Custom Hooks"
description: "Creating custom hooks for reusable logic in React."
sort: 8
---

# 🔹 8. Custom Hook → “Reuse logic”

> Simple Explanation: This is the coolest part of React. A Custom Hook is just a JavaScript function you write yourself that uses other hooks inside it. It allows you to copy-paste logic instead of code.

> If you find yourself writing the same useState and useEffect logic in three different components (like checking if a user is online), you bundle them into a Custom Hook.

Custom Hook Rules:

>Its name must start with use (like useOnlineStatus).

>It can call other hooks inside it.

> 👉 Example: A hook that tells you if you are online.

```jsx
function useCounter() {
  const [count, setCount] = React.useState(0);
  return { count, setCount };
}
```

👉 Use:

```jsx
function App() {
  const { count, setCount } = useCounter();
}
```

---

# 🧠 Very Important Rule (Remember This)

👉 Hooks must always run in the **same order**

```jsx
// ❌ Wrong
if (true) {
  useState(0);
}
```

👉 React depends on order internally

---

# 🔄 How Hooks Work (Simple Flow)

```txt
1. Component runs
2. Hooks run in order
3. React stores values
4. UI shows
5. State changes → re-render
```
---

# 🧠 Component as a Machine (Complete Version)

Think of a component like a **machine**:

* `useState` → 🧠 memory (stores data)
* `useEffect` → ⚙️ side actions (runs after render)
* `useRef` → 📦 hidden storage (no re-render)
* `useContext` → 🌐 shared network (global data)
* `useReducer` → 🧮 decision engine (complex state logic)
* `useMemo` → 🧠 cached brain (remembers calculations)
* `useCallback` → 🔁 stable function (prevents unnecessary re-renders)
* `useLayoutEffect` → ⚡ pre-paint control (runs before UI shows)
* Custom Hooks → 🧩 reusable modules (shared logic across components)

---

# ⚡ When to Use What (Complete & Simple)

* Need to store simple data → `useState`
* Need to run something after UI updates → `useEffect`
* Need DOM access or store value without re-render → `useRef`
* Need global/shared data → `useContext`
* Need to handle complex state logic → `useReducer`
* Need to optimize heavy calculation → `useMemo`
* Need to prevent function re-creation → `useCallback`
* Need to control layout before paint → `useLayoutEffect`
* Need reusable logic across components → Custom Hooks

---

# 🧠 One-Line Understanding (Powerful)

* `useState` → “remember value”
* `useEffect` → “do something after render”
* `useRef` → “store without re-render”
* `useContext` → “share data globally”
* `useReducer` → “handle complex updates”
* `useMemo` → “don’t recalculate unnecessarily”
* `useCallback` → “don’t recreate function unnecessarily”
* `useLayoutEffect` → “run before screen updates”
* Custom Hook → “reuse logic cleanly”

---

# ⚛️ React Hooks Cheat Sheet

| Hook              | When to use it?                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `useState`        | When you need to store and update simple data (like counters, input values, toggles).                    |
| `useEffect`       | When you need to run code after render (API calls, timers, subscriptions, side effects).                 |
| `useRef`          | When you need to store a value without causing re-render OR access DOM elements directly.                |
| `useContext`      | When you want to share data across many components without passing props manually (avoid prop drilling). |
| `useReducer`      | When `useState` gets messy or you have complex state logic (multiple conditions, actions).               |
| `useMemo`         | To avoid re-running expensive calculations on every render (performance optimization).                   |
| `useCallback`     | To keep a function "stable" so child components don’t re-render unnecessarily.                           |
| `useLayoutEffect` | When you need to run code before the browser paints (DOM measurement, layout fixes).                     |
| Custom Hooks      | To reuse the same logic across multiple components (clean and scalable code).                            |

---
