---
title: "Introduction to Backtracking"
description: "What is backtracking, difference from recursion, decision trees, and the universal template."
sidebar:
  order: 7
---

# Introduction to Backtracking

## What Is Backtracking?

**Backtracking is a systematic method to explore ALL possible solutions by building candidates incrementally and abandoning a candidate ("backtracking") as soon as it is determined that the candidate cannot possibly lead to a valid solution.**

Think of it as navigating a maze:

```
                START
                  |
            ┌─────┼─────┐
            ↓     ↓     ↓
          Path A  Path B  Path C
            |       |       |
         Dead End   ↓    Dead End
         ← BACK   Path B1
                    |
               ┌────┼────┐
               ↓    ↓    ↓
            Dead  Path  Dead
            End   B1a   End
            ← BACK |   ← BACK
                  EXIT ✅
```

You try a path. If it leads to a dead end, you **go back** and try another path.

## Difference Between Recursion and Backtracking

| Aspect | Recursion | Backtracking |
|--------|-----------|--------------|
| **Definition** | Function calls itself | Recursion + undoing choices |
| **Purpose** | Solve by breaking into sub-problems | Find ALL valid solutions by trial & error |
| **State change** | May or may not modify state | Modifies state, then REVERTS it |
| **Exploration** | Follows ONE path to completion | Explores MULTIPLE paths, abandoning invalid ones |
| **Key operation** | Call self | Choose → Explore → Un-choose |
| **Example** | Factorial, Fibonacci | N-Queens, Sudoku, Permutations |

> **All backtracking uses recursion, but not all recursion is backtracking.**

## Decision Tree Visualization

Every backtracking problem can be visualized as a **decision tree** where:
- **Each node** represents a state (partial solution)
- **Each edge** represents a choice
- **Leaf nodes** are either valid solutions or dead ends

![Backtracking Decision Tree](/DSA-Notes-Problems/assets/images/recursion/decision-tree-backtracking.svg)

### Example: Generate all permutations of [1, 2, 3]

```
                                    []
                        /           |            \
                    pick 1        pick 2        pick 3
                    [1]           [2]           [3]
                   /    \        /    \        /    \
              pick 2  pick 3  pick 1  pick 3  pick 1  pick 2
              [1,2]   [1,3]   [2,1]   [2,3]   [3,1]   [3,2]
                |       |       |       |       |       |
             pick 3  pick 2  pick 3  pick 1  pick 2  pick 1
             [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
               ✅      ✅      ✅      ✅      ✅      ✅

6 leaf nodes = 3! = 6 permutations
```

## The Universal Backtracking Template

```
┌─────────────────────────────────────────────────────┐
│          THE BACKTRACKING TEMPLATE                  │
│                                                     │
│  function backtrack(state) {                        │
│      if (state is a solution) {                     │
│          record/print the solution                  │
│          return                                     │
│      }                                              │
│                                                     │
│      for each CHOICE in available choices {         │
│          if (choice is VALID) {        ← PRUNING    │
│              MAKE the choice            ← CHOOSE    │
│              backtrack(updated state)   ← EXPLORE   │
│              UNDO the choice            ← BACKTRACK │
│          }                                          │
│      }                                              │
│  }                                                  │
└─────────────────────────────────────────────────────┘
```

```javascript
function backtrack(state) {
    // ===== BASE CASE =====
    if (isComplete(state)) {
        results.push(copy(state));
        return;
    }

    // ===== TRY ALL CHOICES =====
    for (const choice of getChoices(state)) {

        // ===== PRUNING =====
        if (!isValid(choice, state)) continue;

        // ===== CHOOSE =====
        applyChoice(state, choice);

        // ===== EXPLORE =====
        backtrack(state);

        // ===== UN-CHOOSE =====
        undoChoice(state, choice);
    }
}
```

## State Management

**State** is the data that represents the "current situation" in your exploration.

| Problem | State | Choices |
|---------|-------|---------|
| Permutations | Current permutation + used flags | Which unused element to add next |
| N-Queens | Board + columns/diags occupied | Which column to place queen in current row |
| Sudoku | The board | Which digit (1-9) to place in current cell |
| Subsets | Current subset + index | Pick or skip current element |
| Combination Sum | Current combination + remaining target | Which candidate to add |

**Critical Rule:** After recursive exploration, the state MUST be restored exactly as it was before.

```javascript
// WRONG — state is not restored
current.push(item);
backtrack(next);
// Missing: current.pop()  ← BUG! State leaks into next iteration.

// CORRECT — state is properly restored
current.push(item);    // Modify state
backtrack(next);       // Explore
current.pop();         // Restore state ← ESSENTIAL
```

## Pruning (Optimization)

**Pruning** means cutting off branches of the decision tree that we KNOW cannot lead to valid solutions.

```
                  WITHOUT PRUNING                    WITH PRUNING
                     root                              root
                  /   |   \                         /   |   \
                A     B     C                     A     B     ✗ C (pruned!)
               /|\   /|\   /|\                   /|\   /|\
              ...   ...   ...                   ...   ...
```

### Examples of pruning:

```javascript
// 1. Combination Sum: Skip if remaining sum goes negative
if (remaining < 0) return;

// 2. N-Queens: Skip if column or diagonal is attacked
if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
    continue;
}

// 3. Subsets with target sum (positive numbers only)
if (currentSum > target) return;

// 4. Sorted candidates: Break early
if (candidates[i] > remaining) break;  // Not continue, BREAK!
```

---

**Next:** [Backtracking Patterns](/DSA-Notes-Problems/data-structures/recursion/07-backtracking-patterns) →
