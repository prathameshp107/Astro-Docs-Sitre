# 01 — Authentication Basics

## Introduction
Authentication verifies who a user is. Authorization determines what they can do. This section covers the fundamentals: identifiers, secrets, sessions, tokens, and security principles.

## Why this matters
Without solid authentication foundations, applications are vulnerable to impersonation, session hijacking, and credential theft. Understanding basics prevents costly security flaws.

## Learning objectives
- Define authentication, authorization, and authentication factors
- Explain session vs token-based auth
- Describe hashing, salting, and password storage best practices
- Identify common auth vulnerabilities (brute force, session fixation)
- Explain OAuth 2.0 and OpenID Connect basics

## Key concepts
### Authentication Factors
1. **Something you know** (password, PIN)
2. **Something you have** (phone, security key)
3. **Something you are** (biometrics)

### Session vs Token Auth
- **Session-based**: Server stores session state, client sends session ID
- **Token-based**: Stateless tokens (JWT) carry claims, verified via signature

### Password Security
- Use bcrypt/scrypt/argon2 for hashing
- Never store plaintext passwords
- Implement rate limiting on login attempts
- Use HTTPS to prevent credential interception

### Common Vulnerabilities
- **Brute force**: Mitigate with rate limiting and CAPTCHA
- **Session fixation**: Rotate session IDs on login
- **CSRF**: Use SameSite cookies and CSRF tokens
- **XSS**: Sanitize user input and use HTTP-only cookies

## Authentication flow
```
User → Login Form → Server validates credentials → 
Create session/JWT → Send to client → 
Client stores token/cookie → 
Subsequent requests include credentials → 
Server validates and grants access
```

## Hands-on exercises
1. Create a login form with email/password
2. Implement password hashing with bcrypt
3. Create session storage with Redis or in-memory store
4. Build middleware to protect routes
5. Simulate brute force attack and implement rate limiting

## Mini project
Build a simple auth system with:
- User registration with email verification
- Login/logout with session management
- Protected dashboard route
- Password hashing with bcrypt
- Basic rate limiting on login attempts

## Knowledge check
1. What's the difference between authentication and authorization?
2. Why should passwords be hashed instead of encrypted?
3. How do sessions differ from JWT tokens?
4. What is CSRF and how doe?
5. Why is HTTPS required for authentication?