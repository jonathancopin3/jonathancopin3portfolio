@echo off
echo ===================================================
echo   FORCE REINSTALL & START (The "Nuclear" Option)
echo ===================================================

echo 1. Cleaning up old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .npmrc del .npmrc

echo 2. creating fresh configuration...
echo registry=https://registry.npmjs.org/> .npmrc
echo always-auth=false>> .npmrc
echo strict-ssl=false>> .npmrc

echo 3. Installing dependencies (This WILL take time)...
call npm install --force --no-audit

echo 4. Starting the video...
echo.
echo ---------------------------------------------------
echo WAITING FOR SERVER TO START...
echo Look for a URL like http://localhost:3000
echo ---------------------------------------------------
echo.
call npm run video

echo.
echo ===================================================
echo IF IT FAILED, PLEASE SEND A SCREENSHOT OF THIS WINDOW
echo ===================================================
pause
