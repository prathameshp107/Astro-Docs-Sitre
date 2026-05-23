# Angular Phase 2: Components, Routing & Forms
### A Complete Guide — Beginner to Advanced

> **Author:** Senior Angular Architect | 15+ Years Enterprise Experience
> **Target:** Developers who know Angular basics and want to go deep
> **Version:** Angular 17+ (Standalone + Module-based covered)

---

## Table of Contents

1. [Components Deep Dive](#1-components-deep-dive)
2. [Dependency Injection](#2-dependency-injection)
3. [Routing](#3-routing)
4. [Angular Forms](#4-angular-forms)
5. [Mini Project: Student Management System](#5-mini-project-student-management-system)
6. [Interview Questions & Answers](#6-interview-questions--answers)

---

# 1. Components Deep Dive

## What is a Component?

Think of a component like a **LEGO brick**. Each brick has:
- Its own shape (template / HTML)
- Its own color (styles / CSS)
- Its own behavior (TypeScript class)

You snap bricks together to build a full application.

```
┌──────────────────────────────────────────────────────┐
│                   Angular Component                  │
│  ┌──────────────┐  ┌────────────┐  ┌─────────────┐  │
│  │   Template   │  │   Class    │  │   Styles    │  │
│  │  (HTML view) │  │(TypeScript)│  │  (CSS/SCSS) │  │
│  └──────────────┘  └────────────┘  └─────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 1.1 Component Lifecycle

### What is a Lifecycle?

Every component is **born**, **lives**, and **dies**. Angular gives you special methods called **lifecycle hooks** so you can run code at each stage.

Think of it like a human life:
- **Born** → Constructor
- **Grows up** → ngOnInit
- **Reacts to changes** → ngOnChanges, ngDoCheck
- **Has children** → ngAfterContentInit, ngAfterViewInit
- **Dies** → ngOnDestroy

---

### Lifecycle Flow Diagram

```svg
<svg viewBox="0 0 700 820" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="820" fill="#0f172a" rx="16"/>
  
  <!-- Title -->
  <text x="350" y="40" text-anchor="middle" fill="#38bdf8" font-size="20" font-weight="bold">Angular Component Lifecycle Flow</text>
  
  <!-- Constructor -->
  <rect x="220" y="65" width="260" height="56" rx="10" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
  <text x="350" y="88" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">constructor()</text>
  <text x="350" y="108" text-anchor="middle" fill="#94a3b8" font-size="11">Class instantiated. Inject services here.</text>
  
  <!-- Arrow 1 -->
  <line x1="350" y1="121" x2="350" y2="148" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- ngOnChanges -->
  <rect x="220" y="148" width="260" height="56" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="350" y="171" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold">ngOnChanges()</text>
  <text x="350" y="191" text-anchor="middle" fill="#94a3b8" font-size="11">Runs when @Input() values change.</text>
  
  <!-- Arrow 2 -->
  <line x1="350" y1="204" x2="350" y2="231" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngOnInit -->
  <rect x="220" y="231" width="260" height="56" rx="10" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
  <text x="350" y="254" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">ngOnInit()</text>
  <text x="350" y="274" text-anchor="middle" fill="#94a3b8" font-size="11">Component ready. Fetch data here. (Once)</text>
  
  <!-- Arrow 3 -->
  <line x1="350" y1="287" x2="350" y2="314" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngDoCheck -->
  <rect x="220" y="314" width="260" height="56" rx="10" fill="#3a1a1a" stroke="#f87171" stroke-width="2"/>
  <text x="350" y="337" text-anchor="middle" fill="#f87171" font-size="14" font-weight="bold">ngDoCheck()</text>
  <text x="350" y="357" text-anchor="middle" fill="#94a3b8" font-size="11">Custom change detection. Use carefully!</text>
  
  <!-- Arrow 4 -->
  <line x1="350" y1="370" x2="350" y2="397" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngAfterContentInit -->
  <rect x="180" y="397" width="340" height="56" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="350" y="420" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="bold">ngAfterContentInit()</text>
  <text x="350" y="440" text-anchor="middle" fill="#94a3b8" font-size="11">ng-content projected. ContentChild ready.</text>
  
  <!-- Arrow 5 -->
  <line x1="350" y1="453" x2="350" y2="480" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngAfterContentChecked -->
  <rect x="180" y="480" width="340" height="56" rx="10" fill="#2a1a3a" stroke="#a78bfa" stroke-width="2"/>
  <text x="350" y="503" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold">ngAfterContentChecked()</text>
  <text x="350" y="523" text-anchor="middle" fill="#94a3b8" font-size="11">Every check after content projection.</text>
  
  <!-- Arrow 6 -->
  <line x1="350" y1="536" x2="350" y2="563" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngAfterViewInit -->
  <rect x="180" y="563" width="340" height="56" rx="10" fill="#1a2a3a" stroke="#fb923c" stroke-width="2"/>
  <text x="350" y="586" text-anchor="middle" fill="#fb923c" font-size="14" font-weight="bold">ngAfterViewInit()</text>
  <text x="350" y="606" text-anchor="middle" fill="#94a3b8" font-size="11">View + child views ready. ViewChild available.</text>
  
  <!-- Arrow 7 -->
  <line x1="350" y1="619" x2="350" y2="646" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngAfterViewChecked -->
  <rect x="180" y="646" width="340" height="56" rx="10" fill="#1a2a3a" stroke="#fdba74" stroke-width="2"/>
  <text x="350" y="669" text-anchor="middle" fill="#fdba74" font-size="14" font-weight="bold">ngAfterViewChecked()</text>
  <text x="350" y="689" text-anchor="middle" fill="#94a3b8" font-size="11">After every view + child view check.</text>
  
  <!-- Arrow 8 -->
  <line x1="350" y1="702" x2="350" y2="729" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- ngOnDestroy -->
  <rect x="220" y="729" width="260" height="56" rx="10" fill="#3a1a1a" stroke="#ef4444" stroke-width="2"/>
  <text x="350" y="752" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="bold">ngOnDestroy()</text>
  <text x="350" y="772" text-anchor="middle" fill="#94a3b8" font-size="11">Cleanup! Unsubscribe, clear timers.</text>
  
  <!-- Loop arrow for ngOnChanges -->
  <path d="M 480 168 Q 560 168 560 260 Q 560 320 480 320" stroke="#34d399" stroke-width="1.5" fill="none" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
  <text x="570" y="248" fill="#34d399" font-size="10">On every</text>
  <text x="570" y="260" fill="#34d399" font-size="10">@Input</text>
  <text x="570" y="272" fill="#34d399" font-size="10">change</text>
</svg>
```

---

### Each Hook Explained with Code

#### `constructor()` — The Birth

```typescript
@Component({
  selector: 'app-user',
  template: `<p>{{ username }}</p>`
})
export class UserComponent {
  username: string;

  constructor(private userService: UserService) {
    // ✅ Good: Inject services
    // ✅ Good: Initialize simple variables
    // ❌ Bad: Don't call this.userService.getData() here!
    // ❌ Bad: Don't access @Input() values here — they aren't set yet!
    this.username = 'Loading...';
  }
}
```

**Why not fetch data in constructor?**
- The component's template is NOT rendered yet
- `@Input()` values from parent have NOT arrived yet
- If the constructor throws an error, Angular can't display helpful messages

---

#### `ngOnChanges()` — React to Parent's Changes

This hook fires **every time** a parent passes a new value via `@Input()`.

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-price-display',
  template: `<h2>Price: {{ formattedPrice }}</h2>`
})
export class PriceDisplayComponent implements OnChanges {
  
  @Input() price: number = 0;          // Parent sends this
  @Input() currency: string = 'USD';   // Parent sends this too
  
  formattedPrice: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // 'changes' is an object that tells you WHAT changed and HOW

    // Check if 'price' specifically changed
    if (changes['price']) {
      const oldValue = changes['price'].previousValue;  // What it was
      const newValue = changes['price'].currentValue;   // What it is now
      const isFirst  = changes['price'].firstChange;    // True on first load

      console.log(`Price changed from ${oldValue} to ${newValue}`);
    }

    // Recalculate whenever either input changes
    this.formattedPrice = `${this.currency} ${this.price.toFixed(2)}`;
  }
}
```

**Real-world use:** A product price card that updates whenever the parent selects a different item.

---

#### `ngOnInit()` — The Worker

The most commonly used hook. Runs ONCE after the component is created and inputs are received.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngFor="let item of data">{{ item.name }}</div>
  `
})
export class DashboardComponent implements OnInit {
  
  data: any[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}
  //           ^ Inject the service (but DON'T call it yet)

  ngOnInit(): void {
    // ✅ NOW it's safe to call services
    // ✅ @Input() values are ready
    // ✅ This is THE right place to fetch data
    this.apiService.getDashboardData().subscribe(result => {
      this.data = result;
      this.loading = false;
    });
  }
}
```

---

#### `ngOnDestroy()` — The Cleanup Crew

Runs just before Angular destroys your component. If you don't clean up, you get **memory leaks**.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-live-clock',
  template: `<p>{{ currentTime }}</p>`
})
export class LiveClockComponent implements OnInit, OnDestroy {
  
  currentTime: string = '';
  private clockSubscription!: Subscription;  // Store reference!

  ngOnInit(): void {
    // Start a timer that ticks every second
    this.clockSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
    });
  }

  ngOnDestroy(): void {
    // ✅ ALWAYS unsubscribe to prevent memory leaks
    // If you skip this, the timer keeps running even after component is gone!
    this.clockSubscription.unsubscribe();
    
    console.log('Clock component destroyed, timer stopped!');
  }
}
```

**What happens if you forget `ngOnDestroy`?**
- The timer/subscription keeps running
- It tries to update a component that no longer exists
- Over time: memory leak, sluggish app, crashes

---

## 1.2 Component Communication

Components need to talk to each other. Angular has 4 main ways:

```
Parent ──(@Input)──▶ Child    (data flows down)
Child  ──(@Output)─▶ Parent   (events flow up)
Any    ──(Service)─▶ Any      (shared state)
Parent ──(ViewChild)▶ Child   (direct access)
```

---

### `@Input()` Decorator — Parent to Child

**Scenario:** You have a `ProductCardComponent`. The parent `ProductListComponent` passes product details to it.

```typescript
// product-card.component.ts
import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <img [src]="product.imageUrl" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      
      <!-- Use the optional alias: parent uses [displayMode] -->
      <span class="badge">{{ mode }}</span>
    </div>
  `
})
export class ProductCardComponent {

  // Basic @Input — parent passes the product object
  @Input() product!: Product;

  // @Input with alias — outside world uses 'displayMode', inside we use 'mode'
  @Input('displayMode') mode: string = 'grid';

  // @Input with transform (Angular 16+) — auto-convert string "true" to boolean true
  @Input({ transform: booleanAttribute }) showDiscount: boolean = false;
}
```

**Parent template using the child:**

```html
<!-- product-list.component.html -->
<div class="product-grid">
  
  <!-- Loop through products and pass each one to the card -->
  <app-product-card
    *ngFor="let p of products"
    [product]="p"
    [displayMode]="'list'"
    [showDiscount]="true">
  </app-product-card>
  
</div>
```

**Key rules for @Input:**
- `[squareBrackets]` = property binding (passes a value)
- `"quotedString"` = passes a hardcoded string
- Always define an interface for complex objects (not `any`)

---

### `@Output()` + `EventEmitter` — Child to Parent

**Scenario:** User clicks "Add to Cart" inside the product card. The parent needs to know.

```typescript
// product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      
      <!-- When button is clicked, call our method -->
      <button (click)="onAddToCart()">Add to Cart</button>
      <button (click)="onWishlist()">♡ Save</button>
    </div>
  `
})
export class ProductCardComponent {

