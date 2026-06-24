---
title: "Patterns in Real Frameworks"
description: "See how design patterns show up in React, Angular, Node.js, and other popular frameworks and libraries."
sidebar:
  order: 3
---

## Patterns in Real Frameworks

Design patterns aren't just theory — they're **everywhere** in frameworks you already use.

---

## ⚛️ React & Patterns

| Pattern | Where in React |
|---------|---------------|
| **Observer** | React's reactivity — state changes trigger re-renders. `useEffect` subscribes to changes. |
| **Decorator** | **Higher-Order Components** (HOC) like `connect()`, `withRouter()`, `withAuth()` wrap a component to add behavior |
| **Factory Method** | `React.createElement()` creates virtual DOM nodes |
| **Composite** | React components form a **tree** — parent components contain child components |
| **Proxy** | **React.memo()** — proxies the component to add memoization |
| **Command** | **Redux actions** — each action is a command object dispatched to reducers |
| **Strategy** | **Render props** — swap rendering logic by passing different render functions |
| **State** | **useReducer** — state transitions are explicit |
| **Iterator** | **React Router Route matching** — iterates through routes to find a match |
| **Builder** | **JSX** — builds virtual DOM tree step by step (Babel compiles it to `React.createElement` calls) |
| **Chain of Responsibility** | **Express/Next.js middleware** — each middleware processes or passes to `next()` |
| **Template Method** | **React lifecycle methods** — the framework calls `componentDidMount`, `render`, etc. |

### React — Specific Examples

```jsx
// Decorator (HOC)
const withAuth = (Component) => {
  return (props) => {
    const user = useAuth();
    return user ? <Component {...props} /> : <Login />;
  };
};

const ProtectedDashboard = withAuth(Dashboard);

// Observer (using hooks)
useEffect(() => {
  // Subscribe to data changes
  const unsub = store.subscribe(() => { /* update */ });
  return unsub; // Cleanup on unmount
}, []);
```

---

## 🅰️ Angular & Patterns

| Pattern | Where in Angular |
|---------|-----------------|
| **Dependency Injection** | **Core to Angular** — services are injected via constructor |
| **Singleton** | Services registered at **root level** are singletons |
| **Observer** | **RxJS Observables** — HTTP, forms, route params, event emitters |
| **Decorator** | **@Component**, @Injectable, @Directive — TypeScript decorators |
| **Facade** | **Angular Forms** — complex validation logic behind simple directives |
| **Proxy** | **HttpInterceptor** — intercepts and transforms HTTP requests |
| **Command** | **Router events** — navigation commands queued and processed |
| **Builder** | **FormBuilder** — builds reactive forms step by step |

### Angular DI (Dependency Inversion)

```typescript
@Injectable({ providedIn: 'root' })
class LoggerService {
  log(msg: string) { console.log(msg); }
}

@Component({ /* ... */ })
class UserComponent {
  constructor(private logger: LoggerService) { // ✅ DI
    this.logger.log('Component loaded');
  }
}
```

---

## 🟢 Node.js & Patterns

| Pattern | Where in Node.js |
|---------|-----------------|
| **Observer** | **EventEmitter** — `emitter.on('event', handler)` |
| **Chain of Responsibility** | **Express middleware** — `app.use(middleware1)` |
| **Facade** | **fs/promises** — wraps complex POSIX file operations |
| **Strategy** | **Passport.js** — swap authentication strategies (`passport.use(new LocalStrategy(...))`) |
| **Singleton** | **Module cache** — `require()` returns the same instance |
| **Proxy** | **Proxies in frameworks** — `fastify`, `express-http-proxy` |
| **Command** | **Bull / job queues** — each job is a command |
| **Builder** | **Knex.js** — query builder: `knex('users').where('id', 1).first()` |

### Node.js — EventEmitter (Observer)

```js
const EventEmitter = require('events');

class OrderService extends EventEmitter {
  createOrder(order) {
    // ... save order
    this.emit('order:created', order);
  }
}

const orders = new OrderService();
orders.on('order:created', (order) => {
  emailService.sendConfirmation(order);
});
orders.on('order:created', (order) => {
  inventoryService.updateStock(order);
});
```

---

## ☕ Java/Spring & Patterns

| Pattern | Where in Spring |
|---------|----------------|
| **Singleton** | Spring beans are singletons by default |
| **Dependency Injection** | `@Autowired` — core to Spring |
| **Proxy** | **AOP** — `@Transactional` creates a proxy |
| **Template Method** | **JdbcTemplate** — defines DB access skeleton |
| **Factory Method** | **BeanFactory / ApplicationContext** |
| **Decorator** | **Spring Security filters** — chain of decorators |

---

## Summary

| Pattern | React | Angular | Node.js |
|---------|-------|---------|---------|
| Observer | `useEffect`, hooks | RxJS | EventEmitter |
| Decorator | HOC | @Component | — |
| Dependency Injection | — | @Injectable | — |
| Chain of Resp. | Middleware | HttpInterceptor | Express middleware |
| Singleton | Module | Root service | Module cache |
| Builder | JSX | FormBuilder | Knex.js |

---

## In Simple Words

- You already use design patterns — **you just didn't know their names**
- Frameworks are built WITH patterns; you use them THROUGH frameworks
- Understanding patterns helps you understand **why** frameworks work the way they do
- Recognizing patterns in familiar frameworks makes learning new ones **easier**
