---
title: "Shortest JS Program, window & this keyword"
description: "- The shortest JS program is empty file. Because even then, JS engine does a lot of things. As always, even in this case, it creates the GEC which has memo"
sidebar:
  order: 5
---

# Episode 5 : Shortest JS Program, window & this keyword

- The shortest JS program is empty file. Because even then, JS engine does a lot of things. As always, even in this case, it creates the GEC which has memory space and the execution context.


```mermaid
flowchart TB
    subgraph GEC["Global Execution Context Created"]
        WindowObj["window object
(browser global object)
Contains:
- Math, Date, console
- setTimeout, fetch
- DOM APIs
- And many more..."]

        ThisKeyword["this keyword
At global level: this === window"]
        
        Variables["Global Variables
var x = 10
→ x gets attached to window
→ window.x === 10
→ this.x === 10"]
    end

    WindowObj --> ThisKeyword
    ThisKeyword --> Variables

    Note["💡 Key Point:
Even an empty JS file creates:
1. Global Execution Context (GEC)
2. window object
3. this keyword
All automatically by the JS engine!"]

    GEC --> Note

    style GEC fill:#7c3aed,color:#fff
    style WindowObj fill:#4f46e5,color:#fff
    style ThisKeyword fill:#059669,color:#fff
    style Variables fill:#6366f1,color:#fff
    style Note fill:#d97706,color:#fff
```


- JS engine creates something known as '**window**'. It is an object, which is created in the global space. It contains lots of functions and variables. These functions and variables can be accessed from anywhere in the program. JS engine also creates a **this** keyword, which points to the **window object** at the global level. So, in summary, along with GEC, a global object (window) and a this variable are created.

- In different engines, the name of global object changes. Window in browsers, but in nodeJS it is called something else. At global level, this === window

- If we create any variable in the global scope, then the variables get attached to the global object.

eg:

```js
var x = 10;
console.log(x); // 10
console.log(this.x); // 10
console.log(window.x); // 10
```

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=QCRpVw2KXf8&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/QCRpVw2KXf8/0.jpg" width="750"
alt="Shortest JS Program, window & this keyword Youtube Link"/></a>

<br>

<hr>

<br>