# 🚀 JavaScript Interview Preparation Guide
## Questions 76–100 | Senior Engineer Edition

> **Crafted by a Senior JavaScript Engineer** with 15+ years at Google, Amazon, Microsoft, Netflix, and Meta.
> Covers: Optional Chaining · Nullish Coalescing · `this` Keyword · `call()` · `apply()` · `bind()` · Classes · OOP · Prototypes · Prototype Chain · Inheritance

---

## 📋 Table of Contents

| Range | Difficulty | Topics |
|-------|------------|--------|
| Q76–Q82 | 🟢 Beginner | Optional Chaining, Nullish Coalescing, `this` Basics |
| Q83–Q92 | 🟡 Intermediate | `call()`, `apply()`, `bind()`, Classes, OOP Pillars |
| Q93–Q100 | 🔴 Advanced | Prototypes, Prototype Chain, Inheritance, Deep Internals |

---

## 🟢 BEGINNER LEVEL (Q76–Q82)

---

### Q76 — What is Optional Chaining (`?.`) in JavaScript?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Optional Chaining |
| **Asked At** | Google, Amazon, Meta |

#### 📌 Interview Question
> *"What is optional chaining? Why was it introduced, and how does it prevent runtime errors?"*

#### 📖 Detailed Answer

Optional chaining (`?.`) is a safe property-access operator introduced in **ES2020 (ES11)**. It allows you to read the value of a property located deep within a chain of connected objects **without having to explicitly validate that each reference in the chain is valid**.

Before `?.`, accessing deeply nested properties required verbose null-checks:

```javascript
// ❌ Old way — verbose and error-prone
const city = user && user.address && user.address.city;

// ✅ Modern way — clean and safe
const city = user?.address?.city;
```

If any reference in the chain is `null` or `undefined`, the expression **short-circuits** and returns `undefined` instead of throwing a `TypeError`.

#### 🧠 Simple Explanation

Think of it as a "polite knock before entering." Before opening each door, it asks: *"Does this room exist?"* If not, it quietly returns `undefined` instead of crashing.

#### 🌍 Real-World Example

```javascript
// Scenario: Fetching user profile from an API
// Some users may not have a billing address

const user = {
  name: "Alice",
  profile: {
    subscription: {
      plan: "Pro",
      billing: null // no billing address set
    }
  }
};

// ❌ This CRASHES with: TypeError: Cannot read properties of null
const zip = user.profile.subscription.billing.zipCode;

// ✅ Optional chaining — safely returns undefined
const zip = user?.profile?.subscription?.billing?.zipCode;
console.log(zip); // undefined — no crash!
```

#### 💻 JavaScript Code Example

```javascript
// 1. Object property access
const user = { address: { city: "New York" } };
console.log(user?.address?.city);      // "New York"
console.log(user?.phone?.number);      // undefined (no crash)

// 2. Method calls with ?.()
const obj = {
  greet() { return "Hello!"; }
};
console.log(obj.greet?.());    // "Hello!"
console.log(obj.farewell?.());  // undefined (method doesn't exist)

// 3. Array/bracket notation with ?.[]
const arr = [1, 2, 3];
console.log(arr?.[0]);         // 1
console.log(null?.[0]);        // undefined

// 4. Chaining with function calls
const config = null;
const timeout = config?.getSettings?.()?.timeout ?? 3000;
console.log(timeout); // 3000 (fallback via ??)

// 5. Short-circuit evaluation
let counter = 0;
const obj2 = null;
obj2?.doSomething(counter++);
console.log(counter); // 0 — right side was never evaluated!
```

#### 🔄 Execution Flow Diagram

```
user?.address?.city

Step 1: Is `user` null or undefined?
        ├── YES → return undefined immediately (short-circuit)
        └── NO  → access user.address

Step 2: Is `user.address` null or undefined?
        ├── YES → return undefined immediately (short-circuit)
        └── NO  → access user.address.city

Step 3: Return user.address.city value
```

#### 💡 Important Interview Tips

- `?.` returns `undefined`, not `null`, on failure
- It short-circuits — **side effects on the right won't execute** if left side is nullish
- Works with bracket notation `?.[]` and function calls `?.()`
- Cannot be used on the **left side** of an assignment: `obj?.prop = value` ❌

#### ⚠️ Common Mistakes

```javascript
// ❌ Mistake 1: Overusing it — masks actual bugs
const name = user?.name; // If user is ALWAYS expected, don't use ?.

// ❌ Mistake 2: Confusing with regular dot (not needed for top-level)
const x = undefined?.y?.z; // Fine, but redundant first ?.

// ❌ Mistake 3: Left-side assignment
obj?.key = "value"; // SyntaxError!

// ✅ Correct pattern for deep nesting
const value = response?.data?.items?.[0]?.title ?? "No title";
```

#### 🔁 Follow-up Questions an Interviewer May Ask

1. *"What's the difference between `?.` and regular `&&` short-circuiting?"*
2. *"Can you combine `?.` with `??`? Give an example."*
3. *"Does `?.` work with `delete`? E.g., `delete obj?.prop`?"* *(Yes, it does!)*
4. *"What is the performance implication of over-using optional chaining?"*

---

### Q77 — What is Nullish Coalescing (`??`) and how does it differ from `||`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Nullish Coalescing |
| **Asked At** | Netflix, Microsoft, Amazon |

#### 📌 Interview Question
> *"Explain the `??` operator. When would you use it over `||`? Show a case where `||` fails but `??` works correctly."*

#### 📖 Detailed Answer

The **Nullish Coalescing operator (`??`)**, introduced in **ES2020**, returns the right-hand side operand only when the left-hand side is **`null` or `undefined`**.

The key distinction from `||`:
- `||` returns right side if left is **falsy** (`false`, `0`, `""`, `null`, `undefined`, `NaN`)
- `??` returns right side **only** if left is **`null` or `undefined`**

This is critical when `0`, `""`, or `false` are **valid values** you don't want to override.

#### 🧠 Simple Explanation

`||` asks: *"Is the left side falsy? Use the right."*
`??` asks: *"Is the left side missing (null/undefined)? Use the right."*

#### 🌍 Real-World Example

```javascript
// A user configuration object where 0 and "" are valid settings
const userConfig = {
  volume: 0,        // Muted — this is intentional!
  username: "",     // Empty username — user cleared it intentionally
  timeout: null     // Not configured yet
};

// ❌ WRONG: Using || — incorrectly overrides valid falsy values
const volume   = userConfig.volume   || 50;    // 50 ❌ (0 was valid!)
const username = userConfig.username || "Guest"; // "Guest" ❌ ("" was valid!)
const timeout  = userConfig.timeout  || 5000;  // 5000 ✅ (null → default)

// ✅ CORRECT: Using ?? — only replaces null/undefined
const volume2   = userConfig.volume   ?? 50;    // 0    ✅ (preserved!)
const username2 = userConfig.username ?? "Guest"; // ""   ✅ (preserved!)
const timeout2  = userConfig.timeout  ?? 5000;  // 5000 ✅ (null → default)
```

#### 💻 JavaScript Code Example

```javascript
// Comparison table
const values = [null, undefined, 0, "", false, NaN, "hello", 42];

values.forEach(v => {
  console.log(`Value: ${JSON.stringify(v)}`);
  console.log(`  || "default" → ${v || "default"}`);
  console.log(`  ?? "default" → ${v ?? "default"}`);
  console.log("---");
});

/*
null       → || "default",  ?? "default"
undefined  → || "default",  ?? "default"
0          → || "default",  ?? 0          ← DIFFERENCE!
""         → || "default",  ?? ""         ← DIFFERENCE!
false      → || "default",  ?? false      ← DIFFERENCE!
NaN        → || "default",  ?? NaN        ← DIFFERENCE!
"hello"    → || "hello",    ?? "hello"
42         → || 42,         ?? 42
*/

// Combining with optional chaining (most common real-world pattern)
const api = {
  getUser: () => ({ name: "", age: 0, verified: false })
};

const user = api.getUser();
const displayName = user?.name ?? "Anonymous";   // "" (not replaced)
const userAge     = user?.age  ?? 18;            // 0  (not replaced)
const isVerified  = user?.verified ?? true;      // false (not replaced)

console.log(displayName, userAge, isVerified);   // "" 0 false
```

#### ⚠️ Operator Precedence — Tricky Interview Question!

```javascript
// ❌ SyntaxError: Cannot mix && or || with ??
const x = a || b ?? c;   // SyntaxError
const y = a && b ?? c;   // SyntaxError

// ✅ Must use explicit parentheses
const x = (a || b) ?? c;  // OK
const y = a || (b ?? c);  // OK

// Why? JavaScript designers made it explicit to avoid bugs
```

#### 💡 Important Interview Tips

- `??` only cares about `null` and `undefined`, nothing else
- Use `??` when `0`, `false`, or `""` are **meaningful values**
- Use `||` only when ALL falsy values should trigger the default
- Combine `?.` and `??` for the most idiomatic modern JS: `obj?.prop ?? "default"`

#### ⚠️ Common Mistakes

