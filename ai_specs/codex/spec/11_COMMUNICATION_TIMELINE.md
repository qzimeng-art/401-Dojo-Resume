# Communication and Timeline

## Communication form

Title:
`Log communication`

Fields:
- Direction
- Channel
- Date & time
- Contact name
- Subject
- Summary

Defaults:
- occurred_at = now
- direction = inbound
- channel = email

## Direction control

Segmented:
- Inbound
- Outbound

## Channel options

- Email
- Phone
- LinkedIn
- Meeting
- Other

## Summary validation

Required.

Minimum 3 characters.

## Quick templates

Optional buttons:
- Interview invitation
- Rejection
- Offer
- Follow-up sent

Template behavior:
- prefills direction
- prefills subject
- suggests status update

Example:
Interview invitation:
- inbound
- email
- subject: `Interview invitation`
- suggest status = Interview

Do not silently change status without visible confirmation.

## Timeline

Merge:
- activity events
- communications

Sort newest-first by default.

## Timeline item styles

### Application
Icon: briefcase

### Status changed
Icon: arrow-right-circle

### Communication
Icon varies:
- mail
- phone
- message-square

### Resume
Icon: file-text

### Follow-up
Icon: calendar-clock

## Event copy examples

`Moved from Applied to Interview`

`Inbound email from Maya Chen`
`Technical interview invitation`

`Tailored resume created`

`Follow-up scheduled for Sep 15`

## Timeline density

Keep compact.
Judges should be able to scan history quickly.
