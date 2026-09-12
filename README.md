# 401-Dojo-Resume

A job application tracker with a Kanban board, file uploads, and a mobile app.

---

## Prerequisites

Install these once on your machine before anything else.

| Tool | Version | Download |
|---|---|---|
| Python | 3.10 or newer | https://www.python.org/downloads/ |
| Node.js | 18 or newer | https://nodejs.org/en/download/ |
| Git | any | https://git-scm.com/downloads |

> **Windows users:** when installing Python, tick **"Add Python to PATH"** in the installer.

---

## Running locally

Clone the repo, then run **one command** from the project root:

**macOS / Linux**
```bash
./dev.sh
```

**Windows**
```bat
dev.bat
```

**Any OS (if the above don't work)**
```bash
python dev.py
```

That's it. The script will:
- Create a Python virtual environment and install backend dependencies
- Create a local `.env` file automatically
- Run database migrations
- Install frontend dependencies
- Start both servers

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |

Press **Ctrl+C** to stop both servers.

---

## First-time troubleshooting

**`python3: command not found`**
- On Windows, try `python` instead of `python3`
- Make sure Python is added to PATH (re-run the installer and tick that option)

**`npm: command not found`**
- Node.js comes with npm — reinstall Node from https://nodejs.org

**`Permission denied: ./dev.sh`** (Mac/Linux)
```bash
chmod +x dev.sh
```

**Port already in use**
- Something else is using port 8000 or 5173
- Kill it: `lsof -ti:8000 | xargs kill` (Mac/Linux) or find it in Task Manager (Windows)

---

## Project structure

```
401-Dojo-Resume/
├── frontend/     React + Vite (web app)
├── backend/      Django REST API
├── mobile/       React Native / Expo
└── docs/         Project documentation
```

## Tech stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Backend:** Django 5, Django REST Framework, SQLite (local) / PostgreSQL (production)
- **Mobile:** React Native, Expo
- **Auth:** JWT + Google OAuth
