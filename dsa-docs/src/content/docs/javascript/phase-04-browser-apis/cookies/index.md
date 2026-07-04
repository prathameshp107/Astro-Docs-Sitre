---
title: Cookies
description: Working with browser cookies in JavaScript
sidebar:
  order: 10
---

# Cookies

## Introduction

**Cookies** are small pieces of data stored by the browser. Unlike Web Storage, cookies are automatically sent to the server with every HTTP request.

## Topics Covered

- [Reading Cookies](./reading) — Accessing cookies with document.cookie
- [Writing Cookies](./writing) — Setting cookies with options
- [Deleting Cookies](./deleting) — Removing cookies
- [Cookies vs Web Storage](./vs-web-storage) — When to use which

## Summary

Cookies are sent with every HTTP request (~4KB limit). Use `Secure`, `SameSite`, and `HttpOnly` flags. Prefer Web Storage for non-authentication data.

## Further Reading

- [MDN: Cookies](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
