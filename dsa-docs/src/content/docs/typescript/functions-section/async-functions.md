---
title: "Async Functions in TypeScript"
description: "Complete guide to async/await in TypeScript: Promise types, async function annotations, error handling, async generators, and patterns."
---

## Async Functions in TypeScript

### Basic Async Function

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Arrow async function
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  return response.json();
};
```

### Promise Types

```typescript
// Promise type parameters
type PromiseResult<T> = T extends Promise<infer U> ? U : T;

type Result = PromiseResult<Promise<string>>; // string
type Direct = PromiseResult<number>;          // number

// Promise all with typed results
const [user, posts] = await Promise.all([
  fetchUser("1"),
  fetchPosts("1"),
] as const);
// user: User, posts: Post[]
```

### Error Handling

```typescript
// Try-catch with unknown error
async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
```

### Interview Questions

**Easy:** How do you type an async function's return value?

**Medium:** What type does `Promise.all` return?

**Hard:** How would you type a function that returns a Promise with a discriminated union?
