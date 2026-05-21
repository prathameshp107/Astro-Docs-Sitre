---
title: "Search / Check Methods"
description: "<a id=\"includes\"</a includes()"
---

# Search / Check Methods

<a id="includes"></a>
## includes()

Checks if value exists.

```javascript
arr.includes(20);
```

**Time:** O(n) **Mutates?**  No

---

<a id="indexof"></a>
## indexOf()

Returns first index of value.

```javascript
arr.indexOf(30);
```

**Time:** O(n)

---

<a id="find"></a>
## find()

Returns first matching element.

```javascript
.find(u => u.id === 1);
```e:** O(n)

---

<a id="findindex"></a>
## findIndex()

Returns index of first match.

```javascript
users.findIndex(u => u.id === 1);
```

**Time:** O(n)

---

<a id="some"></a>
## some()

Returns true if **any** element matches.

```javascript
arr.some(n => n > 10);
```

**Time:** O(n)

---

<a id="every"></a>
## every()

Returns true if **all** elements match.

```javascript
arr.every(n => n > 0);
```

**Time:** O(n)

---

<a id="utility-methods"></a>