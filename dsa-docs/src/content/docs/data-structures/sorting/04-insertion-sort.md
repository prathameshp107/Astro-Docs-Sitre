---
title: "Insertion Sort"
description: "How Insertion Sort works (playing cards analogy), JavaScript implementation, complexity analysis, and when to use it."
sidebar:
  order: 4
---

# Insertion Sort

## 🎯 What Is Insertion Sort?

Insertion Sort builds the final sorted array **one element at a time** by repeatedly taking an unsorted element and inserting it into its correct position among the already-sorted elements.

> **Analogy**: Imagine sorting a hand of playing cards. You pick up cards one by one, and insert each new card into its proper position among the cards you're already holding. The cards in your left hand are always sorted.

---

## 🔹 How It Works — Step by Step

![Insertion Sort Visualization](/DSA-Notes-Problems/assets/images/sorting/insertion-sort.svg)

### Visual Walkthrough

Sort: `[12, 11, 13, 5, 6]`

```text
Initial state:
[12, 11, 13, 5, 6]
 ↑
 Sorted portion starts with just arr[0]

─────────────────────────────────────────
Pass 1: Pick arr[1] = 11, insert into sorted portion
─────────────────────────────────────────
[12, 11, 13, 5, 6]
 ────↑
 11 < 12 → shift 12 right

[__, 12, 13, 5, 6]   ← insert 11 at position 0
[11, 12, 13, 5, 6]
 ✅✅  ←── unsorted ──→

─────────────────────────────────────────
Pass 2: Pick arr[2] = 13, insert into sorted portion
─────────────────────────────────────────
[11, 12, 13, 5, 6]
     ──────↑
 13 > 12 → already in correct position, no shift needed

[11, 12, 13, 5, 6]
 ✅✅✅  ←── unsorted → 

─────────────────────────────────────────
Pass 3: Pick arr[3] = 5, insert into sorted portion
─────────────────────────────────────────
[11, 12, 13, 5, 6]
          ────↑
 5 < 13 → shift 13 right
 5 < 12 → shift 12 right
 5 < 11 → shift 11 right

[__, 11, 12, 13, 6]   ← insert 5 at position 0
[5, 11, 12, 13, 6]
 ✅✅✅✅  ←── unsorted →

─────────────────────────────────────────
Pass 4: Pick arr[4] = 6, insert into sorted portion
─────────────────────────────────────────
[5, 11, 12, 13, 6]
              ────↑
 6 < 13 → shift 13 right
 6 < 12 → shift 12 right
 6 > 11 → stop here

[5, 11, 11, 12, 13]   ← insert 6 at position 1
[5, 6, 11, 12, 13]
 ✅✅✅✅✅  ← all sorted!

Final sorted: [5, 6, 11, 12, 13] ✅
```

### Key Insight — Shifting vs Swapping

Unlike Bubble Sort and Selection Sort, Insertion Sort **shifts** elements rightward instead of swapping them. A shift is a single write operation, whereas a swap requires two writes (three if using a temporary variable). This makes Insertion Sort more efficient in practice than the other quadratic sorts.

```javascript
// Insertion uses shift (1 write per element)
arr[j + 1] = arr[j];  // shift right ← single write

// Bubble/Selection use swap (2 writes per element)
[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // swap ← two writes
```

---

## 🔹 JavaScript Implementation

```javascript
function insertionSort(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        // Pick the element to insert
        const key = arr[i];

        // Find the correct position by shifting larger elements right
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  // Shift right
            j--;
        }

        // Insert the key at its correct position
        arr[j + 1] = key;
    }

    return arr;
}

// Test
console.log(insertionSort([12, 11, 13, 5, 6]));
// Output: [5, 6, 11, 12, 13]

console.log(insertionSort([64, 34, 25, 12, 22, 11, 90]));
// Output: [11, 12, 22, 25, 34, 64, 90]
```

---

## 🔹 Descending Order

