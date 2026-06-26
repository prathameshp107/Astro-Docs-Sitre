---
title: "13. AI Ethics"
description: "The ethical principles every AI practitioner needs to understand — bias, fairness, privacy, accountability."
sidebar:
  order: 13
---

## Why Ethics in AI?

> AI systems make decisions at scale — millions of times per second, affecting real people. Bad ethical choices in AI design cause real harm at a scale no individual human could.

Ethics isn't optional. It's engineering.

---

## Core Ethical Principles

### 1. Fairness

AI should not discriminate based on protected characteristics (race, gender, age, religion, disability).

**Challenge:** Discrimination can be direct (using race as a feature) or indirect (using zip code as a proxy for race).

**Key question for any model:** Does it perform equally well across demographic groups? Are error rates disproportionate?

---

### 2. Transparency

Stakeholders should be able to understand how an AI system makes decisions — at least at a high level.

| Level | What It Means |
|-------|--------------|
| **Model transparency** | Can engineers inspect the model? |
| **Decision transparency** | Can affected users understand why a decision was made? |
| **Process transparency** | Is the data and training process documented? |

**Regulation:** EU's GDPR includes a "right to explanation" for automated decisions. The EU AI Act requires transparency for high-risk AI.

---

### 3. Privacy

AI systems often require personal data. This creates risks:
- **Data collection** — collecting more than necessary
- **Re-identification** — "anonymized" data that can be reverse-engineered
- **Inference** — AI inferring sensitive attributes (health, politics, sexuality) from innocuous data

**Principles:** Data minimization, informed consent, purpose limitation, right to deletion.

---

### 4. Accountability

When AI causes harm, who is responsible?

- The developer who built it?
- The company that deployed it?
- The user who applied it?

**Current gap:** Legal frameworks haven't caught up. Engineers and organizations must establish internal accountability structures — audit trails, human oversight, incident response.

---

### 5. Safety & Reliability

AI in high-stakes domains (medical, autonomous vehicles, financial systems) must:
- Fail safely
- Have human override options
- Be tested rigorously before deployment
- Be monitored continuously in production

---

### 6. Beneficence & Non-maleficence

- **Beneficence:** AI should produce benefits for people and society
- **Non-maleficence:** AI should not cause harm

These principles require thinking beyond "does it work?" to "who does this help, who might it harm, and at what scale?"

---

## Real-World Ethical Failures

| Case | Issue |
|------|-------|
| Amazon hiring tool (2018) | Trained on male-dominated data → downranked women's resumes |
| Compas recidivism tool | Higher false positive rates for Black defendants |
| Clearview AI | Scraped billions of faces without consent |
| GPT-3 toxicity | Reproduced racist and offensive content from training data |
| Self-driving accidents | Edge case failures with no adequate safety mechanism |

---

## The Dual-Use Problem

Almost all AI capabilities are dual-use:

| Beneficial | Harmful |
|-----------|---------|
| Face recognition for unlocking phones | Mass surveillance |
| Deepfake for film VFX | Non-consensual intimate imagery |
| LLMs for education | LLMs for phishing, disinformation |
| Drone navigation | Autonomous weapons |

Engineers must consider both use cases, not just the intended one.

---

## Practical Checklist for AI Projects

- [ ] Who does this affect, and how?
- [ ] Was consent obtained for the training data?
- [ ] Have we audited for performance disparities across groups?
- [ ] Is there a human in the loop for high-stakes decisions?
- [ ] Can affected users understand or appeal decisions?
- [ ] What happens when this fails?

---

## Interview Questions

**Q: What is algorithmic fairness and why is it hard to achieve?**

**A:** Algorithmic fairness means an AI system's decisions don't unfairly disadvantage people based on protected characteristics. It's hard because: (1) training data encodes historical bias, (2) different mathematical definitions of fairness are often mutually incompatible — you can't simultaneously satisfy all of them, and (3) proxies (like location or education) can be used to discriminate indirectly without using a protected attribute directly.

---

**Q: What is the "dual-use" problem in AI?**

**A:** Dual-use refers to AI capabilities that can be used for both beneficial and harmful purposes. For example, facial recognition can unlock your phone or enable mass surveillance. LLMs can help students learn or write phishing emails. Engineers and organizations must proactively consider how their tools can be misused and implement safeguards — because capability alone doesn't ensure responsible use.
