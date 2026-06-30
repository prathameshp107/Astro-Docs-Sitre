---
title: "Phase 4: Interview Questions"
description: "Comprehensive interview preparation for LLM engineering roles — theory, architecture, coding, and scenario questions."
sidebar:
  order: 130
---

# Phase 4: Interview Questions

> Prepare for AI Engineering interviews with questions ranging from fundamentals to senior-level architecture discussions.

---

## Theory Questions

### Easy

**Q1. What is an LLM and how does it generate text?**
<details>
<summary>Show Answer</summary>
An LLM (Large Language Model) is a neural network trained on massive text data to predict the next token. It generates text **autoregressively**: given a prompt, it predicts the most likely next token, appends it to the input, and repeats until a stop condition is met.
</details>

**Q2. What is the difference between a base model and a fine-tuned model?**
<details>
<summary>Show Answer</summary>
A **base model** is trained on raw text via next-token prediction — it's good at continuing text but not at following instructions. A **fine-tuned model** has been further trained on instruction-response pairs (SFT) and aligned with human preferences (RLHF/DPO) to be helpful, follow instructions, and refuse harmful requests.
</details>

**Q3. What is tokenization and why is it necessary?**
<details>
<summary>Show Answer</summary>
Tokenization converts text into numerical IDs that the model can process. It's necessary because neural networks operate on numbers, not characters. Modern tokenizers use subword tokenization (BPE, SentencePiece, WordPiece) to handle out-of-vocabulary words efficiently.
</details>

### Medium

**Q4. Explain the difference between temperature, top-k, and top-p sampling.**
<details>
<summary>Show Answer</summary>
- **Temperature** scales the logits before softmax — lower values make the distribution sharper (more deterministic), higher values make it more uniform (more random).
- **Top-K** restricts sampling to the K most likely tokens, setting the probability of all others to zero.
- **Top-P (nucleus)** restricts sampling to the smallest set of tokens whose cumulative probability exceeds P.
They can be combined: usually temperature is applied first, then top-k or top-p filtering.
</details>

**Q5. Why did Transformers replace RNNs for language modeling?**
<details>
<summary>Show Answer</summary>
Three key reasons: (1) **Parallelization** — Transformers process all tokens simultaneously, RNNs process sequentially. (2) **Long-range dependencies** — Self-attention has direct connections between all token pairs, while RNNs suffer from vanishing gradients over long sequences. (3) **Scaling** — Transformers scale to hundreds of billions of parameters; RNNs don't scale as well.
</details>

**Q6. What are the three stages of LLM training?**
<details>
<summary>Show Answer</summary>
1. **Pretraining** — Self-supervised next-token prediction on trillions of tokens (99% of compute)
2. **Supervised Fine-Tuning (SFT)** — Training on instruction-response pairs (100K-1M examples)
3. **Alignment** — RLHF or DPO to align with human preferences (helpful, harmless, honest)
</details>

### Hard

**Q7. Explain how RLHF works end-to-end.**
<details>
<summary>Show Answer</summary>
RLHF has three steps:
1. **Collect preference data:** Human annotators rank model outputs for the same prompt
2. **Train a reward model:** A separate model (typically 1-10B params) is trained to predict human preference scores
3. **Optimize with PPO:** The LLM is fine-tuned using Proximal Policy Optimization (PPO) to maximize the reward model's score, with a KL divergence penalty to prevent the model from deviating too far from the SFT model

The reward model acts as a "human preference proxy" — it scores any output, and PPO optimizes the LLM to produce high-scoring outputs.
</details>

**Q8. Compare and contrast RLHF and DPO.**
<details>
<summary>Show Answer</summary>
**Similarities:** Both align LLMs with human preferences using pairwise preference data.

**Differences:**
- **RLHF** trains a separate reward model, then uses PPO to optimize the LLM — complex, unstable, expensive
- **DPO** directly optimizes the LLM on preference pairs using a closed-form loss — simpler, more stable, cheaper
- **RLHF** can use any reward signal (not just pairwise); DPO requires pairwise preferences
- **DPO** doesn't need a reward model, avoiding reward hacking issues
- **RLHF** is more established; DPO is newer but gaining adoption
</details>

**Q9. What causes hallucinations in LLMs and how can they be mitigated?**
<details>
<summary>Show Answer</summary>
**Causes:**
- Model prioritizes plausible text over truth (statistical pattern matching)
- Training data contains inaccuracies
- Model lacks access to verified knowledge during generation
- Decoding strategy favors fluency over factuality

**Mitigations:**
1. **RAG** — Ground generation in retrieved documents
2. **Low temperature** — Reduce randomness for factual queries
3. **Prompt engineering** — "Say 'I don't know' if uncertain"
4. **Constrained decoding** — Force output to follow a schema
5. **Verification layer** — Check claims against a knowledge base
6. **Multiple samples** — Generate N outputs and select the most consistent
</details>

---

## Architecture Questions

**Q10. Draw the architecture of a Transformer decoder block.**
<details>
<summary>Show Answer</summary>
```
Input → [Masked Multi-Head Self-Attention]
       → + (Residual Connection)
       → Layer Normalization
       → Feed-Forward Network (2 layers, 4x expansion)
       → + (Residual Connection)
       → Layer Normalization
       → Output
```
Key differences from encoder: (1) causal masking in self-attention, (2) no cross-attention layer, (3) single stack of decoder blocks.
</details>

