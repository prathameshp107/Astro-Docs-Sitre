---
title: "2. Authentication & Authorization"
description: "Enterprise applications separate the frontend (Angular SPA) from the backend (REST API). Traditional session-based auth doesn't work well here — the server"
sidebar:
  order: 2
---

## 2. Authentication & Authorization

### Why JWT?

Enterprise applications separate the **frontend** (Angular SPA) from the **backend** (REST API). Traditional session-based auth doesn't work well here — the server would need to share session state across multiple API instances (load balancing problem).

JWT solves this by making authentication **stateless**: the token itself carries all claims the server needs to verify the user.

---

### JWT Structure

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

### Token Service

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

### Auth Interceptor — Auto Token Refresh

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

### Route Guards (AuthGuard + RoleGuard)

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

### Auth Flow Diagram

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