  @Input() product!: Product;

  // Declare an output event — parent will listen to this
  @Output() addToCart = new EventEmitter<Product>();

  // You can emit any type — here we emit an object with product + quantity
  @Output() addToWishlist = new EventEmitter<{ product: Product; date: Date }>();

  onAddToCart(): void {
    // Emit the event — the parent will receive 'product' as the event data
    this.addToCart.emit(this.product);
  }

  onWishlist(): void {
    this.addToWishlist.emit({
      product: this.product,
      date: new Date()
    });
  }
}
```

**Parent listens to child events:**

```typescript
// product-list.component.ts
@Component({
  template: `
    <div class="cart-count">Cart: {{ cartCount }}</div>
    
    <app-product-card
      *ngFor="let p of products"
      [product]="p"
      (addToCart)="handleAddToCart($event)"
      (addToWishlist)="handleWishlist($event)">
    </app-product-card>
  `
})
export class ProductListComponent {
  
  products: Product[] = [...];
  cartCount = 0;

  // $event is what the child emitted — in this case, a Product object
  handleAddToCart(product: Product): void {
    this.cartCount++;
    this.cartService.add(product);
    this.showSuccessToast(`${product.name} added to cart!`);
  }

  handleWishlist(data: { product: Product; date: Date }): void {
    console.log('Saved at:', data.date);
    this.wishlistService.save(data.product);
  }
}
```

---

### `@ViewChild` — Parent Accesses Child Directly

Sometimes you need to call a method on a child component or access an HTML element directly.

```typescript
// expandable-panel.component.ts
@Component({
  selector: 'app-panel',
  template: `
    <div [class.expanded]="isOpen">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelComponent {
  isOpen = false;
  
  open()  { this.isOpen = true;  }
  close() { this.isOpen = false; }
  toggle(){ this.isOpen = !this.isOpen; }
}
```

```typescript
// parent.component.ts
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  template: `
    <button (click)="openPanel()">Open Settings</button>
    <button (click)="focusSearch()">Focus Search</button>
    
    <!-- Reference the component with #myPanel -->
    <app-panel #myPanel>
      <h3>Settings</h3>
    </app-panel>
    
    <!-- Reference a plain HTML element with #searchBox -->
    <input #searchBox type="text" placeholder="Search...">
  `
})
export class ParentComponent implements AfterViewInit {

  // @ViewChild grabs the component instance
  @ViewChild('myPanel') panel!: PanelComponent;

  // @ViewChild grabs the native HTML element
  @ViewChild('searchBox') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    // ⚠️ ViewChild is only available AFTER ngAfterViewInit
    // Don't use it in ngOnInit — it's null there!
    console.log('Panel component:', this.panel);
    console.log('Input element:', this.searchInput.nativeElement);
  }

  openPanel(): void {
    this.panel.open();  // Call child method directly!
  }

  focusSearch(): void {
    this.searchInput.nativeElement.focus();  // Focus the HTML element
  }
}
```

---

### `@ContentChild` — Access Projected Content

`@ContentChild` is like `@ViewChild` but for content passed via `<ng-content>`.

```typescript
// card-container.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-title]"></ng-content>  <!-- Named slot -->
      </div>
      <div class="card-body">
        <ng-content></ng-content>  <!-- Default slot -->
      </div>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  
  // Access the projected content that has the directive/selector
  @ContentChild('cardTitle') titleRef!: ElementRef;
  @ContentChild(HeaderComponent) header!: HeaderComponent;

  ngAfterContentInit(): void {
    // Content is now projected and ready
    console.log('Title text:', this.titleRef?.nativeElement.textContent);
  }
}

// Usage in parent:
// <app-card>
//   <h2 card-title #cardTitle>My Title</h2>
//   <p>Card body content goes here</p>
// </app-card>
```

---

### Dynamic Components

You can create components programmatically at runtime — useful for modals, tooltips, alerts.

```typescript
// modal.service.ts
import { Injectable, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  openModal(component: Type<any>, data?: any): ComponentRef<any> {
    // 1. Create the component dynamically
    const componentRef = createComponent(component, {
      environmentInjector: this.injector
    });

    // 2. Pass data to the component
    if (data) {
      Object.assign(componentRef.instance, data);
    }

    // 3. Attach to Angular's change detection
    this.appRef.attachView(componentRef.hostView);

    // 4. Add to the DOM
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
    document.body.appendChild(domElement);

    return componentRef;
  }

  closeModal(componentRef: ComponentRef<any>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

// Usage:
// this.modalService.openModal(ConfirmDialogComponent, { message: 'Are you sure?' });
```

---

# 2. Dependency Injection

## What Problem Does DI Solve?

**Without DI** (bad way):

```typescript
// Every component creates its own service — wasteful and untestable!
export class ProductComponent {
  private productService: ProductService;
  
  constructor() {
    // 🔴 Problem 1: Hard to test (can't mock this)
    // 🔴 Problem 2: Multiple instances waste memory
    // 🔴 Problem 3: Tightly coupled — ProductService changes break this
    this.productService = new ProductService(
      new HttpClient(new HttpXhrBackend()),  // Need dependencies of dependencies!
      new LogService(),
      new CacheService()
    );
  }
}
```

**With DI** (Angular's way):

```typescript
export class ProductComponent {
  // Angular creates and provides the service — we just declare what we need!
  constructor(private productService: ProductService) {}
  //           ^ Angular resolves and injects this automatically
}
```

---

## DI Architecture Diagram

```svg
<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="520" fill="#0f172a" rx="16"/>
  
  <!-- Title -->
  <text x="350" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="bold">Angular Dependency Injection Architecture</text>
  
  <!-- Application Level -->
  <rect x="50" y="60" width="600" height="80" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="350" y="92" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">Application (Root)</text>
  <text x="350" y="112" text-anchor="middle" fill="#94a3b8" font-size="11">bootstrapApplication(AppComponent) | AppModule</text>
  <text x="350" y="128" text-anchor="middle" fill="#64748b" font-size="10">Root Injector lives here — singletons available everywhere</text>
  
  <!-- Arrow down -->
  <line x1="350" y1="140" x2="350" y2="165" stroke="#64748b" stroke-width="2" marker-end="url(#a2)"/>
  <defs>
    <marker id="a2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- Root Injector -->
  <rect x="150" y="165" width="400" height="70" rx="12" fill="#1a2a3a" stroke="#f59e0b" stroke-width="2"/>
  <text x="350" y="193" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="bold">Root Injector (Token Registry)</text>
  <text x="350" y="213" text-anchor="middle" fill="#94a3b8" font-size="11">Maintains a map: Token → Instance</text>
  <text x="350" y="226" text-anchor="middle" fill="#64748b" font-size="10">UserService → {instance}, ProductService → {instance}...</text>
  
  <!-- Arrow to Service -->
  <line x1="350" y1="235" x2="350" y2="260" stroke="#64748b" stroke-width="2" marker-end="url(#a2)"/>
  
  <!-- Services Level -->
  <rect x="50" y="260" width="185" height="70" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="143" y="288" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">UserService</text>
  <text x="143" y="306" text-anchor="middle" fill="#94a3b8" font-size="10">providedIn: 'root'</text>
  <text x="143" y="320" text-anchor="middle" fill="#64748b" font-size="10">Singleton — 1 instance</text>
  
  <rect x="257" y="260" width="185" height="70" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="350" y="288" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">ProductService</text>
  <text x="350" y="306" text-anchor="middle" fill="#94a3b8" font-size="10">providedIn: 'root'</text>
  <text x="350" y="320" text-anchor="middle" fill="#64748b" font-size="10">Singleton — 1 instance</text>
  
  <rect x="464" y="260" width="185" height="70" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="557" y="288" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="bold">HttpClient</text>
  <text x="557" y="306" text-anchor="middle" fill="#94a3b8" font-size="10">Angular built-in</text>
  <text x="557" y="320" text-anchor="middle" fill="#64748b" font-size="10">Injected into services</text>
  
  <!-- Arrow down to components -->
  <line x1="143" y1="330" x2="143" y2="370" stroke="#64748b" stroke-width="2" marker-end="url(#a2)"/>
  <line x1="350" y1="330" x2="350" y2="370" stroke="#64748b" stroke-width="2" marker-end="url(#a2)"/>
  <line x1="557" y1="330" x2="557" y2="370" stroke="#64748b" stroke-width="2" marker-end="url(#a2)"/>
  
  <!-- Components Level -->
  <rect x="50" y="370" width="185" height="65" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="143" y="396" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold">HeaderComponent</text>
  <text x="143" y="414" text-anchor="middle" fill="#94a3b8" font-size="10">constructor(private us: UserService)</text>
  <text x="143" y="428" text-anchor="middle" fill="#64748b" font-size="9">Gets SAME instance as Footer</text>
  
  <rect x="257" y="370" width="185" height="65" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="350" y="396" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold">ProductListComponent</text>
  <text x="350" y="414" text-anchor="middle" fill="#94a3b8" font-size="10">constructor(private ps: ProductService)</text>
  <text x="350" y="428" text-anchor="middle" fill="#64748b" font-size="9">Gets SAME ProductService instance</text>
  
  <rect x="464" y="370" width="185" height="65" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="557" y="396" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold">FooterComponent</text>
  <text x="557" y="414" text-anchor="middle" fill="#94a3b8" font-size="10">constructor(private us: UserService)</text>
  <text x="557" y="428" text-anchor="middle" fill="#64748b" font-size="9">Gets SAME instance as Header</text>
  
  <!-- Singleton arrow between header and footer -->
  <path d="M 143 460 Q 143 490 350 490 Q 557 490 557 460" stroke="#f59e0b" stroke-width="1.5" fill="none" stroke-dasharray="5,3"/>
  <text x="350" y="507" text-anchor="middle" fill="#f59e0b" font-size="11">Both components share the SAME UserService instance (Singleton)</text>
</svg>
```

---

## How Injectors Work Internally

Angular uses a **hierarchical injector tree** that mirrors your component tree.

```
Root Injector (app-level)
├── LazyModule Injector (lazy-loaded features)
│   └── Component Injector (if component has its own providers)
│       └── Child Component Injector
└── EagerModule Injector
```

**Token Resolution Algorithm:**
1. Look in the current component's injector
2. If not found, go to parent component's injector
3. Keep going up until Root Injector
4. If not found at root → throw error: `NullInjectorError`

---

## Providers — Registering Services

```typescript
// Method 1: The Modern Way (recommended)
@Injectable({
  providedIn: 'root'  // Available everywhere, tree-shakeable
})
export class GlobalUserService {}

// Method 2: Component-level (new instance per component)
@Component({
  selector: 'app-product',
  providers: [ProductService]  // Each ProductComponent gets its OWN instance
})
export class ProductComponent {}

// Method 3: Module-level
@NgModule({
  providers: [ProductService]  // All components in this module share one instance
})
export class ProductModule {}

// Method 4: Feature-level (Angular 14+)
@Injectable({
  providedIn: 'platform'  // Shared across multiple Angular apps on same page
})
export class SharedPlatformService {}
```

---

## Advanced DI Patterns

### Custom Tokens (for non-class values)

```typescript
import { InjectionToken } from '@angular/core';

// Define a token for a configuration object
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  apiUrl: string;
  maxRetries: number;
  theme: 'light' | 'dark';
}

// Register in providers
const appConfig: AppConfig = {
  apiUrl: 'https://api.myapp.com',
  maxRetries: 3,
  theme: 'dark'
};

// In app.module.ts or bootstrapApplication
providers: [
  { provide: APP_CONFIG, useValue: appConfig }
]

// Inject it
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    console.log('API URL:', this.config.apiUrl);
  }
}
```

### Provider Types

```typescript
// useClass — substitute one class for another (great for testing!)
{ provide: AuthService, useClass: MockAuthService }

// useValue — inject a plain value or object
{ provide: WINDOW, useValue: window }

// useFactory — compute the value at runtime
{
  provide: LogLevel,
  useFactory: () => environment.production ? 'error' : 'debug'
}

// useExisting — alias one token to another
{ provide: NewUserService, useExisting: LegacyUserService }
```

---

# 3. Routing

## What is Routing?

A web app has many "pages" (components). Routing is the system that decides **which component to show** based on the URL.

```
URL: /products        → Show ProductListComponent
URL: /products/42     → Show ProductDetailComponent (id=42)
URL: /admin/users     → Show UsersComponent (if user is admin)
URL: /login           → Show LoginComponent
```

---

## Routing Flow Diagram

```svg
<svg viewBox="0 0 720 580" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="720" height="580" fill="#0f172a" rx="16"/>
  <text x="360" y="36" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="bold">Angular Router Navigation Flow</text>
  
  <!-- User Action -->
  <rect x="260" y="56" width="200" height="52" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="360" y="78" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">User Action</text>
  <text x="360" y="97" text-anchor="middle" fill="#94a3b8" font-size="10">Click link / navigate() / URL change</text>
  
  <line x1="360" y1="108" x2="360" y2="133" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  <defs>
    <marker id="ra" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- Router parses URL -->
  <rect x="200" y="133" width="320" height="52" rx="10" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
  <text x="360" y="155" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">Router Parses URL</text>
  <text x="360" y="173" text-anchor="middle" fill="#94a3b8" font-size="10">Matches URL against route configuration array</text>
  
  <line x1="360" y1="185" x2="360" y2="210" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Run Guards -->
  <rect x="200" y="210" width="320" height="52" rx="10" fill="#3a2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="360" y="232" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="bold">Run Guards</text>
  <text x="360" y="250" text-anchor="middle" fill="#94a3b8" font-size="10">CanActivate, CanDeactivate, CanMatch</text>
  
  <!-- Guard decision branches -->
  <line x1="360" y1="262" x2="360" y2="285" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Decision Diamond -->
  <polygon points="360,285 430,320 360,355 290,320" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="360" y="316" text-anchor="middle" fill="#94a3b8" font-size="12">Guard</text>
  <text x="360" y="332" text-anchor="middle" fill="#94a3b8" font-size="12">passes?</text>
  
  <!-- Yes path -->
  <line x1="430" y1="320" x2="530" y2="320" stroke="#34d399" stroke-width="2" marker-end="url(#ra)"/>
  <text x="480" y="313" text-anchor="middle" fill="#34d399" font-size="11">YES</text>
  
  <!-- No path -->
  <line x1="290" y1="320" x2="140" y2="320" stroke="#ef4444" stroke-width="2"/>
  <line x1="140" y1="320" x2="140" y2="480" stroke="#ef4444" stroke-width="2"/>
  <line x1="140" y1="480" x2="200" y2="480" stroke="#ef4444" stroke-width="2" marker-end="url(#ra)"/>
  <text x="215" y="313" text-anchor="middle" fill="#ef4444" font-size="11">NO</text>
  
  <!-- Redirect box -->
  <rect x="200" y="456" width="200" height="48" rx="10" fill="#3a1a1a" stroke="#ef4444" stroke-width="2"/>
  <text x="300" y="476" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">Redirect to /login</text>
  <text x="300" y="494" text-anchor="middle" fill="#94a3b8" font-size="10">or show 403 page</text>
  
  <!-- Run Resolver -->
  <rect x="530" y="295" width="150" height="52" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="605" y="317" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">Run Resolver</text>
  <text x="605" y="335" text-anchor="middle" fill="#94a3b8" font-size="10">Pre-fetch data</text>
  
  <line x1="605" y1="347" x2="605" y2="372" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Activate Component -->
  <rect x="460" y="372" width="290" height="52" rx="10" fill="#1a2a3a" stroke="#fb923c" stroke-width="2"/>
  <text x="605" y="394" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="bold">Activate Component</text>
  <text x="605" y="412" text-anchor="middle" fill="#94a3b8" font-size="10">Render in &lt;router-outlet&gt;, update URL</text>
  
  <line x1="605" y1="424" x2="605" y2="449" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Update view -->
  <rect x="460" y="449" width="290" height="52" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="605" y="471" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">View Updated</text>
  <text x="605" y="489" text-anchor="middle" fill="#94a3b8" font-size="10">User sees new page component</text>
  
  <!-- Title -->
  <text x="360" y="555" text-anchor="middle" fill="#475569" font-size="10">Navigation events fire throughout: NavigationStart → RoutesRecognized → GuardsCheckStart → ... → NavigationEnd</text>
</svg>
```

---

## Setting Up Routes

```typescript
// app.routes.ts (Angular 17+ standalone approach)
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Basic route
  { path: '', component: HomeComponent },

  // Route with URL parameter (:id is a variable)
  { path: 'products/:id', component: ProductDetailComponent },

  // Nested (child) routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserDetailComponent }
    ]
  },

  // Lazy loaded module (only loads JavaScript when user navigates here)
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(r => r.shopRoutes)
  },

  // Route with guard
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard]
  },

  // Wildcard — catches any unmatched URL
  { path: '**', component: PageNotFoundComponent }
];
```

```typescript
// main.ts — bootstrap with routes
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```

---

## `router-outlet` — The Display Window

Think of `<router-outlet>` as a **screen** where Angular projects the active component.

```html
<!-- app.component.html -->
<nav>
  <!-- routerLink is like href but handled by Angular (no page reload) -->
  <a routerLink="/">Home</a>
  <a routerLink="/products">Products</a>
  <a routerLink="/admin">Admin</a>
  
  <!-- routerLinkActive adds a class when this route is active -->
  <a routerLink="/profile" routerLinkActive="active-link">Profile</a>
</nav>

<!-- The matched component renders here -->
<router-outlet></router-outlet>

<footer>© 2024 MyApp</footer>
```

---

## Reading Route Parameters

```typescript
// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <h1>Product #{{ productId }}</h1>
    <p>Category: {{ category }}</p>
    <button (click)="goBack()">Go Back</button>
  `
})
export class ProductDetailComponent implements OnInit {

  productId: string = '';
  category: string = '';

  constructor(
    private route: ActivatedRoute,  // Current route info
    private router: Router          // For programmatic navigation
  ) {}

  ngOnInit(): void {
    // Method 1: Snapshot (one-time read, doesn't update if URL changes)
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';

    // Method 2: Observable (reacts to URL changes, e.g., prev/next navigation)
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') ?? '';
      this.loadProduct(this.productId);
    });

    // Read query parameters: /products/42?category=electronics&sort=price
    this.route.queryParamMap.subscribe(queryParams => {
      this.category = queryParams.get('category') ?? 'all';
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
    // Or with parameters:
    // this.router.navigate(['/products'], { queryParams: { page: 1 } });
  }

  private loadProduct(id: string): void {
    this.productService.getProduct(id).subscribe(/* ... */);
  }
}
```

---

## Route Guards

Guards are functions that decide if navigation should proceed.

### CanActivate — Protect Routes

```typescript
// auth.guard.ts (Functional guard — Angular 15+)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Proceed with navigation
  }

  // Save the URL they were trying to reach
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  
  return false;  // Block navigation
};

