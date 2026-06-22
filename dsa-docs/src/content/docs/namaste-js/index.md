---
title: "Namaste JavaScript"
description: "Namaste JavaScript course notes covering execution context, hoisting, closures, and more."
---

# Namaste JavaScript

Namaste JavaScript course notes covering execution context, hoisting, closures, and more.
```mermaid
flowchart TB
    subgraph Foundation["Foundation"]
        EC["1. Execution Context"] --> CS["2. Call Stack"]
        CS --> Hoisting["3. Hoisting"]
        Hoisting --> FVE["4. Functions & Variable Env"]
        FVE --> Window["5. window & this"]
        Window --> Undef["6. undefined vs not defined"]
    end

    subgraph Scoping["Scoping & Closures"]
        Scope["7. Scope Chain & Lexical Env"] --> TDZ["8. let/const & TDZ"]
        TDZ --> Block["9. Block Scope & Shadowing"]
        Block --> Closures["10. Closures"]
        Closures --> SetTime["11. setTimeout + Closures"]
        SetTime --> Interview["12. Interview Questions ft. Closures"]
    end

    subgraph Functions["Functions & Async"]
        FCF["13. First Class Functions"] --> CB["14. Callback Functions"]
        CB --> EventLoop["15. Event Loop"] --> V8["16. V8 Architecture"]
        V8 --> Trust["17. Trust issues with setTimeout"]
        Trust --> HOF["18. Higher-Order Functions"]
        HOF --> MFR["19. map, filter & reduce"]
    end

    subgraph Season2["Season 2 - Promises & Async"]
        CHell["20. Callback Hell & IoC"] --> Prom["21. Promises"]
        Prom --> CreateP["22. Creating a Promise & Chaining"]
        CreateP --> PAPI["23. Promise APIs"]
        PAPI --> AsyncAwait["24. async / await"]
        AsyncAwait --> ThisKw["25. this keyword"]
    end

    Foundation --> Scoping --> Functions --> Season2

    style Foundation fill:#7c3aed,color:#fff
    style Scoping fill:#4f46e5,color:#fff
    style Functions fill:#059669,color:#fff
    style Season2 fill:#b45309,color:#fff
```



## Sections

- [Execution Context](/DSA-Notes-Problems/namaste-js/execution-context)
- [How JS is executed & Call Stack](/DSA-Notes-Problems/namaste-js/how-js-is-executed-call-stack)
- [Hoisting in JavaScript (variables & functions)](/DSA-Notes-Problems/namaste-js/hoisting-in-javascript-variables-functions)
- [Functions and Variable Environments](/DSA-Notes-Problems/namaste-js/functions-and-variable-environments)
- [Shortest JS Program, window & this keyword](/DSA-Notes-Problems/namaste-js/shortest-js-program-window-this-keyword)
- [undefined vs not defined in JS](/DSA-Notes-Problems/namaste-js/undefined-vs-not-defined-in-js)
- [The Scope Chain, Scope & Lexical Environment](/DSA-Notes-Problems/namaste-js/the-scope-chain-scope-lexical-environment)
- [let & const in JS, Temporal Dead Zone](/DSA-Notes-Problems/namaste-js/let-const-in-js-temporal-dead-zone)
- [Block Scope & Shadowing in JS](/DSA-Notes-Problems/namaste-js/block-scope-shadowing-in-js)
- [Closures in JS](/DSA-Notes-Problems/namaste-js/closures-in-js)
- [setTimeout + Closures Interview Question](/DSA-Notes-Problems/namaste-js/settimeout-closures-interview-question)
- [Famous Interview Questions ft. Closures](/DSA-Notes-Problems/namaste-js/famous-interview-questions-ft-closures)
- [First Class Functions ft. Anonymous Functions](/DSA-Notes-Problems/namaste-js/first-class-functions-ft-anonymous-functions)
- [Callback Functions in JS ft. Event Listeners](/DSA-Notes-Problems/namaste-js/callback-functions-in-js-ft-event-listeners)
- [Asynchronous JavaScript & EVENT LOOP from scratch](/DSA-Notes-Problems/namaste-js/asynchronous-javascript-event-loop-from-scratch)
- [JS Engine Exposed, Google's V8 Architecture](/DSA-Notes-Problems/namaste-js/js-engine-exposed-googles-v8-architecture)
- [Trust issues with setTimeout()](/DSA-Notes-Problems/namaste-js/trust-issues-with-settimeout)
- [Higher-Order Functions ft. Functional Programming](/DSA-Notes-Problems/namaste-js/higher-order-functions-ft-functional-programming)
- [map, filter & reduce](/DSA-Notes-Problems/namaste-js/map-filter-reduce)

## Season 2 — Promises & Async

- [Callback Hell & Inversion of Control](/DSA-Notes-Problems/namaste-js/callback-hell-inversion-of-control)
- [Promises](/DSA-Notes-Problems/namaste-js/promises)
- [Creating a Promise, Chaining & Error Handling](/DSA-Notes-Problems/namaste-js/creating-a-promise-chaining-error-handling)
- [Promise APIs (all, allSettled, race, any)](/DSA-Notes-Problems/namaste-js/promise-apis-all-allsettled-race-any)
- [async / await](/DSA-Notes-Problems/namaste-js/async-await)
- [this keyword in JavaScript](/DSA-Notes-Problems/namaste-js/this-keyword-in-javascript)