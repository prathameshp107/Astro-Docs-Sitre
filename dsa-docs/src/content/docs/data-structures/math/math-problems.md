---
title: "Math Problems"
description: "Power of two, count digits, factorial, combinatorics basics, and number theory interview problems."
sidebar:
  order: 4
---

# 🧩 Math Problems

---

## Problem 1: Power of Two

**Problem:** Check if a number is a power of two.

```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

isPowerOfTwo(1);   // true (2⁰)
isPowerOfTwo(16);  // true (2⁴)
isPowerOfTwo(18);  // false
```

**Why it works:** Powers of two have exactly one bit set. `n & (n-1)` clears the lowest set bit — if the result is 0, there was only one bit.

```
16 = 10000
15 = 01111
16 & 15 = 00000 = 0 → power of two

18 = 10010
17 = 10001
18 & 17 = 10000 ≠ 0 → not a power of two
```

**Time:** O(1) | **Space:** O(1)

---

## Problem 2: Count Digits

**Problem:** Count the number of digits in a number.

```javascript
// Mathematical approach
function countDigits(n) {
  if (n === 0) return 1;
  return Math.floor(Math.log10(Math.abs(n))) + 1;
}

// Iterative approach
function countDigitsIterative(n) {
  if (n === 0) return 1;
  let count = 0;
  n = Math.abs(n);
  while (n > 0) {
    count++;
    n = Math.floor(n / 10);
  }
  return count;
}

countDigits(12345);   // 5
countDigits(100000);  // 6
```

**Time:** O(log n) iterative, O(1) mathematical | **Space:** O(1)

---

## Problem 3: Factorial Trailing Zeroes

**Problem:** Count the number of trailing zeroes in `n!`.

**Insight:** A trailing zero comes from a factor of 10 = 2 × 5. There are always more 2s than 5s, so count the 5s.

```javascript
function trailingZeroes(n) {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}

trailingZeroes(5);   // 1  (5! = 120)
trailingZeroes(10);  // 2  (10! = 3628800)
trailingZeroes(25);  // 6  (25! — five 5s from 5,10,15,20,25 + one extra from 25)
```

**Time:** O(log₅ n) | **Space:** O(1)

---

## Problem 4: nCr (Combinations)

**Problem:** Calculate C(n, k) = n! / (k! × (n-k)!) without overflow.

```javascript
function nCr(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Use the smaller k for efficiency
  k = Math.min(k, n - k);

  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - k + i) / i;
  }

  return result;
}

nCr(5, 2);  // 10
nCr(10, 3); // 120
nCr(4, 2);  // 6
```

**Why multiply then divide?** This keeps intermediate values smaller and avoids overflow.

---

## Problem 5: Happy Number

**Problem:** A number is happy if repeatedly summing the squares of its digits eventually reaches 1.

```javascript
function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
}

function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

isHappy(19);  // true  (1²+9²=82 → 64+4=68 → 36+64=100 → 1+0+0=1)
isHappy(2);   // false (cycles)
```

**Time:** O(log n) per iteration, O(cycles) total | **Space:** O(cycles)

---

## ✅ In Simple Words

- **Power of two** = `n > 0 && (n & (n - 1)) === 0` — clever bit trick.
- **Count digits** = `Math.floor(Math.log10(n)) + 1`.
- **Trailing zeroes** in factorial = count how many 5s divide n.
- **Combinations (nCr)** = multiply ratios incrementally to avoid overflow.
- **Happy number** = cycle detection with a set (or Floyd's cycle detection for O(1) space).
