---
title: "Performance & Memoization"
description: "React.memo, useMemo, useCallback — when memoization helps, when it hurts, and how to profile."
sidebar:
  order: 5
---

# Performance & Memoization

## Simple Words First 🟡

> **Analogy:** 👉 Imagine you're a chef. `useMemo` is like pre-chopping vegetables — you do the expensive work once and reuse it until the ingredients change. `React.memo` is like checking if you've already made this exact dish before — if yes, just reheat it instead of cooking from scratch.

## The Three Tools

| Tool | What It Memoizes | When to Use |
|---|---|---|
| `React.memo(Component)` | The entire component | Component re-renders with same props too often |
| `useMemo(() => value, [deps])` | A computed value | Expensive calculation that runs on every render |
| `useCallback(fn, [deps])` | A function definition | Pass a stable function to a memoized child |

## `React.memo` — Skip Re-renders

```jsx
import { memo, useState } from 'react';

// ❌ Without memo — re-renders whenever parent re-renders
function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

// ✅ With memo — only re-renders if props change
const MemoizedList = memo(function ExpensiveList({ items }) {
  console.log('Rendering list...');
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

function App() {
  const [count, setCount] = useState(0);
  const [items] = useState([...]); // Stable reference

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedList items={items} /> {/* Won't re-render — items didn't change */}
    </div>
  );
}
```

## `useCallback` — Stable Function References

```jsx
function Parent() {
  const [theme, setTheme] = useState('light');

  // ❌ New function every render — breaks memoization
  const handleClick = () => console.log('clicked');

  // ✅ Same function until theme changes
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // No deps = stable forever

  return <MemoButton onClick={handleClick} />;
}

const MemoButton = memo(function Button({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});
```

## When Memoization Hurts

```jsx
// ❌ DON'T wrap everything in useMemo
const total = useMemo(() => a + b, [a, b]); // Just `a + b` is faster!

// ❌ DON'T memoize trivial components
const SimpleLabel = memo(function Label({ text }) {
  return <span>{text}</span>; // This is fast enough without memo
});

// ✅ DO memoize when:
// 1. The component renders a large list
// 2. The component appears many times on screen
// 3. The computation is expensive (filtering 10k items)
// 4. The component is deep in the tree (costly to re-render children)
```

## Profiling — Don't Guess, Measure!

```jsx
// React DevTools Profiler
// 1. Open DevTools → Components → Profiler tab
// 2. Click the record button
// 3. Interact with your app
// 4. Stop recording
// 5. Look for components that re-render without prop changes

// Or use a console counter:
function ExpensiveComponent({ data }) {
  const renders = useRef(0);
  renders.current++;
  console.log(`Rendered ${renders.current} times`);

  return <ExpensiveChart data={data} />;
}
```

## In Simple Words 🧠

- **Measure first**, then optimize — don't prematurely memoize everything
- `React.memo` prevents re-renders when props haven't changed (shallow comparison)
- `useMemo` caches expensive computations — use it for filtering, sorting, transforming data
- `useCallback` is just `useMemo` for functions — use it with memoized children
- **When it hurts:** memoizing cheap operations adds overhead without benefit
- **React 19** introduces a compiler (`React Forget`) that auto-memoizes — less manual work!
