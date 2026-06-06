# 🚀 JavaScript Interview Preparation Guide
## Questions 101–125 | Senior Engineer Edition

> **Crafted by a Senior JavaScript Engineer** with 15+ years at Google, Amazon, Microsoft, Netflix, and Meta.
> Covers: DOM · DOM Manipulation · Event Handling · Event Bubbling · Event Capturing · Event Delegation · Debouncing · Throttling · Timers · setTimeout() · setInterval()

---

## 📋 Table of Contents

| Range | Difficulty | Topics |
|-------|------------|--------|
| Q101–Q107 | 🟢 Beginner | DOM Basics, DOM Manipulation, Event Handling Fundamentals |
| Q108–Q117 | 🟡 Intermediate | Bubbling, Capturing, Delegation, Debounce, Throttle, Timers |
| Q118–Q125 | 🔴 Advanced | Timer Internals, Output Puzzles, Debounce/Throttle Implementations, Real-world Scenarios |

---

## 🟢 BEGINNER LEVEL (Q101–Q107)

---

### Q101 — What is the DOM?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | DOM |
| **Asked At** | TCS, Infosys, Wipro, Cognizant |

#### 📌 Interview Question
> *"What is the DOM? How is it different from HTML? Why is it important for JavaScript developers?"*

#### 📖 Answer

The **Document Object Model (DOM)** is a programming interface that the browser creates when it parses an HTML page. It represents the page as a **tree of objects (nodes)** that JavaScript can read and manipulate.

- **HTML** is the raw markup text you write in a file.
- **DOM** is the live, in-memory tree structure the browser builds from that HTML.
- Changes to the DOM immediately affect what the user sees — without reloading the page.

#### 🧠 Simple Explanation

Think of HTML as a **blueprint** and the DOM as the **actual building**. You can renovate the building (DOM) at any time — add rooms, repaint walls — without touching the original blueprint (HTML file).

#### 🌍 Real-World Example

When you click "Add to Cart" on Amazon, JavaScript finds the cart icon in the DOM, updates its count, and maybe shows a dropdown — all without a page reload. That's DOM manipulation in action.

#### 🔄 DOM Tree Diagram

```
Document
└── <html>
    ├── <head>
    │   └── <title> "My Page"
    └── <body>
        ├── <h1> "Hello"
        ├── <p>  "World"
        └── <div id="app">
            └── <button> "Click Me"
```

Every box above is a **Node**. Nodes can be:
- **Element nodes** — `<div>`, `<p>`, `<button>`
- **Text nodes** — the text inside elements
- **Attribute nodes** — `id`, `class`, `href`
- **Comment nodes** — `<!-- comment -->`

#### 💻 JavaScript Code Example

```javascript
// The 'document' object is the entry point to the DOM
console.log(typeof document);        // "object"
console.log(document.nodeType);      // 9 (Document node)

// Accessing key parts
console.log(document.title);         // Page title
console.log(document.body);          // <body> element
console.log(document.documentElement); // <html> element

// Walking the tree
const body = document.body;
console.log(body.parentNode);        // <html>
console.log(body.children);          // HTMLCollection of direct children
console.log(body.childNodes);        // NodeList (includes text nodes!)
console.log(body.firstElementChild); // First element child
```

#### 💡 Important Interview Tips

- The DOM is **language-agnostic** — it's a W3C standard; JavaScript is just the most common language to interact with it
- `document` is the root object; everything starts from it
- The DOM is **live** — it updates in real time as JavaScript changes it

#### ⚠️ Common Mistakes

```javascript
// ❌ Confusing HTML attributes with DOM properties
// HTML: <input value="hello">
const input = document.querySelector("input");
input.setAttribute("value", "world"); // Changes HTML attribute
input.value = "world";                // Changes DOM property (what user sees)
// After user types, getAttribute("value") returns original; .value returns current

// ❌ Accessing DOM before it's ready
// <script> in <head> — DOM not yet built!
document.getElementById("app"); // null — element doesn't exist yet
```

#### 🔁 Follow-up Questions

1. *"What is the difference between `childNodes` and `children`?"*
2. *"What is `document.readyState`?"*
3. *"What is the CSSOM? How does it relate to the DOM?"*

---

### Q102 — What are the main methods to select DOM elements?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | DOM Manipulation |
| **Asked At** | Wipro, Capgemini, Amazon, Flipkart |

#### 📌 Interview Question
> *"What are the different ways to select elements from the DOM? What are the differences between them?"*

#### 📖 Answer

JavaScript provides several methods to find elements in the DOM:

| Method | Returns | Live? | Selector Type |
|--------|---------|-------|--------------|
| `getElementById(id)` | Single element / `null` | — | ID string |
| `getElementsByClassName(cls)` | HTMLCollection | ✅ Live | Class name |
| `getElementsByTagName(tag)` | HTMLCollection | ✅ Live | Tag name |
| `querySelector(css)` | First match / `null` | ❌ Static | CSS selector |
| `querySelectorAll(css)` | NodeList | ❌ Static | CSS selector |

#### 🧠 Simple Explanation

- Use `getElementById` when you know the exact ID — it's the fastest.
- Use `querySelector` / `querySelectorAll` for anything more complex — they use CSS selector syntax.
- "Live" collections update automatically when the DOM changes; "static" ones don't.

#### 💻 JavaScript Code Example

```javascript
// HTML:
// <div id="app">
//   <p class="msg">Hello</p>
//   <p class="msg active">World</p>
//   <span>Extra</span>
// </div>

// 1. By ID — fastest, returns element or null
const app = document.getElementById("app");

// 2. By class — live HTMLCollection
const msgs = document.getElementsByClassName("msg");
console.log(msgs.length); // 2

// 3. By tag — live HTMLCollection
const paras = document.getElementsByTagName("p");

// 4. querySelector — first match, CSS selector power
const firstMsg  = document.querySelector(".msg");
const activeMsg = document.querySelector(".msg.active");
const byId      = document.querySelector("#app");

// 5. querySelectorAll — all matches, static NodeList
const allMsgs = document.querySelectorAll(".msg");
allMsgs.forEach(el => console.log(el.textContent));

// ── Live vs Static — the key difference ──────────────────
const liveList   = document.getElementsByClassName("msg");  // live
const staticList = document.querySelectorAll(".msg");       // static

console.log(liveList.length);   // 2
console.log(staticList.length); // 2

// Add a new .msg element
const newP = document.createElement("p");
newP.className = "msg";
document.getElementById("app").appendChild(newP);

console.log(liveList.length);   // 3 ← automatically updated!
console.log(staticList.length); // 2 ← snapshot, not updated
```

#### 💡 Important Interview Tips

- `querySelector` / `querySelectorAll` are the most versatile — prefer them
- `getElementById` is marginally faster for simple ID lookups
- Convert HTMLCollection to Array when you need array methods: `Array.from(collection)`

#### ⚠️ Common Mistakes

```javascript
// ❌ Iterating HTMLCollection with forEach — it's not an Array!
const items = document.getElementsByClassName("item");
items.forEach(i => ...); // TypeError: items.forEach is not a function

// ✅ Convert first
Array.from(items).forEach(i => ...);
[...items].forEach(i => ...);
```

#### 🔁 Follow-up Questions

1. *"When would you use `querySelectorAll` over `getElementsByClassName`?"*
2. *"What does `closest()` do?"*
3. *"What is the performance difference between the selector methods?"*

---

### Q103 — How do you create, modify, and remove DOM elements?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | DOM Manipulation |
| **Asked At** | Accenture, HCL, Amazon |

