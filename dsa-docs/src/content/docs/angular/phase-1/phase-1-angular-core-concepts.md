---
title: "4. Angular Core Concepts"
description: "┌─────────────────────────────────────┐ │ <app-root │ │ ┌───────────────────────────────┐ │ │ │ <app-header │ │ │ │ Logo | Nav | Search │ │ │ └────────────"
sidebar:
  order: 4
---

## 4. Angular Core Concepts

### 4.1 Components

#### Simple Words First 🟡
A component is like a **LEGO brick**. Each brick is self-contained — it has its own shape, color, and connector. You combine bricks to build something big. In Angular, each component controls one piece of the UI, and you combine them to build the whole app.

```
A typical web page broken into components:

┌─────────────────────────────────────┐
│  <app-root>                         │
│  ┌───────────────────────────────┐  │
│  │  <app-header>                 │  │
│  │    Logo | Nav | Search        │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-sidebar>                │  │
│  │    Menu items                 │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-product-list>           │  │
│  │  ┌────────┐  ┌────────┐       │  │
│  │  │<app-   │  │<app-   │       │  │
│  │  │product │  │product │       │  │
│  │  │-card>  │  │-card>  │       │  │
│  │  └────────┘  └────────┘       │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-footer>                 │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### Anatomy of a Component

A Component always has **3 parts** (usually split into separate files):

```typescript
// user-card.component.ts — The Component class (LOGIC)
@Component({
  selector: 'app-user-card',            // 1. The HTML tag
  templateUrl: './user-card.component.html',  // 2. The HTML template
  styleUrls: ['./user-card.component.css']    // 3. The CSS styles
})
export class UserCardComponent {
  // Properties = Data
  userName: string = 'Alice';
  userAge: number = 28;
  isActive: boolean = true;

  // Methods = Behavior
  greetUser(): string {
    return `Hello, ${this.userName}!`;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
```

```html
<!-- user-card.component.html — The Template (VIEW) -->
<div class="user-card">
  <h2>{{ userName }}</h2>          <!-- Show the userName property -->
  <p>Age: {{ userAge }}</p>
  <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
  <button (click)="toggleActive()">Toggle Status</button>
</div>
```

```css
/* user-card.component.css — The Styles (LOOK) */
/* These styles ONLY apply to THIS component — no leaking! */
.user-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
```

#### Generating a Component with CLI

```bash
# Creates 4 files automatically
ng generate component user-card

# Output:
# CREATE src/app/user-card/user-card.component.html
# CREATE src/app/user-card/user-card.component.ts
# CREATE src/app/user-card/user-card.component.css
# CREATE src/app/user-card/user-card.component.spec.ts
# UPDATE src/app/app.module.ts (adds to declarations)
```

#### Component Lifecycle Hooks

```typescript
@Component({ ... })
export class UserCardComponent implements OnInit, OnDestroy {

  // Called ONCE after component is created
  ngOnInit(): void {
    console.log("Component is ready! Load data here.");
    this.loadUserData();  // ← Fetch data from API here
  }

  // Called when component is removed from DOM
  ngOnDestroy(): void {
    console.log("Component is destroyed. Clean up here.");
    // Cancel subscriptions, clear timers here
  }

  // Called when @Input values change
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Input data changed:", changes);
  }

  // Called after view is initialized
  ngAfterViewInit(): void {
    console.log("Template is rendered. Access DOM here.");
  }
}
```

---

### 4.2 Templates

#### Simple Words First 🟡
A template is the **HTML face** of your component. But it's not plain HTML — it's **super-powered HTML** with Angular-specific syntax that can display dynamic data, react to events, and conditionally show/hide things.

```html
<!-- Plain HTML does this: -->
<h1>Hello, World!</h1>

<!-- Angular Template does this: -->
<h1>Hello, {{ currentUser.name }}!</h1>   ← Shows REAL data from component
<p *ngIf="currentUser.isActive">✅ Active</p>  ← Conditional rendering
<li *ngFor="let item of items">{{ item }}</li>  ← Loops
<input [(ngModel)]="searchTerm">               ← Two-way binding
<button (click)="handleClick()">Click</button> ← Event handling
```

#### Inline Template vs External Template File

```typescript
// Option 1: Inline Template (for SMALL components)
@Component({
  selector: 'app-badge',
  template: `
    <span class="badge">{{ label }}</span>
  `,
  styles: [`
    .badge { background: blue; color: white; padding: 4px 8px; }
  `]
})
export class BadgeComponent {
  label = 'New';
}

// Option 2: External Files (PREFERRED for most components)
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent { }
```

---

### 4.3 Modules

#### Simple Words First 🟡
A module is like a **department in a company**. The HR Department has its own people, tools, and rules — it's self-contained. The IT Department is the same. They work independently but can share resources when needed.

In Angular, a Module groups related components, services, and pipes together.

```typescript
// users/users.module.ts
@NgModule({
  declarations: [            // ← Components/Directives/Pipes IN this module
    UserListComponent,
    UserDetailComponent,
    UserCardComponent,
    UserAvatarPipe
  ],
  imports: [                 // ← Other modules this module NEEDS
    CommonModule,            // ngIf, ngFor etc.
    FormsModule,             // ngModel (two-way binding)
    HttpClientModule,        // HTTP requests
    RouterModule             // Routing
  ],
  providers: [               // ← Services available in this module
    UserService
  ],
  exports: [                 // ← Components/Directives available to OTHER modules
    UserListComponent,
    UserCardComponent        // Other modules can use this after importing UsersModule
  ]
})
export class UsersModule { }
```

#### The Root Module (AppModule)

```typescript
// app.module.ts — The MAIN module that ties everything together
@NgModule({
  declarations: [
    AppComponent       // Root component MUST be here
  ],
  imports: [
    BrowserModule,     // Required for browser apps (replaces CommonModule in root)
    UsersModule,       // Our custom feature module
    ProductsModule
  ],
  providers: [
    AuthService        // App-wide service
  ],
  bootstrap: [AppComponent]  // ← The FIRST component Angular renders
})
export class AppModule { }
```

---

### 4.4 Metadata & Decorators

Metadata is the **configuration object** you pass to a decorator. It tells Angular how to use the class.

```typescript
// @Component decorator with METADATA object
@Component({
  // ── Required ──
  selector: 'app-user',          // The HTML tag name

  // ── Template: choose ONE ──
  template: '<h1>Inline</h1>',   // Option A: Inline HTML
  templateUrl: './user.html',    // Option B: External file (preferred)

  // ── Styles: choose ONE ──
  styles: ['.red { color: red; }'], // Option A: Inline CSS
  styleUrls: ['./user.css'],        // Option B: External file (preferred)

  // ── Change Detection ──
  changeDetection: ChangeDetectionStrategy.OnPush,  // Performance optimization

  // ── View Encapsulation ──
  encapsulation: ViewEncapsulation.Emulated,  // Default: CSS scoped to component
})
export class UserComponent { }

// @NgModule decorator with METADATA object
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [...],
  exports: [...],
  bootstrap: [...]
})
export class AppModule { }
```

---

### 4.5 Selectors

A selector is the **name you use in HTML** to place your component. Angular uses CSS selector syntax.

```typescript
// ── Type 1: Element Selector (most common) ──
@Component({ selector: 'app-user-card' })
// Used as: <app-user-card></app-user-card>

