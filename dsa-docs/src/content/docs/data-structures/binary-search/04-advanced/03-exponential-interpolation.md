---
title: "Exponential & Interpolation Search"
description: "Variations of binary search — exponential search for unbounded data and interpolation search for uniformly distributed data."
sidebar:
  order: 3
---

# Exponential & Interpolation Search

Two powerful search algorithms that are variations on the binary search theme, optimized for different data characteristics.

---

## 📊 When to Use Each

| Algorithm | Best Case | Worst Case | Use When |
|-----------|-----------|------------|----------|
| **Binary Search** | O(log n) | O(log n) | General purpose |
| **Exponential Search** | O(log i) where i is target index | O(log n) | Unbounded/infinite arrays or very small target |
| **Interpolation Search** | O(log log n) | O(n) | Uniformly distributed sorted data |

---

## 🚀 Exponential Search

Exponential search works in two phases:
1. **Find the range** where the target might be (exponentially growing bounds)
2. **Binary search** within that range

### When to Use

- **Unbounded (infinite) arrays** — you don't know the length
- **Target is near the beginning** — very fast O(log i)
- **Tiny sorted arrays** — competitive with binary search

### How It Works

```text
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91, ...]
Target: 23

Phase 1 — Exponential range finding:
  i=1 → arr[1]=5 < 23
  i=2 → arr[2]=8 < 23
  i=4 → arr[4]=16 < 23
  i=8 → arr[8]=72 > 23 → range = [4, 8]

Phase 2 — Binary search on arr[4..8]:
  Found at index 5 ✓
```

### 💻 Implementation

```javascript
function exponentialSearch(arr, target) {
  const n = arr.length;

  // If target is at the first position
  if (arr[0] === target) return 0;

  // Find range by doubling the index
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }

  // Binary search in [i/2, min(i, n-1)]
  return binarySearch(arr, target, i / 2, Math.min(i, n - 1));
}

function binarySearch(arr, target, lo, hi) {
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(exponentialSearch(arr, 23)); // 5
console.log(exponentialSearch(arr, 1));  // -1
```

---

## 🎯 Interpolation Search

Interpolation search is like **binary search with a smarter guess**. Instead of always picking the middle, it uses the **value** to estimate the position — like looking up a word in a dictionary.

### When to Use

- **Uniformly distributed data** — e.g., sequential IDs, evenly spaced values
- **Large datasets** — O(log log n) is significantly faster than O(log n)

### The Key Formula

```javascript
// Estimate position based on value distribution
const pos = lo + Math.floor(
  ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo])
);
```

### 💻 Implementation

```javascript
function interpolationSearch(arr, target) {
  let lo = 0, hi = arr.length - 1;

  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    // If only one element remains
    if (lo === hi) {
      return arr[lo] === target ? lo : -1;
    }

    // Probe position using formula
    const pos = lo + Math.floor(
      ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo])
    );

    if (arr[pos] === target) return pos;
    if (arr[pos] < target) lo = pos + 1;
    else hi = pos - 1;
  }

  return -1;
}

// Uniform data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const uniform = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
console.log(interpolationSearch(uniform, 70)); // 6 (finds in 1 probe!)

// Non-uniform data: [1, 2, 4, 8, 16, 32, 64, 128]
const nonUniform = [1, 2, 4, 8, 16, 32, 64, 128];
console.log(interpolationSearch(nonUniform, 32)); // 5 (may take longer)
```

### ⚠️ Limitations

- **Worst case O(n)** — if data is not uniformly distributed
- **Requires arithmetic operations** — slower per iteration than binary search
- **Not suitable for string keys** — unless you can map them to numeric values

---

## 📋 Comparison Table

| Feature | Binary Search | Exponential Search | Interpolation Search |
|---------|---------------|--------------------|----------------------|
| Data requirement | Sorted | Sorted | Sorted + Uniform |
| Unbounded arrays | ❌ | ✅ | ❌ |
| Best case | O(log n) | O(log i) | O(log log n) |
| Average | O(log n) | O(log n) | O(log log n) |
| Worst case | O(log n) | O(log n) | O(n) |
| Space | O(1) | O(1) | O(1) |

---

## 🔑 Key Takeaways

- **Exponential search** shines for unbounded data or when the target is near the start
- **Interpolation search** can be O(log log n) for uniform data — extremely fast
- **Binary search** is still the best general-purpose choice (consistent O(log n))
- Interviewers rarely ask for these directly, but mentioning them shows depth

---

## 🔗 Related

- [Back to Advanced Index](/DSA-Notes-Problems/data-structures/binary-search/04-advanced)
- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