#### 📌 Interview Question
> *"Explain how to dynamically create elements, update their content/attributes, add them to the page, and remove them."*

#### 📖 Answer

The main DOM manipulation operations are **Create → Configure → Insert → Remove**.

#### 💻 JavaScript Code Example

```javascript
// ── CREATE ────────────────────────────────────────────────
const card = document.createElement("div");
const title = document.createElement("h2");
const btn   = document.createElement("button");

// ── CONFIGURE: Content ────────────────────────────────────
title.textContent = "Product Name";  // safe — no HTML parsing
btn.innerHTML = "<strong>Buy Now</strong>"; // parses HTML (XSS risk!)

// ── CONFIGURE: Attributes ─────────────────────────────────
card.setAttribute("id", "product-card");
card.setAttribute("data-id", "42");
btn.setAttribute("disabled", "");

card.removeAttribute("disabled");
card.getAttribute("data-id"); // "42"

// ── CONFIGURE: Classes ────────────────────────────────────
card.classList.add("card", "featured");
card.classList.remove("featured");
card.classList.toggle("active");        // add if absent, remove if present
card.classList.contains("card");        // true

// ── CONFIGURE: Styles ─────────────────────────────────────
card.style.backgroundColor = "#fff";
card.style.padding = "16px";
card.style.cssText = "border: 1px solid #ccc; border-radius: 8px;";

// ── INSERT ────────────────────────────────────────────────
card.appendChild(title);
card.appendChild(btn);
document.body.appendChild(card);  // adds to end of body

// insertBefore(newNode, referenceNode)
const container = document.getElementById("container");
container.insertBefore(card, container.firstChild); // prepend

// Modern: insertAdjacentElement / append / prepend
container.prepend(card);   // insert as first child
container.append(card);    // insert as last child

// ── REMOVE ────────────────────────────────────────────────
btn.remove();                        // modern self-removal
card.removeChild(title);             // parent removes child

// ── CLONE ─────────────────────────────────────────────────
const clone = card.cloneNode(true);  // true = deep clone (includes children)
document.body.appendChild(clone);
```

#### 💡 Important Interview Tips

- Prefer `textContent` over `innerHTML` to avoid XSS attacks
- `classList` API is cleaner than manually editing `className` string
- Batch DOM insertions using `DocumentFragment` for better performance

#### ⚠️ Common Mistakes

```javascript
// ❌ XSS risk with innerHTML from user input
const userInput = '<img src=x onerror=alert("XSS")>';
el.innerHTML = userInput; // DANGEROUS!

// ✅ Use textContent for untrusted content
el.textContent = userInput; // Renders as text, not HTML

// ❌ Repeatedly appending in a loop (causes multiple reflows)
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(document.createElement("div")); // slow!
}

// ✅ Use DocumentFragment — single reflow
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) frag.appendChild(document.createElement("div"));
document.body.appendChild(frag); // one DOM update
```

---

### Q104 — What is event handling? How do you attach event listeners?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Event Handling |
| **Asked At** | TCS, Infosys, Accenture, Zoho |

#### 📌 Interview Question
> *"What are the three ways to attach event handlers in JavaScript? Which is best and why?"*

#### 📖 Answer

| Method | Syntax | Multiple Listeners | Removable | Recommended |
|--------|--------|-------------------|-----------|-------------|
| Inline HTML | `onclick="fn()"` | ❌ No | Hard | ❌ No |
| DOM property | `el.onclick = fn` | ❌ No | Yes | ⚠️ Limited |
| `addEventListener` | `el.addEventListener("click", fn)` | ✅ Yes | ✅ Yes | ✅ Yes |

#### 💻 JavaScript Code Example

```javascript
const btn = document.getElementById("myBtn");

// ── Method 1: Inline HTML (avoid) ─────────────────────────
// <button onclick="handleClick()">Click</button>
// Mixes HTML and JS — hard to maintain, can't have multiple handlers

// ── Method 2: DOM property (limited) ──────────────────────
btn.onclick = function() {
  console.log("Clicked via property");
};
// Assigning again OVERWRITES the previous handler:
btn.onclick = function() {
  console.log("Second handler — replaced the first!");
};

// ── Method 3: addEventListener (recommended) ──────────────
function handleClick(event) {
  console.log("Handler 1");
  console.log(event.type);     // "click"
  console.log(event.target);   // the element that was clicked
  console.log(event.currentTarget); // element listener is attached to
}

function handleClick2() {
  console.log("Handler 2 — both run!");
}

btn.addEventListener("click", handleClick);
btn.addEventListener("click", handleClick2); // both coexist!

// ── Removing event listeners ──────────────────────────────
btn.removeEventListener("click", handleClick); // must pass same reference

// ❌ This does NOT work (anonymous function — no reference)
btn.addEventListener("click", () => console.log("Can't remove this!"));
btn.removeEventListener("click", () => console.log("Nope")); // fails silently

// ── The Event Object ──────────────────────────────────────
btn.addEventListener("click", (e) => {
  console.log(e.type);          // event type: "click"
  console.log(e.target);        // element that triggered event
  console.log(e.clientX, e.clientY); // mouse coordinates
  e.preventDefault();           // stop default browser behavior
  e.stopPropagation();          // stop event from bubbling up
});
```

#### 💡 Important Interview Tips

- Always use `addEventListener` — it's flexible and supports multiple listeners
- To remove a listener, you need a **named function reference** — anonymous functions can't be removed
- The `event` object is automatically passed to every listener

#### ⚠️ Common Mistakes

```javascript
// ❌ Adding listener inside a loop without understanding closures
for (var i = 0; i < 3; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    console.log(i); // Always prints 3 (var is function-scoped)!
  });
}

// ✅ Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    console.log(i); // Correctly prints 0, 1, 2
  });
}
```

---

### Q105 — What is Event Bubbling?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Event Bubbling |
| **Asked At** | Amazon, Flipkart, Google, Razorpay |

#### 📌 Interview Question
> *"What is event bubbling? Give an example. How do you stop it?"*

#### 📖 Answer

**Event bubbling** is the behavior where an event fired on a child element **propagates upward** through its ancestors in the DOM tree — from the target element all the way up to `document`.

#### 🧠 Simple Explanation

Drop a pebble in water — the ripple starts at the center and spreads outward. Similarly, a click on a `<button>` "bubbles up" through its parent `<div>`, then `<body>`, then `<html>`, then `document`.

#### 🔄 Bubbling Flow Diagram

```
User clicks <button>

Event travels UP:
  <button>  ← fires first (target)
     ↑
  <div>     ← fires second
     ↑
  <body>    ← fires third
     ↑
  <html>    ← fires fourth
     ↑
  document  ← fires last
```

#### 💻 JavaScript Code Example

```javascript
// HTML:
// <div id="outer">
//   <div id="inner">
//     <button id="btn">Click Me</button>
//   </div>
// </div>

document.getElementById("outer").addEventListener("click", () => {
  console.log("outer div clicked");
});
document.getElementById("inner").addEventListener("click", () => {
  console.log("inner div clicked");
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("button clicked");
});

// Clicking the button logs:
// "button clicked"
// "inner div clicked"
// "outer div clicked"
// — bubbles from innermost to outermost

// ── Stopping Bubbling ─────────────────────────────────────
document.getElementById("btn").addEventListener("click", (e) => {
  console.log("button clicked");
  e.stopPropagation(); // stops here — inner and outer won't fire
});

// ── stopImmediatePropagation ──────────────────────────────
// Stops bubbling AND prevents other handlers on the SAME element
document.getElementById("btn").addEventListener("click", (e) => {
  console.log("Handler 1");
  e.stopImmediatePropagation();
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("Handler 2 — NEVER runs!");
});
```