// Role-based guard
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  
  if (authService.hasRole('admin')) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/unauthorized']);
};
```

### CanDeactivate — Prevent Leaving with Unsaved Changes

```typescript
// unsaved-changes.guard.ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};

// In the component:
export class EditProductComponent implements CanComponentDeactivate {
  isDirty = false;  // Track if form has unsaved changes
  
  canDeactivate(): boolean {
    if (this.isDirty) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}
```

### Resolve — Pre-fetch Data

```typescript
// product.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<Product> = (route) => {
  const productId = route.paramMap.get('id')!;
  return inject(ProductService).getProduct(productId);
  // Angular waits for this Observable to complete before activating the route
};

// Route config:
{
  path: 'products/:id',
  component: ProductDetailComponent,
  resolve: { product: productResolver }
}

// Component reads resolved data:
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const product = this.route.snapshot.data['product'];
    // Data is already loaded! No loading spinner needed.
  }
}
```

---

## Lazy Loading

Without lazy loading, Angular loads ALL your code upfront — even pages the user may never visit.

With lazy loading, each feature loads its code only when needed.

```typescript
// app.routes.ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes)
  // ↑ This import() creates a separate JavaScript bundle
  // The browser only downloads admin code when user goes to /admin
}

// Even single components can be lazy loaded (Angular 14+):
{
  path: 'about',
  loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
}
```

---

# 4. Angular Forms

## Two Approaches to Forms

| Feature | Template-Driven | Reactive |
|---|---|---|
| **Setup** | Easy, less code | More code upfront |
| **Logic location** | In HTML template | In TypeScript class |
| **Testing** | Harder (needs DOM) | Easy (pure TypeScript) |
| **Dynamic fields** | Tricky | Very easy |
| **Complex validation** | Gets messy | Clean and composable |
| **Use when** | Simple forms | Complex/dynamic forms |

---

## Forms Architecture Diagram

```svg
<svg viewBox="0 0 720 560" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="720" height="560" fill="#0f172a" rx="16"/>
  <text x="360" y="36" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="bold">Angular Forms Architecture</text>
  
  <!-- Divider -->
  <line x1="360" y1="55" x2="360" y2="540" stroke="#334155" stroke-width="1" stroke-dasharray="6,4"/>
  
  <!-- Template Driven - Left -->
  <text x="180" y="70" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold">Template-Driven Forms</text>
  
  <!-- HTML Template box -->
  <rect x="30" y="85" width="300" height="65" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="180" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">HTML Template</text>
  <text x="180" y="124" text-anchor="middle" fill="#94a3b8" font-size="10">ngModel directive binds input</text>
  <text x="180" y="140" text-anchor="middle" fill="#64748b" font-size="10">#form="ngForm" → template ref</text>
  
  <line x1="180" y1="150" x2="180" y2="175" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  <defs>
    <marker id="fa" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- NgForm box -->
  <rect x="60" y="175" width="240" height="55" rx="10" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
  <text x="180" y="198" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">NgForm (auto-created)</text>
  <text x="180" y="215" text-anchor="middle" fill="#64748b" font-size="10">Angular creates form model for you</text>
  <text x="180" y="228" text-anchor="middle" fill="#64748b" font-size="9">Implicit — you don't write it</text>
  
  <line x1="180" y1="230" x2="180" y2="255" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- NgModel boxes -->
  <rect x="30" y="255" width="140" height="48" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="100" y="274" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">NgModel</text>
  <text x="100" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">username field</text>
  
  <rect x="190" y="255" width="140" height="48" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="260" y="274" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">NgModel</text>
  <text x="260" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">password field</text>
  
  <!-- Validation state -->
  <rect x="40" y="335" width="280" height="70" rx="10" fill="#3a2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="180" y="357" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Validation State (auto-managed)</text>
  <text x="180" y="374" text-anchor="middle" fill="#94a3b8" font-size="10">valid / invalid / pristine / dirty</text>
  <text x="180" y="390" text-anchor="middle" fill="#94a3b8" font-size="10">touched / untouched / pending</text>
  
  <!-- Reactive Forms - Right -->
  <text x="540" y="70" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="bold">Reactive Forms</text>
  
  <!-- TypeScript Class box -->
  <rect x="390" y="85" width="300" height="65" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="540" y="107" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">TypeScript Class</text>
  <text x="540" y="124" text-anchor="middle" fill="#94a3b8" font-size="10">FormGroup / FormBuilder defined in code</text>
  <text x="540" y="140" text-anchor="middle" fill="#64748b" font-size="10">Full control over form structure</text>
  
  <line x1="540" y1="150" x2="540" y2="175" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- FormGroup box -->
  <rect x="420" y="175" width="240" height="55" rx="10" fill="#1a2a3a" stroke="#fb923c" stroke-width="2"/>
  <text x="540" y="198" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">FormGroup</text>
  <text x="540" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Container for all form controls</text>
  <text x="540" y="228" text-anchor="middle" fill="#64748b" font-size="9">Explicit — you create it in TypeScript</text>
  
  <line x1="540" y1="230" x2="540" y2="255" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- FormControl boxes -->
  <rect x="390" y="255" width="140" height="48" rx="8" fill="#2a1a3a" stroke="#c084fc" stroke-width="1.5"/>
  <text x="460" y="274" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="bold">FormControl</text>
  <text x="460" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">username</text>
  
  <rect x="550" y="255" width="140" height="48" rx="8" fill="#2a1a3a" stroke="#c084fc" stroke-width="1.5"/>
  <text x="620" y="274" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="bold">FormControl</text>
  <text x="620" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">password</text>
  
  <!-- Validators -->
  <rect x="400" y="335" width="280" height="70" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="540" y="357" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Validators (composable)</text>
  <text x="540" y="374" text-anchor="middle" fill="#94a3b8" font-size="10">Validators.required, minLength, pattern</text>
  <text x="540" y="390" text-anchor="middle" fill="#94a3b8" font-size="10">Custom validators | Cross-field validators</text>
  
  <!-- Common to both -->
  <rect x="160" y="435" width="400" height="60" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="360" y="457" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Common to Both Forms</text>
  <text x="360" y="474" text-anchor="middle" fill="#64748b" font-size="10">CSS classes: .ng-valid, .ng-invalid, .ng-pristine, .ng-dirty, .ng-touched</text>
  <text x="360" y="490" text-anchor="middle" fill="#64748b" font-size="10">State tracking | Error display | Submit handling</text>
