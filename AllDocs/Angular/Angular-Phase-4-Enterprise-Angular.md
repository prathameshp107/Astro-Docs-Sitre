# Angular Phase 4 — Enterprise Angular

> **Principal Software Engineer & Enterprise Angular Architect Reference**
> Mentoring guide for building large-scale, production-grade Angular systems.
> Real-world patterns, architecture decisions, and 75 enterprise interview questions.

---

## Table of Contents

1. [Angular Architecture Patterns](#1-angular-architecture-patterns)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [HTTP Client](#3-http-client)
4. [Testing](#4-testing)
5. [Deployment](#5-deployment)
6. [Enterprise Best Practices](#6-enterprise-best-practices)
7. [Final Large Project: Enterprise E-Commerce Platform](#7-final-large-project-enterprise-e-commerce-platform)
8. [Interview Questions](#8-interview-questions)

---

# 1. Angular Architecture Patterns

## Why Architecture Matters in Enterprise Apps

When a junior engineer builds an app, they make it work. When a senior engineer builds it, they make it *maintainable by a team of 20 engineers over 5 years*. That's the difference architecture makes.

Without deliberate architecture:
- Features become interdependent — changing one breaks another
- Teams step on each other's code
- Onboarding new engineers takes months, not days
- Testing becomes impossible because everything is coupled

The patterns below are battle-tested in Fortune 500 codebases. They're used because they **scale** — with team size, codebase size, and time.

---

## Feature-Based Architecture

### What It Is

Organize code by **business domain feature**, not by technical layer. Each feature is a self-contained vertical slice of the application.

```
src/
└── app/
    ├── features/
    │   ├── auth/              ← owns everything about authentication
    │   │   ├── components/
    │   │   ├── services/
    │   │   ├── store/
    │   │   ├── guards/
    │   │   └── auth.module.ts
    │   ├── products/          ← owns everything about products
    │   │   ├── components/
    │   │   ├── services/
    │   │   ├── store/
    │   │   └── products.module.ts
    │   ├── cart/
    │   ├── orders/
    │   └── admin/
    ├── core/
    ├── shared/
    └── app.module.ts
```

### Why Companies Use It

- **Team ownership:** Team A owns `products/`, Team B owns `orders/`. No conflicts.
- **Lazy loading naturally maps to features:** Each feature is a separate chunk.
- **Discoverability:** A new engineer looking for cart logic knows exactly where to look.
- **Deletion is safe:** Remove a feature directory → zero side effects.

### Bad Alternative: Technical Layering

```
src/app/
├── components/    ← 200 files, unrelated to each other
├── services/      ← 150 files, which service belongs to which feature?
├── models/
└── pipes/
```

This doesn't scale. When you need to delete the "Promotions" feature, you have to hunt across every folder.

---

## Layer Architecture (Within a Feature)

Inside each feature, a clean layer separation prevents business logic from leaking into the UI and vice versa.

```
feature/
├── presentation/       (components, pipes, directives — only UI logic)
│   ├── smart/          (container components — connect to store/services)
│   └── dumb/           (presentational components — @Input/@Output only)
├── domain/             (interfaces, models, enums — pure TypeScript, no Angular)
├── application/        (services, store, use-cases — orchestrates domain)
└── infrastructure/     (HTTP clients, local storage adapters, API mappers)
```

### Why This Matters

```typescript
// BAD: Component talks directly to HTTP — presentation + infrastructure mixed
@Component({ ... })
export class ProductListComponent {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Component knows about URLs, HTTP verbs, response shapes
    this.http.get<Product[]>('https://api.example.com/v2/products')
      .subscribe(p => this.products = p);
  }
}

// GOOD: Component talks to a service — layers are clean
@Component({ ... })
export class ProductListComponent {
  products$ = this.productService.getAll();

  constructor(private productService: ProductService) {}
  // Component doesn't know or care how products are fetched
}
```

---

## Core Module

The `CoreModule` contains **singleton services and one-time-import infrastructure** that should exist for the entire application lifetime.

```typescript
// core/core.module.ts
@NgModule({
  providers: [
    AuthService,
    TokenService,
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  imports: [
    HttpClientModule,
  ]
})
export class CoreModule {
  // Guard against re-importing (CRITICAL in enterprise apps)
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule already loaded. Import only in AppModule.'
      );
    }
  }
}
```

**What belongs in Core:**
- `AuthService`, `TokenService`
- HTTP Interceptors
- Global Error Handler
- Logger service
- App-level guards (`AuthGuard`, `RoleGuard`)
- App-level resolvers

**What does NOT belong in Core:**
- Feature services (those belong in their feature module)
- UI components (those belong in Shared)

---

## Shared Module

The `SharedModule` contains **reusable UI components, directives, and pipes** that are imported by multiple feature modules.

```typescript
// shared/shared.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ModalComponent,
    TruncatePipe,
    DateFormatPipe,
    CurrencyFormatPipe,
    ClickOutsideDirective,
    InfiniteScrollDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TruncatePipe,
    DateFormatPipe,
  ]
})
export class SharedModule {}
```

**Rules for SharedModule:**
- Contains NO services (services in SharedModule can cause unintended multiple instances)
- Only `declarations` and re-exported Angular modules
- Must be imported in every feature module that needs it

---

## Domain Module Pattern

For very large enterprise applications, add a **Domain module** layer between Core and Features. This encapsulates cross-cutting domain logic used by multiple features.

```
app/
├── domain/
│   ├── user/
│   │   ├── user.model.ts        (interface User)
│   │   ├── user.repository.ts   (abstract class — defines the contract)
│   │   └── user-domain.module.ts
│   ├── product/
│   └── order/
├── features/
│   ├── products/
│   │   └── (uses ProductRepository — doesn't care about implementation)
│   └── admin/
│       └── (also uses ProductRepository — same contract)
├── infrastructure/
│   └── api/
│       └── product-api.repository.ts  (implements ProductRepository)
```

This is the **Dependency Inversion Principle** applied to Angular. Features depend on abstractions, not concrete implementations.

```typescript
// domain/product/product.repository.ts
export abstract class ProductRepository {
  abstract getAll(filters: ProductFilters): Observable<Product[]>;
  abstract getById(id: string): Observable<Product>;
  abstract create(data: CreateProductDto): Observable<Product>;
}

// infrastructure/api/product-api.repository.ts
@Injectable()
export class ProductApiRepository extends ProductRepository {
  constructor(private http: HttpClient) { super(); }

  getAll(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products', { params: { ...filters } });
  }
}

// feature module registration
@NgModule({
  providers: [
    { provide: ProductRepository, useClass: ProductApiRepository }
    // In tests: { provide: ProductRepository, useClass: MockProductRepository }
  ]
})
```

---

## Enterprise Architecture Diagram

```svg
<svg viewBox="0 0 760 640" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="760" height="640" fill="#080c14" rx="14"/>
  <text x="380" y="38" text-anchor="middle" fill="#f1f5f9" font-size="18" font-weight="700">Enterprise Angular Architecture</text>

  <!-- AppModule -->
  <rect x="290" y="56" width="180" height="44" rx="8" fill="#1e2535" stroke="#6366f1" stroke-width="2"/>
  <text x="380" y="74" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="700">AppModule</text>
  <text x="380" y="90" text-anchor="middle" fill="#4b5563" font-size="10">Bootstrap · Router</text>

  <line x1="380" y1="100" x2="380" y2="118" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ea1)"/>

  <!-- Core + Shared -->
  <rect x="80" y="118" width="220" height="64" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="190" y="140" text-anchor="middle" fill="#86efac" font-size="13" font-weight="700">CoreModule</text>
  <text x="190" y="157" text-anchor="middle" fill="#4b5563" font-size="10">AuthService · Interceptors</text>
  <text x="190" y="171" text-anchor="middle" fill="#4b5563" font-size="10">Guards · Error Handler · Logger</text>

  <rect x="460" y="118" width="220" height="64" rx="8" fill="#1e1a0f" stroke="#f59e0b" stroke-width="2"/>
  <text x="570" y="140" text-anchor="middle" fill="#fde047" font-size="13" font-weight="700">SharedModule</text>
  <text x="570" y="157" text-anchor="middle" fill="#4b5563" font-size="10">ButtonComponent · Pipes</text>
  <text x="570" y="171" text-anchor="middle" fill="#4b5563" font-size="10">Directives · Modal · Spinner</text>

  <line x1="340" y1="100" x2="240" y2="118" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="420" y1="100" x2="520" y2="118" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Domain layer -->
  <rect x="200" y="220" width="360" height="50" rx="8" fill="#1a0e20" stroke="#a855f7" stroke-width="1.5"/>
  <text x="380" y="241" text-anchor="middle" fill="#d8b4fe" font-size="12" font-weight="700">Domain Layer</text>
  <text x="380" y="258" text-anchor="middle" fill="#4b5563" font-size="10">Models · Interfaces · Abstract Repositories · Business Rules</text>

  <line x1="380" y1="182" x2="380" y2="220" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Features row label -->
  <text x="380" y="300" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Feature Modules (Lazy Loaded)</text>

  <!-- Auth Feature -->
  <rect x="30" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#ec4899" stroke-width="1.5"/>
  <text x="95" y="336" text-anchor="middle" fill="#f9a8d4" font-size="11" font-weight="600">auth/</text>
  <text x="95" y="354" text-anchor="middle" fill="#4b5563" font-size="9">LoginComponent</text>
  <text x="95" y="368" text-anchor="middle" fill="#4b5563" font-size="9">RegisterComponent</text>
  <text x="95" y="382" text-anchor="middle" fill="#4b5563" font-size="9">AuthGuard</text>
  <text x="95" y="396" text-anchor="middle" fill="#4b5563" font-size="9">AuthStore</text>

  <!-- Products Feature -->
  <rect x="175" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="240" y="336" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600">products/</text>
  <text x="240" y="354" text-anchor="middle" fill="#4b5563" font-size="9">ProductListComponent</text>
  <text x="240" y="368" text-anchor="middle" fill="#4b5563" font-size="9">ProductDetailComponent</text>
  <text x="240" y="382" text-anchor="middle" fill="#4b5563" font-size="9">ProductService</text>
  <text x="240" y="396" text-anchor="middle" fill="#4b5563" font-size="9">ProductsStore</text>

  <!-- Cart Feature -->
  <rect x="320" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#f97316" stroke-width="1.5"/>
  <text x="385" y="336" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="600">cart/</text>
  <text x="385" y="354" text-anchor="middle" fill="#4b5563" font-size="9">CartComponent</text>
  <text x="385" y="368" text-anchor="middle" fill="#4b5563" font-size="9">CartItemComponent</text>
  <text x="385" y="382" text-anchor="middle" fill="#4b5563" font-size="9">CartService</text>
  <text x="385" y="396" text-anchor="middle" fill="#4b5563" font-size="9">CartStore</text>

  <!-- Orders Feature -->
  <rect x="465" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#22c55e" stroke-width="1.5"/>
  <text x="530" y="336" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">orders/</text>
  <text x="530" y="354" text-anchor="middle" fill="#4b5563" font-size="9">OrderListComponent</text>
  <text x="530" y="368" text-anchor="middle" fill="#4b5563" font-size="9">OrderDetailComponent</text>
  <text x="530" y="382" text-anchor="middle" fill="#4b5563" font-size="9">OrderService</text>
  <text x="530" y="396" text-anchor="middle" fill="#4b5563" font-size="9">OrdersStore</text>

  <!-- Admin Feature -->
  <rect x="610" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#eab308" stroke-width="1.5"/>
  <text x="675" y="336" text-anchor="middle" fill="#fde047" font-size="11" font-weight="600">admin/</text>
  <text x="675" y="354" text-anchor="middle" fill="#4b5563" font-size="9">DashboardComponent</text>
  <text x="675" y="368" text-anchor="middle" fill="#4b5563" font-size="9">UserManagement</text>
  <text x="675" y="382" text-anchor="middle" fill="#4b5563" font-size="9">AdminGuard</text>
  <text x="675" y="396" text-anchor="middle" fill="#4b5563" font-size="9">AdminStore</text>

  <!-- Connect domain to features -->
  <line x1="200" y1="270" x2="95" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="260" y1="270" x2="240" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="380" y1="270" x2="385" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="490" y1="270" x2="530" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="560" y1="270" x2="675" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Infrastructure layer -->
  <rect x="100" y="440" width="560" height="60" rx="8" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="380" y="462" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Infrastructure Layer</text>
  <text x="190" y="482" text-anchor="middle" fill="#4b5563" font-size="10">ProductApiRepository</text>
  <text x="380" y="482" text-anchor="middle" fill="#4b5563" font-size="10">OrderApiRepository</text>
  <text x="570" y="482" text-anchor="middle" fill="#4b5563" font-size="10">LocalStorageService</text>

  <line x1="380" y1="404" x2="380" y2="440" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Backend API -->
  <rect x="270" y="540" width="220" height="44" rx="8" fill="#14110a" stroke="#f97316" stroke-width="1.5"/>
  <text x="380" y="558" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Backend REST API</text>
  <text x="380" y="574" text-anchor="middle" fill="#4b5563" font-size="10">Node.js / .NET / Java / Python</text>

  <line x1="380" y1="500" x2="380" y2="540" stroke="#f97316" stroke-width="1.5" marker-end="url(#ea2)"/>

  <!-- Legend -->
  <rect x="30" y="540" width="200" height="82" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="130" y="558" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Legend</text>
  <rect x="42" y="566" width="10" height="10" rx="2" fill="#22c55e"/>
  <text x="58" y="575" fill="#94a3b8" font-size="9">Singleton / App-wide</text>
  <rect x="42" y="582" width="10" height="10" rx="2" fill="#6366f1"/>
  <text x="58" y="591" fill="#94a3b8" font-size="9">Module boundary</text>
  <rect x="42" y="598" width="10" height="10" rx="2" fill="#a855f7"/>
  <text x="58" y="607" fill="#94a3b8" font-size="9">Domain abstraction</text>
  <text x="58" y="617" fill="#4b5563" font-size="9" font-style="italic">--- = dependency (not import)</text>

  <defs>
    <marker id="ea1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
    <marker id="ea2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f97316"/></marker>
  </defs>
</svg>
```

---

# 2. Authentication & Authorization

## Why JWT?

Enterprise applications separate the **frontend** (Angular SPA) from the **backend** (REST API). Traditional session-based auth doesn't work well here — the server would need to share session state across multiple API instances (load balancing problem).

JWT solves this by making authentication **stateless**: the token itself carries all claims the server needs to verify the user.

---

## JWT Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   Header (base64)
.eyJzdWIiOiIxMjM0Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzM0MDAwMDAwfQ==  Payload (base64)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  Signature
```

**Decoded payload:**
```json
{
  "sub": "user-uuid-123",
  "email": "alice@company.com",
  "role": "ADMIN",
  "permissions": ["products:write", "orders:read"],
  "iat": 1700000000,
  "exp": 1700003600
}
```

**Security rules:**
- Access tokens: short-lived (15 minutes to 1 hour)
- Refresh tokens: long-lived (7–30 days), stored in `httpOnly` cookies — never localStorage
- Never store access tokens in localStorage (XSS vulnerable) — use memory

---

## Token Service

```typescript
@Injectable({ providedIn: 'root' })
export class TokenService {
  private accessToken: string | null = null; // In-memory only

  setAccessToken(token: string): void {
    this.accessToken = token;
    const payload = this.decodePayload(token);
    sessionStorage.setItem('token_exp', payload.exp.toString());
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearTokens(): void {
    this.accessToken = null;
    sessionStorage.removeItem('token_exp');
  }

  isTokenExpiredOrExpiringSoon(): boolean {
    const exp = sessionStorage.getItem('token_exp');
    if (!exp) return true;
    const expiresAt = parseInt(exp, 10) * 1000;
    const bufferMs = 60_000; // refresh 60s before expiry
    return Date.now() >= (expiresAt - bufferMs);
  }

  private decodePayload(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
```

---

## Auth Interceptor — Auto Token Refresh

The most critical piece of enterprise Angular auth code. Handles token refresh with request queuing:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthEndpoint(req.url)) {
      return next.handle(req);
    }

    return next.handle(this.addAuthHeader(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getAccessToken();
    if (!token) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      // Queue: wait for the ongoing refresh
      return this.refreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthHeader(req)))
      );
    }

    this.isRefreshing = true;
    this.refreshSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap(newToken => {
        this.isRefreshing = false;
        this.refreshSubject.next(newToken);
        return next.handle(this.addAuthHeader(req));
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(() => err);
      })
    );
  }

  private isAuthEndpoint(url: string): boolean {
    return url.includes('/auth/login') || url.includes('/auth/refresh');
  }
}
```

---

## Route Guards (AuthGuard + RoleGuard)

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuth => {
        if (isAuth) return true;
        return this.router.createUrlTree(['/login'], {
          queryParams: { returnUrl: route.url.join('/') }
        });
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRoles: string[] = route.data['roles'] ?? [];
    const userRoles = this.authService.getUserRoles();
    const hasRole = requiredRoles.some(r => userRoles.includes(r));
    return hasRole ? true : this.router.createUrlTree(['/forbidden']);
  }
}

// Usage:
{
  path: 'admin',
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
}
```

---

## Auth Flow Diagram

```svg
<svg viewBox="0 0 700 620" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="700" height="620" fill="#080c14" rx="12"/>
  <text x="350" y="36" text-anchor="middle" fill="#f1f5f9" font-size="17" font-weight="700">JWT Auth + Token Refresh Flow</text>

  <rect x="255" y="58" width="190" height="48" rx="8" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="78" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600">User Login</text>
  <text x="350" y="96" text-anchor="middle" fill="#4b5563" font-size="10">POST /api/auth/login</text>

  <line x1="350" y1="106" x2="350" y2="132" stroke="#6366f1" stroke-width="2" marker-end="url(#au1)"/>

  <rect x="230" y="132" width="240" height="60" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="153" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Auth Server</text>
  <text x="350" y="169" text-anchor="middle" fill="#4b5563" font-size="10">Validate credentials</text>
  <text x="350" y="183" text-anchor="middle" fill="#4b5563" font-size="10">Sign JWT (RS256 / HS256)</text>

  <line x1="350" y1="192" x2="350" y2="218" stroke="#22c55e" stroke-width="2" marker-end="url(#au2)"/>

  <rect x="170" y="218" width="360" height="64" rx="8" fill="#1a1008" stroke="#f97316" stroke-width="2"/>
  <text x="350" y="239" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Token Response</text>
  <text x="230" y="258" text-anchor="middle" fill="#4b5563" font-size="10">accessToken (15min)</text>
  <text x="230" y="272" text-anchor="middle" fill="#4b5563" font-size="10">stored in memory</text>
  <text x="470" y="258" text-anchor="middle" fill="#4b5563" font-size="10">refreshToken (7d)</text>
  <text x="470" y="272" text-anchor="middle" fill="#4b5563" font-size="10">httpOnly cookie</text>
  <line x1="350" y1="250" x2="350" y2="278" stroke="#475569" stroke-width="1"/>

  <line x1="350" y1="282" x2="350" y2="308" stroke="#f97316" stroke-width="2" marker-end="url(#au3)"/>

  <rect x="195" y="308" width="310" height="64" rx="8" fill="#1e1020" stroke="#a855f7" stroke-width="2"/>
  <text x="350" y="330" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">Auth Interceptor</text>
  <text x="350" y="348" text-anchor="middle" fill="#4b5563" font-size="10">Attaches: Authorization: Bearer token</text>
  <text x="350" y="363" text-anchor="middle" fill="#4b5563" font-size="10">Handles 401 → triggers refresh flow</text>

  <line x1="350" y1="372" x2="350" y2="398" stroke="#a855f7" stroke-width="2" marker-end="url(#au4)"/>

  <rect x="215" y="398" width="270" height="52" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="420" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Protected API Endpoint</text>
  <text x="350" y="438" text-anchor="middle" fill="#4b5563" font-size="10">Server verifies JWT signature + expiry</text>

  <!-- 401 Refresh path -->
  <path d="M 485 424 Q 580 424 580 350 Q 580 280 485 280" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#au5)"/>
  <text x="614" y="346" fill="#ef4444" font-size="9" text-anchor="middle">401 Expired</text>
  <text x="614" y="358" fill="#ef4444" font-size="9" text-anchor="middle">POST /refresh</text>
  <text x="614" y="370" fill="#ef4444" font-size="9" text-anchor="middle">(cookie auto-sent)</text>

  <line x1="350" y1="450" x2="350" y2="478" stroke="#22c55e" stroke-width="2" marker-end="url(#au6)"/>

  <rect x="160" y="478" width="380" height="64" rx="8" fill="#1e1e0a" stroke="#eab308" stroke-width="2"/>
  <text x="350" y="498" text-anchor="middle" fill="#fde047" font-size="12" font-weight="600">Route Guards</text>
  <rect x="180" y="508" width="140" height="26" rx="5" fill="#14120a" stroke="#eab308" stroke-width="1"/>
  <text x="250" y="525" text-anchor="middle" fill="#fde047" font-size="10">AuthGuard</text>
  <rect x="380" y="508" width="140" height="26" rx="5" fill="#14120a" stroke="#eab308" stroke-width="1"/>
  <text x="450" y="525" text-anchor="middle" fill="#fde047" font-size="10">RoleGuard (RBAC)</text>

  <line x1="350" y1="542" x2="350" y2="566" stroke="#eab308" stroke-width="2" marker-end="url(#au7)"/>

  <rect x="255" y="566" width="190" height="40" rx="8" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="582" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="600">Protected Component</text>
  <text x="350" y="597" text-anchor="middle" fill="#4b5563" font-size="10">Rendered only if guard passes</text>

  <defs>
    <marker id="au1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
    <marker id="au2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#22c55e"/></marker>
    <marker id="au3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f97316"/></marker>
    <marker id="au4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#a855f7"/></marker>
    <marker id="au5" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ef4444"/></marker>
    <marker id="au6" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#22c55e"/></marker>
    <marker id="au7" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#eab308"/></marker>
  </defs>
</svg>
```

---

# 3. HTTP Client

## Enterprise Base API Service

```typescript
@Injectable()
export abstract class ApiService {
  protected readonly baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected get<T>(path: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params: this.buildParams(params)
    });
  }

  protected post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path: string, body: Partial<any>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let p = new HttpParams();
    if (!params) return p;
    Object.entries(params)
      .filter(([, v]) => v !== null && v !== undefined)
      .forEach(([k, v]) => p = p.set(k, v));
    return p;
  }
}

// Feature service extending the base
@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  constructor(http: HttpClient) { super(http); }

  getAll(filters: ProductFilters): Observable<PaginatedResponse<Product>> {
    return this.get<PaginatedResponse<Product>>('/products', filters);
  }

  getById(id: string): Observable<Product> {
    return this.get<Product>(`/products/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.post<Product>('/products', dto);
  }

  update(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.put<Product>(`/products/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.delete<void>(`/products/${id}`);
  }
}
```

---

## Global Error Interceptor

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifications: NotificationService,
    private logger: LoggingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error('HTTP Error', { url: req.url, status: error.status });

        switch (error.status) {
          case 400: this.notifications.error(error.error?.message ?? 'Bad request'); break;
          case 403: this.notifications.error('You do not have permission.'); break;
          case 404: this.notifications.error('Resource not found.'); break;
          case 422: this.notifications.error(error.error?.message ?? 'Validation failed.'); break;
          case 500:
          case 503: this.notifications.error('Server error. Please try again.'); break;
          default: this.notifications.error('An unexpected error occurred.'); break;
        }

        return throwError(() => error);
      })
    );
  }
}
```

---

## Retry + Loading State Pattern

```typescript
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function withLoadingState<T>(source$: Observable<T>): Observable<AsyncState<T>> {
  return merge(
    of({ data: null, loading: true, error: null }),
    source$.pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(err => of({ data: null, loading: false, error: err.message }))
    )
  );
}

// In component — zero boilerplate loading state
@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <app-spinner *ngIf="state.loading"></app-spinner>
      <app-error *ngIf="state.error" [message]="state.error"></app-error>
      <app-product-list *ngIf="state.data" [products]="state.data"></app-product-list>
    </ng-container>
  `
})
export class ProductPageComponent {
  state$ = withLoadingState(
    this.productService.getAll({ page: 1 }).pipe(
      retry({ count: 3, delay: (_, n) => timer(Math.pow(2, n) * 1000) })
    )
  );
}
```

---

# 4. Testing

## Why Testing Is Non-Negotiable in Enterprise

In a team of 20 engineers, no one can hold the entire system in their head. Tests are the **executable specification** of your system's behavior. Without them: refactoring is dangerous, onboarding is slow, deployments are terrifying, code quality decays.

---

## Unit Testing — Services

```typescript
describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService]
    });

    service = TestBed.inject(ProductApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should fetch products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Laptop', price: 999 }
    ];

    service.getAll({ page: 1 }).subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Laptop');
    });

    const req = httpController.expectOne('/api/products?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle 404 error', () => {
    service.getById('nonexistent').subscribe({
      error: (err) => expect(err.status).toBe(404)
    });

    const req = httpController.expectOne('/api/products/nonexistent');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
```

---

## Unit Testing — Components

```typescript
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [SharedModule],
      providers: [{ provide: ProductService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should display products after load', () => {
    const mockProducts = [{ id: '1', name: 'Laptop', price: 999 }];
    productServiceSpy.getAll.and.returnValue(of(mockProducts));

    fixture.detectChanges(); // triggers ngOnInit

    const cards = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(cards.length).toBe(1);
  });

  it('should show loading spinner while loading', () => {
    productServiceSpy.getAll.and.returnValue(new Subject<Product[]>());
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('app-loading-spinner'));
    expect(spinner).toBeTruthy();
  });
});
```

---

## Testing NgRx Effects

```typescript
describe('ProductsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductsEffects;
  let productService: jasmine.SpyObj<ProductApiService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('ProductApiService', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductApiService, useValue: serviceSpy }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
    productService = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
  });

  it('dispatches loadProductsSuccess on success', () => {
    const mockProducts = [{ id: '1', name: 'Laptop' }];
    productService.getAll.and.returnValue(of(mockProducts));
    actions$ = of(loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(loadProductsSuccess({ products: mockProducts }));
    });
  });
});
```

---

## E2E Testing with Cypress

```typescript
describe('Product List Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products*', { fixture: 'products.json' }).as('getProducts');

    cy.request('POST', '/api/auth/login', {
      email: 'test@example.com', password: 'password123'
    }).then(({ body }) => sessionStorage.setItem('token_exp', body.tokenExp));

    cy.visit('/products');
    cy.wait('@getProducts');
  });

  it('displays product cards', () => {
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('adds product to cart', () => {
    cy.intercept('POST', '/api/cart/items', { statusCode: 201 }).as('addToCart');
    cy.get('[data-cy="product-card"]').first().find('[data-cy="add-to-cart-btn"]').click();
    cy.wait('@addToCart');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
  });
});
```

---

## Testing Pyramid Diagram

```svg
<svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="700" height="440" fill="#080c14" rx="12"/>
  <text x="350" y="34" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Angular Testing Pyramid</text>

  <!-- E2E base -->
  <polygon points="50,390 650,390 500,294 200,294" fill="#1a1008" stroke="#f97316" stroke-width="2"/>
  <text x="350" y="348" text-anchor="middle" fill="#fdba74" font-size="13" font-weight="600">E2E Tests (Cypress / Playwright)</text>
  <text x="350" y="366" text-anchor="middle" fill="#4b5563" font-size="10">Full user flows · Slowest · Highest confidence · ~10% of tests</text>
  <text x="350" y="381" text-anchor="middle" fill="#4b5563" font-size="10">Real browser · Intercepted API · data-cy selectors</text>

  <!-- Integration middle -->
  <polygon points="200,294 500,294 420,190 280,190" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="238" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Integration Tests (TestBed)</text>
  <text x="350" y="256" text-anchor="middle" fill="#4b5563" font-size="10">Component + template + child components · ~20%</text>
  <text x="350" y="272" text-anchor="middle" fill="#4b5563" font-size="10">NgRx Effects · Guard + Router integration</text>

  <!-- Unit top -->
  <polygon points="280,190 420,190 390,110 310,110" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="148" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="600">Unit Tests (Jasmine)</text>
  <text x="350" y="163" text-anchor="middle" fill="#4b5563" font-size="9">Pure functions · Services · Reducers · ~70%</text>
  <text x="350" y="176" text-anchor="middle" fill="#4b5563" font-size="9">Fastest · Isolated · Most numerous</text>

  <!-- Apex -->
  <polygon points="310,110 390,110 350,60" fill="#2d1e3a" stroke="#a855f7" stroke-width="1.5"/>
  <text x="350" y="93" text-anchor="middle" fill="#d8b4fe" font-size="10" font-weight="600">Smoke</text>

  <!-- Tools legend -->
  <rect x="30" y="50" width="170" height="115" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="115" y="68" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Tools</text>
  <text x="42" y="84" fill="#a5b4fc" font-size="9">Unit: Jasmine + Karma</text>
  <text x="42" y="100" fill="#86efac" font-size="9">Integration: TestBed</text>
  <text x="42" y="116" fill="#fdba74" font-size="9">E2E: Cypress / Playwright</text>
  <text x="42" y="132" fill="#d8b4fe" font-size="9">Mocking: createSpyObj()</text>
  <text x="42" y="148" fill="#67e8f9" font-size="9">HTTP: HttpTestingController</text>
  <text x="42" y="163" fill="#fde047" font-size="9">NgRx: provideMockActions</text>

  <!-- Ratio guide -->
  <rect x="500" y="50" width="170" height="100" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="585" y="68" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Ideal Ratios</text>
  <text x="515" y="84" fill="#a5b4fc" font-size="9">Unit: ~70% of all tests</text>
  <text x="515" y="100" fill="#86efac" font-size="9">Integration: ~20%</text>
  <text x="515" y="116" fill="#fdba74" font-size="9">E2E: ~10%</text>
  <text x="515" y="132" fill="#4b5563" font-size="9">E2E catches what units miss</text>
  <text x="515" y="148" fill="#4b5563" font-size="9">Don't obsess over 100% coverage</text>
