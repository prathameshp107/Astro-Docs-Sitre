---
title: "Express Types in TypeScript"
description: "Complete guide to typing Express.js with TypeScript: request/response types, typed params, typed body, and middleware augmentation."
---

## Express Types in TypeScript

### Typed Request and Response

```typescript
import { Request, Response, NextFunction } from 'express';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

interface UserParams {
  id: string;
}

type CreateUserRequest = Request<{}, {}, CreateUserDto>;
type GetUserRequest = Request<UserParams>;

app.post('/users', (req: CreateUserRequest, res: Response) => {
  const { name, email } = req.body;
  // name and email are typed
});
```

### Augmenting Express Request

```typescript
// types/express.d.ts
import 'express';

declare module 'express' {
  interface Request {
    user?: { id: string; role: string };
    requestId: string;
    startTime: number;
  }
}

// Now Request.user is available everywhere
app.get('/me', (req, res) => {
  console.log(req.user?.id); // typed!
});
```

### Interview Questions

**Easy:** How do you type Express request parameters?

**Medium:** How do you augment the Express Request type?

**Hard:** How would you create a generic request handler type with custom DTO?
