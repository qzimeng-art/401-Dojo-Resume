# ApplyFlow — Finished Product Master Specification

## Mission

Build a polished, production-like hackathon prototype for the CMPUT 401 Fall 2026 **Job Application Organizer** challenge.

The product must feel complete enough that a judge can use it without explanation.

The implementation should optimize for:
1. rubric coverage,
2. perceived product maturity,
3. demo reliability,
4. responsive design,
5. clear product storytelling,
6. parallel implementation by seven developers plus coding agents.

## Product name

**ApplyFlow**

Tagline:

> Your entire job search, in one place.

Secondary line:

> Track applications, tailor resumes, manage follow-ups, and understand your progress.

## Product promise

ApplyFlow helps a job seeker answer four questions instantly:

1. Where have I applied?
2. What stage is each application in?
3. What do I need to do next?
4. Which resume did I use, and how well does it match the job?

## Core differentiator

Most job trackers stop at CRUD.

ApplyFlow combines:
- application tracking,
- follow-up prioritization,
- communication history,
- resume versioning,
- job-description keyword alignment,
- job-search analytics.

## Required quality bar

The finished application must:
- look intentional on first load,
- have no obvious unfinished placeholders,
- contain realistic seed data,
- support desktop and mobile,
- have consistent spacing and typography,
- show useful empty states,
- avoid crashes on empty/null fields,
- keep all required features accessible within 1–3 clicks,
- have a clean demo path,
- work without external AI services.

## Recommended stack

- Next.js 15+ App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Supabase Postgres
- Recharts
- Lucide icons
- date-fns
- Zod
- Vercel

## Hard constraints

Do not add:
- multi-user auth,
- employer accounts,
- email OAuth,
- job-board scraping,
- calendar OAuth,
- file OCR,
- complex PDF parsing,
- microservices,
- Redux unless an existing implementation already requires it,
- mandatory AI API dependencies.

## Final product routes

```text
/
  -> /dashboard

/dashboard

/applications
/applications/new
/applications/[id]

/resume
/resume/tailored/[id]

/today

/settings
```

`/settings` is tiny and may contain:
- stale threshold,
- display name,
- theme placeholder if desired.

## Final feature set

### Application management
- create
- edit
- delete
- search
- filter
- sort
- status transitions
- Kanban view
- compact list view
- detailed application page

### Follow-up management
- next action text
- next action date
- overdue indicators
- Today queue
- stale-application detection

### Response tracking
- communication log
- inbound/outbound distinction
- quick-add response types
- unified activity timeline

### Resume management
- one master resume
- structured editor
- preview
- browser-print PDF
- tailored copy per application
- version metadata

### Resume Match Studio
- job description analysis
- deterministic keyword extraction
- coverage score
- matched terms
- missing terms
- focus suggestions
- score explanation

### Dashboard analytics
- total applications
- active applications
- interview count
- offer count
- follow-ups due
- funnel visualization
- response rate
- interview rate
- recent activity
- stale applications

### UX polish
- responsive shell
- command search optional
- skeletons
- toasts
- empty states
- confirmation dialogs
- sensible keyboard focus
- consistent status color system

## Finished means

A route is not finished unless:
- it looks complete with seed data,
- it looks complete with empty data,
- it handles loading,
- it handles failed mutation,
- it works at 375px,
- it works at 1440px,
- all actions have visible confirmation or resulting state change.

## Specification index

Read in this order:

1. `00_MASTER_SPEC.md`
2. `01_RUBRIC_STRATEGY.md`
3. `02_PRODUCT_BEHAVIOR.md`
4. `03_INFORMATION_ARCHITECTURE.md`
5. `04_DATA_MODEL.md`
6. `05_APPLICATIONS_FEATURE.md`
7. `06_APPLICATION_DETAIL_FEATURE.md`
8. `07_RESUME_SYSTEM.md`
9. `08_RESUME_MATCH_STUDIO.md`
10. `09_DASHBOARD_ANALYTICS.md`
11. `10_TODAY_QUEUE.md`
12. `11_COMMUNICATION_TIMELINE.md`
13. `12_DESIGN_SYSTEM.md`
14. `13_SCREEN_SPECS.md`
15. `14_RESPONSIVE_ACCESSIBILITY.md`
16. `15_COPY_AND_MICROCOPY.md`
17. `16_SERVER_ACTIONS_AND_QUERIES.md`
18. `17_VALIDATION_AND_ERRORS.md`
19. `18_SEED_DATA.md`
20. `19_TEST_PLAN.md`
21. `20_DEMO_MODE.md`
22. `21_TEAM_PARALLELIZATION.md`
23. `22_GIT_AND_INTEGRATION.md`
24. `23_DEPLOYMENT.md`
25. `24_CODEX_AUTONOMOUS_BUILD.md`
26. `25_DEFINITION_OF_DONE.md`
27. `26_IMPLEMENTATION_CHECKLIST.md`
28. `27_JUDGE_DEMO_SCRIPT.md`
