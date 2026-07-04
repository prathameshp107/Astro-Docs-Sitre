---
title: "Node.js Environment"
description: "Install Node.js and run JavaScript on the server-side."
sidebar:
  order: 2
---

# Node.js Environment

> Node.js lets you run JavaScript **outside the browser** — on servers, desktops, and IoT devices.

## Visual Explanation

```mermaid
flowchart TD
    A["📄 app.js"] --> B["🖥️ Node.js"]
    B --> C["⚙️ V8 Engine"]
    C --> D["📁 File System"]
    C --> E["🌐 HTTP Module"]
    C --> F["🔌 Streams"]
    C --> G["📦 npm Packages"]
    
    style B fill:#059669,color:#fff
    style G fill:#cb3837,color:#fff
```

## Installation

1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version
3. Run the installer
4. Verify:

```bash
node --version   # e.g., v22.x.x
npm --version    # e.g., 10.x.x
```

## Running JavaScript with Node.js

```bash
# Run a file
node app.js

# Open the REPL (interactive shell)
node
> console.log("Hello from Node.js!")
> .exit
```

## Example

```javascript
// app.js — server-side JavaScript
const fs = require("fs");

fs.writeFileSync("hello.txt", "Hello from Node.js!");
console.log("File created!");
```

```bash
node app.js
# File created!
# Check your directory — hello.txt exists!
```
