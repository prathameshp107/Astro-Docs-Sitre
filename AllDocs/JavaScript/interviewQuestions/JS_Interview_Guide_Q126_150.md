# 🚀 JavaScript Interview Preparation Guide
## Questions 126–150 | Promises · Async/Await · Fetch API · AJAX · Error Handling · JSON · Web APIs

> **Author:** Senior JavaScript Engineer (15+ years @ Google, Amazon, Netflix, Meta, Microsoft)
> **Level:** Beginner → Intermediate → Advanced
> **Format:** Interview-Ready | Cheat-Sheet Optimized

---

## 📋 Table of Contents

| # | Topic | Difficulty |
|---|-------|-----------|
| Q126 | What is a Promise? | 🟢 Beginner |
| Q127 | Promise States | 🟢 Beginner |
| Q128 | `.then()` chaining | 🟢 Beginner |
| Q129 | `Promise.all()` vs `Promise.race()` | 🟡 Intermediate |
| Q130 | Callback Hell | 🟢 Beginner |
| Q131 | What is `async/await`? | 🟢 Beginner |
| Q132 | Error handling with `try/catch` in async | 🟡 Intermediate |
| Q133 | `Promise.allSettled()` vs `Promise.all()` | 🟡 Intermediate |
| Q134 | Fetch API basics | 🟢 Beginner |
| Q135 | Fetch vs AJAX (XMLHttpRequest) | 🟡 Intermediate |
| Q136 | Handling Fetch errors | 🟡 Intermediate |
| Q137 | What is AJAX? | 🟢 Beginner |
| Q138 | JSON.stringify() and JSON.parse() | 🟢 Beginner |
| Q139 | Output question: Promise execution order | 🟡 Intermediate |
| Q140 | `async` function return value | 🟡 Intermediate |
| Q141 | `Promise.any()` | 🟡 Intermediate |
| Q142 | Tricky: `await` outside async | 🔴 Advanced |
| Q143 | Parallel vs Sequential async calls | 🔴 Advanced |
| Q144 | Abort fetch request | 🔴 Advanced |
| Q145 | Custom Error classes | 🔴 Advanced |
| Q146 | Event Loop and Microtask Queue | 🔴 Advanced |
| Q147 | JSON deep clone pitfalls | 🟡 Intermediate |
| Q148 | Web APIs: setTimeout vs setInterval | 🟡 Intermediate |
| Q149 | Debugging: async stack traces | 🔴 Advanced |
| Q150 | Real-world: retry logic with async/await | 🔴 Advanced |

---

## 🟢 BEGINNER QUESTIONS

---

### Q126 — What is a Promise in JavaScript?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is a Promise in JavaScript and why do we use it?"*

---

**📖 Answer:**

A **Promise** is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more manageable, readable way — avoiding deeply nested callbacks.

---

**🧠 Simple Explanation:**

Think of a Promise like ordering food at a restaurant. You get a **receipt (promise)** immediately. The food isn't ready yet, but the receipt represents a *future* delivery. When food is ready → it's *resolved*. If the kitchen runs out → it's *rejected*.

---

**Promise Lifecycle Diagram:**

```
                    ┌─────────────┐
                    │   PENDING   │  ← Initial state
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌──────────────────┐     ┌──────────────────┐
    │    FULFILLED ✅   │     │    REJECTED ❌    │
    │  (resolve called) │     │  (reject called)  │
    └──────────────────┘     └──────────────────┘
              │                         │
              ▼                         ▼
          .then()                    .catch()
```

---

**💻 JavaScript Code Example:**

```javascript
const fetchData = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Data loaded ✅");
  } else {
    reject("Something went wrong ❌");
  }
});

fetchData
  .then(result => console.log(result))   // "Data loaded ✅"
  .catch(error => console.log(error));   // Not called here
```

---

**🌍 Real-World Example:**

```javascript
// Simulating an API call
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: "Alice" });
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
}

getUserData(1).then(user => console.log(user.name)); // "Alice"
```

---

**💡 Important Interview Tips:**
- A Promise is **always in one of three states**: pending, fulfilled, rejected
- Once settled (fulfilled or rejected), a Promise **cannot change state**
- `.then()` always returns a **new Promise** — enabling chaining

**⚠️ Common Mistakes:**
- Forgetting to return a Promise inside `.then()` when chaining
- Not attaching a `.catch()` — leads to **unhandled promise rejections**
- Confusing `resolve(Promise)` — if you resolve with another Promise, it waits for that inner one

**🔁 Follow-up Questions:**
- What are the three states of a Promise?
- What happens if you call both `resolve` and `reject`?
- How is a Promise different from a callback?

---

### Q127 — What are the three states of a Promise?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Explain the three states of a JavaScript Promise."*

---

**📖 Answer:**

