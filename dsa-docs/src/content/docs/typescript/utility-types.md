---
title: "Utility Types in TypeScript"
description: "Complete reference for TypeScript utility types: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters, and more with examples."
---

## Utility Types in TypeScript

### What are Utility Types?

Utility types are **built-in generic types** that transform existing types into new types. They save you from writing repetitive type transformations.

### Partial<T>

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// All properties become optional
type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string }

function updateUser(id: string, updates: Partial<User>): void {
  // Only updates provided fields
}
```

### Required<T>

```typescript
interface Config {
  url?: string;
  timeout?: number;
}

// All properties become required
type StrictConfig = Required<Config>;
// { url: string; timeout: number }
```

### Readonly<T>

```typescript
type ImmutableUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string }
```

### Pick<T, K>

```typescript
type UserName = Pick<User, "name" | "email">;
// { name: string; email: string }
```

### Omit<T, K>

```typescript
type UserWithoutEmail = Omit<User, "email">;
// { name: string; age: number }
```

### Record<K, T>

```typescript
type PageInfo = {
  title: string;
  url: string;
};

type Pages = Record<string, PageInfo>;
// { [key: string]: { title: string; url: string } }
```

### ReturnType<T>

```typescript
function createUser() {
  return { id: 1, name: "Alice" };
}

type UserType = ReturnType<typeof createUser>;
// { id: number; name: string }
```

### Parameters<T>

```typescript
function greet(name: string, age: number): void {}

type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]
```

### Real Project Example

```typescript
// Form state management
interface FormState {
  name: string;
  email: string;
  age: number;
  terms: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormTouched = Record<keyof FormState, boolean>;

// API response transformation
type ApiUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
};

type PublicUser = Omit<ApiUser, "password_hash">;
type CreateUserPayload = Omit<ApiUser, "id" | "created_at">;
```

### Interview Questions

**Easy:** What does `Partial<T>` do?

**Medium:** What's the difference between `Pick` and `Omit`?

**Hard:** How would you use `ReturnType` with complex functions?
