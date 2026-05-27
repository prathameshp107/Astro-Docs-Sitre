---
title: "Advanced Backtracking"
description: "Advanced backtracking problems: N-Queens, Sudoku, palindrome partitioning, word search with full solutions."
sidebar:
  order: 9
---

# Advanced Backtracking

## N-Queens

**Problem:** Place N queens on an N×N chessboard such that no two queens attack each other.

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    const cols = new Set();
    const diag1 = new Set();  // row - col
    const diag2 = new Set();  // row + col

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;  // Pruning: invalid position
            }

            // Choose
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // Explore
            backtrack(row + 1);

            // Un-choose
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}

const solutions = solveNQueens(4);
solutions.forEach((solution, i) => {
    console.log(`\nSolution ${i + 1}:`);
    solution.forEach(row => console.log(row));
});
```

**For N=4, one valid solution:**
```
.Q..
...Q
Q...
..Q.
```

**Time:** O(n!) | **Space:** O(n²)

## Sudoku Solver

```javascript
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        const char = String(num);

        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === char) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === char) return false;
        }

        // Check 3x3 sub-box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === char) return false;
            }
        }

        return true;
    }

    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, i, j, num)) {
                            board[i][j] = String(num);     // Choose
                            if (solve()) return true;       // Explore
                            board[i][j] = '.';              // Un-choose
                        }
                    }
                    return false;  // No digit works → dead end
                }
            }
        }
        return true;  // No empty cells → solved!
    }

    solve(board);
    return board;
}
```

## Palindrome Partitioning

**Problem:** Given a string, partition it such that every substring is a palindrome.

```javascript
function palindromePartition(s) {
    const result = [];

    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(index, current) {
        if (index === s.length) {
            result.push([...current]);
            return;
        }

        for (let end = index; end < s.length; end++) {
            if (isPalindrome(s, index, end)) {
                current.push(s.substring(index, end + 1));
                backtrack(end + 1, current);
                current.pop();
            }
        }
    }

    backtrack(0, []);
    return result;
}

console.log(palindromePartition("aab"));
// [["a","a","b"], ["aa","b"]]
```

## Word Search in a Grid

```javascript
function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function backtrack(row, col, index) {
        if (index === word.length) return true;

        if (
            row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            board[row][col] !== word[index]
        ) {
            return false;
        }

        // Mark visited
        const temp = board[row][col];
        board[row][col] = '#';

        const found =
            backtrack(row + 1, col, index + 1) ||  // Down
            backtrack(row - 1, col, index + 1) ||  // Up
            backtrack(row, col + 1, index + 1) ||  // Right
            backtrack(row, col - 1, index + 1);    // Left

        // Restore
        board[row][col] = temp;

        return found;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(wordSearch(board, "ABCCED")); // true
console.log(wordSearch(board, "SEE"));    // true
console.log(wordSearch(board, "ABCB"));   // false
```

**Time:** O(m × n × 4^L) where L = word length

## Generate Balanced Parentheses

**Problem:** Generate all combinations of n pairs of balanced parentheses.

```javascript
function generateParentheses(n) {
    const result = [];

    function backtrack(current, openCount, closeCount) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }

        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

console.log(generateParentheses(3));
// ["((()))","(()())","(())()","()(())","()()()"]
```

**Rules (pruning):**
- Can add '(' if `openCount < n`
- Can add ')' if `closeCount < openCount`

## Technique Summary

| Problem | Approach | Time | Key Insight |
|---------|----------|------|-------------|
| **N-Queens** | Row-by-row + diagonal sets | O(n!) | Use sets for O(1) conflict check |
| **Sudoku** | Cell-by-cell + row/col/box check | O(9^empty) | Find empty cell, try 1-9 |
| **Palindrome Part.** | Try all prefixes | O(n·2ⁿ) | Check palindrome, recurse on rest |
| **Word Search** | 4-direction DFS | O(m·n·4^L) | Mark visited on board itself |
| **Parentheses** | Open/close counts | O(4ⁿ/√n) | `close < open` ensures validity |

---

**Next:** [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/recursion/09-problem-solving) →
