---
title: "Execution Context"
description: "- Everything in JS happens inside the execution context. Imagine a sealed-off container inside which JS runs. It is an abstract concept that hold info abou"
sidebar:
  order: 1
---

# Episode 1 : Execution Context

- Everything in JS happens inside the execution context. Imagine a sealed-off container inside which JS runs. It is an abstract concept that hold info about the env. within the current code is being executed.

```mermaid
flowchart TB
    subgraph EC["Execution Context"]
        direction TB
        Memory["💾 Memory Component
(Variable Environment)

Variables stored as
key-value pairs

var n = undefined
function square = {code}
var square2 = undefined
"]
        Code["⚡ Code Component
(Thread of Execution)

Code executed
one line at a time

1. n = 2
2. square2 = square(n)
3. ...
"]
    end

    Memory --> Code

    style EC fill:#1e293b,color:#fff
    style Memory fill:#7c3aed,color:#fff
    style Code fill:#059669,color:#fff
```

  ![Execution Context](/DSA-Notes-Problems/assets/js/execution-context.jpg "Execution Context")

- In the container the first component is **memory component** and the 2nd one is **code component**

- Memory component has all the variables and functions in key value pairs. It is also called **Variable environment**.

- Code component is the place where code is executed one line at a time. It is also called the **Thread of Execution**.

- JS is a **synchronous**, **single-threaded** language
  - Synchronous:- One command at a time.
  - Single-threaded:- In a specific synchronous order.

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=ZvbzSrg0afE&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" target="_blank"><img src="https://img.youtube.com/vi/ZvbzSrg0afE/0.jpg" width="750"
alt="Execution Context Youtube Link"/></a>

<br>

<hr>

<br>