---
title: Clipboard API
description: Reading and writing to the clipboard with JavaScript
sidebar:
  order: 12
---

# Clipboard API

## Introduction

The **Clipboard API** provides asynchronous access to the system clipboard for reading and writing text and other data.

## Topics Covered

- [Writing](./writing) — Copying text and data to the clipboard
- [Reading](./reading) — Pasting text and data from the clipboard
- [Permissions](./permissions) — Security requirements for clipboard access

## Summary

`navigator.clipboard.writeText()` for copying, `readText()` for pasting. Requires HTTPS and user interaction. Async API returns Promises.

## Further Reading

- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
