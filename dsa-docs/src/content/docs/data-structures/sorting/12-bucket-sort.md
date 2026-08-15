---
title: "Bucket Sort"
description: "A distribution sort that scatters elements into buckets, sorts each bucket, then gathers them."
sidebar:
  order: 12
practice:
  visualizer: /visualizer/sorting
---

# Bucket Sort

> Bucket sort divides elements into **buckets** (ranges), sorts each bucket individually (usually with insertion sort), then concatenates the buckets.

---

## Visual: Buckets for Uniform Data

```mermaid
flowchart LR
    A["Input: [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]"] --> B["Buckets<br/>(10 buckets for 0.0-1.0)"]

    subgraph Buckets[Buckets]
        B0["[0.12, 0.17]"]
        B1["[0.21, 0.23, 0.26]"]
        B2["[0.39]"]
        B3["[0.68]"]
        B4["[0.72, 0.78]"]
        B5["[0.94]"]
    end

    B0 --> C["Sort each bucket<br/>(insertion sort)"]
    B1 --> C
    B2 --> C
    B3 --> C
    B4 --> C
    B5 --> C
    C --> D["Concatenate all buckets"]
    D --> E["✅ [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]"]

    style A fill:#7c3aed,color:#fff
    style B0 fill:#4f46e5,color:#fff
    style B1 fill:#6366f1,color:#fff
    style B2 fill:#4f46e5,color:#fff
    style B3 fill:#6366f1,color:#fff
    style B4 fill:#4f46e5,color:#fff
    style B5 fill:#6366f1,color:#fff
    style E fill:#059669,color:#fff
```

```javascript
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Scatter into buckets
  for (const num of arr) {
    const idx = Math.floor((num - min) / bucketSize);
    buckets[idx].push(num);
  }

  // Sort each bucket and gather
  const result = [];
  for (const bucket of buckets) {
    insertionSort(bucket); // small bucket → insertion is fast
    result.push(...bucket);
  }
  return result;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}
```

---

## Complexity

| Condition | Time |
|-----------|------|
| Uniform distribution | **O(N + K)** — near linear |
| Worst case (all in one bucket) | O(N²) |
| Space | O(N + K) |

**Key insight:** Bucket sort is fastest when data is **uniformly distributed**. If data clusters, many items land in the same bucket and sorting that bucket is O(N²).

---

## When to Use

| Use | Don't Use |
|-----|-----------|
| Uniformly distributed floating point data | Heavily clustered data |
| When you need near-linear time on average | When worst-case matters |
| Sorting test scores, grades | Small arrays (N < 50) |

---

## Comparison: Counting vs Radix vs Bucket

| Sort | Type | Time | Best For |
|------|------|------|----------|
| Counting | Frequency counting | O(N + K) | Small integer range |
| Radix | Digit-by-digit | O(d × N) | Fixed-width integers |
| Bucket | Distribution + insertion | O(N + K) avg | Uniformly distributed floats |

---

## In Simple Words

- Bucket sort spreads items into ranges (buckets), sorts each one cheaply, then combines.
- Works great when data is evenly spread across the range.
- Use with floating point numbers that are uniformly distributed.
