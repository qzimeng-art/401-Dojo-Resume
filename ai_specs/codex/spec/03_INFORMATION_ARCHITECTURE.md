# Information Architecture

## Desktop shell

```text
+------------------+------------------------------------------+
| Sidebar          | Header                                   |
|                  +------------------------------------------+
| Dashboard        | Page content                             |
| Applications     |                                          |
| Resume Studio    |                                          |
| Today            |                                          |
| Settings         |                                          |
|                  |                                          |
| + Add application|                                          |
+------------------+------------------------------------------+
```

## Mobile shell

```text
+-----------------------------------+
| page title            + Add       |
+-----------------------------------+
| content                           |
|                                   |
+-----------------------------------+
| Dashboard Applications Resume ...|
+-----------------------------------+
```

## Navigation labels

- Dashboard
- Applications
- Resume Studio
- Today
- Settings

## Primary actions by page

### Dashboard
- Add application

### Applications
- Add application

### Application detail
- Change status
- Log communication
- Tailor resume
- Set follow-up
- Edit application

### Resume Studio
- Edit Master Resume
- Preview

### Today
- Open application / Complete follow-up

## Breadcrumb policy

Use breadcrumbs only on detail/edit pages:
- Applications / Shopify / Backend Developer
- Resume Studio / Shopify Backend Resume

Do not clutter top-level pages with breadcrumbs.

## Page title policy

Each page has:
- title
- one-line supporting description where useful
- primary action aligned right on desktop

Examples:
- `Dashboard` — “Your job search at a glance.”
- `Applications` — “Track every opportunity from first click to final outcome.”
- `Resume Studio` — “Keep one master resume and tailor copies for each role.”
- `Today` — “Focus on the actions that matter now.”
