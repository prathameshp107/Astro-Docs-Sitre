---
title: "Authentication & Security"
description: "JWT authentication, bcrypt password hashing, CORS, Helmet, rate limiting, and environment variables."
---

# Section 7: Authentication & Security

## 🔐 JWT (JSON Web Tokens)

**JWT** is a compact, URL-safe token format used to securely transmit information between parties.

### Structure of a JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← Header (base64)
.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ  ← Payload (base64)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature (HMAC)
```

![JWT Authentication Flow](/DSA-Notes-Problems/assets/nodejs/jwt-auth-flow.svg)

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  async login(email, password) {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    
    // 2. Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');
    
    // 3. Create tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
  }
  
  async register(name, email, password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
  }
}
```

---

## 🔒 Security Best Practices

### CORS (Cross-Origin Resource Sharing)

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### Helmet (Security Headers)

```javascript
const helmet = require('helmet');
app.use(helmet());
// Adds: X-XSS-Protection, X-Frame-Options, HSTS, CSP, etc.
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later' },
});

app.use(limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use('/auth', authLimiter);
```

### Environment Variables

```javascript
// .env (NEVER commit to Git)
JWT_SECRET=super-long-random-secret-key-here
DB_URL=mongodb://localhost:27017/myapp
PORT=3000
NODE_ENV=production

// Load them
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// Validate required env vars at startup
const requiredEnvVars = ['JWT_SECRET', 'DB_URL', 'PORT'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```
