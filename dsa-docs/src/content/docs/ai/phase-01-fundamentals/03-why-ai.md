---
title: "03. Why AI?"
description: "Why AI exists, what problems it solves better than traditional software, and why learning it matters now."
sidebar:
  order: 3
---

## Why Does AI Exist?

> **AI exists because some problems are too complex, too variable, or too data-rich for humans to write explicit rules for.**

Three categories of problems AI solves better than traditional code:

---

## 1. Problems Where Rules Are Too Complex

Writing a rule to detect spam:
```
if email contains "free money" → spam
```

Reality: spammers adapt. There are millions of variations. You can't enumerate them all.

AI approach: learn from millions of labeled examples what "looks like spam" — and keep learning as patterns evolve.

**Other examples:** fraud detection, medical diagnosis, code vulnerability detection.

---

## 2. Problems Where Input Is Unstructured

Traditional code handles structured data easily:
```sql
SELECT * FROM orders WHERE amount > 1000
```

But what about:
- "Is this photo a cat?"
- "Summarize this 50-page document"
- "What emotion is in this voice recording?"

Unstructured data (images, text, audio, video) needs AI — rules can't describe pixels or sound waves meaningfully.

---

## 3. Problems That Require Personalization at Scale

A recommendation engine for 1 million users can't have hand-written rules per user. AI learns each user's preferences from behavior and generalizes.

---

## Why Learn AI Now?

| Reason | Detail |
|--------|--------|
| **Ubiquity** | AI is in every major product — search, email, maps, code editors |
| **Job market** | AI/ML roles are among the fastest-growing in tech |
| **Leverage** | One engineer with AI tools can do what a team did 5 years ago |
| **Foundation** | Understanding AI makes you a better software engineer overall |
| **Timing** | The tooling (APIs, open models, frameworks) has never been more accessible |

---

## What AI Makes Possible

- A doctor uses AI to detect cancer in scans earlier than humans can
- A developer uses Copilot to write code 40% faster
- A startup with 3 engineers ships a product that requires "10x the staff" without AI
- A non-English speaker gets real-time translation in their language

---

## The Core Shift

Traditional software: **humans encode knowledge → software executes**

AI software: **machines learn knowledge from data → software adapts**

This shift from explicit programming to learned behavior is why AI is transformative — and why understanding it is now a core engineering skill, not a specialty.

---

## Interview Questions

**Q: Why can't we just write rules for everything instead of using AI?**

**A:** Rules break down when: (1) the problem space is too large to enumerate — like spam or fraud, (2) input is unstructured like images or natural language, or (3) the optimal behavior varies per user or changes over time. AI learns from data instead of requiring humans to codify every case.

---

**Q: Why is AI having such a big impact now versus 20 years ago?**

**A:** Three things converged: massive datasets (from the internet), affordable compute (GPUs, cloud), and algorithmic breakthroughs (transformers, deep learning). None of these existed together before. Data + compute + better algorithms = today's AI capabilities.
