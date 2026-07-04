---
title: "useTransition"
description: "Master useTransition: React's hook for marking state updates as non-urgent transitions to keep the UI responsive."
sidebar:
  order: 13
---

# useTransition — The Transition Hook

## Introduction

`useTransition` lets you mark certain state updates as **transitions** — lower priority updates that can be interrupted by more urgent updates (like typing). It prevents UI jank during heavy re-renders.

## Why do we need this?

Some state updates are heavy (filtering lists, rendering charts). These should not block the user from typing or clicking.

### Problem Statement

Tab switching shows a heavy dashboard component that takes 200ms to render. Every tab click feels sluggish. `useTransition` keeps the old tab visible while the new tab renders in the background.

## Syntax

```javascript
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setHeavyState(newValue); // This update is interruptible
});
```

## Basic Example

```jsx
import { useState, useTransition } from 'react';

export default function Tabs() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (next) => {
    startTransition(() => setTab(next));
  };

  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('heavy')}>Heavy Tab</button>
      {isPending && <p>Loading...</p>}
      {tab === 'home' && <p>Home content</p>}
      {tab === 'heavy' && <HeavyComponent />}
    </div>
  );
}
```

## Advanced Example

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value); // Urgent: input updates immediately
    startTransition(() => {
      setResults(filterExpensiveList(e.target.value)); // Non-urgent
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <Results list={results} />}
    </div>
  );
}
```

## Best Practices

💡 Use for non-urgent state updates. The old UI stays responsive during transitions.

🚀 Use `isPending` to show loading indicators. Combine with `Suspense`.

## MCQ

1. **What does startTransition do?** A) Animation  B) Marks update as low priority  C) Stops renders  D) Clears state → *B*
2. **What does isPending indicate?** A) State is loaded  B) Transition is in progress  C) Error occurred  D) Nothing → *B*
3. **Difference from useDeferredValue?** A) useTransition wraps setState  B) useDeferredValue wraps value  C) Both  D) Neither → *C*

## Practice Exercise

Create a tab switcher with one slow tab using `startTransition`. Show loading indicator.

## Summary

📖 `useTransition` marks updates as non-urgent. Keeps UI responsive. Shows pending state.

## Related Topics

[useDeferredValue](use-deferred-value) | [Suspense](../phase-7-advanced/suspense-lazy)

## Further Reading

[React Docs: useTransition](https://react.dev/reference/react/useTransition)
