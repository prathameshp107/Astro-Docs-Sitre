---
title: "Modern React Interview Questions"
description: "Interview questions covering React 19 features: Actions, useOptimistic, use(), Server Components, useActionState, and the React Compiler."
sidebar:
  order: 6
---

# Modern React (v19) Interview Questions

## Actions & Forms

**Q: What is a React 19 Action?**
A: An Action is a function passed to `<form action>` or created with `useActionState`. React tracks its pending state, handles the form data, and manages error/success states automatically — no manual `useState` for loading spinners needed.

**Q: What does `useActionState` return?**
A: It returns `[state, formAction, isPending]`. `state` holds the current result/error from the action, `formAction` is the wrapped function to pass to `<form>`, and `isPending` tells you if the action is still running.

**Q: How is `useFormStatus` different from `useActionState`?**
A: `useFormStatus` is called **inside** a form component and reads the parent form's pending state. `useActionState` wraps the action itself and provides both state and pending status to the component that defines the action.

**Q: Can Actions be used outside of forms?**
A: Yes. You can pass an Action to `startTransition` or use it as an event handler. React will track the pending state and handle error boundaries automatically.

## useOptimistic

**Q: What problem does `useOptimistic` solve?**
A: It enables **optimistic UI updates** — showing the expected result immediately before the server confirms. If the server request fails, the UI automatically reverts to the real state.

**Q: What are the arguments to `useOptimistic`?**
A: `useOptimistic(initialState, updateFn)`. `initialState` is the real data. `updateFn(currentState, optimisticValue)` returns the new optimistic state.

**Q: When would you NOT use optimistic updates?**
A: For financial transactions, irreversible operations (like permanent deletion), or when the UI would be confusing if it had to revert. Always show a clear indicator when using optimistic state.

## use() Hook

**Q: How is `use()` different from `useContext`?**
A: `use()` can read Context or Promises. Unlike `useContext`, it can be called **conditionally** and inside **loops**. It also triggers Suspense when reading a Promise.

**Q: When would you use `use()` instead of `useEffect` for data fetching?**
A: When you want **Suspense integration** — `use()` suspends the component, showing a fallback while data loads, without manual loading states or `useEffect` boilerplate.

**Q: What happens if `use()` receives a rejected Promise?**
A: The nearest Error Boundary catches it. You don't need try/catch or error state — just wrap the component in an Error Boundary.

## Server Components

**Q: What is the difference between Server and Client Components?**
A: Server Components run **only on the server** — they can access databases directly and ship **zero JavaScript** to the browser. Client Components (`"use client"`) run in the browser with full hooks support.

**Q: Can a Server Component have `useState` or `useEffect`?**
A: No. Server Components are **async functions** that render to static HTML. They cannot use any hooks. For interactivity, compose a Client Component (`"use client"`) inside a Server Component.

**Q: How do Server Components improve performance?**
A: They eliminate JavaScript bundles for non-interactive content, reduce client-side processing, and can stream content progressively using Suspense boundaries.

## React Compiler (React Forget)

**Q: What does the React Compiler do?**
A: It automatically memoizes components and hooks at build time. You no longer need `useMemo`, `useCallback`, or `React.memo` — the compiler adds them automatically.

**Q: Is the React Compiler required?**
A: No. It's an opt-in optimization. Existing code works without it. When enabled, it recompiles your components to add automatic memoization, reducing manual optimization work.

## General React 19

**Q: What changed with `ref` in React 19?**
A: `ref` is now a **regular prop** — you can pass it directly to function components without `forwardRef`. The `forwardRef` wrapper is no longer needed (but still works for backward compatibility).

**Q: How does React 19 improve Suspense?**
A: React 19 adds stable support for Suspense with **data fetching**. The new `use()` hook suspends components natively, and `<Suspense>` integrates with Actions for seamless loading states.

**Q: What are the four key features of React 19?**
A: (1) Actions & `useActionState` for form handling, (2) `useOptimistic` for optimistic UI, (3) `use()` for reading Promises and Context, and (4) the React Compiler for automatic memoization.

## Further Reading

- [React 19 Announcement](https://react.dev/blog/2024/12/05/react-19)
- [React Docs: Actions](https://react.dev/reference/react/useActionState)
- [React Compiler](https://react.dev/learn/react-compiler)
