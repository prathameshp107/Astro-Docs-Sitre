---
title: "Selection Sort"
description: "How Selection Sort works, JavaScript implementation, time and space complexity, and comparison with Bubble Sort."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/sorting
---

# Selection Sort

## 🎯 What Is Selection Sort?

Selection Sort works by **repeatedly finding the minimum element from the unsorted portion** and placing it at the beginning of the unsorted section.

> **Core idea**: Divide the array into a sorted portion (left) and an unsorted portion (right). In each pass, **select** the minimum from the unsorted portion and swap it to its correct position.

---

## 🔹 How It Works — Step by Step

![Selection Sort Visualization](/DSA-Notes-Problems/assets/images/sorting/selection-sort.svg)

### Visual Walkthrough

Sort: `[64, 25, 12, 22, 11]`

```
Initial state:
[64, 25, 12, 22, 11]
 ↑ sorted boundary

─────────────────────────────────────────
Pass 1: Find minimum in entire array
─────────────────────────────────────────
[64, 25, 12, 22, 11]
 ↑                ↑
 i=0          min=11 (at index 4)

Swap index 0 with index 4:
[11, 25, 12, 22, 64]
 ✅  ←── unsorted ───→

─────────────────────────────────────────
Pass 2: Find minimum in [25, 12, 22, 64]
─────────────────────────────────────────
[11, 25, 12, 22, 64]
     ↑   ↑
    i=1  min=12 (at index 2)

Swap index 1 with index 2:
[11, 12, 25, 22, 64]
 ✅  ✅  ←── unsorted ──→

─────────────────────────────────────────
Pass 3: Find minimum in [25, 22, 64]
─────────────────────────────────────────
[11, 12, 25, 22, 64]
         ↑   ↑
        i=2  min=22 (at index 3)

Swap index 2 with index 3:
[11, 12, 22, 25, 64]
 ✅  ✅  ✅  ←── unsorted →

─────────────────────────────────────────
Pass 4: Find minimum in [25, 64]
─────────────────────────────────────────
[11, 12, 22, 25, 64]
             ↑   ↑
            i=3  min=25 (already in place)

No swap needed (min is already at i):
[11, 12, 22, 25, 64]
 ✅  ✅  ✅  ✅  ✅

Final sorted: [11, 12, 22, 25, 64] ✅
```

### Key Observation

Selection Sort makes **at most n-1 swaps** — one per pass. This is significantly fewer than Bubble Sort which can make O(n²) swaps. This matters when swaps are expensive (e.g., writing to disk or flash memory).

---

## 🔹 JavaScript Implementation

```javascript
function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Assume the current position holds the minimum
        let minIndex = i;

        // Find the actual minimum in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;  // Update minimum index
            }
        }

        // Only swap if the minimum is not already in position
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// Test
console.log(selectionSort([64, 25, 12, 22, 11]));
// Output: [11, 12, 22, 25, 64]

console.log(selectionSort([5, 3, 1, 4, 2]));
// Output: [1, 2, 3, 4, 5]
```

---

## 🔹 Descending Order

```javascript
function selectionSortDescending(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let maxIndex = i;  // ← Find MAX instead of min

        for (let j = i + 1; j < n; j++) {
            if (arr[j] > arr[maxIndex]) {  // ← Compare with >
                maxIndex = j;
            }
        }

        if (maxIndex !== i) {
            [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
        }
    }

    return arr;
}

console.log(selectionSortDescending([64, 25, 12, 22, 11]));
// Output: [64, 25, 22, 12, 11]
```

---

## 🔹 Sorting Objects

```javascript
function selectionSortByKey(arr, key) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j][key] < arr[minIndex][key]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

const players = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 92 },
    { name: 'Carol', score: 78 },
    { name: 'Dave', score: 95 }
];

console.log(selectionSortByKey(players, 'score'));
// Sorted by score ascending:
// [{Carol,78}, {Alice,85}, {Bob,92}, {Dave,95}]
```

---

## 🔹 Counting Swaps (Selection Sort Advantage)

```javascript
function selectionSortCountSwaps(arr) {
    const n = arr.length;
    let swapCount = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            swapCount++;
        }
    }

    console.log(`Total swaps: ${swapCount}`);  // Always ≤ n-1
    return arr;
}

selectionSortCountSwaps([64, 25, 12, 22, 11]);
// Total swaps: 4 (at most n-1 = 4)

// Compare with Bubble Sort on same input:
// Bubble Sort would make: 10 swaps!
```

