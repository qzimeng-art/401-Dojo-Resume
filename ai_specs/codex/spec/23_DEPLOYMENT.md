# Deployment

## Web

The Vite SPA is Vercel-compatible; `frontend/vercel.json` rewrites routes to `index.html`. Set `VITE_API_URL` and the Google OAuth client configuration.

## API

The Python 3.11 Dockerfile runs Gunicorn on port 8080. Production needs secure Django settings, database credentials, allowed origins/hosts, OAuth, email, migrations, and media handling. PostgreSQL is intended for production; SQLite supports local work.

## Mobile

EAS defines development, preview, and production profiles. Mobile Axios currently targets `https://api.jobtrackerr.com/`; future environment switching should be centralized.

Older report URLs may be historical. Verify live domains before presenting them as current.
