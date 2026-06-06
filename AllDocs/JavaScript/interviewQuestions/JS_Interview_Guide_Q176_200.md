# 🚀 JavaScript Interview Preparation Guide
## Questions 176–200 | Engine · Event Loop · Queues · GC · Performance · Security · Rendering · Design Patterns · Tricky JS

> **Author:** Senior JavaScript Engineer (15+ years @ Google, Amazon, Netflix, Meta, Microsoft)
> **Level:** Beginner → Intermediate → Advanced
> **Format:** Interview-Ready | Cheat-Sheet Optimized

---

## 📋 Table of Contents

| # | Topic | Difficulty |
|---|-------|-----------|
| Q176 | What is the JavaScript Engine? | 🟢 Beginner |
| Q177 | What is JIT Compilation? | 🟢 Beginner |
| Q178 | What is the Event Loop? | 🟢 Beginner |
| Q179 | Microtask Queue vs Callback Queue | 🟢 Beginner |
| Q180 | What is the Call Stack? | 🟢 Beginner |
| Q181 | Output: Event loop execution order | 🟡 Intermediate |
| Q182 | What is Garbage Collection? | 🟡 Intermediate |
| Q183 | Mark-and-Sweep algorithm | 🟡 Intermediate |
| Q184 | Memory leaks — causes & detection | 🟡 Intermediate |
| Q185 | Performance: debounce vs throttle | 🟡 Intermediate |
| Q186 | Browser Rendering Pipeline | 🟡 Intermediate |
| Q187 | Reflow vs Repaint | 🟡 Intermediate |
| Q188 | `requestAnimationFrame` | 🟡 Intermediate |
| Q189 | XSS — What it is and prevention | 🟡 Intermediate |
| Q190 | CSRF — What it is and prevention | 🟡 Intermediate |
| Q191 | Module Pattern in JS | 🟡 Intermediate |
| Q192 | Observer / Pub-Sub Pattern | 🟡 Intermediate |
| Q193 | Tricky: `typeof null` | 🔴 Advanced |
| Q194 | Tricky: Loose vs Strict equality edge cases | 🔴 Advanced |
| Q195 | Output: Hoisting with `let`, `var`, `function` | 🔴 Advanced |
| Q196 | Singleton & Factory Patterns | 🔴 Advanced |
| Q197 | Real-world: Web Worker for heavy computation | 🔴 Advanced |
| Q198 | V8 Hidden Classes & inline caching | 🔴 Advanced |
| Q199 | Tricky: Closure + loop variable capture | 🔴 Advanced |
| Q200 | Real-world: Performance audit checklist | 🔴 Advanced |

---

## 🟢 BEGINNER QUESTIONS

---

### Q176 — What is the JavaScript Engine?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | JavaScript Engine |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is a JavaScript engine? Name some examples and what they do."*

---

**📖 Answer:**

A **JavaScript engine** is a program that reads, interprets, compiles, and executes JavaScript code. Every browser has one. Modern engines use **Just-In-Time (JIT) compilation** to convert JS to machine code at runtime for high performance.

---

**JS Engine Flow Diagram:**

```
Source Code (JS)
      │
      ▼
┌─────────────┐
│   Parser    │  ← Tokenizes and parses code
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     AST     │  ← Abstract Syntax Tree
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Interpreter│  ← Produces bytecode (fast startup)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ JIT Compiler│  ← Optimizes hot paths to machine code
└──────┬──────┘
       │
       ▼
  Machine Code  →  CPU executes
```

---

**Popular JavaScript Engines:**

| Engine | Used In | Language |
|--------|---------|----------|
| **V8** | Chrome, Node.js, Edge | C++ |
| **SpiderMonkey** | Firefox | C++/Rust |
| **JavaScriptCore (Nitro)** | Safari | C++ |
| **Chakra** | Old Edge (legacy) | C++ |

---

**💻 JavaScript Code Example:**

```javascript
// This simple code goes through the full engine pipeline:
function add(a, b) {
  return a + b;
}

// V8 will JIT-compile add() after it's called many times
for (let i = 0; i < 1_000_000; i++) {
  add(i, i + 1); // "hot" function → gets optimized to machine code
}
```

---

**🌍 Real-World Example:**

Node.js uses V8 — the same engine as Chrome — which is why JavaScript can run server-side. When you run `node app.js`, V8 parses, compiles, and executes it directly on the machine.

---

**💡 Important Interview Tips:**
- V8 is the most commonly discussed engine in interviews — know it by name
- Engines don't just *interpret* — they compile to machine code via JIT
- AST (Abstract Syntax Tree) is a key intermediate representation to mention

**⚠️ Common Mistakes:**
- Saying "JavaScript is interpreted" — modern engines compile it (JIT)
- Confusing the JS engine with the JS runtime (engine + Web APIs + Event Loop)

**🔁 Follow-up Questions:**
- What is the difference between an engine and a runtime?
- What is V8's Ignition and TurboFan?

---

### Q177 — What is JIT Compilation?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | JavaScript Engine |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is JIT compilation and why does it make JavaScript fast?"*

---

**📖 Answer:**

**JIT (Just-In-Time) Compilation** is a technique where code is compiled to machine code **during execution** (not before). The engine starts by interpreting code for fast startup, then identifies "hot" code (frequently run) and compiles it to optimized machine code on the fly.

---

**JIT Strategy:**

```
First run:    JS → Bytecode (via Interpreter)   ← fast to start
Hot code:     Bytecode → Machine Code (via JIT) ← fast to execute
Deoptimize:   If types change, revert to bytecode
```

---

**💻 JavaScript Code Example:**

```javascript
function multiply(a, b) {
  return a * b;
}

// JIT sees this called with numbers 1000s of times
// → Compiles to optimized machine code assuming number types
for (let i = 0; i < 1_000_000; i++) multiply(i, 2);

// Now passing a string — triggers DEOPTIMIZATION
multiply("hello", 2); // JIT has to revert to unoptimized path
```

---

**💡 Important Interview Tips:**
- V8's interpreter is called **Ignition**; the JIT compiler is **TurboFan**
- **Deoptimization** happens when type assumptions are violated — keep types consistent for performance
- JIT is why JS performance is close to compiled languages today

**⚠️ Common Mistakes:**
- Saying JavaScript is "always slow because it's interpreted"
- Not knowing that changing variable types mid-execution hurts performance

**🔁 Follow-up Questions:**
- What triggers deoptimization in V8?
- What is AOT (Ahead-of-Time) compilation? How does WebAssembly relate?

---

### Q178 — What is the Event Loop?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Event Loop |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the Event Loop in JavaScript and why does it exist?"*

---

**📖 Answer:**

JavaScript is **single-threaded** — it can only do one thing at a time. The **Event Loop** is a mechanism that allows JS to handle asynchronous operations (timers, network requests, user events) without blocking the main thread.

It continuously checks: *"Is the call stack empty? If yes, push the next task from the queue."*

---

**Full Event Loop Diagram:**