</svg>
```

---

# 5. Deployment

## Environment Files

```typescript
// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  sentryDsn: '',
  featureFlags: { newCheckout: true, betaSearch: false }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.mycompany.com/api',
  sentryDsn: 'https://abc@sentry.io/12345',
  featureFlags: { newCheckout: true, betaSearch: false }
};
```

## Production Build

```bash
ng build --configuration production

# Analyze bundle
ng build --configuration production --stats-json
npx webpack-bundle-analyzer dist/my-app/stats.json
```

## Docker — Multi-Stage Build

```dockerfile
# Stage 1: Build Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Nginx to serve
FROM nginx:1.25-alpine AS runtime
COPY --from=builder /app/dist/my-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Nginx — Critical SPA Config

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "default-src 'self';" always;

    # Gzip
    gzip on;
    gzip_types text/plain application/javascript text/css;

    # Cache hashed assets aggressively
    location ~* \.(js|css|png|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # CRITICAL: Angular SPA routing — ALL routes serve index.html
    # Without this, direct links (e.g. /products/123) return 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Never cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

## CI/CD Pipeline (GitHub Actions)

```yaml
name: Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --watch=false --browsers=ChromeHeadless

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build -- --configuration production
      - name: Build & push Docker image
        run: |
          docker build -t registry.example.com/myapp:${{ github.sha }} .
          docker push registry.example.com/myapp:${{ github.sha }}
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/angular-app \
            angular-app=registry.example.com/myapp:${{ github.sha }}
          kubectl rollout status deployment/angular-app
```

---

# 6. Enterprise Best Practices

## Canonical Folder Structure

```
src/app/
├── core/
│   ├── guards/          auth.guard.ts, role.guard.ts
│   ├── interceptors/    auth.interceptor.ts, error.interceptor.ts
│   ├── services/        auth.service.ts, token.service.ts, logging.service.ts
│   └── core.module.ts
│
├── shared/
│   ├── components/      button/, modal/, empty-state/, loading-spinner/
│   ├── pipes/           currency-format.pipe.ts, truncate.pipe.ts
│   ├── directives/      click-outside.directive.ts
│   └── shared.module.ts
│
├── features/
│   ├── auth/
│   │   ├── components/  login/, register/
│   │   ├── store/       auth.actions.ts, auth.effects.ts, auth.reducer.ts, auth.selectors.ts
│   │   └── auth.module.ts
│   │
│   ├── products/
│   │   ├── components/  product-list/ (smart), product-card/ (dumb), product-detail/
│   │   ├── models/      product.model.ts, product-filter.model.ts
│   │   ├── services/    product-api.service.ts
│   │   ├── store/       products.actions|effects|reducer|selectors.ts
│   │   └── products.module.ts
│   │
│   └── ... (cart, orders, admin)
│
├── app-routing.module.ts
└── app.module.ts
```

## Naming Conventions

```
Files:          feature-name.component.ts, feature-name.service.ts
Classes:        ProductListComponent, ProductApiService  (PascalCase + suffix)
Interfaces:     interface Product (NO "I" prefix — modern Angular convention)
Observables:    products$, currentUser$, loading$  ($ suffix)
Constants:      API_TIMEOUT_MS = 30_000  (SCREAMING_SNAKE_CASE)
Actions:        [Source] Event  →  '[Users Page] Load Users'
```

## Smart vs Dumb Components

```typescript
// SMART: knows about store, orchestrates
@Component({
  template: `
    <app-product-list
      [products]="products$ | async"
      [loading]="loading$ | async"
      (addToCart)="onAddToCart($event)"
    ></app-product-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {
  products$ = this.store.select(selectAllProducts);
  loading$  = this.store.select(selectProductsLoading);
  constructor(private store: Store) { this.store.dispatch(loadProducts()); }
  onAddToCart(product: Product) { this.store.dispatch(addToCart({ product })); }
}

// DUMB: pure UI, @Input/@Output only, zero dependencies
@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products: Product[] | null = [];
  @Input() loading: boolean | null = false;
  @Output() addToCart = new EventEmitter<Product>();
  trackById = (_: number, p: Product) => p.id;
  // Fully testable with mock @Input values — no service mocking needed
}
```

## Security Checklist

```typescript
// 1. Angular auto-sanitizes [innerHTML] — never bypass DomSanitizer with user input
// 2. HttpParams auto-encodes query params — prevents injection
// 3. Never store refresh tokens in localStorage — use httpOnly cookies
// 4. Route guards on EVERY protected route
// 5. Server-side authorization is the REAL security — Angular guards are UX only
// 6. Content Security Policy header in nginx
// 7. Audit dependencies: npm audit --audit-level=high
```

---

# 7. Final Large Project: Enterprise E-Commerce Platform

## Full Architecture

```
enterprise-ecommerce/
├── src/app/
│   ├── core/          (AuthService, TokenService, Interceptors, Guards)
│   ├── shared/        (UI library: Button, Modal, Form, Pipes, Directives)
│   ├── features/
│   │   ├── auth/      (Login, Register, Forgot, OAuth)
│   │   ├── products/  (Catalog, Search, Filters, Detail, Reviews)
│   │   ├── cart/      (Drawer, Item management, Quantity, Promo codes)
│   │   ├── checkout/  (Multi-step: Shipping → Payment → Confirmation)
│   │   ├── orders/    (History, Tracking, Returns, Invoices)
│   │   ├── account/   (Profile, Addresses, Payment methods, Wishlist)
│   │   └── admin/     (Dashboard, Product CRUD, Orders, Users, Analytics)
│   ├── store/         (Root NgRx: AppState configuration)
│   ├── app-routing.module.ts
│   └── app.module.ts
└── environments/
```

## Root State

```typescript
export interface AppState {
  auth:     AuthState;     // { user, loading, error }
  products: ProductsState; // EntityAdapter normalized + filters + pagination
  cart:     CartState;     // { items, promoCode, discount, loading }
  orders:   OrdersState;   // { ids, entities, loading }
  ui:       UIState;       // { sidebarOpen, theme, notifications }
}
```

## Cart — Complete NgRx Implementation

```typescript
// Actions
export const addToCart      = createAction('[Cart] Add',    props<{ product: Product; quantity: number }>());
export const removeFromCart = createAction('[Cart] Remove', props<{ productId: string }>());
export const updateQty      = createAction('[Cart] Update', props<{ productId: string; quantity: number }>());
export const clearCart      = createAction('[Cart] Clear');

