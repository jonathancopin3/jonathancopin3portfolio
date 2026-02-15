@echo off
echo ===========================================
echo      FIXING AND STARTING REMOTION
echo ===========================================

echo 1. Configuring npm registry...
call npm config set registry https://registry.npmjs.org/
call npm config set always-auth false

echo 2. Installing dependencies (this may take a minute)...
call npm install --no-audit

echo 3. Installing Remotion specifically...
call npm install remotion @remotion/react @remotion/cli --save-dev

echo 4. Starting Preview...
echo -------------------------------------------
echo OPEN THIS LINK IN YOUR BROWSER:
echo http://localhost:3002
echo -------------------------------------------

call npx remotion preview src/remotion/index.ts --id=DesktopShowreel --port 3002

if %errorlevel% neq 0 (
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo ERROR: The preview failed to start.
    echo Please take a screenshot of this window.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
)

pause
