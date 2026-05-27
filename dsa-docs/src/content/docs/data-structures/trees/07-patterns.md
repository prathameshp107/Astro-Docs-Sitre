---
title: "Important Tree Patterns"
description: "Key tree patterns — DFS recursion template, BFS level-order, height/diameter, LCA, path sum, and balanced tree checking."
sidebar:
  order: 7
---

# Important Tree Patterns

---

## DFS-Based Recursion Pattern

Most tree problems follow a clean recursive template:

```javascript
function dfs(node) {
  // Base case: handle null
  if (node === null) return baseValue;

  // Recurse on children
  const leftResult  = dfs(node.left);
  const rightResult = dfs(node.right);

  // Combine results and return
  return combine(node.val, leftResult, rightResult);
}
```

**The Three Questions to Ask:**
1. What does this function return for `null`?
2. What does it return for a leaf?
3. How do I combine left and right results?

---

## BFS / Level Order Pattern

```javascript
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const levelSize = queue.length;       // Fix current level's size
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
```

---

## Height / Depth Calculation

```
Height of a node = 1 + max(height(left), height(right))
Height of null   = 0 (or -1 depending on definition)
```

```javascript
function height(node) {
  if (node === null) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}
```

---

## Diameter of a Tree

The **diameter** is the longest path between any two nodes (may or may not pass through root).

```
         [1]
        /   \
      [2]   [3]
     /  \
   [4]  [5]

Diameter = path [4→2→5→1→3] or [4→2→1→3] = 4 edges
```

**Key insight**: At each node, the longest path through it = `height(left) + height(right)`.

```javascript
let maxDiameter = 0;

function diameterHelper(node) {
  if (node === null) return 0;
  const left  = diameterHelper(node.left);
  const right = diameterHelper(node.right);
  maxDiameter = Math.max(maxDiameter, left + right); // path through this node
  return 1 + Math.max(left, right);                  // height to return to parent
}
```

---

## Lowest Common Ancestor (LCA)

The **LCA** of two nodes `p` and `q` is the deepest node that has both `p` and `q` as descendants.

```
         [3]
        /   \
      [5]   [1]
     /  \  /  \
   [6] [2][0] [8]
      /  \
    [7]  [4]

LCA(5, 1) = 3
LCA(5, 4) = 5    (5 is an ancestor of 4)
LCA(6, 4) = 5
```

**LCA Logic:**
- If current node is `null`, return `null`.
- If current node is `p` or `q`, return current node.
- Recurse left and right.
- If both sides return non-null → current node is LCA.
- Otherwise return whichever side is non-null.

---

## Path Sum Problems

**Pattern**: Carry a running sum down the tree, checking at leaves.

```
Target = 22
         [5]
        /   \
      [4]   [8]
     /     /  \
   [11]  [13] [4]
   /  \         \
 [7]  [2]       [1]

Path: 5 → 4 → 11 → 2 = 22  ✅
```

```javascript
function hasPathSum(node, target) {
  if (node === null) return false;
  if (!node.left && !node.right) return node.val === target; // leaf check
  return hasPathSum(node.left,  target - node.val) ||
         hasPathSum(node.right, target - node.val);
}
```

---

## Balanced Tree Checking

A tree is **height-balanced** if for every node, `|height(left) - height(right)| <= 1`.

**Efficient approach**: Return `-1` as a sentinel for "unbalanced" during DFS.

```javascript
function checkBalanced(node) {
  if (node === null) return 0;

  const left  = checkBalanced(node.left);
  const right = checkBalanced(node.right);

  if (left === -1 || right === -1) return -1;         // propagate unbalanced
  if (Math.abs(left - right) > 1)  return -1;         // found imbalance

  return 1 + Math.max(left, right);                   // return height
}

function isBalanced(root) {
  return checkBalanced(root) !== -1;
}
```

---

## Tree to Graph Conversion

Sometimes you need to treat a tree as an **undirected graph** (e.g., "burn the tree from a node").

**Approach:**
1. Build an adjacency list (include parent → child AND child → parent links).
2. Use BFS/DFS with a `visited` set.

```javascript
function buildGraph(node, parent, graph) {
  if (!node) return;
  if (!graph.has(node.val)) graph.set(node.val, []);
  if (parent) {
    graph.get(node.val).push(parent.val);
    graph.get(parent.val).push(node.val);
  }
  buildGraph(node.left,  node, graph);
  buildGraph(node.right, node, graph);
}
```

---

## Pattern Quick Reference

| Problem Type | Pattern |
|-------------|---------|
| Height, depth, balanced | DFS returning height |
| Diameter, max path sum | DFS with global variable |
| Path sum, tree paths | DFS passing value downward |
| LCA | DFS returning found nodes |
| Level order, right view | BFS with level tracking |
| Serialize / deserialize | Preorder with null markers |
| Tree to undirected graph | Build adjacency list via DFS |

---

## Related

- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS algorithms
- [Code Examples](/DSA-Notes-Problems/data-structures/trees/11-code-examples) — Full implementations
- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/trees/10-problem-solving) — DFS vs BFS decision guide