| State | Description | Transition |
|-------|-------------|-----------|
| **Pending** | Initial state — operation not complete | → Fulfilled or Rejected |
| **Fulfilled** | Operation completed successfully | Terminal (can't change) |
| **Rejected** | Operation failed | Terminal (can't change) |

---

**🧠 Simple Explanation:**

Like a job application:
- **Pending** = Application submitted, waiting
- **Fulfilled** = Got the job offer ✅
- **Rejected** = Got rejected ❌

---

**💻 JavaScript Code Example:**

```javascript
const p = new Promise((resolve) => {
  console.log("State: pending");  // Runs immediately
  setTimeout(() => resolve("done"), 1000);
});

p.then(val => console.log("State: fulfilled →", val));
// After 1s: "State: fulfilled → done"
```

---

**🌍 Real-World Example:**

```javascript
let request = fetch("https://api.example.com/users");
// Right now: Promise is PENDING

request
  .then(res => res.json())     // FULFILLED — response received
  .catch(err => console.error(err)); // REJECTED — network error
```

---

**💡 Important Interview Tips:**
- Once a Promise is **settled** (fulfilled or rejected), it's immutable
- You can inspect a Promise's state by logging it in browser DevTools
- `.finally()` runs regardless of which terminal state is reached

**⚠️ Common Mistakes:**
- Thinking a Promise can go from rejected back to pending — **it cannot**
- Thinking `.then()` re-runs if called again — it resolves immediately with the cached result

**🔁 Follow-up Questions:**
- What does `.finally()` do?
- Can you convert a rejected Promise back to fulfilled?

---

### Q128 — How does `.then()` chaining work?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"Explain Promise chaining with `.then()`. What does each `.then()` receive?"*

---

**📖 Answer:**

Each `.then()` receives the **return value** of the previous `.then()`. If you return a value, the next `.then()` gets it. If you return a Promise, the chain **waits** for it to settle.

---

**Chaining Flow:**

```
Promise
  │
  ├─.then(a → b)──────────────┐
                               ▼
                          .then(b → c)──────────┐
                                                 ▼
                                            .then(c → d)
                                                 │
                                            .catch(err)
```

---

**💻 JavaScript Code Example:**

```javascript
Promise.resolve(1)
  .then(val => val + 1)      // receives 1, returns 2
  .then(val => val * 3)      // receives 2, returns 6
  .then(val => console.log(val)); // logs 6
```

---

**🌍 Real-World Example:**

```javascript
fetch("/api/user")
  .then(res => res.json())         // parse response
  .then(user => user.profileId)    // extract field
  .then(id => fetch(`/api/profile/${id}`)) // another request
  .then(res => res.json())
  .then(profile => console.log(profile))
  .catch(err => console.error("Failed:", err));
```

---

**💡 Important Interview Tips:**
- If a `.then()` returns `undefined` (no return), the next `.then()` gets `undefined`
- Errors **propagate** down the chain until a `.catch()` handles them
- You can recover from an error in `.catch()` and continue chaining

**⚠️ Common Mistakes:**
- **Forgetting `return`** inside `.then()` — breaks the chain
- Nesting `.then()` inside `.then()` — recreates callback hell

**🔁 Follow-up Questions:**
- What happens if you throw inside a `.then()`?
- How does `.catch()` fit in a chain?

---

### Q130 — What is Callback Hell and how do you avoid it?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Callback Hell |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is callback hell? How did Promises and async/await solve it?"*

---

**📖 Answer:**

**Callback Hell** (also called the "Pyramid of Doom") occurs when multiple async operations are nested inside each other's callbacks, creating deeply indented, hard-to-read, hard-to-maintain code.

---

**The "Pyramid of Doom":**

```
asyncOp1(function() {
  asyncOp2(function() {
    asyncOp3(function() {
      asyncOp4(function() {
        // ... keeps going deeper 😱
      });
    });
  });
});
```

---

**💻 JavaScript Code Example — The Problem:**

```javascript
// ❌ Callback Hell
getUser(1, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments); // 3 levels deep already!
    });
  });
});
```

**✅ Solution with Promises:**

```javascript
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
```

**✅ Solution with async/await:**

```javascript
async function loadData() {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  console.log(comments);
}
```

---

**💡 Important Interview Tips:**
- Callback hell is a **readability and maintainability** problem, not just a style issue
- Named functions (instead of anonymous) can also reduce nesting
- Promises flatten the structure; async/await makes it look synchronous

**⚠️ Common Mistakes:**
- Solving callback hell with Promises but then **nesting `.then()` calls** — same problem!
- Forgetting error handling when refactoring callbacks to Promises

**🔁 Follow-up Questions:**
- What are other problems with deeply nested callbacks (error handling, etc.)?
- Can you always convert callbacks to Promises?

---

### Q131 — What is async/await?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Async/Await |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is `async/await`? How is it different from Promises?"*

---

**📖 Answer:**

`async/await` is **syntactic sugar over Promises**. It lets you write asynchronous code that looks and reads like synchronous code. An `async` function always returns a Promise. `await` pauses execution inside the function until the Promise resolves.

---

**Execution Flow Diagram:**

```
async function foo() {
    │
    ├── const a = await getA();   ← pauses here, waits for getA()
    │                               (other code can run outside)
    ├── const b = await getB(a);  ← pauses again, waits for getB()
    │
    └── return b;                 ← function returns a Promise<b>
}
```

---

**💻 JavaScript Code Example:**

```javascript
// Promise version
function loadUser() {
  return fetch("/api/user").then(res => res.json());
}

// async/await version — same thing, cleaner
async function loadUser() {
  const res = await fetch("/api/user");
  return res.json();
}
```

---

**🌍 Real-World Example:**

```javascript
async function showUserProfile(userId) {
  const res = await fetch(`/api/users/${userId}`);
  const user = await res.json();
  console.log(`Hello, ${user.name}!`);
}

showUserProfile(42);
```

---

**💡 Important Interview Tips:**
- `async` functions **always return a Promise** — even if you return a plain value
- `await` can only be used **inside an `async` function** (or top-level modules)
- Under the hood, async/await is just Promise chains compiled by the JS engine

**⚠️ Common Mistakes:**
- Using `await` without `async` — SyntaxError
- Not handling errors with `try/catch` in async functions
- Using `await` in a `.forEach()` loop — it doesn't work as expected!

**🔁 Follow-up Questions:**
- What does an async function return if you return a non-Promise value?
- How do you handle errors in async/await?
- Why doesn't `await` work inside `.forEach()`?

---

### Q134 — What is the Fetch API?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Fetch API |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the Fetch API? How do you make a GET and POST request with it?"*

---

**📖 Answer:**

The **Fetch API** is a modern browser API for making HTTP requests. It returns a **Promise** that resolves to a `Response` object. It replaced the older `XMLHttpRequest` with a cleaner, Promise-based interface.

---

**Fetch Request Flow:**

```
fetch(url, options)
        │
        ▼
   Returns Promise<Response>
        │
   .then(res => res.json())    ← Parse body
        │
   .then(data => use data)     ← Use the data
        │
   .catch(err => handle)       ← Network errors only
```

---

**💻 JavaScript Code Example — GET:**

```javascript
// GET request
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data.title));
```

**POST request:**

```javascript
// POST request
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", age: 30 })
})
  .then(res => res.json())
  .then(data => console.log("Created:", data));
```

---

**🌍 Real-World Example:**

```javascript
async function createPost(title, body) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId: 1 })
  });
  const post = await res.json();
  return post;
}
```

---

**💡 Important Interview Tips:**
- Fetch only rejects on **network failure** — a 404 or 500 response still resolves!
- Always check `res.ok` or `res.status` to detect HTTP errors
- `res.json()` also returns a Promise — don't forget to `await` it

**⚠️ Common Mistakes:**
- Assuming a 4xx/5xx response triggers `.catch()` — it doesn't!
- Forgetting `Content-Type: application/json` on POST/PUT requests
- Not calling `.json()`, `.text()`, or `.blob()` on the response

**🔁 Follow-up Questions:**
- How do you handle a 404 error with Fetch?
- What is the difference between `res.json()` and `res.text()`?

---

### Q137 — What is AJAX?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | AJAX |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is AJAX and how does it work?"*

---

**📖 Answer:**

**AJAX** stands for **Asynchronous JavaScript and XML**. It's a technique for making HTTP requests from the browser without reloading the page, allowing web pages to update dynamically. Originally done using `XMLHttpRequest`, now commonly replaced by the Fetch API.

---

**💻 JavaScript Code Example — Old XMLHttpRequest:**

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/data", true); // true = async
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

**Modern equivalent with Fetch:**

```javascript
fetch("/api/data")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

**💡 Important Interview Tips:**
- AJAX is a **technique**, not a specific technology — Fetch is just a modern way to do it
- "XML" in AJAX is historical — today JSON is almost universally used
- AJAX enables **SPA (Single Page Applications)** by loading data without full page reloads

**⚠️ Common Mistakes:**
- Thinking AJAX requires XML — it doesn't (JSON is standard today)
- Forgetting CORS issues when making cross-origin AJAX requests

**🔁 Follow-up Questions:**
- What are the `readyState` values in XHR?
- What replaced XMLHttpRequest in modern JS?

---

### Q138 — What is JSON.stringify() and JSON.parse()?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | JSON |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What do `JSON.stringify()` and `JSON.parse()` do? When would you use them?"*

---

**📖 Answer:**

| Method | Input | Output | Use Case |
|--------|-------|--------|----------|
| `JSON.stringify()` | JavaScript object | JSON string | Sending data over network, localStorage |
| `JSON.parse()` | JSON string | JavaScript object | Reading data from network/storage |

---

**💻 JavaScript Code Example:**

```javascript
const user = { name: "Alice", age: 30, active: true };

const jsonString = JSON.stringify(user);
console.log(jsonString);        // '{"name":"Alice","age":30,"active":true}'
console.log(typeof jsonString); // "string"

const parsed = JSON.parse(jsonString);
console.log(parsed.name);       // "Alice"
console.log(typeof parsed);     // "object"
```

---

**🌍 Real-World Example:**

```javascript
// Save to localStorage
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));

