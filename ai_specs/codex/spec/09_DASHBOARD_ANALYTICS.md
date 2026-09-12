# Dashboard and Analytics

## Route

`/dashboard`

## Header

Title:
`Dashboard`

Description:
`Your job search at a glance.`

Primary action:
`+ Add application`

## Hero metrics

Five cards:

1. Total applications
2. Active
3. Interviews
4. Offers
5. Follow-ups due

Each card:
- icon
- large number
- short label
- optional secondary context

Example:
`3`
`Interviews`
`2 upcoming actions`

## Main grid

### Funnel card
Title:
`Application funnel`

Stages:
- Applied
- Screening
- Interview
- Offer

Rejected shown separately or in tooltip/secondary metric.

Chart:
horizontal bar or funnel-like bar chart.

Do not build a complicated custom funnel if Recharts bar chart is cleaner.

### Today card
Title:
`Needs attention`

Show top 4:
- overdue
- today
- interview soon
- stale

CTA:
`View all`

### Conversion card
Metrics:
- Response rate
- Interview rate
- Offer rate

Explain on hover or helper text:
`Based on submitted applications.`

### Recent activity
Last 5–8 events.

### Stale applications
Only show if non-empty.

## Metric formulas

### Total
All except Draft? For judge clarity:
Use all non-Draft applications.

### Active
APPLIED + SCREENING + INTERVIEW

### Interviews
Current INTERVIEW count.

### Offers
Current OFFER count.

### Follow-ups due
next_action_at <= end of today
and status active

## Empty analytics

If no applications:
replace charts with onboarding card.

## Interaction

Metric cards may link:
- Interviews → applications?status=INTERVIEW
- Offers → applications?status=OFFER
- Follow-ups → /today

## Visual hierarchy

Dashboard should be the most polished screen in the app.

Do not overwhelm with more than:
- 5 KPI cards
- 2 major charts/cards in first viewport
- 2 secondary sections below