</svg>
```

---

## 4.1 Template-Driven Forms

Good for simple login, contact, and search forms.

```typescript
// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // ← Required for ngModel
  template: `
    <!-- 
      #loginForm="ngForm" → Creates a template reference to the NgForm directive
      (ngSubmit) → Fires when form is submitted (prevents default HTML submit)
    -->
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"                   <!-- ← name attribute is REQUIRED for ngModel -->
          [(ngModel)]="formData.email"   <!-- ← Two-way binding: update variable + view -->
          required                       <!-- ← HTML5 validation attribute -->
          email                          <!-- ← Angular email validator directive -->
          #emailField="ngModel"          <!-- ← Template reference to this control's NgModel -->
          class="form-control"
          [class.is-invalid]="emailField.invalid && emailField.touched"
        >

        <!-- Show error only after user has touched the field -->
        <div *ngIf="emailField.invalid && emailField.touched" class="error-msg">
          <span *ngIf="emailField.errors?.['required']">Email is required</span>
          <span *ngIf="emailField.errors?.['email']">Please enter a valid email</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          [(ngModel)]="formData.password"
          required
          minlength="8"                  <!-- ← Minimum length validator -->
          #passwordField="ngModel"
        >
        
        <div *ngIf="passwordField.invalid && passwordField.touched" class="error-msg">
          <span *ngIf="passwordField.errors?.['required']">Password is required</span>
          <span *ngIf="passwordField.errors?.['minlength']">
            Minimum {{ passwordField.errors?.['minlength'].requiredLength }} characters
          </span>
        </div>
      </div>

      <!-- Disable button if form is invalid -->
      <button type="submit" [disabled]="loginForm.invalid">
        Login
      </button>
      
      <!-- Debug: see form state -->
      <pre>{{ loginForm.value | json }}</pre>
    </form>
  `
})
export class LoginComponent {
  
