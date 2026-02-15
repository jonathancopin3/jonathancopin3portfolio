@echo off
echo Running Remotion Debug... > debug_log.txt
echo Node Version: >> debug_log.txt
node -v >> debug_log.txt 2>&1
echo NPM Version: >> debug_log.txt
npm -v >> debug_log.txt 2>&1

echo List of key modules: >> debug_log.txt
if exist node_modules\@remotion (
    dir node_modules\@remotion >> debug_log.txt
) else (
    echo @remotion folder NOT FOUND >> debug_log.txt
)

echo Attempting to start Remotion... >> debug_log.txt
call npx remotion preview src/remotion/index.ts --id=DesktopShowreel --port 3005 >> debug_log.txt 2>&1

echo ---------------------------------------------------
echo DONE. Please check debug_log.txt
echo ---------------------------------------------------
pause
