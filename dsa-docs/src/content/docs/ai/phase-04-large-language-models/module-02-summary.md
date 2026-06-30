---
title: "Module 2 Summary: Transformer Architecture"
description: "Review and practice everything from Module 2 — transformer components, attention mechanisms, and GPT architecture."
sidebar:
  order: 20
---

# Module 2 Summary: Transformer Architecture

## Quick Recap

| Concept | Key Point |
|---------|-----------|
| **Transformer** | Architecture using self-attention instead of recurrence |
| **Self-Attention** | Each token attends to all other tokens to understand context |
| **QKV** | Query (what I seek), Key (what I have), Value (what I carry) |
| **Multi-Head Attention** | Multiple attention patterns in parallel (8-96 heads) |
| **Positional Encoding** | Adds order information since attention is permutation-invariant |
| **Feed-Forward Network** | Two-layer MLP processing each token independently |
| **Decoder-Only** | Uses causal masking for autoregressive generation |
| **Residual Connections** | Skip connections enabling deep networks (12-96+ layers) |

## Key Architecture Numbers

- **GPT-1:** 12 layers, 768 hidden dim, 12 heads, 117M params
- **GPT-3:** 96 layers, 12,288 hidden dim, 96 heads, 175B params
- **GPT-4:** Estimated ~120 layers, ~16,384 hidden dim, ~128 heads, ~1.8T params
- **Head dimension:** d_k = d_model / num_heads (typically 64-128)

## Practice Questions

1. Calculate the output dimension of multi-head attention if d_model=4096, num_heads=32, and each head outputs 128 dimensions.
2. Why does the dot product in attention need to be scaled by 1/sqrt(d_k)?
3. Draw a single transformer decoder block from memory. Label all components.
4. Explain why residual connections are critical for training deep transformers.
5. What would happen if you removed positional encoding from GPT?

## MCQs

1. **What problem did the Transformer solve that RNNs couldn't?**
   - a) Handling variable-length input
   - b) Parallelization during training
   - c) Processing text data
   - d) Using neural networks
   - **Answer: b**

2. **In the attention formula softmax(QK^T / sqrt(d_k))V, why is sqrt(d_k) used for scaling?**
   - a) To prevent gradient explosion for large d_k
   - b) To make the computation faster
   - c) To ensure the output is normalized
   - d) To reduce memory usage
   - **Answer: a**

3. **What makes decoder-only models "decoder-only"?**
   - a) They don't have an encoder
   - b) They use causal masking
   - c) They only generate text
   - d) All of the above
   - **Answer: d**

4. **How does multi-head attention differ from single-head attention?**
   - a) It processes multiple sequences at once
   - b) It learns multiple relationship patterns in parallel
   - c) It uses multiple GPUs
   - d) It's faster but less accurate
   - **Answer: b**

## Interview Questions

1. **Q:** Explain why Transformers are more parallelizable than RNNs.
2. **Q:** What is the purpose of the feed-forward network in a transformer block?
3. **Q:** How does GPT's architecture differ from the original Transformer?
