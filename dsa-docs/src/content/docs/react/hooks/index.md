---
title: "Hooks"
description: "Complete guide to React Hooks including useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, and custom hooks."
---
# Hooks

Complete guide to React Hooks including useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, and custom hooks.

## Rules of Hooks — Why Order Matters

```mermaid
flowchart TB
    Sub["Component re-renders"] --> Check{"React checks\nhooks in order"}
    Check -->|"✅ useState → useEffect → useRef → ..."| OK["State matches\ncorrectly"]
    Check -->|"❌ useState → (return early) → useEffect"| Broken["Hook order\nmismatch!"]
    Broken --> Error["Error: Rendered\nfewer hooks than\nexpected"]

    style Sub fill:#4f46e5,color:#fff
    style Check fill:#d97706,color:#fff
    style OK fill:#059669,color:#fff
    style Broken fill:#dc2626,color:#fff
    style Error fill:#dc2626,color:#fff
```

## The Rules

1. **Only call hooks at the top level** — not inside conditions, loops, or nested functions
2. **Only call hooks from React function components** — not regular JavaScript functions
3. React relies on **hook call order** to match state between renders — breaking the order breaks state