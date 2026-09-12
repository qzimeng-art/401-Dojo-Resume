# Test Plan

## Goal

Protect the judge journey.

## Required automated checks

### Unit tests
Prioritize:
- resume match scoring
- stale detection
- Today priority scoring
- conversion-rate math

### Integration / e2e
At least one happy path:
1. create application
2. change status
3. log communication
4. create tailored resume
5. see score

If Playwright setup costs too much, implement targeted tests plus a strong manual smoke script.

## Manual smoke script

Before final deployment:

1. Hard refresh dashboard.
2. Verify seeded KPI numbers.
3. Open Applications.
4. Search `Shopify`.
5. Clear search.
6. Filter Interview.
7. Open Shopify.
8. Change status to Screening then back to Interview.
9. Add communication.
10. Set follow-up.
11. Open tailored resume.
12. Edit one bullet.
13. Save.
14. Verify score still renders.
15. Open master resume.
16. Verify tailored edit did not alter master.
17. Open Today.
18. Verify overdue + stale entries.
19. Resize browser to 375px.
20. Repeat:
   - navigation
   - open application
   - log communication
   - open resume
21. Check console for fatal errors.
22. Reload deployed app.

## Browser matrix

Required:
- Chrome desktop
- Chrome mobile viewport

Nice to verify:
- Edge
- Safari if available

## Visual QA checklist

- no clipped cards
- no broken chart labels
- no overflow
- no lorem ipsum
- no “undefined”
- no inconsistent status wording
- no giant empty gaps
- no unstyled native inputs
- no duplicate buttons
- no missing mobile nav

## Accessibility QA

- keyboard through add application
- tab focus visible
- modal trap works
- icon buttons labeled
- status text readable
- contrast acceptable

## Final blocker severity

P0 blocker:
- deploy broken
- create/edit broken
- status broken
- resume broken
- communication broken
- mobile unusable
- crash on dashboard

P1 blocker:
- match score missing
- timeline broken
- analytics incorrect

P2:
- micro-animation
- command palette
- dark mode
