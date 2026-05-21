

# 📘 Recursion & Backtracking — The Ultimate Comprehensive Guide

> **From Zero to Interview-Ready**
> Written as if explaining to a brilliant 10-year-old, escalating to interview mastery.

---

## 📑 Table of Contents

1. [Introduction to Recursion](#1-introduction-to-recursion)
2. [Understanding the Call Stack](#2-understanding-the-call-stack)
3. [Types of Recursion](#3-types-of-recursion)
4. [Basic Recursion Problems](#4-basic-recursion-problems)
5. [Recursion Patterns](#5-recursion-patterns)
6. [Introduction to Backtracking](#6-introduction-to-backtracking)
7. [Backtracking Patterns](#7-backtracking-patterns)
8. [Key Concepts in Backtracking](#8-key-concepts-in-backtracking)
9. [Problem-Solving Approach](#9-problem-solving-approach)
10. [Time and Space Complexity](#10-time-and-space-complexity)
11. [Code Examples (JavaScript)](#11-code-examples-javascript)
12. [Must-Do Interview Questions](#12-must-do-interview-questions)
13. [Common Mistakes](#13-common-mistakes)
14. [Tips and Tricks](#14-tips-and-tricks)
15. [Real-World Applications](#15-real-world-applications)

---

# 1. Introduction to Recursion

## 1.1 What Is Recursion?

**Recursion is when a function calls itself to solve a smaller version of the same problem, until it reaches a case so simple that it can be answered directly.**

That's it. Read it again. It is the single most important sentence in this entire guide.

```
recursion (noun):
    See → recursion
```

In programming terms:

```javascript
function doSomething() {
    // ... some work ...
    doSomething(); // ← the function calls ITSELF
}
```

## 1.2 Why Is Recursion Used?

| Reason | Explanation |
|--------|-------------|
| **Natural fit for self-similar problems** | Trees, graphs, nested structures are inherently recursive |
| **Cleaner code** | Recursive solutions are often shorter and more elegant than iterative ones |
| **Divide & Conquer** | Break big problems into identical smaller sub-problems |
| **Required for backtracking** | Backtracking is built on top of recursion |
| **Foundation for DP** | Dynamic Programming starts with a recursive solution |

> **When NOT to use recursion:**
> When a simple loop does the job (e.g., summing an array). Don't force recursion.

## 1.3 Real-Life Analogy

### 🪆 The Russian Nesting Dolls (Matryoshka)

Imagine you have a Russian nesting doll. You want to find the smallest doll inside.

```
Step 1: Open the biggest doll       → find a smaller doll inside
Step 2: Open the smaller doll       → find an even smaller doll inside
Step 3: Open the even smaller doll  → find the TINIEST doll (can't open)
Step 4: STOP. You found the smallest doll. ← This is the BASE CASE.
```

**The "opening" is the recursive step. The tiniest doll you can't open is the base case.**

### 🏠 Another Analogy: Counting People in a Line

You're standing in a long line and want to know your position. You can only talk to the person directly in front of you.

```
You:        "Hey, what position are you?"
Person 4:   "I don't know, let me ask..." → asks Person 3
Person 3:   "I don't know, let me ask..." → asks Person 2
Person 2:   "I don't know, let me ask..." → asks Person 1
Person 1:   "I'm FIRST!" (BASE CASE — they can see the front)
Person 2:   "Oh, then I'm 1 + 1 = 2" → tells Person 3
Person 3:   "Oh, then I'm 2 + 1 = 3" → tells Person 4
Person 4:   "Oh, then I'm 3 + 1 = 4" → tells you
You:        "I'm 4 + 1 = 5!"
```

> Notice: The question goes FORWARD (deeper), the answer comes BACKWARD (unwinding).

## 1.4 Structure of a Recursive Function

Every recursive function has **exactly two essential parts**:

```
┌─────────────────────────────────────────────┐
│           RECURSIVE FUNCTION                │
│                                             │
│   1. BASE CASE (when to STOP)               │
│      └─ Returns a direct answer             │
│      └─ Without this → INFINITE RECURSION   │
│                                             │
│   2. RECURSIVE CASE (when to CONTINUE)      │
│      └─ Calls itself with SMALLER input     │
│      └─ Must make PROGRESS toward base case │
│                                             │
└─────────────────────────────────────────────┘
```

### Template:

```javascript
function recursiveFunction(input) {
    // ===== BASE CASE =====
    // The simplest version of the problem that we can answer directly.
    if (input reaches simplest form) {
        return directAnswer;
    }

    // ===== RECURSIVE CASE =====
    // Break the problem into a smaller version and call yourself.
    return someOperation + recursiveFunction(smallerInput);
}
```

### Example: Countdown

```javascript
function countdown(n) {
    // BASE CASE: When n reaches 0, stop.
    if (n === 0) {
        console.log("Done!");
        return;
    }

    // RECURSIVE CASE: Print n, then count down from n-1.
    console.log(n);
    countdown(n - 1);  // ← n is getting SMALLER → progress toward base case
}

countdown(5);
// Output: 5, 4, 3, 2, 1, Done!
```

## 1.5 Call Stack Visualization (Step-by-Step Dry Run)

Let's trace `countdown(3)` **step by step**:

```
STEP 1: countdown(3) is called
        → n = 3, not 0 → print 3 → call countdown(2)

STEP 2: countdown(2) is called
        → n = 2, not 0 → print 2 → call countdown(1)

STEP 3: countdown(1) is called
        → n = 1, not 0 → print 1 → call countdown(0)

STEP 4: countdown(0) is called
        → n = 0 → BASE CASE HIT → print "Done!" → return

STEP 5: countdown(1) finishes → return
STEP 6: countdown(2) finishes → return
STEP 7: countdown(3) finishes → return
```

**The Call Stack (visualized like a stack of plates):**

```
         ┌──────────────┐
Step 4:  │ countdown(0)  │  ← TOP (currently executing) → BASE CASE, returns
         ├──────────────┤
Step 3:  │ countdown(1)  │  ← waiting for countdown(0) to finish
         ├──────────────┤
Step 2:  │ countdown(2)  │  ← waiting for countdown(1) to finish
         ├──────────────┤
Step 1:  │ countdown(3)  │  ← waiting for countdown(2) to finish
         └──────────────┘
              BOTTOM
              
After base case, the stack UNWINDS (pops one by one from top):
    countdown(0) returns → popped
    countdown(1) returns → popped
    countdown(2) returns → popped
    countdown(3) returns → popped → DONE
```

---

# 2. Understanding the Call Stack

## 2.1 How Function Calls Are Stored

When **any** function is called (not just recursive ones), the computer:

1. **Creates a "stack frame"** — a block of memory holding:
   - The function's local variables
   - The arguments passed
   - The return address (where to go back to when done)
2. **Pushes** this frame onto the **call stack**
3. When the function returns, its frame is **popped** off the stack

```
The Call Stack is a LIFO (Last In, First Out) data structure.

Think of it like a stack of cafeteria trays:
    - You can only add/remove from the TOP
    - The last tray put on top is the first one taken off
```

## 2.2 Detailed Visual Dry Run

Let's trace `factorial(4)`:

```javascript
function factorial(n) {
    if (n <= 1) return 1;       // Base case
    return n * factorial(n - 1); // Recursive case
}
```

### Phase 1: WINDING (Going Deeper)

```
Call: factorial(4)
    → 4 * factorial(3)             // doesn't know factorial(3) yet, must compute
    
    Call: factorial(3)
        → 3 * factorial(2)         // doesn't know factorial(2) yet, must compute
        
        Call: factorial(2)
            → 2 * factorial(1)     // doesn't know factorial(1) yet, must compute
            
            Call: factorial(1)
                → returns 1        // BASE CASE HIT!
```

**Stack at deepest point:**
```
         ┌────────────────────────────┐
         │ factorial(1) → returns 1   │  ← TOP
         ├────────────────────────────┤
         │ factorial(2) → 2 * ???     │
         ├────────────────────────────┤
         │ factorial(3) → 3 * ???     │
         ├────────────────────────────┤
         │ factorial(4) → 4 * ???     │
         └────────────────────────────┘
               BOTTOM (first call)
```

### Phase 2: UNWINDING (Coming Back Up)

```
factorial(1) returns 1
    → factorial(2) now knows: 2 * 1 = 2, returns 2
        → factorial(3) now knows: 3 * 2 = 6, returns 6
            → factorial(4) now knows: 4 * 6 = 24, returns 24

ANSWER: 24
```

**Stack unwinding:**
```
Step A:  factorial(1) returns 1    → popped
         ┌────────────────────────────┐
         │ factorial(2) → 2 * 1 = 2  │  ← now computable
         ├────────────────────────────┤
         │ factorial(3) → 3 * ???    │
         ├────────────────────────────┤
         │ factorial(4) → 4 * ???    │
         └────────────────────────────┘

Step B:  factorial(2) returns 2    → popped
         ┌────────────────────────────┐
         │ factorial(3) → 3 * 2 = 6  │  ← now computable
         ├────────────────────────────┤
         │ factorial(4) → 4 * ???    │
         └────────────────────────────┘

Step C:  factorial(3) returns 6    → popped
         ┌────────────────────────────┐
         │ factorial(4) → 4 * 6 = 24 │  ← now computable
         └────────────────────────────┘

Step D:  factorial(4) returns 24   → popped
         ┌────────────────────────────┐
         │         (empty)            │
         └────────────────────────────┘
         
RESULT: 24
```

## 2.3 Stack Overflow

**What happens if there is no base case, or the base case is never reached?**

```javascript
// ⚠️ DANGER: No base case!
function infinite(n) {
    return infinite(n);  // calls itself forever
}
```

```
Stack:
    ┌─────────────┐
    │ infinite(5)  │
    ├─────────────┤
    │ infinite(5)  │
    ├─────────────┤
    │ infinite(5)  │
    ├─────────────┤
    │     ...      │  ← Stack grows and grows
    ├─────────────┤
    │ infinite(5)  │
    └─────────────┘
    
Eventually the stack runs out of memory → CRASH!
Error: "Maximum call stack size exceeded" (Stack Overflow)
```

**Key rule:** Every recursive call MUST make progress toward the base case.

```
n → n-1 → n-2 → ... → 0 (base case)     ✅ Makes progress
n → n   → n   → ... → n (forever)         ❌ No progress
```

---

# 3. Types of Recursion

## 3.1 Direct Recursion

A function calls **itself** directly.

```javascript
// Direct recursion: functionA → functionA → functionA → ...
function functionA(n) {
    if (n <= 0) return;
    console.log(n);
    functionA(n - 1);  // ← calls ITSELF
}
```

## 3.2 Indirect Recursion

Function A calls Function B, which calls Function A (a cycle of calls).

```javascript
// Indirect recursion: functionA → functionB → functionA → functionB → ...
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
    functionA(5) → functionB(4) → functionA(3) → functionB(2) → functionA(1) → functionB(0) → STOP
```

## 3.3 Tail Recursion

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

## 3.4 Head Recursion

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

## 3.5 Tree Recursion

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

```
Results bubble up:
    fib(1) = 1, fib(0) = 0
    fib(2) = 1 + 0 = 1
    fib(3) = fib(2) + fib(1) = 1 + 1 = 2
    fib(4) = fib(3) + fib(2) = 2 + 1 = 3
```

> **Important:** Tree recursion typically has **exponential** time complexity (2^n). This is where memoization/DP becomes critical.

### Summary Table

| Type | Description | Example |
|------|-------------|---------|
| **Direct** | Function calls itself | `f(n) → f(n-1)` |
| **Indirect** | Function A calls B, B calls A | `A(n) → B(n-1) → A(n-2)` |
| **Tail** | Recursive call is the LAST operation | `return f(n-1, acc)` |
| **Head** | Recursive call is the FIRST operation | `f(n-1); process();` |
| **Tree** | Multiple recursive calls | `f(n-1) + f(n-2)` |

---

# 4. Basic Recursion Problems

## 4.1 Factorial

> **Problem:** Calculate n! = n × (n-1) × (n-2) × ... × 1

**Mathematical Definition (already recursive!):**
```
factorial(0) = 1           (base case)
factorial(n) = n * factorial(n - 1)   (recursive case)
```

```javascript
/**
 * Calculates n! (n factorial)
 * 
 * Dry Run for factorial(5):
 * 
 * factorial(5)
 *   → 5 * factorial(4)
 *       → 4 * factorial(3)
 *           → 3 * factorial(2)
 *               → 2 * factorial(1)
 *                   → 1 * factorial(0)
 *                       → returns 1    (base case)
 *                   → returns 1 * 1 = 1
 *               → returns 2 * 1 = 2
 *           → returns 3 * 2 = 6
 *       → returns 4 * 6 = 24
 *   → returns 5 * 24 = 120
 * 
 * Time Complexity: O(n) — n function calls
 * Space Complexity: O(n) — n frames on the call stack
 */
function factorial(n) {
    // Base case: 0! = 1, 1! = 1
    if (n <= 1) return 1;

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
```

## 4.2 Fibonacci

> **Problem:** Find the nth Fibonacci number.
> Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

**Mathematical Definition:**
```
fib(0) = 0           (base case)
fib(1) = 1           (base case)
fib(n) = fib(n-1) + fib(n-2)   (recursive case)
```

```javascript
/**
 * Fibonacci - Naive Recursive (Tree Recursion)
 * 
 * Recursion Tree for fib(5):
 * 
 *                            fib(5)
 *                          /        \
 *                     fib(4)         fib(3)
 *                    /      \        /     \
 *               fib(3)    fib(2)  fib(2)  fib(1)
 *              /     \    /    \   /    \    |
 *          fib(2) fib(1) fib(1) fib(0) fib(1) fib(0) 1
 *          /   \    |     |      |      |      |
 *      fib(1) fib(0) 1   1      0      1      0
 *        |      |
 *        1      0
 * 
 * Notice: fib(3) is computed TWICE, fib(2) is computed THREE times!
 * This is why naive recursion is O(2^n) — extremely wasteful.
 * 
 * Time Complexity: O(2^n) — exponential!
 * Space Complexity: O(n) — maximum depth of recursion tree
 */
function fibonacci(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;

    // Recursive case: tree recursion (two calls)
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(5));  // 5
console.log(fibonacci(10)); // 55

/**
 * Fibonacci - Optimized with Memoization
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];   // Already computed? Return cached.
    if (n === 0) return 0;
    if (n === 1) return 1;

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

console.log(fibMemo(50)); // 12586269025 (instant! vs heat-death-of-universe with naive)
```

## 4.3 Sum of N Numbers

> **Problem:** Calculate 1 + 2 + 3 + ... + n

```javascript
/**
 * Sum of first N natural numbers
 * 
 * Thinking:
 *   sum(5) = 5 + sum(4)
 *   sum(4) = 4 + sum(3)
 *   sum(3) = 3 + sum(2)
 *   sum(2) = 2 + sum(1)
 *   sum(1) = 1              (base case)
 * 
 * Dry Run:
 *   sum(5) → 5 + sum(4)
 *                → 4 + sum(3)
 *                      → 3 + sum(2)
 *                            → 2 + sum(1)
 *                                  → 1
 *                            → 2 + 1 = 3
 *                      → 3 + 3 = 6
 *                → 4 + 6 = 10
 *          → 5 + 10 = 15
 * 
 * Time: O(n)  |  Space: O(n)
 */
function sumOfN(n) {
    if (n === 1) return 1;       // Base case
    return n + sumOfN(n - 1);    // Recursive case
}

console.log(sumOfN(5));   // 15
console.log(sumOfN(100)); // 5050
```

## 4.4 Reverse an Array / String

```javascript
/**
 * Reverse a string using recursion
 * 
 * Approach: Take the first character, move it to the end,
 *           and recurse on the rest.
 * 
 * Dry Run for reverse("hello"):
 *   reverse("hello")
 *     → reverse("ello") + "h"
 *       → reverse("llo") + "e"
 *         → reverse("lo") + "l"
 *           → reverse("o") + "l"
 *             → "o"                (base case: length 1)
 *           → "o" + "l" = "ol"
 *         → "ol" + "l" = "oll"
 *       → "oll" + "e" = "olle"
 *     → "olle" + "h" = "olleh"
 * 
 * Time: O(n²) — due to string concatenation creating new strings
 * Space: O(n) — recursion depth
 */
function reverseString(str) {
    // Base case: empty string or single character
    if (str.length <= 1) return str;

    // Recursive case: reverse the rest, then append first char
    return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("hello"));    // "olleh"
console.log(reverseString("abcdef"));   // "fedcba"

/**
 * Reverse an array IN PLACE using recursion (two-pointer approach)
 * 
 * Approach: Swap elements at start and end, then recurse inward.
 * 
 * Dry Run for [1, 2, 3, 4, 5]:
 *   swap(0, 4) → [5, 2, 3, 4, 1]
 *   swap(1, 3) → [5, 4, 3, 2, 1]
 *   start(2) >= end(2) → STOP (base case)
 * 
 * Time: O(n)  |  Space: O(n) recursion stack (but O(1) extra space for data)
 */
function reverseArray(arr, start = 0, end = arr.length - 1) {
    // Base case: pointers have met or crossed
    if (start >= end) return arr;

    // Swap
    [arr[start], arr[end]] = [arr[end], arr[start]];

    // Recurse inward
    return reverseArray(arr, start + 1, end - 1);
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
```

## 4.5 Print All Subsequences

> **This is a CRITICAL problem** — it introduces the **Pick / Not Pick** pattern, which is the foundation of backtracking.

> A **subsequence** maintains relative order but elements need not be contiguous.
> For [1, 2, 3]: subsequences are [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]

```javascript
/**
 * Print all subsequences of an array
 * 
 * Pattern: For each element, we have TWO choices:
 *   1. PICK it (include it in the subsequence)
 *   2. NOT PICK it (exclude it from the subsequence)
 * 
 * Decision Tree for [1, 2, 3]:
 * 
 *                              []
 *                           /       \
 *                    pick 1          don't pick 1
 *                    [1]                 []
 *                  /      \           /       \
 *            pick 2    don't     pick 2    don't
 *            [1,2]     [1]       [2]        []
 *           /    \    /   \     /   \      /   \
 *         p3  dp3  p3  dp3   p3  dp3    p3   dp3
 *       [1,2,3][1,2][1,3][1] [2,3][2]  [3]   []
 * 
 * At each leaf node (when index reaches array length), we print the subsequence.
 * Total subsequences = 2^n (each element has 2 choices)
 * 
 * Time: O(2^n)  |  Space: O(n) recursion depth
 */
function printSubsequences(arr, index = 0, current = []) {
    // Base case: we've considered all elements
    if (index === arr.length) {
        console.log(current);
        return;
    }

    // Choice 1: PICK the current element
    current.push(arr[index]);          // ← Include
    printSubsequences(arr, index + 1, current);

    // Choice 2: NOT PICK the current element
    current.pop();                      // ← Exclude (UNDO the pick — this is BACKTRACKING!)
    printSubsequences(arr, index + 1, current);
}

console.log("Subsequences of [1, 2, 3]:");
printSubsequences([1, 2, 3]);
/*
Output:
  [1, 2, 3]
  [1, 2]
  [1, 3]
  [1]
  [2, 3]
  [2]
  [3]
  []
*/
```

---

# 5. Recursion Patterns

## 5.1 Pick / Not Pick Pattern

This is the **most important pattern** for recursion and backtracking problems.

```
For every element in the input, you make a BINARY CHOICE:
    → Include it (PICK)
    → Exclude it (NOT PICK)

This naturally creates 2^n possibilities.
```

**Template:**

```javascript
function pickNotPick(arr, index, current, result) {
    // Base case: all elements considered
    if (index === arr.length) {
        result.push([...current]);  // Store a copy of current state
        return;
    }

    // PICK: Include arr[index]
    current.push(arr[index]);
    pickNotPick(arr, index + 1, current, result);
    current.pop();  // UNDO — backtrack!

    // NOT PICK: Skip arr[index]
    pickNotPick(arr, index + 1, current, result);
}
```

**Problems that use this pattern:**
- Subsets / Power set
- Subsequences with sum
- Combination sum (with variations)
- 0/1 Knapsack

## 5.2 Divide and Conquer

**Strategy: Divide the problem into smaller sub-problems, solve each recursively, combine results.**

```
┌───────────────────────────────────────┐
│           DIVIDE AND CONQUER          │
│                                       │
│   1. DIVIDE:  Split into sub-problems │
│   2. CONQUER: Recursively solve each  │
│   3. COMBINE: Merge the results       │
└───────────────────────────────────────┘
```

**Classic Example: Merge Sort**

```javascript
/**
 * Merge Sort — Divide and Conquer
 * 
 * Visualization for [38, 27, 43, 3, 9, 82, 10]:
 * 
 * DIVIDE:
 *          [38, 27, 43, 3, 9, 82, 10]
 *               /                \
 *      [38, 27, 43, 3]     [9, 82, 10]
 *        /         \          /      \
 *    [38, 27]   [43, 3]   [9, 82]  [10]
 *    /    \     /    \     /    \     |
 *  [38]  [27] [43]  [3] [9]  [82]  [10]   ← base case (single elements)
 * 
 * COMBINE (merge sorted halves):
 *  [27, 38] [3, 43]  [9, 82]  [10]
 *      \       /         \      /
 *   [3, 27, 38, 43]   [9, 10, 82]
 *          \              /
 *    [3, 9, 10, 27, 38, 43, 82]   ← sorted!
 * 
 * Time: O(n log n)  |  Space: O(n)
 */
function mergeSort(arr) {
    // Base case: array of 0 or 1 element is already sorted
    if (arr.length <= 1) return arr;

    // DIVIDE
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // COMBINE
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]
```

## 5.3 Backtracking Foundation

Backtracking is recursion + **undoing choices** to explore all paths.

```
RECURSION:        Make a choice → go deeper
BACKTRACKING:     Make a choice → go deeper → UNDO the choice → try another path

The "UNDO" step is what makes it backtracking.
```

We already saw this in the subsequences problem:

```javascript
current.push(arr[index]);                // CHOOSE
printSubsequences(arr, index + 1, current); // EXPLORE
current.pop();                            // UN-CHOOSE (backtrack!)
```

This is the **Choose → Explore → Un-choose** pattern, which we'll dive deep into in Section 6.

---

# 6. Introduction to Backtracking

## 6.1 What Is Backtracking?

**Backtracking is a systematic method to explore ALL possible solutions by building candidates incrementally and abandoning a candidate ("backtracking") as soon as it is determined that the candidate cannot possibly lead to a valid solution.**

Think of it as navigating a maze:

```
                START
                  |
            ┌─────┼─────┐
            ↓     ↓     ↓
          Path A  Path B  Path C
            |       |       |
         Dead End   ↓    Dead End
         ← BACK   Path B1
                    |
               ┌────┼────┐
               ↓    ↓    ↓
            Dead  Path  Dead
            End   B1a   End
            ← BACK |   ← BACK
                  EXIT ✅
```

You try a path. If it leads to a dead end, you **go back** and try another path.

## 6.2 Difference Between Recursion and Backtracking

| Aspect | Recursion | Backtracking |
|--------|-----------|--------------|
| **Definition** | Function calls itself | Recursion + undoing choices |
| **Purpose** | Solve by breaking into sub-problems | Find ALL valid solutions by trial & error |
| **State change** | May or may not modify state | Modifies state, then REVERTS it |
| **Exploration** | Follows ONE path to completion | Explores MULTIPLE paths, abandoning invalid ones |
| **Key operation** | Call self | Choose → Explore → Un-choose |
| **Example** | Factorial, Fibonacci | N-Queens, Sudoku, Permutations |

> **All backtracking uses recursion, but not all recursion is backtracking.**

## 6.3 Decision Tree Visualization

Every backtracking problem can be visualized as a **decision tree** where:
- **Each node** represents a state (partial solution)
- **Each edge** represents a choice
- **Leaf nodes** are either valid solutions or dead ends

**Example: Generate all permutations of [1, 2, 3]**

```
                                    []
                        /           |            \
                    pick 1        pick 2        pick 3
                    [1]           [2]           [3]
                   /    \        /    \        /    \
              pick 2  pick 3  pick 1  pick 3  pick 1  pick 2
              [1,2]   [1,3]   [2,1]   [2,3]   [3,1]   [3,2]
                |       |       |       |       |       |
             pick 3  pick 2  pick 3  pick 1  pick 2  pick 1
             [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
               ✅      ✅      ✅      ✅      ✅      ✅

6 leaf nodes = 3! = 6 permutations
```

---

# 7. Backtracking Patterns (Detailed Explanation & Examples)

## 7.1 Subsets (Power Set)

> **Problem:** Given an array of unique integers, return all possible subsets.
> Input: [1, 2, 3] → Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

```javascript
/**
 * Generate all subsets using backtracking (Pick/Not-Pick)
 * 
 * Decision Tree for [1, 2, 3]:
 * 
 *                          start (idx=0, curr=[])
 *                        /                         \
 *                 pick 1                         skip 1
 *              (idx=1, [1])                    (idx=1, [])
 *              /          \                    /          \
 *        pick 2         skip 2           pick 2         skip 2
 *     (idx=2, [1,2])  (idx=2, [1])    (idx=2, [2])   (idx=2, [])
 *       /       \       /      \        /      \        /      \
 *   pick 3   skip 3  pick 3  skip 3  pick 3  skip 3  pick 3  skip 3
 *  [1,2,3]  [1,2]   [1,3]   [1]     [2,3]   [2]     [3]     []
 *    ✅       ✅      ✅     ✅       ✅      ✅      ✅      ✅
 * 
 * 8 subsets = 2^3
 * 
 * Time: O(2^n)  |  Space: O(n) recursion depth
 */
function subsets(nums) {
    const result = [];

    function backtrack(index, current) {
        // Base case: considered all elements
        if (index === nums.length) {
            result.push([...current]);  // Store a COPY (important!)
            return;
        }

        // Choice 1: PICK nums[index]
        current.push(nums[index]);
        backtrack(index + 1, current);
        current.pop();  // ← BACKTRACK (undo the pick)

        // Choice 2: DON'T PICK nums[index]
        backtrack(index + 1, current);
    }

    backtrack(0, []);
    return result;
}

console.log(subsets([1, 2, 3]));
// [[ 1, 2, 3 ], [ 1, 2 ], [ 1, 3 ], [ 1 ], [ 2, 3 ], [ 2 ], [ 3 ], []]
```

**Alternative approach (iterate-and-recurse):**

```javascript
/**
 * Subsets — Alternative: at each step, choose which REMAINING element to add next
 * This approach avoids duplicates naturally and produces subsets in a different order.
 */
function subsetsV2(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);  // Every state is a valid subset!

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);       // CHOOSE
            backtrack(i + 1, current);   // EXPLORE (i+1 to avoid reusing same element)
            current.pop();               // UN-CHOOSE (backtrack)
        }
    }

    backtrack(0, []);
    return result;
}

console.log(subsetsV2([1, 2, 3]));
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

## 7.2 Subsequences with Conditions

> **Problem:** Find all subsequences whose sum equals a target.

```javascript
/**
 * Find all subsequences with sum equal to target
 * 
 * Example: arr = [1, 2, 3], target = 3
 * All subsequences:
 *   [] → sum=0
 *   [1] → sum=1
 *   [2] → sum=2
 *   [3] → sum=3 ✅
 *   [1,2] → sum=3 ✅
 *   [1,3] → sum=4
 *   [2,3] → sum=5
 *   [1,2,3] → sum=6
 * 
 * Time: O(2^n)  |  Space: O(n)
 */
function subsequencesWithSum(arr, target) {
    const result = [];

    function backtrack(index, current, currentSum) {
        // Base case
        if (index === arr.length) {
            if (currentSum === target) {
                result.push([...current]);
            }
            return;
        }

        // PRUNING: If currentSum already exceeds target (only works for positive numbers)
        // This optimization skips unnecessary branches!
        if (currentSum > target) return;

        // Pick
        current.push(arr[index]);
        backtrack(index + 1, current, currentSum + arr[index]);
        current.pop();  // Backtrack

        // Not pick
        backtrack(index + 1, current, currentSum);
    }

    backtrack(0, [], 0);
    return result;
}

console.log(subsequencesWithSum([1, 2, 3], 3));
// [[1, 2], [3]]
```

## 7.3 Permutations

> **Problem:** Given an array of distinct integers, return all possible permutations.
> Input: [1, 2, 3] → Output: all 3! = 6 orderings.

### Approach 1: Using a "used" boolean array

```javascript
/**
 * Permutations using visited/used tracking
 * 
 * Key Insight: Unlike subsets where we pick/skip,
 * in permutations we must use ALL elements exactly once,
 * but in EVERY possible order.
 * 
 * Decision Tree for [1, 2, 3]:
 * 
 *                           []
 *                    /       |       \
 *                  1         2         3
 *                /   \     /   \     /   \
 *              2      3  1      3  1      2
 *              |      |  |      |  |      |
 *              3      2  3      1  2      1
 *           [1,2,3][1,3,2][2,1,3][2,3,1][3,1,2][3,2,1]
 * 
 * Time: O(n! * n)  |  Space: O(n)
 */
function permutations(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(current) {
        // Base case: permutation is complete
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;  // Skip already-used elements

            // CHOOSE
            current.push(nums[i]);
            used[i] = true;

            // EXPLORE
            backtrack(current);

            // UN-CHOOSE (backtrack)
            current.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

console.log(permutations([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Approach 2: Swap-based (in-place, more efficient)

```javascript
/**
 * Permutations using swapping
 * 
 * Idea: For position 'index', try placing each remaining element there.
 * 
 * Visualization for [1, 2, 3], index=0:
 * 
 *   swap(0,0)→[1,2,3]  swap(0,1)→[2,1,3]  swap(0,2)→[3,2,1]
 *       |                    |                    |
 *   index=1              index=1              index=1
 *   swap(1,1) swap(1,2)  swap(1,1) swap(1,2)  swap(1,1) swap(1,2)
 *   [1,2,3]  [1,3,2]    [2,1,3]  [2,3,1]    [3,2,1]  [3,1,2]
 *     ✅       ✅          ✅       ✅          ✅       ✅
 */
function permutationsSwap(nums) {
    const result = [];

    function backtrack(index) {
        // Base case: all positions filled
        if (index === nums.length) {
            result.push([...nums]);
            return;
        }

        for (let i = index; i < nums.length; i++) {
            // CHOOSE: swap element i into position 'index'
            [nums[index], nums[i]] = [nums[i], nums[index]];

            // EXPLORE: fix position 'index' and permute the rest
            backtrack(index + 1);

            // UN-CHOOSE: swap back (backtrack)
            [nums[index], nums[i]] = [nums[i], nums[index]];
        }
    }

    backtrack(0);
    return result;
}

console.log(permutationsSwap([1, 2, 3]));
```

## 7.4 Combination Sum

> **Problem:** Given candidates and a target, find all unique combinations where chosen numbers sum to target. The **same number can be used unlimited times.**

```javascript
/**
 * Combination Sum
 * 
 * Example: candidates = [2, 3, 6, 7], target = 7
 * Output: [[2, 2, 3], [7]]
 * 
 * Decision Tree (partial) for candidates = [2, 3], target = 7:
 * 
 *                    target=7, idx=0
 *                   /                \
 *            pick 2                skip 2→idx=1
 *          target=5, idx=0          /          \
 *          /          \        pick 3         skip 3
 *     pick 2       skip 2     target=4      target=7
 *    target=3      target=5    idx=1          → no more
 *     idx=0         idx=1      /    \          candidates
 *      ...           ...    pick 3  skip 3
 *                          target=1  target=4
 *                            ...      → no more
 * 
 * KEY: When picking, we pass 'i' (NOT i+1) because same element can be reused.
 *      When skipping, we pass i+1 to move to next candidate.
 * 
 * Time: O(2^t) where t = target/min(candidates)
 * Space: O(target/min(candidates))
 */
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(index, current, remaining) {
        // Base cases
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0 || index === candidates.length) {
            return;
        }

        // Choice 1: PICK candidates[index] (can pick again, so pass index, NOT index+1)
        current.push(candidates[index]);
        backtrack(index, current, remaining - candidates[index]);
        current.pop();  // Backtrack

        // Choice 2: DON'T PICK candidates[index] (move to next candidate)
        backtrack(index + 1, current, remaining);
    }

    backtrack(0, [], target);
    return result;
}

console.log(combinationSum([2, 3, 6, 7], 7));
// [[2, 2, 3], [7]]

console.log(combinationSum([2, 3, 5], 8));
// [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
```

## 7.5 N-Queens

> **Problem:** Place N queens on an N×N chessboard such that no two queens attack each other. (No two queens share the same row, column, or diagonal.)

```javascript
/**
 * N-Queens Problem
 * 
 * For N=4, one valid solution:
 * 
 *     . Q . .          col 0  col 1  col 2  col 3
 *     . . . Q     row 0:  .     Q      .      .
 *     Q . . .     row 1:  .     .      .      Q
 *     . . Q .     row 2:  Q     .      .      .
 *                 row 3:  .     .      Q      .
 * 
 * Approach: Place queens ROW by ROW.
 * For each row, try placing a queen in each column.
 * If placement is valid (no conflicts), recurse to next row.
 * If we've placed queens in all rows → valid solution found!
 * 
 * Conflict checks:
 *   1. Same column: any previous row has a queen in same column
 *   2. Upper-left diagonal: row-col = constant
 *   3. Upper-right diagonal: row+col = constant
 * 
 * Time: O(n!)  |  Space: O(n²)
 */
function solveNQueens(n) {
    const result = [];
    // Initialize empty board
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    // Sets to track which columns and diagonals are under attack
    const cols = new Set();          // columns with queens
    const diag1 = new Set();         // row - col (upper-left to lower-right diagonal)
    const diag2 = new Set();         // row + col (upper-right to lower-left diagonal)

    function backtrack(row) {
        // Base case: all queens placed successfully
        if (row === n) {
            // Convert board to array of strings
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            // PRUNING: Check if this column or diagonals are under attack
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;  // Skip invalid positions
            }

            // CHOOSE: Place a queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // EXPLORE: Move to next row
            backtrack(row + 1);

            // UN-CHOOSE: Remove the queen (backtrack)
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}

console.log("N-Queens solutions for N=4:");
const solutions = solveNQueens(4);
solutions.forEach((solution, i) => {
    console.log(`\nSolution ${i + 1}:`);
    solution.forEach(row => console.log(row));
});
/*
Solution 1:
.Q..
...Q
Q...
..Q.

Solution 2:
..Q.
Q...
...Q
.Q..
*/
```

## 7.6 Sudoku Solver

```javascript
/**
 * Sudoku Solver
 * 
 * Rules:
 *   - Each row must contain digits 1-9 with no repetition
 *   - Each column must contain digits 1-9 with no repetition
 *   - Each 3x3 sub-box must contain digits 1-9 with no repetition
 * 
 * Approach:
 *   1. Find an empty cell ('.')
 *   2. Try placing digits 1-9
 *   3. If valid, place it and recurse
 *   4. If recursion fails (dead end), UNDO and try next digit
 *   5. If no digit works, return false (triggers backtracking in caller)
 * 
 * Time: O(9^(empty cells)) worst case, but pruning makes it much faster
 * Space: O(81) for the board, O(empty cells) for recursion
 */
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        const char = String(num);

        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === char) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === char) return false;
        }

        // Check 3x3 sub-box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === char) return false;
            }
        }

        return true;
    }

    function solve(board) {
        // Find the next empty cell
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    // Try digits 1-9
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, i, j, num)) {
                            // CHOOSE
                            board[i][j] = String(num);

                            // EXPLORE
                            if (solve(board)) {
                                return true;  // Solution found!
                            }

                            // UN-CHOOSE (backtrack)
                            board[i][j] = '.';
                        }
                    }
                    // No digit 1-9 worked → this path is invalid
                    return false;
                }
            }
        }
        // No empty cells found → board is complete!
        return true;
    }

    solve(board);
    return board;
}

// Example usage
const board = [
    ['5','3','.','.','7','.','.','.','.'],
    ['6','.','.','1','9','5','.','.','.'],
    ['.','9','8','.','.','.','.','6','.'],
    ['8','.','.','.','6','.','.','.','3'],
    ['4','.','.','8','.','3','.','.','1'],
    ['7','.','.','.','2','.','.','.','6'],
    ['.','6','.','.','.','.','2','8','.'],
    ['.','.','.','4','1','9','.','.','5'],
    ['.','.','.','.','8','.','.','7','9']
];

console.log("Sudoku Solution:");
solveSudoku(board);
board.forEach(row => console.log(row.join(' ')));
```

## 7.7 Palindrome Partitioning

> **Problem:** Given a string, partition it such that every substring in the partition is a palindrome. Return all possible partitions.

```javascript
/**
 * Palindrome Partitioning
 * 
 * Input: "aab"
 * Output: [["a","a","b"], ["aa","b"]]
 * 
 * Decision Tree for "aab":
 * 
 *                        "aab"
 *                      /       \       \
 *                "a"|"ab"   "aa"|"b"  "aab" (not palindrome ✗)
 *                /     \       |
 *          "a"|"b"   "ab"    "b"|""
 *             |     (not      |
 *           "b"|""  palin ✗) "" (done ✅)
 *             |               
 *          "" (done ✅)       → ["aa","b"]
 *             
 *          → ["a","a","b"]
 * 
 * Approach:
 *   - Start from index 0
 *   - Try every possible prefix substring from current index
 *   - If the prefix is a palindrome, add it and recurse on the rest
 *   - When we reach the end of string, we have a valid partition
 * 
 * Time: O(n * 2^n)  |  Space: O(n)
 */
function palindromePartition(s) {
    const result = [];

    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(index, current) {
        // Base case: reached end of string — all parts are palindromes
        if (index === s.length) {
            result.push([...current]);
            return;
        }

        // Try every possible substring starting at 'index'
        for (let end = index; end < s.length; end++) {
            // Only proceed if the substring s[index..end] is a palindrome
            if (isPalindrome(s, index, end)) {
                // CHOOSE: take this palindrome substring
                current.push(s.substring(index, end + 1));

                // EXPLORE: partition the remaining string
                backtrack(end + 1, current);

                // UN-CHOOSE (backtrack)
                current.pop();
            }
            // If not a palindrome, skip (implicit pruning)
        }
    }

    backtrack(0, []);
    return result;
}

console.log(palindromePartition("aab"));
// [["a","a","b"], ["aa","b"]]

console.log(palindromePartition("aabb"));
// [["a","a","b","b"], ["a","a","bb"], ["aa","b","b"], ["aa","bb"]]
```

---

# 8. Key Concepts in Backtracking

## 8.1 Choice → Explore → Undo (The Backtracking Template)

This is the **universal template** for ALL backtracking problems:

```
┌─────────────────────────────────────────────────────┐
│          THE BACKTRACKING TEMPLATE                  │
│                                                     │
│  function backtrack(state) {                        │
│      if (state is a solution) {                     │
│          record/print the solution                  │
│          return                                     │
│      }                                              │
│                                                     │
│      for each CHOICE in available choices {         │
│                                                     │
│          if (choice is VALID) {        ← PRUNING    │
│                                                     │
│              MAKE the choice            ← CHOOSE    │
│              backtrack(updated state)   ← EXPLORE   │
│              UNDO the choice            ← BACKTRACK │
│          }                                          │
│      }                                              │
│  }                                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

```javascript
// The pattern in code:
function backtrack(state) {
    // ===== BASE CASE: Is this a complete solution? =====
    if (isComplete(state)) {
        results.push(copy(state));
        return;
    }

    // ===== TRY ALL CHOICES =====
    for (const choice of getChoices(state)) {

        // ===== PRUNING: Is this choice valid? =====
        if (!isValid(choice, state)) continue;

        // ===== CHOOSE =====
        applyChoice(state, choice);

        // ===== EXPLORE =====
        backtrack(state);

        // ===== UN-CHOOSE (BACKTRACK) =====
        undoChoice(state, choice);
    }
}
```

## 8.2 State Management

**State** is the data that represents the "current situation" in your exploration.

| Problem | State | Choices |
|---------|-------|---------|
| Permutations | Current permutation + used flags | Which unused element to add next |
| N-Queens | Board + columns/diags occupied | Which column to place queen in current row |
| Sudoku | The board | Which digit (1-9) to place in current cell |
| Subsets | Current subset + index | Pick or skip current element |
| Combination Sum | Current combination + remaining target | Which candidate to add |

**Critical Rule:** After recursive exploration, the state MUST be restored exactly as it was before. This is the "UNDO" step.

```javascript
// WRONG — state is not restored
current.push(item);
backtrack(next);
// Missing: current.pop()  ← BUG! State leaks into next iteration.

// CORRECT — state is properly restored
current.push(item);    // Modify state
backtrack(next);       // Explore
current.pop();         // Restore state ← ESSENTIAL
```

## 8.3 Pruning (Optimization)

**Pruning** means cutting off branches of the decision tree that we KNOW cannot lead to valid solutions, without exploring them.

```
                  WITHOUT PRUNING                    WITH PRUNING
                                                    
                     root                              root
                  /   |   \                         /   |   \
                A     B     C                     A     B     ✗ C (pruned!)
               /|\   /|\   /|\                   /|\   /|\     
              ...   ...   ...                   ...   ...     
              
            Explores ALL paths              Skips invalid subtrees early
```

### Examples of pruning:

```javascript
// 1. Combination Sum: Skip if remaining sum goes negative
if (remaining < 0) return;  // No point continuing — sum already exceeded target

// 2. N-Queens: Skip if column or diagonal is attacked
if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
    continue;  // Don't even try this position
}

// 3. Subsets with target sum (positive numbers only): Skip if sum already exceeds target
if (currentSum > target) return;  // Adding more positive numbers won't help

// 4. Sorted candidates: Break early
// If candidates are sorted and current candidate > remaining target,
// all subsequent candidates will also be too large.
if (candidates[i] > remaining) break;  // Not continue, BREAK!
```

**Pruning can dramatically reduce the actual running time** even though the worst-case complexity stays the same.

---

# 9. Problem-Solving Approach

## 9.1 How to Identify Recursion / Backtracking Problems

```
┌──────────────────────────────────────────────────────────────┐
│  SIGNALS THAT A PROBLEM NEEDS RECURSION:                     │
│                                                              │
│  ✓ Problem can be broken into SMALLER same-type sub-problems │
│  ✓ Problem has a TREE or GRAPH structure                     │
│  ✓ Problem mentions "all possible" / "every combination"     │
│  ✓ Problem involves nested structures (folders, expressions) │
│  ✓ Problem has optimal substructure (DP problems start here) │
│                                                              │
│  SIGNALS THAT A PROBLEM NEEDS BACKTRACKING:                  │
│                                                              │
│  ✓ "Find ALL solutions" / "Print all ways"                   │
│  ✓ "Count the number of ways"                                │
│  ✓ "Check if a solution EXISTS"                              │
│  ✓ Constraint satisfaction (Sudoku, N-Queens)                │
│  ✓ Generating permutations, combinations, subsets            │
│  ✓ Puzzle / game solving                                     │
│  ✓ Path finding with constraints                             │
└──────────────────────────────────────────────────────────────┘
```

## 9.2 How to Build Recursive Intuition

### The "Trust the Recursion" Mindset

1. **Don't trace the entire recursion in your head.** Trust that the recursive call will give you the correct answer for the smaller problem.

2. **Think only about ONE level:**
   - What is the BASE CASE? (smallest problem I can answer directly)
   - What is the CURRENT STEP? (what work do I do right now)
   - What do I DELEGATE to recursion? (the smaller sub-problem)

### The 3-Step Method

```
Step 1: DEFINE the function clearly
    "This function returns/does _____ for input _____"

Step 2: Find the BASE CASE
    "What is the simplest input? What should it return?"

Step 3: Find the RECURSIVE RELATION
    "How can I express f(n) in terms of f(smaller)?"
    "What is the RECURRENCE RELATION?"
```

### Example: Power function (x^n)

```
Step 1: DEFINE
    "power(x, n) returns x raised to the power n"

Step 2: BASE CASE
    power(x, 0) = 1  (anything to the 0th power is 1)

Step 3: RECURSIVE RELATION
    power(x, n) = x * power(x, n-1)
    
    Better: power(x, n) = power(x, n/2)² if n is even
            power(x, n) = x * power(x, n/2)² if n is odd
```

```javascript
// Efficient power: O(log n)
function power(x, n) {
    if (n === 0) return 1;

    const half = power(x, Math.floor(n / 2));

    if (n % 2 === 0) {
        return half * half;
    } else {
        return x * half * half;
    }
}
```

## 9.3 Step-by-Step Approach to Solve Any Backtracking Problem

```
┌─────────────────────────────────────────────────────────┐
│  BACKTRACKING PROBLEM-SOLVING FRAMEWORK                 │
│                                                         │
│  1. IDENTIFY the problem type                           │
│     → Subsets? Permutations? Constraint satisfaction?    │
│                                                         │
│  2. DEFINE the STATE                                    │
│     → What information do I need at each step?          │
│     → Current partial solution, index, remaining, etc.  │
│                                                         │
│  3. DEFINE the CHOICES                                  │
│     → At each step, what can I do?                      │
│     → Pick/skip? Which element? Which digit?            │
│                                                         │
│  4. DEFINE the BASE CASE                                │
│     → When am I done?                                   │
│     → All elements considered? Board full? Target met?  │
│                                                         │
│  5. DEFINE the VALIDITY CHECK (Pruning)                 │
│     → When should I NOT make a choice?                  │
│     → Constraints violated? Sum exceeded?               │
│                                                         │
│  6. CODE IT using the template:                         │
│     Choose → Explore → Un-choose                        │
│                                                         │
│  7. TEST with small inputs and trace the recursion tree │
└─────────────────────────────────────────────────────────┘
```

---

# 10. Time and Space Complexity

## 10.1 Recursive Time Complexity

### How to analyze:

The time complexity of a recursive function depends on:
1. **Number of recursive calls** per function invocation
2. **Work done per call** (excluding recursive calls)
3. **Depth of recursion**

```
Total work = (Number of nodes in recursion tree) × (Work per node)
```

### Common Patterns:

| Pattern | Recurrence | Complexity | Example |
|---------|-----------|------------|---------|
| Linear | T(n) = T(n-1) + O(1) | **O(n)** | Factorial, linear search |
| Linear with work | T(n) = T(n-1) + O(n) | **O(n²)** | Selection sort |
| Divide by 2 | T(n) = T(n/2) + O(1) | **O(log n)** | Binary search |
| Divide & Conquer | T(n) = 2T(n/2) + O(n) | **O(n log n)** | Merge sort |
| Binary tree | T(n) = 2T(n-1) + O(1) | **O(2ⁿ)** | Fibonacci (naive), subsets |
| Permutations | T(n) = n × T(n-1) | **O(n!)** | Permutations |

## 10.2 Exponential Growth Explained

```
Why 2^n grows so fast:

n       2^n         Visual
─────────────────────────────
1       2           ██
2       4           ████
3       8           ████████
4       16          ████████████████
5       32          ████████████████████████████████
10      1,024       (fills the screen)
20      1,048,576   (over a million)
30      ~1 billion  (impractical)
40      ~1 trillion (impossible)

This is why:
  - Subsets: 2^n subsets → array of 20 elements has ~1M subsets
  - Permutations: n! → 10 elements have 3,628,800 permutations
  - Fibonacci (naive): 2^n → fib(40) makes ~1 billion calls!
```

## 10.3 Space Complexity

For recursive functions, space = max depth of call stack + any data structures used.

```
Linear recursion:   O(n) stack depth
Binary recursion:   O(n) stack depth (tree has depth n, not 2^n)
                    Even though there are 2^n nodes, at any point
                    only O(n) are on the stack simultaneously.

Remember: Stack depth = longest path from root to leaf in recursion tree
```

```
Recursion tree for fib(5):

                        fib(5)     ← depth 0
                       /     \
                  fib(4)    fib(3)  ← depth 1
                 /    \     /    \
             fib(3) fib(2) fib(2) fib(1)  ← depth 2
            ...

Maximum depth = n = 5
Even though total nodes ≈ 2^5 = 32,
only 5 frames are on the stack at any time.

Space = O(n), NOT O(2^n)
```

---

# 11. Code Examples (JavaScript)

> All previous examples are in JavaScript. Here are additional clean, well-commented examples:

## 11.1 Check if an Array is Sorted

```javascript
/**
 * Check if array is sorted in ascending order using recursion
 * 
 * Think: An array is sorted if:
 *   1. It has 0 or 1 elements (base case — trivially sorted)
 *   2. First element <= second element AND the rest is sorted
 * 
 * Dry Run for [1, 3, 5, 7]:
 *   isSorted([1,3,5,7], 0) → 1 <= 3? YES → check rest
 *   isSorted([1,3,5,7], 1) → 3 <= 5? YES → check rest
 *   isSorted([1,3,5,7], 2) → 5 <= 7? YES → check rest
 *   isSorted([1,3,5,7], 3) → index = length-1 → return true ✅
 * 
 * Time: O(n)  |  Space: O(n)
 */
function isSorted(arr, index = 0) {
    // Base case: reached the last element (or empty array)
    if (index >= arr.length - 1) return true;

    // If current > next, NOT sorted
    if (arr[index] > arr[index + 1]) return false;

    // Recurse for the rest
    return isSorted(arr, index + 1);
}

console.log(isSorted([1, 3, 5, 7]));    // true
console.log(isSorted([1, 5, 3, 7]));    // false
console.log(isSorted([]));               // true
console.log(isSorted([42]));             // true
```

## 11.2 String Permutations (with Duplicates Handling)

```javascript
/**
 * Generate all UNIQUE permutations of a string (handles duplicate characters)
 * 
 * Input: "aba"
 * Without handling duplicates: ["aba","aab","baa","baa","aab","aba"] ← duplicates!
 * With handling: ["aab", "aba", "baa"] ← unique only
 * 
 * Approach: Sort first, then skip consecutive duplicates at the same recursion level.
 */
function uniquePermutations(str) {
    const result = [];
    const chars = str.split('').sort();  // Sort to group duplicates
    const used = new Array(chars.length).fill(false);

    function backtrack(current) {
        if (current.length === chars.length) {
            result.push(current.join(''));
            return;
        }

        for (let i = 0; i < chars.length; i++) {
            // Skip if already used
            if (used[i]) continue;

            // Skip duplicates: if this char is same as previous AND
            // previous was NOT used (meaning it was backtracked),
            // skip to avoid generating same permutation
            if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

            // Choose
            used[i] = true;
            current.push(chars[i]);

            // Explore
            backtrack(current);

            // Un-choose
            current.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

console.log(uniquePermutations("aba"));
// ["aab", "aba", "baa"]
```

## 11.3 Generate Balanced Parentheses

```javascript
/**
 * Generate all combinations of n pairs of balanced parentheses
 * 
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * 
 * Decision Tree (partial):
 *                        ""
 *                       /
 *                     "("
 *                    /     \
 *                 "(("     "()"
 *                /   \      /   \
 *            "((("  "(()" "()(" "()()" 
 *             ...    ...   ...   ...
 * 
 * Rules (pruning):
 *   - Can add '(' if openCount < n
 *   - Can add ')' if closeCount < openCount
 * 
 * Time: O(4^n / √n) — Catalan number  |  Space: O(n)
 */
function generateParentheses(n) {
    const result = [];

    function backtrack(current, openCount, closeCount) {
        // Base case: used all parentheses
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // Choice 1: Add opening parenthesis (if we still can)
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }

        // Choice 2: Add closing parenthesis (only if it won't unbalance)
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

console.log(generateParentheses(3));
// ["((()))","(()())","(())()","()(())","()()()"]
```

## 11.4 Word Search in a Grid

```javascript
/**
 * Given a 2D board and a word, find if the word exists in the grid.
 * Can move up, down, left, right. Can't reuse same cell.
 * 
 * Board:                  Word: "ABCCED"
 *   A B C E
 *   S F C S                Path: A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(0,3)→D... 
 *   A D E E                Wait, D is at (2,1), need to check connectivity.
 *                          Actually: A→B→C→C→E→D ← valid path exists!
 * 
 * This is classic backtracking on a grid:
 *   - For each cell matching first letter, try to build the word
 *   - Mark cells as visited to avoid reuse
 *   - Backtrack (unmark) when returning
 * 
 * Time: O(m * n * 4^L) where L = word length
 * Space: O(L) recursion depth
 */
function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function backtrack(row, col, index) {
        // Base case: entire word matched
        if (index === word.length) return true;

        // Boundary checks and character match
        if (
            row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            board[row][col] !== word[index]
        ) {
            return false;
        }

        // CHOOSE: Mark as visited (temporarily modify the cell)
        const temp = board[row][col];
        board[row][col] = '#';  // Mark visited

        // EXPLORE: Try all 4 directions
        const found =
            backtrack(row + 1, col, index + 1) ||  // Down
            backtrack(row - 1, col, index + 1) ||  // Up
            backtrack(row, col + 1, index + 1) ||  // Right
            backtrack(row, col - 1, index + 1);    // Left

        // UN-CHOOSE: Restore the cell (backtrack)
        board[row][col] = temp;

        return found;
    }

    // Try starting from every cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(wordSearch(board, "ABCCED")); // true
console.log(wordSearch(board, "SEE"));    // true
console.log(wordSearch(board, "ABCB"));   // false (can't reuse B)
```

## 11.5 Recursive Tree Diagram (ASCII)

Here's a visual helper to understand how the subsequences decision tree works:

```
printSubsequences([a, b, c]):

LEVEL 0 (considering 'a'):
                                    []
                              /            \
                        PICK a           SKIP a
                                    
LEVEL 1 (considering 'b'):
                        [a]                 []
                      /      \           /      \
                 PICK b    SKIP b    PICK b    SKIP b
                 
LEVEL 2 (considering 'c'):
                [a,b]     [a]       [b]        []
               /    \    /   \     /   \      /   \
            PICK c SKIP PICK SKIP PICK SKIP PICK  SKIP
            
LEAF NODES (base case — index === arr.length):
          [a,b,c] [a,b] [a,c] [a]  [b,c] [b]  [c]   []
            ✅      ✅    ✅    ✅    ✅    ✅    ✅    ✅
            
8 subsequences = 2³ = 2^n  ✓
```

---

# 12. Must-Do Interview Questions

## 🟢 Easy

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **Factorial** | Basic recursion | `f(n) = n * f(n-1)` |
| 2 | **Fibonacci** | Tree recursion + memoization | `f(n) = f(n-1) + f(n-2)` |
| 3 | **Sum of digits** | Extract last digit | `f(n) = (n%10) + f(n/10)` |
| 4 | **Power of two** | Divide by 2 | `f(n) = n===1 ? true : n%2===0 && f(n/2)` |
| 5 | **Reverse string** | Two pointers / head recursion | Swap ends, recurse inward |
| 6 | **Palindrome check** | Two pointers | Compare first & last, recurse inward |
| 7 | **Print 1 to N** | Head vs tail recursion | Print before or after recursive call |
| 8 | **Count occurrences** | Linear scan | Check current + recurse rest |

```javascript
// Sum of digits
function digitSum(n) {
    if (n === 0) return 0;
    return (n % 10) + digitSum(Math.floor(n / 10));
}
console.log(digitSum(1234)); // 10

// Palindrome check
function isPalindrome(str, left = 0, right = str.length - 1) {
    if (left >= right) return true;
    if (str[left] !== str[right]) return false;
    return isPalindrome(str, left + 1, right - 1);
}
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

## 🟡 Medium

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **Subsets** | Pick/Not-pick | Binary decisions for each element |
| 2 | **Subsets II** (with duplicates) | Sort + skip duplicates | Same as subsets + `if(i>start && nums[i]===nums[i-1]) skip` |
| 3 | **Permutations** | Used array / swapping | Try all unused elements at each position |
| 4 | **Permutations II** (with duplicates) | Sort + skip duplicates | `if(i>0 && nums[i]===nums[i-1] && !used[i-1]) skip` |
| 5 | **Combination Sum** | Unlimited reuse | Pass `index` (not `index+1`) for reuse |
| 6 | **Combination Sum II** | Each number used once | Sort + skip duplicates + `i+1` |
| 7 | **Generate Parentheses** | Open/close count tracking | `open < n` and `close < open` rules |
| 8 | **Letter Combinations of Phone** | Multiple choices per digit | Map digit → letters, iterate + recurse |
| 9 | **Palindrome Partitioning** | Partition + palindrome check | Try all prefixes that are palindromes |
| 10 | **Word Search** | Grid backtracking | 4-direction DFS with visited tracking |

```javascript
// Subsets II (with duplicates)
function subsetsWithDup(nums) {
    const result = [];
    nums.sort((a, b) => a - b);  // Sort to group duplicates

    function backtrack(start, current) {
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            // Skip duplicates at the same level
            if (i > start && nums[i] === nums[i - 1]) continue;

            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

console.log(subsetsWithDup([1, 2, 2]));
// [[], [1], [1,2], [1,2,2], [2], [2,2]]
// Notice: [2] appears once, not twice!

// Combination Sum II (each number used at most once)
function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);

    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates at the same level
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            // Pruning: if current candidate > remaining, break (sorted!)
            if (candidates[i] > remaining) break;

            current.push(candidates[i]);
            backtrack(i + 1, current, remaining - candidates[i]);
            current.pop();
        }
    }

    backtrack(0, [], target);
    return result;
}

console.log(combinationSum2([10,1,2,7,6,1,5], 8));
// [[1,1,6], [1,2,5], [1,7], [2,6]]

// Letter Combinations of a Phone Number
function letterCombinations(digits) {
    if (!digits.length) return [];

    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }

    backtrack(0, '');
    return result;
}

console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

## 🔴 Hard

| # | Problem | Key Concept | Approach |
|---|---------|-------------|----------|
| 1 | **N-Queens** | Row-by-row + diagonal tracking | Sets for cols/diags, try each col per row |
| 2 | **Sudoku Solver** | Cell-by-cell + validity check | Try 1-9, validate row/col/box |
| 3 | **Word Break II** | Recursion + string partitioning | Try all prefixes in dictionary |
| 4 | **Expression Add Operators** | String + math operations | Insert +, -, * between digits |
| 5 | **Unique Paths III** | Grid + visit all cells | DFS with backtracking on grid |
| 6 | **Rat in a Maze** | Grid path finding | 4-direction DFS with visited |
| 7 | **Knight's Tour** | Chess board traversal | 8 possible moves, visit all 64 squares |
| 8 | **Tug of War** | Partition into two equal halves | Subset selection minimizing diff |

```javascript
// Rat in a Maze — find all paths from (0,0) to (n-1,n-1)
function ratInMaze(maze) {
    const n = maze.length;
    const result = [];
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    // Directions: Down, Left, Right, Up
    const directions = [
        [1, 0, 'D'],   // Down
        [0, -1, 'L'],  // Left
        [0, 1, 'R'],   // Right
        [-1, 0, 'U']   // Up
    ];

    function backtrack(row, col, path) {
        // Base case: reached destination
        if (row === n - 1 && col === n - 1) {
            result.push(path);
            return;
        }

        // Try all 4 directions (in alphabetical order: D, L, R, U)
        for (const [dr, dc, dir] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Validity check
            if (
                newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < n &&
                maze[newRow][newCol] === 1 &&     // Cell is open
                !visited[newRow][newCol]           // Not visited
            ) {
                // Choose
                visited[newRow][newCol] = true;

                // Explore
                backtrack(newRow, newCol, path + dir);

                // Un-choose
                visited[newRow][newCol] = false;
            }
        }
    }

    // Start from (0,0) if it's open
    if (maze[0][0] === 1) {
        visited[0][0] = true;
        backtrack(0, 0, '');
    }

    return result;
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];

console.log(ratInMaze(maze));
// ["DDRDRR", "DRDDRR"]
```

---

# 13. Common Mistakes

## 13.1 Missing Base Case

```javascript
// ❌ WRONG — No base case → infinite recursion → stack overflow
function factorial(n) {
    return n * factorial(n - 1);  // What happens when n = 0? Keeps going: -1, -2, -3...
}

// ✅ CORRECT
function factorial(n) {
    if (n <= 1) return 1;  // ← BASE CASE
    return n * factorial(n - 1);
}
```

## 13.2 Infinite Recursion (Not Making Progress)

```javascript
// ❌ WRONG — n never changes!
function countdown(n) {
    if (n === 0) return;
    console.log(n);
    countdown(n);  // ← Should be countdown(n - 1)!
}

// ❌ WRONG — wrong direction
function sumUpTo(n) {
    if (n === 0) return 0;
    return n + sumUpTo(n + 1);  // ← Going AWAY from base case!
}
```

## 13.3 Wrong State Handling in Backtracking

```javascript
// ❌ WRONG — Forgetting to undo the choice
function subsets(nums) {
    const result = [];
    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }
        current.push(nums[index]);
        backtrack(index + 1, current);
        // MISSING: current.pop()   ← BUG!
        // The 'current' array still has nums[index] when we explore the "skip" path
        backtrack(index + 1, current);
    }
    backtrack(0, []);
    return result;
}

// ✅ CORRECT
function subsets(nums) {
    const result = [];
    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }
        current.push(nums[index]);
        backtrack(index + 1, current);
        current.pop();  // ← UNDO! Essential for correct backtracking.
        backtrack(index + 1, current);
    }
    backtrack(0, []);
    return result;
}
```

## 13.4 Storing Reference Instead of Copy

```javascript
// ❌ WRONG — Stores a REFERENCE to 'current', which keeps changing
result.push(current);  // All entries in result point to the SAME array!

// ✅ CORRECT — Store a COPY
result.push([...current]);       // Spread operator creates a shallow copy
result.push(current.slice());    // Alternative: .slice() also works
result.push(Array.from(current)); // Another alternative
```

## 13.5 Off-by-One in Index

```javascript
// ❌ WRONG — Starting from 0 every time generates duplicates
function subsets(nums) {
    const result = [];
    function backtrack(current) {
        result.push([...current]);
        for (let i = 0; i < nums.length; i++) {  // ← Always starts from 0!
            current.push(nums[i]);
            backtrack(current);
            current.pop();
        }
    }
    backtrack([]);
    return result;  // Contains duplicates like [1,2] and [2,1]
}

// ✅ CORRECT — Start from 'start' to maintain order and avoid duplicates
function subsets(nums) {
    const result = [];
    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {  // ← Start from 'start'!
            current.push(nums[i]);
            backtrack(i + 1, current);  // ← i+1, not start+1
            current.pop();
        }
    }
    backtrack(0, []);
    return result;
}
```

---

# 14. Tips and Tricks

## 14.1 How to Optimize Recursion

### 1. Memoization (Top-Down DP)

Cache results of sub-problems to avoid redundant computation.

```javascript
/**
 * Fibonacci WITHOUT memoization: O(2^n) — exponential!
 * Fibonacci WITH memoization: O(n) — linear!
 * 
 * Visualization:
 * 
 *   WITHOUT MEMO:                    WITH MEMO:
 *        fib(5)                        fib(5)
 *       /      \                      /      \
 *    fib(4)   fib(3)              fib(4)    fib(3) ← CACHED! O(1)
 *    /    \   /    \              /    \
 * fib(3) fib(2) fib(2) fib(1) fib(3)  fib(2) ← CACHED!
 *  ...    ...   ...              ↑
 *                              CACHED!
 * 
 * With memo, each fib(k) is computed ONCE, then looked up in O(1).
 */
function fibMemo(n, memo = new Map()) {
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return n;

    const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.set(n, result);
    return result;
}

console.log(fibMemo(100)); // 354224848179261915075 (instant!)
```

### 2. Tail Recursion

Restructure to make the recursive call the last operation.

```javascript
// Non-tail recursive
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // Must multiply AFTER return
}

// Tail recursive (carry the result as an accumulator)
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // Nothing to do after this returns
}
```

### 3. Effective Pruning in Backtracking

```javascript
// Without pruning: explores all 2^n possibilities
// With pruning: cuts branches early

// Example: Combination sum with SORTED candidates
function combinationSumOptimized(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);  // Sort first!

    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // PRUNING: Since array is sorted, if this candidate > remaining,
            // ALL subsequent candidates will also be > remaining.
            if (candidates[i] > remaining) break;  // ← BREAK, not continue!

            // Skip duplicates at same level (for combination sum II)
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            current.push(candidates[i]);
            backtrack(i + 1, current, remaining - candidates[i]);
            current.pop();
        }
    }

    backtrack(0, [], target);
    return result;
}
```

## 14.2 When to Convert Recursion to Iteration

| Convert to iteration when... | Keep as recursion when... |
|-------------------------------|--------------------------|
| Simple linear recursion (factorial, sum) | Tree/graph traversal |
| Risk of stack overflow for large n | Problem is naturally recursive |
| Performance is critical | Code clarity is important |
| Tail recursion without TCO support | Backtracking problems |

```javascript
// Recursive factorial → Iterative
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive Fibonacci → Iterative (bottom-up DP)
function fibIterative(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}
// O(n) time, O(1) space — best possible!
```

## 14.3 Memoization vs Tabulation

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   MEMOIZATION (Top-Down)         TABULATION (Bottom-Up) │
│                                                         │
│   Start with the big problem     Start with base cases  │
│   Recursion + cache              Iteration + table      │
│   Lazy: only computes needed     Eager: computes all    │
│   May have stack overhead        No recursion overhead   │
│                                                         │
│   function fib(n, memo) {        function fib(n) {      │
│     if (memo[n]) return memo[n];   const dp = [0, 1];   │
│     if (n <= 1) return n;          for (i=2; i<=n; i++) │
│     memo[n] = fib(n-1) +            dp[i] = dp[i-1]    │
│               fib(n-2);                    + dp[i-2];   │
│     return memo[n];                return dp[n];        │
│   }                              }                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

# 15. Real-World Applications

## 15.1 File System Traversal

```javascript
/**
 * Recursively list all files in a directory structure
 * 
 * File system is a TREE — naturally recursive!
 * 
 *       root/
 *       ├── src/
 *       │   ├── index.js
 *       │   ├── utils/
 *       │   │   ├── helper.js
 *       │   │   └── math.js
 *       │   └── app.js
 *       ├── README.md
 *       └── package.json
 */
function listAllFiles(directory) {
    const results = [];

    function traverse(node, path) {
        if (node.type === 'file') {
            results.push(path + '/' + node.name);
            return;
        }

        // It's a directory — recurse into children
        for (const child of node.children) {
            traverse(child, path + '/' + node.name);
        }
    }

    traverse(directory, '');
    return results;
}

// Simulated file system
const fileSystem = {
    name: 'root',
    type: 'directory',
    children: [
        {
            name: 'src',
            type: 'directory',
            children: [
                { name: 'index.js', type: 'file', children: [] },
                {
                    name: 'utils',
                    type: 'directory',
                    children: [
                        { name: 'helper.js', type: 'file', children: [] },
                        { name: 'math.js', type: 'file', children: [] }
                    ]
                },
                { name: 'app.js', type: 'file', children: [] }
            ]
        },
        { name: 'README.md', type: 'file', children: [] },
        { name: 'package.json', type: 'file', children: [] }
    ]
};

console.log(listAllFiles(fileSystem));
/*
[
  '/root/src/index.js',
  '/root/src/utils/helper.js',
  '/root/src/utils/math.js',
  '/root/src/app.js',
  '/root/README.md',
  '/root/package.json'
]
*/
```

## 15.2 Decision Making Problems

```javascript
/**
 * Decision Tree: Should I take an umbrella?
 * 
 * Backtracking in everyday decisions:
 * 
 *                    [Leave House]
 *                    /            \
 *           Take Umbrella    Don't Take
 *              /     \          /      \
 *          Rains   No Rain   Rains   No Rain
 *           ✅       😐      ❌       ✅
 *        (smart)  (burden) (regret) (light)
 * 
 * In real applications:
 * - AI game playing (minimax algorithm)
 * - Resource allocation
 * - Scheduling problems
 * - Route optimization
 */
```

## 15.3 Game Solving

```javascript
/**
 * Tic-Tac-Toe: Check if 'X' can win (Minimax — based on backtracking)
 * 
 * Game Tree:
 *                    Current Board
 *                   /     |      \
 *              X at (0,0) X at (0,1) X at (0,2) ...
 *              /  |  \
 *         O at... O at... O at...
 *           ...
 *        (evaluate winner at leaves)
 * 
 * Recursion explores ALL possible future game states.
 * Backtracking allows undoing moves to try different strategies.
 */

// Simplified: check if a player can guarantee a win
function canWin(board, player) {
    // Base case: check if someone already won
    const winner = checkWinner(board);
    if (winner === player) return true;
    if (winner !== null) return false;
    if (isBoardFull(board)) return false; // Draw

    const opponent = player === 'X' ? 'O' : 'X';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '.') {
                // CHOOSE
                board[i][j] = player;

                // EXPLORE: If opponent CAN'T win after our move, WE win!
                if (!canWin(board, opponent)) {
                    board[i][j] = '.';  // Still need to undo for other callers
                    return true;
                }

                // UN-CHOOSE (backtrack)
                board[i][j] = '.';
            }
        }
    }

    return false; // No winning move found
}

function checkWinner(board) {
    const lines = [
        // Rows
        [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
        // Columns
        [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]],
        // Diagonals
        [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (board[a[0]][a[1]] !== '.' &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[b[0]][b[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }
    return null;
}

function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== '.'));
}
```

## 15.4 Other Real-World Applications

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  📁 FILE SYSTEMS          → Directory traversal          │
│  🌐 WEB CRAWLING          → Follow links recursively     │
│  🧮 MATH EXPRESSIONS      → Parse nested parentheses     │
│  🎨 FRACTAL GENERATION    → Sierpinski triangle, Koch    │
│  🧬 DNA SEQUENCE MATCHING → Try all alignments           │
│  📦 JSON/XML PARSING      → Nested structure traversal   │
│  🗺️ PATHFINDING           → Maze solving, Google Maps    │
│  ♟️ GAME AI               → Chess, Go, Tic-Tac-Toe      │
│  📊 COMPILER DESIGN       → Recursive descent parsing    │
│  🔐 CRYPTOGRAPHY          → Brute force / pattern match  │
│  🏗️ TOWER OF HANOI        → Classic recursive puzzle     │
│  📋 DEPENDENCY RESOLUTION → npm, package managers        │
│  🧩 CONSTRAINT SOLVING    → Sudoku, crossword puzzles    │
│  🔄 UNDO/REDO SYSTEMS     → State backtracking           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

# 🎯 Quick Reference Cheat Sheet

```
┌────────────────────────────────────────────────────────────────────┐
│                    RECURSION CHEAT SHEET                           │
│                                                                    │
│  EVERY recursive function needs:                                   │
│    1. BASE CASE (when to stop)                                     │
│    2. RECURSIVE CASE (call self with smaller input)                │
│    3. PROGRESS toward base case                                    │
│                                                                    │
│  BACKTRACKING template:                                            │
│    for each choice:                                                │
│        if valid:                                                   │
│            MAKE choice                                             │
│            RECURSE                                                 │
│            UNDO choice            ← THE KEY STEP                   │
│                                                                    │
│  COMMON PATTERNS:                                                  │
│    Pick/Not-Pick     → Subsets, Subsequences                       │
│    Loop + Recurse    → Permutations, Combinations                  │
│    Grid DFS          → Word Search, Maze, Islands                  │
│    Constraint Check  → N-Queens, Sudoku                            │
│                                                                    │
│  COMPLEXITY:                                                       │
│    Subsets:       O(2^n)                                           │
│    Permutations:  O(n!)                                            │
│    Combination:   O(2^t/min) where t = target                      │
│    N-Queens:      O(n!)                                            │
│                                                                    │
│  OPTIMIZATION:                                                     │
│    1. Memoization (cache repeated sub-problems)                    │
│    2. Pruning (skip invalid branches early)                        │
│    3. Sorting (enables better pruning with break)                  │
│    4. Convert to iteration (for simple linear recursion)           │
│                                                                    │
│  REMEMBER:                                                         │
│    ✓ Always store COPIES in results: [...current]                  │
│    ✓ Always UNDO after recursive call                              │
│    ✓ Trust the recursion — think about ONE level                   │
│    ✓ Draw the decision tree for clarity                            │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

# 📚 Recommended Practice Order

```
Week 1: RECURSION BASICS
    □ Factorial
    □ Fibonacci
    □ Sum of N numbers
    □ Power (x^n)
    □ Print 1 to N / N to 1
    □ Reverse string
    □ Check palindrome
    □ Sum of digits

Week 2: RECURSION INTERMEDIATE
    □ Print all subsequences
    □ Subsequences with sum K
    □ Count subsequences with sum K
    □ Merge Sort
    □ Quick Sort
    □ Tower of Hanoi

Week 3: BACKTRACKING FUNDAMENTALS
    □ Subsets
    □ Subsets II (with duplicates)
    □ Permutations
    □ Permutations II (with duplicates)
    □ Combination Sum
    □ Combination Sum II
    □ Generate Parentheses

Week 4: BACKTRACKING ADVANCED
    □ Palindrome Partitioning
    □ Word Search
    □ N-Queens
    □ Sudoku Solver
    □ Letter Combinations of Phone Number
    □ Rat in a Maze
    □ Word Break II
    □ Expression Add Operators
```

---

> **Final Words:**
> 
> Recursion is not about memorizing solutions. It's about developing a **way of thinking**. Every time you encounter a new problem:
> 
> 1. Can I break this into smaller, identical sub-problems?
> 2. What's the simplest case I can solve directly?
> 3. How do I combine the answers?
> 
> For backtracking, add:
> 
> 4. What are my choices at each step?
> 5. When should I abandon a path?
> 6. How do I undo my choice?
> 
> **Practice these patterns until they become second nature. Draw trees. Trace by hand. The intuition WILL come.**

---

*Happy Coding! 🚀*