---
title: "Modify (Mutating) Methods"
description: "These change the original array (important in interviews)"
sort: 20
---

# Modify (Mutating) Methods

These change the original array (important in interviews)

---

<a id="splice"></a>
## splice()

Adds/removes elements at a specific index.

```javascript
const arr = [10, 20, 30, 40];
arr.splice(1, 2);
// removes 2 items starting at index 1
// arr = [10, 40]
```

e:** O(n)
**Mutates original?**  Yes### Insert using splice

```javascript
const arr = [10, 30];
arr.splice(1, 0, 20);
// [10, 20, 30]
```

---

<a id="push"></a>
## push()

Adds to end.

```javascript
arr.push(50);
```

**Time:** O(1) amortized
**Mutates?**  Yes

---

<a id="pop"></a>
## pop()

Removes from end.

```javascript
arr.pop();
```

**Time:** O(1)
**Mutates?**  Yes

---

<a id="unshift"></a>
## unshift()

Adds to start.

```javascript
arr.unshift(5);
```

**Time:** O(n)
**Mutates?**  Yes

---

<a id="shift"></a>
## shift()

Removes from start.

```javascript
arr.shift();
```

**Time:** O(n)
**Mutates?**  Yes

---

<a id="reverse"></a>
## reverse()

Reverses the array in place.

```javascript
arr.reverse();
```

**Time:** O(n)
**Mutates?**  Yes

---

<a id="sort"></a>
## sort()

Sorts the array in place.

```javascript
arr.sort((a, b) => a - b);
```

**Time:** O(n log n)
**Mutates?** Yes

Always pass comparator for numbers.

---

<a id="search-check-methods"></a>