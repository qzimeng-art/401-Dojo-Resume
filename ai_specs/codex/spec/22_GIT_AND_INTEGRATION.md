# Git and Integration

Use small changes scoped to backend, frontend, mobile, docs, or deployment. Do not commit secrets, `.env`, user uploads, dependency directories, or build artifacts.

Before integration, review migrations/API compatibility, run relevant Django tests and frontend lint/build, smoke-test Expo changes when applicable, and update specs for contract changes. Preserve unrelated dirty-tree work. Resolve conflicts in statuses, serializer fields, and token handling deliberately.
