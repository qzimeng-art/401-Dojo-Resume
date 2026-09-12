# Applications Feature

## Page: `/applications`

## Page header

Title: `Applications`

Description:
> Track every opportunity from first click to final outcome.

Primary button:
`+ Add application`

## Toolbar

Left:
- Search input: `Search company or role`
- status filter
- urgency filter

Right:
- View toggle:
  - Board
  - List
- sort dropdown in List mode

## Default view

Board.

## Board columns

Show:
- Applied
- Screening
- Interview
- Offer
- Rejected

Draft and Withdrawn appear through List mode/filter.

## Board card

Contents:

```text
[Company logo placeholder/icon] Company
Role title
Status metadata
Applied 8d ago

[Follow-up tomorrow]  [Resume ✓]
```

### Card behaviors
- click card → detail
- quick status menu → change status
- optional drag/drop only if reliable
- overdue badge visible immediately

## List view columns

Desktop:
- Company
- Position
- Status
- Applied
- Next action
- Last activity
- Resume
- More

Mobile:
render cards instead of table.

## Search behavior

Case-insensitive substring match over:
- company
- position title

## Filters

Status:
- All
- Applied
- Screening
- Interview
- Offer
- Rejected
- Draft
- Withdrawn

Urgency:
- All
- Overdue
- Due today
- Stale
- No next action

## Sort options

- Recently updated
- Recently applied
- Oldest applied
- Next action soonest
- Company A–Z

## Add application form

### Required section
- Company*
- Position*
- Status
- Date applied

### Job section
- Job URL
- Location
- Employment type
- Salary

### Context section
- Job description
- Notes

### Follow-up section
- Next action
- Due date/time

## Intelligent defaults

- status = Applied
- date applied = today
- next action blank
- no salary placeholder required

## Validation

- company required, 2–100 chars
- position required, 2–120 chars
- URL optional but valid URL if entered
- date applied cannot be absurdly future-dated
- next action date may be future or past

## Delete behavior

Menu:
`Delete application`

Confirmation:
Title: `Delete this application?`
Body:
`This will also remove its communication history and tailored resume. This action cannot be undone.`

Buttons:
- Cancel
- Delete

## Empty state

Icon + title:
`No applications yet`

Body:
`Add your first opportunity and start tracking every step of your search.`

CTA:
`Add application`
