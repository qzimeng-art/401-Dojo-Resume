# Design System

## Design goal

Professional SaaS product for job seekers.

Visual personality:
- clean
- calm
- modern
- credible
- slightly motivating
- not childish

## Color strategy

Use shadcn/Tailwind semantic tokens.

Recommended:
- neutral/slate base
- primary accent: indigo/blue family
- success: green
- warning: amber
- destructive: red

Do not hard-code many arbitrary colors.

## Status semantics

Use text + color.

### Draft
neutral gray

### Applied
blue

### Screening
violet

### Interview
amber/orange

### Offer
green

### Rejected
red

### Withdrawn
gray

## Typography

Recommended:
- Inter or Geist
- if default Next.js Geist available, use it

Hierarchy:

### H1
30–36px desktop
26–30px mobile
font-semibold

### H2
20–24px
font-semibold

### H3
16–18px
font-semibold

### Body
14–16px

### Supporting
12–14px muted

## Spacing

Use 4px grid.

Common:
- page horizontal padding: 24–32 desktop
- mobile: 16
- card padding: 20–24
- compact cards: 16
- section gap: 24–32

## Radius

- cards: 12px
- inputs: 8px
- buttons: 8px
- badges: pill/999px where appropriate

## Shadows

Subtle only.

Prefer borders + tiny shadow over floating heavy cards.

## Buttons

Primary:
- Add application
- Save changes
- Tailor resume

Secondary:
- Edit
- Preview
- Log communication

Destructive:
- Delete

## Inputs

All inputs:
- visible label
- placeholder only for examples
- error text below field
- consistent height

## Icons

Lucide only.

Common:
- LayoutDashboard
- BriefcaseBusiness
- FileText
- CalendarClock
- Settings
- Search
- Plus
- Mail
- Phone
- MessageSquare
- ExternalLink
- Pencil
- Trash2
- CheckCircle2
- AlertTriangle
- Clock3

## Cards

Default:
- white / surface
- border
- radius
- modest padding

Do not use five different card styles.

## Motion

Allowed:
- 150–200ms hover/focus transitions
- subtle dialog/sheet transitions
- status chip transition

Avoid:
- page entrance animations
- animated gradients
- parallax
- flashy number counters

## Dark mode

Optional only.
Do not spend critical-path time on it.

## Logo

Simple text logo:
`ApplyFlow`

Optional mark:
briefcase + check.

No need to create a custom illustrated logo.
