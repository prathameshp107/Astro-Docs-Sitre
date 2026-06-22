---
title: "Angular DI Types in TypeScript"
description: "Complete guide to typed dependency injection in Angular: InjectionToken types, typed providers, factory providers, and DI patterns."
---

## Angular DI Types

### Typed InjectionToken

```typescript
export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');
export const LOGGER = new InjectionToken<LoggerService>('logger');
export const CACHE_TTL = new InjectionToken<number>('cache.ttl');

// Provide with typed value
providers: [
  { provide: API_CONFIG, useValue: { baseUrl: '/api', timeout: 5000 } },
  { provide: CACHE_TTL, useValue: 300000 },
]

// Inject with typing
constructor(
  @Inject(API_CONFIG) private config: ApiConfig,
  @Inject(CACHE_TTL) private cacheTtl: number
) {}
```

### Typed Factory Provider

```typescript
export const USER_SERVICE = new InjectionToken<UserService>('user.service');

const userServiceFactory = (http: HttpClient, config: ApiConfig): UserService => {
  return new UserService(http, config.baseUrl);
};

providers: [
  {
    provide: USER_SERVICE,
    useFactory: userServiceFactory,
    deps: [HttpClient, API_CONFIG]
  }
]
```

### Interview Questions

**Easy:** How do you create a typed InjectionToken?

**Medium:** How do typed factory providers work?

**Hard:** How would you create a multi-provider with typed InjectionTokens?