```javascript
function insertionSortDescending(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        // Change > to < for descending order
        while (j >= 0 && arr[j] < key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}

console.log(insertionSortDescending([12, 11, 13, 5, 6]));
// Output: [13, 12, 11, 6, 5]
```

---

## 🔹 Sorting Objects

```javascript
function insertionSortByKey(arr, key) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j][key] > current[key]) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current;
    }

    return arr;
}

const students = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 72 },
    { name: 'Carol', score: 91 },
    { name: 'Dave', score: 68 }
];

console.log(insertionSortByKey(students, 'score'));
// Output: sorted by score ascending
// [{ name: 'Dave', score: 68 }, { name: 'Bob', score: 72 }, ...]
```

---

## 🔹 Online Sorting — Insert While Receiving

A unique property of Insertion Sort is that it's **online** — it can sort elements as they arrive, without waiting for the entire input.

```javascript
class OnlineSorter {
    constructor() {
        this.sorted = [];
    }

    insert(value) {
        this.sorted.push(value);  // Add to end

        // Bubble the new element to its correct position
        let i = this.sorted.length - 1;
        while (i > 0 && this.sorted[i - 1] > this.sorted[i]) {
            [this.sorted[i - 1], this.sorted[i]] = [this.sorted[i], this.sorted[i - 1]];
            i--;
        }

        console.log(`After inserting ${value}: [${this.sorted}]`);
    }
}

const sorter = new OnlineSorter();
sorter.insert(5);   // [5]
sorter.insert(3);   // [3, 5]
sorter.insert(8);   // [3, 5, 8]
sorter.insert(1);   // [1, 3, 5, 8]
sorter.insert(6);   // [1, 3, 5, 6, 8]

// Output:
// After inserting 5: [5]
// After inserting 3: [3, 5]
// After inserting 8: [3, 5, 8]
// After inserting 1: [1, 3, 5, 8]
// After inserting 6: [1, 3, 5, 6, 8]
```

---

## 📊 Time & Space Complexity

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | O(n) | Already sorted — inner while loop never executes |
| **Average Case** | O(n²) | Random order — roughly n²/4 comparisons and shifts |
| **Worst Case** | O(n²) | Reverse sorted — maximum shifting needed |
| **Space** | O(1) | In-place — only uses `key`, `i`, `j` variables |

### Why Best Case is O(n)

When the input is already sorted, the inner while loop condition `arr[j] > key` is false immediately for every `i`:

```javascript
for (let i = 1; i < n; i++) {
    const key = arr[i];         // O(1)
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {  // ❌ Immediately false on sorted input
        arr[j + 1] = arr[j];         // Never executed
        j--;
    }
    arr[j + 1] = key;            // O(1)
}
// Total: n-1 iterations of outer loop × O(1) work = O(n)
```

This is Insertion Sort's superpower — it's the **only quadratic sort that is O(n) on sorted input** (Bubble Sort is also O(n) but only with the swapped-flag optimization).

### Comparison of Comparisons & Shifts

```text
For n = 100 elements:

             Comparisons        Shifts
Best:            99                0       (sorted)
Average:       2520             2520       (random)
Worst:         4950             4950       (reversed)

Selection Sort (worst):  4950 comps  +  99 swaps
Bubble Sort (worst):     4950 comps  +  2475 swaps
```

---

## 🔹 Stability

Insertion Sort is **stable**. When `arr[j] > key` is the comparison, equal elements do not trigger a shift. The new equal element is inserted **after** all existing equal elements, preserving their original relative order.

```javascript
// Original: [(3,a), (1,b), (3,c), (2,d)]
//                     ↑           ↑
// Step by step:
// i=1: key=(1,b) → [(1,b), (3,a), (3,c), (2,d)]
// i=2: key=(3,c) → 3 > 1, stop → [(1,b), (3,a), (3,c), (2,d)]
//                           (3,c) inserted after (3,a) ✅
// i=3: key=(2,d) → [(1,b), (2,d), (3,a), (3,c)]
//                                     ↑     ↑
//                             3a before 3c ✅ STABLE!
```

