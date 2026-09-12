# Codex Prompt

Read every file in `/spec` before making changes. Treat the specs as the final product contract.

First inspect the repository and generate a concise gap matrix against the spec. Then implement the product end-to-end without stopping at scaffolding. Make reasonable implementation and UI decisions autonomously; do not ask me to choose trivial alternatives already constrained by the specs.

Prioritize complete working flows and polished responsive UX. Do not add auth, scraping, email OAuth, calendar integrations, payments, or mandatory external AI. The deterministic Resume Match Studio, application analytics, unified timeline, Today queue, responsive behavior, realistic seed data, loading/empty/error states, and demo-ready polish are part of the finished product.

After implementation:
1. run typecheck,
2. run lint if configured,
3. run tests,
4. run production build,
5. fix failures,
6. perform a final spec audit,
7. create `IMPLEMENTATION_REPORT.md` with completed features, routes, environment variables, exact run steps, deployment notes, and any genuine remaining limitation.

Do not stop after writing a plan. Continue implementing and fixing until the build is green and the spec is satisfied.
