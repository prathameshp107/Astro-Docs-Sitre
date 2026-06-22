---
title: "Middleware Types in TypeScript"
description: "Complete guide to typing Express middleware: auth middleware, error middleware, validation middleware, and middleware composition."
---

## Middleware Types in TypeScript

### Typed Middleware Function

```typescript
import { Request, Response, NextFunction } from 'express';

// Standard middleware
type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

// Auth middleware with typed request
const authMiddleware: Middleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = await verifyToken(token);
  next();
};
```

### Error Handling Middleware

```typescript
// Error middleware has 4 parameters
interface ErrorMiddleware {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}

const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};
```

### Interview Questions

**Easy:** What are the types for Express middleware?

**Medium:** How does error middleware typing differ from regular middleware?

**Hard:** How would you create a typed validation middleware factory?
