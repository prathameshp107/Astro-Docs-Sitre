---
title: "Portals"
description: "createPortal lets you render a React component outside its parent DOM tree — perfect for modals, tooltips, and overlays."
sidebar:
  order: 3
---

# Portals

## Simple Words First 🟡

> **Analogy:** 👉 Normally, a child component lives inside its parent's DOM container — like a kid in their room. A portal is like a **secret tunnel** — the kid is still logically part of the family (React tree), but physically they're in the backyard (different DOM node).

## What Portals Solve

Problems with modals without portals:
- CSS `overflow: hidden` on a parent **clips the modal**
- `z-index` stacking becomes a nightmare
- CSS transforms on a parent break `position: fixed`

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    // 1st arg: What to render (JSX)
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    // 2nd arg: Where to render (DOM node)
    document.body
    // 👆 Renders outside any parent, even if Modal is deeply nested
  );
}
```

## Example — Tooltip Portal

```jsx
function TooltipPortal({ text, children }) {
  const [show, setShow] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && createPortal(
        <div className="tooltip">{text}</div>,
        document.getElementById('tooltip-root')
      )}
    </div>
  );
}
```

## Event Bubbling — Important!

Even though the portal renders to a different DOM node, **events bubble through the React tree** — not the DOM tree:

```jsx
function Parent() {
  return (
    <div onClick={() => console.log('Clicked parent!')}>
      <ModalPortal />
    </div>
  );
}

function ModalPortal() {
  return createPortal(
    <button onClick={() => console.log('Clicked button')}>
      Click me
    </button>,
    document.body
  );
}

// Clicking the button logs:
// "Clicked button"  (button onClick)
// "Clicked parent!" (event bubbles through React tree, NOT DOM)
```

## In Simple Words 🧠

- `createPortal(jsx, domNode)` renders JSX **outside** the parent's DOM container
- Perfect for **modals, tooltips, dropdowns, notifications, and overlays**
- Event **bubbling follows the React tree**, not the DOM — so context and events still work
- The component keeps its React context (theme, state, provider) — only the DOM moves
- Don't forget to add a portal root `<div id="portal-root">` in your HTML
