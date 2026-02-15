@echo off
echo Starting Remotion Video on Port 3001...
echo You can access it at: http://localhost:3001

:: Use npx directly to bypass package.json script issues if any
call npx remotion preview src/remotion/index.ts --id=DesktopShowreel --port 3001

pause
