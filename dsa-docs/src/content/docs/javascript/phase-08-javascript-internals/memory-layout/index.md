---
title: Memory Layout
description: How JavaScript engines organize objects and values in memory
sidebar:
  order: 10
---

# Memory Layout

## Introduction

Understanding how JavaScript engines store data in memory helps you write more performant code.

## Stack vs Heap Layout

| Memory Area | Stores | Speed | Size |
|-------------|--------|-------|------|
| Stack | Primitives, references, function frames | Fast | Small (~1MB) |
| Heap | Objects, arrays, closures | Slower | Large |

## Object Layout in V8

```javascript
// Object in memory (simplified)
const obj = { x: 5, y: 10 };

// Memory (conceptual):
// [Map pointer] → Hidden class (shape)
// [x: 5]
// [y: 10]
// [Property array] → Dynamic properties (if needed)
```

## Pointer Compression

V8 uses **pointer compression** (32-bit pointers instead of 64-bit) to save memory:

```
Without compression: Each pointer = 8 bytes
With compression:    Each pointer = 4 bytes  ← 50% savings!
```

## Elements Kinds

V8 tracks array element types for optimization:

```javascript
[1, 2, 3];         // PACKED_SMI_ELEMENTS (fastest)
[1, 2, true];      // PACKED_DOUBLE_ELEMENTS  
[1, 2, 'hello'];   // PACKED_ELEMENTS
[1, , 3];           // HOLEY_ELEMENTS (holes = slower)
```

## Summary

- Stack: fast, small, for primitives and references
- Heap: slower, large, for objects
- Pointer compression saves ~40% memory
- Elements kinds affect array performance
- Avoid holes in arrays for best performance

## Further Reading

- [V8: Elements Kinds](https://v8.dev/blog/elements-kinds)
- [V8: Pointer Compression](https://v8.dev/blog/pointer-compression)
