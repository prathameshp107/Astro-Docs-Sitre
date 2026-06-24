---
title: "What is a Network?"
description: "A network connects computers so they can share data — the internet is the world's largest network."
sidebar:
  order: 1
---

## What is a Network?

### 🤔 What is a Computer Network?

A computer network is **two or more devices connected together** so they can share information.

Think of it like the **postal system**:
- You (the client) write a letter and send it
- The postal service (the network) delivers it
- The recipient (the server) reads it and sends a reply

```mermaid
flowchart LR
    Client1[Your Laptop<br/>Client] --> Router[Router / Switch]
    Client2[Phone<br/>Client] --> Router
    Router --> Server1[Web Server<br/>example.com]
    Router --> Server2[Email Server<br/>mail.example.com]
    Router --> Internet[🌐 The Internet]
    
    style Client1 fill:#3b82f6,color:#fff
    style Client2 fill:#3b82f6,color:#fff
    style Server1 fill:#10b981,color:#fff
    style Server2 fill:#10b981,color:#fff
    style Internet fill:#7c3aed,color:#fff
```

---

### 📡 Client vs Server

On the internet, devices usually play one of two roles:

| Client | Server |
|--------|--------|
| Asks for data (your laptop, phone) | Provides data (website, API) |
| Makes requests | Sends responses |
| Many clients, one server | One server serves many clients |
| Example: Your browser | Example: google.com's computer |

**Real example:** When you visit GitHub.com, your browser (client) sends a request to GitHub's computer (server), which sends back the webpage.

---

### 🌐 The Internet

The internet is a **network of networks** — millions of connected devices worldwide.

```
Your Home Network → ISP (Internet Service Provider) → Backbone → Other Networks
     │                                                        │
     ▼                                                        ▼
  laptop, phone                                          Google, YouTube, etc.
```

**Key players:**
- **ISP** — Your internet provider (Comcast, AT&T, Jio, Airtel)
- **Backbone** — Massive fiber-optic cables connecting countries
- **IXP** — Internet Exchange Points where networks connect

---

### 🏠 Types of Networks

| Type | Size | Example |
|------|------|---------|
| **LAN** (Local) | One building | Your home WiFi |
| **WAN** (Wide) | Cities / countries | The internet |
| **MAN** (Metropolitan) | A city | City-wide WiFi |
| **PAN** (Personal) | Around one person | Bluetooth headphones |

---

### 🌊 Packet Switching vs Circuit Switching

The internet uses **packet switching** — data is cut into small chunks called **packets** that travel independently. Old phone networks used **circuit switching** — a dedicated path was reserved.

```mermaid
flowchart TB
    subgraph Circuit[Circuit Switching - Old Phone System]
        C1["📞 Caller A"] --> C2["Dedicated line reserved<br/>between A and B<br/>Whole conversation"]
        C2 --> C3["📞 Caller B"]
        C4["❌ Wastes bandwidth when silent"]
        C5["❌ If line breaks, call drops"]
    end
    
    subgraph Packet[Packet Switching - The Internet]
        P1["💻 You send an email"] --> P2["Email split into packets"]
        P2 --> P3["Packet 1 → Route A"]
        P2 --> P4["Packet 2 → Route B"]
        P2 --> P5["Packet 3 → Route A again"]
        P3 --> P6["💻 Recipient<br/>Reassembles packets"]
        P4 --> P6
        P5 --> P6
        P7["✅ Efficient - shares bandwidth"]
        P8["✅ Resilient - packets reroute"]
    end
    
    style Circuit fill:#ef4444,color:#fff
    style Packet fill:#10b981,color:#fff
```

---

### 🛠️ ICMP & Ping — Testing Connectivity

**ICMP** (Internet Control Message Protocol) is used for diagnostics. **Ping** sends an ICMP echo request and measures the response time.

Think of it like **knocking on a door** — you knock (send a ping), and if someone answers (responds), you know they're home.

```bash
ping google.com
# PING google.com (142.250.190.78): 56 data bytes
# 64 bytes from 142.250.190.78: icmp_seq=1 ttl=118 time=12.5ms
# 64 bytes from 142.250.190.78: icmp_seq=2 ttl=118 time=11.2ms
# 64 bytes from 142.250.190.78: icmp_seq=3 ttl=118 time=12.1ms
# 
# --- google.com ping statistics ---
# 3 packets transmitted, 3 received, 0% packet loss
# avg time: 11.9ms
```

| Diagnostic | Command | What it shows |
|------------|---------|--------------|
| **Ping** | `ping google.com` | Is the host reachable? How fast? |
| **Traceroute** | `tracert google.com` | Which path do packets take? |
| **nslookup** | `nslookup google.com` | What IP does a domain resolve to? |
| **netstat** | `netstat -an` | Which connections are open on my machine? |

---

### In Simple Words

- A **network** connects devices so they can talk to each other
- **Clients** ask for data; **servers** provide it
- The **internet** is the world's largest network — a network of networks
- The internet uses **packet switching** (data split into packets); old phones used **circuit switching** (dedicated line)
- **Ping** uses ICMP to test if a host is reachable and measure latency
