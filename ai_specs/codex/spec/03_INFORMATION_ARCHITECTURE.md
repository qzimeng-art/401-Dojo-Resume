# Information Architecture

## Web

```text
Public: Home, About, Contact, Support, Security, Privacy, Terms,
        Login, Signup, Demo, Not Found
Authenticated: Dashboard
  ├── Board/List
  ├── Search and status counts
  ├── Add/edit application modal
  ├── Profile
  └── Review modal
```

Application details and editing are dashboard/modal interactions; there is no `/applications/:id` route.

## Mobile

Signed-out stack: Welcome → Login or Signup, with GuestDashboard. Signed-in stack: Dashboard → ApplicationList. Editing is modal-based.
