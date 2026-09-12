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

pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
  echo "[backend] No .env found — creating one for local dev..."
  sed 's/DEBUG=False/DEBUG=True/' .env.example > .env
fi

python manage.py migrate -v 0

echo "[backend] Starting on http://localhost:8000"
python manage.py runserver 2>&1 | sed $'s/^/\033[36m[backend]\033[0m  /' &

# ── Frontend ───────────────────────────────────────────────────────────────────
cd "$ROOT/frontend"

if [ ! -d "node_modules" ]; then
  echo "[frontend] Installing dependencies..."
  npm install -s
fi

echo "[frontend] Starting on http://localhost:5173"
npm run dev 2>&1 | sed $'s/^/\033[35m[frontend]\033[0m /' &

# ── Wait ───────────────────────────────────────────────────────────────────────
wait
