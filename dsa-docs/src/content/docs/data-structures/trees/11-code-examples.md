---
title: "Code Examples"
description: "Complete JavaScript implementations for tree data structures — node class, traversals, BST, LCA, and sample problems."
sidebar:
  order: 11
practice:
  visualizer: /visualizer/trees
---

# Code Examples (JavaScript)

---

## Tree Node Implementation

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

## DFS Traversals

```javascript
// Inorder (Left → Root → Right) — gives sorted order for BST
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// Preorder (Root → Left → Right) — for serialization/copy
function preorder(root, result = []) {
  if (root === null) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// Postorder (Left → Right → Root) — for deletion
function postorder(root, result = []) {
  if (root === null) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}
```

---

## BFS Traversal

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue  = [root];

  while (queue.length > 0) {
    const levelSize    = queue.length;
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
// Output for [1, 2, 3, 4, 5]: [ [1], [2, 3], [4, 5] ]
```

---

## BST Operations

```javascript
class BST {
  constructor() { this.root = null; }

  insert(val) {
    this.root = this._insertRec(this.root, val);
  }
  _insertRec(node, val) {
    if (node === null) return new TreeNode(val);
    if (val < node.val) node.left = this._insertRec(node.left, val);
    else if (val > node.val) node.right = this._insertRec(node.right, val);
    return node;
  }

  search(val) {
    return this._searchRec(this.root, val);
  }
  _searchRec(node, val) {
    if (node === null) return false;
    if (val === node.val) return true;
    if (val < node.val) return this._searchRec(node.left, val);
    else return this._searchRec(node.right, val);
  }

  delete(val) {
    this.root = this._deleteRec(this.root, val);
  }
  _deleteRec(node, val) {
    if (node === null) return null;
    if (val < node.val) {
      node.left = this._deleteRec(node.left, val);
    } else if (val > node.val) {
      node.right = this._deleteRec(node.right, val);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const successor = this._findMin(node.right);
      node.val = successor.val;
      node.right = this._deleteRec(node.right, successor.val);
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

## LCA Implementation

```javascript
// LCA in a Binary Tree (not necessarily BST)
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;

  const left  = lowestCommonAncestor(root.left,  p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}

// LCA in a BST (more efficient using BST property)
function lcaBST(root, p, q) {
  if (root === null) return null;

  if (p.val < root.val && q.val < root.val)
    return lcaBST(root.left, p, q);

  if (p.val > root.val && q.val > root.val)
    return lcaBST(root.right, p, q);

  return root;
}
```

---

## Sample Problem Solutions

### Problem 1: Maximum Depth of Binary Tree (Easy)

```javascript
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(N), Space: O(H)
```

### Problem 2: Validate BST (Medium)

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  if (root.val <= min || root.val >= max) return false;

  return isValidBST(root.left,  min,      root.val) &&
         isValidBST(root.right, root.val, max);
}
// Time: O(N), Space: O(H)
```

### Problem 3: Binary Tree Maximum Path Sum (Hard)

```javascript
let maxSum;

function maxPathSum(root) {
  maxSum = -Infinity;
  gainFromNode(root);
  return maxSum;
}

function gainFromNode(node) {
  if (node === null) return 0;

  const leftGain  = Math.max(gainFromNode(node.left),  0);
  const rightGain = Math.max(gainFromNode(node.right), 0);

  const pathThroughNode = node.val + leftGain + rightGain;
  maxSum = Math.max(maxSum, pathThroughNode);

  return node.val + Math.max(leftGain, rightGain);
}
// Time: O(N), Space: O(H)
```

### Problem 4: Serialize and Deserialize Binary Tree (Hard)

```javascript
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

## Related

- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS algorithms
- [BST Operations](/DSA-Notes-Problems/data-structures/trees/08-bst) — Search, Insert, Delete
- [Important Patterns](/DSA-Notes-Problems/data-structures/trees/07-patterns) — LCA, diameter, path sum