```javascript
// ❌ Using || where ?? is needed
function setVolume(vol) {
  this.volume = vol || 100; // Bug: setVolume(0) sets 100!
}

// ✅ Correct
function setVolume(vol) {
  this.volume = vol ?? 100; // setVolume(0) correctly sets 0
}

// ❌ Forgetting parentheses when mixing
const val = a || b ?? c; // SyntaxError
```

#### 🔁 Follow-up Questions

1. *"What does `??=` do?"* (`a ??= b` means: assign `b` to `a` only if `a` is null/undefined)
2. *"How does `??` relate to optional chaining in real APIs?"*
3. *"What is the `||=` operator and how is it different from `??=`?"*

---

### Q78 — What is the `this` keyword in JavaScript?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | `this` Keyword |
| **Asked At** | Google, Meta, Amazon |

#### 📌 Interview Question
> *"Explain `this` in JavaScript. How does its value get determined? Give examples in different contexts."*

#### 📖 Detailed Answer

`this` is a **special keyword** that refers to the **execution context** — the object that is currently executing the code. Unlike most languages where `this` is fixed, in JavaScript `this` is **dynamically bound** at call time, not at definition time (with the exception of arrow functions).

**The 4 Rules for `this` binding (in order of precedence):**

| Priority | Rule | How |
|----------|------|-----|
| 1 (Highest) | `new` binding | `new Foo()` — `this` is the new object |
| 2 | Explicit binding | `.call()`, `.apply()`, `.bind()` |
| 3 | Implicit binding | `obj.method()` — `this` is `obj` |
| 4 (Lowest) | Default binding | Plain call `foo()` — `this` is global/undefined |

#### 🧠 Simple Explanation

`this` is like asking *"Who called me?"* The answer changes depending on **how** the function is called, not where it's defined.

#### 💻 JavaScript Code Example

```javascript
// ── Rule 4: Default Binding ──────────────────────────────
function showThis() {
  console.log(this);
}
showThis(); // window (browser) | global (Node) | undefined (strict mode)

// ── Rule 3: Implicit Binding ─────────────────────────────
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};
user.greet(); // "Hello, I'm Alice" — this = user

// ── Implicit Binding Loss (Classic Interview Trap!) ───────
const greetFn = user.greet;  // Detached from user!
greetFn(); // "Hello, I'm undefined" — this = global/undefined

// ── Rule 1: new Binding ──────────────────────────────────
function Person(name) {
  this.name = name; // this = the newly created object
}
const bob = new Person("Bob");
console.log(bob.name); // "Bob"

// ── Arrow Functions: Lexical this ─────────────────────────
const timer = {
  seconds: 0,
  start() {
    // Regular function — this is lost inside setInterval
    setInterval(function() {
      this.seconds++; // ❌ this = window, not timer!
    }, 1000);

    // Arrow function — this is lexically inherited from start()
    setInterval(() => {
      this.seconds++; // ✅ this = timer
    }, 1000);
  }
};
```

#### 🔄 `this` Context Decision Tree

```
How was the function called?
│
├── new Foo()           → this = newly created object
├── foo.call(ctx)       → this = ctx (explicit)
├── foo.apply(ctx)      → this = ctx (explicit)
├── foo.bind(ctx)()     → this = ctx (explicit)
├── obj.foo()           → this = obj (implicit)
├── Arrow function      → this = enclosing lexical scope
└── foo() plain call
    ├── strict mode     → this = undefined
    └── non-strict      → this = global object
```

#### 💡 Important Interview Tips

- Arrow functions **do not have their own `this`** — they inherit from enclosing scope
- `this` in class methods behaves like implicit binding
- In event listeners, `this` = the DOM element that fired the event
- `this` inside `setTimeout` is `window` unless arrow function or `.bind()` is used

#### ⚠️ Common Mistakes

```javascript
// ❌ Mistake: Losing 'this' when passing method as callback
class Button {
  constructor(label) { this.label = label; }
  click() { console.log(`Clicked: ${this.label}`); }
}
const btn = new Button("Submit");
document.addEventListener("click", btn.click);       // ❌ this = <button>
document.addEventListener("click", btn.click.bind(btn)); // ✅ this = btn

// ❌ Mistake: Using arrow function as object method
const obj = {
  name: "Test",
  greet: () => console.log(this.name) // this = global/undefined!
};
```

#### 🔁 Follow-up Questions

1. *"What's the difference between `this` in strict vs non-strict mode?"*
2. *"How does `this` work in class fields vs class methods?"*
3. *"Can you change `this` inside an arrow function using `.call()`?"* *(No, you can't!)*

---

### Q79 — What are `call()` and `apply()`? How do they differ?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | `call()`, `apply()` |
| **Asked At** | Amazon, Microsoft, Flipkart |

#### 📌 Interview Question
> *"Explain `call()` and `apply()`. When would you choose one over the other?"*

#### 📖 Detailed Answer

Both `call()` and `apply()` are methods on `Function.prototype` that allow you to **explicitly set the `this` context** when calling a function. The only difference is **how arguments are passed**:

- `call(thisArg, arg1, arg2, ...)` — arguments passed **individually**
- `apply(thisArg, [arg1, arg2, ...])` — arguments passed as an **array**

**Memory trick:** `apply` → **A**rray, `call` → **C**omma-separated

#### 💻 JavaScript Code Example

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

// call() — pass args individually
introduce.call(person1, "Hello", "!");   // "Hello, I'm Alice!"
introduce.call(person2, "Hi", ".");      // "Hi, I'm Bob."

// apply() — pass args as array
introduce.apply(person1, ["Hello", "!"]); // "Hello, I'm Alice!"
introduce.apply(person2, ["Hi", "."]);    // "Hi, I'm Bob."

// ── Real-World Use Cases ──────────────────────────────────

// 1. Borrowing Array methods for array-like objects
function logArgs() {
  // arguments is array-like, not a real array
  const args = Array.prototype.slice.call(arguments);
  console.log(args); // real array now
}
logArgs(1, 2, 3); // [1, 2, 3]

// 2. Finding max in an array (classic apply trick)
const numbers = [5, 1, 9, 3, 7];
const max = Math.max.apply(null, numbers); // 9
// Modern equivalent: Math.max(...numbers)

// 3. call() for constructor borrowing (inheritance pattern)
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}
function Dog(name) {
  Animal.call(this, name, "Woof"); // borrow Animal constructor
}
const rex = new Dog("Rex");
console.log(rex.name, rex.sound); // "Rex" "Woof"
```

#### 💡 Important Interview Tips

- Use `call` when args are known and finite
- Use `apply` when args are in an array or dynamically collected
- Both are essentially superseded by spread syntax: `fn.call(ctx, ...args)` ≈ `fn.apply(ctx, args)`
- First argument to both is `this` — passing `null` sets `this` to global (or `undefined` in strict mode)

#### ⚠️ Common Mistakes

```javascript
// ❌ Swapping argument styles
fn.call(ctx, [1, 2, 3]);   // Passes ONE argument: an array
fn.apply(ctx, 1, 2, 3);    // TypeError: args must be array-like

// ✅ Correct
fn.call(ctx, 1, 2, 3);     // Three separate arguments
fn.apply(ctx, [1, 2, 3]);  // Array of three arguments
```

#### 🔁 Follow-up Questions

1. *"What happens if you pass `null` as the `this` argument?"*
2. *"How would you implement `Function.prototype.call` from scratch?"*
3. *"Which is faster: `call` or `apply`? Does it matter?"*

---

### Q80 — What is `bind()`? How is it different from `call()` and `apply()`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | `bind()` |
| **Asked At** | Google, Uber, Swiggy |

#### 📌 Interview Question
> *"What does `bind()` return? How is it different from `call()` and `apply()`? When would you use it?"*

#### 📖 Detailed Answer

`bind()` creates and returns a **new function** with `this` permanently bound to the provided value. Unlike `call()` and `apply()` which **invoke** the function immediately, `bind()` **defers** execution.

| Method | Invokes Immediately? | Returns |
|--------|---------------------|---------|
| `call()` | ✅ Yes | Return value of function |
| `apply()` | ✅ Yes | Return value of function |
| `bind()` | ❌ No | New bound function |

#### 💻 JavaScript Code Example

```javascript
function greet(greeting, name) {
  return `${greeting}, ${name}! I am ${this.role}.`;
}

const context = { role: "Admin" };

// call/apply — executes immediately
console.log(greet.call(context, "Hello", "Alice"));  // "Hello, Alice! I am Admin."

// bind — returns a new function, does NOT execute
const boundGreet = greet.bind(context);
console.log(boundGreet("Hi", "Bob")); // "Hi, Bob! I am Admin."

// ── Partial Application (Pre-filling arguments) ───────────
const helloGreet = greet.bind(context, "Hello"); // pre-fills 'greeting'
console.log(helloGreet("Alice")); // "Hello, Alice! I am Admin."
console.log(helloGreet("Bob"));   // "Hello, Bob! I am Admin."

