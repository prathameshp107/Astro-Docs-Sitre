---
title: "Queue (FIFO)"
description: "First In, First Out."
sort: 16
---

# Queue (FIFO)

First In, First Out.

## Operations

* Enqueue ’ O(1)
* Dequeue ’ O(1)

## Example Flow

```
enqueue(10) ’ [10]
enqueue(20) ’ [10, 20]
enqueue(30) ’ [10, 20, 30]
dequeue() ’ [20, 30]
```

## Optimized Implementation

```js
class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.items[this.rear++] = value;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.items[this.front];
    delete this.items[this.front++];
    return value;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
```

## Real-World Uses

* Task scheduling
* Printer queue
* BFS
* Request handling

---

<a id="javascript-array-methods"></a>