// Reducer (immutable)
export const cartReducer = createReducer(initialCartState,
  on(addToCart, (state, { product, quantity }) => {
    const existing = state.items.find(i => i.productId === product.id);
    if (existing) {
      return { ...state, items: state.items.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
      )};
    }
    return { ...state, items: [...state.items, { productId: product.id, name: product.name,
      price: product.price, imageUrl: product.imageUrl, quantity }]
    };
  }),
  on(removeFromCart, (s, { productId }) => ({ ...s, items: s.items.filter(i => i.productId !== productId) })),
  on(clearCart, () => initialCartState)
);

// Selectors
export const selectCartItems    = createSelector(selectCartState, s => s.items);
export const selectCartCount    = createSelector(selectCartItems, items => items.reduce((s, i) => s + i.quantity, 0));
export const selectCartSubtotal = createSelector(selectCartItems, items => items.reduce((s, i) => s + i.price * i.quantity, 0));
export const selectCartTotal    = createSelector(selectCartSubtotal, selectCartState,
  (subtotal, state) => subtotal * (1 - state.discount));
```

## Product Search Effects

```typescript
@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts, applyFilters, changePage),
      withLatestFrom(this.store.select(selectProductFilters)),
      switchMap(([, filters]) =>
        this.productApi.getAll(filters).pipe(
          map(res => loadProductsSuccess({ products: res.data, pagination: res.meta })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Debounced search
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSearchQuery),
      debounceTime(400),
      distinctUntilChanged((a, b) => a.query === b.query),
      map(() => loadProducts())
    )
  );
}
```

## Admin Routing (RBAC)

```typescript
const adminRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['ADMIN'] },
  children: [
    { path: 'dashboard',  component: AdminDashboardComponent },
    { path: 'products',   component: AdminProductListComponent },
    { path: 'products/new', component: AdminProductFormComponent },
    { path: 'products/:id/edit', component: AdminProductFormComponent },
    { path: 'orders',     component: AdminOrdersComponent },
    { path: 'users',      component: AdminUsersComponent },
    { path: 'analytics',  component: AdminAnalyticsComponent }
  ]
}];
```

---

## E-Commerce Full Architecture Diagram

```svg
<svg viewBox="0 0 760 700" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="760" height="700" fill="#060a10" rx="14"/>
  <text x="380" y="36" text-anchor="middle" fill="#f1f5f9" font-size="17" font-weight="700">Enterprise E-Commerce — Full Architecture</text>

  <rect x="300" y="56" width="160" height="38" rx="7" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="380" y="80" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="600">Browser (Angular SPA)</text>

  <rect x="260" y="118" width="240" height="36" rx="7" fill="#1e1e0f" stroke="#eab308" stroke-width="1.5"/>
  <text x="380" y="141" text-anchor="middle" fill="#fde047" font-size="11" font-weight="600">Angular Router + Guards (AuthGuard, RoleGuard)</text>

  <line x1="380" y1="94" x2="380" y2="118" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ec1)"/>

  <text x="380" y="178" text-anchor="middle" fill="#64748b" font-size="10">Lazy-Loaded Feature Modules</text>

  <rect x="20" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#ec4899" stroke-width="1.5"/>
  <text x="70" y="210" text-anchor="middle" fill="#f9a8d4" font-size="10" font-weight="600">auth/</text>
  <text x="70" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Login · Register</text>
  <text x="70" y="238" text-anchor="middle" fill="#4b5563" font-size="8">OAuth · JWT</text>

  <rect x="132" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="182" y="210" text-anchor="middle" fill="#67e8f9" font-size="10" font-weight="600">products/</text>
  <text x="182" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Catalog · Search</text>
  <text x="182" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Filter · Detail</text>

  <rect x="244" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#f97316" stroke-width="1.5"/>
  <text x="294" y="210" text-anchor="middle" fill="#fdba74" font-size="10" font-weight="600">cart/</text>
  <text x="294" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Drawer · Items</text>
  <text x="294" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Promo Codes</text>

  <rect x="356" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#a855f7" stroke-width="1.5"/>
  <text x="406" y="210" text-anchor="middle" fill="#d8b4fe" font-size="10" font-weight="600">checkout/</text>
  <text x="406" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Multi-step</text>
  <text x="406" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Payment · Confirm</text>

  <rect x="468" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#22c55e" stroke-width="1.5"/>
  <text x="518" y="210" text-anchor="middle" fill="#86efac" font-size="10" font-weight="600">orders/</text>
  <text x="518" y="226" text-anchor="middle" fill="#4b5563" font-size="8">History · Track</text>
  <text x="518" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Returns</text>

  <rect x="580" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#eab308" stroke-width="1.5"/>
  <text x="630" y="210" text-anchor="middle" fill="#fde047" font-size="10" font-weight="600">admin/</text>
  <text x="630" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Dashboard · CRUD</text>
  <text x="630" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Analytics</text>

  <line x1="310" y1="154" x2="70"  y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="340" y1="154" x2="182" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="365" y1="154" x2="294" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="390" y1="154" x2="406" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="415" y1="154" x2="518" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="445" y1="154" x2="630" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- NgRx Store -->
  <rect x="160" y="282" width="440" height="72" rx="8" fill="#110e1e" stroke="#a855f7" stroke-width="2"/>
  <text x="380" y="302" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">NgRx Store (AppState)</text>
  <rect x="180" y="312" width="68" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="214" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">AuthState</text>
  <rect x="260" y="312" width="80" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="300" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">ProductsState</text>
  <rect x="352" y="312" width="65" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="384" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">CartState</text>
  <rect x="429" y="312" width="72" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="465" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">OrdersState</text>
  <rect x="513" y="312" width="60" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="543" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">UIState</text>

  <line x1="380" y1="244" x2="380" y2="282" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#ec2)"/>

  <!-- Effects -->
  <rect x="160" y="390" width="440" height="52" rx="8" fill="#1a1008" stroke="#f97316" stroke-width="1.5"/>
  <text x="380" y="412" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">NgRx Effects</text>
  <text x="380" y="430" text-anchor="middle" fill="#4b5563" font-size="10">ProductsEffects · CartEffects · AuthEffects · OrdersEffects</text>

  <line x1="380" y1="354" x2="380" y2="390" stroke="#f97316" stroke-width="1.5" marker-end="url(#ec3)"/>

  <!-- Interceptors -->
  <rect x="200" y="478" width="360" height="52" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="380" y="498" text-anchor="middle" fill="#86efac" font-size="12" font-weight="600">HTTP Interceptors</text>
  <text x="280" y="518" text-anchor="middle" fill="#4b5563" font-size="9">AuthInterceptor</text>
  <text x="380" y="518" text-anchor="middle" fill="#4b5563" font-size="9">ErrorInterceptor</text>
  <text x="480" y="518" text-anchor="middle" fill="#4b5563" font-size="9">LoadingInterceptor</text>

  <line x1="380" y1="442" x2="380" y2="478" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ec4)"/>

  <!-- REST API -->
  <rect x="230" y="566" width="300" height="52" rx="8" fill="#14110a" stroke="#f97316" stroke-width="2"/>
  <text x="380" y="586" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Backend REST API</text>
  <text x="290" y="606" text-anchor="middle" fill="#4b5563" font-size="9">/products · /cart</text>
  <text x="430" y="606" text-anchor="middle" fill="#4b5563" font-size="9">/orders · /auth · /admin</text>

  <line x1="380" y1="530" x2="380" y2="566" stroke="#f97316" stroke-width="1.5" marker-end="url(#ec5)"/>

  <!-- Databases -->
  <rect x="100" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="180" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">PostgreSQL</text>
  <rect x="300" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="380" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">Redis (Cache)</text>
  <rect x="500" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="580" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">Elasticsearch</text>

  <line x1="320" y1="618" x2="180" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="380" y1="618" x2="380" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="440" y1="618" x2="580" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>

  <defs>
    <marker id="ec1" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#6366f1"/></marker>
    <marker id="ec2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#a855f7"/></marker>
    <marker id="ec3" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f97316"/></marker>
    <marker id="ec4" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#22c55e"/></marker>
    <marker id="ec5" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f97316"/></marker>
  </defs>
