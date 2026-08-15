---
title: "Real-World Applications"
description: "Real-world uses of recursion: file systems, game AI, compilers, pathfinding, and more."
sidebar:
  order: 15
practice:
  visualizer: /visualizer/recursion
---

# Real-World Applications

## File System Traversal

File systems are **trees** — naturally recursive!

```
       root/
       ├── src/
       │   ├── index.js
       │   ├── utils/
       │   │   ├── helper.js
       │   │   └── math.js
       │   └── app.js
       ├── README.md
       └── package.json
```

```javascript
function listAllFiles(directory) {
    const results = [];

    function traverse(node, path) {
        if (node.type === 'file') {
            results.push(path + '/' + node.name);
            return;
        }

        for (const child of node.children) {
            traverse(child, path + '/' + node.name);
        }
    }

    traverse(directory, '');
    return results;
}
```

## Game Solving (Tic-Tac-Toe Minimax)

Recursion explores ALL possible future game states. Backtracking allows undoing moves.

```javascript
function canWin(board, player) {
    const winner = checkWinner(board);
    if (winner === player) return true;
    if (winner !== null) return false;
    if (isBoardFull(board)) return false; // Draw

    const opponent = player === 'X' ? 'O' : 'X';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '.') {
                board[i][j] = player;                   // Choose
                if (!canWin(board, opponent)) {          // Explore
                    board[i][j] = '.';                   // Un-choose (for cleanup)
                    return true;
                }
                board[i][j] = '.';                       // Un-choose
            }
        }
    }

    return false;
}
```

## Other Real-World Applications

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  📁 FILE SYSTEMS          → Directory traversal          │
│  🌐 WEB CRAWLING          → Follow links recursively     │
│  🧮 MATH EXPRESSIONS      → Parse nested parentheses     │
│  🎨 FRACTAL GENERATION    → Sierpinski triangle, Koch    │
│  🧬 DNA SEQUENCE MATCHING → Try all alignments           │
│  📦 JSON/XML PARSING      → Nested structure traversal   │
│  🗺️ PATHFINDING           → Maze solving, Google Maps    │
│  ♟️ GAME AI               → Chess, Go, Tic-Tac-Toe      │
│  📊 COMPILER DESIGN       → Recursive descent parsing    │
│  🔐 CRYPTOGRAPHY          → Brute force / pattern match  │
│  🏗️ TOWER OF HANOI        → Classic recursive puzzle     │
│  📋 DEPENDENCY RESOLUTION → npm, package managers        │
│  🧩 CONSTRAINT SOLVING    → Sudoku, crossword puzzles    │
│  🔄 UNDO/REDO SYSTEMS     → State backtracking           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Related Topics

- [Trees](/DSA-Notes-Problems/data-structures/trees) — Most tree algorithms (traversals, height, LCA) are inherently recursive
- [Graphs](/DSA-Notes-Problems/data-structures/graphs) — DFS, cycle detection, topological sort use recursion
- [Stacks & Queues](/DSA-Notes-Problems/data-structures/stacks-queues/stack-lifo) — The call stack is a LIFO structure

*Happy Coding! 🚀*
