---
title: "Arrays & Collections — Interview Questions"
description: "JavaScript interview questions on arrays, Set, Map, WeakMap, WeakSet, iterators, and generators."
sidebar:
  order: 4
---

# 🟡 Arrays & Collections

---

## Q1. What is the difference between `forEach`, `map`, `filter`, and `reduce`?

**Answer:**

```js
const nums = [1, 2, 3, 4, 5];

// forEach — iterates, returns nothing
nums.forEach(n => console.log(n));

// map — transforms each element, returns new array
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter — returns elements matching condition
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce — reduces to single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
```

---

## Q2. What are common `array` methods?

**Answer:**

```js
const arr = [1, 2, 3, 4, 5];

arr.push(6)       // add to end → [1,2,3,4,5,6]
arr.pop()         // remove from end
arr.unshift(0)    // add to start
arr.shift()       // remove from start
arr.splice(1, 2)  // remove 2 at index 1
arr.slice(1, 3)   // new array [2, 3]
arr.indexOf(3)    // 2
arr.includes(3)   // true
arr.find(n => n > 3)       // 4
arr.findIndex(n => n > 3)  // 3
arr.some(n => n > 4)       // true
arr.every(n => n > 0)      // true
arr.flat()                 // flatten nested arrays
arr.flatMap(n => [n, n*2]) // map + flat
arr.sort((a,b) => a - b)   // ascending sort
arr.reverse()              // reverse in place
Array.from({length: 3}, (_, i) => i) // [0, 1, 2]
```

---

## Q3. What is the difference between `slice` and `splice`?

**Answer:**

```js
const arr = [1, 2, 3, 4, 5];

// slice — returns new array, does NOT mutate
arr.slice(1, 3);  // [2, 3]
arr.slice(-2);    // [4, 5]
// arr is still [1, 2, 3, 4, 5]

// splice — mutates original array
arr.splice(1, 2);        // removes 2 at index 1 → [2, 3]
// arr is now [1, 4, 5]

arr.splice(1, 0, 10, 20); // insert at index 1
// arr is now [1, 10, 20, 4, 5]
```

---

## Q4. What is `Object.keys`, `Object.values`, `Object.entries`?

**Answer:**

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj)    // ["a", "b", "c"]
Object.values(obj)  // [1, 2, 3]
Object.entries(obj) // [["a",1], ["b",2], ["c",3]]

// Iterate
Object.entries(obj).forEach(([key, val]) => {
  console.log(`${key}: ${val}`);
});

// Convert back
Object.fromEntries([["a", 1], ["b", 2]]); // { a: 1, b: 2 }
```

---

## Q5. What is the difference between `for...of` and `for...in`?

**Answer:**

```js
// for...of — iterates values (arrays, strings, maps, sets)
const arr = [10, 20, 30];
for (const val of arr) {
  console.log(val); // 10, 20, 30
}

// for...in — iterates keys (object properties)
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // "a", "b", "c"
}

// ⚠️ Avoid for...in on arrays — it iterates indices as strings
// and includes inherited properties
```

---

## Q6. What is `Array.from()`?

**Answer:**

```js
// From array-like or iterable
Array.from("hello");         // ["h","e","l","l","o"]
Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]
Array.from(new Set([1,2,3])); // [1,2,3]
Array.from(new Map([["a",1]])); // [["a",1]]

// Convert NodeList to Array
const divs = Array.from(document.querySelectorAll("div"));
```

---

## Q7. What is `Array.isArray()`?

**Answer:**
Used to reliably check if a value is an array, since `typeof []` returns `"object"`.

```js
Array.isArray([]);        // true
Array.isArray({});        // false
Array.isArray("string");  // false
Array.isArray(new Array()); // true
```

---

## Q8. What is `Set` in JavaScript?

**Answer:**

```js
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set(3) {1, 2, 3} — unique values only

set.add(4);
set.has(3);    // true
set.delete(2);
set.size;      // 3

// Convert to array
const arr = [...set]; // or Array.from(set)

// Remove duplicates from array
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
// [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const union = new Set([...setA, ...setB]);         // {1,2,3,4}
const intersection = new Set([...setA].filter(x => setB.has(x))); // {2,3}
```

---

## Q9. What is `Map` vs plain Object?

**Answer:**

```js
// Map — key can be ANY type, maintains insertion order
const map = new Map();
map.set("name", "Alice");
map.set(42, "a number key");
map.set({}, "an object key");

