@echo off
setlocal
echo ===============================================================================
echo   MASTER REPAIR & LAUNCHER
echo   "Doing my best to make everything work"
echo ===============================================================================

header
echo 1. PREPARING ENVIRONMENT...
:: Force environment variables to override any global config
set NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
set NPM_CONFIG_ALWAYS_AUTH=false
set NPM_CONFIG_STRICT_SSL=false

echo 2. CLEANING OLD INSTALLATION...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .npmrc del .npmrc

echo 3. INSTALLING DEPENDENCIES...
echo    (This adds Remotion to your project. Please wait 1-2 minutes...)
call npm install remotion @remotion/react @remotion/cli --save-dev --no-audit --prefer-offline --loglevel=error

if %errorlevel% neq 0 (
    echo.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo CRITICAL FAIL: Installation failed.
    echo Please check your internet connection.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    pause
    exit /b
)

echo.
echo ===============================================================================
echo   INSTALLATION SUCCESSFUL!
echo ===============================================================================
echo.
echo WHAT WOULD YOU LIKE TO DO?
echo.
echo    [1] START PREVIEW (Open in Browser)
echo    [2] RENDER VIDEO  (Save as MP4 file)
echo.
set /p choice="Enter 1 or 2: "

if "%choice%"=="1" goto start_preview
if "%choice%"=="2" goto render_video
goto start_preview

:start_preview
echo.
echo STARTING PREVIEW SERVER...
echo If the browser fails to open, go to: http://localhost:3000
echo.
call npx remotion preview src/remotion/index.ts --id=DesktopShowreel --port 3000
pause
exit /b

:render_video
echo.
echo RENDERING VIDEO TO 'out/portfolio.mp4'...
echo This will take a few minutes.
echo.
if not exist out mkdir out
call npx remotion render src/remotion/index.ts out/portfolio.mp4 --id=DesktopShowreel
if %errorlevel% equ 0 (
    echo.
    echo DONE! Opening video...
    start out\portfolio.mp4
) else (
    echo RENDER FAILED.
)
pause
exit /b
