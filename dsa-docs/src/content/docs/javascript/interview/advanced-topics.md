---
title: "Advanced Topics & System Design — Interview Questions"
description: "Advanced JavaScript interview questions on V8 internals, memory management, design patterns, reactive programming, and large-scale architecture."
sidebar:
  order: 8
---

# 🔴 Advanced Topics & System Design

---

## Q1. Explain the JavaScript memory model and garbage collection.

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

---

## Q2. How does `V8` optimize JavaScript? What are hidden classes?

**Answer:**

```js
// V8 uses Hidden Classes (Shapes/Maps) for property access optimization

// ✅ Good — V8 creates ONE hidden class for all Person objects
class Person {
  constructor(name, age) {
    this.name = name; // property order matters!
    this.age = age;
  }
}

// ❌ Bad — creates DIFFERENT hidden classes
function createPerson(name, age) {
  const obj = {};
  obj.name = name; // hidden class A
  obj.age = age;   // hidden class B (transition)
  return obj;
}

// ❌ Bad — dynamic property addition breaks optimization
const p = new Person("Alice", 30);
p.email = "alice@example.com"; // hidden class C — new class!

// V8 optimization pipeline:
// 1. Interpreter (Ignition) — runs immediately
// 2. Baseline compiler
// 3. Optimizing compiler (Turbofan) — for "hot" code
// 4. Deoptimization — if assumptions broken
```

---

## Q3. What are JavaScript design patterns? Name key ones.

**Answer:**

```js
// 1. SINGLETON
class Database {
  static #instance = null;
  constructor() {
    if (Database.#instance) return Database.#instance;
    this.connection = "DB connected";
    Database.#instance = this;
  }
  static getInstance() {
    return Database.#instance || new Database();
  }
}

// 2. OBSERVER
class Store {
  #state = {};
  #observers = new Set();

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#observers.forEach(fn => fn(this.#state));
  }
  subscribe(fn) { this.#observers.add(fn); return () => this.#observers.delete(fn); }
}

// 3. FACTORY
function createUser(role) {
  const roles = { admin: AdminUser, user: RegularUser };
  const UserClass = roles[role] || RegularUser;
  return new UserClass();
}

// 4. DECORATOR
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```

---

## Q4. Implement an observable/reactive system from scratch.

**Answer:**

```js
// Mini-reactive system (inspired by Vue 3)
let activeEffect = null;

function reactive(obj) {
  const deps = new Map();

  const getDeps = key => {
    if (!deps.has(key)) deps.set(key, new Set());
    return deps.get(key);
  };

  return new Proxy(obj, {
    get(target, key) {
      if (activeEffect) getDeps(key).add(activeEffect);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      getDeps(key).forEach(effect => effect()); // trigger
      return true;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn(); // run immediately to collect deps
  activeEffect = null;
}

// Usage
const state = reactive({ count: 0 });
effect(() => console.log("Count:", state.count)); // "Count: 0"
state.count++; // "Count: 1"
state.count++; // "Count: 2"
```

---

## Q5. How do you architect a large-scale JavaScript application?

**Answer:**

```
Architecture Principles for Scale:
1. Separation of Concerns
2. Single Responsibility
3. Dependency Inversion
4. Observable State Management
```

```js
// 1. LAYERED ARCHITECTURE
//
// UI Layer (React/Vue)
//    ↓
// Application Layer (Use Cases / Services)
//    ↓
// Domain Layer (Business Logic / Entities)
//    ↓
// Infrastructure Layer (API / Storage / External)

// 2. STATE MANAGEMENT (Flux/Redux pattern)
const store = {
  state: { users: [], loading: false },

  dispatch(action) {
    this.state = reducer(this.state, action);
    this.subscribers.forEach(fn => fn(this.state));
  },

  subscribe(fn) { this.subscribers.push(fn); }
};

// 3. DEPENDENCY INJECTION
class UserService {
  constructor(private api: ApiClient, private cache: CacheService) {}

  async getUser(id) {
    return this.cache.get(`user:${id}`)
      ?? await this.api.get(`/users/${id}`);
  }
}

// 4. ERROR BOUNDARIES & RESILIENCE
class CircuitBreaker {
  #failures = 0;
  #threshold = 5;
  #state = "CLOSED"; // CLOSED → OPEN → HALF_OPEN

  async execute(fn) {
    if (this.#state === "OPEN") throw new Error("Circuit open");
    try {
      const result = await fn();
      this.#onSuccess();
      return result;
    } catch (err) {
      this.#onFailure();
      throw err;
    }
  }
}

// 5. CODE SPLITTING & LAZY LOADING
const Dashboard = React.lazy(() => import("./Dashboard"));

// 6. PERFORMANCE
// - Bundle splitting (vendor, app, async chunks)
// - Tree shaking (named exports, side-effect free)
// - Web Workers for CPU-intensive tasks
// - Virtual scrolling for large lists
// - SSR/SSG for initial load performance
```

