---
title: "Browser Environment"
description: "Learn how to run JavaScript in the browser and use the console for testing."
sidebar:
  order: 1
---

# Browser Environment

> Every web browser is a complete JavaScript runtime environment.

## Visual Explanation

```mermaid
flowchart TD
    A["📄 index.html"] --> B["🔗 script tag"]
    B --> C["🌐 Browser Loads Page"]
    C --> D["⚙️ JavaScript Engine"]
    D --> E["📍 DOM APIs"]
    D --> F["🖱️ Event APIs"]
    D --> G["📡 Network APIs"]
    D --> H["💾 Storage APIs"]
    
    style A fill:#fbbf24
    style C fill:#3b82f6,color:#fff
    style D fill:#f0db4f,color:#000
```

## Running JavaScript in the Browser

**Method 1: Inline in HTML**
```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="alert('Hello!')">Click Me</button>
  <script>
    console.log("This runs when the page loads");
  </script>
</body>
</html>
```

**Method 2: External file (recommended)**
```html
<!DOCTYPE html>
<html>
<body>
  <script src="app.js"></script>
</body>
</html>
```

## The Browser Console

Press `F12` or `Ctrl+Shift+I` (Cmd+Option+I on Mac) to open DevTools, then click "Console":

```javascript
// Try these in the browser console:
console.log("Hello from the browser!");
console.warn("This is a warning");
console.error("This is an error");

// You can run ANY JavaScript in the console
const name = prompt("What's your name?");
alert(`Hello, ${name}!`);
```