#### 💡 Important Interview Tips

- Almost all DOM events bubble (except `focus`, `blur`, `scroll`, `load`)
- `e.target` = element that was **actually clicked**
- `e.currentTarget` = element the **listener is attached to**
- Bubbling is what makes **Event Delegation** possible (Q109)

#### ⚠️ Common Mistakes

```javascript
// ❌ Stopping propagation everywhere — breaks event delegation!
// If you stopPropagation on every child, parent listeners never fire

// ❌ Confusing stopPropagation with preventDefault
e.stopPropagation(); // stops event from bubbling up
e.preventDefault();  // stops browser's default action (e.g., form submit, link navigation)
// They are independent — you can call one, both, or neither
```

#### 🔁 Follow-up Questions

1. *"What events don't bubble?"*
2. *"What is the difference between `stopPropagation` and `stopImmediatePropagation`?"*
3. *"How does bubbling enable event delegation?"*

---

### Q106 — What is Event Capturing?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Event Capturing |
| **Asked At** | Google, Microsoft, Swiggy |

#### 📌 Interview Question
> *"What is event capturing (trickling)? How does it differ from bubbling? How do you use it?"*

#### 📖 Answer

**Event capturing** is the opposite of bubbling. The event travels **downward** from `document` to the target element **before** bubbling back up. It's also called the "trickle-down" phase.

The full event lifecycle has **3 phases**:
1. **Capturing phase** — event travels down from `document` → target
2. **Target phase** — event reaches the actual target element
3. **Bubbling phase** — event travels back up target → `document`

To listen during the capturing phase, pass `true` (or `{ capture: true }`) as the third argument to `addEventListener`.

#### 🔄 Full Event Flow Diagram

```
          document
         /        ← Capturing (down)
       <html>
       /
    <body>
    /
  <div>               Bubbling (up) ↑
  /
<button>   ←── Event TARGET (Phase 2)
```

#### 💻 JavaScript Code Example

```javascript
// HTML: <div id="parent"><button id="child">Click</button></div>

// Capturing listener — fires FIRST (top-down)
document.getElementById("parent").addEventListener("click", () => {
  console.log("parent CAPTURING");
}, true); // <-- true enables capturing

// Bubbling listener — fires AFTER (bottom-up)
document.getElementById("parent").addEventListener("click", () => {
  console.log("parent BUBBLING");
}, false); // false = bubbling (default)

document.getElementById("child").addEventListener("click", () => {
  console.log("child clicked (target phase)");
});

// Click the button — output order:
// "parent CAPTURING"  ← capturing fires first, top-down
// "child clicked"     ← target phase
// "parent BUBBLING"   ← bubbling fires last, bottom-up

// Using options object (modern syntax)
element.addEventListener("click", handler, { capture: true });
element.addEventListener("click", handler, { capture: false }); // default
```

#### 💡 Important Interview Tips

- Capturing is rarely used in practice — bubbling covers most use cases
- The default for `addEventListener` is bubbling (`false`)
- Understanding the 3-phase model is a **common senior interview question**
- Both capturing and bubbling listeners can coexist on the same element

#### ⚠️ Common Mistakes

```javascript
// ❌ Thinking addEventListener(el, fn, true) registers on the target
// It registers on the ANCESTOR — fires during the DOWN journey to target

// ❌ Forgetting that removeEventListener must match capture flag
el.addEventListener("click", fn, true);
el.removeEventListener("click", fn, false); // ❌ won't remove — flag mismatch!
el.removeEventListener("click", fn, true);  // ✅ correct
```

#### 🔁 Follow-up Questions

1. *"When would you actually need to use capturing?"*
2. *"If both capturing and bubbling listeners are on the same element, which fires first?"*
3. *"What is `event.eventPhase`? What values can it have?"*

---

### Q107 — What is `setTimeout()`? How does it work?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | setTimeout(), Timers |
| **Asked At** | Almost every company |

#### 📌 Interview Question
> *"What is `setTimeout()`? Is it guaranteed to run after exactly the specified delay? Why or why not?"*

#### 📖 Answer

`setTimeout(callback, delay, ...args)` schedules a function to run **once** after at least `delay` milliseconds. It's part of the **Web APIs** (not JavaScript itself) and is handled by the browser.

**It is NOT guaranteed to run at exactly the delay** because:
- JavaScript is single-threaded
- The callback is queued in the **Macrotask Queue**
- It only runs when the **Call Stack is empty**
- If heavy synchronous code is running, the timer is delayed

#### 🔄 setTimeout Execution Flow

```
setTimeout(fn, 1000)
      │
      ▼
 Web API Timer starts (runs outside JS thread)
      │
      │ (1000ms pass)
      ▼
 Callback pushed to Macrotask Queue
      │
      │ (Wait for Call Stack to be empty)
      ▼
 Event Loop picks it up → runs fn()
```

#### 💻 JavaScript Code Example

```javascript
// Basic usage
setTimeout(() => console.log("Runs after ~1s"), 1000);

// With arguments
setTimeout((name, age) => {
  console.log(`Hello ${name}, age ${age}`);
}, 500, "Alice", 30);

// ── Return value: timer ID ────────────────────────────────
const timerId = setTimeout(() => console.log("Never runs"), 2000);
clearTimeout(timerId); // cancel the timer

// ── setTimeout with 0ms delay — still async! ─────────────
console.log("1 - synchronous");
setTimeout(() => console.log("3 - async (even with 0ms!)"), 0);
console.log("2 - synchronous");

// Output:
// 1 - synchronous
// 2 - synchronous
// 3 - async (even with 0ms!)
// Reason: 0ms means "run ASAP after current stack clears"

// ── Delay is MINIMUM, not exact ──────────────────────────
const start = Date.now();
setTimeout(() => {
  console.log(`Actual delay: ${Date.now() - start}ms`); // Often > 1000ms
}, 1000);

// Simulating a blocking operation
const endTime = Date.now() + 2000;
while (Date.now() < endTime) {} // Block for 2 seconds

// The setTimeout fires AFTER the block clears, ~2000ms+ later
```

#### 💡 Important Interview Tips

