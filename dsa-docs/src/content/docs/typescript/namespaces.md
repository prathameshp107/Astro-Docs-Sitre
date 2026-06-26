---
title: "Namespaces in TypeScript"
description: "Guide to TypeScript namespaces: internal modules, namespace syntax, nested namespaces, and when to use namespaces vs ES modules."
---

## Namespaces in TypeScript

### What are Namespaces?

Namespaces (previously called "internal modules") organize related code into a single scope, preventing naming collisions. They're primarily used for **internal module organization** in non-ES-module codebases.

### Basic Namespace

```typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }
}

// Usage
const emailValidator = new Validation.EmailValidator();
```

### Nested Namespaces

```typescript
namespace App {
  export namespace Models {
    export interface User { id: number; name: string }
  }
  export namespace Utils {
    export function formatDate(date: Date): string { return date.toISOString(); }
  }
}
```

### When to Use Namespaces vs ES Modules

| Feature | Namespaces | ES Modules |
|---------|-----------|------------|
| Scope | Single file/global | File-based |
| Tree-shaking | Limited | Excellent |
| Modern codebases | Legacy | Preferred |
| Bundler support | Limited | Full |

### Interview Questions

**Easy:** What is a namespace in TypeScript?

**Medium:** How do you export members from a namespace?

**Hard:** When should you use namespaces instead of ES modules?
