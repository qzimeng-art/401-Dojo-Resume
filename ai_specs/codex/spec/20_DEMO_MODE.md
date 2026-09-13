# Demo Mode

`/demo` renders the dashboard with local `sampleApplications`.

- No account is required.
- A banner states that results are not saved.
- A signup CTA is visible.
- Samples cover all four statuses.
- Private application data is never fetched.
- Application create/edit/delete must not imply persistence.

Because the component reuses authenticated controls, application mutations should be disabled or temporary only. Master-resume behavior is currently different: the demo attempts an unauthenticated API upload to the shared `demo_user` and also stores metadata in localStorage; if the API fails, a simulated local fallback succeeds. This is a known inconsistency with the general demo banner and should be resolved in future work.
