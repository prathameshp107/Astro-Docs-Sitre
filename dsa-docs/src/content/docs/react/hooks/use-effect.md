---
title: "useEffect"
description: "useEffect hook for side effects in React components."
sidebar:
 order: 2
---
# 2. useEffect -> "Do something after render"
> *Explanation*: 👉 Sometimes your component needs to do things outside of just drawing the UI-like fetching data from the internet, setting a timer, or updating the browser tab's title. useEffect tells React: "Hey, finish drawing the screen first, and then go do this extra task."
Example: Changing the browser tab title when the counter changes.
👉 Used for:
* API calls
* timers
* logging
```jsx
function App() {
 React.useEffect(() => {
 console.log("Page loaded");
 }, []);
 return <h1>Hello</h1>;
}
```
---
### With dependency:
```jsx
useEffect(() => {
 console.log("Count changed");
}, [count]);
```
👉 Runs only when `count` changes
 ### Simple idea:
 > "Run this code after UI is shown"
### useEffect Timeline

```mermaid
flowchart LR
    Mount["Component\nMounts"] --> RunEffect["useEffect runs\nafter first paint"]
    Mount --> CleanupPrev["Previous\ncleanup runs"]

    RunEffect --> Deps["Dependencies\nchange?"]
    Deps -->|"Yes"| Cleanup["Cleanup function\nruns first"]
    Cleanup --> RunAgain["Effect runs\nagain"]
    Deps -->|"No"| Skip["Effect skipped"]

    Mount --> Unmount["Component\nUnmounts"]
    Unmount --> FinalCleanup["Final cleanup\nruns"]

    style Mount fill:#4f46e5,color:#fff
    style RunEffect fill:#059669,color:#fff
    style Deps fill:#d97706,color:#fff
    style Cleanup fill:#f59e0b,color:#fff
    style Unmount fill:#dc2626,color:#fff
    style FinalCleanup fill:#dc2626,color:#fff
```

---