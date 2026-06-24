---
title: "TCP Flow Control & Congestion"
description: "TCP uses flow control (sliding window) to not overwhelm the receiver and congestion control (slow start) to not overwhelm the network."
sidebar:
  order: 3
---

## TCP Flow Control & Congestion

### 🤔 Why Does TCP Need Control?

TCP is reliable, but it can't just blast data as fast as possible. Two problems can occur:

- **Flow control** — Don't overwhelm the **receiver** (it has limited buffer space)
- **Congestion control** — Don't overwhelm the **network** (routers have limited capacity)

Think of it like **water flowing through a pipe**:
- **Flow control** = The bucket at the other end has a certain size
- **Congestion control** = The pipe itself can only carry so much water

---

### 🪟 Flow Control (Sliding Window)

The **receiver** tells the sender how much data it can handle via the **window size** in TCP headers.

```mermaid
sequenceDiagram
    participant Sender as Sender
    participant Receiver as Receiver
    
    Note over Sender,Receiver: Initial Window = 4 segments
    Sender->>Receiver: Segment 1
    Sender->>Receiver: Segment 2
    Sender->>Receiver: Segment 3
    Sender->>Receiver: Segment 4
    Note over Sender: 🛑 Window full! Stop sending.
    Receiver-->>Sender: ACK (1-3) + Window = 3
    Note over Sender: Window advanced. Can send 3 more.
    Sender->>Receiver: Segment 5
    Sender->>Receiver: Segment 6
    Sender->>Receiver: Segment 7
    Receiver-->>Sender: ACK (4-7) + Window = 2
    Note over Sender: Window shrinking — receiver is busy!
    Sender->>Receiver: Segment 8
    Sender->>Receiver: Segment 9
```

**How it works:**
1. Receiver advertises a **window size** (e.g., 64KB)
2. Sender can send up to that much data without waiting for ACKs
3. As ACKs arrive, the **window slides forward**
4. If receiver is overwhelmed, it advertises a **smaller window**
5. If window hits zero, sender **stops** until an ACK frees space

---

### 🐢 Congestion Control (Slow Start)

When a TCP connection starts, it doesn't know the network capacity. It uses **slow start** to probe.

```mermaid
flowchart TB
    subgraph SlowStart[Slow Start Phase]
        S1["cwnd = 1 segment<br/>Send 1 packet"]
        S2["ACK received!<br/>cwnd = 2"]
        S3["Both ACKed!<br/>cwnd = 4"]
        S4["All 4 ACKed!<br/>cwnd = 8"]
        S5["cwnd doubles<br/>every RTT<br/>⬆️ Exponential growth"]
    end
    
    subgraph Avoidance[Congestion Avoidance Phase]
        A1["cwnd reaches ssthresh<br/>(e.g., 64KB)"]
        A2["cwnd grows by 1 MSS<br/>per RTT"]
        A3["⬆️ Linear growth<br/>(additive increase)"]
    end
    
    subgraph Recovery[Packet Loss Detected]
        R1["⚠️ 3 duplicate ACKs<br/>(fast retransmit)"]
        R2["ssthresh = cwnd / 2<br/>cwnd reset to 1"]
        R3["⬇️ Multiplicative decrease"]
        R4["Start slow start again"]
    end
    
    S1 --> S2 --> S3 --> S4 --> S5
    S5 --> A1 --> A2 --> A3
    A3 -.-> R1 --> R2 --> R3 --> R4
    R4 --> S1
    
    style SlowStart fill:#10b981,color:#fff
    style Avoidance fill:#3b82f6,color:#fff
    style Recovery fill:#ef4444,color:#fff
```

**Phases:**
1. **Slow Start** — cwnd (congestion window) doubles every round trip (exponential)
2. **Congestion Avoidance** — cwnd increases linearly (additive)
3. **Packet Loss** — cwnd is halved (multiplicative decrease), restart slow start

This is called **AIMD** (Additive Increase, Multiplicative Decrease).

---

### 📦 TCP Segment Structure

Every TCP packet has a header (20-60 bytes) that carries control information:

```mermaid
flowchart LR
    subgraph Header[TCP Header - 20 bytes (minimum)]
        SP[Source Port<br/>16 bits]
        DP[Dest Port<br/>16 bits]
        SN[Sequence Number<br/>32 bits]
        AN[Ack Number<br/>32 bits]
        FL[Flags<br/>9 bits<br/>SYN, ACK, FIN, etc.]
        WS[Window Size<br/>16 bits]
        CH[Checksum<br/>16 bits]
        UR[Urgent Pointer<br/>16 bits]
    end
    
    subgraph Body[Payload]
        PAY[Application Data]
    end
    
    SP --> DP --> SN --> AN --> FL --> WS --> CH --> UR
    UR --> PAY
    
    style Header fill:#3b82f6,color:#fff
    style Body fill:#10b981,color:#fff
```

| Field | Size | What it does |
|-------|------|-------------|
| **Source Port** | 16 bits | Which app on the sender |
| **Dest Port** | 16 bits | Which app on the receiver |
| **Sequence Number** | 32 bits | Tracks byte order (reassembles data) |
| **Ack Number** | 32 bits | Confirms received bytes |
| **Flags** | 9 bits | SYN, ACK, FIN, RST, etc. |
| **Window Size** | 16 bits | How much more data the receiver can accept |
| **Checksum** | 16 bits | Error detection for the entire segment |

---

### 📊 UDP Datagram Header (for comparison)

```
UDP Header - just 8 bytes!
┌────────────────┬────────────────┐
│ Source Port    │ Dest Port      │
│   16 bits      │   16 bits      │
├────────────────┼────────────────┤
│ Length         │ Checksum       │
│   16 bits      │   16 bits      │
├────────────────┴────────────────┤
│          Payload                 │
│        Application Data          │
└──────────────────────────────────┘
```

**UDP is much simpler than TCP:**
- No sequence numbers (no ordering)
- No window (no flow control)
- No retransmission
- Just ports + length + optional checksum

---

### In Simple Words

- **Flow control** prevents the sender from overwhelming the receiver (sliding window)
- **Congestion control** prevents the sender from overwhelming the network (slow start)
- TCP uses **AIMD**: Additive Increase (probe slowly), Multiplicative Decrease (back off aggressively on loss)
- The **TCP header** has fields for sequence numbers, ports, window size, and flags
- **UDP header** is only 8 bytes — much simpler than TCP's 20+ bytes
