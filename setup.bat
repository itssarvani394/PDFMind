@echo off
echo ========================================
echo    PDFMind Setup Script
echo ========================================
echo.

echo This script will set up PDFMind for development.
echo.

REM Check if Python is installed
echo [1/6] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.10+ from https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
) else (
    echo ✓ Python is installed
)

REM Check if Node.js is installed
echo [2/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
) else (
    echo ✓ Node.js is installed
)

REM Check if Ollama is installed
echo [3/6] Checking Ollama installation...
ollama --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: Ollama is not installed or not in PATH
    echo Please install Ollama from https://ollama.ai/download
    echo This is required for the AI functionality
    echo.
    set /p continue="Continue without Ollama? (y/n): "
    if /i not "%continue%"=="y" (
        echo Setup cancelled. Please install Ollama and run setup again.
        pause
        exit /b 1
    )
) else (
    echo ✓ Ollama is installed
)

REM Install Python dependencies
echo [4/6] Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Python dependencies installed

REM Install Node.js dependencies
echo [5/6] Installing Node.js dependencies...
cd frontend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Node.js dependencies installed

REM Create environment files if they don't exist
echo [6/6] Setting up environment files...
if not exist "backend\.env" (
    echo Creating backend/.env file...
    echo TAVILY_API_KEY=your_tavily_api_key_here > backend\.env
    echo ✓ Created backend/.env (please add your Tavily API key)
) else (
    echo ✓ Backend .env file already exists
)

if not exist "frontend\.env.local" (
    echo Creating frontend/.env.local file...
    echo NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... > frontend\.env.local
    echo CLERK_SECRET_KEY=sk_test_... >> frontend\.env.local
    echo NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in >> frontend\.env.local
    echo NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up >> frontend\.env.local
    echo NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard >> frontend\.env.local
    echo NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard >> frontend\.env.local
    echo ✓ Created frontend/.env.local (please add your Clerk keys)
) else (
    echo ✓ Frontend .env.local file already exists
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add your API keys to the .env files
echo 2. Start Ollama: ollama serve
echo 3. Download model: ollama pull llama3
echo 4. Run: start-dev.bat (to start both services)
echo    OR
echo    Run: start-backend.bat and start-frontend.bat separately
echo.
echo For more information, see README.md
echo.
pause
