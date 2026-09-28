@echo off
rem Universe 3D - Lancement Ultra-Simple
rem Ce fichier détecte automatiquement le meilleur moyen de lancer le serveur

mode con: cols=80 lines=25
cls
echo.
echo   🌌🌌🌌 UNIVERSE 3D - LANCEMENT AUTOMATIQUE 🌌🌌🌌
echo.
echo   Ce programme va lancer un serveur web local pour l'application
rem  
echo.
echo   Veuillez patienter...
echo.

rem Vérifier si Python est installé (version 3 d'abord)
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    cls
    echo.
    echo   ✅ Python 3 trouvé
    echo.
    echo   Démarrage du serveur web...
    echo   Appuyez sur CTRL+C pour arrêter
    echo.
    echo   Ouvrez votre navigateur et allez sur :
    echo   http://localhost:8080
    echo.
    echo   Pour accéder depuis un autre appareil sur votre réseau :
    for /f "tokens=2 delims=:" %%A in ('ipconfig ^| find "IPv4"') do (
        echo   http://%%A:8080
    )
    echo.
    python3 -m http.server 8080 --bind 0.0.0.0
    goto END
)

rem Vérifier si Python 2 est installé
python --version >nul 2>&1
if %errorlevel% equ 0 (
    cls
    echo.
    echo   ✅ Python 2 trouvé
    echo.
    echo   Démarrage du serveur web...
    echo   Appuyez sur CTRL+C pour arrêter
    echo.
    echo   Ouvrez votre navigateur et allez sur :
    echo   http://localhost:8080
    echo.
    echo   Pour accéder depuis un autre appareil sur votre réseau :
    for /f "tokens=2 delims=:" %%A in ('ipconfig ^| find "IPv4"') do (
        echo   http://%%A:8080
    )
    echo.
    python -m SimpleHTTPServer 8080
    goto END
)

rem Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% equ 0 (
    cls
    echo.
    echo   ✅ Node.js trouvé
    echo.
    echo   Installation de http-server...
    npm install -g http-server >nul 2>&1
    cls
    echo.
    echo   ✅ http-server installé
    echo.
    echo   Démarrage du serveur web...
    echo   Appuyez sur CTRL+C pour arrêter
    echo.
    echo   Ouvrez votre navigateur et allez sur :
    echo   http://localhost:8080
    echo.
    echo   Pour accéder depuis un autre appareil sur votre réseau :
    for /f "tokens=2 delims=:" %%A in ('ipconfig ^| find "IPv4"') do (
        echo   http://%%A:8080
    )
    echo.
    http-server -p 8080 -c-1 --cors .
    goto END
)

rem Vérifier si PHP est installé
php -v >nul 2>&1
if %errorlevel% equ 0 (
    cls
    echo.
    echo   ✅ PHP trouvé
    echo.
    echo   Démarrage du serveur web...
    echo   Appuyez sur CTRL+C pour arrêter
    echo.
    echo   Ouvrez votre navigateur et allez sur :
    echo   http://localhost:8080
    echo.
    echo   Pour accéder depuis un autre appareil sur votre réseau :
    for /f "tokens=2 delims=:" %%A in ('ipconfig ^| find "IPv4"') do (
        echo   http://%%A:8080
    )
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
goto END

:END