```
┌─────────────────────────────────────────────────────┐
│                  JavaScript Runtime                  │
│                                                     │
│  ┌──────────────┐        ┌───────────────────────┐  │
│  │  CALL STACK  │        │      WEB APIs         │  │
│  │              │        │  setTimeout / fetch   │  │
│  │  [main()]    │◄──────►│  DOM events / XHR     │  │
│  │  [fn()]      │        │  setInterval          │  │
│  └──────┬───────┘        └──────────┬────────────┘  │
│         │ (stack empty?)            │callback ready  │
│         ▼                           ▼               │
│  ┌─────────────────────────────────────────────┐    │
│  │              EVENT LOOP                     │    │
│  │                                             │    │
│  │  1. Check Microtask Queue (drain all)       │    │
│  │  2. Check Callback/Macro Queue (one task)   │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌──────────────────┐   ┌───────────────────────┐   │
│  │ MICROTASK QUEUE  │   │  CALLBACK (MACRO) QUEUE│  │
│  │ Promise.then     │   │  setTimeout callbacks  │  │
│  │ queueMicrotask   │   │  setInterval callbacks │  │
│  │ MutationObserver │   │  I/O callbacks         │  │
│  └──────────────────┘   └───────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

**💻 JavaScript Code Example:**

```javascript
console.log("start");           // sync → call stack

setTimeout(() => {
  console.log("timeout");       // macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log("promise");       // microtask queue
});

console.log("end");             // sync → call stack

// Output: start → end → promise → timeout
```

---

**💡 Important Interview Tips:**
- Event Loop is why JS can be async despite being single-threaded
- **Microtasks drain completely** before any macrotask runs
- The Event Loop = the "coordinator" between the stack and the queues

**⚠️ Common Mistakes:**
- Saying JS is multi-threaded — it has one main thread
- Thinking `setTimeout(fn, 0)` is truly instant — it queues a macrotask

**🔁 Follow-up Questions:**
- What is the difference between microtask and macrotask queues?
- What happens if the call stack never empties?

---

### Q179 — Microtask Queue vs Callback Queue — what's the difference?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Microtask Queue · Callback Queue |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the difference between the Microtask Queue and the Callback Queue?"*

---

**📖 Answer:**

| Feature | Microtask Queue | Callback (Macro) Queue |
|---------|----------------|----------------------|
| Priority | **Higher** — runs first | Lower — runs after microtasks |
| Drains | **All at once** before next macrotask | **One task** per event loop tick |
| Sources | `Promise.then`, `queueMicrotask`, `MutationObserver` | `setTimeout`, `setInterval`, I/O, UI events |
| When processed | After every task, before next macrotask | After microtask queue is empty |

---

**Priority Flow:**

```
[Call Stack empties]
        │
        ▼
[Drain ALL Microtasks]  ← Even new ones added during processing
        │
        ▼
[Run ONE Macrotask]
        │
        ▼
[Drain ALL Microtasks again]
        │
        ▼
[Run next Macrotask] ... and repeat
```

---

**💻 JavaScript Code Example:**

```javascript
setTimeout(() => console.log("macro 1"), 0);
setTimeout(() => console.log("macro 2"), 0);

Promise.resolve()
  .then(() => console.log("micro 1"))
  .then(() => console.log("micro 2"));

// Output:
// micro 1
// micro 2
// macro 1
// macro 2
```

---

**⚠️ Danger — infinite microtask loop:**

```javascript
// ❌ This STARVES the macrotask queue — page freezes!
function recurse() {
  Promise.resolve().then(recurse);
}
recurse(); // microtask queue never empties → macrotasks never run
```

---

**💡 Important Interview Tips:**
- Microtasks can **starve** macrotasks if they keep adding new microtasks
- `queueMicrotask()` lets you manually schedule a microtask
- This distinction is critical for understanding output-based questions

**⚠️ Common Mistakes:**
- Assuming both queues have equal priority
- Thinking only one microtask runs per loop tick — all of them drain

**🔁 Follow-up Questions:**
- What is `queueMicrotask()` used for?
- Where does `requestAnimationFrame` fit — micro or macro?

---

### Q180 — What is the Call Stack?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | JavaScript Engine · Event Loop |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is the Call Stack? What happens when it overflows?"*

---

**📖 Answer:**

The **Call Stack** is a LIFO (Last In, First Out) data structure that tracks function calls. When a function is called, a **stack frame** is pushed. When it returns, the frame is popped. JavaScript executes whatever is on top of the stack.

---

**Call Stack Visualization:**

```
function c() { ... }        Stack during c():
function b() { c(); }       ┌──────────┐
function a() { b(); }       │   c()    │ ← top (currently executing)
a();                         │   b()    │
                             │   a()    │
                             │  main()  │ ← bottom
                             └──────────┘
                     c returns → popped, then b returns, etc.
```

---

**💻 JavaScript Code Example:**

```javascript
function third() { console.log("third"); }
function second() { third(); }
function first() { second(); }

first();
// Stack: first → second → third → third returns → second returns → first returns
```

**Stack Overflow:**

```javascript
// ❌ Infinite recursion → "Maximum call stack size exceeded"
function infinite() {
  return infinite();
}
infinite(); // RangeError: Maximum call stack size exceeded
```

---

**💡 Important Interview Tips:**
- Stack frames hold: local variables, arguments, return address
- Stack overflow = too many nested calls (usually infinite recursion)
- The call stack is **synchronous only** — async callbacks wait in queues

**⚠️ Common Mistakes:**
- Confusing the call stack with the memory heap
- Thinking async callbacks execute on the call stack directly — they wait for it to empty

**🔁 Follow-up Questions:**
- What is a stack frame?
- How does the browser show the call stack in DevTools?

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q181 — Output Question: What is the output of this Event Loop code?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Event Loop · Output |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the output of the following code? Explain why."*

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => {
    console.log("C");
    setTimeout(() => console.log("D"), 0);
  })
  .then(() => console.log("E"));

console.log("F");
```

---

**📖 Answer:**

**Output:**
```
A
F
C
E
B
D
```

---

**🧠 Step-by-Step Breakdown:**

```
Step 1: Sync code runs
  → console.log("A")          Output: A
  → setTimeout B queued       MacroQ: [B]
  → Promise.then(C...) queued MicroQ: [C-handler]
  → console.log("F")          Output: F

Step 2: Stack empty → drain microtasks
  → Run C-handler:
      console.log("C")        Output: C
      setTimeout D queued     MacroQ: [B, D]
      Returns → .then(E) queued MicroQ: [E-handler]
  → Run E-handler:
      console.log("E")        Output: E
  MicroQ empty.

Step 3: Run one macrotask → B
  → console.log("B")          Output: B
  → Drain microtasks (none)

Step 4: Run next macrotask → D
  → console.log("D")          Output: D
```

---

**💡 Important Interview Tips:**
- Notice `D` logs AFTER `B` because `D`'s `setTimeout` was queued **inside** a microtask that ran after `B` was already queued
- Chained `.then()` callbacks each add a **new microtask** — they don't run in the same tick
- This style of question is extremely common at FAANG interviews

**⚠️ Common Mistakes:**
- Thinking `C` and `E` run together in the same microtask — `.then()` chains create separate microtasks
- Assuming `D` appears before `B`

