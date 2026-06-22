---
title: "Error Handling Patterns in TypeScript"
description: "Complete guide to typed error handling in TypeScript: custom error classes, discriminated error unions, Result types, and enterprise patterns."
---

## Error Handling Patterns

### Custom Error Classes

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", 404);
  }
}
```

### Result Type Pattern

```typescript
type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseJSON<T>(json: string): Result<T> {
  try {
    return { ok: true, value: JSON.parse(json) as T };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

const result = parseJSON<User>('{"name":"Alice"}');
if (result.ok) {
  console.log(result.value.name);
} else {
  console.error(result.error.message);
}
```

### Interview Questions

**Easy:** How do you create a custom error class in TypeScript?

**Medium:** What is the Result type pattern?

**Hard:** How would you implement a typed Either monad for error handling?