// ── Event Handler Use Case (Most Common Real-World Use) ───
class Counter {
  constructor() {
    this.count = 0;
    // bind ensures 'this' = the Counter instance in the callback
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();
document.getElementById("btn").addEventListener("click", counter.increment);
// Works! 'this' is always the Counter instance

// ── React Class Component Pattern ─────────────────────────
// (Historically important interview pattern)
class MyComponent {
  constructor() {
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); // React pattern
  }
  handleClick() {
    console.log(this.state.count);
  }
}
```

#### 🔄 Bind Internals — Simplified Polyfill

```javascript
// Understanding bind by implementing it
Function.prototype.myBind = function(thisArg, ...presetArgs) {
  const originalFn = this; // the function being bound

  return function(...laterArgs) {
    return originalFn.call(thisArg, ...presetArgs, ...laterArgs);
  };
};

// Test it
function multiply(a, b) { return a * b; }
const double = multiply.myBind(null, 2); // preset a=2
console.log(double(5));  // 10
console.log(double(7));  // 14
```

#### 💡 Important Interview Tips

- `bind()` is for **deferred** execution — callbacks, event handlers, timers
- A bound function's `this` **cannot be overridden** even with `call()` or `apply()`
- `bind()` supports **partial application** — pre-filling some arguments
- Arrow functions are an alternative to `bind(this)` in modern code

#### ⚠️ Common Mistakes

```javascript
// ❌ Trying to rebind a bound function
function foo() { return this.x; }
const bound = foo.bind({ x: 1 });
const rebound = bound.call({ x: 2 });
console.log(rebound); // 1 — original binding wins!

// ❌ Calling bind every render (performance issue in React)
// <button onClick={this.handleClick.bind(this)}>  // Creates new fn every render

// ✅ Bind once in constructor or use arrow function
```

#### 🔁 Follow-up Questions

1. *"Can you rebind a function that's already been bound?"* *(No)*
2. *"How does `bind()` work with `new`?"* (`new` overrides the bound `this`)
3. *"Implement `Function.prototype.bind` from scratch."*

---

### Q81 — What is a JavaScript Class? How does it relate to constructor functions?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | Classes |
| **Asked At** | Google, Microsoft, Razorpay |

#### 📌 Interview Question
> *"What are JavaScript classes? Are they 'real' classes like in Java/C++? What is the difference between a class and a constructor function?"*

#### 📖 Detailed Answer

JavaScript classes, introduced in **ES6 (ES2015)**, are **syntactic sugar over the prototype-based inheritance** that already existed. They are **not** class-based OOP like Java — under the hood, JavaScript remains prototype-based.

```javascript
// ── Constructor Function (ES5) ─────────────────────────
function PersonES5(name, age) {
  this.name = name;
  this.age = age;
}
PersonES5.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

// ── Class (ES6) — same thing, cleaner syntax ───────────
class PersonES6 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

// Proof they're the same under the hood:
console.log(typeof PersonES6);           // "function"!
console.log(PersonES6 === PersonES6.prototype.constructor); // true
```

#### 💻 Full Class Example

```javascript
class BankAccount {
  // Class field (ES2022)
  #balance = 0; // Private field (truly private!)

  constructor(owner, initialDeposit = 0) {
    this.owner = owner;
    this.#balance = initialDeposit;
  }

  // Instance method
  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    return this;  // enables method chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this;
  }

  // Getter
  get balance() {
    return this.#balance;
  }

  // Static method — called on class, not instance
  static createSavings(owner) {
    return new BankAccount(owner, 1000); // bonus!
  }

  toString() {
    return `BankAccount(${this.owner}: $${this.#balance})`;
  }
}

const account = new BankAccount("Alice", 500);
account.deposit(200).withdraw(100); // method chaining
console.log(account.balance); // 600

const savings = BankAccount.createSavings("Bob");
console.log(savings.balance); // 1000
```

#### 💡 Important Interview Tips

- `class` declarations are **not hoisted** (unlike function declarations)
- Class bodies always run in **strict mode**
- `#fieldName` creates truly private fields (not accessible outside class)
- `static` methods/fields belong to the class, not instances

#### ⚠️ Common Mistakes

```javascript
// ❌ Trying to hoist a class
const obj = new MyClass(); // ReferenceError: Cannot access before initialization
class MyClass {}

// ❌ Adding methods to class with commas (not like object literals)
class Bad {
  methodA() {},  // ❌ SyntaxError — no commas between methods!
  methodB() {}
}

// ✅ No commas between class methods
class Good {
  methodA() {}
  methodB() {}
}
```

#### 🔁 Follow-up Questions

1. *"What's the difference between class methods and class fields?"*
2. *"Are JavaScript classes truly classes in the OOP sense?"*
3. *"What is a private class field `#field` vs a convention like `_field`?"*

---

### Q82 — What are the four pillars of OOP? How does JavaScript support them?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟢 Beginner |
| **Topic** | OOP |
| **Asked At** | Infosys, TCS, Wipro, Accenture |

#### 📌 Interview Question
> *"Name and explain the four pillars of OOP. Show how JavaScript implements each one."*

#### 📖 Detailed Answer

| Pillar | Concept | JS Mechanism |
|--------|---------|-------------|
| **Encapsulation** | Bundle data + behavior, hide internals | Private fields `#`, closures, getters/setters |
| **Abstraction** | Expose only what's needed | Methods, interfaces, hiding complexity |
| **Inheritance** | Reuse behavior from parent | `extends`, `super`, prototype chain |
| **Polymorphism** | Same interface, different behavior | Method overriding, duck typing |

#### 💻 All Four Pillars in Code

```javascript
// ── 1. ENCAPSULATION ──────────────────────────────────────
class User {
  #password; // private — only accessible within class

  constructor(name, password) {
    this.name = name;        // public
    this.#password = password;
  }

  checkPassword(input) {
    return input === this.#password; // controlled access
  }
}
const u = new User("Alice", "secret123");
// console.log(u.#password); // SyntaxError — truly private!
console.log(u.checkPassword("secret123")); // true

// ── 2. ABSTRACTION ────────────────────────────────────────
class CoffeeMachine {
  #heatWater() { return "Water heated"; }    // internal detail
  #grindBeans() { return "Beans ground"; }   // internal detail

  makeCoffee() {  // public interface — user doesn't care about internals
    this.#heatWater();
    this.#grindBeans();
    return "☕ Coffee ready!";
  }
}
const machine = new CoffeeMachine();
console.log(machine.makeCoffee()); // ☕ Coffee ready!

// ── 3. INHERITANCE ────────────────────────────────────────
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  speak() { // Override parent method
    return `${this.name} barks: Woof!`;
  }
  fetch() { return `${this.name} fetches the ball!`; }
}

class Cat extends Animal {
  speak() {
    return `${this.name} meows: Meow!`;
  }
}

// ── 4. POLYMORPHISM ───────────────────────────────────────
const animals = [new Dog("Rex"), new Cat("Whiskers"), new Animal("Generic")];

// Same interface (.speak()), different behavior per class
animals.forEach(animal => console.log(animal.speak()));
// "Rex barks: Woof!"
// "Whiskers meows: Meow!"
// "Generic makes a sound"
```

#### 🔁 Follow-up Questions

