---
title: "Sorting Algorithms — Complexity Comparison"
description: "Side-by-side comparison of all 6 sorting algorithms with complexity tables, decision flowcharts, real-world recommendations, and performance benchmarks."
sidebar:
  order: 8
---

# Sorting Algorithms — Complexity Comparison

## 📊 Full Complexity Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | In-Place | Comparisons | Swaps/Shifts |
|-----------|-----------|--------------|------------|-------|--------|----------|-------------|--------------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes | ✅ Yes | n²/2 avg | n²/2 swaps |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ No | ✅ Yes | n²/2 always | ≤ n swaps |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes | ✅ Yes | n²/4 avg | n²/4 shifts |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes | ❌ No | n log n | — |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No | ✅ Yes* | n log n avg | n log n avg |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No | ✅ Yes | n log n | n log n |

*\* Quick Sort uses O(log n) stack space for recursion.*

---

## 🔹 Detailed Comparison Matrix

### Time & Space at a Glance

```text
                     TIME                    SPACE
Algorithm     Best      Avg       Worst    Auxiliary
──────────    ────      ───       ─────    ─────────
Bubble        O(n)      O(n²)     O(n²)    O(1)
Selection     O(n²)     O(n²)     O(n²)    O(1)
Insertion     O(n)      O(n²)     O(n²)    O(1)
Merge         O(nlogn)  O(nlogn)  O(nlogn) O(n)
Quick         O(nlogn)  O(nlogn)  O(n²)    O(logn)*
Heap          O(nlogn)  O(nlogn)  O(nlogn) O(1)

* Quick Sort: O(log n) average stack space, O(n) worst-case
```

### Exact Operation Counts (n = 100)

| Algorithm | Comparisons | Writes | Notes |
|-----------|-------------|--------|-------|
| **Bubble Sort** (best) | 99 | 0 | Already sorted (optimized) |
| **Bubble Sort** (avg) | ~4,950 | ~2,475 | Random input |
| **Bubble Sort** (worst) | 4,950 | 4,950 | Reverse sorted |
| **Selection Sort** (all) | 4,950 | ≤ 99 swaps (297 writes) | Always same comparisons |
| **Insertion Sort** (best) | 99 | 0 | Already sorted |
| **Insertion Sort** (avg) | ~2,475 | ~2,475 shifts | Random input |
| **Insertion Sort** (worst) | 4,950 | 4,950 shifts | Reverse sorted |
| **Merge Sort** | ~660 | — | Always same |
| **Quick Sort** (avg) | ~880 | moderate | Random pivot |
| **Heap Sort** | ~1,350 | ~1,350 | Always same |

---

## 🔹 Decision Flowchart

```text
START: What are your constraints?
│
├── n < 30? ──────────────────────────────────────────────→ INSERTION SORT (low overhead)
│
├── Memory extremely limited? (O(1) space required)
│   ├── Guaranteed O(n log n) needed? ────────────────────→ HEAP SORT
│   └── O(n²) acceptable? ────────────────────────────────→ INSERTION or SELECTION
│
├── Stability required?
│   ├── Memory available (O(n) space) ────────────────────→ MERGE SORT
│   └── Memory constrained ───────────────────────────────→ (no O(1) stable O(n log n) sort exists)
│
├── Nearly sorted input? ─────────────────────────────────→ INSERTION SORT (O(n) best case)
│
├── Average performance is priority? ─────────────────────→ QUICK SORT (fastest on average)
│
├── Worst-case guarantee required? ───────────────────────→ MERGE SORT or HEAP SORT
│
├── Sort in place required? (no extra arrays)
│   ├── Guarantee needed? ────────────────────────────────→ HEAP SORT
│   └── Fast average OK? ─────────────────────────────────→ QUICK SORT
│
├── Teaching / learning? ─────────────────────────────────→ BUBBLE SORT (simplest to explain)
│
└── Write operations expensive? (flash memory) ───────────→ SELECTION SORT (≤ n-1 swaps)
```

---

## 🔹 Constant Factors — Real-World Performance

