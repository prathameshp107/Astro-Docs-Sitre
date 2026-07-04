---
title: "useEffect Dependency Arrays"
description: "Master dependency arrays: how React compares deps, the rules of dependencies, and why missing or incorrect deps cause bugs."
sidebar:
  order: 1
---

# useEffect Dependency Arrays

## Introduction

The dependency array tells React when to re-run an effect. It's the second argument to `useEffect`. Understanding how it works is essential for writing correct, predictable effects.

---

## How Dependency Comparison Works

React compares dependencies using **`Object.is`** — the same comparison used by `React.memo` and `useMemo`. For primitive values (`number`, `string`, `boolean`), it compares by value. For objects, arrays, and functions, it compares by reference.

```javascript
Object.is(5, 5)        // true — primitives compare by value
Object.is([1, 2], [1, 2]) // false — new array, different reference
Object.is({a: 1}, {a: 1}) // false — new object, different reference
```

This means if you pass an inline object or array as a dependency, the effect will re-run on every render.

---

## Dependency Patterns

### Empty Array `[]` — Run Once

```jsx
useEffect(() => {
  fetchUserProfile();
}, []); // Effect runs only on mount
```

The effect runs after the first render and never again. Cleanup runs on unmount.

### No Array — Run After Every Render

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}); // No array — runs after every render
```

**⚠ Risk:** Without a dependency array, the effect runs after every render, which can cause infinite loops if the effect sets state.

### With Dependencies `[dep1, dep2]` — Run When Deps Change

```jsx
useEffect(() => {
  fetch(`/api/users/${userId}`);
}, [userId]); // Re-runs when userId changes
```

The effect runs on mount and whenever `userId` changes. If `userId` is the same across renders, the effect is skipped.

---

## Rules for Dependencies

1. **Include every reactive value** used inside the effect: props, state, and derived values.
2. **Do not include** `setState` functions, `useRef` refs, or stable functions from custom hooks (these have stable references).
3. **Do not include** the effect's own internal variables.

---

## Common Dependency Mistakes

### Missing Dependencies

```jsx
const [count, setCount] = useState(0);

// ❌ BAD — count is used inside but missing from deps
useEffect(() => {
  document.title = `Count: ${count}`;
}, []); // Stale closure — always shows count = 0

// ✅ GOOD — count is included
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

### Unnecessary Dependencies

```jsx
// ❌ BAD — setCount is stable, doesn't need to be in deps
useEffect(() => {
  setCount(count + 1);
}, [count, setCount]);

// ✅ GOOD — setCount is guaranteed stable by React
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

### Objects and Arrays as Dependencies

```jsx
// ❌ BAD — options object is recreated every render
function Search({ options }) {
  useEffect(() => {
    fetchResults(options);
  }, [options]); // Runs on every render! options is always a new object
}

// ✅ GOOD — use specific primitive values
function Search({ options }) {
  useEffect(() => {
    fetchResults(options);
  }, [options.query, options.page]); // Only runs when query or page changes
}
```

---

## Using the ESLint Plugin

The `eslint-plugin-react-hooks` package includes the `exhaustive-deps` rule, which automatically warns about missing or incorrect dependencies:

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

If the lint rule suggests adding a dependency, add it. If you genuinely can't (e.g., the value causes an infinite loop), add a comment to suppress the warning:

```jsx
useEffect(() => {
  setCount(prev => prev + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Intentionally empty — we only want to run once
```

---

## Summary

- Deps are compared with `Object.is` — primitives by value, objects by reference.
- `[]` = run once on mount. `[dep]` = run when dep changes. No array = run every render.
- Include every reactive value from the closure in the dependency array.
- Use the ESLint `exhaustive-deps` rule to catch mistakes automatically.
- Prefer primitive values over objects/arrays as dependencies.

## Related Topics

- [useEffect Overview](index)
- [Cleanup Functions](cleanup-functions)
- [Race Conditions](race-conditions)

## Further Reading

- [React Docs: useEffect Dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)
- [React Docs: Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