</svg>
```

---

# 8. Interview Questions

## Architecture & Module Design (1–15)

**1. What is the difference between CoreModule, SharedModule, and feature modules?**
CoreModule: singleton services, interceptors, guards — imported ONCE in AppModule. SharedModule: reusable UI components, directives, pipes — imported in any feature that needs them. Feature modules: everything owned by one business domain (components, services, store) — lazy-loaded on demand. CoreModule contains singletons; SharedModule contains stateless UI building blocks; feature modules are vertical domain slices.

**2. What is the CoreModule singleton guard and why is it critical?**
Constructor check: `if (parentModule) throw new Error(...)`. If CoreModule is accidentally imported in a lazy-loaded feature module, Angular creates a second instance of all its provided services — two `AuthService` instances, interceptors firing twice per request, duplicate global state. The guard catches this at startup.

**3. Explain the Smart/Dumb component pattern and its benefits.**
Smart (container) components connect to the store/services and orchestrate data flow. Dumb (presentational) components receive data only via `@Input()` and emit only via `@Output()`. Benefits: dumb components are trivially unit-testable (just pass props), universally reusable, always `OnPush` compatible, and can be visually developed in isolation (Storybook).

**4. How does lazy loading work internally?**
The Angular router uses dynamic `import()` when a lazy route is activated. The CLI creates a separate JS chunk at build time. On route activation, the router fetches the chunk, bootstraps the module, and renders the component. Preloading strategies (`PreloadAllModules`, `QuicklinkStrategy`) download lazy chunks in the background after initial load.

**5. What is the SCAM pattern?**
Single Component Angular Module — one module per component, making each independently lazy-loadable. Useful in Angular 12–14 before standalone components. With Angular 14+ standalone components, SCAM is largely superseded, but the principle (fine-grained code splitting) still applies.

**6. How do you prevent circular dependencies between feature modules?**
Features never import other features. Shared data belongs in domain models or Core. Feature-to-feature communication happens via NgRx Store (dispatch action → select state) or a shared Core service, never via direct component or service cross-imports.

**7. What is Dependency Inversion in Angular architecture?**
Feature modules depend on abstract repository interfaces (e.g., `ProductRepository`), not concrete implementations. The infrastructure layer provides concrete classes (`ProductApiRepository`). Register via `{ provide: ProductRepository, useClass: ProductApiRepository }`. In tests: swap to `{ provide: ProductRepository, useClass: MockProductRepository }`. Features never need to change when the data source changes.

**8. What is a barrel file and what are the tradeoffs?**
An `index.ts` re-exporting from multiple files in a directory. Pro: cleaner imports. Con: circular dependency risks, slows TypeScript compilation in large projects, accidentally exposes internal types. Prefer explicit exports; never use `export * from` broadly.

**9. What is `APP_INITIALIZER` and name a real-world use case.**
It runs factory functions before the app bootstraps — Angular waits for returned Promises/Observables to complete. Real uses: loading feature flags from an API, fetching the current user session (so components start with user data available), loading translation files for i18n, establishing WebSocket connections.

**10. What is `forRoot()` vs `forChild()` in Angular modules?**
`forRoot()` configures a module with providers intended as singletons — called once in AppModule (`RouterModule.forRoot(routes)`, `StoreModule.forRoot(reducers)`). `forChild()` adds feature config without re-providing root singletons — called in feature modules (`RouterModule.forChild(routes)`, `StoreModule.forFeature('products', reducer)`).

**11. How do you share state between two sibling feature modules?**
Via NgRx Store: Module A dispatches an action → Reducer updates shared state slice → Module B selects it. Alternatively, a BehaviorSubject in a Core service. Never directly import between feature modules — that creates coupling and breaks lazy-loading benefits.

**12. What is micro-frontend architecture and how does Angular support it?**
Micro-frontends split a large frontend into independently deployable apps owned by different teams. Angular supports this via: (1) Module Federation (webpack) — teams export Angular components loaded dynamically by a shell app, (2) Angular Elements — compile components as Web Components consumable by any framework.

**13. How do you enforce architecture boundaries in an Nx monorepo?**
Use `@nx/enforce-module-boundaries` ESLint rule with project tags (`type:feature`, `type:shared`, `scope:products`). Define which tag combinations can import each other. Violations fail CI. This prevents a features lib from importing another features lib, enforcing the intended architecture automatically.

**14. What is the difference between `providedIn: 'root'` and providing in a module?**
`providedIn: 'root'` creates a singleton in the root injector — tree-shakeable (removed if never injected). Providing in a module's `providers` creates a singleton scoped to that module's injector hierarchy — not tree-shakeable. Use `providedIn: 'root'` for app-wide singletons; use module providers for services that should have separate instances per lazy-loaded module.

**15. How would you architect a multi-tenant Angular app?**
A tenant-aware config service (loaded from `/api/tenants/{id}/config` or subdomain detection) provides: theme tokens, feature flags, API base URLs, role configurations. Feature modules remain tenant-agnostic; they inject the config service for tenant-specific behavior. JWTs contain tenant claims. CSS custom properties handle tenant theming via `document.documentElement.style.setProperty('--primary', config.primaryColor)`.

---

## Authentication & Security (16–25)

**16. Why store refresh tokens in httpOnly cookies, not localStorage?**
localStorage is accessible via JavaScript — any XSS vulnerability can read and exfiltrate tokens. HttpOnly cookies are inaccessible to JavaScript even if an attacker injects a script. Combine with `SameSite=Strict` to prevent CSRF. Access tokens (short-lived, in memory) are less dangerous if briefly exposed.

**17. How do you handle simultaneous 401s during token refresh?**
Use a boolean `isRefreshing` flag and a `BehaviorSubject<string | null>` as a queue. The first 401 triggers refresh and sets `isRefreshing = true`. Concurrent 401s see the flag and subscribe to the BehaviorSubject (`filter(token => token !== null).take(1)`). When refresh completes, the new token is emitted and all queued requests retry simultaneously.

**18. What is RBAC and how do you implement it in Angular?**
Role-Based Access Control: users have roles, roles have permissions. Angular implementation: (1) JWT payload contains `roles[]`, (2) `RoleGuard` checks `route.data.roles` against user roles, (3) `*hasPermission="'products:write'"` structural directive hides UI elements, (4) always enforce on the server — Angular RBAC is UX only, never security.

**19. How does Angular protect against XSS?**
Angular auto-sanitizes all template bindings (`{{ expr }}`, `[innerHTML]`). Never call `bypassSecurityTrustHtml()` with user input. Set a strict Content Security Policy header. Avoid `eval()`. Use `DomSanitizer` for dynamic URLs bound to `[href]`/`[src]`. Enable strict template type-checking.

**20. What is CSRF and how does Angular handle it?**
Cross-Site Request Forgery: malicious site makes the browser send requests using the user's cookies. Prevention: `SameSite=Strict` cookies + CSRF tokens. Angular's `HttpClientModule` automatically reads the `XSRF-TOKEN` cookie and sends it as `X-XSRF-TOKEN` header on mutating requests — zero configuration needed.

**21. How do you redirect back to the original URL after login?**
Store the attempted URL in `AuthGuard`: `router.navigate(['/login'], { queryParams: { returnUrl: state.url } })`. After login, read `returnUrl` from query params: `this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/')`. Validate it's a relative path to prevent open redirect attacks.

