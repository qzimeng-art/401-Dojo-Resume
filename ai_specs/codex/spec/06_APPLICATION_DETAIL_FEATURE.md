# Application Detail Feature

## Route

`/applications/[id]`

## Header

Left:
- Company name
- Position title
- small metadata row:
  - location
  - applied date
  - job link

Right:
- status select
- `Edit`
- overflow menu

## Top status strip

Show:
- current stage
- next action
- due date
- stale badge if applicable

If overdue:
use urgent treatment and label:
`Follow-up overdue by X days`

## Desktop layout

```text
+--------------------------------------------------+
| Header                                           |
+------------------------------+-------------------+
| Overview / Job Description   | Activity Timeline |
|                              |                   |
| Resume card                  |                   |
| Match summary                |                   |
+------------------------------+-------------------+
```

## Overview card

Fields:
- Company
- Role
- Location
- Employment type
- Salary
- Applied date
- Job link

## Job description card

- collapse/expand
- preserve line breaks
- no rich HTML rendering
- button: `Open Match Studio` if tailored resume exists
- button: `Tailor resume` if none exists

## Notes card

Simple editable text area or edit modal.

## Resume card

If no tailored resume:
Title: `No tailored resume yet`
Body:
`Create a role-specific copy from your master resume.`
Button:
`Tailor resume`

If tailored resume exists:
- resume name
- updated timestamp
- match score
- button `Open tailored resume`

## Quick actions

Persistent action bar or visible button row:
- `Log communication`
- `Set follow-up`
- `Tailor resume` / `Open resume`

## Activity timeline

Events grouped by date where practical.

Event examples:
- `Application created`
- `Moved from Applied to Interview`
- `Inbound email from recruiter`
- `Tailored resume created`
- `Follow-up scheduled for Sep 15`

## Quick response menu

Button:
`Log response`

Options:
- Interview invitation
- Rejection
- Offer
- Recruiter follow-up
- Other

Choosing:
- preselects inbound
- prefills channel=email when reasonable
- may suggest matching status
- user confirms save

## Not found state

Title:
`Application not found`

Actions:
- Back to Applications