  // This object is automatically updated by ngModel two-way binding
  formData = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form data:', this.formData);
      this.authService.login(this.formData.email, this.formData.password);
    }
  }
}
```

---

## 4.2 Reactive Forms

The professional's choice for complex forms.

### FormControl, FormGroup, FormBuilder

```typescript
// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
    
      <!-- Username field -->
      <div class="field">
        <label>Username</label>
        <input formControlName="username" type="text">
        
        <div *ngIf="username.invalid && username.touched">
          <p *ngIf="username.errors?.['required']">Username required</p>
          <p *ngIf="username.errors?.['minlength']">Min 3 characters</p>
          <p *ngIf="username.errors?.['usernameTaken']">This username is taken</p>
        </div>
      </div>
      
      <!-- Nested group for address -->
      <div formGroupName="address">
        <input formControlName="street" placeholder="Street">
        <input formControlName="city" placeholder="City">
        <input formControlName="pincode" placeholder="PIN Code">
      </div>
      
      <!-- Passwords with cross-field validation -->
      <div formGroupName="passwords">
        <input formControlName="password" type="password" placeholder="Password">
        <input formControlName="confirm" type="password" placeholder="Confirm Password">
        
        <!-- Error on the GROUP, not individual control -->
        <p *ngIf="passwords.errors?.['mismatch'] && passwords.touched">
          Passwords do not match!
        </p>
      </div>
      
      <button [disabled]="registrationForm.invalid">Register</button>
    </form>
  `
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  //           ^ FormBuilder is a helper that reduces boilerplate

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      
      // Syntax: fb.control(initialValue, [syncValidators], [asyncValidators])
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)  // Only alphanumeric + underscore
      ], [
        this.checkUsernameAvailability.bind(this)  // Async validator (API call)
      ]],
      
      email: ['', [Validators.required, Validators.email]],
      
      // Nested FormGroup
      address: this.fb.group({
        street: ['', Validators.required],
        city:   ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),
      
      // Nested group with cross-field validator
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm:  ['', Validators.required]
      }, { validators: this.passwordMatchValidator })
      //   ^ Group-level validator
    });
  }

  // ── Convenience getters ──────────────────────────────────────────
  // Makes template cleaner: use 'username' instead of 'registrationForm.get("username")'
  get username() { return this.registrationForm.get('username')!; }
  get email()    { return this.registrationForm.get('email')!; }
  get passwords(){ return this.registrationForm.get('passwords') as FormGroup; }

  // ── Custom Sync Validator ────────────────────────────────────────
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm  = group.get('confirm')?.value;
    
    // Return null if valid, or an error object if invalid
    return password === confirm ? null : { mismatch: true };
  }

  // ── Custom Async Validator ───────────────────────────────────────
  // Returns an Observable — Angular waits for it to complete
  checkUsernameAvailability(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      debounceTime(400),  // Wait 400ms after user stops typing
      map(isTaken => isTaken ? { usernameTaken: true } : null)
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      console.log('Submitted:', formValue);
      this.userService.register(formValue);
    } else {
      // Mark all controls as touched to show all errors
      this.registrationForm.markAllAsTouched();
    }
  }
}
```

---

## Dynamic Forms — FormArray

When you don't know how many fields you'll have at design time.

```typescript
// Add/remove phone numbers, addresses, skills dynamically
@Component({
  template: `
    <form [formGroup]="resumeForm">
      <div formArrayName="skills">
        <div *ngFor="let skill of skills.controls; let i = index">
          
          <!-- Each item in FormArray needs its index -->
          <input [formControlName]="i" placeholder="Skill {{ i + 1 }}">
          <button (click)="removeSkill(i)">Remove</button>
          
        </div>
      </div>
      <button (click)="addSkill()">+ Add Skill</button>
    </form>
  `
})
export class ResumeComponent {
  resumeForm = this.fb.group({
    name: [''],
    skills: this.fb.array(['Angular', 'TypeScript'])  // Start with 2 items
  });

  // Getter for the FormArray
  get skills() {
    return this.resumeForm.get('skills') as FormArray;
  }

  addSkill(): void {
    // Push a new FormControl into the array
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
```

---

# 5. Mini Project: Student Management System

A complete working app using Routing, Forms, Services, and Validation.

## Project Structure

```
student-management/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── student.model.ts
│   │   │   └── services/
│   │   │       └── student.service.ts
│   │   ├── features/
│   │   │   ├── students/
│   │   │   │   ├── student-list/
│   │   │   │   │   └── student-list.component.ts
│   │   │   │   ├── student-detail/
│   │   │   │   │   └── student-detail.component.ts
│   │   │   │   └── student-form/
│   │   │   │       └── student-form.component.ts
│   │   │   └── dashboard/
│   │   │       └── dashboard.component.ts
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── confirm-dialog/
│   │   ├── app.routes.ts
│   │   └── app.component.ts
│   └── main.ts
```

---

## Step 1: The Student Model

```typescript
// src/app/core/models/student.model.ts

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  cgpa: number;
  dateOfBirth: string;
  phone: string;
  address: string;
  enrolledDate: string;
  status: 'active' | 'inactive' | 'graduated';
  subjects: string[];
}

// Type for creating a new student (id is auto-generated)
export type CreateStudentDTO = Omit<Student, 'id' | 'enrolledDate'>;

// Type for updating (all fields optional except id)
export type UpdateStudentDTO = Partial<CreateStudentDTO> & { id: string };

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Information Technology'
] as const;

export type Department = typeof DEPARTMENTS[number];
```

---

## Step 2: The Student Service

```typescript
// src/app/core/services/student.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Student, CreateStudentDTO } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {

  // Using Angular Signals (Angular 16+) for reactive state
  private studentsSignal = signal<Student[]>(this.loadFromStorage());
  
  // Computed values update automatically when studentsSignal changes
  readonly students = this.studentsSignal.asReadonly();
  readonly totalCount = computed(() => this.studentsSignal().length);
  readonly activeCount = computed(() =>
    this.studentsSignal().filter(s => s.status === 'active').length
  );
  readonly avgCgpa = computed(() => {
    const list = this.studentsSignal();
    if (!list.length) return 0;
    return list.reduce((sum, s) => sum + s.cgpa, 0) / list.length;
  });

  // ── CRUD Operations ──────────────────────────────────────────────

  addStudent(dto: CreateStudentDTO): Student {
    const newStudent: Student = {
      ...dto,
      id: this.generateId(),
      enrolledDate: new Date().toISOString().split('T')[0]
    };
    
    this.studentsSignal.update(students => [...students, newStudent]);
    this.saveToStorage();
    return newStudent;
  }

  updateStudent(id: string, dto: Partial<CreateStudentDTO>): Student | null {
    let updated: Student | null = null;
    
    this.studentsSignal.update(students =>
      students.map(s => {
        if (s.id === id) {
          updated = { ...s, ...dto };
          return updated;
        }
        return s;
      })
    );
    
    if (updated) this.saveToStorage();
    return updated;
  }

  deleteStudent(id: string): boolean {
    const before = this.studentsSignal().length;
    this.studentsSignal.update(students => students.filter(s => s.id !== id));
    const deleted = this.studentsSignal().length < before;
    if (deleted) this.saveToStorage();
    return deleted;
  }

  getStudentById(id: string): Student | undefined {
    return this.studentsSignal().find(s => s.id === id);
  }

  searchStudents(query: string): Student[] {
    const q = query.toLowerCase();
    return this.studentsSignal().filter(s =>
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q)
    );
  }

  filterByDepartment(dept: string): Student[] {
    return this.studentsSignal().filter(s => s.department === dept);
  }

  // ── Private helpers ──────────────────────────────────────────────

  private generateId(): string {
    return `STU-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  }

  private saveToStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.studentsSignal()));
  }

  private loadFromStorage(): Student[] {
    try {
      const stored = localStorage.getItem('students');
      return stored ? JSON.parse(stored) : this.getSampleData();
    } catch {
      return this.getSampleData();
    }
  }

  private getSampleData(): Student[] {
    return [
      {
        id: 'STU-001',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@student.edu',
        rollNumber: 'CS2021001',
        department: 'Computer Science',
        semester: 6,
        cgpa: 8.7,
        dateOfBirth: '2002-05-15',
        phone: '9876543210',
        address: 'Pune, Maharashtra',
        enrolledDate: '2021-07-01',
        status: 'active',
        subjects: ['Angular', 'NodeJS', 'MongoDB']
      },
      {
        id: 'STU-002',
        firstName: 'Rahul',
        lastName: 'Patil',
        email: 'rahul.patil@student.edu',
        rollNumber: 'CS2021002',
        department: 'Computer Science',
        semester: 6,
        cgpa: 7.9,
        dateOfBirth: '2002-11-20',
        phone: '9765432109',
        address: 'Mumbai, Maharashtra',
        enrolledDate: '2021-07-01',
        status: 'active',
        subjects: ['Java', 'Spring Boot', 'MySQL']
      }
    ];
  }
}
```

---

## Step 3: Application Routes

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { studentResolver } from './core/resolvers/student.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(c => c.DashboardComponent)
  },
  {
    path: 'students',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/students/student-list/student-list.component')
            .then(c => c.StudentListComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/students/student-form/student-form.component')
            .then(c => c.StudentFormComponent),
        canActivate: [authGuard]
      },
      {
        path: ':id',
        resolve: { student: studentResolver },
        loadComponent: () =>
          import('./features/students/student-detail/student-detail.component')
            .then(c => c.StudentDetailComponent)
      },
      {
        path: ':id/edit',
        resolve: { student: studentResolver },
        loadComponent: () =>
          import('./features/students/student-form/student-form.component')
            .then(c => c.StudentFormComponent),
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard]
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
```

