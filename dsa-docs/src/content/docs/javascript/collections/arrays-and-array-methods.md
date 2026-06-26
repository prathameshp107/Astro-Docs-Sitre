---
title: "Arrays & Array Methods"
description: "Creating arrays, mutating vs non-mutating methods, map/filter/reduce, slice vs splice, spread, and destructuring."
sidebar:
  order: 15
---

## Arrays & Array Methods

Arrays are ordered, indexed collections. They're objects under the hood, but with special behavior for numeric indices and a rich set of built-in methods.

### Creating Arrays

```javascript
const arr1 = [1, 2, 3];                     // literal
const arr2 = new Array(3);                  // [empty × 3]
const arr3 = Array.from("hello");           // ['h','e','l','l','o']
const arr4 = Array.from({length: 3}, (_, i) => i); // [0, 1, 2]
const arr5 = Array.of(1, 2, 3);             // [1, 2, 3]
```

### Indexing & Length

```javascript
const fruits = ["apple", "banana", "cherry"];
fruits[0];      // "apple"
fruits[2];      // "cherry"
fruits.length;  // 3
fruits[fruits.length - 1]; // "cherry" (last element)
```

### Mutating vs Non-Mutating Methods

**Mutating (changes original):**

```javascript
const arr = [1, 2, 3];
arr.push(4);          // [1, 2, 3, 4]     (add to end)
arr.pop();            // [1, 2, 3]         (remove from end)
arr.unshift(0);       // [0, 1, 2, 3]      (add to start)
arr.shift();          // [1, 2, 3]         (remove from start)
arr.splice(1, 1);     // [1, 3]            (remove 1 at index 1)
arr.sort();           // sorts in place
arr.reverse();        // reverses in place
```

**Non-mutating (returns new array):**

```javascript
const arr = [1, 2, 3];
arr.slice(1, 3);      // [2, 3]            (original unchanged)
arr.concat([4, 5]);   // [1, 2, 3, 4, 5]
arr.map(n => n * 2);  // [2, 4, 6]
arr.filter(n => n > 1); // [2, 3]
[...arr, 4];          // [1, 2, 3, 4]
```

### `slice` vs `splice`

```javascript
const arr = [1, 2, 3, 4, 5];

// slice — non-mutating, returns a copy
arr.slice(1, 3);    // [2, 3] (indexes 1 to 3-exclusive)
arr.slice(-2);      // [4, 5] (last 2)
// arr is still [1, 2, 3, 4, 5]

// splice — mutating, removes/replaces
arr.splice(1, 2);   // removes [2, 3], arr is now [1, 4, 5]
arr.splice(1, 0, 10, 20); // inserts at index 1
```

### `map`, `filter`, `reduce`

```javascript
const nums = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter — keep elements that pass test
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce — accumulate to single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Chaining
const result = nums
  .filter(n => n > 2)
  .map(n => n * 10)
  .reduce((a, b) => a + b, 0);
// filter: [3, 4, 5] → map: [30, 40, 50] → reduce: 120
```

### `find`, `some`, `every`, `forEach`

```javascript
const nums = [10, 20, 30, 40];

nums.find(n => n > 25);      // 30  (first match)
nums.findIndex(n => n > 25); // 2   (index of match)
nums.some(n => n > 50);      // false
nums.every(n => n > 5);      // true
nums.forEach((n, i) => console.log(i, n));
```

### `sort` Gotcha

```javascript
[1, 10, 2, 20].sort();         // [1, 10, 2, 20] ← sorts as strings!
[1, 10, 2, 20].sort((a, b) => a - b); // [1, 2, 10, 20] ✅
```

### Spread & Destructuring

```javascript
// Spread
const first = [1, 2, 3];
const second = [4, 5];
const combined = [...first, ...second]; // [1, 2, 3, 4, 5]

// Destructuring
const [a, b, c] = [10, 20, 30];   // a=10, b=20, c=30
const [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]
const [, secondItem] = [100, 200]; // secondItem=200 (skip first)
```

### Key Takeaways

- Prefer non-mutating methods (`map`, `filter`, `slice`) for predictable code
- `map` transforms, `filter` selects, `reduce` accumulates — master these three
- Always pass a compare function to `sort()` for numbers
- `slice` copies, `splice` mutates — they sound similar but behave differently
- Use spread (`...`) and destructuring for clean array operations
- `forEach` is for side effects; use `map`/`filter`/`reduce` for transformations
