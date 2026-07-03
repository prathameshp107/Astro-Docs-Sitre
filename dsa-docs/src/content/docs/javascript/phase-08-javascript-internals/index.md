---
title: Phase 8 — JavaScript Internals
description: How JavaScript engines work internally — parser, compiler, interpreter, V8 architecture, TurboFan, hidden classes, and memory layout
sidebar:
  order: 8
---

# Phase 8 — JavaScript Internals

## Introduction

JavaScript engines (like V8, SpiderMonkey, JavaScriptCore) are incredibly sophisticated. This phase covers how they parse, compile, and optimize JavaScript code.

## Learning Objectives

- Understand the pipeline: parse → compile → execute → optimize
- Learn how V8 optimizes code with hidden classes and inline caching
- Understand the difference between interpreter and compiler (JIT)
- Master memory layout and garbage collection internals

## Topics Covered

| Topic | Description |
|-------|-------------|
| Parser | Tokenizing and AST generation |
| Compiler | Compiling JS to bytecode/machine code |
| Interpreter | Executing code (Ignition in V8) |
| Ignition | V8's fast interpreter |
| TurboFan | V8's optimizing compiler |
| Hidden Classes | Shape optimization for objects |
| Inline Cache | Caching property access patterns |
| Event Loop Internals | Deep dive into async execution |
| V8 Architecture | Full V8 pipeline overview |
| Memory Layout | How objects are stored in memory |

## Estimated Learning Time

**3–4 hours**

## Related Topics

- Phase 2 — Core Concepts (execution context, call stack)
- Phase 6 — Performance
