---
title: Security
description: JavaScript security best practices — preventing common vulnerabilities
sidebar:
  order: 6
---

# Security

## Introduction

Security is critical for production applications. JavaScript has specific vulnerabilities to be aware of, especially in client-side code.

## XSS (Cross-Site Scripting)

```javascript
// ❌ Vulnerable — innerHTML with user input
element.innerHTML = userInput;

// ✅ Safe — textContent
element.textContent = userInput;

// ✅ Safe — sanitize before using innerHTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## CSRF Prevention

```javascript
// Use SameSite cookies
document.cookie = 'session=abc123; SameSite=Strict; Secure';

// Include CSRF tokens in requests
fetch('/api/data', {
  headers: {
    'CSRF-Token': csrfToken
  }
});
```

## Security Checklist

- ✅ Use HTTPS everywhere
- ✅ Sanitize user input (never trust it)
- ✅ Implement Content Security Policy (CSP)
- ✅ Keep dependencies updated (npm audit)
- ✅ Use `Helmet` for Express.js headers
- ✅ Use `Strict` mode for CSP
- ✅ Limit data exposure in API responses

## Summary

- XSS: sanitize user input, use textContent
- CSRF: use SameSite cookies, CSRF tokens
- CSP: restrict which scripts can execute
- npm audit: check for vulnerable dependencies
- Security is everyone's responsibility

## Further Reading

- [OWASP: JavaScript Security](https://owasp.org/www-community/attacks/xss/)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
