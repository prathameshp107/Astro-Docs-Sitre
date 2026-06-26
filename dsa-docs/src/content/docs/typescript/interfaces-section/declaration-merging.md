---
title: "Declaration Merging in TypeScript"
description: "Deep dive into TypeScript declaration merging: interface merging, module augmentation, global augmentation, and practical patterns."
---

## Declaration Merging in TypeScript

### Interface Merging

```typescript
// First declaration
interface User {
  name: string;
}

// Second declaration — merged
interface User {
  age: number;
}

// Result:
const user: User = { name: "Alice", age: 30 }; // Both required
```

### Module Augmentation

```typescript
// express.d.ts
import 'express';

declare module 'express' {
  interface Request {
    user?: { id: string; role: string };
    requestId: string;
  }
}

// Now Request has user and requestId globally
app.use((req, res, next) => {
  console.log(req.requestId); // OK
  next();
});
```

### Global Augmentation

```typescript
// globals.d.ts
declare global {
  interface Window {
    __APP_CONFIG__: { apiUrl: string; env: string };
  }
  namespace NodeJS {
    interface ProcessEnv {
      MY_SECRET: string;
    }
  }
}
```

### When to Use Declaration Merging

| Use Case | Example |
|----------|---------|
| Adding properties to 3rd party types | Express Request.user |
| Environment variables typing | process.env types |
| Global window properties | window.__APP_CONFIG__ |
| Splitting large interfaces | Across multiple files |

### Interview Questions

**Easy:** What is declaration merging?

**Medium:** How do you use module augmentation to extend Express Request?

**Hard:** What are the risks of declaration merging?