**🔁 Follow-up Questions:**
- What if `setTimeout` had a 100ms delay instead of 0?
- What if `Promise.resolve()` were replaced with `Promise.reject()`?

---

### Q182 — What is Garbage Collection in JavaScript?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Garbage Collection |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"How does JavaScript handle memory? What is garbage collection?"*

---

**📖 Answer:**

JavaScript automatically manages memory through **Garbage Collection (GC)**. The engine allocates memory when objects are created and **automatically frees it** when objects are no longer reachable (i.e., no references point to them). Developers don't call `free()` — the GC handles it.

---

**Memory Lifecycle:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  ALLOCATE   │ →  │    USE      │ →  │   RELEASE   │
│             │    │             │    │             │
│ let obj = {}│    │ obj.name=.. │    │ obj = null  │
│ new Array() │    │ read/write  │    │ (GC frees)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

**💻 JavaScript Code Example:**

```javascript
function createUser() {
  let user = { name: "Alice", age: 30 }; // allocated on heap
  return user.name;
  // user object goes out of scope → eligible for GC
}

createUser();
// After this call, the { name: "Alice"... } object has no references
// → GC can reclaim that memory
```

---

**💡 Important Interview Tips:**
- JS uses the **Mark-and-Sweep** algorithm (most common GC strategy)
- **Reachability** is the key concept — if an object can't be reached from roots (global scope, stack), it's garbage
- GC is **non-deterministic** — you can't predict exactly when it runs

**⚠️ Common Mistakes:**
- Thinking `null`-ing a variable immediately frees memory — it just removes the reference; GC runs later
- Not understanding that closures can **prevent** garbage collection

**🔁 Follow-up Questions:**
- What is the mark-and-sweep algorithm?
- How can closures cause memory leaks?

---

### Q183 — How does the Mark-and-Sweep GC algorithm work?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Garbage Collection |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Explain the Mark-and-Sweep garbage collection algorithm."*

---

**📖 Answer:**

**Mark-and-Sweep** runs in two phases:
1. **Mark:** Start from "roots" (global variables, call stack). Traverse all reachable objects and mark them as alive.
2. **Sweep:** Scan the heap. Any object **not marked** is unreachable → free its memory.

---

**Mark-and-Sweep Diagram:**

```
ROOTS: [global, stack variables]
         │
         ▼ (traverse all references)
  ┌──────────────────────────────────┐
  │  HEAP                            │
  │                                  │
  │  [A]●──►[B]●──►[C]●  ← MARKED  │
  │                                  │
  │  [X]○  [Y]○  [Z]○   ← UNMARKED │
  │  (no references to X, Y, Z)     │
  └──────────────────────────────────┘
         │
         ▼ SWEEP phase
  X, Y, Z memory freed ✅
```

---

**💻 JavaScript Code Example:**

```javascript
let a = { data: "important" };
let b = { ref: a };

// Both a and b are reachable → marked → not collected

a = null; // remove reference to first object
// b.ref still points to { data: "important" } → still reachable

b = null; // now { data: "important" } has zero references
// → unmarked in next GC cycle → memory freed
```

---

**💡 Important Interview Tips:**
- Modern V8 uses **generational GC**: young objects (likely short-lived) collected frequently; old objects less often
- GC pauses the JS thread briefly — called **"stop the world"** (V8 minimizes this with incremental/concurrent GC)
- **WeakMap** and **WeakSet** hold weak references — don't prevent GC

**⚠️ Common Mistakes:**
- Thinking reference counting (older approach) is what JS uses — it's mark-and-sweep
- Not knowing that circular references used to be a leak in old IE (reference counting) but not with mark-and-sweep

**🔁 Follow-up Questions:**
- What is generational garbage collection?
- Why doesn't circular reference cause a memory leak in modern JS?

---

### Q184 — What causes memory leaks in JavaScript?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Garbage Collection · Performance |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What are common causes of memory leaks in JavaScript? How do you detect and fix them?"*

---

**📖 Answer:**

A **memory leak** is when memory that's no longer needed is never released. The GC can't collect it because something still holds a reference.

---

**Common Memory Leak Causes:**

| Cause | Example | Fix |
|-------|---------|-----|
| Global variables | `window.bigData = [...]` | Use `const`/`let`, avoid globals |
| Forgotten timers | `setInterval` never cleared | `clearInterval` on cleanup |
| Detached DOM nodes | Reference to removed element | Null the reference |
| Closures holding large data | Inner fn keeps outer scope alive | Break reference when done |
| Event listeners | Not removed after element removed | `removeEventListener` |

---

**💻 JavaScript Code Example:**

```javascript
// ❌ Memory leak — interval never cleared
function startPolling() {
  const data = new Array(10_000).fill("leak");
  setInterval(() => {
    console.log(data.length); // 'data' never GC'd
  }, 1000);
}

// ✅ Fix — clear the interval
function startPolling() {
  const data = new Array(10_000).fill("ok");
  const id = setInterval(() => {
    console.log(data.length);
  }, 1000);

  return () => clearInterval(id); // return cleanup function
}

// ❌ Event listener leak
const btn = document.getElementById("btn");
function handleClick() { /* ... */ }
btn.addEventListener("click", handleClick);
// Later, btn is removed from DOM but listener still holds reference!

// ✅ Fix
btn.removeEventListener("click", handleClick);
```

---

**🛠️ Detection Tools:**
- Chrome DevTools → **Memory tab** → Take Heap Snapshot, compare over time
- Look for growing **retained size** in heap snapshots

**💡 Important Interview Tips:**
- In React/SPA: always clean up effects (`useEffect` return), subscriptions, timers
- `WeakMap`/`WeakSet` are designed for cases where you don't want to prevent GC
- Memory leaks show up as **gradual slowdown** in long-running SPAs

**⚠️ Common Mistakes:**
- Forgetting `removeEventListener` when dynamically adding/removing DOM
- Not returning cleanup functions from React `useEffect`

**🔁 Follow-up Questions:**
- How do you use Chrome DevTools to find a memory leak?
- What is a `WeakRef` in JavaScript?

---

### Q185 — What is debounce vs throttle?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Performance Optimization |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the difference between debounce and throttle? When do you use each?"*

---

**📖 Answer:**

Both limit how often a function runs, but differently:

| | Debounce | Throttle |
|-|----------|----------|
| **Runs when** | After user STOPS for X ms | At most once every X ms |
| **Use case** | Search input, form validation | Scroll, resize, mousemove |
| **Behavior** | Resets timer on each call | Ignores calls within interval |

---

**Timeline Visualization:**

```
User events:  ─▼──▼──▼──▼──────▼──▼──▼──────────
              (fast typing)

Debounce(300ms):
              ──────────────────●──────────────●
              (fires only after 300ms silence)

Throttle(300ms):
              ─●──────────────●──────────────●
              (fires once per 300ms window)
```

---

**💻 JavaScript Code Example:**

```javascript
// Debounce
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Usage
const onSearch = debounce((val) => fetchResults(val), 300);
const onScroll = throttle(() => updatePosition(), 100);
```