**22. What is OAuth 2.0 PKCE and why is it required for SPAs?**
PKCE prevents authorization code interception. The app generates a random `code_verifier`, hashes it as `code_challenge`, sends the challenge in the auth request. When exchanging the code for tokens, the app sends the original `code_verifier`. Only the legitimate app can provide it, preventing a stolen code from being exchanged. SPAs can't store client secrets, making PKCE essential.

**23. How do you sync logout across multiple browser tabs?**
Use the `storage` event: when tab A calls `localStorage.setItem('logout', Date.now())` on logout, all other tabs receive the `storage` event and can clear state and redirect to login. Alternatively, use the `BroadcastChannel` API for explicit same-origin cross-tab messaging.

**24. What security headers should your Angular app's server return?**
`Content-Security-Policy` (restricts script/style sources), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (prevents clickjacking), `Strict-Transport-Security` (forces HTTPS), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (restricts browser APIs).

**25. How would you implement permission-based UI in a template?**
Create a structural directive `*hasPermission` that injects `AuthService`, checks the user's permissions array, and calls `ViewContainerRef.createEmbeddedView(templateRef)` or `ViewContainerRef.clear()`. Usage: `<button *hasPermission="'products:delete'">Delete</button>`. Always pair with server-side enforcement — template hiding is UX, not security.

