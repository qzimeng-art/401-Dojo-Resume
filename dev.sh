#!/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

# Kill all child processes when this script exits (Ctrl+C or otherwise)
trap 'echo ""; echo "Shutting down..."; kill 0' EXIT

# ── Backend ────────────────────────────────────────────────────────────────────
cd "$ROOT/backend"

if [ ! -d "venv" ]; then
  echo "[backend] Creating virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate

# psycopg2-binary requires PostgreSQL headers and isn't needed locally (SQLite is used instead)
grep -v "psycopg2" requirements.txt | pip install -r /dev/stdin -q || { echo "[backend] pip install failed"; exit 1; }

if [ ! -f ".env" ]; then
  echo "[backend] No .env found — creating one for local dev..."
  sed 's/DEBUG=False/DEBUG=True/' .env.example > .env
fi

python manage.py migrate -v 0

echo "[backend] Starting on http://localhost:8000"
python manage.py runserver 2>&1 | sed $'s/^/\033[36m[backend]\033[0m  /' &

# ── Frontend ───────────────────────────────────────────────────────────────────
cd "$ROOT/frontend"

if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/vite" ]; then
  echo "[frontend] Installing dependencies..."
  PUPPETEER_SKIP_DOWNLOAD=true npm install -s || { echo "[frontend] npm install failed"; exit 1; }
fi

echo "[frontend] Starting on http://localhost:5173"
npm run dev 2>&1 | sed $'s/^/\033[35m[frontend]\033[0m /' &

# ── Wait ───────────────────────────────────────────────────────────────────────
wait
