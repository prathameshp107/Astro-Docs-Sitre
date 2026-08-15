---
title: "Interview Questions"
description: "Curated tree interview questions organized by difficulty — easy, medium, and hard LeetCode problems."
sidebar:
  order: 12
practice:
  visualizer: /visualizer/trees
---

# Must-Do Interview Questions

Practice these in order. Start with Easy to build confidence, then move to Medium and Hard.

---

## 🟢 Easy

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

## 🟡 Medium

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

## 🔴 Hard

| # | Problem Name                            | Key Idea                                                  |
|---|-----------------------------------------|-----------------------------------------------------------|
| 1 | Binary Tree Maximum Path Sum            | Global max; return max single-branch gain upward          |
| 2 | Serialize and Deserialize Binary Tree   | Preorder with null markers                                |
| 3 | Binary Tree Cameras                     | Greedy postorder; place camera at parent of uncovered leaf|
| 4 | Recover Binary Search Tree              | Find two swapped nodes via inorder; swap their values     |
| 5 | Count of Smaller Numbers After Self     | BST/Fenwick tree; insert right-to-left                    |
| 6 | Vertical Order Traversal               | BFS + sort by (col, row, val)                             |

---

## 💡 Study Strategy

| Step | What to do |
|------|------------|
| 1 | Solve Easy problems until you can code them without looking |
| 2 | Learn the [patterns](/DSA-Notes-Problems/data-structures/trees/07-patterns) — they're the building blocks for Medium problems |
| 3 | Master [DFS](/DSA-Notes-Problems/data-structures/trees/06-traversals) and [BFS](/DSA-Notes-Problems/data-structures/trees/06-traversals) completely |
| 4 | For each Medium problem, identify which pattern it uses |
| 5 | Draw the tree on paper and trace your algorithm before coding |
| 6 | Test with `null`, single node, and edge cases |
| 7 | Attempt Hard problems only after comfortably solving Medium ones |

---

## Related

- [Tips & Common Mistakes](/DSA-Notes-Problems/data-structures/trees/13-tips) — Avoid common pitfalls
- [Code Examples](/DSA-Notes-Problems/data-structures/trees/11-code-examples) — Full implementations
- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/trees/10-problem-solving) — DFS vs BFS guide
