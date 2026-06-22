---
title: "Modules in TypeScript"
description: "Guide to TypeScript modules: ES module syntax, import/export patterns, type-only imports, re-exports, and module resolution strategies."
---

## Modules in TypeScript

### Module Basics

```typescript
// Exporting
export interface User { id: number; name: string; }
export const API_URL = "https://api.example.com";
export function formatDate(d: Date): string { return d.toISOString(); }

// Default export
export default class UserService { /* ... */ }

// Importing
import UserService, { User, API_URL, formatDate } from "./user-service";
import type { User } from "./types";      // Type-only import (erased at runtime)
import { type User, type Config } from "./types";
```

### Re-exports

```typescript
// Barrel file — re-export from multiple modules
export { User, UserService } from "./user-service";
export { ApiClient } from "./api-client";
export { Logger } from "./logger";

// Re-export with rename
export { User as AppUser } from "./user-service";

// Re-export everything
export * from "./types";
export * from "./utils";
```

### Module Resolution

TypeScript supports different module resolution strategies controlled by `moduleResolution` in tsconfig.json:

- **classic** — Legacy resolution
- **node** — Node.js CommonJS resolution  
- **node16** — Node.js ESM resolution
- **nodenext** — Latest Node.js resolution
- **bundler** — For bundlers like Vite/Webpack

### Interview Questions

**Easy:** How do you export and import in TypeScript modules?

**Medium:** What is the difference between `import type` and regular imports?

**Hard:** Explain barrel files and when to use them.
