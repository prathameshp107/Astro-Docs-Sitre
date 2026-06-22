---
title: "Async/Await Deep Dive in TypeScript"
description: "Advanced TypeScript async/await patterns: Promise types, async iterators, abort signals, concurrency, and typed error handling."
---

## Async/Await Deep Dive

### Typed Async Functions

```typescript
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

const user = await fetchJSON<User>("/api/users/1");
```

### Error Handling with Types

```typescript
type AsyncResult<T, E = Error> = Promise<[T | null, E | null]>;

async function tryCatch<T>(fn: () => Promise<T>): AsyncResult<T> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error as Error];
  }
}
```

### Concurrency Control

```typescript
async function parallel<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  return Promise.all(tasks.map(fn => fn()));
}

async function serial<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) results.push(await task());
  return results;
}
```

### Interview Questions

**Easy:** How do you type the return of an async function?

**Medium:** What's the type of `Promise.all([promise1, promise2])`?

**Hard:** How would you create a typed retry mechanism for async functions?
