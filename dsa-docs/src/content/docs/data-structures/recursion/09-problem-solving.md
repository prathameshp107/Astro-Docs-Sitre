---
title: "Problem-Solving Approach"
description: "How to identify recursion and backtracking problems, build intuition, and apply the step-by-step framework."
sidebar:
  order: 10
practice:
  visualizer: /visualizer/recursion
---

# Problem-Solving Approach

## How to Identify Recursion / Backtracking Problems

```
┌──────────────────────────────────────────────────────────────┐
│  SIGNALS THAT A PROBLEM NEEDS RECURSION:                     │
│                                                              │
│  ✓ Problem can be broken into SMALLER same-type sub-problems │
│  ✓ Problem has a TREE or GRAPH structure                     │
│  ✓ Problem mentions "all possible" / "every combination"     │
│  ✓ Problem involves nested structures (folders, expressions) │
│  ✓ Problem has optimal substructure (DP problems start here) │
│                                                              │
│  SIGNALS THAT A PROBLEM NEEDS BACKTRACKING:                  │
│                                                              │
│  ✓ "Find ALL solutions" / "Print all ways"                   │
│  ✓ "Count the number of ways"                                │
│  ✓ "Check if a solution EXISTS"                              │
│  ✓ Constraint satisfaction (Sudoku, N-Queens)                │
│  ✓ Generating permutations, combinations, subsets            │
│  ✓ Puzzle / game solving                                     │
│  ✓ Path finding with constraints                             │
└──────────────────────────────────────────────────────────────┘
```

## How to Build Recursive Intuition

### The "Trust the Recursion" Mindset

1. **Don't trace the entire recursion in your head.** Trust that the recursive call will give you the correct answer for the smaller problem.

2. **Think only about ONE level:**
   - What is the BASE CASE? (smallest problem I can answer directly)
   - What is the CURRENT STEP? (what work do I do right now)
   - What do I DELEGATE to recursion? (the smaller sub-problem)

### The 3-Step Method

```
Step 1: DEFINE the function clearly
    "This function returns/does _____ for input _____"

Step 2: Find the BASE CASE
    "What is the simplest input? What should it return?"

Step 3: Find the RECURSIVE RELATION
    "How can I express f(n) in terms of f(smaller)?"
    "What is the RECURRENCE RELATION?"
```

### Example: Power function (xⁿ)

```
Step 1: DEFINE: "power(x, n) returns x raised to the power n"

Step 2: BASE CASE: power(x, 0) = 1

Step 3: RECURSIVE RELATION:
    power(x, n) = x * power(x, n-1)                        // O(n)
    Better:     power(x, n) = power(x, n/2)²              // O(log n)
```

```javascript
function power(x, n) {
    if (n === 0) return 1;
    const half = power(x, Math.floor(n / 2));
    return n % 2 === 0 ? half * half : x * half * half;
}
```

## Step-by-Step Approach to Solve Any Backtracking Problem

```
┌─────────────────────────────────────────────────────────┐
│  BACKTRACKING PROBLEM-SOLVING FRAMEWORK                 │
│                                                         │
│  1. IDENTIFY the problem type                           │
│     → Subsets? Permutations? Constraint satisfaction?   │
│                                                         │
│  2. DEFINE the STATE                                    │
│     → What information do I need at each step?          │
│     → Current partial solution, index, remaining, etc.  │
│                                                         │
│  3. DEFINE the CHOICES                                  │
│     → At each step, what can I do?                      │
│     → Pick/skip? Which element? Which digit?            │
│                                                         │
│  4. DEFINE the BASE CASE                                │
│     → When am I done?                                   │
│     → All elements considered? Board full? Target met?  │
│                                                         │
│  5. DEFINE the VALIDITY CHECK (Pruning)                 │
│     → When should I NOT make a choice?                  │
│     → Constraints violated? Sum exceeded?               │
│                                                         │
│  6. CODE IT using the template:                         │
│     Choose → Explore → Un-choose                        │
│                                                         │
│  7. TEST with small inputs and trace the recursion tree │
└─────────────────────────────────────────────────────────┘
```

## Quick Reference: Problem Type Identification

| Question | Problem Type | Key Parameter |
|----------|-------------|--------------|
| "All subsets/combinations" | Subsets | `start` index (to avoid duplicates) |
| "All permutations/orderings" | Permutations | `used[]` array or swapping |
| "Unlimited use of elements" | Combination Sum | Pass `i` not `i+1` for reuse |
| "Each element used once" | Combination Sum II | Pass `i+1`, skip duplicate values |
| "Constraint on a board" | N-Queens / Sudoku | Validity check before exploring |
| "Path in a grid" | Word Search / Maze | Mark visited, 4-direction movement |
| "Partition into valid parts" | Palindrome Partitioning | Try all prefix + recurse on rest |

---

**Next:** [Time & Space Complexity](/DSA-Notes-Problems/data-structures/recursion/10-complexity) →
