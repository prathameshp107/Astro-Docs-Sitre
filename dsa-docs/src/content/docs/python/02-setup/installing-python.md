---
title: Installing Python
description: Step-by-step guide for installing Python on Windows, Linux, and macOS.
sidebar:
  order: 1
---

# Installing Python

## Introduction

Python runs on all major operating systems. Here's how to install it on Windows, Linux, and macOS.

## Windows Installation

### Official Installer (Recommended)

1. Download from [python.org/downloads](https://python.org/downloads)
2. **CRITICAL:** Check "Add Python to PATH" before clicking Install
3. Click "Install Now"

### Using winget

```powershell
winget install Python.Python.3.12
```

### Using pyenv-win (Multiple Versions)

```powershell
pyenv install 3.12.0
pyenv global 3.12.0
```

## Linux Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### Using pyenv (Best Practice)

```bash
curl https://pyenv.run | bash
pyenv install 3.12.0
pyenv global 3.12.0
```

## macOS Installation

### Using Homebrew (Recommended)

```bash
brew install python@3.12
```

### Using pyenv

```bash
brew install pyenv
pyenv install 3.12.0
pyenv global 3.12.0
```

> 💡 **Pro Tip:** Always use pyenv when managing multiple Python projects professionally. Never modify the system Python on macOS.

## Verifying Installation

```bash
python3 --version
pip3 --version
python3 -c "print('Hello, Python is working!')"
```

## Common Mistakes

- Forgetting to check "Add Python to PATH" on Windows
- Modifying the system Python on macOS/Linux
- Installing globally instead of using virtual environments

## Interview Questions

**Q1: What is the difference between `python` and `python3` commands?**

A: On Linux/macOS, `python` may point to Python 2.x (legacy), while `python3` explicitly calls Python 3.x.

**Q2: What is pyenv and why use it?**

A: pyenv manages multiple Python versions on one system, letting you switch between versions per project.

## Practice Exercises

1. Install Python and verify using the REPL — calculate the area of a circle with radius 7.
2. Create a virtual environment, activate it, install the `requests` library, and verify with `pip list`.