// Read from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name); // "Alice"
```

---

**💡 Important Interview Tips:**
- `JSON.stringify()` **ignores** functions, `undefined`, and `Symbol` values
- `JSON.parse()` throws a `SyntaxError` if the string is invalid JSON
- Use `JSON.stringify(obj, null, 2)` for **pretty-printed** JSON (great for debugging)

**⚠️ Common Mistakes:**
- Trying to `JSON.stringify()` circular references — throws `TypeError`
- Expecting `Date` objects to survive `parse(stringify(date))` — they become strings!
- Not wrapping `JSON.parse()` in a `try/catch`

**🔁 Follow-up Questions:**
- What values does `JSON.stringify()` skip?
- How do you handle circular references with JSON?
- What is the "replacer" parameter in `JSON.stringify()`?

---

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q129 — `Promise.all()` vs `Promise.race()` — what's the difference?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"Explain `Promise.all()` and `Promise.race()` with examples. When would you use each?"*

---

**📖 Answer:**

| Method | Resolves when | Rejects when | Use case |
|--------|--------------|--------------|----------|
| `Promise.all()` | ALL promises resolve | ANY one rejects | Load all resources before proceeding |
| `Promise.race()` | FIRST promise settles (resolve or reject) | FIRST rejects | Timeout patterns, fastest-wins |
| `Promise.allSettled()` | ALL promises settle (any result) | Never rejects | Want all results regardless of failures |
| `Promise.any()` | FIRST promise resolves | ALL reject | Fastest success wins |

---

**💻 JavaScript Code Example:**

```javascript
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.reject("Error!");

// Promise.all — fails if any fails
Promise.all([p1, p2])
  .then(results => console.log(results)); // ["A", "B"]

Promise.all([p1, p3])
  .catch(err => console.log("Failed:", err)); // "Failed: Error!"

// Promise.race — first one wins
const slow = new Promise(res => setTimeout(() => res("slow"), 2000));
const fast = new Promise(res => setTimeout(() => res("fast"), 500));

Promise.race([slow, fast])
  .then(result => console.log(result)); // "fast"
```

---

**🌍 Real-World Example:**

```javascript
// Load user + settings simultaneously
async function loadDashboard(userId) {
  const [user, settings] = await Promise.all([
    fetch(`/api/users/${userId}`).then(r => r.json()),
    fetch(`/api/settings/${userId}`).then(r => r.json())
  ]);
  return { user, settings };
}

// Timeout pattern with Promise.race
function fetchWithTimeout(url, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([fetch(url), timeout]);
}
```

---

**💡 Important Interview Tips:**
- `Promise.all` is the most commonly used in real apps (parallel requests)
- `Promise.race` is great for **implementing timeouts**
- Order of results in `Promise.all` matches the **input order**, not completion order

**⚠️ Common Mistakes:**
- Using `Promise.all` when you want all results even if some fail — use `allSettled`
- Thinking `Promise.race` cancels slower Promises — it doesn't, they still run

**🔁 Follow-up Questions:**
- What's the difference between `Promise.any()` and `Promise.race()`?
- How does `Promise.allSettled()` differ from `Promise.all()`?

---

### Q132 — How do you handle errors in async/await?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Async/Await · Error Handling |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"How do you handle errors in async/await functions? Show multiple patterns."*

---

**📖 Answer:**

Three main patterns for error handling in async/await:

1. `try/catch` — most common
2. `.catch()` on the async call
3. Helper wrapper function

---

**💻 JavaScript Code Example:**

```javascript
// Pattern 1: try/catch (most common)
async function fetchUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err.message);
    return null;
  }
}

// Pattern 2: .catch() on the async call
const user = await fetchUser(1).catch(err => null);

// Pattern 3: await-to helper (popular in teams)
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

