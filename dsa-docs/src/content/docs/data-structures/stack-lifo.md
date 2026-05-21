---
title: "Stack (LIFO)"
description: "Last In, First Out."
sidebar:
  order: 15
---

#  Stack (LIFO)

Last In, First Out.

## Operations

* Push ’ O(1)
* Pop ’ O(1)
* Peek ’ O(1)

## Example Flow

```
push(10) ’ [10]
push(20) ’ [10, 20]
push(30) ’ [10, 20, 30]
pop() ’ [10, 20]
peek() ’ 20
```

## JavaScript Implementation

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

## Real-World Uses

* Undo/Redo
* Browser history
* Function calls
* Expression evaluation

---

<a id="queue-fifo"></a>