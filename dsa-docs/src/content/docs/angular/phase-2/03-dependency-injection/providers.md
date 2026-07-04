---
title: "Providers"
description: "Registering services with providers."
sidebar:
  order: 2
---

## Provider Types

```typescript
{ provide: AuthService, useClass: MockAuthService }  // useClass
{ provide: API_URL, useValue: 'https://api.example.com' }  // useValue
{ provide: LogLevel, useFactory: () => production ? 'error' : 'debug' }  // useFactory
{ provide: NewService, useExisting: LegacyService }  // useExisting
```

## Registration Methods

1. @Injectable({ providedIn: 'root' }) — Tree-shakeable singleton
2. Component providers — New instance per component
3. Module providers — Shared within module

## Summary
Choose the provider type and registration method based on your use case."
