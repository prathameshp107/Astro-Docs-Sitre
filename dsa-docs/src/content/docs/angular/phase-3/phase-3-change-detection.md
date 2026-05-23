---
title: "1. Change Detection"
description: "Angular maintains a component tree that mirrors your DOM. When data changes (user clicks, HTTP responses, timers), Angular must know which components to re"
sidebar:
  order: 1
---

## 1. Change Detection

### Why Angular Needs Change Detection

Angular maintains a **component tree** that mirrors your DOM. When data changes (user clicks, HTTP responses, timers), Angular must know *which* components to re-render. Change detection is the mechanism that answers: "Has the model changed? If so, update the view."

Angular's change detection is **pull-based** — Angular *asks* "has anything changed?" rather than waiting to be told. This is different from React (virtual DOM diffing) or Vue (reactive proxies).

---

### Zone.js — The Change Detection Trigger

#### What Is Zone.js?

Zone.js is a **monkey-patching library** that intercepts all asynchronous browser APIs. It wraps every async operation in a "zone" — a persistent execution context that Angular can hook into.

#### What Zone.js Patches

Zone.js overrides (monkey-patches) the following APIs at application bootstrap:

```
setTimeout / setInterval / clearTimeout / clearInterval
Promise.then / Promise.catch / Promise.finally
XMLHttpRequest.open / XMLHttpRequest.send
addEventListener / removeEventListener
requestAnimationFrame
MutationObserver
```

#### Internal Mechanism

When your Angular app bootstraps (`platformBrowserDynamic().bootstrapModule(AppModule)`), Angular creates a special zone called **NgZone**. Every async operation your app runs lives inside this zone.

```typescript
// Simplified internal representation of NgZone
class NgZone {
  private _inner: Zone;      // The Angular zone
  private _outer: Zone;      // The parent (browser) zone

  constructor() {
    // Zone.js onMicrotaskEmpty hook
    this._inner = Zone.current.fork({
      name: 'angular',
      onHasTask: (delegate, current, target, hasTaskState) => {
        // When task queue empties → trigger change detection
        if (!hasTaskState.microTask && !hasTaskState.macroTask) {
          this.onMicrotaskEmpty.emit(null); // <-- triggers ApplicationRef.tick()
        }
      }
    });
  }

  run<T>(fn: () => T): T {
    return this._inner.run(fn); // Execute inside Angular zone
  }

  runOutsideAngular<T>(fn: () => T): T {
    return this._outer.run(fn); // Bypass Angular zone (no CD triggered)
  }
}
```

**Flow:**

1. User clicks a button → Zone.js intercepts the event listener call
2. The callback runs *inside* the Angular zone
3. When the microtask queue empties, Zone.js fires `onMicrotaskEmpty`
4. Angular's `ApplicationRef.tick()` is called → full change detection cycle begins

```typescript
// Internal ApplicationRef.tick() — simplified
class ApplicationRef {
  tick(): void {
    for (const view of this._views) {
      view.detectChanges(); // Walk every component tree
    }
  }
}
```

---

### Architecture Diagram — Zone.js to DOM Update