---

## 📊 Time & Space Complexity

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | O(n²) | Still scans the entire unsorted portion even if sorted |
| **Average Case** | O(n²) | Always makes n(n-1)/2 comparisons |
| **Worst Case** | O(n²) | No difference from best case |
| **Space** | O(1) | In-place — only uses index variables |

### Why Always O(n²)?

Unlike Bubble Sort, Selection Sort has **no early exit mechanism**. Even if the array is already sorted, it must scan the entire unsorted portion to confirm the minimum:

```
Pass 1: Scans n-1 elements to find minimum
Pass 2: Scans n-2 elements to find minimum
Pass 3: Scans n-3 elements to find minimum
...
Pass n-1: Scans 1 element

Total comparisons = (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)
Always. No exceptions.
```

---

## 🔹 Is Selection Sort Stable?

**No — Selection Sort is unstable.**

### Why?

When the minimum element is swapped to the front, it can jump over equal elements, disturbing their relative order.

```
Example:
Original: [(3,a), (3,b), (1,c)]
           Equal values: 3a and 3b (a should come before b)

Pass 1: Find minimum → (1,c) at index 2
        Swap index 0 with index 2:
        [(1,c), (3,b), (3,a)]
                       ↑
                 3a is now AFTER 3b ← original order destroyed ❌
```

> **Interview tip**: This is the key difference from Bubble Sort. Selection Sort's long-range swaps break stability, while Bubble Sort's adjacent swaps preserve it.

---

## 🔹 Selection Sort vs Bubble Sort

| Property | Selection Sort | Bubble Sort |
|----------|---------------|-------------|
| Time (Best) | O(n²) | O(n) with optimization |
| Time (Average) | O(n²) | O(n²) |
| Time (Worst) | O(n²) | O(n²) |
| Space | O(1) | O(1) |
| Stable | ❌ No | ✅ Yes |
| Number of Swaps | At most n-1 | Up to O(n²) |
| Number of Comparisons | Always n(n-1)/2 | Varies |
| Adaptive | ❌ No | ✅ Yes (with optimization) |

### When Selection Sort Beats Bubble Sort

Selection Sort is preferable when **write operations (swaps) are expensive** and comparisons are cheap:

- Writing to **flash memory** (limited write cycles)
- Writing to **disk storage** (I/O bound)
- Swapping **large records** in memory

```javascript
// Selection Sort: O(n) writes (one swap per pass)
// Bubble Sort:   O(n²) writes (many swaps per pass)

// For n = 1000:
// Selection Sort: ~1000 swaps
// Bubble Sort:    up to ~500,000 swaps
```

---

## 🔹 Properties Summary

| Property | Value |
|----------|-------|
| Time (Best) | O(n²) |
| Time (Average) | O(n²) |
| Time (Worst) | O(n²) |
| Space | O(1) |
| Stable | ❌ No |
| In-Place | ✅ Yes |
| Adaptive | ❌ No |
| Writes/Swaps | O(n) — at most n-1 |

---

## 🎯 When to Use Selection Sort

### Use Selection Sort When:
- **Write operations are costly** (flash memory, disk I/O)
- **Memory is extremely limited** (O(1) space, no optimization overhead)
- The dataset is **small** and simplicity is preferred over efficiency
- You need to **find and place k smallest elements** (run only k passes)

### Do NOT Use When:
- Input is large (O(n²) is too slow)
- Stability is required
- Input is nearly sorted (Insertion Sort would be far faster)

---

## 💡 Interview Tips

> **"Is Selection Sort ever better than Bubble Sort?"** — Yes. Selection Sort makes at most n-1 swaps vs O(n²) swaps for Bubble Sort. When swaps are expensive, Selection Sort wins.

> **"Why is Selection Sort not adaptive?"** — It always scans the entire unsorted portion regardless of input order. There's no equivalent of Bubble Sort's `swapped` flag.

> **"Is Selection Sort stable?"** — No. The long-range swap (swapping the found minimum with position i) can displace equal elements, breaking relative order.

> **"What is Selection Sort's best case?"** — Still O(n²) comparisons. It's always O(n²) — the only variation is the number of swaps (up to n-1).

---

**Next:** [Insertion Sort](/DSA-Notes-Problems/data-structures/sorting/04-insertion-sort) →
