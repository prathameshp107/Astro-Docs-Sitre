---
title: "Mapped Types in TypeScript"
description: "Complete guide to TypeScript mapped types: transforming object properties, key remapping, template literal keys, and practical enterprise patterns."
---

## Mapped Types in TypeScript

### What are Mapped Types?

Mapped types create new types by **iterating over the keys** of an existing type and transforming each property. Think of them as `Array.map()` but for types.

### Basic Mapped Type

```typescript
// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties optional
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Built-in Mapped Types

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// All readonly
type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string }

// All partial
type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string }
```

### Transforming Property Types

```typescript
// Convert all properties to strings
type ToString<T> = {
  [K in keyof T]: string;
};

// Make all properties return Promises
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

// Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

### Key Remapping via `as`

```typescript
// Add prefix to all keys
type AddPrefix<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

type User = { name: string; age: number };
type PrefixedUser = AddPrefix<User, "user">;
// { userName: string; userAge: number }
```

### Filtering Keys

```typescript
// Only string values
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Remove functions
type OnlyData<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]>;
};
```

### Real Project Example

```typescript
// Form validation states
interface FormFields {
  username: string;
  password: string;
  email: string;
}

// Transform form fields into validation state
type FormValidation<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string | null;
    touched: boolean;
    dirty: boolean;
  };
};

type SignupFormState = FormValidation<FormFields>;
```

### Interview Questions

**Easy:** What is a mapped type?

**Medium:** How does `keyof` work in mapped types?

**Hard:** How would you create a `DeepReadonly` mapped type?
