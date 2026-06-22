---
title: "Type Guards in TypeScript"
description: "Complete guide to TypeScript type guards: typeof, instanceof, user-defined guards, discriminated unions, and narrowing techniques with real-world patterns."
---

## Type Guards in TypeScript

### What are Type Guards?

Type guards are expressions that perform runtime checks to **narrow** a type within a scope. They tell TypeScript's compiler: "in this block, this value is definitely this specific type."

### Built-in Type Guards

```typescript
// typeof — for primitives
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();  // value is string
  }
  return value.toFixed(2);       // value is number
}

// instanceof — for classes
class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();  // pet is Dog
  } else {
    pet.meow();  // pet is Cat
  }
}

// in — for property checking
interface Bird { fly(): void }
interface Fish { swim(): void }

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();  // animal is Bird
  } else {
    animal.swim(); // animal is Fish
  }
}
```

### User-Defined Type Guards

```typescript
// Custom type guard using "is"
interface User { name: string; email: string; role: "user" }
interface Admin { name: string; email: string; role: "admin"; permissions: string[] }

function isAdmin(user: User | Admin): user is Admin {
  return user.role === "admin";
}

function getUserDashboard(user: User | Admin) {
  if (isAdmin(user)) {
    return user.permissions;  // user is Admin
  }
  return ["read"];            // user is User
}
```

### Real Project Example

```typescript
// API response type guard
type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function isSuccess<T>(result: ApiResult<T>): result is { success: true; data: T } {
  return result.success;
}

// Usage
const result = await fetchUser();
if (isSuccess(result)) {
  console.log(result.data.name);  // Safe access
} else {
  console.error(result.error);    // Error access
}
```

### Interview Questions

**Easy:** What is a type guard? Give an example with typeof.

**Medium:** How do you create a user-defined type guard?

**Hard:** When would you use the `in` operator as a type guard vs a custom type guard function?
