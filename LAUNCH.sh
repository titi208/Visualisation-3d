#!/bin/bash

echo "🌌 Universe 3D - Lancement Simple"
echo ""

if command -v python3 &> /dev/null; then
    echo "✅ Python 3 trouvé"
    echo "Démarrage du serveur web sur http://0.0.0.0:8080"
    echo ""
    echo "Ouvrez votre navigateur et allez sur : http://localhost:8080"
    echo ""
    python3 -m http.server 8080 --bind 0.0.0.0
elif command -v python &> /dev/null; then
    echo "✅ Python trouvé"
    echo "Démarrage du serveur web sur http://0.0.0.0:8080"
    echo ""
    echo "Ouvrez votre navigateur et allez sur : http://localhost:8080"
    echo ""
    python -m http.server 8080 --bind 0.0.0.0
else
    if command -v node &> /dev/null; then
        echo "✅ Node.js trouvé"
        echo "Installation de http-server..."
        npm install -g http-server > /dev/null 2>&1
        echo "Démarrage du serveur web sur http://0.0.0.0:8080"
        echo ""
        echo "Ouvrez votre navigateur et allez sur : http://localhost:8080"
        echo ""
        http-server -p 8080 -c-1 --cors .
    else
        if command -v php &> /dev/null; then
            echo "✅ PHP trouvé"
            echo "Démarrage du serveur web sur http://0.0.0.0:8080"
            echo ""
            echo "Ouvrez votre navigateur et allez sur : http://localhost:8080"
            echo ""
            php -S 0.0.0.0:8080
        else
            echo "❌ Ni Python ni Node.js ni PHP ne sont installés"
            echo ""
            echo "Pour lancer l'application, vous avez besoin de :"
            echo "1. Python (recommandé) : https://www.python.org/downloads/"
            echo "   OU"
            echo "2. Node.js : https://nodejs.org/"
            echo "   OU"
            echo "3. PHP : https://www.php.net/downloads.php"
            echo ""
            echo "Une fois installé, relancez ce fichier"
            exit 1
        fi
    fi
fi
