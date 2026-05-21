# Data Structures & Algorithms Handbook

A practical guide to core DSA concepts for developers, including explanations, intuition, examples, and complexity analysis.

---

# Table of Contents (Index)

Click on any topic below to jump directly to that section:

## Fundamentals
- [Algorithm Basics](#algorithm-basics)
- [Time Complexity](#time-complexity)
- [Big-O Notation](#big-o-notation)
- [How to Find Time Complexity](#how-to-find-time-complexity)
- [Space Complexity](#space-complexity)

## Core Data Structures
- [Arrays](#arrays)
- [Stack (LIFO)](#stack-lifo)
- [Queue (FIFO)](#queue-fifo)
- [Hash, HashMap, and Set](#hash-hashmap-and-set)

## JavaScript Array Methods
- [Transformation Methods](#transformation-methods)
  - [map()](#map)
  - [filter()](#filter)
  - [reduce()](#reduce)
- [Extract/Copy Methods](#extract-copy-methods)
  - [slice()](#slice)
  - [concat()](#concat)
- [Modify (Mutating) Methods](#modify-mutating-methods)
  - [splice()](#splice)
  - [push()](#push)
  - [pop()](#pop)
  - [unshift()](#unshift)
  - [shift()](#shift)
  - [reverse()](#reverse)
  - [sort()](#sort)
- [Search/Check Methods](#search-check-methods)
  - [includes()](#includes)
  - [indexOf()](#indexof)
  - [find()](#find)
  - [findIndex()](#findindex)
  - [some()](#some)
  - [every()](#every)
- [Utility Methods](#utility-methods)
  - [join()](#join)
  - [flat()](#flat)
  - [flatMap()](#flatmap)

## Interview Topics
- [JavaScript Array Methods (Interview Ready)](#javascript-array-methods)
- [Interview Cheat Sheet](#interview-cheat-sheet)
- [Most Asked in Interviews](#most-asked-in-interviews)
- [HashMap & Set Interview Questions](#interview-questions)
- [Two Sum Problem](#two-sum-problem)

## Recommended Next Steps
- [Next Topics to Study](#recommended-next-topics)

---


<a id="algorithm-basics"></a>
# Algorithm Basics

An **algorithm** is a finite sequence of steps used to solve a problem.

## Example

```javascript
function findMax(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}
```

**Time:** O(n)
**Space:** O(1)

---

<a id="time-complexity"></a>
# Time Complexity

Time complexity measures how execution time grows relative to input size **n**.

---

| Complexity     | Meaning                                     | Example                |
| -------------- | ------------------------------------------- | ---------------------- |
| **O(1)**       | Constant time, doesn't depend on input size | Access array element   |
| **O(log n)**   | Input halves each step                      | Binary Search          |
| **O(n)**       | Runs once per element                       | Linear search          |
| **O(n log n)** | Divide and merge type algorithms            | Merge Sort, Quick Sort |
| **O(n²)**      | Nested loops                                | Bubble Sort            |
| **O(2ⁿ)**      | Exponential growth                          | Recursive subsets      |


---

<a id="big-o-notation"></a>
# Big-O Notation

Big-O describes **worst-case runtime**.

Example:

```
3n + 10  O(n)
```

---

# O(1) Constant Time

```javascript
const value = arr[5];
```

---

# O(log n)  Logarithmic

## Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

---

# O(n) Linear

```javascript
for (let item of array) {
  console.log(item);
}
```

---

# O(n²) Quadratic

```javascript
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}
```


<a id="how-to-find-time-complexity"></a>
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

#  Quick Pattern Recognition

| Pattern             | Complexity |
| ------------------- | ---------- |
| Direct access       | O(1)       |
| Single loop         | O(n)       |
| Nested loops        | O(n²)      |
| Input halves        | O(log n)   |
| Loop + log          | O(n log n) |
| Two recursive calls | O(2)      |

---

# Worked Examples

## Example 1

```js
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

’ **O(n)**

---

## Example 2

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    console.log(i, j);
  }
}
```
 **O(n²)**

---

## Example 3

```js
while (n > 1) {
  n = Math.floor(n / 2);
}
```

**O(log n)**

---

## Example 4

```js
for (let i = 0; i < n; i++) {
  binarySearch(arr);
}
```

**O(n log n)**

---


---

<a id="space-complexity"></a>
# Space Complexity

Measures extra memory used by an algorithm.

```javascript
function sum(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}
```

**Space:** O(1)

---

<a id="arrays"></a>
#  Arrays

```javascript
let numbers = [10, 20, 30];
```

## Operations

* Access ’ O(1)
* Search ’ O(n)
* Insert End ’ O(1)
* Insert Start ’ O(n)

---

<a id="stack-lifo"></a>
#  Stack (LIFO)

Last In, First Out.

## Operations

* Push ’ O(1)
* Pop ’ O(1)
* Peek ’ O(1)

## Example Flow

```
push(10) ’ [10]
push(20) ’ [10, 20]
push(30) ’ [10, 20, 30]
pop() ’ [10, 20]
peek() ’ 20
```

## JavaScript Implementation

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

## Real-World Uses

* Undo/Redo
* Browser history
* Function calls
* Expression evaluation

---

<a id="queue-fifo"></a>
# Queue (FIFO)

First In, First Out.

## Operations

* Enqueue ’ O(1)
* Dequeue ’ O(1)

## Example Flow

```
enqueue(10) ’ [10]
enqueue(20) ’ [10, 20]
enqueue(30) ’ [10, 20, 30]
dequeue() ’ [20, 30]
```

## Optimized Implementation

```js
class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.items[this.rear++] = value;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.items[this.front];
    delete this.items[this.front++];
    return value;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
```

## Real-World Uses

* Task scheduling
* Printer queue
* BFS
* Request handling

---

<a id="javascript-array-methods"></a>
# JavaScript Array Methods (Interview Ready)

Below is a practical reference of the **most important JS array methods** with examples and time complexity.

---

<a id="transformation-methods"></a>
# ­ Transformation Methods

<a id="map"></a>
## map()

Creates a new array by transforming each element.

```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// [2, 4, 6]
```

**Time:** O(n)
**Mutates original?** No

---

<a id="filter"></a>
## filter()

Returns elements that match a condition.

```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
// [2, 4]
```

**Time:** O(n)
**Mutates original?** No

---

<a id="reduce"></a>
## reduce()

Reduces array to a single value.

```javascript
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
// 10
```

**Time:** O(n)
**Mutates original?** No

---

<a id="extract-copy-methods"></a>
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
#  Interview Cheat Sheet

## Non-mutating

* map
* filter
* reduce
* slice
* concat
* includes
* find

---

## Mutating (VERY IMPORTANT)

* push
* pop
* shift
* unshift
* splice
* reverse
* sort

---

<a id="most-asked-in-interviews"></a>
# Most Asked in Interviews

If you must prioritize:

1. map
2. filter
3. reduce
4. splice vs slice VERY COMMON
5. sort with comparator
6. find vs filter
7. some vs every


---

<a id="hash-hashmap-and-set"></a>
# Hash, HashMap, and Set in JavaScript

These are **core interview data structures** used for fast lookup, counting, and uniqueness.

---

# What is a Hash?

A **hash** is a technique that converts a key into an index using a hash function.

Goal: **fast lookup (O(1) average)**

### Concept

```
key ’ hash function ’ index ’ value
```

Example idea:

```
"apple" ’ hash ’ bucket[5]
```

You dont compute this manually in JS  `Map`, `Set`, and objects handle it internally.

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

# When to Use Map vs Object

## Use Map when:

* keys are not strings
* need guaranteed insertion order
* frequent additions/deletions
* want better performance semantics

## Use Object when:

* simple JSON-like data
* keys are strings only

---

| Feature         | Object                                        | Map                                          |
| --------------- | --------------------------------------------- | -------------------------------------------- |
| Key types       | Strings or Symbols                            | Any type (objects, numbers, functions, etc.) |
| Order preserved | ❌ Not guaranteed (older JS)                   | ✅ Preserves insertion order                  |
| Size property   | ❌ No direct property (`Object.keys().length`) | ✅ `map.size`                                 |
| Performance     | Good for small data                           | Better for large datasets                    |
| Iteration       | Less clean (`for...in`, `Object.keys`)        | Cleaner (`for...of`, `map.forEach`)          |

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

# Most Important Set Pattern (Interview Favorite)

## Remove duplicates from array

```javascript
const nums = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(nums)];

console.log(unique);
// [1, 2, 3, 4]
```

**Time:** O(n)
VERY COMMON INTERVIEW QUESTION

---

#  Map vs Set Quick Difference

| Feature        | Map              | Set         |
| -------------- | ---------------- | ----------- |
| Stores         | key  value      | values only |
| Duplicate keys |                 |            |
| Access by key  |           Use caseounting, l | uniqueness  |

---

<a id="interview-questions"></a>
#  Interview Questions (Must Practice)

---

## Question 1  Two Sum (HashMap)

**Problem:** Return indicesof two numbers that sum to target.

```javascript
function twoSum(nums, targe{
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    coned = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
map.set(nums[i], i);
  }
**Time:** O(n)
**Space:** O(n)

---

## Question 2 Contains Duplicate (Set)

**Problem:** Check if array contains duplicates.

```javascript
function containsDuplicate(nums) {
  const set = new Set(nums);
  return set.size !== nums.length;
}
```

**Time:** O(n)

---

##  Question 3 First Non-Repeating Character

```javascript
function firstUniqueChar(s) {
  const freq = new Map();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}
```

---

## Question 4 Intersection of Two Arrays

```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  return [...result];
}
```

---

# Pro Interview Tips

## Use Map when:

* frequency counter
* index lookup
* pair problems
* caching

## Use Set when:

* remove duplicates
* membership check
* uniqueness problems
* cycle detection

---

# Complexity Summary

| Operation | Map      | Set |
| --------- | -------- | --- |
| Insert    | O(1) avg |     |
| Delete    | O(1) avg |     |
| Search    | O(1) avg |     |

 Worst case can be O(n), but interviews assume **O(1) average**.

---


<a id="two-sum-problem"></a>
# Two Sum Problem

## Brute Force O(n²)

```javascript
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target)
      return [i, j];
  }
}
```

---

## Optimal O(n)

```javascript
function twoSum(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map[complement] !== undefined)
      return [map[complement], i];

    map[nums[i]] = i;
  }
}
```

---

<a id="recommended-next-topics"></a>
#  Recommended Next Topics

* Linked Lists
* Trees
* Graphs
* Recursion
* Sliding Window
* Dynamic Programming

---

**Tip:** Master arrays + hash maps + two pointers first ” they dominate interviews.



