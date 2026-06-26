---
title: "Configuration & Environment"
description: "Environment variables, dotenv, configuration per environment (dev/staging/prod), secrets management, and best practices."
sidebar:
  order: 1
---

## Configuration & Environment

Proper configuration management keeps your app secure and portable across environments. Never hardcode secrets or environment-specific values.

### Environment Variables with `dotenv`

```javascript
// Install: npm install dotenv

// .env file (NEVER commit to Git!)
PORT=3000
NODE_ENV=development
DB_URL=mongodb://localhost:27017/myapp
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-here-change-in-production
S3_BUCKET=my-dev-bucket

// .env.production
PORT=8080
NODE_ENV=production
DB_URL=mongodb://prod-cluster:27017/myapp
JWT_SECRET=completely-different-secret
```

```javascript
// Load environment variables
require('dotenv').config();
// Now process.env.PORT, process.env.DB_URL, etc. are available

// Or load a specific file
require('dotenv').config({ path: '.env.production' });
```

### Configuration Module Pattern

```javascript
// config/index.js
const dotenv = require('dotenv');
const path = require('path');

// Load the appropriate .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
// Also load .env (base config, checked-in defaults)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  env,
  port: parseInt(process.env.PORT, 10) || 3000,
  isProduction: env === 'production',
  isDevelopment: env === 'development',
  isTest: env === 'test',
  
  db: {
    url: process.env.DB_URL,
    options: {
      maxPoolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
      ssl: env === 'production',
    },
  },
  
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  },
  
  s3: {
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION || 'us-east-1',
  },
  
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Validate required config at startup
const requiredVars = ['DB_URL', 'JWT_SECRET'];
requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

module.exports = config;
```

### Using the Config

```javascript
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});

if (config.isDevelopment) {
  app.use(morgan('dev')); // Verbose logging in dev
}

mongoose.connect(config.db.url, config.db.options);
```

### Secrets Management

| Method | Best for | How |
|---|---|---|
| **.env files** | Local dev, small teams | Committed `.env.example`, real `.env` in `.gitignore` |
| **Environment variables** | Docker, CI/CD | Set via `export`, Docker `-e`, CI secrets |
| **Secret managers** | Production | AWS Secrets Manager, HashiCorp Vault, Doppler |
| **Encrypted config** | Repo-safe secrets | `git-crypt`, `sops`, `blackbox` |

```javascript
// AWS Secrets Manager (production)
const { SecretsManager } = require('@aws-sdk/client-secrets-manager');

async function loadSecrets() {
  const client = new SecretsManager({ region: 'us-east-1' });
  
  const response = await client.getSecretValue({
    SecretId: 'prod/myapp/secrets',
  });
  
  const secrets = JSON.parse(response.SecretString);
  process.env.DB_URL = secrets.DB_URL;
  process.env.JWT_SECRET = secrets.JWT_SECRET;
}
```

### Environment-Specific Config

```javascript
// config/default.js — shared across all environments
module.exports = {
  port: 3000,
  logLevel: 'info',
  pagination: { defaultLimit: 20, maxLimit: 100 },
};

// config/development.js
module.exports = {
  logLevel: 'debug',
  db: { url: 'mongodb://localhost:27017/myapp-dev' },
};

// config/production.js
module.exports = {
  port: process.env.PORT || 8080,
  db: { url: process.env.DB_URL },
  redis: { url: process.env.REDIS_URL },
};

// config/index.js — merges configs
const _ = require('lodash');
const defaultConfig = require('./default');
const envConfig = require(`./${process.env.NODE_ENV || 'development'}`);

module.exports = _.merge(defaultConfig, envConfig);
```

### 🚨 Common Gotchas

```javascript
// ❌ Committing secrets to Git
// .env with real passwords checked into version control!

// ✅ Always gitignore .env files and use .env.example
// .env.example (committed):
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=change-me-in-production

// ❌ Hardcoding environment-specific values
const dbUrl = 'mongodb://localhost:27017/myapp'; // Won't work in prod!

// ✅ Always use environment variables
const dbUrl = process.env.DB_URL;

// ❌ Not providing defaults
const port = process.env.PORT; // undefined if not set!

// ✅ Always provide sensible defaults
const port = process.env.PORT || 3000;
```

### Key Takeaways

- Use **`dotenv`** to load `.env` files in development
- **Never commit secrets** to version control — use `.env.example` for documentation
- Validate required environment variables at **startup** — fail fast
- Use a **config module** to centralize and organize configuration
- Provide **sensible defaults** for non-critical values
- Use **secret managers** (AWS Secrets Manager, Vault) in production
- Environment-specific config files help manage different environments
- Keep configuration **outside the application code** — the same code should run everywhere
