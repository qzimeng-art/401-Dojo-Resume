# Test Plan

## Backend

Run Django tests from `backend`. Existing coverage includes blank optional fields, invalid URLs, job requirements, server owner assignment, user isolation, and application-file ownership. Add master-resume tests for accepted/rejected file types, metadata, ordering, authenticated isolation, and the intended unauthenticated/demo policy.

## Web

Run lint/build. Smoke-test public pages, auth, demo, dashboard protection, data load, search, board/list, create/edit/upload/delete, profile/logout, review submission, empty/error states, and narrow layouts.

## Mobile

Verify token restoration, auth/logout, guest mode, dashboard, list search, pull-to-refresh, editing, themes, errors, and Android/iOS layout where available.

Security regression: user A must never read, mutate, delete, or attach files to user B's applications.