1. *"How does JavaScript handle multiple inheritance?"* *(It doesn't natively — use mixins)*
2. *"What is the difference between classical and prototypal inheritance?"*
3. *"How do you achieve abstraction in JavaScript without interfaces?"*

---

## 🟡 INTERMEDIATE LEVEL (Q83–Q92)

---

### Q83 — What is a Prototype in JavaScript?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Prototypes |
| **Asked At** | Google, Amazon, Goldman Sachs |

#### 📌 Interview Question
> *"What is a prototype in JavaScript? How does `__proto__` differ from `prototype`? This is a critical distinction — explain with code."*

#### 📖 Detailed Answer

Every JavaScript **object** has an internal link to another object called its **prototype**. This prototype itself is an object, and it too has a prototype — forming a chain up to `Object.prototype`, whose prototype is `null`.

Two key properties — often confused:

| Property | Lives On | Points To |
|----------|----------|-----------|
| `prototype` | **Functions** only | The object that will become `__proto__` of instances |
| `__proto__` | **Every object** | The object's actual prototype (its "parent") |

```
Function.prototype ← the template for new instances
instance.__proto__ ← points to Function.prototype
```

#### 💻 JavaScript Code Example

```javascript
function Dog(name) {
  this.name = name;
}

// Dog.prototype is the object that ALL Dog instances inherit from
Dog.prototype.bark = function() {
  return `${this.name} says: Woof!`;
};
Dog.prototype.species = "Canis lupus familiaris";

const rex = new Dog("Rex");
const bella = new Dog("Bella");

// Checking the prototype chain
console.log(rex.__proto__ === Dog.prototype);          // true ✅
console.log(Dog.prototype.constructor === Dog);        // true ✅
console.log(rex.__proto__.__proto__ === Object.prototype); // true ✅
console.log(Object.prototype.__proto__);               // null (top of chain)

// Rex doesn't own 'bark' — it inherits it
console.log(rex.hasOwnProperty("name"));  // true  — own property
console.log(rex.hasOwnProperty("bark"));  // false — inherited!

// But both instances share the same bark function (memory efficient)
console.log(rex.bark === bella.bark); // true — same reference!

// ── Object.getPrototypeOf() (preferred over __proto__) ───
console.log(Object.getPrototypeOf(rex) === Dog.prototype); // true

// ── Prototype chain visualization ─────────────────────────
// rex  ──__proto__──►  Dog.prototype  ──__proto__──►  Object.prototype  ──►  null
//   .name (own)           .bark (shared)                .toString()
//                         .species (shared)             .hasOwnProperty()
```

#### 🔄 Prototype Diagram

```
┌─────────────┐
│  rex object  │
│  name: "Rex" │──__proto__──►  ┌────────────────────┐
└─────────────┘                 │   Dog.prototype     │
                                │   bark: function    │──__proto__──►  ┌──────────────────────┐
┌──────────────┐                │   species: string   │                │   Object.prototype   │
│  bella object │──__proto__──► │   constructor: Dog  │                │   toString()         │──► null
│  name:"Bella" │               └────────────────────┘                │   hasOwnProperty()   │
└──────────────┘                                                       └──────────────────────┘
```

#### 💡 Important Interview Tips

- Use `Object.getPrototypeOf(obj)` instead of `obj.__proto__` (which is deprecated)
- Methods on `prototype` are **shared** across instances — saves memory
- Properties set in constructor (`this.x`) are **own properties** per instance
- `Object.create(proto)` creates an object with a specified prototype

#### ⚠️ Common Mistakes

```javascript
// ❌ Overwriting prototype loses constructor reference
Dog.prototype = { bark() {} }; // constructor now points to Object, not Dog!

// ✅ Correct way — preserve constructor
Dog.prototype = {
  constructor: Dog, // restore it!
  bark() {}
};

// ❌ Adding to Object.prototype (pollutes all objects!)
Object.prototype.myMethod = function() {}; // Very bad practice!
```

#### 🔁 Follow-up Questions

1. *"What does `Object.create(null)` create and when would you use it?"*
2. *"What is the difference between prototype-based and class-based inheritance?"*
3. *"How does property lookup work through the prototype chain?"*

---

### Q84 — Explain the Prototype Chain with a detailed example.

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Prototype Chain |
| **Asked At** | Google, Netflix, Adobe |

#### 📌 Interview Question
> *"Explain how the prototype chain works. What happens when you access a property that doesn't exist on an object? Trace through the chain."*

#### 📖 Detailed Answer

The prototype chain is JavaScript's mechanism for **property lookup**. When you access `obj.prop`, the engine:

1. Checks if `obj` has own property `prop`
2. If not, checks `obj.__proto__` (its prototype)
3. Then checks `obj.__proto__.__proto__`
4. Continues up until `null` is reached
5. Returns `undefined` if not found

#### 💻 Full Chain Traversal Example

```javascript
// Building a deep prototype chain manually
const grandParent = {
  lastName: "Smith",
  greet() { return `Hello from ${this.lastName}`; }
};

const parent = Object.create(grandParent); // parent.__proto__ = grandParent
parent.job = "Engineer";

const child = Object.create(parent); // child.__proto__ = parent
child.name = "Alex";

// Property lookups:
console.log(child.name);       // "Alex"    — found on child (own)
console.log(child.job);        // "Engineer"— found on parent (1 hop)
console.log(child.lastName);   // "Smith"   — found on grandParent (2 hops)
console.log(child.age);        // undefined — not found anywhere

// Own property check
console.log(child.hasOwnProperty("name"));     // true
console.log(child.hasOwnProperty("job"));      // false
console.log(child.hasOwnProperty("lastName")); // false

// Verifying the chain
console.log(Object.getPrototypeOf(child) === parent);      // true
console.log(Object.getPrototypeOf(parent) === grandParent); // true
console.log(Object.getPrototypeOf(grandParent) === Object.prototype); // true

// ── Shadowing (overriding via own property) ───────────────
child.lastName = "Jones"; // Creates own property, shadows grandParent's
console.log(child.lastName);       // "Jones" (own property)
console.log(grandParent.lastName); // "Smith" (unchanged!)

delete child.lastName;             // Remove shadow
console.log(child.lastName);       // "Smith" (grandParent's again)
```

#### 🔄 Chain Lookup Visualization

```
child.greet() — how does JS find it?

child ──► parent ──► grandParent ──► Object.prototype ──► null
  │          │           │
  │          │           └─ greet() ✅ FOUND HERE — returns greet function
  │          │
  │          └─ No 'greet' here
  │
  └─ No 'greet' here

Execution: greet is called with `this` = child
           this.lastName → looks up chain → finds child.lastName = "Jones"
           Returns: "Hello from Jones"
```

#### 💡 Important Interview Tips

- Property lookup goes **up** the chain (reads)
- Property assignment **always** creates an own property on the target object (writes don't go up the chain)
- The chain ends at `Object.prototype` → `null`
- `for...in` loop traverses the entire chain; `Object.keys()` only returns own enumerable properties

#### ⚠️ Common Mistakes

```javascript
// ❌ Mutating prototype methods affects ALL instances
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name; };

const a = new Animal("Cat");
// Someone modifies the prototype method
Animal.prototype.speak = function() { return "HACKED"; };
console.log(a.speak()); // "HACKED" — affects existing instances!

// ✅ Understand that prototypes are live/shared — handle carefully
```

---

### Q85 — What is `this` in different contexts? (Output-based question)

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | `this` Keyword |
| **Asked At** | Google, Paytm, Atlassian |

#### 📌 Interview Question
> *"What will be the output of the following code? Explain each `this` reference."*

#### 💻 Output-Based Code Question

```javascript
const obj = {
  name: "outer",
  regular: function() {
    console.log("regular:", this.name);

    const inner = function() {
      console.log("inner:", this.name); // What is this?
    };
    inner();

    const arrowInner = () => {
      console.log("arrow:", this.name); // What is this?
    };
    arrowInner();
  },
  arrow: () => {
    console.log("arrow method:", this.name); // What is this?
  }
};

obj.regular();
obj.arrow();
```

#### 📖 Detailed Answer — Output Analysis

```javascript
obj.regular();
// "regular: outer"
//   → Called as obj.regular() — implicit binding → this = obj
//   → obj.name = "outer" ✅

// "inner: undefined" (strict mode) or "inner: " (global, no 'name' on global)
//   → inner() is a plain function call — no implicit binding
//   → this = global/undefined (strict mode)
//   → global.name is "" in browsers (window.name default)

// "arrow: outer"
//   → Arrow function — no own 'this', inherits from regular()
//   → In regular(), this = obj, so arrowInner's this = obj
//   → obj.name = "outer" ✅

obj.arrow();
// "arrow method: undefined" (or "")
//   → Arrow function defined in object literal
//   → Object literals do NOT create a new 'this' scope
//   → this = global/window (whatever 'this' was when obj was created)
//   → If at module top level (strict mode): this = undefined
```

#### 🔄 Rule Application Table

| Call | Rule | `this` |
|------|------|--------|
| `obj.regular()` | Implicit binding | `obj` |
| `inner()` inside regular | Default binding | `global`/`undefined` |
| `arrowInner()` inside regular | Lexical (arrow) | `obj` (inherited) |
| `obj.arrow()` | Arrow at object level | `global`/`undefined` |

#### 💡 Key Insight

Object literals `{}` **do not** create a new `this` scope. Only `function`, classes, and `new` create a new `this`. Arrow functions at object definition time capture the surrounding `this`, which is usually global.

---

### Q86 — Tricky `call()`/`apply()`/`bind()` output question

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | `call()`, `apply()`, `bind()` |
| **Asked At** | Amazon, Flipkart, Morgan Stanley |

#### 📌 Interview Question
> *"Predict the output of this code:"*

```javascript
function greet(greeting, sign) {
  return `${greeting}, ${this.name}${sign}`;
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

const boundAlice = greet.bind(alice, "Hello");
console.log(boundAlice("!"));

console.log(boundAlice.call(bob, "?"));

const applied = greet.apply(bob, ["Hi", "."]);
console.log(applied);

const reBound = boundAlice.bind(bob);
console.log(reBound("~"));
```

#### 📖 Answer with Explanation

```javascript
// 1. boundAlice = greet.bind(alice, "Hello")
//    → new function with this=alice, greeting pre-filled as "Hello"
boundAlice("!");
// → greet.call(alice, "Hello", "!")
// → "Hello, Alice!"   ✅

// 2. boundAlice.call(bob, "?")
//    → trying to rebind with bob — BUT bind is permanent!
//    → this is still alice, "Hello" is still pre-filled
//    → "?" becomes the 'sign' argument
// → "Hello, Alice?"   ✅ (bob ignored!)

// 3. greet.apply(bob, ["Hi", "."])
//    → this = bob, greeting="Hi", sign="."
// → "Hi, Bob."   ✅

// 4. reBound = boundAlice.bind(bob)
//    → trying to rebind boundAlice (already bound to alice) to bob
//    → The original bind to alice wins — cannot be overridden
//    → "~" becomes the sign argument
// → "Hello, Alice~"   ✅ (bob still ignored!)
```

**Key Takeaway:** Once a function is bound with `bind()`, the `this` binding is **immutable** — even calling `.call()`, `.apply()`, or `.bind()` again on it **cannot change** the original `this`.

---

### Q87 — Explain prototypal inheritance with a real-world example

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Inheritance, Prototypes |
| **Asked At** | Google, Airbnb, Stripe |

#### 📌 Interview Question
> *"Implement a class hierarchy using prototypal inheritance: `Vehicle → Car → ElectricCar`. Show the prototype chain."*

#### 💻 JavaScript Code Example

```javascript
// ── ES6 Class Syntax (syntactic sugar over prototypes) ───
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    return `${this.make} accelerating. Speed: ${this.speed} km/h`;
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    return `Speed: ${this.speed} km/h`;
  }

  toString() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year); // Must call super() first!
    this.doors = doors;
    this.fuel = 100;
  }

  refuel(liters) {
    this.fuel = Math.min(100, this.fuel + liters);
    return `Fuel: ${this.fuel}%`;
  }

  accelerate(amount) {
    if (this.fuel <= 0) return "Out of fuel!";
    this.fuel -= amount * 0.1;
    return super.accelerate(amount); // Call parent's method
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, doors, batteryCapacity) {
    super(make, model, year, doors);
    this.batteryCapacity = batteryCapacity;
    this.charge = 100;
  }

  accelerate(amount) {
    if (this.charge <= 0) return "Battery dead!";
    this.charge -= amount * 0.05;
    // Note: calling Car's accelerate would consume 'fuel'
    // ElectricCar overrides to use 'charge' instead
    this.speed += amount;
    return `${this.make} electric accelerating. Speed: ${this.speed} km/h, Charge: ${this.charge.toFixed(1)}%`;
  }

  recharge(percent) {
    this.charge = Math.min(100, this.charge + percent);
    return `Battery: ${this.charge}%`;
  }
}

// Usage
const tesla = new ElectricCar("Tesla", "Model 3", 2024, 4, 75);
console.log(tesla.accelerate(60)); // Uses ElectricCar's accelerate
console.log(tesla.toString());     // Uses Vehicle's toString

// Prototype chain verification
console.log(tesla instanceof ElectricCar); // true
console.log(tesla instanceof Car);         // true
console.log(tesla instanceof Vehicle);     // true
console.log(tesla instanceof Object);      // true

// Chain: tesla → ElectricCar.prototype → Car.prototype → Vehicle.prototype → Object.prototype → null
```

#### 🔄 Prototype Chain Diagram

```
tesla (instance)
  │ make: "Tesla"
  │ charge: 100
  └──__proto__──►  ElectricCar.prototype
                     accelerate() (override)
                     recharge()
                     └──__proto__──►  Car.prototype
                                        accelerate() (override)
                                        refuel()
                                        └──__proto__──►  Vehicle.prototype
                                                           accelerate() (base)
                                                           brake()
                                                           toString()
                                                           └──__proto__──►  Object.prototype ──► null
```

#### 💡 Important Interview Tips

- `super()` in constructor must be called **before** accessing `this`
- `super.method()` calls the parent's version of a method
- `instanceof` checks the prototype chain, not just direct parent
- Method resolution goes from most-derived to least-derived

---

### Q88 — How does `new` keyword work internally?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | `new`, Prototypes, `this` |
| **Asked At** | Google, Facebook, Intuit |

#### 📌 Interview Question
> *"What does the `new` keyword actually do behind the scenes? Implement your own `new` operator."*

#### 📖 Detailed Answer

When you write `new Constructor(args)`, JavaScript performs exactly **4 steps**:

1. **Creates** a plain new empty object `{}`
2. **Sets** `newObj.__proto__ = Constructor.prototype`
3. **Calls** `Constructor` with `this` = `newObj`
4. **Returns** `newObj` (unless constructor explicitly returns another object)

#### 💻 Custom `new` Implementation

```javascript
function myNew(Constructor, ...args) {
  // Step 1 & 2: Create object and set prototype
  const instance = Object.create(Constructor.prototype);

  // Step 3: Call constructor with 'this' = new instance
  const result = Constructor.call(instance, ...args);

  // Step 4: Return object (if constructor returns an object, use it;
  //         otherwise use our instance)
  return result instanceof Object ? result : instance;
}

// Test it
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

// Using built-in new
const p1 = new Person("Alice", 30);

// Using our custom myNew
const p2 = myNew(Person, "Bob", 25);

console.log(p1.greet()); // "Hi, I'm Alice"
console.log(p2.greet()); // "Hi, I'm Bob"
console.log(p2 instanceof Person); // true — prototype chain intact!

// ── The return value trap ─────────────────────────────────
function Tricky() {
  this.x = 1;
  return { x: 999 }; // explicit object return
}
function NotTricky() {
  this.x = 1;
  return 42; // primitive return — ignored!
}

console.log(new Tricky().x);    // 999 — constructor's object returned
console.log(new NotTricky().x); // 1   — primitive ignored, 'this' returned
```

#### 🔁 Follow-up Questions

1. *"What happens if you call a constructor without `new`?"*
2. *"How does ES6 `class` enforce using `new`?"* (Throws TypeError without `new`)
3. *"What is `new.target` and how does it help detect missing `new`?"*

---

### Q89 — What is method chaining? How is it implemented using `this`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | `this`, Classes |
| **Asked At** | Amazon, Razorpay, Freshworks |

#### 📌 Interview Question
> *"Implement a `QueryBuilder` class that supports method chaining like: `db.table('users').where('age > 25').limit(10).execute()`"*

#### 💻 JavaScript Code Example

```javascript
class QueryBuilder {
  constructor() {
    this._table = "";
    this._conditions = [];
    this._limitVal = null;
    this._orderByVal = null;
    this._selectedCols = ["*"];
  }

  table(name) {
    this._table = name;
    return this; // KEY: return 'this' enables chaining!
  }

  select(...columns) {
    this._selectedCols = columns;
    return this;
  }

  where(condition) {
    this._conditions.push(condition);
    return this;
  }

  limit(n) {
    this._limitVal = n;
    return this;
  }

  orderBy(column, direction = "ASC") {
    this._orderByVal = `${column} ${direction}`;
    return this;
  }

  execute() {
    // Builds SQL query string — no 'return this' here (terminal operation)
    let query = `SELECT ${this._selectedCols.join(", ")} FROM ${this._table}`;

    if (this._conditions.length) {
      query += ` WHERE ${this._conditions.join(" AND ")}`;
    }
    if (this._orderByVal) query += ` ORDER BY ${this._orderByVal}`;
    if (this._limitVal !== null) query += ` LIMIT ${this._limitVal}`;

    return query + ";";
  }
}

// Method chaining in action
const query = new QueryBuilder()
  .table("users")
  .select("id", "name", "email")
  .where("age > 25")
  .where("active = true")
  .orderBy("name")
  .limit(10)
  .execute();

console.log(query);
// SELECT id, name, email FROM users WHERE age > 25 AND active = true ORDER BY name ASC LIMIT 10;
```

**The secret:** Every method (except the terminal `execute()`) returns `this` — the current instance — allowing the next method call to operate on the same object.

---

### Q90 — What is the difference between `Object.create()` and `new`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Prototypes, Inheritance |
| **Asked At** | Google, Stripe, Twilio |

#### 📌 Interview Question
> *"Compare `Object.create()` and the `new` keyword. When would you prefer `Object.create()`?"*

#### 💻 JavaScript Code Example

```javascript
// ── new ────────────────────────────────────────────────────
function Animal(name) {
  this.name = name; // calls constructor
}
Animal.prototype.speak = function() { return `${this.name} speaks`; };

const cat = new Animal("Cat"); // runs constructor, sets proto
console.log(cat.name);  // "Cat" — from constructor
console.log(cat.speak()); // "Cat speaks" — from prototype

// ── Object.create() ───────────────────────────────────────
// Creates new object with specified prototype — NO constructor call
const animalProto = {
  speak() { return `${this.name} speaks`; }
};

const dog = Object.create(animalProto);
dog.name = "Dog"; // manually set properties
console.log(dog.name);    // "Dog"
console.log(dog.speak()); // "Dog speaks"

// Key difference: Object.create() does NOT call a constructor
const emptyProto = Object.create(null); // No prototype at all!
console.log(Object.getPrototypeOf(emptyProto)); // null
// emptyProto has NO inherited methods — not even toString()!

// ── Use Object.create() for pure prototypal inheritance ───
const vehicleProto = {
  start() { return `${this.make} started`; },
  stop()  { return `${this.make} stopped`; }
};

function createCar(make, model) {
  const car = Object.create(vehicleProto); // inherit from vehicleProto
  car.make = make;
  car.model = model;
  return car;
}

const myCar = createCar("Toyota", "Corolla");
console.log(myCar.start()); // "Toyota started"
console.log(myCar instanceof Object); // true
// No class, no constructor, no 'new' — pure prototypal pattern

// ── Comparison Table ───────────────────────────────────────
/*
                new Constructor()          Object.create(proto)
Constructor?    ✅ Runs constructor         ❌ No constructor
Prototype set?  ✅ Constructor.prototype    ✅ Specified proto
Own properties? ✅ Via this in constructor  ❌ Must set manually
Use case        Typical class instances    Prototype-only inheritance
*/
```

---

### Q91 — Debugging: Why is `this` undefined in a class method?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | `this`, Classes, `bind()` |
| **Asked At** | Microsoft, Paytm, Swiggy |

#### 📌 Interview Question
> *"A developer is getting `Cannot read property of undefined` when calling a class method. Debug and fix the following code:"*

```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(this.tick, 1000);
  }

  tick() {
    this.seconds++; // BUG: this is undefined here!
    console.log(this.seconds);
  }
}

const timer = new Timer();
timer.start();
```

#### 📖 Debugging & Solution

```javascript
// ROOT CAUSE: setInterval(this.tick, 1000)
// Passes 'tick' as a callback reference — detaches it from the instance.
// When setInterval calls tick(), there's no object context.
// this = global (non-strict) or undefined (strict mode / class bodies).

// ── Fix 1: Arrow function in start() ─────────────────────
class Timer1 {
  constructor() { this.seconds = 0; }

  start() {
    setInterval(() => this.tick(), 1000); // arrow preserves outer 'this'
  }

  tick() {
    this.seconds++;
    console.log(this.seconds);
  }
}

// ── Fix 2: bind() in start() ─────────────────────────────
class Timer2 {
  constructor() { this.seconds = 0; }

  start() {
    setInterval(this.tick.bind(this), 1000); // explicit bind
  }

  tick() {
    this.seconds++;
    console.log(this.seconds);
  }
}

// ── Fix 3: Arrow function class field (modern, recommended) ─
class Timer3 {
  seconds = 0; // class field

  start() {
    setInterval(this.tick, 1000); // works now!
  }

  tick = () => { // arrow class field — 'this' is always the instance
    this.seconds++;
    console.log(this.seconds);
  };
}

// Timer3 is the most modern and clean approach
const t = new Timer3();
t.start();
```

#### 💡 The Three Solutions Compared

| Approach | Syntax | Pro | Con |
|----------|--------|-----|-----|
| `bind()` in start | `.bind(this)` | Classic, widely understood | Verbose |
| Arrow in start | `() => this.tick()` | Clean, readable | New fn each call |
| Arrow class field | `tick = () => {}` | Best for callbacks | Own copy per instance (more memory) |

---

### Q92 — How does inheritance work with `super`?

| Meta | Details |
|------|---------|
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Inheritance, Classes |
| **Asked At** | Amazon, IBM, HCL |

#### 📌 Interview Question
> *"What does `super` do in JavaScript? When is it required? What happens if you forget it?"*

#### 💻 JavaScript Code Example

```javascript
class Shape {
  constructor(color) {
    this.color = color;
    this.createdAt = new Date().toISOString();
  }

  describe() {
    return `A ${this.color} shape`;
  }

  area() {
    throw new Error("area() must be implemented by subclass");
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    // super() MUST come before any 'this' access in derived class
    super(color); // calls Shape's constructor, sets this.color
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  describe() {
    const base = super.describe(); // calls parent's describe()
    return `${base}, specifically a circle with radius ${this.radius}`;
  }
}

class ColoredCircle extends Circle {
  constructor(color, radius, borderColor) {
    super(color, radius); // chain: ColoredCircle → Circle → Shape
    this.borderColor = borderColor;
  }
}

const c = new ColoredCircle("red", 5, "black");
console.log(c.describe()); // "A red shape, specifically a circle with radius 5"
console.log(c.area().toFixed(2)); // "78.54"
console.log(c.color, c.radius, c.borderColor); // "red" 5 "black"

// ── What happens if you forget super()? ──────────────────
class Bad extends Shape {
  constructor(color) {
    // super(); // MISSING!
    this.color = color; // ReferenceError: Must call super before accessing 'this'
  }
}
// new Bad("blue"); // ❌ ReferenceError

// ── super in static methods ───────────────────────────────
class Animal {
  static create(name) { return { name, type: "animal" }; }
}
class Dog extends Animal {
  static create(name) {
    const base = super.create(name); // super works in static context too
    return { ...base, type: "dog", sound: "woof" };
  }
}
console.log(Dog.create("Rex")); // {name: "Rex", type: "dog", sound: "woof"}
```

---

## 🔴 ADVANCED LEVEL (Q93–Q100)

---

### Q93 — Implement `Object.create()` from scratch

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Prototypes, Internals |
| **Asked At** | Google, Netflix (Staff Engineer level) |

#### 📌 Interview Question
> *"Implement a polyfill for `Object.create()`. Then explain how it works and handle the case where `null` is passed."*

#### 💻 Implementation

```javascript
// Object.create(proto, propertiesObject)
// Creates a new object with proto as its [[Prototype]]

if (!Object.myCreate) {
  Object.myCreate = function(proto, propertiesObject) {
    // Validate input
    if (proto !== null && typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object or null");
    }

    // Create a temporary constructor
    function F() {}

    // Set its prototype to the desired proto
    F.prototype = proto;

    // Create instance — its __proto__ will be proto
    const instance = new F();

    // Handle null prototype edge case
    // (new F() can't produce null proto via this technique in old JS)
    if (proto === null) {
      // Modern environments support this natively
      // In old polyfills, this was impossible without native support
      Object.setPrototypeOf(instance, null);
    }

    // Apply additional property descriptors if provided
    if (propertiesObject !== undefined) {
      Object.defineProperties(instance, propertiesObject);
    }

    return instance;
  };
}

// Test the polyfill
const proto = {
  greet() { return `Hello from ${this.name}`; }
};

const obj = Object.myCreate(proto);
obj.name = "Test";
console.log(obj.greet());                              // "Hello from Test"
console.log(Object.getPrototypeOf(obj) === proto);     // true

// With property descriptors
const obj2 = Object.myCreate(proto, {
  name: {
    value: "Defined",
    writable: true,
    enumerable: true,
    configurable: true
  }
});
console.log(obj2.greet()); // "Hello from Defined"

// Null prototype
const pureMap = Object.myCreate(null);
console.log(Object.getPrototypeOf(pureMap)); // null
// pureMap has no toString, hasOwnProperty, etc — truly empty!
```

#### 💡 Why `Object.create(null)` matters

```javascript
// Regular object — has Object.prototype pollution
const regularObj = {};
console.log("toString" in regularObj);      // true (inherited!)
console.log("hasOwnProperty" in regularObj); // true (inherited!)

// Null-proto object — clean dictionary
const dict = Object.create(null);
dict.key = "value";
console.log("toString" in dict);       // false — completely clean!
console.log("hasOwnProperty" in dict); // false

// Used by: libraries, JSON parsers, map-like structures to avoid
// prototype pollution attacks
```

---

### Q94 — Advanced `this` binding — What is the output?

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | `this`, Closures, Arrow Functions |
| **Asked At** | Google, Meta (FAANG L5+) |

#### 📌 Interview Question
> *"Trace through this code step by step and predict all outputs:"*

```javascript
function makeCounter(start) {
  let count = start;

  return {
    count,
    increment() {
      count++;
      this.count = count;
      return this;
    },
    getCount() { return count; },
    getThis() { return this; },
    arrow: () => ({ outsideThis: this })
  };
}

const counter = makeCounter(0);
counter.increment().increment();

console.log(counter.count);
console.log(counter.getCount());

const { getCount } = counter;
console.log(getCount());

const { increment } = counter;
// What happens here?
```

#### 📖 Answer

```javascript
// makeCounter(0) → count (closure) = 0, counter.count (own prop) = 0

counter.increment()
// this = counter (implicit binding)
// count++ → count = 1 (closure)
// this.count = 1 → counter.count = 1
// returns this (= counter)

.increment()
// called on counter again (chaining)
// count++ → count = 2 (closure)
// this.count = 2 → counter.count = 2
// returns counter

console.log(counter.count);  // 2 (own property updated)
console.log(counter.getCount()); // 2 (closure variable)

const { getCount } = counter;
getCount(); // this = global/undefined (detached!)
            // But getCount returns 'count' (the closure!), not 'this.count'
console.log(getCount()); // 2 — closures don't care about 'this'!

const { increment } = counter;
increment(); // this = global or undefined
             // count++ (closure) → 3
             // this.count = 3 → sets on global or throws in strict mode!
             // returns global/undefined
```

**Key Insight:** `getCount()` returns the closure variable `count`, not `this.count`. Even when called without context, it works because **closures capture variables, not `this`**.

---

### Q95 — Prototype Pollution Attack — What is it?

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Prototypes, Security |
| **Asked At** | Netflix, Google (Security-focused roles) |

#### 📌 Interview Question
> *"What is prototype pollution? How can it happen and how do you prevent it?"*

#### 📖 Detailed Answer

**Prototype pollution** is a security vulnerability where an attacker can modify `Object.prototype` — contaminating all JavaScript objects in the application.

```javascript
// ── Vulnerability Demonstration ───────────────────────────
function merge(target, source) {
  // UNSAFE: Does not check for __proto__ key
  for (let key in source) {
    if (typeof source[key] === "object") {
      target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Malicious payload (e.g., from user input or API)
const maliciousPayload = JSON.parse('{"__proto__": {"isAdmin": true}}');
merge({}, maliciousPayload);

// Now ALL objects are "admin"!
const victim = {};
console.log(victim.isAdmin); // true ← POLLUTION!

// This could bypass auth checks like:
if (user.isAdmin) { /* give access */ } // Triggered for ANY user!

// ── Prevention Techniques ─────────────────────────────────

// 1. Check for dangerous keys
function safeMerge(target, source) {
  for (let key in source) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue; // Skip dangerous keys!
    }
    // ... rest of merge
  }
}

// 2. Use Object.create(null) for data objects
const safeStore = Object.create(null);
safeStore.__proto__ = "hack"; // Just sets a regular property, not the actual [[Prototype]]!

// 3. Use hasOwnProperty check
function cleanMerge(target, source) {
  Object.keys(source).forEach(key => { // Object.keys skips inherited
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  });
}

// 4. Use Object.freeze to protect Object.prototype
Object.freeze(Object.prototype); // Prevents any modifications

// 5. Use structuredClone or JSON parse/stringify for deep cloning
const safe = JSON.parse(JSON.stringify(userInput)); // Strips __proto__
```

---

### Q96 — Mixin Pattern — Achieving multiple inheritance

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | OOP, Inheritance, Prototypes |
| **Asked At** | Google, Airbnb, Spotify |

#### 📌 Interview Question
> *"JavaScript doesn't support multiple inheritance. How would you design a `FlyingFish` that inherits both swimming and flying behaviors?"*

#### 💻 Mixin Pattern Implementation

```javascript
// ── Mixin factories — composable behavior units ────────────
const Swimmer = (superclass) => class extends superclass {
  swim() {
    return `${this.name} is swimming at ${this.speed || 5} km/h`;
  }

  dive(depth) {
    return `${this.name} dives to ${depth}m depth`;
  }
};

const Flyer = (superclass) => class extends superclass {
  fly() {
    return `${this.name} is flying at ${this.altitude || 100}m altitude`;
  }

  land() {
    return `${this.name} lands gracefully`;
  }
};

const Predator = (superclass) => class extends superclass {
  hunt(prey) {
    return `${this.name} hunts ${prey}`;
  }
};

// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }
  toString() { return `Animal: ${this.name}`; }
}

// Multiple inheritance via mixin composition
class FlyingFish extends Swimmer(Flyer(Animal)) {
  constructor(name) {
    super(name);
    this.speed = 8;
    this.altitude = 1;
  }

  glide() {
    return `${this.name} glides between water and air!`;
  }
}

class Duck extends Swimmer(Flyer(Predator(Animal))) {
  constructor(name) {
    super(name);
  }
  quack() { return `${this.name}: Quack!`; }
}

// Test
const nemo = new FlyingFish("Nemo");
console.log(nemo.swim());    // "Nemo is swimming at 8 km/h"
console.log(nemo.fly());     // "Nemo is flying at 1m altitude"
console.log(nemo.glide());   // "Nemo glides between water and air!"

const donald = new Duck("Donald");
console.log(donald.swim());   // "Donald is swimming at 5 km/h"
console.log(donald.fly());    // "Donald is flying at 100m altitude"
console.log(donald.hunt("fish")); // "Donald hunts fish"
console.log(donald.quack()); // "Donald: Quack!"

// instanceof still works correctly
console.log(nemo instanceof Animal); // true
console.log(donald instanceof Animal); // true
```

---

### Q97 — Implement `Function.prototype.bind` from scratch

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | `bind()`, Prototypes, `new` |
| **Asked At** | Google, Meta, Atlassian (Principal Engineer) |

#### 📌 Interview Question
> *"Implement a complete polyfill for `Function.prototype.bind` that also handles the case where the bound function is called with `new`."*

#### 💻 Full Polyfill Implementation

```javascript
Function.prototype.myBind = function(thisArg, ...presetArgs) {
  // 'this' here is the original function being bound
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  const originalFn = this;

  // The bound function
  function BoundFunction(...laterArgs) {
    const allArgs = [...presetArgs, ...laterArgs];

    // Handle 'new BoundFunction()' — when used as constructor,
    // 'new' should override the bound 'this'
    // We detect this via 'new.target' or instanceof check
    if (new.target) {
      // Called with 'new' — create instance of ORIGINAL function
      return new originalFn(...allArgs);
    }

    return originalFn.call(thisArg, ...allArgs);
  }

  // Preserve prototype for correct instanceof behavior
  if (originalFn.prototype) {
    BoundFunction.prototype = Object.create(originalFn.prototype);
  }

  // name and length properties (optional, for completeness)
  Object.defineProperty(BoundFunction, "name", {
    value: `bound ${originalFn.name}`,
    configurable: true
  });

  Object.defineProperty(BoundFunction, "length", {
    value: Math.max(0, originalFn.length - presetArgs.length),
    configurable: true
  });

  return BoundFunction;
};

// ── Test Cases ─────────────────────────────────────────────

// 1. Basic binding
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}
const greetAlice = greet.myBind({ name: "Alice" });
console.log(greetAlice("Hello")); // "Hello, Alice!"

// 2. Partial application
function multiply(a, b) { return a * b; }
const triple = multiply.myBind(null, 3);
console.log(triple(7)); // 21

// 3. Works with 'new' (bound this is ignored)
function Person(name) {
  this.name = name;
}
const BoundPerson = Person.myBind({ name: "Wrong" }, "Alice");
const p = new BoundPerson();
console.log(p.name);            // "Alice" (constructor arg, not bound this)
console.log(p instanceof Person); // true

// 4. Cannot rebind
const bound1 = greet.myBind({ name: "Alice" });
const bound2 = bound1.myBind({ name: "Bob" }); // tries to rebind
console.log(bound2("Hi")); // "Hi, Alice!" — original binding wins
```

---

### Q98 — Explain and implement inheritance WITHOUT using `class` or `new`

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Prototypal Inheritance, Pure Prototypes |
| **Asked At** | Airbnb, GitHub (Principal level) |

#### 📌 Interview Question
> *"Implement an inheritance hierarchy using only `Object.create()` — no classes, no `new`. This tests your understanding of JavaScript's true prototypal nature."*

#### 💻 Pure Prototypal Inheritance

```javascript
// ── Base: vehicleProto ────────────────────────────────────
const vehicleProto = {
  init(make, model, year) {
    this.make  = make;
    this.model = model;
    this.year  = year;
    this.speed = 0;
    return this;
  },
  accelerate(amount) {
    this.speed += amount;
    return this;
  },
  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    return this;
  },
  toString() {
    return `${this.year} ${this.make} ${this.model}`;
  }
};

// ── Derived: carProto → inherits from vehicleProto ────────
const carProto = Object.create(vehicleProto); // sets carProto.__proto__ = vehicleProto

Object.assign(carProto, {
  init(make, model, year, doors) {
    vehicleProto.init.call(this, make, model, year); // explicit super
    this.doors = doors;
    this.fuel = 100;
    return this;
  },
  refuel(amount) {
    this.fuel = Math.min(100, this.fuel + amount);
    return this;
  }
});

// ── Factory functions — object creation without 'new' ─────
function createVehicle(make, model, year) {
  return Object.create(vehicleProto).init(make, model, year);
}

function createCar(make, model, year, doors) {
  return Object.create(carProto).init(make, model, year, doors);
}

// ── Test ──────────────────────────────────────────────────
const myBike = createVehicle("Harley-Davidson", "Iron 883", 2023);
const myCar  = createCar("Toyota", "Supra", 2024, 2);

myBike.accelerate(60);
console.log(`${myBike.toString()}: ${myBike.speed} km/h`);
// "2023 Harley-Davidson Iron 883: 60 km/h"

myCar.accelerate(100).brake(30);
console.log(`${myCar.toString()}: ${myCar.speed} km/h, Fuel: ${myCar.fuel}%`);
// "2024 Toyota Supra: 70 km/h, Fuel: 100%"

// Prototype chain verification
console.log(Object.getPrototypeOf(myCar) === carProto);       // true
console.log(Object.getPrototypeOf(carProto) === vehicleProto); // true

// Method resolution — myCar.accelerate walks up the chain
console.log(myCar.hasOwnProperty("accelerate")); // false — inherited!
```

---

### Q99 — How does `instanceof` work? Implement it from scratch.

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Prototype Chain, `instanceof` |
| **Asked At** | Google, Booking.com |

#### 📌 Interview Question
> *"How does the `instanceof` operator work? Write a custom `myInstanceOf` function."*

#### 💻 Implementation

```javascript
// instanceof walks the prototype chain of 'obj'
// looking for Constructor.prototype along the way

function myInstanceOf(obj, Constructor) {
  // Primitives can never be instances (except via boxing)
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return false;
  }

  // The target we're searching for in the chain
  const proto = Constructor.prototype;

  // Walk the chain
  let current = Object.getPrototypeOf(obj);

  while (current !== null) {
    if (current === proto) return true; // Found!
    current = Object.getPrototypeOf(current); // Go up
  }

  return false; // Reached null — not found
}

// ── Tests ──────────────────────────────────────────────────
class A {}
class B extends A {}
class C extends B {}

const c = new C();

console.log(myInstanceOf(c, C));      // true  (direct)
console.log(myInstanceOf(c, B));      // true  (parent)
console.log(myInstanceOf(c, A));      // true  (grandparent)
console.log(myInstanceOf(c, Object)); // true  (all objects)

console.log(c instanceof C);      // true  ✅ matches
console.log(c instanceof B);      // true  ✅ matches
console.log(c instanceof A);      // true  ✅ matches

// Edge cases
console.log(myInstanceOf(null, Object));   // false
console.log(myInstanceOf(42, Number));     // false (primitive, not boxed)
console.log(myInstanceOf([], Array));      // true
console.log(myInstanceOf([], Object));     // true (Array → Object chain)

// ── The Symbol.hasInstance hook ───────────────────────────
class Even {
  static [Symbol.hasInstance](num) {
    return typeof num === "number" && num % 2 === 0;
  }
}
console.log(2 instanceof Even);  // true  — custom instanceof!
console.log(3 instanceof Even);  // false
console.log(4 instanceof Even);  // true
```

---

### Q100 — Design Challenge: Implement an Observable/Event System using OOP + Prototypes

| Meta | Details |
|------|---------|
| **Difficulty** | 🔴 Advanced |
| **Topic** | Classes, OOP, Prototypes, `this`, `bind()` |
| **Asked At** | Google, Netflix, Meta (Staff/Principal) |

#### 📌 Interview Question
> *"Design and implement an `EventEmitter` class (like Node.js's). It must support `on()`, `off()`, `once()`, `emit()`, and `removeAllListeners()`. Show how OOP principles and prototype chain are leveraged."*

#### 💻 Full Implementation

```javascript
class EventEmitter {
  // Private storage for listeners
  #events = Object.create(null); // null-proto to avoid pollution

  // Register a persistent listener
  on(event, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    this.#events[event].push({ listener, once: false });
    return this; // chainable
  }

  // Register a one-time listener
  once(event, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    this.#events[event].push({ listener, once: true });
    return this;
  }

  // Remove a specific listener
  off(event, listenerToRemove) {
    if (!this.#events[event]) return this;
    this.#events[event] = this.#events[event].filter(
      ({ listener }) => listener !== listenerToRemove
    );
    return this;
  }

  // Emit an event, calling all registered listeners
  emit(event, ...args) {
    if (!this.#events[event]) return false;

    // Process listeners — remove 'once' after calling
    const remaining = [];
    for (const { listener, once } of this.#events[event]) {
      try {
        listener.apply(this, args); // 'this' = emitter instance
      } catch (err) {
        console.error(`Error in listener for "${event}":`, err);
      }
      if (!once) remaining.push({ listener, once });
    }
    this.#events[event] = remaining;

    return true;
  }

  // Remove all listeners for an event (or all events)
  removeAllListeners(event) {
    if (event) {
      delete this.#events[event];
    } else {
      this.#events = Object.create(null);
    }
    return this;
  }

  // List registered events
  eventNames() {
    return Object.keys(this.#events).filter(e => this.#events[e].length > 0);
  }

  listenerCount(event) {
    return this.#events[event]?.length ?? 0;
  }
}

// ── Extending EventEmitter (Inheritance) ──────────────────
class Store extends EventEmitter {
  #state;

  constructor(initialState) {
    super(); // must call super() for EventEmitter setup
    this.#state = initialState;
  }

  getState() {
    return { ...this.#state }; // return copy
  }

  setState(newState) {
    const prev = this.#state;
    this.#state = { ...this.#state, ...newState };
    this.emit("change", this.#state, prev); // notify listeners
    return this;
  }
}

// ── Usage ─────────────────────────────────────────────────
const store = new Store({ count: 0, user: null });

// Persistent listener
store.on("change", (newState, oldState) => {
  console.log(`State changed: count ${oldState.count} → ${newState.count}`);
});

// One-time listener
store.once("change", () => {
  console.log("First change detected! (fires only once)");
});

store.setState({ count: 1 });
// "State changed: count 0 → 1"
// "First change detected! (fires only once)"

store.setState({ count: 2 });
// "State changed: count 1 → 2"
// (once listener is gone)

store.setState({ user: "Alice" });
// "State changed: count 2 → 2"

console.log(store.getState()); // { count: 2, user: "Alice" }
console.log(store.listenerCount("change")); // 1 (once was removed)
```

---

## 📝 REVISION CHEAT SHEET

> Quick-reference summary for last-minute interview prep

---

### ⚡ Optional Chaining & Nullish Coalescing

```
?.     → Returns undefined if null/undefined; doesn't throw
??     → Returns right side ONLY if left is null/undefined
||     → Returns right side if left is ANY falsy value (0, "", false, null, undefined, NaN)
??=    → Assign right side only if left is null/undefined
?.()   → Safe method call
?.[]   → Safe bracket notation
```

### ⚡ `this` — 4 Rules (highest → lowest priority)

```
1. new Foo()         → this = new object
2. .call/.apply/.bind → this = specified
3. obj.method()      → this = obj
4. foo()             → this = global / undefined (strict)
   Arrow functions   → this = lexical (enclosing scope) — CANNOT be changed
```

### ⚡ call / apply / bind

```
call(ctx, a, b, c)  → invoke NOW, args individually
apply(ctx, [a,b,c]) → invoke NOW, args as array
bind(ctx, a, b)     → returns NEW function, deferred, with partial application
                      bind is PERMANENT — can't be rebound
```

### ⚡ Prototype Key Facts

```
obj.__proto__          → actual prototype link (deprecated, use getPrototypeOf)
Fn.prototype           → template for instances created by 'new Fn()'
Object.create(proto)   → new object with specified prototype, no constructor call
new Constructor()      → 4 steps: create, set proto, call constructor, return
instanceof             → walks __proto__ chain looking for Constructor.prototype
```

### ⚡ Class Features Quick Reference

```javascript
class MyClass {
  publicField = 0;              // ES2022 class field
  #privateField = "secret";     // Truly private (ES2022)
  static sharedProp = "shared"; // Belongs to class, not instance

  constructor() { /* init */ }
  instanceMethod() { }          // On MyClass.prototype (shared)
  get value() { }               // Getter
  set value(v) { }              // Setter
  static utilMethod() { }       // Called as MyClass.utilMethod()
  arrowField = () => { };       // Own copy per instance (not on prototype)
}
```

### ⚡ Inheritance Pattern

```javascript
class Child extends Parent {
  constructor(...args) {
    super(...args);   // MUST be first — before any 'this' access
    // additional init
  }
  method() {
    return super.method() + " extended"; // call parent method
  }
}
```

### ⚡ OOP Pillars Summary

| Pillar | JavaScript Mechanism |
|--------|---------------------|
| Encapsulation | `#privateField`, closures, getters/setters |
| Abstraction | Public methods hiding internal complexity |
| Inheritance | `extends`, `super`, prototype chain |
| Polymorphism | Method overriding, duck typing |

### ⚡ Common Gotchas to Remember

```
1. typeof class === "function"   (classes are functions under the hood)
2. Classes are NOT hoisted        (unlike function declarations)
3. Class bodies = strict mode     (always)
4. bind() result CANNOT be rebound
5. Arrow functions CANNOT be constructors (no new ArrowFn())
6. Arrow functions have NO own 'this', 'arguments', or 'prototype'
7. __proto__ assignment to {} doesn't affect actual [[Prototype]] (prototype pollution defense)
8. for...in traverses entire chain; Object.keys() = own only
9. super() MUST come before 'this' in derived constructor
10. Method on prototype is SHARED; property in constructor is PER INSTANCE
```

### ⚡ Prototype Chain Endings

```
Regular object:  obj → Object.prototype → null
Array:           arr → Array.prototype → Object.prototype → null
Function:        fn  → Function.prototype → Object.prototype → null
Object.create(null): obj → null   (no inherited methods at all!)
```

---

*📌 Pro Tip: Every question in this guide was carefully selected based on real interview experiences at FAANG and top product companies. Practice explaining these concepts out loud — interviewers value clear verbal reasoning as much as code correctness.*

---

> **Document Statistics**
> - Questions: 76–100 (25 total)
> - Difficulty: 7 Beginner · 10 Intermediate · 8 Advanced
> - Topics Covered: 11
> - Code Examples: 60+
> - Output Puzzles: 5
> - Polyfill Implementations: 4 (new, bind, instanceof, Object.create)
