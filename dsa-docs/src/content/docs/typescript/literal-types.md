---
title: "Literal Types in TypeScript"
description: "Complete guide to TypeScript literal types: string literals, number literals, boolean literals, const assertions, and template literal types with real-world examples."
---

## Literal Types in TypeScript

### What are Literal Types?

A **literal type** is a type that represents a single, specific value rather than a general category. Instead of `string`, you can have the type `"hello"`. Instead of `number`, you can have the type `42`.

> **Analogy:** If `string` is like saying "any word in the dictionary," a string literal `"hello"` is like saying "exactly the word 'hello'."

---

### String Literal Types

```typescript
// A variable that can only hold the exact value "hello"
let greeting: "hello" = "hello";
// greeting = "hi";        // ❌ Error: Type '"hi"' is not assignable to type '"hello"'

// Union of string literals — the most common pattern
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}
move("north");   // OK
// move("left"); // ❌ Error
```

---

### Number Literal Types

```typescript
// Specific number values
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Port = 3000 | 3001 | 3002 | 8080;
type HTTPStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

function handleResponse(code: HTTPStatusCode): string {
  switch (code) {
    case 200: return "OK";
    case 201: return "Created";
    case 404: return "Not Found";
    case 500: return "Server Error";
    default: return "Unknown";
  }
}
```

---

### Boolean Literal Types

```typescript
// Boolean literals — less common but useful
type IsActive = true;
type IsLoaded = false;

// Union with boolean literal
type Result = true | false;  // Same as boolean

// Useful for discriminated unions
type LoadingState = { status: "loading"; progress: number };
type SuccessState = { status: "success"; data: unknown };
type ErrorState = { status: "error"; error: string; retry: true };
```

---

### `const` Assertions

The `as const` assertion tells TypeScript to infer the **narrowest** possible type:

```typescript
// Without const assertion
const button1 = { label: "Submit", enabled: true };
// Type: { label: string; enabled: boolean }

// With const assertion
const button2 = { label: "Submit", enabled: true } as const;
// Type: { readonly label: "Submit"; readonly enabled: true }

// Array with const assertion
const roles = ["admin", "user", "guest"] as const;
// Type: readonly ["admin", "user", "guest"]
// Roles is now a tuple of literal types

// Practical use — config objects
export const CONFIG = {
  API_URL: "https://api.example.com",
  PORT: 3000,
  TIMEOUT: 5000,
} as const;

// CONFIG.API_URL is type "https://api.example.com" (not string)
```

---

### Template Literal Types

TypeScript 4.1+ supports template literal types for string pattern matching:

```typescript
// Basic template literal
type EventName = `on${Capitalize<string>}`;
// "onChange" | "onClick" | "onSubmit" | etc.

// CSS property pattern
type CSSProperty = `margin-${"top" | "bottom" | "left" | "right"}`;
// "margin-top" | "margin-bottom" | "margin-left" | "margin-right"

// URL pattern
type APIEndpoint = `/api/${"users" | "posts" | "comments"}/${number}`;
// "/api/users/1" | "/api/posts/42" | etc.

// HTTP header pattern
type HttpHeader = `${string}-${string}`;
// "content-type" | "authorization" | etc.
```

---

### Real Project Example

```typescript
// Form field configuration
type FieldType = "text" | "email" | "password" | "number" | "date";
type ValidationRule = "required" | "minLength" | "maxLength" | "pattern" | "email";

interface FormField {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  validations: ValidationRule[];
  defaultValue?: string | number;
}

// API route configuration
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RouteVersion = "v1" | "v2";
type RoutePath = `/${RouteVersion}/${string}`;

interface RouteConfig {
  method: HTTPMethod;
  path: RoutePath;
  handler: string;
  middleware?: string[];
}

// State machine with literal types
type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled";

const ORDER_FLOW: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};
```

---

### Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Not using `as const` for objects | Properties widen to general types | Add `as const` to preserve literal types |
| Using `string` instead of literal union | Allows invalid values | Use `"exact" \| "values" \| "here"` |
| Forgetting template literal limitations | Can't do runtime string manipulation | Use template literal types for compile-time only |

---

### Interview Questions

**Easy:** What is a literal type in TypeScript? Give an example.

**Medium:** What does `as const` do? Why would you use it?

**Hard:** Explain template literal types. How would you type an API endpoint pattern like `/api/users/123`?
