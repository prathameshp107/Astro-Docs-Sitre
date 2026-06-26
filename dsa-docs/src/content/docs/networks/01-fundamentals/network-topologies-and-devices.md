---
title: "Network Topologies & Devices"
description: "Networks are built with different topologies (star, mesh, bus) and connected by devices (hubs, switches, routers) using MAC addresses and ARP."
sidebar:
  order: 5
---

## Network Topologies & Devices

### 🤔 Network Topologies

A **topology** is the physical or logical arrangement of devices in a network. Think of it like **floor plans** for different buildings.

```mermaid
flowchart TB
    subgraph Star[Star Topology<br/>Most common - Home/Office WiFi]
        S1[Device] --- Center[Switch / Router]
        S2[Device] --- Center
        S3[Device] --- Center
        S4[Device] --- Center
    end
    
    subgraph Mesh[Mesh Topology<br/>High reliability - Data centers]
        M1[Server] --- M2[Server]
        M1 --- M3[Server]
        M1 --- M4[Server]
        M2 --- M3
        M2 --- M4
        M3 --- M4
    end
    
    subgraph Bus[Bus Topology<br/>Old - Coaxial cable networks]
        B1[Device] --- Cable((Cable))
        B2[Device] --- Cable
        B3[Device] --- Cable
    end
    
    style Star fill:#3b82f6,color:#fff
    style Mesh fill:#10b981,color:#fff
    style Bus fill:#f59e0b,color:#fff
```

| Topology | How it works | Pros | Cons |
|----------|-------------|------|------|
| **Star** | All devices connect to a central switch/router | Easy to manage, one failure doesn't take down others | Switch fails → whole network down |
| **Mesh** | Every device connects to every other device | Extremely reliable, redundant paths | Expensive (lots of cabling) |
| **Bus** | All devices share a single cable | Cheap, simple | One break kills the whole network |
| **Ring** | Devices form a circle | Fair access to all | One break disrupts entire ring |

---

### 📡 Network Devices

Devices that make networks work:

```mermaid
flowchart TB
    subgraph Devices[Network Devices]
        HUB[Hub<br/>Broadcasts to all ports<br/>Dumb - no filtering]
        SWITCH[Switch<br/>Sends only to the right port<br/>Smart - uses MAC addresses]
        ROUTER[Router<br/>Connects different networks<br/>Uses IP addresses]
        MODEM[Modem<br/>Connects to ISP<br/>Converts signals]
        AP[Access Point<br/>Broadcasts WiFi<br/>Connects wireless devices]
    end
    
    subgraph WhereUsed[Where They Live]
        HOME[Home Network]
        OFFICE[Office Network]
        ISP[ISP / Internet]
    end
    
    HUB --> HOME
    SWITCH --> OFFICE
    ROUTER --> HOME
    ROUTER --> OFFICE
    MODEM --> ISP
    AP --> HOME
    
    style Devices fill:#7c3aed,color:#fff
    style HUB fill:#ef4444,color:#fff
    style SWITCH fill:#10b981,color:#fff
    style ROUTER fill:#3b82f6,color:#fff
    style MODEM fill:#f59e0b,color:#fff
    style AP fill:#059669,color:#fff
```

| Device | Layer | What it does |
|--------|-------|-------------|
| **Hub** | Layer 1 (Physical) | Broadcasts every signal to every port — inefficient |
| **Switch** | Layer 2 (Data Link) | Sends data only to the correct device using MAC addresses |
| **Router** | Layer 3 (Network) | Routes data between different networks using IP addresses |
| **Modem** | Layer 1 | Converts digital signals to analog (for cable/DSL/fiber) |
| **Access Point** | Layer 2 | Bridges wired network to wireless devices |

---

### 🔢 MAC Addresses

Every network device has a **MAC (Media Access Control) address** — a **permanent, unique identifier** burned into the hardware.

Think of it like a **government-issued ID number** — unique to each device, never changes.

```bash
MAC Address Format: 00:1A:2B:3C:4D:5E   (6 pairs of hex digits)
                    00-1A-2B-3C-4D-5E
                    001A.2B3C.4D5E
```

**IP vs MAC:**
```
IP Address:  192.168.1.10  ← Like your mailing address (can change)
MAC Address: 00:1A:2B:3C:4D:5E  ← Like your fingerprint (permanent)
```

---

### 🔄 ARP (Address Resolution Protocol)

ARP **maps IP addresses to MAC addresses** so devices can talk on the local network.

```mermaid
sequenceDiagram
    participant Laptop as Laptop A<br/>192.168.1.10<br/>MAC: AA:AA:AA:AA:AA:AA
    participant Switch as Network Switch
    participant Printer as Printer B<br/>192.168.1.20<br/>MAC: BB:BB:BB:BB:BB:BB
    
    Note over Laptop,Printer: Laptop wants to send data to 192.168.1.20
    Laptop->>Switch: ARP Request: "Who has 192.168.1.20?<br/>Tell AA:AA:AA:AA:AA:AA"
    Switch->>Printer: Broadcast to all devices
    Printer-->>Laptop: ARP Reply: "192.168.1.20 is at BB:BB:BB:BB:BB:BB"
    Note over Laptop: Caches the result: 192.168.1.20 → BB:BB:BB:BB:BB:BB
    Laptop->>Printer: Now sends data directly using MAC address
```

**Step by step:**
1. Laptop knows the **IP address** (192.168.1.20) but not the **MAC address**
2. Laptop broadcasts an **ARP request**: "Who has this IP? Tell me your MAC!"
3. The device with that IP responds: "It's me! My MAC is BB:BB:BB:BB:BB:BB"
4. Laptop **caches** the mapping (so it doesn't ask again soon)
5. Now the laptop can send data directly using the MAC address

---

### 🌐 Packet Switching vs Circuit Switching

**Circuit switching** — A dedicated path is reserved for the entire conversation (old phone system).
**Packet switching** — Data is split into packets, each finds its own way (the internet).

```mermaid
flowchart TB
    subgraph Circuit[Circuit Switching - Traditional Phone Call]
        C1["📞 Caller"] --> C2["Dedicated line reserved<br/>throughout conversation"]
        C2 --> C3["📞 Receiver"]
        C4["Even silence wastes<br/>the reserved bandwidth"]
    end
    
    subgraph Packet[Packet Switching - The Internet]
        P1["💻 Sender"] --> P2["Data split into packets"]
        P2 --> P3["Packet 1 → Route A"]
        P2 --> P4["Packet 2 → Route B"]
        P2 --> P5["Packet 3 → Route C"]
        P3 --> P6["💻 Receiver<br/>Reassembles packets"]
        P4 --> P6
        P5 --> P6
        P7["Efficient - bandwidth<br/>shared dynamically"]
    end
    
    style Circuit fill:#ef4444,color:#fff
    style Packet fill:#10b981,color:#fff
```

---

### In Simple Words

- **Star** (home WiFi), **Mesh** (data centers), **Bus** (old networks) — different ways to connect devices
- **Hubs** broadcast to everyone; **Switches** send to the right device; **Routers** connect different networks
- **MAC addresses** are permanent hardware IDs; **IP addresses** are logical addresses that can change
- **ARP** translates IP → MAC addresses so local network communication works
- The internet uses **packet switching** — data is split into packets that find their own way
