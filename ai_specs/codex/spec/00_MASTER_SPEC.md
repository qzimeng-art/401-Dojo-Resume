# JobTrackerr! — Current Project Master Specification

## Identity

- Repository/course project: **401-Dojo-Resume** (the Dojo project).
- User-facing product: **JobTrackerr!**
- Purpose: help job seekers record and organize applications across web and mobile.
- This is not an ApplyFlow/Next.js/Supabase project.

## Implemented product

JobTrackerr! provides registration/login, Google sign-in, an authenticated dashboard, a public demo, application CRUD, application-file uploads, search, board/list views, per-status counts, profile/account controls, and moderated reviews. An Expo mobile companion uses the same API for authentication, viewing, searching, and editing applications.

Application stages are exactly `Applied`, `Interview`, `Offer`, and `Rejected`.

## Architecture

- Web: React 19, Vite, React Router, Tailwind CSS 4, Axios, Lucide.
- Mobile: Expo 54, React Native 0.81, React Navigation, AsyncStorage, Axios.
- API: Django, Django REST Framework, dj-rest-auth, django-allauth, JWT/token compatibility.
- Data: Django ORM; SQLite for local development and PostgreSQL support for production.
- Deployment: Vercel-compatible SPA frontend, Gunicorn/Docker backend, EAS mobile builds.

Both clients consume the Django API. The API is the source of truth and enforces per-user application/file ownership.

## Web routes

`/`, `/login`, `/signup`, `/dashboard`, `/demo`, `/about`, `/contact`, `/support`, `/security`, `/privacy`, `/terms`, plus a catch-all 404. `/dashboard` requires authentication. `/demo` uses local sample data.

## Data

- `Application`: owner, company, position, notes, job URL, requirements, status, applied date, timestamps.
- `ApplicationFile`: parent application, upload, type, original filename, timestamp.
- `Review`: owner, rating, comment, moderation flag, timestamps.

## Explicit non-features

There is no structured resume builder, tailored-resume model, match scoring, follow-up queue, recruiter communication timeline, draggable Kanban transition, notification service, or advanced funnel/rate analytics. Attachments may be resumes, but they are application files only.

## Quality contract

Changes must preserve authentication, owner isolation, responsive layouts, demo safety, useful state handling, and API compatibility. The numbered files retain the prior layout but now describe JobTrackerr! or explicitly mark roadmap topics.
