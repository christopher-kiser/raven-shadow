# GitHub and Hugging Face: build faster without creating a second Raven

**Recommendation:** Use **GitHub immediately** for source control, documentation, test gates, status and collaboration. Use **Hugging Face selectively** to discover and evaluate models/datasets. Neither should replace our canonical Raven Store, existing Queen workflow, or Shadow's independent assurance.

## Reuse decision matrix

| Resource | What it accelerates | Rule for this project |
| --- | --- | --- |
| GitHub repository, Issues and Projects | Version history, requirements, reviewable changes, milestone tracking and credible public progress | Put documentation in public; keep credentials, company sources, native state and proprietary runtime code private |
| GitHub Actions | Automated regressions, security and evidence checks on changes | Prefer existing tests; capture real outputs; do not report staged tests as production certification |
| GitHub security features | Dependency advisories, code/secret scanning and vulnerability reporting | Enable available scanners and push protection; apply least-privilege tokens |
| Hugging Face model Hub | Candidates for local inference, embeddings, classification, reranking or multimodal parsing | Inspect model card, license, model/data provenance, hardware needs and security; benchmark against existing approved model |
| Hugging Face datasets and evaluation examples | Public/synthetic adversarial test corpora and benchmarking methods | No private customer data; test independent truth rather than model agreement |
| OpenTelemetry | Traces, logs and metrics to make worker communication and failures measurable | Instrument canonical runtime; visualization reads telemetry/audit events, not fabricated signals |
| Temporal | Durable workflows and retry semantics if local/native infrastructure proves insufficient at scale | **Evaluate only after source audit**; current v0.7 already has a local durable runtime, so a second orchestrator would be premature |
| LangGraph | Stateful, checkpointed reasoning patterns and human-review interrupts | **Evaluate only if missing** in existing Queen; do not create another memory/agent platform |

## Hugging Face trial process

1. Define an exact gap: e.g. document retrieval relevance, structured source extraction or low-cost agent planning.
2. Choose a **small set** of licensed candidates from their model cards; validate commercial-use rights and any access/use restrictions, dataset provenance and known limitations.
3. Use public/synthetic evaluation cases and the current approved local model as a baseline. Include adversarial fabricated-citation and false-completion cases.
4. Measure evidence-supported accuracy, error/abstention rate, latency, memory/CPU/GPU use, cost and recovery behavior.
5. Promote only a candidate that passes the gate **through the existing model router**. Store model revision and test results; preserve rollback and an explicit `NOT ASSESSED` path.

**Avoid:** auto-downloading trending agent frameworks; relying on an 'uncensored' model as a trust guarantee; sending private company documents to public Spaces or datasets; using a model with unknown license; or running multiple paid agents continuously just to preserve context.

## Reuse/adapt/reject audit rule

A candidate library should answer these questions before adoption: What existing module does it replace? What specific failure does it fix? Is its license appropriate? Has it been maintained and reviewed? Does it work offline and within the hardware/cost envelope? What are its runtime permissions? Can we remove it without losing canonical state? Can Shadow independently validate what it does?

**Sources and official docs (reviewed October 2026):**

- [GitHub best practices](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
- [GitHub repository security quickstart](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository)
- [Hugging Face model cards](https://huggingface.co/docs/hub/model-cards)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [Temporal workflow semantics](https://docs.temporal.io/workflows)
- [LangGraph checkpoints and interrupts](https://langchain-ai.github.io/langgraph/concepts/breakpoints/)
