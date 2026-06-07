---
title: "Floating-Point Binary Search"
description: "Binary search on continuous value ranges — find square roots, cube roots, and solve equations with precision tolerance."
sidebar:
  order: 1
---

# Floating-Point Binary Search

## 🎯 Overview

Floating-point (real-number) binary search extends the algorithm to **continuous value ranges**. Instead of searching for exact matches, we search until the range is small enough (within a precision tolerance).

### Key Difference

| Aspect | Integer BS | Floating-Point BS |
|--------|------------|-------------------|
| Termination | `lo <= hi` | `hi - lo > epsilon` |
| Midpoint | `lo + (hi - lo) / 2` | `lo + (hi - lo) / 2` (same) |
| Update | `lo = mid + 1` / `hi = mid - 1` | `lo = mid` / `hi = mid` |
| Precision | Exact | Within `epsilon` (e.g., 1e-6) |

---

## 💻 Template — Floating-Point Search

```javascript
function binarySearchFloat(lo, hi, condition, precision = 1e-6) {
  // condition(mid) returns true if mid is feasible
  // Finds the boundary where condition transitions

  while (hi - lo > precision) {
    const mid = lo + (hi - lo) / 2;

    if (condition(mid)) {
      hi = mid;      // Answer is at mid or lower
    } else {
      lo = mid;      // Answer is above mid
    }
  }

  return lo; // or (lo + hi) / 2
}
```

**Note:** We update `lo = mid` and `hi = mid` (not `mid + 1` / `mid - 1`) because floating-point values are continuous — we can't skip past a potential real number.

---

## 🧪 Example — Cube Root

```javascript
function cubeRoot(x) {
  const isPositive = x >= 0;
  x = Math.abs(x);

  let lo = 0, hi = Math.max(1, x);

  while (hi - lo > 1e-10) {
    const mid = lo + (hi - lo) / 2;
    if (mid * mid * mid < x) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return isPositive ? lo : -lo;
}

console.log(cubeRoot(27));        // ~2.9999999999 (≈ 3)
console.log(cubeRoot(8));         // ~2.0
console.log(cubeRoot(-27));       // ~-3.0
```

---

## 🧪 Example — Square Root With Precision

```javascript
function sqrtPrecision(x, precision = 1e-6) {
  if (x < 0) return NaN;
  if (x < 2) return x;

  let lo = 1, hi = x;

  while (hi - lo > precision) {
    const mid = lo + (hi - lo) / 2;
    if (mid * mid <= x) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return lo; // Accurate to 'precision' decimal places
}

console.log(sqrtPrecision(2));  // 1.414213... (√2)
console.log(sqrtPrecision(8));  // 2.828427... (√8)
```

---

## 🧪 Example — Find Root of Equation

Find `x` where `f(x) = 0` for a monotonic function:

```javascript
// f(x) = x³ - x - 2  (monotonically increasing for x > 0)
function f(x) {
  return x * x * x - x - 2;
}

function findRoot() {
  let lo = 0, hi = 3; // f(0) = -2, f(3) = 22

  while (hi - lo > 1e-10) {
    const mid = lo + (hi - lo) / 2;
    const val = f(mid);

    if (val < 0) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return lo; // ≈ 1.5213797068...
}

console.log(findRoot()); // ≈ 1.52138
```

---

## 📊 Precision vs Iterations

| Precision | Iterations Needed |
|-----------|-------------------|
| 1e-3 | ~10 |
| 1e-6 | ~20 |
| 1e-9 | ~30 |
| 1e-12 | ~40 |

Each iteration adds ~1 decimal digit of precision. For most problems, **1e-6** is sufficient.

---

## 🎯 When to Use Floating-Point BS

| Problem Type | Example |
|--------------|---------|
| **Root finding** | sqrt, cbrt, nth root |
| **Equation solving** | Find x where f(x) = c |
| **Optimization** | Minimize max distance (gas stations) |
| **Geometry** | Find intersection point |
| **Physics** | Find time/distance where condition holds |

---

## 🔑 Key Takeaways

- **while (hi - lo > epsilon)** — the loop condition changes from `lo <= hi`
- **No +/- 1** — update with `lo = mid` / `hi = mid`
- **Choose epsilon wisely** — 1e-6 is usually enough
- **Warning:** Floating-point precision can cause infinite loops if epsilon is too small
- **Return any value in [lo, hi]** — they're both within epsilon of the answer

---

## 🔗 Related

- [Back to Advanced Index](/DSA-Notes-Problems/data-structures/binary-search/04-advanced)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