- `setTimeout(fn, 0)` is not truly instant — it defers to the next event loop iteration
- Always store the timer ID if you might need to cancel it
- Minimum delay in browsers is **4ms** for nested timeouts (HTML spec)
- `setTimeout` is a Web API — not part of the JavaScript spec (so it's not in Node core either, though Node implements it too)

#### ⚠️ Common Mistakes

```javascript
// ❌ Passing a string instead of a function (eval!)
setTimeout("console.log('bad')", 1000); // works but uses eval — never do this!

// ❌ Losing 'this' inside setTimeout callback
class Clock {
  constructor() { this.time = "12:00"; }
  start() {
    setTimeout(function() {
      console.log(this.time); // undefined! — 'this' is global
    }, 1000);
  }
}

// ✅ Fix with arrow function
start() {
  setTimeout(() => console.log(this.time), 1000); // "12:00"
}
```

---

## 🟡 INTERMEDIATE LEVEL (Q108–Q117)

---

### Q108 — Bubbling vs Capturing — Output Question

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Bubbling, Event Capturing |
| **Asked At** | Google, Amazon, Atlassian |

#### 📌 Interview Question
> *"What is the output when the inner div is clicked? Explain the order."*

```javascript
// HTML: <div id="A"><div id="B"><div id="C">Click</div></div></div>

document.getElementById("A").addEventListener("click", () => console.log("A bubble"), false);
document.getElementById("B").addEventListener("click", () => console.log("B bubble"), false);
document.getElementById("C").addEventListener("click", () => console.log("C bubble"), false);
document.getElementById("A").addEventListener("click", () => console.log("A capture"), true);
document.getElementById("B").addEventListener("click", () => console.log("B capture"), true);
document.getElementById("C").addEventListener("click", () => console.log("C capture"), true);
```

#### 📖 Answer

**Output when C is clicked:**
```
A capture   ← Capturing phase: A → B → C (top-down)
B capture
C capture   ← Target phase: both capture & bubble on target fire in registration order
C bubble
B bubble    ← Bubbling phase: C → B → A (bottom-up)
A bubble
```

**Why does C capture fire before C bubble?**

On the **target element** (C), JavaScript runs both capturing and bubbling listeners in **registration order** — not by phase. Since `"C bubble"` was registered before `"C capture"` in this example... wait, let me re-examine:

```javascript
// Registration order on C:
// 1. "C bubble" (false) — registered third
// 2. "C capture" (true) — registered sixth

// On the target element, listeners fire in REGISTRATION ORDER.
// Since "C bubble" was added before "C capture":
// Output: C bubble, then C capture

// BUT in the example above, capture was added after bubble.
// Let's trace again with exact registration order:
// C bubble added at line 3
// C capture added at line 6
// So on target C: "C bubble" fires before "C capture"
```

**Corrected output:**
```
A capture
B capture
C bubble   ← target: fires in registration order (bubble registered first!)
C capture
B bubble
A bubble
```

**Key Rule:** On the target element itself, listeners fire in **registration order** regardless of capture/bubble flag.

#### 💡 Important Interview Tips

- Capturing → Target → Bubbling is the always-consistent order for ancestors
- **On the actual target**, registration order determines firing order
- This is a very common senior interview question to test deep event model knowledge

---

### Q109 — What is Event Delegation?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Delegation |
| **Asked At** | Google, Amazon, Swiggy, Razorpay |

#### 📌 Interview Question
> *"What is event delegation? Why is it better than attaching individual listeners? Implement a dynamic list with delegation."*

#### 📖 Answer

**Event delegation** is a pattern where instead of attaching an event listener to **every child element**, you attach **a single listener to a parent** and use `event.target` to determine which child was clicked.

It works because of **event bubbling** — a click on a child bubbles up to the parent.

#### 🧠 Simple Explanation

Instead of hiring a separate security guard for every store in a mall, you hire one guard at the mall entrance and check who's entering there. One listener, handles all children.

#### 💻 JavaScript Code Example

```javascript
// HTML:
// <ul id="taskList">
//   <li data-id="1">Task 1 <button class="del">✕</button></li>
//   <li data-id="2">Task 2 <button class="del">✕</button></li>
// </ul>
// <button id="addTask">Add Task</button>

const list = document.getElementById("taskList");
let counter = 3;

// ── WITHOUT delegation (bad) ──────────────────────────────
// Must attach to every <li> and every .del button
// New items added later get NO listeners!

// ── WITH delegation (good) ────────────────────────────────
list.addEventListener("click", (e) => {
  // Check what was actually clicked
  if (e.target.classList.contains("del")) {
    // Delete button clicked — find parent <li>
    const li = e.target.closest("li");
    const id = li.dataset.id;
    console.log(`Deleting task ${id}`);
    li.remove();
  } else if (e.target.tagName === "LI") {
    // LI itself was clicked
    e.target.classList.toggle("done");
  }
});

// Dynamically add tasks — delegation handles them automatically!
document.getElementById("addTask").addEventListener("click", () => {
  const li = document.createElement("li");
  li.dataset.id = counter++;
  li.innerHTML = `Task ${counter - 1} <button class="del">✕</button>`;
  list.appendChild(li);
  // No new listener needed — parent's listener handles this too!
});
```

#### 🔄 Delegation vs Individual Listeners

```
❌ WITHOUT delegation (100 list items = 100 listeners):
   <li> listener ──► handler
   <li> listener ──► handler
   <li> listener ──► handler
   ... × 100

✅ WITH delegation (100 list items = 1 listener):
   <ul> listener ──► check e.target ──► act accordingly
```

#### 💡 Important Interview Tips

- Delegation is **memory efficient** — one listener for any number of children
- Works for **dynamically added elements** — major advantage
- Use `e.target.closest("selector")` to safely find the intended element even if a nested child was clicked
- Event delegation is used heavily in **React's synthetic event system**

#### ⚠️ Common Mistakes

```javascript
// ❌ Forgetting that target might be a CHILD of the intended element
// <li><span>Click me</span></li>
// Clicking the span makes e.target = <span>, not <li>

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") { // ❌ misses clicks on <span>
    // ...
  }

  // ✅ Use closest() — walks up to find matching ancestor
  const li = e.target.closest("li");
  if (li) { /* ... */ }
});
```

---

### Q110 — What is `setInterval()`? How does it differ from `setTimeout()`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | setInterval(), Timers |
| **Asked At** | Zoho, Freshworks, Paytm |

#### 📌 Interview Question
> *"Compare `setInterval` and `setTimeout`. What are the pitfalls of `setInterval`? Show an alternative using recursive `setTimeout`."*

#### 📖 Answer

| Feature | `setTimeout` | `setInterval` |
|---------|-------------|--------------|
| Fires | Once | Repeatedly |
| Cancels via | `clearTimeout(id)` | `clearInterval(id)` |
| Drift risk | Minimal | ✅ Yes — can overlap |
| Control | Less (one-shot) | More (can drift) |

**The `setInterval` problem:** It fires every N ms regardless of how long the callback takes. If the callback takes longer than the interval, executions can **pile up** or overlap.

#### 💻 JavaScript Code Example

```javascript
// ── Basic setInterval ─────────────────────────────────────
let count = 0;
const id = setInterval(() => {
  count++;
  console.log(`Tick: ${count}`);
  if (count === 5) clearInterval(id); // stop after 5
}, 1000);

// ── The Drift Problem ────────────────────────────────────
// If callback takes 800ms and interval is 1000ms:
//   Fires at: 1000ms, 2000ms, 3000ms...
// But if callback takes 1200ms and interval is 1000ms:
//   Next tick queues while previous is still running — potential pile-up!

// ── Recursive setTimeout — precise control ────────────────
function reliableInterval(callback, delay) {
  let id;
  function tick() {
    callback();
    id = setTimeout(tick, delay); // schedule NEXT tick AFTER callback finishes
  }
  id = setTimeout(tick, delay);
  return { stop: () => clearTimeout(id) };
}

const timer = reliableInterval(() => {
  console.log("Reliable tick at", new Date().toLocaleTimeString());
}, 1000);

// Stop after 5 seconds
setTimeout(() => timer.stop(), 5000);

// ── Building a countdown timer ────────────────────────────
function countdown(from) {
  let remaining = from;
  const id = setInterval(() => {
    console.log(remaining--);
    if (remaining < 0) {
      clearInterval(id);
      console.log("Done!");
    }
  }, 1000);
}
countdown(3); // 3, 2, 1, 0, Done!
```

#### 💡 Important Interview Tips

- Always store the interval ID so you can clear it — memory leak risk otherwise
- For animations, prefer `requestAnimationFrame` over `setInterval`
- Recursive `setTimeout` gives you **adaptive timing** — better for network polling

#### ⚠️ Common Mistakes

```javascript
// ❌ Forgetting to clear interval — causes memory leaks and ghost timers
// (especially in React when component unmounts)
function startPolling() {
  setInterval(fetchData, 5000); // ID lost! Can never clear this.
}

// ✅ Always capture the ID
let pollId = null;
function startPolling() {
  pollId = setInterval(fetchData, 5000);
}
function stopPolling() {
  clearInterval(pollId);
}
```

---

### Q111 — What is Debouncing? Implement it from scratch.

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Debouncing |
| **Asked At** | Google, Amazon, Flipkart, Swiggy |

#### 📌 Interview Question
> *"What is debouncing? When would you use it? Write a `debounce` function from scratch."*

#### 📖 Answer

**Debouncing** ensures a function executes only **after a specified quiet period** — i.e., it waits until the user has **stopped triggering the event** for N milliseconds before firing.

Every new event call **resets the timer**. The function only runs once the calls stop.

#### 🧠 Simple Explanation

Imagine an elevator door. Every time someone presses the button, the door waits 3 more seconds before closing. It only closes once nobody has pressed the button for 3 seconds.

#### 🔄 Debounce Flow

```
User types: "h" "he" "hel" "hell" "hello"
                                         │
Debounce delay: 300ms                    │
                                         ▼
Timer reset on each keystroke           API call fires ONCE
(no API call yet)                       with "hello"
```

#### 💻 Implementation

```javascript
function debounce(fn, delay) {
  let timerId = null;

  return function(...args) {
    // Clear any existing timer
    clearTimeout(timerId);

    // Set a new timer
    timerId = setTimeout(() => {
      fn.apply(this, args); // preserve 'this' and arguments
    }, delay);
  };
}

// ── Real-World Usage: Search Box ─────────────────────────
const searchInput = document.getElementById("search");

function fetchResults(query) {
  console.log(`API call with: "${query}"`); // expensive operation
}

const debouncedSearch = debounce(fetchResults, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
// Without debounce: API fires on EVERY keystroke
// With debounce: API fires 300ms after user STOPS typing

// ── Enhanced debounce with immediate option ───────────────
function debounceAdvanced(fn, delay, immediate = false) {
  let timerId = null;

  return function(...args) {
    const callNow = immediate && !timerId;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}
// immediate: true → fires on LEADING edge (first call fires, then silences)
// immediate: false → fires on TRAILING edge (default — fires after quiet period)
```

#### 💡 Important Interview Tips

- Debounce = **wait for quiet** → good for: search input, resize handler, form validation
- Always use `fn.apply(this, args)` to preserve context and arguments
- Debounce fires **once at the end** of a burst of events

#### ⚠️ Common Mistakes

```javascript
// ❌ Calling debounce INSIDE the event listener — creates new debounce each time!
input.addEventListener("input", () => {
  const d = debounce(fetchResults, 300); // NEW debounce on every keystroke!
  d(e.target.value);
});

// ✅ Create debounced function ONCE, outside the listener
const debouncedFetch = debounce(fetchResults, 300);
input.addEventListener("input", (e) => debouncedFetch(e.target.value));
```

---

### Q112 — What is Throttling? Implement it from scratch.

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Throttling |
| **Asked At** | Google, Netflix, Uber, Zomato |

#### 📌 Interview Question
> *"What is throttling? How is it different from debouncing? Write a `throttle` function from scratch."*

#### 📖 Answer

**Throttling** ensures a function executes **at most once per N milliseconds**, no matter how many times the event fires. Unlike debouncing (which waits for quiet), throttling **guarantees regular, spaced-out executions**.

#### 🧠 Debounce vs Throttle — Side by Side

```
Events:    ▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐

Debounce:                                 ▐
(fires once, after events stop)

Throttle:  ▐         ▐         ▐         ▐
(fires at regular intervals during events)
```

| Use When | Debounce | Throttle |
|----------|----------|----------|
| Search input | ✅ | |
| Window resize | ✅ | |
| Scroll handler | | ✅ |
| Mouse move | | ✅ |
| API rate limiting | | ✅ |
| Button click spam | ✅ | ✅ |

#### 💻 Implementation

```javascript
// Throttle using timestamps (leading-edge)
function throttle(fn, limit) {
  let lastRun = 0;

  return function(...args) {
    const now = Date.now();

    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
    // Calls within 'limit' ms are silently ignored
  };
}

// Throttle using a flag (simple)
function throttleFlag(fn, limit) {
  let isThrottled = false;

  return function(...args) {
    if (!isThrottled) {
      fn.apply(this, args);
      isThrottled = true;
      setTimeout(() => { isThrottled = false; }, limit);
    }
  };
}

// ── Real-World Usage: Scroll Handler ─────────────────────
function updateScrollPosition() {
  console.log("Scroll Y:", window.scrollY);
}

const throttledScroll = throttle(updateScrollPosition, 200);
window.addEventListener("scroll", throttledScroll);
// Without throttle: fires HUNDREDS of times per second while scrolling
// With throttle: fires at most every 200ms — smooth and efficient

// ── API Rate Limiting ─────────────────────────────────────
const throttledSave = throttle(saveToServer, 2000);
// User can only trigger a server save once every 2 seconds
document.getElementById("saveBtn").addEventListener("click", throttledSave);
```

#### ⚠️ Common Mistakes

```javascript
// ❌ Using debounce for scroll — causes laggy UX
window.addEventListener("scroll", debounce(updateUI, 300));
// UI only updates 300ms AFTER scrolling stops — feels broken!

// ✅ Use throttle for scroll
window.addEventListener("scroll", throttle(updateUI, 100));
// UI updates every 100ms while scrolling — smooth!
```

---

### Q113 — Tricky Timer Output Question

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | setTimeout(), Event Loop |
| **Asked At** | Google, Amazon, Morgan Stanley |

#### 📌 Interview Question
> *"What is the output of this code? Explain why."*

```javascript
console.log("start");

setTimeout(() => console.log("timeout 1"), 0);

Promise.resolve().then(() => console.log("promise 1"));

setTimeout(() => console.log("timeout 2"), 0);

Promise.resolve().then(() => console.log("promise 2"));

console.log("end");
```

#### 📖 Answer

**Output:**
```
start
end
promise 1
promise 2
timeout 1
timeout 2
```

**Why?**

JavaScript has two queues:
- **Microtask Queue** — Promises, `queueMicrotask` (higher priority)
- **Macrotask Queue** — `setTimeout`, `setInterval`, I/O (lower priority)

**Execution order:**
1. Synchronous code runs first: `"start"`, `"end"`
2. After each macrotask, **all** microtasks run: `"promise 1"`, `"promise 2"`
3. Then the next macrotask runs: `"timeout 1"`, `"timeout 2"`

#### 🔄 Event Loop Priority

```
Call Stack (sync) → Microtask Queue → Macrotask Queue
     (1st)               (2nd)             (3rd)
```

#### 💡 Key Rule

> After the call stack clears, **all microtasks** drain completely before the **next macrotask** is picked up.

---

### Q114 — Debugging: Event listener causing a memory leak

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Handling, Memory |
| **Asked At** | Netflix, Google, Stripe |

#### 📌 Interview Question
> *"Find the memory leak in this code and fix it:"*

```javascript
class LiveSearch {
  constructor() {
    this.input = document.getElementById("search");
    this.results = [];
    this.setup();
  }

  setup() {
    this.input.addEventListener("input", function(e) {
      this.fetchResults(e.target.value);
    });
  }

  fetchResults(query) {
    console.log("Fetching:", query);
  }
}

// Created and destroyed many times during app lifecycle
function initSearch() {
  const search = new LiveSearch();
  // ... later, search goes out of scope
}
```

#### 📖 Bugs Found and Fixed

**Bug 1:** `this` is wrong inside the anonymous function callback.
**Bug 2:** The event listener is never removed — keeps the element (and potentially the class instance) in memory even after the component is "destroyed."

```javascript
class LiveSearch {
  constructor() {
    this.input = document.getElementById("search");
    this.results = [];
    // Bind once so we can remove it later
    this.boundHandler = this.handleInput.bind(this);
    this.setup();
  }

  setup() {
    // ✅ Use named method + bound reference
    this.input.addEventListener("input", this.boundHandler);
  }

  handleInput(e) {
    this.fetchResults(e.target.value); // 'this' now works correctly
  }

  fetchResults(query) {
    console.log("Fetching:", query);
  }

  // ✅ Always provide a cleanup method
  destroy() {
    this.input.removeEventListener("input", this.boundHandler);
    this.results = [];
    console.log("Cleaned up!");
  }
}

// Usage
const search = new LiveSearch();
// When done:
search.destroy(); // properly cleans up listener
```

#### 💡 Important Interview Tips

- In React/Vue/Angular: cleanup in `componentWillUnmount` / `onUnmounted` / `ngOnDestroy`
- Memory leaks from listeners are common in SPAs where components mount/unmount frequently
- Chrome DevTools → Memory tab → Heap snapshot helps find leaked listeners

---

### Q115 — What is `preventDefault()`? Give real-world examples.

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Handling |
| **Asked At** | Amazon, Freshworks, Zoho |

#### 📌 Interview Question
> *"What does `preventDefault()` do? Give three real-world examples where you'd use it."*

#### 📖 Answer

`e.preventDefault()` stops the **browser's default action** for an event. It does NOT stop event propagation (that's `stopPropagation()`).

