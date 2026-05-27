---
title: Python IDEs and Tools
description: Overview of Python IDEs, VS Code setup, and development environment configuration.
sidebar:
  order: 3
---

# Python IDEs and Tools

## Introduction

Choosing the right IDE and configuring your development environment properly is crucial for productivity.

## Popular IDEs

| IDE | Best For | Cost | Features |
|-----|---------|------|---------|
| **VS Code** | General, lightweight | Free | Extensions, Git, terminal |
| **PyCharm** | Professional Python | Free/Paid | Intelligent refactoring, debugger |
| **Jupyter Notebook** | Data Science, ML | Free | Interactive cells, inline plots |
| **Spyder** | Scientific computing | Free | Variable explorer |
| **Thonny** | Absolute beginners | Free | Simple, step-by-step debugger |

## VS Code Setup

### Essential Extensions

1. **Python** (by Microsoft) — IntelliSense, linting, debugging
2. **Pylance** — Fast language support
3. **Python Indent** — Correct auto-indentation
4. **autoDocstring** — Auto-generate docstrings

### Settings

```json
{
    "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",
    "editor.formatOnSave": true,
    "[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter",
        "editor.formatOnSave": true
    },
    "python.linting.enabled": true,
    "editor.tabSize": 4
}
```

## Virtual Environments

```bash
# Create virtual environment
python3 -m venv .venv

# Activate
source .venv/bin/activate     # Linux/macOS
.venv\Scripts\activate        # Windows

# Deactivate
deactivate
```

## Why It Matters

A proper development setup saves time, prevents errors, and ensures code quality.

## Common Mistakes

- Installing packages globally instead of in a virtual environment
- Not configuring the correct Python interpreter in VS Code
- Ignoring linting warnings

## Practice Exercises

1. Set up VS Code with Python extensions and auto-formatting with Black.
2. Create a virtual environment, install a package, and verify isolation.
3. Configure a debug configuration in VS Code for a Python script.
