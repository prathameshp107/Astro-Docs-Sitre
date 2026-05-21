---
title: "How to Find Time Complexity (Step-by-Step)"
description: "Runs n times O(n)"
sort: 10
---

#  How to Find Time Complexity (Step-by-Step)

## Step 1: Ignore Constants

```js
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

Runs **n times**  **O(n)**

---

##  Step 2: Count Loops

### Single Loop O(n)

```js
for (let i = 0; i < n; i++) {
  // constant work
}
```

---

### Nested Loops  Multiply

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // work
  }
}
```

Total =  **O(n²)**

---

### Consecutive Loops Add

```js
for (let i = 0; i < n; i++) {}
for (let j = 0; j < n; j++) {}
```

n + n = 2n **O(n)**

---

## Step 3: Input Halving O(log n)

```js
while (n > 1) {
  n = n / 2;
}
```

 **O(log n)**

---

## Step 4: Recursion

### Simple Recursion

```js
function fun(n) {
  if (n <= 1) return;
  fun(n - 1);
}
```

**O(n)**

---

### Branching Recursion

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

**O(2)**

---

## Step 5: Drop Non-Dominant Terms

```
O(n² + n + 10) + O(n²)
```

---

##  Step 6: Drop Constant Multipliers

```
O(5n)  O(n)
O(1000) ’ O(1)
```

---