#### 💻 JavaScript Code Example

```javascript
// ── Example 1: Prevent form submission ────────────────────
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // stops page reload/redirect
  const email = document.getElementById("email").value;
  if (!email.includes("@")) {
    showError("Invalid email");
    return;
  }
  submitToAPI({ email }); // handle manually
});

// ── Example 2: Prevent link navigation ────────────────────
document.querySelectorAll("a.modal-trigger").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // stops navigating to href
    openModal(link.dataset.target);
  });
});

// ── Example 3: Custom drag-and-drop ───────────────────────
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); // REQUIRED to allow drop — default is "not droppable"
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault(); // prevent browser opening the file
  const file = e.dataTransfer.files[0];
  handleFileUpload(file);
});

// ── Example 4: Prevent right-click context menu ───────────
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showCustomContextMenu(e.clientX, e.clientY);
});

// ── Checking if prevention worked ─────────────────────────
link.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.defaultPrevented); // true
});
```

---

### Q116 — What is `once` option in `addEventListener`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Handling |
| **Asked At** | Google, Adobe, Atlassian |

#### 📌 Interview Question
> *"What is the `once` option in `addEventListener`? How is it different from manually removing a listener? Show a use case."*

#### 📖 Answer

The `once: true` option automatically removes the listener after it fires the **first time** — you don't need to manually call `removeEventListener`.

