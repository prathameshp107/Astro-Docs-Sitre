---
title: "Storing Mutable Values with useRef"
description: "Using useRef as a mutable container that persists across renders without triggering re-renders."
sidebar:
  order: 2
---

# Storing Mutable Values with useRef

## Introduction

`useRef` is not just for DOM access. It can hold any mutable value that persists across renders without causing re-renders. Unlike `useState`, changing `ref.current` does **not** trigger a component update — making refs ideal for values that need to persist but don't affect the UI directly.

---

## Common Use Cases

### 1. Storing Interval IDs

```jsx
function Timer() {
  const intervalRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

**Why a ref?** The interval ID needs to be accessible from both `start` and `stop` handlers, but it doesn't affect the UI. Using state would cause unnecessary re-renders.

### 2. Tracking Previous Values

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; // Store after render
  });
  return ref.current; // Return previous value (before the effect ran)
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Now: {count}, Before: {prevCount ?? '—'}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

### 3. Avoiding Stale Closures in Callbacks

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const roomIdRef = useRef(roomId);

  // Keep the ref in sync with the prop
  useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  useEffect(() => {
    const socket = new WebSocket(`wss://chat.example.com/${roomId}`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Use the ref to avoid stale closure issues
      console.log(`New message in room ${roomIdRef.current}`);
      setMessages(prev => [...prev, message]);
    };

    return () => socket.close();
  }, [roomId]); // Effect re-runs when roomId changes
}
```

### 4. Counting Renders (Debugging)

```jsx
function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1; // Safe: no re-render triggered

  return <p>Rendered {renderCount.current} times</p>;
}
```

### 5. Caching Expensive Computations

```jsx
function useCache(compute, deps) {
  const cache = useRef(null);
  const prevDeps = useRef(null);

  // If deps haven't changed, return cached result
  if (prevDeps.current && deps.every((d, i) => d === prevDeps.current[i])) {
    return cache.current;
  }

  // Deps changed — recompute and cache
  prevDeps.current = deps;
  cache.current = compute();
  return cache.current;
}
```

---

## Ref vs. State: When to Use What

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Timer/interval ID | `useRef` | Doesn't affect UI |
| Previous value | `useRef` | Doesn't trigger re-render |
| Callback ref for stale closure | `useRef` | Stable reference across renders |
| Render counter | `useRef` | No re-render needed |
| Displayed value | `useState` | UI must update |
| Form input | `useState` | UI must reflect value |

---

## Common Mistakes

⚠ **Using ref for displayed values**

```jsx
// ❌ BAD — typing in input won't update the display
const text = useRef('');
<input onChange={e => text.current = e.target.value} />
<p>You typed: {text.current}</p> // Never updates!

// ✅ GOOD — useState triggers re-render
const [text, setText] = useState('');
<input onChange={e => setText(e.target.value)} />
<p>You typed: {text}</p>
```

---

## Summary

- `useRef` can store any mutable value, not just DOM nodes.
- Changing `ref.current` does NOT trigger a re-render.
- Use refs for: interval IDs, previous values, avoiding stale closures, caching, render counts.
- Use `useState` for values that the UI needs to display.

## Related Topics

- [useRef Overview](index)
- [Accessing DOM Elements](dom-access)
- [forwardRef Pattern](forward-ref)

## Further Reading

- [React Docs: useRef to Store Information](https://react.dev/reference/react/useRef#storing-information-from-previous-renders)
- [React Docs: Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
