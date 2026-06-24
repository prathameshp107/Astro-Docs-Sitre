---
title: ".gitignore & Best Practices"
description: "Git best practices — writing good commit messages, using .gitignore, and avoiding common mistakes."
sidebar:
  order: 4
---

## .gitignore & Best Practices

### 📄 What is `.gitignore`?

A `.gitignore` file tells Git which files to **ignore** (not track). Think of it like a **"do not pack" list** — these files stay on your computer and never go to GitHub.

```bash
# Create a .gitignore
touch .gitignore
git add .gitignore
git commit -m "Add .gitignore"
```

---

### 🎯 Common .gitignore Patterns

```txt
# Dependencies
node_modules/
vendor/
__pycache__/

# Build output
dist/
build/
*.exe
*.dll

# Environment files
.env
.env.local
*.env

# IDE / Editor files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Logs
*.log

# Sensitive data
config/credentials.yml
secrets.json
```

**Language-specific .gitignore templates:** Visit [gitignore.io](https://gitignore.io) or GitHub's [.gitignore templates](https://github.com/github/gitignore).

---

### 📝 Writing Good Commit Messages

**The 7 rules of a great commit message:**

```bash
# ✅ Good
git commit -m "Fix login redirect bug when token expires"
git commit -m "Add user profile page with avatar upload"
git commit -m "Refactor auth middleware to use async/await"

# ❌ Bad
git commit -m "fix"
git commit -m "asdf"
git commit -m "."
git commit -m "WIP"
```

**Multi-line commit message:**
```txt
Capitalized, short (50 chars or less) summary

More detailed explanation if necessary. Wrap at 72 characters.
Explain what and why, not how.

- Bullet points are okay
- Reference issues: Fixes #42
```

---

### 🚫 Common Mistakes Beginners Make

**1. Committing large files**
```bash
# ❌ Don't commit binaries, videos, or large datasets
# ✅ Use .gitignore or Git LFS for large files
```

**2. Committing sensitive data**
```bash
# ❌ Never commit passwords, API keys, or secrets
git add .
git commit -m "Add config"
# Oops! .env file with API keys was committed!

# ✅ Fix: remove from history (but it's already there!)
# Better: use .gitignore from the start
```

**3. Not pulling before pushing**
```bash
git push origin main
# ! [rejected] because remote has changes you don't have

# ✅ Fix: pull first
git pull --rebase origin main
git push origin main
```

**4. Committing directly to main**
```bash
# ❌ Never commit directly to main in a team project
# ✅ Always create a branch
git checkout -b feature-name
```

**5. Forgetting to add .gitignore**
```bash
# ❌ node_modules gets committed! Huge repo!
# ✅ Add .gitignore before your first commit
```

---

### ✅ Git Best Practices Checklist

```bash
- [ ] Create `.gitignore` before first commit
- [ ] Commit often, but each commit is a logical unit
- [ ] Write clear commit messages (imperative mood: "Add", "Fix", "Refactor")
- [ ] Branch for every feature/bug fix
- [ ] Pull before you push
- [ ] Never force push to shared branches
- [ ] Review your own diff before committing (`git diff --staged`)
- [ ] Squash WIP commits before merging
- [ ] Delete branches after merging
- [ ] Use tags for releases
```

---

### In Simple Words

- `.gitignore` prevents unwanted files (node_modules, .env, build files) from being tracked
- Write clear commit messages: **"Fix login bug"** not **"fix"**
- **Never commit** passwords, API keys, or secrets
- **Pull before push** to avoid rejections
- Always **branch for features** — never commit directly to main
- Create `.gitignore` **before your first commit**
