@echo off
echo Starting local MongoDB server...

REM Create data directory if it doesn't exist
if not exist "data\db" (
    echo Creating MongoDB data directory...
    mkdir data\db
)

echo Starting MongoDB on port 27017...
echo Database will be stored in: %cd%\data\db
echo.
echo Press Ctrl+C to stop MongoDB
echo.

mongod --dbpath=data\db --port=27017
