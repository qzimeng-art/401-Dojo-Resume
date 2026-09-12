#!/usr/bin/env python3
"""
Cross-platform dev launcher — works on macOS, Linux, and Windows.
Starts both the Django backend and Vite frontend with one command:

    python dev.py
"""
import os
import platform
import subprocess
import sys
import threading
from pathlib import Path

ROOT = Path(__file__).parent.resolve()
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"
IS_WIN = platform.system() == "Windows"

# Enable ANSI colour codes on Windows 10+ terminals
if IS_WIN:
    os.system("")

CYAN    = "\033[36m"
MAGENTA = "\033[35m"
RED     = "\033[31m"
BOLD    = "\033[1m"
RESET   = "\033[0m"


# ── Helpers ────────────────────────────────────────────────────────────────────

def find_python():
    for cmd in ("python3", "python"):
        try:
            r = subprocess.run([cmd, "--version"], capture_output=True)
            out = (r.stdout + r.stderr).decode()
            if r.returncode == 0 and "Python 3" in out:
                return cmd
        except FileNotFoundError:
            pass
    return None


def npm():
    """Return the correct npm executable name for this OS."""
    return "npm.cmd" if IS_WIN else "npm"


def venv_exe(name):
    """Return the path to a venv executable for this OS."""
    if IS_WIN:
        return BACKEND / "venv" / "Scripts" / f"{name}.exe"
    return BACKEND / "venv" / "bin" / name


def check_prereqs():
    ok = True

    py = find_python()
    if not py:
        print(f"{RED}ERROR:{RESET} Python 3 is not installed.")
        print("       Download it from https://www.python.org/downloads/")
        ok = False

    for tool, hint in [
        ("node", "https://nodejs.org/en/download/"),
        (npm(),  "https://nodejs.org/en/download/"),
    ]:
        try:
            subprocess.run([tool, "--version"], capture_output=True, check=True)
        except FileNotFoundError:
            print(f"{RED}ERROR:{RESET} '{tool}' is not installed.")
            print(f"       Download Node.js (includes npm) from https://nodejs.org/en/download/")
            ok = False
            break

    if not ok:
        sys.exit(1)

    return py


def pipe(proc, label, color):
    """Read lines from a process and print them with a coloured label prefix."""
    for line in proc.stdout:
        print(f"{color}[{label}]{RESET} {line}", end="", flush=True)


# ── Setup ──────────────────────────────────────────────────────────────────────

def setup_backend(py):
    venv_dir = BACKEND / "venv"
    if not venv_dir.exists():
        print("[backend] Creating virtual environment...")
        subprocess.run([py, "-m", "venv", str(venv_dir)], check=True)

    pip = str(venv_exe("pip"))

    # psycopg2-binary needs PostgreSQL headers and is production-only.
    # Locally we use SQLite, so skip it.
    reqs_text = (BACKEND / "requirements.txt").read_text()
    local_reqs = "\n".join(
        line for line in reqs_text.splitlines() if "psycopg2" not in line
    )
    local_reqs_file = BACKEND / "_dev_requirements.txt"
    local_reqs_file.write_text(local_reqs)

    print("[backend] Installing dependencies...")
    result = subprocess.run([pip, "install", "-r", str(local_reqs_file), "-q"])
    local_reqs_file.unlink(missing_ok=True)

    if result.returncode != 0:
        print(f"{RED}[backend] pip install failed.{RESET}")
        sys.exit(1)

    env_file = BACKEND / ".env"
    if not env_file.exists():
        print("[backend] No .env found — creating one for local development...")
        env_file.write_text(
            (BACKEND / ".env.example").read_text().replace("DEBUG=False", "DEBUG=True")
        )

    python = str(venv_exe("python"))
    subprocess.run(
        [python, "manage.py", "migrate", "-v", "0"],
        cwd=BACKEND, check=True
    )


def setup_frontend():
    env_file = FRONTEND / ".env"
    if not env_file.exists():
        print("[frontend] No .env found — creating one for local dev...")
        env_file.write_text((FRONTEND / ".env.example").read_text())

    vite = FRONTEND / "node_modules" / ".bin" / ("vite.cmd" if IS_WIN else "vite")
    if not vite.exists():
        print("[frontend] Installing dependencies...")
        env = {**os.environ, "PUPPETEER_SKIP_DOWNLOAD": "true"}
        result = subprocess.run(
            [npm(), "install", "--silent"],
            cwd=FRONTEND, env=env
        )
        if result.returncode != 0:
            print(f"{RED}[frontend] npm install failed.{RESET}")
            sys.exit(1)


# ── Run ────────────────────────────────────────────────────────────────────────

def main():
    py = check_prereqs()

    setup_backend(py)
    setup_frontend()

    python = str(venv_exe("python"))
    be_env = {**os.environ, "PYTHONUNBUFFERED": "1"}

    print(f"\n{BOLD}Starting servers...{RESET}")
    print(f"  {CYAN}Backend{RESET}  → http://localhost:8000")
    print(f"  {MAGENTA}Frontend{RESET} → http://localhost:5173")
    print(f"\nPress Ctrl+C to stop both servers.\n")

    backend = subprocess.Popen(
        [python, "manage.py", "runserver"],
        cwd=BACKEND, env=be_env,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True, bufsize=1,
    )
    frontend = subprocess.Popen(
        [npm(), "run", "dev"],
        cwd=FRONTEND,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True, bufsize=1,
    )

    threading.Thread(target=pipe, args=(backend,  "backend",  CYAN),    daemon=True).start()
    threading.Thread(target=pipe, args=(frontend, "frontend", MAGENTA), daemon=True).start()

    try:
        while True:
            if backend.poll() is not None or frontend.poll() is not None:
                break
            threading.Event().wait(0.5)
    except KeyboardInterrupt:
        print(f"\n{BOLD}Shutting down...{RESET}")
    finally:
        for proc in (backend, frontend):
            if proc.poll() is None:
                proc.terminate()
        for proc in (backend, frontend):
            proc.wait()


if __name__ == "__main__":
    main()
