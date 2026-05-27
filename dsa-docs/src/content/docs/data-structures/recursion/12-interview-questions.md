---
title: "Interview Questions"
description: "Categorized recursion and backtracking interview questions by difficulty with key concepts."
sidebar:
  order: 13
---

# Interview Questions

## 🟢 Easy

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **Factorial** | Basic recursion | `f(n) = n * f(n-1)` |
| 2 | **Fibonacci** | Tree recursion + memoization | `f(n) = f(n-1) + f(n-2)` |
| 3 | **Sum of digits** | Extract last digit | `(n % 10) + f(n/10)` |
| 4 | **Power of two** | Divide by 2 | `f(n) = n===1 ? true : n%2===0 && f(n/2)` |
| 5 | **Reverse string** | Head recursion | Swap, recurse inward |
| 6 | **Palindrome check** | Two pointers | Compare first & last, recurse inward |
| 7 | **Print 1 to N** | Head vs tail recursion | Print before or after recursive call |
| 8 | **Count occurrences** | Linear scan | Check current + recurse rest |

**Quick solutions:**
```javascript
// Sum of digits
function digitSum(n) {
    if (n === 0) return 0;
    return (n % 10) + digitSum(Math.floor(n / 10));
}

// Palindrome check
function isPalindrome(str, left = 0, right = str.length - 1) {
    if (left >= right) return true;
    if (str[left] !== str[right]) return false;
    return isPalindrome(str, left + 1, right - 1);
}

// Power of two check
function isPowerOfTwo(n) {
    if (n === 1) return true;
    if (n === 0 || n % 2 !== 0) return false;
    return isPowerOfTwo(n / 2);
}
```

## 🟡 Medium

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **Subsets** | Pick/Not-pick | Binary decisions for each element |
| 2 | **Subsets II** (with duplicates) | Sort + skip duplicates | `if(i > start && nums[i]===nums[i-1]) skip` |
| 3 | **Permutations** | Used array / swapping | Try all unused elements at each position |
| 4 | **Permutations II** (with duplicates) | Sort + skip duplicates | `if(i > 0 && nums[i]===nums[i-1] && !used[i-1]) skip` |
| 5 | **Combination Sum** | Unlimited reuse | Pass `index` (not `index+1`) for reuse |
| 6 | **Combination Sum II** | Each used once | Sort + skip duplicates + `i+1` |
| 7 | **Generate Parentheses** | Open/close counts | `open < n` and `close < open` rules |
| 8 | **Letter Combinations** | Multiple choices per digit | Map digit → letters, iterate + recurse |
| 9 | **Palindrome Partitioning** | Partition + check | Try all prefixes that are palindromes |
| 10 | **Word Search** | Grid backtracking | 4-direction DFS with visited tracking |

## 🔴 Hard

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **N-Queens** | Row-by-row + diagonal tracking | Sets for cols/diags, try each col per row |
| 2 | **Sudoku Solver** | Cell-by-cell + validity check | Try 1-9, validate row/col/box |
| 3 | **Word Break II** | Recursion + string partitioning | Try all prefixes in dictionary |
| 4 | **Expression Add Operators** | String + math operations | Insert +, -, * between digits |
| 5 | **Unique Paths III** | Grid + visit all cells | DFS with backtracking on grid |
| 6 | **Rat in a Maze** | Grid path finding | 4-direction DFS with visited |
| 7 | **Knight's Tour** | Chess board traversal | 8 possible moves, visit all 64 squares |
| 8 | **Tug of War** | Partition into halves | Subset selection minimizing diff |

## Recommended Practice Order

```
Week 1: RECURSION BASICS
    □ Factorial          □ Fibonacci          □ Sum of N numbers
    □ Power (xⁿ)        □ Print 1 to N       □ Reverse string
    □ Check palindrome  □ Sum of digits

Week 2: RECURSION INTERMEDIATE
    □ Print all subsequences     □ Subsequences with sum K
    □ Merge Sort                 □ Tower of Hanoi

Week 3: BACKTRACKING FUNDAMENTALS
    □ Subsets                    □ Subsets II (with duplicates)
    □ Permutations               □ Permutations II
    □ Combination Sum            □ Combination Sum II
    □ Generate Parentheses

Week 4: BACKTRACKING ADVANCED
    □ Palindrome Partitioning    □ Word Search
    □ N-Queens                   □ Sudoku Solver
    □ Letter Combinations        □ Rat in a Maze
```

---

**Next:** [Common Mistakes & Tips](/DSA-Notes-Problems/data-structures/recursion/13-mistakes-tips) →
