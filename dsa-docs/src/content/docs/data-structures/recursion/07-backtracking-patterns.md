---
title: "Backtracking Patterns"
description: "Core backtracking patterns: subsets, permutations, combination sum with detailed solutions."
sidebar:
  order: 8
practice:
  visualizer: /visualizer/recursion
---

# Backtracking Patterns

## Subsets (Power Set)

**Problem:** Given an array of unique integers, return all possible subsets.
Input: [1, 2, 3] → Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

```javascript
function subsets(nums) {
    const result = [];

    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);  // Store a COPY
            return;
        }

        // Pick
        current.push(nums[index]);
        backtrack(index + 1, current);
        current.pop();  // Backtrack

        // Not pick
        backtrack(index + 1, current);
    }

    backtrack(0, []);
    return result;
}

console.log(subsets([1, 2, 3]));
// [[ 1, 2, 3 ], [ 1, 2 ], [ 1, 3 ], [ 1 ], [ 2, 3 ], [ 2 ], [ 3 ], []]
```

**Alternative approach (iterate-and-recurse):**

```javascript
function subsetsV2(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);  // Every state is a valid subset!

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}
// Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

## Subsequences with Conditions

**Problem:** Find all subsequences whose sum equals a target.

```javascript
function subsequencesWithSum(arr, target) {
    const result = [];

    function backtrack(index, current, currentSum) {
        if (index === arr.length) {
            if (currentSum === target) result.push([...current]);
            return;
        }

        // Pruning: if currentSum already exceeds target (positive numbers only)
        if (currentSum > target) return;

        // Pick
        current.push(arr[index]);
        backtrack(index + 1, current, currentSum + arr[index]);
        current.pop();

        // Not pick
        backtrack(index + 1, current, currentSum);
    }

    backtrack(0, [], 0);
    return result;
}

console.log(subsequencesWithSum([1, 2, 3], 3));
// [[1, 2], [3]]
```

## Permutations

**Problem:** Given an array of distinct integers, return all possible permutations.

### Approach 1: Using a "used" boolean array

```javascript
function permutations(nums) {
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

console.log(permutations([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Approach 2: Swap-based (in-place, more efficient)

```javascript
function permutationsSwap(nums) {
    const result = [];

    function backtrack(index) {
        if (index === nums.length) {
            result.push([...nums]);
            return;
        }

        for (let i = index; i < nums.length; i++) {
            [nums[index], nums[i]] = [nums[i], nums[index]];
            backtrack(index + 1);
            [nums[index], nums[i]] = [nums[i], nums[index]];  // Backtrack
        }
    }

    backtrack(0);
    return result;
}
```

## Combination Sum

**Problem:** Find all unique combinations where chosen numbers sum to target. The **same number can be used unlimited times.**

```javascript
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(index, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0 || index === candidates.length) return;

        // Pick (can pick again, so pass index, NOT index+1)
        current.push(candidates[index]);
        backtrack(index, current, remaining - candidates[index]);
        current.pop();

        // Skip
        backtrack(index + 1, current, remaining);
    }

    backtrack(0, [], target);
    return result;
}

console.log(combinationSum([2, 3, 6, 7], 7));
// [[2, 2, 3], [7]]
```

## Pattern Summary

| Problem | Key Constraint | State Parameters | Pruning Strategy |
|---------|---------------|-----------------|-----------------|
| **Subsets** | Unique elements | `index, current` | None needed |
| **Subsets II** | With duplicates | `start, current` | `if (i > start && nums[i] === nums[i-1]) continue` |
| **Permutations** | Use all elements | `current, used[]` | `if (used[i]) continue` |
| **Combination Sum** | Unlimited reuse | `index, current, remaining` | `if (remaining < 0) return` |
| **Combination Sum II** | Each once, duplicates | `start, current, remaining` | Sort + skip duplicates + `candidates[i] > remaining` break |

---

**Next:** [Advanced Backtracking](/DSA-Notes-Problems/data-structures/recursion/08-backtracking-advanced) →
