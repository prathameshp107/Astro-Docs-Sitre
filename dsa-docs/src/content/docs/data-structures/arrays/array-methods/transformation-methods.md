---
title: "­ Transformation Methods"
description: "<a id=\"map\"</a map()"
sidebar:
  order: 1
practice:
  visualizer: /visualizer/arrays
---

# ­ Transformation Methods

<a id="map"></a>
## map()

Creates a new array by transforming each element.

```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// [2, 4, 6]
```

**Time:** O(n)
**Mutates original?** No

---

<a id="filter"></a>
## filter()

Returns elements that match a condition.

```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
// [2, 4]
```

**Time:** O(n)
**Mutates original?** No

---

<a id="reduce"></a>
## reduce()

Reduces array to a single value.

```javascript
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
// 10
```

**Time:** O(n)
**Mutates original?** No

---

<a id="extract-copy-methods"></a>