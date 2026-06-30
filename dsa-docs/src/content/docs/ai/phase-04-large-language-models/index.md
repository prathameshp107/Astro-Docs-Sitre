---
title: "Phase 4: Large Language Models"
description: "Master how Large Language Models work — from tokenization to inference, training to production deployment."
sidebar:
  order: 0
---

import { Card, CardGrid } from '@astrojs/starlight/components';

# Phase 4: Large Language Models

> **Learn exactly how ChatGPT, Claude, Gemini, and Llama work — from the moment you type a prompt to when you receive a response.**

<div class="phase-meta">
  <div class="phase-meta-item">
    <span class="phase-meta-label">Difficulty</span>
    <span class="phase-meta-value phase-difficulty-intermediate">🟡 Intermediate</span>
  </div>
  <div class="phase-meta-item">
    <span class="phase-meta-label">Estimated Time</span>
    <span class="phase-meta-value">18 Hours</span>
  </div>
  <div class="phase-meta-item">
    <span class="phase-meta-label">Reading Time</span>
    <span class="phase-meta-value">12 Hours</span>
  </div>
  <div class="phase-meta-item">
    <span class="phase-meta-label">Projects</span>
    <span class="phase-meta-value">3</span>
  </div>
  <div class="phase-meta-item">
    <span class="phase-meta-label">Interview Importance</span>
    <span class="phase-meta-value phase-importance">★★★★★</span>
  </div>
  <div class="phase-meta-item">
    <span class="phase-meta-label">Prerequisites</span>
    <span class="phase-meta-value">Deep Learning (Phase 3)</span>
  </div>
</div>

---

## Learning Roadmap

```mermaid
flowchart TD
    M1["📖 Module 1<br/>LLM Foundations"] --> M2["🏗️ Module 2<br/>Transformer Architecture"]
    M2 --> M3["🎓 Module 3<br/>Training"]
    M3 --> M4["⚡ Module 4<br/>Inference"]
    M4 --> M5["✅ Module 5<br/>Revision & Project"]

    M1 --> M1D["What is an LLM? · Tokenization · Context Window"]
    M2 --> M2D["Self-Attention · QKV · Multi-Head · Positional Encoding · GPT Architecture"]
    M3 --> M3D["Pretraining · SFT · RLHF · DPO"]
    M4 --> M4D["Decoding · Temperature · Streaming · Function Calling · Structured Output"]

    style M1 fill:#3b82f6,color:#fff
    style M2 fill:#8b5cf6,color:#fff
    style M3 fill:#f59e0b,color:#fff
    style M4 fill:#22c55e,color:#fff
    style M5 fill:#ef4444,color:#fff
```

---

## Modules Overview

<CardGrid>
  <Card title="Module 1: LLM Foundations" icon="open-book">
    Learn what LLMs are, how language models work, how text becomes tokens, and why context windows matter.
    <br/><br/>
    **4 Lessons · ~3 Hours**
  </Card>
  
  <Card title="Module 2: Transformer Architecture" icon="setting">
    Dive deep into the Transformer — self-attention, QKV, multi-head attention, positional encoding, feed-forward networks, decoder-only design, and GPT architecture.
    <br/><br/>
    **8 Lessons · ~6 Hours**
  </Card>
  
  <Card title="Module 3: Training" icon="training">
    Understand how LLMs are trained — pretraining, next-token prediction, supervised fine-tuning, RLHF, and DPO alignment.
    <br/><br/>
    **5 Lessons · ~4 Hours**
  </Card>
  
  <Card title="Module 4: Inference" icon="terminal">
    Master inference — how LLMs generate text, decoding strategies, temperature, streaming, function calling, structured output, and hallucinations.
    <br/><br/>
    **7 Lessons · ~4 Hours**
  </Card>
  
  <Card title="Module 5: Revision & Project" icon="checkmark">
    Solidify your knowledge with a cheat sheet, practice questions, MCQs, interview preparation, and a hands-on mini project.
    <br/><br/>
    **Revision · ~1 Hour**
  </Card>
