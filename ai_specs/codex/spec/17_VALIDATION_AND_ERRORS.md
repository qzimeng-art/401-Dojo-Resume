# Validation and Error Handling

## Application schema

Company:
- required
- trim
- 2–100 chars

Position:
- required
- trim
- 2–120 chars

Job URL:
- optional
- URL format

Date applied:
- optional for Draft
- required for non-Draft if practical
- cannot be more than 7 days in future

Job description:
- optional
- max ~20k chars

Notes:
- optional
- max ~5k chars

Next action:
- optional
- max 200 chars

## Communication schema

Summary:
- required
- 3–2000 chars

Subject:
- optional
- max 200

Contact:
- optional
- max 120

## Resume

Basics name:
required.

Email:
valid email if present.

Arrays:
allow empty.

Bullets:
trim blanks before save.

## Error states

### Page query fails
Show card:
`We couldn't load this page.`

Button:
`Try again`

### Mutation fails
Toast:
`We couldn't save this change. Please try again.`

### Not found
`Application not found`

### Match analysis fails
Do not crash editor.
Show:
`Match insights are unavailable right now.`

## Loading states

Dashboard:
- KPI skeletons
- chart skeleton

Applications:
- card/list skeletons

Detail:
- section skeletons

Resume:
- editor skeleton

## Optimistic UI

Safe for:
- status switch
- simple follow-up update

Only use if implementation remains stable.
Otherwise use pending state and refresh.

## Duplicate click protection

Disable submit during pending.

## Empty date handling

Never render:
- Invalid Date
- NaN
- undefined

Use:
`Not set`
or omit secondary line.
