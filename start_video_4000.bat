@echo off
echo Starting Remotion Video on Port 4000...
echo You can access it at: http://localhost:4000

call npx remotion preview src/remotion/index.ts --id=DesktopShowreel --port 4000

pause
