---
title: "Queue Implementation"
description: "Array-based, linked-list-based, and circular queue implementations."
sidebar:
  order: 4
---

# Queue Implementation

> A queue is a **FIFO** (First In, First Out) data structure. Think of a line at a ticket counter.

---

## Array-Based Queue

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val); // add to back
  }

  dequeue() {
    return this.items.shift() ?? null; // remove from front
  }

  front() {
    return this.items[0] ?? null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

**⚠️ Pitfall:** `shift()` is **O(N)** because it re-indexes all remaining elements. For large queues, use a linked list or a custom array-based queue with head/tail pointers.

---

## Efficient Array Queue (Head/Tail Pointers)

```javascript
class EfficientQueue {
  constructor() {
    this.items = {};
    this.head  = 0;
    this.tail  = 0;
  }

  enqueue(val) {
    this.items[this.tail] = val;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const val = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return val;
  }

  front() {
    return this.items[this.head] ?? null;
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }
}
```

All operations are **O(1)**. Uses an object as a map of indices to values.

---

## Linked-List-Based Queue

```javascript
class Node {
  constructor(val) {
    this.val  = val;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null;
    this.back  = null;
    this.size  = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (this.back) {
      this.back.next = node;
    } else {
      this.front = node;
    }
    this.back = node;
    this.size++;
  }

  dequeue() {
    if (!this.front) return null;
    const val = this.front.val;
    this.front = this.front.next;
    if (!this.front) this.back = null;
    this.size--;
    return val;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

All operations **O(1)**. Good when the queue grows unpredictably.

---

## Circular Queue (Ring Buffer)

A fixed-size queue that wraps around to reuse space.

```javascript
class CircularQueue {
  constructor(k) {
    this.buffer = new Array(k);
    this.capacity = k;
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  enqueue(val) {
    if (this.isFull()) return false;
    this.buffer[this.tail] = val;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return true;
  }

  front() {
    return this.isEmpty() ? -1 : this.buffer[this.head];
  }

  rear() {
    return this.isEmpty() ? -1 : this.buffer[(this.tail - 1 + this.capacity) % this.capacity];
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.capacity;
  }
}
```

**Best for:** Fixed-size buffers, streaming data, BFS when the max queue size is known.

---

## Comparison

| Feature | Array (shift) | Head/Tail Object | Linked List | Circular Queue |
|---------|:---:|:---:|:---:|:---:|
| Enqueue | O(1) | O(1) | O(1) | O(1) |
| Dequeue | **O(N)** | O(1) | O(1) | O(1) |
| Memory | Low | Medium | High (pointers) | Fixed |
| Size | Dynamic | Dynamic | Dynamic | Fixed |

---

## In Simple Words

- Don't use `shift()` for queues — it's O(N).
- Head/tail pointer queue is the best general-purpose choice.
- Circular queue is perfect when you know the max size ahead of time.
