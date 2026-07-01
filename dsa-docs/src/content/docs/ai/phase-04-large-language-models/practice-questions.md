---
title: "Phase 4: Practice Questions"
description: "Hands-on exercises, fill-in-the-blanks, output questions, debugging, and scenario questions for Phase 4."
sidebar:
  order: 110
---

# Phase 4: Practice Questions

> Test your understanding of LLMs with a variety of practice exercises.

---

## Section 1: Fill in the Blanks

1. An LLM is a _________ trained on massive amounts of _________ to predict the next _________.

2. The _________ mechanism allows each token to attend to every other token in the sequence.

3. In the QKV mechanism, the _________ vector represents what information the token is looking for.

4. _________ encoding adds information about token position since self-attention is permutation-invariant.

5. _________ is the training stage that teaches an LLM to follow instructions using human-written examples.

6. During inference, _________ delivers tokens one at a time instead of waiting for the complete response.

7. _________ is a decoding strategy where only the K most likely tokens are considered for sampling.

8. _________ occurs when an LLM generates plausible-sounding but factually incorrect information.

**Answers:** 1. neural network, text, token | 2. self-attention | 3. query | 4. Positional | 5. Supervised fine-tuning (SFT) | 6. streaming | 7. Top-K | 8. Hallucination

---

## Section 2: True or False

1. **T/F:** An LLM with a temperature of 0 always produces the same output for the same prompt.
   - **True** — Temperature 0 is deterministic (equivalent to greedy decoding)

2. **T/F:** Larger context windows always produce better results.
   - **False** — Larger context windows can introduce more noise and "lost in the middle" problems

3. **T/F:** DPO requires a separate reward model to train.
   - **False** — DPO optimizes directly on preference pairs without a reward model

4. **T/F:** The feed-forward network in a transformer processes each token independently.
   - **True** — FFN operates per-position, with no communication between tokens

5. **T/F:** RLHF and DPO serve the same purpose (aligning LLMs with human preferences).
   - **True** — Both aim to align LLM outputs, just with different approaches

---

## Section 3: Output Prediction

**Question 1:** What happens when you set temperature = 0, top-k = 1, and top-p = 1?

> This is equivalent to greedy decoding. The model will always pick the single most likely next token (top-k=1 ensures only the top token is considered, temperature=0 makes it deterministic).

**Question 2:** You have a transformer with d_model=768 and num_heads=12. What is the dimension of each attention head?

> d_k = d_model / num_heads = 768 / 12 = 64 dimensions per head

**Question 3:** A model has 70 billion parameters and was trained on 2 trillion tokens. What is the token-to-parameter ratio?

> 2T tokens / 70B parameters ≈ 28.6 tokens per parameter (above the Chinchilla optimal ratio of ~20)

---

## Section 4: Debugging

**Scenario 1:** Your LLM keeps repeating the same phrase when generating text. What could be wrong?

> Possible causes: (1) Temperature too low, (2) Top-k too small, (3) Repetition penalty not applied, (4) Model is overfitting or has been overtrained on repetitive data

**Scenario 2:** Your function calling implementation sometimes returns invalid JSON that can't be parsed. How would you fix this?

> Solutions: (1) Use constrained decoding / grammar-based generation, (2) Use a validator that requests regeneration on failure, (3) Add a JSON repair step, (4) Use structured output APIs if available

**Scenario 3:** Your chat application is slow because it waits for the complete response before displaying anything. What's the fix?

> Implement streaming using Server-Sent Events (SSE). Send tokens to the client as they're generated instead of waiting for the full response.

---

## Section 5: Scenario Questions

1. **You're building a medical Q&A system using an LLM. What decoding parameters would you choose and why?**
   - Temperature: 0.1 (low, prefers factual answers)
   - Top-K: 20 (some flexibility for well-formed sentences)
   - Warning: An LLM alone is NOT suitable for medical advice. Add RAG with verified sources and a disclaimer.

2. **Design a function calling schema for a "book flight" tool. Consider the required parameters.**
   ```json
   {
     "name": "book_flight",
     "description": "Book a flight ticket",
     "parameters": {
       "type": "object",
       "properties": {
         "origin": { "type": "string", "description": "Departure airport code (IATA)" },
         "destination": { "type": "string", "description": "Arrival airport code (IATA)" },
         "date": { "type": "string", "description": "Departure date (YYYY-MM-DD)" },
         "passengers": { "type": "integer", "minimum": 1 },
         "class": { "type": "string", "enum": ["economy", "premium", "business", "first"] }
       },
       "required": ["origin", "destination", "date", "passengers"]
     }
   }
   ```

3. **Your LLM-powered chatbot is hallucinating about company policies. What three mitigation strategies would you implement?**
   1. Add RAG (Retrieval-Augmented Generation) — ground responses in an indexed knowledge base
   2. Implement your-policy prompt with "Say 'I don't know' if uncertain"
   3. Add a verification layer — check critical claims against the knowledge base before output
