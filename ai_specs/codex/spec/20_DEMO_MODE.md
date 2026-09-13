# Demo Mode

`/demo` renders the dashboard with local `sampleApplications`.

- No account is required.
- A banner states that results are not saved.
- A signup CTA is visible.
- Samples cover all four statuses.
- Private application data is never fetched.
- Create/edit/delete must not imply persistence.

Because the component reuses authenticated controls, mutation changes must either be disabled or update temporary local state only—never call protected APIs for demo records.
