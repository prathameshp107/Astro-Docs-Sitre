---
title: "3. Deferrable Views (@defer)"
description: "@defer, triggers (on idle/viewport/interaction), @placeholder/@loading/@error, lazy loading UI."
sidebar:
  order: 3
---

## 3. Deferrable Views (`@defer`)

### Simple Words First 🟡
Imagine a **heavy package** being delivered. You don't need to open it the moment it arrives — you can set it aside and open it when you're free. `@defer` is like that: it loads heavy components **lazily**, only when they're needed.

This makes your app's **initial load faster** because Angular doesn't download or render heavy components until necessary.

---

### Basic `@defer`

```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    <p>This loads immediately — it's the main content.</p>

    <!-- 🆕 @defer — this heavy component loads later -->
    @defer {
      <app-heavy-chart />  <!-- This component is heavy (big library) -->
    }
  `
})
export class DashboardComponent { }
```

### `@placeholder` — Show Something While Loading

```typescript
@Component({
  template: `
    @defer {
      <app-heavy-chart />

    } @placeholder {
      <!-- Shows IMMEDIATELY while the deferred content loads -->
      <div class="skeleton-loader">
        <div class="skeleton-bar"></div>
        <div class="skeleton-bar"></div>
      </div>

    } @loading {
      <!-- Shows DURING loading (after placeholder, before content) -->
      <p>Loading chart...</p>

    } @error {
      <!-- Shows if the lazy load FAILS -->
      <p class="error">Failed to load chart. Try again.</p>
    }
  `
})
export class DeferredDashboardComponent { }
```

### Triggers — When to Load

```typescript
@Component({
  template: `
    <!-- Load when browser is IDLE (default behavior) -->
    @defer (on idle) {
      <app-heavy-component />
    }

    <!-- Load when element becomes VISIBLE in the viewport -->
    @defer (on viewport) {
      <app-image-gallery />
    } @placeholder {
      <div class="min-height-200">Scroll down to see gallery</div>
    }

    <!-- Load when user INTERACTS with the placeholder -->
    @defer (on interaction) {
      <app-video-player />
    } @placeholder {
      <button>Click to load video</button>
    }

    <!-- Load when a TIMER expires -->
    @defer (on timer(5000)) {
      <app-analytics-widget />
    }

    <!-- Load when a CONDITION becomes true -->
    @defer (when isAdmin) {
      <app-admin-panel />
    }

    <!-- Multiple triggers -->
    @defer (on viewport; on timer(2000)) {
      <app-comments-section />
    }

    <!-- Prefetch: start loading even earlier -->
    @defer (on interaction; prefetch on idle) {
      <app-heavy-modal />
    }
  `
})
export class TriggerDemoComponent {
  isAdmin = false;
}
```

### When to Use `@defer`

| Trigger | Use Case |
|---|---|
| `on idle` | Non-critical content below the fold |
| `on viewport` | Images, maps, charts below the fold |
| `on interaction` | Modals, accordions, tabs, "read more" |
| `on timer(ms)` | Analytics, non-urgent tracking widgets |
| `when condition` | Admin panels, feature flags |

### 🚨 Common Gotchas

```typescript
// ❌ Using @defer on a component that's always visible
@defer (on viewport) {
  <app-header />  <!-- Header is always at the top — don't defer! -->
}
// ✅ Only defer content below the fold

// ❌ Forgetting that @defer creates a separate JS chunk
// The deferred component becomes a lazy-loaded module
// Make sure it's standalone or in its own module

// ❌ @defer on tiny components
@defer {
  <app-icon /> <!-- Too small to defer — adds overhead -->
}
// ✅ Only defer components that are truly heavy
```

### In Simple Words 🧠

- **`@defer`** delays loading of heavy components until they're needed — makes first load faster
- **`@placeholder`** shows instant content while the heavy part loads (like a skeleton)
- **`on idle`** = load when browser has free time (default)
- **`on viewport`** = load when user scrolls near it
- **`on interaction`** = load when user clicks/taps the placeholder
- Use `@defer` for: heavy charts, image galleries, video players, comments, 3rd-party widgets
- Don't defer: headers, navigation, above-the-fold content
