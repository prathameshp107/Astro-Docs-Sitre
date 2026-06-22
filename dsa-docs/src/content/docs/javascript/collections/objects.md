---
title: "Objects"
description: "Object literals, property access, shorthand, computed keys, methods, this in methods, Object.keys/values/entries, assign, freeze, and optional chaining."
sidebar:
  order: 16
---

## Objects

Objects are collections of key-value pairs. They're the foundation of almost every data structure in JavaScript.

### Object Literals

```javascript
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false
};
```

### Property Access: Dot vs Bracket

```javascript
user.name;       // "Alice"  (dot — static)
user["name"];    // "Alice"  (bracket — dynamic)

const key = "age";
user[key];       // 30  (dynamic key access)
```

### Shorthand & Computed Keys

```javascript
const name = "Alice";
const age = 30;

// Shorthand — variable name becomes key
const person = { name, age };
// { name: "Alice", age: 30 }

// Computed keys
const prefix = "user_";
const obj = {
  [prefix + "id"]: 42,
  ["get" + "Name"]() { return this.name; }
};
// { user_id: 42, getName: fn }
```

### Object Methods & `this`

```javascript
const dog = {
  name: "Rex",
  speak() {
    return `${this.name} says woof!`;
  }
};

dog.speak(); // "Rex says woof!"

// ⚠️ Arrow function doesn't have own this
const cat = {
  name: "Whiskers",
  speak: () => `${this.name} says meow` // "this" is not cat!
};
cat.speak(); // "undefined says meow"
```

### `Object.keys`, `Object.values`, `Object.entries`

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);      // ["a", "b", "c"]
Object.values(obj);    // [1, 2, 3]
Object.entries(obj);   // [["a", 1], ["b", 2], ["c", 3]]

// Iterate
Object.entries(obj).forEach(([key, val]) => {
  console.log(`${key}: ${val}`);
});

// Convert entries back to object
Object.fromEntries([["a", 1], ["b", 2]]); // { a: 1, b: 2 }
```

### `Object.assign` & Spread

```javascript
const target = { a: 1 };
const source = { b: 2 };

Object.assign(target, source); // target → { a: 1, b: 2 }

// Shallow clone
const clone = Object.assign({}, target);
const clone2 = { ...target }; // same thing, cleaner
```

### `Object.freeze`

```javascript
const config = Object.freeze({ apiKey: "abc123", timeout: 5000 });
config.timeout = 10000; // ❌ silently fails (or TypeError in strict)
config.newProp = "x";   // ❌ cannot add
delete config.apiKey;   // ❌ cannot delete
```

> ⚠️ `Object.freeze` is **shallow** — nested objects can still be mutated.

### Optional Chaining on Objects

```javascript
const user = {
  profile: {
    name: "Alice",
    address: null
  }
};

user?.profile?.name;     // "Alice"
user?.profile?.address?.city; // undefined (no error)
user?.unknown?.method?.();    // undefined (no error)
```

### Key Takeaways

- Use dot notation for static keys, bracket notation for dynamic keys
- Object method shorthand `{ method() {} }` creates a method with correct `this`
- `Object.keys/values/entries` convert objects to iterable forms
- Spread (`...`) is the cleanest way to shallow-clone or merge objects
- `Object.freeze` prevents changes but is shallow-only
- Optional chaining (`?.`) safely accesses nested properties