---

## HTTP & State Management (26–40)

**26. How do you implement optimistic UI updates in NgRx?**
Dispatch an action that immediately updates state (optimistically). The Effect runs the HTTP call. On success, optionally confirm with server response. On failure, dispatch a rollback action with the previous state snapshot. This gives instant UI feedback while maintaining eventual consistency.

**27. What is NgRx Entity Adapter and why use it?**
`EntityAdapter` normalizes collections into `{ ids: string[], entities: Record<id, T> }`. Benefits: O(1) lookups by ID, no duplicate IDs, built-in selectors (`selectAll`, `selectTotal`), and pre-built reducer helpers (`addOne`, `updateOne`, `removeMany`, `setAll`). Avoids O(n) array searches and simplifies update logic.

**28. Explain NgRx selector memoization.**
Selectors cache their last output and only recompute when their input selectors return new references (`===`). This is critical for OnPush: if the selector's output reference hasn't changed, the component doesn't re-render. Composed selectors chain — if an upstream slice didn't change, all downstream selectors return cached values.

**29. What does `shareReplay(1)` do and when would you use it?**
Multicasts an Observable and replays the last value to late subscribers — it acts like a BehaviorSubject seeded by the source. Use for HTTP requests that should fire once but deliver to any subscriber at any time (user profile, app config). Without it, each subscriber triggers a new HTTP request (cold Observable default behavior).

