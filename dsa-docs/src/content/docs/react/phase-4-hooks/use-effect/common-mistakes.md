---
title: "Common useEffect Mistakes"
description: "The most frequent useEffect bugs: infinite loops, stale closures, missing dependencies, and incorrect cleanup."
sidebar:
  order: 4
---

# Common useEffect Mistakes

## 1. Infinite Loops

The most common useEffect mistake: setting state inside an effect without specifying dependencies, causing an endless render→effect→render cycle.

```jsx
// ❌ BAD — causes infinite loop
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Triggers re-render → effect runs again → re-render...
  }); // No dependency array — runs after EVERY render

  return <p>{count}</p>;
}
```

**Fix:** Add a dependency array or remove the state update from the effect:

```jsx
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // Runs only once
```

## 2. Stale Closures

A stale closure occurs when the effect captures an old value of a variable and never updates it.

```jsx
// ❌ BAD — count is always 0 inside the timeout
function DelayedLogger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log(count); // Always logs 0 — captured at mount time
    }, 3000);
    return () => clearTimeout(id);
  }, []); // count is NOT in deps

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Fix:** Include `count` in the dependency array, or use a ref:

```jsx
// Option 1: Add to deps
useEffect(() => {
  const id = setTimeout(() => console.log(count), 3000);
  return () => clearTimeout(id);
}, [count]); // Re-runs when count changes

// Option 2: Use a ref (no re-run needed)
const countRef = useRef(count);
countRef.current = count;

useEffect(() => {
  const id = setTimeout(() => console.log(countRef.current), 3000);
  return () => clearTimeout(id);
}, []);
```

## 3. Missing Dependencies

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  // ❌ BAD — userId is used inside but missing from deps
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser);
  }, []); // Never re-fetches when userId changes
}
```

**Fix:** Add `userId` to the dependency array.

## 4. Object/Array Dependencies

```jsx
// ❌ BAD — options is a new object every render
function Search({ options }) {
  useEffect(() => {
    fetchResults(options);
  }, [options]); // Runs on EVERY render!
}
```

**Fix:** Use specific primitive values or memoize the object:

```jsx
useEffect(() => {
  fetchResults(options);
}, [options.query, options.page]); // Only runs when these specific values change
```

## 5. Forgetting Cleanup for Subscriptions

```jsx
// ❌ BAD — event listener is never removed
useEffect(() => {
  window.addEventListener('online', () => setIsOnline(true));
  window.addEventListener('offline', () => setIsOnline(false));
}, []); // Listeners accumulate on every StrictMode mount/unmount
```

**Fix:** Always return a cleanup function:

```jsx
useEffect(() => {
  const goOnline = () => setIsOnline(true);
  const goOffline = () => setIsOnline(false);
  window.addEventListener('online', goOnline);
  window.addEventListener('offline', goOffline);
  return () => {
    window.removeEventListener('online', goOnline);
    window.removeEventListener('offline', goOffline);
  };
}, []);
```

## 6. Using useEffect for Computed Values

```jsx
// ❌ BAD — unnecessary effect for derived state
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ GOOD — compute during render
const fullName = `${firstName} ${lastName}`;
```

## 7. Async Effect Callbacks

```jsx
// ❌ BAD — useEffect doesn't support async callbacks directly
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []); // Returns a Promise, not a cleanup function — React warns
```

**Fix:** Define the async function inside the effect:

```jsx
useEffect(() => {
  async function load() {
    const data = await fetchData();
    setData(data);
  }
  load();
}, []);
```

## Summary

| Mistake | Symptom | Fix |
|---------|---------|-----|
| No dependency array | Infinite loop | Add `[]` or deps |
| Missing deps | Stale data | Include all reactive values |
| Stale closure | Old values in callbacks | Add deps or use refs |
| No cleanup | Memory leaks | Always clean up |
| Object deps | Unnecessary re-runs | Use primitives or memoize |
| Async effect | Warning, broken cleanup | Define async inside |

## Related Topics

- [useEffect Overview](index)
- [Dependency Arrays](dependency-array)
- [Cleanup Functions](cleanup-functions)

## Further Reading

- [React Docs: Common useEffect Mistakes](https://react.dev/learn/you-might-not-need-an-effect)
- [React Docs: Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
