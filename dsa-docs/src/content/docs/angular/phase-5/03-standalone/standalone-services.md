---
title: "Standalone Services"
description: "Services in standalone applications."
sidebar:
  order: 3
---

## Introduction
Services in standalone apps work the same way, using @Injectable with providedIn or providers arrays.

## Example

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  // Tree-shakeable singleton
}

// Component-level providers
@Component({
  providers: [FeatureService],
  standalone: true
})
export class FeatureComponent { }
```

## Summary
Standalone doesn't change how services work — just how they're provided."
