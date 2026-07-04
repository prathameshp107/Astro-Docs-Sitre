---
title: "Components Using Custom Hooks"
description: "How components consume and compose custom hooks to reuse stateful logic across the application."
---

# Components Using Custom Hooks

## Introduction

Custom Hooks let you extract stateful logic from components into reusable functions. A component that uses a custom hook is cleaner, smaller, and focused on rendering — the hook handles the logic. This page covers how components consume custom hooks, how to compose multiple hooks in one component, and when to create a custom hook vs keeping logic inline.

---

## Basic Usage

A component calls a custom hook like any other function. The hook returns state and helpers that the component uses in its JSX.

```jsx
import { useState, useEffect } from 'react';

// Custom hook
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, []);
  return isOnline;
}

// Component using the hook
export default function StatusBar() {
  const isOnline = useOnlineStatus();

  return (
    <div style={{ padding: '12px', backgroundColor: isOnline ? '#f0fdf4' : '#fef2f2' }}>
      <span style={{ color: isOnline ? '#166534' : '#991b1b' }}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </span>
    </div>
  );
}
```

**Explanation:** `useOnlineStatus` encapsulates the `useState` + `useEffect` logic for tracking network status. The component just calls it and renders the result. The hook can be reused in any other component.

---

## Composing Multiple Hooks

A single component can use multiple custom hooks. Each hook manages its own concern independently.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function Dashboard({ user }) {
  const isOnline = useOnlineStatus();
  const width = useWindowWidth();
  useDocumentTitle(user ? `${user.name}'s Dashboard` : 'Dashboard');

  return (
    <div>
      <StatusBadge online={isOnline} />
      <p>Window width: {width}px</p>
      <h1>Welcome, {user?.name}</h1>
    </div>
  );
}
```

**Explanation:** The component composes three independent hooks — online status, window width, and document title. Each hook is independently reusable. If one hook's logic changes, it doesn't affect the others.

---

## When to Create a Custom Hook

Extract a custom hook when:

1. **Two or more components use the same logic** (e.g., both need online status).
2. **A component becomes too complex** with too many `useState`/`useEffect` calls (group related state together).
3. **You want to test logic in isolation** — custom hooks can be unit-tested with `renderHook`.

```jsx
// Before: inline logic in component
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => { setUser(d); setLoading(false); });
  }, []);
  // ... component with 20+ lines of state logic
}

// After: extracted into custom hook
function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => { setUser(d); setLoading(false); });
  }, []);
  return { user, loading };
}

function UserProfile() {
  const { user, loading } = useCurrentUser();
  // ... component is clean and focused on rendering
}
```

---

## Custom Hooks Replace HOCs

Before hooks, sharing stateful logic required Higher-Order Components (HOCs) or Render Props, which added wrapper nesting. Custom Hooks provide the same logic-sharing without nesting.

```
❌ HOC: export default withAuth(withTheme(withRouter(MyComponent)))
✅ Hook: function MyComponent() { const { user } = useAuth(); const { theme } = useTheme(); ... }
```

---

## Best Practices

💡 Each component using a custom hook gets **its own isolated state**. The hook doesn't share state between components — each call creates new state.

🚀 **Best Practices**
- Keep hooks focused on a single concern (single-responsibility principle).
- Name hooks starting with `use` (required for ESLint rules to work).
- Return stable references from hooks using `useCallback`/`useMemo`.
- Use custom hooks to make components thinner and more testable.

---

## Summary

Components consume custom hooks to reuse stateful logic. Multiple hooks can be composed in a single component, each managing a separate concern. Custom hooks keep components thin, focused on rendering, and easy to test.

## Related Topics

- [Custom Hooks](../phase-4-hooks/custom-hooks)
- [Hook Fundamentals](../phase-4-hooks/hook-fundamentals)
- [Higher-Order Components (Legacy)](higher-order-components)

## Further Reading

- [React Docs: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
