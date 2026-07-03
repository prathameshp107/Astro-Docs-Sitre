---
title: "Decorators in TypeScript"
description: "Decorators add metadata and behavior to classes, methods, and properties in TypeScript/Angular."
sidebar:
  order: 10
---

### 3.10 Decorators

#### Simple Words First 🟡
Decorators are like **name tags or badges** you put on a class or function to give it **extra powers**. When Angular sees `@Component`, it says "Oh! This class is a Component. Let me give it all the Component powers."

```typescript
// Decorators start with @
// They are applied immediately ABOVE what they're decorating

// ──── @Component ────
// Tells Angular: "This class controls a piece of the UI"
@Component({
  selector: 'app-user',        // HTML tag: <app-user></app-user>
  templateUrl: './user.html',  // The HTML file
  styleUrls: ['./user.css']    // The CSS file
})
class UserComponent {
  // Component logic here
}

// ──── @Injectable ────
// Tells Angular: "This class is a service that can be injected"
@Injectable({
  providedIn: 'root'  // Available everywhere in the app
})
class UserService {
  // Service logic here
}

// ──── @Input ────
// Marks a property as "receivable from a parent component"
class ChildComponent {
  @Input() username: string = '';  // Parent passes this in
}

// ──── @Output ────
// Marks a property as an "event emitter to the parent"
class ChildComponent {
  @Output() userClicked = new EventEmitter<string>();
}

// ──── Property Decorator Example ────
// Custom decorator that logs property changes
function Log(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
    get: () => value,
    set: (newVal) => {
      console.log(`${key} changed from ${value} to ${newVal}`);
      value = newVal;
    }
  });
}

class Example {
  @Log
  title: string = 'Initial';
}
```