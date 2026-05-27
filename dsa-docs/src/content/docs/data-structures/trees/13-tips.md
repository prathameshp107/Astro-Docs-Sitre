---
title: "Tips & Common Mistakes"
description: "Expert tips, common mistakes, and edge cases for tree data structure problems."
sidebar:
  order: 13
---

# Tips and Common Mistakes

---

## Recursive Mistakes

| Mistake | Why it's bad | How to avoid |
|---------|-------------|--------------|
| ❌ **Forgetting the base case** for `null` | Causes null reference errors | Always start: `if (node === null) return ...` |
| ❌ **Wrong return type from recursion** | Returning `void` when you need a value | Be explicit: decide what each recursive call should return |
| ❌ **Modifying shared state incorrectly** | Mutating an array/path without backtracking | Remember to `pop()` after recursive call in path-tracking problems |
| ❌ **Recomputing height twice** | Causes O(N²) instead of O(N) | Return height from the recursive function itself; compute once |

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

## Design Mistakes

| Mistake | Fix |
|---------|-----|
| ❌ Using `queue.shift()` for BFS in JavaScript (O(N) per operation!) | Use a proper queue (two-stack or pointer trick) for performance-critical code. For interviews, `shift()` is usually acceptable; clarify. |
| ❌ Confusing `height` (edges) vs `depth` (edges from root) | Know which definition the problem uses |
| ❌ Assuming a BST is always balanced | It may be skewed! Test worst-case scenarios |
| ❌ Not handling `null` children in traversal | Always check for `null` before accessing `node.left` or `node.right` |

---

## ✅ Pro Tips

- 📝 **Draw the tree on paper** before coding. Trace your algorithm step by step.

- 🧪 **Test 4 cases**: `null`, single node, two nodes, normal tree.

- 🪄 **Use sentinel values** like `-Infinity` for range validation in BST problems.

- 🧩 **Combine techniques**: Hard problems = "find height" + "return additional state".

- 🔄 **Return multiple values** from recursion when needed (e.g., both height AND balanced status).

- 🌲 **Think recursively**: Every subtree is itself a valid tree — if you solve for the root, you've solved for all nodes.

---

## Final Mental Model

> A tree is just a **root node** connected to smaller trees (subtrees).
>
> - To **traverse**, handle the root, then let recursion handle the subtrees.
> - To **compute a property** (height, sum, etc.), compute for children, combine at root.
> - To **modify the tree**, return the new subtree root from recursion — parent will reconnect.
>
> Master the base case (`null`), and everything else follows naturally.

---

## Related

- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/trees/10-problem-solving) — DFS vs BFS decision guide
- [Important Patterns](/DSA-Notes-Problems/data-structures/trees/07-patterns) — Key tree patterns
- [Code Examples](/DSA-Notes-Problems/data-structures/trees/11-code-examples) — Full implementations