</CardGrid>

---

## Topics Covered

| # | Topic | Module | 🔥 |
|---|-------|--------|-----|
| 01 | What is an LLM? | M1: Foundations | 🔥 Must Know |
| 02 | How Language Models Work | M1: Foundations | 🔥 Must Know |
| 03 | Tokenization | M1: Foundations | 🧠 Core Concept |
| 04 | Context Window | M1: Foundations | 🧠 Core Concept |
| 05 | Transformer Overview | M2: Architecture | 🔥 Must Know |
| 06 | Self-Attention | M2: Architecture | 🔥 Must Know |
| 07 | Query, Key, Value | M2: Architecture | 🧠 Core Concept |
| 08 | Multi-Head Attention | M2: Architecture | 🧠 Core Concept |
| 09 | Positional Encoding | M2: Architecture | 🧠 Core Concept |
| 10 | Feed-Forward Network | M2: Architecture | 🧠 Core Concept |
| 11 | Decoder-Only Transformers | M2: Architecture | 🧠 Core Concept |
| 12 | GPT Architecture | M2: Architecture | 🔥 Must Know |
| 13 | Pretraining | M3: Training | 🔥 Must Know |
| 14 | Next Token Prediction | M3: Training | 🔥 Must Know |
| 15 | Supervised Fine-Tuning | M3: Training | 🧠 Core Concept |
| 16 | RLHF | M3: Training | 💼 Production |
| 17 | DPO | M3: Training | 💼 Production |
| 18 | Inference | M4: Inference | 🔥 Must Know |
| 19 | Decoding Strategies | M4: Inference | 🧠 Core Concept |
| 20 | Temperature, Top-K & Top-P | M4: Inference | 🧠 Core Concept |
| 21 | Streaming | M4: Inference | 💼 Production |
| 22 | Function Calling | M4: Inference | 💼 Production |
| 23 | Structured Output | M4: Inference | 💼 Production |
| 24 | Hallucinations | M4: Inference | 🧠 Core Concept |
| 25 | Phase Summary | M5: Revision | ✅ Revision |

---

## What You'll Build

| Project | Module | Description |
|---------|--------|-------------|
| **LLM Token Visualizer** | M2 | Build a tool that shows how text is split into tokens |
| **Temperature Playground** | M4 | Interactive tool to compare LLM outputs at different temperatures |
| **Mini ChatGPT** | M5 | Build a simple CLI chat application using an LLM API |

---

## Progress Tracker

<div class="progress-tracker">
  <div class="progress-phase">
    <div class="progress-bar">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
    <span class="progress-text">0 / 24 Lessons Complete</span>
  </div>
</div>

---

## Getting Started

Ready to master Large Language Models? Start with **Module 1** to build your foundation, or jump to any topic that interests you.

**Start Learning:**
- [Begin Module 1: LLM Foundations →](./module-01-overview)
- [View the Cheat Sheet →](./cheat-sheet)
- [Practice with MCQs →](./mcqs)

<style>
  .phase-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
    padding: 1.25rem;
    background: var(--sl-color-gray-7);
    border-radius: 0.75rem;
    border: 1px solid var(--sl-color-gray-5);
  }
  .phase-meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .phase-meta-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--sl-color-gray-3);
    font-weight: 600;
  }
  .phase-meta-value {
    font-size: 0.95rem;
    font-weight: 600;
  }
  .phase-difficulty-intermediate {
    color: #f59e0b;
  }
  .phase-importance {
    color: #f59e0b;
    letter-spacing: 0.1em;
  }
  .progress-tracker {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--sl-color-gray-7);
    border-radius: 0.75rem;
    border: 1px solid var(--sl-color-gray-5);
  }
  .progress-bar {
    height: 8px;
    background: var(--sl-color-gray-5);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .progress-text {
    font-size: 0.85rem;
    color: var(--sl-color-gray-3);
  }
</style>