const [err, user] = await to(fetchUser(1));
if (err) console.error("Error:", err);
```

---

**🌍 Real-World Example:**

```javascript
async function saveUser(userData) {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error(`Save failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    // Log to monitoring (e.g., Sentry)
    console.error("saveUser error:", err);
    throw err; // Re-throw for caller to handle
  }
}
```

---

**💡 Important Interview Tips:**
- Always check `res.ok` with Fetch — HTTP errors don't auto-reject!
- `try/catch` in async catches both synchronous throws AND rejected Promises
- Re-throwing errors lets higher-level code decide how to handle them

**⚠️ Common Mistakes:**
- Placing `try/catch` outside the async function instead of inside
- Swallowing errors silently — always at minimum log the error
- Not handling the case where `fetch` itself fails (network error)

**🔁 Follow-up Questions:**
- How would you handle different error types differently?
- What's the benefit of the `await-to` helper pattern?

---

### Q133 — `Promise.allSettled()` vs `Promise.all()`

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐ Moderate |

**❓ Interview Question:**
> *"When would you use `Promise.allSettled()` over `Promise.all()`?"*

---

**📖 Answer:**

- `Promise.all()` — **short-circuits** on first rejection; ideal when all results are required
- `Promise.allSettled()` — waits for ALL promises, returns status+value/reason for each; ideal when you want to **process all results regardless of failures**

---

**💻 JavaScript Code Example:**

```javascript
const promises = [
  Promise.resolve("success"),
  Promise.reject("error"),
  Promise.resolve("also success")
];

// Promise.all — stops at first failure
Promise.all(promises)
  .catch(err => console.log("all failed:", err)); // "all failed: error"

// Promise.allSettled — gets everything
Promise.allSettled(promises)
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") console.log("✅", r.value);
      else console.log("❌", r.reason);
    });
  });
// ✅ success
// ❌ error
// ✅ also success
```

---

**💡 Important Interview Tips:**
- `allSettled` results have a `status` field: `"fulfilled"` or `"rejected"`
- Fulfilled results have `.value`, rejected results have `.reason`
- Great for **batch operations** (e.g., send 10 emails, report which ones failed)

**⚠️ Common Mistakes:**
- Using `allSettled` when you actually need ALL to succeed — use `Promise.all`

**🔁 Follow-up Questions:**
- What does the result array of `allSettled` look like?

---

### Q135 — Fetch API vs XMLHttpRequest (AJAX) — What's the difference?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Fetch API · AJAX |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What are the differences between the Fetch API and XMLHttpRequest?"*

---

**📖 Answer:**

| Feature | XMLHttpRequest | Fetch API |
|---------|---------------|-----------|
| Syntax | Verbose, callback-based | Clean, Promise-based |
| Response | `xhr.responseText` | `res.json()`, `res.text()` |
| Error Handling | Via `onerror` / status checks | `.catch()` + `res.ok` check |
| Streaming | Not supported natively | Supports `ReadableStream` |
| Abort | `xhr.abort()` | `AbortController` |
| Cookies | Sent by default | Requires `credentials: 'include'` |
| Progress | Built-in `onprogress` | No native progress events |
| Browser Support | All browsers | Modern browsers (IE not supported) |

---

**💻 JavaScript Code Example:**

```javascript
// XHR — old way
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/data");
xhr.onload = () => console.log(JSON.parse(xhr.responseText));
xhr.onerror = () => console.error("Request failed");
xhr.send();

// Fetch — modern way
fetch("/api/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Request failed", err));
```

---

**💡 Important Interview Tips:**
- Fetch does NOT send cookies by default — add `credentials: 'include'` if needed
- XHR has `onprogress` for upload tracking (file uploads) — Fetch lacks this natively
- Fetch is the **standard** in modern codebases; XHR knowledge is still tested in interviews

**⚠️ Common Mistakes:**
- Using Fetch and expecting cookies to be sent automatically for auth
- Not realizing Fetch doesn't reject on 4xx/5xx

**🔁 Follow-up Questions:**
- How do you send cookies with Fetch?
- How do you track upload progress with Fetch?

---

### Q136 — How do you handle HTTP errors with the Fetch API?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Fetch API · Error Handling |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"Fetch doesn't reject on 4xx/5xx errors. How do you properly handle HTTP errors?"*

---

**📖 Answer:**

Fetch only rejects (triggers `.catch()`) on **network failures** (no internet, DNS failure). HTTP error responses (404, 500) still **resolve** — you must manually check `res.ok` or `res.status`.

---

**💻 JavaScript Code Example:**

```javascript
async function fetchData(url) {
  const res = await fetch(url);

  // Must manually check for HTTP errors!
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Usage
fetchData("/api/missing-resource")
  .then(data => console.log(data))
  .catch(err => console.error(err.message)); // "HTTP Error: 404 Not Found"
```

---

**🌍 Real-World Example — Wrapper Function:**

```javascript
async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status === 401) throw new Error("Unauthorized — please login");
  if (res.status === 403) throw new Error("Forbidden");
  if (res.status === 404) throw new Error("Resource not found");
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}
```

---

**💡 Important Interview Tips:**
- `res.ok` is `true` for status codes **200–299**
- This is one of the most common Fetch gotchas in interviews
- Building a wrapper (like above) is a best practice for real apps

**⚠️ Common Mistakes:**
- Assuming `.catch()` handles HTTP errors — it doesn't
- Not checking `res.ok` before calling `res.json()`

**🔁 Follow-up Questions:**
- What status range does `res.ok` cover?
- How would you implement global error handling for all API calls?

---

### Q139 — Output Question: What is the output of this Promise code?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Promises · Output |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the output of the following code and why?"*

```javascript
console.log("1");

Promise.resolve().then(() => console.log("2"));

console.log("3");
```

---

**📖 Answer:**

**Output:**
```
1
3
2
```

---

**🧠 Simple Explanation:**

The **Event Loop** processes tasks in this order:
1. **Synchronous code** runs first (call stack)
2. **Microtasks** (Promise callbacks) run after each sync task
3. **Macrotasks** (setTimeout, etc.) run last

```
Call Stack:        Microtask Queue:     Output:
──────────         ────────────────     ──────
console.log("1")                    →   1
Promise.resolve()  → .then queued
console.log("3")                    →   3
[stack empty]      .then fires       →   2
```

---

**🔍 Trickier Variation:**

```javascript
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");

// Output: start → end → promise → timeout
```

**Why?** Promises are **microtasks** (higher priority than `setTimeout` macrotasks).

---

**💡 Important Interview Tips:**
- Promises use the **microtask queue** — higher priority than setTimeout
- Even `setTimeout(..., 0)` runs AFTER Promise callbacks
- This is one of the **most common** output-based JS interview questions

**⚠️ Common Mistakes:**
- Assuming setTimeout(0) runs immediately — it goes to macrotask queue
- Forgetting that synchronous code always finishes before any async callback

**🔁 Follow-up Questions:**
- What is the microtask queue vs macrotask queue?
- Where does `queueMicrotask()` fit in?

---

### Q140 — What does an async function always return?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Async/Await |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What does an async function return? What if you return a plain value?"*

---

**📖 Answer:**

An `async` function **always returns a Promise**, no matter what you return inside it. If you return a plain value, it's automatically wrapped in `Promise.resolve()`.

---

**💻 JavaScript Code Example:**

```javascript
async function greet() {
  return "Hello"; // Wrapped as Promise.resolve("Hello")
}

const result = greet();
console.log(result);          // Promise { 'Hello' }
result.then(val => console.log(val)); // "Hello"

// Even no return → Promise.resolve(undefined)
async function empty() {}
empty().then(val => console.log(val)); // undefined
```

---

**🔍 Tricky Question:**

```javascript
async function test() {
  return Promise.resolve(42);
}

test().then(val => console.log(val)); // 42 (not Promise<Promise<42>>)
```

If you return a Promise inside async, it **flattens** — you get `42`, not `Promise<42>`.

---

**💡 Important Interview Tips:**
- `async` guarantees the return is always a Promise — great for consistency
- Returning a rejected Promise from async is equivalent to `throw`ing inside it
- `await asyncFn()` always gives you the **resolved value**, not the Promise

**⚠️ Common Mistakes:**
- Expecting `async function()` to return a plain value directly
- Not `await`ing the async function call before using the result

**🔁 Follow-up Questions:**
- What happens if you `throw` inside an async function?

---

### Q141 — What is `Promise.any()`?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Promises |
| **Frequency** | ⭐⭐⭐ Moderate |

**❓ Interview Question:**
> *"What does `Promise.any()` do? How is it different from `Promise.race()`?"*

---

**📖 Answer:**

| Method | Resolves | Rejects |
|--------|----------|---------|
| `Promise.race()` | When FIRST settles (resolve OR reject) | When first rejects |
| `Promise.any()` | When FIRST resolves successfully | When ALL reject (`AggregateError`) |

`Promise.any()` ignores rejections until all have failed.

---

**💻 JavaScript Code Example:**

```javascript
const p1 = Promise.reject("fail 1");
const p2 = Promise.resolve("success 2");
const p3 = Promise.reject("fail 3");

// Promise.race — rejects immediately on first rejection
Promise.race([p1, p2, p3])
  .catch(err => console.log("race:", err)); // "race: fail 1"

// Promise.any — ignores failures, takes first success
Promise.any([p1, p2, p3])
  .then(val => console.log("any:", val)); // "any: success 2"

// If ALL fail — AggregateError
Promise.any([Promise.reject("a"), Promise.reject("b")])
  .catch(err => console.log(err instanceof AggregateError)); // true
```

---

**💡 Important Interview Tips:**
- `Promise.any()` was added in **ES2021**
- When all reject, you get an `AggregateError` with an `.errors` array
- Use case: try multiple CDN endpoints, use whichever responds first successfully

**⚠️ Common Mistakes:**
- Confusing `Promise.race` (first settles) with `Promise.any` (first succeeds)

**🔁 Follow-up Questions:**
- What error type does `Promise.any()` throw when all fail?

---

### Q147 — JSON deep clone pitfalls

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | JSON |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Can you use `JSON.parse(JSON.stringify(obj))` to deep clone? What are the pitfalls?"*

---

**📖 Answer:**

`JSON.parse(JSON.stringify(obj))` is a popular quick deep clone trick, but it has **significant limitations** — certain value types are lost or corrupted.

---

**💻 JavaScript Code Example:**

```javascript
const original = {
  name: "Alice",
  dob: new Date("1990-01-01"),
  greet: function() { return "Hello"; },
  score: undefined,
  id: Symbol("id")
};

const clone = JSON.parse(JSON.stringify(original));

console.log(clone.name);    // "Alice" ✅
console.log(clone.dob);     // "1990-01-01T00:00:00.000Z" (string!) ❌
console.log(clone.greet);   // undefined — function lost ❌
console.log(clone.score);   // undefined key doesn't exist ❌
console.log(clone.id);      // undefined — Symbol lost ❌
```

**✅ Better alternatives:**

```javascript
// structuredClone (modern, recommended)
const clone2 = structuredClone(original);

// lodash deep clone
import cloneDeep from 'lodash/cloneDeep';
const clone3 = cloneDeep(original);
```

---

**💡 Important Interview Tips:**
- `structuredClone()` was introduced in modern browsers/Node 17+ and handles more types
- `JSON` clone breaks: `Date`, `Function`, `undefined`, `Symbol`, `RegExp`, circular refs
- This is a **very popular interview question** — know the pitfalls by heart

**⚠️ Common Mistakes:**
- Trusting JSON clone for objects with Dates (they become strings!)
- Using JSON clone on objects with circular references — throws `TypeError`

**🔁 Follow-up Questions:**
- What is `structuredClone()` and what types does it support?
- How do you clone an object with circular references?

---

### Q148 — Web APIs: `setTimeout` vs `setInterval`

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Web APIs |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is the difference between `setTimeout` and `setInterval`? When does `setTimeout(fn, 0)` run?"*

---

**📖 Answer:**

| Feature | `setTimeout` | `setInterval` |
|---------|-------------|--------------|
| Runs | Once, after delay | Repeatedly, every interval |
| Stops with | `clearTimeout(id)` | `clearInterval(id)` |
| Drift | No cumulative drift | Can drift over time |
| Minimum delay | ~4ms (browsers) | ~4ms (browsers) |

`setTimeout(fn, 0)` runs the callback **after** the current call stack and all microtasks are complete — not truly "immediately."

---

**💻 JavaScript Code Example:**

```javascript
// setTimeout — runs once
const timerId = setTimeout(() => console.log("Once!"), 1000);
// clearTimeout(timerId); // cancel it

// setInterval — runs repeatedly
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Tick:", count);
  if (count === 3) clearInterval(intervalId);
}, 500);
```

---

**🔍 Tricky: `setTimeout(fn, 0)` Order:**

```javascript
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("sync");

// Output: sync → microtask → timeout
```

---

**💡 Important Interview Tips:**
- `setTimeout(fn, 0)` is a **macrotask** — runs after all microtasks (Promises)
- For repeating tasks, prefer `setTimeout` recursively over `setInterval` to avoid drift
- Both return an ID that can be used to cancel

**⚠️ Common Mistakes:**
- Assuming `setTimeout(fn, 0)` runs immediately — it never does
- Not clearing intervals — causes memory leaks in React/SPA components

**🔁 Follow-up Questions:**
- How would you implement a self-correcting interval?
- What happens when you put `setTimeout` inside `setInterval`?

---

---

## 🔴 ADVANCED QUESTIONS

---

### Q142 — Tricky: Can you use `await` outside an async function?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Async/Await |
| **Frequency** | ⭐⭐⭐⭐ Common (tricky) |

**❓ Interview Question:**
> *"Can you use `await` outside of an `async` function? What happens if you try?"*

---

**📖 Answer:**

**Traditionally:** No — using `await` outside an `async` function throws a `SyntaxError`.

**In ES2022 (Top-Level Await):** Yes — but **only in ES modules** (files with `type: "module"` or `.mjs` extension).

---

**💻 JavaScript Code Example:**

```javascript
// ❌ In a regular script — SyntaxError
const data = await fetch("/api/data"); // SyntaxError: await only valid in async

// ✅ In an ES module (top-level await)
// file: app.mjs OR <script type="module">
const res = await fetch("/api/data");
const data = await res.json();
console.log(data); // Works!
```

**Common workaround (before top-level await):**

```javascript
// IIFE pattern — immediately invoked async function
(async () => {
  const data = await fetch("/api/data").then(r => r.json());
  console.log(data);
})();
```

---

**💡 Important Interview Tips:**
- **Top-level await** is a stage-4 feature available in Node.js 14.8+ (modules only)
- In CommonJS (`require`), top-level await is still not allowed
- The IIFE async pattern is still common in older codebases

**⚠️ Common Mistakes:**
- Trying `await` in a non-module `<script>` tag
- Forgetting that top-level await **blocks module loading** — use carefully

**🔁 Follow-up Questions:**
- What is top-level await and where can you use it?
- What are the performance implications of top-level await in modules?

---

### Q143 — Parallel vs Sequential `async/await` calls

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Async/Await · Performance |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the difference between sequential and parallel execution in async/await? How do you optimize multiple API calls?"*

---

**📖 Answer:**

Using `await` in sequence means each call **waits for the previous** to finish — slow! Running them in **parallel** with `Promise.all` is much faster.

---

**Execution Timeline:**

```
Sequential (slow):
─────────────────────────────────────────
[fetchUser: 300ms]──[fetchPosts: 200ms]──[fetchComments: 150ms]
Total: 650ms

Parallel (fast):
─────────────────────────────────────────
[fetchUser: 300ms    ]
[fetchPosts: 200ms  ]
[fetchComments: 150ms]
Total: ~300ms (longest one)
```

---

**💻 JavaScript Code Example:**

```javascript
// ❌ Sequential — slow (calls wait for each other)
async function loadSlow() {
  const user = await fetchUser(1);     // waits 300ms
  const posts = await fetchPosts(1);   // waits 200ms
  const tags = await fetchTags(1);     // waits 150ms
  return { user, posts, tags };        // Total: 650ms
}

// ✅ Parallel — fast (all fire at once)
async function loadFast() {
  const [user, posts, tags] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchTags(1)
  ]);
  return { user, posts, tags };        // Total: ~300ms
}
```

---

**🌍 Real-World Example:**

```javascript
// Dashboard loading — parallel is essential here
async function loadDashboard(userId) {
  const [profile, activity, notifications] = await Promise.all([
    api.getProfile(userId),
    api.getActivity(userId),
    api.getNotifications(userId)
  ]);
  renderDashboard({ profile, activity, notifications });
}
```

---

**💡 Important Interview Tips:**
- This is one of the **most impactful async performance patterns**
- Use sequential only when the result of one call is **needed** for the next
- `Promise.all` + destructuring is the cleanest parallel pattern

**⚠️ Common Mistakes:**
- Using `await` in a loop sequentially when items are **independent**
- Using `forEach` with `async` — it doesn't wait for async callbacks!

```javascript
// ❌ This does NOT work as expected
const ids = [1, 2, 3];
ids.forEach(async (id) => {
  await processItem(id); // forEach ignores the returned Promise
});

// ✅ Use for...of for sequential
for (const id of ids) {
  await processItem(id);
}

// ✅ Use Promise.all for parallel
await Promise.all(ids.map(id => processItem(id)));
```

**🔁 Follow-up Questions:**
- When should you NOT use parallel execution?
- How do you handle partial failures in `Promise.all`?

---

### Q144 — How do you abort a Fetch request?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Fetch API · Web APIs |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"How can you cancel/abort a Fetch request in JavaScript?"*

---

**📖 Answer:**

Use the **`AbortController`** API. Create a controller, pass its `signal` to `fetch`, and call `controller.abort()` to cancel.

---

**💻 JavaScript Code Example:**

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Start a fetch with the signal
fetch("/api/large-data", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Fetch was cancelled!");
    } else {
      console.error("Fetch error:", err);
    }
  });