---

## Step 4: Student List Component

```typescript
// src/app/features/students/student-list/student-list.component.ts
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      
      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat">
          <span class="stat-value">{{ studentService.totalCount() }}</span>
          <span class="stat-label">Total Students</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ studentService.activeCount() }}</span>
          <span class="stat-label">Active</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ studentService.avgCgpa() | number:'1.2-2' }}</span>
          <span class="stat-label">Avg CGPA</span>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <input
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch($event)"
          placeholder="Search by name, email, roll number..."
          class="search-input"
        >
        
        <select [(ngModel)]="selectedDept" (change)="onDeptFilter()">
          <option value="">All Departments</option>
          <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
        </select>
        
        <button class="btn-primary" (click)="addStudent()">+ Add Student</button>
      </div>

      <!-- Student Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th (click)="sortBy('rollNumber')">Roll No ↕</th>
            <th (click)="sortBy('firstName')">Name ↕</th>
            <th>Department</th>
            <th>Semester</th>
            <th (click)="sortBy('cgpa')">CGPA ↕</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of displayedStudents(); trackBy: trackStudent">
            <td>{{ student.rollNumber }}</td>
            <td>
              <div class="student-name">
                <div class="avatar">{{ student.firstName[0] }}{{ student.lastName[0] }}</div>
                <div>
                  <div class="name">{{ student.firstName }} {{ student.lastName }}</div>
                  <div class="email">{{ student.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ student.department }}</td>
            <td>Sem {{ student.semester }}</td>
            <td>
              <span class="cgpa-badge" [class]="getCgpaClass(student.cgpa)">
                {{ student.cgpa }}
              </span>
            </td>
            <td>
              <span class="status-badge" [class]="student.status">
                {{ student.status | titlecase }}
              </span>
            </td>
            <td>
              <button (click)="viewStudent(student.id)" title="View">👁</button>
              <button (click)="editStudent(student.id)" title="Edit">✏️</button>
              <button (click)="confirmDelete(student)" title="Delete" class="btn-danger">🗑</button>
            </td>
          </tr>
          
          <tr *ngIf="displayedStudents().length === 0">
            <td colspan="7" class="empty-state">No students found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StudentListComponent {
  
  searchQuery = '';
  selectedDept = '';
  sortField: keyof Student = 'rollNumber';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'];
  
  // Computed: applies search + filter + sort reactively
  displayedStudents = computed(() => {
    let list = this.studentService.students();
    
    if (this.searchQuery) {
      list = list.filter(s =>
        `${s.firstName} ${s.lastName} ${s.email} ${s.rollNumber}`
          .toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    if (this.selectedDept) {
      list = list.filter(s => s.department === this.selectedDept);
    }
    
    return [...list].sort((a, b) => {
      const aVal = String(a[this.sortField]);
      const bVal = String(b[this.sortField]);
      return this.sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  });

  constructor(
    public studentService: StudentService,
    private router: Router
  ) {}

  onSearch(query: string): void {
    this.searchQuery = query;
  }

  onDeptFilter(): void { /* signal-based, auto-updates */ }

  sortBy(field: keyof Student): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  viewStudent(id: string)   { this.router.navigate(['/students', id]); }
  editStudent(id: string)   { this.router.navigate(['/students', id, 'edit']); }
  addStudent()              { this.router.navigate(['/students', 'new']); }

  confirmDelete(student: Student): void {
    const confirmed = confirm(`Delete ${student.firstName} ${student.lastName}?`);
    if (confirmed) {
      this.studentService.deleteStudent(student.id);
    }
  }

  getCgpaClass(cgpa: number): string {
    if (cgpa >= 8.5) return 'cgpa-excellent';
    if (cgpa >= 7.0) return 'cgpa-good';
    if (cgpa >= 5.5) return 'cgpa-average';
    return 'cgpa-poor';
  }

  trackStudent(index: number, student: Student): string {
    return student.id;  // Helps Angular optimize re-renders
  }
}
```

---

## Step 5: Student Form Component (Add / Edit)

```typescript
// src/app/features/students/student-form/student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../core/services/student.service';
import { Student, DEPARTMENTS } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-page">
      <h2>{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h2>
      
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
        
        <!-- Personal Information Section -->
        <section class="form-section">
          <h3>Personal Information</h3>
          
          <div class="form-row">
            <div class="form-field">
              <label>First Name *</label>
              <input formControlName="firstName" placeholder="Enter first name">
              <span class="error" *ngIf="isInvalid('firstName', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('firstName', 'minlength')">Min 2 characters</span>
            </div>
            
            <div class="form-field">
              <label>Last Name *</label>
              <input formControlName="lastName" placeholder="Enter last name">
              <span class="error" *ngIf="isInvalid('lastName', 'required')">Required</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-field">
              <label>Email *</label>
              <input formControlName="email" type="email" placeholder="student@example.com">
              <span class="error" *ngIf="isInvalid('email', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('email', 'email')">Invalid email format</span>
            </div>
            
            <div class="form-field">
              <label>Phone *</label>
              <input formControlName="phone" placeholder="10-digit mobile number">
              <span class="error" *ngIf="isInvalid('phone', 'pattern')">Enter valid 10-digit number</span>
            </div>
          </div>
          
          <div class="form-field">
            <label>Date of Birth *</label>
            <input formControlName="dateOfBirth" type="date" [max]="maxDobDate">
            <span class="error" *ngIf="isInvalid('dateOfBirth', 'required')">Required</span>
            <span class="error" *ngIf="studentForm.errors?.['underAge']">Must be at least 15 years old</span>
          </div>
        </section>
        
        <!-- Academic Information Section -->
        <section class="form-section">
          <h3>Academic Information</h3>
          
          <div class="form-row">
            <div class="form-field">
              <label>Roll Number *</label>
              <input formControlName="rollNumber" placeholder="e.g., CS2021001"
                     [readonly]="isEditMode">
              <span class="error" *ngIf="isInvalid('rollNumber', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('rollNumber', 'pattern')">Invalid format</span>
            </div>
            
            <div class="form-field">
              <label>Department *</label>
              <select formControlName="department">
                <option value="">Select Department</option>
                <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
              </select>
              <span class="error" *ngIf="isInvalid('department', 'required')">Required</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-field">
              <label>Semester *</label>
              <select formControlName="semester">
                <option *ngFor="let sem of [1,2,3,4,5,6,7,8]" [value]="sem">Semester {{ sem }}</option>
              </select>
            </div>
            
            <div class="form-field">
              <label>CGPA (0-10) *</label>
              <input formControlName="cgpa" type="number" step="0.01" min="0" max="10">
              <span class="error" *ngIf="isInvalid('cgpa', 'min') || isInvalid('cgpa', 'max')">
                CGPA must be between 0 and 10
              </span>
            </div>
          </div>
          
          <div class="form-field">
            <label>Status</label>
            <div class="radio-group">
              <label *ngFor="let s of ['active', 'inactive', 'graduated']">
                <input type="radio" formControlName="status" [value]="s">
                {{ s | titlecase }}
              </label>
            </div>
          </div>
        </section>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" (click)="cancel()" class="btn-secondary">Cancel</button>
          <button type="submit" [disabled]="studentForm.invalid || isSubmitting" class="btn-primary">
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Student' : 'Add Student') }}
          </button>
        </div>
        
        <!-- Debug panel (remove in production) -->
        <details>
          <summary>Debug: Form State</summary>
          <pre>Valid: {{ studentForm.valid }}</pre>
          <pre>Errors: {{ studentForm.errors | json }}</pre>
          <pre>Value: {{ studentForm.value | json }}</pre>
        </details>
      </form>
    </div>
  `
})
export class StudentFormComponent implements OnInit {
  
  studentForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  editStudentId: string | null = null;
  departments = DEPARTMENTS;
  maxDobDate = new Date(Date.now() - 15 * 365.25 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];  // 15 years ago

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    
    // Check if we're editing (resolver passes student in route data)
    const existingStudent = this.route.snapshot.data['student'] as Student;
    if (existingStudent) {
      this.isEditMode = true;
      this.editStudentId = existingStudent.id;
      this.studentForm.patchValue(existingStudent);  // patchValue fills only the fields that exist
    }
  }

  private buildForm(): void {
    this.studentForm = this.fb.group({
      firstName:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName:    ['', [Validators.required, Validators.maxLength(50)]],
      email:       ['', [Validators.required, Validators.email]],
      phone:       ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      dateOfBirth: ['', Validators.required],
      rollNumber:  ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{7}$/)]],
      department:  ['', Validators.required],
      semester:    [1,  Validators.required],
      cgpa:        [0,  [Validators.required, Validators.min(0), Validators.max(10)]],
      address:     [''],
      status:      ['active'],
      subjects:    [[]]
    }, { validators: this.ageValidator });
  }

  // Group-level validator: check student age from dateOfBirth
  private ageValidator(group: FormGroup) {
    const dob = group.get('dateOfBirth')?.value;
    if (!dob) return null;
    
    const ageMs = Date.now() - new Date(dob).getTime();
    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    
    return ageYears >= 15 ? null : { underAge: true };
  }

  // Helper: is a specific field invalid and touched?
  isInvalid(fieldName: string, errorType: string): boolean {
    const control = this.studentForm.get(fieldName);
    return !!(control?.invalid && control?.touched && control?.errors?.[errorType]);
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();  // Show all errors
      return;
    }

    this.isSubmitting = true;
    const formValue = this.studentForm.value;

    if (this.isEditMode && this.editStudentId) {
      this.studentService.updateStudent(this.editStudentId, formValue);
      this.showSuccess('Student updated successfully!');
    } else {
      this.studentService.addStudent(formValue);
      this.showSuccess('Student added successfully!');
    }

    this.isSubmitting = false;
    this.router.navigate(['/students']);
  }

  cancel(): void {
    if (this.studentForm.dirty) {
      const confirmed = confirm('Discard unsaved changes?');
      if (!confirmed) return;
    }
    this.router.navigate(['/students']);
  }

  private showSuccess(msg: string): void {
    // In a real app, use a toast/notification service
    alert(msg);
  }
}
```

---

## Step 6: App Component with Navigation

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-layout">
      
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <div class="logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">StudentMS</span>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            📊 Dashboard
          </a>
          <a routerLink="/students" routerLinkActive="active" class="nav-item">
            👥 Students
          </a>
          <a routerLink="/students/new" class="nav-item btn-add">
            ➕ Add Student
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background: #f1f5f9;
    }
    .sidebar {
      width: 240px;
      background: #1e293b;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { font-size: 28px; }
    .logo-text { color: #38bdf8; font-size: 18px; font-weight: 700; }
    .nav-menu { display: flex; flex-direction: column; gap: 4px; }
    .nav-item {
      padding: 12px 16px;
      border-radius: 8px;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s;
    }
    .nav-item:hover { background: #334155; color: #fff; }
    .nav-item.active { background: #0284c7; color: #fff; }
    .main-content { flex: 1; padding: 32px; overflow-y: auto; }
  `]
})
export class AppComponent {}
```

---

# 6. Interview Questions & Answers

## Components & Lifecycle

---

**Q1. What are lifecycle hooks in Angular and why do we need them?**

**Answer:** Lifecycle hooks are methods that Angular calls at specific moments during a component's life — from creation to destruction. They let you run code at the right moment without guessing when the DOM is ready or when inputs are available.

Key hooks: `constructor` → `ngOnChanges` → `ngOnInit` → `ngDoCheck` → `ngAfterContentInit` → `ngAfterViewInit` → `ngOnDestroy`.

---

**Q2. What is the difference between `ngOnInit` and `constructor`?**

**Answer:**

| constructor | ngOnInit |
|---|---|
| TypeScript concept, not Angular-specific | Angular lifecycle hook |
| Runs first, before any inputs | Runs after @Input() values are set |
| Inject services here | Fetch data, initialize logic here |
| DOM not ready | Component initialized, template rendered |

Rule: Inject in constructor, work in ngOnInit.

---

**Q3. What is `ngOnChanges` and when is it called?**

**Answer:** `ngOnChanges` fires every time an `@Input()` property receives a new value from the parent. It receives a `SimpleChanges` object that contains the `previousValue`, `currentValue`, and a `firstChange` boolean for each changed property. It runs BEFORE `ngOnInit` on the first load.

---

**Q4. Why is `ngOnDestroy` important?**

**Answer:** It prevents memory leaks. When a component is destroyed, any active subscriptions, timers, or event listeners still hold references and keep running, consuming memory. In `ngOnDestroy`, you should call `.unsubscribe()` on Observables, `clearInterval()`/`clearTimeout()` on timers, and remove any manually added event listeners.

---

**Q5. What is `@ViewChild` and when can you safely access it?**

**Answer:** `@ViewChild` lets a parent component get a direct reference to a child component or DOM element. You can only safely access it inside `ngAfterViewInit` or later — Angular hasn't rendered the view in earlier hooks, so the reference is `undefined`.

```typescript
@ViewChild('myInput') inputRef!: ElementRef;

ngAfterViewInit() {
  this.inputRef.nativeElement.focus(); // Safe here
}
```

---

**Q6. What is the difference between `@ViewChild` and `@ContentChild`?**

**Answer:**
- `@ViewChild`: Accesses elements/components in the component's OWN template (`.html` file)
- `@ContentChild`: Accesses elements projected INTO the component via `<ng-content>`

Available in:
- `@ViewChild` → `ngAfterViewInit`
- `@ContentChild` → `ngAfterContentInit`

---

**Q7. How do parent and child components communicate?**

**Answer:** Four main ways:
1. **Parent → Child**: `@Input()` decorator (property binding)
2. **Child → Parent**: `@Output()` + `EventEmitter` (event binding)
3. **Parent → Child direct access**: `@ViewChild` (call methods on child)
4. **Any → Any**: Shared service with Observable/Signal

---

**Q8. What is `EventEmitter` and how does it work?**

**Answer:** `EventEmitter` is an Angular class (extends RxJS Subject) that lets a child component broadcast events to its parent. You declare it with `@Output()`, call `.emit(value)` to fire the event, and the parent listens with `(eventName)="handler($event)"` in the template.

---

**Q9. What is content projection and `<ng-content>`?**

**Answer:** Content projection allows a parent to inject HTML into a child component's template, similar to Vue's slots or React's `children` prop. Named slots use `select` attribute: `<ng-content select="[card-header]">`. The content comes from outside, so it belongs to the parent's context (parent's variables and styles).

---

**Q10. How do you create dynamic components in Angular?**

**Answer:** Using `createComponent()` (Angular 13+):
```typescript
const componentRef = createComponent(MyComponent, {
  environmentInjector: this.injector
});
this.appRef.attachView(componentRef.hostView);
document.body.appendChild(componentRef.hostView.rootNodes[0]);
```
This is used for modals, tooltips, notifications, and any UI that appears dynamically.

---

## Dependency Injection

---

**Q11. What problem does Dependency Injection solve?**

**Answer:** DI solves:
- **Tight coupling**: Classes don't create their own dependencies
- **Hard to test**: With DI, you can swap real services with mocks
- **Memory waste**: Singletons mean one instance for all consumers
- **Dependency hell**: You don't need to pass deeply nested dependencies manually

---

**Q12. What is the difference between `providedIn: 'root'` and providing in a component?**

**Answer:**
- `providedIn: 'root'`: One singleton instance for the whole app, tree-shakeable (removed from bundle if unused)
- `providers: [MyService]` in a component: A NEW instance is created for each instance of that component — not shared

---

**Q13. What is hierarchical injection?**

**Answer:** Angular has a tree of injectors that mirrors the component tree. When a component requests a service, Angular looks up the tree until it finds a provider. Child injectors can override parent services — a component with its own `providers: []` gets its own instance, not the parent's.

---

**Q14. What is `InjectionToken` and when do you use it?**

**Answer:** `InjectionToken` is used to inject non-class values (strings, objects, primitives) that can't be used as tokens directly. Example:

```typescript
export const API_URL = new InjectionToken<string>('api.url');
// Provider: { provide: API_URL, useValue: 'https://api.example.com' }
// Inject: constructor(@Inject(API_URL) private url: string)
```

---

**Q15. What are the different provider types?**

**Answer:**
- `useClass`: Provide an alternative class implementation
- `useValue`: Provide a literal value or object
- `useFactory`: Compute the value at runtime (can inject other services)
- `useExisting`: Alias one token to another

---

## Routing

---

**Q16. What is `RouterOutlet` and why is it needed?**

**Answer:** `<router-outlet>` is the placeholder in the template where Angular renders the component that matches the current URL. Without it, Angular wouldn't know WHERE to display the routed component. You can have multiple named outlets for advanced layouts.

---

**Q17. What is the difference between `routerLink` and `href` for navigation?**

**Answer:**
- `href`: Full browser navigation — reloads the entire page, loses all application state
- `routerLink`: Angular's client-side navigation — no page reload, preserves app state, faster, works with lazy loading and route guards

---

**Q18. How do you read URL parameters in Angular?**

**Answer:** Using `ActivatedRoute`:
```typescript
// Route params (/products/:id)
this.route.snapshot.paramMap.get('id');  // One-time
this.route.paramMap.subscribe(p => p.get('id'));  // Reactive

// Query params (/products?sort=price)
this.route.snapshot.queryParamMap.get('sort');
```

---

**Q19. What is lazy loading and why is it important?**

**Answer:** Lazy loading splits your app into separate JavaScript bundles, loading each bundle only when the user navigates to that route. Benefits: faster initial load, smaller initial bundle, better performance on slow connections. Implemented with `loadChildren` or `loadComponent` using dynamic `import()`.

---

**Q20. What are route guards and what types exist?**

**Answer:** Route guards are functions that control navigation:
- `CanActivate`: Can the user enter this route?
- `CanDeactivate`: Can the user leave this route? (unsaved changes)
- `CanMatch`: Should this route even be considered for matching?
- `Resolve`: Pre-fetch data before the component activates
- `CanActivateChild`: Protect all child routes

---

**Q21. What is the `Resolve` guard used for?**

**Answer:** Resolve pre-fetches data before the component is shown. Instead of showing a loading spinner inside the component, the router waits for the resolver to complete, then passes the data via `route.snapshot.data`. This ensures the component always renders with data available.

---

**Q22. How do you implement breadcrumbs with Angular Router?**

**Answer:** Add `data` to route definitions and read it in a breadcrumb component:

```typescript
// Route:
{ path: 'products', data: { breadcrumb: 'Products' }, ... }
{ path: ':id', data: { breadcrumb: 'Product Detail' }, ... }

