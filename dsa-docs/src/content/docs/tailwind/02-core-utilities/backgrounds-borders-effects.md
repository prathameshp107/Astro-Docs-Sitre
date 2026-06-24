---
title: "Backgrounds, Borders & Effects"
description: "Background utilities, borders, border-radius, shadows, opacity, and visual effects."
sidebar:
  order: 3
---

## Backgrounds, Borders & Effects

Beyond colors and spacing, Tailwind provides utilities for backgrounds, borders, shadows, opacity, and other visual effects.

> **Analogy:** These utilities are like the finishing touches on a piece of furniture — the stain (background), the trim (border), and the polish (shadow).

---

### Background Utilities

```html
<!-- Background colors -->
<div class="bg-blue-500">Solid color</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  Gradient background
</div>

<!-- Background images -->
<div class="bg-cover bg-center" style="background-image: url('photo.jpg')">
  Cover image centered
</div>
<div class="bg-contain bg-no-repeat">
  Contain image, no repeat
</div>

<!-- Background attachment -->
<div class="bg-fixed">Fixed background (parallax effect)</div>
<div class="bg-scroll">Scrolls with content (default)</div>
```

### Gradients

```html
<div class="bg-gradient-to-r from-cyan-500 to-blue-500">
  Left to right gradient
</div>

<div class="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
  Diagonal with multiple stops
</div>

<div class="bg-gradient-to-t from-green-400 to-cyan-300">
  Bottom to top
</div>
```

| Direction Class | Direction |
|----------------|-----------|
| `bg-gradient-to-t` | Top |
| `bg-gradient-to-r` | Right |
| `bg-gradient-to-b` | Bottom |
| `bg-gradient-to-l` | Left |
| `bg-gradient-to-tr` | Top-right |
| `bg-gradient-to-bl` | Bottom-left |

---

### Border Utilities

```html
<!-- Border width -->
<div class="border">Default border (1px)</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>
<div class="border-0">No border</div>

<!-- Individual sides -->
<div class="border-t-2">Top border only</div>
<div class="border-b">Bottom border only</div>
<div class="border-l-4 border-blue-500">Left accent border</div>

<!-- Border color -->
<div class="border border-gray-200">Gray border</div>
<div class="border border-red-500">Red border (error state)</div>
<div class="border border-green-400">Green border (success)</div>

<!-- Divide (between flex/grid children) -->
<div class="divide-y divide-gray-200">
  <div>Item 1</div>  <!-- ← border-bottom -->
  <div>Item 2</div>  <!-- ← border-bottom -->
  <div>Item 3</div>
</div>
```

---

### Border Radius

```html
<div class="rounded-sm">Small radius (2px)</div>
<div class="rounded">Default radius (4px)</div>
<div class="rounded-md">Medium radius (6px)</div>
<div class="rounded-lg">Large radius (8px)</div>
<div class="rounded-xl">Extra large (12px)</div>
<div class="rounded-2xl">2xl radius (16px)</div>
<div class="rounded-3xl">3xl radius (24px)</div>
<div class="rounded-full">Fully rounded (pill/circle)</div>

<!-- Individual corners -->
<div class="rounded-t-lg">Top corners only</div>
<div class="rounded-b-lg">Bottom corners only</div>
<div class="rounded-l-full">Left side pill shape</div>

<!-- Practical example -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg">
  Rounded Button
</button>

<img class="rounded-full w-16 h-16" src="avatar.jpg" alt="Avatar" />
```

---

### Shadow & Opacity

```html
<!-- Shadow scale (none → large) -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default</div>
<div class="shadow-md">Medium</div>
<div class="shadow-lg">Large</div>
<div class="shadow-xl">Extra large</div>
<div class="shadow-2xl">2xl</div>
<div class="shadow-inner">Inner shadow</div>
<div class="shadow-none">No shadow</div>

<!-- Opacity -->
<div class="opacity-100">Fully opaque (default)</div>
<div class="opacity-75">75% visible</div>
<div class="opacity-50">50% — semi-transparent</div>
<div class="opacity-25">25% — very faint</div>
<div class="opacity-0">Invisible but still in layout</div>
```

### Ring (Focus Outlines)

```html
<!-- Ring replaces outline for focus styles -->
<input class="ring-2 ring-blue-500" />
<input class="ring ring-offset-2 ring-blue-500" />

<!-- Focus state (accessibility) -->
<button class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Focusable Button
</button>
```

---

### Complete Card Example

```html
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
  <!-- Image -->
  <img class="w-full h-48 object-cover" src="card-image.jpg" alt="Card image" />

  <!-- Content -->
  <div class="p-6">
    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
      Category
    </div>
    <h3 class="mt-1 text-xl font-semibold text-gray-900">
      Card Title
    </h3>
    <p class="mt-2 text-gray-500">
      This is the card description with body text.
    </p>
    <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                   focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Learn More
    </button>
  </div>
</div>

<!-- Visual result:
┌──────────────────────────────────┐
│            [Image]                │
│                                  │
│  CATEGORY                        │
│  Card Title                      │
│  This is the card description    │
│  with body text.                 │
│                                  │
│  [Learn More ████████████████]   │
└──────────────────────────────────┘
-->
```

---

### In Simple Words

- Use **`bg-*`** for backgrounds, `bg-gradient-to-*` for gradients
- **`border-*`** controls border width, color, and sides; `rounded-*` controls radius
- **`shadow-*`** adds box shadows from `shadow-sm` to `shadow-2xl`
- **`opacity-*`** controls transparency (100 = opaque, 0 = invisible)
- **`ring-*`** replaces `outline` for focus indicators (accessibility)
- Combine background, border, shadow, and radius to create polished UI cards
