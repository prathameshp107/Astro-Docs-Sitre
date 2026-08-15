---
title: "Basic Recursion Problems"
description: "Fundamental recursion problems with step-by-step solutions: factorial, Fibonacci, reverse, subsequences."
sidebar:
  order: 5
practice:
  visualizer: /visualizer/recursion
---

# Basic Recursion Problems

## Factorial

**Problem:** Calculate n! = n × (n-1) × (n-2) × ... × 1

**Mathematical Definition (already recursive!):**
```
factorial(0) = 1           (base case)
factorial(n) = n * factorial(n - 1)   (recursive case)
```

```javascript
function factorial(n) {
    // Base case: 0! = 1, 1! = 1
    if (n <= 1) return 1;

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
```

**Dry Run for factorial(5):**
```
factorial(5) → 5 * factorial(4)
                   → 4 * factorial(3)
                       → 3 * factorial(2)
                           → 2 * factorial(1)
                               → 1 * factorial(0)
                                   → returns 1 (base case)
                               → returns 1 * 1 = 1
                           → returns 2 * 1 = 2
                       → returns 3 * 2 = 6
                   → returns 4 * 6 = 24
               → 5 * 24 = 120
```

**Time:** O(n) — n function calls | **Space:** O(n) — n frames on the call stack

## Fibonacci

**Problem:** Find the nth Fibonacci number. Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

**Mathematical Definition:**
```
fib(0) = 0           (base case)
fib(1) = 1           (base case)
fib(n) = fib(n-1) + fib(n-2)   (recursive case)
```

```javascript
// Naive recursive — O(2ⁿ) exponential!
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5));  // 5
console.log(fibonacci(10)); // 55

// Optimized with Memoization — O(n)
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

console.log(fibMemo(50)); // 12586269025 (instant!)
```

![Fibonacci Recursion Tree](/DSA-Notes-Problems/assets/images/recursion/recursion-tree-fibonacci.svg)

**Key insight:** Naive fib has O(2ⁿ) — the recursion tree grows exponentially. With memoization, it drops to O(n) because each value is computed only once.

## Sum of N Numbers

**Problem:** Calculate 1 + 2 + 3 + ... + n

```javascript
function sumOfN(n) {
    if (n === 1) return 1;       // Base case
    return n + sumOfN(n - 1);    // Recursive case
}

console.log(sumOfN(5));    // 15
console.log(sumOfN(100));  // 5050
```

**Thinking:**
```
sum(5) = 5 + sum(4)
sum(4) = 4 + sum(3)
...
sum(1) = 1 (base case)
```

## Reverse a String / Array

```javascript
// Reverse string
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("hello"));  // "olleh"

// Reverse array in-place (two-pointer approach)
function reverseArray(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return arr;

    // Swap
    [arr[start], arr[end]] = [arr[end], arr[start]];

    // Recurse inward
    return reverseArray(arr, start + 1, end - 1);
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
```

## Check if Array is Sorted

```javascript
function isSorted(arr, index = 0) {
    if (index >= arr.length - 1) return true;
    if (arr[index] > arr[index + 1]) return false;
    return isSorted(arr, index + 1);
}

console.log(isSorted([1, 3, 5, 7]));  // true
console.log(isSorted([1, 5, 3, 7]));  // false
```

## Sum of Digits

```javascript
function digitSum(n) {
    if (n === 0) return 0;
    return (n % 10) + digitSum(Math.floor(n / 10));
}

console.log(digitSum(1234)); // 1 + 2 + 3 + 4 = 10
```

## Palindrome Check

```javascript
function isPalindrome(str, left = 0, right = str.length - 1) {
    if (left >= right) return true;
    if (str[left] !== str[right]) return false;
    return isPalindrome(str, left + 1, right - 1);
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

---

**Next:** [Recursion Patterns](/DSA-Notes-Problems/data-structures/recursion/05-patterns) →
