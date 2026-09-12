# Data Model

## applications

```sql
id uuid primary key
company_name text not null
position_title text not null
status text not null
date_applied date null
job_url text null
location text null
employment_type text null
salary_text text null
job_description text null
notes text null
next_action text null
next_action_at timestamptz null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

## master_resumes

```sql
id uuid primary key
name text not null default 'Master Resume'
content jsonb not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

## tailored_resumes

```sql
id uuid primary key
application_id uuid not null references applications(id) on delete cascade
name text not null
content jsonb not null
match_score integer null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Unique constraint for hackathon version:

```sql
unique(application_id)
```

## communications

```sql
id uuid primary key
application_id uuid not null references applications(id) on delete cascade
occurred_at timestamptz not null
direction text not null
channel text not null
contact_name text null
subject text null
summary text not null
created_at timestamptz not null default now()
```

## activity_events

```sql
id uuid primary key
application_id uuid not null references applications(id) on delete cascade
type text not null
message text not null
metadata jsonb null
created_at timestamptz not null default now()
```

## settings

Optional tiny table:

```sql
id uuid primary key
stale_after_days integer not null default 10
display_name text null
updated_at timestamptz not null default now()
```

## Resume JSON schema

```ts
type ResumeDocument = {
  basics: {
    name: string
    email: string
    phone?: string
    location?: string
    links: Array<{
      label: string
      url: string
    }>
  }
  summary: string
  skills: string[]
  experience: Array<{
    id: string
    company: string
    title: string
    location?: string
    startDate?: string
    endDate?: string
    current?: boolean
    bullets: string[]
  }>
  education: Array<{
    id: string
    school: string
    credential: string
    location?: string
    startDate?: string
    endDate?: string
    bullets: string[]
  }>
  projects: Array<{
    id: string
    name: string
    url?: string
    technologies: string[]
    bullets: string[]
  }>
}
```

## Shared enums

```ts
type ApplicationStatus =
  | "DRAFT"
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN"

type CommunicationDirection = "INBOUND" | "OUTBOUND"

type CommunicationChannel =
  | "EMAIL"
  | "PHONE"
  | "LINKEDIN"
  | "MEETING"
  | "OTHER"

type ActivityEventType =
  | "APPLICATION_CREATED"
  | "STATUS_CHANGED"
  | "COMMUNICATION_LOGGED"
  | "RESUME_TAILORED"
  | "RESUME_UPDATED"
  | "NEXT_ACTION_UPDATED"
```

## Indexes

```sql
create index applications_status_idx on applications(status);
create index applications_next_action_idx on applications(next_action_at);
create index communications_app_time_idx on communications(application_id, occurred_at desc);
create index events_app_time_idx on activity_events(application_id, created_at desc);
```

## Query ownership

Keep DB access in:
- `lib/db/applications.ts`
- `lib/db/resumes.ts`
- `lib/db/communications.ts`
- `lib/db/events.ts`
- `lib/db/analytics.ts`

Do not write raw DB queries in random components.
