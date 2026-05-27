---
title: "JavaScript Array Methods"
description: "JavaScript array methods categorized by mutating vs non-mutating with examples and usage patterns."
sidebar:
  order: 2
---

# JavaScript Array Methods

## Non-Mutating Methods

These methods **do not** modify the original array — they return a new array or value.

| Method | Returns | Use Case |
|--------|---------|----------|
| `.map()` | New array | Transform every element |
| `.filter()` | New array | Keep elements that pass a test |
| `.reduce()` | Single value | Accumulate elements into one value |
| `.slice()` | New array | Extract a portion of an array |
| `.concat()` | New array | Merge two or more arrays |
| `.includes()` | Boolean | Check if element exists |
| `.find()` | Element or undefined | Find first element matching a condition |
| `.findIndex()` | Index or -1 | Find index of first matching element |
| `.every()` | Boolean | Check if ALL elements pass a test |
| `.some()` | Boolean | Check if ANY element passes a test |
| `.flat()` | New array | Flatten nested arrays |
| `.flatMap()` | New array | Map then flatten one level |

### Examples

```javascript
const arr = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = arr.map(x => x * 2);     // [2, 4, 6, 8, 10]

// filter — keep elements passing condition
const evens = arr.filter(x => x % 2 === 0);  // [2, 4]

// reduce — accumulate
const sum = arr.reduce((acc, x) => acc + x, 0);  // 15

// slice — extract portion
const mid = arr.slice(1, 4);  // [2, 3, 4]

// find — first element matching
const firstEven = arr.find(x => x % 2 === 0);  // 2

// some / every
arr.some(x => x > 3);   // true
arr.every(x => x > 0);  // true
```

## Mutating Methods ⚠️

These methods **modify the original array** in place.

| Method | Effect | Notes |
|--------|--------|-------|
| `.push()` | Add to end | Returns new length |
| `.pop()` | Remove from end | Returns removed element |
| `.shift()` | Remove from start | Returns removed element |
| `.unshift()` | Add to start | Returns new length |
| `.splice()` | Add/remove at index | Swiss Army knife of mutations |
| `.reverse()` | Reverse in-place | Mutates original |
| `.sort()` | Sort in-place | Defaults to string sort! |
| `.fill()` | Fill with value | Overwrites elements |

### Examples

```javascript
const arr = [1, 2, 3, 4, 5];

// push / pop — stack operations
arr.push(6);        // [1, 2, 3, 4, 5, 6]
arr.pop();          // [1, 2, 3, 4, 5]

// shift / unshift — queue operations
arr.shift();        // [2, 3, 4, 5]
arr.unshift(1);     // [1, 2, 3, 4, 5]

// splice — most versatile
arr.splice(2, 1);         // Remove 1 element at index 2 → [1, 2, 4, 5]
arr.splice(2, 0, 3);      // Insert 3 at index 2 → [1, 2, 3, 4, 5]

// sort with comparator (IMPORTANT!)
const nums = [10, 5, 20];
nums.sort();                    // ❌ [10, 20, 5] — string sort!
nums.sort((a, b) => a - b);     // ✅ [5, 10, 20] — numeric sort
```

## Splice vs Slice — VERY COMMON Interview Question

| Feature | `splice()` | `slice()` |
|---------|-----------|-----------|
| **Mutates?** | ✅ YES (modifies original) | ❌ NO (returns new) |
| **Parameters** | `(start, deleteCount, ...items)` | `(start, end)` |
| **Returns** | Removed elements | Extracted elements |
| **Purpose** | Add/remove elements | Copy/extract elements |

```javascript
const arr = [1, 2, 3, 4, 5];

// slice — just copies
const copy = arr.slice(1, 3);   // [2, 3] — arr unchanged

// splice — modifies original
const removed = arr.splice(1, 2); // removes [2, 3], arr is now [1, 4, 5]
```

## Most Asked Interview Patterns

1. **map** — transform data
2. **filter** — filter data
3. **reduce** — aggregate data
4. **splice vs slice** — understand the difference
5. **sort with comparator** — numeric sorting
6. **find vs filter** — first match vs all matches
7. **some vs every** — any vs all condition

---

**Next:** [Map & Set Patterns](/DSA-Notes-Problems/data-structures/interview-prep/02-map-set-patterns) →
