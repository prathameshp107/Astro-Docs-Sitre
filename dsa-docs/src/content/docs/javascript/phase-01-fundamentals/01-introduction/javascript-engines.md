---
title: "JavaScript Engines"
description: "Learn how JavaScript engines like V8, SpiderMonkey, and JavaScriptCore turn your code into executable machine code."
sidebar:
  order: 4
---

# JavaScript Engines

> A **JavaScript engine** is a program that executes JavaScript code. It's the heart of every JavaScript runtime.

## Why Do We Need This?

Without an engine, your JavaScript code is just text in a file. The engine is what makes it actually **do** something — it reads your code, understands it, and tells the computer what to do.

## Visual Explanation

```mermaid
flowchart TD
    subgraph Engine["💻 JavaScript Engine"]
        A["📄 Source Code"] --> B["🔍 Parser"]
        B --> C["🌳 AST (Abstract Syntax Tree)"]
        C --> D["⚡ Interpreter (Ignition)"]
        D --> E["📝 Bytecode"]
        E --> F["🚀 Compiler (TurboFan)"]
        F --> G["⚙️ Optimized Machine Code"]
    end
    
    G --> H["✅ Execution"]
    
    style Engine fill:#1e1e2e,color:#fff
    style G fill:#059669,color:#fff
    style H fill:#10b981,color:#fff
```

## Popular JavaScript Engines

```mermaid
flowchart LR
    A["JavaScript Engines"] --> B["V8"]
    A --> C["SpiderMonkey"]
    A --> D["JavaScriptCore"]
    A --> E["Hermes"]
    
    B --> F["Chrome"]
    B --> G["Node.js"]
    B --> H["Deno"]
    B --> I["Brave"]
    B --> J["Electron"]
    
    C --> K["Firefox"]
    
    D --> L["Safari"]
    
    E --> M["React Native"]
    
    style A fill:#7c3aed,color:#fff
    style B fill:#f0db4f,color:#000
```

| Engine | Used By | Language | Key Features |
|--------|---------|----------|--------------|
| **V8** | Chrome, Node.js, Deno, Brave, Electron | C++ | Fastest, largest ecosystem |
| **SpiderMonkey** | Firefox | C++ | First JS engine ever (1996) |
| **JavaScriptCore** | Safari (WebKit) | C++ | Most power-efficient |
| **Hermes** | React Native | C++ | Optimized for mobile startup |
| **Chakra** | Legacy Edge (pre-Chromium) | C++ | No longer developed |

## Detailed Explanation

### How an Engine Works (Simplified)

```mermaid
flowchart LR
    A["✏️ Source Code"] --> B["🧩 Parser"]
    B --> C["🌳 AST"]
    C --> D["⚡ Interpreter"]
    D --> E["📝 Bytecode"]
    
    D -.->|"Hot code detected"| F["🔥 Compiler"]
    F --> G["⚙️ Optimized Code"]
    G --> D
    
    style A fill:#fbbf24
    style G fill:#34d399
```

1. **Parsing** — Source code → Tokens → Abstract Syntax Tree (AST)
2. **Interpreting** — AST → Bytecode (executed quickly)
3. **Profiling** — Engine watches which code runs frequently ("hot")
4. **Compiling** — Hot code → Optimized machine code
5. **Deoptimizing** — If assumptions break, fall back to interpreted code

### The V8 Pipeline (Chrome/Node.js)

| Step | Component | What it does |
|------|-----------|--------------|
| 1 | **Scanner** | Breaks source into tokens (`let`, `=`, `5`, `;`) |
| 2 | **Parser** | Creates AST (Abstract Syntax Tree) |
| 3 | **Ignition** | Interpreter → generates bytecode |
| 4 | **TurboFan** | Optimizing compiler → machine code |
| 5 | **Orinoco** | Garbage collector → frees unused memory |

## 💡 Did You Know?

> V8 is written in **C++** and contains over **1 million lines of code**. It was created by Google in 2008 for Chrome. Before V8, JavaScript was slow. V8 made JavaScript fast enough to run server-side (birth of Node.js).

## 🔥 Performance Insight

Engines use **hidden classes** and **inline caching** to speed up property access:

```javascript
// V8 creates a hidden class for this object shape
function Point(x, y) {
  this.x = x;  // Hidden class transition 1
  this.y = y;  // Hidden class transition 2
}

// Both use the same hidden class → fast
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

// Different structure → slow (hidden class changes)
p1.z = 5;  // Forces new hidden class
```

## 🚀 Best Practices

- Write **monomorphic** code (objects with same shape) for better performance
- Initialize all properties in the constructor
- Avoid deleting properties from objects
- Use `Map` for dynamic key collections (instead of objects)

## 🎯 Interview Tip

> **Q:** "How does V8 execute JavaScript?"
> **A:** "V8 uses a multi-tier pipeline: **Ignition** (interpreter) generates bytecode quickly, while **TurboFan** (compiler) optimizes hot code paths into native machine code. Hot code refers to functions that run many times."

## ✅ Summary

- JavaScript engines convert high-level JS to machine code
- V8 is the most popular (Chrome, Node.js, Deno)
- Modern engines use JIT (Just-In-Time) compilation
- Engines optimize hot code paths for performance
- Different engines have different trade-offs (speed vs memory)

## 🔗 What's Next?

- [Compilation vs Interpretation](./compilation-vs-interpretation) — Deep dive into JIT
- [JavaScript Runtime](./javascript-runtime) — Beyond the engine

---

> 💡 **Key Insight:** The engine is just the code executor. The **runtime** (browser/Node.js) provides all the APIs you actually use (DOM, `fetch`, `console`, etc.).
