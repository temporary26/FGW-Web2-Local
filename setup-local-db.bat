@echo off
echo Setting up local MongoDB for QuickCV...

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not installed or not in PATH
    echo Please install MongoDB Community Server from: https://www.mongodb.com/try/download/community
    echo After installation, make sure mongod is in your PATH
    pause
    exit /b 1
)

REM Create data directory if it doesn't exist
if not exist "data\db" (
    echo Creating MongoDB data directory...
    mkdir data\db
)

echo MongoDB setup complete!
echo.
echo To start MongoDB locally, run:
echo   mongod --dbpath=data\db
echo.
echo Then you can start your backend server with:
echo   cd backend
echo   npm run dev
echo.
pause
