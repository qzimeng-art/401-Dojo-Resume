# Git and Integration

## Branches

- main
- feat/applications
- feat/detail-timeline
- feat/resume
- feat/match
- feat/dashboard
- feat/polish-seed
- fix/*

## Main rule

Main must stay deployable.

## PR template

### What changed
Short summary.

### Test
Exact route and behavior.

### Known limitations
Only real limitations.

## Merge requirements

Before merge:
- typecheck
- lint if configured
- build if reasonable
- manual happy-path check

## Shared file conflicts

Coordinate before editing:
- package.json
- globals.css
- schema
- shared enum files

## Final 2 hours

Forbidden:
- dependency upgrades
- global refactors
- database redesign
- new framework
- CSS system rewrite

Allowed:
- bug fixes
- spacing
- copy
- missing states
- demo-critical logic