---

**🌍 Real-World Example:**
- **Debounce:** Search bar — wait until user stops typing before hitting the API
- **Throttle:** Infinite scroll — check scroll position at most every 100ms

**💡 Important Interview Tips:**
- Debounce = "wait for calm"; Throttle = "pace it out"
- Most interviewers ask you to **implement** one from scratch — memorize both
- Lodash has `_.debounce` and `_.throttle` — mention it but know the implementation

**⚠️ Common Mistakes:**
- Using debounce for scroll (janky UX) or throttle for search (too many API calls)
- Forgetting to use `.apply(this, args)` to preserve context

**🔁 Follow-up Questions:**
- How would you add a `leading` option (fire immediately on first call)?
- What is the difference between trailing and leading debounce?

---

### Q186 — What is the Browser Rendering Pipeline?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Browser Rendering |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Walk me through how a browser renders a webpage from HTML to pixels."*

---

**📖 Answer:**

The browser follows a **Critical Rendering Path** — a sequence of steps to convert HTML/CSS/JS into pixels on screen.

---

**Rendering Pipeline:**

```
HTML          CSS            JavaScript
  │             │                │
  ▼             ▼                │
 DOM          CSSOM              │
  │             │                │
  └──────┬──────┘                │
         ▼                       │
    Render Tree  ◄────────── JS can modify DOM/CSSOM
         │
         ▼
      Layout   ← Calculate element positions & sizes (Reflow)
         │
         ▼
      Paint    ← Fill in pixels (color, text, images)
         │
         ▼
    Composite  ← Layer compositing (GPU handles this)
         │
         ▼
      Screen 🖥️
```

---

**💻 JavaScript Code Example:**

```javascript
// JS that triggers layout (reflow) — expensive!
const el = document.getElementById("box");
el.style.width = "500px";          // invalidates layout
const width = el.offsetWidth;      // forces synchronous layout read
el.style.height = width + "px";    // triggers layout again
// This pattern (read-write-read-write) is called Layout Thrashing ❌

// ✅ Batch reads before writes
const width = el.offsetWidth;      // read first
el.style.width = "500px";          // then write
el.style.height = width + "px";
```

---

**💡 Important Interview Tips:**
- **DOM + CSSOM → Render Tree** — only visible elements are included
- Render-blocking resources: CSS blocks rendering, `<script>` blocks HTML parsing
- Use `defer` or `async` attributes on scripts to avoid blocking

**⚠️ Common Mistakes:**
- Not understanding that `<link rel="stylesheet">` is render-blocking
- Triggering layout thrashing by interleaving DOM reads and writes

**🔁 Follow-up Questions:**
- What is the critical rendering path?
- How does `will-change` CSS property help performance?

---

### Q187 — What is the difference between Reflow and Repaint?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Browser Rendering · Performance |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is reflow and repaint? Which is more expensive?"*

---

**📖 Answer:**

| | Reflow (Layout) | Repaint |
|-|-----------------|---------|
| **What** | Recalculate geometry (position, size) | Redraw visual appearance (color, shadow) |
| **When** | Add/remove DOM, resize, font change | Color change, visibility, background |
| **Cost** | ⚠️ Very expensive — cascades to children | Less expensive than reflow |
| **Triggers repaint?** | Yes, always | Not always |

---

**💻 JavaScript Code Example:**

```javascript
const box = document.getElementById("box");

// ❌ Triggers REFLOW (expensive) + repaint
box.style.width = "300px";      // geometry changed
box.style.marginLeft = "50px";  // geometry changed

// ❌ Triggers REPAINT only (cheaper)
box.style.color = "red";        // no layout change
box.style.backgroundColor = "blue";

// ✅ Use CSS classes instead of inline styles — one reflow
box.classList.add("expanded"); // applies all changes at once
```

---

**💡 Important Interview Tips:**
- Use **`transform` and `opacity`** for animations — they skip layout and paint, going straight to the **compositor** (GPU) — extremely fast
- Reading properties like `offsetWidth`, `scrollTop`, `getBoundingClientRect()` **forces synchronous reflow**
- Batch DOM changes using `documentFragment` or class toggling

**⚠️ Common Mistakes:**
- Animating `left/top` instead of `transform: translate()` — triggers reflow every frame
- Reading layout properties inside a loop → catastrophic performance

**🔁 Follow-up Questions:**
- What CSS properties trigger compositing only (no reflow/repaint)?
- What is layout thrashing?

---

### Q188 — What is `requestAnimationFrame`?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Browser Rendering · Web APIs |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is `requestAnimationFrame` and why should you use it for animations instead of `setTimeout`?"*

---

**📖 Answer:**

`requestAnimationFrame(callback)` schedules a callback to run **just before the browser's next repaint** (~60fps = every ~16.67ms). It's synchronized with the display refresh rate, giving smooth animations and better performance.

---

**Comparison:**

| | `setTimeout(fn, 16)` | `requestAnimationFrame` |
|-|---------------------|------------------------|
| Timing | Approximate (~16ms) | Exact — synced to display |
| Tab hidden | Still runs (wastes CPU) | **Paused automatically** |
| Smoothness | Can skip/drop frames | Perfectly smooth |
| Battery | Higher drain | Optimized |

---

**💻 JavaScript Code Example:**

```javascript
// ❌ setTimeout — imprecise, wastes battery when tab hidden
function animateBad() {
  box.style.left = parseInt(box.style.left) + 1 + "px";
  setTimeout(animateBad, 16);
}

// ✅ requestAnimationFrame — smooth and efficient
function animateGood(timestamp) {
  box.style.transform = `translateX(${timestamp / 10}px)`;
  requestAnimationFrame(animateGood); // schedule next frame
}
requestAnimationFrame(animateGood);

// Cancel animation
const id = requestAnimationFrame(animateGood);
cancelAnimationFrame(id);
```

---

**💡 Important Interview Tips:**
- `rAF` callback receives a **DOMHighResTimeStamp** — use it for delta-time calculations
- When the tab is hidden, `rAF` is paused — saves CPU and battery
- For pure CSS animations (transform/opacity), prefer CSS over JS — even more efficient

**⚠️ Common Mistakes:**
- Using `setTimeout(fn, 16)` for animations — jittery and battery-hungry
- Not cancelling `rAF` when the animation is done (memory/CPU drain)

**🔁 Follow-up Questions:**
- Where does `requestAnimationFrame` sit in the event loop? (After microtasks, before the next frame paint)

---

### Q189 — What is XSS and how do you prevent it?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Security Best Practices |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is Cross-Site Scripting (XSS)? How does it work and how do you prevent it?"*

---

**📖 Answer:**

**XSS (Cross-Site Scripting)** is a security vulnerability where an attacker injects malicious JavaScript into a web page, which then runs in other users' browsers — potentially stealing cookies, session tokens, or performing actions as the user.

---

**Types of XSS:**

| Type | How |
|------|-----|
| **Stored XSS** | Malicious script saved in DB, served to all users |
| **Reflected XSS** | Script in URL parameter, reflected back by server |
| **DOM-based XSS** | JS reads attacker-controlled data and inserts it into DOM |

