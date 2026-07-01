---
title: "Module 4 Summary: Inference"
description: "Review and practice everything from Module 4 — inference pipeline, decoding, streaming, function calling, and hallucinations."
sidebar:
  order: 40
---

# Module 4 Summary: Inference

## Quick Recap

| Concept | Key Point |
|---------|-----------|
| **Inference** | Autoregressive generation — one token at a time |
| **Greedy Decoding** | Always pick the most likely next token |
| **Beam Search** | Maintain multiple candidate sequences |
| **Temperature** | Controls probability distribution sharpness (0=deterministic, ∞=uniform) |
| **Top-K** | Sample only from the K most likely tokens |
| **Top-P** | Sample from tokens whose cumulative probability exceeds P |
| **Streaming** | SSE delivers tokens as generated, reducing perceived latency |
| **Function Calling** | LLM outputs structured JSON to call external APIs |
| **Constrained Decoding** | Grammar-based generation for valid structured output |
| **Hallucination** | Model generates plausible but incorrect information |

## Key Numbers

- **Tokens per second (GPT-4o):** ~50-100 tokens/s
- **Tokens per second (small local model):** 10-50 tokens/s
- **Typical temperature range:** 0.1 (factual) to 0.9 (creative)
- **Typical top-p value:** 0.9-0.95
- **Typical top-k value:** 40-50
- **Function call latency:** ~200-500ms added to response time

## Practice Questions

1. You're building a code generation tool. What temperature, top-k, and top-p values would you choose? Why?
2. Design a function calling schema for a "send email" tool. Include recipient, subject, body, and priority.
3. What's the difference between streaming output and receiving a complete response?
4. You ask an LLM "What is the capital of France?" and it says "Berlin." What type of problem is this and how would you mitigate it?

## MCQs

1. **Which decoding strategy produces the most deterministic output?**
   - a) Top-k sampling
   - b) Greedy decoding
   - c) Beam search
   - d) Top-p sampling
   - **Answer: b**

2. **What happens when temperature approaches infinity?**
   - a) Output becomes deterministic
   - b) Output becomes uniform random (all tokens equally likely)
   - c) Output becomes empty
   - d) Output doubles in length
   - **Answer: b**

3. **How does streaming improve user experience?**
   - a) Reduces total generation time
   - b) Reduces perceived latency
   - c) Improves output quality
   - d) Reduces cost
   - **Answer: b**

4. **Which is NOT a cause of hallucination in LLMs?**
   - a) The model prioritizes plausible text over truth
   - b) Insufficient training data
   - c) Deliberate deception by the model
   - d) Poor decoding strategy
   - **Answer: c**

## Interview Questions

1. **Q:** Design a temperature schedule for a creative writing assistant. When would you use high vs low temperature?
2. **Q:** How would you handle function calling securely in a production application?
3. **Q:** What are three strategies to reduce hallucinations without retraining the model?