**30. How do you implement global HTTP response caching?**
Several layers: (1) `shareReplay(1)` for in-memory lifetime-of-service caching, (2) custom interceptor with a `Map<url, CachedResponse>` and TTL, (3) `Cache-Control` + `ETag`/`Last-Modified` headers for browser-level HTTP caching, (4) Service Worker (Angular PWA) for offline-capable caching of GET requests. Enterprise: combine all four for different data freshness requirements.

**31. How does `exhaustMap` differ from `switchMap` for a form submit button?**
`switchMap` cancels previous requests — for a submit button this would cancel an in-flight POST if the user double-clicks. `exhaustMap` ignores new outer emissions while an inner is active — the second click is dropped entirely, which is the correct behavior. After the request completes, the button accepts new clicks.

**32. How do you implement a global loading indicator for all HTTP requests?**
`LoadingInterceptor` increments a counter on request, decrements it in `finalize()` (guarantees decrement even on error), and emits to a `BehaviorSubject<number>`. `LoadingService.isLoading$` maps `count > 0`. App shell shows a progress bar via `isLoading$ | async`. The `finalize()` ensures no leak even if the request errors.

**33. How do you implement WebSocket integration with NgRx?**
Create an Effect that opens a WebSocket (`webSocket` from `rxjs/webSocket`) when an action fires. Map incoming messages to NgRx actions. Dispatch them: they flow through reducers normally. Use `takeUntil(actions$.pipe(ofType(disconnectWS)))` for cleanup. Add `retryWhen` with exponential backoff for reconnection.

**34. What is NgRx ComponentStore and when should you use it over global Store?**
`ComponentStore` provides local, lifecycle-bound state management — no Actions/Reducers/Effects boilerplate. Use it when: state is scoped to one component tree, doesn't need cross-feature access, or the Redux overhead is disproportionate (a complex data grid with local sorting/pagination, a multi-step form wizard, a draggable widget).

**35. How do you test an NgRx Reducer?**
Reducers are pure functions — no TestBed needed. Call directly: `const state = myReducer(initialState, myAction({ payload }))`. Assert the returned state shape. This is the fastest Angular test possible — synchronous, no mocking, no DOM. Test every `on()` handler independently with various initial states.

**36. How would you implement undo/redo in NgRx?**
Maintain a history stack in state: `{ past: State[], present: State, future: State[] }`. The `undo` action: pops from `past`, moves `present` to `future`, sets popped state as `present`. The `redo` action: pops from `future`, pushes `present` to `past`, sets popped as `present`. Limit depth (e.g., 20) to prevent memory growth.

**37. Explain `withLatestFrom` vs `combineLatest` in NgRx Effects.**
`withLatestFrom(store.select(selector))` takes the latest Store value once per action emission — used in Effects to get current state when handling an action. `combineLatest` re-emits whenever any source emits — used to derive computed state in selectors or when you want to react to changes in multiple streams.

**38. How do you handle race conditions when two Effects update the same state slice?**
Use `concatMap` in the Effect if ordering matters (process sequentially). Use NgRx's `concatLatestFrom` instead of `withLatestFrom` for stable reads. Design reducers to handle partial/out-of-order updates gracefully using optimistic versioning or server-assigned sequence numbers.

**39. What is the difference between `tap` and side-effecting code in a Reducer?**
Reducers must be pure — no side effects (no HTTP, no console.log, no localStorage). Use `tap` inside Effects for controlled side effects (logging, analytics, localStorage persistence). Any side effect in a Reducer makes the state unpredictable, breaks time-travel debugging, and violates the Redux contract.

**40. How do you implement real-time collaborative features (e.g., shared cart) with Angular?**
WebSocket Effect receives server-pushed cart updates → dispatches `cartUpdatedByServer({ items })` action → Reducer merges remote changes with local state (conflict resolution strategy: last-write-wins or CRDT). Show "John is editing this cart" indicators via a separate `presence` state slice. Debounce local changes before syncing to prevent update storms.

---

## Testing (41–50)

**41. What is TestBed and how does it work?**
TestBed creates a mock Angular testing module with specified declarations, imports, and providers — similar to a real NgModule but scoped to the test. `createComponent()` instantiates a component in a test host. `inject()` retrieves service instances. Each `describe` block gets a fresh TestBed module by default.

**42. What is the difference between `fakeAsync` and `waitForAsync`?**
`waitForAsync` uses real microtask queue — you `await fixture.whenStable()`. `fakeAsync` patches async APIs and lets you control time with `tick(ms)` and `flush()`. `fakeAsync` is more predictable for testing debounced operations, timers, and chains of async operations. Cannot use `fakeAsync` with XHR — use `HttpTestingController` instead.

**43. How do you test an NgRx Reducer?**
Call it as a pure function: `const state = myReducer(initial, action)`. Assert the returned state. No TestBed, no async, no mocking needed. This is the fastest Angular test possible — pure function in, assertion out.

**44. What is a Jasmine Spy and when do you use `createSpyObj`?**
A spy wraps a function to track calls and control return values. `jasmine.createSpyObj('Name', ['method1', 'method2'])` creates an object with all methods as spies. Configure return values: `spy.method.and.returnValue(of([]))`. Preferred over hand-written mocks — less code, automatic call verification.

**45. How do you test a component with the `async` pipe?**
After `fixture.detectChanges()` (triggers ngOnInit + subscribes), use `fakeAsync` + `tick()` to flush microtasks, then `fixture.detectChanges()` again to update the view with the emitted value. Or use `waitForAsync` with `fixture.whenStable()`. Assert the DOM after the second `detectChanges()`.

**46. How do you write E2E tests that don't depend on a real backend?**
Use `cy.intercept()` (Cypress) or `page.route()` (Playwright) to stub all network calls with fixture JSON files. Login via API call (not UI flow) to skip repetitive login. Use `data-cy` attributes as selectors — stable, not tied to CSS classes. Test UI behavior, not backend correctness.

**47. What does code coverage measure and what are its limits?**
Coverage measures which lines/branches/functions tests execute. 80% line coverage means 80% of code was reached. Limits: a test can reach code without meaningful assertions (false confidence). Focus coverage on business logic (services, reducers, pipes). Don't chase 100% — test behaviors that matter, not lines.

**48. How do you test a Route Guard?**
Unit: call `guard.canActivate(mockRoute, mockState)` directly with spy mocks for `Router` and `AuthService`. Integration: `RouterTestingModule.withRoutes([...])`, navigate to the protected route, assert the resulting URL (redirected or allowed). Unit tests are faster; integration tests verify the full router interaction.

**49. What is the difference between shallow and deep component testing?**
Shallow testing uses `NO_ERRORS_SCHEMA` — child components aren't rendered. Tests the parent in isolation quickly. Deep testing compiles and renders all child components — more realistic but requires declaring/importing all dependencies. Best practice: shallow for unit behavior, deep for integration behavior, E2E for user flows.

**50. How do you test a component that uses `@ViewChild`?**
After `fixture.detectChanges()` (which triggers `ngAfterViewInit`), the `@ViewChild` reference is populated. Access: `component.myChildRef`. If it's an Angular component, call its methods or check its state directly. Use `By.directive(ChildComponent)` to query it in the fixture DOM.

---

## Performance & Scalability (51–65)

**51. How do you diagnose a slow Angular application?**
(1) Angular DevTools — visualize CD cycles and their duration. (2) Chrome DevTools Performance tab — record interactions, find long tasks (>50ms). (3) Lighthouse — TTI, FCP, bundle sizes. (4) webpack-bundle-analyzer — find oversized chunks. (5) `window.performance.mark()` for custom timing around critical paths.

**52. When is virtual scrolling essential and how does CDK implement it?**
Essential for lists with >200 items. `CdkVirtualScrollViewport` calculates which items are visible, renders only those plus a buffer, and recycles DOM nodes as the user scrolls. All 10,000 items exist only in memory — only ~20 DOM nodes exist at any time. Uses `IntersectionObserver` and scroll events internally.

