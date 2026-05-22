---
title: "React Interview Quick Cheatsheet"
description: "React interview hooks summary, comparisons, and answer framework."
---

##  Quick Cheatsheet

### All Hooks Summary

| Hook | Purpose | Key Rule |
|---|---|---|
| `useState` | Local state | Triggers re-render on change |
| `useEffect` | Side effects | Runs after render, never on server |
| `useRef` | DOM access / persist value | Does NOT trigger re-render |
| `useContext` | Read context | Re-renders on context value change |
| `useMemo` | Cache computed value | Only for expensive calculations |
| `useCallback` | Cache function reference | Pair with React.memo children |
| `useReducer` | Complex state logic | Like a local Redux store |
| `useLayoutEffect` | DOM measurements | Runs synchronously before paint |
| `useTransition` | Mark state update as non-urgent | React 18+ - you own the setter |
| `useDeferredValue` | Defer a value | React 18+ - you receive the value |
| `useOptimistic` | Instant UI before server confirms | React 19+ |
| `useActionState` | Async form state (pending/result/error) | React 19+ |
| `use()` | Read Promise or Context | React 19+ - can be conditional |

---

### Common Interview Comparison Table

| Question | A | B |
|---|---|---|
| Props vs State | From parent, read-only | Own data, settable via hook |
| `useMemo` vs `useCallback` | Caches a value | Caches a function |
| `useEffect` vs `useLayoutEffect` | After paint (async) | Before paint (sync) |
| Controlled vs Uncontrolled | React drives input value | DOM drives input value |
| `useState` vs `useReducer` | Simple primitive values | Complex logic / transitions |
| Context vs Redux | Simple global sharing | Complex state machine |
| `Link` vs `NavLink` | Basic navigation | Nav with active state styling |
| Server vs Client Component | Zero JS, async, DB access | Interactive, uses hooks |
| `useTransition` vs `useDeferredValue` | You own the setter | You receive the value |

---

### When To Use What

```
Simple local value           -> useState
Complex related values       -> useReducer
Share across few components  -> Lift state up + props
Share across many components -> Context API
Complex app state            -> Redux Toolkit or Zustand
DOM access                   -> useRef
Cached computation           -> useMemo
Stable function reference    -> useCallback
Data fetch on mount          -> useEffect(fn, [])
Data fetch when value changes -> useEffect(fn, [value])
Non-urgent state update      -> useTransition
Deferred value               -> useDeferredValue
Instant UI before server     -> useOptimistic (React 19)
Async form state             -> useActionState (React 19)
```

---

### Interview Answer Framework

Structure every answer using this format for maximum clarity:

```
1. WHAT   - define it simply in 1 sentence
2. WHY    - what problem does it solve
3. HOW    - quick code example
4. WHEN   - when to use / when NOT to use
5. GOTCHA - common mistake or edge case
```

---

*React 16.8 (Hooks) -> React 18 (Concurrent) -> React 19 (Actions & Compiler)*
*Updated: 2025-26 | 60 Questions - Easy -> Medium -> Hard*
