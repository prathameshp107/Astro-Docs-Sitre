---
title: "7. Pipes"
description: "---"
sidebar:
  order: 7
---

## 7. Pipes

#### Simple Words First 🟡
A pipe is like a **coffee filter**. Raw data goes in (like dirty water), the pipe processes it, and clean output comes out (like filtered water). Pipes transform how data is **displayed** — without changing the actual data in the component.

```
Component Data  ──────► Pipe  ──────► Displayed Value
"hello world"    |pipe  uppercase    "HELLO WORLD"
1234567.89      |pipe  currency:'INR'  "₹12,34,567.89"
2024-01-15      |pipe  date:'longDate'  "January 15, 2024"
```

---

### 7.1 Built-In Pipes

```typescript
export class PipesExampleComponent {
  name: string = "ananya sharma";
  price: number = 1234567.89;
  today: Date = new Date();
  discount: number = 0.25;
  rating: number = 4.789;
  items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  user = { name: 'Alice', age: 28, city: 'Mumbai' };
}
```

```html
<!-- ── Text Pipes ── -->
<p>Original: {{ name }}</p>
<!-- ananya sharma -->

<p>Uppercase: {{ name | uppercase }}</p>
<!-- ANANYA SHARMA -->

<p>Lowercase: {{ name | lowercase }}</p>
<!-- ananya sharma -->

<p>TitleCase: {{ name | titlecase }}</p>
<!-- Ananya Sharma -->

<!-- ── Number & Currency Pipes ── -->
<p>Number: {{ price | number }}</p>
<!-- 1,234,567.89 -->

<p>Number (2 decimals): {{ price | number:'1.2-2' }}</p>
<!-- 1,234,567.89 -->

<p>Currency (USD): {{ price | currency }}</p>
<!-- $1,234,567.89 -->

<p>Currency (INR): {{ price | currency:'INR':'symbol' }}</p>
<!-- ₹1,234,567.89 -->

<p>Percent: {{ discount | percent }}</p>
<!-- 25% -->

<p>Percent (2 decimals): {{ discount | percent:'1.2-2' }}</p>
<!-- 25.00% -->

<!-- ── Date Pipe ── -->
<p>Default: {{ today | date }}</p>
<!-- Jan 15, 2024 -->

<p>Short: {{ today | date:'short' }}</p>
<!-- 1/15/24, 10:30 AM -->

<p>Long: {{ today | date:'longDate' }}</p>
<!-- January 15, 2024 -->

<p>Custom: {{ today | date:'dd-MM-yyyy HH:mm' }}</p>
<!-- 15-01-2024 10:30 -->

<p>Time only: {{ today | date:'HH:mm:ss' }}</p>

<!-- ── JSON Pipe (great for debugging!) ── -->
<pre>{{ user | json }}</pre>
<!-- {
  "name": "Alice",
  "age": 28,
  "city": "Mumbai"
} -->

<!-- ── Slice Pipe (works on arrays and strings) ── -->
<p>First 3 items: {{ items | slice:0:3 | json }}</p>
<!-- ["Apple", "Banana", "Cherry"] -->

<p>Last 2 items: {{ items | slice:-2 | json }}</p>
<!-- ["Date", "Elderberry"] -->

<!-- ── Chaining Pipes ── -->
<p>{{ name | titlecase | uppercase }}</p>
<!-- ANANYA SHARMA -->

<!-- ── Async Pipe (for Observables and Promises) ── -->
<!-- Automatically subscribes and unsubscribes! -->
<p>{{ userData$ | async }}</p>
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

---

### 7.2 Custom Pipes

```bash
# Generate a custom pipe
ng generate pipe shorten
# Creates: src/app/shorten.pipe.ts
```

```typescript
// shorten.pipe.ts — Truncates long text
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'   // This is the name you use in templates: | shorten
})
export class ShortenPipe implements PipeTransform {

  // transform is called every time the pipe is used
  // value = the data coming in
  // limit = optional parameter with default value 50
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
```

```typescript
// temperature.pipe.ts — Convert between Celsius and Fahrenheit
@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, unit: 'C' | 'F' = 'C'): string {
    if (unit === 'F') {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (value * 9/5) + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    } else {
      // Convert Fahrenheit to Celsius
      const celsius = (value - 32) * 5/9;
      return `${celsius.toFixed(1)}°C`;
    }
  }
}
```

```typescript
// filter.pipe.ts — Filter an array by search term
@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, field: string): any[] {
    if (!items || !searchTerm) return items;

    return items.filter(item =>
      item[field]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
}
```

```html
<!-- Using custom pipes -->

<!-- Shorten pipe -->
<p>{{ longText | shorten }}</p>              <!-- Default 50 chars -->
<p>{{ longText | shorten:100 }}</p>          <!-- Custom 100 chars -->

<!-- Temperature pipe -->
<p>Body temp: {{ 37 | temperature:'F' }}</p>  <!-- 98.6°F -->
<p>Boiling: {{ 100 | temperature:'F' }}</p>   <!-- 212.0°F -->

<!-- Filter pipe -->
<input [(ngModel)]="searchTerm" placeholder="Search users...">
<div *ngFor="let user of users | filterBy:searchTerm:'name'">
  {{ user.name }}
</div>

<!-- Chaining custom and built-in pipes -->
<p>{{ longTitle | shorten:80 | titlecase }}</p>
```

```typescript
// Don't forget to declare pipes in the module!
@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,       // ← Declare here
    TemperaturePipe,
    FilterByPipe
  ]
})
export class AppModule { }
```

---
