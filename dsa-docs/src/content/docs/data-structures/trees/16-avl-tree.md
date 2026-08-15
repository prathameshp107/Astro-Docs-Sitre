---
title: "AVL Tree (Self-Balancing BST)"
description: "A self-balancing binary search tree where the heights of left and right subtrees differ by at most 1."
sidebar:
  order: 16
practice:
  visualizer: /visualizer/trees
---

# AVL Tree

> An **AVL tree** is a self-balancing **Binary Search Tree** (BST). It ensures the height difference between left and right subtrees (called **balance factor**) is never more than 1.

---

## Balance Factor

```
balanceFactor = height(left) - height(right)

Allowed: -1, 0, 1
If balanceFactor goes below -1 or above 1 → rotate to fix!
```

```mermaid
flowchart TB
    subgraph Balanced["✅ Balanced: BF = 0"]
        B1["10"] --> B2["5"]
        B1 --> B3["15"]
    end

    subgraph Imbalanced["❌ Unbalanced: BF = 2"]
        I1["10"] --> I2["5"]
        I1 --> I3["null"]
        I2 --> I4["2"]
        I2 --> I5["7"]
        I4 --> I6["1"]
        I4 --> I7["3"]
    end

    subgraph AfterRotate["✅ After Right Rotation"]
        R1["5"] --> R2["2"]
        R1 --> R3["10"]
        R2 --> R4["1"]
        R2 --> R5["3"]
        R3 --> R6["7"]
        R3 --> R7["null"]
    end

    style B1 fill:#059669,color:#fff
    style B2 fill:#059669,color:#fff
    style B3 fill:#059669,color:#fff
    style I1 fill:#dc2626,color:#fff
    style R1 fill:#7c3aed,color:#fff
    style R2 fill:#4f46e5,color:#fff
    style R3 fill:#4f46e5,color:#fff
```

---

## Rotations

There are four types of rotations to rebalance:

| Case | Description | Rotation |
|------|-------------|----------|
| **Left-Left** | Unbalanced to the left | Right rotate |
| **Right-Right** | Unbalanced to the right | Left rotate |
| **Left-Right** | Left child has right-heavy subtree | Left→Right rotate |
| **Right-Left** | Right child has left-heavy subtree | Right→Left rotate |

```javascript
// Right rotation (fixes Left-Left case)
function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;

  x.right = y;
  y.left = T2;

  // Update heights
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;

  return x; // new root
}

// Left rotation (fixes Right-Right case)
function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;

  return y;
}
```

---

## Operations

| Operation | BST | AVL |
|-----------|:---:|:---:|
| Search | O(H) | **O(log N)** |
| Insert | O(H) | **O(log N)** |
| Delete | O(H) | **O(log N)** |

Where H could be N in a skewed BST. AVL guarantees **H = O(log N)**.

---

## In Simple Words

- AVL = BST that stays balanced after every insert/delete.
- Balance Factor = height(left) - height(right). Must be -1, 0, or 1.
- When unbalanced → rotate (one or two rotations fix it).
- Search is always O(log N) — no worst-case O(N) like a plain BST.
