---
title: "Set in JavaScript"
description: "A Set stores unique values only."
---

# Set in JavaScript

A **Set** stores **unique values only**.

 No duplicates allowed
 Order preserved
 Fast lookup

---

## Create Set

```javascript
const set = new Set();
```

---
sic Operations
d()

```javascript
set.add(1);
set.add(2);
set.add(2); // ignored
```

Result:

```
Set {1, 2}
```

**Time:** O(1)

---

### has()

```javascript
set.has(2); // true
```

---

### delete()

```javascript
set.delete(1);
```

---

### size

```javascript
set.size;
```

---