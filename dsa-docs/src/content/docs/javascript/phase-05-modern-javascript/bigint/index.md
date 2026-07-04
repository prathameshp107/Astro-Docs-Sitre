---
title: BigInt
description: JavaScript BigInt — arbitrary-precision integers
sidebar:
  order: 8
---

# BigInt

## Introduction

**BigInt** is a numeric primitive that can represent integers larger than `2^53 - 1` (the maximum safe integer for `Number`).

## Why Do We Need This?

Financial calculations, large IDs, and cryptographic operations often need numbers beyond `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991).

## Creating BigInt

```javascript
// Using n suffix
const big1 = 1234567890123456789012345678901234567890n;

// Using BigInt() function
const big2 = BigInt('1234567890123456789012345678901234567890');
const big3 = BigInt(42); // 42n

console.log(typeof big1); // 'bigint'
```

## Operations

```javascript
const a = 10n;
const b = 3n;

a + b;  // 13n
a - b;  // 7n
a * b;  // 30n
a ** b; // 1000n

// Division truncates towards zero
a / b;  // 3n (not 3.333...)

// Cannot mix with regular numbers
10n + 5;     // TypeError!
10n + BigInt(5); // 15n ✅
Number(10n) + 5; // 15 ✅
```

## Comparison

```javascript
10n === 10; // false (different types)
10n == 10;  // true (loose equality works)
10n > 5;    // true
10n < 20;   // true
```

## Summary

- `n` suffix creates BigInt literals
- Represents arbitrarily large integers
- Cannot mix with regular `Number` in operations
- Use `BigInt()` for conversion
- Perfect for large IDs, financial calculations

## Further Reading

- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