---

**💻 JavaScript Code Example:**

```javascript
// ❌ DOM XSS Vulnerability
const name = new URLSearchParams(location.search).get("name");
document.body.innerHTML = "Hello " + name;
// If URL is: ?name=<script>stealCookies()</script> → ATTACK!

// ✅ Safe — use textContent instead of innerHTML
document.getElementById("greeting").textContent = "Hello " + name;

// ✅ Sanitize if you need HTML
import DOMPurify from "dompurify";
el.innerHTML = DOMPurify.sanitize(userInput);
```

---

**Prevention Checklist:**
- Use `textContent` instead of `innerHTML` for user data
- **Content Security Policy (CSP)** headers — restrict script sources
- Sanitize with libraries like **DOMPurify** if HTML rendering is needed
- Escape user data on the server before rendering
- `HttpOnly` cookies — JS can't access them even if XSS occurs

**💡 Important Interview Tips:**
- XSS is in **OWASP Top 10** — every senior engineer must know it
- React, Vue, Angular **auto-escape** content — but `dangerouslySetInnerHTML` bypasses this!
- CSP is the strongest defense at the browser level

**⚠️ Common Mistakes:**
- Using `innerHTML` with any user-controlled data
- Thinking frameworks protect you completely — `dangerouslySetInnerHTML` is a bypass

**🔁 Follow-up Questions:**
- What is Content Security Policy (CSP)?
- How does `HttpOnly` protect against XSS?

---

### Q190 — What is CSRF and how do you prevent it?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Security Best Practices |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is CSRF? How is it different from XSS and how do you prevent it?"*

---

**📖 Answer:**

**CSRF (Cross-Site Request Forgery)** tricks a logged-in user's browser into sending an unwanted request to a trusted site. Since cookies are sent automatically, the server can't tell it's not the real user.

**XSS vs CSRF:**

| | XSS | CSRF |
|-|-----|------|
| **Attacks** | User's browser | Server via user's auth |
| **Injects** | Malicious JS | Unauthorized requests |
| **Requires** | Running JS on target site | Just a logged-in session |

---

**💻 JavaScript Code Example:**

```javascript
// Attacker's site sends a hidden form to victim's bank:
// <form action="https://bank.com/transfer" method="POST">
//   <input name="amount" value="10000">
//   <input name="to" value="attacker">
// </form>
// User visits attacker's page → form auto-submits with their session!

// ✅ Prevention 1: CSRF Token
// Server generates a unique token per session
// Client sends it in header:
fetch("/api/transfer", {
  method: "POST",
  headers: {
    "X-CSRF-Token": getCsrfToken(), // server validates this
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ amount: 100 })
});

// ✅ Prevention 2: SameSite Cookie
// Set-Cookie: session=abc; SameSite=Strict
// Cookie not sent on cross-site requests
```

---

**💡 Important Interview Tips:**
- **CSRF tokens** and **SameSite cookies** are the main defenses
- Modern browsers default `SameSite=Lax` — prevents most CSRF
- CSRF only works on state-changing requests (POST, PUT, DELETE) — not GET

**⚠️ Common Mistakes:**
- Confusing CSRF with XSS — completely different attack vectors
- Assuming GET requests are safe from CSRF — they are, but protect all mutations

**🔁 Follow-up Questions:**
- What does `SameSite=Strict` vs `SameSite=Lax` mean?
- How do CORS headers relate to CSRF protection?

---

### Q191 — What is the Module Pattern in JavaScript?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Design Patterns |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What is the Module Pattern? What problem does it solve?"*

---

**📖 Answer:**

The **Module Pattern** uses closures to create **private state** and expose only a public API. It solves the problem of global namespace pollution and data encapsulation before ES6 modules.

---

**💻 JavaScript Code Example:**

```javascript
// Classic Module Pattern (IIFE)
const Counter = (() => {
  let count = 0; // private

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
})();

Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 2
console.log(Counter.count);      // undefined — private! ✅
```

---

**Modern equivalent with ES6 modules:**

```javascript
// counter.js
let count = 0; // module-scoped (private)

export const increment = () => count++;
export const getCount = () => count;

// main.js
import { increment, getCount } from "./counter.js";
```

---

**💡 Important Interview Tips:**
- Module Pattern was the pre-ES6 solution to `import/export`
- Still relevant for understanding closures and encapsulation
- **Revealing Module Pattern** explicitly lists what to expose in the return object

**⚠️ Common Mistakes:**
- Thinking ES6 `import/export` makes the Module Pattern obsolete for interviews — it's still asked
- Forgetting that IIFE executes immediately — it's not just a definition

**🔁 Follow-up Questions:**
- What is the Revealing Module Pattern?
- How do ES6 modules differ from the Module Pattern?

---

### Q192 — What is the Observer / Pub-Sub Pattern?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Design Patterns |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Explain the Observer pattern and the Pub-Sub pattern. How are they different?"*

---

**📖 Answer:**

| | Observer | Pub-Sub |
|-|----------|---------|
| **Structure** | Subject knows its observers | Publisher/Subscriber via event bus |
| **Coupling** | Direct reference (tighter) | Decoupled via broker (looser) |
| **Example** | `addEventListener` | Redux store, `EventEmitter` |

---

**💻 JavaScript Code Example:**

```javascript
// Observer Pattern
class EventEmitter {
  constructor() { this.listeners = {}; }

  on(event, fn) {
    (this.listeners[event] = this.listeners[event] || []).push(fn);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  }
}

const emitter = new EventEmitter();
emitter.on("data", val => console.log("Received:", val));
emitter.emit("data", 42); // "Received: 42"
```

---

**🌍 Real-World Example:**

- DOM `addEventListener` / `removeEventListener` — Observer pattern
- Redux `store.subscribe()` — Observer pattern
- Node.js `EventEmitter` — Pub-Sub
- RxJS Observables — extended Observer pattern

**💡 Important Interview Tips:**
- Observer pattern is the foundation of **reactive programming**
- Both patterns enable **loose coupling** — components don't need to know about each other
- React's `useEffect` + state changes is observer-like in behavior

**⚠️ Common Mistakes:**
- Not cleaning up observers/listeners — leads to memory leaks and duplicate callbacks

**🔁 Follow-up Questions:**
- How would you implement an `off()` (unsubscribe) method?
- How does RxJS use the Observer pattern?

---

## 🔴 ADVANCED QUESTIONS

---

### Q193 — Tricky: What is `typeof null`?

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Tricky JavaScript |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What does `typeof null` return and why?"*

---

**📖 Answer:**

`typeof null` returns `"object"` — which is widely considered a **historical bug in JavaScript** that was never fixed to maintain backward compatibility.

---

**💻 JavaScript Code Example:**

```javascript
console.log(typeof null);        // "object" ← famous bug!
console.log(typeof undefined);   // "undefined"
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof Symbol());    // "symbol"
console.log(typeof function(){}); // "function"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (arrays too!)
```

**✅ Correct null check:**

