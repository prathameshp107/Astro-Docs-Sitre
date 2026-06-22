---
title: "JSON & Web Storage"
description: "JSON.parse/JSON.stringify with replacer/space, localStorage/sessionStorage, and deep-copy via JSON caveats."
sidebar:
  order: 26
---

## JSON & Web Storage

JSON is the universal data format for APIs and configuration. Web storage lets you persist data in the browser.

### `JSON.parse` & `JSON.stringify`

```javascript
const user = { name: "Alice", age: 30, hobbies: ["reading", "coding"] };

// Convert to JSON string
const json = JSON.stringify(user);
// '{"name":"Alice","age":30,"hobbies":["reading","coding"]}'

// Parse back to object
const parsed = JSON.parse(json);
// { name: "Alice", age: 30, hobbies: ["reading", "coding"] }
```

### Pretty Print (`space`)

```javascript
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "Alice",
//   "age": 30,
//   "hobbies": ["reading", "coding"]
// }
```

### Replacer & Reviver

```javascript
// Replacer — filter/modify properties during stringify
JSON.stringify(user, ["name", "age"]);
// '{"name":"Alice","age":30}' — only these keys

JSON.stringify(user, (key, value) => {
  if (typeof value === "string") return value.toUpperCase();
  return value;
});
// '{"name":"ALICE","age":30,"hobbies":["READING","CODING"]}'

// Reviver — transform values during parse
const parsed = JSON.parse(json, (key, value) => {
  if (key === "age") return value + 1; // age becomes 31
  return value;
});
```

### JSON Pitfalls

```javascript
// undefined, functions, and symbols are OMITTED
JSON.stringify({ a: undefined, b: () => {}, c: Symbol() });
// '{}'

// NaN and Infinity become null
JSON.stringify({ x: NaN, y: Infinity });
// '{"x":null,"y":null}'

// Dates become strings (not restored automatically)
const withDate = { date: new Date() };
const str = JSON.stringify(withDate);
// '{"date":"2026-06-22T..."}'
JSON.parse(str).date; // string, not Date!
```

### Deep Copy Caveat (JSON method)

```javascript
const original = {
  name: "Alice",
  address: { city: "Mumbai" },
  date: new Date(),
  fn: () => console.log("hi")
};

const copy = JSON.parse(JSON.stringify(original));
copy.address.city = "Delhi";
console.log(original.address.city); // "Mumbai" ✅ for objects/arrays

// But:
copy.date; // string, not Date ❌
copy.fn;   // undefined ❌ functions are lost
```

> **Better alternative:** Use `structuredClone()` (modern, handles Dates, Maps, Sets, RegExp, circular refs) or a library like Lodash's `cloneDeep`.

### `localStorage`

Persists data across browser sessions. ~5–10 MB per origin.

```javascript
// Store (strings only — use JSON for objects)
localStorage.setItem("token", "abc123");
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));

// Retrieve
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

// Remove
localStorage.removeItem("token");
localStorage.clear(); // removes all keys
```

### `sessionStorage`

Same API as `localStorage`, but data is cleared when the tab closes.

```javascript
sessionStorage.setItem("searchQuery", "JavaScript");
const query = sessionStorage.getItem("searchQuery");
sessionStorage.clear();
```

### Storage Events

Listen for storage changes from other tabs/windows.

```javascript
window.addEventListener("storage", (e) => {
  console.log(`${e.key} changed from "${e.oldValue}" to "${e.newValue}"`);
  console.log("Origin:", e.url);
});
```

### Key Takeaways

- `JSON.stringify` converts objects to strings; `JSON.parse` converts back
- Use `replacer` (array or function) to filter what gets serialized
- `reviver` lets you transform values during parsing
- JSON cannot serialize `undefined`, functions, Symbols, or Dates (Dates become strings)
- `localStorage` persists until cleared; `sessionStorage` clears on tab close
- Always use `JSON.stringify`/`JSON.parse` for storing objects in storage
- For deep cloning, consider `structuredClone()` instead of the JSON hack
