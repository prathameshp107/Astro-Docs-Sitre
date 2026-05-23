---
title: "2. Dependency Injection"
description: "Without DI (bad way):"
sidebar:
  order: 2
---

## 2. Dependency Injection

### What Problem Does DI Solve?

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

### DI Architecture Diagram

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

### How Injectors Work Internally

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

### Providers — Registering Services

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

### Advanced DI Patterns

#### Custom Tokens (for non-class values)

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

#### Provider Types

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