---

## 🔹 Insertion Sort vs Selection Sort vs Bubble Sort

| Property | Insertion Sort | Selection Sort | Bubble Sort |
|----------|---------------|---------------|-------------|
| Best Case | O(n) ✅ | O(n²) ❌ | O(n) ✅ |
| Average Case | O(n²) | O(n²) | O(n²) |
| Worst Case | O(n²) | O(n²) | O(n²) |
| Space | O(1) | O(1) | O(1) |
| Stable | ✅ Yes | ❌ No | ✅ Yes |
| Adaptive | ✅ Yes | ❌ No | ✅ Yes (optimized) |
| Online | ✅ Yes | ❌ No | ❌ No |
| Writes | O(n²) shifts | O(n) swaps | O(n²) swaps |
| **Real-world speed** | **Fastest of the 3** | Slowest | Slow |
| Cache performance | Excellent | Poor (long jumps) | Good |

---

## 🔹 Properties Summary

| Property | Value |
|----------|-------|
| Time (Best) | O(n) — already sorted |
| Time (Average) | O(n²) |
| Time (Worst) | O(n²) — reverse sorted |
| Space | O(1) |
| Stable | ✅ Yes |
| In-Place | ✅ Yes |
| Adaptive | ✅ Yes — O(n) on sorted, O(n²) on reverse |
| Online | ✅ Yes — can sort as elements arrive |
| Comparisons | n(n-1)/2 worst case |
| Shifts | n(n-1)/2 worst case |

---

## 🎯 When to Use Insertion Sort

### Use Insertion Sort When:

- The input is **small** (n < 50) — low overhead, fast in practice
- The input is **nearly sorted** — becomes O(n), which beats O(n log n) for very small n
- You need a **stable sort** with O(1) extra space
- You're receiving elements **online** (one at a time)
- As the **base case** in hybrid sorts (like TimSort's use of Insertion Sort for small runs)

### Do NOT Use When:

- The input is large and unsorted — O(n²) is too slow
- Constant worst-case time is required
- The input is reverse sorted — the worst case

### Real-World Usage

Despite being O(n²), Insertion Sort is widely used in practice:

- **TimSort** (Python's sort, JavaScript's `.sort()`, Java's `Arrays.sort()`) — uses Insertion Sort for tiny subarrays (< 32–64 elements)
- **Shell Sort** — a generalization of Insertion Sort
- **Online sorting** — stock tickers, live scoreboards, real-time data feeds
- **Nearly sorted data** — sensor data, error-correcting systems

---

## 💡 Interview Tips

> **"What is Insertion Sort's best case and why?"** — O(n). When the array is already sorted, the inner while loop never executes. Only n-1 iterations of the outer loop run, each doing O(1) work.

> **"When is Insertion Sort faster than O(n log n) sorts?"** — For small arrays (n < ~30–50) and nearly sorted arrays. The constant factors and cache efficiency of Insertion Sort beat Merge/Quick Sort's overhead for small n.

> **"Is Insertion Sort stable?"** — Yes. The comparison is `arr[j] > key`, not `arr[j] >= key`. Equal elements are not shifted, preserving their relative order.

> **"What's the difference between shifting and swapping?"** — A shift is one write operation (`arr[j+1] = arr[j]`), while a swap requires three writes (or two with destructuring). Insertion Sort uses shifts, making it more efficient than Bubble Sort.

> **"What does 'online' mean for Insertion Sort?"** — It can sort elements as they arrive without needing the entire dataset upfront. This is useful for streaming data or real-time systems.

> **"Compare Insertion Sort and Selection Sort."** — Both are O(n²). Insertion Sort is adaptive (O(n) best case), stable, and online. Selection Sort makes O(n) swaps (fewer writes) but is always O(n²), unstable, and not online. Insertion Sort outperforms Selection Sort in practice for most inputs.

---

**Next:** [Merge Sort](/DSA-Notes-Problems/data-structures/sorting/05-merge-sort) →
