---
title: "HashMap in JavaScript"
description: "In JS, a HashMap is implemented using:"
sidebar:
  order: 27
---

# HashMap in JavaScript

In JS, a **HashMap** is implemented using:

* `Map` (preferred modern way)
* plain object `{}` (older way)

---

## Using Map (Recommended)

### Create Map

```javascript
const map = new Map();
```

---

## Basic Operations

### set() insert/update

```javascript
map.set("name", "John");
map.set("age", 25);
```

**Time:** O(1)

---

### get() retrieve

```javascript
map.get("name"); // "John"
```

**Time:** O(1)

---

### has() check existence

```javascript
map.has("age"); // true
```

**Time:** O(1)

---

### delete()

```javascript
map.delete("age");
```

**Time:** O(1)

---

### size

```javascript
map.size;
```

---

## Example Walkthrough

```javascript
const freq = new Map();

const arr = [1, 2, 2, 3];

for (let num of arr) {
  freq.set(num, (freq.get(num) || 0) + 1);
}

console.log(freq);
// Map {1 => 1, 2 => 2, 3 => 1}
```

 Very common interview pattern

---