Big-O tells us about scaling, but **constant factors** determine real-world speed. Here's how the algorithms compare on a typical modern CPU with an array of 100,000 integers:

```text
Relative Speed (Fastest = 1.0x):

Quick Sort   ──────────────────────────────────────────────── 1.0x  (fastest)
Merge Sort   ────────────────────────────────────────── 1.5-2.0x  (slower due to memory allocation)
Heap Sort    ──────────────────────────────── 2.0-5.0x  (poor cache locality)
Insertion    ────── 0.001x (only for n < 30, otherwise unusable)
Bubble       ── Extremely slow for n=100k (hours vs seconds)
Selection    ── Even slower
```

### Why Quick Sort Is the Fastest

| Why Quick Sort Wins | Reason |
|---------------------|--------|
| Cache locality | Partition scans sequentially left to right |
| In-place | No extra memory allocation |
| Low constant | Simple inner loop (just comparisons and swaps) |
| Good pivots | Random/median-of-three gives balanced partitions |

### Why Heap Sort Is Slower

| Why Heap Sort Loses | Reason |
|----------------------|--------|
| Random access | `arr[2i+1]`, `arr[2i+2]` — cache-unfriendly jumps |
| Many comparisons | Heapify compares parent with both children |
| Not adaptive | Same work for sorted and random input |
| Swaps more | Each heapify does multiple swaps per level |

---

## 🔹 Adaptive Sorts (Performance on Nearly Sorted Data)

| Algorithm | Already Sorted | Nearly Sorted (10% out of order) | Random | Reverse Sorted |
|-----------|---------------|----------------------------------|--------|----------------|
| **Bubble Sort** (opt.) | O(n) | ~O(n) | O(n²) | O(n²) |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(n²) |
| **Insertion Sort** | O(n) | ~O(n) ✅ | O(n²) | O(n²) |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n log n) |
| **Quick Sort** | O(n log n)* | O(n log n) | O(n log n) | O(n log n)* |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(n log n) |

*\* Quick Sort with random/median-of-three pivot. First/last pivot would give O(n²) on sorted input.*

**Winner for nearly sorted data**: **Insertion Sort** — degrades gracefully from O(n) to O(n²) as disorder increases.

---

## 🔹 Stability Guarantee

| Algorithm | Stable? | Why / Why Not |
|-----------|---------|---------------|
| **Bubble Sort** | ✅ Yes | Adjacent swaps only — equal elements never cross |
| **Selection Sort** | ❌ No | Long-range swap can displace equal elements |
| **Insertion Sort** | ✅ Yes | Shifts right — equal elements not crossed |
| **Merge Sort** | ✅ Yes | ≤ comparison in merge — left elements come first |
| **Quick Sort** | ❌ No | Partition swaps can reorder equal elements |
| **Heap Sort** | ❌ No | Root extraction swaps across long distances |

**When stability matters**: Sorting by multiple keys (e.g., sort by department, then by salary within department).

---

## 🔹 Memory Usage Comparison

```text
Memory (extra space needed):
                           O(1)                     O(log n)            O(n)
        ├──────────────────┼─────────────────────────┼──────────────────┤
Bubble   ● (in-place)
Selection● (in-place)
Insertion● (in-place)
Heap     ● (in-place, iterative)
Quick                   ● (recursion stack)
Merge                                                ● (auxiliary array)
```

### Practical Implications

| Algorithm | RAM for n=1M (8 bytes per element) | Notes |
|-----------|--------------------------------------|-------|
| Heap Sort | ~8 MB (just the array) | Only memory needed is the array itself |
| Quick Sort | ~8 MB + ~KB for stack | Stack space is negligible |
| Merge Sort | ~16 MB (array + auxiliary) | Double the memory — problematic for large data |

---

## 🔹 Sorting Algorithm Selection Guide

### Quick Reference Card

