---
title: "Functional Updates"
description: "The functional updater pattern: passing a function to setState that receives the latest pending state."
sidebar:
  order: 2
---

# Functional Updates

## Introduction

A functional update passes a **function** to the state setter instead of a value: `setCount(prev => prev + 1)`. The function receives the **latest pending state** from the update queue and returns the new state. This is essential when the new state depends on the previous state, especially in batched updates.

---

## When to Use Functional Updates

### 1. Multiple Updates in Sequence

```jsx
// ❌ BAD — all three updates use the same stale count
const handleWrong = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
  // Result: 1 (not 3)
};

// ✅ GOOD — each update receives the previous update's result
const handleCorrect = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Result: 3 ✅
};
```

### 2. Updates Inside Closures

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ BAD — count is always 0 inside this closure
      setCount(count + 1);

      // ✅ GOOD — prev captures the latest state from the queue
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty deps — count is stale!

  return <p>{count}</p>;
}
```

### 3. Toggling from Event Handlers

```jsx
function Toggle() {
  const [on, setOn] = useState(false);

  // ✅ GOOD — works correctly even if called multiple times
  const toggle = () => setOn(prev => !prev);

  // ❌ BAD — if toggled twice rapidly, both see the same `on`
  const badToggle = () => setOn(!on);
}
```

---

## Objects and Arrays

Functional updates are essential for updating state that's an object or array:

```jsx
const [user, setUser] = useState({ name: 'Alice', age: 30 });

// ✅ GOOD — spread previous state, then override
const updateAge = (newAge) => {
  setUser(prev => ({ ...prev, age: newAge }));
};

// ✅ GOOD — append to array
const addItem = (item) => {
  setItems(prev => [...prev, item]);
};

// ✅ GOOD — update item in array
const updateItem = (id, updates) => {
  setItems(prev =>
    prev.map(item => item.id === id ? { ...item, ...updates } : item)
  );
};
```

---

## Functional Updates vs Regular Updates

| Regular Update | Functional Update |
|----------------|-------------------|
| `setCount(count + 1)` | `setCount(prev => prev + 1)` |
| Uses current render's value | Uses latest queued value |
| Can cause stale data in batched updates | Always correct in batched updates |
| Simpler for values that don't depend on previous state | Required when new state depends on previous |

---

## Summary

- Use functional updates when the new state depends on the previous state.
- Always use functional updates inside intervals, timeouts, and event handlers that may fire rapidly.
- Functional updates work correctly with React's batching mechanism.
- For objects and arrays, spread the previous state before making changes.

## Related Topics

- [useState Overview](index)
- [State Queue & Batching](state-queue)
- [Lazy Initialization](lazy-initialization)

## Further Reading

- [React Docs: Updating State Based on Previous State](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)
- [React Docs: Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
