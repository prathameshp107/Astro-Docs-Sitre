---
title: "Problem-Solving Approach"
description: "How to approach linked list problems — pattern recognition, pointer manipulation rules, and edge cases."
sidebar:
  order: 7
practice:
  visualizer: /visualizer/linked-list
---

# Problem-Solving Approach

---

## 🔍 How to Spot a Linked List Pattern

| Problem says... | Pattern to use |
|-----------------|----------------|
| "Find the middle" or "Nth from end" | 🐢🐰 Fast & Slow Pointer |
| "Has a cycle?" | 🐢🐰 Floyd's Algorithm |
| "Reverse" or "Reorder" | 🔄 3-Pointer Reversal |
| "Merge" or "Sort" | 🪄 Dummy Node + Two Pointers |
| "Palindrome" | Find Middle + Reverse + Compare |
| "Intersection of two lists" | Two-Pointer Length Sync |
| "Rotate" | Find length → Connect → Break at new tail |
| "Odd/Even" | Two pointers separating nodes |

---

## 🛠️ Pointer Manipulation Rules

1. **ALWAYS save `next` before changing it.** Otherwise, you lose the rest of the list.

2. **Use a dummy node** when the head might change.

3. **Draw it on paper.** Pointer problems are 10× easier to visualize.

4. **Use 3 pointers** (`prev`, `curr`, `next`) for most reversal-type problems.

5. **Trace through with a simple example** before coding. Verify your logic.

---

## ⚠️ Edge Cases to Always Test

- ✅ **Empty list** (`head = null`)
- ✅ **Single node** (often tricky — loops may not execute)
- ✅ **Two nodes** (minimum case for many algorithms)
- ✅ **Operating on head** (insert/delete at position 0)
- ✅ **Operating on tail** (last node — `next` is null)
- ✅ **List with a cycle** (if not guaranteed acyclic)
- ✅ **Even vs odd length** (middle behavior differs)

---

## 🔄 Common Technique Combinations

Hard problems often combine multiple basic techniques:

```
"Reorder List"    = Find Middle + Reverse Second Half + Merge
"Palindrome"      = Find Middle + Reverse Second Half + Compare
"Rotate List"     = Find Length + Connect Tail to Head + Break at New Tail
"Sort List"       = Find Middle (split) + Merge Two Sorted Lists (merge sort)
```

---

## 🧪 How to Debug Linked List Code

1. **Draw boxes and arrows** for each step
2. **Use small examples** (2–4 nodes)
3. **Track `prev`, `curr`, `next`** at each iteration
4. **Check for null pointer access** — anytime you write `node.next`, make sure `node` is not null
5. **Verify the head didn't change unexpectedly**

---

## Related

- [Important Patterns](/DSA-Notes-Problems/data-structures/linked-list/05-patterns) — Learn the core patterns
- [Key Algorithms](/DSA-Notes-Problems/data-structures/linked-list/06-algorithms) — Full code implementations
- [Tips & Common Mistakes](/DSA-Notes-Problems/data-structures/linked-list/09-tips) — Avoid common pitfalls
