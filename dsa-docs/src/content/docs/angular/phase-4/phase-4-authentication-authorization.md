---
title: "2. Authentication & Authorization"
description: "Enterprise applications separate the frontend (Angular SPA) from the backend (REST API). Traditional session-based auth doesn't work well here — the server"
sidebar:
  order: 4
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

![JWT Auth + Token Refresh Flow](/DSA-Notes-Problems/assets/angular/phase-4-2-jwt-auth-token-refresh-flow.svg)

---
