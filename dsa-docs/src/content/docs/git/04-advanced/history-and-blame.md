---
title: "History & Blame"
description: "Git log options for exploring history, git blame to find who changed what, and git bisect for finding the commit that introduced a bug."
sidebar:
  order: 3
---

## History & Blame

### 📜 `git log` — Advanced Options

```bash
# Basic log
git log

# Compact one-line view
git log --oneline

# Show branch graph
git log --oneline --graph --all

# Show only the last 5 commits
git log -5

# Show commits by a specific author
git log --author="Alice"

# Show commits since a date
git log --since="2025-01-01"
git log --after="2 weeks ago"

# Show commits that modified a specific file
git log -- oneline -- README.md

# Show commits with file changes (patch)
git log --patch

# Show commits with stats
git log --stat
```

**Commonly used:**
```bash
# My daily command — see everything at a glance
git log --oneline --graph --all --decorate
# * a1b2c3d (HEAD -> feature) Add dark mode
# * f6e5d4c Fix typo
# | * b7c8d9e (main) Update README
# |/
# * e9f0g1h Initial commit
```

---

### 🔍 `git blame` — Who Changed What?

`blame` shows who last modified each line of a file and in which commit.

```bash
git blame index.html

# Output:
# a1b2c3d4 (Alice  2025-01-15) <h1>Welcome</h1>
# f6e5d4c3 (Bob    2025-01-16) <p>This is a paragraph</p>
# a1b2c3d4 (Alice  2025-01-15) </div>
```

**Use blame when:**
- You need to ask someone about a line of code
- You want to understand when a change was introduced
- You're debugging and need context

```bash
# Show blame with line numbers
git blame -l index.html

# Show blame for specific lines
git blame -L 10,20 index.html

# Ignore whitespace changes
git blame -w index.html
```

---

### 🎯 `git bisect` — Find the Bug Commit

`bisect` uses binary search to find the exact commit that introduced a bug. It's like **playing hotter/colder** with Git.

```bash
# Start bisect
git bisect start

# Mark the current (broken) commit as bad
git bisect bad

# Mark a known-good commit (e.g., a tag)
git bisect good v1.0

# Git will checkout a commit in the middle
# Test it, then mark:
git bisect good   # if the bug isn't here
git bisect bad    # if the bug is here

# Git narrows it down until it finds the exact commit!
# Output: a1b2c3d4 is the first bad commit

# End bisect session
git bisect reset
```

**Real example:**
```bash
git bisect start
git bisect bad           # current state has the bug
git bisect good v2.0     # v2.0 was working fine
# Bisecting: 12 revisions left to test
# (Git checks out a middle commit)
git bisect good          # bug not here
# Bisecting: 6 revisions left
git bisect bad           # bug is here
# ... after a few rounds ...
# a1b2c3d is the first bad commit
git bisect reset
```

---

### In Simple Words

- `git log --oneline --graph --all` — the **best way** to see branch structure at a glance
- `git blame <file>` — shows **who wrote each line** and when (great for questions)
- `git bisect` — uses **binary search** to find the exact commit that introduced a bug
- Use `--since`, `--author`, and `--grep` to filter `git log` for specific commits
- `bisect` is powerful but time-consuming — automate it with `git bisect run <script>`