**Q11. Why does GPT use a decoder-only architecture?**
<details>
<summary>Show Answer</summary>
GPT uses decoder-only because:
1. **Simplicity** — One stack of blocks instead of two (encoder + decoder)
2. **Autoregressive generation** — Causal masking naturally supports text generation
3. **Scalability** — Decoder-only models scale well with compute and data
4. **Unified architecture** — Same architecture for all layers simplifies implementation

Encoder-decoder models (like T5) are better for tasks where full bidirectional context is needed on the input (translation, summarization with encoder).
</details>

**Q12. What is the role of residual connections in deep transformers?**
<details>
<summary>Show Answer</summary>
Residual (skip) connections allow gradients to flow directly through the network during backpropagation. Without them, gradients would have to pass through 100+ sequential layers, causing vanishing/exploding gradients. They also enable:
- Training deeper models (12 → 100+ layers)
- Faster convergence
- Better gradient flow to early layers
</details>

---

## Coding Questions

**Q13. Write a function to call an LLM API with streaming support.**
```javascript
async function streamLLM(prompt, onToken) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

    for (const line of lines) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      const parsed = JSON.parse(data);
      const token = parsed.choices[0]?.delta?.content || '';
      if (token) onToken(token);
    }
  }
}
```

**Q14. Implement a simple function calling parser.**
```javascript
function parseFunctionCall(llmOutput) {
  // LLM outputs: <tool_call>{"name": "get_weather", "arguments": {"city": "London"}}</tool_call>
  const match = llmOutput.match(/<tool_call>([\s\S]*?)<\/tool_call>/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[1]);
    return {
      name: parsed.name,
      arguments: parsed.arguments
    };
  } catch {
    return null; // Malformed JSON
  }
}
```

---

## Scenario Questions

**Q15. Your company wants to build a customer support chatbot using an LLM. Design the system architecture.**
<details>
<summary>Show Answer</summary>
Key components:
1. **RAG system** — Index knowledge base articles, FAQ, and product docs for retrieval
2. **Prompt template** — System prompt with company context, tone guidelines, and escalation rules
3. **Guardrails** — Content filter for inappropriate queries, PII detection
4. **Function calling** — Tools for order lookup, refund processing, account management
5. **Evaluation** — Track accuracy, hallucination rate, customer satisfaction
6. **Human handoff** — Escalate to human agent when confidence is low

Suggested: GPT-4o-mini for cost efficiency, with RAG and function calling for accuracy.
</details>

**Q16. Your LLM app is too slow. Users wait 10+ seconds for responses. How do you optimize?**
<details>
<summary>Show Answer</summary>
1. **Enable streaming** — Reduces perceived latency to ~500ms (first token)
2. **Use smaller model** — GPT-4o-mini instead of GPT-4o for simple queries
3. **Caching** — Cache common queries and responses
4. **Prompt optimization** — Shorter prompts reduce processing time
5. **Batch processing** — If applicable, batch non-urgent requests
6. **User-side optimization** — Show typing indicator, progressive display
7. **Model quantization** — If self-hosting, use quantized models (GGUF, AWQ)
</details>

---

## Senior-Level Questions

**Q17. Design an evaluation framework for LLM-based applications in production.**
<details>
<summary>Show Answer</summary>
A production evaluation framework should include:

1. **Offline evaluation** (before deployment):
   - Benchmark datasets (MMLU, HumanEval, etc.)
   - Custom golden dataset with expected outputs
   - Automated scoring (BLEU, ROUGE, BERTScore, LLM-as-judge)

2. **Online evaluation** (in production):
   - A/B testing between model versions
   - User feedback (thumbs up/down, ratings)
   - Conversation-level metrics (resolution rate, average turns)

3. **Continuous monitoring**:
   - Output quality (hallucination rate, response time)
   - Safety (toxicity, bias, PII leakage)
   - Cost (tokens per conversation, cost per resolution)

4. **Human evaluation**:
   - Periodic sampling of conversations for manual review
   - Inter-annotator agreement tracking
</details>

**Q18. How would you build a system that uses LLMs to automate software development tasks?**
<details>
<summary>Show Answer</summary>
Architecture:
1. **Code understanding** — Index the codebase with embeddings for context-aware retrieval
2. **Task planning** — LLM decomposes complex tasks into subtasks using chain-of-thought
3. **Code generation** — Generate code with structured output (function name + implementation)
4. **Code review** — Second LLM reviews generated code for bugs, style, and security
5. **Testing** — Automatically generate and run unit tests
6. **Human-in-loop** — Require approval for destructive operations (deletion, deployment)

This is essentially what tools like GitHub Copilot Workspace and Devin are building.
</details>

---

## Quick Reference: Answering Frameworks

| Question Type | Framework |
|---------------|-----------|
| **Explain X** | What → Why → How → Example |
| **Compare X and Y** | Similarities → Differences → When to use each |
| **Design X** | Requirements → Components → Trade-offs → Diagram |
| **Fix X problem** | Symptom → Root cause → Solution → Prevention |