```javascript
// ❌ Wrong
if (typeof value === "object") { } // includes null!

// ✅ Correct null check
if (value === null) { }

// ✅ Check for real object (not null)
if (value !== null && typeof value === "object") { }
```

---

**🧠 Why does this happen?**

In JS's original implementation (1995), values were stored as a type tag + value. `null` was represented as `0x00` (null pointer) — the same type tag as objects (`0`). The bug was never patched.

**💡 Important Interview Tips:**
- This is one of the **most famous JS quirks** — every senior engineer knows it
- `Array.isArray([])` is better than `typeof` for arrays
- `Object.prototype.toString.call(value)` gives a more accurate type string

**⚠️ Common Mistakes:**
- Using `typeof x === "object"` as a null check — includes `null`!
- Not knowing this is a bug vs. intentional behavior

**🔁 Follow-up Questions:**
- What does `typeof []` return?
- How do you properly check if something is a plain object?

---

### Q194 — Tricky: Loose vs Strict Equality Edge Cases

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Tricky JavaScript |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What are the tricky equality comparison results in JavaScript? When does `==` surprise you?"*

---

**📖 Answer:**

`==` (loose equality) performs **type coercion** — it converts types before comparing. This leads to surprising results. `===` (strict equality) checks both value and type — always preferred.

---

**💻 JavaScript Code Example:**

```javascript
// Surprising == results
console.log(0 == false);        // true  (false → 0)
console.log("" == false);       // true  ("" → 0, false → 0)
console.log(null == undefined); // true  (special rule)
console.log(null == 0);         // false (null only == undefined)
console.log(NaN == NaN);        // false (NaN is never equal to anything!)

console.log([] == false);       // true  ([] → "" → 0, false → 0)
console.log([] == ![]);         // true  (famously bizarre!)
console.log({} == false);       // false

// NaN check
console.log(Number.isNaN(NaN)); // true ✅ (use this)
console.log(isNaN("hello"));    // true ❌ (coerces first — misleading)
```

---

**`[] == ![]` Breakdown:**

```
[] == ![]
[] == false          // ![] → false ([] is truthy)
[] == 0              // false → 0
"" == 0              // [] → "" (toString)
0 == 0               // "" → 0
true ✅ (wat!)
```

---

**💡 Important Interview Tips:**
- **Always use `===`** in production code — no coercion surprises
- `null == undefined` is `true` with `==` — useful for "null or undefined" checks
- `NaN !== NaN` — use `Number.isNaN()` or `Object.is(NaN, NaN)` → `true`

**⚠️ Common Mistakes:**
- Using `isNaN()` instead of `Number.isNaN()` — former coerces strings
- Not knowing `null == undefined` but `null !== 0`

**🔁 Follow-up Questions:**
- When would you intentionally use `==` instead of `===`?
- What does `Object.is()` do differently from `===`?

---

### Q195 — Output: Hoisting with `let`, `var`, and `function`

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Tricky JavaScript · Output |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the output of this code? Explain hoisting."*

```javascript
console.log(a);
console.log(b);
console.log(c());

var a = 1;
let b = 2;
function c() { return "c called"; }
```

---

**📖 Answer:**

**Output:**
```
undefined
ReferenceError: Cannot access 'b' before initialization
"c called"
```

---

**🧠 Hoisting Rules:**

| Declaration | Hoisted? | Initialized? |
|-------------|----------|-------------|
| `var` | ✅ Yes | `undefined` |
| `let` / `const` | ✅ Yes (TDZ) | ❌ No — Temporal Dead Zone |
| `function` declaration | ✅ Yes | ✅ Fully — callable immediately |
| `function` expression | Like `var`/`let` | Like `var`/`let` |

---

**Temporal Dead Zone (TDZ):**

```
Start of scope
     │
     │  ← TDZ for 'b' begins here
     │  ← accessing 'b' throws ReferenceError
     │
let b = 2;  ← TDZ ends, 'b' is initialized
     │
     │  ← safe to use 'b' here
```

---

**💻 JavaScript Code Example:**

```javascript
// var — hoisted as undefined
console.log(x); // undefined (not ReferenceError)
var x = 5;

// let — TDZ
console.log(y); // ReferenceError
let y = 5;

// function declaration — fully hoisted
greet(); // "Hello!" — works before definition
function greet() { console.log("Hello!"); }

// function expression — NOT fully hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() { console.log("Hi"); };
```

---

**💡 Important Interview Tips:**
- TDZ exists to catch bugs — accessing `let`/`const` before declaration is almost always a mistake
- Function **declarations** are fully hoisted; function **expressions** are not
- `class` declarations also have TDZ like `let`

**⚠️ Common Mistakes:**
- Thinking `let` is "not hoisted" — it IS hoisted, just not initialized (TDZ)
- Confusing function declarations with function expressions for hoisting

**🔁 Follow-up Questions:**
- What is the Temporal Dead Zone?
- Does `const` hoist differently from `let`?

---

### Q196 — Singleton and Factory Design Patterns

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Design Patterns |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"Explain the Singleton and Factory patterns with JavaScript examples."*

---

**📖 Answer:**

**Singleton:** Ensures only **one instance** of a class/object exists. Subsequent calls return the same instance.

**Factory:** A function/class that **creates objects** without exposing instantiation logic — returns different types based on input.

---

**💻 JavaScript Code Example:**

```javascript
// Singleton Pattern
const Database = (() => {
  let instance;
  function createInstance() {
    return { connection: "db://localhost", query: (q) => `result: ${q}` };
  }
  return {
    getInstance() {
      if (!instance) instance = createInstance();
      return instance;
    }
  };
})();

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true — same instance ✅
```

```javascript
// Factory Pattern
function createAnimal(type) {
  const animals = {
    dog: { sound: "Woof", legs: 4 },
    bird: { sound: "Tweet", legs: 2 },
    fish: { sound: "...", legs: 0 }
  };
  return animals[type] || null;
}

const dog = createAnimal("dog");
console.log(dog.sound); // "Woof"
```

---

**🌍 Real-World Example:**
- **Singleton:** App config, logger, database connection pool
- **Factory:** `React.createElement()`, `document.createElement()`, notification systems

**💡 Important Interview Tips:**
- Singleton in JS is often just a module — `import` is cached, making it a natural singleton
- Factory pattern enables **polymorphism without inheritance**
- Know both the classic and modern ES6 class-based versions

**⚠️ Common Mistakes:**
- Singleton in multi-threaded environments (not an issue in JS, but worth mentioning)
- Using Singleton everywhere — creates tight coupling and makes testing hard

**🔁 Follow-up Questions:**
- How do ES6 modules act as Singletons?
- What is the Abstract Factory pattern?

---

### Q197 — Real-world: Web Workers for heavy computation

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Performance · Web APIs |
| **Frequency** | ⭐⭐⭐⭐ Common |

**❓ Interview Question:**
> *"What are Web Workers? When and how would you use one?"*

---

**📖 Answer:**

**Web Workers** run JavaScript in a **background thread**, separate from the main UI thread. They're used for CPU-intensive tasks (data processing, image manipulation, complex calculations) that would otherwise block the UI and make it unresponsive.

