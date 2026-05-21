# 🌳 Tree Data Structures — Comprehensive Interview Guide

> A complete, beginner-to-advanced reference for mastering Tree Data Structures in coding interviews and beyond.

---

## Table of Contents

1. [Introduction to Trees](#1-introduction-to-trees)
2. [Types of Trees](#2-types-of-trees)
3. [Tree Representation](#3-tree-representation)
4. [Time and Space Complexity](#4-time-and-space-complexity)
5. [Tree Traversal Algorithms](#5-tree-traversal-algorithms)
6. [Important Tree Patterns](#6-important-tree-patterns)
7. [Key Algorithms on Trees](#7-key-algorithms-on-trees)
8. [Problem-Solving Approach](#8-problem-solving-approach)
9. [Code Examples (JavaScript)](#9-code-examples-javascript)
10. [Must-Do Interview Questions](#10-must-do-interview-questions)
11. [Tips and Common Mistakes](#11-tips-and-common-mistakes)
12. [Real-World Applications](#12-real-world-applications)

---

## 1. Introduction to Trees

### What is a Tree?

A **tree** is a hierarchical, non-linear data structure that consists of **nodes** connected by **edges**. Unlike arrays or linked lists (which are linear), trees branch out — making them ideal for representing hierarchies, relationships, and sorted data.

> **Key insight**: A tree with `N` nodes always has exactly `N - 1` edges.

```
           [1]          ← Root
          /   \
        [2]   [3]       ← Internal Nodes
       /  \      \
     [4]  [5]   [6]     ← Leaf Nodes
```

---

### Terminologies

| Term          | Definition                                                                 |
|---------------|----------------------------------------------------------------------------|
| **Node**      | A basic unit containing data and references to children                    |
| **Root**      | The topmost node with no parent (node `1` above)                          |
| **Parent**    | A node that has one or more children (`2` is parent of `4` and `5`)        |
| **Child**     | A node that has a parent (`4` and `5` are children of `2`)                 |
| **Leaf**      | A node with no children (`4`, `5`, `6` above)                              |
| **Edge**      | The connection/link between two nodes                                       |
| **Subtree**   | A node and all its descendants form a subtree                              |
| **Height**    | Longest path from a node down to a leaf (height of root = height of tree)  |
| **Depth**     | Distance from the root to a given node                                     |
| **Level**     | Level = Depth + 1 (root is at level 1)                                     |
| **Degree**    | Number of children a node has                                               |

#### Height vs Depth — Visual Clarification

```
           [A]   ← Depth=0, Height=2
           / \
         [B] [C] ← Depth=1, Height=1 (B), Height=0 (C, leaf)
         /
       [D]        ← Depth=2, Height=0 (leaf)
```

- **Height of node B** = 1 (one edge down to leaf D)
- **Depth of node D** = 2 (two edges from root A)
- **Height of tree** = Height of root = 2

---

### Properties of Trees

1. There is **exactly one root** node.
2. Every non-root node has **exactly one parent**.
3. Trees are **acyclic** — no cycles possible.
4. Any two nodes are connected by **exactly one path**.
5. A tree with `N` nodes has exactly `N - 1` edges.
6. Each node's **subtree** is itself a valid tree (enables recursion).

---

## 2. Types of Trees

### 2.1 Binary Tree

A tree where each node has **at most 2 children**: left and right.

```
         [10]
        /    \
      [5]    [15]
     /  \
   [3]  [7]
```

- Most common type in interviews
- Foundation for BST, Heaps, Segment Trees

---

### 2.2 Binary Search Tree (BST)

A Binary Tree with the **BST Property**:
> For every node N: all values in the **left subtree < N**, all values in the **right subtree > N**

```
         [8]
        /   \
      [3]   [10]
     /  \      \
   [1]  [6]   [14]
       /  \   /
     [4] [7] [13]
```

**BST Invariant**: Inorder traversal of a BST always gives a **sorted sequence**.
- `1, 3, 4, 6, 7, 8, 10, 13, 14` ← sorted!

---

### 2.3 Balanced Trees

#### AVL Tree
- A self-balancing BST where the **height difference** between left and right subtrees of any node is **at most 1**.
- This difference is called the **Balance Factor** = `height(left) - height(right)`.
- Balance Factor must be in `{-1, 0, 1}` for every node.
- On insert/delete, **rotations** (LL, RR, LR, RL) are performed to restore balance.
- **Height**: O(log N) guaranteed.

```
      [30]        BF = 1-0 = 1  ✅
      /
    [20]          BF = 1-0 = 1  ✅
    /
  [10]            BF = 0       ✅
```

If we insert `[5]` without rebalancing:
```
      [30]        BF = 3  ❌  → Trigger LL Rotation
      /
    [20]
    /
  [10]
  /
[5]
```

#### Red-Black Tree
- A self-balancing BST with color-based rules (each node is RED or BLACK).
- **Rules**:
  1. Every node is Red or Black.
  2. Root is always Black.
  3. No two consecutive Red nodes (Red's children must be Black).
  4. Every path from root to NULL leaf has the same number of Black nodes.
- Looser balancing than AVL → **faster insertions/deletions** (fewer rotations).
- Used internally by: `std::map` in C++, `TreeMap` in Java, Linux scheduler.

---

### 2.4 Full, Complete, and Perfect Binary Trees

#### Full Binary Tree
> Every node has **0 or 2 children** (never 1).

```
         [1]
        /   \
      [2]   [3]
     /  \
   [4]  [5]
```

#### Complete Binary Tree
> All levels are **fully filled except possibly the last**, which is filled **from left to right**.

```
         [1]
        /   \
      [2]   [3]
     /  \   /
   [4] [5] [6]     ← last level fills left to right ✅
```

- **Heaps** are always complete binary trees.

#### Perfect Binary Tree
> All internal nodes have **exactly 2 children** and all leaves are at the **same level**.

```
         [1]
        /   \
      [2]   [3]
     /  \ /  \
   [4][5][6]  [7]
```

- A perfect binary tree with height `h` has `2^(h+1) - 1` nodes.

---

### 2.5 Skewed Trees

A tree where every node has **only one child** — essentially degenerates into a linked list.

```
Left-Skewed:          Right-Skewed:
   [10]                  [10]
   /                        \
 [8]                        [15]
 /                              \
[5]                             [20]
```

- Worst case for BST operations: O(N) instead of O(log N)
- Avoided using balanced trees (AVL, Red-Black)

---

### 2.6 N-ary Trees

A tree where each node can have **at most N children** (N can be any number).

```
           [1]
         / | \
       [2][3][4]
      / \
    [5] [6]
```

- File systems use N-ary trees (directories with many subdirectories)
- Represented with a list of children per node

---

### 2.7 Trie (Prefix Tree)

A tree used for **storing strings** where each node represents a character. Commonly used for autocomplete.

```
Inserting: "cat", "car", "card", "care", "bat"

           root
          /    \
        [c]    [b]
         |      |
        [a]    [a]
       /   \    |
     [t]  [r]  [t]
           |
          [d]  [e]
```

- Each root-to-leaf path represents a word.
- `isEndOfWord` flag marks complete words.
- **Search/Insert**: O(L) where L = length of the string.

---

### 2.8 Heap (Min Heap & Max Heap)

A **Complete Binary Tree** satisfying the **Heap Property**:

#### Max Heap
> Parent is always **greater than or equal to** its children.

```
         [50]
        /    \
      [30]  [40]
     /   \  /
   [10] [20][35]
```

#### Min Heap
> Parent is always **less than or equal to** its children.

```
         [10]
        /    \
      [20]  [15]
     /   \
   [40] [50]
```

- Root of Min Heap = minimum element.
- Root of Max Heap = maximum element.
- Used in: Priority Queues, Dijkstra's Algorithm, Heap Sort.

---

### 2.9 Segment Tree (Basic Overview)

A tree used to answer **range queries** efficiently (e.g., range sum, range minimum).

```
Array: [1, 3, 5, 7, 9, 11]

Segment Tree (Sum):
             [36]        (sum of [0..5])
            /    \
         [9]     [27]    ([0..2], [3..5])
        /   \   /   \
      [4] [5] [16] [11]  ([0..1],[2..2],[3..4],[5..5])
      / \
    [1] [3]
```

- **Build**: O(N)
- **Query**: O(log N)
- **Update**: O(log N)

---

## 3. Tree Representation

### 3.1 Pointer-Based Representation

The most natural way — each node holds data and pointers to children.

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Building a tree manually:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
```

**Pros**: Dynamic size, easy insertion/deletion, natural for recursion.  
**Cons**: Extra memory for pointers (~2 pointers per node for binary tree).

---

### 3.2 Array-Based Representation (Heap)

A **Complete Binary Tree** can be stored in an array using index math:

```
         [1]           Index: 0
        /   \
      [2]   [3]        Index: 1, 2
     /  \  /  \
   [4] [5][6] [7]      Index: 3, 4, 5, 6

Array: [1, 2, 3, 4, 5, 6, 7]
       [0, 1, 2, 3, 4, 5, 6]
```

**Index Formulas** (0-indexed):

| Relation      | Formula             |
|---------------|---------------------|
| Left child    | `2 * i + 1`         |
| Right child   | `2 * i + 2`         |
| Parent        | `Math.floor((i-1)/2)` |

**Pros**: No pointer overhead, cache-friendly, simple math-based navigation.  
**Cons**: Works best for complete/perfect trees; wastes space for sparse trees.

---

## 4. Time and Space Complexity

### Traversal Complexities

| Operation        | Time Complexity | Space Complexity          |
|------------------|-----------------|---------------------------|
| Any DFS Traversal | O(N)           | O(H) — call stack (H = height) |
| BFS (Level Order) | O(N)           | O(W) — W = max width of tree   |

- Best case (balanced): Space = O(log N)
- Worst case (skewed): Space = O(N)

---

### BST Operations

| Operation | Average (Balanced) | Worst (Skewed) |
|-----------|--------------------|----------------|
| Search    | O(log N)           | O(N)           |
| Insert    | O(log N)           | O(N)           |
| Delete    | O(log N)           | O(N)           |

---

### Balanced Tree Operations (AVL / Red-Black)

| Operation | Time Complexity | Notes                          |
|-----------|-----------------|--------------------------------|
| Search    | O(log N)        | Guaranteed due to balance       |
| Insert    | O(log N)        | Plus O(log N) rotations         |
| Delete    | O(log N)        | Plus O(log N) rotations         |

---

### Heap Operations

| Operation     | Time Complexity | Notes                           |
|---------------|-----------------|---------------------------------|
| Insert        | O(log N)        | Bubble up (sift up)              |
| Delete Min/Max| O(log N)        | Heapify down (sift down)         |
| Peek Min/Max  | O(1)            | Root always holds min/max        |
| Build Heap    | O(N)            | Not O(N log N) — mathematical proof |

---

## 5. Tree Traversal Algorithms

There are two fundamental ways to traverse a tree: **DFS** (goes deep first) and **BFS** (goes wide first).

---

### 5.1 Depth First Search (DFS)

DFS explores a branch fully before backtracking. There are three DFS orders:

#### Inorder Traversal (Left → Root → Right)

```
Tree:
         [4]
        /   \
      [2]   [6]
     /  \  /  \
   [1] [3][5] [7]

Step-by-step:
1. Go left all the way: 1
2. Visit root: 2
3. Go right: 3
4. Back up, visit: 4
5. Go left of right: 5
6. Visit: 6
7. Go right: 7

Inorder Output: 1 → 2 → 3 → 4 → 5 → 6 → 7  (SORTED for BST!)
```

#### Preorder Traversal (Root → Left → Right)

```
Same Tree:

Step-by-step:
1. Visit root: 4
2. Go left, visit: 2
3. Go left of 2, visit: 1
4. Backtrack, go right of 2, visit: 3
5. Backtrack to root, go right, visit: 6
6. Go left of 6, visit: 5
7. Go right of 6, visit: 7

Preorder Output: 4 → 2 → 1 → 3 → 6 → 5 → 7
```

> Use case: **Copying/serializing a tree**, **Expression trees** (prefix notation)

#### Postorder Traversal (Left → Right → Root)

```
Same Tree:

Step-by-step:
1. Go left all the way, leaf: 1
2. Go right of 2, leaf: 3
3. Visit parent of 1 and 3: 2
4. Go right subtree, left: 5
5. Right: 7
6. Visit: 6
7. Visit root last: 4

Postorder Output: 1 → 3 → 2 → 5 → 7 → 6 → 4
```

> Use case: **Deleting a tree**, **Evaluating expression trees**, **Directory size calculation**

---

### 5.2 Breadth First Search (Level Order Traversal)

Visit all nodes **level by level**, from left to right. Uses a **Queue**.

```
Tree:
         [1]
        /   \
      [2]   [3]
     /  \      \
   [4]  [5]   [6]

Step-by-step:
Queue: [1]
→ Dequeue 1, enqueue children [2, 3]       → Output: 1
→ Dequeue 2, enqueue children [4, 5]       → Output: 2
→ Dequeue 3, enqueue children [6]          → Output: 3
→ Dequeue 4, no children                   → Output: 4
→ Dequeue 5, no children                   → Output: 5
→ Dequeue 6, no children                   → Output: 6

Level Order Output: 1 → 2 → 3 → 4 → 5 → 6
```

---

## 6. Important Tree Patterns

### 6.1 DFS-Based Recursion Pattern

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

### 6.2 BFS / Level Order Pattern

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

> **Key trick**: Capture `queue.length` at the start of each iteration to process one full level at a time.

---

### 6.3 Height / Depth Calculation

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

### 6.4 Diameter of a Tree

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

### 6.5 Lowest Common Ancestor (LCA)

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

**LCA Logic**:
- If current node is `null`, return `null`.
- If current node is `p` or `q`, return current node.
- Recurse left and right.
- If both sides return non-null → current node is LCA.
- Otherwise return whichever side is non-null.

---

### 6.6 Path Sum Problems

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

### 6.7 Balanced Tree Checking

A tree is **height-balanced** if for every node, `|height(left) - height(right)| <= 1`.

**Efficient approach**: Return -1 as a sentinel for "unbalanced" during DFS.

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

### 6.8 Tree to Graph Conversion

Sometimes you need to treat a tree as an **undirected graph** (e.g., "burn the tree from a node").

**Approach**:
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

## 7. Key Algorithms on Trees

### 7.1 BST Operations

#### Search
```
Search 6 in BST:
         [8]
        /   \
      [3]   [10]
     /  \
   [1]  [6]  ← Found!

Steps: 6 < 8 → go left → 6 > 3 → go right → found 6
```

#### Insert
- Follow the search path; insert at the first `null` position.
- Always inserted as a **leaf node**.

```
Insert 5:
Before:              After:
  [8]                  [8]
 /   \                /   \
[3] [10]           [3]  [10]
   \               /  \
   [6]           [1]  [6]
                      /
                    [5]  ← inserted here
```

#### Delete (3 Cases)

| Case                | Action                                             |
|---------------------|----------------------------------------------------|
| Node is a leaf      | Simply remove it                                   |
| Node has 1 child    | Replace node with its child                        |
| Node has 2 children | Replace with **inorder successor** (smallest in right subtree), then delete that successor |

---

### 7.2 Tree Balancing (Conceptual)

**AVL Rotations** restore balance after insert/delete:

```
LL Case (Right Rotation):        RR Case (Left Rotation):
    [30]                              [10]
    /                                    \
  [20]          →    [20]              [20]     →    [20]
  /                 /    \                \           /   \
[10]             [10]  [30]             [30]       [10]  [30]
```

**LR and RL cases** combine two rotations (Left-Right, Right-Left).

---

### 7.3 Heap Operations

#### Insert (Sift Up)
1. Add element at the **end** of the array (last position in complete tree).
2. **Bubble up**: Compare with parent; swap if heap property is violated.
3. Repeat until heap property is satisfied.

#### Delete Min/Max (Sift Down)
1. Remove the **root** (min or max).
2. Replace root with the **last element** in the array.
3. **Sift down**: Compare with children; swap with the appropriate child.
4. Repeat until heap property is satisfied.

#### Heapify (Build Heap from Array) — O(N)
- Start from the last non-leaf node: index `Math.floor(N/2) - 1`
- Call sift-down on each node going backward to the root.

---

## 8. Problem-Solving Approach

### How to Identify Tree Problems

Look for these keywords in problem statements:
- "Binary tree", "BST", "root", "leaves", "path"
- "Ancestor", "descendant", "subtree"
- "Level", "depth", "height", "width"
- "Maximum/minimum path", "diameter"

---

### When to Use DFS vs BFS

| Use DFS When...                               | Use BFS When...                             |
|-----------------------------------------------|---------------------------------------------|
| Computing height/depth                         | Level-by-level processing                   |
| Path sum / root-to-leaf paths                  | Finding shortest path                       |
| Subtree problems (is mirror, same tree, etc.)  | Right/left view of tree                     |
| LCA, diameter, balanced checks                 | Zigzag traversal, level averages            |
| Tree serialization/deserialization             | Connect next pointers level-by-level        |

---

### Recursive Thinking Patterns

There are 3 types of recursive approaches for trees:

#### Pattern 1: Return a value (bottom-up)
```
→ Compute something at each node using children's results
→ Example: height, diameter, path sums
```

#### Pattern 2: Pass a value down (top-down)
```
→ Carry information from parent to children
→ Example: path sum (carry remaining target down)
```

#### Pattern 3: Use external state (global variable)
```
→ Maintain a result variable outside recursion, update inside
→ Example: diameter, max path sum
```

---

## 9. Code Examples (JavaScript)

### 9.1 Tree Node Implementation

```javascript
class TreeNode {
  constructor(val) {
    this.val   = val;
    this.left  = null;
    this.right = null;
  }
}

// Helper to build tree from array (LeetCode-style)
// null means missing node
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Usage:
// buildTree([4, 2, 6, 1, 3, 5, 7])
// builds:
//      [4]
//     /   \
//   [2]   [6]
//  /  \  /  \
// [1][3][5] [7]
```

---

### 9.2 DFS Traversals

```javascript
// Inorder (Left → Root → Right)
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// Preorder (Root → Left → Right)
function preorder(root, result = []) {
  if (root === null) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// Postorder (Left → Right → Root)
function postorder(root, result = []) {
  if (root === null) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

// Iterative Inorder (using explicit stack — useful to know!)
function inorderIterative(root) {
  const result = [];
  const stack  = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {       // Go as left as possible
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();           // Visit node
    result.push(curr.val);
    curr = curr.right;            // Move to right subtree
  }
  return result;
}
```

---

### 9.3 BFS Traversal

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue  = [root];

  while (queue.length > 0) {
    const levelSize    = queue.length;  // Number of nodes at current level
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

// Example Output for [1, 2, 3, 4, 5]:
// [ [1], [2, 3], [4, 5] ]
```

---

### 9.4 BST Operations

```javascript
class BST {
  constructor() {
    this.root = null;
  }

  // Insert a value
  insert(val) {
    this.root = this._insertRec(this.root, val);
  }

  _insertRec(node, val) {
    if (node === null) return new TreeNode(val);
    if (val < node.val)      node.left  = this._insertRec(node.left,  val);
    else if (val > node.val) node.right = this._insertRec(node.right, val);
    return node; // val === node.val: duplicate, ignore
  }

  // Search for a value
  search(val) {
    return this._searchRec(this.root, val);
  }

  _searchRec(node, val) {
    if (node === null) return false;
    if (val === node.val) return true;
    if (val < node.val) return this._searchRec(node.left,  val);
    else                return this._searchRec(node.right, val);
  }

  // Delete a value
  delete(val) {
    this.root = this._deleteRec(this.root, val);
  }

  _deleteRec(node, val) {
    if (node === null) return null;

    if (val < node.val) {
      node.left  = this._deleteRec(node.left,  val);
    } else if (val > node.val) {
      node.right = this._deleteRec(node.right, val);
    } else {
      // Case 1: Leaf node
      if (!node.left && !node.right) return null;

      // Case 2: One child
      if (!node.left)  return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children → find inorder successor
      const successor = this._findMin(node.right);
      node.val   = successor.val;                          // Copy successor value
      node.right = this._deleteRec(node.right, successor.val); // Delete successor
    }
    return node;
  }

  _findMin(node) {
    while (node.left !== null) node = node.left;
    return node;
  }
}
```

---

### 9.5 LCA Implementation

```javascript
// LCA in a Binary Tree (not necessarily BST)
function lowestCommonAncestor(root, p, q) {
  // Base case: null or found one of the targets
  if (root === null || root === p || root === q) return root;

  const left  = lowestCommonAncestor(root.left,  p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // Both sides found something → this node is LCA
  if (left !== null && right !== null) return root;

  // One side found something → propagate it up
  return left !== null ? left : right;
}

// LCA in a BST (more efficient using BST property)
function lcaBST(root, p, q) {
  if (root === null) return null;

  // Both nodes are in the left subtree
  if (p.val < root.val && q.val < root.val)
    return lcaBST(root.left, p, q);

  // Both nodes are in the right subtree
  if (p.val > root.val && q.val > root.val)
    return lcaBST(root.right, p, q);

  // Split point → current node is LCA
  return root;
}
```

---

### 9.6 Sample Problem Solutions

#### Problem 1: Maximum Depth of Binary Tree (Easy)

```javascript
// Approach: DFS — return 1 + max of children's depths
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(N), Space: O(H)
```

#### Problem 2: Validate BST (Medium)

```javascript
// Approach: Pass valid [min, max] range down the tree
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  if (root.val <= min || root.val >= max) return false;

  return isValidBST(root.left,  min,      root.val) &&
         isValidBST(root.right, root.val, max);
}
// Time: O(N), Space: O(H)
```

#### Problem 3: Binary Tree Maximum Path Sum (Hard)

```javascript
// Path can start and end at any node; must contain at least one node.
let maxSum;

function maxPathSum(root) {
  maxSum = -Infinity;
  gainFromNode(root);
  return maxSum;
}

function gainFromNode(node) {
  if (node === null) return 0;

  // Only take positive contributions from children
  const leftGain  = Math.max(gainFromNode(node.left),  0);
  const rightGain = Math.max(gainFromNode(node.right), 0);

  // Price of the path through this node
  const pathThroughNode = node.val + leftGain + rightGain;
  maxSum = Math.max(maxSum, pathThroughNode);

  // Return max gain if continuing upward (can only choose one branch)
  return node.val + Math.max(leftGain, rightGain);
}
// Time: O(N), Space: O(H)
```

#### Problem 4: Serialize and Deserialize Binary Tree (Hard)

```javascript
// Serialize: preorder traversal with "null" markers
function serialize(root) {
  if (root === null) return 'null,';
  return root.val + ',' + serialize(root.left) + serialize(root.right);
}

function deserialize(data) {
  const nodes = data.split(',');
  let index = 0;

  function buildTree() {
    if (nodes[index] === 'null') { index++; return null; }
    const node = new TreeNode(parseInt(nodes[index++]));
    node.left  = buildTree();
    node.right = buildTree();
    return node;
  }

  return buildTree();
}
// Time: O(N), Space: O(N)
```

---

## 10. Must-Do Interview Questions

### 🟢 Easy

| # | Problem Name                          | Key Idea                                          |
|---|---------------------------------------|---------------------------------------------------|
| 1 | Maximum Depth of Binary Tree          | DFS height calculation                            |
| 2 | Invert Binary Tree                    | Swap left and right at each node                  |
| 3 | Symmetric Tree                        | Compare left and right subtrees mirror-wise       |
| 4 | Path Sum                              | Reduce target as you recurse down                 |
| 5 | Same Tree                             | Compare node values recursively                   |
| 6 | Merge Two Binary Trees                | Add values at overlapping nodes                   |
| 7 | Search in a BST                       | Use BST property to guide direction               |
| 8 | Range Sum of BST                      | DFS, only traverse within valid range             |

---

### 🟡 Medium

| #  | Problem Name                          | Key Idea                                              |
|----|---------------------------------------|-------------------------------------------------------|
| 1  | Binary Tree Level Order Traversal     | BFS with level-size tracking                         |
| 2  | Validate Binary Search Tree           | Pass min/max bounds down                             |
| 3  | Construct BST from Preorder           | Recursively split using BST property                 |
| 4  | Kth Smallest Element in BST           | Inorder traversal (gives sorted order)               |
| 5  | Binary Tree Right Side View           | BFS, take last node of each level                    |
| 6  | Diameter of Binary Tree               | Track left height + right height at each node        |
| 7  | Lowest Common Ancestor (Binary Tree)  | Return node if found; merge at split point           |
| 8  | Count Good Nodes in Binary Tree       | Pass max value seen so far down                      |
| 9  | Path Sum II (all paths)               | Backtracking: add to path, recurse, then pop         |
| 10 | Flatten Binary Tree to Linked List    | Preorder traversal; wire right pointers              |
| 11 | Populating Next Right Pointers        | BFS level-order                                      |
| 12 | Convert Sorted Array to BST           | Pick middle as root, recurse on halves               |

---

### 🔴 Hard

| # | Problem Name                            | Key Idea                                                  |
|---|-----------------------------------------|-----------------------------------------------------------|
| 1 | Binary Tree Maximum Path Sum            | Global max; return max single-branch gain upward          |
| 2 | Serialize and Deserialize Binary Tree   | Preorder with null markers                                |
| 3 | Binary Tree Cameras                     | Greedy postorder; place camera at parent of uncovered leaf|
| 4 | Recover Binary Search Tree              | Find two swapped nodes via inorder; swap their values     |
| 5 | Count of Smaller Numbers After Self     | BST/Fenwick tree; insert right-to-left                    |
| 6 | Vertical Order Traversal               | BFS + sort by (col, row, val)                             |

---

## 11. Tips and Common Mistakes

### Recursive Mistakes

- ❌ **Forgetting the base case** for `null` → causes null reference errors.
  - ✅ Always start: `if (node === null) return ...`

- ❌ **Wrong return type from recursion** — e.g., returning `void` when you need a value.
  - ✅ Be explicit: decide what each recursive call should return.

- ❌ **Modifying shared state incorrectly** — mutating an array/path without backtracking.
  - ✅ Remember to `pop()` after recursive call in path-tracking problems.

- ❌ **Recomputing height twice** (once for left, once for right) — causing O(N²) instead of O(N).
  - ✅ Return height from the recursive function itself; compute once.

---

### Edge Cases to Always Consider

| Edge Case                 | What to check                                               |
|---------------------------|-------------------------------------------------------------|
| `root === null`           | Handle empty tree; return appropriate default (0, [], null) |
| Single node tree          | Leaf node is both root, left, and right boundary           |
| Skewed tree (all left or right) | Don't assume O(log N) depth; stack may overflow       |
| Negative values in nodes  | Path sum with all negatives; don't discard negative paths   |
| Duplicate values in BST   | Clarify how duplicates are handled (left or right subtree)  |
| Integer overflow           | Sum of path may exceed `Number.MAX_SAFE_INTEGER` in JS      |

---

### Design Mistakes

- ❌ Using `queue.shift()` for BFS in JavaScript — it's O(N) per operation!
  - ✅ Use a proper queue (two-stack or pointer trick) for performance-critical code.
  - For interviews, `shift()` is usually acceptable; clarify.

- ❌ Confusing `height` (edges) vs `depth` (edges from root) — know which definition the problem uses.

- ❌ Assuming a BST is always balanced — it may be skewed!

---

## 12. Real-World Applications

### 🗂️ File Systems

Operating systems represent file/directory structures as **N-ary trees**:

```
/home/
├── user/
│   ├── documents/
│   │   ├── resume.pdf
│   │   └── notes.txt
│   └── downloads/
└── shared/
```

- Each directory is a node; files are leaves.
- DFS is used for `du` (disk usage), `find` command, antivirus scans.
- BFS is used for file search at shallowest level first.

---

### 🗄️ Databases (Indexing)

Databases use **B-Trees** and **B+ Trees** (generalized balanced BSTs) for indexing:

- **B+ Trees** power indexes in MySQL, PostgreSQL, SQLite.
- Nodes contain multiple keys (to fit disk pages of ~4KB).
- All data is in leaf nodes; internal nodes are just keys for routing.
- Guarantees O(log N) search, insert, delete even for billions of records.
- Sequential scans are fast because leaf nodes are **linked**.

---

### 🔍 Autocomplete (Trie)

Search engines, IDEs, and keyboard apps use **Tries**:

- Typing "app" traverses root → 'a' → 'p' → 'p'
- All words under that node are candidates: "apple", "application", "apply"
- **Advantages over HashMap**: Common prefix sharing saves memory; range queries are natural.
- Extension: **Compressed Trie** (Patricia Trie / Radix Tree) merges single-child chains.

---

### Other Applications

| Application                   | Tree Type Used          |
|-------------------------------|-------------------------|
| HTML/DOM parsing              | N-ary Tree               |
| Abstract Syntax Trees (compilers) | N-ary Tree           |
| Game AI (minimax)             | Binary/N-ary Tree        |
| Priority Queues               | Heap (Binary)            |
| Range queries (RMQ)           | Segment Tree / Sparse Table |
| Network routing               | Spanning Tree            |
| Cryptography (Merkle Tree)    | Binary Tree              |
| Huffman Encoding (compression)| Binary Trie              |

---

## Quick Reference Cheat Sheet

```
┌─────────────────────────────────────────────────────────────┐
│                   TREE COMPLEXITY CHEAT SHEET               │
├──────────────────────┬──────────────┬───────────────────────┤
│ Operation            │ BST (avg)    │ Balanced BST          │
├──────────────────────┼──────────────┼───────────────────────┤
│ Search               │ O(log N)     │ O(log N) guaranteed   │
│ Insert               │ O(log N)     │ O(log N) guaranteed   │
│ Delete               │ O(log N)     │ O(log N) guaranteed   │
│ Min / Max            │ O(H)         │ O(log N)              │
├──────────────────────┴──────────────┴───────────────────────┤
│                   TRAVERSAL QUICK RECALL                    │
├─────────────────────────────────────────────────────────────┤
│  Inorder   (L → N → R):  Sorted output for BST             │
│  Preorder  (N → L → R):  Root first; use for copy/serialize │
│  Postorder (L → R → N):  Children first; use for delete     │
│  Level Order:            BFS; use for level-based problems   │
└─────────────────────────────────────────────────────────────┘
```

---

*Happy coding! 🌳 Master the patterns, and tree problems will feel like second nature.*