// Cancel it after 2 seconds
setTimeout(() => controller.abort(), 2000);
```

---

**🌍 Real-World Example — React search cancellation:**

```javascript
// Cancel previous search request when user types new query
let controller;

async function search(query) {
  if (controller) controller.abort(); // Cancel previous

  controller = new AbortController();

  try {
    const res = await fetch(`/api/search?q=${query}`, {
      signal: controller.signal
    });
    const results = await res.json();
    displayResults(results);
  } catch (err) {
    if (err.name !== "AbortError") throw err;
  }
}
```

---

**💡 Important Interview Tips:**
- AbortError has `err.name === "AbortError"` — always check this before re-throwing
- One `AbortController` can abort **multiple fetch requests** simultaneously
- This pattern is essential in React components to avoid state updates after unmount

**⚠️ Common Mistakes:**
- Treating AbortError like a real error — it should be silently ignored
- Not cleaning up abort controllers — can lead to bugs in React

**🔁 Follow-up Questions:**
- How would you implement a request timeout using `AbortController`?
- How do you use `AbortController` in a React `useEffect` cleanup?

---

### Q145 — How do you create custom Error classes in JavaScript?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Error Handling |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"How do you create custom error types in JavaScript? Why would you?"*

---

**📖 Answer:**

By extending the built-in `Error` class, you can create **domain-specific errors** that are easier to identify, catch selectively, and provide structured context.

---

**💻 JavaScript Code Example:**

```javascript
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// Usage — catch specific error types
async function processForm(data) {
  try {
    if (!data.email) throw new ValidationError("Email required", "email");
    const res = await fetch("/api/submit", { body: JSON.stringify(data) });
    if (!res.ok) throw new NetworkError("Submit failed", res.status);
  } catch (err) {
    if (err instanceof ValidationError) {
      showFieldError(err.field, err.message);
    } else if (err instanceof NetworkError) {
      showToast(`Network error ${err.statusCode}`);
    } else {
      throw err; // Unknown error — re-throw
    }
  }
}
```

---

**💡 Important Interview Tips:**
- Always set `this.name` — otherwise `err.name` defaults to `"Error"`
- `instanceof` checks work because of prototype chain inheritance
- Custom errors make **logging and monitoring** (e.g., Sentry) far more useful

**⚠️ Common Mistakes:**
- Forgetting to call `super(message)` — `err.message` won't be set
- Not setting `this.name` — makes it hard to identify error type in logs

**🔁 Follow-up Questions:**
- How do you serialize custom errors to JSON?
- What is the `cause` property in ES2022 errors?

---

### Q146 — How does the Event Loop relate to Promises and async/await?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Async/Await · Promises · Web APIs |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"Explain the Event Loop, Call Stack, Microtask Queue, and Macrotask Queue. How do Promises fit in?"*

---

**📖 Answer:**

JavaScript is **single-threaded**. The Event Loop manages execution by coordinating these queues:

---

**Event Loop Visualization:**

```
┌─────────────────────────────────────────────────────────┐
│                      CALL STACK                         │
│  [main()] → [setTimeout cb] → [Promise.then cb] → ...   │
└─────────────────────────────┬───────────────────────────┘
                              │ (stack empties)
              ┌───────────────┼──────────────────┐
              ▼               ▼                  ▼
  ┌───────────────────┐  ┌──────────────┐  ┌──────────────────┐
  │  MICROTASK QUEUE  │  │  MACRO QUEUE │  │   Web APIs       │
  │  - Promise .then  │  │  - setTimeout│  │  - fetch()       │
  │  - queueMicrotask │  │  - setInterval│  │  - DOM events   │
  │  - MutationObs.   │  │  - I/O events│  │  - XHR           │
  └───────────────────┘  └──────────────┘  └──────────────────┘
         ↑ Processed FIRST after each task