// ── Type 2: Attribute Selector ──
@Component({ selector: '[appHighlight]' })
// Used as: <div appHighlight></div>

// ── Type 3: Class Selector ──
@Component({ selector: '.app-card' })
// Used as: <div class="app-card"></div>
```

> **Best Practice:** Always use **element selectors** for components. Use **attribute selectors** for directives.

---

### 4.6 Bootstrap Process

#### The Angular Startup Sequence (Step by Step)

```svg
<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="480" fill="#0f172a" rx="12"/>
  <text x="350" y="32" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="bold">Angular Bootstrap Process</text>

  <!-- Step 1 -->
  <rect x="40" y="55" width="620" height="55" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="75" cy="82" r="16" fill="#3b82f6"/>
  <text x="75" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1</text>
  <text x="110" y="77" fill="#93c5fd" font-size="13" font-weight="bold">Browser loads index.html</text>
  <text x="110" y="97" fill="#bfdbfe" font-size="11">Browser receives the single HTML file. It contains &lt;app-root&gt;&lt;/app-root&gt;</text>

  <!-- Arrow -->
  <line x1="350" y1="110" x2="350" y2="135" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 2 -->
  <rect x="40" y="135" width="620" height="55" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <circle cx="75" cy="162" r="16" fill="#22c55e"/>
  <text x="75" y="167" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2</text>
  <text x="110" y="157" fill="#86efac" font-size="13" font-weight="bold">main.ts executes</text>
  <text x="110" y="177" fill="#a7f3d0" font-size="11">platformBrowserDynamic().bootstrapModule(AppModule) is called</text>

  <!-- Arrow -->
  <line x1="350" y1="190" x2="350" y2="215" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 3 -->
  <rect x="40" y="215" width="620" height="55" rx="8" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
  <circle cx="75" cy="242" r="16" fill="#a855f7"/>
  <text x="75" y="247" text-anchor="middle" fill="white" font-size="14" font-weight="bold">3</text>
  <text x="110" y="237" fill="#d8b4fe" font-size="13" font-weight="bold">AppModule is analyzed</text>
  <text x="110" y="257" fill="#ede9fe" font-size="11">Angular reads declarations, imports, providers from @NgModule metadata</text>

  <!-- Arrow -->
  <line x1="350" y1="270" x2="350" y2="295" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 4 -->
  <rect x="40" y="295" width="620" height="55" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <circle cx="75" cy="322" r="16" fill="#f97316"/>
  <text x="75" y="327" text-anchor="middle" fill="white" font-size="14" font-weight="bold">4</text>
  <text x="110" y="317" fill="#fed7aa" font-size="13" font-weight="bold">AppComponent is created</text>
  <text x="110" y="337" fill="#ffedd5" font-size="11">Angular instantiates the bootstrap component defined in AppModule</text>

  <!-- Arrow -->
  <line x1="350" y1="350" x2="350" y2="375" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 5 -->
  <rect x="40" y="375" width="620" height="55" rx="8" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="75" cy="402" r="16" fill="#f59e0b"/>
  <text x="75" y="407" text-anchor="middle" fill="white" font-size="14" font-weight="bold">5</text>
  <text x="110" y="397" fill="#fde68a" font-size="13" font-weight="bold">DOM is updated — App is visible!</text>
  <text x="110" y="417" fill="#fef3c7" font-size="11">Angular replaces &lt;app-root&gt; with AppComponent's template. User sees the app.</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---