---

## Q6. Implement a pub/sub (event emitter) system.

**Answer:**

```js
class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener);
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

## Q7. What is the difference between microtasks and macrotasks?

**Answer:**

```js
// Macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
// Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver

console.log("1");                          // sync

setTimeout(() => console.log("2"), 0);    // macrotask

Promise.resolve()
  .then(() => {
    console.log("3");                      // microtask
    setTimeout(() => console.log("4"), 0); // macrotask
  })
  .then(() => console.log("5"));           // microtask (chained)

queueMicrotask(() => console.log("6"));   // microtask

console.log("7");                          // sync

// Output: 1 → 7 → 3 → 6 → 5 → 2 → 4
```

---

## Q8. How does `async/await` work under the hood?

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
```

---

## Q9. How do you implement `async/await` using generators?

**Answer:**

```js
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

const fetchUser = asyncToGenerator(function*(id) {
  const response = yield fetch(`/api/users/${id}`);
  const user = yield response.json();
  return user;
});
```

---

## Q10. Implement `Promise.all` from scratch.

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
        .catch(reject);
    });
  });
}
```

---

## Q11. Implement a deep clone function from scratch.

**Answer:**

```js
function deepClone(value, visited = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (visited.has(value)) return visited.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Set) {
    const clone = new Set();
    visited.set(value, clone);
    value.forEach(item => clone.add(deepClone(item, visited)));
    return clone;
  }
  if (value instanceof Map) {
    const clone = new Map();
    visited.set(value, clone);
    value.forEach((v, k) => clone.set(deepClone(k, visited), deepClone(v, visited)));
    return clone;
  }

  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  visited.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], visited);
  }

  return clone;
}
```

---

## Q12. What is `AggregateError`?

**Answer:**

```js
// AggregateError — holds multiple errors
// Used by Promise.any() when ALL promises reject

const p1 = Promise.reject(new Error("error 1"));
const p2 = Promise.reject(new Error("error 2"));

Promise.any([p1, p2]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors);   // [Error: error 1, Error: error 2]
});

// Throw manually
throw new AggregateError(
  [new Error("a"), new Error("b")],
  "Multiple errors occurred"
);
```

---

## Q13. Explain `TypedArray` and `ArrayBuffer`.

**Answer:**

```js
// ArrayBuffer — fixed-size raw binary data
const buffer = new ArrayBuffer(16); // 16 bytes

// TypedArray — view over ArrayBuffer with a specific type
const int32 = new Int32Array(buffer);     // 4 ints (4 bytes each)
const float64 = new Float64Array(buffer);  // 2 doubles (8 bytes each)
const uint8 = new Uint8Array(buffer);      // 16 bytes

// Write
int32[0] = 42;
uint8[0]; // access same memory, different view

// DataView — fine-grained control over byte order
const view = new DataView(buffer);
view.setInt32(0, 42, true);   // true = little-endian
view.getInt32(0, false);       // big-endian read

// Use cases: WebGL, Web Audio, WebSockets binary, WASM
```

---

## Q14. What is `module federation`?

**Answer:**

```js
// Webpack Module Federation — share code between apps at runtime

// App 1 (host)
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js"
  },
  shared: { react: { singleton: true } }
});

// App 2 (remote)
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button"
  },
  shared: { react: { singleton: true } }
});

// Benefits: Independent deploy, team autonomy
// Drawbacks: Version conflicts, runtime failures, complexity
```

---

## Q15. How do you implement a rate limiter?

**Answer:**

```js
class RateLimiter {
  #queue = [];
  #running = 0;

  constructor(limit, interval) {
    this.#limit = limit;
    this.#interval = interval;
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

const limiter = new RateLimiter(3, 1000);
const fetchWithLimit = url => limiter.execute(() => fetch(url));
```

---

## 📊 Quick Reference

| Topic | Key Concepts |
|---|---|
| **Memory** | Mark-and-Sweep, stack vs heap, memory leaks, WeakRef |
| **V8** | Ignition, Turbofan, hidden classes, inline caching |
| **Patterns** | Singleton, Observer, Factory, Decorator, Module |
| **Reactive** | Proxy-based reactivity, dependency tracking |
| **Architecture** | Layered architecture, DI, code splitting, microfrontends |
| **Concurrency** | Web Workers, SharedArrayBuffer, Atomics |
| **Performance** | Tree shaking, bundle splitting, virtual scrolling, SSR/SSG |
