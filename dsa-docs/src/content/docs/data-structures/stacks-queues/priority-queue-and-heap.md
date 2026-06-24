---
title: "Priority Queue & Heap"
description: "Priority queue concept, heap structure, and implementation — with the heap as both tree and array."
sidebar:
  order: 6
---

# Priority Queue & Heap

> A **priority queue** is like a regular queue, but each element has a "priority." The element with the highest (or lowest) priority gets dequeued first.

A **heap** is the most common way to implement a priority queue.

---

## Visual: Heap as a Tree + Array

```mermaid
flowchart TB
    subgraph Tree[Binary Heap (Tree View)]
        N1["50"] --> N2["30"]
        N1 --> N3["40"]
        N2 --> N4["10"]
        N2 --> N5["20"]
        N3 --> N6["35"]
    end

    subgraph Array[Same Heap as Array]
        A1["Index:  0   1   2   3   4   5"]
        A2["Value: 50  30  40  10  20  35"]
    end

    style N1 fill:#7c3aed,color:#fff
    style N2 fill:#4f46e5,color:#fff
    style N3 fill:#4f46e5,color:#fff
    style N4 fill:#6366f1,color:#fff
    style N5 fill:#6366f1,color:#fff
    style N6 fill:#6366f1,color:#fff
```

**Parent-child index formulas (0-indexed array):**
- `parent(i)` = `Math.floor((i - 1) / 2)`
- `leftChild(i)` = `2 * i + 1`
- `rightChild(i)` = `2 * i + 2`

---

## Max Heap Implementation

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // -- Core Operations --

  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return max;
  }

  peek() {
    return this.heap.length ? this.heap[0] : null;
  }

  // -- Internal --

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] >= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  _bubbleDown(idx) {
    const n = this.heap.length;
    while (true) {
      let largest = idx;
      const left = 2 * idx + 1, right = 2 * idx + 2;

      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;
      if (largest === idx) break;

      [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
      idx = largest;
    }
  }
}

// Usage
const heap = new MaxHeap();
heap.insert(10);
heap.insert(5);
heap.insert(20);
console.log(heap.extractMax()); // 20
console.log(heap.peek());       // 10
```

---

## Complexity

| Operation | Time |
|-----------|------|
| Insert (push + bubble up) | O(log N) |
| Extract max/min | O(log N) |
| Peek | O(1) |
| Build heap from array | O(N) |

---

## Min Heap

Same as MaxHeap but flip the comparison in `_bubbleUp` and `_bubbleDown`:

```javascript
// In _bubbleUp: if (this.heap[parent] <= this.heap[idx]) break;
// In _bubbleDown: if (this.heap[left] < this.heap[smallest]) ...
```

---

## Use Cases

| Problem | How Heap Helps |
|---------|---------------|
| Top K elements | Min-heap of size K |
| Kth smallest/largest | Max-heap for Kth smallest, Min-heap for Kth largest |
| Merge K sorted lists | Min-heap of list heads |
| Median from data stream | Two heaps (max for lower half, min for upper half) |
| Dijkstra's algorithm | Extract nearest unvisited vertex |

---

## In Simple Words

- A heap is a binary tree stored in an array — parent bigger than children (max-heap) or smaller (min-heap).
- Priority queue = heap. Insert is O(log N), get max/min is O(1), remove is O(log N).
- Use a min-heap of size K to find the K largest elements — the smallest drops out each time.
