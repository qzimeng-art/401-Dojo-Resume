# Product Behavior

## Primary user

One job seeker.

No login is required for the hackathon prototype.

## First-run behavior

On first load:
- show seeded realistic data,
- open Dashboard,
- surface at least one overdue item,
- surface at least one interview,
- show a populated funnel.

The application should never first-load into an empty white dashboard.

## Core workflow

### Add application
1. User clicks `Add application`.
2. Drawer/modal/page opens.
3. Required fields appear first.
4. Job description is optional but encouraged.
5. Save.
6. User is redirected to application detail or sees success toast.

### Update stage
1. User selects new stage.
2. UI shows pending state.
3. Mutation succeeds.
4. status chip updates.
5. activity event is created.
6. dashboard statistics reflect new state.

### Add communication
1. User clicks `Log communication`.
2. Form opens.
3. User chooses inbound/outbound and channel.
4. User enters summary.
5. Save.
6. timeline updates.

### Set follow-up
1. User sets next action label and date.
2. Due date appears on application.
3. If overdue, red/urgent semantic treatment.
4. If due today, highlighted in Today queue.

### Tailor resume
1. Open application.
2. Click `Tailor resume`.
3. System clones master resume.
4. Opens tailored editor.
5. Match Studio uses job description.
6. User edits.
7. Save.
8. Application detail shows linked tailored resume.

## Data consistency rules

- changing tailored resume does not change master
- changing master does not retroactively mutate tailored copies
- status changes create events
- communication creates event
- tailored resume creation creates event
- next action changes create event
- deleting application cascades children

## Status ordering

```text
DRAFT
APPLIED
SCREENING
INTERVIEW
OFFER
REJECTED
WITHDRAWN
```

## Active statuses

```text
APPLIED
SCREENING
INTERVIEW
```

## Stale rule

Active application is stale if:
- latest activity is >= 10 days ago
- no overdue follow-up already exists

## Conversion metrics

Applied base denominator:
all applications in:
- APPLIED
- SCREENING
- INTERVIEW
- OFFER
- REJECTED
- WITHDRAWN

Response rate:
applications with at least one inbound communication / applied base

Interview rate:
applications that reached INTERVIEW or OFFER / applied base

Offer rate:
OFFER / applied base

Do not treat DRAFT as applied.