// Component reads Router events and builds breadcrumb array from
// router.events, filter for NavigationEnd, then traverse ActivatedRoute tree
```

---

**Q23. What is `pathMatch: 'full'` used for?**

**Answer:** It's used on redirect routes to prevent matching too eagerly. `pathMatch: 'full'` means the entire URL must match, not just start with the path. Without it, `{ path: '', redirectTo: '/home' }` would match EVERY URL (since every URL starts with empty string).

---

**Q24. How does the Router handle `**` (wildcard) routes?**

**Answer:** `**` is the wildcard route that matches any URL not matched by earlier routes. It MUST be the LAST route in the array because Angular matches routes top-to-bottom, first-match wins. Typically used for 404 pages.

---

**Q25. What are auxiliary routes?**

**Answer:** Auxiliary (named) routes allow multiple independent router outlets in the same component:
```html
<router-outlet></router-outlet>          <!-- primary -->
<router-outlet name="sidebar"></router-outlet>  <!-- auxiliary -->
```
Navigate with: `router.navigate([{ outlets: { sidebar: ['help'] } }])`

---

## Angular Forms

---

**Q26. What is the difference between Template-Driven and Reactive Forms?**

**Answer:** Template-Driven forms are simpler — you use `ngModel` directives in the HTML, and Angular implicitly creates the form model. Reactive forms are explicit — you define the complete form structure in TypeScript using `FormGroup`/`FormControl`, giving more control, easier testing, and better support for dynamic forms.

---

**Q27. What is `FormBuilder` and why use it?**

**Answer:** `FormBuilder` is a helper service that reduces boilerplate when creating reactive forms. Instead of `new FormGroup({ name: new FormControl('', Validators.required) })`, you write `this.fb.group({ name: ['', Validators.required] })`. It's purely syntactic sugar but significantly cleaner.

---

**Q28. What is `FormControl` and what states can it have?**

**Answer:** `FormControl` tracks the value and validation state of an individual form field. States:
- **valid/invalid**: Does it pass all validators?
- **pristine/dirty**: Has the user typed in it?
- **touched/untouched**: Has the user visited (blurred) this field?
- **pending**: Async validator is still running

---

**Q29. How do you create custom validators in Angular?**

**Answer:**

```typescript
// Sync validator function
function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  return /\s/.test(control.value) ? { hasSpaces: true } : null;
}

// Use: new FormControl('', [noSpacesValidator])

// Async validator (returns Observable)
function uniqueEmailValidator(service: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkEmail(control.value).pipe(
      map(taken => taken ? { emailTaken: true } : null)
    );
  };
}
```

---

**Q30. What is a cross-field validator?**

**Answer:** A validator applied to a `FormGroup` that compares multiple fields, like confirming passwords match:

```typescript
this.fb.group({
  password: [''],
  confirm: ['']
}, { validators: passwordMatchValidator });

function passwordMatchValidator(group: AbstractControl) {
  const p = group.get('password')?.value;
  const c = group.get('confirm')?.value;
  return p === c ? null : { mismatch: true };
}
```

---

**Q31. What is `FormArray` and when do you use it?**

**Answer:** `FormArray` manages a dynamic list of `FormControl` or `FormGroup` objects. Use it when the user can add/remove rows, like a list of phone numbers, work experiences, or skills. You add with `.push()`, remove with `.removeAt(index)`, and access controls via `.controls` array.

---

**Q32. What does `markAllAsTouched()` do and why is it used on submit?**

**Answer:** It marks every control as "touched," which triggers the display of all validation errors at once. By default, errors only show when a user has visited (touched) a field. On form submit, if you want to show ALL errors immediately, call `this.form.markAllAsTouched()` before returning.

---

**Q33. How do you disable a form field in reactive forms?**

**Answer:**
```typescript
// In form definition:
this.fb.control({ value: 'readonly-value', disabled: true })

// Programmatically:
this.form.get('email')?.disable();
this.form.get('email')?.enable();
```
⚠️ Note: Disabled controls are NOT included in `form.value` — use `form.getRawValue()` to include them.

---

**Q34. What is the difference between `setValue` and `patchValue`?**

**Answer:**
- `setValue`: Must provide a value for EVERY control in the form — throws error if you miss one
- `patchValue`: Only updates the fields you provide — ignores missing fields

Use `patchValue` when editing (you may not have all fields), `setValue` when you have the complete object.

---

**Q35. How do async validators impact UX and how do you handle the delay?**

**Answer:** Async validators call APIs which take time. During this time, the control is in `pending` state. To improve UX:
1. Use `debounceTime` to avoid calling the API on every keystroke
2. Show a spinner when `control.pending === true`
3. Use `distinctUntilChanged()` to avoid redundant API calls
4. Cache results where possible

---

## Advanced & Architecture

---

**Q36. What are Angular Signals and how do they compare to RxJS?**

**Answer:** Signals (Angular 16+) are a simpler reactive primitive:
- **Signals**: Synchronous, simpler, no unsubscribe needed, great for local UI state
- **RxJS Observables**: Async, powerful operators, great for HTTP/streams/complex async flows

Signals use `signal()`, `computed()`, and `effect()`. They integrate with Angular's change detection and can automatically update the view without `async` pipe or `.subscribe()`.

---

**Q37. What is Change Detection and what strategies exist?**

**Answer:** Change detection is how Angular knows when to update the DOM. Two strategies:
- **Default**: Angular checks the entire component tree after every event — simpler but can be slow for large apps
- **OnPush**: Angular only checks a component when its `@Input()` reference changes, an event fires within it, or you manually call `markForCheck()`. Much more performant but requires immutable data patterns.

---

**Q38. What is the Angular Router's `NavigationExtras` object?**

**Answer:** It's an optional configuration passed to `router.navigate()`:
```typescript
this.router.navigate(['/products'], {
  queryParams: { page: 1, sort: 'price' },
  queryParamsHandling: 'merge',  // or 'preserve'
  fragment: 'reviews',
  replaceUrl: true,              // Don't add to browser history
  state: { fromCart: true }      // Pass transient state
});
```

---

**Q39. How do you share data between unrelated (sibling) components?**

**Answer:** Three approaches:
1. **Service with Subject/BehaviorSubject**: Both components inject the service; service holds the state; components subscribe/update
2. **Angular Signals**: Signal in a service, components read it
3. **NgRx/Akita/NGXS**: State management libraries for complex apps — unidirectional data flow with actions and reducers

---

**Q40. What is the difference between `Subject`, `BehaviorSubject`, and `ReplaySubject`?**

**Answer:**

| Type | Initial Value | Late Subscribers | Use Case |
|---|---|---|---|
| `Subject` | None | Miss past emissions | Events, one-way triggers |
| `BehaviorSubject` | Required | Get latest value | Current state (user, theme) |
| `ReplaySubject(n)` | None | Get last n values | Cache recent history |
| `AsyncSubject` | None | Get last value on complete | Load-once operations |

In Angular services, `BehaviorSubject` is most common for shared state because new subscribers immediately get the current value (e.g., current user, current theme).

---

## Bonus: Quick-Fire Architecture Questions

---

**Q. What is the difference between `declarations`, `imports`, and `providers` in `@NgModule`?**

**Answer:**
- `declarations`: Components, directives, pipes that BELONG to this module
- `imports`: Other modules whose exports you want to use
- `providers`: Services to register in this module's injector
- `exports`: Declarations you want to share with other modules that import this one

---

**Q. What is `trackBy` in `*ngFor` and why does it matter?**

**Answer:** Without `trackBy`, Angular re-creates ALL DOM elements when the array changes. With `trackBy`, you provide a function that returns a unique identifier (like `id`), and Angular only re-renders the items that actually changed. Critical for performance with large lists.

---

**Q. When would you use `ChangeDetectorRef.markForCheck()` vs `detectChanges()`?**

**Answer:**
- `markForCheck()`: Marks the component and its ancestors for checking in the next CD cycle — used with `OnPush` strategy when state changes asynchronously
- `detectChanges()`: Runs change detection synchronously RIGHT NOW on this component and its children — used after manually updating state outside Angular's zone

---

**Q. What is `NgZone` and `zone.js`?**

**Answer:** Zone.js monkey-patches browser async APIs (setTimeout, Promise, XMLHttpRequest, etc.) to intercept them. When any async operation completes, Zone.js notifies Angular to run change detection. `NgZone.runOutsideAngular()` lets you run code without triggering CD (useful for performance-intensive operations like canvas animations).

---

## Summary Cheat Sheet

```
Components:
  constructor()         → Inject services
  ngOnChanges()         → React to @Input changes
  ngOnInit()            → Fetch data (runs once)
  ngAfterViewInit()     → Use @ViewChild
  ngOnDestroy()         → Unsubscribe everything

Communication:
  @Input()              → Parent to Child
  @Output() + Emit      → Child to Parent
  @ViewChild            → Parent accesses child directly
  Service               → Any to Any

Routing:
  Routes array          → URL → Component mapping
  router-outlet         → Where component renders
  routerLink            → Navigate without reload
  ActivatedRoute        → Read URL params
  Guards                → Control navigation access
  Resolve               → Pre-fetch data

Forms:
  Template-Driven       → Simple, ngModel
  Reactive              → Complex, FormBuilder
  FormGroup             → Container of controls
  FormControl           → Single field + validation
  FormArray             → Dynamic list of controls
  Validators            → Sync + Async validation
```

---

*End of Angular Phase 2: Components, Routing & Forms*

*Next: Phase 3 — RxJS, State Management, Performance Optimization, Testing*