```

**Priority Order:**
1. Synchronous code (call stack)
2. **Microtasks** (all of them, including ones added during processing)
3. **One Macrotask** (then back to microtasks again)
4. Render (browser)

---

**💻 JavaScript Code Example:**

```javascript
console.log("1 - sync");

setTimeout(() => console.log("4 - macrotask"), 0);

Promise.resolve()
  .then(() => console.log("3 - microtask"))
  .then(() => console.log("3b - microtask chained"));

console.log("2 - sync");

// Output:
// 1 - sync
// 2 - sync
// 3 - microtask
// 3b - microtask chained
// 4 - macrotask
```

---

**💡 Important Interview Tips:**
- **All microtasks** drain before the next macrotask runs
- Chained `.then()` callbacks create **new microtasks** — they still run before macrotasks
- `await` internally uses the microtask queue — each `await` is essentially a `.then()`

**⚠️ Common Mistakes:**
- Thinking `setTimeout(0)` and `Promise.resolve()` have the same timing — they don't
- Assuming async functions run in parallel — they're still on one thread!

**🔁 Follow-up Questions:**
- What happens if a microtask keeps adding new microtasks? (Answer: starvation — macrotasks never run)
- Where does `requestAnimationFrame` fit in the event loop?

---

### Q149 — Debugging: Why don't async stack traces show the real error location?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Async/Await · Error Handling |
| **Frequency** | ⭐⭐⭐ Moderate |

**❓ Interview Question:**
> *"Why can async stack traces be misleading? How do you improve async error debugging?"*

---

**📖 Answer:**

Because async functions run in the **microtask queue** after the original call stack is gone, stack traces in rejected Promises can lose context. With `async/await`, modern JS engines (V8) have significantly improved **async stack traces**, but you still need good practices.

---

**💻 JavaScript Code Example:**

```javascript
// ❌ Hard to debug — error source unclear
function badAsync() {
  return Promise.reject(new Error("Something failed"));
}

