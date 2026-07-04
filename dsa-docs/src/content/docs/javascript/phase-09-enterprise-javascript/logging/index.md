---
title: Logging
description: Structured logging strategies for production JavaScript applications
sidebar:
  order: 3
---

# Logging

## Introduction

Production logging is essential for debugging, monitoring, and understanding application behavior. Structured logs make analysis and alerting easier.

## Log Levels

```javascript
const LOG_LEVELS = {
  DEBUG: 0,  // Detailed information for debugging
  INFO: 1,   // General operational information
  WARN: 2,   // Potentially harmful situations
  ERROR: 3   // Error events that might still allow the app to continue
};
```

## Structured Logger

```javascript
class Logger {
  constructor(context = {}) {
    this.context = context;
  }

  info(message, data = {}) {
    this.log('INFO', message, data);
  }

  warn(message, data = {}) {
    this.log('WARN', message, data);
  }

  error(message, error = {}, data = {}) {
    this.log('ERROR', message, {
      ...data,
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      }
    });
  }

  log(level, message, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data,
      ...this.context,
      environment: process.env.NODE_ENV
    };

    if (level === 'ERROR') {
      console.error(JSON.stringify(entry));
    } else if (level === 'WARN') {
      console.warn(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }

    // Send to logging service
    // logService.send(entry);
  }

  child(context) {
    return new Logger({ ...this.context, ...context });
  }
}

const logger = new Logger({ service: 'user-service' });
logger.info('User created', { userId: 123 });
```

## Summary

- Use structured logging (JSON format)
- Log levels: DEBUG, INFO, WARN, ERROR
- Include context (requestId, userId, service name)
- Never log sensitive data (passwords, tokens)

## Further Reading

- [12 Factor App: Logs](https://12factor.net/logs)
