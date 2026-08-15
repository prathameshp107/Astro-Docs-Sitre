---
title: "Types of Recursion"
description: "Direct, indirect, tail, head, and tree recursion — with examples and comparison table."
sidebar:
  order: 4
practice:
  visualizer: /visualizer/recursion
---

# Types of Recursion

![Recursion Types Overview](/DSA-Notes-Problems/assets/images/recursion/recursion-types.svg)

## Direct Recursion

A function calls **itself** directly.

```javascript
// Direct recursion: functionA → functionA → functionA → ...
function functionA(n) {
    if (n <= 0) return;
    console.log(n);
    functionA(n - 1);  // ← calls ITSELF
}
```

## Indirect Recursion

Function A calls Function B, which calls Function A (a cycle of calls).

```javascript
// Indirect recursion: functionA → functionB → functionA → ...
function functionA(n) {
    if (n <= 0) return;
    console.log("A:", n);
    functionB(n - 1);  // ← calls B
}

function functionB(n) {
    if (n <= 0) return;
    console.log("B:", n);
    functionA(n - 1);  // ← calls A
}

functionA(5);
// Output: A:5, B:4, A:3, B:2, A:1
```

```
Visualization:
    functionA(5) → functionB(4) → functionA(3) → functionB(2) → functionA(1) → STOP
```

## Tail Recursion

The recursive call is the **LAST** thing the function does. There's **nothing to do after** the recursive call returns.

```javascript
// ✅ TAIL RECURSIVE — recursive call is the LAST operation
function tailFactorial(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return tailFactorial(n - 1, n * accumulator);  // ← LAST thing. Nothing after this.
}

// ❌ NOT TAIL RECURSIVE — still need to multiply AFTER the recursive call returns
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // ← Must multiply n AFTER factorial(n-1) returns
}
```

**Why does tail recursion matter?**

Some languages/compilers optimize tail recursion into a loop (called **Tail Call Optimization / TCO**), so it uses **O(1) stack space** instead of O(n). JavaScript *technically* supports TCO in strict mode (ES6), but in practice, most engines (V8/Chrome, Node.js) do NOT implement it.

```
Non-tail factorial(4):                      Tail tailFactorial(4, 1):

factorial(4)                                tailFactorial(4, 1)
  4 * factorial(3)                          tailFactorial(3, 4)
    3 * factorial(2)                        tailFactorial(2, 12)
      2 * factorial(1)                      tailFactorial(1, 24)
        returns 1                           returns 24  ← direct answer!
      returns 2*1 = 2
    returns 3*2 = 6
  returns 4*6 = 24

Stack depth: O(n)                           Stack depth: O(n) without TCO
                                            Stack depth: O(1) with TCO ✨
```

## Head Recursion

The recursive call is the **FIRST** thing the function does. All processing happens **after** the recursive call returns.

```javascript
// HEAD RECURSION — recursive call is FIRST, processing happens AFTER
function headRecursion(n) {
    if (n === 0) return;

    headRecursion(n - 1);  // ← FIRST thing: recurse
    console.log(n);        // ← Processing happens AFTER return
}

headRecursion(5);
// Output: 1, 2, 3, 4, 5  ← numbers printed in ASCENDING order (reverse!)
```

Compare with processing BEFORE the recursive call:

```javascript
function beforeRecursion(n) {
    if (n === 0) return;

    console.log(n);        // ← Processing happens BEFORE recurse
    beforeRecursion(n - 1);
}

beforeRecursion(5);
// Output: 5, 4, 3, 2, 1  ← numbers printed in DESCENDING order
```

```
Key Insight:
    - Code BEFORE recursive call  → executed during WINDING   (going deeper)
    - Code AFTER  recursive call  → executed during UNWINDING (coming back)
```

## Tree Recursion

A function makes **more than one** recursive call. This creates a tree-like pattern.

```javascript
// TREE RECURSION — TWO recursive calls (binary tree)
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);  // ← TWO calls
}
```

**Recursion Tree for fibonacci(4):**

```
                        fib(4)
                      /        \
                   fib(3)      fib(2)
                  /     \      /     \
              fib(2)  fib(1) fib(1) fib(0)
              /    \    |      |      |
          fib(1) fib(0) 1     1      0
            |      |
            1      0
```

Results bubble up:
```
fib(1) = 1, fib(0) = 0
fib(2) = 1 + 0 = 1
fib(3) = fib(2) + fib(1) = 1 + 1 = 2
fib(4) = fib(3) + fib(2) = 2 + 1 = 3
```

> **Important:** Tree recursion typically has **exponential** time complexity (2ⁿ). This is where memoization/DP becomes critical.

## Summary Table

| Type | Description | Example | Stack Depth |
|------|-------------|---------|-------------|
| **Direct** | Function calls itself | `f(n) → f(n-1)` | O(n) |
| **Indirect** | A calls B, B calls A | `A(n) → B(n-1) → A(n-2)` | O(n) |
| **Tail** | Recursive call is LAST operation | `return f(n-1, acc)` | O(n) (O(1) with TCO) |
| **Head** | Recursive call is FIRST operation | `f(n-1); process();` | O(n) |
| **Tree** | Multiple recursive calls | `f(n-1) + f(n-2)` | O(n) |

---

**Next:** [Basic Recursion Problems](/DSA-Notes-Problems/data-structures/recursion/04-basic-problems) →
