---
title: "Installing Docker"
description: "---"
sidebar:
  order: 4
---

## 4. Installing Docker

### 🪟 Windows

```powershell
# Step 1: Enable WSL2 (Windows Subsystem for Linux)
wsl --install

# Step 2: Download Docker Desktop from:
# https://docs.docker.com/desktop/install/windows-install/

# Step 3: Run the installer and restart

# Step 4: Verify installation
docker --version
docker run hello-world
```

> **Note:** Docker Desktop on Windows uses WSL2 backend. Enable it in Settings → General → "Use the WSL2 based engine".

---

### 🐧 Linux (Ubuntu/Debian)

```bash
# Step 1: Update package index
sudo apt-get update

# Step 2: Install prerequisites
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Step 3: Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Step 4: Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 5: Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Step 6: Run Docker without sudo (optional but recommended)
sudo usermod -aG docker $USER
newgrp docker

# Step 7: Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify
docker --version
docker run hello-world
```

---

### 🍎 macOS

```bash
# Option 1: Docker Desktop (GUI + CLI)
# Download from: https://docs.docker.com/desktop/install/mac-install/

# Option 2: Homebrew
brew install --cask docker

# Start Docker Desktop, then verify:
docker --version
docker run hello-world
```

---

### ✅ Verification Commands

```bash
# Check Docker version
docker --version
# Output: Docker version 24.0.5, build ced0996

# Check Docker info
docker info

# Run the test container
docker run hello-world

# Check if daemon is running
sudo systemctl status docker    # Linux
```

---
