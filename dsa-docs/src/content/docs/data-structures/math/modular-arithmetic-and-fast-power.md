---
title: "Modular Arithmetic & Fast Power"
description: "Modulo rules (addition, multiplication, modular inverse), fast exponentiation (binary exponentiation), and applications."
sidebar:
  order: 3
---

# 🔢 Modular Arithmetic & Fast Power

## 🎯 What Is Modular Arithmetic?

**Modulo** (`%`) gives the remainder after division. Modular arithmetic means doing arithmetic **modulo m**, keeping numbers in range [0, m-1] to avoid overflow.

```javascript
17 % 5;  // 2  (17 = 5×3 + 2)
```

---

## 🔹 The Three Core Rules

**Addition:**
```
(a + b) % m = ((a % m) + (b % m)) % m
(17 + 23) % 5 = (2 + 3) % 5 = 0 ✅
40 % 5 = 0 ✅
```

**Multiplication:**
```
(a × b) % m = ((a % m) × (b % m)) % m
(17 × 23) % 5 = (2 × 3) % 5 = 1 ✅
391 % 5 = 1 ✅
```

**Subtraction (watch for negative):**
```
(a - b) % m = ((a % m) - (b % m) + m) % m
```

---

## 🔹 Modular Exponentiation (Fast Power)

Compute `(aⁿ) % m` efficiently — this is critical for cryptography and large computations.

**Naive:** Multiply a by itself n times — O(n). Too slow for large n.

**Fast approach (binary exponentiation):** Square the result at each step — O(log n).

```javascript
// Recursive
function modPow(a, n, m) {
  if (n === 0) return 1 % m;

  const half = modPow(a, Math.floor(n / 2), m);
  const halfSq = (half * half) % m;

  if (n % 2 === 0) {
    return halfSq;
  } else {
    return (halfSq * (a % m)) % m;
  }
}

// Iterative
function modPowIterative(a, n, m) {
  let result = 1;
  a = a % m;

  while (n > 0) {
    if (n & 1) {  // If current bit is 1
      result = (result * a) % m;
    }
    a = (a * a) % m;  // Square the base
    n = Math.floor(n / 2);  // Move to next bit
  }

  return result;
}

modPow(2, 10, 1000);   // 24  (2¹⁰ = 1024 → 1024 % 1000 = 24)
modPow(3, 5, 100);     // 43
modPow(2, 1000000, 7); // 2  (fast! O(log n))

// Without mod, 2¹⁰⁰⁰⁰⁰⁰ is too huge to compute
// With mod, it's easy
```

**Time:** O(log n) | **Space:** O(1)

---

## 🔹 Modular Inverse

The modular inverse of `a` modulo `m` is the number `a⁻¹` such that `a × a⁻¹ ≡ 1 (mod m)`. It exists only if `gcd(a, m) = 1` (a and m are coprime).

Use the Extended Euclidean algorithm to find it:

```javascript
function modInverse(a, m) {
  const { gcd, x } = extendedGcd(a, m);
  if (gcd !== 1) return null;  // Inverse doesn't exist
  return ((x % m) + m) % m;    // Make positive
}

function extendedGcd(a, b) {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const { gcd, x: x1, y: y1 } = extendedGcd(b, a % b);
  return { gcd, x: y1, y: x1 - Math.floor(a / b) * y1 };
}

modInverse(3, 7);  // 5  (3 × 5 = 15 ≡ 1 mod 7)
modInverse(2, 6);  // null (gcd(2,6) = 2 ≠ 1)
```

---

## 🔹 Application: Large Factorial Modulo

```javascript
function factorialMod(n, m) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = (result * i) % m;
  }
  return result;
}

factorialMod(10, 1000000007);  // 3628800
factorialMod(100, 1000000007); // Still works — keeps numbers small
```

---

## 🔹 Common Tricks

```javascript
// Check if number is even
n % 2 === 0     // Standard
(n & 1) === 0   // Bitwise — faster

// Check if n is power of 2
n > 0 && (n & (n - 1)) === 0

// Fast exponentiation (without mod)
function fastPow(a, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / fastPow(a, -n);
  
  const half = fastPow(a, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * a;
}

fastPow(2, 10);  // 1024
```

---

## ✅ In Simple Words

- **Modulo arithmetic** keeps numbers small by taking remainder at each step.
- **Fast exponentiation** computes `aⁿ` in O(log n) by squaring repeatedly.
- **Modular inverse** (`a⁻¹ mod m`) exists only if `gcd(a, m) = 1` — found via Extended Euclid.
- Always use `(result * x) % MOD` in loops to prevent overflow.
- Common modulus in interviews: `1_000_000_007` (a large prime).
