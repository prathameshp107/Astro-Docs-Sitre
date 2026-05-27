---
title: "Algorithm Basics"
description: "An algorithm is a finite sequence of steps used to solve a problem."
sidebar:
  order: 1
---

# Algorithm Basics

An **algorithm** is a finite sequence of steps used to solve a problem.

## Example

```javascript
function findMax(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}
```

**Time:** O(n)
**Space:** O(1)

---

<a id="time-complexity"></a>