@echo off
set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"

echo 1. Adding changes...
"%GIT_PATH%" add .

echo 2. Committing...
"%GIT_PATH%" commit -m "Update site configuration and fix background"

echo 3. Pushing to GitHub...
"%GIT_PATH%" push origin main

echo.
echo Deployment triggered!
pause
