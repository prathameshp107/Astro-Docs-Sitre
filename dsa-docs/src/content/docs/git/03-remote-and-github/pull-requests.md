---
title: "Pull Requests"
description: "A Pull Request (PR) proposes changes from one branch to another — the standard way to collaborate on GitHub."
sidebar:
  order: 2
---

## Pull Requests

### 🤔 What is a Pull Request (PR)?

A Pull Request (PR) is a **request to merge changes from one branch into another**. Think of it like:

- You write a report and ask a colleague to review it
- They suggest changes
- Once approved, it's published

PRs are the standard way to collaborate on GitHub.

```mermaid
flowchart LR
    subgraph Local[Your Computer]
        BRANCH[Feature Branch<br/>git checkout -b feature]
        COMMIT[Make changes<br/>git commit -m \"...\""]
        PUSH[Push to GitHub<br/>git push origin feature]
    end
    
    subgraph GitHub[GitHub.com]
        PR["Open a Pull Request<br/>Compare & review"]
        REVIEW["Team reviews<br/>Comment, approve"]
        MERGE["Merge PR<br/>Into main branch"]
    end
    
    subgraph Deploy[Result]
        DEPLOYED[Changes are live 🚀]
    end
    
    BRANCH --> COMMIT --> PUSH --> PR --> REVIEW --> MERGE --> DEPLOYED
    
    style Local fill:#3b82f6,color:#fff
    style GitHub fill:#10b981,color:#fff
    style Deploy fill:#7c3aed,color:#fff
```

---

### 🍴 Fork vs Branch

| Fork | Branch |
|------|--------|
| A copy of the entire repo under **your GitHub account** | A separate line of development **within the same repo** |
| Used when you don't have write access | Used when you're a collaborator |
| You own the fork | The repo owner controls branches |
| Changes come via PR from fork | Changes can be pushed directly or via PR |

**When to fork:** Contributing to open-source projects you don't own.
**When to branch:** Working on a team project where you're a collaborator.

---

### 📝 Opening a PR

**Command line setup:**
```bash
# 1. Create and switch to a new branch
git checkout -b fix-login-bug

# 2. Make changes, stage, commit
git add .
git commit -m "Fix login redirect bug"

# 3. Push the branch to GitHub
git push -u origin fix-login-bug
```

**On GitHub:**
1. You'll see a banner: **"fix-login-bug had recent pushes"**
2. Click **"Compare & pull request"**
3. Write a **title** and **description**
4. Assign **reviewers**
5. Click **"Create pull request"**

---

### ✅ PR Review Process

Things reviewers look for:
- **Does the code work?**
- **Is it readable?** (clear variable names, comments)
- **Does it follow project style?**
- **Are there tests?**
- **Does it break anything else?**

**Best practices for PRs:**
- Keep PRs **small** (one feature or fix per PR)
- Write a **descriptive title** and **list changes** in the description
- **Link related issues** (e.g., "Fixes #42")
- **Respond to comments** promptly
- **Update the PR** if reviewers ask for changes (just push more commits)

---

### 🔀 Merging a PR

GitHub offers three merge options:

| Method | What it does | History |
|--------|-------------|---------|
| **Create a merge commit** | Adds a merge commit | Preserves all history |
| **Squash and merge** | Combines all PR commits into one | Clean, single commit |
| **Rebase and merge** | Replays commits onto main | Linear history |

After merging, delete the feature branch on GitHub (GitHub offers a button).

---

### In Simple Words

- A **PR** proposes changes from one branch to another, with review before merging
- **Fork** = copy someone else's repo; **branch** = separate line in your own repo
- Keep PRs **small** and **focused** on one thing
- Reviewers **comment** and **approve** before merging
- After merge, **delete the feature branch** (clean up)
