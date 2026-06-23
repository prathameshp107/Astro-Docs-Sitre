---
title: "Virtual Environments"
description: "What a virtual environment is, why you need one, and how to create and manage venvs in Python."
sidebar:
  order: 4
---

# Virtual Environments

## Simple Analogy 🧹

Imagine you're baking cakes. Each cake needs different ingredients. Instead of mixing all ingredients in one giant bowl (messing up flavors), you use separate bowls for each cake. A **virtual environment** is like a separate bowl for each Python project — each project gets its own dependencies, isolated from others.

---

## What is a Virtual Environment?

A **virtual environment** is an isolated Python environment that has its own:
- Python interpreter
- Installed packages
- Scripts and executables

```bash
# Create a virtual environment
python -m venv myproject_env

# Activate it (Windows)
myproject_env\Scripts\activate

# Activate it (Mac / Linux)
source myproject_env/bin/activate

# Your terminal now shows (myproject_env) — packages install here
```

---

## Why You Need Isolation

Without virtual environments, all your projects share the same global Python package directory. This causes problems:

| Problem | Example |
|---------|---------|
| **Version conflicts** | Project A needs Django 4.2, Project B needs Django 5.0 |
| **Upgrade breaks other projects** | Upgrading a package for one project breaks another |
| **Permission issues** | Installing globally may require admin/sudo |
| **Reproducibility** | Hard to know exactly which versions your project uses |

---

## Working with venv

```bash
# 1. Create
python -m venv .venv          # Common name: .venv or venv

# 2. Activate
source .venv/bin/activate     # Mac/Linux
.venv\Scripts\activate        # Windows

# 3. Your prompt changes — you're in the venv
(.venv) $

# 4. Install packages
pip install requests flask

# 5. Deactivate when done
deactivate
```

---

## requirements.txt

Freeze your project's exact dependencies so others can reproduce it:

```bash
# Freeze — saves all installed packages to a file
pip freeze > requirements.txt

# The file looks like this:
# Flask==3.1.0
# requests==2.32.0
# Werkzeug==3.1.0

# Install from requirements.txt (on another machine / CI)
pip install -r requirements.txt
```

---

## Other Virtual Environment Tools

| Tool | Description | When to Use |
|------|-------------|-------------|
| `venv` | Built-in, no extra install | Default choice (Python 3.3+) |
| `virtualenv` | Older, more features | Legacy projects |
| `pipenv` | Combines pip + venv + Pipfile | Projects needing lock files |
| `poetry` | Modern dependency management | New projects with complex deps |
| `conda` | Environment + package manager | Data science / scientific Python |

---

## 🧠 In Simple Words

- A **virtual environment** is an isolated space for each project's dependencies
- Use `python -m venv .venv` to create one, then `source .venv/bin/activate` to use it
- **`requirements.txt`** lists your exact package versions — share it so others can reproduce your setup
- Always use a virtual environment for each project — never install packages globally
- Deactivate with `deactivate` when you're done working
