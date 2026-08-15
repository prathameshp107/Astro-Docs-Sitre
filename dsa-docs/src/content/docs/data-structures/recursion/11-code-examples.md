---
title: "Code Examples"
description: "Additional JavaScript implementations: unique permutations, letter combinations, rat in a maze."
sidebar:
  order: 12
practice:
  visualizer: /visualizer/recursion
---

# Code Examples

## Unique Permutations (with Duplicates Handling)

```javascript
function uniquePermutations(str) {
    const result = [];
    const chars = str.split('').sort();  // Sort to group duplicates
    const used = new Array(chars.length).fill(false);

    function backtrack(current) {
        if (current.length === chars.length) {
            result.push(current.join(''));
            return;
        }

        for (let i = 0; i < chars.length; i++) {
            if (used[i]) continue;

            // Skip duplicates at same recursion level
            if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            current.push(chars[i]);
            backtrack(current);
            current.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

console.log(uniquePermutations("aba"));
// ["aab", "aba", "baa"]
```

## Letter Combinations of a Phone Number

```javascript
function letterCombinations(digits) {
    if (!digits.length) return [];

    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }

    backtrack(0, '');
    return result;
}

console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

## Subsets II (with Duplicates)

```javascript
function subsetsWithDup(nums) {
    const result = [];
    nums.sort((a, b) => a - b);

    function backtrack(start, current) {
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            // Skip duplicates at the same level
            if (i > start && nums[i] === nums[i - 1]) continue;

            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

console.log(subsetsWithDup([1, 2, 2]));
// [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

## Combination Sum II (Each Used Once)

```javascript
function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);

    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remaining) break;

            current.push(candidates[i]);
            backtrack(i + 1, current, remaining - candidates[i]);
            current.pop();
        }
    }

    backtrack(0, [], target);
    return result;
}

console.log(combinationSum2([10,1,2,7,6,1,5], 8));
// [[1,1,6], [1,2,5], [1,7], [2,6]]
```

## Rat in a Maze

```javascript
function ratInMaze(maze) {
    const n = maze.length;
    const result = [];
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    const directions = [
        [1, 0, 'D'],   // Down
        [0, -1, 'L'],  // Left
        [0, 1, 'R'],   // Right
        [-1, 0, 'U']   // Up
    ];

    function backtrack(row, col, path) {
        if (row === n - 1 && col === n - 1) {
            result.push(path);
            return;
        }

        for (const [dr, dc, dir] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < n &&
                maze[newRow][newCol] === 1 &&
                !visited[newRow][newCol]
            ) {
                visited[newRow][newCol] = true;
                backtrack(newRow, newCol, path + dir);
                visited[newRow][newCol] = false;
            }
        }
    }

    if (maze[0][0] === 1) {
        visited[0][0] = true;
        backtrack(0, 0, '');
    }

    return result;
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];

console.log(ratInMaze(maze));
// ["DDRDRR", "DRDDRR"]
```

## Tower of Hanoi

```javascript
function towerOfHanoi(n, source, target, auxiliary) {
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${target}`);
        return;
    }

    towerOfHanoi(n - 1, source, auxiliary, target);
    console.log(`Move disk ${n} from ${source} to ${target}`);
    towerOfHanoi(n - 1, auxiliary, target, source);
}

towerOfHanoi(3, 'A', 'C', 'B');
// Output: Shows all 7 moves to transfer 3 disks from A to C
```

---

**Next:** [Interview Questions](/DSA-Notes-Problems/data-structures/recursion/12-interview-questions) →
