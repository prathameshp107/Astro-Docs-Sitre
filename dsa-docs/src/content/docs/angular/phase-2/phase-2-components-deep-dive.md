---
title: "1. Components Deep Dive"
description: "Think of a component like a LEGO brick. Each brick has: - Its own shape (template / HTML) - Its own color (styles / CSS) - Its own behavior (TypeScript cla"
sidebar:
  order: 1
---

## 1. Components Deep Dive

### What is a Component?

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

### 1.1 Component Lifecycle

#### What is a Lifecycle?

Every component is **born**, **lives**, and **dies**. Angular gives you special methods called **lifecycle hooks** so you can run code at each stage.

Think of it like a human life:
- **Born** → Constructor
- **Grows up** → ngOnInit
- **Reacts to changes** → ngOnChanges, ngDoCheck
- **Has children** → ngAfterContentInit, ngAfterViewInit
- **Dies** → ngOnDestroy

---

#### Lifecycle Flow Diagram

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

#### Each Hook Explained with Code

##### `constructor()` — The Birth

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

##### `ngOnChanges()` — React to Parent's Changes

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

##### `ngOnInit()` — The Worker

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

##### `ngOnDestroy()` — The Cleanup Crew

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

### 1.2 Component Communication

Components need to talk to each other. Angular has 4 main ways:

```
Parent ──(@Input)──▶ Child    (data flows down)
Child  ──(@Output)─▶ Parent   (events flow up)
Any    ──(Service)─▶ Any      (shared state)
Parent ──(ViewChild)▶ Child   (direct access)
```

---

#### `@Input()` Decorator — Parent to Child

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

#### `@Output()` + `EventEmitter` — Child to Parent

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

#### `@ViewChild` — Parent Accesses Child Directly

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

#### `@ContentChild` — Access Projected Content

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

#### Dynamic Components

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
