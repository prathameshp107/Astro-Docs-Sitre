---
title: "Utility Methods"
description: "<a id=\"join\"</a join()"
sidebar:
  order: 22
---

# Utility Methods

<a id="join"></a>
## join()

Converts array to string.

```javascript
["a", "b", "c"].join("-");
// "a-b-c"
```

**Time:** O(n)

---

<a id="flat"></a>
## flat()

Flattens nested arrays.

```javascript
[1, [2, 3]].flat();
// [1, 2, 3]
```

**Time:** O(n)

---

<a id="flatmap"></a>
## flatMap()

map + flat in one pass.

```javascript
[1, 2, 3].flatMap(n => [n, n * 2]);
// [1,2,2,4,3,6]
```

**Time:** O(n)

---

<a id="interview-cheat-sheet"></a>