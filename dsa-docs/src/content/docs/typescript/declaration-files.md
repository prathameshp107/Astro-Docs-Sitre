---
title: "TypeScript Declaration Files (.d.ts)"
description: "Guide to TypeScript declaration files: creating .d.ts files, ambient declarations, module augmentation, and publishing type definitions."
---

## Declaration Files (.d.ts)

### What are Declaration Files?

Declaration files (`.d.ts`) describe the **shape** of existing JavaScript code to TypeScript. They contain only type information — no implementation.

### Global Declarations

```typescript
// globals.d.ts
declare const API_VERSION: string;
declare function fetchData(url: string): Promise<unknown>;

interface Window {
  __APP_CONFIG__: { apiUrl: string; debug: boolean };
}
```

### Module Declarations

```typescript
// my-library.d.ts
declare module "my-library" {
  export function doSomething(input: string): number;
  export interface Options {
    timeout: number;
    retries: number;
  }
}
```

### Augmenting Existing Modules

```typescript
// Add types to existing modules
import "express";

declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}
```

### Generate Declaration Files

```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types",
    "emitDeclarationOnly": true
  }
}
```

### Interview Questions

**Easy:** What is a .d.ts file?

**Medium:** How do you create module declarations for a JavaScript library?

**Hard:** How do you augment an existing module's types?
