---
title: "Bubble Sort"
description: "How Bubble Sort works, optimized version with early exit flag, JavaScript implementation, time and space complexity, and when to use it."
sidebar:
  order: 2
---

# Bubble Sort

## 🎯 What Is Bubble Sort?

Bubble Sort is the simplest sorting algorithm. It works by **repeatedly comparing adjacent elements and swapping them if they are in the wrong order**. Larger elements "bubble up" to the end of the array with each pass.

> **Name origin**: Larger elements "bubble up" to the top (end) of the array, just like air bubbles rise to the surface of water.

---

## 🔹 How It Works — Step by Step

![Bubble Sort Visualization](/DSA-Notes-Problems/assets/images/sorting/bubble-sort.svg)

### Visual Example

Sort: `[64, 34, 25, 12, 22]`

```
Pass 1: Compare and swap adjacent pairs
─────────────────────────────────────────
[64, 34, 25, 12, 22]
 ↑   ↑
 64 > 34 → SWAP
[34, 64, 25, 12, 22]
     ↑   ↑
     64 > 25 → SWAP
[34, 25, 64, 12, 22]
         ↑   ↑
         64 > 12 → SWAP
[34, 25, 12, 64, 22]
             ↑   ↑
             64 > 22 → SWAP
[34, 25, 12, 22, 64]  ← 64 is now in final position ✅

Pass 2:
[34, 25, 12, 22, 64]
 ↑   ↑
 34 > 25 → SWAP
[25, 34, 12, 22, 64]
     ↑   ↑
     34 > 12 → SWAP
[25, 12, 34, 22, 64]
         ↑   ↑
         34 > 22 → SWAP
[25, 12, 22, 34, 64]  ← 34 is now in final position ✅

Pass 3:
[25, 12, 22, 34, 64]
 ↑   ↑
 25 > 12 → SWAP
[12, 25, 22, 34, 64]
     ↑   ↑
     25 > 22 → SWAP
[12, 22, 25, 34, 64]  ← 25 is now in final position ✅

Pass 4:
[12, 22, 25, 34, 64]
 ↑   ↑
 12 < 22 → no swap
[12, 22, 25, 34, 64]  ← 22 is now in final position ✅

Final sorted: [12, 22, 25, 34, 64] ✅
```

### Key Observation

After each pass `i`, the **last `i` elements are in their correct final positions** and never need to be touched again.

```
After Pass 1: [__, __, __, __, 64]  ← last 1 sorted
After Pass 2: [__, __, __, 34, 64]  ← last 2 sorted
After Pass 3: [__, __, 25, 34, 64]  ← last 3 sorted
After Pass 4: [__, 22, 25, 34, 64]  ← last 4 sorted
After Pass 5: [12, 22, 25, 34, 64]  ← all sorted ✅
```

---

## 🔹 Basic JavaScript Implementation

```javascript
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // After pass i, the last i elements are sorted
        // So inner loop only goes up to n - 1 - i
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// Test
console.log(bubbleSort([64, 34, 25, 12, 22]));
// Output: [12, 22, 25, 34, 64]
```

---

## 🔹 Optimized Bubble Sort — Early Exit

The basic version always runs n-1 passes even if the array becomes sorted early. The **optimized version** uses a `swapped` flag to detect when no swaps occurred in a pass — meaning the array is already sorted.

```javascript
function bubbleSortOptimized(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;  // ← Flag to detect early completion

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;  // ← A swap happened this pass
            }
        }

        // If no swaps occurred, array is already sorted → exit early
        if (!swapped) {
            console.log(`Sorted early after ${i + 1} pass(es)!`);
            break;
        }
    }

    return arr;
}

// Best case demo: already sorted
console.log(bubbleSortOptimized([1, 2, 3, 4, 5]));
// Output: "Sorted early after 1 pass(es)!"
//         [1, 2, 3, 4, 5]

// Nearly sorted demo
console.log(bubbleSortOptimized([1, 2, 4, 3, 5]));
// Only needs 2 passes instead of 4
```

