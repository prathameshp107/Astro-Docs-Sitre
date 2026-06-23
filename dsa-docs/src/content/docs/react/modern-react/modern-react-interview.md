---
title: "Modern React Interview Questions"
description: "Interview questions covering React 19 features: Actions, useOptimistic, use(), Server Components, and more."
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

## useOptimistic

**Q: What problem does `useOptimistic` solve?**
A: It enables **optimistic UI updates** — showing the expected result immediately before the server confirms. If the server request fails, the UI automatically reverts to the real state.

**Q: What are the arguments to `useOptimistic`?**
A: `useOptimistic(initialState, updateFn)`. `initialState` is the real data. `updateFn(currentState, optimisticValue)` returns the new optimisic state.

## use() Hook

**Q: How is `use()` different from `useContext`?**
A: `use()` can read Context or Promises. Unlike `useContext`, it can be called **conditionally** and inside **loops**. It also triggers Suspense when reading a Promise.

**Q: When would you use `use()` instead of `useEffect` for data fetching?**
A: When you want **Suspense integration** — `use()` suspends the component, showing a fallback while data loads, without manual loading states or `useEffect` boilerplate.

## Server Components

**Q: What is the difference between Server and Client Components?**
A: Server Components run **only on the server** — they can access databases directly and ship **zero JavaScript** to the browser. Client Components (`"use client"`) run in the browser with full hooks support.

**Q: Can a Server Component have `useState` or `useEffect`?**
A: No. Server Components are **async functions** that render to static HTML. They cannot use any hooks. For interactivity, compose a Client Component (`"use client"`) inside a Server Component.

## General React 19

**Q: What changed with `ref` in React 19?**
A: `ref` is now a **regular prop** — you can pass it directly to function components without `forwardRef`. The `forwardRef` wrapper is no longer needed (but still works for backward compatibility).

**Q: How does React 19 improve Suspense?**
A: React 19 adds stable support for Suspense with **data fetching**. The new `use()` hook suspends components natively, and `<Suspense>` integrates with Actions for seamless loading states.