**53. What does AOT compilation improve over JIT?**
AOT compiles templates at build time: removes ~300KB Angular compiler from the bundle, catches template errors at build time, pre-compiles templates (no runtime parse overhead), produces smaller and faster bundles. JIT compiles at runtime — used in development for faster rebuilds.

**54. What is Angular Universal (SSR) and when should you use it?**
Universal renders the app on the server, sends populated HTML to the browser. Benefits: fast First Contentful Paint, SEO (crawlers see full HTML). Use for: marketing/content sites where SEO matters, apps targeting slow connections. Tradeoff: server infrastructure complexity, `TransferState` to avoid double-loading data, and `isPlatformBrowser()` guards for browser-only APIs.

**55. What is `@defer` (Angular 17+) and how does it differ from lazy loading?**
`@defer (on viewport)` downloads, compiles, and renders a template block only when it enters the viewport. Unlike route-based lazy loading (route-level granularity), `@defer` works within a single route's template at the component level. Ideal for below-the-fold heavy components that shouldn't block initial render.

**56. How do you optimize a component that renders a complex chart on every CD cycle?**
Run the chart rendering code `ngZone.runOutsideAngular(() => chart.update())`. Only re-render when data actually changes using `OnPush` + reference equality. Debounce resize events. Use `requestAnimationFrame` for smooth updates. Cache computed data with `memo` or a pure pipe.

**57. What is Incremental Hydration (Angular 17+)?**
Without it: Universal renders HTML, Angular destroys it and re-renders (wasteful, causes flicker). With incremental hydration, Angular reuses server-rendered DOM nodes and attaches event handlers without re-rendering. Drastically reduces Time to Interactive and eliminates content shift.

**58. How do you handle a 100,000-item dataset in an Angular app?**
(1) Paginate server-side — never load all at once. (2) Use virtual scroll for long visible lists. (3) Filter/search server-side, not client-side. (4) Normalize to NgRx Entity for O(1) lookups. (5) If client-side filtering is needed for large datasets, run in a Web Worker to avoid blocking the main thread.

**59. How does `trackBy` work and when does Angular reuse vs recreate DOM nodes?**
With `trackBy`, Angular gets a stable key per item. On array replacement: items with the same key → DOM node is reused (only update inputs); new keys → new DOM nodes created; missing keys → DOM nodes destroyed. Without `trackBy`, any array replacement destroys and recreates all DOM nodes regardless of data changes.

**60. How do you implement HTTP caching with ETags?**
Server sends `ETag: "abc123"` with responses. On subsequent requests, Angular (via interceptor) sends `If-None-Match: "abc123"`. If unchanged, server returns `304 Not Modified`. The interceptor serves the cached response. Implement with a `Map<url, { etag, data }>` in the interceptor.

**61. What is tree-shaking and how do you enable it fully?**
Tree-shaking removes unused exports at build time. Requirements: ES modules (`import/export` — not CommonJS), named imports (not `import * as`), no side-effect imports, `sideEffects: false` in `package.json`. Angular's CLI enables it by default. Common pitfall: importing from `rxjs` directly instead of `rxjs/operators` (pre-v6) prevents tree-shaking of operators.

**62. How do you reduce Time to First Byte for an Angular app?**
(1) Deploy to CDN edge locations near users. (2) Enable HTTP/2 for multiplexed connections. (3) Use brotli/gzip compression on Nginx. (4) Preload critical chunks with `<link rel="preload">`. (5) Consider Angular Universal for server-side rendering. (6) Minimize `index.html` response size.

**63. How do you implement a performance budget in Angular CLI?**
In `angular.json` under `configurations.production.budgets`: set `maximumWarning` and `maximumError` for `initial` (the main bundle) and `anyComponentStyle` (per-component CSS). The build fails if error limits are exceeded. This enforces performance as a hard CI requirement.

**64. When would you use a Web Worker in Angular?**
For computationally expensive operations that would block the main thread: sorting/filtering large datasets, image processing, cryptography, running ML models client-side, complex data transformations. Angular CLI supports Web Workers: `ng generate web-worker my-worker`. Use `postMessage`/`onmessage` for communication.

**65. How do you measure and improve Core Web Vitals for an Angular app?**
LCP (Largest Contentful Paint): preload hero images, SSR for fast initial HTML, optimize images. FID/INP (Interaction to Next Paint): reduce JS bundle size, split long tasks, use Web Workers. CLS (Cumulative Layout Shift): reserve space for images/ads with explicit dimensions, avoid font swaps. Measure with Lighthouse, Chrome CrUX, or web-vitals library.

---

## Deployment & Enterprise Operations (66–75)

**66. What is the critical Nginx config issue that breaks Angular SPA deployments?**
Without `try_files $uri $uri/ /index.html`, navigating directly to `/products/123` returns 404 — nginx looks for a file at that path, finds none. The fix serves `index.html` for any unmatched path, letting Angular's router handle the URL client-side. This is the most common SPA deployment mistake.

**67. How does content-hash file naming enable CDN caching?**
Angular CLI appends a hash of the file's content to output filenames (`main.4a7b3c.js`). Since the filename changes when content changes, CDN can cache with `max-age=31536000, immutable`. `index.html` is NOT content-hashed and must have `Cache-Control: no-cache` so browsers always fetch fresh version (which references new hashed filenames).

**68. What is zero-downtime deployment for an Angular app?**
(1) Build and upload new static files alongside old ones (content-hash filenames prevent conflicts). (2) Update CDN/nginx to serve new `index.html`. (3) Users finishing sessions use old bundles (still available). (4) New users get new bundles. (5) Delete old bundles after a grace period (e.g., 24 hours). Zero traffic disruption at all stages.

**69. What are multi-stage Docker builds and why are they important for Angular?**
Stage 1 (builder): installs Node.js, all `node_modules`, and runs `ng build`. Stage 2 (runtime): starts from `nginx:alpine`, copies only the compiled `dist/` folder. Final image is ~25MB (nginx + static files) instead of ~500MB (Node.js + all node_modules). Smaller images → faster deployments, smaller attack surface.

**70. How do you implement feature flags for gradual rollouts?**
`APP_INITIALIZER` fetches flags from `/api/feature-flags` at startup. `FeatureFlagService.isEnabled('new-checkout')` returns `Observable<boolean>`. Use in routes (`canActivate: [FeatureFlagGuard]`) and templates (`*featureFlag="'beta-search'"`). For gradual rollouts, server returns flag values per user segment (by role, country, percentage). Enable without redeployment.

**71. How do you set up environment-specific builds in CI/CD?**
`angular.json` defines configurations (`production`, `staging`, `preview`) with `fileReplacements` and build settings. CI/CD environment variables inject secrets: `sed -i "s/SENTRY_DSN_PLACEHOLDER/$SENTRY_DSN/" dist/index.html`. Or use runtime config: Angular fetches `/assets/config.json` at startup (not compiled in) — change server config without rebuilding.

**72. Explain blue-green deployment for an Angular frontend.**
Maintain two identical production environments. Current traffic goes to blue. Deploy new version to green. Run smoke tests on green. Switch load balancer/DNS to point to green — instant cutover, zero downtime. Blue remains available for immediate rollback if issues arise. Swap back in seconds vs. minutes for a rollback.

**73. What are the risks of Service Workers (`@angular/pwa`) in enterprise apps?**
A buggy service worker can cache a broken app version permanently — users get a broken experience even after you push a fix. Mitigate: (1) Use `updateActivateAll` in `ngsw-config.json`, (2) implement a "new version available" notification prompting users to refresh, (3) monitor SW errors in production, (4) have a kill switch: unregister the SW via API if needed.

**74. How do you monitor Angular frontend errors in production?**
Custom `ErrorHandler` (`{ provide: ErrorHandler, useClass: GlobalErrorHandler }`) sends all uncaught errors to Sentry: `Sentry.captureException(error)`. Include context: user ID, session ID, current route, app version. HTTP errors: `ErrorInterceptor` captures status codes. Performance: `Sentry.startTransaction()` for critical user flows. Alert on error rate spikes in Grafana/DataDog.

**75. You're joining a large Angular project with no tests, poor architecture, and performance issues. What's your 90-day plan?**
Days 1–30: Audit (Lighthouse, bundle analysis, `npm audit`, component dependency graph). Add error tracking (Sentry) — you need to know what's broken in production before touching anything. Enable TypeScript strict mode — surface real bugs. Days 31–60: Add tests for the two highest-risk paths (checkout, auth). Extract SharedModule for duplicated components. Add `OnPush` to leaf components — zero behavior change, immediate CD improvement. Days 61–90: Lazy load the 3 largest bundles. Establish code review standards and architecture decision records (ADRs). Present measurable outcomes to stakeholders: bundle size -40%, error rate -60%, Lighthouse score +20. Architecture refactoring follows — never leads — because you need production visibility first.

---

*This guide represents production wisdom from engineers who have shipped Angular at scale across large engineering organizations. Every pattern exists because a team learned the cost of not using it.*

**Continue to Phase 5** → Micro-frontends, Angular Signals, Web Workers, Angular Libraries, and Module Federation.
