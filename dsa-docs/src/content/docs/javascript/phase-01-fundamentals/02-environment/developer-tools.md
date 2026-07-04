---
title: "Developer Tools"
description: "Use browser DevTools to debug, inspect network, and analyze performance."
sidebar:
  order: 4
---

# Developer Tools

> Browser DevTools (F12) are your #1 tool for JavaScript development.

## DevTools Overview

```mermaid
flowchart TD
    A["🌐 Press F12 / Ctrl+Shift+I"] --> B["🛠️ DevTools Opens"]
    B --> C["📝 Elements Tab"]
    B --> D["🖥️ Console Tab"]
    B --> E["📡 Network Tab"]
    B --> F["🐞 Sources Tab"]
    B --> G["⚡ Performance Tab"]
    B --> H["💾 Application Tab"]
    
    C --> C1["Inspect & edit HTML"]
    C --> C2["See CSS applied"]
    D --> D1["Run JS commands"]
    D --> D2["See errors/logs"]
    E --> E1["Watch API calls"]
    E --> E2["Check response times"]
    F --> F1["Set breakpoints"]
    F --> F2["Step through code"]
    G --> G1["Record performance"]
    H --> H1["Local Storage"]
    H --> H2["Cookies, IndexedDB"]
    
    style A fill:#fbbf24
    style B fill:#3b82f6,color:#fff
```

## Setting Breakpoints

```javascript
// app.js — add this and open DevTools → Sources → app.js
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
    debugger; // Pauses execution here (like a breakpoint)
  }
  return total;
}

const cart = [
  { name: "Shoes", price: 50, quantity: 2 },
  { name: "Shirt", price: 30, quantity: 1 },
];

console.log(calculateTotal(cart));
```

## 🚀 DevTools Power Tips

| Action | How |
|--------|-----|
| **Console autocomplete** | Start typing → suggestions appear |
| **$0** | Last inspected element |
| **console.table()** | Print arrays/objects as table |
| **Monitor events** | `monitorEvents(element)` |
| **Copy from console** | Right-click → "Copy object" |
| **$() shorthand** | `$("div")` = `document.querySelector("div")` |
| **$$() shorthand** | `$$("div")` = `document.querySelectorAll("div")` |
