---
title: "9. i18n & Accessibility"
description: "Internationalization (i18n), localization, and accessibility (a11y) basics."
sidebar:
  order: 11
---

## 9. i18n & Accessibility

### Simple Words First 🟡
**Internationalization (i18n)** is like making a restaurant menu that can be easily translated into any language — you don't write the menu in English only, you design it so it can work in any language.

**Accessibility (a11y)** is like building a building with ramps, not just stairs — everyone should be able to enter, regardless of their abilities.

---

### Internationalization (i18n)

Angular has **built-in i18n** support. You mark text in your templates, and Angular extracts them for translation.

#### Step 1: Mark Text for Translation

```typescript
@Component({
  selector: 'app-welcome',
  template: `
    <h1 i18n="Welcome message|Greeting@@welcomeMessage">
      Welcome to our store!
    </h1>
    <!-- i18n: Meaning|Description@@ID -->

    <p i18n>
      You have {{ cartItems }} items in your cart.
    </p>

    <!-- ICU expressions for plurals -->
    <p i18n>
      {cartItems, plural,
        =0 {Your cart is empty}
        =1 {You have 1 item}
        other {You have {{cartItems}} items}
      }
    </p>
  `
})
export class WelcomeComponent {
  cartItems = 3;
}
```

#### Step 2: Extract Translations

```bash
# Extract all i18n marked text into a messages file
ng extract-i18n --output-path src/locale

# Creates: src/locale/messages.xlf (XML Localization Interchange File Format)
```

#### Step 3: Create Translation Files

```xml
<!-- src/locale/messages.fr.xlf — French translation -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" target-language="fr">
    <body>
      <trans-unit id="welcomeMessage">
        <source>Welcome to our store!</source>
        <target>Bienvenue dans notre boutique!</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

#### Step 4: Configure and Build

```json
// angular.json
{
  "projects": {
    "my-app": {
      "i18n": {
        "sourceLocale": "en",
        "locales": {
          "fr": "src/locale/messages.fr.xlf",
          "hi": "src/locale/messages.hi.xlf"
        }
      },
      "architect": {
        "build": {
          "configurations": {
            "fr": { "localize": ["fr"] },
            "hi": { "localize": ["hi"] },
            "all": { "localize": true }
          }
        }
      }
    }
  }
}
```

```bash
# Build for a specific language
ng build --localize --configuration=fr

# Build all languages
ng build --localize --configuration=all
```

### Accessibility (a11y) Best Practices

```typescript
@Component({
  selector: 'app-accessible-button',
  template: `
    <!-- ✅ Good: Button with meaning -->
    <button
      (click)="submit()"
      aria-label="Submit your order"
      [attr.aria-disabled]="isDisabled">
      <mat-icon>check</mat-icon>
    </button>

    <!-- ✅ Good: Image with alt text -->
    <img [src]="product.image" [alt]="product.name">

    <!-- ✅ Good: Form field with label -->
    <label for="email">Email address</label>
    <input id="email" type="email" [formControl]="emailControl"
           aria-describedby="email-hint">
    <span id="email-hint">We'll never share your email</span>

    <!-- ✅ Good: Skip navigation link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
  `
})
export class AccessibleComponent {
  isDisabled = false;
}

// 🔴 Bad: Icon button without accessible label
// <button (click)="delete()"><mat-icon>delete</mat-icon></button>

// ✅ Good: Same button with label
// <button (click)="delete()" aria-label="Delete item"><mat-icon>delete</mat-icon></button>
```

### Angular CDK Accessibility

```typescript
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  standalone: true,
  imports: [A11yModule],
  template: `
    <!-- Focus trapping (for modals) -->
    <div cdkTrapFocus cdkTrapFocusAutoCapture>
      <!-- Modal content — tab key stays inside this div -->
    </div>
  `
})
export class ModalComponent {
  constructor(private liveAnnouncer: LiveAnnouncer) {
    // Announce dynamic content to screen readers
    this.liveAnnouncer.announce('Item added to cart');
  }
}
```

### In Simple Words 🧠

- **i18n** = making your app ready for translation (use `i18n` in templates)
- Extract translations with `ng extract-i18n`
- Build for specific locales with `ng build --localize --configuration=fr`
- **a11y** = making your app usable by everyone (screen readers, keyboard navigation)
- Use `aria-label`, `alt` text, `role` attributes
- Use the CDK's `A11yModule` for focus trapping and live announcements
- Test with a screen reader (NVDA, VoiceOver) and keyboard-only navigation
