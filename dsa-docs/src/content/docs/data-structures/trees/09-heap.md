---
title: "Heap Operations"
description: "Min Heap and Max Heap operations — Insert (sift up), Delete (sift down), and Heapify."
sidebar:
  order: 9
---

# Heap Operations

---

## Heap Basics

A **Heap** is a **Complete Binary Tree** with the heap property:

- **Min Heap**: Parent ≤ Children (root is minimum)
- **Max Heap**: Parent ≥ Children (root is maximum)

Stored in an array using index formulas (0-indexed):
- Left child: `2 * i + 1`
- Right child: `2 * i + 2`
- Parent: `Math.floor((i - 1) / 2)`

---

## Insert (Sift Up / Bubble Up)

1. Add element at the **end** of the array (last position in complete tree).
2. **Bubble up**: Compare with parent; swap if heap property is violated.
3. Repeat until heap property is satisfied (or root is reached).

```
Insert 0 into Min Heap [3, 7, 5, 10, 15]

Step 1: Add to end → [3, 7, 5, 10, 15, 0]
                                  parent ↑
Step 2: 0 < 5 → swap → [3, 7, 0, 10, 15, 5]
                    parent ↑
Step 3: 0 < 3 → swap → [0, 7, 3, 10, 15, 5]  ✅ (heap property restored)
```

```javascript
class MinHeap {
  constructor() {
    this.data = [];
  }

  insert(val) {
    this.data.push(val);
    this._siftUp(this.data.length - 1);
  }

  _siftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }
}
```

---

## Delete Min/Max (Sift Down / Bubble Down)

1. Remove the **root** (min or max).
2. Replace root with the **last element** in the array.
3. **Sift down**: Compare with children; swap with the appropriate child.
4. Repeat until heap property is satisfied.

```
Delete min from [3, 7, 5, 10, 15]

Step 1: Remove 3, replace with 15 → [15, 7, 5, 10]
                                          ↑
Step 2: 15 > 5 → swap with smaller child → [5, 7, 15, 10]  ✅
```

```javascript
  extractMin() {
    if (this.data.length === 0) return null;
    const min = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }
    return min;
  }

  _siftDown(index) {
    const n = this.data.length;
    while (true) {
      let smallest = index;
      const left  = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < n && this.data[left] < this.data[smallest]) smallest = left;
      if (right < n && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }
  }
```

---

## Peek (Get Min/Max)

```javascript
  peek() {
    return this.data.length > 0 ? this.data[0] : null;
  }
```

**Time**: O(1)

---

## Heapify (Build Heap from Array) — O(N)

Start from the last non-leaf node: index `Math.floor(N/2) - 1`, then call sift-down on each node going backward to the root.

```javascript
  static heapify(arr) {
    const heap = new MinHeap();
    heap.data = arr;
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heap._siftDown(i);
    }
    return heap;
  }
```

> **Why is this O(N) and not O(N log N)?** The mathematical proof shows that most nodes are near the bottom and require fewer sift-down operations.

---

## Complexity Summary

| Operation     | Time      | Description           |
|---------------|-----------|-----------------------|
| Peek          | O(1)      | Read root             |
| Insert        | O(log N)  | Add + sift up         |
| Extract Min   | O(log N)  | Replace root + sift down |
| Build Heap    | O(N)      | Heapify from array    |
| Heap Sort     | O(N log N)| Extract N times       |

---

## Max Heap Variation

For a Max Heap, simply reverse the comparison operators:

```javascript
// In siftUp: while parent < value → swap (for Max Heap)
// In siftDown: find LARGEST child instead of smallest
```

---

## Related

- [Special Trees](/DSA-Notes-Problems/data-structures/trees/03-special-trees) — Heap overview
- [Time & Space Complexity](/DSA-Notes-Problems/data-structures/trees/05-complexity) — Complexity analysis