badAsync(); // UnhandledPromiseRejection — no context

// ✅ Better — always attach .catch() or use await in try/catch
async function goodAsync() {
  try {
    await badAsync();
  } catch (err) {
    // Stack trace is now visible and context preserved
    console.error("Error in goodAsync:", err);
  }
}
```

---

**Best Practices for Debugging Async Code:**

```javascript
// 1. Always name your async functions (not arrows)
async function loadUserProfile() { ... } // shows in stack trace

// 2. Add context when re-throwing
async function fetchWithContext(url) {
  try {
    return await fetch(url);
  } catch (err) {
    err.context = { url, timestamp: Date.now() };
    throw err;
  }
}

// 3. Use Error cause (ES2022)
throw new Error("Failed to load user", { cause: originalError });
```

---

**💡 Important Interview Tips:**
- Chrome DevTools has **"Async Stack Traces"** — enable it in DevTools settings
- Named functions show up in stack traces; anonymous arrows don't
- The `cause` property in ES2022 allows **error chaining** for better context

**⚠️ Common Mistakes:**
- Using all-arrow anonymous async functions — loses stack trace names
- Catching errors, logging them, and throwing a new `Error("failed")` without the original cause

**🔁 Follow-up Questions:**
- What does `Error.cause` do in ES2022?
- How do tools like Sentry help with async error tracking?

---

### Q150 — Real-world: Implement retry logic with async/await

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Async/Await · Error Handling · Fetch API |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"How would you implement a retry mechanism for a failed API call using async/await?"*

---

**📖 Answer:**

A retry function wraps an async operation, catches failures, and re-attempts up to a maximum number of times — often with **exponential backoff** (increasing delay between retries).

---

**💻 JavaScript Code Example:**

```javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt === maxAttempts) throw err; // All attempts failed
      // Exponential backoff: 1s, 2s, 4s...
      await new Promise(res => setTimeout(res, delay * 2 ** (attempt - 1)));
    }
  }
}

