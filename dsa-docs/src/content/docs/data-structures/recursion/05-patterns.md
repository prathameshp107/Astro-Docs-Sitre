---
title: "Recursion Patterns"
description: "Core recursion patterns: Pick/Not Pick, Divide and Conquer, and the foundation of backtracking."
sidebar:
  order: 6
practice:
  visualizer: /visualizer/recursion
---

# Recursion Patterns

## Pick / Not Pick Pattern

This is the **most important pattern** for recursion and backtracking problems.

```
For every element in the input, you make a BINARY CHOICE:
    → Include it (PICK)
    → Exclude it (NOT PICK)
```

**Template:**

```javascript
function pickNotPick(arr, index, current, result) {
    // Base case: all elements considered
    if (index === arr.length) {
        result.push([...current]);  // Store a copy
        return;
    }

    // PICK: Include arr[index]
    current.push(arr[index]);
    pickNotPick(arr, index + 1, current, result);
    current.pop();  // UNDO — backtrack!

    // NOT PICK: Skip arr[index]
    pickNotPick(arr, index + 1, current, result);
}
```

**Problems that use this pattern:**
- Subsets / Power set
- Subsequences with sum
- Combination sum (with variations)
- 0/1 Knapsack

## Divide and Conquer

**Strategy: Divide the problem into smaller sub-problems, solve each recursively, combine results.**

```
┌───────────────────────────────────────┐
│           DIVIDE AND CONQUER          │
│                                       │
│   1. DIVIDE:  Split into sub-problems │
│   2. CONQUER: Recursively solve each  │
│   3. COMBINE: Merge the results       │
└───────────────────────────────────────┘
```

### Classic Example: Merge Sort

**Visualization for [38, 27, 43, 3, 9, 82, 10]:**

```
DIVIDE:
          [38, 27, 43, 3, 9, 82, 10]
               /                \
      [38, 27, 43, 3]     [9, 82, 10]
        /         \          /      \
    [38, 27]   [43, 3]   [9, 82]  [10]
    /    \     /    \     /    \     |
  [38]  [27] [43]  [3] [9]  [82]  [10]

COMBINE (merge sorted halves):
  [27, 38] [3, 43]  [9, 82]  [10]
      \       /         \      /
   [3, 27, 38, 43]   [9, 10, 82]
          \              /
    [3, 9, 10, 27, 38, 43, 82]   ← sorted!
```

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}
```

**Time:** O(n log n) | **Space:** O(n)

## Backtracking Foundation

Backtracking is recursion + **undoing choices** to explore all paths.

```
RECURSION:        Make a choice → go deeper
BACKTRACKING:     Make a choice → go deeper → UNDO the choice → try another path

The "UNDO" step is what makes it backtracking.
```

```javascript
current.push(arr[index]);                // CHOOSE
printSubsequences(arr, index + 1, current); // EXPLORE
current.pop();                            // UN-CHOOSE (backtrack!)
```

This is the **Choose → Explore → Un-choose** pattern.

## Efficient Power Function (Logarithmic)

```javascript
function power(x, n) {
    if (n === 0) return 1;

    const half = power(x, Math.floor(n / 2));

    if (n % 2 === 0) {
        return half * half;
    } else {
        return x * half * half;
    }
}

console.log(power(2, 10)); // 1024
// Time: O(log n) — much faster than O(n)!
```

## Pattern Comparison

| Pattern | Approach | Time Complexity | Classic Problems |
|---------|----------|----------------|-----------------|
| **Pick/Not Pick** | Binary choice per element | O(2ⁿ) | Subsets, subsequences |
| **Divide & Conquer** | Split → solve → merge | O(n log n) | Merge sort, Quick sort |
| **Tree Recursion** | Multiple recursive calls | O(2ⁿ) | Fibonacci (naive) |
| **Backtracking** | Choose → Explore → Undo | O(n!), O(2ⁿ) | Permutations, N-Queens |

---

**Next:** [Introduction to Backtracking](/DSA-Notes-Problems/data-structures/recursion/06-backtracking-intro) →
