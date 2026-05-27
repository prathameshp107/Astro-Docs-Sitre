---
title: "Important Patterns"
description: "Key linked list patterns — fast & slow pointer, reversal, cycle detection, merging, palindrome, intersection."
sidebar:
  order: 5
---

# Important Patterns (Made Simple)

These are **tricks** that solve 90% of linked list problems. Learn them well!

---

## 🐢🐰 Fast & Slow Pointer (The Tortoise and the Hare)

**The Trick:** Use two pointers — one moves **1 step**, the other moves **2 steps** at a time.

**Why it works:**
- Fast reaches the end **twice as quickly**.
- When fast is at the end, slow is at the **middle**.
- If there's a **loop**, fast will eventually **lap** slow and meet it.

```
Start:    [1] [2] [3] [4] [5]
           ↑
          slow, fast

Step 1:   [1] [2] [3] [4] [5]
               ↑   ↑
              slow fast

Step 2:   [1] [2] [3] [4] [5]
                   ↑       ↑
                  slow    fast  ← fast at end, slow at middle!
```

**Use it for:**
- Finding the middle ✅
- Detecting loops ✅
- Finding the Nth node from the end ✅

---

## 🔄 Reversing a Linked List

**The Trick:** Walk through and **flip each arrow backward**.

You need 3 helpers: `prev`, `curr`, `next`.

```
Goal: 1 → 2 → 3 → NULL  becomes  NULL ← 1 ← 2 ← 3
```

**Step by step:**
```
Initial:  prev=NULL, curr=1
          NULL    [1] → [2] → [3] → NULL

Step 1:   Save next (2), flip 1's arrow to NULL
          NULL ← [1]    [2] → [3] → NULL
                 prev   curr

Step 2:   Save next (3), flip 2's arrow to 1
          NULL ← [1] ← [2]    [3] → NULL
                       prev   curr

Step 3:   Save next (NULL), flip 3's arrow to 2
          NULL ← [1] ← [2] ← [3]
                              prev (new head!)
```

See the full code in [Key Algorithms](/DSA-Notes-Problems/data-structures/linked-list/06-algorithms).

---

## 📍 Finding the Middle

Just use **fast & slow pointers** (above). When fast hits the end, slow is at the middle. **Easy!**

---

## 🔁 Detecting a Loop

If a linked list has a cycle (loops back), how do we detect it?

**Floyd's Algorithm:**
- Move slow 1 step, fast 2 steps.
- If they ever **meet**, there's a loop.
- If fast reaches NULL, there's no loop.

```
        ┌─────────────┐
        ▼             │
[1] → [2] → [3] → [4] → (back to 2)

slow & fast both start at 1.
Eventually they meet inside the loop. 🎯
```

---

## 🔀 Merging Two Sorted Lists

**The Trick:** Like zipping a zipper 🤐. Compare the heads of both lists, attach the smaller one, repeat.

```
List A: 1 → 3 → 5
List B: 2 → 4 → 6

Step 1: 1 < 2, take 1.   Result: 1
Step 2: 3 > 2, take 2.   Result: 1 → 2
Step 3: 3 < 4, take 3.   Result: 1 → 2 → 3
... and so on.

Final: 1 → 2 → 3 → 4 → 5 → 6
```

---

## 🪞 Palindrome Check

A palindrome reads the same forward and backward (e.g., `1 → 2 → 2 → 1`).

**The Trick:**
1. Find the middle.
2. Reverse the second half.
3. Compare both halves node by node.

---

## ✂️ Intersection of Two Lists

Two lists merge at some node. Find that node.

**The Magic Trick:**
- Pointer A walks list A, then jumps to list B.
- Pointer B walks list B, then jumps to list A.
- They will **meet at the intersection** (or both reach NULL).

**Why?** Both pointers travel the same total distance, syncing up at the meeting point.

---

## 📋 Pattern Recognition Cheat Sheet

| Problem says... | Pattern to use |
|-----------------|----------------|
| "Find the middle" | 🐢🐰 Fast & Slow Pointer |
| "Nth from end" | 🐢🐰 Fast & Slow (gap of N) |
| "Has a cycle?" | 🐢🐰 Floyd's Cycle Detection |
| "Reverse" or "Reorder" | 🔄 3-Pointer Reversal |
| "Merge" or "Sort" | 🪄 Dummy Node + Two Pointers |
| "Palindrome" | Find Middle + Reverse + Compare |
| "Intersection" | Two-Pointer Length Sync |

---

## Related

- [Key Algorithms](/DSA-Notes-Problems/data-structures/linked-list/06-algorithms) — Full code implementations
- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/linked-list/07-problem-solving) — How to spot patterns
- [Interview Questions](/DSA-Notes-Problems/data-structures/linked-list/08-interview-questions) — Practice problems
