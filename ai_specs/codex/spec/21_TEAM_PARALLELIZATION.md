# Seven-Person Parallelization

## Team rule

Each person owns a vertical slice with minimal shared-file overlap.

## Person 1 — Integrator / architecture

Own:
- repo scaffold
- database wiring
- shared types
- env
- deployment
- merges
- schema changes

Avoid owning a huge UI feature.

## Person 2 — Applications

Own:
- applications page
- board/list
- create/edit
- search/filter/sort
- status control

## Person 3 — Detail / timeline

Own:
- application detail
- communication form
- unified timeline
- quick response templates

## Person 4 — Resume system

Own:
- master resume
- tailored resume
- shared resume editor
- preview / print

## Person 5 — Match Studio

Own:
- keyword extraction
- scoring
- matched/missing UI
- unit tests

## Person 6 — Dashboard / Today

Own:
- metrics
- chart
- conversion math
- stale detection
- Today queue

## Person 7 — Product polish / QA

Own:
- responsive fixes
- accessibility
- seed data
- empty/loading states
- copy consistency
- final visual review
- smoke testing

## Shared files controlled by integrator

- package.json
- database schema/migrations
- global CSS
- root layout
- shared constants
- env example

## Feature completion standard

Feature owner must deliver:
- data
- server action/query
- UI
- error/loading/empty state
- mobile behavior
- acceptance test notes

## Merge sequence

1. scaffold + DB
2. applications
3. resume base
4. detail/communication
5. dashboard
6. match studio
7. polish
8. demo hardening

## Cut policy

If behind:
1. cut dark mode
2. cut command palette
3. cut AI rewrite
4. simplify drag/drop to select
5. simplify charts
6. keep Match Studio
7. keep Today if possible
8. never cut required flows
