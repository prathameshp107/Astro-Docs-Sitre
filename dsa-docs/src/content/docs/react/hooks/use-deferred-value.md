---
title: "useDeferredValue"
description: "useDeferredValue lets you defer re-rendering a part of the UI — smoother updates for expensive lists."
sidebar:
  order: 14
---

# useDeferredValue -> "Defer heavy re-renders"

> **Simple Explanation:** 👉 `useDeferredValue` is like `useTransition` but for **values**, not state setters. You wrap a value (like search text) and React delays rendering the parts that depend on the deferred value — keeping the UI snappy.

## The Difference: `useTransition` vs `useDeferredValue`

| `useTransition` | `useDeferredValue` |
|---|---|
| You control *what code* is low priority | You control *what value* is low priority |
| Used with `startTransition(fn)` | Used with `useDeferredValue(value)` |
| Best when you own the state update | Best when the value comes from props or external sources |

## Example — Search with 10,000 Items

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchPage({ allItems }) {
  const [query, setQuery] = useState('');

  // Defer the query — React will render this at lower priority
  const deferredQuery = useDeferredValue(query);

  // Only re-render this list when deferredQuery changes (not on every keystroke)
  const results = useMemo(() => {
    return allItems.filter(item =>
      item.name.toLowerCase().includes(deferredQuery)
    );
  }, [deferredQuery, allItems]);

  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {isStale && <p>⏳ Updating...</p>}
      <ul style={{ opacity: isStale ? 0.5 : 1 }}>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

## Visual Feedback — Stale Indicator

```jsx
// Show a subtle visual cue when results are slightly behind
const isStale = query !== deferredQuery;

return (
  <div style={{ opacity: isStale ? 0.6 : 1 }}>
    <ResultList items={filteredItems} />
  </div>
);
```

## In Simple Words 🧠

- `useDeferredValue(value)` returns a **laggy version** of the value that React updates at lower priority
- Use it when you receive a value (from props, external store, etc.) that triggers a heavy render
- Combine with `useMemo` to avoid re-computing expensive lists on every change
- The old value stays visible until the deferred update is ready — no blank loading states
- Show a **stale indicator** (`isStale = value !== deferredValue`) for better UX
