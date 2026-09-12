# Server Actions and Query Contracts

## Applications

### listApplications(filters)

Input:
```ts
{
  q?: string
  statuses?: ApplicationStatus[]
  urgency?: "overdue" | "today" | "stale" | "none"
  sort?: "updated_desc" | "applied_desc" | "applied_asc" | "next_action" | "company"
}
```

Return:
```ts
ApplicationSummary[]
```

### getApplication(id)

Return:
```ts
{
  application: Application
  tailoredResume: TailoredResume | null
  communications: Communication[]
  events: ActivityEvent[]
}
```

### createApplication(input)

- validate
- insert
- create APPLICATION_CREATED event
- revalidate
- return id

### updateApplication(id, input)

- validate
- update
- create NEXT_ACTION_UPDATED event when follow-up materially changes
- revalidate

### changeApplicationStatus(id, status)

- read previous status
- update
- create STATUS_CHANGED event
- revalidate dashboard + detail + applications

### deleteApplication(id)

- delete
- cascade
- redirect/list refresh

## Communication

### addCommunication(applicationId, input)

- validate
- insert
- create COMMUNICATION_LOGGED event
- optional requestedStatus:
  if present, call status update within same server operation if practical

## Resume

### getMasterResume()

Return record or seed/default empty model.

### saveMasterResume(content)

Validate shape.

### createTailoredResume(applicationId)

- ensure master exists
- deep clone JSON
- insert
- event
- redirect id

### saveTailoredResume(id, content)

- validate
- compute score
- update
- event optional only if not too noisy

## Analytics

### getDashboardData()

Return:
```ts
{
  totals: {
    total: number
    active: number
    interviews: number
    offers: number
    followUpsDue: number
  }
  statusCounts: Record<ApplicationStatus, number>
  rates: {
    response: number
    interview: number
    offer: number
  }
  needsAttention: AttentionItem[]
  staleApplications: ApplicationSummary[]
  recentActivity: TimelineItem[]
}
```

## Today

### getTodayQueue()

Return prioritized items:
```ts
{
  id: string
  applicationId: string
  company: string
  positionTitle: string
  type: "OVERDUE" | "DUE_TODAY" | "INTERVIEW_SOON" | "STALE"
  label: string
  dueAt?: string
  priority: number
}
```

## Match

### analyzeResumeMatch(jobDescription, resumeContent)

Return:
```ts
{
  score: number
  matched: Array<{ term: string; weight: number }>
  missing: Array<{ term: string; weight: number }>
  focusTerms: string[]
}
```

## Revalidation

After mutation revalidate only relevant routes:
- `/dashboard`
- `/applications`
- `/applications/[id]`
- `/today`
- `/resume`
- tailored resume route

## Error shape

```ts
type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
```

Never throw raw DB errors into UI.