```svg
<svg viewBox="0 0 700 620" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="620" fill="#0f1117" rx="12"/>

  <!-- Title -->
  <text x="350" y="38" text-anchor="middle" fill="#e2e8f0" font-size="18" font-weight="700">Angular Change Detection Flow</text>

  <!-- Step 1: User Action -->
  <rect x="230" y="60" width="240" height="56" rx="10" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="350" y="84" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="600">User Action</text>
  <text x="350" y="103" text-anchor="middle" fill="#64748b" font-size="11">(click, input, HTTP response, timer)</text>

  <!-- Arrow 1 -->
  <line x1="350" y1="116" x2="350" y2="148" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="370" y="136" fill="#94a3b8" font-size="10">intercepts</text>

  <!-- Step 2: Zone.js -->
  <rect x="200" y="148" width="300" height="68" rx="10" fill="#1e3a2f" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="172" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Zone.js (NgZone)</text>
  <text x="350" y="190" text-anchor="middle" fill="#64748b" font-size="11">Monkey-patches async APIs</text>
  <text x="350" y="206" text-anchor="middle" fill="#64748b" font-size="11">Tracks task queue → fires onMicrotaskEmpty</text>

  <!-- Arrow 2 -->
  <line x1="350" y1="216" x2="350" y2="248" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="360" y="236" fill="#94a3b8" font-size="10">ApplicationRef.tick()</text>

  <!-- Step 3: Change Detection Engine -->
  <rect x="175" y="248" width="350" height="80" rx="10" fill="#2d1e3a" stroke="#a855f7" stroke-width="2"/>
  <text x="350" y="272" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">Change Detection Engine</text>
  <text x="350" y="290" text-anchor="middle" fill="#64748b" font-size="11">Walks component tree top-down</text>
  <text x="350" y="308" text-anchor="middle" fill="#64748b" font-size="11">Compares old vs new values (dirty checking)</text>

  <!-- Strategy branch -->
  <line x1="350" y1="328" x2="350" y2="355" stroke="#a855f7" stroke-width="2" marker-end="url(#arrow3)"/>

  <!-- Branch point -->
  <circle cx="350" cy="360" r="6" fill="#a855f7"/>

  <!-- Default Strategy box -->
  <line x1="344" y1="360" x2="200" y2="400" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="100" y="400" width="200" height="60" rx="8" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="200" y="422" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Default Strategy</text>
  <text x="200" y="440" text-anchor="middle" fill="#64748b" font-size="10">Check ALL components</text>
  <text x="200" y="455" text-anchor="middle" fill="#64748b" font-size="10">every CD cycle</text>

  <!-- OnPush Strategy box -->
  <line x1="356" y1="360" x2="500" y2="400" stroke="#06b6d4" stroke-width="1.5"/>
  <rect x="400" y="400" width="210" height="60" rx="8" fill="#0f1e22" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="505" y="422" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="600">OnPush Strategy</text>
  <text x="505" y="440" text-anchor="middle" fill="#64748b" font-size="10">Check only if: @Input ref changed,</text>
  <text x="505" y="455" text-anchor="middle" fill="#64748b" font-size="10">event in component, async pipe emits</text>

  <!-- Arrow to View Checking -->
  <line x1="200" y1="460" x2="280" y2="498" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow4)"/>
  <line x1="505" y1="460" x2="420" y2="498" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#arrow4)"/>

  <!-- Step 4: View Checking -->
  <rect x="195" y="498" width="310" height="56" rx="10" fill="#1e1e2e" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="521" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600">Template Expression Check</text>
  <text x="350" y="540" text-anchor="middle" fill="#64748b" font-size="11">LView dirty-checks bindings: {{ expr }}, [prop]</text>

  <!-- Arrow to DOM -->
  <line x1="350" y1="554" x2="350" y2="584" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow5)"/>

  <!-- Step 5: DOM Update -->
  <rect x="230" y="584" width="240" height="26" rx="8" fill="#1a2e1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="350" y="601" text-anchor="middle" fill="#86efac" font-size="12" font-weight="600">DOM Update (Renderer2)</text>

  <!-- Arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
    </marker>
    <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7"/>
    </marker>
    <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
    </marker>
    <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
    </marker>
  </defs>
</svg>
```

---

### Default Change Detection Strategy

```typescript
@Component({
  selector: 'app-user',
  template: `<h1>{{ user.name }}</h1>`,
  // changeDetection: ChangeDetectionStrategy.Default  ← implicit
})
export class UserComponent {
  @Input() user: { name: string };
}
```

#### Internal Behavior

Angular uses **LView** (Logical View) — an internal data structure representing each component's state. In Default strategy, Angular walks the entire component tree on every CD cycle and re-evaluates **every bound expression** using dirty-checking.

```
Root
├── AppComponent       ← always checked
│   ├── HeaderComponent   ← always checked
│   ├── UserListComponent ← always checked
│   │   ├── UserComponent ← always checked
│   │   └── UserComponent ← always checked
│   └── FooterComponent   ← always checked
```

Even if only `HeaderComponent` changed, **all** components are checked. This is **O(n)** per CD cycle.

---

### OnPush Change Detection Strategy

```typescript
@Component({
  selector: 'app-user',
  template: `<h1>{{ user.name }}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: { name: string };
}
```

#### What Triggers OnPush

Angular marks a component **dirty** (needs checking) only when:

1. **`@Input` reference changes** — object identity (`===`) changes, not deep equality
2. **An event originates inside the component** — DOM event in the component's template
3. **An `async` pipe emits a new value** — Angular calls `markForCheck()` internally
4. **`ChangeDetectorRef.markForCheck()`** is explicitly called

```typescript
// Correct: new reference triggers OnPush
this.user = { ...this.user, name: 'Alice' };  // ✅ new object ref

// Wrong: mutating object does NOT trigger OnPush
this.user.name = 'Alice';  // ❌ same object ref, CD skipped
```

#### Internal: markForCheck() vs detectChanges()

```typescript
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class MyComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  // Marks this + all ancestors as dirty.
  // CD will check them on the NEXT cycle.
  triggerFromParent(): void {
    this.cdr.markForCheck();
  }

  // Synchronously runs CD for THIS subtree immediately.
  // Useful for running outside NgZone.
  triggerImmediately(): void {
    this.cdr.detectChanges();
  }
}
```

#### Detached View

```typescript
// Completely opt out of automatic CD
this.cdr.detach();

// Manually trigger when needed
setInterval(() => {
  this.data = fetchData();
  this.cdr.detectChanges();
}, 5000);
```

---

### Running Code Outside NgZone

```typescript
@Component({ ... })
export class HeavyAnimationComponent implements OnInit {
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Heavy RAF loop — don't trigger CD on every frame
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        this.updateCanvas(); // DOM manipulation, no Angular bindings
        requestAnimationFrame(animate);
      };
      animate();
    });

    // When you DO need Angular to know about a change:
    this.ngZone.run(() => {
      this.someAngularProperty = 'updated';
      // Now CD will pick this up
    });
  }
}
```

---
