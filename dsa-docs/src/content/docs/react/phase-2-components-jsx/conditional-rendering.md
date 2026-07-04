---
title: "Conditional Rendering"
description: "Rendering different UI based on conditions using if/else, ternary, logical &&, and switch patterns in React."
---

# Conditional Rendering

## Introduction

Conditional rendering in React works the same way as conditions work in JavaScript — you use `if`, `else`, ternary operators, or logical `&&` to decide what JSX to return. Since JSX is just JavaScript, you can use any JavaScript conditional inside your component.

---

## Why do we need this?

Most components need to display different content depending on state: show a loading spinner while fetching data, display an error message when something fails, or show different layouts for authenticated vs anonymous users. Conditional rendering lets your component adapt to its state.

---

## Methods

### 1. If/Else Statement

Use a standard `if`/`else` block before the `return` statement. This works well for early returns and branching logic.

```jsx
function Greeting({ user }) {
  if (!user) {
    return <p>Please log in.</p>;
  }
  return <p>Welcome back, {user.name}!</p>;
}
```

**Explanation:** If `user` is null or undefined, the component exits early with a login prompt. Otherwise it renders the greeting. This keeps the rest of the component clean.

### 2. Ternary Operator (`? :`)

The ternary is the most common inline conditional in React. It's concise and lets you choose between two elements inline.

```jsx
function StatusBadge({ isActive }) {
  return (
    <span style={{ color: isActive ? '#059669' : '#dc2626' }}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
```

**Explanation:** The ternary checks `isActive`. If true, renders green "Active"; if false, renders red "Inactive". Both the style and content change based on the condition.

### 3. Logical `&&` (Short-Circuit Evaluation)

Use `&&` when you want to render something OR nothing (no else branch). If the left side is truthy, the right side renders. If falsy, nothing renders.

```jsx
function NotificationBadge({ count }) {
  return (
    <div>
      Messages
      {count > 0 && (
        <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '999px', marginLeft: '8px' }}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}
```

**Explanation:** The badge only renders when `count > 0`. If count is 0, the `&&` short-circuits and renders nothing. The inner ternary caps display at "99+".

### 4. Switch / Multi-Condition

For multiple possible states, use a `switch` statement or an object lookup for cleaner code.

```jsx
function OrderStatus({ status }) {
  const styles = {
    pending: { color: '#d97706', text: 'Processing' },
    shipped: { color: '#059669', text: 'On its way' },
    delivered: { color: '#2563eb', text: 'Delivered' },
    cancelled: { color: '#dc2626', text: 'Cancelled' }
  };

  const current = styles[status] || { color: '#6b7280', text: 'Unknown' };

  return <span style={{ color: current.color, fontWeight: 'bold' }}>{current.text}</span>;
}
```

**Explanation:** An object lookup (`styles[status]`) maps each status to its display properties. This is cleaner than a long `if/else` chain or `switch` statement. The `||` provides a fallback for unknown statuses.

---

## Common Mistakes

⚠ **Falsy Values Other Than false**

`0` and empty strings `""` are falsy in JavaScript. Using `&&` with a number can render `0` on the screen.

```jsx
// ❌ BAD — renders "0" when count is 0
{count && <p>You have {count} messages</p>}

// ✅ GOOD — explicit boolean check
{count > 0 && <p>You have {count} messages</p>}
```

⚠ **Ternary with Null for "Render Nothing"**

```jsx
// ✅ Both are valid, but ternary is clearer when there's an else
{flag ? <Component /> : null}
{flag && <Component />}
```

---

## Performance Notes

⚡ Conditional rendering using any of these methods has negligible performance impact. Choose the one that makes your code most readable. Avoid unnecessarily complex nested ternaries — extract a variable or use early returns.

---

## Summary

- Use `if/else` for early returns and complex branching.
- Use `ternary` for inline choose-between-two patterns.
- Use `&&` for render-or-nothing patterns.
- Use `object lookup` for multi-state display logic.
- Watch out for falsy `0` and `""` with `&&`.

## Related Topics

- [Controlled Components](controlled-components)
- [Forms & Event Handling](forms)
- [Lists and Keys](lists-and-keys)

## Further Reading

- [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering)
