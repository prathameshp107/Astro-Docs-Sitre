---
title: "Network Interview Questions"
description: "Common computer networking interview questions with clear, beginner-friendly answers and practical examples."
sidebar:
  order: 1
---

## Network Interview Questions

### Fundamentals

---

**Q: What happens when you type a URL into a browser?**

1. Browser checks its **cache** for the IP
2. **DNS lookup**: browser → resolver → root → TLD → authoritative nameserver
3. **TCP 3-way handshake** (SYN → SYN-ACK → ACK)
4. **TLS handshake** (if HTTPS — negotiates encryption)
5. Browser sends **HTTP GET request**
6. Server processes and sends **HTTP response**
7. Browser renders the HTML page

**Q: What is the difference between TCP and UDP?**

| TCP | UDP |
|-----|-----|
| Reliable (guarantees delivery) | Unreliable (best effort) |
| Ordered delivery | No ordering |
| Slower (handshake + acks) | Fast (no handshake) |
| Web, email, file transfer | Video, gaming, VoIP |

**Q: What is the OSI model?**

The OSI model has 7 layers: Application → Presentation → Session → Transport → Network → Data Link → Physical. The TCP/IP model is a simpler 4-layer model (Application → Transport → Internet → Link) that the actual internet uses.

**Q: What is DNS and how does it work?**

DNS translates domain names (google.com) to IP addresses (142.250.190.78). Resolution goes: Browser → Resolver → Root Server → TLD Server (.com) → Authoritative Server.

**Q: What is the difference between IPv4 and IPv6?**

IPv4 has 32-bit addresses (4.3 billion total — running out). IPv6 has 128-bit addresses (virtually unlimited). IPv4 looks like `192.168.1.1`, IPv6 like `2001:db8::1`.

**Q: What is NAT?**

NAT (Network Address Translation) lets multiple devices share one public IP address. Your router assigns private IPs (192.168.x.x) to devices and maps them to a single public IP using different ports.

**Q: What is DHCP?**

DHCP automatically assigns IP addresses to devices on a network. It uses a 4-step process: Discover → Offer → Request → Acknowledge.

**Q: What is ARP?**

ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network. When a device knows the IP but not the MAC, it broadcasts an ARP request and the device with that IP responds with its MAC.

**Q: What is the difference between a hub, switch, and router?**

- **Hub** — broadcasts data to all ports (dumb, Layer 1)
- **Switch** — sends data only to the right port using MAC addresses (smart, Layer 2)
- **Router** — connects different networks using IP addresses (Layer 3)

---

### Transport & Protocols

---

**Q: Explain the TCP 3-way handshake.**

1. **SYN** — Client sends "I want to connect" with a random sequence number
2. **SYN-ACK** — Server responds "OK, I acknowledge you" with its own sequence number
3. **ACK** — Client confirms "Connection established"

**Q: What is TCP flow control?**

Flow control prevents the sender from overwhelming the receiver. The receiver advertises a **window size** in TCP headers, telling the sender how much data it can accept. As the receiver processes data, the window slides forward.

**Q: What is TCP congestion control?**

Congestion control prevents the sender from overwhelming the network. TCP uses **slow start** (exponential growth) to probe capacity, then **congestion avoidance** (linear growth). On packet loss, it **halves** the window (multiplicative decrease).

**Q: What is the structure of a TCP header?**

Key fields: Source/Dest Port (16 bits each), Sequence Number (32 bits), Ack Number (32 bits), Flags (9 bits: SYN, ACK, FIN, RST), Window Size (16 bits), Checksum (16 bits). Total: minimum 20 bytes.

**Q: What is a port number?**

A port identifies a specific application on a device (like an apartment number in a building). Port 80 = HTTP, 443 = HTTPS, 22 = SSH, 53 = DNS.

**Q: What is the difference between HTTP and HTTPS?**

HTTPS = HTTP + TLS encryption. HTTPS encrypts all data between browser and server so nobody can read it in transit. Look for the 🔒 padlock.

**Q: Explain the difference between HTTP/1.1, HTTP/2, and HTTP/3.**

- **HTTP/1.1** — One request at a time per connection, needs multiple connections
- **HTTP/2** — Multiplexed streams over one connection, header compression
- **HTTP/3** — Uses QUIC (UDP-based), faster connection setup, no head-of-line blocking

**Q: What is the difference between TLS 1.2 and TLS 1.3?**

TLS 1.3 is faster (1 round trip instead of 2), more secure (removed weak ciphers), and supports 0-RTT resumption for returning users.

**Q: What is a Man-in-the-Middle (MITM) attack?**

An attacker intercepts communication between client and server, reading or modifying data. TLS/HTTPS prevents MITM by encrypting the communication.

---

### Application & Infrastructure

---

**Q: What is a reverse proxy?**

A server that sits in front of backend servers, handling requests on their behalf. Used for load balancing, caching, SSL termination, and security. Examples: Nginx, HAProxy, Cloudflare.

**Q: What is a CDN and how does it work?**

A CDN (Content Delivery Network) caches content at edge servers worldwide. When a user requests content, it's served from the nearest edge server instead of the origin server. This reduces latency and server load.

**Q: What is CORS and why is it needed?**

CORS (Cross-Origin Resource Sharing) is a browser security feature that controls which websites can access an API. Without CORS, any website could make requests to any API and read the response.

**Q: What is the difference between a forward proxy and a reverse proxy?**

A **forward proxy** hides the client (used by users for anonymity). A **reverse proxy** hides the server (used by server owners for load balancing and security).

**Q: What is a DDoS attack?**

A DDoS (Distributed Denial of Service) attack floods a server with traffic from many sources, overwhelming it and making it unavailable. Mitigated by CDNs, rate limiting, and firewalls.

**Q: What is an API Gateway?**

A single entry point for API requests that handles routing, authentication, rate limiting, caching, and monitoring. Examples: Kong, AWS API Gateway, Traefik.

**Q: What is HTTP caching and how does Cache-Control work?**

HTTP caching stores responses to serve them faster. `Cache-Control: max-age=3600` tells the browser to cache for 1 hour. `ETag` headers allow the browser to validate cached content without re-downloading it.

**Q: What is the difference between 301 and 302 redirect?**

**301** = Moved permanently (search engines update their index). **302** = Found temporarily (search engines keep the original URL).

**Q: What is packet switching?**

Data is split into small packets that travel independently through the network. Each packet can take a different route. This is how the internet works — efficient and resilient.

---

### Quick Reference

| Concept | Simple explanation |
|---------|-------------------|
| **IP address** | Street address of a computer |
| **Port** | Apartment number inside the computer |
| **MAC address** | Permanent hardware ID (like a fingerprint) |
| **DNS** | Phonebook that turns names into numbers |
| **DHCP** | Auto-assigns IPs to new devices |
| **ARP** | Maps IP → MAC for local delivery |
| **NAT** | Lets many devices share one public IP |
| **TCP** | Registered mail (reliable, ordered) |
| **UDP** | Postcard (fast, may get lost) |
| **HTTP** | Language browsers use to ask for webpages |
| **HTTPS** | HTTP with encryption (look for 🔒) |
| **TLS** | The encryption layer that makes HTTPS secure |
| **CDN** | Fast-food chains in every neighborhood |
| **Load balancer** | Traffic cop directing cars to different lanes |
| **Firewall** | Security guard checking IDs at the door |
| **VPN** | Secret tunnel hiding your internet activity |
| **API Gateway** | Reception desk routing requests to services |
| **Packet switching** | Data split into packets, each finding its own way |
