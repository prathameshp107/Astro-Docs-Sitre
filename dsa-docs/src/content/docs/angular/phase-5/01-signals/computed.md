---
title: "Computed Signals"
description: "Derived values that auto-update."
sidebar:
  order: 2
---

## Introduction
Computed signals derive values from other signals. They automatically recalculate when dependencies change.

## Example

```typescript
const firstName = signal('John');
const lastName = signal('Doe');

const fullName = computed(() => `${firstName()} ${lastName()}`);
console.log(fullName()); // 'John Doe'

firstName.set('Jane');
console.log(fullName()); // 'Jane Doe' (auto-updated!)
```

## Summary
Computed signals provide automatic derived state with lazy evaluation."
