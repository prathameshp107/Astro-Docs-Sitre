---
title: "Async JavaScript"
description: "Callbacks, Promises, and async/await patterns. Building from basics to modern async control flow."
sidebar:
  order: 1
---

## Async JavaScript

JavaScript is single-threaded but non-blocking. **Asynchronous programming** lets it handle time-consuming operations (API calls, file reads, timers) without freezing the page.

### The Problem: Synchronous Blocking

```javascript
console.log("Start");

// Simulating a long operation (would freeze the page!)
function longSync() {
  const start = Date.now();
  while (Date.now() - start < 3000) {} // blocks for 3 seconds
  return "Done";
}

const result = longSync();
console.log(result);
console.log("End");
// Output: Start → (3s pause) → Done → End
```

### Callbacks (The Old Way)

A callback is a function passed as an argument to be executed later.

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((result) => {
  console.log(result); // "Data received" (after 1 second)
});

console.log("This runs immediately");
// Output: "This runs immediately" → (1s later) "Data received"
```

### Callback Hell

Nesting callbacks leads to unreadable "pyramid of doom".

```javascript
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments); // too nested!
    });
  });
});
```

### Promises (The Modern Way)

A Promise represents a value that will be available now, in the future, or never.

```javascript
// Creating a promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data received");
    } else {
      reject(new Error("Failed to fetch"));
    }
  }, 1000);
});

// Consuming a promise
fetchData
  .then((data) => console.log(data))       // "Data received"
  .catch((error) => console.error(error))  // handles errors
  .finally(() => console.log("Done"));     // always runs
```

### Chaining Promises

```javascript
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((error) => console.error("Something failed:", error));
```

### Promise Combinators

```javascript
const p1 = fetch("/api/users");
const p2 = fetch("/api/posts");
const p3 = fetch("/api/comments");

// All — waits for all to resolve, rejects if any fails
Promise.all([p1, p2, p3])
  .then(([users, posts, comments]) => console.log("All done"));

// AllSettled — waits for all, never rejects
Promise.allSettled([p1, p2, p3])
  .then((results) => results.forEach((r) => console.log(r.status)));

// Race — first to settle (resolve or reject) wins
Promise.race([p1, p2, p3])
  .then((first) => console.log("Fastest:", first));

// Any — first to resolve wins (ignores rejections)
Promise.any([p1, p2, p3])
  .then((first) => console.log("First success:", first));
```

### Async/Await (The Cleanest Way)

`async/await` is syntactic sugar over Promises — it makes async code read like synchronous code.

```javascript
async function loadData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
  } catch (error) {
    console.error("Failed:", error);
  }
}

// async functions always return a Promise
loadData().then((comments) => console.log(comments));
```

### Parallel Execution with Async/Await

```javascript
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/posts").then((r) => r.json()),
  ]);
  return { users, posts };
}
```

### Error Handling Patterns

```javascript
// 1. try/catch (recommended)
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error.message);
    return null; // graceful fallback
  }
}

// 2. .catch() on the returned promise
async function getData() {
  return await fetch("/api/data").then((r) => r.json());
}
getData().catch((err) => console.error(err));
```

> For a deep dive into Promises, async/await, and the event loop, see [Namaste JavaScript Season 2](/DSA-Notes-Problems/namaste-js/season-2/).

### Key Takeaways

- JavaScript is single-threaded — async patterns prevent blocking
- Callbacks are the foundation but lead to "callback hell" at scale
- Promises provide `.then()` / `.catch()` / `.finally()` for clean chaining
- `async/await` makes async code read like synchronous code — use it as default
- Use `Promise.all()` for parallel operations when order doesn't matter
- Always handle promise rejections with `try/catch` or `.catch()` — unhandled rejections crash the process
