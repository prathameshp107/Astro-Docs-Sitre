---
title: "Heap Sort"
description: "How Heap Sort works (build max-heap, extract), heapify process, JavaScript implementation, complexity analysis, and comparison with other O(n log n) sorts."
sidebar:
  order: 7
practice:
  visualizer: /visualizer/sorting
---

# Heap Sort

## 🎯 What Is Heap Sort?

Heap Sort is a **comparison-based** sorting algorithm that uses a **binary heap** data structure. It first builds a max-heap from the array, then repeatedly extracts the maximum element (the root) and places it at the end.

> **Core idea**: A max-heap always has the largest element at the root. Extract it, swap it with the last element, shrink the heap, and heapify the root. Repeat until all elements are extracted.

---

## 🔹 Heap Data Structure — Quick Refresher

A **max-heap** is a complete binary tree where:
- Every parent node is **greater than or equal to** its children
- The root is always the **maximum** element
- The tree is **complete** (all levels filled except possibly the last)

### Array Representation

A heap is stored as an array where for any index `i`:

```text
Left child:     arr[2 * i + 1]
Right child:    arr[2 * i + 2]
Parent:         arr[Math.floor((i - 1) / 2)]

Example: Heap = [50, 30, 40, 10, 20, 35]

Index:      0    1    2    3    4    5
Value:     [50,  30,  40,  10,  20,  35]

Tree:
             50(0)
           /       \
        30(1)      40(2)
       /    \      /
    10(3)  20(4) 35(5)
```

---

## 🔹 How Heap Sort Works — Three Steps

1. **Build Max-Heap**: Transform the array into a max-heap (O(n))
2. **Extract Maximum**: Swap root (max) with last unsorted element (O(1))
3. **Heapify**: Restore heap property for the root (O(log n))
4. **Repeat** steps 2-3 for all elements

![Heap Sort Visualization](/DSA-Notes-Problems/assets/images/sorting/heap-sort.svg)

### Visual Walkthrough

Sort: `[4, 10, 3, 5, 1]`

```text
Step 1: Build Max-Heap
──────────────────────
Initial array:      [4, 10, 3, 5, 1]

Start heapify from the last non-leaf node (index 1):
  arr[1]=10 > children (5,1) → already a max-heap

Heapify root at index 0:
  arr[0]=4 < left=10 → swap
  [10, 4, 3, 5, 1]
  
  arr[1]=4 < left=5 → swap
  [10, 5, 3, 4, 1]  ← MAX-HEAP ✅

Tree:
               10
            /      \
          5          3
         /  \
       4     1

Step 2: Extract Maximum (n-1 times)
──────────────────────

Extract 1: Swap root (10) with last (1)
           [1, 5, 3, 4, 10]
            ↑           ↑
           root      sorted portion
            
Heapify root [1, 5, 3, 4]:
           1 < 5 → swap with 5
           [5, 1, 3, 4, 10]
           1 < 4 → swap with 4
           [5, 4, 3, 1, 10]  ← heap restored ✅

Extract 2: Swap root (5) with last unsorted (1)
           [1, 4, 3, 5, 10]
            ↑     ↑
           root  sorted portion
           
Heapify root [1, 4, 3]:
           1 < 4 → swap with 4
           [4, 1, 3, 5, 10]  ← heap restored ✅

Extract 3: Swap root (4) with last unsorted (3)
           [3, 1, 4, 5, 10]
            ↑  ↑
           root ↓ sorted portion
           
Heapify root [3, 1]:
           3 > 1 → already a heap ✅

Extract 4: Swap root (3) with last unsorted (1)
           [1, 3, 4, 5, 10]
            ↑
           sorted

Final sorted: [1, 3, 4, 5, 10] ✅
```

---

## 🔹 JavaScript Implementation

```javascript
// Heapify a subtree rooted at index i
// n is the size of the heap
function heapify(arr, n, i) {
    let largest = i;            // Assume root is largest
    const left = 2 * i + 1;     // Left child index
    const right = 2 * i + 2;    // Right child index

    // If left child exists and is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child exists and is larger than current largest
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the largest is not the root → swap and recursively heapify
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);  // Recursively heapify the affected subtree
    }
}

function heapSort(arr) {
    const n = arr.length;

    // Step 1: Build max-heap
    // Start from the last non-leaf node and go up to root
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (maximum) to the end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Heapify the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

// Test
console.log(heapSort([4, 10, 3, 5, 1]));
// Output: [1, 3, 4, 5, 10]

console.log(heapSort([12, 11, 13, 5, 6, 7]));
// Output: [5, 6, 7, 11, 12, 13]
```

---

## 🔹 Detailed Build Max-Heap Visualization

