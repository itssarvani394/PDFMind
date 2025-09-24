@echo off
echo ========================================
echo    PDFMind - AI Document Assistant
echo ========================================
echo.

echo [1/4] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.10+ from https://python.org
    pause
    exit /b 1
)

echo [2/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo [3/4] Installing dependencies...
echo Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo Installing Node.js dependencies...
cd ..\frontend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)

echo [4/4] Starting services...
echo.
echo Starting PDFMind development environment...
echo.
echo Backend will be available at: http://127.0.0.1:8000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop all services
echo.

REM Start backend in new window
start "PDFMind Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "PDFMind Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both services are starting in separate windows...
echo Check the new windows for service status.
echo.
pause