```text
             ┌─ Tiny (n<30) ─────── Insertion Sort
             │
             ├─ Nearly sorted ───── Insertion Sort
             │
What to use ─┼─ Stable needed ───── Merge Sort (if memory OK)
             │                      (no O(1)-space stable sort for large n)
             │
             ├─ O(1) space ──────── Heap Sort (if guarantee needed)
             │                      Quick Sort (for speed)
             │
             ├─ Fastest avg ─────── Quick Sort (with random pivot)
             │
             ├─ Guaranteed ──────── Merge Sort or Heap Sort
             │
             └─ Teaching ────────── Bubble Sort (simplest)
```

### Industry Defaults

| Language / Library | Sorting Algorithm Used | Why This Choice |
|-------------------|----------------------|-----------------|
| **JavaScript** (V8) | TimSort (Merge + Insertion) | Stable, fast on real-world data |
| **Python** (CPython) | TimSort | Stable, adaptive, fast on nearly sorted data |
| **Java** `Arrays.sort(Object[])` | TimSort | Stable sort for objects |
| **Java** `Arrays.sort(int[])` | Dual-Pivot Quick Sort | Fast for primitives (no stability needed) |
| **C++** `std::sort` | IntroSort (Quick + Heap) | Fast average, guaranteed O(n log n) |
| **Rust** `.sort()` | TimSort | Stable, robust |
| **Go** `sort.Slice` | Quick Sort + Shell Sort + Insertion | Hybrid for various sizes |
| **Swift** `sorted()` | TimSort | Stable sort |
| **.NET** `Array.Sort()` | IntroSort | Guaranteed O(n log n) |

---

## 🔹 Benchmark Numbers (Approximate)

Relative times for sorting 1,000,000 integers on a modern CPU:

| Algorithm | Time (ms) | Notes |
|-----------|-----------|-------|
| Quick Sort (random pivot) | ~80 ms | Fastest on average |
| Quick Sort (median-of-3) | ~85 ms | Slightly more robust |
| Merge Sort (optimized) | ~120 ms | Extra copy costs time |
| TimSort | ~130 ms | Stable, good real-world perf |
| Heap Sort | ~200 ms | Slower due to cache misses |
| IntroSort | ~90 ms | Quick Sort + Heap fallback |
| Insertion Sort (n=10k only) | ~5 ms | Fast for tiny n only |

---

## 🔹 Summary: Algorithm Tradeoffs

```text
Algorithm   Speed   Memory  Stable  Guarantee  Simple
─────────   ─────   ──────  ──────  ─────────  ──────
Bubble       ★☆☆     ★★★     ✅      ❌        ★★★
Selection    ★☆☆     ★★★     ❌      ❌        ★★☆
Insertion    ★★☆     ★★★     ✅      ❌        ★★★
Merge        ★★★     ★★☆     ✅      ✅        ★★☆
Quick        ★★★     ★★★     ❌      ❌        ★★☆
Heap         ★★☆     ★★★     ❌      ✅        ★☆☆
```

**★ = Better** (more stars = better in that category)

---

## 💡 Interview Tips

> **"Which sort is fastest?"** — Quick Sort, on average. Its cache efficiency and low constant factors make it ~2-5× faster than Heap Sort and ~1.5× faster than Merge Sort on random data.

> **"Which sort would you use for sorting a large file on disk?"** — Merge Sort. Its sequential access pattern is ideal for external sorting (reading/writing files in chunks). Quick Sort requires random access, which is slow on disk.

> **"Which sort is best for sorting a nearly sorted array?"** — Insertion Sort. It's O(n) on sorted data and degrades gracefully.

> **"Which sort has the best worst-case guarantee with O(1) space?"** — Heap Sort. It's the only comparison sort that is both O(n log n) worst-case and O(1) space.

> **"What sort does JavaScript's .sort() use?"** — TimSort, a hybrid of Merge Sort and Insertion Sort. It's stable, adaptive, and O(n log n).

> **"Can you prove that comparison sorts can't be faster than O(n log n)?"** — Yes. There are n! possible permutations of n elements. Each comparison gives 1 bit of information. To distinguish n! permutations, you need at least log₂(n!) ≈ n log₂ n comparisons. This is the **comparison sort lower bound**.

---

**Next:** [Interview Questions](/DSA-Notes-Problems/data-structures/sorting/09-interview-questions) →
