---
title: "Collaboration Workflow"
description: "Three common Git workflows — feature branching, Git Flow, and trunk-based development — for team collaboration."
sidebar:
  order: 3
---

## Collaboration Workflow

### 🤔 What is a Workflow?

A Git workflow is a set of rules for how a team uses branches. Think of it like **traffic rules** — everyone follows the same pattern to avoid crashes.

---

### 🌱 Feature Branch Workflow (Simple)

Best for: **Small teams, simple projects**

```bash
# 1. Create a branch for each feature/fix
git checkout -b feature-add-search

# 2. Work and commit
git add .
git commit -m "Add search bar"

# 3. Push and create PR
git push -u origin feature-add-search

# 4. After PR is approved and merged, delete the branch
git checkout main
git pull
git branch -d feature-add-search
```

**Rules:**
- Never commit directly to `main`
- One branch per feature or bug fix
- All changes go through PR review

---

### 🏗️ Git Flow (Structured)

Best for: **Larger teams, released software**

```
main ──▶ v1.0 ──▶ v1.1 ──▶ v2.0
          │
develop ──┼─────────▶ Next release
          │              │
feature ──┼──────────────┴──▶ Feature work
          │
release ──┴──▶ v1.0-rc ──▶ v1.0 (hotfix branch)
```

**Branches in Git Flow:**
| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `develop` | Integration branch for next release |
| `feature/*` | New features (branch from `develop`, merge back to `develop`) |
| `release/*` | Preparing a release (bug fixes only) |
| `hotfix/*` | Urgent production fixes (branch from `main`, merge to both) |

---

### 🚄 Trunk-Based Development (Modern)

Best for: **CI/CD, DevOps teams, frequent deployments**

```bash
# 1. Branch from main
git checkout -b feat-42

# 2. Small, frequent commits
git add .
git commit -m "Add endpoint"
git push origin feat-42

# 3. Open PR immediately (even if WIP)
# 4. Merge quickly (within hours, not days)
# 5. Delete branch
```

**Rules:**
- Branches live **less than a day**
- **Small** commits and PRs
- **Feature flags** hide incomplete work
- Continuous integration runs on every push
- Merge to main **multiple times per day**

---

### 📊 Choosing a Workflow

| Workflow | Team size | Release frequency | Complexity |
|----------|-----------|------------------|------------|
| Feature Branch | 1-5 | Any | Low |
| Git Flow | 5-20 | Scheduled releases | High |
| Trunk-based | 5-50+ | Daily/Continuous | Medium |

**Recommendation:** Start with **Feature Branch**. It's simple and works for most teams.

---

### In Simple Words

- **Feature Branch** — one branch per feature, all go through PR to main (simple)
- **Git Flow** — structured branches for develop, release, hotfix (complex, for releases)
- **Trunk-based** — short-lived branches, merge to main multiple times daily (modern CI/CD)
- Start simple (feature branches), add complexity as your team grows
- Never commit directly to `main` — always use branches + PRs
