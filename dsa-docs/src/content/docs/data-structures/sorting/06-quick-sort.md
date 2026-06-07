---
title: "Quick Sort"
description: "How Quick Sort works (pivot and partition), Lomuto vs Hoare partition schemes, pivot selection strategies, JavaScript implementation, and complexity analysis."
sidebar:
  order: 6
---

# Quick Sort

## 🎯 What Is Quick Sort?

Quick Sort is a **divide-and-conquer** algorithm that picks a **pivot** element, **partitions** the array so that smaller elements go left and larger elements go right, then recursively sorts both sides.

> **Core idea**: Choose a pivot. Place everything smaller than the pivot on the left and everything larger on the right. The pivot is now in its final position. Repeat for the left and right partitions.

---

## 🔹 How It Works — Step by Step

![Quick Sort Visualization](/DSA-Notes-Problems/assets/images/sorting/quick-sort.svg)

### Visual Walkthrough

Sort: `[10, 80, 30, 90, 40, 50, 70]` with pivot = last element (70)

```text
Initial: [10, 80, 30, 90, 40, 50, 70]
                                      ↑
                                   pivot=70

─────────────────────────────────────────
Partition: Place pivot 70 in its correct position
─────────────────────────────────────────
[10, 80, 30, 90, 40, 50, 70]
  ↑
  i=0 (partition boundary starts at 0)

Compare 10 ≤ 70 → swap with itself → i=1
Compare 80 > 70 → skip (don't move)
Compare 30 ≤ 70 → swap with 80 → i=2  → [10, 30, 80, 90, 40, 50, 70]
Compare 90 > 70 → skip
Compare 40 ≤ 70 → swap with 80 → i=3  → [10, 30, 40, 90, 80, 50, 70]
Compare 50 ≤ 70 → swap with 90 → i=4  → [10, 30, 40, 50, 80, 90, 70]

Final swap pivot (70) with position i=4:
[10, 30, 40, 50, 70, 90, 80]
                ↑
           pivot is now in its FINAL position ✅

─────────────────────────────────────────
Recursively sort left partition [10, 30, 40, 50]
─────────────────────────────────────────
Pivot = 50
[10, 30, 40, 50]
              ↑
Partition: only 50 is in position, left all smaller
[10, 30, 40, 50]  →  sort [10, 30, 40] next

─────────────────────────────────────────
Recursively sort right partition [90, 80]
─────────────────────────────────────────
Pivot = 80
[90, 80]
     ↑
Compare 90 > 80 → skip (90 belongs on right of pivot)
All remaining elements processed
Swap pivot into position: [80, 90]

─────────────────────────────────────────
Finally sorted: [10, 30, 40, 50, 70, 80, 90] ✅
```

### The Partition Process (Lomuto) — Animated

```text
Start: [10, 80, 30, 90, 40, 50, 70]
        ↑                           ↑
      i (first larger)            pivot

Step 1: 10 ≤ 70 → swap arr[i] with arr[i], i=1
        [10, 80, 30, 90, 40, 50, 70]
            ↑
           i

Step 2: 80 > 70 → skip, i stays at 80

Step 3: 30 ≤ 70 → swap 80↔30, i=2
        [10, 30, 80, 90, 40, 50, 70]
                 ↑
                i

Step 4: 90 > 70 → skip

Step 5: 40 ≤ 70 → swap 80↔40, i=3
        [10, 30, 40, 90, 80, 50, 70]
                      ↑
                     i

Step 6: 50 ≤ 70 → swap 90↔50, i=4
        [10, 30, 40, 50, 80, 90, 70]
                           ↑
                          i

Final: swap pivot (70) with arr[4]
        [10, 30, 40, 50, 70, 90, 80]
                        ↑
                  pivot in final position ✅
```

---

## 🔹 JavaScript Implementation — Lomuto Partition

The Lomuto partition scheme is simpler to understand but slightly less efficient.

```javascript
function partitionLomuto(arr, low, high) {
    const pivot = arr[high];  // Choose last element as pivot
    let i = low;              // Index where pivot will go

    for (let j = low; j < high; j++) {
        // If current element is ≤ pivot, swap it to the left side
        if (arr[j] <= pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    // Place pivot in its final position
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;  // Return pivot index
}

function quickSortLomuto(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = partitionLomuto(arr, low, high);

        // Recursively sort elements before and after pivot
        quickSortLomuto(arr, low, pivotIndex - 1);
        quickSortLomuto(arr, pivotIndex + 1, high);
    }

    return arr;
}

// Test
console.log(quickSortLomuto([10, 80, 30, 90, 40, 50, 70]));
// Output: [10, 30, 40, 50, 70, 80, 90]

console.log(quickSortLomuto([64, 34, 25, 12, 22, 11, 90]));
// Output: [11, 12, 22, 25, 34, 64, 90]
```

---

## 🔹 Hoare Partition (More Efficient)

The Hoare partition scheme uses **two pointers** moving from both ends toward the middle. It makes **~3× fewer swaps** on average than Lomuto.

