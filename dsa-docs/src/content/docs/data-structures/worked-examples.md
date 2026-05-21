---
title: "Worked Examples"
description: "’ O(n)"
sidebar:
  order: 12
---

# Worked Examples

## Example 1

```js
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

’ **O(n)**

---

## Example 2

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    console.log(i, j);
  }
}
```
 **O(n²)**

---

## Example 3

```js
while (n > 1) {
  n = Math.floor(n / 2);
}
```

**O(log n)**

---

## Example 4

```js
for (let i = 0; i < n; i++) {
  binarySearch(arr);
}
```

**O(n log n)**

---


---

<a id="space-complexity"></a>