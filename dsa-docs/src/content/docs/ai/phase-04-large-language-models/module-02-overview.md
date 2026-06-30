---
title: "Module 2: Transformer Architecture"
description: "Deep dive into the Transformer — self-attention, QKV, multi-head attention, positional encoding, and GPT architecture."
sidebar:
  order: 2
---

# Module 2: Transformer Architecture

> **The heart of every modern LLM. Understand the Transformer architecture — how attention works, how position is encoded, and how GPT puts it all together.**

---

## Overview

Module 2 is the most technically deep module in this phase. You'll learn how the Transformer architecture works from the ground up — starting with why it was invented, then building up each component: self-attention, Query-Key-Value, multi-head attention, positional encoding, feed-forward networks, and finally how GPT uses only the decoder portion.

---

## Learning Objectives

After completing this module, you will be able to:

- ✅ Explain why Transformers replaced RNNs
- ✅ Describe how self-attention computes relationships between tokens
- ✅ Explain the QKV (Query, Key, Value) mechanism
- ✅ Understand multi-head attention and why multiple heads help
- ✅ Explain positional encoding and why it's needed
- ✅ Describe the feed-forward network's role in each transformer block
- ✅ Explain decoder-only architecture used by GPT
- ✅ Draw the complete GPT architecture diagram

---

## Prerequisites

| Requirement | Level |
|------------|-------|
| Module 1: LLM Foundations | ✅ Required |
| Understanding of neural networks | ⭐ Recommended |
| Basic understanding of sequence models | 🔄 Helpful |

---

## Estimated Time

| Activity | Time |
|----------|------|
| Reading lessons | 4.5 hours |
| Practice exercises | 1 hour |
| Mini quiz | 30 minutes |
| **Total** | **~6 hours** |

---

## Lessons

| # | Lesson | 🔥 | Description |
|---|--------|-----|-------------|
| 05 | [Transformer Overview](./05-transformer-overview) | 🔥 Must Know | Why Transformers, high-level architecture |
| 06 | [Self-Attention](./06-self-attention) | 🔥 Must Know | How tokens attend to each other |
| 07 | [Query, Key, Value](./07-query-key-value) | 🧠 Core Concept | The QKV mechanism in detail |
| 08 | [Multi-Head Attention](./08-multi-head-attention) | 🧠 Core Concept | Multiple attention heads in parallel |
| 09 | [Positional Encoding](./09-positional-encoding) | 🧠 Core Concept | How Transformers know word order |
| 10 | [Feed-Forward Network](./10-feed-forward-network) | 🧠 Core Concept | The MLP layer in each transformer block |
| 11 | [Decoder-Only Transformers](./11-decoder-only-transformers) | 🧠 Core Concept | Why GPT uses only the decoder |
| 12 | [GPT Architecture](./12-gpt-architecture) | 🔥 Must Know | Putting it all together |

---

## Architecture Overview

```mermaid
flowchart TD
    IN["Input Tokens"] --> PE["+ Positional Encoding"]
    PE --> ATTN["Multi-Head Self-Attention"]
    ATTN --> ADD1["+ Residual Connection"]
    ADD1 --> NORM1["Layer Normalization"]
    NORM1 --> FFN["Feed-Forward Network"]
    FFN --> ADD2["+ Residual Connection"]
    ADD2 --> NORM2["Layer Normalization"]
    NORM2 --> OUT["Output"])
    ATTN --> QKV

    subgraph QKV["Query, Key, Value"]
        Q["Query"] --> SCORE["Attention Scores"]
        K["Key"] --> SCORE
        SCORE --> SOFT["Softmax"]
        SOFT --> WEIGHT["Weighted Sum"]
        V["Value"] --> WEIGHT
    end

    style IN fill:#3b82f6,color:#fff
    style PE fill:#8b5cf6,color:#fff
    style ATTN fill:#f59e0b,color:#fff
    style FFN fill:#22c55e,color:#fff
    style OUT fill:#ef4444,color:#fff
```

---

## Key Concepts

- **Self-Attention:** Each token "looks at" every other token to understand context
- **QKV:** Query (what am I looking for), Key (what do I have), Value (what information do I carry)
- **Multi-Head:** Multiple attention patterns learned in parallel (8-96 heads)
- **Positional Encoding:** Sinusoidal or learned embeddings that encode position
- **FFN:** Two-layer MLP that processes each token independently
- **Decoder-Only:** Causal masking prevents attending to future tokens
- **Residual Connections:** Help gradients flow through deep networks (12-96+ layers)
- **LayerNorm:** Stabilizes training by normalizing activations

---

## Module Summary

In this module, you learned:

1. **Transformers** use self-attention instead of recurrence, enabling parallelization
2. **Self-attention** computes a weighted sum of all tokens using QKV
3. **Multi-head attention** learns multiple relationship patterns simultaneously
4. **Positional encoding** adds order information since self-attention is permutation-invariant
5. **Feed-forward networks** add non-linear transformation per token
6. **Decoder-only transformers** use causal masking for autoregressive generation
7. **GPT** stacks 12-96+ decoder blocks with increasing sophistication

---

## Practice Questions

1. Why can't self-attention alone understand word order? How is this fixed?
2. Explain why Transformers are more parallelizable than RNNs.
3. If a model has 96 attention heads and a hidden dimension of 12,288, what is the dimension of each head?
4. Why do decoder-only models use causal masking?
5. What would happen if you removed residual connections from a deep transformer?

---

## Interview Questions

1. **Q:** Explain the difference between self-attention and cross-attention.
   - **A:** Self-attention computes attention where Q, K, and V all come from the same sequence. Cross-attention uses Q from one sequence and K, V from another (e.g., encoder-decoder models like T5).

2. **Q:** Why does GPT use a decoder-only architecture instead of encoder-decoder?
   - **A:** Decoder-only is simpler, more scalable, and works well for text generation. The causal masking allows autoregressive generation. Encoder-decoder is better for translation-like tasks where full bidirectional context is needed on the input side.

3. **Q:** How does the dimension per head affect what the model learns?
   - **A:** Smaller heads learn fine-grained patterns (like syntax); larger heads learn broader patterns (like semantics). The total capacity is the sum across all heads.

---

## Next Steps

➡️ Continue to [Module 3: Training →](./module-03-overview)