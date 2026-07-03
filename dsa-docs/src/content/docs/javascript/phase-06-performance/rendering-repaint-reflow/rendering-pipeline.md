---
title: The Rendering Pipeline
description: Style calculation, layout, paint, and compositing explained
sidebar:
  order: 1
---

# The Rendering Pipeline

## Introduction

The browser's rendering pipeline converts HTML, CSS, and JavaScript into pixels on the screen. Understanding each stage helps you write performant code.

## Pipeline Stages

```mermaid
flowchart LR
    A["JavaScript\n(DOM/CSS changes)"] --> B["Style\nCalculation"]
    B --> C["Layout\n(Reflow)"]
    C --> D["Paint\n(Repaint)"]
    D --> E["Compositing"]
```

### 1. Style Calculation

The browser computes which CSS rules apply to each element and calculates their final styles.

```javascript
// Accessing computed styles
const style = getComputedStyle(element);
console.log(style.color); // 'rgb(255, 0, 0)'

// Changing a class triggers style recalculation
element.classList.add('highlight');
```

### 2. Layout (Reflow)

The browser calculates the **position and size** of each element. This is the most expensive stage.

```javascript
// Reading layout properties forces a synchronous layout
const width = element.offsetWidth;  // Forces layout
const height = element.offsetHeight; // Uses cached layout

// Batch reads together
const rect = element.getBoundingClientRect();
// Then batch writes
element.style.width = '100px';
element.style.height = '200px';
```

### 3. Paint (Repaint)

The browser fills in pixels — colors, backgrounds, borders, text.

```javascript
// Changes that only trigger paint (no layout)
element.style.color = 'red';
element.style.backgroundColor = '#f0f0f0';
element.style.boxShadow = '2px 2px 4px black';
```

### 4. Compositing

The browser layers painted elements and composites them on the GPU.

```javascript
// Changes that only trigger compositing (fastest!)
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';
```

## Pipeline Optimization

| Stage | Triggers | Cost |
|-------|----------|------|
| Style | Class changes, inline styles | Low |
| Layout | Width, height, position, font | High |
| Paint | Color, background, shadow | Medium |
| Compositing | Transform, opacity | Low 🚀 |

## Summary

- The pipeline runs in order: Style → Layout → Paint → Composite
- Layout (reflow) is the most expensive stage
- Compositing-only changes (transform, opacity) are cheapest
- Batch read/write operations to avoid forced layouts

## Further Reading

- [Web.dev: Rendering Performance](https://web.dev/learn/performance/rendering/)
