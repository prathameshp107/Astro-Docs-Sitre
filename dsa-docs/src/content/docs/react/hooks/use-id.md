---
title: "useId"
description: "useId generates stable, unique IDs for accessibility attributes — safe for SSR and hydration."
sidebar:
  order: 12
---

# useId -> "Stable unique IDs"

> **Simple Explanation:** 👉 When you have multiple copies of the same component (like a list of form fields), you need each field to have a unique HTML `id` for accessibility. `useId` gives you a unique string that stays the same across server rendering and hydration — preventing mismatch errors.

## Why Not Just Use `Math.random()`?

```jsx
// ❌ This breaks on SSR!
const id = Math.random().toString(); // Different on server vs client → hydration mismatch

// ✅ useId stays the same!
const id = useId(); // Same on both server and client
```

## Example — Accessible Form Fields

```jsx
import { useId } from 'react';

function EmailField() {
  const id = useId(); // Unique per component instance

  return (
    <div>
      <label htmlFor={id}>Email:</label>
      <input id={id} type="email" />
      {/* Even if EmailField is used 5 times, each label matches its input */}
    </div>
  );
}

function SignupForm() {
  return (
    <form>
      <h2>Primary Email</h2>
      <EmailField />
      <h2>Backup Email</h2>
      <EmailField /> {/* 👈 Same component, different generated IDs */}
    </form>
  );
}
```

## In Simple Words 🧠

- `useId` generates **unique, stable** IDs that survive SSR hydration
- Use it for `htmlFor` ↔ `id` pairs in forms and `aria-*` attributes
- **Never use `Math.random()` or `useRef().current++`** for IDs — they break SSR
- Each component instance gets its own unique prefix — no collisions even with multiple copies
- Added in React 18 — now the standard way to generate IDs in React apps
