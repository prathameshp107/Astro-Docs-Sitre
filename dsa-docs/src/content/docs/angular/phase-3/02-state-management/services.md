---
title: "Service-based State"
description: "Share state via Angular services."
sidebar:
  order: 2
---

## Introduction
Services with BehaviorSubject provide a simple yet powerful state management solution for mid-sized applications.

## Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private currentUser = new BehaviorSubject<User | null>(null);
  readonly user$ = this.currentUser.asObservable();

  setUser(user: User) { this.currentUser.next(user); }
  clearUser() { this.currentUser.next(null); }
  get currentUserValue() { return this.currentUser.value; }
}
```

## When to Use
- Shared state across a feature
- Simple state without complex side effects

## Summary
Service-based state balances simplicity with functionality for most applications."
