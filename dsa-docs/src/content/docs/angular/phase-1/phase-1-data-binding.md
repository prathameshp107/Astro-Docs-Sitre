---
title: "5. Data Binding"
description: "Angular has 4 types of data binding."
sidebar:
  order: 5
---

## 5. Data Binding

#### Simple Words First 🟡
Data binding is the **bridge** between your component (where data lives) and the template (where data is displayed). Think of it like a **TV remote connected to a TV** — when you press a button on the remote (component), the TV screen (template) changes.

Angular has **4 types** of data binding.

```svg
<svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="780" height="340" fill="#0f172a" rx="12"/>
  <text x="390" y="30" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="bold">Data Binding — How Data Flows</text>

  <!-- Component Box -->
  <rect x="40" y="55" width="220" height="250" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="150" y="85" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">Component</text>
  <text x="150" y="105" text-anchor="middle" fill="#64748b" font-size="11">(TypeScript Logic)</text>

  <rect x="60" y="120" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="140" text-anchor="middle" fill="#bfdbfe" font-size="11">title = "Hello World"</text>

  <rect x="60" y="165" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="185" text-anchor="middle" fill="#bfdbfe" font-size="11">isVisible = true</text>

  <rect x="60" y="210" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="230" text-anchor="middle" fill="#bfdbfe" font-size="11">handleClick()</text>

  <rect x="60" y="255" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="275" text-anchor="middle" fill="#bfdbfe" font-size="11">searchTerm = ""</text>

  <!-- Template Box -->
  <rect x="520" y="55" width="220" height="250" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="630" y="85" text-anchor="middle" fill="#86efac" font-size="14" font-weight="bold">Template</text>
  <text x="630" y="105" text-anchor="middle" fill="#64748b" font-size="11">(HTML View)</text>

  <rect x="540" y="120" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="140" text-anchor="middle" fill="#dcfce7" font-size="11">{{ "{{" }} title {{ "}}" }}</text>

  <rect x="540" y="165" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="185" text-anchor="middle" fill="#dcfce7" font-size="11">[hidden]="!isVisible"</text>

  <rect x="540" y="210" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="230" text-anchor="middle" fill="#dcfce7" font-size="11">(click)="handleClick()"</text>

  <rect x="540" y="255" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="275" text-anchor="middle" fill="#dcfce7" font-size="11">[(ngModel)]="searchTerm"</text>

  <!-- Arrow 1: Interpolation (→) -->
  <line x1="262" y1="135" x2="538" y2="135" stroke="#f59e0b" stroke-width="2" marker-end="url(#a1)"/>
  <text x="400" y="128" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="bold">Interpolation {{ "{{}}" }}</text>

  <!-- Arrow 2: Property Binding (→) -->
  <line x1="262" y1="180" x2="538" y2="180" stroke="#a78bfa" stroke-width="2" marker-end="url(#a2)"/>
  <text x="400" y="173" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Property Binding [ ]</text>

  <!-- Arrow 3: Event Binding (←) -->
  <line x1="538" y1="225" x2="262" y2="225" stroke="#f87171" stroke-width="2" marker-end="url(#a3)"/>
  <text x="400" y="218" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Event Binding ( )</text>

  <!-- Arrow 4: Two-way (↔) -->
  <line x1="262" y1="270" x2="538" y2="270" stroke="#34d399" stroke-width="2" marker-end="url(#a4)"/>
  <line x1="538" y1="278" x2="262" y2="278" stroke="#34d399" stroke-width="2" marker-end="url(#a5)"/>
  <text x="400" y="263" text-anchor="middle" fill="#a7f3d0" font-size="10" font-weight="bold">Two-Way Binding [( )]</text>

  <!-- User Box -->
  <rect x="320" y="295" width="140" height="35" rx="8" fill="#374151" stroke="#9ca3af" stroke-width="1.5"/>
  <text x="390" y="318" text-anchor="middle" fill="#e2e8f0" font-size="12">👤 User</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
    <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="a5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
  </defs>
</svg>
```

---

### 5.1 Interpolation `{{ }}`

**Direction:** Component → Template (ONE-WAY)
**Purpose:** Display component data as text in the template

```typescript
// component.ts
export class GreetingComponent {
  firstName: string = "Ananya";
  lastName: string = "Sharma";
  age: number = 25;
  score: number = 8.567;
  items: string[] = ["a", "b", "c"];
  today: Date = new Date();
  isAdmin: boolean = true;
}
```

```html
<!-- component.html -->

<!-- Basic property display -->
<h1>Hello, {{ firstName }}!</h1>
<!-- Output: Hello, Ananya! -->

<!-- Expression: full name -->
<p>Full Name: {{ firstName + ' ' + lastName }}</p>
<!-- Output: Full Name: Ananya Sharma -->

<!-- Math expression -->
<p>Next year age: {{ age + 1 }}</p>
<!-- Output: Next year age: 26 -->

<!-- Method call -->
<p>Today: {{ today.toLocaleDateString() }}</p>

<!-- Ternary operator -->
<p>Role: {{ isAdmin ? 'Administrator' : 'Regular User' }}</p>

<!-- Array length -->
<p>Total items: {{ items.length }}</p>

<!-- ❌ What you CANNOT do in interpolation: -->
<!-- No assignments: {{ age = 30 }} -->
<!-- No new keyword: {{ new Date() }} -->
<!-- No statements: {{ if(isAdmin) {} }} -->
```

---

### 5.2 Property Binding `[ ]`