---

**Worker Communication Diagram:**

```
Main Thread                    Worker Thread
────────────                   ─────────────
UI + Event Loop                Background computation
      │                               │
      │──postMessage(data)──────────►│
      │                               │ (heavy work)
      │◄─────────────onmessage(result)│
      │                               │
   Update UI                    No DOM access
```

---

**💻 JavaScript Code Example:**

```javascript
// worker.js
self.onmessage = function (e) {
  const result = heavyCalc(e.data); // CPU-intensive work
  self.postMessage(result);
};

function heavyCalc(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
}

// main.js
const worker = new Worker("worker.js");

worker.postMessage(1_000_000_000); // send data to worker

worker.onmessage = function (e) {
  console.log("Result:", e.data); // receive result
};

worker.onerror = (err) => console.error("Worker error:", err);

// Terminate when done
// worker.terminate();
```

---

**💡 Important Interview Tips:**
- Workers **cannot access the DOM** — communication is via `postMessage` only
- Data is **copied** (structured clone), not shared — except `SharedArrayBuffer`
- Use `transferable objects` (e.g., `ArrayBuffer`) for zero-copy transfer of large data

**⚠️ Common Mistakes:**
- Trying to access `document` or `window` inside a Worker — throws error
- Creating a new worker for every tiny task — high overhead; reuse workers

**🔁 Follow-up Questions:**
- What is a Service Worker and how is it different from a Web Worker?
- What is `SharedArrayBuffer`?

---

### Q198 — V8 Hidden Classes and Inline Caching

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | JavaScript Engine · Performance |
| **Frequency** | ⭐⭐⭐ Moderate |

**❓ Interview Question:**
> *"What are hidden classes in V8? How do they affect performance?"*

---

**📖 Answer:**

V8 creates **hidden classes** (internal structure descriptors) for objects to optimize property access. Objects with the same shape (properties added in the same order) share a hidden class, enabling **inline caching** — extremely fast property lookups.

---

**Hidden Class Flow:**

```
let obj = {};           → HiddenClass C0 (empty)
obj.x = 1;             → HiddenClass C1 (has x)
obj.y = 2;             → HiddenClass C2 (has x, y)

let obj2 = {};
obj2.x = 10;           → HiddenClass C1 (shared!)
obj2.y = 20;           → HiddenClass C2 (shared!)

→ Same hidden class → V8 can inline-cache property access = FAST ⚡
```

---

**💻 JavaScript Code Example:**

```javascript
// ✅ FAST — consistent shape, shared hidden class
function Point(x, y) {
  this.x = x;  // always add in same order
  this.y = y;
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4); // shares hidden class with p1

// ❌ SLOW — different shapes, different hidden classes
const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 }; // different insertion order → different hidden class!

// ❌ SLOW — dynamic deletion breaks hidden class
delete p1.x; // V8 has to create a new hidden class for p1
```

---

**💡 Important Interview Tips:**
- Initialize all object properties in the **constructor** in the same order every time
- Avoid `delete` — reassign to `null` or `undefined` instead
- Avoid mixing types for the same property (`obj.count = 1` then `obj.count = "one"`)

**⚠️ Common Mistakes:**
- Adding properties conditionally in different orders across code paths
- Using `delete` thinking it's a performance-neutral cleanup

**🔁 Follow-up Questions:**
- What is inline caching (IC) in V8?
- How does monomorphic vs polymorphic code affect JIT?

---

### Q199 — Tricky: Closure + Loop Variable Capture

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Tricky JavaScript · Closures |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"What is the output of this code? How do you fix it?"*

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

---

**📖 Answer:**

**Output:**
```
3
3
3
```

Not `0, 1, 2` as most people expect!

---

**🧠 Why?**

`var` is **function-scoped** (not block-scoped). All three `setTimeout` callbacks close over the **same `i` variable**. By the time the callbacks run, the loop has completed and `i === 3`.

---

**Three Fixes:**

```javascript
// Fix 1: Use let (block-scoped — new i per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2 ✅
}

// Fix 2: IIFE to capture current value
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 0); // 0, 1, 2 ✅
  })(i);
}

// Fix 3: bind
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 0); // 0, 1, 2 ✅
}
```

---

**💡 Important Interview Tips:**
- This is one of the **most asked JS interview questions** worldwide
- The `let` fix works because `let` creates a new binding per loop iteration
- Understanding this requires knowing both closures AND var/let scoping

**⚠️ Common Mistakes:**
- Not realizing all three callbacks share one `var i`
- Using IIFE fix without understanding why it works (captures by value, not by reference)

**🔁 Follow-up Questions:**
- What if the delay was different for each iteration? Would it change the result?
- What if it were `const` instead of `let` — would the loop work?

---

### Q200 — Real-world: Performance Audit Checklist

| Property | Detail |
|----------|--------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Performance Optimization · Real-world |
| **Frequency** | ⭐⭐⭐⭐⭐ Very Common |

**❓ Interview Question:**
> *"Your web app is slow. Walk me through how you'd diagnose and fix it."*

---

**📖 Answer:**

A methodical performance audit covers loading, scripting, rendering, and network — using both tools and code-level fixes.

---

**Performance Audit Flowchart:**

```
User reports slowness
         │
         ▼
  ┌─────────────────┐
  │  Measure First  │ ← Chrome DevTools, Lighthouse, Web Vitals
  └────────┬────────┘
           │
     ┌─────┴───────────────────────────────────┐
     ▼           ▼              ▼              ▼
[Load slow]  [JS slow]    [Render slow]  [Network slow]
     │           │              │              │
  Code split  Remove        Avoid layout    Lazy load
  Lazy load   blocking JS   thrashing       images
  Cache       Debounce      Use rAF         CDN + cache
  Compress    Web Workers   CSS transforms  HTTP/2
```

---

**💻 JavaScript Code Example:**

```javascript
// ❌ Performance anti-patterns

// 1. Layout thrashing
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + "px"; // read-write in loop!
});

// ✅ Batch reads, then writes
const widths = elements.map(el => el.offsetWidth); // all reads
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + "px";          // all writes
});

// 2. No code splitting
import HugeLibrary from "huge-lib"; // ❌ loads 2MB upfront

// ✅ Dynamic import (code splitting)
const { HugeLibrary } = await import("huge-lib"); // loads on demand
```

---

**Performance Checklist Summary:**

| Area | What to Check | Tool |
|------|--------------|------|
| **Loading** | Bundle size, code splitting, lazy loading | Webpack Bundle Analyzer |
| **Script** | Long tasks (>50ms), blocking JS | DevTools Performance tab |
| **Rendering** | Reflows, FPS, layout thrashing | DevTools Rendering tab |
| **Network** | Caching, compression, CDN, HTTP/2 | Network tab, Lighthouse |
| **Memory** | Leaks, growing heap | DevTools Memory tab |
| **Web Vitals** | LCP, FID/INP, CLS | Lighthouse, CrUX |

**Core Web Vitals:**

```
LCP (Largest Contentful Paint)  < 2.5s   ← Loading performance
INP (Interaction to Next Paint) < 200ms  ← Interactivity
CLS (Cumulative Layout Shift)   < 0.1    ← Visual stability
```