map.size;           // 3
map.get("name");    // "Alice"
map.has(42);        // true
map.delete(42);
map.forEach((val, key) => console.log(key, val));

// Convert
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));

// Map vs Object:
// ✅ Map: any key type, size property, better for frequent add/delete
// ✅ Object: JSON serializable, dot notation, prototype methods
```

---

## Q10. What is `WeakMap` and `WeakSet`?

**Answer:**

```js
// WeakMap — keys must be objects, entries garbage-collected
// when key has no other references
const wm = new WeakMap();
let obj = {};
wm.set(obj, "metadata");
wm.get(obj); // "metadata"
obj = null; // entry will be GC'd

// WeakSet — set of objects, auto-cleaned
const ws = new WeakSet();
let user = { name: "Alice" };
ws.add(user);
ws.has(user); // true
user = null; // GC'd automatically

// Use case: private data per object
const _private = new WeakMap();
class Person {
  constructor(name, age) {
    _private.set(this, { age });
    this.name = name;
  }
  getAge() { return _private.get(this).age; }
}
```

---

## Q11. What is the `Iterator` protocol?

**Answer:**

```js
// An iterator has a next() method returning { value, done }
function createRange(start, end) {
  let current = start;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return current <= end
        ? { value: current++, done: false }
        : { value: undefined, done: true };
    }
  };
}

const range = createRange(1, 5);
for (const n of range) console.log(n); // 1, 2, 3, 4, 5
[...range]; // [1, 2, 3, 4, 5]

// Built-in iterables: String, Array, Map, Set, arguments, NodeList
```

---

## Q12. Explain `Symbol.iterator` and how to make objects iterable.

**Answer:**

```js
class InfiniteCounter {
  constructor(start = 0) {
    this.value = start;
  }

  [Symbol.iterator]() {
    let current = this.value;
    return {
      next() {
        return { value: current++, done: false };
      },
      return(value) { // called when loop exits early
        console.log("Iterator closed early");
        return { value, done: true };
      }
    };
  }
}

const counter = new InfiniteCounter(1);
const [first, second, third] = counter; // 1, 2, 3

for (const n of counter) {
  if (n > 5) break; // triggers return()
  console.log(n);
}
```

---

## Q13. What are generators in JavaScript?

**Answer:**
Generators are functions that can be paused and resumed with `yield`.

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Infinite sequence
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

// Use with for...of
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}
```

---

## Q14. What are async generators?

**Answer:**

```js
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Consume with for await...of
async function main() {
  for await (const num of asyncRange(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5 — each delayed 100ms
  }
}

// Real use: paginated API fetching
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page}`).then(r => r.json());
    if (!data.items.length) return;
    yield data.items;
    page++;
  }
}
```

---

## Q15. What are `string` methods you use most often?

**Answer:**

```js
const str = "  Hello, World!  ";

str.trim()               // "Hello, World!"
str.toLowerCase()        // "  hello, world!  "
str.toUpperCase()        // "  HELLO, WORLD!  "
str.includes("World")    // true
str.startsWith("Hello")  // false (has spaces)
str.endsWith("!")        // false (has spaces)
str.replace("World", "JS") // "  Hello, JS!  "
str.split(", ")          // ["  Hello", "World!  "]
str.slice(2, 7)          // "Hello"
str.indexOf("o")         // 4
str.padStart(20, "*")    // pads to length 20
str.repeat(2)            // repeats string
```

---

## Q16. What are the latest array methods (ES2023)?

**Answer:**

```js
// ES2023 — non-mutating array methods
const arr = [3, 1, 2];

arr.toSorted();      // [1, 2, 3] — original unchanged ✅
arr.toReversed();    // [2, 1, 3] — original unchanged ✅
arr.toSpliced(1, 1); // [3, 2] — original unchanged ✅
arr.with(1, 99);     // [3, 99, 2] — original unchanged ✅

// Array.findLast / findLastIndex
[1,2,3,4,5].findLast(n => n % 2 === 0); // 4
[1,2,3,4,5].findLastIndex(n => n < 4);   // 2
```
