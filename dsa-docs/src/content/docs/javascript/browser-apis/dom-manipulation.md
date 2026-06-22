---
title: "DOM Manipulation"
description: "document.querySelector, creating/removing nodes, textContent vs innerHTML, attributes, classes, styles, and DOM traversal."
sidebar:
  order: 23
---

## DOM Manipulation

The **DOM** (Document Object Model) is JavaScript's interface to HTML. It represents the page as a tree of nodes you can read and modify.

### Selecting Elements

```javascript
// Single element (returns first match)
const heading = document.querySelector("h1");
const button = document.querySelector("#submit");
const firstItem = document.querySelector(".item");

// All matches (returns NodeList — use Array.from() or spread)
const allItems = document.querySelectorAll(".item");
allItems.forEach(el => console.log(el.textContent));

// Older methods (still common)
document.getElementById("app");          // by id
document.getElementsByClassName("item"); // live HTMLCollection
document.getElementsByTagName("div");    // live HTMLCollection
```

### Creating & Removing Nodes

```javascript
// Create
const div = document.createElement("div");
const text = document.createTextNode("Hello!");
div.appendChild(text);

// Insert
document.body.appendChild(div);
document.body.prepend(div);          // at the start
document.body.insertBefore(div, ref); // before a reference node

// Remove
div.remove();                        // modern
document.body.removeChild(div);      // older
```

### `textContent` vs `innerHTML`

```javascript
const div = document.querySelector("#app");

// textContent — safe, sets plain text
div.textContent = "Hello <b>World</b>";
// Renders: Hello <b>World</b> (as text)

// innerHTML — parses HTML (⚠️ XSS risk!)
div.innerHTML = "Hello <b>World</b>";
// Renders: Hello World (bold)

// ❌ Never do this with user input:
userContent = "<img src=x onerror='alert(\"XSS\")'>";
div.innerHTML = userContent; // executes script!
div.textContent = userContent; // safe
```

### Attributes

```javascript
const link = document.querySelector("a");

link.getAttribute("href");       // "/about"
link.setAttribute("href", "/contact");
link.hasAttribute("target");     // true/false
link.removeAttribute("target");

// Data attributes (HTML: data-id="123")
link.dataset.id;                 // "123"
link.dataset.userType;           // "admin" (from data-user-type)
```

### Classes

```javascript
const el = document.querySelector(".active");

el.classList.add("highlight");
el.classList.remove("active");
el.classList.toggle("visible");  // add if missing, remove if present
el.classList.contains("active"); // true/false
el.classList.replace("old", "new");
```

### Styles

```javascript
const el = document.querySelector("#box");

// Inline styles (camelCase)
el.style.backgroundColor = "blue";
el.style.fontSize = "16px";
el.style.display = "flex";

// Computed styles (read-only)
const styles = getComputedStyle(el);
styles.color;   // "rgb(0, 0, 0)"
styles.display; // "flex"
```

### DOM Traversal

```javascript
const el = document.querySelector(".item");

el.parentElement;           // parent node
el.children;                // HTMLCollection of children
el.firstElementChild;       // first child element
el.lastElementChild;        // last child element
el.previousElementSibling;  // previous sibling
el.nextElementSibling;      // next sibling
el.closest(".container");   // nearest ancestor matching selector
```

### Key Takeaways

- `querySelector` and `querySelectorAll` are the modern, flexible selection methods
- Prefer `textContent` over `innerHTML` to avoid XSS vulnerabilities
- `classList` provides a clean API for class manipulation
- Use `getComputedStyle()` to read CSS values (not `.style`)
- `closest()` is the easiest way to find a parent matching a selector
- DOM methods like `appendChild`, `remove`, and `replaceWith` let you restructure the page
