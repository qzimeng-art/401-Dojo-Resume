# API Contracts

All base paths are under `/api/`.

## Applications

- `GET/POST /api/applications/`
- `GET/PUT/PATCH/DELETE /api/applications/{id}/`

Authentication is required. Queries are restricted to `request.user.applications`; creation assigns the current user server-side.

## Files

- `GET/POST /api/files/`
- `GET/PUT/PATCH/DELETE /api/files/{id}/`

Authentication is required. Reads are owner-scoped through the parent, and creation rejects a parent owned by someone else.

## Reviews

Public `GET /api/reviews/` returns approved reviews. Authenticated create/detail/update/delete operations are scoped to the current user. Clients cannot set `is_public`.

## Master resume

- `GET/POST /api/master-resume/`
- `GET/PUT/PATCH/DELETE /api/master-resume/{id}/`

Uploads accept PDF, DOC, or DOCX and derive metadata server-side. Authenticated requests target the signed-in user. The current viewset uses `AllowAny`; unauthenticated requests target a shared `demo_user`, so the demo collection is publicly readable/writable under the as-built API.

## Authentication

dj-rest-auth supplies endpoints under `/api/auth/`; registration is `/api/auth/registration/`, Google login `/api/auth/google/`, and account deletion `DELETE /api/auth/delete/`.

No API exists for resume parsing/matching, tailored resumes, communications, reminders, or advanced analytics.
