---
title: "useId"
description: "Master useId: React's hook for generating unique IDs for accessibility and SSR hydration."
sidebar:
  order: 11
---

# useId — The Unique ID Hook

## Introduction

`useId` generates unique, stable IDs for accessible HTML attributes (`aria-describedby`, `htmlFor`). It prevents ID collisions in SSR hydration.

## Why do we need this?

Manually generating IDs causes SSR hydration mismatches. Libraries like `uuid` work but don't integrate with React's SSR. `useId` generates stable, unique IDs across server and client.

### Problem Statement

A reusable `<Tooltip>` component needs unique `id` attributes for `aria-describedby` connections. If two tooltips render, they need different IDs. With SSR, the server and client must generate the same IDs.

## Basic Example

```jsx
import { useId } from 'react';

export default function Tooltip({ text, children }) {
  const id = useId();
  return (
    <div>
      <button aria-describedby={id}>Hover me</button>
      <div id={id} role="tooltip" style={{ display: 'none' }}>{text}</div>
    </div>
  );
}
```

## Intermediate Example

Form with htmlFor:

```jsx
export default function FormField({ label, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}
```

## Best Practices

💡 `useId` replaces `Math.random()` or incrementing counters for IDs.

🚀 Use for `aria-*`, `htmlFor`, and any unique ID needs. Never use `Math.random()` for SSR-safe IDs.

## MCQ

1. **What problem does useId solve?** A) Performance  B) SSR hydration mismatch  C) State  D) Effects → *B*
2. **When is useId generated?** A) On every render  B) Once per component instance  C) On click  D) On mount → *B*

## Summary

📖 Generates unique, stable IDs. Essential for accessible components with SSR.

## Related Topics

[Accessibility Notes](../phase-4-hooks/hook-fundamentals) | [Forms](../phase-2-components-jsx/forms)

## Further Reading

[React Docs: useId](https://react.dev/reference/react/useId)
