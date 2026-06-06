---
title: "Asynchronous JavaScript — Interview Questions"
description: "JavaScript interview questions on event loop, promises, async/await, microtasks vs macrotasks, and async patterns."
sidebar:
  order: 6
---

# 🔴 Asynchronous JavaScript

---

## Q1. How does the JavaScript Event Loop work?

**Answer:**
The event loop allows JavaScript (single-threaded) to perform non-blocking operations.

```
Call Stack → Web APIs → Task Queue → Microtask Queue
```

**Order of execution:**
1. **Call Stack** — synchronous code runs first
2. **Microtask Queue** — Promises (`.then`), `queueMicrotask`, `MutationObserver`
3. **Macrotask Queue** — `setTimeout`, `setInterval`, `setImmediate`

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1 → 4 → 3 → 2
```

---

## Q2. What are Promises in JavaScript?

**Answer:**
A Promise represents a value that will be available now, in the future, or never.

**States:** `pending` → `fulfilled` or `rejected`

```js
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve("data"), 1000);
});

fetchData()
  .then(data => console.log(data))   // "data"
  .catch(err => console.error(err))
  .finally(() => console.log("done"));

// Promise combinators
Promise.all([p1, p2, p3])         // all resolve or one rejects
Promise.allSettled([p1, p2, p3])  // waits for all, regardless
Promise.race([p1, p2, p3])        // first to settle wins
Promise.any([p1, p2, p3])         // first to RESOLVE wins
```

---

## Q3. What is `async/await`?

**Answer:**
`async/await` is syntactic sugar over Promises, making async code look synchronous.

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) throw new Error("User not found");

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

// Parallel execution
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
}
```

---

## Q4. What is `Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any`?

**Answer:**

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject("error");
const p3 = Promise.resolve(3);

// Promise.all — rejects if ANY rejects
Promise.all([p1, p2, p3]).catch(e => console.log(e)); // "error"
Promise.all([p1, p3]).then(v => console.log(v)); // [1, 3]

// Promise.allSettled — waits for ALL, never rejects
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => console.log(r.status, r.value ?? r.reason));
  // "fulfilled" 1 | "rejected" "error" | "fulfilled" 3
});

// Promise.race — first to SETTLE (resolve or reject) wins
Promise.race([p1, p2, p3]).then(v => console.log(v)); // 1

// Promise.any — first to RESOLVE wins (ignores rejections)
Promise.any([p2, p1, p3]).then(v => console.log(v)); // 1
```

---

## Q5. Explain the difference between microtasks and macrotasks with execution order.

**Answer:**

```js
// Macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
// Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver

console.log("1");                          // sync

setTimeout(() => console.log("2"), 0);    // macrotask

Promise.resolve()
  .then(() => {
    console.log("3");                      // microtask
    setTimeout(() => console.log("4"), 0); // macrotask (scheduled inside microtask)
  })
  .then(() => console.log("5"));           // microtask (chained)

queueMicrotask(() => console.log("6"));   // microtask

console.log("7");                          // sync

// Output: 1 → 7 → 3 → 6 → 5 → 2 → 4
// Explanation:
// Sync: 1, 7
// Microtasks: 3, 6, 5 (3 adds setTimeout, 6 is queueMicrotask, 5 is chained)
// Macrotasks: 2 (original), 4 (added during microtask)
```

---

## Q6. How does JavaScript's `async/await` work under the hood?

**Answer:**

```js
// async/await is syntactic sugar over Promises + generators

// This async function:
async function fetchUser(id) {
  const response = await fetch(`/api/${id}`);
  const user = await response.json();
  return user;
}

// Is roughly equivalent to:
function fetchUser(id) {
  return Promise.resolve()
    .then(() => fetch(`/api/${id}`))
    .then(response => response.json())
    .then(user => user);
}

// Under the hood, V8 transforms async functions into state machines:
// 1. Function runs synchronously until first await
// 2. Suspends execution, returns Promise
// 3. When awaited Promise resolves, execution resumes
// 4. Repeat until function returns

