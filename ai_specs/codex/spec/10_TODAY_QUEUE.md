# Today Queue

## Route

`/today`

## Header

Title:
`Today`

Description:
`Focus on the actions that matter now.`

## Sections

1. Overdue
2. Due today
3. Upcoming interviews
4. Stale applications

Hide empty sections.

If everything empty:
`You're caught up`
`No urgent follow-ups or stale applications right now.`

## Item card

Display:
- company
- role
- reason
- due timing
- status

Action:
`Open application`

Optional:
`Mark handled` simply clears next action if safe.

## Priority score

```text
overdue follow-up        +50
due today                +40
interview within 3 days  +35
stale 10+ days           +25
currently interviewing   +15
```

Sort descending.

## Overdue copy

Examples:
- `Follow-up overdue by 2 days`
- `Send thank-you email`
- `Prepare interview questions`

## Upcoming interviews

Since no calendar entity exists, infer from:
- next_action text containing interview-related context
- or simply show applications in Interview with near-term next action.

Do not invent calendar integration.
