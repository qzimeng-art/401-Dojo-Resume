# Codex Autonomous Build Contract

## Purpose

This file is the operating contract for Codex.

Codex should make reasonable product/implementation decisions without asking the user to repeatedly choose between trivial alternatives.

## Prime directive

Build the complete product described by `/spec`.

Do not merely scaffold.

Do not stop after generating files.

Continue until:
- all P0 features work,
- all defined high-ROI differentiators work,
- build passes,
- tests pass where configured,
- mobile and desktop layouts are implemented,
- README setup is complete.

## Decision hierarchy

When requirements conflict:

1. challenge/rubric requirements
2. `00_MASTER_SPEC.md`
3. feature-specific spec
4. visual consistency
5. implementation convenience

## Autonomous behavior

Codex should:
- inspect current repo first
- reuse working code
- create missing files
- install only justified dependencies
- implement DB schema
- wire seed data
- implement routes
- implement server logic
- implement polished UI
- test
- fix errors
- re-run build
- iterate until green

## Do not ask the user about

Unless blocked:
- exact component filenames
- exact variable names
- whether to use modal vs sheet when spec already implies behavior
- minor spacing choices
- exact icons
- whether to use server action or route handler for a straightforward mutation
- tiny copy variants

Make the best decision from the spec.

## Ask only if truly blocked by external dependency

Examples:
- missing Supabase credentials
- deployment permissions
- API key explicitly required for optional AI
- repository access issue

If missing credentials:
build everything else and provide exact env contract.

## Implementation sequence

### Phase 1 — Audit
Produce a gap matrix:
- Present
- Partial
- Missing

Map against:
- Applications
- Communications
- Resume
- Match Studio
- Dashboard
- Today
- Responsive
- Seed
- Tests
- Deploy docs

### Phase 2 — Foundation
- shared types
- DB schema
- DB client
- actions/queries
- shell/navigation

### Phase 3 — Core flows
- Applications
- Detail
- Communication
- Master Resume
- Tailored Resume

### Phase 4 — Winning features
- Match Studio
- Analytics
- Timeline
- Today

### Phase 5 — Polish
- empty states
- loading
- toasts
- responsive
- accessibility
- copy
- seed

### Phase 6 — Verify
Run:
- typecheck
- lint
- tests
- build

Fix every blocking error.

### Phase 7 — Final audit
Compare implementation against all `/spec` files.

Create `IMPLEMENTATION_REPORT.md` containing:
- implemented features
- routes
- tests
- known limitations
- env needed
- exact run commands

## Coding standards

- TypeScript strict if repo supports it
- no `any` unless unavoidable
- keep domain logic in lib
- keep components focused
- no giant all-in-one dashboard component
- no repeated raw status mappings
- use Zod on server mutation boundaries

## UI standards

Every major route must include:
- loading state
- empty state
- normal state
- mobile layout

Every mutation:
- pending state
- success feedback
- failure feedback

## AI features

Do not block on AI API.

Deterministic Match Studio is mandatory.

Optional AI rewrite may be added only after everything else is complete.

## Forbidden scope creep

Do not add:
- authentication
- social login
- email sync
- scraping
- payments
- multi-tenant roles
- calendar OAuth
- chatbot
- complex import/export

## Final autonomous prompt

Use this prompt with Codex:

> Read every file in `/spec` before making changes. Treat the specs as the final product contract. First inspect the repository and generate a concise gap matrix against the spec. Then implement the product end-to-end without stopping at scaffolding. Make reasonable implementation and UI decisions autonomously; do not ask me to choose trivial alternatives already constrained by the specs. Prioritize complete working flows and polished responsive UX. Do not add auth, scraping, email OAuth, calendar integrations, or mandatory external AI. The deterministic Resume Match Studio, application analytics, unified timeline, and Today queue are part of the finished product. Use realistic seeded demo data. After implementation, run typecheck/lint/tests/build, fix failures, and create `IMPLEMENTATION_REPORT.md` with what is complete, exact run steps, environment variables, and any genuine remaining limitation. Continue iterating until the build is green and the spec audit is satisfied.
