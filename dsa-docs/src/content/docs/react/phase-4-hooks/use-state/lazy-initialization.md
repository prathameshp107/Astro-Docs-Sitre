---
title: "Lazy Initialization"
description: "Passing a function to useState to compute the initial state only once, avoiding expensive recalculations on every render."
sidebar:
  order: 3
---

# Lazy Initialization

## Introduction

Lazy initialization is a pattern where you pass a **function** (not a value) to `useState`: `useState(() => computeInitialValue())`. React calls this function only during the **initial render** to compute the initial state. On subsequent renders, the function is ignored.

---

## Why Lazy Initialization Matters

```jsx
// ❌ BAD — called on EVERY render, even though React only uses the result once
function Dashboard() {
  const [data, setData] = useState(loadInitialDataFromStorage());
  // loadInitialDataFromStorage() runs on every render!
}
```

When you pass a value (`useState(expr)`), JavaScript evaluates `expr` immediately. If the expression is an expensive operation (reading from localStorage, parsing a large JSON, computing a complex value), it runs on **every render**, even though React only uses the result on the first render.

```jsx
// ✅ GOOD — called ONLY on the first render
function Dashboard() {
  const [data, setData] = useState(() => loadInitialDataFromStorage());
  // loadInitialDataFromStorage() runs once — on mount
}
```

When you pass a function (`useState(() => expr)`), React stores the function and calls it only during the initial render. On subsequent renders, React skips the function entirely.

---

## Common Use Cases

### 1. Reading from localStorage

```jsx
function loadPreferences() {
  console.log('Reading from localStorage...');
  const saved = localStorage.getItem('user-preferences');
  if (saved) {
    try { return JSON.parse(saved); }
    catch { /* fall through to default */ }
  }
  return { theme: 'light', fontSize: 14 };
}

export default function Settings() {
  // ✅ Lazy init — localStorage is read only on mount
  const [prefs, setPrefs] = useState(() => loadPreferences());

  return (
    <div>
      <p>Theme: {prefs.theme}</p>
      <button onClick={() => setPrefs(p => ({ ...p, theme: p.theme === 'light' ? 'dark' : 'light' }))}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 2. Transforming Large Data

```jsx
function transformDataset(rawData) {
  console.log('Transforming dataset...');
  return rawData
    .filter(item => item.active)
    .map(item => ({ id: item.id, label: item.name.toUpperCase() }));
}

const RAW_DATA = [/* large array from import */];

function DataViewer() {
  // ✅ Lazy init — transformation runs once
  const [items, setItems] = useState(() => transformDataset(RAW_DATA));
}
```

### 3. Initializing from Props (Run Once)

```jsx
function UserProfile({ initialUser }) {
  // ✅ Lazy init uses the initial value from props
  // Subsequent prop changes are IGNORED — the component manages its own state
  const [user, setUser] = useState(() => ({
    ...initialUser,
    lastEdited: null
  }));
}
```

---

## Lazy Initialization vs. useMemo

Both patterns optimize performance, but they serve different purposes:

| Pattern | When it runs | Purpose |
|---------|-------------|---------|
| `useState(() => expensive())` | Once on mount | Compute initial state |
| `useMemo(() => expensive(), [])` | Once on mount | Compute derived value |

Use lazy initialization when the value becomes **state** (it can be updated). Use `useMemo` when the value is **derived** (computed from other state/props).

---

## Common Mistake: Invoking the Function

```jsx
// ❌ BAD — invoking the function, not passing it
const [data, setData] = useState(computeInitialValue()); // Runs on every render

// ✅ GOOD — passing the function reference
const [data, setData] = useState(() => computeInitialValue()); // Runs once

// ✅ ALSO GOOD — passing function reference by name
function computeInitial() { return expensive(); }
const [data, setData] = useState(computeInitial); // React calls it, not you
```

---

## Summary

- Use `useState(() => expensive())` to run expensive initialization only once.
- Without lazy initialization, the expression runs on every render even though React ignores it.
- Common uses: localStorage reads, data transformation, initial value computation.
- Don't confuse lazy initialization with `useMemo` — one is for initial state, the other for derived values.

## Related Topics

- [useState Overview](index)
- [State Queue & Batching](state-queue)
- [useMemo for Expensive Computations](../use-memo)

## Further Reading

- [React Docs: useState Lazy Initialization](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)
