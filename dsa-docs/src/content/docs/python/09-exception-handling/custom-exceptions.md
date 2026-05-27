---
title: Custom Exceptions
description: Learn how to create and use custom exception classes in Python.
sidebar:
  order: 2
---

# Custom Exceptions

## Introduction

Custom exceptions allow you to create meaningful error types specific to your application's domain.

## Creating Custom Exceptions

```python
class InsufficientFundsError(Exception):
    """Raised when account has insufficient funds."""
    pass

class AccountNotFoundError(Exception):
    """Raised when account is not found."""
    def __init__(self, account_id, message=None):
        self.account_id = account_id
        self.message = message or f"Account {account_id} not found"
        super().__init__(self.message)

class ValidationError(Exception):
    """Raised when data validation fails."""
    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        super().__init__(f"{field}: {reason} (got {value!r})")
```

## Using Custom Exceptions

```python
class BankAccount:
    def __init__(self, account_id, balance=0):
        self.account_id = account_id
        self.balance = balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValidationError("amount", amount, "must be positive")
        if amount > self.balance:
            raise InsufficientFundsError(
                f"Need ${amount}, have ${self.balance}"
            )
        self.balance -= amount
    
    def transfer(self, target, amount):
        if not isinstance(target, BankAccount):
            raise AccountNotFoundError(id(target))
        self.withdraw(amount)
        target.deposit(amount)
```

## Exception Hierarchy

```python
# Application-level exception
class AppError(Exception):
    """Base exception for the application."""
    pass

class DatabaseError(AppError):
    """Database-related errors."""
    pass

class ConnectionError(DatabaseError):
    """Database connection failures."""
    pass

class QueryError(DatabaseError):
    """Query execution failures."""
    pass

class APIRateLimitError(AppError):
    """API rate limit exceeded."""
    def __init__(self, retry_after):
        self.retry_after = retry_after
        super().__init__(f"Rate limited. Retry after {retry_after}s")
```

## Best Practices

1. **Inherit from `Exception`** (not `BaseException`)
2. **Keep exception names descriptive** — `InsufficientFundsError`, not `FundsError`
3. **Include relevant context** in the exception message
4. **Create a base exception** for your application and inherit from it
5. **Don't over-engineer** — simple `ValueError` with good messages is often enough
