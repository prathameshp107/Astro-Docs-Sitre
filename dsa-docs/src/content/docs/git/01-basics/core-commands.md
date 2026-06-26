---
title: "Core Git Commands"
description: "The essential Git commands — init, add, commit, status, log, and diff — with practical examples and outputs."
sidebar:
  order: 4
---

## Core Git Commands

### 🆕 `git init` — Start a Repository

```bash
cd my-project
git init
# Initialized empty Git repository in /path/my-project/.git/
```

Creates a new `.git` folder that tracks everything. Run this once per project.

---

### 📝 `git status` — See What's Happening

```bash
git status
# On branch main
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#       index.html
#       style.css
```

Run `git status` constantly — it's your dashboard. It tells you:
- Which branch you're on
- Which files are untracked, modified, or staged
- What to do next

---

### ➕ `git add` — Stage Changes

```bash
# Stage one file
git add index.html

# Stage multiple files
git add index.html style.css

# Stage all changes (current directory)
git add .

# Stage all changes in the entire repo
git add -A

# Check what you staged
git status
```

---

### 💾 `git commit` — Save a Snapshot

```bash
# Commit with a short message (-m)
git commit -m "Add homepage and styles"

# Commit with a detailed message (opens editor)
git commit
# Write a title line, blank line, then details
# First line: "Add login form"
# Body: "Created email/password fields with validation"
```

**Commit message best practices:**
```bash
✅ "Fix login redirect bug"
✅ "Add user profile page"
❌ "fix stuff"
❌ "asdfasdf"
```

---

### 📜 `git log` — View History

```bash
git log
# commit a1b2c3d4e5f6...
# Author: Your Name <you@email.com>
# Date:   Mon Jan 15 14:30:00 2025
#
#     Fix login redirect bug
#
# commit f6e5d4c3b2a1...
# Author: Your Name <you@email.com>
# Date:   Sun Jan 14 10:00:00 2025
#
#     Add user profile page

# Compact one-line view
git log --oneline
# a1b2c3d Fix login redirect bug
# f6e5d4c Add user profile page
# b7c8d9e Initial commit

# Show the last 3 commits
git log -3

# Show commits with a graph (branches)
git log --oneline --graph --all
```

---

### ↔️ `git diff` — See Changes

```bash
# Show unstaged changes (working directory vs staging)
git diff

# Show staged changes (staging vs last commit)
git diff --staged

# Compare two commits
git diff a1b2c3d..f6e5d4c

# See only which files changed
git diff --stat
```

**Example output:**
```diff
diff --git a/index.html b/index.html
index e69de29..f52d8c7 100644
--- a/index.html
+++ b/index.html
@@ -0,0 +1,3 @@
+<!DOCTYPE html>
+<html>
+<body>Hello!</body>
```

> **Result:** Green lines (`+`) show additions, red lines (`-`) show deletions. The `@@` line shows the location.

---

### 🧪 Common Workflow

```bash
# 1. Start or clone
git init        # new project
# OR
git clone <url> # existing project

# 2. Make changes and check
git status
git diff

# 3. Stage and commit
git add .
git commit -m "Descriptive message"

# 4. View history
git log --oneline

# 5. Repeat!
```

---

### In Simple Words

- `git init` — creates a new repository in the current folder
- `git status` — shows what's changed and what to do next (run it often!)
- `git add` — moves changes from working directory to staging area
- `git commit -m "message"` — saves staged changes permanently
- `git log --oneline` — shows compact commit history
- `git diff` — shows exactly what lines changed (green = added, red = deleted)