### Why This Matters

| Input | Basic Version | Optimized Version |
|-------|--------------|-------------------|
| Already sorted `[1,2,3,4,5]` | O(n²) — still runs all passes | O(n) — exits after 1 pass |
| Nearly sorted `[1,2,4,3,5]` | O(n²) | Much faster in practice |
| Reverse sorted `[5,4,3,2,1]` | O(n²) | O(n²) — no improvement |
| Random | O(n²) | O(n²) on average |

---

## 🔹 Bubble Sort with Descending Order

```javascript
function bubbleSortDescending(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {  // ← Change > to < for descending
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
}

console.log(bubbleSortDescending([3, 1, 4, 1, 5, 9, 2, 6]));
// Output: [9, 6, 5, 4, 3, 2, 1, 1]
```

---

## 🔹 Sorting Objects with Bubble Sort

```javascript
function bubbleSortByProperty(arr, key) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j][key] > arr[j + 1][key]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
}

const students = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 72 },
    { name: 'Carol', score: 91 },
    { name: 'Dave', score: 68 }
];

console.log(bubbleSortByProperty(students, 'score'));
// Output: sorted by score ascending
// [{ name: 'Dave', score: 68 }, { name: 'Bob', score: 72 }, ...]
```

---

## 📊 Time & Space Complexity

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | O(n) | Already sorted — optimized version exits after 1 pass |
| **Average Case** | O(n²) | Random input — roughly n²/2 comparisons |
| **Worst Case** | O(n²) | Reverse sorted — maximum swaps needed |
| **Space** | O(1) | In-place — only uses a few extra variables |

### Why O(n²)?

The outer loop runs `n-1` times.
The inner loop runs approximately `n/2` times on average.

```
Total comparisons ≈ (n-1) + (n-2) + ... + 1
                  = n(n-1)/2
                  = O(n²)
```

### Stability

Bubble Sort is **stable**. When two adjacent elements are equal (`arr[j] === arr[j+1]`), the condition `arr[j] > arr[j+1]` is false, so no swap occurs. Equal elements maintain their relative order.

---

## 🔹 Properties Summary

| Property | Value |
|----------|-------|
| Time (Best) | O(n) |
| Time (Average) | O(n²) |
| Time (Worst) | O(n²) |
| Space | O(1) |
| Stable | ✅ Yes |
| In-Place | ✅ Yes |
| Adaptive | ✅ Yes (with optimization) |
| Online | ❌ No |

---

## 🎯 When to Use Bubble Sort

### Use Bubble Sort When:
- The input is **very small** (n < 10–20 elements)
- The input is **nearly sorted** (optimized version shines)
- You need a **simple, easy-to-remember** algorithm
- **Educational purposes** — it's the easiest sort to explain

### Do NOT Use Bubble Sort When:
- The input is **large** (n > 1000) — O(n²) becomes very slow
- Performance is critical
- Random or reverse-sorted data is expected

### Real-World Usage
Bubble Sort is rarely used in production code. However, it appears in:
- **Embedded systems** with tiny datasets
- **Teaching algorithms** in CS courses
- As a baseline to compare against better algorithms

---

## 💡 Interview Tips

> **"Explain Bubble Sort"** — Describe adjacent comparisons, bubbling up the largest element each pass. Always mention the early-exit optimization.

> **"What is Bubble Sort's best case?"** — O(n) with the `swapped` flag optimization on an already-sorted array.

> **"Is Bubble Sort stable?"** — Yes. Equal adjacent elements are never swapped, preserving relative order.

> **"Why is Bubble Sort O(n²)?"** — Two nested loops. Outer loop runs n-1 times, inner loop runs up to n-i-1 times → n²/2 total comparisons → O(n²).

---

**Next:** [Selection Sort](/DSA-Notes-Problems/data-structures/sorting/03-selection-sort) →