---

**💡 Important Interview Tips:**
- Always say **"measure first, then optimize"** — don't guess
- Mention **Lighthouse** and **Chrome DevTools Performance tab** by name
- Core Web Vitals are Google's ranking signals — mention LCP, INP, CLS

**⚠️ Common Mistakes:**
- Optimizing without measuring — fixing the wrong thing
- Ignoring mobile performance — test on mid-range mobile devices
- Over-optimizing prematurely — clean code first, optimize when needed

**🔁 Follow-up Questions:**
- What is Time to Interactive (TTI)?
- How does tree-shaking help bundle size?
- What is the PRPL pattern?

---

---

## 📌 JAVASCRIPT QUICK REVISION SHEET

---

### ⚡ JavaScript Engine

```
Source → Parser → AST → Interpreter (Bytecode) → JIT Compiler → Machine Code
V8:  Ignition (interpreter) + TurboFan (JIT compiler)
JIT: Compiles "hot" code → deoptimizes if type assumptions break
```

---

### ⚡ Event Loop

```
Priority: Sync Code → Microtasks (ALL) → One Macrotask → Microtasks (ALL) → ...

Microtasks:  Promise.then, queueMicrotask, MutationObserver
Macrotasks:  setTimeout, setInterval, I/O, UI events
```

**Golden Rule:** `setTimeout(fn, 0)` always runs AFTER all Promise callbacks.

---

### ⚡ Garbage Collection

```
Algorithm:  Mark-and-Sweep
Roots:      Global vars, call stack
Collected:  Objects with zero reachable references
WeakMap/WeakSet: Don't prevent GC
```

**Common leak sources:** Timers not cleared, detached DOM refs, forgotten event listeners

---

### ⚡ Performance

| Technique | When |
|-----------|------|
| `debounce` | After user stops (search input) |
| `throttle` | At max rate (scroll, resize) |
| `requestAnimationFrame` | Animations (not setTimeout) |
| `Web Workers` | CPU-heavy computation |
| `transform/opacity` | Animations (compositor only, no reflow) |
| Dynamic `import()` | Code splitting |

---

### ⚡ Browser Rendering

```
HTML → DOM
CSS  → CSSOM
DOM + CSSOM → Render Tree → Layout → Paint → Composite
```

- `transform`/`opacity` → compositor only (GPU, cheapest)
- `color`/`background` → repaint (no layout)
- `width`/`height`/`position` → reflow + repaint (most expensive)

---

### ⚡ Security

| Attack | Prevention |
|--------|-----------|
| XSS | `textContent` over `innerHTML`, CSP, DOMPurify |
| CSRF | CSRF tokens, `SameSite=Strict` cookies |
| Clickjacking | `X-Frame-Options: DENY` |
| Data injection | Input validation, parameterized queries |

---

### ⚡ Design Patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| Module | Encapsulation, private state | IIFE, ES6 modules |
| Singleton | One instance only | Config, DB connection |
| Factory | Object creation abstraction | `createElement` |
| Observer | Event-driven communication | `addEventListener`, Redux |

---

### ⚡ Famous Tricky Answers

```javascript
typeof null           // "object"    ← historical bug
NaN === NaN           // false       ← use Number.isNaN()
[] == ![]             // true        ← coercion madness
typeof []             // "object"    ← use Array.isArray()
null == undefined     // true        ← with ==
null === undefined    // false       ← with ===
0 == false            // true
"" == false           // true
```

---

## 🏆 TOP IMPORTANT CONCEPTS SUMMARY

| # | Concept | Why It Matters |
|---|---------|---------------|
| 1 | Event Loop + Queues | Foundation of all async JS |
| 2 | Microtask vs Macrotask priority | Output questions, debugging |
| 3 | Hoisting (var/let/function) | Interview staple |
| 4 | Closure + loop capture | Classic interview trap |
| 5 | `typeof null === "object"` | Famous JS quirk |
| 6 | Loose equality coercion | Avoid bugs; understand JS |
| 7 | Reflow vs Repaint | Performance optimization |
| 8 | Debounce vs Throttle | Must-implement in interviews |
| 9 | XSS prevention | Security fundamentals |
| 10 | GC + Memory leaks | Production debugging |

---

## 📝 LAST MINUTE INTERVIEW NOTES

```
✅ JS is single-threaded — async via Event Loop, not true parallelism
✅ Microtasks always drain before the next macrotask
✅ typeof null === "object" — it's a bug, not a feature
✅ let/const have TDZ — not uninitialized, just not accessible yet
✅ var in loops with closures → all callbacks share same variable
✅ Fetch doesn't reject on 4xx/5xx — check res.ok manually
✅ JIT compiles hot code — keep types consistent for performance
✅ transform/opacity animations avoid reflow — use them!
✅ Web Workers run in background — no DOM access
✅ Always measure before optimizing — use Lighthouse + DevTools
✅ Singleton via ES modules — imports are cached
✅ CSRF: SameSite + tokens; XSS: CSP + sanitize + textContent
```

---

## ✅ FREQUENTLY ASKED CONCEPTS CHECKLIST

**JavaScript Engine**
- [ ] Know V8, Ignition, TurboFan by name
- [ ] Explain JIT and deoptimization
- [ ] Describe AST purpose
- [ ] Understand hidden classes and inline caching

**Event Loop**
- [ ] Draw the full event loop diagram
- [ ] Explain microtask vs macrotask priority
- [ ] Trace output of mixed sync/Promise/setTimeout code
- [ ] Know what starves the macrotask queue

**Garbage Collection**
- [ ] Explain mark-and-sweep
- [ ] List 4+ causes of memory leaks
- [ ] Know when to use WeakMap/WeakSet
- [ ] Understand generational GC concept

**Performance**
- [ ] Implement debounce from scratch
- [ ] Implement throttle from scratch
- [ ] Explain reflow vs repaint
- [ ] Know which CSS properties trigger each
- [ ] Explain requestAnimationFrame vs setTimeout
- [ ] Know Core Web Vitals (LCP, INP, CLS)

**Security**
- [ ] Explain XSS and 3 prevention methods
- [ ] Explain CSRF and prevention
- [ ] Know what CSP does
- [ ] Know HttpOnly cookies

**Design Patterns**
- [ ] Implement Module pattern
- [ ] Implement Singleton pattern
- [ ] Implement Factory pattern
- [ ] Implement Observer/EventEmitter

**Tricky Questions**
- [ ] `typeof null` → `"object"`
- [ ] `NaN !== NaN` → use `Number.isNaN()`
- [ ] `var` in loop closures → all same value
- [ ] `let` fix for loop closures
- [ ] Hoisting: var=undefined, let=TDZ, fn=full
- [ ] `[] == ![]` → `true`

---

*✅ End of Q176–Q200 | JavaScript Interview Preparation Guide*
*Topics covered: JS Engine · Event Loop · Microtask/Callback Queues · GC · Performance · Security · Browser Rendering · Design Patterns · Tricky JS · Real-world Scenarios*
