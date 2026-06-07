---
title: "Pattern Recognition"
description: "How to identify which binary search pattern to use for any interview problem."
sidebar:
  order: 2
---

# Pattern Recognition

The hardest skill is not implementing binary search — it's **recognizing when to use it**.

---

## Q1: How to Identify Binary Search Problems

Ask yourself these questions in order:

```text
1. Is the data sorted? (or monotonic?)
   ├── Yes → Binary search is possible
   └── No → Can I sort it? If yes, maybe. If no → skip BS

2. What am I searching for?
   ├── An exact value in a collection? → Patterns 1, 4
   ├── A boundary/transition point? → Patterns 2, 5
   └── A minimum/maximum feasible value? → Pattern 3

3. Is there a monotonic condition?
   ├── "If X works, does X+1 also work?" → Pattern 3 or 5
   └── "Can I eliminate half the search space?" → Binary search applies
```

---

## Q2: Problem Recognition Cheat Sheet

| Problem Statement Clues | Pattern |
|-------------------------|---------|
| "Find target in sorted array" | Pattern 1 — Classic |
| "Sorted but rotated" | Pattern 4 — Rotated |
| "Find first/last occurrence" | Pattern 2 — Boundary |
| "Minimum X such that..." | Pattern 3 — Answer Space (min feasible) |
| "Maximum X such that..." | Pattern 3 — Answer Space (max feasible) |
| "Find peak / first bad version / boundary" | Pattern 5 — Monotonic |
| "Allocate X to Y groups minimizing max" | Pattern 3 — Ship/Painter |
| "Place K items maximizing min distance" | Pattern 3 — Cows/Force |
| "Design a data structure with timestamps" | Pattern 1 — Store sorted, search |
| "Kth smallest in sorted matrix" | Pattern 3 — Count ≤ mid |

---

## Q3: Common Problem-Solving Walkthroughs

### Walkthrough: Koko Eating Bananas

```
Problem: Minimum eating speed to finish piles in h hours

Step 1 — Not sorted? But there IS a monotonic answer space.
  → Speed k: if k works, k+1 also works
  → Answer space: [1, max(piles)]
  
Step 2 — "Minimum feasible speed"
  → Pattern 3 — Search on Answer
  
Step 3 — Define condition function
  canFinish(k): sum(ceil(pile/k)) ≤ h
  
Step 4 — Binary search template
  lo=1, hi=max(piles), result=hi
  while (lo <= hi):
    mid = lo + (hi-lo)/2
    if canFinish(mid): result=mid, hi=mid-1
    else: lo=mid+1
  return result
```

### Walkthrough: Search in Rotated Array

```
Problem: Find target in [4,5,6,7,0,1,2]

Step 1 — Array is sorted but rotated?
  → Pattern 4 — Rotated Array
  
Step 2 — Which half is sorted?
  Compare nums[lo] with nums[mid]
  
Step 3 — Binary search with modified decision
  if left half sorted:
    if target in [nums[lo], nums[mid]): search left
    else: search right
  if right half sorted:
    if target in (nums[mid], nums[hi]]: search right
    else: search left
```

### Walkthrough: First Bad Version

```
Problem: Find first version where isBadVersion(v) returns true

Step 1 — Monotonic boolean condition
  F F F T T T T  → Find boundary
  → Pattern 5 — Monotonic Function
  
Step 2 — Use lo < hi, hi = mid, lo = mid + 1
  
Step 3 — Return lo
```

---

## Q4: When NOT to Use Binary Search

1. **Unsorted data** — Must sort first (O(n log n))
2. **Linked list** — No O(1) random access; binary search is O(n)
3. **Single lookup** — Linear search is simpler for tiny datasets
4. **Non-monotonic condition** — If f(x) true/false doesn't have a single transition point
5. **Stateful conditions** — If checking `mid` has side effects that change future checks

---

## 🔑 Key Takeaways

- **Look for monotonicity** — the single most important signal
- **"Minimum X" → Pattern 3** — search on answer, minimize
- **"Maximum X" → Pattern 3** — search on answer, maximize
- **"Boundary/peak/first" → Pattern 5** — monotonic function
- **"Rotated" → Pattern 4** — figure out sorted half
- **"Data structure with sorted store" → Pattern 1** — classic BS on stored data

---

## 🔗 Related

- [Back to Interview Index](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions)
- [Tricky Variations →](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/03-tricky-variations)
