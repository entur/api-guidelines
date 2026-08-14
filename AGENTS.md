# Repository Guidelines

## Project Structure & Module Organization
The repository is documentation-first. `guidelines.md` hosts the canonical Entur API guidance, while `README.md` explains how to enforce those rules through Spectral. Reusable lint rules live in `.spectral.yml` for OpenAPI and `.spectral-asyncapi.yml` for evented contracts. Sample specifications under `specs/` act as reference fixtures for both REST (`reference-spec.json`) and async transports (`reference-spec-async-*.json`). Automation lives in `.github/`, and ownership details reside in `CODEOWNERS`. Keep new source material or assets close to these peers so contributors immediately know whether they are updating prose, rules, or runnable specs.

## Build, Test, and Development Commands
- `npm install -g @stoplight/spectral-cli` (or `yarn global add @stoplight/spectral-cli`) installs the only runtime dependency.
- `spectral lint specs/reference-spec.json --ruleset .spectral.yml` validates OpenAPI examples against Entur rules.
- `spectral lint specs/reference-spec-async-kafka.json --ruleset .spectral-asyncapi.yml` does the same for AsyncAPI contracts.
- `spectral lint specs/*.{json,yml,yaml} --ruleset .spectral.yml` mirrors the Husky/git-hook snippet in `README.md` for bulk checks before pushing.

## Coding Style & Naming Conventions
Specifications are JSON or YAML with two-space indentation and double-quoted keys/strings. Follow OpenAPI 3.1 semantics, keep schema property names in `camelCase`, and prefer plural path segments (`/items/{itemId}`). Headers documented in the guidelines (for example the required `ET-Client-Name`) stay kebab-case and should be declared once in `components.parameters` for reuse. Extend rule files with descriptive IDs (`entur-my-rule`) and leave inline comments only where the intent is non-obvious.

## Testing Guidelines
Spectral is the test suite. Every spec added to `specs/` must lint with zero `error` severity findings; optional `warn` rules can be justified in the PR description. Name new fixtures `reference-spec-<context>.json` (or `.yaml`) so reviewers instantly understand coverage. When adding or changing rules, include a minimal spec snippet that triggers the rule and demonstrate the failing/passing output in your PR to prove enforcement.

## Commit & Pull Request Guidelines
Commits use Conventional Commits (`feat:`, `docs:`, `chore:`, optional `!` for breaking changes) and often reference Jira keys (`API-523`). Keep messages imperative and scoped (e.g., `feat: add error response examples`). Pull requests should summarize the guideline or rule change, link to any relevant issues, paste the Spectral command you ran, and mention affected files (`guidelines.md`, `.spectral.yml`, specific `specs/` entries). Include screenshots only when updating rendered documentation.