#### 💻 JavaScript Code Example

```javascript
// Without once — fires every click
btn.addEventListener("click", () => console.log("clicked"));

// With once: true — fires only on first click, then auto-removed
btn.addEventListener("click", () => {
  console.log("Fires ONCE then self-removes");
}, { once: true });

// ── Manual equivalent (pre-once option) ───────────────────
function handleOnce(e) {
  console.log("fires once manually");
  e.currentTarget.removeEventListener("click", handleOnce);
}
btn.addEventListener("click", handleOnce);

// ── Real-world use cases ──────────────────────────────────
// 1. Onboarding tooltip — show once on first interaction
document.getElementById("featureBtn").addEventListener("click", () => {
  showTooltip("New feature! Click here to explore.");
}, { once: true });

// 2. Video autoplay prompt (browser policy)
document.addEventListener("click", () => {
  video.play();
}, { once: true }); // Only need user gesture once to unlock autoplay

// 3. Initialize something expensive on first interaction
document.addEventListener("mousemove", () => {
  initHeavyAnimation();
}, { once: true });

// ── All addEventListener options ─────────────────────────
element.addEventListener("click", handler, {
  capture: false,  // use capturing phase?
  once: true,      // auto-remove after first fire?
  passive: true    // won't call preventDefault (performance hint for scroll)
});
```

#### 💡 Important Interview Tips

- `passive: true` is a huge performance win for scroll/touch events — tells browser no `preventDefault` will be called, so it doesn't have to wait
- `once: true` was introduced in ES2016 addEventListener options

---

### Q117 — How does Event Delegation handle dynamically added elements?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Delegation, DOM Manipulation |
| **Asked At** | Amazon, Flipkart, Swiggy, Razorpay |

#### 📌 Interview Question
> *"A developer notices that click handlers don't work on dynamically added items. Diagnose and fix using event delegation."*

#### 📖 Debugging + Solution

```javascript
// ── BROKEN CODE ───────────────────────────────────────────
const items = document.querySelectorAll(".item"); // static snapshot
items.forEach(item => {
  item.addEventListener("click", () => console.log("clicked:", item.textContent));
});

// User clicks "Load More" → new .item elements are added
// Clicking new items: NO response! Listeners were on old elements only.

// ── FIXED with Event Delegation ──────────────────────────
const container = document.getElementById("itemContainer");

container.addEventListener("click", (e) => {
  // Use closest() — handles clicks on child elements too
  const item = e.target.closest(".item");
  if (!item) return; // clicked elsewhere in container

  console.log("clicked:", item.textContent);
  item.classList.toggle("selected");
});

// Now ANY .item — present now or added in the future — works!
function loadMore() {
  const newItem = document.createElement("div");
  newItem.className = "item";
  newItem.textContent = `Dynamic Item ${Date.now()}`;
  container.appendChild(newItem);
  // No new listener needed!
}
```

---

## 🔴 ADVANCED LEVEL (Q118–Q125)

---

### Q118 — Implement a fully-featured Debounce with cancel and flush

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Debouncing |
| **Asked At** | Google, Lodash-style system design, Netflix |

#### 📌 Interview Question
> *"Implement a production-grade `debounce` with `cancel()` and `flush()` methods — similar to Lodash's implementation."*

#### 💻 Implementation

```javascript
function debounce(fn, delay, options = {}) {
  let timerId = null;
  let lastArgs = null;
  let lastThis = null;
  const { leading = false, trailing = true } = options;

  function invoke() {
    if (lastArgs) {
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    const isFirstCall = leading && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (trailing) invoke();
    }, delay);

    if (isFirstCall) invoke(); // leading edge call
  }

  // Cancel: clears the pending timer
  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
    lastArgs = null;
    lastThis = null;
  };

  // Flush: immediately invoke if there's a pending call
  debounced.flush = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      invoke();
    }
  };

  // Check if there's a pending call
  debounced.pending = function() {
    return timerId !== null;
  };

  return debounced;
}

// ── Usage ─────────────────────────────────────────────────
const save = debounce(
  (data) => console.log("Saving:", data),
  1000,
  { leading: false, trailing: true }
);

save("draft 1");
save("draft 2");
save("draft 3"); // Only this will save after 1s quiet period

save.pending(); // true — timer is running

// User navigates away — force save NOW
save.flush(); // "Saving: draft 3" — fires immediately

// Or cancel without saving
save.cancel(); // clears timer, nothing saved
```

---

### Q119 — Advanced Timer: What's the output?

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | setTimeout, Closures, Event Loop |
| **Asked At** | Google, Meta, Goldman Sachs |

