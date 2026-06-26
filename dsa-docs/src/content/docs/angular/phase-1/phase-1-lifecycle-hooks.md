---
title: "8. Lifecycle Hooks"
description: "ngOnInit, ngOnChanges, ngOnDestroy, ngAfterViewInit — in order, with when each fires."
sidebar:
  order: 9
---

## 8. Lifecycle Hooks

### Simple Words First 🟡
A component is like a **plant**. It's born (created), it grows (renders), its leaves change (inputs update), and eventually it's removed. Angular gives you hooks — built-in methods you can add to your component — that run automatically at each stage of its life.

### Lifecycle Hooks Timeline

```mermaid
flowchart TB
    Start["Component Created\nConstructor runs"] --> Changes1["ngOnChanges\n@Input properties set"]
    Changes1 --> Init["ngOnInit\nComponent initialized\nLoad data here"]
    Init --> ViewInit["ngAfterViewInit\nView & children rendered\nAccess @ViewChild here"]
    ViewInit --> Active["Component Active\nWaiting for changes"]

    Active -->|"Input changes"| Changes2["ngOnChanges fires again"]
    Changes2 --> Check["Change Detection runs"]
    Check --> ViewCheck["ngAfterViewChecked\nView checked for updates"]
    ViewCheck --> Active

    Active -->|"Component removed"| Destroy["ngOnDestroy\nCleanup: unsubscribe,\nclear intervals,\nremove listeners"]

    style Start fill:#7c3aed,color:#fff
    style Changes1 fill:#4f46e5,color:#fff
    style Init fill:#059669,color:#fff
    style ViewInit fill:#10b981,color:#fff
    style Active fill:#d97706,color:#fff
    style Changes2 fill:#4f46e5,color:#fff
    style Check fill:#f59e0b,color:#fff
    style ViewCheck fill:#6366f1,color:#fff
    style Destroy fill:#dc2626,color:#fff
```

### The 8 Hooks in Order

```typescript
@Component({ ... })
export class LifecycleDemoComponent implements
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() userName: string = '';

  // 1️⃣ Constructor (not a hook, but runs first)
  constructor() {
    console.log('0️⃣ Constructor — component is being created');
    // Can't access @Input() values here yet!
  }

  // 2️⃣ ngOnChanges — Called when @Input properties change
  ngOnChanges(changes: SimpleChanges): void {
    console.log('1️⃣ ngOnChanges — Input changed:', changes);
    // Runs BEFORE ngOnInit on the first change
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      console.log(`${propName}: ${change.previousValue} → ${change.currentValue}`);
    }
  }

  // 3️⃣ ngOnInit — Component is fully initialized
  ngOnInit(): void {
    console.log('2️⃣ ngOnInit — Component ready! Load data here');
    // ✅ This is where you fetch data, set up forms, etc.
    // @Input() values are available now
    this.loadUserData();
  }

  // 4️⃣ ngDoCheck — Called on EVERY change detection cycle
  ngDoCheck(): void {
    console.log('3️⃣ ngDoCheck — Change detection running');
    // ⚠️ Expensive! Use only for custom change detection
  }

  // 5️⃣ ngAfterContentInit — Projected content (ng-content) is ready
  ngAfterContentInit(): void {
    console.log('4️⃣ ngAfterContentInit — Projected content ready');
  }

  // 6️⃣ ngAfterContentChecked — Projected content checked
  ngAfterContentChecked(): void {
    console.log('5️⃣ ngAfterContentChecked — Projected content checked');
  }

  // 7️⃣ ngAfterViewInit — Component's view + children are rendered
  ngAfterViewInit(): void {
    console.log('6️⃣ ngAfterViewInit — View fully rendered');
    // ✅ Access @ViewChild here!
  }

  // 8️⃣ ngAfterViewChecked — View checked for changes
  ngAfterViewChecked(): void {
    console.log('7️⃣ ngAfterViewChecked — View checked');
  }

  // 9️⃣ ngOnDestroy — Component is about to be removed
  ngOnDestroy(): void {
    console.log('8️⃣ ngOnDestroy — Cleanup time!');
    // ✅ Unsubscribe, clear timers, remove event listeners
    this.subscription?.unsubscribe();
    clearInterval(this.timerId);
  }

  private loadUserData(): void { /* ... */ }
}
```

### When Each Hook Fires — Simple Reference

| Hook | Fires | Perfect For |
|---|---|---|
| `ngOnChanges` | When `@Input` values change (first time before ngOnInit) | Reacting to input changes |
| `ngOnInit` | Once, after first ngOnChanges | Fetching data, initial setup |
| `ngDoCheck` | Every change detection cycle | Custom change tracking (rare!) |
| `ngAfterContentInit` | Once, when projected content is ready | Working with `ng-content` |
| `ngAfterContentChecked` | After every projected content check | — |
| `ngAfterViewInit` | Once, when view + children are rendered | Accessing `@ViewChild` |
| `ngAfterViewChecked` | After every view check | — |
| `ngOnDestroy` | Just before component is removed | Cleanup (unsubscribe, clear timers) |

### Practical Examples

**ngOnInit — Load data:**

```typescript
@Component({ ... })
export class UserProfileComponent implements OnInit {
  @Input() userId!: string;
  userData: User | null = null;

  ngOnInit(): void {
    // Input is ready! Fetch data now.
    this.userService.getUser(this.userId).subscribe(data => {
      this.userData = data;
    });
  }
}
```

**ngOnChanges — React to input changes:**

```typescript
@Component({ ... })
export class ProductDisplayComponent implements OnChanges {
  @Input() productId!: string;
  @Input() currency: string = 'USD';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      // Product ID changed — reload product
      this.loadProduct(this.productId);
    }
    if (changes['currency']) {
      // Currency changed — update prices without reloading
      this.updatePrices(this.currency);
    }
  }
}
```

**ngOnDestroy — Cleanup properly:**

```typescript
@Component({ ... })
export class LiveTrackerComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const sub = this.socket.onMessage().subscribe(msg => {
      this.messages.push(msg);
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    // Unsubscribe ALL to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    console.log('Tracker destroyed — cleaned up!');
  }
}
```

### 🚨 Common Gotchas

```typescript
// ❌ Accessing @ViewChild in ngOnInit
@Component({ ... })
export class BadComponent implements OnInit {
  @ViewChild('myInput') myInput!: ElementRef;

  ngOnInit(): void {
    this.myInput.nativeElement.focus(); // ❌ undefined!
  }
}

// ✅ Use ngAfterViewInit instead
export class GoodComponent implements AfterViewInit {
  @ViewChild('myInput') myInput!: ElementRef;

  ngAfterViewInit(): void {
    this.myInput.nativeElement.focus(); // ✅ Works!
  }
}
```

### In Simple Words 🧠

- Hooks run in a fixed order: constructor → ngOnChanges → ngOnInit → ngAfterViewInit → ngOnDestroy
- Use `ngOnInit` to **load data** and set up the component
- Use `ngOnDestroy` to **clean up** — unsubscribe, clear timers, prevent memory leaks
- Access `@ViewChild` in `ngAfterViewInit`, NOT in `ngOnInit`
- `ngDoCheck` runs on **every change detection cycle** — use it sparingly, it's expensive
- Not every hook needs to be implemented — use only what you need
