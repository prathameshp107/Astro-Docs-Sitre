---
title: "TypeScript Decorators"
description: "Complete guide to TypeScript decorators: class, method, property, accessor, and parameter decorators with real-world enterprise patterns."
---

## TypeScript Decorators

### What are Decorators?

Decorators are special declarations that can be attached to classes, methods, properties, accessors, or parameters. They allow you to add behavior to existing code without modifying the code itself.

### Class Decorator

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class UserService {
  getUsers() { return []; }
}
```

### Method Decorator

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### Property Decorator

```typescript
function format(formatStr: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = () => `${formatStr}: ${value}`;
    const setter = (newVal: string) => { value = newVal; };
    Object.defineProperty(target, propertyKey, { get: getter, set: setter });
  };
}
```

### Enable Decorators in tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Real Project Example: Express Route Decorators

```typescript
function route(path: string, method: "get" | "post" | "put" | "delete") {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("route", { path, method, handler: propertyKey }, target);
  };
}

class UserController {
  @route("/users", "get")
  getUsers() { /* ... */ }

  @route("/users", "post")
  createUser() { /* ... */ }
}
```

### Interview Questions

**Easy:** What is a decorator in TypeScript?

**Medium:** How do method decorators modify behavior?

**Hard:** How would you build route decorators for Express using TypeScript decorators?