#### 📌 Interview Question
> *"Predict the output:"*

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```

> *"Now fix it three different ways."*

#### 📖 Answer

**Output:** `3 3 3` (after 0s, 1s, 2s)

**Why?** `var` is function-scoped, not block-scoped. All three callbacks close over the **same `i`** variable. By the time any callback runs, the loop has finished and `i === 3`.

```javascript
// ── Fix 1: Use let (block-scoped) ─────────────────────────
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// Output: 0, 1, 2 ✅
// Each iteration creates a new block scope with its own 'i'

// ── Fix 2: IIFE to capture current i ─────────────────────
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), j * 1000);
  })(i); // immediately invoke with current value of i
}
// Output: 0, 1, 2 ✅

// ── Fix 3: Pass i as argument to setTimeout ───────────────
for (var i = 0; i < 3; i++) {
  setTimeout((j) => console.log(j), i * 1000, i);
  // Extra args after delay are passed to the callback
}
// Output: 0, 1, 2 ✅
```

---

### Q120 — Implement a `throttle` with trailing call support

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Throttling |
| **Asked At** | Google, Uber, Netflix |

#### 📌 Interview Question
> *"Implement a throttle that also fires a trailing call — the last invocation during a throttle window should run after the window ends."*

#### 💻 Implementation

```javascript
function throttle(fn, limit) {
  let lastRun = 0;
  let trailingTimer = null;
  let lastArgs = null;
  let lastThis = null;

  return function(...args) {
    const now = Date.now();
    lastArgs = args;
    lastThis = this;

    if (now - lastRun >= limit) {
      // Enough time has passed — run immediately
      lastRun = now;
      clearTimeout(trailingTimer);
      trailingTimer = null;
      fn.apply(this, args);
    } else {
      // Within throttle window — schedule trailing call
      clearTimeout(trailingTimer);
      trailingTimer = setTimeout(() => {
        lastRun = Date.now();
        trailingTimer = null;
        fn.apply(lastThis, lastArgs);
      }, limit - (now - lastRun));
    }
  };
}

// Test
const log = throttle((x) => console.log(x, Date.now()), 1000);

log("a"); // fires immediately
log("b"); // within window — scheduled as trailing
log("c"); // replaces trailing — only last call in window runs
// After 1s: "c" fires (trailing)
```

---

### Q121 — Build a real-world Infinite Scroll using throttle + DOM

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Throttling, DOM, Event Handling |
| **Asked At** | Amazon, Flipkart, Instagram (Meta) |

#### 📌 Interview Question
> *"Implement infinite scroll: load more content when the user is near the bottom of the page. Use throttling for scroll performance."*

#### 💻 Implementation

```javascript
class InfiniteScroll {
  constructor(options = {}) {
    this.threshold = options.threshold || 200; // px from bottom
    this.loading = false;
    this.page = 1;
    this.container = document.getElementById("content");

    this.handleScroll = throttle(this.checkScroll.bind(this), 200);
    window.addEventListener("scroll", this.handleScroll);
    this.loadMore(); // initial load
  }

  checkScroll() {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;

    if (!this.loading && total - scrolled <= this.threshold) {
      this.loadMore();
    }
  }

