---
title: "Recursion & Backtracking for Interviews"
description: "Essential recursion and backtracking patterns for solving interview problems efficiently."
sidebar:
  order: 7
---

# Recursion & Backtracking for Interviews

## Quick Decision Guide

```
Does the problem ask for...
├── "All possible combinations/subsets" → Subsets pattern
├── "All possible orderings/arrangements" → Permutations pattern
├── "Ways to make a sum" → Combination Sum pattern
├── "Arrangements with constraints" → Backtracking with pruning
└── "Optimal value (max/min)" → Consider DP (starts with recursion)
```

## Key Patterns to Remember

### Permutations — Used Array Approach

```javascript
function permute(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            current.push(nums[i]);
            used[i] = true;
            backtrack(current);
            current.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}
```

### Subsets — Iterate and Recurse

```javascript
function subsets(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}
```

### Combination Sum — Unlimited Reuse

```javascript
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(index, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0 || index >= candidates.length) return;

        // Include (can reuse, so pass same index)
        current.push(candidates[index]);
        backtrack(index, current, remaining - candidates[index]);
        current.pop();

        // Skip
        backtrack(index + 1, current, remaining);
    }

    backtrack(0, [], target);
    return result;
}
```

## Common Interview Recursion Problems

| Problem | Pattern | Time Complexity | Key Trick |
|---------|---------|-----------------|-----------|
| **Subsets** | Pick/Not-Pick | O(2ⁿ) | Every node is a valid subset |
| **Permutations** | Used array | O(n!) | Track used elements |
| **Combination Sum** | Unlimited reuse | O(2^(t/min)) | Pass `i` not `i+1` |
| **Generate Parentheses** | Open/close counts | O(4ⁿ/√n) | `close < open` ensures validity |
| **Letter Combinations** | Multiple choices | O(4ⁿ) | Map digit → letters |
| **Palindrome Partitioning** | Prefix check | O(n·2ⁿ) | Try all palindrome prefixes |

## Optimization Checks

1. **Can I sort?** Sorting enables better pruning (`break` instead of `continue`)
2. **Can I use memoization?** Overlapping subproblems? → Cache results
3. **Can I prune?** Check early for constraint violations
4. **Can I use iteration?** Simple linear recursion → loop is faster

---

**Next:** [Must-Practice Problems](/DSA-Notes-Problems/data-structures/interview-prep/07-coding-problems) →