The build step (heapify from the **last non-leaf node** upward) ensures O(n) time — faster than calling heapify n times (which would be O(n log n)).

```text
Array: [3, 5, 9, 6, 8, 20, 10, 12, 18, 15]

Tree representation:
             3(0)
          /       \
       5(1)       9(2)
      /    \      /    \
    6(3)  8(4) 20(5)  10(6)
   /  \    /
 12(7) 18(8) 15(9)

Find last non-leaf: Math.floor(10/2) - 1 = 4
Heapify from index 4 down to 0:

Step 1: i=4, arr[4]=8, children: 15(9)
        8 < 15 → swap
        [3, 5, 9, 6, 15, 20, 10, 12, 18, 8]

Step 2: i=3, arr[3]=6, children: 12(7), 18(8)
        6 < 18 → swap with right child
        [3, 5, 9, 18, 15, 20, 10, 12, 6, 8]

Step 3: i=2, arr[2]=9, children: 20(5), 10(6)
        9 < 20 → swap with left child
        [3, 5, 20, 18, 15, 9, 10, 12, 6, 8]

Step 4: i=1, arr[1]=5, children: 18(3), 15(4)
        5 < 18 → swap with left child
        [3, 18, 20, 5, 15, 9, 10, 12, 6, 8]
        Now heapify(5): children 12(7), 6(8)
        5 < 12 → swap with left child
        [3, 18, 20, 12, 15, 9, 10, 5, 6, 8]

Step 5: i=0, arr[0]=3, children: 18(1), 20(2)
        3 < 20 → swap with right child
        [20, 18, 3, 12, 15, 9, 10, 5, 6, 8]
        Now heapify(3): children 12(3), 15(4)
        3 < 15 → swap with right child
        [20, 18, 15, 12, 3, 9, 10, 5, 6, 8]
        Now heapify(4): children 6(8), 8(9)
        3 < 8 → swap with right child
        [20, 18, 15, 12, 8, 9, 10, 5, 6, 3]

Final max-heap:
             20
          /      \
       18         15
      /  \       /  \
    12    8     9    10
   /  \   /
  5   6  3

Array: [20, 18, 15, 12, 8, 9, 10, 5, 6, 3] ✅ MAX-HEAP!
```

---

## 🔹 Descending Order

To sort in descending order, build a **min-heap** instead of a max-heap:

```javascript
function heapifyMin(arr, n, i) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapifyMin(arr, n, smallest);
    }
}

function heapSortDescending(arr) {
    const n = arr.length;

    // Build min-heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyMin(arr, n, i);
    }

    // Extract minimum one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyMin(arr, i, 0);
    }

    return arr;
}

console.log(heapSortDescending([4, 10, 3, 5, 1]));
// Output: [10, 5, 4, 3, 1]
```

---

## 🔹 Iterative Heapify (Avoid Recursion)

The recursive `heapify` above uses O(log n) stack space. An iterative version uses O(1) space:

```javascript
function heapifyIterative(arr, n, i) {
    while (true) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest === i) break;  // Heap property satisfied

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        i = largest;  // Move down to the affected subtree
    }
}

function heapSortIterative(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyIterative(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyIterative(arr, i, 0);
    }

    return arr;
}
```

---

## 🔹 Why is Build-Heap O(n)?

This is a classic interview question. The standard analysis:

```text
Number of nodes at height h (from bottom): ≤ n / 2^(h+1)
Work per node at height h: O(h) (sifting down at most h levels)

Total work = Σ(h=0 to log n)  n / 2^(h+1) × O(h)

           = n × Σ(h=0 to log n)  h / 2^(h+1)

           ≤ n × Σ(h=0 to ∞)  h / 2^(h+1)

           = n × 1  (the infinite sum converges to 1)

           = O(n)  ✅
```

**Intuition**: Most nodes are near the bottom of the tree and require very little work. Only the root might fall all the way down (log n steps), but there's only one root.

---

## 📊 Time & Space Complexity

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | O(n log n) | Building heap is O(n), extracting n elements × O(log n) each |
| **Average Case** | O(n log n) | Same regardless of input order |
| **Worst Case** | O(n log n) | Guaranteed — no worst-case degradation |
| **Space** | O(1) | In-place — no extra arrays (iterative version) |

### Complexity Breakdown

```text
Build max-heap:            O(n)
Extract (n-1 times):       n × O(log n) = O(n log n)
Total:                     O(n) + O(n log n) = O(n log n)
```

---

## 🔹 Heap Sort vs Merge Sort vs Quick Sort

