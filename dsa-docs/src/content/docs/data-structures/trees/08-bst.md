---
title: "BST Operations"
description: "Binary Search Tree operations — Search, Insert, Delete with diagrams and code."
sidebar:
  order: 8
---

# BST Operations

---

## Search

```
Search 6 in BST:
         [8]
        /   \
      [3]   [10]
     /  \
   [1]  [6]  ← Found!

Steps: 6 < 8 → go left → 6 > 3 → go right → found 6
```

```javascript
search(val) {
  return this._searchRec(this.root, val);
}

_searchRec(node, val) {
  if (node === null) return false;
  if (val === node.val) return true;
  if (val < node.val) return this._searchRec(node.left,  val);
  else                return this._searchRec(node.right, val);
}
```

**Time**: O(log N) average, O(N) worst case (skewed tree).

---

## Insert

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

```javascript
insert(val) {
  this.root = this._insertRec(this.root, val);
}

_insertRec(node, val) {
  if (node === null) return new TreeNode(val);
  if (val < node.val)      node.left  = this._insertRec(node.left,  val);
  else if (val > node.val) node.right = this._insertRec(node.right, val);
  return node; // val === node.val: duplicate, ignore
}
```

---

## Delete (3 Cases)

| Case                | Action                                             |
|---------------------|----------------------------------------------------|
| Node is a leaf      | Simply remove it                                   |
| Node has 1 child    | Replace node with its child                        |
| Node has 2 children | Replace with **inorder successor** (smallest in right subtree), then delete that successor |

```
Delete 3 (has 2 children):
Before:              After:
  [8]                  [8]
 /   \                /   \
[3] [10]           [4] [10]
 /  \               /  \
[1] [6]           [1]  [6]
    / \                / \
  [4] [7]            [5] [7]
      \
      [5]
```

```javascript
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
    node.val   = successor.val;
    node.right = this._deleteRec(node.right, successor.val);
  }
  return node;
}

_findMin(node) {
  while (node.left !== null) node = node.left;
  return node;
}
```

---

## Full BST Class

```javascript
class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    this.root = this._insertRec(this.root, val);
  }

  _insertRec(node, val) {
    if (node === null) return new TreeNode(val);
    if (val < node.val)      node.left = this._insertRec(node.left, val);
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

## Tree Balancing (Conceptual)

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

## Related

- [Types of Trees](/DSA-Notes-Problems/data-structures/trees/02-types) — BST, AVL, Red-Black types
- [Important Patterns](/DSA-Notes-Problems/data-structures/trees/07-patterns) — LCA, path sum, balanced check
- [Code Examples](/DSA-Notes-Problems/data-structures/trees/11-code-examples) — LCA implementation