  async loadMore() {
    if (this.loading) return;
    this.loading = true;
    this.showLoader();

    try {
      const items = await this.fetchPage(this.page++);
      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.textContent = item.title;
        this.container.appendChild(div);
      });
    } catch (err) {
      console.error("Failed to load:", err);
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  async fetchPage(page) {
    // Simulated API
    await new Promise(r => setTimeout(r, 500));
    return Array.from({ length: 10 }, (_, i) => ({
      title: `Page ${page} — Item ${i + 1}`
    }));
  }

  showLoader() {
    document.getElementById("loader").style.display = "block";
  }

  hideLoader() {
    document.getElementById("loader").style.display = "none";
  }

  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

const scroller = new InfiniteScroll({ threshold: 300 });
```

---

### Q122 — Tricky: `this` inside event listener + arrow function combo

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Event Handling, `this` |
| **Asked At** | Google, Paytm, Atlassian |

#### 📌 Interview Question
> *"What does this output? Explain each line:"*

```javascript
const obj = {
  value: 42,
  setup() {
    document.getElementById("btn").addEventListener("click", function() {
      console.log("A:", this.value);          // ?
      console.log("B:", this);               // ?

      const inner = () => {
        console.log("C:", this.value);        // ?
      };
      inner();
    });

    document.getElementById("btn").addEventListener("click", () => {
      console.log("D:", this.value);          // ?
    });
  }
};
obj.setup();
```

#### 📖 Answer

```
A: undefined
// Regular function as event listener — 'this' = the DOM element (<button>)
// <button>.value is undefined

B: <button id="btn">
// Confirms: 'this' = the button element in regular function listeners

C: undefined
// Arrow function inside the regular listener — inherits 'this' from outer regular fn
// outer 'this' = <button>, so C also = <button>.value = undefined

D: 42
// Arrow function as the listener directly — 'this' is lexically from setup()
// setup() was called as obj.setup() → 'this' in setup = obj
// So arrow inherits obj → obj.value = 42 ✅
```

**Key Insight:** Arrow function event listeners inherit `this` from where they were **defined** (lexical scope), not from the element they're attached to. This is why arrow functions make class-based event handling cleaner.

---

### Q123 — setInterval drift fix + self-correcting timer

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | setInterval, Timers |
| **Asked At** | Google, Bloomberg, Jane Street |

#### 📌 Interview Question
> *"Implement a self-correcting timer that accounts for drift in setInterval. It should log the accurate elapsed time every second."*

#### 💻 Implementation

```javascript
function accurateTimer(callback, interval) {
  let expected = Date.now() + interval;
  let timerId;

  function tick() {
    const drift = Date.now() - expected;
    callback(drift);

    expected += interval;
    // Schedule next tick, compensating for drift
    const nextDelay = Math.max(0, interval - drift);
    timerId = setTimeout(tick, nextDelay);
  }

  timerId = setTimeout(tick, interval);

  return {
    stop: () => clearTimeout(timerId)
  };
}

// Usage
let elapsed = 0;
const timer = accurateTimer((drift) => {
  elapsed++;
  console.log(`Tick ${elapsed} | Drift: ${drift}ms`);
}, 1000);

// Output shows drift compensation:
// Tick 1 | Drift: 1ms
// Tick 2 | Drift: 0ms
// Tick 3 | Drift: 2ms
// (next tick adjusts by those ms to stay on schedule)

setTimeout(() => timer.stop(), 10000);

// ── Why regular setInterval drifts ───────────────────────
// setInterval(fn, 1000) fires at:
//   T+1000, T+2000, T+3000 — nominal
//   T+1001, T+2003, T+3007 — real (accumulates!)
//
// Self-correcting timer compensates each cycle:
//   next delay = 1000 - drift_this_tick
//   Stays accurate over long periods
```

---

### Q124 — Build a search box with debounce + abort controller

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Debouncing, DOM, Event Handling |
| **Asked At** | Google, Netflix, Stripe |

#### 📌 Interview Question
> *"Implement a search box that debounces API calls AND cancels in-flight requests if the user types again before the previous request completes."*

#### 💻 Implementation

```javascript
class SmartSearch {
  constructor(inputId, resultsId) {
    this.input = document.getElementById(inputId);
    this.results = document.getElementById(resultsId);
    this.abortController = null;

    // Debounce the search — wait 300ms after user stops typing
    this.debouncedSearch = debounce(this.search.bind(this), 300);
    this.input.addEventListener("input", (e) => {
      this.debouncedSearch(e.target.value.trim());
    });
  }

  async search(query) {
    // Cancel previous in-flight request
    if (this.abortController) {
      this.abortController.abort();
    }

    if (!query) {
      this.results.innerHTML = "";
      return;
    }

    this.abortController = new AbortController();
    this.showLoading();

    try {
      const res = await fetch(
        `https://api.example.com/search?q=${encodeURIComponent(query)}`,
        { signal: this.abortController.signal }
      );
      const data = await res.json();
      this.renderResults(data.items);
    } catch (err) {
      if (err.name === "AbortError") {
        // Request was intentionally cancelled — ignore
        return;
      }
      this.showError("Search failed. Please try again.");
    }
  }

  renderResults(items) {
    this.results.innerHTML = items.length
      ? items.map(item => `<li>${item.name}</li>`).join("")
      : "<li>No results found</li>";
  }

  showLoading() {
    this.results.innerHTML = "<li>Searching...</li>";
  }

  showError(msg) {
    this.results.innerHTML = `<li class="error">${msg}</li>`;
  }
}

const search = new SmartSearch("searchInput", "searchResults");
```

---

### Q125 — Design Question: Event System using Pub/Sub with DOM Events

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Event Handling, DOM, OOP |
| **Asked At** | Google, Meta, Airbnb (Staff/Principal) |

#### 📌 Interview Question
> *"Design a custom Pub/Sub event bus that uses the browser's native CustomEvent API to enable cross-component communication without tight coupling."*

#### 💻 Implementation

```javascript
class EventBus {
  constructor() {
    // Use a hidden DOM node as the event target
    this._bus = document.createElement("div");
  }

  // Subscribe to an event
  on(event, callback) {
    this._bus.addEventListener(event, callback);
    return () => this.off(event, callback); // returns unsubscribe fn
  }

  // Subscribe once
  once(event, callback) {
    this._bus.addEventListener(event, callback, { once: true });
  }

  // Unsubscribe
  off(event, callback) {
    this._bus.removeEventListener(event, callback);
  }

  // Publish an event with optional data
  emit(event, data = {}) {
    this._bus.dispatchEvent(new CustomEvent(event, {
      detail: data,       // payload
      bubbles: false,
      cancelable: true
    }));
  }
}

// ── Global singleton ──────────────────────────────────────
const bus = new EventBus();

// ── Component A: Cart ─────────────────────────────────────
class CartComponent {
  constructor() {
    this.items = [];
    // Subscribe to product selections
    this.unsubscribe = bus.on("product:selected", (e) => {
      this.addItem(e.detail.product);
    });
  }

  addItem(product) {
    this.items.push(product);
    console.log(`Cart: Added "${product.name}". Total: ${this.items.length}`);
    bus.emit("cart:updated", { count: this.items.length });
  }

  destroy() {
    this.unsubscribe(); // clean up subscription
  }
}

// ── Component B: Product List ─────────────────────────────
class ProductList {
  selectProduct(product) {
    console.log(`Product: "${product.name}" selected`);
    bus.emit("product:selected", { product });
    // Cart component reacts without ProductList knowing about it!
  }
}

// ── Component C: Cart Badge (UI) ──────────────────────────
bus.on("cart:updated", (e) => {
  document.getElementById("cartBadge").textContent = e.detail.count;
  console.log(`Badge updated: ${e.detail.count} items`);
});

// ── Wiring it up ──────────────────────────────────────────
const cart = new CartComponent();
const productList = new ProductList();

productList.selectProduct({ id: 1, name: "iPhone 16" });
// Logs:
// Product: "iPhone 16" selected
// Cart: Added "iPhone 16". Total: 1
// Badge updated: 1 items

productList.selectProduct({ id: 2, name: "MacBook Pro" });
// Cart: Added "MacBook Pro". Total: 2
// Badge updated: 2 items

// Clean up
cart.destroy();
```

---

## 📝 REVISION CHEAT SHEET

> Quick-reference for last-minute interview prep

---

### ⚡ DOM Essentials

```
document.getElementById("id")        → single element (fastest)
document.querySelector(".css")        → first match (most flexible)
document.querySelectorAll(".css")     → NodeList (static snapshot)
document.getElementsByClassName()     → HTMLCollection (live!)

el.textContent = "text"   → safe, no HTML parsing
el.innerHTML   = "<b>x</b>" → parses HTML (XSS risk!)
el.classList.add/remove/toggle/contains
el.setAttribute / getAttribute / removeAttribute
el.dataset.key → accesses data-key attribute

DocumentFragment → batch DOM insertions (single reflow)
```

### ⚡ Event Flow (3 Phases)

```
Capturing (↓) → Target → Bubbling (↑)

addEventListener(event, fn, true)  → capturing phase
addEventListener(event, fn, false) → bubbling phase (DEFAULT)
addEventListener(event, fn, { once: true, passive: true })

e.target          → element that triggered the event
e.currentTarget   → element listener is attached to
e.stopPropagation()        → stop bubbling/capturing
e.stopImmediatePropagation() → stop + prevent other listeners on same element
e.preventDefault()         → stop browser's default action
```

### ⚡ Event Delegation Pattern

```javascript
parent.addEventListener("click", (e) => {
  const target = e.target.closest(".child-selector");
  if (!target) return;
  // handle target
});
// Works for dynamic elements — single listener for all children
```

### ⚡ Debounce vs Throttle

```
Debounce  → fires ONCE after N ms of quiet
            Use: search input, resize, form validation

Throttle  → fires at MOST once per N ms
            Use: scroll, mousemove, rate limiting

Key rule: Create debounced/throttled fn ONCE outside listener
```

### ⚡ Timer Rules

```
setTimeout(fn, delay)   → runs ONCE after at least 'delay' ms
setInterval(fn, delay)  → runs REPEATEDLY every 'delay' ms (may drift)
clearTimeout(id)        → cancel setTimeout
clearInterval(id)       → cancel setInterval

setTimeout(fn, 0) → still ASYNC — runs after current stack clears

Task Queue Priority:
  Synchronous code → Microtasks (Promises) → Macrotasks (setTimeout/setInterval)
```

### ⚡ Timer Output Gotcha

```javascript
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
// Output: 3, 3, 3  (var is shared)

for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
// Output: 0, 1, 2  (let is block-scoped)
```

### ⚡ addEventListener Options

```javascript
el.addEventListener(event, fn, {
  capture: false,  // use bubbling (default)
  once: true,      // auto-remove after first fire
  passive: true    // won't call preventDefault (scroll performance!)
});
```

### ⚡ Memory Leak Prevention

```
✅ Always store timer IDs → clearTimeout/clearInterval when done
✅ Always store listener references → removeEventListener on cleanup
✅ Use { once: true } for one-off listeners
✅ Use AbortController to cancel fetch + clean up groups of listeners
✅ In React/Vue: remove listeners in unmount lifecycle hooks
```

### ⚡ Common Interview Patterns

| Pattern | Use Case |
|---------|----------|
| Event Delegation | Dynamic lists, performance |
| Debounce (300ms) | Search input, resize |
| Throttle (200ms) | Scroll, mousemove |
| Recursive setTimeout | Precise intervals, polling |
| CustomEvent + EventBus | Cross-component communication |
| AbortController | Cancel in-flight requests |

---

> **Document Statistics**
> - Questions: 101–125 (25 total)
> - Difficulty: 7 Beginner · 10 Intermediate · 8 Advanced
> - Topics Covered: 11
> - Code Examples: 50+
> - Output Puzzles: 3
> - Debugging Questions: 2
> - System Design / Implementation: 4
