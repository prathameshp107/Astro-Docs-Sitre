---
title: "pip and Packages"
description: "How to install Python packages with pip, manage dependencies, and understand where packages live."
sidebar:
  order: 5
---

# pip and Packages

## Simple Analogy 📦

Think of `pip` as a **package delivery service** for Python. You want `requests` (a package) — you tell pip, and it fetches it from the **PyPI warehouse** (Python Package Index), unpacks it, and puts it where Python can find it.

---

## What is pip?

**pip** = **P**ip **I**nstalls **P**ackages. It's Python's standard package manager, included with Python 3.4+.

```bash
# Check if pip is installed
pip --version
# pip 25.0 from ... (.venv)

# Get help
pip help
```

---

## Common pip Commands

```bash
# Install a package
pip install requests

# Install a specific version
pip install flask==3.1.0

# Install with minimum version
pip install "flask>=3.0"

# Install multiple packages
pip install requests flask pandas

# Install from requirements file
pip install -r requirements.txt

# Upgrade a package
pip install --upgrade pip

# Uninstall
pip uninstall requests

# List installed packages
pip list

# Show package details
pip show flask

# Search for packages (web only now)
# https://pypi.org/search/
```

---

## Where Packages Live

```bash
# Find where pip installs packages
pip show requests
# Location: /Users/me/.venv/lib/python3.12/site-packages

# The site-packages folder is inside your virtual environment
```

```
Project Folder
└── .venv/                         ← Virtual environment
    ├── bin/                       ← Executables (python, pip)
    ├── lib/
    │   └── python3.12/
    │       └── site-packages/     ← All installed packages live here
    │           ├── requests/
    │           ├── flask/
    │           └── ...
    └── pyvenv.cfg                 ← Points to the Python version
```

---

## requirements.txt — The Dependency File

```txt
# requirements.txt
flask==3.1.0
requests>=2.32,<3
pandas~=2.2.0
gunicorn
```

```bash
# Freeze exact versions of everything installed
pip freeze > requirements.txt

# Example output:
# Flask==3.1.0
# Jinja2==3.1.6
# MarkupSafe==3.0.2
# Werkzeug==3.1.3
# requests==2.32.3
# gunicorn==23.0.0
```

### Version Specifiers

| Specifier | Meaning | Example |
|-----------|---------|---------|
| `==3.1.0` | Exact version | `flask==3.1.0` |
| `>=3.0` | Minimum version | `requests>=2.32` |
| `<=4.0` | Maximum version | `flask<=4.0` |
| `~=2.2.0` | Compatible release (≥2.2.0, <3.0) | `pandas~=2.2.0` |
| `*` | Any version | `gunicorn` (no constraint) |

---

## Common Package Categories

| Category | Popular Packages |
|----------|-----------------|
| **Web** | Flask, Django, FastAPI, aiohttp |
| **Data** | pandas, numpy, polars, matplotlib |
| **HTTP** | requests, httpx, httplib2 |
| **Database** | SQLAlchemy, psycopg2, asyncpg, pymongo |
| **Testing** | pytest, unittest, hypothesis, tox |
| **Async** | asyncio, aiofiles, anyio |
| **CLI** | click, typer, argparse (built-in) |

---

## 🧠 In Simple Words

- **pip** = Python's package installer — gets packages from PyPI (the official warehouse)
- Always **activate your virtual environment** before using pip
- **`pip freeze > requirements.txt`** saves your project's dependencies so others can replicate it
- **`pip install -r requirements.txt`** installs everything from that file
- Packages install into `.venv/lib/python3.x/site-packages/`
- Use version specifiers (`==`, `>=`, `~=`) to control which versions you get
