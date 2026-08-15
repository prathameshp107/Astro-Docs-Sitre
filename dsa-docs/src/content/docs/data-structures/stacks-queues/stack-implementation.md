---
title: "Stack Implementation"
description: "Array-based and linked-list-based stack implementations with code examples."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/stack
---

# Stack Implementation

> A stack is a **LIFO** (Last In, First Out) data structure. You can build it with an array or a linked list.

---

## Array-Based Stack

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val); // O(1) amortized
  }

  pop() {
    return this.items.pop() ?? null; // O(1)
  }

  peek() {
    return this.items[this.items.length - 1] ?? null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.pop());  // 30
console.log(stack.peek()); // 20
console.log(stack.size()); // 1
```

**Pros:** Simple, cache-friendly, O(1) amortized push.
**Cons:** Dynamic resizing can be expensive at the moment it happens.

---

## Linked-List-Based Stack

```javascript
class Node {
  constructor(val) {
    this.val  = val;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top  = null;
    this.size = 0;
  }

  push(val) {
    const node = new Node(val);
    node.next = this.top;
    this.top  = node;
    this.size++;
  }

  pop() {
    if (!this.top) return null;
    const val = this.top.val;
    this.top  = this.top.next;
    this.size--;
    return val;
  }

  peek() {
    return this.top ? this.top.val : null;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

**Pros:** No resizing overhead, predictable O(1) per operation.
**Cons:** Extra memory for pointers, not cache-friendly.

---

## Comparison

| Feature | Array Stack | Linked List Stack |
|---------|-------------|-------------------|
| Push | O(1) amortized | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Memory | Less overhead | More (next pointer per node) |
| Cache | Friendly | Not friendly |
| Best for | General use | When predictable timing matters |

---

## In Simple Words

- Array stack = just `push` and `pop` on a JavaScript array. Fast and simple.
- Linked list stack = prepend nodes at the head. No resizing ever.
- Pick array for everyday code, linked list when you need guaranteed O(1) timing.
