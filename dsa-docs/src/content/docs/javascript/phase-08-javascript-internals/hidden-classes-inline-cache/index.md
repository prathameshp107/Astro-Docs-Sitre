---
title: Hidden Classes & Inline Cache
description: V8 optimization techniques — hidden classes (shapes) and inline caching
sidebar:
  order: 5
---

# Hidden Classes & Inline Cache

## Hidden Classes (Shapes)

### Introduction

V8 assigns **hidden classes** (also called "shapes" or "maps") to track object structure. Objects with the same properties share the same hidden class.

```javascript
function Point(x, y) {
  this.x = x;  // Hidden class: C0
  this.y = y;  // Hidden class: C1
}

const p1 = new Point(1, 2); // Hidden class: C1
const p2 = new Point(3, 4); // Shares C1 with p1
```

### Transition Chains

```mermaid
flowchart LR
    A["{}"]) -->|"add x"| B["{x}"]
    B -->|"add y"| C["{x, y}"]
    C -->|"add z"| D["{x, y, z}"]
```

### Performance Tips

```javascript
// ✅ Good — consistent property order
function good(x, y) { this.x = x; this.y = y; }

// ❌ Bad — different property orders break sharing
function bad(x, y) {
  if (x > y) {
    this.y = y; this.x = x; // y first
  } else {
    this.x = x; this.y = y; // x first
  }
}
```

## Inline Cache (IC)

### Introduction

Inline caching speeds up property access by caching the result of previous lookups.

```javascript
function getX(obj) {
  return obj.x;  // V8 caches the property offset
}

// First call — V8 records the hidden class and offset
getX({ x: 1 });

// Second call — if same hidden class, uses cached offset directly
getX({ x: 2 });  // Fast path 🚀

// Different hidden class — megamorphic (slower)
getX({ x: 3, y: 4 });  // Different shape
```

### IC States

1. **Uninitialized**: No data yet
2. **Monomorphic**: One shape seen (fast)
3. **Polymorphic**: 2-4 shapes seen  
4. **Megamorphic**: 5+ shapes seen (slow)

## Summary

- Hidden classes track object shapes
- Consistent property ordering = better performance
- Inline cache caches property access results
- Monomorphic access is fastest; megamorphic is slowest

## Further Reading

- [V8: Hidden Classes](https://v8.dev/docs/hidden-classes)
- [V8: Inline Caching](https://v8.dev/docs/inline-caching)
