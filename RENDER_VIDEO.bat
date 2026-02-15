@echo off
echo ===================================================
echo   RENDERING VIDEO TO FILE (MP4)
echo   This process will create a video file you can watch.
echo ===================================================

echo 1. Ensuring tools are ready...
call npm config set registry https://registry.npmjs.org/
call npm install remotion @remotion/react @remotion/cli --no-audit --prefer-offline

echo 2. Rendering Video...
echo    (This usually takes 1-3 minutes depending on your computer speed)
echo    Please wait...

if not exist out mkdir out

call npx remotion render src/remotion/index.ts out/portfolio.mp4 --id=DesktopShowreel

if %errorlevel% equ 0 (
    echo.
    echo ===================================================
    echo SUCCESS! Video rendered to: out\portfolio.mp4
    echo Opening video...
    echo ===================================================
    start out\portfolio.mp4
) else (
    echo.
    echo ===================================================
    echo FAILURE. Could not render the video.
    echo Please ensure you are connected to the internet.
    echo ===================================================
)

pause
