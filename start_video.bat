@echo off
echo Installing dependencies...
call npm install remotion @remotion/react @remotion/cli --legacy-peer-deps
if %errorlevel% neq 0 (
    echo Installation failed. Retrying with force...
    call npm install remotion @remotion/react @remotion/cli --force
)

echo Starting Remotion Video...
call npm run video
pause