async function demo() {
  console.log("A");           // sync
  await Promise.resolve();
  console.log("B");           // after microtask
}
console.log("before");
demo();
console.log("after");
// Output: before → A → after → B
```

---

## Q7. How do you implement `Promise.all` from scratch?

**Answer:**

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);

    const results = new Array(promises.length);
    let resolved = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          resolved++;
          if (resolved === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // first rejection cancels all
    });
  });
}

// Test
myPromiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]
```

---

## Q8. How do you implement `async/await` using generators?

**Answer:**

```js
// async/await can be polyfilled using generators

function asyncToGenerator(generatorFn) {
  return function(...args) {
    const generator = generatorFn.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = generator[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = result;

        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            val => step("next", val),
            err => step("throw", err)
          );
        }
      }

      step("next", undefined);
    });
  };
}

// Usage
const fetchUser = asyncToGenerator(function*(id) {
  const response = yield fetch(`/api/users/${id}`);
  const user = yield response.json();
  return user;
});
```

---

## Q9. Implement a pub/sub (event emitter) system.

**Answer:**

```js
class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener); // return unsubscribe fn
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(listener => {
      listener(...args);
    });
  }

  removeAllListeners(event) {
    if (event) this.#listeners.delete(event);
    else this.#listeners.clear();
  }
}

const emitter = new EventEmitter();
const unsub = emitter.on("data", data => console.log("Received:", data));
emitter.emit("data", { id: 1 }); // "Received: {id:1}"
unsub(); // unsubscribe
```

---

## Q10. How do you implement a rate limiter in JavaScript?

**Answer:**

```js
class RateLimiter {
  #queue = [];
  #running = 0;
  #limit;
  #interval;

  constructor(limit, interval) {
    this.#limit = limit;     // max requests
    this.#interval = interval; // per interval (ms)
  }

  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.#queue.push({ fn, resolve, reject });
      this.#process();
    });
  }

  #process() {
    while (this.#queue.length && this.#running < this.#limit) {
      const { fn, resolve, reject } = this.#queue.shift();
      this.#running++;

      Promise.resolve()
        .then(() => fn())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          setTimeout(() => {
            this.#running--;
            this.#process();
          }, this.#interval);
        });
    }
  }
}

// Max 3 requests per second
const limiter = new RateLimiter(3, 1000);
const fetchWithLimit = url => limiter.execute(() => fetch(url));
```

---

## Q11. What are async generators?

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

## Q12. What is the `AbortController`?

**Answer:**

```js
// Cancel fetch requests
const controller = new AbortController();
const signal = controller.signal;

fetch("/api/data", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request was cancelled");
    }
  });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Real use: cancel stale search requests
let currentController;
input.addEventListener("input", async (e) => {
  currentController?.abort(); // cancel previous
  currentController = new AbortController();
  const results = await fetch(`/search?q=${e.target.value}`, {
    signal: currentController.signal
  });
});
```

---

## Q13. What is `Promise.withResolvers` (ES2024)?

**Answer:**

```js
// Before ES2024 — needed to create resolve/reject outside promise
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// ES2024 — cleaner API
const { promise, resolve, reject } = Promise.withResolvers();

// Useful for callback-based APIs
function waitForEvent(element, eventName) {
  const { promise, resolve } = Promise.withResolvers();
  element.addEventListener(eventName, resolve, { once: true });
  return promise;
}
```

---

## Q14. Explain the JavaScript memory model and garbage collection.

**Answer:**

JavaScript uses **automatic garbage collection** with the **Mark-and-Sweep** algorithm.

**Memory lifecycle:**
1. **Allocate** — when declaring variables, objects, functions
2. **Use** — reading/writing
3. **Release** — GC reclaims unreachable memory

```js
// Memory leak examples and fixes:

// 1. Forgotten timers
const id = setInterval(() => { /* uses reference */ }, 1000);
clearInterval(id); // ✅ always clear

// 2. Detached DOM nodes
let div = document.createElement("div");
document.body.appendChild(div);
document.body.removeChild(div);
div = null; // ✅ remove reference

// 3. Closures holding large data
function process(largeData) {
  const summary = summarize(largeData);
  return function() {
    return summary; // ✅ only keep what's needed
  };
}

// 4. Global variables
function oops() {
  leakedVar = "I am global!"; // ❌ no var/let/const
}
```