| Aspect | Heap Sort | Merge Sort | Quick Sort |
|--------|-----------|------------|------------|
| Time (All Cases) | O(n log n) ✅ | O(n log n) ✅ | O(n log n) avg, O(n²) worst |
| Space | O(1) ✅ | O(n) ❌ | O(log n) |
| Stable | ❌ | ✅ | ❌ |
| Cache Performance | ❌ Poor (random access) | Good (sequential) | ✅ Excellent |
| Constant Factors | Higher | Medium | Lower |
| Worst-case Guarantee | ✅ Yes | ✅ Yes | ❌ No (without IntroSort) |

### Why Is Heap Sort Slower Than Quick Sort in Practice?

Despite both being O(n log n), Heap Sort is typically **2-5× slower** than Quick Sort:

1. **Poor cache locality**: Heap Sort jumps around the array (arr[i] → arr[2i+1] → arr[4i+3]...), causing cache misses
2. **More operations**: Every extraction requires a heapify that may traverse many levels
3. **Not adaptive**: Always does the same amount of work regardless of input order

---

## 🔹 Properties Summary

| Property | Value |
|----------|-------|
| Time (Best) | O(n log n) |
| Time (Average) | O(n log n) |
| Time (Worst) | O(n log n) — guaranteed! |
| Space | O(1) — truly in-place |
| Stable | ❌ No |
| In-Place | ✅ Yes |
| Adaptive | ❌ No |
| Online | ❌ No |
| Comparison | Comparison sort |
| Data Structure | Binary Heap (max-heap) |

---

## 🎯 When to Use Heap Sort

### Use Heap Sort When:

- You need **guaranteed O(n log n)** time **and** **O(1) space** — the only comparison sort with both
- Memory is extremely constrained (embedded systems, kernel code)
- **Worst-case guarantees** are critical but memory is limited
- You need to find the **k largest** or **k smallest** elements without full sorting

### Do NOT Use When:

- Performance is critical (Quick Sort is faster in practice)
- Stability is required
- Cache performance matters (large arrays)
- The dataset is small (Insertion Sort is faster)

### Real-World Usage

Heap Sort is less common in practice than Merge Sort or Quick Sort, but it appears in:

- **IntroSort** — Falls back to Heap Sort when recursion depth exceeds log n (used in `std::sort`)
- **Priority queues** — Not sorting per se, but the same heap principle
- **Embedded systems** — where O(1) space matters
- **Real-time systems** — where O(n log n) guarantee is required
- **K-largest problems** — building a min-heap of size k is the standard approach

---

## 🔹 Finding K Largest Elements with Heap Sort

```javascript
function findKLargest(arr, k) {
    if (k >= arr.length) return arr.sort((a, b) => b - a);

    // Build a min-heap of size k
    const heap = arr.slice(0, k);
    for (let i = Math.floor(k / 2) - 1; i >= 0; i--) {
        heapifyMin(heap, k, i);
    }

    // For remaining elements, if larger than heap root, replace and heapify
    for (let i = k; i < arr.length; i++) {
        if (arr[i] > heap[0]) {
            heap[0] = arr[i];
            heapifyMin(heap, k, 0);
        }
    }

    // heap now contains the k largest elements (unsorted)
    // Sort in descending order for output
    heap.sort((a, b) => b - a);
    return heap;
}

console.log(findKLargest([3, 2, 1, 5, 6, 4], 3));
// Output: [6, 5, 4]

console.log(findKLargest([12, 5, 8, 19, 3, 10, 7], 4));
// Output: [19, 12, 10, 8]
```

**Time**: O(k + (n-k) log k) — much better than O(n log n) when k is small.

---

## 💡 Interview Tips

> **"Explain Heap Sort."** — Build a max-heap from the array (O(n)). Repeatedly swap the root (maximum) with the last element of the heap, reduce heap size, and heapify the root (O(log n) each). Total: O(n log n), O(1) space.

> **"Why is building a heap O(n) and not O(n log n)?"** — Most nodes are near the bottom and require very little heapify work. The sum of heights converges to O(n). Only O(n) nodes need heapify, and the total work across all nodes is O(n).

> **"Is Heap Sort stable?"** — No. When extracting the root and swapping with the last element, equal elements can be reordered unpredictably.

> **"Why is Quick Sort faster than Heap Sort despite both being O(n log n)?"** — Cache locality. Quick Sort accesses elements sequentially, while Heap Sort jumps around (parent to children). Heap Sort also has higher constant factors (more comparisons and swaps per element).

> **"What is the space complexity of Heap Sort?"** — O(1) when using iterative heapify. The recursive heapify uses O(log n) call stack space, but this is typically not counted as auxiliary space.

> **"Heap Sort vs Merge Sort?"** — Heap Sort uses O(1) space but is unstable. Merge Sort uses O(n) space but is stable. Merge Sort is faster in practice due to better cache behavior.

---

**Next:** [Complexity Comparison](/DSA-Notes-Problems/data-structures/sorting/08-complexity-comparison) →
