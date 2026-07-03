---
title: "@switch"
description: "Switch statements with @switch."
sidebar:
  order: 2
---

## Introduction
@switch replaces [ngSwitch] with a cleaner, more readable syntax.

## Example

```typescript
@switch (status) {
  @case ('loading') { <app-spinner /> }
  @case ('success') { <app-success /> }
  @case ('error') { <app-error /> }
  @default { <p>Unknown status</p> }
}
```

## Summary
@switch provides a more readable alternative to ngSwitch."
