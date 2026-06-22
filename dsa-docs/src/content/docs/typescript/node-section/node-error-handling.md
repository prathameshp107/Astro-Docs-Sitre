---
title: "Error Handling in Node.js/TypeScript"
description: "Complete guide to typed error handling in Node.js: custom error classes, error middleware, typed error responses, and error codes."
---

## Error Handling in Node.js/TypeScript

### Typed Error Classes

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super('Validation failed', 400, 'VALIDATION_ERROR', { fields: errors });
  }
}
```

### Typed Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: { code: err.code, message: err.message, details: err.details }
    };
    return res.status(err.statusCode).json(response);
  }
  res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Unexpected error' } });
}
```

### Interview Questions

**Easy:** How do you create a custom error class in TypeScript?

**Medium:** How does instanceof work with custom Error classes?

**Hard:** Design a typed error handling system for a REST API.
