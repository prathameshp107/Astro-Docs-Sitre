---
title: "What is Git?"
description: "Git is a version control system that tracks changes to files and enables collaboration — the foundation of modern software development."
sidebar:
  order: 1
---

## What is Git?

### 🤔 What is Version Control?

Version control is like an **undo button for your entire project**. It records snapshots of your files so you can go back to any point in time.

Think of it like saving a video game:
- You save before a boss fight
- If you die, you load your save
- You can see your entire play history

Git does the same for code:
- Save a **commit** (like a game save)
- Go back to any previous commit
- See exactly what changed and when

### 📜 Git vs GitHub

| Git | GitHub |
|-----|--------|
| The tool that runs on your computer | A website that hosts Git repositories online |
| Tracks versions locally | Lets you share and collaborate |
| Free, open-source | Free for public repos, paid for private teams |
| Works offline | Needs internet to push/pull |

**Analogy:** Git is your **personal notebook** where you write drafts. GitHub is the **cloud drive** where you share the final version with your team.

---

### ✅ Why Git?

```bash
# Before Git — copy-paste chaos
project-final-v2-real-final.js
project-final-v2-real-final-2.js

# With Git — clean history
git commit -m "Fix login bug"
git commit -m "Add dark mode"
git log  # see every change ever made
```

**Benefits:**
- **History** — Every change is recorded with a message
- **Collaboration** — Multiple people work on the same code
- **Safety** — Experiment on branches without breaking the main code
- **Accountability** — Every commit is attributed to an author
- **Backup** — Your code lives on GitHub (not just your laptop)

---

### In Simple Words

- Git is a **time machine for your code** — you can go back to any saved point
- **Git runs locally** on your machine; **GitHub is a cloud service** that hosts Git repos
- Every save is called a **commit** with a message describing what changed
- Git lets multiple people work on the same code without stepping on each other
- The GitHub logo is an octocat (cat + octopus)