**Direction:** Component → Template (ONE-WAY)
**Purpose:** Bind a component property to an **HTML element property** (not attribute!)

```typescript
export class PropertyBindingComponent {
  imageUrl: string = "https://example.com/photo.jpg";
  imageAlt: string = "User Photo";
  isButtonDisabled: boolean = false;
  inputPlaceholder: string = "Enter your name...";
  linkUrl: string = "https://angular.io";
  dynamicClass: string = "highlight";
  dynamicStyle: string = "red";
}
```

```html
<!-- Property Binding uses square brackets [ ] -->

<!-- Bind 'src' property of <img> element -->
<img [src]="imageUrl" [alt]="imageAlt">

<!-- Bind 'disabled' property of <button> -->
<button [disabled]="isButtonDisabled">Submit</button>
<!-- When isButtonDisabled = true → button is disabled -->

<!-- Bind 'placeholder' property of <input> -->
<input [placeholder]="inputPlaceholder">

<!-- Bind 'href' property of <a> tag -->
<a [href]="linkUrl">Angular Website</a>

<!-- Class binding -->
<div [class]="dynamicClass">Styled text</div>

<!-- Style binding -->
<p [style.color]="dynamicStyle">This text is red</p>

<!-- ⚠️ Interpolation vs Property Binding -->
<img src="{{ imageUrl }}">    <!-- Interpolation: Works for src -->
<img [src]="imageUrl">       <!-- Property binding: Preferred! -->

<!-- When MUST you use Property Binding (not interpolation)? -->
<button [disabled]="isButtonDisabled">  <!-- disabled is boolean -->
<!-- <button disabled="{{ isButtonDisabled }}">  ← WRONG! -->
<!-- This would set disabled="false" as a STRING, and the button stays disabled! -->
```

---

### 5.3 Event Binding `( )`

**Direction:** Template → Component (ONE-WAY)
**Purpose:** Listen to user actions (clicks, key presses, mouse events) and call component methods

```typescript
export class EventBindingComponent {
  clickCount: number = 0;
  lastKey: string = '';
  mousePosition: string = '';

  // Method called when button is clicked
  handleClick(): void {
    this.clickCount++;
    console.log("Button clicked! Count:", this.clickCount);
  }

  // $event contains the actual DOM event object
  handleKeyUp(event: KeyboardEvent): void {
    this.lastKey = event.key;
    console.log("Key pressed:", event.key);
  }

  handleMouseMove(event: MouseEvent): void {
    this.mousePosition = `X: ${event.clientX}, Y: ${event.clientY}`;
  }

  // Template reference variable (#inputRef) to access input value
  submitForm(value: string): void {
    console.log("Submitted:", value);
  }
}
```

```html
<!-- Event binding uses parentheses ( ) -->

<!-- Click event -->
<button (click)="handleClick()">
  Clicked {{ clickCount }} times
</button>

<!-- Keyboard events — $event is the browser event object -->
<input (keyup)="handleKeyUp($event)"
       (keydown)="handleKeyDown($event)"
       placeholder="Type here">
<p>Last key: {{ lastKey }}</p>

<!-- Mouse events -->
<div (mousemove)="handleMouseMove($event)" class="mouse-area">
  Move mouse here: {{ mousePosition }}
</div>

<!-- Using template reference variable (#) to get input value -->
<input #nameInput placeholder="Enter name">
<button (click)="submitForm(nameInput.value)">Submit</button>
<!-- #nameInput gives us a reference to the input element -->

<!-- Focus / Blur events -->
<input (focus)="onFocus()" (blur)="onBlur()" placeholder="Focus me">

<!-- Input change -->
<select (change)="onSelectChange($event)">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</select>
```

---

### 5.4 Two-Way Binding `[( )]`

**Direction:** Component ↔ Template (BI-DIRECTIONAL)
**Purpose:** Keep component property and input field in sync — when either changes, the other updates automatically

The `[()]` syntax is called "banana in a box" 🍌📦

```typescript
// In app.module.ts, you MUST import FormsModule for ngModel
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule]  // ← Add FormsModule
})
export class AppModule { }
```

```typescript
// component.ts
export class TwoWayBindingComponent {
  // These properties stay in sync with the input fields
  username: string = '';
  email: string = '';
  selectedCountry: string = 'India';
  isSubscribed: boolean = false;
  rating: number = 5;
}
```

```html
<!-- [(ngModel)] is two-way binding -->
<!-- It READS from and WRITES to the component property -->

<!-- Text input -->
<input [(ngModel)]="username" placeholder="Enter username">
<p>Hello, {{ username }}!</p>
<!-- Type in the input → username property updates → paragraph updates instantly -->

<!-- Email input -->
<input type="email" [(ngModel)]="email" placeholder="Enter email">
<p>Your email: {{ email }}</p>

<!-- Dropdown -->
<select [(ngModel)]="selectedCountry">
  <option value="India">India</option>
  <option value="USA">USA</option>
  <option value="UK">UK</option>
</select>
<p>Selected: {{ selectedCountry }}</p>

<!-- Checkbox -->
<input type="checkbox" [(ngModel)]="isSubscribed">
<label>Subscribe to newsletter</label>
<p>Subscribed: {{ isSubscribed }}</p>

<!-- Range slider -->
<input type="range" [(ngModel)]="rating" min="1" max="10">
<p>Rating: {{ rating }}/10</p>

<!-- ── Under the hood, [(ngModel)] expands to: ── -->
<!-- [ngModel]="username" (ngModelChange)="username = $event" -->
<!-- Property binding (reads) + Event binding (writes) -->
```

---
