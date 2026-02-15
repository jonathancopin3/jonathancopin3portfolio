@echo off
echo ===================================================
echo      FIXING NPM AUTHENTICATION & STARTING
echo ===================================================

echo 1. Clearing NPM Credentials...
call npm logout
call npm config delete //registry.npmjs.org/:_authToken
call npm config delete registry
call npm config delete @remotion:registry

echo 2. Cleaning Cache...
call npm cache clean --force

echo 3. Setting Public Registry...
call npm config set registry https://registry.npmjs.org/

echo 4. Installing Dependencies...
call npm install remotion @remotion/react @remotion/cli

echo 5. Starting Video...
call npm run video

pause
