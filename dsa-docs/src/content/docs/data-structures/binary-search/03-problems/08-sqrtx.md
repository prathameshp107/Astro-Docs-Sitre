---
title: "Problem 8 — Find Sqrt(x)"
description: "LeetCode 69 — Find the integer square root of x using binary search without using Math.sqrt()."
sidebar:
  order: 8
practice:
  visualizer: /visualizer/searching
---

# Problem 8 — Find Sqrt(x) (Integer Square Root)

**LeetCode 69** | Difficulty: 🟢 Easy

---

## 🎯 Problem Statement

Given a non-negative integer `x`, return the **integer square root** of `x` (truncated toward zero, i.e., floor).

**You must not use any built-in exponent functions** like `Math.sqrt()`.

```
Input:  x = 4
Output: 2

Input:  x = 8
Output: 2   (√8 ≈ 2.828, floor = 2)

Input:  x = 0
Output: 0

Input:  x = 2147395600
Output: 46340
```

---

## 🧠 Pattern: Answer Space Search (Pattern 3)

**Answer space:** `1` to `x/2` (since `sqrt(x) ≤ x/2` for all `x ≥ 4`).

**Condition:** Find the largest integer `m` such that `m * m <= x`.

```text
x = 8:
m:   1    2    3    4
m²:  1    4    9    16
      ✓    ✓    ✗    ✗
           ↑ Largest m where m² ≤ 8
```

---

## 💻 Solution

```javascript
function mySqrt(x) {
  if (x < 2) return x; // sqrt(0) = 0, sqrt(1) = 1

  let lo = 1;
  let hi = Math.floor(x / 2); // sqrt(x) <= x/2 for x >= 4
  let result = 0;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (mid * mid === x) return mid; // Perfect square

    if (mid * mid < x) {
      result = mid;  // mid works — try larger
      lo = mid + 1;
    } else {
      hi = mid - 1;  // mid too big
    }
  }

  return result;
}

console.log(mySqrt(4));   // 2
console.log(mySqrt(8));   // 2
console.log(mySqrt(16));  // 4
console.log(mySqrt(0));   // 0
console.log(mySqrt(1));   // 1
```

---

## 🧪 Walkthrough

```
x = 8

lo=1, hi=4 (x/2 = 4)

Step 1: mid=2 → 2*2=4 < 8 → result=2, lo=3
Step 2: mid=3 → 3*3=9 > 8 → hi=2
Step 3: lo=3 > hi=2 → loop exits

Return: result=2 ✓
```

```
x = 16 (perfect square)

lo=1, hi=8

Step 1: mid=4 → 4*4=16 === 16 → return 4 ✓ (early exit!)
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log x)** — binary search on [1, x/2] |
| Space | **O(1)** |

---

## 🎯 Variations

### Variation: Newton's Method (O(log log x))

```javascript
function mySqrtNewton(x) {
  if (x < 2) return x;

  let r = x;
  while (r * r > x) {
    r = Math.floor((r + x / r) / 2);
  }
  return r;
}
```

Newton's method converges much faster but requires floating-point division.

### Variation: Floating-Point Square Root

```javascript
function sqrtPrecision(x, precision = 1e-6) {
  if (x < 2) return x;

  let lo = 1, hi = x;

  while (hi - lo > precision) {
    const mid = lo + (hi - lo) / 2;
    if (mid * mid <= x) lo = mid;
    else hi = mid;
  }

  return lo;
}

console.log(sqrtPrecision(8)); // ~2.8284
```

---

## 🔑 Key Takeaways

- **Easy but tricky** — many people overthink this one
- **Answer space:** `1` to `x/2`
- **Edge cases:** `x < 2` returns `x` directly
- **`mid * mid` overflow** — in languages with 32-bit ints, use `mid <= x / mid`

---

## 🔗 Related

- [Problem 9 — First Bad Version →](/DSA-Notes-Problems/data-structures/binary-search/03-problems/09-first-bad-version)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
