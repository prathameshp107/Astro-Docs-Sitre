---
title: Immutability
description: Avoiding mutation with spread, copy, and freeze patterns
sidebar:
  order: 2
---

# Immutability

## Introduction

**Immutability** means data never changes after creation. Instead of modifying existing data, you create **new copies** with the desired changes.

## Why Immutability Matters

Mutable state is a common source of bugs:

```javascript
// Mutable approach — dangerous!
const user = { name: 'Alice', age: 25 };
function celebrateBirthday(u) {
  u.age += 1; // mutates the original!
}
celebrateBirthday(user);
console.log(user.age); // 26 — side effect!

// Immutable approach — safe
function celebrateBirthday(u) {
  return { ...u, age: u.age + 1 };
}
const updated = celebrateBirthday(user);
console.log(user.age);  // 25 — unchanged
console.log(updated.age); // 26
```

## Spread Operator for Objects

```javascript
const base = { name: 'Alice', role: 'admin' };

// Add a property
const withEmail = { ...base, email: 'alice@example.com' };

// Update a property
const promoted = { ...base, role: 'super-admin' };

// Nested update (spread each level)
const state = {
  user: { name: 'Bob', settings: { theme: 'dark' } }
};

const newState = {
  ...state,
  user: {
    ...state.user,
    settings: {
      ...state.user.settings,
      theme: 'light'
    }
  }
};
```

## Spread Operator for Arrays

```javascript
const numbers = [1, 2, 3];

// Add to end
const added = [...numbers, 4];    // [1, 2, 3, 4]

// Add to beginning
const prepended = [0, ...numbers]; // [0, 1, 2, 3]

// Remove an item
const removed = numbers.filter(n => n !== 2); // [1, 3]

// Update an item
const updated = numbers.map(n => n === 2 ? 20 : n); // [1, 20, 3]

// Sort without mutation
const sorted = [...numbers].sort((a, b) => b - a);
```

## Array Methods That Return New Arrays

| Method | Returns new? | Mutates original? |
|--------|-------------|-------------------|
| `.map()` | ✅ | ❌ |
| `.filter()` | ✅ | ❌ |
| `.concat()` | ✅ | ❌ |
| `.slice()` | ✅ | ❌ |
| `.sort()` | ❌ (returns sorted array but mutates!) | ✅ |
| `.reverse()` | ❌ | ✅ |
| `.push()` | ❌ | ✅ |
| `.splice()` | ❌ | ✅ |

## Object.freeze

Prevents mutation at runtime:

```javascript
const config = Object.freeze({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
});

config.timeout = 3000; // Fails silently in strict mode / throws in strict mode
console.log(config.timeout); // 5000

// Note: Object.freeze is shallow — nested objects can still be mutated
const state = Object.freeze({
  user: { name: 'Alice' }
});
state.user.name = 'Bob'; // This works! (shallow freeze)
console.log(state.user.name); // 'Bob'
```

## Immutable Libraries

For deeply nested data, consider libraries:

- **Immer**: Uses a proxy-based `produce` API
- **Immutable.js**: Provides persistent data structures

```javascript
// Immer example
import { produce } from 'immer';

const state = { user: { name: 'Alice', settings: { theme: 'dark' } } };

const nextState = produce(state, draft => {
  draft.user.settings.theme = 'light';
});
// Deeply nested immutable update without spreads!
```

## Summary

- Never mutate data — create new copies
- Use spread (`...`) for shallow updates
- Use `.map()`, `.filter()`, `.concat()` for arrays
- Watch out: `.sort()` and `.reverse()` mutate!
- `Object.freeze()` for shallow protection
- Immer for complex nested updates

## Further Reading

- [Immer](https://immerjs.github.io/immer/)
- [Immutable.js](https://immutable-js.com/)
