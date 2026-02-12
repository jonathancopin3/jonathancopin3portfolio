@echo off
echo Starting local server...
cd /d "%~dp0"
call npm run dev
pause
