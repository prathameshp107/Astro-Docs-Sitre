---
title: "O(log n)  Logarithmic"
description: "while (left <= right) { let mid = Math.floor((left + right) / 2);"
---

# O(log n)  Logarithmic

## Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

---