// Usage
const data = await retry(
  () => fetch("/api/flaky-endpoint").then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }),
  3,    // max 3 attempts
  500   // starting delay 500ms
);
```

---

**🌍 Real-World Example:**

```javascript
// Production-grade retry with conditional retry
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);

      // Don't retry on client errors (4xx) — only server errors (5xx)
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Client error: ${res.status}`);
      }
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      return await res.json();
    } catch (err) {
      if (err.message.startsWith("Client") || i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, 1000 * (i + 1)));
    }
  }
}
```

---

**Retry with Backoff Timeline:**

```
Attempt 1 fails ──── wait 500ms ────►
Attempt 2 fails ──── wait 1000ms ───►
Attempt 3 fails ──── throw Error ───►
```

---

**💡 Important Interview Tips:**
- **Exponential backoff** prevents overwhelming a struggling server
- **Don't retry** client errors (4xx) — they won't succeed on retry
- Add a **jitter** (random extra delay) in production to avoid synchronized retries from many clients

**⚠️ Common Mistakes:**
- Retrying 4xx errors — pointless and wastes resources
- Not limiting max retries — causes infinite loops
- Fixed delay instead of exponential backoff — can pile up requests

**🔁 Follow-up Questions:**
- What is exponential backoff with jitter?
- How would you cancel retries if the user navigates away?
- How does this relate to the circuit breaker pattern?

---

---

## 📌 REVISION CHEAT SHEET

> Quick-fire review of the most important concepts from Q126–150

---

### ⚡ Promises

```
States:   Pending → Fulfilled | Rejected (immutable once settled)
.then()   → returns new Promise, chains results
.catch()  → handles rejections (anywhere in chain)
.finally()→ runs regardless of outcome
```

| Method | Resolves When | Rejects When |
|--------|--------------|--------------|
| `Promise.all()` | All resolve | Any one rejects |
| `Promise.race()` | First settles | First rejects |
| `Promise.allSettled()` | All settle | Never |
| `Promise.any()` | First resolves | All reject (AggregateError) |

---

### ⚡ Async / Await

```javascript
async function fn() {       // Always returns a Promise
  const x = await somePromise;  // Pauses; uses microtask queue
  return x;                     // Wrapped in Promise.resolve(x)
}
```

- `await` only works inside `async` (or ES module top-level)
- Error handling → `try/catch` inside async function
- **Parallel**: `await Promise.all([...])` — don't sequential-await independent calls!

---

### ⚡ Fetch API

```javascript
fetch(url, { method, headers, body })
  .then(res => {
    if (!res.ok) throw new Error(res.status); // ← Must check manually!
    return res.json();
  })
  .catch(err => { /* network failure OR thrown above */ });
```

- Only rejects on **network failure**, not 4xx/5xx
- POST requires `Content-Type: application/json` + `JSON.stringify(body)`
- Cancel with `AbortController`

---

### ⚡ Error Handling

```javascript
try {
  const data = await fetchData();
} catch (err) {
  if (err instanceof NetworkError) { ... }
  if (err instanceof ValidationError) { ... }
  else throw err; // re-throw unknown errors
}
```

- `JSON.parse()` throws `SyntaxError` on invalid JSON — always wrap
- Custom errors: extend `Error`, call `super(msg)`, set `this.name`
- ES2022: `new Error("msg", { cause: originalError })`

---

### ⚡ JSON

| Method | In → Out | Loses |
|--------|----------|-------|
| `JSON.stringify()` | Object → String | Functions, undefined, Symbol, circular refs |
| `JSON.parse()` | String → Object | Dates become strings |

- Better deep clone: `structuredClone()` (modern) or `lodash.cloneDeep()`

---

### ⚡ Event Loop Priority

```
1. Synchronous code        (call stack)
2. Microtasks              (Promise.then, queueMicrotask)  ← Higher priority
3. Macrotasks              (setTimeout, setInterval, I/O)  ← Lower priority
4. Render                  (requestAnimationFrame)
```

**Key Rule:** `setTimeout(fn, 0)` runs AFTER all Promise callbacks!

---

### ⚡ Quick Gotchas to Remember

| Gotcha | Correct Behavior |
|--------|-----------------|
| `fetch` 404 rejects? | ❌ No — check `res.ok` |
| `async` returns plain value? | Wrapped in `Promise.resolve()` |
| `await` in `.forEach()`? | ❌ Doesn't work — use `for...of` or `Promise.all` |
| `Promise.race` cancels losers? | ❌ No — they still run |
| `JSON.stringify` handles Dates? | ❌ Converts to string |
| `setTimeout(fn, 0)` is immediate? | ❌ Runs after microtasks |
| All Promises run in parallel? | ❌ Only with `Promise.all` |

---

### ⚡ Retry Pattern (Must-Know)

```javascript
async function retry(fn, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise(r => setTimeout(r, delay * 2 ** i)); // exponential backoff
    }
  }
}
```

---

> 💼 **Interview Pro Tip:** In any async/Promise question, always think:
> 1. What queue does this go into? (micro vs macro)
> 2. When does it resolve/reject?
> 3. Where do errors propagate?
> 4. Am I handling HTTP errors, not just network errors?

---

*End of Q126–Q150 | JavaScript Interview Preparation Guide*
*Next section: Q151–175 will cover: Closures, Prototypes, `this` binding, and ES6+ features*
