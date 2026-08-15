---
title: "Problem-Solving Approach"
description: "How to approach tree problems — DFS vs BFS decisions, recursive thinking patterns, and edge cases."
sidebar:
  order: 10
practice:
  visualizer: /visualizer/trees
---

# Problem-Solving Approach

---

## How to Identify Tree Problems

Look for these keywords in problem statements:
- "Binary tree", "BST", "root", "leaves", "path"
- "Ancestor", "descendant", "subtree"
- "Level", "depth", "height", "width"
- "Maximum/minimum path", "diameter"

---

## When to Use DFS vs BFS

| Use DFS When...                               | Use BFS When...                             |
|-----------------------------------------------|---------------------------------------------|
| Computing height/depth                         | Level-by-level processing                   |
| Path sum / root-to-leaf paths                  | Finding shortest path                       |
| Subtree problems (is mirror, same tree, etc.)  | Right/left view of tree                     |
| LCA, diameter, balanced checks                 | Zigzag traversal, level averages            |
| Tree serialization/deserialization             | Connect next pointers level-by-level        |

---

## Recursive Thinking Patterns

There are 3 types of recursive approaches for trees:

### Pattern 1: Return a value (bottom-up)
```
→ Compute something at each node using children's results
→ Example: height, diameter, path sums
```

### Pattern 2: Pass a value down (top-down)
```
→ Carry information from parent to children
→ Example: path sum (carry remaining target down)
```

### Pattern 3: Use external state (global variable)
```
→ Maintain a result variable outside recursion, update inside
→ Example: diameter, max path sum
```

---

## Edge Cases to Always Consider

| Edge Case                 | What to check                                               |
|---------------------------|-------------------------------------------------------------|
| `root === null`           | Handle empty tree; return appropriate default (0, [], null) |
| Single node tree          | Leaf node is both root, left, and right boundary           |
| Skewed tree (all left or right) | Don't assume O(log N) depth; stack may overflow       |
| Negative values in nodes  | Path sum with all negatives; don't discard negative paths   |
| Duplicate values in BST   | Clarify how duplicates are handled (left or right subtree)  |
| Integer overflow           | Sum of path may exceed `Number.MAX_SAFE_INTEGER` in JS      |

---

## Common Technique Combinations

Hard problems often combine multiple basic techniques:

```
"Max Path Sum"       = DFS returning gain + global max tracking
"Serialize/Deserialize" = Preorder + Queue reconstruction
"Cameras on Tree"    = Greedy postorder with state propagation
"Vertical Order"     = BFS + sort by (col, row, val)
```

---

## Related

- [Important Patterns](/DSA-Notes-Problems/data-structures/trees/07-patterns) — Key tree patterns
- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS
- [Tips & Common Mistakes](/DSA-Notes-Problems/data-structures/trees/13-tips) — Avoid common pitfalls
