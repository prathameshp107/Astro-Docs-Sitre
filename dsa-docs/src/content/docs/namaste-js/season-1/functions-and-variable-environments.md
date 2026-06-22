---
title: "Functions and Variable Environments"
description: "function a() { var x = 10; // local scope because of separate execution context console.log(x); }"
sidebar:
  order: 4
---

# Episode 4 : Functions and Variable Environments

```js
var x = 1;
a();
b(); // we are calling the functions before defining them. This will work properly, as seen in Hoisting.
console.log(x);

function a() {
  var x = 10; // local scope because of separate execution context
  console.log(x);
}

function b() {
  var x = 100;
  console.log(x);
}
```

Outputs:

> 10

> 100

> 1







```mermaid
flowchart TB
    subgraph GEC["1. Global Execution Context (GEC)"]
        G_Mem["Memory Phase:
x → undefined
a → function a() { ... }
b → function b() { ... }"]
        G_Code["Execution Phase:
x = 1
a() called → New EC created"]
    end

    GEC --> EC_A

    subgraph EC_A["2. EC for a()"]
        A_Mem["Memory Phase:
x → undefined"]
        A_Code["Execution Phase:
x = 10
console.log(x) → 10
EC removed after completion"]
    end

    EC_A --> EC_B

    subgraph EC_B["3. EC for b()"]
        B_Mem["Memory Phase:
x → undefined"]
        B_Code["Execution Phase:
x = 100
console.log(x) → 100
EC removed after completion"]
    end

    EC_B --> Done["4. GEC removed
Program ends"]

    style GEC fill:#7c3aed,color:#fff
    style EC_A fill:#4f46e5,color:#fff
    style EC_B fill:#6366f1,color:#fff
    style Done fill:#059669,color:#fff
```


## Code Flow in terms of Execution Context

- The Global Execution Context (GEC) is created (the big box with Memory and Code subparts). Also GEC is pushed into Call Stack

> Call Stack : GEC

- In first phase of GEC (memory phase), variable x:undefined and a and b have their entire function code as value initialized

- In second phase of GEC (execution phase), when the function is called, a new local Execution Context is created. After x = 1 assigned to GEC x, a() is called. So local EC for a is made inside code part of GEC.

> Call Stack: [GEC, a()]

- For local EC, a totally different x variable assigned undefined(x inside a()) in phase 1 , and in phase 2 it is assigned 10 and printed in console log. After printing, no more commands to run, so a() local EC is removed from both GEC and from Call stack

> Call Stack: GEC

- Cursor goes back to b() function call. Same steps repeat.

> Call Stack :[GEC, b()] -> GEC (after printing yet another totally different x value as 100 in console log)

- Finally GEC is deleted and also removed from call stack. Program ends.

- reference:

![Execution Context Phase 1](/DSA-Notes-Problems/assets/js/function.jpg "Execution Context")

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=gSDncyuGw0s&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/gSDncyuGw0s/0.jpg" width="750"
alt="Functions and Variable Environments Youtube Link"/></a>

<br>

<hr>

<br>