```javascript
function partitionHoare(arr, low, high) {
    const pivot = arr[Math.floor((low + high) / 2)];  // Middle element as pivot
    let i = low - 1;
    let j = high + 1;

    while (true) {
        // Find element on left that should be on right
        do { i++; } while (arr[i] < pivot);

        // Find element on right that should be on left
        do { j--; } while (arr[j] > pivot);

        // Pointers crossed → partition done
        if (i >= j) return j;

        // Swap the out-of-place elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function quickSortHoare(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partitionHoare(arr, low, high);

        // Note: Hoare returns the split point, not the pivot's final position
        // Both sides include the pivot element
        quickSortHoare(arr, low, pivotIndex);
        quickSortHoare(arr, pivotIndex + 1, high);
    }

    return arr;
}

// Test
console.log(quickSortHoare([10, 80, 30, 90, 40, 50, 70]));
// Output: [10, 30, 40, 50, 70, 80, 90]
```

### Lomuto vs Hoare Comparison

| Aspect | Lomuto Partition | Hoare Partition |
|--------|-----------------|-----------------|
| Simplicity | ✅ Simpler to understand | ❌ More complex |
| Swaps | ~n swaps per partition | ~n/3 swaps per partition |
| Performance | ~3× slower than Hoare | Faster in practice |
| Pivot choice | Usually last element | Usually middle element |
| Return value | Pivot's final position | Split point (not pivot) |
| Use case | Educational, easy-to-read | Production code |

---

## 🔹 Pivot Selection Strategies

### 1. Last Element (Lomuto default)

```javascript
const pivot = arr[high];
// Simple but worst-case on already sorted arrays
```

**Problem**: If the array is already sorted, the pivot is the largest element, creating very unbalanced partitions.

### 2. First Element

```javascript
const pivot = arr[low];
// Same problem as last element
```

### 3. Random Pivot (Best for average performance)

```javascript
function partitionRandom(arr, low, high) {
    // Swap a random element with the last element
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];

    // Now use standard Lomuto with last element as pivot
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}
```

**Benefit**: Makes O(n²) worst-case extremely unlikely (probability → 0 for large n).

### 4. Median-of-Three

```javascript
function medianOfThree(arr, low, high) {
    const mid = Math.floor((low + high) / 2);

    // Sort low, mid, high (bubble sort style)
    if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
    if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
    if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];

    // Place median (mid) at high-1 and use as pivot
    [arr[mid], arr[high - 1]] = [arr[high - 1], arr[mid]];
    return arr[high - 1];
}
```

**Benefit**: Guarantees against worst-case on sorted arrays. The median of three is always a reasonable pivot.

---

## 🔹 Optimized Quick Sort

Combines several optimizations: random pivot, switch to Insertion Sort for small subarrays, and tail-call optimization.

```javascript
function quickSortOptimized(arr, low = 0, high = arr.length - 1) {
    // Switch to Insertion Sort for small subarrays
    if (high - low < 10) {
        insertionSortRange(arr, low, high);
        return arr;
    }

    while (low < high) {
        const pivotIndex = partitionRandom(arr, low, high);

        // Tail recursion optimization: always recurse on smaller partition
        if (pivotIndex - low < high - pivotIndex) {
            quickSortOptimized(arr, low, pivotIndex - 1);
            low = pivotIndex + 1;  // Process larger partition iteratively
        } else {
            quickSortOptimized(arr, pivotIndex + 1, high);
            high = pivotIndex - 1;  // Process larger partition iteratively
        }
    }

    return arr;
}

function insertionSortRange(arr, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Test
const testArr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
console.log(quickSortOptimized(testArr));
// Correctly sorted ✅

// Performance comparison
const n = 10000;
const arr1 = Array.from({ length: n }, () => Math.random());
const arr2 = [...arr1];

console.time('Basic Quick Sort');
quickSortLomuto(arr1);
console.timeEnd('Basic Quick Sort');

console.time('Optimized Quick Sort');
quickSortOptimized(arr2);
console.timeEnd('Optimized Quick Sort');

// On random data, optimized version is 2-3× faster
```

---

## 🔹 Descending Order

```javascript
function partitionDescending(arr, low, high) {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (arr[j] >= pivot) {  // ← Change to >= for descending
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}

function quickSortDescending(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partitionDescending(arr, low, high);
        quickSortDescending(arr, low, pivotIndex - 1);
        quickSortDescending(arr, pivotIndex + 1, high);
    }
    return arr;
}

console.log(quickSortDescending([10, 80, 30, 90, 40, 50, 70]));
// Output: [90, 80, 70, 50, 40, 30, 10]
```

---

## 📊 Time & Space Complexity

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | O(n log n) | Pivot always splits array into equal halves |
| **Average Case** | O(n log n) | Random pivot gives balanced partitions |
| **Worst Case** | O(n²) | Pivot is min or max every time (sorted array with bad pivot) |
| **Space (Lomuto)** | O(n) worst, O(log n) avg | Call stack for recursion |

### Why O(n²) Worst Case?

