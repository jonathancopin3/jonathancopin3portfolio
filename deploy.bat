@echo off
set GIT_PATH="C:\Program Files\Git\cmd\git.exe"

echo Deploying to GitHub and Vercel...
echo Using Git at: %GIT_PATH%
echo.

echo 0. Configuring Git Identity (Local to this repo)...
%GIT_PATH% config user.email "copin.jonathan@gmail.com"
%GIT_PATH% config user.name "Jonathan Copin"

echo.
echo 1. Adding changes...
%GIT_PATH% add .
if %ERRORLEVEL% NEQ 0 (
    echo Error adding files.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo 2. Committing changes...
%GIT_PATH% commit -m "Global optimization: smooth slider, mobile/desktop swipe, navigation fixes"
if %ERRORLEVEL% NEQ 0 (
    echo Error committing (or nothing to commit).
    echo Continuing...
)

echo.
echo 3. Pushing to GitHub...
%GIT_PATH% push
if %ERRORLEVEL% NEQ 0 (
    echo Error pushing to GitHub. Check your internet connection and permissions.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Deployment triggered! Vercel will update automatically.
