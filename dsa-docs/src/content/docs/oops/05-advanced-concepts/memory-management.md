---
title: "Memory Management"
description: "Understanding how memory is allocated and managed for objects in OOP."
sidebar:
  order: 6
---

# Memory Management

## Introduction

**Memory management** in OOP refers to how objects are allocated, accessed, and freed in memory. Understanding this helps developers write efficient code and avoid memory leaks.

---

## Stack vs Heap

| Aspect | Stack | Heap |
|--------|-------|------|
| **What lives here** | Primitive values, references | Objects |
| **Allocation** | Automatic | Manual (`new`) |
| **Deallocation** | When scope exits | Garbage collector |
| **Speed** | Fast | Slower |
| **Size** | Small (MB) | Large (GB) |

---

## References

Variables don't contain objects — they contain **references** to objects.

```javascript
let a = { value: 10 };
let b = a; // b REFERS to the same object as a

b.value = 20;
console.log(a.value); // 20 — a and b reference same object

a = { value: 30 };
console.log(b.value); // 20 — b still points to original
```

---

## Garbage Collection

**Garbage Collection (GC)** is the automatic process of reclaiming memory occupied by objects that are no longer reachable.

### Mark and Sweep Algorithm

1. **Mark** — GC starts from roots (global variables, stack references) and marks all reachable objects
2. **Sweep** — Unmarked (unreachable) objects are freed

---

## Common Memory Leaks

```javascript
// 1. Forgotten timers
setInterval(() => { /* holds references */ }, 1000);

// 2. Event listeners not removed
element.addEventListener("click", () => { /* holds reference */ });

// 3. Closures holding large data
function createLeak() {
  const largeData = new Array(1000000);
  return () => console.log(largeData.length);
}
```

---

## Best Practices

- **Nullify references** when done with large objects
- **Remove event listeners** when components are destroyed
- **Clear timers/intervals** (`clearInterval`, `clearTimeout`)
- **Use weak references** for caches (`WeakMap`, `WeakSet`)

---

**Previous Topic:** [Object Lifecycle →](/DSA-Notes-Problems/oops/05-advanced-concepts/object-lifecycle)
**Next Topic:** [Design Principles →](/DSA-Notes-Problems/oops/06-design-principles/)
