// ─── JavaScript Interview Questions (200) ─────────────────────────────────
// Each entry: [question, difficulty, answer?]
export const JS_QUESTIONS = [
  [
    "What is the difference between var, let, and const?",
    "easy",
    "`var` is function-scoped, hoisted and initialized as `undefined`, can be redeclared. `let` is block-scoped, hoisted but not initialized (Temporal Dead Zone), cannot be redeclared in same scope. `const` same as `let` but must be assigned at declaration and cannot be reassigned. Use `const` by default, `let` when rebinding needed, never `var` in modern code."
  ],
  [
    "Explain hoisting in JavaScript.",
    "med",
    "Hoisting moves declarations (not initializations) to top of their scope at compile time. `var` declarations are hoisted and initialized to `undefined`. `let`/`const` hoisted but uninitialized (TDZ). Function declarations are hoisted entirely (can call before definition). Function expressions are NOT hoisted (treated as variable assignment)."
  ],
  [
    "What are closures and how do they work?",
    "hard",
    "A closure is a function that retains access to its outer (lexical) scope even after the outer function has returned. Created automatically when a function is defined inside another function and references outer variables. Enables data privacy (module pattern), factory functions, partial application, and callbacks. Memory cost: each closure retains entire outer scope chain."
  ],
  [
    "What is the event loop in JavaScript?",
    "hard",
    "The event loop coordinates execution between the call stack, microtask queue, and macrotask (callback) queue. Synchronous code runs first on the call stack. Microtasks (Promise.then, queueMicrotask, MutationObserver) run after each macrotask, before next render. Macrotasks (setTimeout, setInterval, I/O, UI events) run one per loop iteration. Order: sync → microtasks → (render) → macrotask → repeat."
  ],
  [
    "Explain the concept of prototypal inheritance.",
    "hard",
    "Every JS object has an internal `[[Prototype]]` link to another object. Property access walks the prototype chain until found or null. `Object.create(proto)` sets prototype directly. Classes are syntactic sugar over prototype chains. `obj.__proto__` is the legacy accessor; `Object.getPrototypeOf()` is the standard way. Prototypal inheritance is more flexible than classical — objects inherit from objects, no classes needed."
  ],
  [
    "What is the difference between == and ===",
    "easy",
    "`==` performs type coercion before comparison (converts operands to same type). `===` is strict equality — no coercion, returns false if types differ. Rule: always use `===` except when explicitly checking for `null` or `undefined` via `== null` (which catches both). `===` is faster and avoids subtle coercion bugs."
  ],
  [
    "What are Promises and how do they work?",
    "med",
    "A Promise represents a future value — a placeholder for an async operation. States: `pending`, `fulfilled` (resolved with a value), or `rejected` (with an error). Created via `new Promise((resolve, reject) => {...})`. Use `.then()` for fulfillment, `.catch()` for rejection, `.finally()` for cleanup. Promises are microtasks and are consumed via `.then` chains or `async/await`. Avoid the explicit construction anti-pattern when possible."
  ],
  [
    "Explain async/await and how it relates to Promises.",
    "med",
    "`async/await` is syntactic sugar over Promises. An `async` function always returns a Promise. `await` pauses execution until a Promise settles (non-blocking — yields to event loop). Error handling uses `try/catch` instead of `.catch()`. Improves readability over raw `.then()` chains, especially for sequential async flows. `await Promise.all([...])` handles concurrency."
  ],
  [
    "What is the difference between null and undefined?",
    "easy",
    "`undefined` means a variable has been declared but not assigned a value (default for uninitialized variables, missing object properties, and function return without `return`). `null` is an intentional absence of a value — must be explicitly assigned. `typeof null` returns `\"object\"` (a legacy bug). `typeof undefined` returns `\"undefined\"`. Loose equality `null == undefined` is `true`; strict `===` is `false`."
  ],
  [
    "What is a higher-order function? Give examples.",
    "med",
    "A higher-order function takes a function as an argument, returns a function, or both. Enables abstraction and composition. Examples: `Array.prototype.map()`, `filter()`, `reduce()`, `setTimeout()`, `addEventListener()`. Custom example: `function multiplyBy(factor) { return (num) => num * factor; }` — returns a new function. Higher-order functions are fundamental to functional programming in JS."
  ],
  [
    "Explain the difference between call, apply, and bind.",
    "hard",
    "All three set `this` explicitly. `func.call(thisArg, arg1, arg2)` — arguments listed individually, invoked immediately. `func.apply(thisArg, [argsArray])` — arguments as an array, invoked immediately. `func.bind(thisArg, arg1, ...)` — returns a new function with bound `this`, NOT invoked immediately. `bind` also supports partial application (pre-filling arguments). Use `call` for known args, `apply` for array-like args, `bind` for deferred calls."
  ],
  [
    "What is the 'this' keyword and how does it behave?",
    "hard",
    "`this` is determined by how a function is CALLED, not where it's defined. Rules: 1) Global context → `window` (or `undefined` in strict mode). 2) Object method → the owning object. 3) Standalone function → `window` (strict: `undefined`). 4) Constructor with `new` → the new instance. 5) Arrow functions → lexical `this` from enclosing scope (cannot be rebound). 6) `call/apply/bind` → explicitly set. Classes: `this` refers to instance."
  ],
  [
    "What is event delegation and why is it useful?",
    "med",
    "Event delegation uses event bubbling to handle events at a parent element instead of attaching listeners to individual children. The parent checks `event.target` to determine the source. Benefits: memory efficiency (fewer listeners), handles dynamically added elements automatically, cleaner code. Example: attaching one `click` listener to a `<ul>` instead of one per `<li>`. Uses `event.target.matches(selector)` for filtering."
  ],
  [
    "What are arrow functions and how are they different from regular functions?",
    "med",
    "Arrow functions: 1) Lexical `this` — inherits from enclosing scope, no own `this`. 2) Cannot be used as constructors (no `new`). 3) No `arguments` object (use rest params). 4) Implicit return for single-expression bodies. 5) Cannot be used as generators. 6) No prototype property. Use arrow functions for callbacks and to preserve `this` context. Use regular functions for methods needing dynamic `this` or constructors."
  ],
  [
    "Explain the concept of scope (global, function, block).",
    "med",
    "Scope determines variable accessibility. Global scope: variables accessible everywhere (declared outside any function/block). Function scope: `var` variables are scoped to the function they're declared in. Block scope: `let` and `const` are scoped to `{}` blocks (if, for, while). Scope chains form a hierarchy — inner scopes can access outer variables but not vice versa. Each new function creates a new scope."
  ],
  [
    "What is the Temporal Dead Zone (TDZ)?",
    "hard",
    "TDZ is the period between entering a scope and the variable's actual declaration where `let` and `const` variables exist but cannot be accessed. Accessing them throws `ReferenceError`. Unlike `var` (initialized with `undefined`), `let`/`const` remain uninitialized until the declaration line. The TDZ starts at the beginning of the block and ends when the variable is declared. `typeof` on a TDZ variable also throws."
  ],
  [
    "What are generators and iterators?",
    "hard",
    "An iterator is an object with a `next()` method returning `{value, done}`. A generator is a function (`function*`) that can pause/resume execution via `yield`. Calling a generator returns an iterator. Generators simplify custom iterables and enable lazy evaluation. Example: `function* idMaker() { let i=0; while(true) yield i++; }`. Use `for...of` to consume. Async generators (`async function*`) yield promises."
  ],
  [
    "What is a WeakMap and WeakSet? When would you use them?",
    "hard",
    "WeakMap/WeakSet hold weak references to keys (objects), meaning they don't prevent garbage collection. Keys must be objects (not primitives). No `size`, no iteration methods (not enumerable). WeakMap use cases: private data (attach metadata to objects without leaking), caching, DOM node metadata. WeakSet use cases: marking/tagging objects, tracking without preventing GC. Ideal for memory-sensitive caches and data hiding."
  ],
  [
    "What is memoization? Implement a simple memoize function.",
    "hard",
    "Memoization caches function results by arguments to avoid recomputation. Useful for expensive pure functions. Simple implementation: `function memoize(fn) { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }; }`. Trade-offs: memory usage, cache invalidation, serialization overhead for complex args."
  ],
  [
    "What are Symbol types used for?",
    "hard",
    "`Symbol()` creates a unique, immutable primitive. Uses: 1) Unique property keys (avoid naming collisions). 2) Defining custom iteration via `Symbol.iterator`. 3) Well-known symbols (`Symbol.toStringTag`, `Symbol.hasInstance`, `Symbol.toPrimitive`) customize object behavior. 4) Private-like properties (not truly private — accessible via `Object.getOwnPropertySymbols()`). 5) Metaprogramming with `Symbol.match`, `Symbol.replace`. Symbols are not auto-converted to strings."
  ],
  [
    "Explain debouncing and throttling with examples.",
    "hard",
    "Debouncing delays execution until after a pause in calls. Use for search inputs (wait until user stops typing). `function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }`. Throttling limits execution to once per interval. Use for scroll/resize handlers. `function throttle(fn, limit) { let inThrottle; return (...args) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }`. Leading vs trailing edge variants exist."
  ],
  [
    "What is the difference between deep copy and shallow copy?",
    "med",
    "Shallow copy: copies top-level properties only. Nested objects are shared by reference (mutations affect original). Methods: spread operator, `Object.assign()`, `Array.slice()`. Deep copy: recursively copies all nested objects/arrays. Methods: `structuredClone()`, `JSON.parse(JSON.stringify(obj))` (loses functions, undefined, symbols, dates become strings), Lodash `_.cloneDeep()`. Deep copies are independent. `structuredClone()` is the modern native choice."
  ],
  [
    "How does JavaScript handle asynchronous operations?",
    "med",
    "JS is single-threaded with a non-blocking concurrency model. Async operations (I/O, timers, network requests) are delegated to the environment (browser/Node.js). Callbacks were the original pattern, leading to callback hell. Promises provide `.then()/.catch()` chaining. `async/await` provides synchronous-looking syntax. The event loop coordinates execution order between sync code, microtasks (promises), and macrotasks (timers, I/O)."
  ],
  [
    "What is the difference between setTimeout and setInterval?",
    "easy",
    "`setTimeout(fn, delay)` runs the function once after `delay` milliseconds. `setInterval(fn, interval)` repeatedly runs the function every `interval` milliseconds. Both return an ID to cancel with `clearTimeout()`/`clearInterval()`. `setInterval` doesn't account for execution time — overlapping calls can occur. Prefer recursive `setTimeout` for guaranteed gaps: `function tick() { setTimeout(tick, delay); }`. Minimum delay is ~4ms after nesting."
  ],
  [
    "Explain how the prototype chain works.",
    "hard",
    "Every object has a `[[Prototype]]` (accessed via `Object.getPrototypeOf()`) referencing another object. When accessing a property, JS first checks the object itself, then walks up the prototype chain until found or `null` is reached. Multiple objects can share the same prototype for memory efficiency. The chain ends at `Object.prototype` whose prototype is `null`. `obj.__proto__` is the legacy setter/getter. `class` syntax sets up prototype chains automatically."
  ],
  [
    "What is currying in JavaScript?",
    "hard",
    "Currying transforms a function that takes multiple arguments into a sequence of functions each taking one argument. `function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn(...args); return (...more) => curried(...args, ...more); }; }`. Benefits: partial application, function composition, reusable parameter factories. Compare to partial application (pre-filling some args) — currying is a specific form of partial application."
  ],
  [
    "What are pure functions and side effects?",
    "med",
    "Pure functions: 1) Same input always returns same output (referential transparency). 2) No side effects (no mutation of external state, no I/O, no DOM changes). Side effects: modifying global variables, DOM manipulation, API calls, file I/O, `console.log`, `Math.random()`, `Date.now()`. Benefits of purity: testability, predictability, caching/memoization, parallel execution safety. React's reducer functions must be pure."
  ],
  [
    "Explain destructuring assignment in ES6.",
    "med",
    "Destructuring unpacks values from arrays/objects into variables. Array: `const [a, b, ...rest] = [1, 2, 3, 4]`. Object: `const { name, age } = person`. Supports defaults: `const { x = 5 } = obj`. Renaming: `const { name: userName } = obj`. Nested destructuring: `const { address: { city } } = obj`. Function parameters: `function f({ name, age }) {}`. Swap values: `[a, b] = [b, a]`."
  ],
  [
    "What are template literals and tagged templates?",
    "med",
    "Template literals use backticks and support interpolation (`${expr}`) and multi-line strings. Tagged templates call a function with parsed template strings: `function tag(strings, ...values) { return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), ''); }`. Use cases: escaping HTML, internationalization (i18n), styled-components in CSS-in-JS, SQL query building. Raw strings accessible via `String.raw`."
  ],
  [
    "What is the spread and rest operator?",
    "med",
    "Both use `...` syntax. Spread expands an iterable into individual elements: `const b = [...arr]`, `const obj2 = {...obj1}`, `Math.max(...nums)`. Rest collects remaining elements into an array: `function f(a, b, ...rest) {}`, `const [first, ...rest] = arr`. Spread is used in array/object literals and function calls. Rest is used in function parameters and destructuring patterns. Both enable immutable data operations."
  ],
  [
    "What is optional chaining (?.) and nullish coalescing (??)",
    "med",
    "Optional chaining `?.` short-circuits if the value is `null`/`undefined`: `obj?.prop`, `arr?.[i]`, `func?.()`. Returns `undefined` instead of throwing. Nullish coalescing `??` returns the right operand only when left is `null`/`undefined` (unlike `||` which also treats `0`, `''`, `false` as falsy). Use `??` for default values when `0`/`''` are valid inputs. Combine: `obj?.prop ?? defaultVal`."
  ],
  [
    "Explain Map vs Object in JavaScript.",
    "med",
    "Map: keys can be any type (objects, functions, primitives), maintains insertion order, has `.size`, iterable directly, better performance for frequent add/delete operations. Object: keys are strings/Symbols only, order is complex (integer-like keys first), not directly iterable, prototype chain can cause collisions. Use Map for dictionaries, caches, or dynamic key collections. Use Object for structured data, serialization, or when prototype methods are needed."
  ],
  [
    "What is Set and how is it different from Array?",
    "easy",
    "Set stores unique values of any type. No duplicates, maintains insertion order, iterable, has `.size` (not `.length`). Methods: `.add()`, `.has()`, `.delete()`, `.clear()`. Array allows duplicates, has index-based access, more methods (`.map()`, `.filter()`, `.reduce()`). Set is optimal for deduplication: `[...new Set(arr)]`. Use Set when order doesn't matter, uniqueness is required, or for faster `.has()` lookups (O(1) vs O(n))."
  ],
  [
    "What is the Proxy object in JavaScript?",
    "hard",
    "`Proxy` wraps an object to intercept operations via handler traps (get, set, has, deleteProperty, apply, construct, etc.). Example: `new Proxy(target, { get(obj, prop) { return prop in obj ? obj[prop] : 'default'; } })`. Use cases: validation, logging, reactive programming (Vue 3), access control, auto-prefilling properties, undo/redo. Proxies are transparent — `typeof` and instanceof work normally. Performance overhead compared to direct access."
  ],
  [
    "How does JavaScript's garbage collection work?",
    "hard",
    "JS uses automatic memory management via garbage collection. The mark-and-sweep algorithm: marks reachable objects (from roots: global object, current call stack, closures), then sweeps unmarked objects. A modern optimization is generational collection (V8's Orinoco): young generation (frequent minor GC for short-lived objects) and old generation (infrequent major GC). Weak references (WeakMap/WeakSet) don't prevent collection. Memory leaks occur via unintended global variables, forgotten timers, detached DOM nodes, and closures retaining large objects."
  ],
  [
    "What is an IIFE and when would you use it?",
    "med",
    "IIFE (Immediately Invoked Function Expression) is a function defined and executed immediately: `(function() { ... })()` or `(() => { ... })()`. Creates a private scope to avoid polluting the global namespace. Use cases: module pattern before ES modules, async IIFE for top-level await in older code, creating private variables and functions, running initialization code once. Still useful in non-module scripts and for isolating code in complex pages."
  ],
  [
    "What is the difference between synchronous and asynchronous code?",
    "easy",
    "Synchronous code executes sequentially — each operation blocks until complete. Asynchronous code allows other operations to run while waiting for tasks to complete (non-blocking). Sync is simpler and predictable. Async is essential for I/O, network requests, timers, and user interactions. JS uses the event loop, callbacks, Promises, and async/await to handle async operations while maintaining a single thread."
  ],
  [
    "Explain the concept of coercion in JavaScript.",
    "med",
    "Type coercion is automatic conversion between types. Explicit coercion (type casting): `Number('123')`, `String(42)`, `Boolean(0)`. Implicit coercion: JS automatically converts types based on context (loose equality, arithmetic, conditionals). Common pitfalls: `[] + []` → `\"\"`, `[] + {}` → `\"[object Object]\"`, `null == 0` → `false`. Abstract operations: ToPrimitive (valueOf → toString for objects), ToNumber, ToString. Use explicit coercion and `===` to avoid surprises."
  ],
  [
    "What is the module system in JavaScript (CommonJS vs ES Modules)?",
    "med",
    "CommonJS (Node.js default): `require()` / `module.exports`. Synchronous, dynamic (can import conditionally at runtime), `module.exports` is an object. ES Modules (modern standard): `import` / `export`. Static (imports resolved at parse time — enables tree shaking), asynchronous (better for browsers), supports named and default exports, top-level `await`. ESM files use `type: \"module\"` in package.json or `.mjs` extension. ESM is the future — CommonJS is legacy."
  ],
  [
    "What is tree shaking?",
    "med",
    "Tree shaking is dead-code elimination during bundling. ES module's static import structure lets bundlers (Webpack, Rollup, Vite) detect and remove unused exports. Only `import`/*export* statements (not `require()`) enable tree shaking. Side effects in modules can prevent shaking — declare `\"sideEffects\": false` in package.json. Named imports enable better shaking than default imports. Reduces bundle size by eliminating unused code."
  ],
  [
    "Explain the difference between Array.map, Array.filter, and Array.reduce.",
    "med",
    "`.map(fn)` transforms each element and returns a new array of the same length. `.filter(fn)` returns a new array with elements that pass the test. `.reduce(fn, initial)` accumulates values into any type (number, object, array). All three are pure (don't mutate original array). chaining: `arr.map(...).filter(...).reduce(...)` is common. `.reduce` can implement map/filter internally. Prefer the specific method for readability."
  ],
  [
    "What is Array.flat() and Array.flatMap()?",
    "med",
    "`.flat(depth)` flattens nested arrays to a specified depth (default 1). Infinity for fully flat. Removes empty slots. `.flatMap(fn)` maps each element then flattens by 1 level — more efficient than `map().flat()`. Use flatMap when each element produces zero, one, or multiple output elements. Example: `['hello world', 'foo bar'].flatMap(s => s.split(' '))` → `['hello', 'world', 'foo', 'bar']`."
  ],
  [
    "How does Object.freeze() differ from const?",
    "med",
    "`const` prevents reassignment of the variable binding (cannot use `=` operator). The object itself can still be mutated. `Object.freeze(obj)` makes the object's properties immutable — cannot add/delete/change properties (shallow only: nested objects remain mutable). `const + Object.freeze` together give immutable bindings to frozen objects. `Object.isFrozen()` checks status. For deep immutability, use recursive freezing or libraries like Immer."
  ],
  [
    "What is the difference between Object.keys, Object.values, Object.entries?",
    "easy",
    "All three return arrays of an object's own enumerable properties (not inherited). `Object.keys(obj)` → array of property names (strings). `Object.values(obj)` → array of property values. `Object.entries(obj)` → array of `[key, value]` pairs. Useful with `for...of`, `Object.fromEntries()` reverses `.entries()`. Example: `Object.entries(obj).forEach(([k, v]) => ...)`."
  ],
  [
    "What is a Proxy and Reflect in JavaScript?",
    "hard",
    "`Proxy` intercepts object operations via traps. `Reflect` provides methods that correspond to Proxy traps (e.g., `Reflect.get()`, `Reflect.set()`), enabling default behavior in Proxy handlers. Always use `Reflect` methods inside Proxy traps to preserve default behavior (including `this` binding and internal methods). Example: `get(target, prop, receiver) { return Reflect.get(...arguments); }`. `Reflect` methods replace legacy patterns: `Reflect.construct` instead of `Object.create` + `apply`, `Reflect.defineProperty` instead of `Object.defineProperty`."
  ],
  [
    "What is function composition?",
    "hard",
    "Function composition combines multiple functions to create a new function. Right-to-left (compose): `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)`. Left-to-right (pipe): `const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)`. Enables building complex operations from simple pure functions. Example: `const process = pipe(trim, capitalize, escapeHtml)`. Fundamental to functional programming."
  ],
  [
    "What is the event bubbling and capturing?",
    "med",
    "Event propagation has three phases: 1) Capturing phase — event travels from `window` down to target element. 2) Target phase — event reaches the target. 3) Bubbling phase — event travels back up from target to `window`. Most events bubble. `addEventListener(type, handler, { capture: true })` triggers during capture phase. Use `event.stopPropagation()` to stop bubbling. Capturing is useful for global interceptors, bubbling enables event delegation."
  ],
  [
    "What is stopPropagation vs preventDefault?",
    "med",
    "`stopPropagation()` prevents further propagation of the event (stops bubbling/capturing). `preventDefault()` prevents the browser's default action for the event (e.g., form submission, link navigation, key input). They are independent — call both if needed. `stopImmediatePropagation()` also prevents other handlers on the same element from firing. Use cases: `preventDefault` on form submit to validate first, `stopPropagation` to prevent parent handlers from firing."
  ],
  [
    "What are Web Workers?",
    "hard",
    "Web Workers run JavaScript in a background thread separate from the main UI thread. Communication via `postMessage()` and `onmessage` (structured clone algorithm, not shared memory). No DOM access, no `window`, no `document`. Uses: heavy computation, image processing, data parsing, compression. Created via `new Worker('worker.js')`. Inline workers via Blob URLs. Terminate via `worker.terminate()`. SharedWorkers are shared across multiple tabs."
  ],
  [
    "What is Service Worker and how does it differ from Web Worker?",
    "hard",
    "Service Workers are a special type of Web Worker acting as a programmable network proxy between the browser and network. Key differences: 1) Intercepts network requests via `fetch` event. 2) Enables offline support, caching, push notifications. 3) Lifecycle: install → activate → fetch. 4) Requires HTTPS. 5) Scope restrictions. 6) No DOM access, runs on separate thread. 7) Persistent — can wake up for push events. Web Workers are for computation; Service Workers for network/offline."
  ],
  [
    "What is IndexedDB?",
    "med",
    "IndexedDB is a client-side NoSQL database for structured data, including files/blobs. Key features: asynchronous, supports transactions, indexes for efficient queries, large storage quotas (much larger than localStorage). Object stores (like tables) hold structured data. Key path and indexes enable fast lookups. Uses request-based API (old) or promise-based wrappers. Use cases: offline-first apps, caching large datasets, PWA storage. Wrap with Dexie.js or idb for cleaner API."
  ],
  [
    "Explain localStorage vs sessionStorage vs cookies.",
    "med",
    "localStorage: persists until explicitly cleared, ~5-10MB, synchronous, same-origin only, no expiration, not sent to server. sessionStorage: same as localStorage but cleared when tab closes. Cookies: ~4KB max, sent with every HTTP request (affects performance), configurable expiration, can be HttpOnly/Secure/SameSite, accessible server-side. Use localStorage for client-only persisted data. Use cookies for server-authenticated sessions. sessionStorage for session-only client data."
  ],
  [
    "What is CORS and how do you handle it?",
    "med",
    "CORS (Cross-Origin Resource Sharing) is a browser security mechanism restricting cross-origin HTTP requests. The server must include CORS headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`. Preflight requests (OPTIONS) are sent for non-simple requests. Handling: configure server to send appropriate headers, use proxies for development, or CORS-anywhere services. In Express: `cors` middleware package."
  ],
  [
    "Explain XSS and CSRF attacks and prevention.",
    "hard",
    "XSS (Cross-Site Scripting): injects malicious scripts into web pages. Types: stored (persistent in DB), reflected (URL-based), DOM-based (client-side). Prevention: sanitize user input, escape output, Content Security Policy (CSP), HttpOnly cookies. Never use `innerHTML` with untrusted data. CSRF (Cross-Site Request Forgery): tricks user into submitting unwanted requests on authenticated site. Prevention: anti-CSRF tokens, SameSite cookies (Strict/Lax), checking Origin/Referer headers, custom request headers."
  ],
  [
    "What is JSON.stringify and JSON.parse? Gotchas?",
    "med",
    "`JSON.stringify(obj)` converts JS object to JSON string. `JSON.parse(str)` converts JSON string back to object. Gotchas: 1) Loses functions, `undefined`, Symbols (removed or converted to null). 2) `Date` becomes string (not restored on parse). 3) `NaN` and `Infinity` become `null`. 4) Circular references throw. 5) `BigInt` throws (no JSON representation). 6) Order of object keys is not guaranteed. Custom serialization via `toJSON()` method or `replacer` parameter."
  ],
  [
    "What is the difference between for...in and for...of?",
    "med",
    "`for...in` iterates over enumerable property KEYS (including inherited ones). Use for objects, not arrays (unpredictable order, includes inherited properties). `for...of` iterates over iterable VALUES (arrays, strings, Maps, Sets, NodeLists). Uses `Symbol.iterator`. `for...of` is preferred for arrays. For objects, use `for...in` with `hasOwnProperty()` check, or `Object.keys()/values()/entries()` with `for...of`."
  ],
  [
    "What are Symbol.iterator and custom iterables?",
    "hard",
    "`Symbol.iterator` is a well-known Symbol that makes an object iterable. Objects with `[Symbol.iterator]` method return an iterator (`{next(){return {value, done}}}`). Can use `for...of`, spread, destructuring. Custom example: `range = { from, to, [Symbol.iterator]() { return { current: this.from, next() { return this.current <= this.to ? {value: this.current++, done: false} : {done: true} } } } }`. Arrays, strings, Maps, Sets are built-in iterables."
  ],
  [
    "What is Promise.all vs Promise.race vs Promise.allSettled vs Promise.any?",
    "hard",
    "`Promise.all([...])` resolves when ALL settle with first rejection — short-circuits on any rejection (rejects immediately). `Promise.race([...])` settles when the FIRST settles (resolve or reject). `Promise.allSettled([...])` waits for ALL to complete — never rejects (returns `[{status, value/reason}]`). `Promise.any([...])` resolves when ANY resolves — rejects only if ALL reject (aggregate error). Use `all` when all needed, `allSettled` when partial results ok, `any` for first success, `race` for timeout implementation."
  ],
  [
    "What is microtask queue vs macrotask queue?",
    "hard",
    "Microtask queue: process.nextTick (Node), Promise.then/catch/finally, queueMicrotask, MutationObserver. Macrotask (callback/message) queue: setTimeout, setInterval, I/O, UI rendering, setImmediate (Node). Event loop: run all sync code → drain microtask queue entirely → render (browser) → pick one macrotask → repeat. Microtasks are higher priority than macrotasks. A microtask queue that keeps adding microtasks can starve the macrotask queue."
  ],
  [
    "Explain the concept of function overloading in JS.",
    "med",
    "JS doesn't natively support function overloading (multiple functions with same name but different params). Mimic via: 1) Checking `arguments.length` or `typeof` params. 2) Default parameters. 3) Rest parameters. 4) Polymorphism via duck typing. Example: `function greet(name, greeting) { if (!greeting) greeting = 'Hello'; return `${greeting}, ${name}`; }`. TypeScript provides true overloading via declaration merging."
  ],
  [
    "What are getters and setters in JavaScript?",
    "med",
    "Getters/setters are special methods that behave like properties. Defined via `get prop()` and `set prop(val)` inside classes or `Object.defineProperty()`. Enable computed properties, validation, lazy initialization, and encapsulation. Example: `class Person { get fullName() { return `${this.first} ${this.last}`; } set fullName(v) { [this.first, this.last] = v.split(' '); } }`. Getters are accessed without parentheses."
  ],
  [
    "What is the difference between class and function-based constructors?",
    "med",
    "Classes (`class Foo { constructor() {} }`) are syntactic sugar over function constructors. Key differences: 1) Class must be called with `new` (throws without). 2) Class methods are non-enumerable. 3) Classes are not hoisted (TDZ). 4) Classes automatically run in strict mode. 5) `class` syntax is cleaner for inheritance (`extends`, `super()`). 6) Static methods, private fields, getters/setters are more natural with class syntax. Function constructors are the legacy approach."
  ],
  [
    "What are static methods in a class?",
    "med",
    "Static methods are defined on the class itself, not instances. Called via `ClassName.method()` not `instance.method()`. Useful for utility functions, factory methods, and singleton instance management. Example: `class MathUtils { static add(a,b) { return a+b; } }`. Syntax: `static methodName() {}`. Static methods cannot access instance properties but can access other static members. Can also have static properties (`static count = 0`)."
  ],
  [
    "What is the instanceof operator?",
    "easy",
    "`instanceof` checks if the prototype chain of an object contains the prototype property of a constructor. `obj instanceof Constructor` returns `true` if `Constructor.prototype` is in `obj`'s prototype chain. Works across different execution contexts? No — fails if prototype references differ (e.g., iframes, VM contexts). Use `Array.isArray()` for array detection (safer than `[] instanceof Array`). Override via `Symbol.hasInstance`."
  ],
  [
    "What is typeof and what are its quirks?",
    "med",
    "`typeof` returns a string indicating the type. Quirks: 1) `typeof null` → `'object'` (historical bug, can't be fixed). 2) `typeof NaN` → `'number'` (NaN is a number type). 3) `typeof []` → `'object'` (use `Array.isArray()`). 4) `typeof function(){}` → `'function'`. 5) `typeof undefined` → `'undefined'`. 6) Undeclared variables return `'undefined'` instead of throwing. 7) `typeof new String('')` → `'object'` (wrapping)."
  ],
  [
    "How does Array.sort work internally?",
    "hard",
    "V8 uses TimSort (hybrid stable sorting algorithm based on merge sort + insertion sort) for arrays longer than 10 elements, insertion sort for short arrays. Time complexity: O(n log n) average, O(n) best (already sorted), O(n log n) worst. Stability: modern engines guarantee stable sort. Default sort converts elements to strings first (numeric sort needs compare function: `(a, b) => a - b`). Different engines may use different algorithms — never rely on exact behavior."
  ],
  [
    "What is the difference between slice and splice?",
    "easy",
    "`slice(start, end)` returns a new array (shallow copy) from `start` to `end-1`. Does NOT mutate original. `end` defaults to end of array. Negative indices count from end. `splice(start, deleteCount, ...items)` mutates the original array — removes/inserts elements. Returns removed elements. `deleteCount` is omitted? removes from `start` to end. Use `slice` for copying, `splice` for in-place modifications."
  ],
  [
    "What are truthy and falsy values in JavaScript?",
    "easy",
    "Falsy values: `false`, `0`, `-0`, `0n` (BigInt zero), `''` (empty string), `null`, `undefined`, `NaN`. Everything else is truthy: `'false'` (non-empty string), `[]` (empty array), `{}` (empty object), `Infinity`. Truthy values in conditions execute the `if` block. Use Boolean coercion: `!!value` converts to boolean. Use `Boolean(value)` explicitly for clarity."
  ],
  [
    "What is short-circuit evaluation?",
    "easy",
    "Logical operators short-circuit: `&&` returns first falsy operand or last operand. `||` returns first truthy operand or last operand. `??` returns right operand only if left is null/undefined. Examples: `const name = user.name || 'Guest'` (fallback for falsy values), `isAdmin && showPanel()` (conditional execution). Used for default values, guard clauses, and optional execution. Caution with `||` for defaults when `''`, `0`, `false` are valid values — use `??` instead."
  ],
  [
    "What is tail call optimization?",
    "hard",
    "Tail call optimization (TCO) optimizes recursive calls in tail position (last operation before return). If a function's last action is calling itself, the engine can reuse the current stack frame instead of creating a new one — preventing stack overflow. Required by ES6 spec but only Safari implements it. V8 (Chrome/Node) doesn't support TCO. Alternative: use trampolining, iterative loops, or explicit stack management for deep recursion."
  ],
  [
    "Explain Object.assign vs spread operator for objects.",
    "med",
    "`Object.assign(target, ...sources)` copies enumerable own properties from sources to target (mutates target, returns target). Spread `{...obj1, ...obj2}` creates a new object (doesn't mutate sources). Both do shallow copy. `Object.assign` triggers setters on target, spread doesn't. Spread is more readable and declarative. `Object.assign` is useful when you need to mutate an existing object. Both handle `Symbol` properties."
  ],
  [
    "What is chaining in JavaScript?",
    "med",
    "Chaining (method chaining / fluent interface) returns `this` from methods so calls can be chained: `obj.method1().method2().method3()`. Common in jQuery, Lodash, and arrays (`.map().filter().reduce()`). Each method returns the object itself (for mutable chains) or a new object (for immutable chains). Implement by `return this;` at end of each method. Benefits: readability, concise code, declarative pipelines."
  ],
  [
    "What is lazy evaluation?",
    "hard",
    "Lazy evaluation delays computation until the result is actually needed. Benefits: avoids unnecessary work, enables infinite data structures, improves performance for expensive operations. Examples: generators (yield on demand), short-circuit operators (`&&`, `||`), currying, thunks (wrapping in `() => value`). Memoized lazy values compute once and cache. Libraries like Lodash chain methods lazily — `.map().filter()` traverses array once."
  ],
  [
    "What are design patterns? Name 3 common ones in JS.",
    "hard",
    "Design patterns are reusable solutions to common software design problems. Common JS patterns: 1) Module pattern — encapsulates private state via closures/IIFE (before ES modules). 2) Observer pattern — publish/subscribe mechanism (event emitters, RxJS). 3) Singleton pattern — ensures only one instance of a class (shared state, caches). 4) Factory pattern — creates objects without specifying concrete types. 5) Revealing Module pattern — exposes only public API. Modern JS modules replace many classic patterns."
  ],
  [
    "What is the Observer pattern?",
    "hard",
    "The Observer pattern defines a one-to-many dependency where observers are notified of state changes. Subject maintains observer list; observers implement an update method. In JS: `addEventListener` implements observer (DOM events). RxJS Observables are an advanced implementation. Event emitters (Node.js EventEmitter) follow this pattern. Use Cases: real-time UI updates, cross-component communication, reactive programming. Different from Pub/Sub — Pub/Sub uses a message broker between publishers and subscribers."
  ],
  [
    "What is the Singleton pattern?",
    "med",
    "Singleton ensures a class has exactly one instance and provides a global access point. JS implementation: `const singleton = { instance: null, getInstance() { if (!this.instance) this.instance = new Service(); return this.instance; } }`. Or ES module exports are inherently singletons (cached after first import). Use cases: configuration objects, logger, database connection pools. Criticism: makes testing difficult (global state), violates Single Responsibility Principle."
  ],
  [
    "What is the Module pattern?",
    "med",
    "The Module pattern uses closures to create private and public encapsulation. Before ES modules, it was the primary way to organize code. Implementation: `const Module = (function() { let privateVar = 0; function privateMethod() {} return { publicMethod() { privateVar++; return privateMethod(); } }; })()`. Revealing Module pattern: return an object mapping public methods to private implementations. Modern ES modules (`import`/`export`) have largely replaced this pattern."
  ],
  [
    "How do you handle errors in async/await?",
    "med",
    "Use `try/catch` blocks around `await` calls. `try { const result = await riskyOperation(); } catch (error) { console.error(error); }`. For multiple awaits, wrap in single try/catch or use per-call try/catch for granular handling. Alternative: `.catch()` on the promise: `await riskyOp().catch(handleError)`. Avoid ignoring errors. Use `finally` for cleanup. Global handlers: `window.onunhandledrejection` (browser), `process.on('unhandledRejection')` (Node)."
  ],
  [
    "What is try/catch/finally?",
    "easy",
    "`try { ... }` contains code that may throw. `catch(err) { ... }` handles errors (optional in modern JS, but must be present or finally). `finally { ... }` runs regardless of success or error — used for cleanup (close connections, clear flags). `finally` runs before the try/catch returns. Can omit `catch` entirely: `try { ... } finally { ... }` for cleanup-only. Nested try/catch blocks allow differentiated error handling."
  ],
  [
    "What are custom errors in JavaScript?",
    "med",
    "Custom errors extend the `Error` class to provide domain-specific error types. `class ValidationError extends Error { constructor(message) { super(message); this.name = 'ValidationError'; } }`. `instanceof` checks: `if (error instanceof ValidationError)`. Always set `this.name`. Preserve stack trace via `super()`. Custom properties can carry additional context (status code, field name). Enables specific catch handling: `try { ... } catch(e) { if (e instanceof ValidationError) {...} else throw e; }`."
  ],
  [
    "What is the difference between throw and reject?",
    "med",
    "`throw` is synchronous — throws an error in the current execution context (stops execution, propagates up call stack). `reject` is for Promises — marks a promise as rejected asynchronously. `throw` inside `async` functions becomes a rejected promise. `throw` inside `.then()` handlers also rejects the returned promise. Both produce errors, but `throw` is for sync code, `reject` for promise resolution. Use `throw` in async functions (converted to rejection automatically)."
  ],
  [
    "What is function memoization and implement it.",
    "hard",
    "Memoization caches function results to avoid recomputation. Pure functions benefit most. Implementation: `function memoize(fn) { const cache = new Map(); return function(...args) { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn.apply(this, args); cache.set(key, result); return result; }; }`. Optimizations: limited cache size (LRU), custom key function, WeakMap for object args. React's useMemo and useCallback are built-in memoization hooks."
  ],
  [
    "What is the difference between composition and inheritance?",
    "hard",
    "Inheritance (`class A extends B`): child class inherits from parent. Creates tight coupling, fragile base class problem, deep hierarchies are hard to maintain. Composition: objects contain other objects (has-a vs is-a). `function createDog(sound) { return { makeSound() { sound.play(); } } }`. Favor composition over inheritance (GoF principle). Composition is more flexible, testable, and avoids the gorilla-banana problem. React uses composition over inheritance."
  ],
  [
    "What is Array.from() used for?",
    "med",
    "`Array.from(arrayLike, mapFn?, thisArg?)` creates a new array from array-like or iterable objects. Array-like: objects with `length` and indexed elements (arguments, NodeList, strings). Iterable: Map, Set, generators. Optional map function transforms elements during creation. Examples: `Array.from('hello')` → `['h','e','l','l','o']`, `Array.from({length: 3}, (_, i) => i)` → `[0,1,2]`, `Array.from(new Set([1,2,2,3]))` → `[1,2,3]`."
  ],
  [
    "Explain the concept of lazy loading.",
    "med",
    "Lazy loading defers loading of non-critical resources until needed. Improves initial load time and bandwidth. Web implementations: 1) Image lazy loading: `loading=\"lazy\"` attribute or Intersection Observer. 2) Code splitting: dynamic `import()` loads modules on demand. 3) Route-based lazy loading: React.lazy + Suspense. 4) Infinite scroll: loads content as user scrolls. 5) Virtual scrolling: renders only visible items. Reduces initial bundle size and time-to-interactive."
  ],
  [
    "What are bitwise operators in JavaScript?",
    "hard",
    "Bitwise operators operate on 32-bit signed integers: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (signed right shift), `>>>` (unsigned right shift). Convert operands to 32-bit integers (truncates, loses precision). Use cases: flag enums, performance-critical integer operations, color manipulation (RGBA), low-level protocols. Overkill for most web dev. `~~x` and `x | 0` are fast ways to truncate to integer. `x >>> 0` converts to unsigned 32-bit."
  ],
  [
    "What is NaN and how to check for it?",
    "med",
    "`NaN` (Not-a-Number) is a global value representing an unrepresentable numeric result. `typeof NaN` → `'number'`. `NaN` is the only value not equal to itself (`NaN === NaN` → `false`). Use `Number.isNaN(value)` (reliable, ES6) instead of global `isNaN()` (coerces to number first). `Object.is(NaN, NaN)` → `true`. Common causes: `0/0`, `parseInt('abc')`, `Math.sqrt(-1)`, `undefined + 1`."
  ],
  [
    "What is Infinity in JavaScript?",
    "easy",
    "`Infinity` is a global numeric value representing infinity (greater than any finite number). `-Infinity` is negative infinity. `typeof Infinity` → `'number'`. Produced by: `1/0`, `Math.pow(10, 1000)`, `Number.MAX_VALUE * 2`. `Infinity > Number.MAX_VALUE` → `true`. Use `isFinite(value)` or `Number.isFinite(value)` to check. `Infinity - Infinity` → `NaN`. Division by Infinity returns 0."
  ],
  [
    "What are property descriptors in JavaScript?",
    "hard",
    "Property descriptors describe the attributes of an object property. Data descriptor: `value`, `writable`, `enumerable`, `configurable`. Accessor descriptor: `get`, `set`, `enumerable`, `configurable`. Accessed via `Object.getOwnPropertyDescriptor(obj, prop)` and `Object.defineProperty(obj, prop, descriptor)`. `configurable: false` prevents deletion and descriptor type changes. `enumerable: false` hides from `for...in` and `Object.keys()`. `writable: false` makes value read-only. All default to `false` when using `defineProperty`."
  ],
  [
    "What is Object.create()?",
    "hard",
    "`Object.create(proto, propertiesObject?)` creates a new object with the specified prototype and optional property descriptors. True prototypal inheritance without constructor functions. Example: `const animal = { speak() { ... } }; const dog = Object.create(animal);`. The second argument uses same format as `Object.defineProperties`. `Object.create(null)` creates an object with no prototype chain (no toString, hasOwnProperty) — ideal for pure dictionaries."
  ],
  [
    "What is the difference between arguments object and rest params?",
    "med",
    "`arguments` is an array-like object available in regular functions (not arrow functions). Has `.length` but lacks array methods. Must convert to array via `Array.from()` or spread. Rest params (`...args`) is a real array available in all functions, provides named access, and is more explicit. `arguments` includes all passed arguments; rest params only capture what's not already destructured. Prefer rest params for clarity and array methods."
  ],
  [
    "What are tagged template literals?",
    "hard",
    "Tagged templates call a function with parsed template literal parts. The function receives: 1) Array of string literals (including raw versions). 2) Interpolated values as remaining arguments. ` function highlight(strings, ...values) { return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''); }`. Use cases: escaping HTML (sanitization), CSS-in-JS (styled-components), i18n (ICU message formatting), SQL query building. Raw strings via `strings.raw[i]`."
  ],
  [
    "What is the globalThis object?",
    "med",
    "`globalThis` is a standard way to access the global object across environments: `window` (browser), `self` (Web Worker), `global` (Node.js). Provides a unified reference without environment detection. Supported in all modern environments. Useful for polyfills, global variable access, and library code that must run across runtimes. In modules, top-level `this` is `undefined`, not `globalThis`."
  ],
  [
    "What is the AbortController API?",
    "hard",
    "`AbortController` provides a way to abort asynchronous operations (primarily fetch requests). Create: `const controller = new AbortController();`. Pass `signal` to fetch: `fetch(url, { signal: controller.signal })`. Call `controller.abort()` to cancel. The fetch promise rejects with `AbortError`. `controller.signal.aborted` checks status. Can abort multiple requests with one signal. Also works with event listeners (`{signal}` option auto-removes listener on abort) and streams."
  ],
  [
    "What is the Intersection Observer API?",
    "med",
    "Intersection Observer efficiently detects when an element enters/leaves the viewport or a parent container. `new IntersectionObserver(callback, { root, rootMargin, threshold })`. Callback receives entries with `isIntersecting`, `intersectionRatio`, `boundingClientRect`. Use cases: lazy loading images, infinite scroll, animation triggers, visibility tracking, ad impression tracking. More performant than scroll event listeners because it's callback-based and doesn't block the main thread."
  ],
  [
    "What is ResizeObserver?",
    "med",
    "`ResizeObserver` watches for size changes on elements. `new ResizeObserver(entries => { entries.forEach(entry => { console.log(entry.contentRect); }); }).observe(element)`. Reports new dimensions when element resizes. Uses: responsive components, textarea auto-resize, canvas resizing, dashboard layout adjustments. Unlike window `resize` event (only window-level), `ResizeObserver` works on any element. More efficient than polling `getBoundingClientRect()`. Also observes `contentBoxSize`, `borderBoxSize`."
  ],
  [
    "How do you implement a polyfill?",
    "hard",
    "A polyfill replicates a native API in older environments. Pattern: check if API exists, define if not. Example: `if (!Array.prototype.flat) { Array.prototype.flat = function(depth = 1) { return this.reduce((acc, val) => acc.concat(Array.isArray(val) && depth > 0 ? val.flat(depth - 1) : val), []); }; }`. Follow spec precisely, don't break existing behavior. Use `Object.defineProperty` for non-enumerable methods. Libraries: core-js (comprehensive), polyfill.io service."
  ],
  [
    "What is the difference between declaration and expression functions?",
    "med",
    "Function declarations: `function foo() {}` — hoisted (can call before definition), must have a name, creates binding in current scope. Function expressions: `const foo = function() {}` — not hoisted, can be anonymous or named, evaluated when reached. Anonymous function expressions in stack traces show as `(anonymous)` (arrow functions). Named function expressions help with debugging. Arrow functions are always expressions. Use declaration for top-level functions, expressions for callbacks."
  ],
  [
    "What is an async generator?",
    "hard",
    "An async generator (`async function*`) yields Promises and can be consumed with `for await...of`. Each `yield` produces a Promise; the consumer awaits each value. Example: `async function* fetchPages(urls) { for (const url of urls) yield await fetch(url).then(r => r.json()); }`. Use for: paginated API calls, streaming data, processing async chunks with lazy evaluation. Combines generator lazy iteration with async/await."
  ],
  [
    "What is BigInt in JavaScript?",
    "med",
    "`BigInt` represents integers of arbitrary precision (beyond `Number.MAX_SAFE_INTEGER` = 2^53-1). Created via `BigInt(123)` or `123n` suffix. Arithmetic with BigInts only works with other BigInts (no mixing with regular numbers). Supported operations: `+`, `-`, `*`, `**`, `/` (truncates toward zero), `%`. Bitwise operations work for positive BigInts. Not supported: `Math` methods, `~`/`>>>`, JSON serialization (throws). Use for: cryptography, large IDs, financial calculations needing precision."
  ],
  [
    "What is the difference between Object.seal() and Object.freeze()?",
    "hard",
    "`Object.seal(obj)` prevents adding/removing properties and makes all properties non-configurable (can't change descriptor type). Existing writable properties CAN still be changed. `Object.isSealed()` checks. `Object.freeze(obj)` is `seal` + makes all properties non-writable (read-only). Both are shallow — nested objects remain mutable. `Object.isFrozen()` checks. Use `seal` when structure should be fixed but values updated. Use `freeze` for full immutability."
  ],

  // ── Modern / Industry Conceptual ───────────────────────────────────────────
  [
    "How would you optimize the loading performance of a large JavaScript bundle?",
    "hard",
    "Optimizations: 1) Code splitting — dynamic `import()` for route-based or component-based chunks. 2) Tree shaking — eliminate dead code via ES module static analysis. 3) Minification — Terser to remove whitespace/comments, mangle names. 4) Compression — gzip/Brotli on server. 5) Bundle analysis — use `webpack-bundle-analyzer` or `vite-bundle-visualizer` to identify large dependencies. 6) Lazy load heavy libraries. 7) Use `import` maps for shared deps. 8) Consider `ESBuild` or `SWC` for faster builds. 9) Modern format (`esm`) for better tree shaking."
  ],
  [
    "What are the Core Web Vitals (LCP, INP, CLS) and how do you improve them?",
    "hard",
    "LCP (Largest Contentful Paint): render time of largest visible element. Target < 2.5s. Fix: optimize images, preload hero content, minimize render-blocking resources. INP (Interaction to Next Paint): responsiveness to interactions. Target < 200ms. Fix: avoid long tasks, use Web Workers, debounce handlers. CLS (Cumulative Layout Shift): visual stability. Target < 0.1. Fix: set explicit dimensions on images/embeds, reserve space for dynamic content (ads, embeds), use `font-display: optional` to prevent layout shifts from custom fonts."
  ],
  [
    "What is hydration in modern frameworks and what is the hydration mismatch problem?",
    "hard",
    "Hydration is the process where client-side JavaScript attaches event listeners and state to server-rendered HTML DOM. Frameworks (React, Next.js, Nuxt) reuse existing DOM to avoid recreating it. Hydration mismatch occurs when server HTML differs from the client's first render — caused by: browser-only APIs (`window`, `localStorage`), random values, timezones, data that differs between server/client. Fix: use `useEffect` for browser-only code, `suppressHydrationWarning` when intentional, ensure server/client data consistency."
  ],
  [
    "Explain server-side rendering (SSR) vs static site generation (SSG) vs client-side rendering.",
    "hard",
    "SSR: HTML rendered per-request on server. Good for dynamic content, SEO, initial load speed. Higher server costs, slower TTFB. SSG: HTML generated at build time. Fastest initial load, best for caching, minimal server. Stale content between rebuilds. CSR: HTML rendered in browser with JS. Rich interactivity, cheap hosting. Poor SEO, slow initial load, larger bundle. Hybrid: Next.js/Nuxt support all three per-page. Choice depends on content freshness needs, traffic patterns, and interactivity requirements."
  ],
  [
    "What are React Server Components and how do they change data fetching?",
    "hard",
    "React Server Components (RSC) run ONCE on the server — no client JS bundle, no hydration, no state. They can directly access databases, file systems, and backend services. Data fetching happens in the component (not in `useEffect` or external data layer). Client components are interactive but can't access server resources. RSCs reduce bundle size, improve initial load, and simplify data fetching (no API layer needed). Example: `async function Post({ id }) { const post = await db.post.findUnique(id); return <div>{post.title}</div>; }`. RSCs can import client components."
  ],
  [
    "How do you prevent prototype pollution attacks in JavaScript?",
    "hard",
    "Prototype pollution occurs when an attacker modifies `Object.prototype`, affecting all objects. Prevention: 1) Avoid recursive deep merge with user-controlled keys (check for `__proto__`, `constructor`, `prototype`). 2) Use `Object.create(null)` for maps/dictionaries (no prototype chain). 3) Freeze prototypes: `Object.freeze(Object.prototype)`. 4) Use `Map` instead of plain objects for dynamic keys. 5) Sanitize nested key paths in merge/assign functions. 6) Use libraries with built-in protection (Lodash >= 4.17.11). 7) Use immutable patterns (Immer)."
  ],
  [
    "What is Content Security Policy (CSP) and how does it mitigate XSS?",
    "hard",
    "CSP is an HTTP header (`Content-Security-Policy`) that restricts what resources the browser can load/execute. Mitigates XSS by: blocking inline scripts unless whitelisted, restricting script sources, disabling `eval()`. Directives: `default-src`, `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`. Example: `Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.example.com; img-src 'self' data:`. Report violations via `report-uri`/`report-to`. Test with `Content-Security-Policy-Report-Only` first."
  ],
  [
    "How would you implement rate limiting on the client side for API calls?",
    "med",
    "Client-side rate limiting prevents excessive API calls from a single session. Implementation: 1) Token bucket algorithm — maintain a counter that refills over time. 2) Queue pending requests when limit reached. 3) Debounce/throttle user-triggered calls. 4) Use `AbortController` to cancel stale requests. 5) Track timestamps of recent calls: `const window = []; function rateLimited(key) { const now = Date.now(); window.push(now); window.filter(t => now - t < 60000); return window.length <= LIMIT; }`. Note: client-side only prevents accidental over-calls; server-side enforcement is essential for security."
  ],
  [
    "What is the difference between HTTP polling, long polling, SSE, and WebSockets?",
    "hard",
    "HTTP polling: client repeatedly requests server at intervals. Simple but inefficient (many empty responses). Long polling: server holds request open until new data available, then responds (client immediately re-requests). More efficient but still HTTP overhead. SSE (Server-Sent Events): single persistent connection, server pushes events to client (one-way). Uses `EventSource` API. Lighter than WebSockets, auto-reconnects. WebSockets: full-duplex persistent connection (client and server push). Lower overhead, real-time, supports binary. Choose based on directionality needs and real-time requirements."
  ],
  [
    "How do you handle authentication tokens securely (where to store JWT)?",
    "hard",
    "Store JWT in an HttpOnly, Secure, SameSite=Strict cookie (sent automatically, protected from XSS). The cookie approach prevents JavaScript access entirely (XSS-resistant). Alternatively, store in memory (variable/closure) — survives page navigation but lost on refresh. localStorage/SessionStorage is vulnerable to XSS (accessible via JS). SessionStorage is lost on tab close but also vulnerable. Best practice: short-lived access token (15min) in memory, refresh token in HttpOnly cookie. Never store sensitive tokens in localStorage in production."
  ],
  [
    "What is the difference between cookies with HttpOnly, Secure, and SameSite attributes?",
    "med",
    "HttpOnly: prevents JavaScript `document.cookie` access — mitigates XSS cookie theft. Secure: cookie only sent over HTTPS — prevents interception on HTTP. SameSite: controls when cookie is sent cross-site. `Strict` — never sent for cross-site requests. `Lax` — sent for top-level GET navigations (default in modern browsers). `None` — sent for all cross-site requests (requires Secure). Combination: `Set-Cookie: sessionId=abc; HttpOnly; Secure; SameSite=Lax` is the modern secure default."
  ],
  [
    "How does the JavaScript engine optimize code (JIT, hidden classes, inline caching)?",
    "hard",
    "JIT (Just-In-Time) compilation: V8 parses → builds AST → generates bytecode (Ignition interpreter) → hot code compiled to optimized machine code (TurboFan). Hidden classes: objects with same property structure share internal class (avoid dictionary lookup). Inline caching (IC): caches result of property access based on shape — subsequent accesses are fast. Deoptimization: when assumptions break (new properties added, different types), falls back to slower path. Performance tips: initialize objects consistently, avoid changing property types, monomorphic code is faster."
  ],
  [
    "What are top-level await and dynamic import() and when are they useful?",
    "med",
    "Top-level await: `await` at module top-level (not inside async function). Module execution pauses until promise settles. Useful for: module initialization, loading config, lazy dependency loading. Dynamic `import()`: `const module = await import('./module.js')` — loads module at runtime (not statically). Returns a promise. Useful for: code splitting, conditionally loading modules, polyfill loading, on-demand heavy dependencies. Both enable more flexible module loading patterns."
  ],
  [
    "What is the difference between structuredClone() and JSON deep copy?",
    "med",
    "`structuredClone()` is a native deep-clone function. Handles: Date, RegExp, Map, Set, ArrayBuffer, Blob, ImageData, typed arrays (unlike JSON). Preserves circular references (unlike JSON which throws). Transfers ownership of transferable objects. `JSON.parse(JSON.stringify(obj))`: limited to primitives, plain objects, and arrays — loses functions, undefined, Symbol, Date (becomes string), Map/Set (becomes {}), RegExp (becomes {}), BigInt (throws). `structuredClone()` is faster and more complete but newer."
  ],
  [
    "What are the new Array methods like at(), findLast(), and toSorted()?",
    "med",
    "`.at(index)` — supports negative indices (like Python). `arr.at(-1)` → last element. `.findLast(fn)` / `.findLastIndex(fn)` — search from end. `.toSorted(compareFn)` — returns new sorted array (non-mutating). `.toReversed()` — returns new reversed array. `.toSpliced(start, deleteCount, ...items)` — returns new array with splice applied. `.with(index, value)` — returns new array with element replaced. These immutable alternatives prevent accidental mutation. `group()`/`groupToMap()` — group array by key callback."
  ],
  [
    "What is the Temporal API and what problems does it solve over Date?",
    "hard",
    "Temporal is the modern date/time API (Stage 3). Problems with `Date`: mutable, timezone-unaware, confusing API (months 0-indexed), no support for non-Gregorian calendars, parsing is fragile, no timezone conversions. Temporal provides: `Temporal.Now.zonedDateTimeISO()`, `Temporal.PlainDate`, `Temporal.PlainTime`, `Temporal.Duration`, `Temporal.TimeZone`. Immutable, precise to nanosecond, timezone-aware, human-readable API. Example: `Temporal.Now.instant().toString()`. Use polyfill (`@js-temporal/polyfill`) until native support is widespread."
  ],
  [
    "How would you debug a memory leak in a long-running single-page application?",
    "hard",
    "Use Chrome DevTools Memory panel: 1) Take heap snapshot → compare snapshots. 2) Allocation instrumentation timeline. 3) Track detached DOM nodes. Common leaks: forgotten global variables, setInterval/setTimeout not cleared, closures retaining large objects, detached DOM elements (React component unmount without cleanup), growing caches without limits. Use `performance.memory` in Chrome. Pattern: take baseline snapshot, perform action, take another snapshot, look for retained objects. WeakMap/WeakSet for caches. Use React DevTools profiler for component-level memory."
  ],
  [
    "What is the difference between throttling network and CPU in performance profiling?",
    "med",
    "Network throttling simulates slow connection speeds (Fast 3G, Slow 3G, custom bandwidth/latency). Affects: TTFB, load timings, waterfall charts. CPU throttling simulates low-end devices (2x, 4x, 6x slowdown). Slows JavaScript execution. Affects: time-to-interactive, frame rates, long tasks. Both are in Chrome DevTools Performance panel. Test on real devices when possible. Network throttling is more commonly used; CPU throttling matters more for JS-heavy apps."
  ],
  [
    "How do you implement optimistic UI updates with rollback on failure?",
    "hard",
    "Optimistic UI: update UI immediately before server confirms. Steps: 1) Capture current state (snapshot). 2) Apply expected change to UI. 3) Send request to server. 4) On success — optionally reconcile with server response. 5) On failure — rollback to snapshot and show error. Implementation patterns: React Query/RTK Query built-in optimistic updates, custom reducer with undo action, temporary ID for new items with server ID replacement. Ensure idempotent updates to prevent duplicate rollbacks."
  ],
  [
    "What strategies do you use for client-side caching of API responses?",
    "med",
    "Strategies: 1) In-memory cache (Map) with TTL — simple, no persistence. 2) LocalStorage for non-sensitive data — persists across sessions. 3) SessionStorage — persists during tab session. 4) Service Worker cache (Cache API) — for offline/network-first strategies. 5) IndexedDB for large, structured data. 6) HTTP cache headers (Cache-Control, ETag, Last-Modified). 7) Stale-while-revalidate — show cached data, refresh in background. 8) SWR/React Query/TanStack Query libraries provide built-in caching. Key considerations: cache invalidation, stale data, storage limits."
  ],
  [
    "What is code splitting and how do you implement route-based splitting?",
    "med",
    "Code splitting breaks the bundle into smaller chunks loaded on demand. Route-based splitting: each route loads its own chunk. Implementation: dynamic `import()` + framework router. React: `const Home = React.lazy(() => import('./Home')); <Suspense><Home /></Suspense>`. Next.js: file-system routing automatically splits per page. Vite/Rollup: dynamic import creates separate chunks. Webpack: magic comments for chunk naming (`/* webpackChunkName: \"home\" */`). Benefits: smaller initial bundle, faster load, better performance."
  ],
  [
    "How does HTTP/2 multiplexing change front-end bundling strategies?",
    "hard",
    "HTTP/2 multiplexing allows multiple requests over a single TCP connection (no head-of-line blocking). This reduces the need for bundling (concatenating many small files). Pre-HTTP/2: bundle everything into few large files to minimize HTTP/1.1 connection overhead. HTTP/2: smaller, more granular modules can be served individually without performance penalty. Strategies: serve many small files, use optimized import paths, avoid aggressive concatenation. However, bundling still matters for tree shaking, code splitting, and compression. HTTP/2 doesn't eliminate the need for bundling entirely."
  ],
  [
    "What is the difference between defer and async attributes on script tags?",
    "med",
    "`defer`: script fetched in parallel while parsing, executes AFTER HTML is fully parsed, in document order. Multiple deferred scripts execute in order. `async`: script fetched in parallel, executes IMMEDIATELY when ready (pauses parsing). Multiple async scripts execute in any order (whichever finishes first). Without either: script blocks parsing (fetch + execute synchronously). Use `defer` for scripts that need DOM access or dependency ordering. Use `async` for independent scripts (analytics, ads). Both only work with `src` attribute."
  ],
  [
    "How would you architect a feature flag system on the front end?",
    "med",
    "Feature flags toggle features on/off without deployment. Architecture: 1) Centralized config object fetched from server (cached, with fallback defaults). 2) Provider pattern (React context) wraps the app. 3) Each feature checks flag: `if (flags.newCheckout) { ... }`. 4) Flags support targeting (user segments, percentages, A/B testing). 5) Cache with TTL, allow manual override for development. 6) Typesafe flags (TypeScript union type). 7) Cleanup process: remove flag code when feature is stable. Libraries: LaunchDarkly, Unleash, GrowthBook."
  ],
  [
    "How do you measure and reduce time-to-interactive in a web app?",
    "hard",
    "TTI measures when a page is fully interactive (visible content + main thread quiet for 5s). Measure via: Lighthouse, Chrome DevTools Performance panel, Web Vitals library. Reduce TTI: 1) Minimize main-thread blocking — break long tasks (< 50ms). 2) Code splitting + lazy loading. 3) Defer non-critical JS (defer/async). 4) Reduce bundle size (tree shaking, compression). 5) Use Web Workers for heavy computation. 6) Prioritize visible content (critical CSS, preload key resources). 7) Use `requestIdleCallback` for non-urgent work."
  ],
  [
    "What are the security implications of using eval() and the Function constructor?",
    "med",
    "`eval()` and `new Function()` execute arbitrary strings as code. Dangers: 1) XSS — if user-controlled input reaches eval, malicious code runs in the app's context. 2) CSP — eval is blocked by default CSP policies. 3) Performance — eval prevents optimizations (code not analyzable at build time). 4) Scope leakage — eval can access local scope. Alternatives: use `JSON.parse` for JSON, safe parsers for expressions (math.js), template literals for string building. `new Function()` creates functions in global scope (cannot access local scope) but still dangerous with untrusted input."
  ],
  [
    "How would you implement retry with exponential backoff for failed requests?",
    "med",
    "Exponential backoff retries with increasing delays between attempts. Implementation: `async function retry(fn, maxRetries = 3, baseDelay = 1000) { for (let i = 0; i <= maxRetries; i++) { try { return await fn(); } catch (err) { if (i === maxRetries) throw err; const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000; await new Promise(r => setTimeout(r, delay)); } } }`. Add jitter (random) to prevent thundering herd. Options: cap max delay, use status codes to decide retriable (5xx, network errors — not 4xx), add `retry-after` header support."
  ],
  [
    "What is the difference between idempotent and non-idempotent API operations?",
    "med",
    "Idempotent: multiple identical requests produce the same result as a single request. GET, PUT, DELETE are idempotent (by HTTP spec). PUT replaces resource at URL (same value multiple times = same state). DELETE deletes resource (first call succeeds, subsequent calls return 404/410 but server state doesn't change). Non-idempotent: POST creates new resources (each request creates a separate resource). PATCH can be either (depends on implementation — use conditional updates for idempotency). Idempotency is crucial for retry-safe API design."
  ],
  [
    "How do you handle race conditions when multiple async requests update the same state?",
    "hard",
    "Race conditions: when multiple async operations update state concurrently leading to inconsistent results. Solutions: 1) AbortController — cancel stale requests. 2) Debounce rapid sequential requests (search-as-you-type). 3) Compare request timestamps — ignore out-of-order responses. 4) Use mutation versioning (ETag, timestamps) — reject stale updates (optimistic concurrency). 5) React: useReducer with dispatch serialization. 6) Redux: middleware that handles request cancellation. 7) Use libraries like TanStack Query that manage cache invalidation and deduplication. 8) Lock mechanism for critical sections (rare in client-side JS)."
  ],
  [
    "What is the PRPL pattern in web performance?",
    "hard",
    "PRPL (Push, Render, Pre-cache, Lazy-load) is a performance pattern for progressive web apps. Push: server pushes critical resources for initial route. Render: render initial route ASAP (even before full page loads). Pre-cache: cache remaining assets in background (Service Worker). Lazy-load: load remaining routes/assets on demand. Achieved via: HTTP/2 server push (or preload links), code splitting with dynamic imports, Service Worker caching, route-based lazy loading. PRPL works best with multi-page apps or app shells."
  ],
  [
    "How does the browser's preload, prefetch, and preconnect resource hints work?",
    "med",
    "Preload `<link rel=\"preload\">` — fetches critical resources EARLY (before discovered in HTML). Use for fonts, hero images, above-fold CSS. Forces download even if not used. Prefetch `<link rel=\"prefetch\">` — fetches resources likely needed for NEXT navigation, lowest priority. Use for next route assets. Preconnect `<link rel=\"preconnect\">` — establishes early connection (DNS + TCP + TLS). Use for third-party origins (CDN, API). DNS-prefetch `<link rel=\"dns-prefetch\">` — DNS lookup only. Lighter than preconnect. Use hints judiciously — excessive preload wastes bandwidth."
  ],
  [
    "What is the difference between a monorepo and polyrepo for JS projects?",
    "med",
    "Monorepo: multiple projects in a single repository. Tools: Turborepo, Nx, Lerna, pnpm workspaces. Benefits: shared code, atomic commits across packages, consistent tooling, easier dependency management. Challenges: scaling git operations, CI complexity, access control. Polyrepo: separate repositories per project. Benefits: independent CI/CD, isolated ownership, smaller clones. Challenges: dependency version drift, cross-repo changes require multiple PRs, duplicated tooling. Monorepos are increasingly preferred for large JS ecosystems."
  ],
  [
    "How would you design a plugin architecture in a JavaScript application?",
    "hard",
    "Plugin architecture allows extending app functionality. Design: 1) Define plugin interface (hooks/events that plugins can tap into). 2) Plugin registry — centralized store of registered plugins. 3) Plugin loading — dynamic `import()` for async loading, or static registration. 4) Lifecycle hooks — `onInit`, `onStart`, `onDestroy`. 5) Sandboxing — limited API access to prevent conflicts. 6) Versioning — plugin compatibility checks. Example: `class PluginSystem { constructor() { this.plugins = new Map(); } register(name, plugin) { this.plugins.set(name, plugin); plugin.initialize(this); } }`. Similar to webpack's tapable or VS Code's extension system."
  ],
  [
    "What is the difference between ESBuild, SWC, Webpack, and Vite as build tools?",
    "med",
    "ESBuild: written in Go, extremely fast (10-100x than JS tools). Handles bundling, minification, TypeScript stripping (no type checking), JSX. Used by Vite for development. SWC: written in Rust, similar speed to ESBuild. Transpilation and bundling. Used by Next.js. Webpack: mature, highly configurable, large plugin ecosystem. Slower but supports everything. Vite: uses ESBuild for dev (native ESM, fast HMR), Rollup for production builds. Best DX with instant start. Next.js uses Webpack (or Turbopack). Choose: Vite for new projects (general web apps), Next.js for React (uses SWC), Webpack for complex custom configurations."
  ],

  // ── Code / Implementation ──────────────────────────────────────────────────
  [
    "Implement a debounce function with leading and trailing options.",
    "hard",
    "`function debounce(fn, delay, { leading = false, trailing = true } = {}) { let timer, lastCall; return function(...args) { const now = Date.now(); if (!lastCall && leading) { fn.apply(this, args); lastCall = now; return; } clearTimeout(timer); timer = setTimeout(() => { if (trailing) fn.apply(this, args); lastCall = null; }, delay - (now - (lastCall || 0))); }; }`. Leading executes immediately on first call; trailing executes after delay since last call. Options can be combined. Use cases: search inputs (trailing), form validation on blur (leading)."
  ],
  [
    "Implement a throttle function from scratch.",
    "hard",
    "`function throttle(fn, limit) { let inThrottle, lastCall, timer; return function(...args) { const now = Date.now(); if (!inThrottle) { fn.apply(this, args); inThrottle = true; lastCall = now; } else { clearTimeout(timer); timer = setTimeout(() => { if (Date.now() - lastCall >= limit) { fn.apply(this, args); lastCall = Date.now(); } }, limit - (now - lastCall)); } }; }`. Throttle ensures fn executes at most once per limit period. Leading edge (first call) executes immediately. Ensures fixed rate of execution. Use cases: scroll handlers, resize events, rate-limited API calls."
  ],
  [
    "Write a function that deep clones an object without using structuredClone.",
    "hard",
    "`function deepClone(obj, seen = new WeakMap()) { if (obj === null || typeof obj !== 'object') return obj; if (seen.has(obj)) return seen.get(obj); if (obj instanceof Date) return new Date(obj); if (obj instanceof RegExp) return new RegExp(obj); if (obj instanceof Map) { const clone = new Map(); seen.set(obj, clone); obj.forEach((v, k) => clone.set(deepClone(k), deepClone(v))); return clone; } if (obj instanceof Set) { const clone = new Set(); seen.set(obj, clone); obj.forEach(v => clone.add(deepClone(v))); return clone; } const clone = Array.isArray(obj) ? [] : {}; seen.set(obj, clone); for (const key of [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]) { clone[key] = deepClone(obj[key], seen); } return clone; }`. Handles circular references (WeakMap), Date, RegExp, Map, Set, Symbols."
  ],
  [
    "Implement a curry function that supports partial application.",
    "hard",
    "`function curry(fn) { return function curried(...args) { if (args.length >= fn.length) { return fn.apply(this, args); } return (...next) => curried.apply(this, [...args, ...next]); }; }`. Usage: `const add = curry((a, b, c) => a + b + c); add(1)(2)(3) → 6; add(1, 2)(3) → 6`. Supports partial application (any number of args per call). The function curries until enough arguments are collected (based on fn.length). For variadic functions, use a custom arity placeholder: `curry(fn, arity)`."
  ],
  [
    "Write a function to flatten a deeply nested array without using Array.flat.",
    "med",
    "`function flatten(arr, depth = Infinity) { return arr.reduce((acc, val) => { if (Array.isArray(val) && depth > 0) { acc.push(...flatten(val, depth - 1)); } else { acc.push(val); } return acc; }, []); }`. Recursive approach with configurable depth. For depth 1: `function flattenOnce(arr) { return [].concat(...arr); }`. Iterative: `function flattenIterative(arr) { const stack = [...arr], result = []; while (stack.length) { const item = stack.shift(); if (Array.isArray(item)) stack.unshift(...item); else result.push(item); } return result; }`. The iterative approach avoids stack overflow for very deep arrays."
  ],
  [
    "Implement Promise.all from scratch.",
    "hard",
    "`function promiseAll(promises) { return new Promise((resolve, reject) => { if (!promises.length) return resolve([]); const results = new Array(promises.length); let settled = 0; promises.forEach((p, i) => { Promise.resolve(p).then(val => { results[i] = val; settled++; if (settled === promises.length) resolve(results); }).catch(reject); }); }); }`. Iterates all promises, collects results in order. Rejects immediately on any rejection. Handles non-promise values via `Promise.resolve()`. Empty array resolves immediately with `[]`."
  ],
  [
    "Implement Promise.race from scratch.",
    "hard",
    "`function promiseRace(promises) { return new Promise((resolve, reject) => { promises.forEach(p => { Promise.resolve(p).then(resolve).catch(reject); }); }); }`. Settles as soon as the first promise settles (resolve or reject). Non-promise values resolve immediately (synchronous). No special handling needed for empty arrays — will be pending forever (matches spec). All other promise combinators can be built on top of these primitives."
  ],
  [
    "Implement a custom memoize function with a configurable cache key.",
    "hard",
    "`function memoize(fn, { keyFn = (...args) => JSON.stringify(args), maxSize = Infinity, ttl = Infinity } = {}) { const cache = new Map(); return function(...args) { const key = keyFn(...args); if (cache.has(key)) { const entry = cache.get(key); if (Date.now() - entry.time < ttl) return entry.value; cache.delete(key); } const value = fn.apply(this, args); cache.set(key, { value, time: Date.now() }); if (cache.size > maxSize) { const firstKey = cache.keys().next().value; cache.delete(firstKey); } return value; }; }`. Configurable cache key for complex arguments. Max size prevents memory leak. TTL auto-expires stale entries."
  ],
  [
    "Write a function that retries a promise N times before rejecting.",
    "hard",
    "`async function retry(fn, { maxRetries = 3, delay = 1000, backoff = 2 } = {}) { let lastError; for (let attempt = 0; attempt <= maxRetries; attempt++) { try { return await fn(); } catch (err) { lastError = err; if (attempt === maxRetries) break; await new Promise(r => setTimeout(r, delay * Math.pow(backoff, attempt))); } } throw lastError; }`. Supports exponential backoff (default: 1s, 2s, 4s). Returns the final error after all retries exhausted. Optionally add jitter (`+ Math.random() * 500`) to prevent thundering herd. Configurable retry conditions (only retry on specific errors)."
  ],
  [
    "Implement an event emitter (on, off, emit) class.",
    "med",
    "`class EventEmitter { constructor() { this.events = new Map(); } on(event, listener) { if (!this.events.has(event)) this.events.set(event, []); this.events.get(event).push(listener); return () => this.off(event, listener); } off(event, listener) { if (!this.events.has(event)) return; const listeners = this.events.get(event).filter(l => l !== listener); if (listeners.length) this.events.set(event, listeners); else this.events.delete(event); } emit(event, ...args) { this.events.get(event)?.forEach(l => l(...args)); } once(event, listener) { const wrapper = (...args) => { listener(...args); this.off(event, wrapper); }; this.on(event, wrapper); } }`. `.on()` returns an unsubscribe function. `.once()` auto-removes after first emit. Supports multiple listeners per event."
  ],
  [
    "Write a function to deep compare two objects for equality.",
    "hard",
    "`function deepEqual(a, b, seen = new WeakSet()) { if (a === b) return true; if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false; if (seen.has(a) || seen.has(b)) return true; seen.add(a); seen.add(b); if (a.constructor !== b.constructor) return false; if (a instanceof Date) return a.getTime() === b.getTime(); if (a instanceof RegExp) return a.toString() === b.toString(); if (a instanceof Map) { if (a.size !== b.size) return false; for (const [k, v] of a) if (!deepEqual(v, b.get(k), seen)) return false; return true; } if (a instanceof Set) { if (a.size !== b.size) return false; return [...a].every(v => b.has(v)); } const keysA = Object.keys(a), keysB = Object.keys(b); if (keysA.length !== keysB.length) return false; return keysA.every(k => k in b && deepEqual(a[k], b[k], seen)); }`. Handles circular refs, Date, RegExp, Map, Set, Symbols via extra key handling."
  ],
  [
    "Implement a function that limits concurrency of async tasks (promise pool).",
    "hard",
    "`async function promisePool(tasks, limit = 3) { const results = new Array(tasks.length); const executing = new Set(); let index = 0; async function enqueue() { while (index < tasks.length) { const i = index++; const p = Promise.resolve(tasks[i]()).then(r => { results[i] = r; executing.delete(p); }); executing.add(p); if (executing.size >= limit) await Promise.race(executing); } } await enqueue(); await Promise.allSettled(executing); return results; }`. Runs up to `limit` tasks in parallel. Queues remaining tasks. Returns results in original order. Handles failures gracefully (use allSettled or let errors propagate based on need)."
  ],
  [
    "Write a polyfill for Array.prototype.map.",
    "med",
    "`if (!Array.prototype.map) { Array.prototype.map = function(callback, thisArg) { if (this == null) throw new TypeError('this is null or undefined'); if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function'); const arr = Object(this); const len = arr.length >>> 0; const result = new Array(len); for (let i = 0; i < len; i++) { if (i in arr) { result[i] = callback.call(thisArg, arr[i], i, arr); } } return result; }; }`. Checks for null this, validates callback, handles sparse arrays (doesn't iterate empty slots), returns new array of same length. The `>>> 0` ensures length is a valid 32-bit unsigned integer."
  ],
  [
    "Write a polyfill for Function.prototype.bind.",
    "hard",
    "`if (!Function.prototype.bind) { Function.prototype.bind = function(thisArg, ...boundArgs) { if (typeof this !== 'function') throw new TypeError('Bind must be called on a function'); const original = this; function bound(...args) { return original.apply(this instanceof bound ? this : thisArg, [...boundArgs, ...args]); } bound.prototype = Object.create(original.prototype); bound.prototype.constructor = bound; return bound; }; }`. Supports partial application, instanceof (constructor calls use original this context), preserves prototype chain via `Object.create`."
  ],
  [
    "Implement a function to chunk an array into groups of size n.",
    "easy",
    "`function chunk(arr, size) { const result = []; for (let i = 0; i < arr.length; i += size) { result.push(arr.slice(i, i + size)); } return result; }`. Example: `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`. Handles non-perfect division (last chunk smaller). Uses `slice` for clarity. Alternative: `Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))`."
  ],
  [
    "Write a function that groups an array of objects by a given key.",
    "med",
    "`function groupBy(arr, key) { return arr.reduce((acc, obj) => { const k = typeof key === 'function' ? key(obj) : obj[key]; if (!acc[k]) acc[k] = []; acc[k].push(obj); return acc; }, {}); }`. Supports string key or callback function. Example: `groupBy([{type:'a'},{type:'b'},{type:'a'}], 'type')` → `{a: [{type:'a'},{type:'a'}], b: [{type:'b'}]}`. Uses reduce for clean one-pass grouping."
  ],
  [
    "Implement a simple LRU cache.",
    "hard",
    "`class LRUCache { constructor(capacity) { this.capacity = capacity; this.cache = new Map(); } get(key) { if (!this.cache.has(key)) return -1; const value = this.cache.get(key); this.cache.delete(key); this.cache.set(key, value); return value; } put(key, value) { if (this.cache.has(key)) this.cache.delete(key); else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value); this.cache.set(key, value); } }`. Uses Map (maintains insertion order). `.get()` returns -1 for misses (classic spec). `.put()` evicts least recently used when at capacity. Both operations are O(1). The Map's `.keys().next().value` gets the oldest entry."
  ],
  [
    "Write a function to convert a callback-based API into a promise-based one.",
    "med",
    "`function promisify(fn) { return function(...args) { return new Promise((resolve, reject) => { fn(...args, (err, ...results) => { if (err) return reject(err); resolve(results.length === 1 ? results[0] : results); }); }); }; }`. Usage: `const readFilePromise = promisify(require('fs').readFile)`. Handles Node.js callback convention (error-first). Returns single result or array for multiple. For methods with `this`, use `promisify(obj.method.bind(obj))`. Node.js has built-in `util.promisify`."
  ],
  [
    "Implement a function that pipes multiple functions left to right (pipe).",
    "med",
    "`function pipe(...fns) { return (x) => fns.reduce((acc, fn) => fn(acc), x); }`. Usage: `const process = pipe(trim, capitalize, escapeHtml); process(' hello ')`. Executes functions LEFT to RIGHT (first function receives initial arg, result passes to next). Compare to `compose` (right to left). Pipe is more intuitive for data transformation pipelines. Each function must be unary (takes one arg)."
  ],
  [
    "Implement compose (right to left function composition).",
    "med",
    "`function compose(...fns) { return (x) => fns.reduceRight((acc, fn) => fn(acc), x); }`. Usage: `const process = compose(escapeHtml, capitalize, trim); process(' hello ')`. Executes RIGHT to LEFT (last function receives initial arg, result passes to previous). `pipe(left → right)` vs `compose(right → left)`. Compose matches mathematical composition: `(f ∘ g)(x) = f(g(x))`. Both require unary intermediate functions unless using spread."
  ],
  [
    "Write a function to remove duplicates from an array of objects by a property.",
    "med",
    "`function uniqueBy(arr, key) { const seen = new Set(); return arr.filter(item => { const k = typeof key === 'function' ? key(item) : item[key]; if (seen.has(k)) return false; seen.add(k); return true; }); }`. Example: `uniqueBy([{id:1},{id:2},{id:1}], 'id')` → `[{id:1},{id:2}]`. Uses Set for O(1) lookup. Supports string key or callback. Preserves original order (first occurrence kept)."
  ],
  [
    "Implement a recursive function to compute the nth Fibonacci with memoization.",
    "med",
    "`function fibonacci(n, memo = {}) { if (n <= 1) return n; if (memo[n] !== undefined) return memo[n]; memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); return memo[n]; }`. Without memoization, time complexity is O(2^n). With memoization: O(n). Iterative alternative: `function fib(n) { if (n <= 1) return n; let a = 0, b = 1; for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; } return b; }` — O(n) time, O(1) space."
  ],
  [
    "Write a function to deeply freeze an object.",
    "med",
    "`function deepFreeze(obj) { if (obj === null || typeof obj !== 'object') return obj; const propNames = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]; for (const name of propNames) { const value = obj[name]; if (value && typeof value === 'object' && !Object.isFrozen(value)) { deepFreeze(value); } } return Object.freeze(obj); }`. Recursively freezes all nested objects and arrays. Handles Symbols. The base check `Object.isFrozen` prevents infinite loops on circular references. Returns the frozen object."
  ],
  [
    "Implement a function that parses a query string into an object.",
    "med",
    "`function parseQueryString(str) { const params = new URLSearchParams(str); const result = {}; for (const [key, value] of params) { if (key in result) { result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value]; } else { result[key] = value; } } return result; }`. Example: `parseQueryString('?a=1&b=2&a=3')` → `{a: ['1','3'], b: '2'}`. Uses `URLSearchParams` (native). Handles duplicate keys (converts to array). Manually: split by `&`, then `=`, decodeURIComponent each."
  ],
  [
    "Write a function that serializes an object into a query string.",
    "med",
    "`function toQueryString(obj) { const params = new URLSearchParams(); for (const [key, value] of Object.entries(obj)) { if (Array.isArray(value)) { value.forEach(v => params.append(key, String(v))); } else { params.set(key, String(value)); } } return params.toString(); }`. Example: `toQueryString({a: 1, b: [2, 3]})` → `a=1&b=2&b=3`. Handles arrays (duplicate keys), ignores null/undefined values. Manually: encodeURIComponent on keys/values, join with `&`."
  ],
  [
    "Implement a simple Pub/Sub system.",
    "med",
    "`class PubSub { constructor() { this.subscribers = new Map(); } subscribe(event, callback) { if (!this.subscribers.has(event)) this.subscribers.set(event, new Set()); this.subscribers.get(event).add(callback); return () => this.unsubscribe(event, callback); } unsubscribe(event, callback) { this.subscribers.get(event)?.delete(callback); } publish(event, data) { this.subscribers.get(event)?.forEach(cb => { try { cb(data); } catch (e) { console.error('PubSub error:', e); } }); } once(event) { return new Promise(resolve => { const unsub = this.subscribe(event, data => { unsub(); resolve(data); }); }); } }`. `.subscribe()` returns unsubscribe function. `.once()` returns Promise for one-time event. Error isolation prevents one subscriber from breaking others."
  ],
  [
    "Write a function to detect if a string is a valid palindrome ignoring punctuation.",
    "easy",
    "`function isPalindrome(str) { const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); return cleaned === cleaned.split('').reverse().join(''); }`. Removes non-alphanumeric characters, converts to lowercase, compares string with its reverse. Two-pointer method (more efficient, no extra array): `function isPalindrome(str) { let s = 0, e = str.length - 1; while (s < e) { while (s < e && !/[a-zA-Z0-9]/.test(str[s])) s++; while (s < e && !/[a-zA-Z0-9]/.test(str[e])) e--; if (str[s].toLowerCase() !== str[e].toLowerCase()) return false; s++; e--; } return true; }`."
  ],
  [
    "Implement a function to find the intersection of two arrays.",
    "easy",
    "`function intersection(arr1, arr2) { const set2 = new Set(arr2); return [...new Set(arr1.filter(x => set2.has(x)))]; }`. Uses Set for O(1) lookup (O(n+m) time). Deduplicates result. For multiple arrays: `function intersectionOfAll(...arrays) { return arrays.reduce((acc, arr) => acc.filter(x => new Set(arr).has(x))); }`. For sorted arrays: two-pointer approach for O(n+m) without extra space."
  ],
  [
    "Write a custom implementation of JSON.stringify for simple objects.",
    "hard",
    "`function stringify(value) { if (value === null) return 'null'; if (typeof value === 'undefined' || typeof value === 'function' || typeof value === 'symbol') return undefined; if (typeof value === 'boolean' || typeof value === 'number') return String(value); if (typeof value === 'string') return `\"${value.replace(/\"/g, '\\\\\"').replace(/\n/g, '\\\\n').replace(/\t/g, '\\\\t')}\"`; if (Array.isArray(value)) { const items = value.map(v => { const s = stringify(v); return s === undefined ? 'null' : s; }); return `[${items.join(',')}]`; } if (typeof value === 'object') { const keys = Object.keys(value); const items = keys.filter(k => typeof value[k] !== 'function' && value[k] !== undefined).map(k => `\"${k}\":${stringify(value[k])}`); return `{${items.join(',')}}`; } return String(value); }`. Handles primitives, arrays, objects, null. Omits undefined/functions. Escapes quotes and newlines. Does NOT handle circular references, toJSON, or Symbol keys."
  ],
  [
    "Implement a function that runs async tasks in series and collects results.",
    "med",
    "`async function series(tasks) { const results = []; for (const task of tasks) { results.push(await (typeof task === 'function' ? task() : task)); } return results; }`. Runs tasks one after another (sequential). Supports both functions and promises. For parallel: use `Promise.all`. For limited concurrency: use promise pool. Series is useful when each task depends on the previous one's result, or when avoiding resource contention."
  ],
  [
    "Write a function that throttles using requestAnimationFrame.",
    "hard",
    "`function rafThrottle(fn) { let rafId = null; return function(...args) { if (rafId) return; rafId = requestAnimationFrame(() => { fn.apply(this, args); rafId = null; }); }; }`. Uses `requestAnimationFrame` to coalesce calls to the next frame (~16ms at 60fps). Ideal for visual updates (scroll, resize, animation). Automatically pauses when tab is hidden (unlike setTimeout). More efficient than setTimeout for rendering-related throttling. Returns `cancelAnimationFrame` for cleanup."
  ],
  [
    "Implement a function to convert a flat array with parentId into a tree.",
    "hard",
    "`function arrayToTree(items) { const map = new Map(items.map(i => [i.id, { ...i, children: [] }])); const roots = []; for (const item of map.values()) { if (item.parentId == null) { roots.push(item); } else { const parent = map.get(item.parentId); if (parent) parent.children.push(item); } } return roots; }`. One-pass using Map for O(n) time. Each item gets a `children` array. Items without parentId become roots. Items with non-existent parentId are orphaned (not included). Handles any order of items."
  ],
  [
    "Write a function that capitalizes the first letter of each word.",
    "easy",
    "`function capitalizeWords(str) { return str.replace(/\\b\\w/g, char => char.toUpperCase()); }`. Uses regex `\\b\\w` (word boundary + word character) to find first letter of each word. Alternative: `str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')`. The regex approach handles punctuation better. For title case (excluding articles): `function titleCase(str) { const excluded = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of']); return str.toLowerCase().split(' ').map((w, i) => i === 0 || !excluded.has(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' '); }`."
  ],
  [
    "Implement a once function that ensures a function runs only one time.",
    "med",
    "`function once(fn) { let called = false, result; return function(...args) { if (called) return result; called = true; result = fn.apply(this, args); return result; }; }`. After first call, returns cached result. Useful for initialization, event handler setup, or ensuring side effects happen only once. `_.once` from Lodash. The function's return value is cached and returned on subsequent calls, making it also a lazy initialization pattern."
  ],
  [
    "Write a function that schedules a task to run after the current call stack clears.",
    "med",
    "`function defer(fn) { return Promise.resolve().then(fn); }`. Uses Promise microtask — runs after current synchronous code but before next macrotask. For macrotask: `setTimeout(fn, 0)`. For microtask: `queueMicrotask(fn)`. For after next render: `requestAnimationFrame(fn)`. For idle: `requestIdleCallback(fn)`. Use cases: `defer(() => ...)` for non-urgent work that shouldn't block current execution. Microtask runs before setTimeout (higher priority)."
  ],

  // ── Tricky Output-Based ────────────────────────────────────────────────────
  [
    `What is the output of: console.log(typeof null + " " + typeof undefined)?`,
    "med",
    `Output: \"object undefined\". typeof null is \"object\" (historical bug from early JS). typeof undefined is \"undefined\". The + concatenates strings because both sides are strings.`
  ],
  [
    `What is the output of: console.log(0.1 + 0.2 === 0.3)?`,
    "easy",
    `Output: false. 0.1 + 0.2 = 0.30000000000000004 due to IEEE 754 floating-point precision. Never compare floats with ===. Use a tolerance: Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON.`
  ],
  [
    `What is the output of: console.log([] + [])?`,
    "med",
    `Output: '' (empty string). The + operator coerces arrays to primitives. [].toString() is '' for both, so '' + '' = ''.`
  ],
  [
    `What is the output of: console.log([] + {})?`,
    "med",
    `Output: \"[object Object]\". [] toString → '' (empty string). {} toString → \"[object Object]\". '' + \"[object Object]\" = \"[object Object]\".`
  ],
  [
    `What is the output of: console.log(1 < 2 < 3); console.log(3 > 2 > 1)?`,
    "hard",
    `Output: true, false. 1 < 2 is true → true < 3 → 1 < 3 → true. 3 > 2 is true → true > 1 → 1 > 1 → false. The boolean comparators are evaluated left-to-right and coerced to numbers (true=1, false=0).`
  ],
  [
    `What is the output of: console.log([1,2,3] + [4,5,6])?`,
    "med",
    `Output: \"1,2,34,5,6\". Arrays are toString'd: \"1,2,3\" + \"4,5,6\" = \"1,2,34,5,6\". Not concatenation of arrays — that uses .concat().`
  ],
  [
    `What is the output of: console.log(typeof NaN)?`,
    "easy",
    `Output: \"number\". NaN is a numeric value despite meaning \"Not a Number\". It's the result of invalid number operations like 0/0, parseInt('abc').`
  ],
  [
    `What is the output of: console.log(0.1 + 0.2)?`,
    "med",
    `Output: 0.30000000000000004. Due to IEEE 754 floating-point representation. 0.1 and 0.2 cannot be represented exactly in binary.`
  ],
  [
    `What is the output of: var a = 1; function f(){ console.log(a); var a = 2; } f()?`,
    "hard",
    `Output: undefined. Due to hoisting: the var a inside f() is hoisted to top of function scope but initialized as undefined. The outer a is shadowed by the hoisted var.`
  ],
  [
    `What is the output of: for(var i=0;i<3;i++){ setTimeout(()=>console.log(i),0); }?`,
    "hard",
    `Output: 3, 3, 3. var i is function-scoped to the global scope. By the time setTimeout callbacks run, the loop has finished and i = 3. All three closures reference the same i.`
  ],
  [
    `What is the output of: for(let i=0;i<3;i++){ setTimeout(()=>console.log(i),0); }?`,
    "hard",
    `Output: 0, 1, 2. let i is block-scoped per iteration. Each setTimeout closure captures a different i value (new binding per loop iteration).`
  ],
  [
    `What is the output of: console.log(1 + "2" + 3)?`,
    "easy",
    `Output: \"123\". 1 + \"2\" performs string concatenation (number + string → string), producing \"12\". Then \"12\" + 3 → \"123\".`
  ],
  [
    `What is the output of: console.log("5" - 2 + "1")?`,
    "med",
    `Output: \"31\". \"5\" - 2 → 3 (subtraction coerces to number). 3 + \"1\" → \"31\" (addition with string does concatenation).`
  ],
  [
    `What is the output of: console.log([1,2,3].map(parseInt))?`,
    "hard",
    `Output: [1, NaN, NaN]. parseInt accepts (string, radix). map passes (element, index, array). So: parseInt('1', 0) → 1 (0 defaults to 10), parseInt('2', 1) → NaN (invalid radix), parseInt('3', 2) → NaN (binary has no 3).`
  ],
  [
    `What is the output of: console.log(!!"false" == !!"true")?`,
    "med",
    `Output: true. \"false\" is a non-empty string → truthy → !!\"false\" is true. Same for \"true\". Both are true. true == true → true.`
  ],
  [
    `What is the output of: const o = {}; console.log(o.toString())?`,
    "med",
    `Output: \"[object Object]\". The default toString from Object.prototype returns this string. Can be overridden by custom toString.`
  ],
  [
    `What is the output of: console.log(null == undefined, null === undefined)?`,
    "med",
    `Output: true, false. == uses loose equality — null and undefined are equal by spec. === checks type mismatch (null is object, undefined is undefined).`
  ],
  [
    `What is the output of: console.log(NaN === NaN)?`,
    "easy",
    `Output: false. NaN is the only value not equal to itself. Use Number.isNaN() or Object.is(NaN, NaN) which returns true.`
  ],
  [
    `What is the output of: async function f(){ return 1; } console.log(f())?`,
    "med",
    `Output: Promise {<resolved>: 1}. async functions always return a Promise. The resolved value is the returned value. Use await or .then() to get 1.`
  ],
  [
    `What is the output of: console.log("a","b"); console.log(Promise.resolve(1))?`,
    "med",
    `Output: \"a\", then Promise {<resolved>: 1}. console.log takes multiple args — each argument is logged separately. Promise.resolve returns a resolved promise.`
  ],
  [
    `What is the output order of: console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4)?`,
    "hard",
    `Output: 1, 4, 3, 2. Sync: 1, 4 run first. Microtask queue: .then(3) runs before macrotask queue: setTimeout(2).`
  ],
  [
    `What is the output of: const obj = { a: 1, b: this.a }; console.log(obj.b)?`,
    "hard",
    `Output: undefined. In a plain object literal, this refers to the outer context (global/window/undefined in strict mode), not the object being created. obj.a is accessible inside methods, not property values.`
  ],
  [
    `What is the output of: function f(){ return; { ok: true } } console.log(f())?`,
    "hard",
    `Output: undefined. Automatic semicolon insertion: return; (with semicolon) returns undefined. The { ok: true } is a block (not object literal). No unreachable error.`
  ],
  [
    `What is the output of: console.log(0 == "")?`,
    "med",
    `Output: true. Loose equality coerces empty string to 0. Number('') → 0. 0 == 0 → true. Strict equality 0 === \"\" → false.`
  ],
  [
    `What is the output of: console.log([] == ![])?`,
    "hard",
    `Output: true. ![] → false (truthy value inverted). [] == false → both sides coerced: [].toString() → '' → Number('') → 0, false → 0. So 0 == 0.`
  ],
  [
    `What is the output of: let x = (1,2,3); console.log(x)?`,
    "med",
    `Output: 3. The comma operator evaluates each expression left-to-right and returns the last one. (1,2,3) returns 3. Usually used in for loops.`
  ],
  [
    `What is the output of: console.log(typeof typeof 1)?`,
    "med",
    `Output: \"string\". typeof 1 returns \"number\". typeof \"number\" returns \"string\".`
  ],
  [
    `What is the output of: console.log((function(){ return typeof arguments; })())?`,
    "med",
    `Output: \"object\". arguments is an array-like object, not a true array. Its typeof is \"object\". In modern code, use rest params (...args) which is a real array.`
  ],
  [
    `What is the output of: const a = [1,2,3]; a.length = 0; console.log(a[0])?`,
    "easy",
    `Output: undefined. Setting array length to 0 truncates the array. All elements are removed. a becomes []. a[0] is undefined.`
  ],
  [
    `What is the output of: console.log(parseInt("0x10"), parseInt("10", 2))?`,
    "hard",
    `Output: 16, 2. parseInt(\"0x10\") detects the 0x prefix and parses as hexadecimal (base 16) → 16. parseInt(\"10\", 2) parses binary → 2.`
  ],
];
