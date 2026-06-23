---
title: "Input Validation"
description: "Input validation with Joi, Zod, and express-validator for Node.js and Express applications."
sidebar:
  order: 3
---

## Input Validation

Input validation ensures that data coming into your application is correct, safe, and properly formatted. Never trust user input — validate everything.

### Why Validate?

```javascript
// ❌ Without validation — fragile and dangerous
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);  // Could contain anything!
  res.json(user);
});

// SQL injection, XSS, invalid types, missing required fields
// All of these can be prevented with validation
```

### Validation with Zod

Zod is a TypeScript-first schema validation library. It's modern, composable, and type-safe.

```javascript
const { z } = require('zod');

// Define a schema
const UserSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string()
    .email('Invalid email format'),
  age: z.number()
    .int('Age must be an integer')
    .min(18, 'You must be at least 18')
    .max(120, 'Invalid age'),
  role: z.enum(['user', 'admin', 'moderator']).default('user'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
});

// Validate middleware
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    next(err);
  }
};

// Usage
app.post('/users', validate(UserSchema), (req, res) => {
  // req.body is now validated and typed
  res.json({ success: true, data: req.body });
});
```

### Validation with Joi

Joi is a mature, expressive validation library with a rich API.

```javascript
const Joi = require('joi');

const ProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().valid('electronics', 'clothing', 'food'),
  tags: Joi.array().items(Joi.string()).max(5),
  inStock: Joi.boolean().default(true),
  description: Joi.string().max(1000).optional(),
});

const validateJoi = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => ({
        field: d.path.join('.'),
        message: d.message,
      })),
    });
  }
  
  req.body = value; // Use the sanitized value
  next();
};

app.post('/products', validateJoi(ProductSchema), createProduct);
```

### Validation with express-validator

Built on top of validator.js, integrates directly with Express.

```javascript
const { body, validationResult, query, param } = require('express-validator');

app.post('/users',
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('age').isInt({ min: 18, max: 120 }).withMessage('Age must be 18-120'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password too short')
    .matches(/[A-Z]/).withMessage('Must contain uppercase')
    .matches(/[0-9]/).withMessage('Must contain a number'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array().map(e => ({
          field: e.path,
          message: e.msg,
        })),
      });
    }
    // Proceed with validated data
    res.json({ success: true });
  }
);
```

### Sanitization

Validation and sanitization go hand in hand.

```javascript
const { body } = require('express-validator');

app.post('/comments',
  body('text')
    .trim()                           // Remove whitespace
    .escape()                         // Escape HTML entities
    .stripLow()                       // Remove non-printable chars
    .isLength({ min: 1, max: 1000 }),
  
  body('email').normalizeEmail(),     // Lowercase, remove dots etc.
  
  (req, res) => {
    // req.body.text is now sanitized
  }
);
```

### Custom Validators

```javascript
const { body } = require('express-validator');

app.post('/register',
  body('email').custom(async (email) => {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error('Email already in use');
    }
    return true;
  }),
  
  body('password').custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed
  }
);
```

### Comparison: Joi vs Zod vs express-validator

| Feature | Joi | Zod | express-validator |
|---|---|---|---|
| TypeScript support | Good (v17+) | ✅ Excellent (built for TS) | Basic |
| Bundle size | ~50KB | ~10KB | ~15KB |
| Schema composition | ✅ Rich API | ✅ Composable | ❌ Per-route |
| Error messages | ✅ Customizable | ✅ Customizable | ✅ Built-in |
| Popularity | Mature, widely used | Modern, fast-growing | Express native |

### 🚨 Common Gotchas

```javascript
// ❌ Validating at the wrong layer
// Don't validate in the database layer — validate at the API boundary

// ❌ Not normalizing input
body('email').isEmail() // Still could have mixed case, extra dots

// ✅ Normalize
body('email').isEmail().normalizeEmail()

// ❌ Only validating on one content type
app.use(express.json()); // Without this, req.body is undefined!

// ❌ Letting ZodError crash the process
try {
  schema.parse(data);
} catch (err) {
  // ❌ If err is not a ZodError (e.g., database error), it crashes!
  if (err instanceof z.ZodError) {
    // handle
  } else {
    throw err;
  }
}
```

### Key Takeaways

- **Validate at the API boundary** — never trust user input
- Use **Zod** for TypeScript-first projects, **Joi** for mature Express apps
- Always **sanitize** input (trim, escape, normalize) in addition to validation
- Return **detailed error messages** — tell the user exactly which field failed and why
- Validate as **middleware** — keep route handlers clean
- Check for uniqueness and business rules with **custom validators**
- Never expose internal error details in production responses
