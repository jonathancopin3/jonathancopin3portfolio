@echo off
title Visualiser mon Site en Local (localhost)
echo ==========================================================
echo           DEMARRAGE DU SERVEUR LOCAL PORTFOLIO
echo ==========================================================
echo.
echo Cette fenetre va lancer le site en local.
echo Le navigateur va s'ouvrir automatiquement sur :
echo http://localhost:5173
echo.
echo /!\ IMPORTANT : Laissez cette fenetre ouverte tant que
echo     vous naviguez sur le site. Fermez-la pour arreter.
echo ==========================================================
echo.

cd /d "%~dp0"

:: Verification si node_modules existe, sinon installer
if not exist node_modules (
    echo [INFO] Installation des dependances (premiere fois)...
    call npm install
)

echo [INFO] Demarrage du serveur local...
call npm run dev

pause
