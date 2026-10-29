# GitHub setup and release boundaries

## Recommended repository structure

**Public repository now:** `raven-shadow` — product narrative, roadmap, transparent status and harmless diagrams/demos. **Private repository when source migration begins:** `raven-shadow-core` — proprietary backend, tests, native adapters, internal ledger, model qualification artifacts and non-public operational plans.

This is **one product and one canonical architecture**, not two independent application memories. The public repository is a portfolio/communication projection of the private engineering record.

## Create the public repository

1. Sign in to [GitHub's create repository page](https://github.com/new).
2. Repository name: `raven-shadow` (or `raven-shadow-platform` if unavailable). Description: **Evidence-first AI investigations, autonomous workflow coordination, and independent assurance.**
3. Select **Public**. Do not initialize README/license/.gitignore in the web form if you plan to upload this entire starter; the ZIP already contains a README and `.gitignore`. A license should be chosen deliberately after deciding what, if anything, will be open source.
4. Extract `Raven_Shadow_GitHub_Showcase_Starter.zip` on your computer. From the empty repository's page choose **uploading an existing file** or **Add file → Upload files**. Upload the **contents** of the extracted folder, preserving relative paths; commit to `main`.
5. Confirm GitHub renders `README.md` and the Mermaid diagram. Confirm **Actions** runs the documentation checks (if workflows are enabled). Use **Issues** and **Projects** for the milestones in `docs/ROADMAP.md`.
6. Review repository **Settings → Security/Code security** and enable the available Dependabot, code scanning, secret scanning and push-protection controls. Configure branch rules and required checks as practical.
7. Inspect the rendered public repository without signing in to confirm it reveals no secrets, customer materials, private machine paths, keys, private model artifacts or confidential internal files.

If you later create the private `raven-shadow-core` repository, import the sanitized **source tree** from the v0.7 staging archive, not a blindly committed local workspace. Do not upload local engagement databases, generated records, customer files, `.env` files, credentials, or arbitrary model weights. Preserve history/rollback and map native Raven sources before merging duplicate modules.

## Important Git practice

- Never commit API keys, personal tokens, private keys, cloud credentials, customer data, machine-specific logs or private model files.
- Use branches and pull requests for changes; require tests and explain which requirement IDs changed.
- Pin dependency versions and audit licenses before adding upstream code.
- Keep the original local v0.7 package untouched as a rollback/reference snapshot.
- Never open source the core implementation accidentally: public READMEs/architecture diagrams do not require publishing proprietary code.

## First GitHub project board

Create columns **Backlog → Ready → In progress → Verification → Done → Blocked**. Each issue should contain an `RS-###` identifier, the product outcome, current code being reused, a failure case, the acceptance test and authority boundary.

The first engineering issue is **RS-001: Native Raven source inventory and reuse map**, not 'build an entirely new orchestrator'.
