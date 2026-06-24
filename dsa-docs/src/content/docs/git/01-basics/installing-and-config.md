---
title: "Installing & Configuring Git"
description: "Install Git on any OS, configure your name/email, set up SSH keys, and verify everything works."
sidebar:
  order: 2
---

## Installing & Configuring Git

### 💻 Installing Git

**Windows:**
```bash
# Download from https://git-scm.com and run the installer
# Or use winget:
winget install --id Git.Git -e --source winget
```

**macOS:**
```bash
# Via Homebrew (recommended)
brew install git

# Or the official installer from https://git-scm.com
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

**Verify installation:**
```bash
git --version
# Output example: git version 2.43.0
```

---

### ⚙️ First-Time Configuration

Git needs to know who you are. Every commit gets tagged with your name and email.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Useful config options:**
```bash
# Default branch name (instead of "master")
git config --global init.defaultBranch main

# Colorful output
git config --global color.ui auto

# Preferred text editor for commit messages
git config --global core.editor "code --wait"  # VS Code

# Line ending handling (Windows)
git config --global core.autocrlf true

# View all settings
git config --list
```

> **Result:** Your identity is set. Future commits will show "Your Name <your.email@example.com>" as the author.

---

### 🔑 SSH Keys (for GitHub)

SSH keys let you push code to GitHub without typing your password every time.

**1. Generate a key:**
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter to accept defaults
# Optionally set a passphrase
```

**2. Start the SSH agent:**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**3. Copy the public key:**
```bash
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

**4. Add to GitHub:**
- Go to **GitHub.com → Settings → SSH and GPG keys → New SSH key**
- Paste the key and save

**5. Test the connection:**
```bash
ssh -T git@github.com
# Output: Hi username! You've successfully authenticated.
```

> **Result:** You can now `git push` and `git pull` without a password prompt.

---

### 🚀 Verify Everything

```bash
# Check Git version
git --version

# Check your identity
git config user.name
git config user.email

# Test SSH connection
ssh -T git@github.com
```

---

### In Simple Words

- Install Git from **git-scm.com** or your package manager
- Set your **name and email** with `git config --global` — every commit needs this
- Set `init.defaultBranch main` so new repos use `main` instead of `master`
- **SSH keys** let you connect to GitHub without typing passwords
- Always verify with `git --version` and `ssh -T git@github.com`
