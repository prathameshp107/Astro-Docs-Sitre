---
title: "use() Hook (React 19)"
description: "The use() hook reads the value of a Promise or Context — it can be called conditionally and inside loops."
sidebar:
  order: 3
---

# use() Hook

## Simple Words First 🟡

> **Analogy:** 👉 All other hooks (`useState`, `useEffect`) have **strict rules** — they must be called at the top level, not inside loops or conditions. `use()` is different — it's like a **flexible straw** that you can bend and put anywhere. It reads a Promise (waiting for data) or Context (getting a value) without the usual hook rules.

## Reading a Promise — No More `useEffect` for Data Fetching

```jsx
import { use } from 'react';

function UserProfile({ userId }) {
  // ✅ Can be inside an if statement (NOT allowed with other hooks!)
  if (!userId) return <p>No user selected</p>;

  // use() suspends the component — React shows the nearest <Suspense> fallback
  const user = use(fetchUser(userId));

  return <h1>{user.name}</h1>;
}
```

## Reading Context — Alternative to `useContext`

```jsx
import { use, createContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  // ✅ Works just like useContext
  const theme = use(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

## How `use()` Differs from Other Hooks

| | `useState`, `useEffect` | `use()` |
|---|---|---|
| Call at top level | ✅ Required | Not required |
| Call in conditions | ❌ Not allowed | ✅ Allowed |
| Call in loops | ❌ Not allowed | ✅ Allowed |
| Purpose | State, side effects, refs | Read Promises & Context |
| Suspense support | No (manual) | Yes (auto-suspends) |

## Example — Conditional Fetching

```jsx
function Dashboard({ section }) {
  if (section === 'users') {
    // ✅ Conditional use() is fine!
    const users = use(fetchUsers());
    return <UserList users={users} />;
  }

  if (section === 'posts') {
    const posts = use(fetchPosts());
    return <PostList posts={posts} />;
  }

  return <p>Select a section</p>;
}
```

## In Simple Words 🧠

- `use()` reads a **Promise** (like `await` but inside JSX) or a **Context** (like `useContext`)
- It's the **only hook** that can be called **conditionally** and inside **loops**
- When reading a Promise, it **suspends** the component — wrap with `<Suspense>` for loading UI
- Great for data fetching without `useEffect` — components become simpler
- React 19 feature — pairs perfectly with Server Components and Suspense