When the pivot is always the smallest or largest element (e.g., sorted array with first/last element pivot):

```text
Sorted array: [1, 2, 3, 4, 5, 6, 7, 8]

Pivot = last element = 8
Left partition: [1, 2, 3, 4, 5, 6, 7]  (size n-1)
Right partition: []                     (size 0)

Next pivot = 7
Left: [1, 2, 3, 4, 5, 6]  (size n-2)

Total work: n + (n-1) + (n-2) + ... + 1 = O(n²)
```

This is why **random pivot** or **median-of-three** are essential in practice.

### Why O(n log n) Average?

On average, random pivots create reasonably balanced partitions:

```text
Level 0: n elements
Level 1: ~n/2 + ~n/2    → total n
Level 2: ~n/4 × 4       → total n
...
Level log n: ~1 × n     → total n

Work per level = O(n)
Number of levels = O(log n) on average
Total = O(n log n)
```

---

## 🔹 Is Quick Sort Stable?

**No — Quick Sort is unstable.** The partition step can swap equal elements across long distances, breaking their relative order.

```javascript
// Example: Sort by score ascending
// Original: [(Alice,70), (Bob,50), (Carol,70)]

// After partition with pivot = last (Carol,70):
// (Bob,50) goes left, (Carol,70) goes to pivot position
// (Alice,70) ends up on the right side of (Carol,70)!
// Result: [(Bob,50), (Carol,70), (Alice,70)] — Carol before Alice ❌
```

---

## 🔹 Properties Summary

| Property | Value |
|----------|-------|
| Time (Best) | O(n log n) — balanced partitions |
| Time (Average) | O(n log n) |
| Time (Worst) | O(n²) — unbalanced partitions |
| Space (Average) | O(log n) — recursion stack |
| Space (Worst) | O(n) — if recursion depth = n |
| Stable | ❌ No |
| In-Place | ✅ Yes (if recursion stack is discounted) |
| Adaptive | ❌ No |
| Approach | Divide & Conquer |

---

## 🎯 When to Use Quick Sort

### Use Quick Sort When:

- **Average-case performance** matters most (very fast in practice)
- **Memory is constrained** — O(log n) space on average
- The input is random and unpredictable
- You need the fastest comparison sort for **in-memory arrays**
- **Cache performance** is important (sequential access to partition)

### Do NOT Use When:

- **Guaranteed worst-case** performance is required (use Merge Sort or Heap Sort)
- **Stability** is required
- The input is known to be **sorted or nearly sorted** (without random pivot)
- Working with **linked lists** (sequential access doesn't suit partitioning)

### Real-World Usage

Quick Sort is the most widely used sorting algorithm in practice:

- **C's `qsort()`** — uses Quick Sort (often with median-of-three)
- **Java's `Arrays.sort(int[])`** — uses Dual-Pivot Quick Sort
- **STL's `std::sort()`** — IntroSort (Quick Sort + Heap Sort fallback)
- **Most standard library sort implementations** for primitive types
- **Database query optimizers** — sorting intermediate results

---

## 🔹 Quick Select — A Related Algorithm

Quick Select uses Quick Sort's partition to find the **k-th smallest element** in O(n) average time without fully sorting.

```javascript
function quickSelect(arr, k) {
    function select(low, high) {
        if (low === high) return arr[low];

        const pivotIndex = partitionRandom(arr, low, high);

        if (k === pivotIndex) {
            return arr[k];
        } else if (k < pivotIndex) {
            return select(low, pivotIndex - 1);
        } else {
            return select(pivotIndex + 1, high);
        }
    }

    return select(0, arr.length - 1);
}

const nums = [7, 10, 4, 3, 20, 15];
console.log(quickSelect(nums, 3));    // 3rd smallest (0-indexed)
// Output: 10
// Sorted: [3, 4, 7, 10, 15, 20] → index 3 = 10
```

**Time Complexity**: O(n) average, O(n²) worst case — same tradeoffs as Quick Sort.

---

## 💡 Interview Tips

> **"Explain Quick Sort in one sentence."** — Pick a pivot, partition the array so smaller elements go left and larger elements go right, then recursively sort both partitions.

> **"What is Quick Sort's worst case and how do you avoid it?"** — O(n²) when the pivot is always the min or max. Avoid by using a random pivot or median-of-three pivot selection.

> **"Lomuto vs Hoare partition — which is better?"** — Hoare makes ~3× fewer swaps and is faster in practice. Lomuto is simpler to understand and teach.

> **"Why is Quick Sort faster than Merge Sort in practice?"** — Better cache locality (sequential access during partition), in-place sorting (less memory allocation), and lower constant factors.

> **"Is Quick Sort stable?"** — No. The partition process swaps elements across the array in a way that can break the relative order of equal elements.

> **"What is IntroSort?"** — A hybrid that starts with Quick Sort but switches to Heap Sort if recursion depth exceeds log n. This guarantees O(n log n) worst-case while keeping Quick Sort's average-case speed.

---

**Next:** [Heap Sort](/DSA-Notes-Problems/data-structures/sorting/07-heap-sort) →
