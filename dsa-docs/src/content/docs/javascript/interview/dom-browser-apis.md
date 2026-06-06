---
title: "DOM & Browser APIs — Interview Questions"
description: "JavaScript interview questions on DOM manipulation, events, event delegation, storage, requestAnimationFrame, Service Workers, and browser APIs."
sidebar:
  order: 7
---

# 🟡 DOM & Browser APIs

---

## Q1. What is event bubbling and capturing?

**Answer:**

```
  Phase 1 (Capture): Window → Document → Body → ... → Target
  Phase 2 (Bubble):  Target → ... → Body → Document → Window
```

```js
// Bubbling (default — useCapture = false)
document.querySelector(".child").addEventListener("click", () => {
  console.log("child clicked"); // fires 1st
});
document.querySelector(".parent").addEventListener("click", () => {
  console.log("parent clicked"); // fires 2nd (bubbling)
});

// Capturing
document.querySelector(".parent").addEventListener("click", () => {
  console.log("parent capturing"); // fires 1st
}, true); // <-- true = capture phase

// Stop bubbling
element.addEventListener("click", (e) => {
  e.stopPropagation(); // stops event from bubbling further
});

// Prevent default action
link.addEventListener("click", (e) => {
  e.preventDefault(); // e.g. stops navigation
});
```

---

## Q2. What is event delegation?

**Answer:**
Attach a single listener to a **parent** to handle events from many children (current and future).

```js
// ❌ Inefficient — listener on every item
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick);
});

// ✅ Event delegation — one listener on parent
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});

// Works for dynamically added elements too!
const ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
  const li = e.target.closest("li[data-id]");
  if (li) handleItem(li.dataset.id);
});
```

---

## Q3. What is the difference between `localStorage`, `sessionStorage`, and `cookies`?

**Answer:**

| Feature | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| Capacity | ~5–10 MB | ~5 MB | ~4 KB |
| Expiry | Never (manual) | Tab close | Custom |
| Sent to server | No | No | Yes (every request) |
| Accessible from JS | Yes | Yes | Yes (if not HttpOnly) |
| Scope | Origin | Tab + Origin | Domain + Path |

```js
// localStorage
localStorage.setItem("key", JSON.stringify({ name: "Alice" }));
const data = JSON.parse(localStorage.getItem("key"));
localStorage.removeItem("key");
localStorage.clear();

// sessionStorage
sessionStorage.setItem("token", "abc123");

// Cookies
document.cookie = "name=Alice; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

---

## Q4. What is `debounce` and `throttle`?

**Answer:**

```js
// DEBOUNCE — execute after N ms of inactivity
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Use: search input, resize
const handleSearch = debounce((e) => fetchResults(e.target.value), 300);
input.addEventListener("input", handleSearch);

// THROTTLE — execute at most once per N ms
function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

// Use: scroll, mousemove, resize
const handleScroll = throttle(() => updatePosition(), 100);
window.addEventListener("scroll", handleScroll);
```

---

## Q5. What is `requestAnimationFrame`?

**Answer:**

```js
// Execute callback before next browser repaint (~60fps)
function animate() {
  // Update animation state
  element.style.left = `${x++}px`;

  if (x < 500) {
    requestAnimationFrame(animate); // loop
  }
}
requestAnimationFrame(animate);

// vs setTimeout(fn, 16) — rAF:
// - Synced to display refresh rate
// - Pauses when tab is not visible (saves battery)
// - More accurate timing
// - Batches DOM updates optimally

// Cancel
const id = requestAnimationFrame(myFn);
cancelAnimationFrame(id);
```

---

## Q6. What is the Virtual DOM and how does it work conceptually?

**Answer:**

```js
// Virtual DOM — lightweight JS representation of real DOM

// 1. Create virtual node
function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

// 2. Render to real DOM
function render(vNode, container) {
  if (typeof vNode === "string") {
    container.appendChild(document.createTextNode(vNode));
    return;
  }

  const el = document.createElement(vNode.type);

  Object.entries(vNode.props).forEach(([key, val]) => {
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      el.setAttribute(key, val);
    }
  });

  vNode.children.forEach(child => render(child, el));
  container.appendChild(el);
}

// 3. Diff algorithm compares old vs new vDOM
// Only updates changed parts → O(n) instead of full re-render
// This is the core of React/Vue performance
```

---

## Q7. What is a Service Worker and how does it work?

**Answer:**

```js
// Service Worker — intercepts network requests, enables offline

// 1. Register (in main script)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(reg => console.log("SW registered:", reg.scope))
    .catch(err => console.error("SW failed:", err));
}

// 2. Service Worker lifecycle (sw.js)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then(cache =>
      cache.addAll(["/", "/index.html", "/app.js", "/style.css"])
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== "v1").map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
```

---

## Q8. Explain CSP (Content Security Policy) and its JavaScript implications.

**Answer:**

```js
// CSP prevents XSS by controlling which resources load
// Set via HTTP header or <meta> tag:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'

// Inline scripts are blocked by default with CSP
// ❌ This is blocked
<script>alert("XSS")</script>

// ✅ With nonce (unique per request)
<script nonce="abc123">console.log("safe")</script>

// ❌ eval() is blocked by default (no 'unsafe-eval')
eval("malicious code"); // blocked!
new Function("return malicious"); // blocked!
setTimeout("malicious()", 0); // blocked if string!
setTimeout(() => malicious(), 0); // ✅ function is fine

// Implications for developers:
// - No inline event handlers: onclick="fn()" ❌
// - Use addEventListener instead ✅
// - Libraries using eval() won't work (e.g. some template engines)
// - Dynamic imports may need 'script-src' adjustments
```

---

## Q9. What is `module federation` and microfrontends?

**Answer:**

```js
// Webpack Module Federation — share code between apps at runtime

// App 1 (host) — webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js"
  },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } }
});

// App 2 (remote) — webpack.config.js
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button",
    "./Header": "./src/components/Header"
  },
  shared: { react: { singleton: true } }
});

// Usage in host
const RemoteButton = React.lazy(() => import("remoteApp/Button"));

// Benefits: Independent deploy, team autonomy, shared dependencies
// Drawbacks: Version conflicts, runtime failures, complexity
```

---

## Q10. What is `Atomics` and `SharedArrayBuffer`?

**Answer:**

```js
// SharedArrayBuffer — shared memory between main thread and workers
const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes
const sharedArray = new Int32Array(sharedBuffer);

// Worker 1
sharedArray[0] = 42;

// Worker 2 — can read same memory
console.log(sharedArray[0]); // 42

// Problem: race conditions!
// Atomics — thread-safe operations
Atomics.add(sharedArray, 0, 1);       // atomic increment
Atomics.sub(sharedArray, 0, 1);       // atomic decrement
Atomics.load(sharedArray, 0);         // atomic read
Atomics.store(sharedArray, 0, 100);   // atomic write
Atomics.compareExchange(sharedArray, 0, 100, 200); // CAS
Atomics.wait(sharedArray, 0, 100);    // block until value changes
Atomics.notify(sharedArray, 0, 1);    // wake up waiting threads
```
