---
title: pytest Framework
description: Learn how to write clean, concise tests with pytest — fixtures, parametrization, conftest, and plugins.
sidebar:
  order: 2
---

# pytest Framework

## Introduction

**pytest** is the most popular Python testing framework. It's simpler than unittest, with powerful features like fixtures, parametrization, and plugins.

## Installation

```bash
pip install pytest pytest-cov
```

## Basic Tests

```python
# test_calculator.py — no class needed!
def test_add():
    assert add(3, 5) == 8

def test_divide():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)
```

## Running Tests

```bash
# Run all tests
pytest

# Verbose output
pytest -v

# Run specific file
pytest test_calculator.py

# Run specific test
pytest test_calculator.py::test_add

# Stop on first failure
pytest -x

# Run tests matching pattern
pytest -k "user or login"
```

## Fixtures

```python
import pytest

@pytest.fixture
def sample_user():
    """Create a sample user for testing."""
    return {"name": "Alice", "age": 30}

@pytest.fixture
def db_connection():
    """Setup and teardown database."""
    conn = create_test_db()
    yield conn  # Test runs here
    conn.close()  # Cleanup

def test_user_name(sample_user):
    assert sample_user["name"] == "Alice"

def test_user_age(sample_user):
    assert sample_user["age"] == 30
```

## Parametrization

```python
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

# Multiple parameters
@pytest.mark.parametrize("username", ["user1", "user2", "admin"])
@pytest.mark.parametrize("role", ["admin", "editor", "viewer"])
def test_permissions(username, role):
    assert check_permission(username, role) is not None
```

## conftest.py

```python
# conftest.py — shared fixtures available to all tests
import pytest

@pytest.fixture
def app():
    """Create test application."""
    app = create_app()
    app.config["TESTING"] = True
    return app

@pytest.fixture
def client(app):
    """Test client for HTTP requests."""
    return app.test_client()
```

## Markers

```python
import pytest

@pytest.mark.slow
def test_heavy_computation():
    # This test takes a long time
    pass

@pytest.mark.skip(reason="Not implemented yet")
def test_future_feature():
    pass

@pytest.mark.xfail(reason="Known issue #123")
def test_known_bug():
    assert 1 / 0  # Expected to fail

# Run only slow tests
# pytest -m slow

# Run all except slow
# pytest -m "not slow"
```

## Mocking with pytest

```python
from unittest.mock import Mock, patch

def test_get_user(monkeypatch):
    # Using monkeypatch
    def mock_get_user(user_id):
        return {"id": user_id, "name": "Alice"}
    
    monkeypatch.setattr("mymodule.get_user", mock_get_user)
    result = get_user(1)
    assert result["name"] == "Alice"

# Using mocker plugin (pytest-mock)
def test_get_user(mocker):
    mock_response = mocker.patch("requests.get")
    mock_response.return_value.json.return_value = {"name": "Alice"}
    
    result = fetch_user(1)
    assert result["name"] == "Alice"
```

## Coverage

```bash
# Run with coverage
pytest --cov=src --cov-report=html

# Coverage configuration (setup.cfg)
# [tool:pytest]
# testpaths = tests
# python_files = test_*.py
```

## Best Practices

1. **Use plain `assert`** — no need for special assertion methods
2. **Use fixtures** for reusable test setup and cleanup
3. **Use parametrization** to test multiple cases without repetition
4. **Use conftest.py** for shared fixtures across test files
5. **Keep tests fast** — no network calls in unit tests
6. **Name test files** `test_*.py` and functions `test_*`

## Practice Exercises

**Exercise 1:** Convert your unittest Calculator tests to pytest style with parametrization.

**Exercise 2:** Create a fixture that creates temporary files for testing file operations.
