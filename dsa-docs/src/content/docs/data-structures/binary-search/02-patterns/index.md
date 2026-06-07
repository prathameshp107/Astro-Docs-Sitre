---
title: "Binary Search Patterns"
description: "5 core binary search patterns with JavaScript templates — classic, first/last occurrence, search on answer, rotated array, and monotonic function."
sidebar:
  order: 2
---

# 🔹 Binary Search Patterns

Master these **5 patterns** and you can solve **95% of binary search problems** on LeetCode.

---

## 🗺️ Pattern Overview

| # | Pattern | Trigger Phrase | Key Technique |
|---|---------|----------------|---------------|
| 1 | [Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search) | "Find target in sorted array" | `lo <= hi`, return `mid` |
| 2 | [First / Last Occurrence](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence) | "Find leftmost / rightmost X" | Don't stop at match, keep shrinking |
| 3 | [Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer) | "Minimum / maximum feasible value" | Binary search on answer range, not array indices |
| 4 | [Rotated Sorted Array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array) | "Sorted but rotated at unknown pivot" | Identify which half is sorted |
| 5 | [Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function) | "Find threshold where f(x) changes" | `lo < hi`, converge to boundary |

---

## 🧭 Quick Decision Guide

![Binary Search Flowchart](/DSA-Notes-Problems/assets/images/binary-search/binary-search-flowchart.svg)

```text
What are you looking for?
│
├── Exact value in sorted array? ──────────→ Pattern 1 — Classic
├── First/last occurrence (duplicates)? ───→ Pattern 2 — Boundary
├── Min/max feasible value? ───────────────→ Pattern 3 — Answer Space
├── Rotated sorted array? ─────────────────→ Pattern 4 — Rotated
└── Monotonic/boolean threshold? ──────────→ Pattern 5 — Boundary
```

---

## 📋 When to Use Each Pattern

| Problem Signals | Pattern |
|-----------------|---------|
| "Find value in sorted array" | [Pattern 1 — Classic](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search) |
| "Find index of first/last X" | [Pattern 2 — First/Last](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence) |
| Array has duplicates, find range | [Pattern 2 — First/Last](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence) |
| "Minimum feasible X" / "Maximum X such that..." | [Pattern 3 — Answer Space](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer) |
| "Allocate minimum resources to satisfy constraint" | [Pattern 3 — Answer Space](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer) |
| Array is sorted but rotated | [Pattern 4 — Rotated Array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array) |
| Function is monotonically increasing/decreasing | [Pattern 5 — Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function) |
| "First version / day / point where condition changes" | [Pattern 5 — Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function) |

---

## 📚 Learning Path

| Step | Focus | File |
|------|-------|------|
| 1 | **Classic Search** — The foundation | [01-classic-search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search) |
| 2 | **First/Last Occurrence** — Handling duplicates | [02-first-last-occurrence](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence) |
| 3 | **Search on Answer** — Thinking beyond arrays | [03-search-on-answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer) |
| 4 | **Rotated Array** — Sorted but twisted | [04-rotated-array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array) |
| 5 | **Monotonic Function** — The boundary finder | [05-monotonic-function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function) |

---

**Next:** [Pattern 1 — Classic Search →](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
