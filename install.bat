@echo off
echo Installing dependencies for QuickCV MEVN Stack...

echo.
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Run backend: cd backend && npm run dev
echo 3. Run frontend: cd frontend && npm run dev
echo.
pause
