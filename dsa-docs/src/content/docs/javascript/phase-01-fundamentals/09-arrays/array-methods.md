---
title: Array Methods
description: Essential JavaScript array methods for adding, removing, and manipulating elements
sidebar:
  order: 2
---

# Array Methods

## Introduction

JavaScript arrays have a rich set of methods for manipulating data. These can be categorized as **mutating** (change the original array) and **non-mutating** (return a new array).

## Visual Explanation

```mermaid
flowchart TD
    A["Array Methods"]
    B["Add/Remove"]
    C["Extract"]
    D["Search"]
    
    B1["push — end"]
    B2["pop — end"]
    B3["unshift — start"]
    B4["shift — start"]
    B5["splice — anywhere"]
    
    C1["slice"]
    C2["concat"]
    C3["join"]
    
    D1["indexOf"]
    D2["includes"]
    D3["find"]
    D4["findIndex"]
    
    A --> B --> B1 & B2 & B3 & B4 & B5
    A --> C --> C1 & C2 & C3
    A --> D --> D1 & D2 & D3 & D4
```

## Mutating Methods

```javascript
const arr = [1, 2, 3];

arr.push(4);      // [1, 2, 3, 4] — add to end
arr.pop();        // [1, 2, 3] — remove from end
arr.unshift(0);   // [0, 1, 2, 3] — add to start
arr.shift();      // [1, 2, 3] — remove from start
arr.splice(1, 1, 'a'); // [1, 'a', 3] — replace at index
```

## Non-Mutating Methods

```javascript
const arr = [1, 2, 3, 4, 5];

arr.slice(1, 3);     // [2, 3] — extract portion
arr.concat([6, 7]);  // [1, 2, 3, 4, 5, 6, 7]
arr.join('-');       // '1-2-3-4-5'
[...arr];            // shallow copy
```

## Search Methods

```javascript
[1, 2, 3].indexOf(2);    // 1
[1, 2, 3].includes(2);   // true
[1, 2, 3].find(x => x > 1); // 2
[1, 2, 3].findIndex(x => x > 1); // 1
```

## Summary

- `push/pop` — fast operations at the end
- `shift/unshift` — slower (re-indexes array)
- `splice` — versatile add/remove/replace
- `slice` — safe, non-mutating extraction

## Further Reading

- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
