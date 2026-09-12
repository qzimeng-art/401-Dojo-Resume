# Resume System

## Route `/resume`

## Purpose

Maintain one reusable master resume.

## Header

Title:
`Resume Studio`

Description:
> Keep one master resume and create tailored copies for specific jobs.

Actions:
- Edit
- Preview
- Print / Save PDF

## Layout

Desktop:
- left: section navigation
- center: editor or preview
- right: metadata / tips optional

Mobile:
single-column editor with sticky save.

## Editor sections

### Basics
- Name
- Email
- Phone
- Location
- Links

### Summary
- multiline text

### Skills
- tag input
- add/remove tags

### Experience
Repeatable cards:
- Company
- Title
- Location
- Start
- End
- Current
- bullet list

### Education
Repeatable cards:
- School
- Credential
- Location
- Dates
- bullet list

### Projects
Repeatable cards:
- Name
- URL
- Technologies
- bullet list

## Editing behavior

- edits are local until save
- Save button disabled if no changes
- save success toast:
  `Master resume updated`
- navigate-away protection is optional; only add if stable

## Preview

Render as a clean one-page-ish resume.

Typography:
- compact
- black text on white
- print-friendly
- no product chrome inside printable area

## Print

Use CSS print stylesheet.

Print action:
`Print / Save PDF`

No server PDF library required.

## Tailored copy creation

From application:
- fetch master resume
- deep copy JSON
- save new tailored resume
- name:
  `[Company] — [Position]`

Example:
`Shopify — Backend Developer Intern`

## Tailored editor

Same editor component as master.

Differences:
- page header shows linked company/role
- show badge:
  `Tailored copy`
- show link:
  `Back to application`
- Match Studio visible alongside editor on desktop

## Copy isolation

Tailored edits never mutate master.

Master changes never mutate existing tailored resumes.

## Empty master fallback

If no master exists:
- seed it in demo environment
- otherwise show create flow

Do not allow Tailor Resume to crash if master record is absent.
