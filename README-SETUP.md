# 🚀 Setup Guide — AMentoria

Complete guide to run the project locally on **Windows** and **macOS**.

---

## 📋 Prerequisites

Make sure you have the following installed:

- [Python 3.11+](https://www.python.org/downloads/) (recommended: 3.14)
- [Node.js 18+](https://nodejs.org/) (with npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/amentoria.git
cd amentoria
```

---

## 🪟 Windows Setup

### 2. Install Python

Download at: https://www.python.org/downloads/

> ⚠️ **During installation:**
>
> - ✅ Check **"Add Python to PATH"**
> - ✅ Check **"Install pip"**
> - ✅ If prompted about "long path support", type `y` and restart

Verify the installation:

```bash
python --version
python -m pip --version
```

### 3. Create and activate the virtual environment

> Use **CMD**, not PowerShell.

```bash
cd path\to\amentoria
python -m venv venv
venv\Scripts\activate.bat
# (venv) should appear at the beginning of the prompt
```

### 4. Install Python dependencies

```bash
pip install -r requirements.txt
```

---

## 🍎 macOS Setup

### 2. Install Python

Via Homebrew:

```bash
# Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python@3.14
```

Or download at: https://www.python.org/downloads/release/python-3141/

Verify the installation:

```bash
python3 --version
pip3 --version
```

### 3. Create and activate the virtual environment

```bash
cd /path/to/amentoria
python3 -m venv venv
source venv/bin/activate
# (venv) should appear at the beginning of the prompt
```

### 4. Install Python dependencies

```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration (Windows & macOS)

### 5. Set up the `.env` file

Create a `.env` file at the project root (same level as `main.py`):

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/amentoria

# OpenAI API
OPENAI_API_KEY=your-openai-key-here

# JWT Secret Key
SECRET_KEY=
```

To generate the `SECRET_KEY`:

```bash
# Windows
python -c "import secrets; print(secrets.token_hex(32))"

# macOS
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Paste the generated value into the `SECRET_KEY` field in your `.env`.

### 6. Start the database with Docker

```bash
docker compose up -d
```

Wait 5–10 seconds for the database to be ready.

### 7. Start the backend

```bash
uvicorn main:app --reload
```

Expected output:

```
INFO: Uvicorn running on http://127.0.0.1:8000
```

### 8. Start the frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

---

## ✅ Final Checklist

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] Docker Desktop installed
- [ ] Repository cloned
- [ ] Virtual environment created and activated
- [ ] Python dependencies installed
- [ ] `.env` configured with `DATABASE_URL`, `OPENAI_API_KEY`, `SECRET_KEY`
- [ ] Docker Compose started successfully
- [ ] Backend running at http://127.0.0.1:8000
- [ ] Frontend running at http://localhost:3000

---

## 📁 Project Structure

```
amentoria/
├── frontend/           ← Next.js (React)
├── routers/            ← FastAPI routes
├── models/             ← Database models
├── schemas/            ← Pydantic schemas
├── services/           ← Business logic
├── core/               ← Config and database
├── main.py             ← FastAPI app
├── requirements.txt    ← Python dependencies
├── docker-compose.yml  ← Database setup
├── .env.example        ← Env vars template
└── .gitignore          ← Files to ignore
```

---

## 🚀 Useful Commands

### Backend

```bash
# Activate virtual environment
venv\Scripts\activate.bat   # Windows
source venv/bin/activate    # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run backend
uvicorn main:app --reload

# Deactivate virtual environment
deactivate
```

### Frontend

```bash
cd frontend
npm install       # Install dependencies
npm run dev       # Run in development
npm run build     # Production build
npm run start     # Run production locally
```

### Docker

```bash
docker compose up -d       # Start containers
docker compose down        # Stop containers
docker compose logs -f     # View logs
docker compose down -v     # Remove everything
```

---

## 🔧 Troubleshooting

### Windows — PowerShell blocking scripts

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Type Y and press Enter
```

### Windows — Python not found

Uninstall Python, reinstall checking **"Add Python to PATH"**, then restart the terminal.

### macOS — `python` command not found

Use `python3` instead of `python`.

### Docker — Container already exists

```bash
docker compose down
docker compose up -d
```

### Port 8000 or 3000 already in use

**Windows:**

```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**macOS:**

```bash
lsof -i :8000
kill -9 <PID>
```

### Missing Python dependencies (`ModuleNotFoundError`)

1. Make sure `(venv)` is visible in the terminal
2. Run: `pip install -r requirements.txt`

---

## 📝 Important Notes

- **Never commit your `.env` file** — it is listed in `.gitignore` for security
- Keep the backend on port **8000** and the frontend on port **3000**
- Always activate `venv` before installing packages or running the backend
- `SECRET_KEY` should be **unique** for each local installation

---

## 💬 Need Help?

If you run into issues, double-check:

1. Python, Node.js, and Docker versions
2. File permissions (especially on macOS)
3. Port `5432` (database) is not in use by another process
4. Environment variables are correctly set in `.env`
