---
title: "Writable Signals"
description: "Creating and updating writable signals."
sidebar:
  order: 1
---

## Introduction
Writable signals hold mutable state. They provide getter and setter APIs for reading and updating values.

## Example

```typescript
const count = signal(0);

console.log(count()); // Read: 0
count.set(5);         // Set new value
count.update(c => c + 1); // Update based on current

// With objects
const user = signal({ name: 'Alice', age: 30 });
user.set({ name: 'Bob', age: 31 }); // New reference
```

## Summary
Writable signals are the foundation of Angular's reactive state model."
