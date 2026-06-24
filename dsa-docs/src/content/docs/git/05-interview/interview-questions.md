---
title: "Git Interview Questions"
description: "Common Git interview questions with clear, beginner-friendly answers and command examples."
sidebar:
  order: 1
---

## Git Interview Questions

### Basics

---

**Q: What is the difference between Git and GitHub?**

**Git** is a version control system that runs on your computer. **GitHub** is a website that hosts Git repositories online. Git = the tool; GitHub = the service.

**Q: Explain the three areas of Git.**

1. **Working Directory** — where you edit files
2. **Staging Area** — where you gather changes before committing
3. **Repository** — where commits are stored permanently

Files move: Working → `git add` → Staging → `git commit` → Repository

**Q: What is the difference between `git pull` and `git fetch`?**

`git fetch` downloads changes from GitHub **without merging** (safe, doesn't affect your files). `git pull` downloads **and** merges changes (`fetch` + `merge`).

**Q: What is `git status` used for?**

It shows the current state of your repository — which branch you're on, which files are modified, staged, or untracked. Run it constantly!

**Q: How do you undo the last commit?**

```bash
# Keep changes in staging (soft)
git reset --soft HEAD~1

# Keep changes in working directory (mixed)
git reset HEAD~1

# Delete changes completely (hard) ⚠️
git reset --hard HEAD~1

# Safe way (creates a new undo commit)
git revert HEAD
```

---

### Branching & Merging

---

**Q: What is a merge conflict and how do you resolve it?**

A conflict happens when two branches change the **same line** of the **same file**. Git marks it with `<<<<<<<`, `=======`, and `>>>>>>>`. Fix by editing the file, removing markers, then `git add` and `git commit`.

**Q: What is the difference between `merge` and `rebase`?**

Merge creates a **merge commit** that ties two branches together (preserves history). Rebase **replays commits** on top of another branch (creates linear history). Never rebase shared branches.

**Q: What is fast-forward merge?**

When the target branch hasn't moved since you branched off. Git just moves the pointer forward — no merge commit is created.

**Q: What is a detached HEAD state?**

When you check out a specific commit (not a branch), HEAD points directly to the commit. Any new commits are "detached" and will be lost when you switch branches. Fix by creating a branch: `git checkout -b new-branch`.

```bash
git checkout a1b2c3d    # detached HEAD
git checkout -b fix-bug # now on a real branch
```

---

### Remotes & Collaboration

---

**Q: How do you add a remote repository?**

```bash
git remote add origin https://github.com/user/repo.git
```

**Q: What is the difference between `git push` and `git push -u`?**

`-u` (or `--set-upstream`) sets the upstream tracking reference. After `git push -u origin feature`, you can just type `git push` in the future.

**Q: What is a Pull Request?**

A request to merge changes from one branch into another. It allows code review before merging. Standard way to collaborate on GitHub.

**Q: What is the golden rule of rebase?**

Never rebase commits that have been pushed to a shared branch. It rewrites history and causes problems for other developers.

**Q: What is the difference between fork and branch?**

A **fork** is a copy of the entire repo under your account (used when you don't have write access). A **branch** is a line of development within the same repo (used by collaborators).

---

### Advanced

---

**Q: How do you temporarily save work without committing?**

```bash
git stash        # save work
git stash pop    # get it back
git stash list   # see all stashes
```

**Q: What is `git cherry-pick` used for?**

It applies a specific commit from one branch to your current branch. Useful when you only need one commit from another branch, not a full merge.

**Q: What is `git bisect`?**

A binary search tool that finds the exact commit that introduced a bug. You mark commits as "good" or "bad" and Git narrows it down.

```bash
git bisect start
git bisect bad       # current commit is broken
git bisect good v1.0 # v1.0 was working
# Git checks out the middle commit — test and repeat
git bisect reset
```

**Q: What's the difference between `git reset` and `git revert`?**

`git reset` moves the branch pointer back (rewrites history — unsafe for shared branches). `git revert` creates a **new commit** that undoes changes (safe for shared branches).

**Q: What would you put in a `.gitignore`?**

- `node_modules/` — dependencies
- `.env` — environment variables (secrets!)
- `dist/` / `build/` — compiled output
- `.DS_Store` / `Thumbs.db` — OS files
- `*.log` — log files

---

### Quick Recap

| Scenario | Command |
|----------|---------|
| Start a repo | `git init` |
| Clone a repo | `git clone <url>` |
| Stage files | `git add <file>` |
| Commit | `git commit -m "message"` |
| Check status | `git status` |
| View history | `git log --oneline` |
| Create branch | `git branch <name>` |
| Switch branch | `git switch <name>` |
| Merge branch | `git merge <name>` |
| Push to GitHub | `git push origin main` |
| Pull from GitHub | `git pull origin main` |
| Save work temporarily | `git stash` |
| Undo last commit | `git revert HEAD` |
