@echo off
chcp 65001 >nul
echo 🌌 Universe 3D - Lancement Simple

rem Vérifier si Python est installé
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python trouvé
    echo Démarrage du serveur web sur http://0.0.0.0:8080
    echo.
    echo Ouvrez votre navigateur et allez sur : http://localhost:8080
    echo.
    python -m http.server 8080 --bind 0.0.0.0
    goto END
)

rem Vérifier si Python 3 est installé
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python 3 trouvé
    echo Démarrage du serveur web sur http://0.0.0.0:8080
    echo.
    echo Ouvrez votre navigateur et allez sur : http://localhost:8080
    echo.
    python3 -m http.server 8080 --bind 0.0.0.0
    goto END
)

rem Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js trouvé
    echo Installation de http-server...
    npm install -g http-server >nul
    echo Démarrage du serveur web sur http://0.0.0.0:8080
    echo.
    echo Ouvrez votre navigateur et allez sur : http://localhost:8080
    echo.
    http-server -p 8080 -c-1 --cors .
    goto END
)

rem Vérifier si PHP est installé
php -v >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PHP trouvé
    echo Démarrage du serveur web sur http://0.0.0.0:8080
    echo.
    echo Ouvrez votre navigateur et allez sur : http://localhost:8080
    echo.
    php -S 0.0.0.0:8080
    goto END
)

:NO_LANGUAGE
cls
echo.
echo   ❌ AUCUN LANGAGE DE SCRIPT TROUVÉ
rem  
echo   Pour lancer l'application, vous avez besoin d'un de ces langages :
echo.
echo   1. Python (recommandé) : https://www.python.org/downloads/
echo      - Cochez "Add Python to PATH" pendant l'installation
echo.
echo   2. Node.js : https://nodejs.org/
echo      - Téléchargez la version LTS
echo.
echo   3. PHP : https://www.php.net/downloads.php
echo.
echo   Une fois installé, relancez ce fichier
rem  
echo.
pause

:END
