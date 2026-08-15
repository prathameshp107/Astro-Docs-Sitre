---
title: "Extract / Copy Methods"
description: "<a id=\"slice\"</a slice()"
sidebar:
  order: 2
practice:
  visualizer: /visualizer/arrays
---

#  Extract / Copy Methods

<a id="slice"></a>
## slice()

Returns a shallow copy of part of an array.

```javascript
const arr = [10, 20, 30, 40];
const part = arr.slice(1, 3);
// [20, 30]
```

**Time:** O(k)
**Mutates original?**  No

Interview trap: **slice does NOT modify**

---

<a id="concat"></a>
## concat()

Merges arrays.

```javascript
const a = [1, 2];
const b = [3, 4];
const result = a.concat(b);
// [1, 2, 3, 4]
```

**Time:** O(n + m)
**Mutateginal?**  No

---

<a id="modify-mutating-methods"></a>