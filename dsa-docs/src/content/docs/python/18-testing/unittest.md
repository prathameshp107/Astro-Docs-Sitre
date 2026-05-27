---
title: unittest Framework
description: Learn how to write and run unit tests using Python's built-in unittest framework.
sidebar:
  order: 1
---

# unittest Framework

## Introduction

Python's built-in `unittest` module provides a comprehensive testing framework with test discovery, fixtures, assertions, and test runners.

## Basic Test Structure

```python
import unittest
from mymodule import add, divide

class TestMathOperations(unittest.TestCase):
    
    def test_add_positive_numbers(self):
        result = add(3, 5)
        self.assertEqual(result, 8)
    
    def test_add_negative_numbers(self):
        self.assertEqual(add(-3, -5), -8)
    
    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == "__main__":
    unittest.main()
```

## Common Assertions

```python
class TestAssertions(unittest.TestCase):
    
    def test_assertions(self):
        self.assertEqual(a, b)        # a == b
        self.assertNotEqual(a, b)     # a != b
        self.assertTrue(x)            # bool(x) is True
        self.assertFalse(x)           # bool(x) is False
        self.assertIs(a, b)           # a is b
        self.assertIsNone(x)          # x is None
        self.assertIn(item, list)     # item in list
        self.assertIsInstance(obj, cls)
        self.assertAlmostEqual(a, b)  # For floats
        self.assertRaises(Error, func, *args)
```

## Test Fixtures (Setup/Teardown)

```python
class TestDatabase(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Run once before all tests."""
        cls.connection = create_test_database()
    
    @classmethod
    def tearDownClass(cls):
        """Run once after all tests."""
        cls.connection.close()
    
    def setUp(self):
        """Run before each test."""
        self.db = self.connection.get_session()
        self.db.add_test_data()
    
    def tearDown(self):
        """Run after each test."""
        self.db.clear_test_data()
    
    def test_insert_user(self):
        self.db.insert_user("Alice", "alice@example.com")
        user = self.db.find_user_by_email("alice@example.com")
        self.assertIsNotNone(user)
```

## Test Discovery

```python
# Run all tests in files matching test_*.py
# python -m unittest discover

# Specify directory
# python -m unittest discover tests/

# Pattern matching
# python -m unittest discover -p "*_test.py"
```

## Mocking

```python
from unittest.mock import Mock, patch
import requests

class TestAPI(unittest.TestCase):
    
    @patch("requests.get")
    def test_fetch_user(self, mock_get):
        # Setup mock
        mock_response = Mock()
        mock_response.json.return_value = {"id": 1, "name": "Alice"}
        mock_response.status_code = 200
        mock_get.return_value = mock_response
        
        # Test
        result = fetch_user(1)
        self.assertEqual(result["name"], "Alice")
        mock_get.assert_called_once_with("https://api.example.com/users/1")
```

## Best Practices

1. **Test one thing per test method** — single assertion or related assertions
2. **Use descriptive test names** — `test_withdraw_insufficient_funds_raises_error`
3. **Use fixtures (setUp/tearDown)** for test data setup
4. **Use mocking** for external dependencies
5. **Run tests often** — ideally on every save
6. **Keep tests fast and isolated** — no test should depend on another

## Practice Exercises

**Exercise 1:** Write unit tests for a Calculator class with add, subtract, multiply, divide methods.

**Exercise 2:** Write tests for a function that reads and parses a CSV file, using mocking for file operations.
